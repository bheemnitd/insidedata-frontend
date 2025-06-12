export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
  gpa?: string;
  fieldOfStudy?: string;
  location?: string;
  achievements?: string[];
  courses?: string[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentPosition: boolean;
  description: string;
  technologies: string[];
  achievements?: string[];
  location?: string;
  highlights?: string[];
}

export interface Skill {
  category: string;
  items: string[];
  level?: string;
  yearsOfExperience?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
  isOngoing?: boolean;
  highlights?: string[];
  role?: string;
  teamSize?: string;
  achievements?: string[];
}

export interface Certificate {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  file: File;
  folder?: string;
  url?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingOrganization?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  name: string;
  proficiency: string;
  certification?: string;
}

export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  date: string;
  doi?: string;
  url?: string;
  abstract?: string;
}

export interface VolunteerWork {
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomSection {
  title: string;
  items: any[];
}

export interface Preferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  layout: 'modern' | 'classic' | 'minimal';
  colorScheme: string;
  showProfilePicture: boolean;
  showSocialLinks: boolean;
  showReferences: boolean;
  showCustomSections: boolean;
}

export interface Metadata {
  lastUpdated: string;
  version: string;
  createdAt: string;
  lastModifiedBy: string;
  template: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
    profilePicture?: string;
    website?: string;
    socialLinks: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  publications: Publication[];
  volunteerWork: VolunteerWork[];
  awards: Award[];
  references: Reference[];
  customSections: CustomSection[];
  preferences: Preferences;
  metadata: Metadata;
}

export interface ResumeDocument {
  _id: string;
  username: string;
  password: string;
  data: ResumeData;
} 