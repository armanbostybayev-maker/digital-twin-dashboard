import React, { memo } from 'react';
import { Html, Line } from '@react-three/drei';
import { colors } from '../theme.js';

function displayStatus(status, severity) {
  if (severity === 'critical') return 'КРИТ';
  if (severity === 'warning') return 'ПРЕД';
  if (status === 'AUTO') return 'АВТО';
  if (status === 'OPEN') return 'ОТКР';
  if (status === 'OK') return 'НОРМА';
  return status;
}

function displayValue(instrument, value) {
  if (instrument.type === 'XV') return value === 1 || value === 'OPEN' ? 'ОТКР' : value;
  return `${value} ${instrument.unit}`;
}

function InstrumentTag({
  instrument,
  anchorPosition = instrument.position,
  labelPosition,
  value,
  selected,
  alarmSeverity = 'normal',
  onSelect,
}) {
  const severityColor = selected ? colors.alarms.normal : colors.alarms[alarmSeverity];
  const labelOffset = labelPosition
    ? [
        labelPosition[0] - anchorPosition[0],
        labelPosition[1] - anchorPosition[1],
        labelPosition[2] - anchorPosition[2],
      ]
    : [0, selected ? 1.12 : 0.95, 0];

  return (
    <group position={anchorPosition} scale={selected ? 1.16 : 1}>
      <mesh onClick={(event) => { event.stopPropagation(); onSelect(instrument.id); }}>
        <sphereGeometry args={[0.12, 18, 18]} />
        <meshStandardMaterial
          color={selected ? '#ffffff' : '#0ea5e9'}
          emissive={severityColor}
          emissiveIntensity={selected || alarmSeverity !== 'normal' ? 1.6 : 0.35}
        />
      </mesh>
      <Line points={[[0, 0, 0], labelOffset]} color={severityColor} lineWidth={1.6} transparent opacity={0.82} />
      <mesh position={[labelOffset[0] * 0.16, labelOffset[1] * 0.16, labelOffset[2] * 0.16]}>
        <coneGeometry args={[0.055, 0.16, 18]} />
        <meshStandardMaterial color={severityColor} emissive={severityColor} emissiveIntensity={0.5} />
      </mesh>
      <Html center distanceFactor={9} transform sprite zIndexRange={[220000, 190000]} position={labelOffset}>
        <button
          className={`instrument-tag ${selected ? 'selected' : ''} ${alarmSeverity}`}
          onClick={(event) => { event.stopPropagation(); onSelect(instrument.id); }}
        >
          <b>{instrument.tag}</b>
          <span>{displayValue(instrument, value)}</span>
          <i>{displayStatus(instrument.status, alarmSeverity)}</i>
        </button>
      </Html>
    </group>
  );
}

export default memo(InstrumentTag);
