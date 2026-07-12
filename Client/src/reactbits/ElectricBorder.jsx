import { useState } from "react";
import { motion } from "framer-motion";

const ElectricBorder = ({
  children,
  className = "",
  color = "#ff3e00",
  intensity = 0.8,
  borderWidth = 2,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isHovered
          ? {
              boxShadow: `0 0 ${20 * intensity}px ${color}40, 0 0 ${40 * intensity}px ${color}20, inset 0 0 ${20 * intensity}px ${color}10`,
            }
          : {
              boxShadow: `0 0 0px transparent, 0 0 0px transparent, inset 0 0 0px transparent`,
            }
      }
      transition={{ duration: 0.3 }}
      style={{
        border: `${borderWidth}px solid ${isHovered ? color : "rgba(255,255,255,0.1)"}`,
        borderRadius: "inherit",
        transition: "border-color 0.3s ease",
      }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: "inherit", overflow: "hidden" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${color}15 50%, transparent 70%)`,
              animation: "electricSweep 2s linear infinite",
            }}
          />
        </motion.div>
      )}
      <style>{`
        @keyframes electricSweep {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default ElectricBorder;
