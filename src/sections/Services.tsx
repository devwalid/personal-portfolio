import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

const services = [
  { title: 'UGC Videos', subtitle: 'User-Generated Content', image: '/Videos/UGC.mp4' },
  { title: 'Motion Graphic', subtitle: 'Minimal Style of Motion Ad Creatives', image: '/Videos/motion-graphic.mp4' },
  { title: 'COD Videos', subtitle: 'Ad Creatives for COD Sellers', image: '/Videos/GCC.mp4' },
  { title: 'DTC', subtitle: 'Direct To Costumer Ad Creatives', image: '/Videos/DTC.mp4' },
  { title: 'AI UGC', subtitle: 'AI-Powered UGC Editing', image: '/Videos/coming-soon.mp4' },
  { title: 'IG Reels', subtitle: 'Instagram Reels', image: '/Videos/IG-reels.mp4' },
  { title: 'Long to Short-Form', subtitle: 'Turning Long Youtube Videos to Short-Form Content', image: '/Videos/long-to-short-form.mp4' },
  { title: 'Static Images', subtitle: 'Static Ad Creatives', image: '/images/static-images.png' },
];

const SLIDE_COUNT = services.length;

function CarouselDots({
  count,
  activeIndex,
  onDotClick,
}: {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            i === activeIndex ? 'w-8' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
          )}
          style={{ backgroundColor: i === activeIndex ? 'var(--accent-red)' : undefined }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

export default function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Apply 3D transforms on every scroll frame for smooth orbital motion
  const applySlideStyles = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    emblaApi.scrollSnapList().forEach((snapPosition, snapIndex) => {
      const slide = slidesRef.current[snapIndex];
      if (!slide) return;

      let diffToTarget = snapPosition - scrollProgress;

      // Loop correction
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (snapIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = snapPosition - (1 + scrollProgress);
            if (sign === 1) diffToTarget = snapPosition + (1 - scrollProgress);
          }
        });
      }

      // offset in "slide units" — 0 = center, ±1 = adjacent, ±2 = edge peek
      const offset = diffToTarget * SLIDE_COUNT;
      const absOffset = Math.abs(offset);
      const direction = Math.sign(offset);

      // Orbital transforms — cards travel along a curved arc
      // Subtle rotateY that comes from the curve, not individual spinning
      const rotateY = direction * absOffset * 25;
      // Cards recede in Z as they move off-center (depth on the arc)
      const translateZ = -(absOffset * absOffset) * 30;
      // Scale down gently
      const scale = Math.max(1 - absOffset * 0.08, 0.75);
      // Fade cards beyond the visible 5
      const opacity = absOffset > 2.8 ? 0 : Math.max(1 - absOffset * 0.15, 0.3);

      slide.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`;
      slide.style.opacity = `${opacity}`;
      slide.style.zIndex = `${100 - Math.round(absOffset * 10)}`;
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    applySlideStyles();

    emblaApi.on('scroll', applySlideStyles);
    emblaApi.on('reInit', () => {
      onSelect();
      applySlideStyles();
    });
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('scroll', applySlideStyles);
      emblaApi.off('reInit', applySlideStyles);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, applySlideStyles]);

  // Play/pause videos based on active slide (fixes mobile autoplay)
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === selectedIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [selectedIndex]);

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  // Click any visible card to navigate
  const handleCardClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
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
            Services
          </h2>
        </motion.div>
      </div>

      {/* Orbital Carousel — full width */}
      <div
        className="relative carousel-3d-perspective"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge fade gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="carousel-3d-viewport" ref={emblaRef}>
          <div className="carousel-3d-container flex items-start">
            {services.map((service, index) => {
              const isActive = index === selectedIndex;

              return (
                <div
                  key={service.title}
                  className="flex-[0_0_65vw] sm:flex-[0_0_40vw] lg:flex-[0_0_28vw] min-w-0 px-2 sm:px-3 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    ref={(el) => { slidesRef.current[index] = el; }}
                    className="carousel-3d-card"
                  >
                    {/* Card */}
                    <div
                      className={cn(
                        'relative rounded-2xl lg:rounded-3xl overflow-hidden transition-shadow duration-500',
                        service.image.endsWith('.mp4') ? 'aspect-[9/16]' : 'aspect-square',
                        isActive
                          ? 'shadow-2xl shadow-accent-red/15'
                          : 'shadow-lg'
                      )}
                    >
                      {service.image.endsWith('.mp4') ? (
                        <video
                          ref={(el) => { videoRefs.current[index] = el; }}
                          src={`${service.image}#t=0.001`}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div
                        className={cn(
                          'absolute inset-0 transition-colors duration-500',
                          isActive
                            ? 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
                            : 'bg-black/30'
                        )}
                      />
                    </div>

                    {/* Label below card */}
                    <div
                      className={cn(
                        'mt-5 text-center transition-opacity duration-500',
                        isActive ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <h3 className="text-foreground font-bold text-xl md:text-2xl tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{service.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dots */}
      <CarouselDots
        count={SLIDE_COUNT}
        activeIndex={selectedIndex}
        onDotClick={(i) => emblaApi?.scrollTo(i)}
      />
    </section>
  );
}
