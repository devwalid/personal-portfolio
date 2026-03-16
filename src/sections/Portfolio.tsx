import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/projects';

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

function getPreviewSrc(src: string) {
  const name = src.replace('/Videos/', '').replace('.mp4', '');
  return {
    webm: `/Videos/previews/${name}.webm`,
    poster: `/Videos/posters/${name}.webp`,
  };
}

function CategoryCard({ category }: { category: (typeof categories)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { webm, poster } = getPreviewSrc(category.thumbnail);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div variants={cardVariants}>
      <Link
        to={`/projects/${category.slug}`}
        className="group block relative overflow-hidden rounded-2xl hover:shadow-glow transition-shadow duration-300"
      >
        <div className="relative aspect-[4/5] bg-white/5">
          {/* Thumbnail video — compressed preview */}
          <video
            ref={videoRef}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={webm} type="video/webm" />
            <source src={category.thumbnail} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />

          {/* Content */}
          <div className="absolute inset-x-5 bottom-5 space-y-2">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
              {category.projects.length} {category.projects.length === 1 ? 'project' : 'projects'}
            </p>
            <h3 className="text-white font-bold text-xl">{category.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center gap-2 text-accent-red text-sm font-medium pt-1 group-hover:gap-3 transition-all">
              View projects <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
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

        {/* Category Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
