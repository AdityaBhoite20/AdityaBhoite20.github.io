export interface BarDatum {
  label: string;
  value: number;
  display: string;
  secondary?: boolean;
}
export interface ChartData {
  title: string;
  max: number;
  bars: BarDatum[];
  note?: string;
}
export interface FigureData {
  src: string;
  description: string;
  alt: string;
}
export interface StudyBlock {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  charts?: ChartData[];
  figures?: FigureData[];
  callout?: string;
  pending?: boolean;
  term?: "lore" | "no cap" | "plot twist";
}
export interface Project {
  slug: string;
  index: string;
  title: string;
  domain: string;
  type: string;
  status: string;
  repo: string;
  problem: string;
  source: string;
  methods: string[];
  highlights: string[];
  tools: string[];
  blocks: StudyBlock[];
  scope?: string;
  fastener?: "pin" | "tape";
  publicSummary?: { idea: string; solution: string; challenge: string; result: string };
}
export const projects: Project[] = [
  {
    slug: "financial-resilience",
    index: "01",
    title: "Financial Resilience Intelligence",
    domain: "Banking / Financial Services / Data Science",
    type: "Research & predictive modelling",
    status: "Research case study",
    repo: "https://github.com/AdityaBhoite20/fintech-resilience-shed",
    fastener: "tape",
    problem: "What separates financially fragile US households from resilient ones?",
    source: "Federal Reserve SHED · 2024 & 2025 · 25,229 respondents",
    methods: ["Statistical analysis", "Logistic Regression", "Random Forest", "K-Means"],
    highlights: [
      "Compared household financial resilience across 2024 and 2025, including differences by income.",
      "Tested how behavioral and financial indicators relate to resilience predictions.",
    ],
    tools: [
      "Python",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "scikit-learn",
      "SQL / PostgreSQL",
      "Streamlit (local dashboard, not hosted)",
      "Git/GitHub",
    ],
    blocks: [
      {
        id: "question",
        title: "Research questions",
        paragraphs: [
          "Which households are least able to handle a $400 emergency, and how did that change between 2024 and 2025?",
          "Which employment, debt, and hardship factors are associated with financial resilience, especially for lower-income households?",
          "How well do behavioural indicators predict resilience, and what distinct household profiles emerge from the data?",
        ],
      },
      {
        id: "importance",
        title: "Why it matters",
        paragraphs: [
          "Banks, lenders and policymakers care about who can absorb a $400 emergency; early signals of vulnerability inform product design, credit risk and outreach.",
        ],
      },
      {
        id: "dataset",
        title: "Dataset & provenance — the lore",
        term: "lore",
        paragraphs: [
          "Federal Reserve Board’s Survey of Household Economics and Decisionmaking (SHED), 2024 and 2025 public-use files: 25,229 respondents combined. The 2025 file alone contains 12,934 respondents and 815 columns. The official codebook was used to verify every variable.",
        ],
      },
      {
        id: "cleaning",
        title: "Data cleaning & preprocessing",
        paragraphs: [
          "A codebook-first approach. Missingness was checked per variable with crosstabs, not assumed. For most variables it is clean skip-logic: rent-arrears is asked only of renters, so missing means “not applicable”. For some variables, missingness comes from a random module split and means “not asked this round”; those variables were never filled with No/0.",
          "The Fed’s per-variable imputation-flag columns were dropped as metadata. SHED renumbers question codes between waves, so variables were matched by meaning against both codebooks and split into a common set, safe for 2024–2025 comparison, and a 2025-only set.",
          "Gender and a student-loan indicator were harmonised; the student-loan indicator is documented as an approximation. Data was also loaded into PostgreSQL.",
        ],
      },
      {
        id: "exploration",
        title: "Exploratory analysis",
        paragraphs: [
          "Year-over-year comparison used normalised proportions rather than raw counts, broken down by income bracket, followed by a drill-down on the group driving the change.",
        ],
      },
      {
        id: "methodology",
        title: "Methodology — no cap, check it",
        term: "no cap",
        paragraphs: [
          "A transparent composite resilience score = emergency-fund score + employment-stability score − debt-stress score − hardship score. Weights are equal by design: an explicit, documented judgment call, not statistically derived.",
          "Validation against the Fed’s independent measure (“could cover a $400 expense with cash or equivalent”) gave mean scores of 2.85 vs 0.35 across the two groups (t = 119.0, p < 0.001; Cohen’s d = 1.48). This was followed by Logistic Regression vs Random Forest model comparison and K-Means household segmentation.",
        ],
      },
      {
        id: "findings",
        title: "Key findings",
        items: [
          "Overall resilience slipped about 1 percentage point (65.9% → 64.9%), almost entirely from the under-$25k income bracket (31.5% → 27.6%); other brackets stayed flat.",
          "Within the under-$25k bracket, unexpected medical expenses and natural-disaster impact decreased, ruling them out as drivers. Layoffs rose 10.0% → 12.1%, payday-loan use 6.0% → 7.3%, and pawn/title-loan use 4.6% → 6.0%. The reading is shrinking mainstream credit access plus job instability pushing people toward high-cost credit. Correlational, not causal.",
          "Demographics-only Logistic Regression: ROC-AUC 0.799. Adding employment-stability, debt-stress and hardship scores: 0.867, the conservative headline. Adding emergency-fund score reaches 0.916, but this score is conceptually close to the target; that result is secondary.",
          "Random Forest (0.891) did not beat Logistic Regression (0.916) on full engineered features. The simpler model was retained because the engineered scores are additive and fit a linear model well.",
          "K-Means (k = 4) silhouette improved 0.427 → 0.474 after standardising features; without scaling, the 0–9 hardship score dominated distance. Four interpretable segments: resilient, debt-strained, employment-vulnerable, and hardship-hit with no cushion.",
          "In the final model, emergency-fund score was the strongest positive driver (+1.55) and debt-stress the strongest negative (−1.09), outweighing most demographic factors.",
        ],
        charts: [
          {
            title: "Household resilience · 2024 vs 2025",
            max: 100,
            bars: [
              { label: "Overall · 2024", value: 65.9, display: "65.9%", secondary: true },
              { label: "Overall · 2025", value: 64.9, display: "64.9%" },
              { label: "Under $25k · 2024", value: 31.5, display: "31.5%", secondary: true },
              { label: "Under $25k · 2025", value: 27.6, display: "27.6%" },
            ],
            note: "Unweighted survey proportions; associations, not causal estimates.",
          },
          {
            title: "Model comparison · ROC-AUC",
            max: 1,
            bars: [
              { label: "Demographics only", value: 0.799, display: "0.799", secondary: true },
              { label: "+ Three behavioural scores", value: 0.867, display: "0.867" },
              { label: "+ All four scores", value: 0.916, display: "0.916", secondary: true },
              {
                label: "Random Forest · all four",
                value: 0.891,
                display: "0.891",
                secondary: true,
              },
            ],
            note: "0.867 is the conservative headline. Full-feature scores include emergency-fund information conceptually close to the target. Single stratified 80/20 split; no uncertainty intervals.",
          },
          {
            title: "K-Means · silhouette score",
            max: 1,
            bars: [
              { label: "Before standardising", value: 0.427, display: "0.427", secondary: true },
              { label: "After standardising", value: 0.474, display: "0.474" },
            ],
          },
        ],
      },
      {
        id: "limitations",
        title: "Limitations — plot twist",
        term: "plot twist",
        callout: "Plot twist: correlation isn't causation.",
        paragraphs: [
          "Cross-sectional data supports associations, not causes. Score weights are judgment calls. The emergency-fund score overlaps conceptually with the target. A single stratified 80/20 split was used, so no uncertainty interval is available on the AUC figures. Survey weights were not applied to the reported proportions.",
          "The approximately 4,419 respondents appearing in both years were not used for transition analysis. Next steps: panel analysis on linked respondents, survey weighting, and repeated stratified k-fold evaluation with intervals.",
        ],
      },
    ],
  },
  {
    slug: "labor-market",
    index: "02",
    title: "Labor Market Intelligence Platform",
    domain: "Labor Economics / Market Intelligence",
    type: "Data pipeline & occupational analysis",
    status: "Research case study",
    repo: "https://github.com/AdityaBhoite20/labor-market-intel",
    fastener: "pin",
    problem: "How do occupations differ in employment, wages, skills and AI exposure?",
    source: "BLS OEWS · 830+ occupations · 11 years / O*NET / public job postings",
    methods: ["ETL", "K-Means", "Linear Regression", "TF-IDF", "Power BI"],
    highlights: [
      "Compared employment, wages, skills, and AI exposure across US occupations.",
      "Built long-term employment trends and compared them with BLS projections.",
    ],
    tools: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "SQL / PostgreSQL",
      "SQLAlchemy",
      "Jupyter",
      "Power BI",
      "Docker",
      "AWS (S3, EC2, IAM, CloudWatch billing alarm)",
      "REST API ingestion (BLS)",
    ],
    blocks: [
      {
        id: "question",
        title: "Research questions",
        paragraphs: [
          "How have employment and wages changed across US occupations over time?",
          "Which occupations share similar employment profiles, and how do occupational skills relate to wages?",
          "How does measured AI exposure relate to recent employment growth, and how do simple trend forecasts compare with BLS projections?",
        ],
      },
      {
        id: "importance",
        title: "Why it matters",
        paragraphs: [
          "Career choices, workforce planning and education decisions depend on how occupations are changing.",
        ],
      },
      {
        id: "dataset",
        title: "Dataset & provenance — the lore",
        term: "lore",
        paragraphs: [
          "BLS Occupational Employment and Wage Statistics (OEWS) annual bulk files covering 830+ occupations and 11 years, the O*NET occupation/skills database, and a public job-postings dataset.",
        ],
      },
      {
        id: "cleaning",
        title: "Data cleaning & preprocessing",
        paragraphs: [
          "The BLS OEWS API only returns the latest year, so the project switched to bulk file downloads for history. Raw files are kept untouched; processing and curated layers are separate.",
          "BLS suppression codes (#, *, **) were converted to missing. Column names and casing that drifted between yearly files were normalised. SOC occupation-code reclassification over time, such as Data Scientists, is documented as a known limitation.",
          "Curated tables were loaded into PostgreSQL via SQLAlchemy, using flat tables joined logically on SOC code.",
        ],
      },
      {
        id: "methodology",
        title: "Methodology — no cap, check it",
        term: "no cap",
        paragraphs: [
          "K-Means occupation clustering used the elbow method and StandardScaler. Clusters were initially driven purely by employment size until employment was log-transformed.",
          "A deliberately simple per-occupation linear-regression forecast was benchmarked against official BLS projections. ARIMA was rejected because there were too few annual points. TF-IDF + K-Means was used on job titles. A transparent AI-exposure score was built from O*NET reference categories; manually justified weights are judgment calls.",
          "A Power BI dashboard connected to PostgreSQL is represented here by screenshot slots only. The pipeline was containerised with Docker and verified once on AWS: curated data on S3, one EC2 run, instance terminated afterwards, with a billing alarm set first. This was a one-off deployment check, not a running service.",
        ],
      },
      {
        id: "findings",
        title: "Key findings",
        items: [
          "AI exposure had near-zero correlation (r = 0.008) with historical employment growth from 2020 to 2025 across 708 occupations. This is a measured null association in this sample, not evidence of no future impact.",
          "An 11-year linear trend overestimated BLS official 2025–2035 employment growth projections by 34.3 percentage points on average, illustrating the limits of long-range extrapolation.",
          "Importance ratings for ten basic O*NET skills showed moderate wage correlations (r = 0.40–0.63) at full scale. The exploratory n = 10 analysis produced contradictory correlations, which did not hold at scale.",
          "After log-transforming employment to reduce size-driven clustering, K-Means produced five economically coherent occupation tiers.",
          "SOC reclassification can break naive year-over-year comparisons: Data Scientists moved from SOC 15-2098 in 2020 to 15-2051 in the current classification.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations — plot twist",
        term: "plot twist",
        items: [
          "No formal hypothesis testing; clustering evaluated with the elbow method only, without a silhouette score.",
          "The naive linear forecast diverges from expert projections.",
          "TF-IDF cannot capture meaning beyond shared words; embeddings are the natural upgrade.",
          "No automated tests or CI/CD. SOC reclassification breaks some long-run series.",
          "PySpark was deliberately not used because the data volume never justified it.",
        ],
      },
    ],
  },
  {
    slug: "plant-disease",
    index: "03",
    title: "Plant Disease Detection",
    domain: "Computer Vision",
    type: "Internship project · VJTI CoE AI Lab",
    status: "Machine learning internship project",
    repo: "",
    problem: "Can computer vision help identify plant disease from leaf images?",
    source: "PlantVillage leaf image dataset",
    methods: ["Convolutional Neural Network"],
    highlights: [
      "CNN-based plant disease detection system built with TensorFlow and Keras.",
      "Approximately 90% training accuracy and 88% validation accuracy.",
    ],
    tools: ["Python", "TensorFlow", "Keras"],
    publicSummary: {
      idea: "Use leaf images to explore how AI can support plant disease identification.",
      solution:
        "Developed and evaluated a Convolutional Neural Network using TensorFlow and Keras.",
      challenge:
        "Evaluating how well the model generalized from training images to validation data, while considering lightweight solutions for resource-constrained agricultural environments.",
      result:
        "Reached approximately 90% training accuracy and 88% validation accuracy on the PlantVillage dataset.",
    },
    blocks: [],
  },
];
export function getStudyBlocks(project: Project): StudyBlock[] {
  return [
    ...project.blocks,
    ...(project.slug === "financial-resilience"
      ? [
          {
            id: "next",
            title: "Next steps",
            items: [
              "Panel analysis on linked respondents.",
              "Survey weighting and repeated stratified k-fold evaluation with intervals.",
            ],
          },
        ]
      : project.slug === "labor-market"
        ? [
            {
              id: "next",
              title: "Next steps",
              items: ["Explore embeddings as an upgrade to TF-IDF."],
            },
          ]
        : []),
    ...(project.tools.length
      ? [{ id: "tools", title: "Tools & technologies", paragraphs: [project.tools.join(" / ")] }]
      : []),
    ...(project.repo ? [{ id: "repository", title: "GitHub repository" }] : []),
  ];
}
