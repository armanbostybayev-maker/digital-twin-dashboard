import { instruments, initialTelemetry } from '../data/index.js';

const oscillate = (time, min, max, speed, phase = 0) => {
  const wave = (Math.sin(time * speed + phase) + 1) / 2;
  return min + (max - min) * wave;
};

const roundByType = (type, value) => {
  if (type === 'FT' || type === 'LT' || type === 'CV' || type === 'ORP') return Math.round(value);
  if (type === 'XV') return value;
  return Number(value.toFixed(type === 'AIT' ? 1 : 2));
};

/**
 * Replace this adapter with OPC UA, MQTT, REST or WebSocket later.
 * The public contract stays: start(callback), stop(), getSnapshot().
 */
export function createDemoTelemetrySource({ intervalMs = 1000 } = {}) {
  let timer = null;
  let startedAt = Date.now();
  let lastSnapshot = initialTelemetry;

  const buildSnapshot = () => {
    const now = Date.now();
    const t = (now - startedAt) / 1000;
    const instrumentValues = Object.fromEntries(instruments.map((instrument) => {
      if (!instrument.demo || instrument.demo.min === instrument.demo.max) {
        return [instrument.id, instrument.value];
      }
      const value = oscillate(t, instrument.demo.min, instrument.demo.max, instrument.demo.speed, instrument.position[0]);
      return [instrument.id, roundByType(instrument.type, value)];
    }));

    lastSnapshot = {
      timestamp: now,
      throughput: 1250 + Math.sin(t * 0.18) * 38,
      plsCu: 2.08 + Math.sin(t * 0.33) * 0.09,
      richCu: 45 + Math.sin(t * 0.27 + 1.2) * 0.8,
      ph: 1.4 + Math.sin(t * 0.41) * 0.08,
      ewTemp: 44 + Math.sin(t * 0.24 + 2) * 0.7,
      instruments: instrumentValues,
    };
    return lastSnapshot;
  };

  return {
    start(callback) {
      callback(buildSnapshot());
      timer = window.setInterval(() => callback(buildSnapshot()), intervalMs);
    },
    stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    },
    getSnapshot() {
      return lastSnapshot;
    },
  };
}
