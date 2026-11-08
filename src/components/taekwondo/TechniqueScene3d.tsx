import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group, Object3D } from "three";
import { useTechniqueRig } from "@/hooks/useTechniqueRig";
import { useSceneColors } from "@/hooks/useSceneColors";
import { DojangProp } from "@/components/taekwondo/DojangProps";
import { CountBadge } from "@/components/taekwondo/CountBadge";
function Limb({
  length,
  radius,
  color,
}: {
  length: number;
  radius: number;
  color: string;
}) {
  return (
    <mesh position={[0, -length / 2, 0]} castShadow>
      <capsuleGeometry args={[radius, length - radius * 2, 5, 8]} />
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}

function Joint({ color, radius = 0.13 }: { color: string; radius?: number }) {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius, 12, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.14}
        roughness={0.4}
      />
    </mesh>
  );
}

function Arm({
  side,
  upperRef,
  lowerRef,
  color,
  jointColor,
  children,
}: {
  children?: React.ReactNode;
  side: -1 | 1;
  upperRef: React.RefObject<Group | null>;
  lowerRef: React.RefObject<Group | null>;
  color: string;
  jointColor: string;
}) {
  return (
    <group position={[side * 0.48, 2.55, 0]} ref={upperRef}>
      <Joint color={jointColor} />
      <Limb length={0.72} radius={0.1} color={color} />
      <group position={[0, -0.72, 0]} ref={lowerRef}>
        <Joint color={jointColor} radius={0.11} />
        <Limb length={0.68} radius={0.085} color={color} />
        <group position={[0, -0.72, 0]}>
          <Joint color={jointColor} radius={0.12} />
          {children}
        </group>
      </group>
    </group>
  );
}

function Leg({
  side,
  upperRef,
  lowerRef,
  footRef,
  color,
  jointColor,
}: {
  side: -1 | 1;
  upperRef: React.RefObject<Group | null>;
  lowerRef: React.RefObject<Group | null>;
  footRef: React.RefObject<Group | null>;
  color: string;
  jointColor: string;
}) {
  return (
    <group position={[side * 0.25, 1.25, 0]} ref={upperRef}>
      <Joint color={jointColor} radius={0.15} />
      <Limb length={0.9} radius={0.14} color={color} />
      <group position={[0, -0.9, 0]} ref={lowerRef}>
        <Joint color={jointColor} radius={0.14} />
        <Limb length={0.85} radius={0.12} color={color} />
        <mesh position={[0, -0.86, 0.13]} castShadow>
          <boxGeometry args={[0.24, 0.16, 0.46]} />
          <meshStandardMaterial color={color} roughness={0.65} />
        </mesh>
        <group ref={footRef} position={[0, -0.94, 0.13]} />
      </group>
    </group>
  );
}

function Mannequin({
  technique,
  color,
  jointColor,
}: {
  technique: string;
  color: string;
  jointColor: string;
}) {
  const root = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const leftFore = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const rightFore = useRef<Group>(null);
  const leftLeg = useRef<Group>(null);
  const leftShin = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);
  const rightShin = useRef<Group>(null);
  const leftFoot = useRef<Group>(null);
  const rightFoot = useRef<Group>(null);
  useTechniqueRig(technique, () => ({
    root: root as React.RefObject<Object3D | null>,
    joints: {
      leftArm: leftArm.current,
      leftForearm: leftFore.current,
      rightArm: rightArm.current,
      rightForearm: rightFore.current,
      leftLeg: leftLeg.current,
      leftShin: leftShin.current,
      rightLeg: rightLeg.current,
      rightShin: rightShin.current,
    },
    feet: [leftFoot.current, rightFoot.current],
    liftScale: 1,
  }));
  const beltColor = technique === "kwanjangnim" ? "#d4a017" : "#0b0b0d";
  return (
    <group ref={root} position={[0, 0, 0]}>
      <mesh position={[0, 3.25, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 12]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      <mesh position={[0, 2.15, 0]} castShadow>
        <capsuleGeometry args={[0.3, 1.25, 6, 10]} />
        <meshStandardMaterial color={color} roughness={0.68} />
      </mesh>
      {/* dobok belt: band, knot and two tails, always visible on the front */}
      <group position={[0, 1.5, 0]}>
        <mesh rotation-x={Math.PI / 2} castShadow>
          <torusGeometry args={[0.33, 0.065, 10, 28]} />
          <meshStandardMaterial color={beltColor} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.36]} castShadow>
          <sphereGeometry args={[0.09, 12, 8]} />
          <meshStandardMaterial color={beltColor} roughness={0.45} />
        </mesh>
        <mesh
          position={[-0.08, -0.22, 0.38]}
          rotation={[0.15, 0, 0.22]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.4, 0.035]} />
          <meshStandardMaterial color={beltColor} roughness={0.45} />
        </mesh>
        <mesh
          position={[0.08, -0.22, 0.38]}
          rotation={[0.15, 0, -0.22]}
          castShadow
        >
          <boxGeometry args={[0.09, 0.4, 0.035]} />
          <meshStandardMaterial color={beltColor} roughness={0.45} />
        </mesh>
      </group>
      <Arm
        side={1}
        upperRef={leftArm}
        lowerRef={leftFore}
        color={color}
        jointColor={jointColor}
      />
      <Arm
        side={-1}
        upperRef={rightArm}
        lowerRef={rightFore}
        color={color}
        jointColor={jointColor}
      >
        <CountBadge technique={technique} />
      </Arm>
      <Leg
        side={1}
        upperRef={leftLeg}
        lowerRef={leftShin}
        footRef={leftFoot}
        color={color}
        jointColor={jointColor}
      />
      <Leg
        side={-1}
        upperRef={rightLeg}
        lowerRef={rightShin}
        footRef={rightFoot}
        color={color}
        jointColor={jointColor}
      />
    </group>
  );
}

function Scene({
  technique,
  compact,
}: {
  technique: string;
  compact: boolean;
}) {
  const colors = useSceneColors();
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={compact ? 512 : 1024}
        shadow-mapSize-height={compact ? 512 : 1024}
      />
      <Environment>
        <Lightformer intensity={1.8} position={[-4, 5, 3]} scale={[6, 6, 1]} />
      </Environment>
      <Mannequin
        technique={technique}
        color={colors.primary}
        jointColor={colors.foreground}
      />
      <DojangProp technique={technique} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.72, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <OrbitControls
        enablePan={false}
        enableZoom={!compact}
        minPolarAngle={0.65}
        maxPolarAngle={1.55}
        target={[0, 0.8, 0]}
      />
    </>
  );
}

export function TechniqueScene3D({
  technique,
  compact,
}: {
  technique: string;
  compact: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(!compact);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    const node = host.current;
    if (!node || !compact) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "180px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [compact]);
  return (
    <div
      ref={host}
      className="absolute inset-0 technique-canvas"
      aria-hidden="true"
    >
      {mounted && visible && (
        <Canvas
          dpr={compact ? 1 : [1, 1.5]}
          shadows
          camera={{
            position: compact ? [4.8, 3.2, 6.6] : [5.2, 3.5, 7.2],
            fov: compact ? 44 : 39,
          }}
          gl={{ antialias: !compact, alpha: true }}
        >
          <Scene technique={technique} compact={compact} />
        </Canvas>
      )}
      <span className="axis-label axis-label--x">X</span>
      <span className="axis-label axis-label--y">Y</span>
      <span className="axis-label axis-label--z">Z</span>
    </div>
  );
}
