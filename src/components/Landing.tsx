import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import IMG_20230119_031554 from '../assets/IMG_20230119_031554.jpg';
// Remove unused import since the image is referenced directly in ProfileImage
// Animated grid background for tech vibe
const moveGrid = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 100px 100px, 200px 200px; }
`;

const SplitScreen = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background:
    linear-gradient(135deg, #0a1a2b 80%, #1a2a3b 100%),
    repeating-linear-gradient(90deg, #00fff733 0px, #00fff733 1px, transparent 1px, transparent 100px),
    repeating-linear-gradient(0deg, #00fff733 0px, #00fff733 1px, transparent 1px, transparent 100px);
  background-blend-mode: overlay;
  animation: ${moveGrid} 20s linear infinite;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const Left = styled.div`
  flex: 1;
  background: rgba(10, 34, 56, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 900px) {
    width: 100%;
    min-height: 40vh;
    padding: 2rem 0;
  }
`;

const Right = styled.div`
  flex: 1;
  background: rgba(0, 255, 247, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 900px) {
    width: 100%;
    min-height: 60vh;
    padding: 2rem 0;
  }
`;

const ProfileImage = styled.img`
  width: 60%;
  max-width: 340px;
  min-width: 180px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 50px #00fff7cc, 0 0 10px #00fff7;
  border: 6px solid #00fff7;
  background: #0a0a1f;
  @media (max-width: 900px) {
    width: 35vw;
    min-width: 140px;
    max-width: 200px;
  }
`;

const GlassCard = styled.div`
  background: rgba(10, 34, 56, 0.85);
  border-radius: 32px;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  box-shadow: 0 0 60px #00fff7cc, 0 0 10px #00fff755;
  border: 2px solid #00fff7aa;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
  text-align: center;
  @media (max-width: 900px) {
    max-width: 90vw;
    padding: 2rem 1rem;
  }
`;

const Glitch = styled.h1`
  font-size: 2.7rem;
  font-weight: 900;
  color: #00fff7;
  position: relative;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px #00fff7, 0 0 10px #00fff7;
  letter-spacing: 2px;
  &:before, &:after {
    content: attr(data-text);
    position: absolute;
    left: 0; width: 100%; top: 0;
    opacity: 0.5;
    pointer-events: none;
  }
  &:before {
    color: #00fff7;
    text-shadow: 2px 0 #00fff7;
    animation: glitch1 1s infinite linear alternate-reverse;
  }
  &:after {
    color: #88f0ff;
    text-shadow: -2px 0 #88f0ff;
    animation: glitch2 1.2s infinite linear alternate-reverse;
  }
  @keyframes glitch1 {
    0% { transform: translate(0,0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px);}
    60% { transform: translate(2px, 2px);}
    80% { transform: translate(2px, -2px);}
    100% { transform: translate(0,0);}
  }
  @keyframes glitch2 {
    0% { transform: translate(0,0);}
    20% { transform: translate(2px, -2px);}
    40% { transform: translate(2px, 2px);}
    60% { transform: translate(-2px, -2px);}
    80% { transform: translate(-2px, 2px);}
    100% { transform: translate(0,0);}
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.2rem;
  color: #88f0ffcc;
  text-shadow: 0 0 8px #00fff7;
`;

const ExploreButton = styled.button`
  padding: 1rem 3rem;
  background: #00fff7;
  color: #0a1a2b;
  font-weight: 900;
  border-radius: 18px;
  border: none;
  font-size: 1.3rem;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 0 25px #00fff7cc, 0 0 10px #00fff7;
  transition: background 0.12s, color 0.12s, transform 0.12s, box-shadow 0.12s;
  cursor: pointer;
  letter-spacing: 1.5px;
  outline: none;
  position: relative;
  overflow: hidden;
  &:hover, &:focus {
    background: #00d4c7;
    color: #fff;
    transform: scale(1.07);
    box-shadow: 0 0 45px #00fff7ee, 0 0 18px #00fff7;
  }
`;

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => {
      navigate('/portfolio');
    }, 180); // Slight delay for sound effect
  };

  return (
    <SplitScreen>
      {/* Tech font for headings */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />
      <Left>
        <ProfileImage src="https://i1.rgstatic.net/ii/profile.image/722254681866246-1549210343245_Q512/Bheem-Kumar.jpg" alt="Profile" />
      </Left>
      <Right>
        <GlassCard>
          <Glitch data-text="Bheem Kumar">Bheem Kumar</Glitch>
          <Subtitle>
            <span style={{ color: "#00fff7" }}>Software Engineer</span> building immersive, scalable web experiences.<br/>
            <span style={{ fontSize: "1rem", color: "#c0eefe" }}>
              Explore my projects, skills, and contact info with interactive tabs.
            </span>
          </Subtitle>
          <ExploreButton onClick={handleClick}>
            EXPLORE
          </ExploreButton>
          <audio
            ref={audioRef}
            preload="auto"
            src="https://assets.mixkit.co/active_storage/sfx/2043/2043-preview.mp3"
          />
        </GlassCard>
      </Right>
    </SplitScreen>
  );
}
