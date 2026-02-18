import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const testimonials = [
  {
    location: 'France',
    content: 'Really good experience. Walid is reactive, understands the instructions quickly, and provides good-quality work. I recommend working with him for your projects.',
    author: 'Karl Feuvray',
    image: '/images/upwork.png',
  },
  {
    location: 'Sweden',
    content: 'Well done, thank you',
    author: 'Jonathan Enhult',
    image: '/images/testimonial-2.jpg',
  },
  {
    location: 'United States',
    content: 'Great working with Walid, very detailed and fast responses.',
    author: 'Franco Wu',
    image: '/images/testimonial-3.webp',
  },
  {
    location: 'Netherlands',
    content: 'Great work! Really liked working with this man',
    author: 'Nick Veen',
    image: '/images/upwork.png',
  },
  {
    location: 'United States',
    content: 'Thank you so much you are the best',
    author: 'Elisa Chiaradia',
    image: '/images/elisa.jpg',
  },
  {
    location: 'United States',
    content: 'Wow the output looks great, really great job',
    author: 'Yousef Benhamida',
    image: '/images/yousef.jpeg',
  },
];

// Split testimonials into columns
const col1 = [testimonials[0], testimonials[4]];
const col2 = [testimonials[1], testimonials[2]];
const col3 = [testimonials[5], testimonials[3]];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-foreground/20 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-foreground font-semibold text-sm">{testimonial.author}</p>
        </div>
      </div>
      <h3 className="text-foreground font-bold text-sm mb-3 flex items-center gap-1.5">
        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
        {testimonial.location}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{testimonial.content}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Header (~1/3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-accent-red text-sm font-semibold uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              A Few
              <br />
              <span className="relative inline-block">
                Words
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-3 bg-accent-red/60 -z-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              What clients say about working with me.
            </p>
          </motion.div>

          {/* Right: Marquee columns (~2/3) */}
          <div className="lg:w-2/3 relative">
            {/* Fade edges */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-[500px] lg:h-[600px] overflow-hidden">
              {/* Column 1: scrolls up */}
              <div className="animate-marquee-up space-y-4" style={{ animationDuration: '70s' }}>
                {[...col1, ...col1, ...col1, ...col1].map((t, i) => (
                  <TestimonialCard key={`c1-${i}`} testimonial={t} />
                ))}
              </div>

              {/* Column 2: scrolls down */}
              <div className="animate-marquee-down space-y-4" style={{ animationDuration: '70s' }}>
                {[...col2, ...col2, ...col2, ...col2].map((t, i) => (
                  <TestimonialCard key={`c2-${i}`} testimonial={t} />
                ))}
              </div>

              {/* Column 3: scrolls up (hidden on mobile) */}
              <div className="hidden lg:block animate-marquee-up space-y-4" style={{ animationDuration: '70s' }}>
                {[...col3, ...col3, ...col3, ...col3].map((t, i) => (
                  <TestimonialCard key={`c3-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
