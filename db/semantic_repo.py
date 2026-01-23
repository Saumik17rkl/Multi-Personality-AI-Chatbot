from datetime import datetime
from typing import Optional, Dict

from db.mongo import db

semantic_col = db.semantic_memory

# =====================================================
# GET SEMANTIC MEMORY
# =====================================================

async def get_semantic_memory(user_id: str) -> Optional[dict]:
    """
    Fetch semantic memory for a user.
    Includes facts + risk metadata if present.
    """
    return await semantic_col.find_one({"user_id": user_id})


# =====================================================
# UPSERT SEMANTIC FACTS
# =====================================================

async def upsert_semantic_facts(user_id: str, facts: Dict):
    """
    Update long-term semantic facts.
    """
    await semantic_col.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "facts": facts,
                "updated_at": datetime.utcnow(),
            },
            "$setOnInsert": {
                "user_id": user_id,
                "created_at": datetime.utcnow(),
            },
        },
        upsert=True,
    )


# =====================================================
# UPDATE RISK / MOOD STATE
# =====================================================

async def update_risk_state(
    user_id: str,
    risk: Dict[str, float],
):
    """
    Store latest risk snapshot and maintain rolling trend.
    """

    existing = await semantic_col.find_one({"user_id": user_id})

    # Initialize rolling trend
    trend = {
        "sentiment": risk["sentiment"],
        "stress": risk["stress"],
        "depression": risk["depression"],
        "crisis": risk["crisis"],
    }

    if existing and "risk_trend" in existing:
        prev = existing["risk_trend"]

        # simple exponential smoothing
        alpha = 0.6
        trend = {
            k: round(alpha * risk[k] + (1 - alpha) * prev.get(k, 0.0), 3)
            for k in trend
        }

    await semantic_col.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "last_risk": risk,
                "risk_trend": trend,
                "risk_updated_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            },
            "$setOnInsert": {
                "user_id": user_id,
                "created_at": datetime.utcnow(),
            },
        },
        upsert=True,
    )
