import { motion } from "framer-motion";
import { GraduationCap, Compass, Zap, FolderGit2, Briefcase, CheckCircle2 } from "lucide-react";
import { personal } from "../../config";
import { GlassCard, SectionHeading, AnimatedCounter } from "../ui";

const ease = [0.16, 1, 0.3, 1];

const stats = [
  { label: "Projects", value: 3, suffix: "+", icon: FolderGit2 },
  { label: "Technologies", value: 16, suffix: "+", icon: GraduationCap },
  { label: "Internships", value: 2, suffix: "+", icon: Briefcase },
  { label: "Years Building", value: 3, suffix: "+", icon: Zap },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          label="Who I Am"
          title="About Me"
          subtitle="Engineer by practice, researcher by curiosity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, margin: "-80px" }}
            className="w-full text-left"
          >
            <GlassCard className="mb-6">
              <p className="text-text-secondary leading-relaxed text-base">
                I am Maharshi — a full-stack developer and AI researcher
                who cares about building things that actually work. From designing
                REST APIs and data pipelines to training and evaluating language
                models, I operate across the full breadth of modern software systems.
              </p>
            </GlassCard>

            <GlassCard delay={0.1} className="border-l-2 !border-l-primary-500/40">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center">
                  <GraduationCap size={16} className="text-primary-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">
                    {personal.education.school}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {personal.education.period}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {personal.education.degree}
              </p>
              <p className="text-sm text-text-tertiary leading-relaxed">
                {personal.education.description}
              </p>
            </GlassCard>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            viewport={{ once: true, margin: "-80px" }}
            className="w-full text-left space-y-5"
          >
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center">
                  <Zap size={16} className="text-primary-400" />
                </div>
                <h4 className="text-base font-bold text-text-primary">
                  What I Bring
                </h4>
              </div>
              <ul className="space-y-2.5">
                {personal.strengths.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed"
                  >
                    <CheckCircle2 size={14} className="text-primary-400 shrink-0 mt-[2px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard delay={0.1}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center">
                  <Compass size={16} className="text-primary-400" />
                </div>
                <h4 className="text-base font-bold text-text-primary">
                  Currently Exploring
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {personal.exploring.split(",").map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium bg-glass-light border border-glass-border text-text-secondary"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease } }}
                className="text-center p-5 rounded-xl bg-glass-light border border-glass-border hover:border-t-primary-500/40 transition-[border-color] duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary-500/15 to-secondary-500/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary-400" />
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-text-muted tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
