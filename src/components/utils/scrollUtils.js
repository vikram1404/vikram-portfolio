import { gsap } from "gsap";

export const animateSection = (elements, options = {}) => {
  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.5,
    stagger: options.stagger || 0.1,
    ease: "power2.out",
    overwrite: true,
    onComplete: () => {
      // Ensure elements stay visible after animation
      gsap.set(elements, { opacity: 1, y: 0 });
    }
  });
};

export const setupSectionAnimation = (sectionRef, elements) => {
  // Initial state
  gsap.set(elements, { opacity: 0, y: 20 });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSection(elements);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "50px"
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) {
      observer.unobserve(sectionRef.current);
    }
  };
};