import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { education, story, toolkit } from '../data';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="story__word" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  );
}

export default function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = story.split(' ');

  return (
    <section className="story chapter chapter--ink" id="about">
      <div className="wrap">
        <p className="story__text" ref={ref}>
          {reduce
            ? story
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>

        <div className="story__facts">
          {toolkit.map((g) => (
            <div className="story__fact" key={g.group}>
              <h3>{g.group}</h3>
              <p>{g.items.join(', ')}</p>
            </div>
          ))}
          <div className="story__fact">
            <h3>Education</h3>
            <p>
              {education.degree}, {education.school}, <em>{education.honors}</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
