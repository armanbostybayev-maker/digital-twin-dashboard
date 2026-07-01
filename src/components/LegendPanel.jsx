import React, { memo } from 'react';
import { processStreams } from '../data/index.js';
import { cameraPresets } from './CameraController.jsx';

const cameraViews = [
  { id: 'overview', label: 'Завод' },
  { id: 'heap', label: 'Куча' },
  { id: 'sx', label: 'SX-блок' },
  { id: 'ew', label: 'EW-цех' },
  { id: 'cathodes', label: 'Катоды' },
];

function LegendPanel({ cameraTarget, onSetCamera, onScreenshot }) {
  return (
    <aside className="legend-panel">
      <div className="legend-title">Потоки</div>
      {processStreams.map((stream) => (
        <div className="legend-row" key={stream.id}>
          <span className="legend-swatch" style={{ backgroundColor: stream.color }} />
          <span>{stream.name}</span>
        </div>
      ))}
      <div className="view-strip" aria-label="Предустановленные виды камеры">
        {cameraViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onSetCamera({ id: view.id, ...cameraPresets[view.id] })}
            className={cameraTarget?.id === view.id ? 'active' : ''}
          >
            {view.label}
          </button>
        ))}
        <button onClick={onScreenshot}>PNG</button>
      </div>
    </aside>
  );
}

export default memo(LegendPanel);
