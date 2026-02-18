import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';

const projects = [
  {
    title: 'UGC Instagram Reel',
    brand: 'CLIENT PROJECT',
    video: '/Videos/UGC.mp4',
    glow: 'hover:shadow-glow',
  },
  {
    title: 'Matchup Video',
    brand: 'CLIENT PROJECT',
    video: '/Videos/3.mp4',
    glow: 'hover:shadow-glow-dark',
  },
  {
    title: 'Talking Head Video',
    brand: 'CLIENT PROJECT',
    video: '/Videos/2.mp4',
    glow: 'hover:shadow-glow-red-dark',
  },
  {
    title: 'DTC Ad Creative',
    brand: 'CLIENT PROJECT',
    video: '/Videos/10.mp4',
    glow: 'hover:shadow-glow-red-dark',
  },
  {
    title: 'Brand Promo Ai Video',
    brand: 'PORTFOLIO PROJECT',
    video: '/Videos/coming_soonl.mp4',
    glow: 'hover:shadow-glow',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

function VideoCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const isWide = index === 4;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-shadow duration-300 ${project.glow} ${
        isWide ? 'lg:col-span-4 sm:col-span-2' : ''
      }`}
    >
      <div className={`relative ${isWide ? 'aspect-[21/9]' : 'aspect-[3/4]'} bg-white/5`}>
        {/* Video */}
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay — fades on hover */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Center Play Button — visible only when paused */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={togglePlay}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors"
            >
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </motion.div>
          </div>
        )}

        {/* Controls — bottom-right, visible when playing or on hover */}
        <div
          className={`absolute bottom-4 right-4 z-10 flex items-center gap-2 transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            )}
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="absolute inset-x-4 bottom-4 pointer-events-none">
          <p className="text-white/70 text-sm font-medium mb-1">
            {project.brand}
          </p>
          <h3 className="text-white font-bold text-lg">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Selected Work
          </h2>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {projects.map((project, index) => (
            <VideoCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* More coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm py-10 px-6 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            <span className="text-white/40 text-sm font-medium uppercase tracking-widest">
              In Production
            </span>
          </div>
          <p className="text-white/70 text-lg font-semibold">
            More projects coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
