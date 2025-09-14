import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      {
        y: -100, // Start 100px above
        opacity: 0, // Start invisible
      },
      {
        y: 0, // Animate to original position
        opacity: 1, // Fade in
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);
  
  const handleAnchorClick = (e, href) => {
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    // Use native scrollIntoView so CSS scroll-margin-top applies
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="fixed top-0 w-full z-[999]">
      <nav
        ref={navRef}
        className="transform -translate-y-full opacity-0 backdrop-blur-md bg-white/10 border-gray-200 shadow-sm rounded-4xl max-w-6xl mx-auto mt-5 transition-all duration-1000"
      >
        <div className=" px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="font-sync text-2xl md:text-4xl font-bold tracking-tight text-amber-500 ">
            Vikram
          </h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 text-amber-500 font-medium font-inter">
            {navLinks.map((link, i) => (
              <li
                key={i}
                className="hover:text-white transition duration-300 cursor-pointer"
              >
                <a href={link.href} className="block py-2" onClick={(e) => handleAnchorClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden text-amber-500 ">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="md:hidden flex flex-col items-center bg-transparent py-4 space-y-4 shadow-md text-amber-500 font-medium">
            {navLinks.map((link, i) => (
              <li
                key={i}
                className="hover:text-white transition duration-300 cursor-pointer"
              >
                <a href={link.href} className="block py-2" onClick={(e) => handleAnchorClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
