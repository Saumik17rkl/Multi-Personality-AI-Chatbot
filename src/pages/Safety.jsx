import React from "react";
import "../style/safety.css";


const Safety = () => {
  return (
    <div className="safety-wrapper">

      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="safety-nav">
        <a className="logo" href="/">Kindred</a>
        <a className="back-link" href="/">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Back to Home
        </a>
      </nav>

      {/* Main Content */}
      <main>
        <header className="header-section">
          <h1>Safety Guidelines</h1>
          <p className="subtitle">
            Your well-being comes first. Learn how Kindred protects you.
          </p>
        </header>

        {/* Section 1: Core Safety */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle blue-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2>Mental Health First</h2>
          </div>

          <p>
            Kindred is designed with mental health as the top priority. Every interaction is 
            monitored using AI safety layers and emotional analysis to ensure you always receive 
            helpful, non-harmful responses.
          </p>

          <ul>
            <li>Detection of unsafe keywords and crisis language.</li>
            <li>Automatic activation of Psychiatrist persona in emergencies.</li>
            <li>Blocking harmful or self-destructive instructions.</li>
            <li>Safe, empathetic, and respectful communication always.</li>
          </ul>
        </div>

        {/* Section 2: Crisis Management */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle red-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h2>Crisis Mode</h2>
          </div>

          <p>
            If you ever express distress, suicidal thoughts, or emotional breakdown, Kindred 
            automatically switches modes to ensure maximum support and guidance.
          </p>

          <ul>
            <li>Provides grounding exercises and calming techniques.</li>
            <li>Shares emergency helpline numbers for India.</li>
            <li>Stops romantic or sensitive personas instantly.</li>
            <li>Focuses on safety, clarity, and emotional stability.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-card">
          <h3>Important Safety Notice</h3>
          <p>This AI is NOT a replacement for professional therapy or medical help.</p>
        </div>
      </main>

      <footer>
        <p>© 2026 Kindred AI. Stay safe & take care.</p>
      </footer>

    </div>
  );
};

export default Safety;
