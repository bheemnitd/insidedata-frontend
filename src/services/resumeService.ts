import { ResumeData, Experience, Education, Skill, Project, Certificate } from '../types/resume';

interface ResumeDocument {
  _id: string;
  username: string;
  password: string;
  data: ResumeData;
}

class ResumeService {
  private readonly FILE_NAME = 'resume.json';

  // Save resume data to a file
  async saveResume(data: ResumeDocument): Promise<void> {
    try {
      // Add metadata
      const updatedData = {
        ...data,
        data: {
          ...data.data,
          metadata: {
            ...data.data.metadata,
            lastUpdated: new Date().toISOString(),
            version: "1.0"
          }
        }
      };

      // Convert data to JSON string with proper formatting
      const jsonString = JSON.stringify(updatedData, null, 2);
      
      // Create a Blob with the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.FILE_NAME;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  }

  // Load resume data from a file
  async loadResume(file: File): Promise<ResumeDocument> {
    try {
      const text = await file.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Error loading resume:', error);
      throw error;
    }
  }

  // Get empty resume structure
  getEmptyResume(): ResumeDocument {
    return {
      _id: Math.random().toString(36).substr(2, 9),
      username: "",
      password: "",
      data: {
        personalInfo: {
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
          linkedin: "",
          github: "",
          profilePicture: "",
          website: "",
          socialLinks: {
            twitter: "",
            facebook: "",
            instagram: ""
          }
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certificates: [],
        languages: [],
        publications: [],
        volunteerWork: [],
        awards: [],
        references: [],
        customSections: [],
        preferences: {
          theme: "light",
          fontSize: "medium",
          layout: "modern",
          colorScheme: "blue",
          showProfilePicture: true,
          showSocialLinks: true,
          showReferences: false,
          showCustomSections: true
        },
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: "1.0",
          createdAt: new Date().toISOString(),
          lastModifiedBy: "",
          template: "default"
        }
      }
    };
  }

  // Personal Info CRUD
  updatePersonalInfo(resume: ResumeDocument, info: ResumeDocument['data']['personalInfo']): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        personalInfo: info
      }
    };
  }

  // Experience CRUD
  addExperience(resume: ResumeDocument, experience: Experience): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        experience: [...resume.data.experience, experience]
      }
    };
  }

  updateExperience(resume: ResumeDocument, index: number, experience: Experience): ResumeDocument {
    const updatedExperience = [...resume.data.experience];
    updatedExperience[index] = experience;
    return {
      ...resume,
      data: {
        ...resume.data,
        experience: updatedExperience
      }
    };
  }

  deleteExperience(resume: ResumeDocument, index: number): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        experience: resume.data.experience.filter((_, i) => i !== index)
      }
    };
  }

  // Education CRUD
  addEducation(resume: ResumeDocument, education: Education): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        education: [...resume.data.education, education]
      }
    };
  }

  updateEducation(resume: ResumeDocument, index: number, education: Education): ResumeDocument {
    const updatedEducation = [...resume.data.education];
    updatedEducation[index] = education;
    return {
      ...resume,
      data: {
        ...resume.data,
        education: updatedEducation
      }
    };
  }

  deleteEducation(resume: ResumeDocument, index: number): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        education: resume.data.education.filter((_, i) => i !== index)
      }
    };
  }

  // Skills CRUD
  addSkillCategory(resume: ResumeDocument, skill: Skill): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        skills: [...resume.data.skills, skill]
      }
    };
  }

  updateSkillCategory(resume: ResumeDocument, index: number, skill: Skill): ResumeDocument {
    const updatedSkills = [...resume.data.skills];
    updatedSkills[index] = skill;
    return {
      ...resume,
      data: {
        ...resume.data,
        skills: updatedSkills
      }
    };
  }

  deleteSkillCategory(resume: ResumeDocument, index: number): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        skills: resume.data.skills.filter((_, i) => i !== index)
      }
    };
  }

  // Projects CRUD
  addProject(resume: ResumeDocument, project: Project): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        projects: [...resume.data.projects, project]
      }
    };
  }

  updateProject(resume: ResumeDocument, index: number, project: Project): ResumeDocument {
    const updatedProjects = [...resume.data.projects];
    updatedProjects[index] = project;
    return {
      ...resume,
      data: {
        ...resume.data,
        projects: updatedProjects
      }
    };
  }

  deleteProject(resume: ResumeDocument, index: number): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        projects: resume.data.projects.filter((_, i) => i !== index)
      }
    };
  }

  // Certificates CRUD
  addCertificate(resume: ResumeDocument, certificate: Certificate): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        certificates: [...resume.data.certificates, certificate]
      }
    };
  }

  updateCertificate(resume: ResumeDocument, id: string, certificate: Certificate): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        certificates: resume.data.certificates.map(cert => 
          cert.id === id ? certificate : cert
        )
      }
    };
  }

  deleteCertificate(resume: ResumeDocument, id: string): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        certificates: resume.data.certificates.filter(cert => cert.id !== id)
      }
    };
  }

  // Languages CRUD
  addLanguage(resume: ResumeDocument, language: ResumeDocument['data']['languages'][0]): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        languages: [...resume.data.languages, language]
      }
    };
  }

  updateLanguage(resume: ResumeDocument, index: number, language: ResumeDocument['data']['languages'][0]): ResumeDocument {
    const updatedLanguages = [...resume.data.languages];
    updatedLanguages[index] = language;
    return {
      ...resume,
      data: {
        ...resume.data,
        languages: updatedLanguages
      }
    };
  }

  deleteLanguage(resume: ResumeDocument, index: number): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        languages: resume.data.languages.filter((_, i) => i !== index)
      }
    };
  }

  // Update preferences
  updatePreferences(resume: ResumeDocument, preferences: ResumeDocument['data']['preferences']): ResumeDocument {
    return {
      ...resume,
      data: {
        ...resume.data,
        preferences
      }
    };
  }
}

export const resumeService = new ResumeService(); 