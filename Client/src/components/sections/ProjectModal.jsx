import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { TechBadge } from "../ui";
import { normalizeTechStack } from "../../lib/utils";

const ease = [0.16, 1, 0.3, 1];

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocus = useRef(null);

  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      previousFocus.current = document.activeElement;
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const modal = modalRef.current;
      if (!modal) return;

      const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const handleTab = (e) => {
        if (e.key !== "Tab") return;
        const focusables = Array.from(modal.querySelectorAll(focusableSelector));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.removeEventListener("keydown", handleTab);
        document.body.style.overflow = "";
        previousFocus.current?.focus();
      };
    }
  }, [project, handleEsc]);

  const techStack = project ? normalizeTechStack(project.techstack) : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Project: ${project.title}`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/85 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[800px] max-h-[85vh] overflow-y-auto rounded-2xl bg-surface border border-glass-border shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Animated gradient border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 -z-10 opacity-50" />

            {/* Close */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-glass-strong backdrop-blur-md border border-glass-border text-text-tertiary hover:text-text-primary hover:bg-glass-medium transition-all duration-200"
            >
              <X size={16} />
            </button>

            {/* Image */}
            {project.image_url && (
              <div className="w-full h-56 md:h-72 overflow-hidden rounded-t-2xl">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-3">
                {project.title}
              </h2>

              <p id="modal-description" className="text-sm text-text-secondary leading-relaxed mb-6">
                {project.description}
              </p>

              {techStack.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs text-text-muted uppercase tracking-wider font-medium mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <TechBadge key={i} label={tech} delay={i * 0.04} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold no-underline hover:bg-primary-400 transition-colors duration-200"
                  >
                    <Github size={15} />
                    View Code
                  </a>
                )}
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-glass-border text-text-secondary text-sm font-semibold no-underline hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
