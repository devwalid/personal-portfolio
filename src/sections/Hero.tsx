import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const leftVideos = [
  '/Videos/1.mp4',
  '/Videos/2.mp4',
  '/Videos/3.mp4',
  '/Videos/4.mp4',
  '/Videos/5.mp4',
  '/Videos/6.mp4',
  '/Videos/7.mp4',
  '/Videos/8.mp4',
];

const rightVideos = [
  '/Videos/9.mp4',
  '/Videos/10.mp4',
  '/Videos/UGC.mp4',
  '/Videos/DTC.mp4',
  '/Videos/GCC.mp4',
  '/Videos/IG-reels.mp4',
  '/Videos/motion-graphic.mp4',
  '/Videos/long-to-short-form.mp4',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut' as const,
    },
  },
};

function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative w-[180px] md:w-[240px] lg:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden flex-shrink-0">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient glow — dense warm light at top, matching reference */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '100%', height: '70%' }}
      >
        {/* Core: bright brand red center */}
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.55) 0%, transparent 70%)' }} />
        {/* Mid layer: darker red spread */}
        <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(177,18,38,0.35) 0%, transparent 65%)' }} />
        {/* Outer layer: wide soft red haze */}
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(225,29,72,0.15) 0%, transparent 60%)' }} />
        {/* Subtle dark blue accent on right edge */}
        <div className="absolute top-[50px] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(30,41,59,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Side glow — left */}
      <div className="absolute top-[25%] -left-[100px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.25) 0%, transparent 65%)' }} />
      {/* Side glow — right */}
      <div className="absolute top-[20%] -right-[100px] w-[450px] h-[450px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(177,18,38,0.2) 0%, transparent 65%)' }} />

      {/* Fade glow into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-background/80 via-60% to-background pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Left video column — scrolls up */}
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="absolute -left-[90px] md:-left-[60px] lg:-left-[30px] top-0 bottom-0 z-[1] overflow-hidden opacity-10 md:opacity-100"
      >
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        <div className="animate-marquee-up space-y-3" style={{ animationDuration: '45s' }}>
          {[...leftVideos, ...leftVideos, ...leftVideos, ...leftVideos].map((src, i) => (
            <VideoCard key={`left-${i}`} src={src} />
          ))}
        </div>
      </motion.div>

      {/* Right video column — scrolls down */}
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="absolute -right-[90px] md:-right-[60px] lg:-right-[30px] top-0 bottom-0 z-[1] overflow-hidden opacity-10 md:opacity-100"
      >
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        <div className="animate-marquee-down space-y-3" style={{ animationDuration: '45s' }}>
          {[...rightVideos, ...rightVideos, ...rightVideos, ...rightVideos].map((src, i) => (
            <VideoCard key={`right-${i}`} src={src} />
          ))}
        </div>
      </motion.div>

      {/* Hero text content — centered above columns */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Intro tag */}
          <motion.div variants={itemVariants}>
            <span className="inline-block whitespace-nowrap px-5 py-2 rounded-full bg-accent-red text-white text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.3)]">
              Freelance Video Editor — Morocco
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
          >
            Short-Form Videos{' '}
            <br className="hidden sm:block" />
            That{' '}
            <span className="relative inline-block">
              Stop the Scroll
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-3 bg-accent-red/60 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed px-6 py-4 rounded-2xl bg-background/80 md:bg-foreground/5 md:backdrop-blur-md border border-foreground/10">
              I'm <span className="text-foreground font-medium">Walid El Omari</span> — I edit
              {' '}<span className="text-foreground font-medium">UGC</span>,
              {' '}<span className="text-foreground font-medium">Instagram Reels</span>, and
              {' '}<span className="text-foreground font-medium">ad videos</span> that
              {' '}help brands grow on social media.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/glow relative rounded-full p-[2px] overflow-hidden min-w-[180px]"
            >
              {/* Rotating glow gradient */}
              <div
                className="absolute inset-[-50%] animate-border-glow group-hover/glow:[animation-play-state:paused]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, #e11d48 75%, #ff4778 85%, #e11d48 95%, transparent 100%)',
                }}
              />
              {/* Button inner */}
              <span className="relative z-10 block px-8 py-4 bg-background group-hover/glow:bg-accent-red/15 group-hover/glow:backdrop-blur-md rounded-full font-semibold text-lg text-foreground text-center transition-all duration-300">
                View My Work
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all min-w-[180px]"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
