const base = import.meta.env.BASE_URL

// tags drive the filter chips and the Skills → Projects highlight
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'analytics', label: 'Analytics & Stats' },
  { id: 'sql', label: 'SQL' },
  { id: 'dl', label: 'Deep Learning' },
]

export const projects = [
  {
    id: 'fraudlens',
    featured: true,
    badge: 'Machine Learning',
    title: 'FraudLens: Card Fraud Detection',
    summary:
      'End-to-end fraud model on 1.85M card transactions with behavioural features, leakage-safe time-based validation, a cost-optimised alert threshold, and SHAP explanations for every decision.',
    metrics: [
      { value: '0.91', label: 'PR-AUC (vs 0.17 baseline)' },
      { value: '93%', label: 'Fraud caught' },
      { value: '−95%', label: 'Fraud cost ($1.13M → $53k)' },
    ],
    tech: ['Python', 'XGBoost', 'SHAP', 'scikit-learn', 'Streamlit'],
    tags: ['ml'],
    visual: 'fraud',
    gallery: [
      { src: `${base}projects/fraudlens_threshold_cost.png`, alt: 'Total cost by alert threshold, minimum near 0.44' },
      { src: `${base}projects/fraudlens_pr_curve.png`, alt: 'Precision-recall curve: XGBoost vs logistic regression' },
      { src: `${base}projects/fraudlens_shap_beeswarm.png`, alt: 'SHAP beeswarm plot of feature impact' },
    ],
    links: {
      demo: 'https://fraudlens-shraddha.streamlit.app',
      github: 'https://github.com/Shraddhatole/FraudLens',
    },
  },
  {
    id: 'shellscope',
    badge: 'Statistics & Analytics',
    status: 'In progress',
    title: 'ShellScope: UK Company Risk Radar',
    summary:
      'Screens 5.7M UK Companies House records for shell-company risk signals such as mass-shared addresses, overdue accounts and strike-offs, with age-adjusted tests and cluster bootstraps. Risk signals, not accusations.',
    metrics: [
      { value: '351', label: 'addresses hold 11% of companies' },
      { value: '1.2–1.7×', label: 'age-adjusted overdue risk' },
    ],
    tech: ['Python', 'Pandas', 'SciPy', 'SQL', 'Power BI'],
    tags: ['analytics', 'sql'],
    visual: 'network',
    links: { github: 'https://github.com/Shraddhatole/Shellscope' },
  },
  {
    id: 'healthcare',
    badge: 'SQL & Analytics',
    title: 'Healthcare Census Analytics',
    summary:
      'Designed a relational MySQL schema with integrity constraints and answered 55 analytical problem statements on patients, facilities, treatments and insurance, plus a Python exploratory analysis.',
    metrics: [{ value: '55', label: 'analytical SQL problems' }],
    tech: ['MySQL', 'SQL', 'Python', 'Pandas', 'Seaborn'],
    tags: ['sql', 'analytics'],
    visual: 'bars',
    links: {
      github: 'https://github.com/Shraddhatole/Analysis_Of_Healthcare_Census_using_MySQL',
      extra: { label: 'EDA notebook', href: 'https://github.com/Shraddhatole/Exploratory_Data_Analysis_of_Healthcare_Census-main' },
    },
  },
  {
    id: 'drcnn',
    badge: 'Deep Learning',
    title: 'DR. CNN: Diabetic Retinopathy Detection',
    summary:
      'Convolutional neural network that classifies retinal images for signs of diabetic retinopathy, served through a Flask API with a React front end.',
    metrics: [{ value: 'CNN', label: 'image classification' }],
    tech: ['Python', 'CNN', 'Deep Learning', 'Flask', 'React'],
    tags: ['dl', 'ml'],
    visual: 'retina',
    links: {}, // TODO(Shraddha): add GitHub link if the repo is public
  },
]
