// src/pages/MoodMusicPage.js
import React, { useRef, useEffect, useState } from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";

const MoodMusicPage = () => {
  const videoRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [currentMood, setCurrentMood] = useState("Detecting...");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const musicTracks = {
    happy: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    sad: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    neutral: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    surprised: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  };

  useEffect(() => {
    const loadDetector = async () => {
      const newDetector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        { runtime: "tfjs", maxFaces: 1 }
      );
      setDetector(newDetector);
    };
    loadDetector();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => resolve(true);
          });
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };
    setupCamera();
  }, []);

  useEffect(() => {
    if (!detector) return;

    let animationFrameId;

    const detectFaces = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const predictions = await detector.estimateFaces(videoRef.current);

        if (predictions.length > 0) {
          const keypoints = predictions[0].keypoints;

          const leftMouth = keypoints[61];
          const rightMouth = keypoints[291];
          const upperLip = keypoints[13];
          const lowerLip = keypoints[14];
          const leftEyebrow = keypoints[105];
          const rightEyebrow = keypoints[334];
          const upperEyelid = keypoints[159];
          const lowerEyelid = keypoints[145];

          const mouthWidth = Math.hypot(rightMouth.x - leftMouth.x, rightMouth.y - leftMouth.y);
          const mouthHeight = Math.hypot(lowerLip.x - upperLip.x, lowerLip.y - upperLip.y);
          const eyeOpenness = Math.hypot(lowerEyelid.x - upperEyelid.x, lowerEyelid.y - upperEyelid.y);
          const browDistance = Math.hypot(rightEyebrow.x - leftEyebrow.x, rightEyebrow.y - leftEyebrow.y);

          const smileFactor = mouthWidth / mouthHeight;
          const surpriseFactor = eyeOpenness / browDistance;

          let mood = "neutral";
          if (smileFactor > 2.5) mood = "happy";
          else if (smileFactor < 2.0) mood = "sad";
          else if (surpriseFactor > 0.5) mood = "surprised";

          if (mood !== currentMood) {
            setCurrentMood(mood);

            if (audioRef.current) {
              audioRef.current.pause(); // stop previous track
              audioRef.current.src = musicTracks[mood];
              if (isPlaying) audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(detectFaces);
    };

    detectFaces();
    return () => cancelAnimationFrame(animationFrameId);
  }, [detector, currentMood, isPlaying]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Mood Music Detection</h1>
      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ border: "2px solid black", borderRadius: "8px" }}
        muted
      />
      <p>Your current mood: {currentMood}</p>
      <audio ref={audioRef} controls={false} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePlayPause} style={{ padding: "10px 20px", fontSize: "16px" }}>
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>
    </div>
  );
};

export default MoodMusicPage;
