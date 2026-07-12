import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const SplitText = ({
  text = "",
  className = "",
  delay = 0.03,
  duration = 0.6,
  splitType = "chars",
  tag = "p",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const words = text.split(" ");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const Tag = tag;

  if (splitType === "words") {
    return (
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className={`overflow-hidden ${className}`}
      >
        <Tag className="inline">
          {words.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span className="inline-block" variants={child}>
                {word}
              </motion.span>
            </span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={`overflow-hidden ${className}`}
    >
      <Tag className="inline">
        {text.split("").map((char, ci) => (
          <span key={ci} className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={child}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
};

export default SplitText;
