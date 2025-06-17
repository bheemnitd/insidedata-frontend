import React, { useState } from 'react';
import styled from 'styled-components';

// Define types
interface Certificate {
  src: string;
  title: string;
  type?: 'pdf' | 'image';
}

interface CertificateCategory {
  images: Certificate[];
}

interface CertificateCategories {
  [key: string]: CertificateCategory;
}

// Certificate data with paths from public directory
const certificateCategories: CertificateCategories = {
  'Programming Languages': {
    images: [
      { src: '/certificates/python_basic.png', title: 'Python Basic', type: 'image' },
      { src: '/certificates/python_advance.jpg', title: 'Python Advanced', type: 'image' },
      { src: '/certificates/java_basic.png', title: 'Java Basic', type: 'image' },
      { src: '/certificates/java_intermediate.png', title: 'Java Intermediate', type: 'image' },
      { src: '/certificates/sql_basic.png', title: 'SQL Basic', type: 'image' }
    ]
  },
  'Cloud & DevOps': {
    images: [
      { src: '/certificates/azure_fundamentals.png', title: 'Azure Fundamentals', type: 'image' }
    ]
  },
  'Data Structures & Algorithms': {
    images: [
      { src: '/certificates/problem_solving_basic.png', title: 'Problem Solving Basic', type: 'image' }
    ]
  }
};

const TabContent = styled.div`
  padding: 20px;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.1)'};
  color: ${props => props.active ? '#000' : '#fff'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.2)'};
    color: ${props => props.active ? '#000' : '#64ffda'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.active ? '#64ffda' : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover::after {
    background: #64ffda;
  }
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const BadgeItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BadgeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BadgeTitle = styled.h3`
  color: #fff;
  margin: 10px 0;
  font-size: 1rem;
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

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  z-index: 1001;

  &:hover {
    color: #666;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const PDFPreview = styled.iframe`
  width: 100%;
  height: 80vh;
  border: none;
`;

const Badges: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(certificateCategories)[0]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <TabContent>
      <h2>Certificates & Badges</h2>
      <CategoryButtons>
        {Object.keys(certificateCategories).map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryButtons>

      <BadgeGrid>
        {certificateCategories[selectedCategory].images.map((certificate, index) => (
          <BadgeItem key={index} onClick={() => handleCertificateClick(certificate)}>
            <BadgeImage src={certificate.src} alt={certificate.title} />
            <BadgeTitle>{certificate.title}</BadgeTitle>
          </BadgeItem>
        ))}
      </BadgeGrid>

      {selectedCertificate && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>{selectedCertificate.title}</h2>
            {selectedCertificate.type === 'pdf' ? (
              <PDFPreview src={selectedCertificate.src} title={selectedCertificate.title} />
            ) : (
              <PreviewImage src={selectedCertificate.src} alt={selectedCertificate.title} />
            )}
          </ModalContent>
        </Modal>
      )}
    </TabContent>
  );
};

export default Badges; 