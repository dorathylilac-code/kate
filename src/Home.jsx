import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import kateImage from "./images/kate.WEBP"; // Ensure filename matches exactly

export default function Home() {
  const navigate = useNavigate();

  const handleNoteClick = (note) => {
    if (note === "whosThere") {
      navigate("/gallery");
    }
  };

  return (
    <div className="home-container">
      <h1 className="header-text">Welcome to Aunty Katie&apos;s Bedroom</h1>

      <div className="content">
        <img src={kateImage} alt="Kate" className="center-image" />
        <ul className="notes">
          <li
            className="note-btn special-btn"
            onClick={() => handleNoteClick("whosThere")}
          >
            ✨WHO'S THERE??? COME IN!!!
          </li>
          <li className="note-btn">📖SUBSCRIBE TO VIEW EXPLICIT CONTENTS.</li>
          <li className="note-btn">COMMENT</li>
        </ul>
      </div>
    </div>
  );
}
