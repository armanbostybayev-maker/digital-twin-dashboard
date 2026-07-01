import React, { memo, useMemo } from 'react';
import { equipment, instruments } from '../data/index.js';

function InfoCard({ selectedEquipment, selectedInstrument, telemetry }) {
  const selectedInfo = useMemo(() => {
    if (selectedEquipment) return equipment.find((item) => item.id === selectedEquipment);
    if (selectedInstrument) return instruments.find((item) => item.id === selectedInstrument);
    return null;
  }, [selectedEquipment, selectedInstrument]);

  if (!selectedInfo) return null;

  if (selectedInstrument) {
    const liveValue = telemetry.instruments[selectedInfo.id] ?? selectedInfo.value;
    return (
      <section className="info-card">
        <h2>{selectedInfo.tag}</h2>
        <p>{selectedInfo.type} · {selectedInfo.status}</p>
        <dl>
          <dt>Значение</dt>
          <dd>{liveValue} {selectedInfo.type === 'XV' ? '' : selectedInfo.unit}</dd>
          <dt>Объект</dt>
          <dd>{equipment.find((item) => item.id === selectedInfo.equipmentId)?.name}</dd>
        </dl>
      </section>
    );
  }

  return (
    <section className="info-card">
      <h2>{selectedInfo.name}</h2>
      <p>{selectedInfo.tag} · {selectedInfo.purpose}</p>
      <dl>
        <dt>Входы</dt>
        <dd>{selectedInfo.inputs.join(', ')}</dd>
        <dt>Выходы</dt>
        <dd>{selectedInfo.outputs.join(', ')}</dd>
        <dt>КИПиА</dt>
        <dd>{instruments.filter((instrument) => instrument.equipmentId === selectedInfo.id).map((instrument) => instrument.tag).join(', ') || 'Нет'}</dd>
        <dt>Параметры</dt>
        <dd>{Object.entries(selectedInfo.parameters).map(([key, value]) => `${key}: ${value}`).join(' · ')}</dd>
      </dl>
    </section>
  );
}

export default memo(InfoCard);
