from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)

# Load GoEmotions Model
MODEL_NAME = "goemotions_model"  # Replace with your model path or Hugging Face model ID

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device).half()

# Emotion Labels
emotion_labels = [
    "Admiration", "Amusement", "Anger", "Annoyance", "Approval", "Caring", "Confusion", "Curiosity",
    "Desire", "Disappointment", "Disapproval", "Disgust", "Embarrassment", "Excitement", "Fear",
    "Gratitude", "Grief", "Joy", "Love", "Nervousness", "Optimism", "Pride", "Realization", "Relief",
    "Remorse", "Sadness", "Surprise", "Neutral", "Trust", "Anticipation", "Shame", "Guilt", "Hope"
]

# Function to detect emotions
def detect_emotion(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.nn.functional.softmax(logits, dim=-1)

    top_k = torch.topk(probs, k=6, dim=1)
    emotions = top_k.indices.squeeze().tolist()
    scores = top_k.values.squeeze().tolist()

    selected_emotions = [
        {"emotion": emotion_labels[emotions[i]], "confidence": round(scores[i] * 100, 2)}
        for i in range(len(emotions))
    ]

    return selected_emotions[:6]

# API Route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Invalid input"}), 400

    text = data["text"]
    emotions = detect_emotion(text)
    return jsonify({"emotions": emotions})

# Home Route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Emotion Detection API is running!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
