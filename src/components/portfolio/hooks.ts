import { useEffect, useState } from 'react';
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}
export function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  return { dark, toggle: () => { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); try { localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch {} } };
}
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  const key = ids.join(',');
  useEffect(() => { const targets = key.split(',').map(id => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node)); const observer = new IntersectionObserver(entries => { const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top); if (visible[0]) setActive(visible[0].target.id); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 }); targets.forEach(target => observer.observe(target)); return () => observer.disconnect(); }, [key]);
  return active;
}
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { let frame = 0; const update = () => { frame = 0; const available = document.documentElement.scrollHeight - innerHeight; setProgress(available > 0 ? Math.min(1,Math.max(0,scrollY / available)) : 0); }; const schedule = () => { if (!frame) frame = requestAnimationFrame(update); }; update(); addEventListener('scroll',schedule,{ passive: true }); addEventListener('resize',schedule); return () => { cancelAnimationFrame(frame); removeEventListener('scroll',schedule); removeEventListener('resize',schedule); }; }, []);
  return progress;
}
