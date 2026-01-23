import uuid
from datetime import datetime
from typing import Optional, List

from db.mongo import db

sessions_col = db.sessions

MAX_HISTORY = 12  # token safety

# -------------------------------
# CREATE / GET SESSION
# -------------------------------

async def get_or_create_session(
    user_id: str,
    gender: str,
    personality: str,
    session_id: Optional[str] = None,
    ):
    if session_id:
        session = await sessions_col.find_one({"_id": session_id})
        if session:
            return session

    session_id = str(uuid.uuid4())

    session = {
        "_id": session_id,
        "user_id": user_id,
        "gender": gender,
        "personality": personality,
        "messages": [],
        "is_locked": False,
        "locked_role": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }


    await sessions_col.insert_one(session)
    return session


# -------------------------------
# UPDATE SESSION
# -------------------------------

async def append_messages(session_id: str, messages: List[dict]):
    trimmed = messages[-MAX_HISTORY:]

    await sessions_col.update_one(
        {"_id": session_id},
        {
            "$set": {
                "messages": trimmed,
                "updated_at": datetime.utcnow(),
            }
        },
    )

async def lock_session(session_id: str, role: str):
    await sessions_col.update_one(
        {"_id": session_id},
        {
            "$set": {
                "is_locked": True,
                "locked_role": role,
                "updated_at": datetime.utcnow(),
            }
        },
    )


async def unlock_session(session_id: str):
    await sessions_col.update_one(
        {"_id": session_id},
        {
            "$set": {
                "is_locked": False,
                "locked_role": None,
                "updated_at": datetime.utcnow(),
            }
        },
    )

# -------------------------------
# OPTIONAL UTILITIES (future)
# -------------------------------

async def get_session(session_id: str):
    return await sessions_col.find_one({"_id": session_id})

async def delete_session(session_id: str):
    await sessions_col.delete_one({"_id": session_id})
