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
import { places } from '../data';

const stack = [
  siPython,
  siTypescript,
  siLanggraph,
  siLangchain,
  siFastapi,
  siGithubcopilot,
  siClaude,
  siDocker,
  siKubernetes,
  siTerraform,
  siGithubactions,
  siDatabricks,
  siHuggingface,
  siPytorch,
  siPostgresql,
  siReact,
];

function Marquee({ children, reverse, label }) {
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`} role="list" aria-label={label}>
      <div className="marquee__lane">
        <div className="marquee__set">{children}</div>
        <div className="marquee__set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Banner() {
  return (
    <section className="banner chapter chapter--paper" aria-labelledby="banner-title">
      <div className="wrap">
        <h2 className="h2" id="banner-title">
          Shaped by four companies and one university.
        </h2>
      </div>

      <Marquee label="Where I have worked and studied">
        {places.map((p) => (
          <span className="banner__place" role="listitem" key={p.name}>
            {p.logo ? <img src={p.logo} alt={p.name} /> : p.name}
          </span>
        ))}
      </Marquee>

      <div className="wrap">
        <h3 className="banner__sub">What I build with</h3>
      </div>

      <Marquee reverse label="Tools I build with">
        {stack.map((icon) => (
          <span className="banner__tool" role="listitem" key={icon.slug}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={icon.path} />
            </svg>
            {icon.title}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
