import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const MusicPlayer = () => {
  return (
    <div style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center', flex: 1 }}>
      <p>Now Playing: Song Title</p>
      <div>
        <button style={{ margin: '5px' }}><FaPlay /></button>
        <button style={{ margin: '5px' }}><FaPause /></button>
      </div>
    </div>
  );
};

export default MusicPlayer;
