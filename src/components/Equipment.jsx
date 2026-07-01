import React from 'react';
import { Billboard, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { colors } from '../theme.js';

function labelOffset(type, size) {
  if (type === 'skid') return [0, 0.9, 0];
  return [0, size[1] + 0.85, 0];
}

function parsePercent(value) {
  if (!value) return null;
  const match = String(value).match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return Math.max(0, Math.min(100, Number(match[1])));
}

function vesselFillColor(item, index = 0) {
  if (item.id === 'rich-tank') return colors.streams['rich-electrolyte'];
  if (item.id === 'raffinate-tank') return colors.streams.raffinate;
  if (item.id === 'water') return colors.streams['process-water'];
  if (item.id === 'reagents') return index === 0 ? colors.streams.organic : colors.streams.acid;
  if (item.type === 'pond') return colors.streams.pls;
  return '#5fb3ff';
}

function Tank({ size, color, level = 0, fillColor = '#5fb3ff' }) {
  const fillHeight = Math.max(0.04, size[1] * (level / 100));
  const fillY = fillHeight / 2 + 0.04;

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
        <cylinderGeometry args={[size[0] / 2, size[0] / 2, size[1], 48]} />
        <meshStandardMaterial color={color} metalness={0.35} roughness={0.42} transparent opacity={0.64} />
      </mesh>
      {level > 0 && (
        <mesh castShadow position={[0, fillY, 0]}>
          <cylinderGeometry args={[size[0] * 0.42, size[0] * 0.42, fillHeight, 48]} />
          <meshStandardMaterial color={fillColor} emissive={fillColor} emissiveIntensity={0.28} roughness={0.22} transparent opacity={0.88} />
        </mesh>
      )}
      <mesh position={[0, fillHeight + 0.08, 0]}>
        <cylinderGeometry args={[size[0] * 0.42, size[0] * 0.42, 0.025, 48]} />
        <meshStandardMaterial color={fillColor} emissive={fillColor} emissiveIntensity={0.45} roughness={0.18} transparent opacity={0.92} />
      </mesh>
      <mesh castShadow position={[0, size[1] + 0.05, 0]}>
        <cylinderGeometry args={[size[0] / 2, size[0] / 2, 0.1, 48]} />
        <meshStandardMaterial color="#d8dee6" metalness={0.45} roughness={0.32} />
      </mesh>
    </group>
  );
}

function TankFarm({ item, size, color }) {
  const levels = [
    parsePercent(item.parameters.organic) ?? parsePercent(item.parameters.level) ?? 70,
    parsePercent(item.parameters.diluent) ?? parsePercent(item.parameters.level) ?? 55,
  ];

  return (
    <group>
      {[-0.9, 0.9].map((x, index) => (
        <group key={x} position={[x, 0, 0]}>
          <Tank size={[size[0] * 0.38, size[1], size[2] * 0.38]} color={color} level={levels[index]} fillColor={vesselFillColor(item, index)} />
          <Html center distanceFactor={11} transform sprite zIndexRange={[170000, 110000]} position={[0, size[1] + 0.38, 0]}>
            <div className="level-badge">{levels[index]}%</div>
          </Html>
        </group>
      ))}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[size[0], 0.3, size[2]]} />
        <meshStandardMaterial color="#6b7280" roughness={0.65} />
      </mesh>
    </group>
  );
}

function mixerPhaseColors(item) {
  if (item.id === 'sx-extraction') return [colors.streams.pls, colors.streams.organic];
  if (item.id === 'scrubbing') return [colors.streams['process-water'], colors.streams.organic];
  if (item.id === 'stripping') return [colors.streams['spent-electrolyte'], colors.streams['rich-electrolyte']];
  return [colors.streams.pls, colors.streams.organic];
}

function MixerSettler({ item, size, color, running }) {
  const mixerRef = useRef();
  const phaseRef = useRef();
  const [phaseA, phaseB] = mixerPhaseColors(item);

  useFrame((state, delta) => {
    if (!running) return;
    if (mixerRef.current) {
      mixerRef.current.children.forEach((child, index) => {
        child.rotation.y += delta * (2.4 + index * 0.35);
      });
    }
    if (phaseRef.current) {
      phaseRef.current.position.x = Math.sin(state.clock.elapsedTime * 1.6) * 0.18;
      phaseRef.current.material.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 2.8) * 0.12;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={0.22} roughness={0.48} />
      </mesh>
      <mesh position={[0, size[1] + 0.12, 0]}>
        <boxGeometry args={[size[0] * 0.88, 0.04, size[2] * 0.56]} />
        <meshStandardMaterial color={phaseA} emissive={phaseA} emissiveIntensity={0.2} transparent opacity={0.72} roughness={0.2} />
      </mesh>
      <mesh ref={phaseRef} position={[0, size[1] + 0.18, 0.18]}>
        <boxGeometry args={[size[0] * 0.72, 0.035, size[2] * 0.22]} />
        <meshStandardMaterial color={phaseB} emissive={phaseB} emissiveIntensity={0.32} transparent opacity={0.78} roughness={0.2} />
      </mesh>
      <group ref={mixerRef}>
        {[-1.6, 0, 1.6].map((x) => (
          <group key={x} position={[x, size[1] + 0.2, -size[2] * 0.18]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.35, 0.35, 0.32, 32]} />
              <meshStandardMaterial color="#6f7b88" metalness={0.45} roughness={0.36} />
            </mesh>
            <mesh position={[0, -0.28, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.7, 12]} />
              <meshStandardMaterial color="#dbeafe" metalness={0.5} roughness={0.22} />
            </mesh>
            {[0, 1, 2].map((blade) => (
              <mesh key={blade} rotation={[0, (Math.PI * 2 * blade) / 3, 0]} position={[0.18, -0.62, 0]}>
                <boxGeometry args={[0.36, 0.035, 0.08]} />
                <meshStandardMaterial color={phaseB} emissive={phaseB} emissiveIntensity={running ? 0.5 : 0.12} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} position={[-size[0] * 0.36 + index * size[0] * 0.24, size[1] + 0.32, size[2] * 0.32]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={phaseB} emissive={phaseB} emissiveIntensity={running ? 1.1 : 0.2} transparent opacity={0.82} />
        </mesh>
      ))}
      <mesh position={[0, size[1] + 0.05, size[2] * 0.28]}>
        <boxGeometry args={[size[0] * 0.88, 0.12, 0.25]} />
        <meshStandardMaterial color="#eef2f7" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Heap({ size }) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-size[0] / 2, 0, -size[2] / 2),
      new THREE.Vector3(size[0] / 2, 0, -size[2] / 2),
      new THREE.Vector3(size[0] / 2, 0, size[2] / 2),
      new THREE.Vector3(-size[0] / 2, 0, size[2] / 2),
      new THREE.Vector3(0, size[1], 0),
    ];
    const faces = [0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4, 0, 3, 2, 0, 2, 1];
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    geom.setIndex(faces);
    geom.computeVertexNormals();
    return geom;
  }, [size]);

  return (
    <mesh castShadow receiveShadow geometry={geometry}>
      <meshStandardMaterial color="#8a806f" roughness={0.92} metalness={0.02} />
    </mesh>
  );
}

function Pond({ item, size }) {
  const level = parsePercent(item.parameters.level) ?? 70;
  const fillColor = vesselFillColor(item);

  return (
    <group>
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[size[0], 0.2, size[2]]} />
        <meshStandardMaterial color="#0d2438" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[size[0] * (0.5 + level / 260), 0.05, size[2] * (0.45 + level / 300)]} />
        <meshStandardMaterial color={fillColor} emissive={fillColor} emissiveIntensity={0.45} transparent opacity={0.82} roughness={0.18} />
      </mesh>
      <Html center distanceFactor={11} transform sprite zIndexRange={[170000, 110000]} position={[0, 0.75, 0]}>
        <div className="level-badge">{level}%</div>
      </Html>
    </group>
  );
}

function Pump({ size, color, running }) {
  const rotorRef = useRef();
  const pulseRef = useRef();

  useFrame((state, delta) => {
    if (!running) return;
    if (rotorRef.current) rotorRef.current.rotation.z += delta * 10;
    if (pulseRef.current) {
      pulseRef.current.material.emissiveIntensity = 0.18 + Math.sin(state.clock.elapsedTime * 5) * 0.08;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
        <boxGeometry args={[size[0], 0.32, size[2]]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <mesh ref={pulseRef} castShadow position={[-0.35, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 1.15, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} metalness={0.5} roughness={0.34} />
      </mesh>
      <group ref={rotorRef} position={[-0.35, 0.72, -0.62]}>
        {[0, 1, 2, 3].map((index) => (
          <mesh key={index} rotation={[0, 0, (Math.PI / 2) * index]} position={[0.16, 0, 0]}>
            <boxGeometry args={[0.32, 0.055, 0.055]} />
            <meshStandardMaterial color="#e5f2ff" emissive="#38bdf8" emissiveIntensity={0.45} metalness={0.35} roughness={0.24} />
          </mesh>
        ))}
      </group>
      <mesh castShadow position={[0.55, 0.72, 0]}>
        <boxGeometry args={[0.75, 0.85, 0.9]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.4} roughness={0.38} />
      </mesh>
      <mesh position={[0.05, 1.27, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.42, 0.015, 8, 44, Math.PI * 1.45]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={running ? 0.65 : 0.12} />
      </mesh>
    </group>
  );
}

function Cellhouse({ size, running }) {
  const cathodesRef = useRef();
  const electrolyteRef = useRef();
  useFrame((state) => {
    if (cathodesRef.current && running) {
      cathodesRef.current.children.forEach((plate, index) => {
        plate.material.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.08;
      });
    }
    if (electrolyteRef.current && running) {
      electrolyteRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 3.2) * 0.12;
      electrolyteRef.current.position.y = size[1] * 0.5 + 0.15 + Math.sin(state.clock.elapsedTime * 1.8) * 0.025;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#9aa5b1" metalness={0.25} roughness={0.45} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, size[1] + 0.12, 0]}>
        <boxGeometry args={[size[0] * 0.92, 0.15, size[2] * 0.92]} />
        <meshStandardMaterial color="#dce3ea" metalness={0.35} roughness={0.38} />
      </mesh>
      <mesh ref={electrolyteRef} position={[0, size[1] * 0.5 + 0.15, 0]}>
        <boxGeometry args={[size[0] * 0.82, 0.08, size[2] * 0.72]} />
        <meshStandardMaterial color={colors.streams['rich-electrolyte']} emissive={colors.streams['rich-electrolyte']} emissiveIntensity={0.22} transparent opacity={0.72} roughness={0.2} />
      </mesh>
      <group ref={cathodesRef} position={[0, 1.15, 0]}>
        {Array.from({ length: 10 }, (_, index) => (
          <mesh key={index} position={[-2.7 + index * 0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.09, 1.35, 3.65]} />
            <meshStandardMaterial color="#b87333" emissive="#ff7a1a" emissiveIntensity={0.3} metalness={0.62} roughness={0.28} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CathodeYard({ size, running }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current || !running) return;
    const count = Math.floor(4 + ((state.clock.elapsedTime * 0.45) % 16));
    group.current.children.forEach((child, index) => {
      child.visible = index < count;
    });
  });

  return (
    <group>
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[size[0], 0.16, size[2]]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <group ref={group}>
        {Array.from({ length: 20 }, (_, index) => {
          const col = index % 5;
          const row = Math.floor(index / 5);
          return (
            <mesh key={index} castShadow position={[-1.7 + col * 0.85, 0.38 + row * 0.12, -1.2 + row * 0.72]}>
              <boxGeometry args={[0.62, 0.68, 0.08]} />
              <meshStandardMaterial color="#b87333" metalness={0.75} roughness={0.24} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Equipment({ item, selected, alarmSeverity = 'normal', showLabel, running, onSelect }) {
  const color = colors.equipment[item.type] || '#a5adb8';
  const labelPosition = labelOffset(item.type, item.size);
  const alarmColor = colors.alarms[alarmSeverity];
  const level = parsePercent(item.parameters.level);

  const body = (() => {
    if (item.type === 'heap' || item.type === 'stockpile') return <Heap size={item.size} />;
    if (item.type === 'pond') return <Pond item={item} size={item.size} />;
    if (item.type === 'pump') return <Pump size={item.size} color={color} running={running} />;
    if (item.type === 'tank') return <Tank size={item.size} color={color} level={level ?? 0} fillColor={vesselFillColor(item)} />;
    if (item.type === 'tankfarm') return <TankFarm item={item} size={item.size} color={color} />;
    if (item.type === 'mixer-settler') return <MixerSettler item={item} size={item.size} color={color} running={running} />;
    if (item.type === 'cellhouse') return <Cellhouse size={item.size} running={running} />;
    if (item.type === 'cathode-yard') return <CathodeYard size={item.size} running={running} />;
    return (
      <mesh castShadow receiveShadow position={[0, item.size[1] / 2, 0]}>
        <boxGeometry args={item.size} />
        <meshStandardMaterial color={color} metalness={0.25} roughness={0.48} />
      </mesh>
    );
  })();

  return (
    <group position={item.position} onClick={(event) => { event.stopPropagation(); onSelect(item.id); }}>
      {body}
      {(selected || alarmSeverity !== 'normal') && (
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[item.size[0] + 0.45, 0.08, item.size[2] + 0.45]} />
          <meshStandardMaterial
            color={selected ? colors.alarms.normal : alarmColor}
            emissive={selected ? colors.alarms.normal : alarmColor}
            emissiveIntensity={alarmSeverity === 'critical' ? 1.7 : 1.1}
            transparent
            opacity={alarmSeverity === 'normal' ? 0.32 : 0.46}
          />
        </mesh>
      )}
      {showLabel && (
        <Billboard position={labelPosition} follow lockX={false} lockY={false} lockZ={false}>
          <Html center distanceFactor={13} transform sprite zIndexRange={[180000, 120000]}>
            <div className="equipment-chip">
              <b>{item.tag}</b>
              <span>{item.name}</span>
              {level !== null && <i>{level}%</i>}
            </div>
          </Html>
        </Billboard>
      )}
    </group>
  );
}

export default React.memo(Equipment);
