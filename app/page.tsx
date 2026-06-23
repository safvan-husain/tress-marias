import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Programs from "./components/Programs";
import Community from "./components/Community";
import Join from "./components/Join";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Programs />
        <Community />
        <Join />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
