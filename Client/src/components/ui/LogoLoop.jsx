import { useState, useRef, useEffect, useMemo } from "react";

export default function LogoLoop({
  logos = [],
  speed = 100,
  direction = "left",
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#ffffff",
}) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const uniqueId = useMemo(
    () => `logo-loop-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  const duplicated = useMemo(() => [...logos, ...logos, ...logos], [logos]);

  const duration = logos.length > 0 ? (logos.length * (logoHeight + gap)) / speed : 20;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        maskImage: fadeOut
          ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
          : undefined,
        WebkitMaskImage: fadeOut
          ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
          : undefined,
      }}
    >
      <style>{`
        @keyframes ${uniqueId}-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes ${uniqueId}-scroll-reverse {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div
        className="flex items-center w-max"
        style={{
          gap: `${gap}px`,
          animation: `${uniqueId}-scroll${direction === "right" ? "-reverse" : ""} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicated.map((logo, i) => (
          <LogoItem
            key={`${logo.label}-${i}`}
            logo={logo}
            height={logoHeight}
            scaleOnHover={scaleOnHover}
            isPaused={isPaused}
          />
        ))}
      </div>
    </div>
  );
}

function LogoItem({ logo, height, scaleOnHover, isPaused }) {
  const Icon = logo.icon;
  return (
    <div
      className="flex flex-col items-center gap-2 shrink-0 transition-transform duration-300"
      style={{
        transform: scaleOnHover && isPaused ? "scale(1.1)" : "scale(1)",
        minWidth: `${height}px`,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: `${height}px`, height: `${height}px` }}
      >
        <Icon
          size={height * 0.65}
          className="text-text-secondary/70 hover:text-primary-400 transition-colors duration-300"
        />
      </div>
      <span className="text-[11px] font-medium text-text-muted tracking-wide whitespace-nowrap">
        {logo.label}
      </span>
    </div>
  );
}
