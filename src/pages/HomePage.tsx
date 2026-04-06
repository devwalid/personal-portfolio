import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import Portfolio from '@/sections/Portfolio';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import CtaBanner from '@/sections/CtaBanner';
import Footer from '@/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
