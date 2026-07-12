import { useEffect, useCallback } from "react";
import useStore from "../store/useStore";

export default function useMousePosition() {
  const setMousePosition = useStore((s) => s.setMousePosition);

  const handleMouseMove = useCallback(
    (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    },
    [setMousePosition]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
}
