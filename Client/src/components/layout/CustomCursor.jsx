import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

    const tracked = new WeakSet();

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (!visible) setVisible(true);
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.25;
      pos.current.y += (target.current.y - pos.current.y) * 0.25;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        if (!tracked.has(el)) {
          tracked.add(el);
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [reducedMotion, visible]);

  if (reducedMotion || typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-500/40"
        style={{
          width: hovering ? 56 : 40,
          height: hovering ? 56 : 40,
          background: hovering ? "rgba(0,201,224,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s, opacity 0.3s",
        }}
      />
    </div>
  );
}
