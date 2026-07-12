import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", hover = true, ...props }) => {
  return (
    <motion.div
      className={`bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
      whileHover={
        hover
          ? { y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
