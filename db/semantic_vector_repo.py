from datetime import datetime
from db.mongo import db

vector_col = db.semantic_vectors

async def store_embedding(
    user_id: str,
    text: str,
    embedding: list[float],
):
    await vector_col.insert_one({
        "user_id": user_id,
        "text": text,
        "embedding": embedding,
        "created_at": datetime.utcnow(),
    })

async def search_similar(
    user_id: str,
    query_embedding: list[float],
    top_k: int = 5,
):
    pipeline = [
        {
            "$vectorSearch": {
                "index": "semantic_vector_index",
                "queryVector": query_embedding,
                "path": "embedding",
                "numCandidates": 100,
                "limit": top_k,
                "filter": {
                    "user_id": user_id
                },
            }
        },
        {
            "$project": {
                "_id": 0,
                "text": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]

    cursor = vector_col.aggregate(pipeline)
    return [doc async for doc in cursor]
