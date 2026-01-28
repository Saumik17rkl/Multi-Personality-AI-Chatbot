import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/gender.css";

const GenderSelection = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH WITH RETRY (same as your HTML version)
  const fetchWithRetry = async (url, options = {}, retries = 5, backoff = 1000) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res;
    } catch (err) {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      }
      throw err;
    }
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = async () => {
    if (!selectedGender) return;

    setLoading(true);

    try {
      const apiUrl = `https://multi-personality-ai-chatbot.onrender.com/personalities?gender=${selectedGender}`;
      const response = await fetchWithRetry(apiUrl);
      const data = await response.json();

      sessionStorage.setItem("kindred_gender", selectedGender);
      sessionStorage.setItem("kindred_personalities", JSON.stringify(data));

      navigate("/personality-selection");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="gender-wrapper">

      {/* Background blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav>
        <div className="logo">Kindred</div>
      </nav>

      <main>
        <div className="selection-card">
          <header>
            <h1>Tell us how you identify</h1>
            <p className="subtitle">
              This helps us show you the right conversation options.
            </p>
          </header>

          <div className="options">

            <div
              className={`option-card male ${
                selectedGender === "male" ? "selected male" : ""
              }`}
              onClick={() => handleSelectGender("male")}
            >
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24">
                  <circle cx="10" cy="14" r="5"></circle>
                  <path d="M19 5L13.5 10.5M19 5H14M19 5V10"></path>
                </svg>
              </div>
              <span className="option-label">Male</span>
            </div>

            <div
              className={`option-card female ${
                selectedGender === "female" ? "selected female" : ""
              }`}
              onClick={() => handleSelectGender("female")}
            >
              <div className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="9" r="5"></circle>
                  <path d="M12 14V21M9 18H15"></path>
                </svg>
              </div>
              <span className="option-label">Female</span>
            </div>

          </div>

          <button
            className={`cta-btn ${selectedGender ? "enabled" : ""} ${
              loading ? "loading" : ""
            }`}
            onClick={handleContinue}
          >
            {loading ? "" : "Continue"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default GenderSelection;
