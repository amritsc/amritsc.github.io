import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { certTracks, experience, statusLabel } from '../data';

function Job({ job, open, onToggle, id }) {
  const reduce = useReducedMotion();
  return (
    <li className={`job ${open ? 'is-open' : ''}`}>
      <button type="button" className="job__row" aria-expanded={open} aria-controls={`${id}-body`} onClick={onToggle}>
        <span className="job__period">{job.period}</span>
        <span className="job__company">{job.company}</span>
        <span className="job__role">{job.role}</span>
        <span className="job__toggle" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-body`}
            className="job__body"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
          >
            <div className="job__inner">
              <p className="job__location">{job.location}</p>
              <ul>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section className="record chapter chapter--paper" id="experience" aria-labelledby="exp-title">
      <div className="wrap">
        <h2 className="h2" id="exp-title">
          Experience
        </h2>
        <ul className="jobs">
          {experience.map((job, i) => (
            <Job key={job.company} id={`job-${i}`} job={job} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Certifications() {
  const earned = certTracks.flatMap((t) => t.certs).filter((c) => c.status === 'earned').length;
  return (
    <section className="record record--certs chapter chapter--paper" id="certifications" aria-labelledby="cert-title">
      <div className="wrap">
        <div className="certs__head">
          <h2 className="h2" id="cert-title">
            Certifications
          </h2>
          <p className="certs__count">
            <strong>{earned}</strong> earned across Azure, AWS and Databricks
          </p>
        </div>
        <div className="certs">
          {certTracks.map((track) => (
            <div className="certs__track" key={track.provider}>
              <h3>{track.provider}</h3>
              <ul>
                {track.certs.map((c) => (
                  <li key={c.code} className={`cert cert--${c.status}`}>
                    <span className="cert__mark" aria-hidden="true" />
                    <span className="cert__code">{c.code}</span>
                    <span className="cert__name">{c.name}</span>
                    {c.status !== 'earned' && <span className="cert__status">{statusLabel[c.status]}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
