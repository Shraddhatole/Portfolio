// All site copy lives here — edit this file to update the portfolio text.
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Shraddha Tole',
  initials: 'ST',
  role: 'Data Scientist',
  location: 'Glasgow, Scotland',
  email: 'shraddhatole2001@gmail.com',
  phone: '+44 7721 556745',
  linkedin: 'https://www.linkedin.com/in/shraddhatole0708',
  github: 'https://github.com/Shraddhatole',
  cv: `${base}Shraddha_Tole_CV.pdf`,
  photo: `${base}profile.jpg`,

  // TODO(Shraddha): confirm availability + visa wording before publishing
  availability: 'Open to Data Scientist roles · Available from Sept 2027 · Eligible for UK Graduate Route visa',

  hero: {
    greeting: "Hi, I'm Shraddha 👋",
    titleTop: 'Turning Data into',
    titleAccent: 'Decisions You Can Trust',
    blurb:
      'Data Scientist with 3 years of enterprise engineering experience, now pursuing an MSc in Data Science at the University of Glasgow. I build machine-learning models that are accurate, explainable and tied to real business cost.',
  },

  stats: [
    { value: '3 yrs', label: 'Industry experience' },
    { value: '1.85M', label: 'Transactions modelled' },
    { value: '5.7M', label: 'UK companies analysed' },
    { value: '30+', label: 'Enterprise integrations' },
  ],

  approach: [
    { step: 'Ask', title: 'Frame the problem', text: 'Start from the decision and its cost, e.g. a missed fraud vs. a false alarm.', icon: 'Lightbulb' },
    { step: 'Explore', title: 'Clean & understand', text: 'Join messy sources, check leakage and bias before any model is trained.', icon: 'ChartColumn' },
    { step: 'Model', title: 'Build & validate', text: 'Time-based validation, honest baselines, uncertainty with bootstraps.', icon: 'Cpu' },
    { step: 'Communicate', title: 'Explain & ship', text: 'SHAP explanations, dashboards and apps people can actually use.', icon: 'MessageSquareText' },
  ],

  about: {
    paragraphs: [
      "I spent three years at VOIS (Vodafone Intelligent Solutions) building the plumbing behind enterprise data: Python automation, SQL pipelines, ETL workflows and 30+ Oracle Service Bus integrations. That taught me how data really flows through a company and where it breaks.",
      "Now at the University of Glasgow, I'm adding the statistics and machine learning on top. I care about models that can explain themselves: I use SHAP to justify every fraud alert, exclude sensitive attributes for fairness, and describe findings as risk signals rather than accusations.",
    ],
    quote: 'A good model doesn’t just predict. It explains why, and what it costs to be wrong.',
    values: [
      { label: 'Explainable AI', icon: 'ScanSearch' },
      { label: 'Engineering rigour', icon: 'Wrench' },
      { label: 'Business impact', icon: 'TrendingUp' },
    ],
  },

  experience: [
    {
      role: 'Senior Executive',
      org: 'VOIS (Vodafone Intelligent Solutions)',
      period: 'Aug 2023 – Aug 2026',
      highlight: 'Designed and deployed a Generative AI Copilot agent that automated 40% of routine operational tasks.',
      bullets: [
        'Optimised SQL extraction and transformation scripts, cutting report generation time by 30% and improving analytics accuracy.',
        'Built Python utilities for data extraction, validation and file processing across business processes.',
        'Developed and managed 30+ Oracle Service Bus integrations, improving data exchange efficiency by 25%.',
        'Owned ETL workflows end to end: extract, transform to business rules, validate, load to target systems.',
        'Delivered 100% of assigned projects on time across the full SDLC.',
      ],
      award: 'Star Award, Dec 2024',
    },
    {
      role: 'Java Development Intern',
      org: 'Apptware Solutions',
      period: 'Aug 2022 – Nov 2022',
      bullets: ['Built and tested Java backend features as part of an agile product team.'],
    },
    {
      role: 'Web Development Intern',
      org: 'GenioBITS',
      period: 'May 2021 – Aug 2021',
      bullets: ['Developed responsive web pages and front-end features.'],
    },
  ],

  education: [
    { degree: 'MSc Data Science', org: 'University of Glasgow', period: 'Sept 2026 – Present', note: 'Glasgow, Scotland' },
    { degree: 'BE Information Technology', org: 'Savitribai Phule Pune University', period: 'Graduated June 2023', note: 'CGPA 8.7 / 10' },
  ],

  skills: [
    { name: 'Python', detail: 'Pandas, NumPy, automation', icon: 'CodeXml', tags: ['ml', 'analytics', 'dl'] },
    { name: 'SQL', detail: 'MySQL, querying, schema design', icon: 'Database', tags: ['sql', 'analytics'] },
    { name: 'Machine Learning', detail: 'scikit-learn, XGBoost', icon: 'BrainCircuit', tags: ['ml'] },
    { name: 'Explainable AI', detail: 'SHAP, fairness checks', icon: 'ScanSearch', tags: ['ml'] },
    { name: 'Statistics', detail: 'Bootstrap, χ², Mann-Whitney', icon: 'Sigma', tags: ['analytics'] },
    { name: 'Deep Learning', detail: 'CNNs, image classification', icon: 'Network', tags: ['dl'] },
    { name: 'Data Visualisation', detail: 'Power BI, Matplotlib, Seaborn', icon: 'ChartPie', tags: ['analytics', 'sql'] },
    { name: 'Data Engineering', detail: 'ETL, OSB, REST/SOAP APIs', icon: 'Workflow', tags: ['sql', 'analytics'] },
    { name: 'Apps & Dev', detail: 'Streamlit, Flask, React, Git', icon: 'AppWindow', tags: ['ml', 'dl'] },
  ],
}
