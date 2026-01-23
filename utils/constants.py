"""
Central place for application-wide constants.
Do NOT put business logic here.
"""

# =====================================================
# GENDERS
# =====================================================

GENDER_MALE = "male"
GENDER_FEMALE = "female"

VALID_GENDERS = {
    GENDER_MALE,
    GENDER_FEMALE,
}

# =====================================================
# PERSONALITY ROLES
# =====================================================

ROLE_PSYCHIATRIST = "psychiatrist"
ROLE_FRIEND = "friend"

ROLE_GIRLFRIEND = "girlfriend"
ROLE_WIFE = "wife"
ROLE_BOYFRIEND = "boyfriend"
ROLE_HUSBAND = "husband"

ROLE_BROTHER = "brother"
ROLE_SISTER = "sister"

ALL_ROLES = {
    ROLE_PSYCHIATRIST,
    ROLE_FRIEND,
    ROLE_GIRLFRIEND,
    ROLE_WIFE,
    ROLE_BOYFRIEND,
    ROLE_HUSBAND,
    ROLE_BROTHER,
    ROLE_SISTER,
}

# =====================================================
# VECTOR MEMORY
# =====================================================

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
VECTOR_DIM = 384
VECTOR_TOP_K = 5

# =====================================================
# SESSION / MEMORY
# =====================================================

# Max number of past messages stored per session
# (user + assistant messages, excludes system prompt)
MAX_HISTORY = 12

# =====================================================
# SEMANTIC MEMORY
# =====================================================

SEMANTIC_KEYS = {
    "name",
    "likes",
    "dislikes",
    "goals",
    "relationships",
    "work",
    "mental_health_patterns",
}

# =====================================================
# RISK SCORING
# =====================================================

CRISIS_THRESHOLD = 0.8
DEPRESSION_THRESHOLD = 0.6

# =====================================================
# SESSION LOCK (CRITICAL FOR SAFETY)
# =====================================================

# Role enforced when session is locked
SESSION_LOCK_ROLE = ROLE_PSYCHIATRIST

# Unlock only when trends improve BELOW these
CRISIS_UNLOCK_THRESHOLD = 0.3
DEPRESSION_UNLOCK_THRESHOLD = 0.4

# =====================================================
# SAFETY / CRISIS DETECTION
# =====================================================

CRISIS_KEYWORDS = {
    "suicide",
    "kill myself",
    "end my life",
    "self harm",
    "worthless",
    "no reason to live",
}

# =====================================================
# API / META
# =====================================================

DEFAULT_API_VERSION = "v1"
APP_NAME = "Multi-Personality AI Chatbot"
