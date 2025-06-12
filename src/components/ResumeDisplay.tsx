import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ResumeData } from '../types/resume';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #00fff7;
`;

const Name = styled.h1`
  color: #00fff7;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  color: #666;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  color: #666;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #00fff7;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const ExperienceItem = styled.div`
  margin-bottom: 1.5rem;
`;

const CompanyName = styled.h4`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
`;

const Position = styled.h5`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const DateRange = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #444;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TechTag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillCategory = styled.div`
  margin-bottom: 1rem;
`;

const SkillCategoryTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: #666;
  margin-bottom: 0.25rem;
  &:before {
    content: "•";
    color: #00fff7;
    margin-right: 0.5rem;
  }
`;

export default function ResumeDisplay() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  if (!resumeData) {
    return <Container>No resume data available. Please fill out the resume builder form.</Container>;
  }

  const { personalInfo, experience, education, skills, projects } = resumeData;

  const formatDateRange = (startDate: string, endDate: string | undefined, isCurrentPosition: boolean) => {
    const start = new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    const end = isCurrentPosition 
      ? 'Present' 
      : endDate 
        ? new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        : '';
    return `${start} - ${end}`;
  };

  return (
    <Container>
      <Header>
        <Name>{personalInfo.name}</Name>
        <Title>{personalInfo.title}</Title>
        <ContactInfo>
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone}</div>
          <div>{personalInfo.location}</div>
          {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
          {personalInfo.github && <div>GitHub: {personalInfo.github}</div>}
        </ContactInfo>
      </Header>

      <Section>
        <SectionTitle>Professional Summary</SectionTitle>
        <Description>{personalInfo.summary}</Description>
      </Section>

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {experience.map((exp, index) => (
          <ExperienceItem key={index}>
            <CompanyName>{exp.company}</CompanyName>
            <Position>{exp.position}</Position>
            <DateRange>
              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentPosition)}
            </DateRange>
            <Description>{exp.description}</Description>
            <Technologies>
              {exp.technologies.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </Technologies>
          </ExperienceItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <SkillsGrid>
          {skills.map((skillCategory, index) => (
            <SkillCategory key={index}>
              <SkillCategoryTitle>{skillCategory.category}</SkillCategoryTitle>
              <SkillList>
                {skillCategory.items.map((skill, i) => (
                  <SkillItem key={i}>{skill}</SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {education.map((edu, index) => (
          <ExperienceItem key={index}>
            <CompanyName>{edu.institution}</CompanyName>
            <Position>{edu.degree}</Position>
            <DateRange>{edu.year}</DateRange>
            {edu.description && <Description>{edu.description}</Description>}
          </ExperienceItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Projects</SectionTitle>
        {projects.map((project, index) => (
          <ExperienceItem key={index}>
            <CompanyName>{project.name}</CompanyName>
            <Description>{project.description}</Description>
            <Technologies>
              {project.technologies.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </Technologies>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )}
          </ExperienceItem>
        ))}
      </Section>
    </Container>
  );
} 