import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { person, roles, tagline } from '../data';
import { Magnetic, useScramble } from './fx';

function RoleCycler({ start }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start || reduce) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [start, reduce]);
  const text = useScramble(roles[i], start, 700);
  return (
    <span className="hero__role-cycle" aria-live="off">
      {start ? text : ' '}
    </span>
  );
}

const GRAD = [
  [34, 211, 238],
  [59, 130, 246],
  [139, 92, 246],
];
const gradAt = (t) => {
  const seg = Math.min(Math.floor(t * 2), 1);
  const f = t * 2 - seg;
  const a = GRAD[seg];
  const b = GRAD[seg + 1];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(',')})`;
};

function BigLine({ word, delay, start, className, gradient }) {
  const reduce = useReducedMotion();
  return (
    <span className={`hero__line ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <span className="hero__mask" key={i}>
          <motion.span
            className="hero__char"
            style={gradient ? { color: gradAt(i / Math.max(word.length - 1, 1)) } : undefined}
            initial={reduce ? false : { y: '110%', rotate: 8 }}
            animate={start ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const spread = useTransform(scrollYProgress, [0, 1], ['-0.04em', '0.06em']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeIn = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="hero" id="top" ref={ref} data-scene="0">
      <motion.div className="hero__inner wrap" style={reduce ? undefined : { opacity: fade }}>
        <motion.p className="hero__badge" {...fadeIn(0.1)}>
          <span className="hero__live" aria-hidden="true" />
          Sr. Cloud Solutions Architect @ Microsoft
        </motion.p>

        <h1 className="hero__name" aria-label={person.name.join(' ')}>
          <motion.span style={reduce ? undefined : { y: y1, letterSpacing: spread }} className="hero__row">
            <BigLine word={person.name[0]} delay={0.15} start={ready} className="hero__line--a" />
          </motion.span>
          <motion.span style={reduce ? undefined : { y: y2, letterSpacing: spread }} className="hero__row hero__row--b">
            <BigLine word={person.name[1]} delay={0.35} start={ready} className="hero__line--b" gradient />
          </motion.span>
        </h1>

        <div className="hero__foot">
          <motion.div className="hero__copy" {...fadeIn(0.9)}>
            <p className="hero__roles">
              <RoleCycler start={ready} />
            </p>
            <p className="hero__tagline">{tagline}</p>
          </motion.div>
          <motion.div className="hero__actions" {...fadeIn(1.05)}>
            <Magnetic>
              <a className="btn btn--glow" href="#contact">
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href="#agents">
                See my agents
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.a href="#about" className="hero__scroll" {...fadeIn(1.3)} aria-label="Scroll to the next section">
        <span className="hero__scroll-line" />
        Scroll
      </motion.a>
    </section>
  );
}
