import React, { useEffect, useState } from "react";
import "../style/personality.css";
import { useNavigate } from "react-router-dom";

const PersonalitySelection = () => {
  const navigate = useNavigate();

  const GENDER_PERSONALITIES = {
    male: [
      { id: "psychiatrist", label: "psychiatrist", icon: "brain" },
      { id: "psychiatrist_crisis", label: "crisis counselor", icon: "shield" },
      { id: "friend", label: "friend", icon: "coffee" },
      { id: "girlfriend", label: "girlfriend", icon: "heart" },
      { id: "wife", label: "wife", icon: "sparkles" },
      { id: "sister", label: "sister", icon: "users" },
    ],

    female: [
      { id: "psychiatrist", label: "psychiatrist", icon: "brain" },
      { id: "psychiatrist_crisis", label: "crisis counselor", icon: "shield" },
      { id: "friend", label: "friend", icon: "coffee" },
      { id: "boyfriend", label: "boyfriend", icon: "heart" },
      { id: "husband", label: "husband", icon: "sparkles" },
      { id: "brother", label: "brother", icon: "users" },
    ],
  };

  const ICON_MAP = {
    brain: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.04-2.44 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.04-2.44A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.04-2.44 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.04-2.44A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    coffee: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    sparkles: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M12 3l1.91 5.89L20 10.8l-4.5 4.38L16.57 21 12 17.77 7.43 21l1.07-5.82L4 10.8l6.09-1.91z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" className="svg-icon">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  const [selectedId, setSelectedId] = useState(null);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    const g = sessionStorage.getItem("kindred_gender");
    setGender(g);
    if (!g) navigate("/gender-selection");

    const accentColor = g === "female" ? "var(--blue)" : "var(--pink)";
    document.documentElement.style.setProperty("--accent-color", accentColor);
  }, [navigate]);

  const handleSelect = (id) => {
    setSelectedId(id);
    sessionStorage.setItem("selected_personality", id);

    if (!sessionStorage.getItem("session_id")) {
      const uuid =
        "kindred-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now();
      sessionStorage.setItem("session_id", uuid);
    }
  };

  const handleContinue = () => {
    if (selectedId) navigate("/chat");
  };

  if (!gender) return null;

  return (
    <div className="container">
      <header>
        <span className="logo">Kindred</span>
        <h1>Choose a Companion</h1>
        <p className="notice">You can choose only one personality per session.</p>
      </header>

      <div className="personality-grid">
        {GENDER_PERSONALITIES[gender].map((p) => (
          <div
            key={p.id}
            className={`card ${selectedId === p.id ? "selected" : ""}`}
            onClick={() => handleSelect(p.id)}
          >
            <div className="icon-container">{ICON_MAP[p.icon]}</div>
            <div className="card-name">{p.label}</div>
          </div>
        ))}
      </div>

      <div className="btn-container">
        <button
          className={`continue-btn ${selectedId ? "active" : ""}`}
          onClick={handleContinue}
        >
          Continue to Chat
        </button>
      </div>
    </div>
  );
};

export default PersonalitySelection;
