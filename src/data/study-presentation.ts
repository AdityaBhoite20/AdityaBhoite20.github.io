import type { Term } from "./terms";
export interface Stat {
  value: string;
  label: string;
}
export const headlineStats: Record<string, Stat[]> = {
  "financial-resilience": [
    { value: "65.9% → 64.9%", label: "Overall resilience" },
    { value: "0.799 → 0.867", label: "ROC-AUC · conservative comparison" },
  ],
  "labor-market": [
    { value: "830+", label: "Occupations" },
    { value: "11 years", label: "Historical coverage" },
  ],
  "plant-disease": [
    { value: "~90%", label: "Training accuracy" },
    { value: "88%", label: "Validation accuracy" },
  ],
};
export const glanceStats: Record<string, Stat[]> = {
  "financial-resilience": [
    { value: "25,229", label: "Respondents · 2024 & 2025" },
    { value: "64.9%", label: "2025 resilience · unweighted" },
    { value: "0.867", label: "Conservative ROC-AUC · single split" },
  ],
  "labor-market": [
    { value: "830+", label: "Occupations" },
    { value: "11 years", label: "OEWS annual files" },
    { value: "One-off", label: "AWS check · instance terminated" },
  ],
  "plant-disease": [
    { value: "~90%", label: "Training accuracy" },
    { value: "88%", label: "Validation accuracy" },
  ],
};
export const studyLabels: Record<string, { label: string; phrase?: string; term?: Term }> = {
  dataset: { label: "Dataset", phrase: "the lore", term: "lore" },
  cleaning: { label: "Cleaning", phrase: "the glow-up", term: "glow-up" },
  exploration: { label: "Exploratory analysis", phrase: "vibe check", term: "vibe check" },
  methodology: { label: "Methodology", phrase: "no cap, check it", term: "no cap" },
  findings: { label: "Key findings", phrase: "the receipts", term: "receipts" },
  limitations: { label: "Limitations", phrase: "plot twist", term: "plot twist" },
  next: { label: "Next steps", phrase: "side quests", term: "side quest" },
};
export const summaries: Record<string, Record<string, string[]>> = {
  "financial-resilience": {
    question: [
      "Which households are least able to handle a $400 emergency, and how did that change between 2024 and 2025?",
      "Which employment, debt, and hardship factors are associated with financial resilience, especially for lower-income households?",
      "How well do behavioural indicators predict resilience, and what distinct household profiles emerge from the data?",
    ],
    importance: [
      "Ability to absorb a $400 emergency matters for credit risk, product design and policy outreach.",
    ],
    dataset: [
      "Federal Reserve SHED public-use files: 25,229 respondents across 2024 and 2025.",
      "2025: 12,934 respondents, 815 columns; variables verified against official codebooks.",
    ],
    cleaning: [
      "Codebook-first missingness checks distinguished skip-logic from random module splits.",
      "Matched variables by meaning across waves; harmonised gender and an approximate student-loan indicator.",
      "Dropped imputation-flag metadata; loaded analysis data into PostgreSQL.",
    ],
    exploration: [
      "Compared normalised proportions by year and income bracket, then investigated the group driving the change.",
    ],
    methodology: [
      "Composite score: emergency funds + employment stability − debt stress − hardship; equal weights are judgment calls.",
      "Independent $400-expense validation: mean scores 2.85 vs 0.35; t = 119.0, p < 0.001, Cohen’s d = 1.48.",
      "Compared Logistic Regression and Random Forest; segmented households with K-Means.",
    ],
    findings: [
      "Resilience fell 65.9% → 64.9%, concentrated under $25k; credit-access and job-instability associations are not causal.",
      "Three behavioural scores raised ROC-AUC from 0.799 to 0.867; emergency-fund overlap makes 0.916 secondary.",
      "Full-feature Logistic Regression (0.916) outperformed Random Forest (0.891); emergency funds and debt stress were strongest drivers.",
      "Standardisation improved K-Means silhouette 0.427 → 0.474, yielding four interpretable household segments.",
    ],
    limitations: [
      "Correlational, unweighted survey results; equal score weights are judgment calls.",
      "Emergency-fund information overlaps the target; single 80/20 split, no AUC uncertainty intervals.",
      "Approximately 4,419 linked respondents were not used for transition analysis.",
    ],
    next: [
      "Analyse linked respondents as a panel.",
      "Apply survey weighting and repeated stratified k-fold evaluation with intervals.",
    ],
  },
  "labor-market": {
    question: [
      "How have employment and wages changed across US occupations over time?",
      "Which occupations share similar employment profiles, and how do occupational skills relate to wages?",
      "How does measured AI exposure relate to recent employment growth, and how do simple trend forecasts compare with BLS projections?",
    ],
    importance: ["Occupational change informs career choices, workforce planning and education."],
    dataset: [
      "BLS OEWS: 830+ occupations across 11 years.",
      "O*NET occupation/skills data and public job postings add context.",
    ],
    cleaning: [
      "Used bulk historical files because the BLS OEWS API returns only the latest year.",
      "Preserved raw files; normalised columns and suppression codes in separate processing and curated layers.",
      "Loaded flat tables into PostgreSQL via SQLAlchemy, joined on SOC occupation codes.",
    ],
    methodology: [
      "StandardScaler and log-transformed employment kept K-Means from clustering solely by size; elbow method selected clusters.",
      "Benchmarked simple linear forecasts against BLS projections; used TF-IDF + K-Means for job titles.",
      "O*NET-based AI-exposure weights are manually justified judgment calls.",
      "Power BI used PostgreSQL; Docker pipeline verified once on AWS, then EC2 terminated.",
    ],
    findings: [
      "AI exposure had near-zero correlation (r = 0.008) with historical employment growth from 2020 to 2025 across 708 occupations. This is a measured null association in this sample, not evidence of no future impact.",
      "An 11-year linear trend overestimated BLS official 2025–2035 employment growth projections by 34.3 percentage points on average, illustrating the limits of long-range extrapolation.",
      "Importance ratings for ten basic O*NET skills showed moderate wage correlations (r = 0.40–0.63) at full scale. The exploratory n = 10 analysis produced contradictory correlations, which did not hold at scale.",
      "After log-transforming employment to reduce size-driven clustering, K-Means produced five economically coherent occupation tiers.",
      "SOC reclassification can break naive year-over-year comparisons: Data Scientists moved from SOC 15-2098 in 2020 to 15-2051 in the current classification.",
    ],
    limitations: [
      "No formal hypothesis testing or silhouette evaluation; naive forecasts diverge from expert projections.",
      "TF-IDF misses meaning beyond shared words; SOC reclassification breaks some long-run series.",
      "No automated tests or CI/CD; data volume did not justify PySpark.",
    ],
    next: ["Explore embeddings as an upgrade to TF-IDF."],
  },
};
export const plantDiseaseLabels = [
  ["Idea", "idea"],
  ["Approach", "solution"],
  ["Challenge", "challenge"],
  ["Outcome", "result"],
] as const;
export const studyCopy = { glance: "At a glance", details: "Read the details" };
