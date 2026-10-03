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
import { keywords, places } from '../data';
import { scene } from '../lib/scene';

const stack = [
  siPython, siTypescript, siLanggraph, siLangchain, siFastapi, siGithubcopilot, siClaude, siDocker,
  siKubernetes, siTerraform, siGithubactions, siDatabricks, siHuggingface, siPytorch, siPostgresql, siReact,
];

// A row that drifts on its own and speeds up / skews with scroll velocity.
function VelocityRow({ children, base = 40, dir = 1, label, className = '' }) {
  const lane = useRef(null);
  useEffect(() => {
    const el = lane.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduce) return undefined;
    let x = 0;
    let skew = 0;
    let last = performance.now();
    let raf;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const v = scene.velocity || 0;
      const half = el.scrollWidth / 2;
      x -= dir * (base + Math.abs(v) * 28) * dt * (v < 0 ? -1 : 1);
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      skew += (Math.max(-12, Math.min(12, v * -0.6)) - skew) * 0.12;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [base, dir]);

  return (
    <div className={`vrow ${className}`} role="list" aria-label={label}>
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
  return (
    <section className="banner" aria-label="Where I've worked and what I build with" data-scene="1">
      <VelocityRow base={60} dir={1} label="Where I have worked and studied" className="vrow--places">
        {places.map((p) => (
          <span className="banner__place" role="listitem" key={p.name}>
            {p.logo ? <img src={p.logo} alt={p.name} /> : p.name}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </VelocityRow>

      <VelocityRow base={45} dir={-1} label="Focus areas" className="vrow--keys">
        {keywords.map((k) => (
          <span className="banner__key" role="listitem" key={k}>
            {k}
            <i aria-hidden="true">/</i>
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
