import { useEffect, useState } from 'react';
import { person } from '../data';

const links = [
  { href: '#agents', label: 'Agents' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#builds', label: 'Builds' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top">
          Amrit Chauhan
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
          Contact
        </a>
      </div>
    </header>
  );
}

export function Contact() {
  return (
    <section className="contact chapter chapter--ink" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 className="contact__title" id="contact-title">
          Building with agents? Let’s talk.
        </h2>
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
        <footer className="footer">
          <p>© {new Date().getFullYear()} Amrit Chauhan</p>
          <p>Designed and built with React and Framer Motion</p>
        </footer>
      </div>
    </section>
  );
}
