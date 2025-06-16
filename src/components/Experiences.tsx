import React from 'react';
import styled from 'styled-components';

const TabContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ExperienceCard = styled.div`
  margin-bottom: 2.5rem;
  padding: 2rem;
  border-left: 4px solid #00fff7;
  background: #f8f9fa;
  border-radius: 0 12px 12px 0;
  transition: transform 0.2s ease;
  display: flex;
  gap: 2rem;
  align-items: center;

  &:hover {
    transform: translateX(10px);
  }
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CompanyLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

const Company = styled.a`
  color: #00fff7;
  text-decoration: none;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Duration = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.6;
`;

interface Experience {
  position: string;
  company: string;
  link: string;
  year: string;
  description: string;
  logo: string;
}

interface ExperiencesProps {
  workExperience: Experience[];
}

const Experiences: React.FC<ExperiencesProps> = ({ workExperience }) => {
  return (
    <TabContent>
      <h2>Work Experience</h2>
      {workExperience.map((exp, index) => (
        <ExperienceCard key={index}>
          <LogoContainer>
            <CompanyLogo src={exp.logo} alt={`${exp.company} logo`} />
          </LogoContainer>
          <ContentContainer>
            <Title>{exp.position}</Title>
            <Company href={exp.link} target="_blank" rel="noopener noreferrer">
              {exp.company}
            </Company>
            <Duration>{exp.year}</Duration>
            <Description>{exp.description}</Description>
          </ContentContainer>
        </ExperienceCard>
      ))}
    </TabContent>
  );
};

export default Experiences;