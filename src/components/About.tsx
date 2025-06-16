import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  // background:rgba(0, 229, 255, 0.71);
  border-radius: 12px;
  // box-shadow: 0 4px 8px rgb(0, 0, 0);
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color:rgb(255, 255, 255)
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color:rgb(255, 255, 255)

`;

const About: React.FC = () => {
  const [about, setAbout] = useState<string>('Loading...');

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/data/resume.json'); // Ensure the file is in the public folder
        const resumeData = await response.json();

        // Filter the resume data based on default username and password
        const filteredResume = resumeData.resumes.find(
          (resume: any) => resume.username === 'bheem.kumar' && resume.password === '12'
        );

        if (filteredResume) {
          setAbout(filteredResume.data.personalInfo?.about || 'No about information available.');
        } else {
          console.error('No matching resume found for the given username and password.');
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, []);

  return (
    <Container>
      <Title>About Me</Title>
      <Description>{about}</Description>
    </Container>
  );
};

export default About;