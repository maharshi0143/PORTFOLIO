import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FadeContent = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 30,
  scale = 1,
  blur = false,
  threshold = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        scale,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeContent;
