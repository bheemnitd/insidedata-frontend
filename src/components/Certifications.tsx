import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const TabContent = styled.div`
  padding: 2rem;
  background: transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  h2 {
    color: white;
    margin-bottom: 2rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: transparent;
  border: none;
  color: #64ffda;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #64ffda;
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
  // border-bottom: 2px solid #00fff7;
`;

const CertificateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CertificateItem = styled.div`
  // background: rgba(255, 255, 255, 0.05);
  // border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 4px solid #64ffda;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 400px;
  background: transparent;
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
  background: #f5f5f5;
  padding: 0;

  .react-pdf__Document {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
  }

  .react-pdf__Page {
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background: white;
    position: relative;
  }

  .react-pdf__Page canvas {
    max-width: 100%;
    height: auto !important;
  }

  .react-pdf__Page__textContent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.2;
    line-height: 1.0;
  }

  .react-pdf__Page__textContent span {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }

  .react-pdf__Page__annotations {
    display: none;
  }
`;

const CertificateDetails = styled.div`
  color: white;
`;

const CertificateName = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #64ffda;
`;

const CertificateInfo = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #ccc;
`;

const VerifyLink = styled.a`
  color: #64ffda;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #4cd8b2;
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
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
  position: relative;

  .react-pdf__Document {
    background: #f5f5f5;
  }

  .react-pdf__Page {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
  }

  .react-pdf__Page__textContent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.2;
    line-height: 1.0;
  }

  .react-pdf__Page__textContent span {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color:rgb(255, 0, 0);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1;
`;

const PDFFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
`;

const DownloadButton = styled.a`
  background: #64ffda;
  color: #0a192f;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #4cd8b2;
    transform: translateY(-2px);
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  cursor: pointer;
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
  const [selectedTab, setSelectedTab] = useState<string>('ai');
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
      console.log('Loading assets for certifications:', certifications.length);
      
      const imagePromises = certifications
        .filter(cert => cert.type === 'image')
        .map(async (cert) => {
          try {
            // For images, use the public path
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
            // For PDFs, use the public path and encode spaces
            const pdfPath = cert.path.replace('src/assets/', '/assets/');
            // Encode the URL to handle spaces and special characters
            const encodedPath = encodeURI(pdfPath);
            // Remove cache-busting as it might cause issues
            const pdfUrl = encodedPath;
            console.log(`Loading PDF: ${pdfUrl} for ${cert.name}`); // Debug log
            
            // Test if the PDF is accessible
            try {
              const response = await fetch(pdfUrl, { method: 'HEAD' });
              if (!response.ok) {
                console.warn(`PDF not accessible: ${pdfUrl} (${response.status})`);
              } else {
                console.log(`PDF accessible: ${pdfUrl}`);
              }
            } catch (fetchError) {
              console.warn(`Error checking PDF accessibility: ${pdfUrl}`, fetchError);
            }
            
            return { [cert.path]: pdfUrl };
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

      console.log('Loaded images:', Object.keys(images).length);
      console.log('Loaded PDFs:', Object.keys(pdfs).length);

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
      const pdfUrl = certificatePdfs[cert.path];
      if (!pdfUrl) {
        return <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading PDF...</div>;
      }
      return (
        <PreviewContainer>
          <PDFPreview>
            <Document 
              file={pdfUrl}
              loading={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading PDF...</div>}
              error={
                <PDFFallback>
                  <div>Unable to preview PDF</div>
                  <DownloadButton href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    Download PDF
                  </DownloadButton>
                </PDFFallback>
              }
              onLoadSuccess={() => console.log(`PDF loaded successfully: ${cert.name}`)}
              onLoadError={(error) => {
                console.error(`PDF load error for ${cert.name}:`, error);
                console.error(`PDF URL: ${pdfUrl}`);
              }}
            >
              <Page 
                pageNumber={1} 
                width={350}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={1.0}
                onLoadSuccess={() => console.log(`PDF page loaded successfully: ${cert.name}`)}
                onLoadError={(error) => {
                  console.error(`PDF page load error for ${cert.name}:`, error);
                  // If page fails to load, show download option
                  return (
                    <PDFFallback>
                      <div>Unable to preview PDF page</div>
                      <DownloadButton href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        Download PDF
                      </DownloadButton>
                    </PDFFallback>
                  );
                }}
              />
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
        <ModalImage
          src={certificateImages[cert.path]}
          alt={cert.name}
          onClick={() => window.open(cert.link, '_blank')}
        />
      );
    } else if (cert.type === 'pdf') {
      const pdfUrl = certificatePdfs[cert.path];
      if (!pdfUrl) {
        return <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading PDF...</div>;
      }
      return (
        <Document
          file={pdfUrl}
          loading={<div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading PDF...</div>}
          error={
            <PDFFallback>
              <div>Unable to preview PDF</div>
              <DownloadButton href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Download PDF
              </DownloadButton>
            </PDFFallback>
          }
          onLoadSuccess={() => console.log(`PDF loaded successfully in modal: ${cert.name}`)}
          onLoadError={(error) => {
            console.error(`PDF load error in modal for ${cert.name}:`, error);
            console.error(`PDF URL: ${pdfUrl}`);
          }}
        >
          <Page
            pageNumber={1}
            width={1000}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={1.0}
            onLoadSuccess={() => console.log(`PDF page loaded successfully in modal: ${cert.name}`)}
            onLoadError={(error) => console.error(`PDF page load error in modal for ${cert.name}:`, error)}
          />
        </Document>
      );
    }
    return null;
  };

  return (
    <TabContent>
      <h2>Certifications</h2>
      <TabContainer>
        {Object.entries(categoryNames).map(([key, name]) => (
          <TabButton
            key={key}
            active={selectedTab === key}
            onClick={() => setSelectedTab(key)}
          >
            {name}
          </TabButton>
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