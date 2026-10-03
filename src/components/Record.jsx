import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { certTracks, experience, jobStyle, statusLabel } from '../data';
import { CountUp, ScrambleHeading, useTilt } from './fx';

function JobCard({ job, i, n, progress }) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.045]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [1, i === n - 1 ? 1 : 0.55]);
  const bright = useTransform(dim, (d) => `brightness(${d})`);
  const st = jobStyle[i];
  return (
    <div className="stack__slot">
      <motion.article
        className="job glass"
        style={{ '--tint': st.tint, top: `calc(${i * 26}px)`, ...(reduce ? {} : { scale, filter: bright }) }}
      >
        <span className="job__year" aria-hidden="true">
          {st.year}
        </span>
        <header className="job__head">
          <p className="job__period">{job.period}</p>
          <h3 className="job__company">{job.company}</h3>
          <p className="job__role">{job.role}</p>
          <p className="job__loc">{job.location}</p>
        </header>
        <ul className="job__list">
          {job.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section className="experience" id="experience" aria-labelledby="exp-title" data-scene="3">
      <div className="wrap">
        <ScrambleHeading className="h2" id="exp-title" text="Where I've made impact." />
      </div>
      <div className="stack wrap" ref={ref}>
        {experience.map((job, i) => (
          <JobCard key={job.company} job={job} i={i} n={experience.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function CertTile({ c, provider }) {
  const tilt = useTilt(10);
  return (
    <li className={`ctile glass ctile--${c.status}`} ref={tilt}>
      <span className="ctile__provider">{provider}</span>
      <span className="ctile__code">{c.code}</span>
      <span className="ctile__name">{c.name}</span>
      <span className="ctile__status">{statusLabel[c.status]}</span>
    </li>
  );
}

export function Certifications() {
  const all = certTracks.flatMap((t) => t.certs.map((c) => ({ ...c, provider: t.provider })));
  const earned = all.filter((c) => c.status === 'earned').length;
  return (
    <section className="certs" id="certifications" aria-labelledby="cert-title" data-scene="3">
      <div className="wrap">
        <div className="certs__head">
          <ScrambleHeading className="h2" id="cert-title" text="Certified across the clouds." />
          <p className="certs__big">
            <span className="certs__num">
              <CountUp to={earned} />
            </span>
            <span>certifications earned, more in progress</span>
          </p>
        </div>
        <ul className="ctiles">
          {all.map((c) => (
            <CertTile key={c.code} c={c} provider={c.provider} />
          ))}
        </ul>
      </div>
    </section>
  );
}
