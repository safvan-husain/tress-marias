import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Join from "./components/Join";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Join />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
