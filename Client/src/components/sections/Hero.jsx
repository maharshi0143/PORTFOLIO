import { motion } from "framer-motion";
import useScrollTo from "../../hooks/useScrollTo";
import SplitText from "../../reactbits/SplitText";

const Hero = () => {
  const scrollTo = useScrollTo();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="relative z-10 w-full min-h-screen flex items-center justify-between gap-10 px-8 md:px-20 pt-24" id="home">
      <motion.div
        className="max-w-[600px] flex-1 pointer-events-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SplitText
            text="AIML RESEARCHER | FULL STACK DEVELOPER"
            tag="h2"
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-5"
            splitType="words"
            delay={0.08}
          />
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 font-semibold leading-relaxed mb-8">
          Building scalable full-stack products and{" "}
          <span className="text-primary font-bold">AI-powered systems</span> that move from research to real-world impact.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
          <button
            onClick={() => scrollTo("projects")}
            className="px-7 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-base cursor-pointer hover:bg-primary transition-colors border-none"
          >
            My Work
          </button>
          <a
            href="https://drive.google.com/file/d/1pcy_v5iHKDzZWoIUbRa7GcD-ZTapr_Nf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-base no-underline hover:bg-primary transition-colors inline-flex items-center"
          >
            View Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-1 flex justify-end pointer-events-auto hidden lg:flex"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-[520px] p-7 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-white">AI/ML Research Collaborator</h3>
            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-bold whitespace-nowrap">
              Current
            </span>
          </div>
          <p className="text-primary font-bold text-base mb-4">Project Genesis AI Labs Pvt. Ltd.</p>
          <p className="text-gray-300 text-base leading-relaxed mb-5">
            Currently contributing to applied AI/ML research with a focus on practical experimentation,
            intelligent workflows, model evaluation, and turning research concepts into usable software directions.
          </p>
          <ul className="list-none grid gap-3 p-0 m-0">
            {[
              "Collaborating on AI/ML initiatives that connect research ideas with implementation-ready prototypes.",
              "Exploring evaluation-driven workflows to improve the reliability and usefulness of intelligent systems.",
              "Supporting product-minded experimentation around automation, LLM-driven tooling, and applied machine learning.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2.5 items-start text-gray-300 text-sm leading-relaxed">
                <span className="w-2.5 h-2.5 mt-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_10px_rgba(255,62,0,0.35)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
