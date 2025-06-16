import React, { useState } from 'react';
import styled from 'styled-components';

// Import all certificate images
import sqlBasic from '../assets/certificates/sql_basic.png';
import pythonBasic from '../assets/certificates/python_basic.png';
import pythonAdvance from '../assets/certificates/python_advance.jpg';
import problemSolvingBasic from '../assets/certificates/problem_solving_basic.png';
import javaIntermediate from '../assets/certificates/java_intermediate.png';
import javaBasic from '../assets/certificates/java_basic.png';
import azureFundamentals from '../assets/certificates/azure_fundamentals.png';

// Define types
interface Certificate {
  src: string;
  title: string;
}

interface CertificateCategory {
  images: Certificate[];
}

type CertificateCategories = {
  [key: string]: CertificateCategory;
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  text-transform: uppercase;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const BadgeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  aspect-ratio: 16/9;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BadgeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BadgeTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const CategoryTitle = styled.h2`
  color: white;
  text-align: center;
  margin: 20px 0;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

// Define certificate categories and their images
const certificateCategories: CertificateCategories = {
  'Programming Languages': {
    images: [
      { src: pythonBasic, title: 'Python Basic' },
      { src: pythonAdvance, title: 'Python Advanced' },
      { src: javaBasic, title: 'Java Basic' },
      { src: javaIntermediate, title: 'Java Intermediate' },
      { src: sqlBasic, title: 'SQL Basic' }
    ]
  },
  'Cloud & DevOps': {
    images: [
      { src: azureFundamentals, title: 'Azure Fundamentals' }
    ]
  },
  'Data Structures & Algorithms': {
    images: [
      { src: problemSolvingBasic, title: 'Problem Solving Basic' }
    ]
  },
  'Design Patterns': {
    images: []
  },
  'AI & Machine Learning': {
    images: []
  },
  'Agile & Others': {
    images: []
  }
};

const Badges: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Programming Languages');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close modal on escape key press
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <Container>
      <CategoryTabs>
        {Object.keys(certificateCategories).map((category) => (
          <CategoryTab
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <CategoryTitle>{selectedCategory}</CategoryTitle>
      <BadgeGrid>
        {certificateCategories[selectedCategory].images.map((cert: Certificate, index: number) => (
          <BadgeCard key={index} onClick={() => handleImageClick(cert.src)}>
            <BadgeImage src={cert.src} alt={cert.title} />
            <BadgeTitle>{cert.title}</BadgeTitle>
          </BadgeCard>
        ))}
      </BadgeGrid>

      {selectedImage && (
        <Modal onClick={closeModal}>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ModalImage src={selectedImage} alt="Certificate Preview" onClick={(e) => e.stopPropagation()} />
        </Modal>
      )}
    </Container>
  );
};

export default Badges; 