import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared, mutable state read every frame by the particle field and the marquee.
export const scene = { target: 0, ready: false, velocity: 0, lenis: null };

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isCoarse = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export function startSmoothScroll() {
  // Phones keep native scrolling: it is already smooth and costs nothing.
  if (prefersReduced() || isCoarse()) return () => {};
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
  scene.lenis = lenis;
  lenis.on('scroll', (e) => {
    scene.velocity = e.velocity;
    ScrollTrigger.update();
  });
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = id.length > 1 ? document.querySelector(id) : null;
    if (!el && id !== '#top') return;
    e.preventDefault();
    lenis.scrollTo(id === '#top' ? 0 : el, { duration: 1.6 });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(raf);
    lenis.destroy();
    scene.lenis = null;
  };
}

// Which particle shape each section morphs the background into.
const SCENES = { hero: 0, about: 1, banner: 1, projects: 1, agents: 2, experience: 3, certifications: 3, contact: 4 };

export function watchScenes() {
  const els = Object.keys(SCENES)
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) scene.target = SCENES[en.target.id];
      });
    },
    { rootMargin: '-48% 0px -48% 0px' },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export { gsap, ScrollTrigger };
