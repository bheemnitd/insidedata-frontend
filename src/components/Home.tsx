import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import AboutTab from '../components/About';
import SkillsTab from '../components/Skills';
import ProjectsTab from '../components/Projects';
import ContactTab from '../components/Contacts';

const Container = styled.div`
  min-height: 100vh;
  background: #0a1a2b;
  color: #c0eefe;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem 3rem;
`;

const TabsHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

interface TabButtonProps {
  active?: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  background: ${({ active }) => (active ? '#00fff7' : 'transparent')};
  color: ${({ active }) => (active ? '#111' : '#00fff7')};
  border: 2px solid #00fff7;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  &:hover {
    background: #00fff7;
    color: #111;
  }
`;

const ContentArea = styled.div`
  background: #001522;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 0 30px #00fff7aa;
  min-height: 300px;
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

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
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
      <audio ref={audioRef} src="/tech-hover.mp3" preload="auto" />
      <TabsHeader>
        {tabs.map(({ key, label }) => (
          <TabButton
            key={key}
            active={activeTab === key}
            onClick={() => setActiveTab(key)}
            onMouseEnter={playSound}
            aria-selected={activeTab === key}
            role="tab"
          >
            {label}
          </TabButton>
        ))}
      </TabsHeader>
      <ContentArea role="tabpanel">
        {renderTabContent()}
      </ContentArea>
    </Container>
  );
}
