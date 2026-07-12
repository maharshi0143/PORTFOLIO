const ShinyText = ({
  children,
  className = "",
  color = "#ff3e00",
  speed = 3,
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: `linear-gradient(90deg, ${color} 0%, ${color} 40%, #fff 50%, ${color} 60%, ${color} 100%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: `shinySweep ${speed}s ease-in-out infinite`,
      }}
    >
      {children}
      <style>{`
        @keyframes shinySweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;
