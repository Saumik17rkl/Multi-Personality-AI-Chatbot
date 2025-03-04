import streamlit as st
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load GoEmotions Model
GOEMOTIONS_PATH = "goemotions_model"

goemotions_tokenizer = AutoTokenizer.from_pretrained(GOEMOTIONS_PATH)
goemotions_model = AutoModelForSequenceClassification.from_pretrained(GOEMOTIONS_PATH)

# Move model to CPU/GPU and enable half-precision (fp16)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
goemotions_model.to(device).half()

# Define extended emotion labels
emotion_labels = [
    "Admiration", "Amusement", "Anger", "Annoyance", "Approval", "Caring", "Confusion", "Curiosity",
    "Desire", "Disappointment", "Disapproval", "Disgust", "Embarrassment", "Excitement", "Fear",
    "Gratitude", "Grief", "Joy", "Love", "Nervousness", "Optimism", "Pride", "Realization", "Relief",
    "Remorse", "Sadness", "Surprise", "Neutral", "Trust", "Anticipation", "Shame", "Guilt", "Hope"
]

# Function to detect emotions using GoEmotions
def detect_emotion(text):
    # GoEmotions Model
    goemotions_inputs = goemotions_tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(device)
    with torch.no_grad():
        goemotions_logits = goemotions_model(**goemotions_inputs).logits
    goemotions_probs = torch.nn.functional.softmax(goemotions_logits, dim=-1)

    # Select top emotions
    available_k = min(6, goemotions_probs.shape[1])  # Increased top emotions to 6
    top_k = torch.topk(goemotions_probs, k=available_k, dim=1)
    emotions = top_k.indices.squeeze().tolist()
    scores = top_k.values.squeeze().tolist()

    # Ensure at least 4-6 emotions are shown per sentence
    if isinstance(emotions, int):
        emotions = [emotions]
        scores = [scores]
    selected_emotions = [(emotion_labels[emotions[i]], round(scores[i] * 100, 2)) for i in range(len(emotions))]

    return selected_emotions[:6]

# Streamlit App
def main():
    st.title("Advanced Emotion Detection Chatbot")
    st.write("Enter your message to detect emotions using GoEmotions.")

    user_input = st.text_input("You:", "")

    if user_input:
        detected_emotions = detect_emotion(user_input)
        st.write("### Detected Emotions:")
        for idx, (emotion, score) in enumerate(detected_emotions):
            st.write(f"**{idx + 1}. {emotion}: {score}% Confidence**")

if __name__ == "__main__":
    main()
