import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Magnetic } from './fx';

/* ---------- Line icons (24px grid, 1.5 stroke) ---------- */
const P = {
  sparkles:
    'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z',
  cloud: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
  bolt: 'm3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  mail:
    'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
  doc: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  code: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
  search: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  plus: 'M12 4.5v15m7.5-7.5h-15',
  chevron: 'm8.25 4.5 7.5 7.5-7.5 7.5',
  arrowUpRight: 'm4.5 19.5 15-15m0 0H8.25m11.25 0v11.25',
  copy: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75',
  check: 'm4.5 12.75 6 6 9-13.5',
};

export function Icon({ name, className = 'w-5 h-5' }) {
  if (name === 'network') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="5" r="2.25" />
        <circle cx="5" cy="18" r="2.25" />
        <circle cx="19" cy="18" r="2.25" />
        <path d="M11 7 6.2 16M13 7l4.8 9M7.3 18h9.4" />
      </svg>
    );
  }
  if (name === 'hub') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4.5" cy="4.5" r="1.75" />
        <circle cx="19.5" cy="4.5" r="1.75" />
        <circle cx="4.5" cy="19.5" r="1.75" />
        <circle cx="19.5" cy="19.5" r="1.75" />
        <path d="M5.8 5.8 9.9 9.9M18.2 5.8l-4.1 4.1M5.8 18.2l4.1-4.1M18.2 18.2l-4.1-4.1" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  );
}

/* ---------- Accent palette shared by cards, tiles and the diagram ---------- */
export const ACCENT = {
  cyan: { hex: '#22d3ee', text: 'text-cyan-300' },
  purple: { hex: '#a78bfa', text: 'text-violet-300' },
  blue: { hex: '#60a5fa', text: 'text-blue-300' },
  green: { hex: '#34d399', text: 'text-emerald-300' },
  orange: { hex: '#fb923c', text: 'text-orange-300' },
};

/* ---------- Icon tile: gradient hairline border, glassy core ---------- */
export function IconTile({ icon, color = 'cyan', size = 'md' }) {
  const a = ACCENT[color];
  const dims = size === 'lg' ? 'w-14 h-14 rounded-[18px]' : 'w-12 h-12 rounded-2xl';
  return (
    <span className={`icon-tile ${dims}`} style={{ '--accent': a.hex }}>
      <span className="icon-tile__core">
        <Icon name={icon} className={size === 'lg' ? 'w-7 h-7' : 'w-6 h-6'} />
      </span>
    </span>
  );
}

/* ---------- Buttons ---------- */
export function PrimaryButton({ href, children, icon = 'chevron', external }) {
  return (
    <Magnetic strength={0.25}>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="btn-primary group"
      >
        <span>{children}</span>
        {icon && <Icon name={icon} className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </a>
    </Magnetic>
  );
}

export function SecondaryButton({ href, children, icon, external, onClick, as = 'a' }) {
  const Tag = as;
  return (
    <Magnetic strength={0.25}>
      <Tag
        href={href}
        onClick={onClick}
        type={as === 'button' ? 'button' : undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="btn-secondary group"
      >
        <span>{children}</span>
        {icon && <Icon name={icon} className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </Tag>
    </Magnetic>
  );
}

/* ---------- Copy email: shows the address, copies on click ---------- */
export function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const r = document.createRange();
      const el = document.getElementById('contact-email');
      if (el) {
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
    }
  };
  return (
    <Magnetic strength={0.2}>
      <button type="button" onClick={copy} className="btn-secondary group" aria-live="polite">
        <span id="contact-email" className="select-all">{email}</span>
        <Icon name={copied ? 'check' : 'copy'} className={`w-4 h-4 ${copied ? 'text-emerald-300' : ''}`} />
        <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
      </button>
    </Magnetic>
  );
}

/* ---------- Architecture diagram ---------- */
const NODES = [
  { name: 'EmailClassifierAgent', role: 'Classify', icon: 'mail', color: 'cyan' },
  { name: 'MoMSummariserAgent', role: 'Summarize', icon: 'doc', color: 'purple' },
  { name: 'CoderAgent', role: 'Fix', icon: 'code', color: 'green' },
  { name: 'SmartDebuggerAgent', role: 'Debug', icon: 'search', color: 'orange' },
];
const PIPELINE = [
  { label: 'Alert', color: '#f87171' },
  { label: 'Classify', color: '#22d3ee' },
  { label: 'Summarize', color: '#a78bfa' },
  { label: 'Debug', color: '#fb923c' },
  { label: 'Fix', color: '#34d399' },
  { label: 'Deploy', color: '#60a5fa' },
];
// Break long CamelCase names between words, keeping acronyms like MoM intact.
const camelBreak = (s) => s.replace(/([a-z])(?=[A-Z][a-z])/g, '$1\u200B');

export function ArchitectureDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="arch">
      <div className="text-center mb-10">
        <h4 className="text-lg font-semibold text-white">System Architecture</h4>
        <p className="text-sm text-slate-400 mt-1">One orchestrator coordinating four specialist agents</p>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="arch-orch"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="arch-orch__ring" aria-hidden="true" />
          <span className="arch-orch__inner">
            <IconTile icon="hub" color="blue" />
            <span className="text-left">
              <span className="block text-[15px] font-semibold text-white">IncidentResponseOrchestrator</span>
              <span className="block text-xs text-slate-400 mt-0.5">Routes every incident end to end</span>
            </span>
          </span>
        </motion.div>
      </div>

      {/* Connectors: desktop draws four curves with pulses traveling down them */}
      <svg className="hidden md:block w-full h-24" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
        {NODES.map((n, i) => {
          const x = 125 + i * 250;
          const d = `M500 0 C500 55 ${x} 45 ${x} 100`;
          return (
            <g key={n.name}>
              <path d={d} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <path
                d={d}
                fill="none"
                stroke={ACCENT[n.color].hex}
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="100"
                className="arch-pulse"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </g>
          );
        })}
      </svg>
      <div className="md:hidden flex justify-center" aria-hidden="true">
        <span className="block w-px h-10 bg-gradient-to-b from-blue-400/60 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {NODES.map((n, i) => (
          <motion.div
            key={n.name}
            className="arch-node"
            style={{ '--accent': ACCENT[n.color].hex }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
          >
            <IconTile icon={n.icon} color={n.color} />
            <span className="block mt-4 text-[13px] sm:text-sm font-semibold text-white leading-snug tracking-[-0.01em]">{camelBreak(n.name)}</span>
            <span className={`block mt-1 text-xs font-medium ${ACCENT[n.color].text}`}>{n.role}</span>
          </motion.div>
        ))}
      </div>

      <ol className="arch-pipeline" aria-label="Incident pipeline">
        {PIPELINE.map((s, i) => (
          <li key={s.label} className="arch-step" style={{ '--c': s.color, '--i': i }}>
            <span className="arch-step__pill">
              <span className="arch-step__dot" />
              {s.label}
            </span>
            {i < PIPELINE.length - 1 && <Icon name="chevron" className="w-3.5 h-3.5 text-slate-600" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
