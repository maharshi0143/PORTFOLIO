import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CyberSphere() {
  const solidRef = useRef();
  const wireRef = useRef();

  const pulseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00c9e0"),
        transparent: true,
        opacity: 0.08,
        emissive: new THREE.Color("#00c9e0"),
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.1,
      }),
    []
  );

  const wireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00c9e0"),
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (solidRef.current) {
      solidRef.current.rotation.y = t * 0.08;
      solidRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
      const s = 1 + Math.sin(t * 0.8) * 0.02;
      solidRef.current.scale.set(s, s, s);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.06;
      wireRef.current.rotation.z = Math.cos(t * 0.04) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={solidRef} material={pulseMaterial}>
        <icosahedronGeometry args={[1.5, 2]} />
      </mesh>
      <mesh ref={wireRef} material={wireMaterial}>
        <icosahedronGeometry args={[1.52, 2]} />
      </mesh>
    </group>
  );
}
