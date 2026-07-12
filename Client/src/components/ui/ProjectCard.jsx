import { motion } from "framer-motion";
import ElectricBorder from "../../reactbits/ElectricBorder";

const normalizeTechStack = (techstack) => {
  if (Array.isArray(techstack)) return techstack;
  if (typeof techstack === "string") return techstack.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const ProjectCard = ({ project }) => {
  const techStack = normalizeTechStack(project.techstack);

  return (
    <ElectricBorder intensity={0.6}>
      <motion.div
        className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      >
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-52 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">{project.title}</h3>
          <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-gray-300 border border-white/15"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-white hover:text-black transition-colors"
              >
                GitHub Repo
              </a>
            )}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-primary transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </ElectricBorder>
  );
};

export default ProjectCard;
