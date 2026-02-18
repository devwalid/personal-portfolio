import { useState, useEffect } from 'react';
import { motion, useMotionValue, useVelocity, useTransform } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const scaleX = useTransform(velocityX, [-2000, 0, 2000], [0.6, 1, 1.4]);
  const scaleY = useTransform(velocityY, [-2000, 0, 2000], [1.4, 1, 0.6]);

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
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-foreground mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        scaleX,
        scaleY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovering ? 56 : 16,
        height: isHovering ? 56 : 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
