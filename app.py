from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware

from schemas.chat import ChatRequest, ChatResponse

from services.risk import score_risk
from services.personality import (
    validate_personality,
    get_system_prompt,
    PERSONALITIES,
)
from services.llm import llm_with_fallback
from services.memory import build_messages, update_history
from services.semantic import extract_semantic_facts, merge_semantic_facts
from db.session_repo import get_or_create_session, append_messages, lock_session, unlock_session
from db.semantic_repo import (
    get_semantic_memory,
    upsert_semantic_facts,
    update_risk_state,
)

from utils.constants import (
    SESSION_LOCK_ROLE,
    VALID_GENDERS,
    CRISIS_THRESHOLD,
    DEPRESSION_THRESHOLD,
    CRISIS_UNLOCK_THRESHOLD,
    DEPRESSION_UNLOCK_THRESHOLD,
)


# =====================================================
# APP INIT
# =====================================================

app = FastAPI(
    title="Multi-Personality AI Chatbot",
    version="5.1",
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# ROOT
# =====================================================

@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "Multi-Personality AI Chatbot",
        "features": [
            "episodic memory",
            "semantic memory",
            "vector memory",
            "risk scoring",
            "auto psychiatrist switch",
            "mongo-db",
        ],
    }

# =====================================================
# PERSONALITIES (FRONTEND DISCOVERY)
# =====================================================

@app.get("/personalities")
def get_personalities(gender: str):
    if gender not in VALID_GENDERS:
        raise HTTPException(
            status_code=400,
            detail="Gender must be male or female",
        )

    available = [
        role
        for role, cfg in PERSONALITIES.items()
        if gender in cfg["allowed"]
    ]

    return {
        "gender": gender,
        "available_personalities": available,
    }

# =====================================================
# CHAT ROUTE
# =====================================================

@app.post("/chat/{personality}", response_model=ChatResponse)
async def chat(
    personality: str = Path(..., description="Personality role"),
    req: ChatRequest = None,
):
    # -----------------------------
    # BASIC VALIDATION
    # -----------------------------

    if not req:
        raise HTTPException(400, "Request body missing")

    if req.gender not in VALID_GENDERS:
        raise HTTPException(400, "Invalid gender")

    if not req.message.strip():
        raise HTTPException(400, "Message cannot be empty")

    # -----------------------------
    # SESSION (EPISODIC MEMORY)
    # -----------------------------

    session = await get_or_create_session(
        user_id=req.user_id,
        gender=req.gender,
        personality=personality,
        session_id=req.session_id,
    )

    # -----------------------------
    # RISK SCORING
    # -----------------------------

    risk_scores = score_risk(req.message)

    # Persist long-term risk state
    await update_risk_state(req.user_id, risk_scores)

    # -----------------------------
    # SESSION LOCK LOGIC (CRITICAL)
    # -----------------------------

    # Lock session if crisis detected
    if risk_scores["crisis"] >= CRISIS_THRESHOLD:
        await lock_session(session["_id"], SESSION_LOCK_ROLE)
        personality = SESSION_LOCK_ROLE

    # Enforce lock if already locked
    if session.get("is_locked"):
        personality = session.get("locked_role", SESSION_LOCK_ROLE)

    # Check if we can unlock (trend improved)
    semantic = await get_semantic_memory(req.user_id)
    risk_trend = semantic.get("risk_trend", {}) if semantic else {}

    can_unlock = (
        risk_trend.get("crisis", 1.0) <= CRISIS_UNLOCK_THRESHOLD
        and risk_trend.get("depression", 1.0) <= DEPRESSION_UNLOCK_THRESHOLD
    )

    if session.get("is_locked") and can_unlock:
        await unlock_session(session["_id"])
        personality = personality  # keep requested role after unlock

    # -----------------------------
    # VALIDATE PERSONALITY (AFTER LOCK)
    # -----------------------------

    if not validate_personality(personality, req.gender):
        raise HTTPException(
            status_code=403,
            detail="Personality not allowed for this gender",
        )

    # -----------------------------
    # SEMANTIC MEMORY (FACTS)
    # -----------------------------

    semantic_facts = semantic.get("facts", {}) if semantic else {}

    # -----------------------------
    # SYSTEM PROMPT (SAFETY FIRST)
    # -----------------------------

    if risk_scores["crisis"] >= CRISIS_THRESHOLD:
        personality = "psychiatrist_crisis"  # This will use the prompt from personality.py

    system_prompt = get_system_prompt(personality)

    if semantic_facts:
        system_prompt += (
            "\n\nKnown facts about the user (long-term memory):\n"
            f"{semantic_facts}\n"
            "Use these naturally if relevant."
        )

    # -----------------------------
    # BUILD LLM MESSAGES
    # -----------------------------

    messages = build_messages(
        system_prompt=system_prompt,
        history=session["messages"],
        user_message=req.message,
    )

    # -----------------------------
    # LLM CALL
    # -----------------------------

    try:
        reply, model_used = await llm_with_fallback(
            messages=messages,
            temperature=0.7,  # Adjust temperature as needed
            max_tokens=512,   # Adjust max tokens as needed
        )
    except Exception as e:
        print(f"[ERROR] LLM call failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate response. Please try again."
        )

    # -----------------------------
    # UPDATE EPISODIC MEMORY
    # -----------------------------

    new_history = update_history(
        session["messages"],
        req.message,
        reply,
    )

    await append_messages(session["_id"], new_history)

    # -----------------------------
    # UPDATE SEMANTIC FACTS
    # -----------------------------

    extracted_facts = extract_semantic_facts(req.message)

    if extracted_facts:
        merged_facts = merge_semantic_facts(
            semantic_facts,
            extracted_facts,
        )
        await upsert_semantic_facts(req.user_id, merged_facts)

    # -----------------------------
    # RESPONSE
    # -----------------------------

    return ChatResponse(
        success=True,
        session_id=session["_id"],
        personality=personality,
        reply=reply,
        model_used=model_used,
    )
