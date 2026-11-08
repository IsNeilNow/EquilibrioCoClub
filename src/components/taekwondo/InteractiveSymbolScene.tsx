import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export type InteractiveSymbolKind = "cobra" | "rosa" | "taegeuk" | "cinturones";

type Props = {
  kind: InteractiveSymbolKind;
  label: string;
  priority?: number;
  onPrioritySelect?: (index: number) => void;
};

function createCobraCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, -1.45, 0),
    new THREE.Vector3(-0.55, -0.95, 0.02),
    new THREE.Vector3(-0.2, -0.48, 0.03),
    new THREE.Vector3(0.35, -0.12, 0.02),
    new THREE.Vector3(0.12, 0.32, 0.02),
    new THREE.Vector3(-0.22, 0.62, 0.03),
    new THREE.Vector3(0.02, 0.88, 0.03),
  ]);
}

function createCobraHoodShape() {
  const hood = new THREE.Shape();
  hood.moveTo(-0.95, -0.1);
  hood.quadraticCurveTo(-0.8, 0.85, 0, 1.1);
  hood.quadraticCurveTo(0.8, 0.85, 0.95, -0.1);
  hood.quadraticCurveTo(0.55, 0.25, 0, 0.32);
  hood.quadraticCurveTo(-0.55, 0.25, -0.95, -0.1);
  hood.closePath();
  return hood;
}

function AnimatedGroup({
  kind,
}: {
  kind: InteractiveSymbolKind;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.65) * 0.16;
    group.current.rotation.x = Math.cos(time * 0.45) * 0.05;
    group.current.position.y = Math.sin(time * 1.2) * 0.06;
  });

  if (kind === "taegeuk") {
    return (
      <group ref={group} rotation={[0.2, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[1.1, 0.14, 16, 64]} />
          <meshStandardMaterial color="#c84a3f" metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[1, 32, 20]} />
          <meshStandardMaterial color="#c84a3f" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[-0.5, 0, 0.08]} scale={[0.5, 1, 1]}>
          <sphereGeometry args={[1, 32, 20]} />
          <meshStandardMaterial color="#191b1d" roughness={0.65} />
        </mesh>
        <mesh position={[0.5, 0, 0.08]} scale={[0.5, 1, 1]}>
          <sphereGeometry args={[1, 32, 20]} />
          <meshStandardMaterial color="#c84a3f" roughness={0.4} />
        </mesh>
        <mesh position={[-0.5, 0.02, 0.2]}>
          <sphereGeometry args={[0.18, 20, 12]} />
          <meshStandardMaterial color="#c84a3f" />
        </mesh>
        <mesh position={[0.5, 0.02, 0.2]}>
          <sphereGeometry args={[0.18, 20, 12]} />
          <meshStandardMaterial color="#191b1d" />
        </mesh>
      </group>
    );
  }

  if (kind === "cinturones") {
    const colors = ["#eee8da", "#d9b84f", "#569669", "#263f92", "#b83232", "#17191b"];
    return (
      <group ref={group} rotation={[0.08, -0.3, -0.12]}>
        {colors.map((color, index) => (
          <mesh key={color} position={[0, (index - 2.5) * 0.34, 0]}>
            <boxGeometry args={[2.4 - index * 0.13, 0.22, 0.42]} />
            <meshStandardMaterial color={color} metalness={0.18} roughness={0.48} />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "rosa") {
    return (
      <group ref={group}>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.055, 0.08, 2.1, 10]} />
          <meshStandardMaterial color="#5c8b63" roughness={0.75} />
        </mesh>
        {[0, 1, 2, 3, 4].map((index) => {
          const angle = (index / 5) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * 0.4, 0.2 + Math.sin(angle) * 0.15, 0]}
              rotation={[0, 0, angle]}
              scale={[0.58, 0.34, 0.12]}
            >
              <sphereGeometry args={[0.72, 18, 12]} />
              <meshStandardMaterial color="#c84a3f" metalness={0.1} roughness={0.48} />
            </mesh>
          );
        })}
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[-0.19 + index * 0.22, -0.2, 0.08]} rotation={[0, 0, index % 2 ? 0.9 : -0.9]}>
            <coneGeometry args={[0.09, 0.4, 4]} />
            <meshStandardMaterial color="#b4a57e" />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group ref={group} position={[0, -0.25, 0]} scale={0.72} rotation={[0, -0.3, 0]}>
      <mesh>
        <tubeGeometry args={[createCobraCurve(), 48, 0.2, 12, false]} />
        <meshStandardMaterial color="#8f2f28" metalness={0.3} roughness={0.42} />
      </mesh>
      <mesh position={[0.02, 0.94, 0]} scale={[0.82, 0.98, 0.28]}>
        <sphereGeometry args={[0.82, 28, 20]} />
        <meshStandardMaterial color="#c74639" metalness={0.22} roughness={0.38} />
      </mesh>
      <mesh position={[0.02, 1.18, 0.34]}>
        <shapeGeometry args={[createCobraHoodShape()]} />
        <meshStandardMaterial
          color="#742522"
          metalness={0.18}
          roughness={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[-0.58, 1.2, 0.28]} rotation={[0, 0, -0.2]} scale={[0.42, 0.72, 0.18]}>
        <sphereGeometry args={[0.75, 20, 14]} />
        <meshStandardMaterial color="#8f2f28" metalness={0.2} roughness={0.46} />
      </mesh>
      <mesh position={[0.62, 1.2, 0.28]} rotation={[0, 0, 0.2]} scale={[0.42, 0.72, 0.18]}>
        <sphereGeometry args={[0.75, 20, 14]} />
        <meshStandardMaterial color="#8f2f28" metalness={0.2} roughness={0.46} />
      </mesh>
      <mesh position={[0.02, 1.02, 0.1]} scale={[0.58, 0.9, 0.12]}>
        <sphereGeometry args={[0.78, 24, 16]} />
        <meshStandardMaterial color="#de5a46" metalness={0.15} roughness={0.42} />
      </mesh>
      <mesh position={[0.03, 1.45, 0.02]} scale={[0.52, 0.42, 0.38]}>
        <sphereGeometry args={[0.72, 28, 20]} />
        <meshStandardMaterial color="#b83a30" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.22, 1.53, 0.34]}>
        <sphereGeometry args={[0.09, 16, 12]} />
        <meshStandardMaterial color="#e7c56e" emissive="#7d3029" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.28, 1.53, 0.34]}>
        <sphereGeometry args={[0.09, 16, 12]} />
        <meshStandardMaterial color="#e7c56e" emissive="#7d3029" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.22, 1.53, 0.41]}>
        <sphereGeometry args={[0.035, 12, 8]} />
        <meshStandardMaterial color="#120e0d" />
      </mesh>
      <mesh position={[0.28, 1.53, 0.41]}>
        <sphereGeometry args={[0.035, 12, 8]} />
        <meshStandardMaterial color="#120e0d" />
      </mesh>
      <mesh position={[-0.13, 1.27, 0.39]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.055, 0.28, 8]} />
        <meshStandardMaterial color="#f0e2c7" />
      </mesh>
      <mesh position={[0.16, 1.27, 0.39]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.055, 0.28, 8]} />
        <meshStandardMaterial color="#f0e2c7" />
      </mesh>
      <mesh position={[0.02, 1.19, 0.43]} scale={[0.55, 0.08, 0.04]}>
        <sphereGeometry args={[0.25, 16, 8]} />
        <meshStandardMaterial color="#5b1718" />
      </mesh>
    </group>
  );
}

function PriorityBlocks({
  active,
  onSelect,
}: {
  active: number;
  onSelect?: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const colors = ["#9c4938", "#b89054", "#657b75", "#79514a", "#c84a3f"];

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = -0.3 + Math.sin(time * 0.42) * 0.1;
    group.current.position.y = Math.sin(time * 1.15) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.08, -0.3, 0]}>
      {Array.from({ length: 5 }, (_, index) => {
        const level = index + 1;
        const width = 2.9 - index * 0.42;
        return (
          <mesh
            key={level}
            position={[0, (index - 2) * 0.42, 0]}
            scale={level === active ? [1.06, 1.12, 1.06] : [1, 1, 1]}
            rotation-z={level === active ? Math.sin(index + active) * 0.025 : 0}
            onClick={(event) => {
              event.stopPropagation();
              onSelect?.(index);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              event.object.scale.setScalar(level === active ? 1.1 : 1.04);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              event.object.scale.set(
                level === active ? 1.06 : 1,
                level === active ? 1.12 : 1,
                level === active ? 1.06 : 1,
              );
            }}
          >
            <boxGeometry args={[width, 0.3, 0.7]} />
            <meshStandardMaterial
              color={colors[index]}
              emissive={level === active ? colors[index] : "#000000"}
              emissiveIntensity={level === active ? 0.45 : 0}
              metalness={0.28}
              roughness={0.48}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function InteractiveSymbolScene({ kind, label, priority, onPrioritySelect }: Props) {
  const camera = priority
    ? { position: [0, 0.1, 6.2] as [number, number, number], fov: 42 }
    : { position: [0, 0.1, 4.7] as [number, number, number], fov: 34 };

  return (
    <div className="interactive-symbol-scene" aria-label={`${label}, modelo 3D interactivo`}>
      <Canvas camera={camera} dpr={[1, 1.5]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 4, 4]} intensity={3} color="#f3d9b7" />
        <pointLight position={[-3, 0, 2]} intensity={2} color="#b74439" />
        {priority ? (
          <PriorityBlocks active={priority} onSelect={onPrioritySelect} />
        ) : (
          <AnimatedGroup kind={kind} />
        )}
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
      <span className="interactive-symbol-scene__hint">Arrastra para explorar</span>
    </div>
  );
}
