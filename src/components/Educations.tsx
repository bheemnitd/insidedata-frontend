import React from 'react';
import styled from 'styled-components';
// import {education} from '../components/Data'
// Types
interface Education {
  degree: string;
  college: string;
  year: string;
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

const Degree = styled.strong`
  display: block;
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 0.5rem;
`;

const College = styled.p`
  color: #555;
  margin: 0.3rem 0;
`;

const Year = styled.p`
  color: #777;
  font-size: 0.9rem;
  margin: 0.3rem 0;
`;

const EducationSection: React.FC = () => {
  return (
    <Section>
      <Title>Education</Title>
      <Divider />
      <List>
        {/* {education.map((edu: Education, index: number) => (
          <ListItem key={index}>
            <Degree>{edu.degree}</Degree>
            <College>{edu.college}</College>
            <Year>{edu.year}</Year>
          </ListItem>
        ))} */}
      </List>
    </Section>
  );
};

export default EducationSection;