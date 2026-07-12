import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSkills } from "../../lib/api";
import { fallbackSkills } from "../../data/fallbacks";
import { SectionHeading } from "../ui";
import LogoLoop from "../ui/LogoLoop";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiGit,
  SiDocker,
  SiOpenaigym,
  SiSwagger,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const iconMap = {
  HTML: { icon: SiHtml5, color: "#e34f26" },
  CSS: { icon: SiCss, color: "#1572b6" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e" },
  "React.js": { icon: SiReact, color: "#61dafb" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress, color: "#ffffff" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1" },
  MongoDB: { icon: SiMongodb, color: "#47a248" },
  Python: { icon: SiPython, color: "#3776ab" },
  TensorFlow: { icon: SiTensorflow, color: "#ff6f00" },
  PyTorch: { icon: SiPytorch, color: "#ee4c2c" },
  Git: { icon: SiGit, color: "#f05032" },
  Docker: { icon: SiDocker, color: "#2496ed" },
  Java: { icon: FaJava, color: "#ed8b00" },
  LLMs: { icon: SiOpenaigym, color: "#10a37f" },
  "REST APIs": { icon: SiSwagger, color: "#85ea2d" },
};

const ease = [0.16, 1, 0.3, 1];

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        if (res.data && res.data.length > 0) {
          setSkills(res.data);
        } else {
          setSkills(fallbackSkills);
        }
      } catch {
        setSkills(fallbackSkills);
      }
    };
    fetchSkills();
  }, []);

  const mappedLogos = skills
    .filter((s) => iconMap[s.name])
    .map((s) => ({
      icon: iconMap[s.name].icon,
      label: s.name,
    }));

  const half = Math.ceil(mappedLogos.length / 2);
  const row1 = mappedLogos.slice(0, half);
  const row2 = mappedLogos.slice(half);

  return (
    <section
      id="skills"
      className="py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionHeading
          label="What I Work With"
          title="Toolbox"
          subtitle="Tools of the trade — from frameworks to frameworks-of-thought."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8"
        >
          {row1.length > 0 && (
            <LogoLoop
              logos={row1}
              speed={40}
              direction="left"
              logoHeight={56}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#080818"
            />
          )}
          {row2.length > 0 && (
            <LogoLoop
              logos={row2}
              speed={40}
              direction="right"
              logoHeight={56}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#080818"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
