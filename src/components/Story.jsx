import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { education, stats, story } from '../data';
import { CountUp } from './fx';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, ['blur(6px)', 'blur(0px)']);
  return (
    <motion.span className="story__word" style={{ opacity, filter: blur }}>
      {children}{' '}
    </motion.span>
  );
}

export default function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = story.split(' ');

  return (
    <section className="story" id="about" data-scene="1">
      <div className="wrap">
        <p className="story__text" ref={ref}>
          {reduce
            ? story
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>

        <ul className="stats">
          {stats.map((s) => (
            <li className="stat" key={s.label}>
              <span className="stat__num">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="story__edu">
          {education.degree}, {education.school}, <em>{education.honors}</em>
        </p>
      </div>
    </section>
  );
}
