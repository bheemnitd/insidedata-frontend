import React from 'react';
import styled from 'styled-components';

// Define props for the Landing component
interface LandingProps {
  onExploreClick: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 10pxrgb(0, 0, 0);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  z-index: 1;
  filter: grayscale(100%); /* Apply black-and-white filter to the background image */
`;

const ContentWrapper = styled.div`
  text-align: justify; /* Align text to justify */
  width: 100%;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg,rgb(0, 0, 0),rgb(255, 255, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #111;
  background: linear-gradient(45deg,rgb(255, 255, 255),rgb(255, 0, 162));
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 10pxrgb(0, 0, 0);
  transition: all 0.3s ease;

  &:hover {
  background: linear-gradient(45deg,rgb(255, 0, 191),rgb(255, 255, 255));
    box-shadow: 0 0 15pxrgb(0, 255, 247);
  }
`;

const Landing: React.FC<LandingProps> = ({ onExploreClick }) => {
  return (
    <Container>
      <ContentWrapper>
        <Title>Welcome to My Portfolio</Title>
        <p>
          Explore my portfolio to learn more about my skills, experience, and projects. I am passionate about building scalable and efficient solutions that make a difference.
        </p>
        <Button onClick={onExploreClick}>Explore More</Button>
      </ContentWrapper>
    </Container>
  );
};

export default Landing;