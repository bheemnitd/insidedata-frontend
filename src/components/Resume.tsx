import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs, PDFDocumentProxy } from 'react-pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const TabContent = styled.div`
  padding: 2rem;
  background: transparent;
  border-radius: 12px;
  box-shadow: none;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Resume: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number } | null>(null);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);

    // Get the dimensions of the first page
    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      setPdfDimensions({ width: viewport.width, height: viewport.height });
    });
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    // Simulate fetching the PDF URL (replace with actual logic)
    const fetchPdfUrl = async () => {
      const response = await fetch('/path/to/your/pdf'); // Replace with actual path
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    fetchPdfUrl();
  }, []);

  return (
    <TabContent>
      <PreviewContainer>
        <Controls>
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || prev))}
            disabled={pageNumber >= (numPages || 1)}
          >
            Next
          </Button>
          <Button onClick={handleDownload}>Download PDF</Button>
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
                width={pdfDimensions?.width || 600} // Dynamically adjust width
                height={pdfDimensions?.height || undefined} // Dynamically adjust height
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