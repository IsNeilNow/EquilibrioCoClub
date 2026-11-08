import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OrbitingMark() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.rotation.x = time * 0.08;
    ref.current.rotation.y = time * 0.12;
    ref.current.position.y = Math.sin(time * 0.5) * 0.12;
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[1.3, 0.018, 8, 64]} />
        <meshBasicMaterial color="#b84a3e" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.012, 8, 48]} />
        <meshBasicMaterial color="#c6a678" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshBasicMaterial color="#d35a4c" />
      </mesh>
    </group>
  );
}

export function RouteAmbient3D() {
  return (
    <div className="route-ambient-3d" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 36 }} dpr={[1, 1.25]}>
        <OrbitingMark />
      </Canvas>
    </div>
  );
}
