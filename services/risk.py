"""
Risk and mood scoring service.
Rule-based and deterministic (no LLM hallucinations).
"""

from typing import Dict
from utils.constants import CRISIS_KEYWORDS


def score_risk(message: str) -> Dict[str, float]:
    text = message.lower()

    scores = {
        "sentiment": 0.0,
        "stress": 0.0,
        "depression": 0.0,
        "crisis": 0.0,
    }

    # -----------------------------
    # CRISIS DETECTION
    # -----------------------------
    for kw in CRISIS_KEYWORDS:
        if kw in text:
            scores["crisis"] = 1.0
            scores["depression"] = 1.0
            scores["sentiment"] = -1.0
            return scores  # immediate override

    # -----------------------------
    # DEPRESSION SIGNALS
    # -----------------------------
    depression_terms = [
        "hopeless", "empty", "worthless",
        "tired of life", "nothing matters",
        "no energy", "always sad",
    ]

    for term in depression_terms:
        if term in text:
            scores["depression"] += 0.3
            scores["sentiment"] -= 0.3

    # -----------------------------
    # STRESS / ANXIETY SIGNALS
    # -----------------------------
    stress_terms = [
        "stressed", "anxious", "overwhelmed",
        "pressure", "panic", "worried",
    ]

    for term in stress_terms:
        if term in text:
            scores["stress"] += 0.3
            scores["sentiment"] -= 0.2

    # Clamp values
    scores["stress"] = min(scores["stress"], 1.0)
    scores["depression"] = min(scores["depression"], 1.0)
    scores["sentiment"] = max(min(scores["sentiment"], 1.0), -1.0)

    return scores
