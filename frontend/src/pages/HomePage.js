import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>EmoTuneApp</h1>
        <p className="description">
          A smart music player that detects your facial emotions in real-time and recommends Spotify tracks to match your mood.
        </p>
        <a href="/main" className="start-btn">Get Started</a>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Real-time Emotion Detection</h2>
          <p>Reads your facial emotions and adapts music instantly.</p>
        </div>
        <div className="feature-card">
          <h2>Spotify Integration</h2>
          <p>Recommends tracks from Spotify based on your mood.</p>
        </div>
        <div className="feature-card">
          <h2>Personalized Experience</h2>
          <p>Create mood-based playlists and enjoy music like never before.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
