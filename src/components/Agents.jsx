import { useLayoutEffect, useRef } from 'react';
import { agents, breakable, stageOwner, stages } from '../data';
import { gsap } from '../lib/scene';
import { ScrambleHeading, useTilt } from './fx';
import Trace from './Trace';

function StageCard({ stage, index }) {
  const agent = agents[stageOwner[stage.id]];
  const tilt = useTilt(6);
  return (
    <article className="scard glass" ref={tilt} style={{ '--c': stage.color }}>
      <div className="scard__top">
        <span className="scard__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="scard__stage">
          <i />
          {stage.label}
        </span>
      </div>
      <h3 className="scard__name">{breakable(agent.name)}</h3>
      <p className="scard__desc">{agent.description}</p>
      <ul className="scard__caps">
        {agent.capabilities.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <p className="scard__tech">{agent.tech.join(' · ')}</p>
    </article>
  );
}

export default function Agents() {
  const pin = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="agents" id="agents" aria-labelledby="agents-title" data-scene="2">
      <div className="agents__pin" ref={pin}>
        <div className="wrap agents__head">
          <ScrambleHeading className="h2" id="agents-title" text="Agents that run the incident." />
          <p className="lede">
            Built for the JPMorgan Chase Agentic AI Hackathon: four specialist agents and an orchestrator take an incident
            from first alert to deployed fix. Scroll through the pipeline.
          </p>
        </div>
        <div className="agents__track" ref={track}>
          {stages.map((s, i) => (
            <StageCard key={s.id} stage={s} index={i} />
          ))}
          <article className="scard scard--end">
            <p className="scard__end-kicker">The orchestrator</p>
            <h3 className="scard__name">{breakable(agents.orchestrator.name)}</h3>
            <p className="scard__desc">{agents.orchestrator.description}</p>
            <a className="btn btn--ghost" href="#run">
              Watch it run
            </a>
          </article>
        </div>
        <div className="wrap agents__progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>

      <div className="wrap agents__run" id="run">
        <Trace />
      </div>
    </section>
  );
}
