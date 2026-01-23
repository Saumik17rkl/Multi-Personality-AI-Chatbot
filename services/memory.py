"""
Memory handling for chat sessions.

Responsibilities:
- Merge system prompt + past messages + new user input
- Enforce MAX_HISTORY
- Keep message format LLM-compatible
"""

from typing import List, Dict
from utils.constants import MAX_HISTORY


def build_messages(
    system_prompt: str,
    history: List[Dict[str, str]],
    user_message: str,
) -> List[Dict[str, str]]:
    """
    Build the message list sent to the LLM.

    Args:
        system_prompt: system role prompt (personality)
        history: stored session messages (user + assistant)
        user_message: current user input

    Returns:
        List of messages ready for LLM call
    """

    messages = [
        {"role": "system", "content": system_prompt}
    ]

    # Add trimmed history
    if history:
        messages.extend(history[-MAX_HISTORY:])

    # Add current user message
    messages.append(
        {"role": "user", "content": user_message}
    )

    return messages


def update_history(
    history: List[Dict[str, str]],
    user_message: str,
    assistant_reply: str,
) -> List[Dict[str, str]]:
    """
    Update session history after LLM response.

    Args:
        history: existing stored messages
        user_message: latest user message
        assistant_reply: LLM response

    Returns:
        Updated history trimmed to MAX_HISTORY
    """

    updated = history + [
        {"role": "user", "content": user_message},
        {"role": "assistant", "content": assistant_reply},
    ]

    return updated[-MAX_HISTORY:]
