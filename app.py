import streamlit as st
from transformers import pipeline


# Load emotion analysis model
@st.cache_resource
def load_model():
    return pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")


classifier = load_model()

# Streamlit UI
st.title("😊 Emotion Analysis Chatbot")
st.write("Enter a text, and the AI will analyze the emotions!")

# User input
user_input = st.text_area("Enter your text:", "I am feeling very happy today!")

if st.button("Analyze"):
    results = classifier(user_input)

    # Display top emotion
    top_emotion = max(results, key=lambda x: x['score'])
    st.write(f"**Predicted Emotion:** {top_emotion['label']} (Confidence: {top_emotion['score']:.4f})")

    # Show all detected emotions
    st.write("Emotion Scores:")
    for res in results:
        st.write(f"- {res['label']}: {res['score']:.4f}")

# Run with: `streamlit run filename.py`
