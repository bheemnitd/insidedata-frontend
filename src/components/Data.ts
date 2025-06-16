// src/components/Resume/resumeData.js
import azureFundamentals from '../assets/certificates/azure_fundamentals.png';
import pythonAdvance from '../assets/certificates/python_advance.jpg';
import javaIntermediate from '../assets/certificates/java_intermediate.png';
import problemSolvingBasic from '../assets/certificates/problem_solving_basic.png';
import sqlBasic from '../assets/certificates/sql_basic.png';
import pythonBasic from '../assets/certificates/python_basic.png';
import javaBasic from '../assets/certificates/java_basic.png';
import myImage from '../assets/background.png';

export const personalInfo = {
  name: 'Bheem Kumar',
  intro: `Experienced Python Developer with over 5 years of industry expertise, specializing in Django and API development, with comprehensive knowledge of SQL and NoSQL databases.
Proficient in designing low-latency and highly scalable solutions, ensuring optimal performance and responsiveness.
Skilled in leveraging Python to build robust web applications and RESTFull APIs, with a keen focus on delivering high-quality solutions that meet business objectives.
Passionate about continuous learning and staying updated with the latest technologies and best practices in software development.
Strong problem-solving abilities and a collaborative team player committed to driving innovation and achieving project success.`,
  image: myImage,
};

export const contact = {
  name: 'Bheem Kumar',
  email: 'bheemnitd@gmail.com',
  phone: '+91 (878) 936-7377',
  address: 'Gurugram INDIA',
  linkedIn: 'https://www.linkedin.com/in/bheem-kumar-1b294113a/',
  github: 'https://github.com/bheemnitd',
  Portfolio: 'https://insidedata.in',
};

export const education = [
  {
    degree: 'Master of Computer Application',
    college: 'National Institute of Technology Durgapur',
    year: 'Graduated in 2018',
  },
  {
    degree: 'Bachelor of Computer Application',
    college: 'Nalanda College',
    year: 'Graduated in 2014',
  },
];

export const workExperience = [
  {
    position: 'Software Developer',
    company: 'Decisionpoint',
    link: 'https://decisionpoint.ai',
    year: 'NOV 2021 - JAN 2024',
    description: 'Worked on developing backend applications.',
  },
  {
    position: 'Python Developer',
    company: 'Varadhi-Smartek',
    link: 'https://www.glassdoor.co.in/Reviews/Varadhi-Smartek-Reviews-E1883084.htm',
    year: 'June-2021 - oct-2021',
    description: 'Worked on developing and maintaining API applications.',
  },
  {
    position: 'Machine Learning Engineer',
    company: 'Hudsondata',
    link: 'https://www.hudsondata.com',
    year: 'Aug-2019 - Jan-2020',
    description: 'Worked on developing ML models applications.',
  },
];

export const programmingLanguages = [
  'Python', 'SQL', 'NoSQL', 'JavaScript', 'Java', 'C', 'C++', 'HTML', 'CSS'
];

export const tools = [
  'MySQL', 'MongoDB', 'Docker', 'Redis', 'Celery', 'GIT', 'Excel', 'Postman', 'Jira', 'Pycharm', 'VS Code',
  'Jupyter notebook', 'Colab'
];

export const technologies = [
  'Agile Methodology', 'System Design', 'Software Design', 'Project Deployment', 'Async Paradigm', 'Multitasking', 'OOPS', 'Data structures',
  'Algorithms', 'Data Visualisation', 'ORM', 'Unit Testing', 'Postman'
];

export const os = [
  'Linux', 'Mac', 'Windows'
];

export const frameworksAndLibraries = [
  'Django', 'Flask', 'FastAPI', 'DjangoRestFramework', 'PySpark', 'OpenAPI',
  'Numpy', 'Pandas', 'Tensorflow', 'Keras', 'OpenCV', 'Sklearn', 'Matplotlib', 'Bootstrap', 'Jquery', 'ReactJS'
];

export interface Project {
  name: string;
  company: string;
  description: string;
  tools: string;
  started: string;
  ended: string;
  url?: string;
  logo?: string;
}

export const projects = [
  {
    name: 'Beagle',
    company: "decisionpoint.ai",
    description: 'In Beagle, I excelled in building API documentation with OpenAPI Swagger Hub, bug identification, and crafting a module for extracting valuable insights from log files.',
    tools: "Python | Django | OpenAPI ",
    started: '2024',
    ended: '2023',
  },
  {
    name: 'Kelloggs Command Center',
    company: "decisionpoint.ai",
    description: 'For Command Center, I efficiently retrieved data from Glu using AWS API, workflow scheduler etc.',
    tools: "Python | Django | OpenAPI | AWS Glue, Athena, S3, Azure Databricks, Pipeline, Blob",
    started: '2023',
    ended: '2022',
  },
  {
    name: 'Kellogs Target Builder',
    company: "decisionpoint.ai",
    description: 'In Project Target Builder, I spearheaded API development utilizing core Python on Lambda functions',
    tools: "Python | AWS Lambda, Athena, S3",
    started: '2022',
    ended: '2021',
  },
  {
    name: 'ERP Patashala',
    company: "Varadhismartek",
    description: 'At Varadhi Smartek, I led the API development for ERP Patashala. This user-friendly software streamlines communication between parents, teachers, and management. It enhances institutional efficiency, saving time and resources. The intuitive interface ensures easy navigation, contributing to overall growth by optimizing time management.',
    tools: "Python | Django | DRF | AWS S3",
    started: '2021',
    ended: '2021',
  },
  {
    name: 'Python Tutorial',
    company: "hudsondata",
    description: 'My role involved curating and developing comprehensive Python tutorial content organized by topics. This initiative aimed to facilitate a structured learning experience for new team members, enabling them to acquire proficiency in Python efficiently.',
    tools: "Python",
    started: '2019',
    ended: '2020',
  },
  {
    name: 'Environmental Sound classification',
    company: "insidedata",
    description: 'A model which is used to identify the class of sound, it takes 5 secs of audio file and predicts the class. Where we had 2000 audio clips. We converted it into spectrograms and then trained it. The accuracy of the model is 97%.',
    tools: "Python | pandas | keras",
    started: '2018',
    ended: '2018',
  },
  {
    name: 'Community Detection',
    company: "College",
    description: 'Community detection in social networks, the field of community detection aims to identify highly connected groups of individuals or objects inside networks, these groups are called communities. The community can be detected by seed nodes and dense between nodes.',
    tools: "Python | networkx",
    started: '2018',
    ended: '2018',
  },
];

export const certifications = [
  // AI & Machine Learning
  {
    name: "AI Spark",
    path: "src/assets/certificates/ai/AI Spark.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Generative AI and Its Impact to Everyday Business",
    path: "src/assets/certificates/ai/Generative AI and Its Impact to Everyday Business.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Using AI to Improve the Employee Experience",
    path: "src/assets/certificates/ai/Using AI to Improve the Employee Experience.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Algorithms
  {
    name: "Asymptotic Notation",
    path: "src/assets/certificates/algorithm/Asymptotic Notation.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Merge Sort",
    path: "src/assets/certificates/algorithm/Merge Sort.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Introduction To Dynamic Programming In Python",
    path: "src/assets/certificates/algorithm/Introduction To Dynamic Programming In Python.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Cloud & DevOps
  {
    name: "Azure Fundamentals",
    path: "src/assets/certificates/cloud/azure_fundamentals.png",
    type: "image",
    issuingAuthority: "Microsoft",
    year: "2024",
    link: "https://www.credly.com/badges/your-badge-id"
  },

  // Data Structures
  {
    name: "Linked List Data Structure",
    path: "src/assets/certificates/data-structure/Linked List Data Structure.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Stacks Data Structure",
    path: "src/assets/certificates/data-structure/Stacks Data Structure.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Data Structures & Algorithms in Python: Implementing Trees & Graphs",
    path: "src/assets/certificates/data-structure/Data Structures & Algorithms in Python_ Implementing Trees & Graphs.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Design Patterns
  {
    name: "Software Design and Development: Design Patterns & SOLID Principles",
    path: "src/assets/certificates/design-pattern/Software Design and Development_ Design Patterns & SOLID Principles.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Programming Languages
  {
    name: "Python 3",
    path: "src/assets/certificates/language/Python 3.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Tuples",
    path: "src/assets/certificates/language/Python_ Tuples.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: List Comprehension",
    path: "src/assets/certificates/language/Python_ List Comprehension.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Control Flow",
    path: "src/assets/certificates/language/Python_ Control Flow.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Loops",
    path: "src/assets/certificates/language/Python_ Loops.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Lists",
    path: "src/assets/certificates/language/Python_ Lists.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Functions",
    path: "src/assets/certificates/language/Python_ Functions.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Strings",
    path: "src/assets/certificates/language/Python_ Strings.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Dictionaries",
    path: "src/assets/certificates/language/Python_ Dictionaries.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Classes",
    path: "src/assets/certificates/language/Python_ Classes.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Lambda Functions",
    path: "src/assets/certificates/language/Python_ Lambda Functions.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Higher-Order Functions",
    path: "src/assets/certificates/language/Python_ Higher-Order Functions.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Python: Decorators",
    path: "src/assets/certificates/language/Python_ Decorators.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Deploying A Simple Python Script With Flask",
    path: "src/assets/certificates/language/Deploying A Simple Python Script With Flask.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Agile & Scrum
  {
    name: "Agile Principles and Methodologies",
    path: "src/assets/certificates/agile/Agile Principles and Methodologies.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Scrum Methodology",
    path: "src/assets/certificates/agile/Scrum Methodology.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "User Stories",
    path: "src/assets/certificates/agile/User Stories.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Project Risk",
    path: "src/assets/certificates/agile/Project Risk.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Communication",
    path: "src/assets/certificates/agile/Communication.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Advanced Agile Tools and Techniques",
    path: "src/assets/certificates/agile/Advanced Agile Tools and Techniques.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Final Exam: Agile Foundations",
    path: "src/assets/certificates/agile/Final Exam_ Agile Foundations.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },

  // Others
  {
    name: "Using Business Etiquette to Increase Your Professionalism",
    path: "src/assets/certificates/others/Using Business Etiquette to Increase Your Professionalism.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Global Compliance",
    path: "src/assets/certificates/others/Global Compliance.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Creating A Safe Work Environment",
    path: "src/assets/certificates/others/Creating A Safe Work Environment.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "OS Processes and Threads",
    path: "src/assets/certificates/others/OS Processes and Threads.pdf",
    type: "pdf",
    issuingAuthority: "LinkedIn Learning",
    year: "2024"
  },
  {
    name: "Problem Solving Basic",
    path: "src/assets/certificates/others/problem_solving_basic.png",
    type: "image",
    issuingAuthority: "HackerRank",
    year: "2024",
    link: "https://www.hackerrank.com/certificates/your-certificate-id"
  }
];
