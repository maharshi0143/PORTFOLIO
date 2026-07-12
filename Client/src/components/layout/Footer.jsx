import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Code } from "lucide-react";
import { personal } from "../../config";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  code: Code,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-glass-border bg-base/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-base text-text-tertiary">
          &copy; {new Date().getFullYear()} {personal.fullName}. Built with care.
        </p>

        <div className="flex items-center gap-3">
          {personal.socials.map((s) => {
            const Icon = iconMap[s.icon] || Code;
            return (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-glass-light border border-glass-border text-text-tertiary hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200"
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>

        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-glass-light border border-glass-border text-text-tertiary hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
}
