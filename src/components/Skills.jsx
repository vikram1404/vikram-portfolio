import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaBootstrap, FaGitAlt, FaAws, FaPlay
} from "react-icons/fa";
import { 
  SiNextdotjs, SiRedux, SiTypescript, SiJavascript, SiTailwindcss, SiGnubash,
  SiFramer, SiMui, SiMongodb, SiPostgresql, SiPrisma, SiSequelize, 
  SiVercel, SiNetlify, SiJest, SiTestcafe, SiPostman, 
  SiFigma, SiExpress 
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const elements = [
      headingRef.current,
      descRef.current,
      ...document.querySelectorAll(".skill-card"),
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(elements, { opacity: 0, y: 50 });

      const animateIn = () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      };

      elements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom-=100",
          onEnter: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }),
          onLeave: () =>
            gsap.to(el, { opacity: 0, y: 50, duration: 0.8, ease: "power2.out" }),
          onEnterBack: () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }),
          onLeaveBack: () =>
            gsap.to(el, { opacity: 0, y: 50, duration: 0.8, ease: "power2.out" }),
        });
      });

      const handleHashChange = () => {
        if (window.location.hash === "#skills") {
          animateIn();
        }
      };

      window.addEventListener("hashchange", handleHashChange);
      if (window.location.hash === "#skills") animateIn();

      return () => window.removeEventListener("hashchange", handleHashChange);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillBadge = (name, Icon, color) => ({
    name,
    icon: <Icon className="w-4 h-4" />,
    color,
  });

  const groups = [
    {
      title: "Frontend Core",
      desc: "Production-grade React and Next.js with strong focus on state, routing, and type safety.",
      skills: [
        skillBadge("React", FaReact, "bg-blue-500"),
        skillBadge("Next.js", SiNextdotjs, "bg-black"),
        skillBadge("Redux", SiRedux, "bg-purple-500"),
        skillBadge("TypeScript", SiTypescript, "bg-blue-600"),
        skillBadge("JavaScript", SiJavascript, "bg-yellow-400"),
        skillBadge("HTML5", FaHtml5, "bg-orange-500"),
        skillBadge("CSS3", FaCss3Alt, "bg-blue-400"),
      ],
    },
    {
      title: "UI & Motion",
      desc: "Design systems, responsive layouts, and smooth animations.",
      skills: [
        skillBadge("Tailwind CSS", SiTailwindcss, "bg-sky-500"),
        skillBadge("Framer Motion", SiFramer, "bg-pink-500"),
        skillBadge("Material UI", SiMui, "bg-blue-400"),

        skillBadge("Bootstrap", FaBootstrap, "bg-purple-600"),
        skillBadge("Figma", SiFigma, "bg-pink-400"),
      ],
    },
    {
      title: "Backend & APIs",
      desc: "Building APIs and services with Node.js and Express.",
      skills: [
        skillBadge("Node.js", FaNodeJs, "bg-green-600"),
        skillBadge("Express.js", SiExpress, "bg-gray-700"),
        skillBadge("REST APIs", SiGnubash, "bg-gray-600"),
      ],
    },
    {
      title: "Databases & ORM",
      desc: "Database modeling, queries, and ORM.",
      skills: [
        skillBadge("PostgreSQL", SiPostgresql, "bg-blue-700"),
        skillBadge("MongoDB", SiMongodb, "bg-green-500"),
        skillBadge("Prisma", SiPrisma, "bg-indigo-500"),
        skillBadge("Sequelize", SiSequelize, "bg-yellow-500"),
      ],
    },
    {
      title: "DevOps & Cloud",
      desc: "Version control, deployment workflows, and cloud services.",
      skills: [
        skillBadge("Git", FaGitAlt, "bg-red-500"),
        skillBadge("GitHub", FaGitAlt, "bg-gray-800"),
        skillBadge("GitLab", FaGitAlt, "bg-orange-500"),
        skillBadge("AWS S3", FaAws, "bg-yellow-400"),
        skillBadge("Vercel", SiVercel, "bg-black"),
        skillBadge("Netlify", SiNetlify, "bg-green-400"),
      ],
    },
    {
      title: "Testing & Tools",
      desc: "Quality assurance and dev tools.",
      skills: [
        skillBadge("Jest", SiJest, "bg-red-500"),
        skillBadge("Playwright", FaPlay, "bg-green-600"),
        skillBadge("TestCafe", SiTestcafe, "bg-purple-500"),
        skillBadge("Postman", SiPostman, "bg-orange-500"),
        skillBadge("VS Code", DiVisualstudio, "bg-blue-500"),
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold text-amber-500 text-center mb-10"
        >
          Skills
        </h2>
        <p
          ref={descRef}
          className="text-white/80 text-center max-w-2xl mx-auto mb-10"
        >
          A modern stack built for high-performance interfaces, smooth motion,
          and maintainable codebases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {groups.map((group) => (
            <div
              key={group.title}
              className="skill-card rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition duration-300 h-full flex flex-col"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-amber-500 mb-2">
                {group.title}
              </h3>
              <p className="text-white/80 mb-4">{group.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium ${skill.color}`}
                  >
                    {skill.icon}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
