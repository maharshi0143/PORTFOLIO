import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getExperiences } from "../../lib/api";
import { fallbackExperiences } from "../../data/fallbacks";
import { SectionHeading, SkeletonBlock } from "../ui";

const ease = [0.16, 1, 0.3, 1];

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getExperiences();
        if (res.data && res.data.length > 0) {
          setExperiences(res.data);
        } else {
          setExperiences(fallbackExperiences);
        }
      } catch {
        setExperiences(fallbackExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <section
      id="experience"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          label="Where I've Worked"
          title="Experience"
          subtitle="My professional journey through internships and applied research."
        />

        {loading ? (
          <div className="max-w-[680px] mx-auto space-y-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="relative max-w-[900px] mx-auto">
            {/* Timeline line */}
            <div className="absolute left-[17px] md:left-[21px] top-0 w-[2px] h-full bg-gradient-to-b from-primary-500/40 via-glass-border to-transparent" />

            {experiences.map((exp, i) => {
              return (
                <motion.div
                  key={exp.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="relative pl-14 md:pl-16 mb-10 last:mb-0"
                >
                    {/* Dot */}
                    <div className="absolute left-[11px] md:left-[15px] top-2">
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(0,201,224,0.4)]" />
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary-500 animate-ping [animation-iteration-count:3] opacity-30" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="p-6 rounded-xl bg-glass-medium border border-glass-border border-l-2 border-l-primary-500/50 hover:border-primary-500/20 transition-[border-color] duration-300">
                      <h3 className="text-lg font-bold text-text-primary mb-1 font-heading">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-primary-400/70 font-medium mb-3">
                        {exp.duration}
                      </p>
                      {exp.highlights ? (
                        <ul className="space-y-2">
                          {exp.highlights.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/60 shrink-0 mt-[7px]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
