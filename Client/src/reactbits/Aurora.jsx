import { useEffect, useRef } from "react";

const Aurora = ({
  className = "",
  color1 = "#ff3e00",
  color2 = "#6a00ff",
  color3 = "#ff7b00",
  speed = 0.5,
  opacity = 0.3,
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, ${color1}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, ${color2}${Math.round(opacity * 0.7 * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, ${color3}${Math.round(opacity * 0.5 * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)
          `,
          animation: `auroraMove ${20 / speed}s ease-in-out infinite alternate`,
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 20%, ${color2}${Math.round(opacity * 0.5 * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
            radial-gradient(ellipse at 30% 80%, ${color1}${Math.round(opacity * 0.4 * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)
          `,
          animation: `auroraMove2 ${15 / speed}s ease-in-out infinite alternate`,
          filter: "blur(80px)",
        }}
      />
      <style>{`
        @keyframes auroraMove {
          0% { transform: translate(-5%, -5%) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
          100% { transform: translate(-5%, 5%) scale(1); }
        }
        @keyframes auroraMove2 {
          0% { transform: translate(5%, -5%) scale(1.1); }
          50% { transform: translate(-5%, -5%) scale(1); }
          100% { transform: translate(5%, 5%) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Aurora;
