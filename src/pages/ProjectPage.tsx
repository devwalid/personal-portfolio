import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { categories, type Project } from '@/data/projects';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

function VideoCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // YouTube embed
  if (project.youtubeEmbed) {
    return (
      <motion.div variants={cardVariants} className="group">
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5">
          <iframe
            src={`${project.youtubeEmbed}?rel=0`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
            {project.brand}
          </p>
          <h3 className="text-white font-semibold">{project.title}</h3>
          {project.stats && (
            <p className="text-accent-red text-sm font-medium">{project.stats}</p>
          )}
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/40 text-xs hover:text-white/70 transition-colors mt-1"
            >
              Watch on YouTube <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </motion.div>
    );
  }

  // Local video
  return (
    <motion.div variants={cardVariants} className="group">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5">
        <video
          ref={videoRef}
          src={`${project.video}#t=0.001`}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={togglePlay}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.div>
          </div>
        )}

        <div
          className={`absolute bottom-3 right-3 z-10 flex items-center gap-2 transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
          {project.brand}
        </p>
        <h3 className="text-white font-semibold">{project.title}</h3>
      </div>
    </motion.div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Project not found</h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {category.description}
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {category.projects.map((project) => (
            <VideoCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
    <Footer />
    </>
  );
}
