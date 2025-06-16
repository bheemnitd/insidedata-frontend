import React from 'react';
import styled from 'styled-components';
import { Project } from './Data';

interface ProjectsProps {
  projects: Project[];
}

const TabContent = styled.div`
  padding: 20px;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  min-width: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  ${ProjectCard}:hover & {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
  color: #8892b0;
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #8892b0;
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0;
`;

const Tools = styled.div`
  color: #64ffda;
  font-size: 0.8em;
  margin-top: 10px;
`;

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <TabContent>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          {project.logo && (
            <LogoContainer>
              <ProjectLogo src={project.logo} alt={`${project.name} logo`} />
            </LogoContainer>
          )}
          <ContentContainer>
            <Title>
              {project.url ? (
                <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </ProjectLink>
              ) : (
                project.name
              )}
            </Title>
            <Company>{project.company}</Company>
            <Duration>
              {project.started} - {project.ended}
            </Duration>
            <Description>{project.description}</Description>
            <Tools>{project.tools}</Tools>
          </ContentContainer>
        </ProjectCard>
      ))}
    </TabContent>
  );
};

export default Projects;
