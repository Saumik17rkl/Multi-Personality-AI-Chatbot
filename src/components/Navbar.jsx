import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        Kindred
      </div>

      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/safety">Safety</Link>
        <Link to="/community">Community</Link>
      </div>
    </nav>
  );
}
