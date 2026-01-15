import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300 relative">
      <ScrollProgress />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Skills />
        <Timeline />
        <Projects />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}