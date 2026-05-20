import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const labels = ['Available to work', 'Start a project'] as const;

export default function StatusPill() {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % labels.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }
    const target = document.getElementById('contact');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '0px 0px -20% 0px', threshold: 0.05 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/#contact');
    }
  };

  return (
    <div className="fixed z-[60] bottom-6 left-1/2 -translate-x-1/2 md:top-8 md:left-8 md:bottom-auto md:translate-x-0 pointer-events-none">
    <motion.a
      href="#contact"
      onClick={handleClick}
      aria-label="Start a project"
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 30 : 0,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="block group pointer-events-auto"
    >
      <div className="flex items-center justify-center gap-3 pl-4 pr-5 py-3 rounded-full bg-black/75 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-green-400/40 hover:bg-black/85 hover:shadow-[0_10px_40px_rgba(0,0,0,0.75)] transition-all">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        <span className="relative inline-flex justify-center overflow-hidden h-5 min-w-[140px] leading-none">
          {/* Invisible spacer reserves width for longest label */}
          <span className="invisible whitespace-nowrap text-sm font-medium leading-none" aria-hidden>
            Available to hire
          </span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={index}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm font-medium text-white leading-none"
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {labels[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </motion.a>
    </div>
  );
}
