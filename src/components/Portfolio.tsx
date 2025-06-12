import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import AboutTab from '../components/About';
import SkillsTab from '../components/Skills';
import ProjectsTab from '../components/Projects';
import ContactTab from '../components/Contacts';

// Animated grid background
const moveGrid = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 100px 100px, 200px 200px; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(135deg, #0a1a2b 80%, #1a2a3b 100%),
    repeating-linear-gradient(90deg, #00fff733 0px, #00fff733 1px, transparent 1px, transparent 100px),
    repeating-linear-gradient(0deg, #00fff733 0px, #00fff733 1px, transparent 1px, transparent 100px);
  background-blend-mode: overlay;
  animation: ${moveGrid} 20s linear infinite;
  color: #c0eefe;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem 3rem;
  position: relative;
  overflow: hidden;
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

interface TabButtonProps {
  active?: boolean;
}

const Glitch = styled.span`
  position: relative;
  color: inherit;
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

const TabButton = styled.button<TabButtonProps>`
  background: ${({ active }) => (active ? '#00fff7' : 'rgba(0,0,0,0.15)')};
  color: ${({ active }) => (active ? '#111' : '#00fff7')};
  border: 2px solid #00fff7;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 900;
  border-radius: 12px;
  cursor: pointer;
  transition: 
    background 0.3s cubic-bezier(.55,0,.1,1),
    color 0.3s cubic-bezier(.55,0,.1,1),
    box-shadow 0.3s;
  user-select: none;
  box-shadow: ${({ active }) => (active ? '0 0 20px #00fff7bb, 0 0 8px #00fff7' : '0 0 10px #00fff733')};
  position: relative;
  overflow: hidden;
  outline: none;

  &:hover, &:focus {
    background: #00fff7;
    color: #111;
    box-shadow: 0 0 32px #00fff7cc, 0 0 12px #00fff7;
  }

  &:after {
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: 8px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, #00fff7 0%, #88f0ff 100%);
    box-shadow: 0 0 10px #00fff7cc;
    animation: underline 1s infinite alternate;
  }

  @keyframes underline {
    0% { opacity: 0.8; }
    100% { opacity: 0.3; }
  }
`;

const ContentArea = styled.div`
  background: rgba(10, 34, 56, 0.65);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 0 60px #00fff7cc, 0 0 10px #00fff755;
  min-height: 320px;
  backdrop-filter: blur(8px);
  border: 1.5px solid #00fff7aa;
  margin: 0 auto;
  max-width: 900px;
`;

const tabs = [
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'contact', label: 'Contact' },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('about');
  const audioRef = useRef<HTMLAudioElement>(null);

  const playClickSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    } catch (error) {
      // Ignore
    }
  };

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    playClickSound();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab />;
      case 'skills':
        return <SkillsTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {/* Tech font for headings */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />
      {/* Sound effect */}
      <audio 
        ref={audioRef} 
        preload="auto"
        src="https://assets.mixkit.co/active_storage/sfx/2043/2043-preview.mp3"
      />
      <TabsHeader>
        {tabs.map(({ key, label }) => (
          <TabButton
            key={key}
            active={activeTab === key}
            onClick={() => handleTabClick(key)}
            aria-selected={activeTab === key}
            role="tab"
          >
            <Glitch data-text={label}>{label}</Glitch>
          </TabButton>
        ))}
      </TabsHeader>
      <ContentArea role="tabpanel">
        {renderTabContent()}
      </ContentArea>
    </Container>
  );
}
