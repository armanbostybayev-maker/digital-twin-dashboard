import React, { memo } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const Arrow = memo(function Arrow({ position, direction, color, large = false }) {
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    return q;
  }, [direction]);

  return (
    <mesh position={position} quaternion={quat}>
      <coneGeometry args={large ? [0.28, 0.76, 28] : [0.16, 0.46, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={large ? 0.72 : 0.38} />
    </mesh>
  );
});

function FlowParticle({ curve, color, offset, running, speed, radius = 0.105 }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const elapsed = running ? state.clock.elapsedTime * speed : offset;
    const t = (elapsed + offset + delta * 0.02) % 1;
    const point = curve.getPointAt(t);
    ref.current.position.copy(point);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} toneMapped={false} />
    </mesh>
  );
}

function Pipeline({ pipeline, stream, running }) {
  const isCopperProductFlow = pipeline.streamId === 'pls' || pipeline.streamId === 'rich-electrolyte' || pipeline.product;
  const points = useMemo(() => pipeline.points.map((point) => new THREE.Vector3(...point)), [pipeline.points]);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.18), [points]);
  const sampled = useMemo(() => curve.getPoints(80), [curve]);
  const arrows = useMemo(() => {
    const arrowData = [];
    const count = Math.max(1, Math.floor(curve.getLength() / (isCopperProductFlow ? 4.4 : 7)));
    for (let index = 1; index <= count; index += 1) {
      const t = index / (count + 1);
      arrowData.push({
        position: curve.getPointAt(t),
        direction: curve.getTangentAt(t),
      });
    }
    return arrowData;
  }, [curve, isCopperProductFlow]);
  const radius = isCopperProductFlow ? 0.16 : 0.08;
  const lineWidth = isCopperProductFlow ? 7 : 3.5;
  const particleRadius = isCopperProductFlow ? 0.15 : 0.105;
  const speed = pipeline.product ? 0.06 : 0.035 + Math.min(pipeline.flow || 100, 300) / 9000;
  const particles = useMemo(() => Array.from({ length: isCopperProductFlow ? 10 : 8 }, (_, index) => ({
    key: `${pipeline.id}-particle-${index}`,
    offset: index / (isCopperProductFlow ? 10 : 8),
  })), [pipeline.id, isCopperProductFlow]);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 96, radius, 18, false]} />
        <meshStandardMaterial color={stream.color} emissive={stream.color} emissiveIntensity={isCopperProductFlow ? 0.22 : 0.08} metalness={0.55} roughness={0.26} />
      </mesh>
      <Line points={sampled} color="#f8fafc" lineWidth={lineWidth * 0.25} transparent opacity={0.28} />
      <Line points={sampled} color={stream.color} lineWidth={lineWidth} transparent opacity={0.64} />
      {arrows.map((arrow, index) => (
        <Arrow key={`${pipeline.id}-arrow-${index}`} color={stream.color} position={arrow.position} direction={arrow.direction} large={isCopperProductFlow} />
      ))}
      {particles.map((particle) => (
        <FlowParticle
          key={particle.key}
          curve={curve}
          color={stream.color}
          running={running}
          speed={speed}
          offset={particle.offset}
          radius={particleRadius}
        />
      ))}
    </group>
  );
}

export default memo(Pipeline);
