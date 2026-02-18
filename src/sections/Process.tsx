import { motion } from 'framer-motion';
import { MessageSquare, Film, Eye, Send } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Brief',
    description: 'You share your needs, and raw footage. I ask the right questions to understand exactly what you need.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Edit',
    description: 'I craft your content with precise cuts, transitions, effects, and sound design that match your brand.',
    icon: Film,
  },
  {
    number: '03',
    title: 'Review',
    description: 'You get a first draft within the agreed timeline. We refine together until it\'s exactly right.',
    icon: Eye,
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Final files exported in all formats you need — ready to post and start performing.',
    icon: Send,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-sm font-semibold uppercase tracking-wider mb-3">
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            From Brief to Delivery
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="relative group"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[-calc(50%-40px)] w-[calc(100%-20px)] h-px bg-border z-0" />
              )}

              <div className="relative p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-foreground/20 transition-all duration-300 hover:shadow-glow">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-accent-red" />
                </div>

                {/* Number + Title */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-accent-red/50 text-sm font-mono font-bold">{step.number}</span>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
