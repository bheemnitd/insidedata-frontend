import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TabContent = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#00fff7' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? '#111' : '#666'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: ${props => props.active ? '#00fff7' : 'rgba(255, 255, 255, 0.95)'};
    transform: translateY(-2px);
  }
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CertCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
`;

const PDFPreview = styled.div`
  width: 100%;
  height: 100%;
  background: white;

  .rpv-core__viewer {
    width: 100%;
    height: 100%;
  }

  .rpv-core__page-layer {
    width: 100% !important;
    height: 100% !important;
  }

  .rpv-core__page {
    width: 100% !important;
    height: 100% !important;
  }
`;

const CertTitle = styled.h3`
  color: #333;
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
`;

const Issuer = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
`;

const Year = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
`;

const CertLink = styled.a`
  color: #00fff7;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #00fff7;
  border-radius: 4px;
  transition: all 0.2s ease;
  text-align: center;
  margin-top: auto;

  &:hover {
    background: #00fff7;
    color: white;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  max-width: 90%;
  max-height: 90vh;
  position: relative;
  overflow: auto;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const ModalPDF = styled.div`
  width: 100%;
  height: 100%;

  .rpv-core__viewer {
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -1rem;
  right: -1rem;
  background: #00fff7;
  color: #111;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: #00d4c7;
  }
`;

interface Certificate {
  name: string;
  path: string;
  type: 'pdf' | 'image';
  issuingAuthority?: string;
  year?: string;
  link?: string;
}

interface CertificationsProps {
  certifications: Certificate[];
}

const categoryNames = {
  'ai': 'AI & Machine Learning',
  'algorithm': 'Algorithms',
  'cloud': 'Cloud & DevOps',
  'data-structure': 'Data Structures',
  'design-pattern': 'Design Patterns',
  'language': 'Programming Languages',
  'agile': 'Agile & Scrum',
  'others': 'Others'
};

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  const [selectedTab, setSelectedTab] = useState<string>('language');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<{ [key: string]: Certificate[] }>({});
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    // Group certificates by category
    const groupedCerts = certifications.reduce((acc, cert) => {
      const category = cert.path.split('/')[0];
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(cert);
      return acc;
    }, {} as { [key: string]: Certificate[] });

    setCertificates(groupedCerts);
  }, [certifications]);

  const handleImageClick = (cert: Certificate) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  const renderPreview = (cert: Certificate) => {
    if (cert.type === 'pdf') {
      return (
        <PDFPreview>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={cert.path}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={0.5}
            />
          </Worker>
        </PDFPreview>
      );
    } else {
      return <ImagePreview src={cert.path} alt={cert.name} />;
    }
  };

  const renderModalContent = (cert: Certificate) => {
    if (cert.type === 'pdf') {
      return (
        <ModalPDF>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={cert.path}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </ModalPDF>
      );
    } else {
      return <ModalImage src={cert.path} alt={cert.name} />;
    }
  };

  return (
    <TabContent>
      <h2>Certifications</h2>
      <TabContainer>
        {Object.entries(categoryNames).map(([key, name]) => (
          <Tab
            key={key}
            active={selectedTab === key}
            onClick={() => setSelectedTab(key)}
          >
            {name}
          </Tab>
        ))}
      </TabContainer>

      <CertGrid>
        {certificates[selectedTab]?.map((cert, index) => (
          <CertCard key={index}>
            <PreviewContainer onClick={() => handleImageClick(cert)}>
              {renderPreview(cert)}
            </PreviewContainer>
            <CertTitle>{cert.name}</CertTitle>
            {cert.issuingAuthority && <Issuer>{cert.issuingAuthority}</Issuer>}
            {cert.year && <Year>Year: {cert.year}</Year>}
            {cert.link && (
              <CertLink href={cert.link} target="_blank" rel="noopener noreferrer">
                Verify Certificate
              </CertLink>
            )}
          </CertCard>
        ))}
      </CertGrid>

      <Modal isOpen={!!selectedCert} onClick={handleCloseModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          {selectedCert && (
            <>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              {renderModalContent(selectedCert)}
            </>
          )}
        </ModalContent>
      </Modal>
    </TabContent>
  );
};

export default Certifications;