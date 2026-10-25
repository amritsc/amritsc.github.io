import { lazy, Suspense, useCallback, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CompanyLogo } from './components/logos';
import Banner from './components/Banner';
import Trace from './components/Trace';
import LiveRepos from './components/LiveRepos';
import { ArchitectureDiagram, CopyEmail, Icon, IconTile, PrimaryButton, SecondaryButton } from './components/ui';
import { Cursor, Preloader, ScrollProgress } from './components/fx';
import { scene, ScrollTrigger, startSmoothScroll, watchScenes } from './lib/scene';

const Particles = lazy(() => import('./components/Particles'));

// Social links
const SocialLinks = ({ size = "default", className = "" }) => {
  const links = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/amritchauhan", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { name: "GitHub", url: "https://github.com/amritsc", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
    { name: "Email", url: "mailto:amrit.satnaam@gmail.com", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target={link.name !== "Email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className={`${size === "large" ? "w-12 h-12 text-slate-300" : "w-9 h-9 text-slate-400"} rounded-full bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center hover:text-white hover:ring-white/30 hover:bg-white/[0.08] transition-all duration-300`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={link.name}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = ['About', 'Projects', 'Agents', 'Experience', 'Certifications', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/10' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.a href="#hero" className="text-xl font-bold tracking-tight" whileHover={{ scale: 1.05 }}>
          <span className="text-cyan-400">A</span><span className="text-white">mrit</span><span className="text-cyan-400">.</span>
        </motion.a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
        <SocialLinks />
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const taglineParts = [
    { text: "AI Architect.", highlight: true },
    { text: "Cloud Strategist.", highlight: true },
    { text: "Turning AI Ambition into Production Reality.", highlight: false },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-0">
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SR. CLOUD SOLUTIONS ARCHITECT @ MICROSOFT
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
          <motion.span className="inline-block text-white" whileHover={{ textShadow: "0 0 30px rgba(6,182,212,0.5)", transition: { duration: 0.2 } }}>Amrit</motion.span>
          <motion.span 
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 ml-4"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.02 }}
          >
            Chauhan
          </motion.span>
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-10">
          {taglineParts.map((part, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              className={`text-lg md:text-xl lg:text-2xl ${part.highlight ? 'text-white font-bold' : 'text-slate-400 font-light'}`}
            >
              {part.text}
            </motion.span>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex flex-wrap justify-center gap-3 mb-10">
          <PrimaryButton href="#contact">Get in touch</PrimaryButton>
          <SecondaryButton href="#projects" icon="chevron">View my work</SecondaryButton>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex justify-center mb-14">
          <SocialLinks size="large" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500 tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center">
              <motion.div animate={{ y: [2, 14, 2] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    { category: "AI/ML", color: "cyan", items: ["Azure OpenAI", "OpenAI", "LLMs", "RAG", "Agentic AI", "PyTorch", "Hugging Face", "Azure AI Search", "Agent SDK", "SageMaker", "Bedrock", "Copilot Studio", "Foundry", "GPT-4", "Claude", "Fine-tuning"] },
    { category: "Cloud Platforms", color: "orange", items: ["AWS", "Azure", "Lambda", "API Gateway", "Step Functions", "EC2", "S3", "Cognitive Services", "CloudFormation"] },
    { category: "Languages", color: "purple", items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "R", "PowerShell", "Bash", "HTML5"] },
    { category: "Frameworks", color: "green", items: ["React", "Angular", "Node.js", "FastAPI", "Spring Boot", ".NET", "Pandas", "NumPy"] },
    { category: "DevOps & Infra", color: "blue", items: ["Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Active Directory"] },
    { category: "Data & Analytics", color: "pink", items: ["PostgreSQL", "MongoDB", "MySQL", "Redshift", "Kafka", "Hadoop", "Spark", "Power BI", "Tableau", "Splunk", "ELK Stack"] },
  ];

  const colorMap = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    green: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20" },
  };

  return (
    <section id="about" className="py-32 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">ABOUT</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Bridging the gap between<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI innovation and enterprise reality.</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-5 text-slate-300 leading-relaxed">
            <p>I'm a Senior Cloud Solutions Architect at <span className="text-white font-medium">Microsoft</span>, focused on Agentic AI, Copilot, and AI business solutions—helping enterprise customers turn AI ambition into production reality.</p>
            <p>Previously, I led AI and Agentic AI strategy, enablement, development, and governance for the CIB Technology Resiliency team at <span className="text-white font-medium">JPMorgan Chase</span>, and spent over two years at <span className="text-white font-medium">Amazon Web Services</span> as a Cloud Engineer for Fortune 500 clients—saving them over <span className="text-cyan-400 font-semibold">$500K annually</span> in serverless infrastructure costs.</p>
            <p>I'm passionate about taking AI from proof-of-concept to production—building systems that don't just demo well, but scale reliably and deliver real business value.</p>
            <p className="text-slate-500 text-sm">B.S. Computer Science, Rutgers University — <span className="text-slate-400">magna cum laude</span></p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((group, index) => {
              const colors = colorMap[group.color];
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                  className={`p-4 bg-slate-800/30 border ${colors.border} rounded-xl backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300`}
                >
                  <h4 className={`${colors.text} font-semibold text-sm mb-3`}>{group.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span key={skill} className={`text-xs px-2 py-1 ${colors.bg} ${colors.text} rounded-md`}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// My Work / Projects Section - Updated categories
const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projectCategories = [
    { 
      title: "AI & Machine Learning", 
      desc: "LLM integrations, model training, NLP pipelines, and intelligent automation", 
      icon: "sparkles",
      color: "cyan"
    },
    { 
      title: "Agentic Systems", 
      desc: "Multi-agent orchestration, autonomous workflows, and cognitive architectures", 
      icon: "network",
      color: "purple"
    },
    { 
      title: "Cloud Infrastructure", 
      desc: "Production-ready IaC templates for AWS, Azure, and hybrid deployments", 
      icon: "cloud",
      color: "blue"
    },
    { 
      title: "Automation & Dev Tools", 
      desc: "CLI utilities, CI/CD pipelines, and developer productivity tooling", 
      icon: "bolt",
      color: "green"
    },
  ];


  return (
    <section id="projects" className="py-32 px-4 bg-slate-900/30 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">MY WORK</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Hands-on innovation.</h3>
          <p className="text-slate-400 text-lg max-w-3xl">
            Beyond enterprise work, I continuously explore emerging AI/ML technologies through practical, hands-on projects. 
            These repositories showcase my ongoing experimentation with agentic systems, machine learning pipelines, cloud-native architectures, and 
            cutting-edge development patterns.
          </p>
        </motion.div>

        {/* GitHub Integration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <motion.a
            href="https://github.com/amritsc"
            target="_blank"
            rel="noopener noreferrer"
            className="card-lift block p-8 group"
            style={{ '--accent': '#22d3ee' }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-slate-700/80 to-slate-900 ring-1 ring-white/10 flex items-center justify-center group-hover:ring-cyan-400/40 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-2xl font-bold text-white">github.com/amritsc</h4>
                  <span className="w-8 h-8 rounded-full bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                    <Icon name="arrowUpRight" className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-slate-400 mb-4">
                  Explore my public repositories featuring AI agents, ML experiments, cloud infrastructure templates, automation scripts, 
                  and experimental projects pushing the boundaries of what's possible with modern technology.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "TypeScript", "AI/ML", "LLMs", "Cloud", "Automation", "Open Source"].map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* Project Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectCategories.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="card-lift p-6"
              style={{ '--accent': { cyan: '#22d3ee', purple: '#a78bfa', blue: '#60a5fa', green: '#34d399' }[project.color] }}
            >
              <IconTile icon={project.icon} color={project.color} />
              <h5 className="text-lg font-semibold text-white mt-5 mb-2">{project.title}</h5>
              <p className="text-slate-400 text-sm leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>

        <LiveRepos />
      </div>
    </section>
  );
};

// Agents Section - With coming soon cards
const AgentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const agents = [
    {
      name: "EmailClassifierAgent",
      description: "Intelligent email triage system that reads, classifies, and prioritizes emails into categories (urgent, spam, to-do, reference) using NLP analysis.",
      capabilities: ["Auto-classification", "Keyword search", "Priority scoring", "Auto-reply templates"],
      tech: ["OpenAI", "Python", "Agent SDK", "API"],
      color: "cyan",
      icon: "mail",
    },
    {
      name: "MoMSummariserAgent",
      description: "Meeting intelligence agent that processes call transcripts to extract intent, discussion summaries, and actionable items automatically.",
      capabilities: ["Transcript analysis", "Action item extraction", "Intent detection", "Audio transcription"],
      tech: ["OpenAI", "Jupyter Notebooks", "Python", "API"],
      color: "purple",
      icon: "doc",
    },
    {
      name: "CoderAgent",
      description: "Automated debugging agent that analyzes faulty code with stack traces, determines root causes, and generates corrected code patches.",
      capabilities: ["Code analysis", "Root cause detection", "Auto-fix generation", "QA validation"],
      tech: ["OpenAI", "Agent SDK", "Python", "AST"],
      color: "green",
      icon: "code",
    },
    {
      name: "SmartDebuggerAgent",
      description: "Knowledge-powered debugging system that searches historical production issues and RCAs to provide resolution insights for new incidents.",
      capabilities: ["Similarity search", "Knowledge retrieval", "Pattern matching", "Solution suggestions"],
      tech: ["RAG", "OpenAI", "Jupyter Notebooks", "API"],
      color: "orange",
      icon: "search",
    },
    {
      name: "IncidentResponseOrchestrator",
      description: "Multi-agent orchestration system that chains all agents for end-to-end automated incident response—from alert detection to fix deployment.",
      capabilities: ["Agent orchestration", "Workflow automation", "Metrics tracking", "Full incident lifecycle"],
      tech: ["Multi-Agent", "Agent SDK", "OpenAI", "Python"],
      color: "blue",
      icon: "hub",
      featured: true,
    },
  ];

  const colorMap = {
    cyan: { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/30", accent: "text-cyan-400", glow: "shadow-cyan-500/20" },
    purple: { bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", accent: "text-purple-400", glow: "shadow-purple-500/20" },
    green: { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/30", accent: "text-emerald-400", glow: "shadow-emerald-500/20" },
    orange: { bg: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/30", accent: "text-orange-400", glow: "shadow-orange-500/20" },
    blue: { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", accent: "text-blue-400", glow: "shadow-blue-500/20" },
  };

  return (
    <section id="agents" className="py-32 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-6">
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">AGENTS DEPLOYED</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Production-grade AI systems.</h3>
          <p className="text-slate-400 text-lg max-w-3xl mb-4">
            This multi-agent system was developed and deployed as part of the <span className="text-cyan-400 font-medium">JPMorgan Chase Agentic AI Hackathon</span>. 
            Each agent addresses a specific enterprise challenge, with the orchestrator enabling end-to-end automated incident response.
          </p>
          <p className="text-slate-500 text-sm">
            Additional production agents and systems will be added as they're developed.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <ArchitectureDiagram />
        </motion.div>

        {/* Live run of the orchestrator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12"
        >
          <Trace />
        </motion.div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const colors = colorMap[agent.color];
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`card-lift card-accent group p-6 ${agent.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ '--accent': { cyan: '#22d3ee', purple: '#a78bfa', green: '#34d399', orange: '#fb923c', blue: '#60a5fa' }[agent.color] }}
              >
                <div className="flex items-start justify-between mb-5">
                  <IconTile icon={agent.icon} color={agent.color} />
                  {agent.featured && (
                    <span className="text-xs px-2.5 py-1 bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30 rounded-full font-medium">Orchestrator</span>
                  )}
                </div>
                
                <h4 className={`text-lg font-bold text-white mb-2`}>{agent.name}</h4>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{agent.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Capabilities:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap) => (
                      <span key={cap} className="text-xs px-2.5 py-1 bg-white/[0.05] ring-1 ring-white/10 text-slate-300 rounded-full">{cap}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {agent.tech.map((t) => (
                    <span key={t} className={`text-xs px-2.5 py-1 bg-slate-950/40 ${colors.accent} rounded-full font-medium`}>{t}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Coming Soon Cards */}
          {[1, 2].map((i) => (
            <motion.div
              key={`coming-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="coming-soon p-6 rounded-3xl flex items-center justify-center min-h-[280px] group"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-dashed border-white/15 bg-white/[0.03] flex items-center justify-center mx-auto mb-4 text-slate-500 group-hover:text-slate-300 group-hover:border-white/30 transition-all duration-300">
                  <Icon name="plus" className="w-5 h-5" />
                </div>
                <p className="text-slate-400 text-sm font-medium">More agents coming soon</p>
                <p className="text-slate-600 text-xs mt-1">Production systems in development</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Experience Section
const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "Microsoft",
      logo: "microsoft",
      role: "Senior Cloud Solutions Architect – Agentic AI & Copilot",
      period: "May 2026 – Present",
      location: "New York, NY · Remote",
      highlights: [
        "Architecting AI and Agentic AI solutions—including Copilot and Copilot Studio—for enterprise customers across the Microsoft Cloud ecosystem",
        "Driving AI business solutions adoption, governance, and Center of Excellence initiatives",
        "Coming soon ✨",
      ],
    },
    {
      company: "JPMorgan Chase & Co.",
      logo: "jpmc",
      role: "AI Lead - CIB Technology Resiliency",
      period: "October 2024 – May 2026",
      location: "Jersey City, NJ",
      highlights: [
        "Leading AI strategy, governance, and enablement—developing frameworks and controls aligned with business goals",
        "Serving as AI Subject Matter Expert, advocating strategic AI adoption to C-Suite executives",
        "Architecting multi-agent AI workflows with Azure OpenAI Agent SDK and Azure AI Search",
        "Pioneered RAG-based AI solutions accelerating business operations exponentially",
        "Developed AWS service resiliency and recovery guides for 24+ cloud services",
        "Leading cloud architecture reviews, risk assessments, and firm-wide adoption initiatives",
      ],
    },
    {
      company: "Amazon Web Services",
      logo: "aws",
      role: "Cloud Engineer I - Serverless (Lambda/API Gateway)",
      period: "August 2022 – November 2024",
      location: "Dallas, TX (Remote)",
      highlights: [
        "Managed Fortune 500 client relationships, enabling mission-critical cloud architectures",
        "Saved clients over $500,000 annually through infrastructure optimization",
        "Specialized in Lambda, API Gateway, Step Functions, and serverless architectures",
        "Led complex multi-service resource migrations across AWS environments",
        "Decreased deployment speed and cost by 25% through architecture improvements",
      ],
    },
    {
      company: "Prudential Financial",
      logo: "prudential",
      role: "Software Engineering Intern",
      period: "Summer 2020 & 2021",
      location: "Newark, NJ",
      highlights: [
        "Led VPC migration of EC2 instances between subnets with security groups and route tables",
        "Developed SSO integration reducing enterprise login time by over 90%",
        "Presented security improvements directly to CISO",
        "Utilized Splunk and AWS Redshift for SIEM tasks and fraud detection",
      ],
    },
  ];

  return (
    <section id="experience" className="py-32 px-4 bg-slate-900/30 relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">EXPERIENCE</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">Where I've made impact.</h3>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.01 }}
              className="group relative"
            >
              <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-cyan-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <CompanyLogo company={exp.logo} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-white">{exp.company}</h4>
                      <span className="text-xs font-medium px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-cyan-400 font-medium mb-1">{exp.role}</p>
                    <p className="text-slate-500 text-sm mb-4">{exp.location}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li 
                          key={i} 
                          className="text-slate-400 text-sm flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.15 + i * 0.05 }}
                        >
                          <span className="text-cyan-500 mt-1.5 text-xs">▹</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// V3 Style Cert Provider Logos
const CertBadge = ({ provider, color }) => {
  const badges = {
    AWS: (
      <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl" style={{ backgroundColor: `${color}20`, color: color }}>
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <path d="M30 60 Q50 75 70 60" stroke={color} strokeWidth="6" fill="none"/>
          <path d="M25 45 L40 35 L40 55 Z" fill={color}/>
          <path d="M45 45 L60 35 L60 55 Z" fill={color}/>
          <path d="M65 45 L80 35 L80 55 Z" fill={color}/>
        </svg>
      </div>
    ),
    Azure: (
      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color: color }}>
        <svg viewBox="0 0 100 100" className="w-9 h-9">
          <path d="M25 75 L45 25 L55 25 L40 60 L75 60 L55 75 Z" fill={color}/>
        </svg>
      </div>
    ),
    GCP: (
      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color: color }}>
        <svg viewBox="0 0 100 100" className="w-9 h-9">
          <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="6"/>
          <circle cx="50" cy="25" r="8" fill="#EA4335"/>
          <circle cx="28" cy="62" r="8" fill="#FBBC05"/>
          <circle cx="72" cy="62" r="8" fill="#34A853"/>
        </svg>
      </div>
    ),
    Databricks: (
      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20`, color: color }}>
        <svg viewBox="0 0 100 100" className="w-9 h-9">
          <path d="M50 15 L80 32 L50 49 L20 32 Z" fill={color} opacity="0.9"/>
          <path d="M20 42 L50 59 L80 42 L80 52 L50 69 L20 52 Z" fill={color} opacity="0.7"/>
          <path d="M20 59 L50 76 L80 59 L80 69 L50 86 L20 69 Z" fill={color} opacity="0.5"/>
        </svg>
      </div>
    ),
  };
  return badges[provider];
};

// Certifications Section
const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tracks = [
    {
      provider: "AWS",
      color: "#FF9900",
      certs: [
        { name: "AWS Certified Cloud Practitioner", code: "CLF-C02", status: "completed" },
        { name: "AWS Certified Solutions Architect – Associate", code: "SAA-C03", status: "completed" },
        { name: "AWS Certified Solutions Architect – Professional", code: "SAP-C02", status: "upcoming" },
      ],
    },
    {
      provider: "Azure",
      color: "#0078D4",
      certs: [
        { name: "Microsoft Certified: Azure Fundamentals", code: "AZ-900", status: "completed" },
        { name: "Microsoft Certified: Azure AI Fundamentals", code: "AI-900", status: "completed" },
        { name: "Microsoft Certified: Azure Data Fundamentals", code: "DP-900", status: "completed" },
        { name: "Microsoft Certified: Azure AI Engineer Associate", code: "AI-102", status: "completed" },
        { name: "Microsoft 365 Certified: Copilot and Agent Administration Fundamentals", code: "AB-900", status: "completed" },
        { name: "Microsoft Certified: Azure Solutions Architect Expert", code: "AZ-305", status: "completed" },
      ],
    },
    {
      provider: "GCP",
      color: "#4285F4",
      certs: [
        { name: "Google Cloud Digital Leader", code: "CDL", status: "planned" },
        { name: "Google Associate Cloud Engineer", code: "ACE", status: "planned" },
      ],
    },
    {
      provider: "Databricks",
      color: "#FF3621",
      certs: [
        { name: "Databricks Fundamentals", code: "DBF", status: "completed" },
      ],
    },
  ];

  return (
    <section id="certifications" className="py-32 px-4 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">CERTIFICATIONS</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">The certification journey.</h3>
          <p className="text-slate-400 text-lg max-w-2xl">Building expertise across the major cloud platforms—from foundational knowledge to specialized AI engineering.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tracks.map((track, ti) => (
            <motion.div
              key={track.provider}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ti * 0.15 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b" style={{ borderColor: `${track.color}30` }}>
                <CertBadge provider={track.provider} color={track.color} />
                <div>
                  <h4 className="text-xl font-bold text-white">{track.provider}</h4>
                  <p className="text-slate-500 text-sm">{track.certs.filter(c => c.status === 'completed').length} of {track.certs.length} completed</p>
                </div>
              </div>

              <div className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ background: `linear-gradient(to bottom, ${track.color}, ${track.color}30, transparent)` }} />

                {track.certs.map((cert, ci) => (
                  <motion.div
                    key={cert.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + ti * 0.1 + ci * 0.1 }}
                    className="relative pb-5 last:pb-0"
                  >
                    <div 
                      className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${cert.status === 'completed' ? 'scale-100' : 'scale-90'}`}
                      style={{ 
                        borderColor: track.color,
                        backgroundColor: cert.status === 'completed' ? track.color : cert.status === 'upcoming' ? 'rgb(15, 23, 42)' : 'transparent',
                        borderStyle: cert.status === 'planned' ? 'dashed' : 'solid',
                      }}
                    >
                      {cert.status === 'completed' && (
                        <motion.div 
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: track.color }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    <div className="ml-5">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${track.color}20`, color: track.color }}>{cert.code}</span>
                        {cert.status === 'completed' && <span className="text-xs text-emerald-400 font-medium">Certified</span>}
                        {cert.status === 'upcoming' && <span className="text-xs text-yellow-400 font-medium">In Progress</span>}
                        {cert.status === 'planned' && <span className="text-xs text-slate-500">Planned</span>}
                      </div>
                      <p className={`text-sm leading-tight ${cert.status === 'completed' ? 'text-white' : 'text-slate-400'}`}>{cert.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-4 bg-slate-900/30 relative" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-xs font-medium tracking-[0.3em] text-cyan-400 mb-4">CONTACT</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build something together.</h3>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Whether you're looking to discuss AI strategy, cloud architecture, or just want to connect—I'm always open to a conversation.</p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <PrimaryButton href="mailto:amrit.satnaam@gmail.com" icon="arrowUpRight">Say hello</PrimaryButton>
            <CopyEmail email="amrit.satnaam@gmail.com" />
          </div>

          <SocialLinks size="large" className="justify-center" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="mt-24 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-sm">Designed & Built by Amrit Chauhan · {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </section>
  );
};

// Main App
export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => {
    setReady(true);
    scene.ready = true;
  }, []);

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    if (!ready) return undefined;
    const stop = watchScenes();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    return stop;
  }, [ready]);

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30">
      <Preloader onDone={onDone} />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      {ready && (
        <div className="relative z-[3] overflow-x-clip">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <Banner />
          <WorkSection />
          <AgentsSection />
          <ExperienceSection />
          <CertificationsSection />
          <ContactSection />
        </div>
      )}
    </div>
  );
}
