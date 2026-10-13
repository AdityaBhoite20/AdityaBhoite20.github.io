export interface SiteConfig { name: string; githubUrl: string; email: string; linkedinUrl: string; resumeUrl: string; aboutPhoto: string; travelPhotos: string[]; lastUpdated: string }
export const site: SiteConfig = {
  name: 'Aditya Bhoite', githubUrl: 'https://github.com/AdityaBhoite20',
  email: 'bhoiteaditya20@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/aditya-bhoite20/',
  resumeUrl: '/resume.pdf',
  aboutPhoto: '', // TODO(Aditya): fill in
  travelPhotos: ['', ''], // TODO(Aditya): fill in
  lastUpdated: '', // TODO(Aditya): fill in
};
export const navItems = [{ id: 'about', label: 'About' }, { id: 'experience', label: 'Experience' }, { id: 'work', label: 'Projects' }, { id: 'toolkit', label: 'Toolkit' }, { id: 'beyond', label: 'Beyond' }, { id: 'progress', label: 'In the lab' }, { id: 'contact', label: 'Contact' }];
export const copy = {
  title: 'Aditya Bhoite — Data Science & ML Portfolio',
  description: 'Aditya Bhoite, an Electronics & Computer Science graduate exploring Data Science, Machine Learning, and AI through practical projects.',
  status: 'Open to Data Science, Machine Learning & AI roles',
  heroTitle: 'From raw data to real intelligence.',
  heroBody: 'Somewhere between understanding data, building ML models, and experimenting with AI, I focus on making technical work useful in the real world.',
  explore: 'Explore My Work', resume: 'Resume', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email',
  microcopy: ['Less hype. More evidence.', 'Raw data has lore.', 'Receipts over vibes.', 'Locked in on the data.'], scroll: 'Scroll',
  heroFigure: { label: 'A practice in finding patterns', x: 'Observation →', y: 'Understanding', note: 'An abstract study. Not measured data.', start: 'Start with a question.', end: 'Follow the evidence.' },
  aboutTitle: 'Curious by default.',
  aboutParagraphs: [
    'I’m an Electronics & Computer Science graduate who enjoys working with data, finding meaningful patterns, and using them to solve real-world problems. I’m interested in exploring how data science and machine learning can turn complex information into useful insights.',
    'I use AI and GenAI tools where they genuinely add value, whether it’s simplifying repetitive tasks, exploring different approaches, or making analysis more efficient. For me, they’re tools to support my work, while the thinking, validation, and final decisions remain my responsibility.',
  ],
  focusAreas: [
    'Data & analytical reasoning',
    'Machine learning & intelligent systems',
    'AI and generative AI applications',
    'Responsible, reproducible workflows',
  ],
  education: {
    degree: 'B.Tech, Electronics & Computer Science',
    institution: 'Vidyalankar Institute of Technology',
    location: 'Mumbai',
    graduation: 'Class of 2026 · CGPA 8.87',
  },
  experienceTitle: 'Applied machine learning, in practice.',
  workTitle: "The data doesn't lie. Interpretation can.",
  workIntro: 'Independent case studies built around real datasets, analytical questions, and findings worth investigating.',
  workCount: 'Real-World public datasets',
  toolkitTitle: 'Tools of the trade.', beyondTitle: "Plot twists: I'm a person too.",
  progressTitle: 'Sharpening the fundamentals.', lastUpdated: 'Last updated',
  contactTitle: "Got a good problem? Let's investigate.",
  contactBody: 'Open to early-career roles across Data Science, Machine Learning, and AI. Let’s build something useful.',
  footer: 'Built with curiosity, coffee, and an unreasonable number of browser tabs.',
  skip: 'Skip to content', openMenu: 'Open navigation', menuTitle: 'Navigation', menuDescription: 'Explore the portfolio.', lightTheme: 'Switch to light theme', darkTheme: 'Switch to dark theme',
  back: 'Selected work', readCase: 'Read the case study', source: 'Source', methods: 'Methods', findings: 'Key findings', onPage: 'In this study', repository: 'View GitHub repository',
  staticCaption: 'Static figure — values from the project analysis', figureMissing: 'Figure to add',
  errorTitle: 'This page didn’t load.', errorBody: 'Please try again or return to the portfolio.', retry: 'Try again',
  notFound: 'Page not found.', notFoundBody: "This page isn't part of the dataset.", goHome: 'Back to the portfolio',
};
export const sectionLabels = { about: '01 / About', experience: '02 / Experience', work: '03 / Selected projects', toolkit: '04 / Technical toolkit', beyond: '05 / Beyond the dataset', progress: '06 / In the lab', contact: '07 / Contact' };
export const trailLabels = ['Background', 'Interests', 'Projects', 'Growth'];
