from utils.prompt_loader import load_prompt

PERSONALITIES = {
    # Professional roles
    "psychiatrist": {"prompt": "psychiatrist.txt", "allowed": ["male", "female"]},
    "psychiatrist_crisis": {"prompt": "psychiatrist_crisis.txt", "allowed": ["male", "female"]},
    
    # General roles
    "friend": {"prompt": "friend.txt", "allowed": ["male", "female"]},
    
    # Romantic roles
    "girlfriend": {"prompt": "girlfriend.txt", "allowed": ["male"]},
    "wife": {"prompt": "wife.txt", "allowed": ["male"]},
    "boyfriend": {"prompt": "boyfriend.txt", "allowed": ["female"]},
    "husband": {"prompt": "husband.txt", "allowed": ["female"]},
    
    # Sibling roles
    "brother": {"prompt": "brother.txt", "allowed": ["female"]},
    "sister": {"prompt": "sister.txt", "allowed": ["male"]},
}

def validate_personality(personality: str, gender: str) -> bool:
    """Check if a personality is valid for the given gender."""
    if personality not in PERSONALITIES:
        return False
    return gender in PERSONALITIES[personality]["allowed"]

def get_system_prompt(personality: str) -> str:
    """Load the system prompt for the specified personality."""
    try:
        return load_prompt(PERSONALITIES[personality]["prompt"])
    except KeyError:
        raise ValueError(f"Unknown personality: {personality}")