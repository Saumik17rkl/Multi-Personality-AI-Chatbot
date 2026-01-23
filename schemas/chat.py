from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    user_id: str
    session_id: Optional[str] = None
    gender: str
    message: str

class ChatResponse(BaseModel):
    success: bool
    session_id: str
    personality: str
    reply: str
    model_used: str
