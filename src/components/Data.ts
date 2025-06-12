// src/components/Resume/resumeData.js
const azureFundamentals = require('../assets/certificates/azure_fundamentals.png');
const pythonAdvance = require('../assets/certificates/python_advance.jpg');
const javaIntermediate = require('../assets/certificates/java_intermediate.png');
const problemSolvingBasic = require('../assets/certificates/problem_solving_basic.png');
const sqlBasic = require('../assets/certificates/sql_basic.png');
const pythonBasic = require('../assets/certificates/python_basic.png');
const javaBasic = require('../assets/certificates/java_basic.png');
const myImage = require('../assets/background.png');

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
  {
    name: 'Azure Fundamental',
    issuingAuthority: 'Microsoft',
    year: '2022',
    image: azureFundamentals,
    link: 'https://www.credly.com/badges/ad7142c9-ad80-43c2-bd07-391598db0eb5',
  },
  {
    name: 'Python Advance',
    issuingAuthority: 'Cutshort',
    year: '2020',
    image: pythonAdvance,
    link: 'https://cutshort.io/certificate/21109',
  },
  {
    name: 'Java Intermediate',
    issuingAuthority: 'Hackerrank',
    year: '2020',
    image: javaIntermediate,
    link: 'https://www.hackerrank.com/certificates/4280d4db123c',
  },
  {
    name: 'Problem Solving Basic',
    issuingAuthority: 'Hackerrank',
    year: '2020',
    image: problemSolvingBasic,
    link: 'https://www.hackerrank.com/certificates/d2e0596ca830',
  },
  {
    name: 'SQL Basic',
    issuingAuthority: 'Hackerrank',
    year: '2020',
    image: sqlBasic,
    link: 'https://www.hackerrank.com/certificates/596db4bc1946',
  },
  {
    name: 'Python Basic',
    issuingAuthority: 'Hackerrank',
    year: '2020',
    image: pythonBasic,
    link: 'https://www.hackerrank.com/certificates/fac12af1aa54',
  },
  {
    name: 'Java Basic',
    issuingAuthority: 'Hackerrank',
    year: '2020',
    image: javaBasic,
    link: 'https://www.hackerrank.com/certificates/684f32f39c13',
  },
];
