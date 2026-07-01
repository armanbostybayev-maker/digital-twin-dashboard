import React from 'react';

export default function StatusPanel({ telemetry, alarms = [] }) {
  const values = [
    ['Производительность', `${telemetry.throughput.toFixed(0)} т/сут`],
    ['Cu в PLS', `${telemetry.plsCu.toFixed(2)} г/л`],
    ['Cu в богатом электролите', `${telemetry.richCu.toFixed(1)} г/л`],
    ['pH', telemetry.ph.toFixed(2)],
    ['Температура EW', `${telemetry.ewTemp.toFixed(1)} °C`],
  ];
  const criticalCount = alarms.filter((alarm) => alarm.severity === 'critical').length;
  const warningCount = alarms.filter((alarm) => alarm.severity === 'warning').length;

  return (
    <footer className="status-panel">
      {values.map(([label, value]) => (
        <div className="status-item" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
      <div className={`status-item alarm-summary ${criticalCount ? 'critical' : warningCount ? 'warning' : 'normal'}`}>
        <span>Тревоги</span>
        <strong>{criticalCount ? `${criticalCount} крит.` : warningCount ? `${warningCount} пред.` : 'Норма'}</strong>
      </div>
    </footer>
  );
}
