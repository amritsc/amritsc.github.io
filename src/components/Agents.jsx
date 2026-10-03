import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { agents, stageOwner, stages } from '../data';

export default function Agents() {
  const [active, setActive] = useState('debug');
  const reduce = useReducedMotion();
  const stage = stages.find((s) => s.id === active);
  const agent = agents[stageOwner[active]];

  return (
    <section className="agents chapter chapter--ink" id="agents" aria-labelledby="agents-title">
      <div className="wrap">
        <div className="agents__head">
          <h2 className="h2" id="agents-title">
            An incident-response team made of agents.
          </h2>
          <p className="lede">
            Built for the JPMorgan Chase Agentic AI Hackathon. Four specialist agents and one orchestrator take an incident
            from the first alert to a deployed fix. Pick a step to see who handles it.
          </p>
        </div>

        <div className="rail" role="tablist" aria-label="Pipeline steps">
          {stages.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={active === s.id}
              aria-controls="agent-panel"
              className={`rail__step ${active === s.id ? 'is-active' : ''}`}
              style={{ '--c': s.color }}
              onClick={() => setActive(s.id)}
            >
              <span className="rail__node" />
              <span className="rail__label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="agent" id="agent-panel" role="tabpanel" aria-labelledby={`tab-${active}`} style={{ '--c': stage.color }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="agent__inner"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="agent__main">
                <p className="agent__owner">
                  {stage.label} is handled by
                </p>
                <h3 className="agent__name">{agent.name}</h3>
                <p className="agent__desc">{agent.description}</p>
              </div>
              <dl className="agent__meta">
                <div>
                  <dt>What it does</dt>
                  <dd>
                    <ul>
                      {agent.capabilities.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd>{agent.tech.join(', ')}</dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
