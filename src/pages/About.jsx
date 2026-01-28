import React from "react";
import "../style/about.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-wrapper">

      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav>
        <Link to="/" className="logo">Kindred</Link>

        <Link to="/" className="back-link">
          <svg className="icon" viewBox="0 0 24 24" style={{ width: "18px", height: "18px" }}>
            <path d="M19 12H5M5 12L12 19M5 12L12 5"></path>
          </svg>
          Back to Home
        </Link>
      </nav>

      <main>
        <header>
          <h1>About Kindred</h1>
          <p className="subtitle">
            Understanding the mission and the care behind the technology.
          </p>
        </header>

        {/* Section 1 */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle pink-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h2>What is Kindred?</h2>
          </div>

          <p>
            Kindred is a next-generation AI companion platform designed to bridge the gap between
            technology and emotional intelligence. We believe that everyone deserves a non-judgmental
            space to express themselves.
          </p>

          <ul>
            <li><strong>Emotionally Supportive:</strong> Built around empathy and active listening.</li>
            <li><strong>Dynamic Personas:</strong> Choose a friend, partner, or psychiatrist persona.</li>
            <li><strong>Safe Exploration:</strong> Ethical boundaries ensure all conversations stay constructive.</li>
          </ul>
        </div>

        <div className="separator"></div>

        {/* Section 2 */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle blue-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </div>
            <h2>Mental-Health Safety First</h2>
          </div>

          <p>
            Safety is the foundation of Kindred. It contains guardrails specifically designed for
            mental health support.
          </p>

          <ul>
            <li><strong>Crisis Detection:</strong> Detects signs of distress automatically.</li>
            <li><strong>Automatic Escalation:</strong> Switches to psychiatrist persona when needed.</li>
            <li><strong>Persona Boundaries:</strong> Romantic personas disabled during high vulnerability.</li>
            <li><strong>Indian Context:</strong> Localized resources and culturally aware responses.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-card">
          <div className="icon-header" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
            <svg className="icon" viewBox="0 0 24 24" style={{ color: "var(--red)" }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h3>Important Disclaimer</h3>
          <p>"This platform is not a replacement for professional medical or psychiatric care."</p>
        </div>
      </main>

      <footer>
        <p>© 2026 Kindred AI. Dedicated to a healthier mind.</p>
      </footer>
    </div>
  );
};

export default About;
