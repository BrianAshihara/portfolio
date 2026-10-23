import { About } from "@/components/About";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Stacks } from "@/components/Stacks";

export default function Home() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Stacks />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
