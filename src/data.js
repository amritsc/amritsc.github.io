// Data for the simulated agent run shown in the Agents section.

// Pipeline stages. Each hue is used only to identify its stage, everywhere it appears.
export const stages = [
  { id: 'alert', label: 'Alert', color: 'var(--st-alert)' },
  { id: 'classify', label: 'Classify', color: 'var(--st-classify)' },
  { id: 'summarize', label: 'Summarize', color: 'var(--st-summarize)' },
  { id: 'debug', label: 'Debug', color: 'var(--st-debug)' },
  { id: 'fix', label: 'Fix', color: 'var(--st-fix)' },
  { id: 'deploy', label: 'Deploy', color: 'var(--st-deploy)' },
];

// Illustrative run shown in the hero. Times are simulated seconds.
export const traceRun = {
  title: 'Checkout latency alert',
  total: 252,
  spans: [
    { stage: 'alert', who: 'Monitor', start: 0, end: 6, note: 'p95 latency above 2s on checkout-api' },
    { stage: 'classify', who: 'EmailClassifier', start: 6, end: 24, note: 'Rated P1 and routed to the payments team' },
    { stage: 'summarize', who: 'MoMSummariser', start: 24, end: 66, note: 'Turned the bridge call into 3 action items' },
    { stage: 'debug', who: 'SmartDebugger', start: 66, end: 134, note: 'Matched 2 past RCAs: connection pool exhaustion' },
    { stage: 'fix', who: 'Coder', start: 134, end: 206, note: 'Wrote a patch raising the pool timeout' },
    { stage: 'deploy', who: 'Orchestrator', start: 206, end: 252, note: 'QA passed, patch deployed' },
  ],
};
