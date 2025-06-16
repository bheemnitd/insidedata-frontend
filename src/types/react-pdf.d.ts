declare module 'react-pdf' {
  import { ComponentType, ReactElement } from 'react';

  export interface PDFDocumentProxy {
    numPages: number;
    getPage: (pageNumber: number) => Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getViewport: (params: { scale: number; rotation?: number }) => PDFPageViewport;
  }

  export interface PDFPageViewport {
    width: number;
    height: number;
  }

  export interface DocumentProps {
    file: string | File | Blob | null;
    onLoadSuccess?: (pdf: PDFDocumentProxy) => void;
    onLoadError?: (error: Error) => void;
    loading?: ReactElement | string;
    error?: ReactElement | string;
    children?: ReactElement | ReactElement[];
  }

  export interface PageProps {
    pageNumber: number;
    width?: number;
    height?: number;
    scale?: number;
    rotate?: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    customTextRenderer?: (textItem: any) => ReactElement;
    onLoadSuccess?: (page: PDFPageProxy) => void;
    onLoadError?: (error: Error) => void;
    loading?: ReactElement | string;
    error?: ReactElement | string;
  }

  export const Document: ComponentType<DocumentProps>;
  export const Page: ComponentType<PageProps>;
  export const pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: string;
    };
    version: string;
  };
} 