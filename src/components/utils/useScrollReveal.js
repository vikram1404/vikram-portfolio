import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal
 * Applies a consistent scroll-reveal to provided refs.
 * - Elements fade and slide in on enter
 * - Reverse out on leave when scrolling back
 * - Works top→down and bottom→top
 */
export function useScrollReveal(refs, options = {}) {
  useEffect(() => {
    const provided = Array.isArray(refs) ? refs : refs ? [refs] : [];
    const triggerElement = options.trigger?.current ?? options.trigger ?? provided[0]?.current ?? document.body;

    // Resolve target elements: provided refs/elements + optional selector within trigger
    const fromRefs = provided
      .map((r) => (r?.current ?? r))
      .filter((el) => el);
    const fromSelector = options.targetsSelector
      ? Array.from((triggerElement instanceof Element ? triggerElement : document).querySelectorAll(options.targetsSelector))
      : [];
    const targets = [...fromRefs, ...fromSelector];
    if (targets.length === 0) return;

    // Scrubbed timeline for smoother, tied-to-scroll motion
    if (options.scrub) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: options.start || "top 95%",
          end: options.end || "bottom 20%",
          scrub: options.scrub === true ? 0.6 : options.scrub,
          markers: options.markers || false,
        },
        defaults: { ease: "power3.out" },
      });

      targets.forEach((el, index) => {
        tl.fromTo(
          el,
          { opacity: 0, y: options.y ?? 24 },
          { opacity: 1, y: 0, duration: 0.7, immediateRender: false },
          index * (options.stagger ?? 0.12)
        );
      });

      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      };
    }

    // Fallback: individual triggers per element (non-scrub)
    const tweens = targets.map((el, index) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: triggerElement,
            start: options.start || "top 95%",
            end: options.end || "bottom 20%",
            toggleActions: "play reverse play reverse",
            markers: options.markers || false,
          },
          delay: index * (options.stagger ?? 0.12),
        }
      )
    );

    return () => {
      tweens.forEach((t) => {
        if (!t) return;
        t.scrollTrigger && t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, [refs, options.trigger, options.start, options.end, options.markers, options.y, options.scrub, options.targetsSelector, options.stagger]);
}


