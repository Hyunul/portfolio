import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience, { Education } from "@/components/Experience";
import Cases from "@/components/Cases";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Cases />
      <Projects />
      <Education />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
