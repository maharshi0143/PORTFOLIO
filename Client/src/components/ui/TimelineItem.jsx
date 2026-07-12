import { motion } from "framer-motion";

const TimelineItem = ({ experience, index }) => {
  return (
    <motion.div
      className="relative pl-16 mb-14"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute left-3 top-2 w-6 h-6 rounded-full bg-primary shadow-[0_0_20px_#ff3e00]" />
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          {experience.title}
        </h3>
        <p className="text-primary font-semibold mb-3">{experience.duration}</p>
        <p className="text-gray-300 leading-relaxed">{experience.description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
