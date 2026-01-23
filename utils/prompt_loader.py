from pathlib import Path

PROMPT_DIR = Path("prompts")

def load_prompt(filename: str) -> str:
    path = PROMPT_DIR / filename
    if not path.exists():
        raise RuntimeError(f"Prompt file missing: {filename}")
    return path.read_text(encoding="utf-8")
