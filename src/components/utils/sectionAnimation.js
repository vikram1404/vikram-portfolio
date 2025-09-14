import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSectionAnimation = (sectionRef, elements = [], options = {}) => {
  const ctx = gsap.context(() => {
    // Initial state
    gsap.set(elements, { opacity: 0, y: 30 });

    // Immediate animation if section is already in view or hash matches
    const animateIn = () => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        overwrite: true
      });
    };

    // Create a single ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: animateIn,
      onEnterBack: animateIn,
      markers: false
    });

    // Handle hash-based navigation
    if (options.id && window.location.hash === `#${options.id}`) {
      // Small delay to ensure proper positioning
      setTimeout(animateIn, 100);
    }

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, sectionRef);

  return ctx;
};