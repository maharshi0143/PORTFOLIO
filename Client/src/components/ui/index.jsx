import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.4, ease },
            }
          : undefined
      }
      className={`relative rounded-xl bg-glass-medium border border-glass-border backdrop-blur-xl p-6 transition-[border-color,box-shadow] duration-300 hover:border-glass-border-h hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      viewport={{ once: true, margin: "-80px" }}
      className={`text-center mb-12 ${className}`}
    >
      <p className="text-xs font-medium tracking-[0.05em] uppercase text-primary-500 mb-3 font-body">
        {label}
      </p>
      <h2 className="text-3xl md:text-[40px] lg:text-[52px] font-heading font-bold text-text-primary tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-text-secondary max-w-[600px] mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function TechBadge({ label, className = "", delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease }}
      viewport={{ once: true }}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-300 border border-primary-500/20 ${className}`}
    >
      {label}
    </motion.span>
  );
}

export function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

export const PrimaryButton = forwardRef(function PrimaryButton(
  { children, className = "", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease }}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] font-semibold text-sm tracking-[0.02em] text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-[0_2px_12px_rgba(0,201,224,0.25)] hover:shadow-[0_4px_24px_rgba(0,201,224,0.35)] hover:from-primary-400 hover:to-primary-500 transition-[box-shadow] duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease }}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] font-semibold text-sm tracking-[0.02em] text-text-primary bg-glass-light border border-glass-border hover:bg-glass-medium hover:border-glass-border-h transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedCounter({ target, suffix = "", duration = 2000, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const targetNum = typeof target === "number" ? target : parseInt(target, 10);
    if (isNaN(targetNum)) {
      setValue(target);
      return;
    }

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * targetNum));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className={`tabular-nums ${className}`}
    >
      {value}{suffix}
    </motion.span>
  );
}
