import React from 'react';

function Icon({ name, size = 19 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    play: <polygon points="6 4 20 12 6 20 6 4" />,
    pause: (
      <>
        <line x1="9" y1="4" x2="9" y2="20" />
        <line x1="15" y1="4" x2="15" y2="20" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    eyeOff: (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.1 4.2" />
        <path d="M6.1 6.6C3.5 8.4 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.4 4-.9" />
      </>
    ),
    tags: (
      <>
        <path d="M20 10 12 2H4v8l8 8 8-8Z" />
        <path d="m14 20 6-6" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v6h6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function ControlPanel({
  running,
  showSensors,
  showLabels,
  onToggleRun,
  onToggleSensors,
  onToggleLabels,
  onResetCamera,
}) {
  return (
    <nav className="control-panel" aria-label="Управление моделью">
      <button onClick={onToggleRun} title={running ? 'Пауза' : 'Пуск'}>
        <Icon name={running ? 'pause' : 'play'} />
        <span>{running ? 'Пауза' : 'Пуск'}</span>
      </button>
      <button onClick={onToggleSensors} title={showSensors ? 'Скрыть датчики' : 'Показать датчики'}>
        <Icon name={showSensors ? 'eye' : 'eyeOff'} />
        <span>Датчики</span>
      </button>
      <button onClick={onToggleLabels} title={showLabels ? 'Скрыть подписи' : 'Показать подписи'}>
        <Icon name="tags" />
        <span>Подписи</span>
      </button>
      <button onClick={onResetCamera} title="Сброс камеры">
        <Icon name="reset" />
        <span>Камера</span>
      </button>
    </nav>
  );
}
