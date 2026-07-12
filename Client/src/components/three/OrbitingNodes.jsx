import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiDocker,
} from "react-icons/si";

const nodeData = [
  { label: "HTML", icon: SiHtml5, color: "#e34f26", radius: 3.0, speed: 0.40, tilt: 0.2 },
  { label: "CSS", icon: SiCss, color: "#1572b6", radius: 3.4, speed: 0.35, tilt: -0.3 },
  { label: "JavaScript", icon: SiJavascript, color: "#f7df1e", radius: 3.8, speed: 0.30, tilt: 0.5 },
  { label: "React", icon: SiReact, color: "#61dafb", radius: 4.1, speed: 0.25, tilt: -0.1 },
  { label: "PostgreSQL", icon: SiPostgresql, color: "#4169e1", radius: 3.2, speed: 0.45, tilt: 0.4 },
  { label: "SQL", icon: SiMysql, color: "#4479a1", radius: 3.6, speed: 0.28, tilt: -0.5 },
  { label: "Node.js", icon: SiNodedotjs, color: "#339933", radius: 4.0, speed: 0.32, tilt: 0.3 },
  { label: "Express", icon: SiExpress, color: "#ffffff", radius: 3.5, speed: 0.38, tilt: -0.2 },
  { label: "Docker", icon: SiDocker, color: "#2496ed", radius: 3.9, speed: 0.22, tilt: 0.6 },
];

function Node({ label, icon: Icon, color, radius, speed, tilt, index }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + index * (Math.PI * 2) / nodeData.length;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7 + index) * tilt * 2;
    }
  });

  return (
    <group ref={ref}>
      <Html
        center
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <div
            style={{
              filter: `drop-shadow(0 0 8px ${color}60)`,
              opacity: 0.9,
              lineHeight: 0,
            }}
          >
            <Icon size={22} color={color} />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              color: color,
              whiteSpace: "nowrap",
              letterSpacing: "0.03em",
              opacity: 0.75,
            }}
          >
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
}

export default function OrbitingNodes() {
  return (
    <group>
      {nodeData.map((node, i) => (
        <Node key={node.label} {...node} index={i} />
      ))}
    </group>
  );
}
