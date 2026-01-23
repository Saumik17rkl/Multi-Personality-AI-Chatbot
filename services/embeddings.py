from sentence_transformers import SentenceTransformer
from utils.constants import EMBEDDING_MODEL_NAME

_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

def embed_text(text: str) -> list[float]:
    """
    Generate vector embedding for text.
    """
    return _model.encode(text).tolist()
