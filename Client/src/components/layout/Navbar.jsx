import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import useStore from "../../store/useStore";
import { personal } from "../../config";

const ease = [0.16, 1, 0.3, 1];

function scrollToId(id) {
  if (window.lenis) {
    window.lenis.scrollTo(`#${id}`);
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const activeSection = useStore((s) => s.activeSection);
  const isMobileMenuOpen = useStore((s) => s.isMobileMenuOpen);
  const setMobileMenuOpen = useStore((s) => s.setMobileMenuOpen);

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback(
    (id) => {
      scrollToId(id);
      setMobileMenuOpen(false);
    },
    [setMobileMenuOpen]
  );

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-base/60 backdrop-blur-xl border-b border-glass-border"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-[width] duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
            className="text-2xl font-heading font-extrabold text-text-primary no-underline tracking-tight"
          >
            Maharshi
            <span className="text-primary-500">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {personal.navLinks.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className={`relative bg-transparent border-none cursor-pointer text-base font-medium transition-colors duration-200 py-1 ${
                    activeSection === href
                      ? "text-primary-400"
                      : "text-text-tertiary hover:text-text-primary"
                  }`}
                >
                  {label}
                  {activeSection === href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
            <li>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-[10px] bg-primary-500 text-white text-[15px] font-semibold no-underline hover:bg-primary-400 transition-colors duration-200"
              >
                <Download size={14} />
                Resume
              </a>
            </li>
          </ul>

          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-glass-light border border-glass-border text-text-primary"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 bg-void/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease }}
              className="fixed inset-0 z-40 bg-base/95 backdrop-blur-2xl md:hidden flex flex-col"
            >
              <div className="h-20" />
              <nav className="flex-1 flex flex-col justify-center px-8">
                <ul className="space-y-2 list-none">
                  {personal.navLinks.map(({ label, href }, i) => (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease }}
                    >
                      <button
                        onClick={() => handleNav(href)}
                        className={`w-full text-left bg-transparent border-none py-4 px-4 rounded-xl text-3xl font-heading font-bold transition-colors ${
                          activeSection === href
                            ? "text-primary-400 bg-primary-500/10"
                            : "text-text-secondary hover:text-text-primary hover:bg-glass-light"
                        }`}
                      >
                        {label}
                      </button>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: personal.navLinks.length * 0.06,
                      duration: 0.3,
                      ease,
                    }}
                    className="pt-4"
                  >
                    <a
                      href={personal.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary-500 text-white text-xl font-semibold no-underline"
                    >
                      <Download size={18} />
                      Resume
                    </a>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
