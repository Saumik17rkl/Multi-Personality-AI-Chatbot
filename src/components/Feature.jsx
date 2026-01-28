import React from "react";

export default function Features() {
  return (
    <section className="features">
      <div className="card">
        <div className="icon-box pink">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h3>Kind Personalities</h3>
        <p>Connect with personas tailored to your needs.</p>
      </div>

      <div className="card">
        <div className="icon-box blue">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3>Deep Understanding</h3>
        <p>AI senses context & emotion to support you.</p>
      </div>

      <div className="card">
        <div className="icon-box red">
          <svg className="icon" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h3>Privacy First</h3>
        <p>Your conversations are encrypted & safe.</p>
      </div>
    </section>
  );
}
