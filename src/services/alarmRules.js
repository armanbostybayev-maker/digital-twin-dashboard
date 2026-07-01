/** @typedef {import('../data/types.js').Alarm} Alarm */

const alarm = ({ id, sourceId, sourceType = 'process', severity, message, value, timestamp }) => ({
  id,
  sourceId,
  sourceType,
  severity,
  message,
  value,
  timestamp,
});

/** @returns {Alarm[]} */
export function evaluateAlarms(snapshot) {
  const alarms = [];
  const ts = snapshot.timestamp;

  if (snapshot.ph < 1.28) {
    alarms.push(alarm({ id: 'ph-low-critical', sourceId: 'heap-leach', sourceType: 'equipment', severity: 'critical', message: 'pH выщелачивания критически низкий', value: snapshot.ph, timestamp: ts }));
  } else if (snapshot.ph < 1.35) {
    alarms.push(alarm({ id: 'ph-low-warning', sourceId: 'heap-leach', sourceType: 'equipment', severity: 'warning', message: 'pH выщелачивания ниже целевого диапазона', value: snapshot.ph, timestamp: ts }));
  }

  if (snapshot.ewTemp > 45.0) {
    alarms.push(alarm({ id: 'ew-temp-warning', sourceId: 'ew-cellhouse', sourceType: 'equipment', severity: 'warning', message: 'Температура EW приближается к верхней уставке', value: snapshot.ewTemp, timestamp: ts }));
  }

  if (snapshot.richCu < 44.0) {
    alarms.push(alarm({ id: 'rich-cu-warning', sourceId: 'rich-tank', sourceType: 'equipment', severity: 'warning', message: 'Cu в богатом электролите ниже нормы', value: snapshot.richCu, timestamp: ts }));
  }

  const plsFlow = Number(snapshot.instruments['ft-301']);
  if (Number.isFinite(plsFlow) && plsFlow < 235) {
    alarms.push(alarm({ id: 'pls-flow-warning', sourceId: 'pls-pump', sourceType: 'equipment', severity: 'warning', message: 'Расход PLS ниже расчетного', value: plsFlow, timestamp: ts }));
  }

  const acidPressure = Number(snapshot.instruments['pt-101']);
  if (Number.isFinite(acidPressure) && acidPressure > 5.7) {
    alarms.push(alarm({ id: 'acid-pressure-critical', sourceId: 'acid-pump', sourceType: 'equipment', severity: 'critical', message: 'Давление кислоты выше безопасного предела', value: acidPressure, timestamp: ts }));
  }

  return alarms;
}
