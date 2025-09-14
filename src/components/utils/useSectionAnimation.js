import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSectionAnimation(sectionId) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const elements = section.querySelectorAll('.animate-section');

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 20 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    // Add animations to timeline
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Handle direct navigation
    const handleHashChange = () => {
      if (window.location.hash === `#${sectionId}`) {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: null // Disable scroll triggering for direct navigation
        });
      }
    };

    // Check initial hash
    if (window.location.hash === `#${sectionId}`) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [sectionId]);

  return sectionRef;
}