import { create } from 'zustand';
import { equipment, initialTelemetry, TELEMETRY_HISTORY_LIMIT } from '../data/index.js';
import { evaluateAlarms } from '../services/alarmRules.js';

const cameraForEquipment = (equipmentId) => {
  const item = equipment.find((candidate) => candidate.id === equipmentId);
  if (!item) return { id: 'overview' };
  const [x, y, z] = item.position;
  return {
    id: `equipment:${equipmentId}`,
    position: [x + 7, y + 6, z + 7],
    target: [x, y + Math.max(1, item.size[1] * 0.5), z],
  };
};

export const usePlantStore = create((set) => ({
  running: true,
  selectedEquipment: null,
  selectedInstrument: null,
  telemetry: initialTelemetry,
  telemetryHistory: [initialTelemetry],
  filters: {
    showSensors: true,
    showLabels: true,
    search: '',
  },
  alarms: [],
  cameraTarget: { id: 'overview' },
  shotRequest: 0,

  setRunning: (running) => set({ running }),
  toggleRunning: () => set((state) => ({ running: !state.running })),
  setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),
  toggleSensors: () => set((state) => ({ filters: { ...state.filters, showSensors: !state.filters.showSensors } })),
  toggleLabels: () => set((state) => ({ filters: { ...state.filters, showLabels: !state.filters.showLabels } })),
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  requestScreenshot: () => set((state) => ({ shotRequest: state.shotRequest + 1 })),
  resetCamera: () => set({ cameraTarget: { id: 'overview' } }),
  clearSelection: () => set({ selectedEquipment: null, selectedInstrument: null }),
  selectEquipment: (equipmentId) => set({
    selectedEquipment: equipmentId,
    selectedInstrument: null,
    cameraTarget: cameraForEquipment(equipmentId),
  }),
  selectInstrument: (instrumentId) => set({ selectedInstrument: instrumentId, selectedEquipment: null }),
  ingestTelemetry: (snapshot) => set((state) => {
    const telemetryHistory = [...state.telemetryHistory, snapshot].slice(-TELEMETRY_HISTORY_LIMIT);
    return {
      telemetry: snapshot,
      telemetryHistory,
      alarms: evaluateAlarms(snapshot),
    };
  }),
}));
