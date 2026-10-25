import { useEffect, useRef } from 'react';
import {
  siClaude,
  siDatabricks,
  siDocker,
  siFastapi,
  siGithubactions,
  siGithubcopilot,
  siHuggingface,
  siKubernetes,
  siLangchain,
  siLanggraph,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siTerraform,
  siTypescript,
} from 'simple-icons';
import { CompanyLogo } from './logos';
import { scene } from '../lib/scene';

const companies = [
  { name: 'Microsoft', logo: 'microsoft' },
  { name: 'JPMorgan Chase', logo: 'jpmc' },
  { name: 'Amazon Web Services', logo: 'aws' },
  { name: 'Prudential Financial', logo: 'prudential' },
];

const keywords = ['Agentic AI', 'Copilot Studio', 'Azure AI Foundry', 'MCP', 'RAG', 'Multi-Agent Orchestration', 'AI Governance', 'Serverless'];

const stack = [
  siPython, siTypescript, siLanggraph, siLangchain, siFastapi, siGithubcopilot, siClaude, siDocker,
  siKubernetes, siTerraform, siGithubactions, siDatabricks, siHuggingface, siPytorch, siPostgresql, siReact,
];

// A row that drifts on its own and speeds up / skews with scroll velocity.
// It only animates while on screen, so it costs nothing elsewhere on the page.
function VelocityRow({ children, base = 40, dir = 1, label, className = '' }) {
  const wrap = useRef(null);
  const lane = useRef(null);

  useEffect(() => {
    const el = lane.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduce) return undefined;
    let x = 0;
    let skew = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let raf = 0;
    let visible = false;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let v = scene.velocity || 0;
      if (!scene.lenis) {
        v = (window.scrollY - lastY) * 0.4;
        lastY = window.scrollY;
      }
      const half = el.scrollWidth / 2;
      x -= dir * (base + Math.min(Math.abs(v), 60) * 22) * dt * (v < -0.5 ? -1 : 1);
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      skew += (Math.max(-10, Math.min(10, v * -0.5)) - skew) * 0.12;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) {
        last = performance.now();
        lastY = window.scrollY;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(wrap.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [base, dir]);

  return (
    <div className={`vrow ${className}`} role="list" aria-label={label} ref={wrap}>
      <div className="vrow__lane" ref={lane}>
        <div className="vrow__set">{children}</div>
        <div className="vrow__set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Banner() {
  const twice = [...companies, ...companies];
  return (
    <section id="banner" className="banner" aria-label="Where I've worked and what I build with">
      <VelocityRow base={55} dir={1} label="Where I have worked" className="vrow--places">
        {twice.map((c, i) => (
          <span className="banner__place" role="listitem" key={`${c.name}-${i}`}>
            <CompanyLogo company={c.logo} />
            {c.name}
          </span>
        ))}
      </VelocityRow>

      <VelocityRow base={45} dir={-1} label="Focus areas" className="vrow--keys">
        {keywords.map((k) => (
          <span className="banner__key" role="listitem" key={k}>
            {k}
            <i aria-hidden="true" />
          </span>
        ))}
      </VelocityRow>

      <VelocityRow base={35} dir={1} label="Tools I build with" className="vrow--tools">
        {stack.map((icon) => (
          <span className="banner__tool" role="listitem" key={icon.slug}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={icon.path} />
            </svg>
            {icon.title}
          </span>
        ))}
      </VelocityRow>
    </section>
  );
}
