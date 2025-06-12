import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const START_DATE = new Date('2018-06-01');

const calculateExperience = () => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - START_DATE.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  return { years: diffYears, months: diffMonths };
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/landing-bg.jpg') center center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #00fff7;
  text-shadow: 0 0 10px #00fff7;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00fff7, #88f0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #88f0ffcc;
  line-height: 1.6;
`;

const Description = styled.div`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #ffffff;
  line-height: 1.8;
  text-shadow: none;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);
`;

const EnterButton = styled(Link)`
  padding: 1rem 3rem;
  background: #00fff7;
  color: #111;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.2rem;
  box-shadow: 0 0 15px #00fff7aa;
  transition: all 0.3s ease;
  &:hover {
    background: #00d4c7;
    transform: translateY(-2px);
    box-shadow: 0 0 20px #00fff7cc;
  }
`;

const ExperienceBadge = styled.div`
  background: rgba(0, 255, 247, 0.1);
  border: 1px solid #00fff7;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #00fff7;
  display: inline-block;
`;

export default function About() {
  const { years, months } = calculateExperience();
  
  return (
    <Container>
      <ContentWrapper>
        <Title>Bheem Kumar</Title>
        <Subtitle>Building the future through code</Subtitle>
        <ExperienceBadge>Overall {years} {years === 1 ? 'year' : 'years'} and {months} {months === 1 ? 'month' : 'months'} of experience
        </ExperienceBadge>
        <Description>
          I am a passionate software engineer with expertise in modern web technologies. 
          My journey in software development is driven by a constant desire to learn and create 
          innovative solutions that make a difference. I specialize in building scalable, 
          user-friendly applications using cutting-edge technologies and best practices.
          <br /><br />
          With a strong foundation in both frontend and backend development, I bring ideas to life 
          through clean, efficient code and intuitive user interfaces. I'm always excited to take on 
          new challenges and collaborate with teams to deliver exceptional software solutions.
        </Description>
        <EnterButton to="/portfolio">Explore More</EnterButton>
      </ContentWrapper>
    </Container>
  );
}
