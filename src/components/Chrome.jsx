import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { person } from '../data';
import { Magnetic } from './fx';

const links = [
  { href: '#about', label: 'About' },
  { href: '#agents', label: 'Agents' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certs' },
  { href: '#builds', label: 'Builds' },
];

export function Nav({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav__pill">
        <a className="nav__brand" href="#top" aria-label="Back to top">
          Amrit<span>.</span>
        </a>
        <nav aria-label="Sections">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="nav__cta" href="#contact">
          Let’s talk
        </a>
      </div>
    </motion.header>
  );
}

export function Contact() {
  const line1 = "Let's build";
  const line2 = "what's next.";
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title" data-scene="4">
      <div className="wrap contact__inner">
        <h2 className="contact__title" id="contact-title">
          <span className="contact__line">{line1}</span>
          <span className="contact__line contact__line--b">{line2}</span>
        </h2>
        <div className="contact__row">
          <Magnetic strength={0.5}>
            <a className="contact__orb" href={`mailto:${person.email}`} data-cursor="Email">
              <span>Say hello</span>
            </a>
          </Magnetic>
          <div className="contact__details">
            <a className="contact__email" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <ul className="contact__links">
              <li>
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={person.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer wrap">
        <p>© {new Date().getFullYear()} Amrit Chauhan</p>
        <p>Built with React, Three.js and GSAP</p>
      </footer>
    </section>
  );
}
