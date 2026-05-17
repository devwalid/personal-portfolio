import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Instagram, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconProps = { className?: string };

const serviceOptions = [
  'Talking-Head Editing',
  'Ad Motion Graphic',
  'DTC Ads',
  'AI UGC',
  'Social Shorts',
  'Long to Short-Form',
  'Something else',
];

const contactAsOptions = ['Creator', 'Brand', 'Agency'] as const;

const socials = [
  {
    name: 'Instagram',
    color: '#E4405F',
    href: 'https://www.instagram.com/walid_el_omari_/',
    icon: Instagram,
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    href: 'https://wa.me/212656939084',
    icon: ({ className }: IconProps) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: 'Upwork',
    color: '#14A800',
    href: 'https://www.upwork.com/freelancers/~01f582b570596fc992',
    icon: ({ className }: IconProps) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.214-1.832-2.148-4.032-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    contactAs: 'Creator',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '10d2bb9f-73ab-46a4-a8c9-bff16bca2290',
          subject: `New message from ${formData.name}`,
          from_name: formData.name,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          service: '',
          contactAs: 'Creator',
          company: '',
          message: '',
        });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const labelClass =
    'block text-xs font-semibold uppercase tracking-wider text-white/55 mb-2';
  const inputClass =
    'w-full px-4 py-3.5 bg-black/25 border border-white/10 rounded-xl text-foreground placeholder:text-white/35 focus:outline-none focus:border-accent-red/60 transition-colors';

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column — CTA content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{ '--brand': social.color } as React.CSSProperties}
                  className="group relative w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-white hover:border-transparent"
                >
                  {/* Brand fill */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    style={{ backgroundColor: 'var(--brand)' }}
                  />
                  {/* Glow */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-lg -z-10 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ backgroundColor: 'var(--brand)' }}
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* CTA Heading */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Ready to make content
                <br />
                that actually converts?
              </h2>
              <p className="text-muted-foreground text-lg">
                Let's turn your raw footage into scroll-stopping videos that grow your brand.
              </p>
            </div>

            {/* Pricing pills */}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                <span className="text-foreground font-semibold">From $25</span>/video
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                Monthly packages available
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
                Under 12h reply
              </span>
            </div>

            {/* Direct contact info */}
            <a
              href="mailto:walid.el.omari22@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              walid.el.omari22@gmail.com
            </a>
          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-accent-red/25 bg-gradient-to-b from-[#3f0a12] from-0% via-[#330912] via-55% to-[#120305] to-100% p-6 sm:p-8 shadow-[0_24px_70px_-12px_rgba(225,29,72,0.3)]">
              {/* Continuous concentric light rings — centered on the bottom edge */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  aria-hidden
                  className="absolute left-1/2 top-full w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 pointer-events-none"
                  initial={{ scale: 0.25, opacity: 0 }}
                  animate={{ scale: 3.2, opacity: [0, 0.55, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: 'easeOut',
                  }}
                />
              ))}
              <div className="relative z-10">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <div className="w-16 h-16 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-accent-red text-xs font-bold uppercase tracking-widest">
                  Tell me about your project
                </p>

                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Mansouri"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email or Phone Number <span className="text-accent-red">*</span>
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@email.com or +212 6 00 00 00 00"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    What do you need? <span className="text-accent-red">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={cn(inputClass, 'appearance-none cursor-pointer')}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-[#1a0608] text-foreground">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className={labelClass}>
                    I'm a <span className="text-accent-red">*</span>
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {contactAsOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, contactAs: opt }))
                        }
                        className={cn(
                          'py-3 rounded-xl text-sm font-semibold border transition-colors',
                          formData.contactAs === opt
                            ? 'bg-accent-red text-white border-accent-red'
                            : 'bg-black/25 text-white/70 border-white/10 hover:border-white/30'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {formData.contactAs !== 'Creator' && (
                    <motion.div
                      key="company"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <label htmlFor="company" className={cn(labelClass, 'pt-1')}>
                        Company Name <span className="text-accent-red">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Your organization"
                        className={inputClass}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-accent-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Briefly share your goals, timeline, and any context I should know."
                    className={cn(inputClass, 'resize-vertical')}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-foreground text-background font-bold text-lg rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </motion.button>
                <p className="text-center text-muted-foreground text-sm">
                  Your info stays private.
                </p>
              </form>
            )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
