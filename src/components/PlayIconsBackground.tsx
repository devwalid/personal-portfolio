import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

type FloatConfig = {
  size: number;
  rotate: number;
  delay: number;
  top: string;
  left?: string;
  right?: string;
  duration: number;
  drift: number;
};

const shapes: FloatConfig[] = [
  { size: 150, rotate: -20, delay: 0.2, top: '8%', left: '-3%', duration: 13, drift: 28 },
  { size: 110, rotate: 18, delay: 0.45, top: '64%', left: '6%', duration: 16, drift: 22 },
  { size: 180, rotate: 24, delay: 0.3, top: '20%', right: '-4%', duration: 18, drift: 34 },
  { size: 120, rotate: -14, delay: 0.55, top: '80%', right: '4%', duration: 14, drift: 24 },
  { size: 80, rotate: 10, delay: 0.6, top: '40%', left: '34%', duration: 11, drift: 18 },
  { size: 90, rotate: -8, delay: 0.5, top: '6%', left: '46%', duration: 15, drift: 20 },
];

function FloatingPlay({ size, rotate, delay, top, left, right, duration, drift }: FloatConfig) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.2, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      style={{ top, left, right }}
      className="absolute"
    >
      {/* Continuous floating drift */}
      <motion.div
        animate={{
          y: [0, drift, 0, -drift, 0],
          x: [0, drift * 0.5, 0, -drift * 0.5, 0],
          rotate: [0, 6, 0, -6, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
      >
        <Play
          style={{ width: size, height: size }}
          className="text-accent-red fill-accent-red"
        />
      </motion.div>
    </motion.div>
  );
}

export default function PlayIconsBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.10]">
      {shapes.map((shape, i) => (
        <FloatingPlay key={i} {...shape} />
      ))}
    </div>
  );
}
