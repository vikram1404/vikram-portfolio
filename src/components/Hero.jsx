import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/HeroSection.css";
import bgVideo from "../assets/videos/hero-background.mp4";

export default function HeroSection() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, {
      opacity: 1,
      y: 50,
      duration: 1.2,
    })
      .from(titleRef.current, {
        opacity: 1,
        y: -30,
        duration: 1,
      }, "-=0.8")
      .from(descRef.current, {
        opacity: 1,
        y: 20,
        duration: 1,
      }, "-=0.8")
      .from(buttonsRef.current, {
        opacity: 1,
        scale: 0.95,
        duration: 0.8,
      }, "-=0.6");
  }, []);

  return (
    <div className="hero-section relative w-full h-screen overflow-hidden">
      <video
        className="hero-video absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className="hero-content relative z-10 flex flex-col items-center justify-center text-center h-full px-4"
        ref={containerRef}
      >
        <h1
          className="text-4xl md:text-6xl font-bold text-amber-500 font-sync mb-4"
          ref={titleRef}
        >
          Hi, I'm Vikram
        </h1>

        <p
          className="text-white text-base md:text-lg max-w-2xl leading-relaxed mb-6 font-inter"
          ref={descRef}
        >
          I'm a passionate <span className="text-amber-500 font-semibold">Frontend Developer</span> 
          specializing in building responsive, user-friendly web applications. I bring ideas to life 
          using technologies like <span className="text-amber-500">React.js</span>, 
          <span className="text-amber-500"> Next.js</span>, <span className="text-amber-500">Redux</span>, 
          <span className="text-amber-500"> JavaScript</span>, and <span className="text-amber-500">Tailwind CSS</span>.
        </p>

        <div className="flex gap-4" ref={buttonsRef}>
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-amber-500 transition duration-300"
          >
            GitHub
          </a>

          <a
            href="/assets/your-cv.pdf"
            download
            className="bg-amber-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-white transition duration-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
}
