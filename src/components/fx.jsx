import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/* ---------- Preloader: counts to 100, then the curtain lifts ---------- */
export function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) {
      onDone();
      setGone(true);
      return undefined;
    }
    let raf;
    let bail;
    const start = performance.now();
    const dur = 1900;
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    let fontsReady = false;
    fonts.then(() => {
      fontsReady = true;
    });
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1 || !fontsReady) raf = requestAnimationFrame(tick);
      else {
        clearTimeout(bail);
        setLeaving(true);
        setTimeout(onDone, 250);
        setTimeout(() => setGone(true), 1300);
      }
    };
    raf = requestAnimationFrame(tick);
    // Never hold the page hostage: leave after 3.2s no matter what.
    bail = setTimeout(() => {
      cancelAnimationFrame(raf);
      setN(100);
      setLeaving(true);
      onDone();
      setTimeout(() => setGone(true), 1100);
    }, 3200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="loader__top">
        <span>Amrit Chauhan</span>
        <span>Agentic AI · Cloud</span>
      </div>
      <div className="loader__bar">
        <span style={{ transform: `scaleX(${n / 100})` }} />
      </div>
      <div className="loader__count">{String(n).padStart(3, '0')}</div>
    </div>
  );
}

/* ---------- Custom cursor (fine pointers only) ---------- */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    const pos = { x: -100, y: -100, rx: -100, ry: -100 };
    let hover = false;
    let down = false;
    let raf;
    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target.closest('a, button, [data-cursor]');
      hover = Boolean(t);
      if (ring.current) ring.current.dataset.label = t?.dataset.cursor || '';
    };
    const dn = () => (down = true);
    const up = () => (down = false);
    const tick = () => {
      pos.rx += (pos.x - pos.rx) * 0.16;
      pos.ry += (pos.y - pos.ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) {
        const s = (hover ? 2.4 : 1) * (down ? 0.8 : 1);
        ring.current.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0) scale(${s})`;
        ring.current.classList.toggle('is-hover', hover);
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!on) return null;
  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}

/* ---------- Magnetic: children drift toward the pointer ---------- */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const reduce = useReducedMotion();

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/* ---------- Scramble: text resolves out of random glyphs ---------- */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\';
export function useScramble(text, run = true, duration = 900) {
  const [out, setOut] = useState(text);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run || reduce) {
      setOut(text);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(p * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed || ch === ' ') s += ch;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, duration, reduce]);
  return out;
}

export function ScrambleHeading({ as: Tag = 'h2', text, className = '', id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const out = useScramble(text, inView, Math.min(1400, 40 * text.length + 300));
  return (
    <Tag ref={ref} className={className} id={id} aria-label={text}>
      <span aria-hidden="true">{inView ? out : ' '}</span>
    </Tag>
  );
}

/* ---------- Count up when visible ---------- */
export function CountUp({ to, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setV(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* ---------- Thin scroll progress bar ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}

/* ---------- Spotlight + tilt for glass tiles ---------- */
export function useTilt(max = 8) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !fine) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      if (!reduce) el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
    };
    const leave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [max]);
  return ref;
}
