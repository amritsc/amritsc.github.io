// All site copy and content lives here so updates never touch layout code.

export const person = {
  name: ['Amrit', 'Chauhan'],
  role: 'Senior Cloud Solutions Architect at Microsoft',
  pitch: 'I design agentic AI systems and help enterprises run them in production.',
  email: 'amrit.satnaam@gmail.com',
  linkedin: 'https://www.linkedin.com/in/amritchauhan',
  github: 'https://github.com/amritsc',
  githubUser: 'amritsc',
};

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

export const agents = {
  orchestrator: {
    name: 'IncidentResponseOrchestrator',
    description:
      'Chains every agent into one run, from the first alert to a deployed fix. It hands context between agents, gates the deploy on QA, and tracks metrics for the whole incident.',
    capabilities: ['Agent orchestration', 'Workflow automation', 'Metrics tracking', 'Full incident lifecycle'],
    tech: ['Multi-agent', 'Agent SDK', 'OpenAI', 'Python'],
  },
  classify: {
    name: 'EmailClassifierAgent',
    description:
      'Reads incoming alerts and email, then sorts them into urgent, to-do, reference or spam with a priority score, so the right people see the right thing first.',
    capabilities: ['Auto-classification', 'Keyword search', 'Priority scoring', 'Auto-reply templates'],
    tech: ['OpenAI', 'Python', 'Agent SDK', 'API'],
  },
  summarize: {
    name: 'MoMSummariserAgent',
    description:
      'Processes call transcripts and audio to pull out intent, a discussion summary and action items, so nobody has to take minutes on an incident bridge.',
    capabilities: ['Transcript analysis', 'Action item extraction', 'Intent detection', 'Audio transcription'],
    tech: ['OpenAI', 'Jupyter', 'Python', 'API'],
  },
  debug: {
    name: 'SmartDebuggerAgent',
    description:
      'Searches historical production issues and root-cause analyses for incidents like the new one, and suggests how they were resolved.',
    capabilities: ['Similarity search', 'Knowledge retrieval', 'Pattern matching', 'Solution suggestions'],
    tech: ['RAG', 'OpenAI', 'Jupyter', 'API'],
  },
  fix: {
    name: 'CoderAgent',
    description:
      'Takes faulty code and its stack trace, finds the root cause, and generates a corrected patch with a QA check before anything ships.',
    capabilities: ['Code analysis', 'Root cause detection', 'Patch generation', 'QA validation'],
    tech: ['OpenAI', 'Agent SDK', 'Python', 'AST'],
  },
};

// Which agent handles each pipeline stage.
export const stageOwner = {
  alert: 'orchestrator',
  classify: 'classify',
  summarize: 'summarize',
  debug: 'debug',
  fix: 'fix',
  deploy: 'orchestrator',
};

export const story =
  'I started on the AWS serverless team, keeping Fortune 500 workloads fast and affordable. At JPMorgan Chase I led AI strategy for technology resiliency and built agents on Azure OpenAI. Now at Microsoft I help enterprises design, govern and ship agents with Copilot Studio and Foundry.';

export const toolkit = [
  {
    group: 'Agents and AI',
    items: ['Copilot Studio', 'Foundry', 'Azure OpenAI', 'Agent SDK', 'MCP', 'RAG', 'Azure AI Search', 'LangGraph', 'Bedrock'],
  },
  {
    group: 'Cloud',
    items: ['Azure', 'AWS Lambda', 'API Gateway', 'Step Functions', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    group: 'Code',
    items: ['Python', 'TypeScript', 'Java', 'SQL', 'FastAPI', 'React', 'Node.js', '.NET'],
  },
];

// Wordmarks for the banner. To use an official logo instead of the typeset name,
// add the SVG to public/logos/ and set `logo: '/logos/<file>.svg'`.
export const places = [
  { name: 'Microsoft', logo: null },
  { name: 'JPMorgan Chase', logo: null },
  { name: 'Amazon Web Services', logo: null },
  { name: 'Prudential', logo: null },
  { name: 'Rutgers University', logo: null },
];

export const experience = [
  {
    company: 'Microsoft',
    role: 'Senior Cloud Solutions Architect, Agentic AI and Copilot',
    period: 'May 2026 – Present',
    location: 'New York, NY (Remote)',
    highlights: [
      'Architect AI and agentic solutions with Copilot and Copilot Studio for enterprise customers across the Microsoft Cloud',
      'Drive AI adoption, governance and Center of Excellence programs',
    ],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'AI Lead, CIB Technology Resiliency',
    period: 'Oct 2024 – May 2026',
    location: 'Jersey City, NJ',
    highlights: [
      'Led AI strategy, governance and enablement, building frameworks and controls aligned with business goals',
      'Served as the AI subject matter expert, advising C-suite executives on strategic AI adoption',
      'Architected multi-agent workflows with the Azure OpenAI Agent SDK and Azure AI Search',
      'Pioneered RAG-based solutions that accelerated business operations',
      'Wrote AWS service resiliency and recovery guides for 24+ cloud services',
      'Led cloud architecture reviews, risk assessments and firm-wide adoption initiatives',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Cloud Engineer I, Serverless (Lambda and API Gateway)',
    period: 'Aug 2022 – Nov 2024',
    location: 'Dallas, TX (Remote)',
    highlights: [
      'Managed Fortune 500 client relationships, enabling mission-critical cloud architectures',
      'Saved clients over $500,000 a year through infrastructure optimization',
      'Specialized in Lambda, API Gateway, Step Functions and serverless architectures',
      'Led complex multi-service resource migrations across AWS environments',
      'Cut deployment time and cost by 25% through architecture improvements',
    ],
  },
  {
    company: 'Prudential Financial',
    role: 'Software Engineering Intern',
    period: 'Summers 2020 and 2021',
    location: 'Newark, NJ',
    highlights: [
      'Led a VPC migration of EC2 instances between subnets, with security groups and route tables',
      'Built an SSO integration that cut enterprise login time by over 90%',
      'Presented security improvements directly to the CISO',
      'Used Splunk and AWS Redshift for SIEM work and fraud detection',
    ],
  },
];

export const education = {
  school: 'Rutgers University',
  degree: 'B.S. Computer Science',
  honors: 'magna cum laude',
};

export const certTracks = [
  {
    provider: 'Microsoft Azure',
    certs: [
      { code: 'AZ-305', name: 'Azure Solutions Architect Expert', status: 'earned' },
      { code: 'AI-102', name: 'Azure AI Engineer Associate', status: 'earned' },
      { code: 'AZ-900', name: 'Azure Fundamentals', status: 'earned' },
      { code: 'AI-900', name: 'Azure AI Fundamentals', status: 'earned' },
      { code: 'DP-900', name: 'Azure Data Fundamentals', status: 'earned' },
      { code: 'AB-900', name: 'Copilot and Agent Administration Fundamentals', status: 'in-progress' },
    ],
  },
  {
    provider: 'AWS',
    certs: [
      { code: 'SAA-C03', name: 'Solutions Architect Associate', status: 'earned' },
      { code: 'CLF-C02', name: 'Cloud Practitioner', status: 'earned' },
      { code: 'SAP-C02', name: 'Solutions Architect Professional', status: 'in-progress' },
    ],
  },
  {
    provider: 'Databricks',
    certs: [{ code: 'DBF', name: 'Databricks Fundamentals', status: 'earned' }],
  },
  {
    provider: 'Google Cloud',
    certs: [
      { code: 'CDL', name: 'Cloud Digital Leader', status: 'planned' },
      { code: 'ACE', name: 'Associate Cloud Engineer', status: 'planned' },
    ],
  },
];

export const statusLabel = { earned: 'Earned', 'in-progress': 'In progress', planned: 'Planned' };
