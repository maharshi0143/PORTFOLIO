import { motion } from "framer-motion";
import FadeContent from "../../reactbits/FadeContent";

const StatCard = ({ icon, count, label, index = 0 }) => {
  return (
    <FadeContent delay={index * 0.1}>
      <motion.div
        className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-7 flex items-center gap-5"
        whileHover={{ y: -4, borderColor: "rgba(255,62,0,0.3)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-[70px] h-[70px] rounded-[18px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <i className={`fa-solid ${icon} text-[26px] text-white`} />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white mb-1">{count}</h3>
          <p className="text-[#cfcfcf] text-sm">{label}</p>
        </div>
      </motion.div>
    </FadeContent>
  );
};

export default StatCard;
