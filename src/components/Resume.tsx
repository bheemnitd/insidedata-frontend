import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs, PDFDocumentProxy } from 'react-pdf';
// @ts-ignore
import { jsPDF } from 'jspdf';
// @ts-ignore
import 'jspdf-autotable';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const TabContent = styled.div`
  padding: 2rem;
  background: transparent;
  border-radius: 12px;
  box-shadow: none;

  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1rem;
  }

  .react-pdf__Page {
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .react-pdf__Page canvas {
    max-width: 100%;
    height: auto !important;
  }

  .react-pdf__Page__textContent {
    position: absolute;
    left: 0;
    top: 0;
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

  .react-pdf__Page__annotations.annotationLayer {
    padding: 20px;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #00fff7;
  color: #111;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00d4c7;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 255, 247, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const PDFContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  .react-pdf__Document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .react-pdf__Page {
    margin: 1rem 0;
  }
`;

interface ResumeData {
  personalInfo: {
    name: string;
    intro: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    github: string;
    portfolio: string;
  };
  education: Array<{
    degree: string;
    college: string;
    year: string;
  }>;
  workExperience: Array<{
    position: string;
    company: string;
    link: string;
    year: string;
    description: string;
  }>;
  programmingLanguages: string[];
  tools: string[];
  technologies: string[];
  os: string[];
  frameworksAndLibraries: string[];
  projects: Array<{
    name: string;
    company: string;
    description: string;
    tools: string;
    started: string;
    ended: string;
  }>;
  certifications: Array<{
    name: string;
    issuingAuthority: string;
    year: string;
    image: string;
    link: string;
  }>;
}

const Resume: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/data/resume.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredResume = data.resumes.find(
          (resume: any) => resume.username === 'bheem.kumar' && resume.password === '12'
        );
        if (filteredResume) {
          setResumeData(filteredResume.data);
          generatePDF(filteredResume.data);
        } else {
          setError('Resume data not found');
        }
      } catch (err) {
        setError('Error fetching resume data: ' + (err instanceof Error ? err.message : String(err)));
        console.error('Error fetching resume data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const generatePDF = (data: ResumeData) => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(24);
      doc.text(data.personalInfo.name, 20, 20);
      
      // Add contact info
      doc.setFontSize(12);
      doc.setTextColor(60);
      const contactInfo = [
        `Email: ${data.contact.email}`,
        `Phone: ${data.contact.phone}`,
        `Location: ${data.contact.address}`,
        `LinkedIn: ${data.contact.linkedIn}`,
        `GitHub: ${data.contact.github}`,
        `Portfolio: ${data.contact.portfolio}`
      ];
      doc.text(contactInfo, 20, 30);
      
      // Add introduction
      doc.setFontSize(12);
      doc.setTextColor(40);
      const introLines = doc.splitTextToSize(data.personalInfo.intro, 170);
      doc.text(introLines, 20, 70);
      
      // Add work experience
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text('Work Experience', 20, 90);
      
      let yPos = 100;
      data.workExperience.forEach((exp) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.text(exp.position, 20, yPos);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`${exp.company} | ${exp.year}`, 20, yPos + 7);
        doc.setTextColor(60);
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, yPos + 15);
        yPos += 15 + (descLines.length * 7) + 10;
      });
      
      // Add skills
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text('Skills', 20, 20);
      
      yPos = 30;
      const skillCategories = [
        { title: 'Programming Languages', skills: data.programmingLanguages },
        { title: 'Tools', skills: data.tools },
        { title: 'Technologies', skills: data.technologies },
        { title: 'Operating Systems', skills: data.os },
        { title: 'Frameworks & Libraries', skills: data.frameworksAndLibraries }
      ];
      
      skillCategories.forEach(({ title, skills }) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.text(title, 20, yPos);
        doc.setFontSize(12);
        doc.setTextColor(60);
        doc.text(skills.join(', '), 20, yPos + 7);
        yPos += 20;
      });
      
      // Add projects
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text('Projects', 20, 20);
      
      yPos = 30;
      data.projects.forEach((project) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.text(project.name, 20, yPos);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`${project.company} | ${project.started} - ${project.ended}`, 20, yPos + 7);
        doc.setTextColor(60);
        const descLines = doc.splitTextToSize(project.description, 170);
        doc.text(descLines, 20, yPos + 15);
        doc.text(`Tools: ${project.tools}`, 20, yPos + 15 + (descLines.length * 7));
        yPos += 15 + (descLines.length * 7) + 20;
      });
      
      // Add certifications
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(0);
      doc.text('Certifications', 20, 20);
      
      yPos = 30;
      data.certifications.forEach((cert) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.text(cert.name, 20, yPos);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`${cert.issuingAuthority} | ${cert.year}`, 20, yPos + 7);
        yPos += 20;
      });
      
      // Save the PDF
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Error generating PDF: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${resumeData?.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  };

  if (loading) {
    return <TabContent>Loading...</TabContent>;
  }

  if (error) {
    return <TabContent>Error: {error}</TabContent>;
  }

  return (
    <TabContent>
      <PreviewContainer>
        <Controls>
          <Button 
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
            disabled={pageNumber >= (numPages || 1)}
          >
            Next
          </Button>
          <Button onClick={handleDownload}>
            Download PDF
          </Button>
        </Controls>
        <PDFContainer>
          {pdfUrl && (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading="Loading PDF..."
            >
              <Page 
                pageNumber={pageNumber} 
                width={600}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          )}
        </PDFContainer>
        {numPages && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
      </PreviewContainer>
    </TabContent>
  );
};

export default Resume; 