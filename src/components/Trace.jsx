import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { stages, traceRun } from '../data';

const stageColor = Object.fromEntries(stages.map((s) => [s.id, s.color]));
const stageLabel = Object.fromEntries(stages.map((s) => [s.id, s.label]));

const fmtClock = (s) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};
const fmtLong = (s) => `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;

export default function Trace() {
  const reduce = useReducedMotion();
  const { total, spans, title } = traceRun;
  const [t, setT] = useState(reduce ? total : 0);
  const [run, setRun] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setT(total);
      return undefined;
    }
    setT(0);
    let raf;
    let start;
    const duration = 7200;
    const delay = run === 0 ? 300 : 250;
    const tick = (now) => {
      if (start === undefined) start = now;
      const p = Math.min(Math.max((now - start - delay) / duration, 0), 1);
      setT(p * total);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduce, total, inView]);

  const done = t >= total;
  const pct = (v) => `${(v / total) * 100}%`;
  const ticks = [0, 60, 120, 180, 240];

  return (
    <figure className="trace glass" ref={ref}>
      <header className="trace__head">
        <div>
          <p className="trace__kicker">Illustrative agent run</p>
          <p className="trace__title">{title}</p>
        </div>
        <div className="trace__status" aria-live="polite">
          <span className={`trace__dot ${done ? 'is-done' : ''}`} />
          {done ? `Resolved in ${fmtLong(total)}` : `Running ${fmtClock(t)}`}
        </div>
        <button className="trace__replay" type="button" onClick={() => setRun((r) => r + 1)} disabled={!done}>
          Replay
        </button>
      </header>

      <div className="trace__body">
        <div className="trace__overlay" aria-hidden="true">
          <span />
          <div className="trace__overlay-track">
            {ticks.map((s) => (
              <i key={s} className="trace__grid" style={{ left: pct(s) }} />
            ))}
            {!done && <i className="trace__playhead" style={{ left: pct(t) }} />}
          </div>
          <span />
        </div>

        <div className="trace__row trace__row--root">
          <div className="trace__label">
            <span className="trace__who">Orchestrator run</span>
          </div>
          <div className="trace__track">
            <span className="trace__bar trace__bar--root" style={{ left: 0, width: pct(Math.min(t, total)) }} />
          </div>
          <span className="trace__dur">{fmtClock(Math.min(t, total))}</span>
        </div>

        {spans.map((s) => {
          const progress = Math.min(Math.max((t - s.start) / (s.end - s.start), 0), 1);
          const active = t >= s.start && t < s.end;
          const finished = t >= s.end;
          return (
            <div className={`trace__row ${active ? 'is-active' : ''} ${t < s.start ? 'is-waiting' : ''}`} key={s.stage}>
              <div className="trace__label">
                <span className="trace__swatch" style={{ background: stageColor[s.stage] }} />
                <span className="trace__stage">{stageLabel[s.stage]}</span>
                <span className="trace__who">{s.who}</span>
              </div>
              <div className="trace__track">
                <span
                  className="trace__bar"
                  style={{
                    left: pct(s.start),
                    width: `${((s.end - s.start) / total) * 100 * progress}%`,
                    background: stageColor[s.stage],
                  }}
                />
                <span
                  className={`trace__note ${finished ? 'is-shown' : ''} ${s.start / total > 0.45 ? 'is-end' : ''}`}
                  style={s.start / total > 0.45 ? { right: pct(total - s.end) } : { left: pct(s.start) }}
                >
                  {s.note}
                </span>
              </div>
              <span className="trace__dur">{finished ? `${s.end - s.start}s` : active ? '…' : ''}</span>
            </div>
          );
        })}

        <div className="trace__axis" aria-hidden="true">
          <span />
          <div className="trace__axis-track">
            {ticks.map((s) => (
              <span key={s} style={{ left: pct(s) }}>
                {s === 0 ? '0' : `${s / 60}m`}
              </span>
            ))}
          </div>
          <span />
        </div>
      </div>

      <figcaption className="trace__caption">
        A simulated run of the orchestrator handing one incident from agent to agent.
      </figcaption>
    </figure>
  );
}
