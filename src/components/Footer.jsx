import { useRef } from "react";
import { useScrollReveal } from "./utils/useScrollReveal";
import { Github, Linkedin, Mail } from "lucide-react";

export default function FooterSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useScrollReveal([contentRef], {
    trigger: sectionRef,
    start: "top 95%",
    end: "bottom 5%",
    y: 12,
    scrub: 0.6,
  });

  return (
    <footer ref={sectionRef} id="footer" className="relative w-full pt-14 md:pt-16 overflow-hidden">
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-white/80 font-inter">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand / short bio */}
          <div>
            <h3 className="text-2xl font-sync text-amber-500 mb-3">Vikram</h3>
            <p className="text-white/70 leading-relaxed">
              Frontend developer focused on crafting reliable, performant interfaces with meaningful
              motion. I build modular systems that scale.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://github.com/vikram1404" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/vikram-kumar-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition">
                <Linkedin size={18} />
              </a>
              <a href="mailto:vikrambind5@gmail.com" aria-label="Email" className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:mx-auto">
            <h4 className="text-white/90 font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-500 transition">Home</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition">About</a></li>
              <li><a href="#projects" className="hover:text-amber-500 transition">Projects</a></li>
              <li><a href="#skills" className="hover:text-amber-500 transition">Skills</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:ml-auto">
            <h4 className="text-white/90 font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>Email: <a href="mailto:vikrambind5@gmail.com" className="hover:text-amber-500 transition">you@example.com</a></li>
              <li>Location: Bangalore, Karnataka, India</li>
              <li>Availability: Open to work</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 md:mt-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/60 text-sm">
          <div>© {new Date().getFullYear()} Vikram. All rights reserved.</div>
          <div>Built with React + Tailwind</div>
        </div>
      </div>
    </footer>
  );
}


