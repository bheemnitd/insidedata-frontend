import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Contacts from "./Contacts";
import Badges from "./Badges";
import Resume from "./Resume";
import Educations from "./Educations";

// Styled components
const Container = styled.div`
  padding: 0;
  margin: 0;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavBrand = styled.a`
  font-weight: 700;
  color: #333;
  text-decoration: none;
  font-size: 1.5rem;
  &:hover {
    color: #00fff7;
  }
`;

const NavLink = styled.a<{ active?: boolean; disabled?: boolean }>`
  color: ${props => props.active ? '#00fff7' : props.disabled ? '#999' : '#666'};
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  
  &:hover {
    color: ${props => props.disabled ? '#999' : '#00fff7'};
  }
`;

const ContentContainer = styled.div`
  height: 94vh;
  margin-top: 6vh;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  
  /* Add a semi-transparent background to content sections */
  > div {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #dc3545;
`;

function Portfolio() {
    const [activeTab, setActiveTab] = useState('about');
    const [resumeData, setResumeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const response = await fetch('/data/resume.json');
                const data = await response.json();
                const filteredResume = data.resumes.find(
                    (resume: any) => resume.username === 'bheem.kumar' && resume.password === '12'
                );
                if (filteredResume) {
                    setResumeData(filteredResume.data);
                } else {
                    setError('Resume data not found');
                }
            } catch (err) {
                setError('Error fetching resume data');
                console.error('Error fetching resume data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResumeData();
    }, []);

    const handleTabClick = (tabName: string) => {
        if (tabName === 'resume') return; // Prevent clicking on resume tab
        setActiveTab(tabName);
    };

    if (loading) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    if (error) {
        return <ErrorContainer>Error: {error}</ErrorContainer>;
    }

    const renderTabContent = () => {
        if (!resumeData) return null;

        switch (activeTab) {
            case 'about':
                return <About />;
            case 'education':
                return <Educations education={resumeData.education} />;
            case 'experience':
                return <Experiences workExperience={resumeData.workExperience} />;
            case 'projects':
                return <Projects projects={resumeData.projects} />;
            case 'skills':
                return <Skills skills={{
                    programmingLanguages: resumeData.programmingLanguages,
                    frameworksAndLibraries: resumeData.frameworksAndLibraries,
                    tools: resumeData.tools,
                    technologies: resumeData.technologies,
                    os: resumeData.os
                }} />;
            case 'certifications':
                return <Certifications certifications={resumeData.certifications} />;
            case 'badges':
                return <Badges />;
            case 'contact':
                return <Contacts contact={resumeData.contact} />;
            case 'resume':
                return <Resume />;
            default:
                return <About />;
        }
    };

    return (
        <Container>
            <Navbar className="navbar navbar-expand-sm fixed-top">
                <div className="container-fluid">
                    <NavBrand href="#">{resumeData?.personalInfo?.name || 'BHEEM KUMAR'}</NavBrand>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'about'} 
                                    onClick={() => handleTabClick('about')}
                                >
                                    ABOUT
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'education'} 
                                    onClick={() => handleTabClick('education')}
                                >
                                    EDUCATION
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'experience'} 
                                    onClick={() => handleTabClick('experience')}
                                >
                                    EXPERIENCE
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'projects'} 
                                    onClick={() => handleTabClick('projects')}
                                >
                                    PROJECTS
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'skills'} 
                                    onClick={() => handleTabClick('skills')}
                                >
                                    SKILLS
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'certifications'} 
                                    onClick={() => handleTabClick('certifications')}
                                >
                                    CERTIFICATIONS
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'contact'} 
                                    onClick={() => handleTabClick('contact')}
                                >
                                    CONTACT
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    active={activeTab === 'resume'} 
                                    onClick={() => handleTabClick('resume')}
                                    disabled={true}
                                    title="Resume feature is currently disabled"
                                >
                                    DOWNLOAD RESUME
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>
            <ContentContainer>
                {renderTabContent()}
            </ContentContainer>
        </Container>
    );
}

export default Portfolio;