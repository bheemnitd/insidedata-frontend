import React from 'react';
import styled from 'styled-components';
// import {education} from '../components/Data'
// Types
interface Education {
  degree: string;
  college: string;
  year: string;
  url: string;
  logo: string;
}

interface EducationsProps {
  education: Education[];
}

// Styled Components
const Section = styled.section`
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background: linear-gradient(to right, #00fff7, transparent);
  margin: 1rem 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

const TabContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const EducationCard = styled.div`
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

const CollegeLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const Degree = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

const College = styled.a`
  color: #00fff7;
  text-decoration: none;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Year = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Educations: React.FC<EducationsProps> = ({ education }) => {
  return (
    <TabContent>
      <h2>Education</h2>
      {education.map((edu, index) => (
        <EducationCard key={index}>
          <LogoContainer>
            <CollegeLogo src={edu.logo} alt={`${edu.college} logo`} />
          </LogoContainer>
          <ContentContainer>
            <Degree>{edu.degree}</Degree>
            <College href={edu.url} target="_blank" rel="noopener noreferrer">
              {edu.college}
            </College>
            <Year>{edu.year}</Year>
          </ContentContainer>
        </EducationCard>
      ))}
    </TabContent>
  );
};

export default Educations;