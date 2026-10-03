import { useEffect, useState } from 'react';
import { person } from '../data';

// Repos tagged with the `portfolio` topic on GitHub show up here automatically.
const TOPIC = 'portfolio';

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export default function Builds() {
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${person.githubUser}/repos?per_page=100&sort=pushed`)
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (!alive) return;
        const picked = Array.isArray(list)
          ? list.filter((r) => !r.fork && !r.archived && (r.topics || []).includes(TOPIC))
          : [];
        setRepos(picked);
      })
      .catch(() => alive && setRepos([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="builds chapter chapter--ink" id="builds" aria-labelledby="builds-title">
      <div className="wrap">
        <div className="builds__head">
          <h2 className="h2" id="builds-title">
            Open builds
          </h2>
          <p className="lede">
            Reference architectures I publish for Foundry RAG, MCP agent orchestration and Copilot Studio. Each one is built
            on public data and runs end to end.
          </p>
        </div>

        {repos === null && <p className="builds__empty">Loading repositories from GitHub…</p>}

        {repos && repos.length === 0 && (
          <p className="builds__empty">
            The first builds are in progress and will appear here as they ship.{' '}
            <a href={person.github} target="_blank" rel="noreferrer">
              Follow along on GitHub
            </a>
          </p>
        )}

        {repos && repos.length > 0 && (
          <ul className="repos">
            {repos.map((r) => (
              <li key={r.id}>
                <a className="repo" href={r.html_url} target="_blank" rel="noreferrer">
                  <span className="repo__name">{r.name}</span>
                  <span className="repo__desc">{r.description || 'No description yet.'}</span>
                  <span className="repo__meta">
                    {[r.language, `Updated ${fmtDate(r.pushed_at)}`, r.stargazers_count ? `${r.stargazers_count} stars` : null]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
