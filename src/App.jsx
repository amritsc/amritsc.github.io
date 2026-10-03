import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import Banner from './components/Banner';
import Agents from './components/Agents';
import { Experience, Certifications } from './components/Record';
import Builds from './components/Builds';
import { Nav, Contact } from './components/Chrome';
import { Cursor, Preloader, ScrollProgress } from './components/fx';
import { scene, ScrollTrigger, startSmoothScroll, watchScenes } from './lib/scene';

const Particles = lazy(() => import('./components/Particles'));

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => {
    setReady(true);
    scene.ready = true;
  }, []);

  useEffect(() => {
    const stopScroll = startSmoothScroll();
    const stopScenes = watchScenes();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      stopScroll();
      stopScenes();
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Preloader onDone={onDone} />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Story />
        <Banner />
        <Agents />
        <Experience />
        <Certifications />
        <Builds />
        <Contact />
      </main>
    </>
  );
}
