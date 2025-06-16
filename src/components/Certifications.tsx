import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const TabContent = styled.div`
  background: transparent;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#00fff7' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? '#111' : '#fff'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00fff7' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0 1rem;
`;

const CertificateCategory = styled.div`
  background: transparent;
  padding: 1.5rem;
  border-left: 4px solid #eee;
`;

const CategoryTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #00fff7;
`;

const CertificateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CertificateItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
`;

const PDFPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 0;

  .react-pdf__Document {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-pdf__Page {
    margin: 0;
    padding: 0;
  }

  .react-pdf__Page canvas {
    max-width: 100%;
    height: auto !important;
  }
`;

const CertificateDetails = styled.div`
  color: white;
`;

const CertificateName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #00fff7;
`;

const CertificateInfo = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #ccc;
`;

const VerifyLink = styled.a`
  color: #00fff7;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
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
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1;

  &:hover {
    color: #00fff7;
  }
`;

interface Certificate {
  name: string;
  path: string;
  type: 'image' | 'pdf';
  issuingAuthority: string;
  year: string;
  link?: string;
}

interface CertificationsProps {
  certifications: Certificate[];
}

const categoryNames: { [key: string]: string } = {
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
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [certificateImages, setCertificateImages] = useState<{ [key: string]: string }>({});
  const [certificatePdfs, setCertificatePdfs] = useState<{ [key: string]: string }>({});

  // Group certificates by category based on their path
  const getCategory = (path: string): string => {
    const match = path.match(/certificates\/([^/]+)/);
    return match ? match[1] : 'others';
  };

  const groupedCertificates = certifications.reduce((acc, cert) => {
    const category = getCategory(cert.path);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cert);
    return acc;
  }, {} as { [key: string]: Certificate[] });

  useEffect(() => {
    const loadAssets = async () => {
      const imagePromises = certifications
        .filter(cert => cert.type === 'image')
        .map(async (cert) => {
          try {
            // Use public assets path
            const imagePath = cert.path.replace('src/assets/', '/assets/');
            return { [cert.path]: imagePath };
          } catch (error) {
            console.error(`Error loading image for ${cert.name}:`, error);
            return { [cert.path]: '' };
          }
        });

      const pdfPromises = certifications
        .filter(cert => cert.type === 'pdf')
        .map(async (cert) => {
          try {
            // Use public assets path
            const pdfPath = cert.path.replace('src/assets/', '/assets/');
            return { [cert.path]: pdfPath };
          } catch (error) {
            console.error(`Error loading PDF for ${cert.name}:`, error);
            return { [cert.path]: '' };
          }
        });

      const [imageResults, pdfResults] = await Promise.all([
        Promise.all(imagePromises),
        Promise.all(pdfPromises)
      ]);

      const images = imageResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      const pdfs = pdfResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});

      setCertificateImages(images);
      setCertificatePdfs(pdfs);
    };

    loadAssets();
  }, [certifications]);

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const renderPreview = (cert: Certificate) => {
    if (cert.type === 'image') {
      return (
        <PreviewContainer>
          <PreviewImage 
            src={certificateImages[cert.path]} 
            alt={cert.name}
          />
        </PreviewContainer>
      );
    } else if (cert.type === 'pdf') {
      return (
        <PreviewContainer>
          <PDFPreview>
            <Document file={certificatePdfs[cert.path]}>
              <Page pageNumber={1} width={280} />
            </Document>
          </PDFPreview>
        </PreviewContainer>
      );
    }
    return null;
  };

  const renderCertificateContent = (cert: Certificate) => {
    if (cert.type === 'image') {
      return (
        <PreviewImage 
          src={certificateImages[cert.path]} 
          alt={cert.name}
          style={{ maxWidth: '100%', maxHeight: '80vh' }}
          onClick={() => window.open(cert.link, '_blank')}
        />
      );
    } else if (cert.type === 'pdf') {
      return (
        <Document file={certificatePdfs[cert.path]}>
          <Page pageNumber={1} width={1000} />
        </Document>
      );
    }
    return null;
  };

  return (
    <TabContent>
      <h2 style={{ padding: '0 2rem' }}>Certifications</h2>
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

      <CertificationsGrid>
        {groupedCertificates[selectedTab]?.map((cert, index) => (
          <CertificateItem 
            key={index}
            onClick={() => handleCertificateClick(cert)}
          >
            {renderPreview(cert)}
            <CertificateDetails>
              <CertificateName>{cert.name}</CertificateName>
              <CertificateInfo>
                {cert.issuingAuthority} • {cert.year}
              </CertificateInfo>
              {cert.link && (
                <VerifyLink 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Verify Certificate
                </VerifyLink>
              )}
            </CertificateDetails>
          </CertificateItem>
        ))}
      </CertificationsGrid>

      {selectedCertificate && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            {renderCertificateContent(selectedCertificate)}
          </ModalContent>
        </Modal>
      )}
    </TabContent>
  );
};

export default Certifications;