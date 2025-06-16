import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { 
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiC, SiHtml5, SiCss3, SiMysql, SiMongodb, 
  SiDocker, SiRedis, SiCelery, SiGit, SiPostman, SiJira, SiPycharm, 
  SiJupyter, SiGooglecolab, SiDjango, SiFlask, SiFastapi, SiPandas, 
  SiNumpy, SiTensorflow, SiOpencv, SiScikitlearn, SiBootstrap, SiJquery, 
  SiReact, SiLinux, SiApple, SiNodemon, SiNpm, SiPostgresql,
  SiAmazon, SiDatabricks, SiSwagger, SiOpenapiinitiative
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCode, FaTools, FaLaptopCode, FaJava, FaMicrosoft, FaWindows, FaCodeBranch } from 'react-icons/fa';

const TabContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const CategoryTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #00fff7;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: #444;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
`;

interface SkillsData {
  programmingLanguages: string[];
  frameworksAndLibraries: string[];
  tools: string[];
  technologies: string[];
  os: string[];
}

interface SkillsProps {
  skills: SkillsData;
}

// Icon mapping for different skills
const skillIcons: { [key: string]: IconType } = {
  // Programming Languages
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Java': FaJava,
  'C': SiC,
  'C++': SiCplusplus,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'SQL': FaDatabase,
  'NoSQL': FaDatabase,

  // Databases
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,

  // Tools
  'Docker': SiDocker,
  'Redis': SiRedis,
  'Celery': SiCelery,
  'GIT': SiGit,
  'Excel': FaMicrosoft,
  'Postman': SiPostman,
  'Jira': SiJira,
  'Pycharm': SiPycharm,
  'VS Code': FaCodeBranch,
  'Jupyter notebook': SiJupyter,
  'Colab': SiGooglecolab,

  // Frameworks & Libraries
  'Django': SiDjango,
  'Flask': SiFlask,
  'FastAPI': SiFastapi,
  'DjangoRestFramework': SiDjango,
  'PySpark': FaServer,
  'OpenAPI': SiOpenapiinitiative,
  'Numpy': SiNumpy,
  'Pandas': SiPandas,
  'Tensorflow': SiTensorflow,
  'Keras': SiTensorflow,
  'OpenCV': SiOpencv,
  'Sklearn': SiScikitlearn,
  'Bootstrap': SiBootstrap,
  'Jquery': SiJquery,
  'React': SiReact,
  'ReactJS': SiReact,

  // Operating Systems
  'Linux': SiLinux,
  'Mac': SiApple,
  'Windows': FaWindows,

  // AWS Services
  'AWS Lambda': SiAmazon,
  'AWS Glue': SiAmazon,
  'AWS Athena': SiAmazon,
  'AWS S3': SiAmazon,

  // Azure Services
  'Azure Databricks': FaServer,
  'Azure Pipeline': FaServer,
  'Azure Blob': FaServer,

  // Default icons for other technologies
  'Agile Methodology': FaTools,
  'System Design': FaLaptopCode,
  'Software Design': FaCode,
  'Project Deployment': FaServer,
  'Async Paradigm': FaCode,
  'Multitasking': FaTools,
  'OOPS': FaCode,
  'Data structures': FaCode,
  'Algorithms': FaCode,
  'Data Visualisation': FaTools,
  'ORM': FaDatabase,
  'Unit Testing': FaTools,
};

// Color mapping for different skill categories
const skillColors: { [key: string]: string } = {
  // Programming Languages
  'Python': '#3776AB',
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Java': '#007396',
  'C': '#A8B9CC',
  'C++': '#00599C',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'SQL': '#336791',
  'NoSQL': '#336791',

  // Databases
  'MySQL': '#4479A1',
  'MongoDB': '#47A248',
  'PostgreSQL': '#336791',

  // Tools
  'Docker': '#2496ED',
  'Redis': '#DC382D',
  'Celery': '#37814A',
  'GIT': '#F05032',
  'Excel': '#217346',
  'Postman': '#FF6C37',
  'Jira': '#0052CC',
  'Pycharm': '#000000',
  'VS Code': '#007ACC',
  'Jupyter notebook': '#F37626',
  'Colab': '#F9AB00',

  // Frameworks & Libraries
  'Django': '#092E20',
  'Flask': '#000000',
  'FastAPI': '#009688',
  'DjangoRestFramework': '#092E20',
  'PySpark': '#E25A1C',
  'OpenAPI': '#6BA539',
  'Numpy': '#013243',
  'Pandas': '#150458',
  'Tensorflow': '#FF6F00',
  'Keras': '#D00000',
  'OpenCV': '#5C3EE8',
  'Sklearn': '#F7931E',
  'Bootstrap': '#7952B3',
  'Jquery': '#0769AD',
  'React': '#61DAFB',
  'ReactJS': '#61DAFB',

  // Operating Systems
  'Linux': '#FCC624',
  'Mac': '#000000',
  'Windows': '#0078D6',

  // AWS Services
  'AWS Lambda': '#FF9900',
  'AWS Glue': '#FF9900',
  'AWS Athena': '#FF9900',
  'AWS S3': '#FF9900',

  // Azure Services
  'Azure Databricks': '#0072C6',
  'Azure Pipeline': '#0072C6',
  'Azure Blob': '#0072C6',

  // Default colors for other technologies
  'Agile Methodology': '#00BFFF',
  'System Design': '#4B0082',
  'Software Design': '#483D8B',
  'Project Deployment': '#8A2BE2',
  'Async Paradigm': '#9370DB',
  'Multitasking': '#8B008B',
  'OOPS': '#4B0082',
  'Data structures': '#483D8B',
  'Algorithms': '#4B0082',
  'Data Visualisation': '#8A2BE2',
  'ORM': '#336791',
  'Unit Testing': '#FF1493',
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getIcon = (skill: string) => {
    const Icon = skillIcons[skill] || FaTools; // Default to FaTools if no specific icon is found
    const color = skillColors[skill] || '#666666'; // Default color if not found
    return <Icon color={color} />;
  };

  return (
    <TabContent>
      <h2>Skills & Technologies</h2>
      <SkillsGrid>
        <SkillCategory>
          <CategoryTitle>Programming Languages</CategoryTitle>
          <SkillList>
            {skills.programmingLanguages.map((lang, index) => (
              <SkillItem key={index}>
                {getIcon(lang)}
                {lang}
              </SkillItem>
            ))}
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Frameworks & Libraries</CategoryTitle>
          <SkillList>
            {skills.frameworksAndLibraries.map((framework, index) => (
              <SkillItem key={index}>
                {getIcon(framework)}
                {framework}
              </SkillItem>
            ))}
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Tools</CategoryTitle>
          <SkillList>
            {skills.tools.map((tool, index) => (
              <SkillItem key={index}>
                {getIcon(tool)}
                {tool}
              </SkillItem>
            ))}
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Technologies</CategoryTitle>
          <SkillList>
            {skills.technologies.map((tech, index) => (
              <SkillItem key={index}>
                {getIcon(tech)}
                {tech}
              </SkillItem>
            ))}
          </SkillList>
        </SkillCategory>

        <SkillCategory>
          <CategoryTitle>Operating Systems</CategoryTitle>
          <SkillList>
            {skills.os.map((os, index) => (
              <SkillItem key={index}>
                {getIcon(os)}
                {os}
              </SkillItem>
            ))}
          </SkillList>
        </SkillCategory>
      </SkillsGrid>
    </TabContent>
  );
};

export default Skills;
