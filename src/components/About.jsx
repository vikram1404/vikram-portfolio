import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/AboutSection.css";
import vikramProfile from "../assets/images/vikram-profile-img1.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const listItemsRef = useRef([]);
  const cardsRef = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    const elements = [
      imageRef.current,
      headingRef.current,
      contentRef.current,
      ...listItemsRef.current,
      ...cardsRef.current
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(elements, { opacity: 0, y: 50 });

      // Function to animate all elements
      const animateIn = () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      };

      // Create scroll triggers
      elements.forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom-=100",
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(el, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(el, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              ease: "power2.out"
            });
          }
        });
      });

      // Handle hash change
      const handleHashChange = () => {
        if (window.location.hash === '#about') {
          animateIn();
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      // Check initial hash
      if (window.location.hash === '#about') {
        animateIn();
      }

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-16 md:py-24 overflow-hidden"
    >
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="about-shape about-shape-1" aria-hidden="true" />
      <div className="about-shape about-shape-2" aria-hidden="true" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold text-amber-500 font-sync mb-6">
              About Me
            </h2>
            <div ref={contentRef} className="text-white/80 font-inter space-y-4">
              <p>
                Passionate Frontend Developer with a keen eye for design and a commitment to creating seamless, user-centric web experiences. I specialize in building responsive, performant applications using modern JavaScript frameworks and libraries.
              </p>
              <p>
                With a strong foundation in both design principles and technical implementation, I bridge the gap between aesthetics and functionality to deliver compelling digital solutions.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <div ref={el => listItemsRef.current[0] = el} className="flex items-center gap-2">
                <span className="w-12 h-12 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xl font-bold">2+</span>
                <span className="text-white/80">Years of Experience</span>
              </div>
              <div ref={el => listItemsRef.current[1] = el} className="flex items-center gap-2">
                <span className="w-12 h-12 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xl font-bold">10+</span>
                <span className="text-white/80">Projects Completed</span>
              </div>
            </div>
          </div>
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-full overflow-hidden shadow-xl">
              <img
                src={vikramProfile}
                alt="Vikram's profile"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}