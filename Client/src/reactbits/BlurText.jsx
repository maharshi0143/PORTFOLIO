import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const BlurText = ({
  text = "",
  className = "",
  delay = 150,
  animateBy = "words",
  direction = "top",
  as: Tag = "p",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const directionMap = {
    top: { y: -20 },
    bottom: { y: 20 },
    left: { x: -20 },
    right: { x: 20 },
  };

  const initial = {
    opacity: 0,
    filter: "blur(10px)",
    ...directionMap[direction],
  };

  const animate = {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    y: 0,
  };

  const segments = animateBy === "words" ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const child = {
    hidden: initial,
    visible: {
      ...animate,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={`inline ${className}`}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.3em" : 0 }}
        >
          {segment}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
