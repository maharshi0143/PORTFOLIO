import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollTo from "../../hooks/useScrollTo";

const navLinks = [
  { label: "HOME", href: "home" },
  { label: "ABOUT", href: "about" },
  { label: "SKILLS", href: "skills" },
  { label: "EXPERIENCE", href: "experience" },
  { label: "PROJECTS", href: "projects" },
  { label: "CONTACT", href: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const scrollTo = useScrollTo();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <nav className="w-full px-5 md:px-12 py-5 flex justify-between items-center fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/10">
      <h1 className="text-xl md:text-2xl font-heading font-bold text-gray-900 tracking-tight">
        MAHARSHI <span className="text-primary">DENUVAKONDA</span>
      </h1>

      <div
        className="md:hidden text-3xl cursor-pointer text-gray-900 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </div>

      <ul className="hidden md:flex list-none gap-8 text-base font-bold text-gray-900">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <button
              onClick={() => handleNav(href)}
              className={`bg-transparent border-none cursor-pointer font-bold text-base transition-colors hover:text-primary ${
                activeSection === href ? "text-primary" : "text-gray-900"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 right-5 w-56 bg-black/80 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-5 text-center text-white font-bold z-50"
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className={`bg-transparent border-none cursor-pointer font-bold text-base transition-colors hover:text-primary ${
                    activeSection === href ? "text-primary" : "text-white"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
