import { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Hand, Pointer } from 'lucide-react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [role="button"], [data-cursor-hover], input, textarea');
      setIsHovering(!!target);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice, mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] text-foreground drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-25%',
        translateY: '-10%',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.2 : 1,
        rotate: isHovering ? -15 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {isHovering ? (
        <Pointer className="w-7 h-7 fill-foreground/20" />
      ) : (
        <Hand className="w-7 h-7 fill-foreground/20" />
      )}
    </motion.div>
  );
}
