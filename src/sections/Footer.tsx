import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const NAME = 'WALID';
const VB_W = 1000;
const VB_H = 200;
const OFF = { x: -9999, y: -9999 };

function HoverName() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState(OFF);

  const handleMove = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({
      x: ((e.clientX - rect.left) / rect.width) * VB_W,
      y: ((e.clientY - rect.top) / rect.height) * VB_H,
    });
  };

  const textProps = {
    x: VB_W / 2,
    y: 168,
    textAnchor: 'middle' as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.23, 0.86, 0.39, 0.96] }}
      className="select-none"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="block w-full"
        onMouseMove={handleMove}
        onMouseLeave={() => setCursor(OFF)}
        aria-label={NAME}
      >
        <defs>
          <radialGradient
            id="footer-reveal"
            gradientUnits="userSpaceOnUse"
            cx={cursor.x}
            cy={cursor.y}
            r={170}
          >
            <stop offset="0%" stopColor="#fff" />
            <stop offset="55%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id="footer-mask">
            <rect width={VB_W} height={VB_H} fill="url(#footer-reveal)" />
          </mask>
        </defs>

        {/* Base red outline */}
        <text {...textProps} className="footer-svg-text footer-svg-base">
          {NAME}
        </text>
        {/* White outline revealed under the cursor */}
        <text
          {...textProps}
          className="footer-svg-text footer-svg-glow"
          mask="url(#footer-mask)"
        >
          {NAME}
        </text>
      </svg>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Red gradient backdrop — full width */}
      <div className="absolute inset-0 -z-[1] pointer-events-none bg-gradient-to-t from-accent-red/25 via-accent-red/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6">
        {/* Copyright */}
        <p className="text-muted-foreground text-sm text-center">
          Made by Walid Himself | All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>

      {/* Giant interactive name */}
      <div className="relative -mb-[0.1em]">
        <HoverName />
      </div>
    </footer>
  );
}
