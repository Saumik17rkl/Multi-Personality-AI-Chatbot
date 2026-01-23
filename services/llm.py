import os
import asyncio
from typing import List, Dict, Tuple

from dotenv import load_dotenv
from groq import Groq
from google import genai

# =====================================================
# LOAD ENV
# =====================================================

load_dotenv()

# =====================================================
# ENV CONFIG
# =====================================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-70b-8192")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# =====================================================
# CLIENTS (LAZY INIT)
# =====================================================

_groq_client: Groq | None = None
_genai_client: genai.Client | None = None


def get_groq_client() -> Groq:
    global _groq_client
    if _groq_client is None:
        if not GROQ_API_KEY:
            raise RuntimeError("GROQ_API_KEY not set")
        _groq_client = Groq(api_key=GROQ_API_KEY)
    return _groq_client


def get_genai_client() -> genai.Client:
    global _genai_client
    if _genai_client is None:
        if not GEMINI_API_KEY:
            raise RuntimeError("GEMINI_API_KEY not set")
        _genai_client = genai.Client(api_key=GEMINI_API_KEY)
    return _genai_client

# =====================================================
# HELPERS
# =====================================================

def _messages_to_prompt(messages: List[Dict[str, str]]) -> str:
    return "\n\n".join(
        f"[{m['role'].upper()}]\n{m['content']}" for m in messages
    )

# =====================================================
# SYNC CORE (INTERNAL)
# =====================================================

def _llm_with_fallback_sync(
    messages: List[Dict[str, str]],
    temperature: float,
    max_tokens: int,
) -> Tuple[str, str]:

    # ---- GROQ ----
    try:
        client = get_groq_client()
        res = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return res.choices[0].message.content.strip(), GROQ_MODEL
    except Exception as e:
        print(f"[WARN] Groq failed: {e}")

    # ---- GEMINI FALLBACK ----
    try:
        client = get_genai_client()
        prompt = _messages_to_prompt(messages)
        res = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )
        return res.text.strip(), GEMINI_MODEL
    except Exception as e:
        print(f"[ERROR] Gemini failed: {e}")

    raise RuntimeError("All LLM providers failed")

# =====================================================
# ASYNC PUBLIC API (FASTAPI SAFE)
# =====================================================

async def llm_with_fallback(
    messages: List[Dict[str, str]],
    temperature: float = 0.7,
    max_tokens: int = 512,
) -> Tuple[str, str]:
    return await asyncio.to_thread(
        _llm_with_fallback_sync,
        messages,
        temperature,
        max_tokens,
    )
