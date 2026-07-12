import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import CyberSphere from "./CyberSphere";
import OrbitingNodes from "./OrbitingNodes";
import Particles3D from "./Particles3D";
import useStore from "../../store/useStore";
import useReducedMotion from "../../hooks/useReducedMotion";

function CameraRig() {
  const reducedMotion = useReducedMotion();
  const mousePosition = useStore((s) => s.mousePosition);

  useFrame((state) => {
    if (reducedMotion) return;
    const targetX = mousePosition.x * 1.2;
    const targetY = mousePosition.y * 0.6;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY + 0.5 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00c9e0" distance={20} />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#8b5cf6" distance={15} />
      <pointLight position={[0, -5, -5]} intensity={0.3} color="#ffffff" distance={15} />
    </>
  );
}

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette offset={0.5} darkness={0.5} />
    </EffectComposer>
  );
}

function FallbackLoader() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshBasicMaterial color="#00c9e0" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function HeroScene({ className = "" }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <CameraRig />
        <Lights />
        <Suspense fallback={<FallbackLoader />}>
          <CyberSphere />
          <OrbitingNodes />
          <Particles3D count={150} />
        </Suspense>
        <PostProcessing />
      </Canvas>
    </div>
  );
}
