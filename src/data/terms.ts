export const terms = [
  { term: 'lore', meaning: 'The backstory of where the data came from.' },
  { term: 'no cap', meaning: 'No exaggeration; every number traces back to the repo.' },
  { term: 'plot twist', meaning: "What this analysis can't claim." },
  { term: 'receipts', meaning: 'The evidence behind a claim.' },
  { term: 'vibe check', meaning: 'A quick first look at how the data behaves.' },
  { term: 'glow-up', meaning: 'Messy data turned analysis-ready.' },
  { term: 'side quest', meaning: 'An optional extra mission (future improvement).' },
  { term: 'main quest', meaning: 'The primary goal.' },
  { term: 'locked in', meaning: 'Fully focused.' },
  { term: 'lowkey', meaning: 'Quietly, genuinely.' },
  { term: 'era', meaning: 'A phase focused on one thing.' },
  { term: 'W / L', meaning: 'Win / loss.' },
  { term: 'touch grass', meaning: 'Step away from the screen.' },
  { term: 'cooked', meaning: 'In serious trouble.' },
  { term: 'slide into my inbox', meaning: 'Message me directly.' },
] as const;
export type Term = typeof terms[number]['term'];
export const decodePhrases: { text: string; term: Term }[] = [
  { text: 'Main quest: Data Science.', term: 'main quest' }, { text: 'Side quests: AI/ML.', term: 'side quest' },
  { text: 'Raw data has lore.', term: 'lore' }, { text: 'Receipts over vibes.', term: 'receipts' }, { text: 'Locked in on the data.', term: 'locked in' },
  { text: 'lowkey obsessed with how data behaves', term: 'lowkey' }, { text: 'a glow-up, but with train/test splits.', term: 'glow-up' },
  { text: 'Honest stack. No cap.', term: 'no cap' }, { text: 'Current era: levelling up', term: 'era' },
  { text: 'Slide into my inbox.', term: 'slide into my inbox' }, { text: 'Touch grass', term: 'touch grass' },
  { text: 'This page is cooked.', term: 'cooked' },
];
export const doodleCode = ['df.groupby("income").mean()', 'from sklearn.linear_model import LogisticRegression', 'model.fit(X_train, y_train)', 'SELECT occupation, AVG(wage) FROM oews GROUP BY 1;', 'plt.show()', '# trust the data, verify the data'];
