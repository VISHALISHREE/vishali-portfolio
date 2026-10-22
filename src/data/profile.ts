// Single source of truth for all portfolio content.
// Every field here is sourced directly from the resume and GitHub profile.
// Do not add fabricated projects, numbers, or claims.

export const profile = {
  name: 'Vishalishree E',
  initials: 'VE',
  headline: 'Full Stack Developer · ML & Data Analytics',
  tagline:
    'Information Technology student building AI-powered applications, interactive dashboards, and thoughtful user experiences.',
  summary:
    'Information Technology student with hands-on experience in Full Stack Development, Machine Learning, Data Analytics, and UI/UX Design. Skilled in Python, Flask, SQL, Scikit-learn, Spark, and Power BI, with experience building AI-powered applications and publishing research papers.',
  location: 'Chennai, India',
  email: 'vishalielu10@gmail.com',
  phone: '+91 9445345075',
  social: {
    github: 'https://github.com/VISHALISHREE',
    linkedin: 'https://www.linkedin.com/in/vishalishree-elumalai-22034b2a3',
  },
  resumeFile: '/resume.pdf',
}

export const education = [
  {
    institution: 'SRM Institute of Science and Technology, Ramapuram, Chennai',
    degree: 'Bachelor of Technology (Information Technology)',
    period: '2023 – 2027',
    detail: 'CGPA: 9.14 / 10.0',
  },
  {
    institution: 'Everwin Vidhyashram, Chennai',
    degree: 'Class XII (CBSE)',
    period: '2023',
    detail: 'Percentage: 75.4%',
  },
  {
    institution: 'Everwin Vidhyashram, Chennai',
    degree: 'Class X (CBSE)',
    period: '2021',
    detail: 'Percentage: 86%',
  },
]

export const skillGroups = [
  { category: 'Programming', skills: ['Python', 'SQL', 'Java'] },
  { category: 'Web', skills: ['HTML', 'CSS', 'PHP', 'Flask'] },
  { category: 'Machine Learning', skills: ['Scikit-learn', 'TF-IDF'] },
  { category: 'Data Analytics', skills: ['Pandas', 'NumPy', 'Spark', 'PySpark', 'Hadoop'] },
  { category: 'Visualization', skills: ['Power BI', 'Tableau'] },
  { category: 'Databases', skills: ['MySQL', 'SQLite'] },
  { category: 'Tools', skills: ['Git', 'GitHub', 'Figma', 'Canva'] },
]

export const experience = [
  {
    company: 'NoviTech R&D Private Limited',
    role: 'Full Stack Development Intern',
    period: 'Oct 2025 – Nov 2025',
    points: [
      'Developed 5+ responsive web pages using HTML, CSS, PHP, and MySQL with integrated database functionality.',
    ],
  },
  {
    company: 'NoviTech R&D Private Limited',
    role: 'UI/UX Design Intern',
    period: 'Oct 2025 – Nov 2025',
    points: [
      'Designed 10+ interactive Figma screens for a Criminal Detector System, improving workflow consistency and usability.',
    ],
  },
]

export const projects = [
  {
    title: 'AI Phishing Detector',
    description:
      'Machine learning web application to detect phishing URLs using TF-IDF and Scikit-learn, with a Flask-based interface and SQLite backend for real-time URL classification.',
    tech: ['Flask', 'Scikit-learn', 'TF-IDF', 'SQLite'],
    github: 'https://github.com/VISHALISHREE/AI-Phishing-Detector',
  },
  {
    title: 'Automated OMR Evaluation System',
    description:
      'Automated OMR answer sheet evaluation using image processing and bubble detection techniques (OpenCV), with performance dashboards and reports generated in Power BI.',
    tech: ['Python', 'OpenCV', 'SQL', 'Power BI', 'Streamlit'],
    github: 'https://github.com/VISHALISHREE/AUTOMATED-OMR-EVALUATION-SYSTEM',
  },
  {
    title: 'Stock Market Analysis',
    description:
      'Processed and analyzed large-scale stock market datasets using Spark and PySpark, with interactive dashboards to visualize market trends and insights.',
    tech: ['Spark', 'PySpark', 'Hadoop', 'Tableau'],
    github: 'https://github.com/VISHALISHREE/Stock-Market-Analysis-',
  },
  {
    title: 'Donation Tracker — NGO',
    description:
      'Web-based donation tracking system designed for NGOs to manage donors, track donations, and monitor funds.',
    tech: ['HTML', 'CSS', 'PHP', 'MySQL'],
    github: 'https://github.com/VISHALISHREE/donation-tracker-ngo',
  },
  {
    title: 'Criminal Detector — UI/UX',
    description:
      'UI/UX design prototype for a Criminal Detection mobile application, designed in Figma with a focus on workflow consistency and usability.',
    tech: ['Figma', 'UI/UX Design'],
    github: 'https://github.com/VISHALISHREE/Criminal-Detector-UI-UX',
  },
]

export const research = [
  {
    title:
      'Predictive Analysis of Teen Behavioural Indicators from Social Media Trends using Logistic Regression',
    venue: 'Suguna College of Engineering, 2026',
  },
  {
    title:
      'Enhanced Multi-Modal Assistive Technology System for Comprehensive Support of Children with Cognitive and Behavioural Disabilities',
    venue: 'International Conference on Smart Communication and Sustainable Technologies (ICSCST 2026), SAINGITS College of Engineering, Kerala',
  },
]

export const achievements = [
  {
    title: 'First Place — TECHPOLY 2024',
    venue: 'SRM Institute of Science and Technology',
  },
]

export const certifications = [
  { title: 'Database Management Systems', issuer: 'NPTEL (IIT Kharagpur)' },
  { title: 'Full Stack Development', issuer: 'NoviTech R&D' },
  { title: 'UI/UX Design', issuer: 'NoviTech R&D' },
  { title: 'Ethical Hacker', issuer: 'Cisco Networking Academy' },
]
