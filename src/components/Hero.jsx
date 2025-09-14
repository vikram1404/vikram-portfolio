import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/HeroSection.css";
import bgVideo from "../assets/videos/hero-bg.mp4";

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Fade in whole hero first
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      // Heading (delayed)
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        "+=0.2" // wait 0.2s
      )
      // Description (delayed)
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "+=0.2" // wait 0.2s
      )
      // Buttons (delayed)
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "+=0.2" // wait 0.2s
      );

    // Video slow zoom loop
    gsap.to(videoRef.current, {
      scale: 1.1,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section relative w-full h-screen overflow-hidden opacity-0"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 max-w-5xl mx-auto pt-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-wide font-sync"
        >
          Hi, I’m <span className="text-amber-500">Vikram</span>, a Software Developer
        </h1>

        <p
          ref={descRef}
          className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed mb-8"
        >
          I specialize in building{" "}
          <span className="text-amber-500 font-medium">
            modern, high-performance web applications
          </span>{" "}
          with
          <span className="text-amber-500"> React.js</span>,{" "}
          <span className="text-amber-500">Next.js</span>, and{" "}
          <span className="text-amber-500">Tailwind</span>.  
          I focus on creating responsive, user-friendly, and visually stunning
          digital experiences.
        </p>

        <div ref={buttonsRef} className="flex gap-4">
          <a
            href="#projects"
            className="bg-amber-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:scale-105 transition-transform duration-300"
          >
            🚀 View My Work
          </a>
          <a
            href="/assets/your-cv.pdf"
            download
            className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-amber-500 hover:scale-105 transition-transform duration-300"
          >
            📄 Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
