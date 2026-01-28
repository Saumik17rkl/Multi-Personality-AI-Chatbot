import React, { useEffect, useRef, useState } from "react";
import "../style/chat.css";

const API_BASE_URL = "https://multi-personality-ai-chatbot.onrender.com";

const Chat = () => {
  const chatWindowRef = useRef();
  const messageInputRef = useRef();

  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [sessionData, setSessionData] = useState({});
  const [errorOverlay, setErrorOverlay] = useState(false);
  const [errorText, setErrorText] = useState("");

  // ============================
  // VALIDATE SESSION
  // ============================
  useEffect(() => {
    const data = {
      user_id:
        sessionStorage.getItem("user_id") ||
        "guest-" + Math.random().toString(36).substr(2),
      session_id: sessionStorage.getItem("session_id"),
      gender: sessionStorage.getItem("kindred_gender"),
      personality: sessionStorage.getItem("selected_personality"),
    };

    // missing validation
    if (!data.gender) {
      setErrorText("Gender not selected. Please start from the beginning.");
      setErrorOverlay(true);
    } else if (!data.personality) {
      setErrorText("Personality not selected. Please choose a personality first.");
      setErrorOverlay(true);
    } else if (!data.session_id) {
      setErrorText("Session not initialized. Please restart.");
      setErrorOverlay(true);
    } else {
      setSessionData(data);
      greetUser(data.gender, data.personality);
    }
  }, []);

  // ============================
  // AUTO SCROLL
  // ============================
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages, typing]);

  // ============================
  // APPEND MESSAGE
  // ============================
  const addMessage = (text, role, system = false) => {
    setMessages((m) => [...m, { text, role, system }]);
  };

  // ============================
  // GREETING BASED ON PERSONA
  // ============================
  const greetUser = (gender, persona) => {
    const greetings = {
      male: {
        default: "How can I assist you today?",
        supportive: "I’m here for you. What’s on your mind?",
      },
      female: {
        default: "How may I help you today?",
        supportive: "I’m here for you. What would you like to share?",
      },
    };

    const g =
      greetings[gender]?.[persona] ||
      greetings[gender]?.default ||
      "Hello! How can I help you today?";

    addMessage(g, "ai");
  };

  // ============================
  // SEND MESSAGE FUNCTION
  // ============================
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    addMessage(text, "user");
    messageInputRef.current.value = "";
    setTyping(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/chat/${sessionData.personality}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...sessionData,
            message: text,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      const data = await res.json();

      if (data.session_id !== sessionData.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
        setSessionData((prev) => ({
          ...prev,
          session_id: data.session_id,
        }));
      }

      const isSystem =
        data.reply?.toLowerCase()?.includes("safety escalation") ||
        data.reply?.toLowerCase()?.includes("system notice");

      addMessage(data.reply, "ai", isSystem);
    } catch (err) {
      addMessage(
        "Server error. Please try again in a few moments.",
        "ai",
        true
      );
    }

    setTyping(false);
  };

  // ============================
  // FORM SUBMIT
  // ============================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionData.session_id) return;
    sendMessage(messageInputRef.current.value);
  };

  if (errorOverlay) {
    return (
      <div className="error-overlay">
        <h1>⚠️ Access Denied</h1>
        <p>{errorText}</p>
      </div>
    );
  }

  return (
    <div className="chat-wrapper">
      {/* HEADER */}
      <header className="chat-header">
        <div>
          <h2>Kindred</h2>
          <span className="personality-tag">
            {sessionData.personality?.replace("_", " ").toUpperCase()}
          </span>
        </div>
      </header>

      {/* CHAT WINDOW */}
      <main id="chat-window" ref={chatWindowRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.system
                ? "system-message"
                : m.role === "user"
                ? "message user"
                : "message ai"
            }
          >
            {m.text}
          </div>
        ))}

        {typing && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </main>

      {/* INPUT AREA */}
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Type a message..."
          autoFocus
        />
        <button className="send-btn">
          <svg
            width="20"
            height="20"
            stroke="currentColor"
            fill="none"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
