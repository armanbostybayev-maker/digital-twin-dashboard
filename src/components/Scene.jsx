import React, { memo, useMemo } from 'react';
import { Environment, Grid, Sky } from '@react-three/drei';
import Equipment from './Equipment.jsx';
import InstrumentTag from './InstrumentTag.jsx';
import Pipeline from './Pipeline.jsx';
import { equipment, instruments, pipelines, processStreams } from '../data/index.js';
import { colors } from '../theme.js';

const roads = [
  { position: [4, 0.02, -12.2], size: [50, 0.03, 1.15] },
  { position: [24.5, 0.03, 4.8], size: [12, 0.03, 1.15] },
  { position: [-7, 0.03, 1.8], size: [25, 0.03, 0.9] },
];

const Ground = memo(function Ground() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[4, -0.02, -2.5]}>
        <planeGeometry args={[58, 32]} />
        <meshStandardMaterial color={colors.ground} roughness={0.82} metalness={0.05} />
      </mesh>
      <Grid
        position={[4, 0.01, -2.5]}
        args={[58, 32]}
        cellSize={1}
        sectionSize={5}
        cellColor="#34414d"
        sectionColor="#506070"
        fadeDistance={55}
        fadeStrength={1.4}
      />
    </group>
  );
});

const Roadways = memo(function Roadways() {
  return (
    <group>
      {roads.map((road, index) => (
        <mesh key={index} receiveShadow position={road.position}>
          <boxGeometry args={road.size} />
          <meshStandardMaterial color="#303841" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
});

function Scene({
  running,
  showSensors,
  showLabels,
  selectedEquipment,
  selectedInstrument,
  telemetry,
  alarmSeverityByEquipment,
  onSelectEquipment,
  onSelectInstrument,
  onClearSelection,
}) {
  const streamById = useMemo(() => Object.fromEntries(processStreams.map((stream) => [stream.id, stream])), []);
  const equipmentById = useMemo(() => Object.fromEntries(equipment.map((item) => [item.id, item])), []);
  const instrumentPlacements = useMemo(() => {
    const counters = {};
    return Object.fromEntries(instruments.map((instrument) => {
      const item = equipmentById[instrument.equipmentId];
      if (!item) return [instrument.id, { anchor: instrument.position, label: instrument.position }];
      const index = counters[item.id] || 0;
      counters[item.id] = index + 1;
      const side = index % 2 === 0 ? 1 : -1;
      const row = Math.floor(index / 2);
      const isPipeInstrument = ['FT', 'PT', 'CV', 'XV'].includes(instrument.type);
      const anchor = [
        item.position[0] + side * (item.size[0] / 2 + (isPipeInstrument ? 0.2 : 0.08)),
        item.position[1] + (isPipeInstrument ? 0.85 : Math.max(0.72, item.size[1] * 0.78)),
        item.position[2] - item.size[2] / 2 + 0.35 + row * 0.38,
      ];
      const label = [
        anchor[0] + side * (0.75 + row * 0.16),
        anchor[1] + 1.05 + row * 0.5,
        anchor[2] + 0.34 + row * 0.42,
      ];
      return [instrument.id, { anchor, label }];
    }));
  }, [equipmentById]);

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.background, 38, 78]} />
      <Sky sunPosition={[20, 10, 14]} turbidity={2.6} rayleigh={0.35} mieCoefficient={0.018} mieDirectionalG={0.72} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[12, 20, 8]} intensity={2.15} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-35} shadow-camera-right={35} shadow-camera-top={25} shadow-camera-bottom={-25} />
      <pointLight position={[7, 7, -2]} intensity={28} color="#8ec5ff" distance={24} />
      <pointLight position={[20, 6, 0]} intensity={20} color="#ffb36b" distance={18} />
      <Environment preset="city" />

      <Ground />
      <Roadways />

      <group onPointerMissed={onClearSelection}>
        {pipelines.map((pipeline) => (
          <Pipeline key={pipeline.id} pipeline={pipeline} stream={streamById[pipeline.streamId]} running={running} />
        ))}
        {equipment.map((item) => (
          <Equipment
            key={item.id}
            item={item}
            running={running}
            selected={selectedEquipment === item.id}
            alarmSeverity={alarmSeverityByEquipment[item.id] || 'normal'}
            showLabel={showLabels}
            onSelect={onSelectEquipment}
          />
        ))}
        {showSensors && instruments.map((instrument) => (
          <InstrumentTag
            key={instrument.id}
            instrument={instrument}
            anchorPosition={instrumentPlacements[instrument.id]?.anchor}
            labelPosition={instrumentPlacements[instrument.id]?.label}
            value={telemetry.instruments[instrument.id] ?? instrument.value}
            selected={selectedInstrument === instrument.id}
            alarmSeverity={alarmSeverityByEquipment[instrument.equipmentId] || 'normal'}
            onSelect={onSelectInstrument}
          />
        ))}
      </group>
    </>
  );
}

export default memo(Scene);
