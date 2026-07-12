import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Code } from "lucide-react";
import { personal } from "../../config";
import { PrimaryButton, SecondaryButton } from "../ui";

const HeroScene = lazy(() => import("../three/HeroScene"));

const ease = [0.16, 1, 0.3, 1];

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  code: Code,
};

function TypingRole() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const phrases = [
    `${personal.role} ${personal.secondaryRole}`,
    "Building Production-Grade Software",
    "Turning Research into Reality",
  ];

  useEffect(() => {
    const current = phrases[loopIndex % phrases.length];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopIndex((p) => p + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1)
          );
        },
        isDeleting ? 35 : 75
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopIndex]);

  return (
    <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-primary-500 ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-text-muted tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={16} className="text-text-muted" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 pt-24 pb-10 overflow-hidden"
    >
      {/* 3D scene — ambient backdrop behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
        <Suspense
          fallback={
            <div className="w-48 h-48 rounded-full border border-primary-500/20 animate-pulse" />
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Content — centered on top of 3D */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          className="text-xl text-text-secondary mb-5 font-medium"
        >
          {personal.greeting} <span className="inline-block">&#x1F44B;</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease }}
          className="text-[52px] sm:text-[72px] lg:text-[96px] font-heading font-bold text-text-primary leading-[1.05] tracking-[-0.03em] mb-5"
        >
          {personal.name}{" "}
          <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,201,224,0.15)]">
            Denuvakonda
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease }}
          className="text-2xl md:text-[28px] lg:text-[36px] font-heading font-semibold mb-5 min-h-[40px] overflow-hidden"
        >
          <TypingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease }}
          className="text-lg lg:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl"
        >
          {personal.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease }}
          className="flex items-center gap-4 flex-wrap justify-center mb-10"
        >
          <PrimaryButton className="text-base px-8 py-4" onClick={scrollToProjects}>
            View Projects
          </PrimaryButton>
          <SecondaryButton
            className="text-base px-8 py-4"
            onClick={() => window.open(personal.resumeUrl, "_blank")}
          >
            <Download size={16} />
            Resume
          </SecondaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7, ease }}
          className="flex items-center gap-4 justify-center"
        >
          {personal.socials.map((s, i) => {
            const Icon = socialIconMap[s.icon] || Code;
            return (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor-hover
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.1, ease }}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-glass-light border border-glass-border text-text-secondary hover:text-primary-400 hover:border-primary-500/30 hover:bg-glass-medium transition-all duration-200"
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
