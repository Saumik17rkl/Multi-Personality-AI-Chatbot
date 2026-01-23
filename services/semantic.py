"""
Semantic memory service.
Extracts long-term facts from user messages.
"""

from typing import Dict
from utils.constants import SEMANTIC_KEYS

def extract_semantic_facts(message: str) -> Dict[str, str]:
    """
    Rule-based semantic extraction (safe + deterministic).

    This avoids hallucinations from LLMs.
    """

    facts = {}

    text = message.lower()

    if "my name is" in text:
        facts["name"] = message.split("my name is")[-1].strip()

    if "i like" in text:
        facts.setdefault("likes", []).append(
            message.split("i like")[-1].strip()
        )

    if "i hate" in text or "i don't like" in text:
        facts.setdefault("dislikes", []).append(message.strip())

    if "i want to" in text or "my goal" in text:
        facts.setdefault("goals", []).append(message.strip())

    if "my wife" in text or "my husband" in text or "my girlfriend" in text:
        facts.setdefault("relationships", []).append(message.strip())

    return facts


def merge_semantic_facts(
    old_facts: Dict,
    new_facts: Dict,
) -> Dict:
    """
    Merge semantic facts safely.
    """

    if not old_facts:
        return new_facts

    merged = dict(old_facts)

    for key, value in new_facts.items():
        if isinstance(value, list):
            merged.setdefault(key, [])
            for item in value:
                if item not in merged[key]:
                    merged[key].append(item)
        else:
            merged[key] = value

    return merged
