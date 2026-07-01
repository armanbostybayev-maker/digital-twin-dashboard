import React, { useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './components/CameraController.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import EquipmentSearch from './components/EquipmentSearch.jsx';
import InfoCard from './components/InfoCard.jsx';
import LegendPanel from './components/LegendPanel.jsx';
import Scene from './components/Scene.jsx';
import StatusPanel from './components/StatusPanel.jsx';
import { createDemoTelemetrySource } from './services/telemetryService.js';
import { usePlantStore } from './store/usePlantStore.js';

export default function App() {
  const {
    running,
    selectedEquipment,
    selectedInstrument,
    telemetry,
    filters,
    alarms,
    cameraTarget,
    shotRequest,
    toggleRunning,
    toggleSensors,
    toggleLabels,
    setSearch,
    selectEquipment,
    selectInstrument,
    clearSelection,
    setCameraTarget,
    resetCamera,
    requestScreenshot,
    ingestTelemetry,
  } = usePlantStore();

  useEffect(() => {
    if (!running) return undefined;
    const source = createDemoTelemetrySource({ intervalMs: 1000 });
    source.start(ingestTelemetry);
    return () => source.stop();
  }, [ingestTelemetry, running]);

  const alarmSeverityByEquipment = useMemo(() => {
    const priority = { normal: 0, warning: 1, critical: 2 };
    return alarms.reduce((acc, alarm) => {
      if (alarm.sourceType !== 'equipment') return acc;
      const current = acc[alarm.sourceId] || 'normal';
      acc[alarm.sourceId] = priority[alarm.severity] > priority[current] ? alarm.severity : current;
      return acc;
    }, {});
  }, [alarms]);

  return (
    <main className="app-shell">
      <Canvas
        className="plant-canvas"
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        camera={{ position: [24, 19, 24], fov: 45, near: 0.1, far: 250 }}
        shadows
      >
        <Scene
          running={running}
          showSensors={filters.showSensors}
          showLabels={filters.showLabels}
          selectedEquipment={selectedEquipment}
          selectedInstrument={selectedInstrument}
          telemetry={telemetry}
          alarmSeverityByEquipment={alarmSeverityByEquipment}
          onSelectEquipment={selectEquipment}
          onSelectInstrument={selectInstrument}
          onClearSelection={clearSelection}
        />
        <CameraController cameraTarget={cameraTarget} shotRequest={shotRequest} />
      </Canvas>

      <EquipmentSearch
        search={filters.search}
        selectedEquipment={selectedEquipment}
        onSearch={setSearch}
        onSelect={selectEquipment}
      />

      <ControlPanel
        running={running}
        showSensors={filters.showSensors}
        showLabels={filters.showLabels}
        onToggleRun={toggleRunning}
        onToggleSensors={toggleSensors}
        onToggleLabels={toggleLabels}
        onResetCamera={resetCamera}
      />

      <LegendPanel cameraTarget={cameraTarget} onSetCamera={setCameraTarget} onScreenshot={requestScreenshot} />

      <InfoCard selectedEquipment={selectedEquipment} selectedInstrument={selectedInstrument} telemetry={telemetry} />

      <StatusPanel telemetry={telemetry} alarms={alarms} />
    </main>
  );
}
