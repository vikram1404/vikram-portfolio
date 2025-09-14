import { useRef } from "react";
import { useScrollReveal } from "./utils/useScrollReveal";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useScrollReveal([headingRef], {
    trigger: sectionRef,
    start: "top 80%",
    end: "bottom 20%",
    y: 22,
    scrub: 0.6,
  });

  useScrollReveal([], {
    trigger: sectionRef,
    targetsSelector: ".skill-card",
    start: "top 80%",
    end: "bottom 20%",
    y: 22,
    scrub: 0.6,
    stagger: 0.12,
  });

  const groups = [
    {
      title: "Frontend Core",
      desc: "Production-grade React and Next.js with a strong focus on state, routing, data fetching, and type safety.",
      items: ["React", "Next.js", "Redux", "TypeScript", "JavaScript"],
    },
    {
      title: "UI & Motion",
      desc: "Design systems, responsive layouts, and tasteful motion that communicates without distracting.",
      items: ["Tailwind CSS", "CSS", "GSAP", "Framer Motion"],
    },
    {
      title: "Tooling & Quality",
      desc: "Fast builds, consistent code, and smooth DX with solid linting and formatting.",
      items: ["Git", "Vite", "ESLint", "Prettier"],
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="about-shape about-shape-1" aria-hidden="true" />
      <div className="about-shape about-shape-2" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold text-amber-500 font-sync text-center mb-10">Skills</h2>
        <p className="text-white/80 font-inter text-center max-w-2xl mx-auto mb-10">A modern stack built for high-performance interfaces, smooth motion, and maintainable codebases.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {groups.map((g) => (
            <div key={g.title} className="skill-card rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition duration-300 h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-amber-500 font-sync mb-2">{g.title}</h3>
              <p className="text-white/80 font-inter mb-4">{g.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-inter">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


