import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import FadeContent from "../../reactbits/FadeContent";

const About = () => {
  return (
    <section className="relative z-10 w-full min-h-screen py-24 px-8 md:px-20 pointer-events-auto" id="about">
      <SectionHeading title="About" highlight="Me" />

      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-16">
        <FadeContent className="flex-1" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
            <span className="text-primary">Engineer</span> by practice,{" "}
            <span className="text-primary">Researcher</span> by curiosity.
          </h2>
          <p className="text-lg text-gray-300 font-semibold leading-relaxed mb-6">
            I am Maharshi, a full-stack developer and AI researcher focused on reliable products, intelligent systems, and measurable outcomes.
          </p>
          <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">
            My <span className="text-primary">Education</span>
          </h3>
          <GlassCard className="p-6" hover>
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold text-primary">Aditya University</h2>
              <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-sm font-bold whitespace-nowrap">
                2024 - 2027
              </span>
            </div>
            <h3 className="text-base font-semibold text-white mb-3">
              B.Tech in Artificial Intelligence and Machine Learning
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Pursuing an AIML-focused engineering degree with an emphasis on applied machine learning,
              software development, intelligent systems, and practical problem solving.
            </p>
          </GlassCard>
        </FadeContent>

        <FadeContent className="flex-1 flex flex-col gap-7" delay={0.3}>
          <GlassCard className="p-7">
            <h2 className="text-2xl font-bold text-primary mb-4">What I bring</h2>
            <p className="text-base text-gray-300 font-semibold mb-3">
              End-to-end engineering across frontend, backend, and data-aware systems.
            </p>
            <p className="text-base text-gray-300 font-semibold mb-3">
              Applied AI/ML thinking shaped around practical user and product outcomes.
            </p>
            <p className="text-base text-gray-300 font-semibold">
              Strong bias toward clear architecture, rapid iteration, and dependable delivery.
            </p>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-2xl font-bold text-primary mb-4">Currently exploring</h2>
            <p className="text-base text-gray-300 font-semibold">
              Agentic workflows, LLM evaluation, intelligent automation, and software systems that make advanced tooling more usable in practice.
            </p>
          </GlassCard>
        </FadeContent>
      </div>
    </section>
  );
};

export default About;
