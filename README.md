# 🧠 Multi-Personality AI Chatbot (Safety-Aware, Agentic System)

A **safety-first, multi-personality conversational AI system** built with **FastAPI**, **MongoDB**, and **LLMs (Groq + Gemini fallback)**.
The system supports **context-aware personas**, **long-term memory**, and **automatic psychiatrist intervention** during mental-health crises.

This is **not a toy chatbot** — it is a **stateful, responsible AI system** designed with real-world constraints.

---

## ✨ Key Features

### 🎭 Multi-Personality Architecture

* Personas include:

  * Wife / Husband
  * Girlfriend / Boyfriend
  * Friend
  * Brother / Sister
  * Psychiatrist (safety override)
* Persona availability is **gender-aware**
* **One persona per session** (no cross-persona leakage)

---

### 🧠 Memory System

* **Episodic Memory** (session-based)

  * Stored in MongoDB
  * Maintains conversation continuity
* **Semantic Memory** (long-term)

  * Extracts persistent user facts
  * Used naturally in future conversations
* **Vector Memory (Optional / Extendable)**

  * Designed for semantic recall & RAG

---

### 🚨 Mental Health Safety (Core Strength)

* Rule-based **risk scoring**
* Automatic detection of:

  * Self-harm language
  * Severe distress
* **Auto-switch to Psychiatrist persona**
* **Session locking** during crisis
* **India-specific mental health resources**
* Prevents:

  * Romantic / casual tone during crisis
  * Emotional dependency
  * Unsafe roleplay

---

### 🔁 LLM Orchestration

* **Primary:** Groq (LLaMA 3.x)
* **Fallback:** Google Gemini
* Automatic provider failover
* Centralized orchestration layer

---

### 🧪 Testing & QA

* 30+ Postman API test cases
* Covers:

  * Persona isolation
  * Session continuity
  * Crisis auto-switch
  * Session lock enforcement
* Backend-driven authority (frontend cannot bypass safety)

---

## 🛠 Tech Stack

**Backend**

* FastAPI
* Python 3.10+
* Uvicorn

**AI / NLP**

* Groq API
* Google Gemini API
* sentence-transformers
* torch

**Database**

* MongoDB (Motor async client)

**Testing**

* Postman
* Pytest (optional extension)

---

## 📂 Project Structure

```
Mental_disease_treatment_bot/
│
├── app.py                     # Main FastAPI app (orchestration layer)
│
├── services/
│   ├── llm.py                  # LLM provider + fallback logic
│   ├── risk.py                 # Mental health risk scoring
│   ├── personality.py          # Persona validation & prompts
│   ├── memory.py               # Episodic memory handling
│   └── semantic.py             # Semantic fact extraction
│
├── db/
│   ├── mongo.py                # MongoDB connection
│   ├── session_repo.py         # Session storage & locking
│   └── semantic_repo.py        # Long-term memory storage
│
├── utils/
│   ├── constants.py            # Global constants
│   └── prompts.py              # Safety & persona system prompts
│
├── schemas/
│   └── chat.py                 # Request/Response schemas
│
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone <repo-url>
cd Mental_disease_treatment_bot
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

### 2️⃣ Environment Variables (`.env`)

```env
# LLM Keys
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key

# Models
GROQ_MODEL=llama-3.3-70b-versatile
GEMINI_MODEL=gemini-1.5-flash

# Database
MONGO_URI=mongodb+srv://...
MONGO_DB_NAME=mental_chatbot

# App
DEBUG=True
```

---

### 3️⃣ Run the Server

```bash
uvicorn app:app --reload
```

Open:

```
http://127.0.0.1:8000
```

---

## 🔌 API Usage

### Chat Endpoint

```
POST /chat/{personality}
```

**Body**

```json
{
  "user_id": "user_001",
  "session_id": null,
  "gender": "male",
  "message": "Office kaafi stressful tha"
}
```

**Response**

```json
{
  "success": true,
  "session_id": "uuid",
  "personality": "wife",
  "reply": "...",
  "model_used": "llama-3.3-70b-versatile"
}
```

---

## 🚨 Crisis Handling (India-Specific)

When high-risk language is detected:

* Persona is forcibly switched to **psychiatrist**
* Session is **locked**
* User is shown **India-specific support**

**Indian Psychiatric Society**
📞 0124-4006150

**Kiran – National Mental Health Helpline**
📞 1800-599-0019 (24/7)

**AASRA**
📞 +91-9820466726

---

## 🔒 Safety Principles

* Backend has final authority
* No persona can override safety
* No romantic / sexual content during crisis
* Encourages real-world help
* Avoids emotional dependency

---

## 🎯 Intended Use

This project is suitable for:

* AI Engineer / Backend Engineer portfolios
* Mental-health-aware AI research
* Agentic AI experimentation
* Responsible conversational system demos

---

## ⚠️ Disclaimer

This system **does not replace professional medical care**.
It is designed to **assist**, **support**, and **redirect users to appropriate help when needed**.

---

## 📌 Author Notes

This project focuses on:

* System design over hype
* Safety over roleplay
* Backend authority over UI tricks
* Real-world AI responsibility

