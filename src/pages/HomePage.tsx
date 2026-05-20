import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/sections/Navbar';
import PlayIconsBackground from '@/components/PlayIconsBackground';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import Portfolio from '@/sections/Portfolio';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.hash, location.key]);

  return (
    <>
      <Navbar />
      <PlayIconsBackground />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
