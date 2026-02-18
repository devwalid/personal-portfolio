import { useRef, useEffect } from 'react';
import { useSpring } from 'framer-motion';

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { strength = 0.3, radius = 150 } = options;
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(0, { damping: 20, stiffness: 150 });
  const y = useSpring(0, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius, x, y]);

  return { ref, style: { x, y } };
}
