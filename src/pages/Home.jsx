import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";

const Home = () => {
  return (
    <div className="home-wrapper">

      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav>
        <div className="logo">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
          Kindred
        </div>

        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/safety">Safety</Link>
          <Link to="/community">Community</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Kindred</h1>
        <p className="tagline">
          A safe space to talk, feel, and heal — with AI that understands you.
        </p>

        <p className="description">
          Kindred is a multi-personality AI companion designed with mental-health safety at its core.
          Choose who you want to talk to — a friend, a partner, or a psychiatrist — responsibly and securely.
          <Link to="/about"> Learn more about our mission </Link>
        </p>

        <div className="visual-container">
          <svg className="chat-bubble-svg" width="200" height="150" viewBox="0 0 200 150">
            <rect x="20" y="20" width="120" height="70" rx="35" fill="white" opacity="0.8" />
            <path d="M110 85L130 110L140 85" fill="white" opacity="0.8" />
            <rect x="60" y="60" width="120" height="70" rx="35" fill="#4d7cff" opacity="0.2" />
            <path d="M90 125L70 150L60 125" fill="#4d7cff" opacity="0.2" />
            <circle cx="65" cy="55" r="5" fill="#ff85b3" />
            <circle cx="85" cy="55" r="5" fill="#ff85b3" />
            <circle cx="105" cy="55" r="5" fill="#ff85b3" />
          </svg>
        </div>

        {/* 🔥 FIXED BUTTON — CORRECT PATH */}
        <Link to="/gender-selection" className="cta-btn">
          Start a Conversation
        </Link>
      </header>

      {/* Features */}
      <section className="features">
        <div className="card">
          <div className="icon-box pink">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h3>Kind Personalities</h3>
          <p>Connect with personas tailored to your needs, from empathetic listeners to clinical support.</p>
        </div>

        <div className="card">
          <div className="icon-box blue">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>Deep Understanding</h3>
          <p>Our AI senses context and emotion to provide helpful feedback.</p>
        </div>

        <div className="card">
          <div className="icon-box red">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3>Privacy First</h3>
          <p>Your conversations are encrypted and private.</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 Kindred AI. Built for wellness.</p>
      </footer>
    </div>
  );
};

export default Home;
