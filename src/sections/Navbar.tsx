import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PORTFOLIO', href: '#portfolio' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="relative">
        <motion.nav
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-foreground/5 border border-foreground/10 shadow-lg rounded-full px-2 py-2"
        >
          <div className="flex items-center gap-1">
            {/* Desktop Navigation Links (left) */}
            <div className="hidden md:flex items-center">
              {navLinks.slice(0, 2).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Logo */}
            <motion.a
              href="#"
              className="flex-shrink-0 px-3 py-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/images/logo-text.svg"
                alt="Walid El Omari"
                className="h-7"
              />
            </motion.a>

            {/* Desktop Navigation Links (right) */}
            <div className="hidden md:flex items-center">
              {navLinks.slice(2).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center">
              <button
                className="p-2 text-foreground rounded-full hover:bg-foreground/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Dropdown Menu — drops below the pill */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-3 backdrop-blur-xl bg-foreground/5 border border-foreground/10 shadow-lg rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-xl transition-colors tracking-wide"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
