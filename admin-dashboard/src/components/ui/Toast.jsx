import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500/20 border-green-500/30" : "bg-red-500/20 border-red-500/30";
  const textColor = type === "success" ? "text-green-400" : "text-red-400";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl border ${bgColor} backdrop-blur-xl z-[1000]`}
        >
          <p className={`font-semibold text-sm ${textColor}`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
