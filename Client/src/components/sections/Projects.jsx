import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import { getProjects } from "../../lib/api";
import { fallbackProjects } from "../../data/fallbacks";
import { SectionHeading, TechBadge, SkeletonBlock } from "../ui";
import { normalizeTechStack } from "../../lib/utils";

const ease = [0.16, 1, 0.3, 1];

function ProjectPlaceholder({ title }) {
  return (
    <div className="h-52 overflow-hidden bg-gradient-to-br from-primary-500/10 via-secondary-500/5 to-transparent flex items-center justify-center relative">
      <FolderGit2 size={40} className="text-primary-500/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-glass-light/80 to-transparent" />
    </div>
  );
}

export default function Projects({ onOpenModal }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          label="Built with Purpose"
          title="Featured Projects"
          subtitle="Work shaped by engineering discipline and research thinking."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => {
              const techStack = normalizeTechStack(project.techstack);
              return (
                <motion.div
                  key={project.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={
                    typeof window !== "undefined" &&
                    window.matchMedia("(pointer: fine)").matches
                      ? { y: -8, transition: { duration: 0.4, ease } }
                      : {}
                  }
                  onClick={() => onOpenModal?.(project)}
                  className="group relative flex flex-col rounded-xl bg-glass-light border border-glass-border hover:border-primary-500/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,201,224,0.05)] transition-[border-color,box-shadow] duration-300 overflow-hidden cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenModal?.(project);
                    }
                  }}
                >
                  {project.image_url ? (
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-glass-medium/80 backdrop-blur-sm border border-glass-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ExternalLink size={14} className="text-text-secondary" />
                      </div>
                    </div>
                  ) : (
                    <ProjectPlaceholder title={project.title} />
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2 font-heading group-hover:text-primary-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techStack.map((tech, j) => (
                        <TechBadge key={j} label={tech} delay={j * 0.03} />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-glass-medium border border-glass-border text-text-secondary text-xs font-semibold no-underline hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200"
                        >
                          <Github size={13} />
                          Code
                        </a>
                      )}
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-500/15 border border-primary-500/20 text-primary-400 text-xs font-semibold no-underline hover:bg-primary-500/25 transition-all duration-200"
                        >
                          <ExternalLink size={12} />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
