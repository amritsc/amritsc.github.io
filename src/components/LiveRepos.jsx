import { useEffect, useState } from 'react';

// Public repos tagged with the `portfolio` topic on GitHub appear here automatically.
// Until one exists, this renders nothing, so the section looks exactly as before.
export default function LiveRepos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch('https://api.github.com/users/amritsc/repos?per_page=100&sort=pushed')
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (!alive || !Array.isArray(list)) return;
        setRepos(list.filter((r) => !r.fork && !r.archived && (r.topics || []).includes('portfolio')));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!repos.length) return null;

  return (
    <div className="mt-10">
      <h4 className="text-sm font-medium tracking-[0.2em] text-slate-400 mb-4">FEATURED REPOSITORIES</h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((r) => (
          <a
            key={r.id}
            href={r.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 break-words">{r.name}</p>
            <p className="text-slate-400 text-sm mb-4">{r.description || 'No description yet.'}</p>
            <div className="flex flex-wrap gap-2">
              {r.language && <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg font-medium">{r.language}</span>}
              {r.stargazers_count > 0 && (
                <span className="text-xs px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-lg">★ {r.stargazers_count}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
