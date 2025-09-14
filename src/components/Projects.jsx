import { useRef } from "react";
import { useScrollReveal } from "./utils/useScrollReveal";
import zekstaImg from "../assets/images/zeksta-img.png";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  // Smooth animations for heading
  useScrollReveal([headingRef], {
    trigger: sectionRef,
    start: "top 90%",
    end: "bottom 10%",
    y: 40,
    scrub: 1,
    opacity: 0,
    ease: "power3.out",
  });

  // Smooth staggered animations for cards
  useScrollReveal([], {
    trigger: sectionRef,
    targetsSelector: ".project-card",
    start: "top 90%",
    end: "bottom 10%",
    y: 40,
    scrub: 1,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  const projects = [
    {
      title: "Ray Insuretech Website",
      desc: "Designed and developed a multi-role insurance claims investigation platform that supports Super Admin, Admin, Employee, and User roles. Implemented secure file storage and retrieval using AWS S3 and built custom APIs with Node.js to ensure high security and performance. Integrated role-based access control to protect sensitive workflows and optimized the platform for desktop and mobile users using Tailwind CSS.",
      tags: ["Next.js", "PostgreSQL", "Node.js", "AWS S3", "Tailwind"],
      img: "/projects/ray-insuretech.jpg",
      demo: "#",
    },
    {
      title: "eMemories – Digital Tribute Platform",
      desc: "A full-stack tribute and memorial platform enabling users to create personalized digital tributes with subscription-based access to premium features. Developed secure authentication with local storage and APIs, implemented dynamic themes and image/video upload capabilities, and built an engaging, fully responsive user experience using Tailwind CSS.",
      tags: ["Next.js", "Redux", "PostgreSQL", "Node.js", "Tailwind"],
      img: "/projects/ememories.jpg",
      demo: "#",
    },
    {
      title: "Buchipay – Fintech Dashboard",
      desc: "Developed a fintech dashboard that supports role-based access, service management, and real-time data visualization. Built reusable React components to accelerate feature development and integrated Material Tailwind for a clean and intuitive interface. Focused on optimizing dashboard performance for large datasets and ensuring scalability.",
      tags: ["React.js", "React Native", "Material Tailwind", "Tailwind"],
      img: "/projects/buchipay.jpg",
      demo: "#",
    },
    {
      title: "Zeksta Website",
      desc: "Built a fully responsive corporate website for Zeksta Technologies with a modern design, reusable Next.js components, and Tailwind-based styling. Focused on SEO optimization, fast page loads, and smooth navigation, delivering a polished web presence for the brand.",
      tags: ["Next.js", "Tailwind"],
      img: zekstaImg,
      demo: "#",
    },
    {
      title: "FLAQ Website",
      desc: "Developed the FLAQ company website, implementing modular UI components and consistent design across pages. Prioritized responsive layouts and accessibility to ensure an inclusive user experience on all devices, improving engagement and usability.",
      tags: ["Next.js", "Tailwind"],
      img: "/projects/flaq.jpg",
      demo: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="about-shape about-shape-1" aria-hidden="true" />
      <div className="about-shape about-shape-2" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold text-amber-500 font-sync text-center mb-12"
        >
          Projects
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((p) => (
            <article
              key={p.title}
              className="project-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-video bg-black/30">
                <img
                  src={p.img}
                  alt={`${p.title} preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-amber-500 font-sync">
                  {p.title}
                </h3>
                <p className="text-white/80 font-inter">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-inter"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-white transition duration-300"
                    aria-label={`Open demo for ${p.title} in a new tab`}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
