import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-border bg-card/30 backdrop-blur-sm p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Glow effect behind the card */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.4) 0%, rgba(177,18,38,0.2) 40%, transparent 70%)' }} />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Ready to make content
              <br />
              that actually converts?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Let's turn your raw footage into scroll-stopping videos that grow your brand.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:opacity-90 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
