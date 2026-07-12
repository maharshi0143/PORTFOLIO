import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function AuroraGradient() {
  const reducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cyanOpacity = 0.12 - scrollProgress * 0.06;
  const purpleOpacity = 0.10 + scrollProgress * 0.04;
  const roseOpacity = 0.06 + scrollProgress * 0.03;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, rgba(0,201,224,${cyanOpacity}) 0%, transparent 70%)`,
        }}
        animate={
          reducedMotion
            ? {}
            : { x: [0, 80, -40, 0], y: [0, -60, 40, 0] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, rgba(139,92,246,${purpleOpacity}) 0%, transparent 70%)`,
        }}
        animate={
          reducedMotion
            ? {}
            : { x: [0, -60, 30, 0], y: [0, 50, -30, 0] }
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute -bottom-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, rgba(244,63,94,${roseOpacity}) 0%, transparent 70%)`,
        }}
        animate={
          reducedMotion
            ? {}
            : { x: [0, 50, -60, 0], y: [0, -40, 60, 0] }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
    </div>
  );
}
