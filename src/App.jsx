import "./App.css";
import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutSection from "./components/About";
import ProjectsSection from "./components/Projects";
import SkillsSection from "./components/Skills";
import ContactSection from "./components/Contact";
import FooterSection from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}

export default App;
