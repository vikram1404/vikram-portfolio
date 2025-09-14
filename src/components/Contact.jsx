import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import ContactImg from "../assets/images/contact-img.jpg";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    setResultType(null);
    setErrors({});

    const formData = new FormData(event.target);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    const nextErrors = {};
    if (!name) nextErrors.name = "Name is required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Valid email is required";
    if (!message || message.length < 10) nextErrors.message = "Message should be at least 10 characters";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setResult("Sending...");

    formData.set("access_key", "b12fc25e-7e74-41b8-9be3-33502982567e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult("Thanks! Your message has been sent.");
        setResultType("success");
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong. Please try again.");
        setResultType("error");
      }
    } catch {
      setResult("Network error. Please try again later.");
      setResultType("error");
    } finally {
      setSubmitting(false);
    }
  };

  // Auto-clear result message after a short delay
  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => {
      setResult("");
      setResultType(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [result]);

  // Animation setup
  useEffect(() => {
    const elements = [
      headingRef.current,
      infoRef.current,
      formRef.current
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(elements, { opacity: 0, y: 50 });

      // Function to animate all elements immediately
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

      // Set up scroll animations with reset
      elements.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            end: "bottom top+=100",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      // Handle hash change
      const handleHashChange = () => {
        if (window.location.hash === '#contact') {
          animateIn();
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      
      // Check initial hash
      if (window.location.hash === '#contact') {
        animateIn();
      }

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-16 md:py-24 overflow-hidden"
    >
      <div className="about-overlay absolute inset-0" aria-hidden="true" />
      <div className="about-shape about-shape-1" aria-hidden="true" />
      <div className="about-shape about-shape-2" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold text-amber-500 font-sync text-center mb-10"
        >
          Contact
        </h2>

        {/* Parent container card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch h-full">
            {/* Left: Background image panel with address & socials (with icons) */}
            <aside
              ref={infoRef}
              className="relative h-full py-20"
              style={{
                backgroundImage: `url(${ContactImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative z-10 p-6 md:p-10 text-white/90 font-inter flex flex-col justify-end gap-4 h-full">
                <h3 className="text-amber-500 font-sync text-2xl mb-3">
                  Get in touch
                </h3>
                <p className="mb-2 text-white/85">
                  I'm available for freelance work, collaborations, and
                  full-time roles.
                </p>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="mt-1 text-amber-500" />{" "}
                    <span>Bangalore, Karnataka, India</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={18} className="mt-1 text-amber-500" />{" "}
                    <a
                      href="mailto:you@example.com"
                      className="hover:text-amber-500 transition"
                    >
                      vikrambind5@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={18} className="mt-1 text-amber-500" />{" "}
                    <a
                      href="tel:+918303505009"
                      className="hover:text-amber-500 transition"
                    >
                      +91 8303505009
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <a
                    href="https://github.com/vikram1404"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-20 h-20 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vikram-kumar-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-20 h-20 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="mailto:vikrambind5@gmail.com"
                    aria-label="Email"
                    className="w-20 h-20 rounded-full bg-white/10 hover:bg-amber-500/90 text-white flex items-center justify-center transition"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right: Form */}
            <form
              onSubmit={onSubmit}
              ref={formRef}
              className="p-6 md:p-10 space-y-4 h-full flex flex-col justify-center"
            >
              <input
                type="hidden"
                name="access_key"
                value="b12fc25e-7e74-41b8-9be3-33502982567e"
              ></input>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-1 text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                />
                {errors.email && (
                  <p id="err-email" className="mt-1 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  rows="6"
                  name="message"
                  placeholder="Message"
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={`w-full bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"} rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                />
                {errors.message && (
                  <p id="err-message" className="mt-1 text-red-400 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`flex items-center justify-center gap-2 cursor-pointer ${submitting ? "opacity-80 cursor-not-allowed" : ""} bg-amber-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-white transition duration-300`}
              >
                {submitting && (
                  <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {submitting ? "Sending..." : "Send"}
              </button>
              <span className={`block text-sm mt-2 ${resultType === "success" ? "text-green-400" : resultType === "error" ? "text-red-400" : "text-white/70"}`}>
                {result}
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
