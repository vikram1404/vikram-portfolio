import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/AboutSection.css";
import vikramProfile from "../assets/images/vikram-profile.JPG";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const listItemsRef = useRef([]);
  const cardsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Function to animate each element with ScrollTrigger
      const animateFrom = (element, delay = 0) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      };

      // Animate each item
      if (imageRef.current) animateFrom(imageRef.current);
      if (headingRef.current) animateFrom(headingRef.current, 0.1);
      if (contentRef.current) animateFrom(contentRef.current, 0.2);

      listItemsRef.current.forEach((el, i) => animateFrom(el, i * 0.15));
      cardsRef.current.forEach((el, i) => animateFrom(el, i * 0.2));
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="about-shape about-shape-1" aria-hidden="true" />
      <div className="about-shape about-shape-2" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Left: Description */}
          <div className="relative z-10 order-2 md:order-1">
            <h2
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-amber-500 font-sync mb-4"
            >
              About Me
            </h2>
            <p
              ref={contentRef}
              className="text-white/90 text-base md:text-lg font-inter leading-relaxed mb-6 break-words"
            >
              I design and build product-ready interfaces that balance
              aesthetics with functionality. I care about clean architecture,
              reusable components, and accessible patterns that scale. Thoughtful
              micro-interactions and performant motion help users feel in
              control.
            </p>

            <ul className="list-disc list-inside text-white/80 font-inter space-y-2">
              {[
                "Translating product ideas into modular, scalable UI.",
                "Collaborating with designers and backend engineers effectively.",
                "Measuring performance and shipping meaningful improvements.",
              ].map((item, index) => (
                <li
                  key={index}
                  ref={(el) => (listItemsRef.current[index] = el)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Middle: Circular Profile */}
          <div className="flex justify-center order-1 md:order-2">
            <div
              ref={imageRef}
              className="about-portrait relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/5"
            >
              <img
                src={vikramProfile}
                alt="Vikram portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="about-portrait-glow" aria-hidden="true" />
            </div>
          </div>

          {/* Right: Cards */}
          <div className="order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6 md:gap-8 items-stretch">
              {[
                {
                  title: "Experience",
                  desc: "2+ years crafting responsive apps, design systems, and tooling.",
                },
                {
                  title: "Stack",
                  desc: "React, Next.js, Redux, TypeScript, Tailwind CSS, GSAP.",
                },
                {
                  title: "Focus",
                  desc: "Performance, accessibility, and purposeful animations.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="about-card rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition duration-300 h-full"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-amber-500 font-sync mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-inter">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="about-glow" aria-hidden="true" />
    </section>
  );
}
