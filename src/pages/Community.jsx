import React from "react";
import "../style/community.css";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="community-wrapper">

      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navigation */}
      <nav className="community-nav">
        <Link className="logo" to="/">Kindred</Link>
        <Link className="back-link" to="/">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Back to Home
        </Link>
      </nav>

      {/* Main */}
      <main>
        <header className="header-section">
          <h1>Our Community</h1>
          <p className="subtitle">
            A safe, kind and supportive space—built for everyone.
          </p>
        </header>

        {/* Section 1 */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle pink-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 21s-8-4-8-10V5l8-3 8 3v6c0 6-8 10-8 10z" />
              </svg>
            </div>
            <h2>What Kindred Community Stands For</h2>
          </div>

          <p>
            Kindred is built to be a warm, emotionally safe environment where users
            can talk openly, learn, grow, and connect with AI personas without fear
            of judgment or negativity.
          </p>

          <ul>
            <li>Respectful and supportive space</li>
            <li>No hate speech or harassment</li>
            <li>Encouraging personal growth and healing</li>
            <li>Safe emotional environment for everyone</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle blue-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            </div>
            <h2>Community Guidelines</h2>
          </div>

          <p>
            To protect everyone, we have a simple set of guidelines. These help
            maintain safety and positivity across the Kindred platform.
          </p>

          <ul>
            <li>Be respectful toward all personas</li>
            <li>Avoid explicit, abusive, or harmful language</li>
            <li>No manipulative or unethical behavior</li>
            <li>Don’t encourage self-harm or dangerous actions</li>
            <li>Use Kindred responsibly and mindfully</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="section-card">
          <div className="icon-header">
            <div className="icon-circle red-bg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>
            <h2>Zero-Tolerance Policy</h2>
          </div>

          <p>
            For safety reasons, certain behaviors are strictly prohibited.
            Violations may lead to automatic restrictions.
          </p>

          <ul>
            <li>Harassment or bullying</li>
            <li>Self-harm encouragement</li>
            <li>Violent or hateful content</li>
            <li>NSFW or explicit sexual content</li>
            <li>Asking AI to break rules or do harm</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-card">
          <h3>Community Commitment</h3>
          <p>
            Kindred is designed for emotional safety. Help us keep this community
            kind, positive, and healing for everyone.
          </p>
        </div>
      </main>

      <footer>
        <p>© 2026 Kindred AI. Together we heal.</p>
      </footer>
    </div>
  );
};

export default Community;
