const SplineBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-0">
      <spline-viewer
        url="https://prod.spline.design/Yb8aa8S2EOCjMpz8/scene.splinecode"
        className="w-full h-full"
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
};

export default SplineBackground;
