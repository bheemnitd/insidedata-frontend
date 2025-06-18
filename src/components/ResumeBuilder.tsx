import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ResumeData, Experience, Education, Skill, Project, Certificate } from '../types/resume';
import { resumeService } from '../services/resumeService';
import { FaFilePdf, FaImage, FaFolder, FaFolderOpen, FaPlus, FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';
// import { FaFolder } from 'react-icons/fa';
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: transparent;
  border-radius: 24px;
  padding: 2rem;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  color: #2d3748;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.15);
    background: white;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 1.1rem;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.15);
    background: white;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: none;
  background: ${props => props.primary ? '#4299e1' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.primary ? 'white' : '#2d3748'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  background: #48bb78;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  display: block;

  &:hover {
    background: #38a169;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
  }
`;

const RemoveButton = styled(Button)`
  background: #f56565;
  margin-top: 1rem;

  &:hover {
    background: #e53e3e;
    box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &.primary {
    background: #64ffda;
    color: #000;
    
    &:hover {
      background: #4cd8b2;
    }
  }

  &.secondary {
    background: transparent;
    color: #64ffda;
    border: 1px solid #64ffda;
    
    &:hover {
      background: #64ffda;
      color: #000;
    }
  }

  &.danger {
    background: #ff4757;
    color: white;
    
    &:hover {
      background: #ff3742;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.25rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:checked {
    background-color: #4299e1;
    border-color: #4299e1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 500;
  user-select: none;
`;

const CertificateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const CertificateCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
`;

const FileUploadArea = styled.div`
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  backdrop-filter: blur(5px);
  
  &.dragging {
    border-color: #4299e1;
    background: rgba(255, 255, 255, 0.9);
  }
`;

const FilePreview = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .pdf-preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(241, 243, 245, 0.5);
    color: #e53e3e;
    font-size: 3rem;
  }
`;

const FolderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  color: #4a5568;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: #4299e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.1);
  }

  svg {
    font-size: 1.25rem;
  }

  &.active {
    background: rgba(66, 153, 225, 0.1);
    border-color: #4299e1;
    color: #2b6cb0;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
`;

const PDFPreview = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const PreviewButton = styled.button`
  background: white;
  color: #2d3748;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;
`;

const SuccessMessage = styled.div`
  background: #2ed573;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface ResumeDocument {
  _id: string;
  username: string;
  password: string;
  data: ResumeData;
}

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [resumeDocument, setResumeDocument] = useState<ResumeDocument>(resumeService.getEmptyResume());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  // Load data from resume.json
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const response = await fetch('/data/resume.json');
        const data = await response.json();
        setResumeDocument({
          _id: 'resume',
          username: '',
          password: '',
          data: data
        });
      } catch (error) {
        console.error('Error loading resume data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, []);

  // Handle file input change for loading resume
  const handleFileLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const data = await resumeService.loadResume(file);
      setResumeDocument(data);
    } catch (err) {
      console.error('Error loading resume:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    setSaving(true);
    try {
      await resumeService.saveResume(resumeDocument);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving resume:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (info: ResumeDocument['data']['personalInfo']) => {
    setResumeDocument(resumeService.updatePersonalInfo(resumeDocument, info));
  };

  // Handle experience changes
  const handleAddExperience = () => {
    const newExperience: Experience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentPosition: false,
      description: "",
      technologies: [],
      achievements: [],
      location: "",
      highlights: []
    };
    setResumeDocument(resumeService.addExperience(resumeDocument, newExperience));
  };

  const handleUpdateExperience = (index: number, experience: Experience) => {
    setResumeDocument(resumeService.updateExperience(resumeDocument, index, experience));
  };

  const handleDeleteExperience = (index: number) => {
    setResumeDocument(resumeService.deleteExperience(resumeDocument, index));
  };

  // Handle education changes
  const handleAddEducation = () => {
    const newEducation: Education = {
      degree: "",
      institution: "",
      year: "",
      description: "",
      gpa: "",
      fieldOfStudy: "",
      location: "",
      achievements: [],
      courses: []
    };
    setResumeDocument(resumeService.addEducation(resumeDocument, newEducation));
  };

  const handleUpdateEducation = (index: number, education: Education) => {
    setResumeDocument(resumeService.updateEducation(resumeDocument, index, education));
  };

  const handleDeleteEducation = (index: number) => {
    setResumeDocument(resumeService.deleteEducation(resumeDocument, index));
  };

  // Handle skills changes
  const handleAddSkillCategory = () => {
    const newSkill: Skill = {
      category: "",
      items: [],
      level: "",
      yearsOfExperience: ""
    };
    setResumeDocument(resumeService.addSkillCategory(resumeDocument, newSkill));
  };

  const handleUpdateSkillCategory = (index: number, skill: Skill) => {
    setResumeDocument(resumeService.updateSkillCategory(resumeDocument, index, skill));
  };

  const handleDeleteSkillCategory = (index: number) => {
    setResumeDocument(resumeService.deleteSkillCategory(resumeDocument, index));
  };

  // Handle projects changes
  const handleAddProject = () => {
    const newProject: Project = {
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      highlights: [],
      role: "",
      teamSize: "",
      achievements: []
    };
    setResumeDocument(resumeService.addProject(resumeDocument, newProject));
  };

  const handleUpdateProject = (index: number, project: Project) => {
    setResumeDocument(resumeService.updateProject(resumeDocument, index, project));
  };

  const handleDeleteProject = (index: number) => {
    setResumeDocument(resumeService.deleteProject(resumeDocument, index));
  };

  // Handle certificate changes
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newCertificates: Certificate[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'pdf',
      file,
      folder: currentFolder || undefined,
      url: URL.createObjectURL(file),
      issueDate: new Date().toISOString(),
      expiryDate: "",
      issuingOrganization: "",
      credentialId: "",
      credentialUrl: ""
    }));

    newCertificates.forEach(cert => {
      setResumeDocument(resumeService.addCertificate(resumeDocument, cert));
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files.length) return;

    const newCertificates: Certificate[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'pdf',
      file,
      folder: currentFolder || undefined,
      url: URL.createObjectURL(file),
      issueDate: new Date().toISOString(),
      expiryDate: "",
      issuingOrganization: "",
      credentialId: "",
      credentialUrl: ""
    }));

    newCertificates.forEach(cert => {
      setResumeDocument(resumeService.addCertificate(resumeDocument, cert));
    });
  };

  const createFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      setCurrentFolder(folderName);
    }
  };

  const removeCertificate = (id: string) => {
    const cert = resumeDocument.data.certificates.find(c => c.id === id);
    if (cert?.url) {
      URL.revokeObjectURL(cert.url);
    }
    setResumeDocument(resumeService.deleteCertificate(resumeDocument, id));
  };

  const groupedCertificates = resumeDocument.data.certificates.reduce((acc, cert) => {
    const folder = cert.folder || 'root';
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);

  // Add these functions to handle previews
  const getFilePreviewUrl = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const isPDF = (file: File): boolean => {
    return file.type === 'application/pdf';
  };

  const isImage = (file: File): boolean => {
    return file.type.startsWith('image/');
  };

  // Update the certificate section JSX
  const renderCertificatePreview = (certificate: Certificate) => {
    if (!certificate.file) return null;

    const previewUrl = getFilePreviewUrl(certificate.file);
    const isPDFFile = isPDF(certificate.file);
    const isImageFile = isImage(certificate.file);

    return (
      <PreviewContainer>
        {isPDFFile ? (
          <PDFPreview src={previewUrl} title={certificate.name} />
        ) : isImageFile ? (
          <ImagePreview src={previewUrl} alt={certificate.name} />
        ) : null}
        <PreviewOverlay onClick={() => window.open(previewUrl, '_blank')}>
          <PreviewButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open in New Tab
          </PreviewButton>
        </PreviewOverlay>
      </PreviewContainer>
    );
  };

  // Update specific section
  const updateSection = (section: string, data: any) => {
    setResumeDocument(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: data
      }
    }));
  };

  // Update specific item in array
  const updateArrayItem = (section: string, index: number, data: any) => {
    setResumeDocument(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: prev.data[section].map((item: any, i: number) => 
          i === index ? { ...item, ...data } : item
        )
      }
    }));
  };

  // Add new item to array
  const addArrayItem = (section: string, newItem: any) => {
    setResumeDocument(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: [...(prev.data[section] || []), newItem]
      }
    }));
  };

  // Remove item from array
  const removeArrayItem = (section: string, index: number) => {
    setResumeDocument(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: prev.data[section].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!resumeDocument) {
    return <Container>Error loading resume data</Container>;
  }

  return (
    <div className="min-h-screen py-12">
      <Container>
        <Header>
          <HeaderTitle>Resume Builder</HeaderTitle>
          <ButtonGroup>
            <ActionButton 
              className="secondary" 
              onClick={() => navigate('/')}
            >
              <FaArrowLeft />
              Back to Portfolio
            </ActionButton>
            <ActionButton 
              className="primary" 
              onClick={handleSave}
              disabled={saving}
            >
              <FaSave />
              {saving ? 'Saving...' : 'Save Changes'}
            </ActionButton>
          </ButtonGroup>
        </Header>

        {showSuccess && (
          <SuccessMessage>
            <FaSave />
            Changes saved successfully!
          </SuccessMessage>
        )}

        <Form>
          <Section>
            <SectionTitle>Personal Information</SectionTitle>
            <SectionContent>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  value={(resumeDocument.data as any).name || ''}
                  onChange={(e) => updateSection('name', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={(resumeDocument.data as any).title || ''}
                  onChange={(e) => updateSection('title', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={(resumeDocument.data as any).personalInfo?.email}
                  onChange={(e) => handlePersonalInfoChange({ ...(resumeDocument.data as any).personalInfo, email: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={(resumeDocument.data as any).personalInfo?.phone}
                  onChange={(e) => handlePersonalInfoChange({ ...(resumeDocument.data as any).personalInfo, phone: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={(resumeDocument.data as any).personalInfo?.location}
                  onChange={(e) => handlePersonalInfoChange({ ...(resumeDocument.data as any).personalInfo, location: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Professional Summary</Label>
                <TextArea
                  name="summary"
                  value={(resumeDocument.data as any).personalInfo?.summary || ''}
                  onChange={(e) => updateSection('summary', e.target.value)}
                  rows={4}
                />
              </FormGroup>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Experience</SectionTitle>
            <SectionContent>
              {(resumeDocument.data as any).experience?.map((exp: any, index: number) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
                  <FormGroup>
                    <Label>Position</Label>
                    <Input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => updateArrayItem('experience', index, { position: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Company</Label>
                    <Input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => updateArrayItem('experience', index, { company: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={exp.startDate || ''}
                      onChange={(e) => updateArrayItem('experience', index, { startDate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={exp.endDate || ''}
                      onChange={(e) => updateArrayItem('experience', index, { endDate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={exp.description || ''}
                      onChange={(e) => updateArrayItem('experience', index, { description: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Technologies</Label>
                    <Input
                      type="text"
                      value={exp.technologies?.join(', ') || ''}
                      onChange={(e) => updateArrayItem('experience', index, { technologies: e.target.value.split(',').map((tech: string) => tech.trim()) })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => updateArrayItem('experience', index, { location: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Highlights</Label>
                    <TextArea
                      value={exp.highlights?.join('\n') || ''}
                      onChange={(e) => updateArrayItem('experience', index, { highlights: e.target.value.split('\n').map((highlight: string) => highlight.trim()) })}
                    />
                  </FormGroup>
                  <ActionButton 
                    type="button"
                    className="danger"
                    onClick={() => removeArrayItem('experience', index)}
                  >
                    <FaTrash />
                    Remove Experience
                  </ActionButton>
                </div>
              ))}
            </SectionContent>
            <ButtonGroup>
              <ActionButton 
                type="button" 
                className="primary"
                onClick={() => addArrayItem('experience', {
                  position: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  isCurrentPosition: false,
                  description: '',
                  technologies: [],
                  location: '',
                  highlights: []
                })}
              >
                <FaPlus />
                Add Experience
              </ActionButton>
            </ButtonGroup>
          </Section>

          <Section>
            <SectionTitle>Education</SectionTitle>
            <SectionContent>
              {(resumeDocument.data as any).education?.map((edu: any, index: number) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
                  <FormGroup>
                    <Label>Degree</Label>
                    <Input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => updateArrayItem('education', index, { degree: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Institution</Label>
                    <Input
                      type="text"
                      value={edu.institution || ''}
                      onChange={(e) => updateArrayItem('education', index, { institution: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Year</Label>
                    <Input
                      type="text"
                      value={edu.year || ''}
                      onChange={(e) => updateArrayItem('education', index, { year: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={edu.description || ''}
                      onChange={(e) => updateArrayItem('education', index, { description: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>GPA</Label>
                    <Input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateArrayItem('education', index, { gpa: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Field of Study</Label>
                    <Input
                      type="text"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => updateArrayItem('education', index, { fieldOfStudy: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Location</Label>
                    <Input
                      type="text"
                      value={edu.location || ''}
                      onChange={(e) => updateArrayItem('education', index, { location: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Achievements</Label>
                    <TextArea
                      value={edu.achievements?.join('\n') || ''}
                      onChange={(e) => updateArrayItem('education', index, { achievements: e.target.value.split('\n').map((achievement: string) => achievement.trim()) })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Courses</Label>
                    <TextArea
                      value={edu.courses?.join('\n') || ''}
                      onChange={(e) => updateArrayItem('education', index, { courses: e.target.value.split('\n').map((course: string) => course.trim()) })}
                    />
                  </FormGroup>
                  <ActionButton 
                    type="button"
                    className="danger"
                    onClick={() => removeArrayItem('education', index)}
                  >
                    <FaTrash />
                    Remove Education
                  </ActionButton>
                </div>
              ))}
            </SectionContent>
            <ButtonGroup>
              <ActionButton 
                type="button" 
                className="primary"
                onClick={() => addArrayItem('education', {
                  degree: '',
                  institution: '',
                  year: '',
                  description: '',
                  gpa: '',
                  fieldOfStudy: '',
                  location: '',
                  achievements: [],
                  courses: []
                })}
              >
                <FaPlus />
                Add Education
              </ActionButton>
            </ButtonGroup>
          </Section>

          <Section>
            <SectionTitle>Skills</SectionTitle>
            <SectionContent>
              {Object.keys(resumeDocument.data).filter(key => 
                ['programmingLanguages', 'frameworksAndLibraries', 'tools', 'technologies', 'os'].includes(key)
              ).map(skillType => (
                <div key={skillType} style={{ marginBottom: '2rem' }}>
                  <Label style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
                    {skillType.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <TextArea
                    value={(resumeDocument.data as any)[skillType]?.join('\n') || ''}
                    onChange={(e) => updateSection(skillType, e.target.value.split('\n').filter(item => item.trim()))}
                    rows={4}
                    placeholder="Enter skills, one per line"
                  />
                </div>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Projects</SectionTitle>
            <SectionContent>
              {(resumeDocument.data as any).projects?.map((project: any, index: number) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={project.name || ''}
                      onChange={(e) => updateArrayItem('projects', index, { name: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={project.description || ''}
                      onChange={(e) => updateArrayItem('projects', index, { description: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Technologies</Label>
                    <Input
                      type="text"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => updateArrayItem('projects', index, { technologies: e.target.value.split(',').map((tech: string) => tech.trim()) })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Link</Label>
                    <Input
                      type="text"
                      value={project.link || ''}
                      onChange={(e) => updateArrayItem('projects', index, { link: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={project.startDate || ''}
                      onChange={(e) => updateArrayItem('projects', index, { startDate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={project.endDate || ''}
                      onChange={(e) => updateArrayItem('projects', index, { endDate: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      type="text"
                      value={project.role || ''}
                      onChange={(e) => updateArrayItem('projects', index, { role: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Team Size</Label>
                    <Input
                      type="text"
                      value={project.teamSize || ''}
                      onChange={(e) => updateArrayItem('projects', index, { teamSize: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Achievements</Label>
                    <TextArea
                      value={project.achievements?.join('\n') || ''}
                      onChange={(e) => updateArrayItem('projects', index, { achievements: e.target.value.split('\n').map((achievement: string) => achievement.trim()) })}
                    />
                  </FormGroup>
                  <ActionButton 
                    type="button"
                    className="danger"
                    onClick={() => removeArrayItem('projects', index)}
                  >
                    <FaTrash />
                    Remove Project
                  </ActionButton>
                </div>
              ))}
            </SectionContent>
            <ButtonGroup>
              <ActionButton 
                type="button" 
                className="primary"
                onClick={() => addArrayItem('projects', {
                  name: '',
                  description: '',
                  technologies: [],
                  link: '',
                  startDate: '',
                  endDate: '',
                  isOngoing: false,
                  highlights: [],
                  role: '',
                  teamSize: '',
                  achievements: []
                })}
              >
                <FaPlus />
                Add Project
              </ActionButton>
            </ButtonGroup>
          </Section>

          <Section>
            <SectionTitle>Certificates & Documents</SectionTitle>

            <div className="flex gap-4 mb-6">
              {/* <FolderButton onClick={createFolder}>
                <FaFolder className="text-yellow-500" />
                Create New Folder
              </FolderButton> */}

              {/* {currentFolder && (
                <FolderButton onClick={() => setCurrentFolder('')}>
                  <FaFolderOpen className="text-blue-500" />
                  {currentFolder}
                </FolderButton>
              )} */}
            </div>

            <FileUploadArea
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={isDragging ? 'dragging' : ''}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="text-gray-600">
                <p className="text-lg font-medium mb-2">Drag & Drop files here</p>
                <p className="text-sm">or click to browse</p>
                <p className="text-xs text-gray-500 mt-2">Supports PDF and Images</p>
              </div>
            </FileUploadArea>

            {Object.entries(groupedCertificates).map(([folder, certs]) => (
              <div key={folder} className="mt-6">
                {/* <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {folder === 'root' ? 'Root' : folder}
                  <span>
                    <FaFolder className="text-yellow-500" />
                  </span>
                </h3> */}
                <CertificateGrid>
                  {certs.map(cert => (
                    <CertificateCard key={cert.id}>
                      {renderCertificatePreview(cert)}
                      <div className="mt-3">
                        <p className="font-medium text-gray-800 truncate">{cert.name}</p>
                        <div className="flex gap-2 mt-2">
                          <ActionButton
                            className="edit"
                            onClick={() => window.open(cert.url, '_blank')}
                          >
                            View
                          </ActionButton>
                          <ActionButton
                            className="delete"
                            onClick={() => removeCertificate(cert.id)}
                          >
                            Remove
                          </ActionButton>
                        </div>
                      </div>
                    </CertificateCard>
                  ))}
                </CertificateGrid>
              </div>
            ))}
          </Section>
        </Form>
      </Container>
    </div>
  );
};

export default ResumeBuilder; 