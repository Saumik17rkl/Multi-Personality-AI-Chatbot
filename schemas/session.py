from datetime import datetime
from typing import List, Dict

class SessionSchema:
    _id: str
    user_id: str
    gender: str
    personality: str
    messages: List[Dict[str, str]]
    created_at: datetime
    updated_at: datetime
