import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="hero">
      <h1>Kindred</h1>

      <p className="tagline">
        A safe space to talk, feel, and heal — with AI that understands you.
      </p>

      <p className="description">
        Kindred is a multi-personality AI companion designed with mental-health
        safety at its core. Choose who you want to talk to — a friend, a partner,
        or a psychiatrist — responsibly and securely.
        <Link to="/about">Learn more about our mission</Link>
      </p>

      <div className="visual-container">
        <svg className="chat-bubble-svg" width="200" height="150" viewBox="0 0 200 150">
          <rect x="20" y="20" width="120" height="70" rx="35" fill="white" fillOpacity="0.8" />
          <path d="M110 85L130 110L140 85" fill="white" fillOpacity="0.8" />
          <rect x="60" y="60" width="120" height="70" rx="35" fill="#4d7cff" fillOpacity="0.2" />
          <path d="M90 125L70 150L60 125" fill="#4d7cff" fillOpacity="0.2" />
          <circle cx="65" cy="55" r="5" fill="#ff85b3" />
          <circle cx="85" cy="55" r="5" fill="#ff85b3" />
          <circle cx="105" cy="55" r="5" fill="#ff85b3" />
        </svg>
      </div>

      <Link to="/gender-selection" className="cta-btn">
        Start a Conversation
      </Link>
    </header>
  );
}
