import { motion } from "framer-motion";
import ElectricBorder from "../../reactbits/ElectricBorder";

const buildIconClass = (icon) => {
  const value = (icon || "").trim();
  if (!value) return "devicon-code-plain colored";
  if (value.includes("devicon-") || value.includes("fa-")) return value;
  return `devicon-${value}-plain colored`;
};

const SkillCard = ({ skill }) => {
  return (
    <ElectricBorder intensity={0.6} className="h-full">
      <motion.div
        className="bg-white/[0.06] backdrop-blur-xl rounded-2xl p-5 text-center cursor-pointer transition-all h-full flex flex-col items-center justify-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <i className={`${buildIconClass(skill.icon)} text-4xl`} />
        <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
      </motion.div>
    </ElectricBorder>
  );
};

export default SkillCard;
