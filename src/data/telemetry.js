/** @typedef {import('./types.js').TelemetrySnapshot} TelemetrySnapshot */

export const TELEMETRY_HISTORY_LIMIT = 240;

/** @type {TelemetrySnapshot} */
export const initialTelemetry = {
  timestamp: Date.now(),
  throughput: 1250,
  plsCu: 2.1,
  richCu: 45,
  ph: 1.4,
  ewTemp: 44,
  instruments: {},
};
