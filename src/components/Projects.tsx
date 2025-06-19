import React from 'react';
import styled from 'styled-components';
import { Project } from './Data';

interface ProjectsProps {
  projects: Project[];
}

const TabContent = styled.div`
  padding: 20px;

  h2 {
    color: white;
    margin-bottom: 2rem;
  }
`;

const ProjectCard = styled.div`
  border-left: 4px solid rgb(5, 250, 234);
  background: transparent;
  // border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const LogoContainer = styled.div`
  width: 150px;
  height: 150px;
  min-width: 150px;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #fff;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProjectLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #64ffda;
    text-decoration: underline;
  }
`;

const Company = styled.div`
  color: #64ffda;
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const Duration = styled.div`
  color: white;
  font-size: 0.9em;
  margin-bottom: 10px;
  opacity: 0.8;
`;

const Description = styled.p`
  color: white;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
`;

const Tools = styled.div`
  color: #64ffda;
  font-size: 0.8em;
  margin-top: 10px;
`;

const AltTextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
`;

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <TabContent>
      <h2>Skills & Technologies</h2>

      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <LogoContainer>
            {project.logo ? (
              <ProjectLogo src={project.logo} alt={`${project.name} logo`} />
            ) : (
              <AltTextContainer>
                {project.alt || project.name}
              </AltTextContainer>
            )}
          </LogoContainer>
          <ContentContainer>
            {project.url ? (
              <Title>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              </Title>
            ) : (
              <Title>{project.name}</Title>
            )}
            <Company>{project.company}</Company>
            <Duration>
              {project.started} - {project.ended}
            </Duration>
            <Description>{project.contribution}</Description>
            <Tools>{project.tools}</Tools>
          </ContentContainer>
        </ProjectCard>
      ))}
    </TabContent>
  );
};

export default Projects;
