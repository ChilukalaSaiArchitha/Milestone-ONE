// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import CameraPreview from "./components/CameraPreview";
import EmotionDisplay from "./components/EmotionDisplay";
import MusicPlayer from "./components/MusicPlayerComp";
import HomePage from "./pages/HomePage";
import MoodMusicPage from "./pages/MoodMusicPage"; // Already imported

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">EmoTuneApp</Link>
        <Link to="/main" className="nav-link">Main App</Link>
        <Link to="/mood-music" className="nav-link">Mood Music</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/main"
          element={
            <div className="App">
              <Header />
              <div className="main-container">
                <div className="card">
                  <h2>Camera</h2>
                  <CameraPreview />
                </div>
                <div className="card">
                  <h2>Emotion</h2>
                  <EmotionDisplay />
                </div>
                <div className="card">
                  <h2>Music Player</h2>
                  <MusicPlayer />
                </div>
              </div>
            </div>
          }
        />

        <Route path="/mood-music" element={<MoodMusicPage />} />
      </Routes>
    </Router>
  );
}

export default App;

