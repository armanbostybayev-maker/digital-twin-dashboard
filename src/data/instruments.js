/** @typedef {import('./types.js').Instrument} Instrument */
/** @type {Instrument[]} */
export const instruments = [
  { id: 'lt-201', tag: 'LT-201', type: 'LT', equipmentId: 'heap-leach', value: 73, unit: '%', status: 'OK', position: [-13.7, 2.5, -5.2], demo: { min: 68, max: 78, speed: 0.6 } },
  { id: 'pht-102', tag: 'pHT-102', type: 'pHT', equipmentId: 'heap-leach', value: 1.4, unit: 'pH', status: 'OK', position: [-8.3, 2.5, -8.7], demo: { min: 1.25, max: 1.6, speed: 0.8 } },
  { id: 'ait-101', tag: 'AIT-101', type: 'AIT', equipmentId: 'pls-pond-1', value: 2.1, unit: 'г/л Cu', status: 'OK', position: [-4.8, 1.2, -6.8], demo: { min: 1.9, max: 2.25, speed: 0.5 } },
  { id: 'ft-301', tag: 'FT-301', type: 'FT', equipmentId: 'pls-pump', value: 240, unit: 'м3/ч', status: 'OK', position: [2.7, 1.8, -4.3], demo: { min: 232, max: 248, speed: 1.2 } },
  { id: 'pt-303', tag: 'PT-303', type: 'PT', equipmentId: 'pls-pump', value: 4.2, unit: 'бар', status: 'OK', position: [0.9, 1.6, -2.7], demo: { min: 3.9, max: 4.5, speed: 0.9 } },
  { id: 'orp-401', tag: 'ORP-401', type: 'ORP', equipmentId: 'sx-extraction', value: 515, unit: 'мВ', status: 'OK', position: [9.5, 1.8, -6.9], demo: { min: 492, max: 528, speed: 0.7 } },
  { id: 'cv-401', tag: 'CV-401', type: 'CV', equipmentId: 'sx-extraction', value: 62, unit: '%', status: 'AUTO', position: [4.6, 1.6, -5.8], demo: { min: 58, max: 67, speed: 0.8 } },
  { id: 'tt-401', tag: 'TT-401', type: 'TT', equipmentId: 'rich-tank', value: 44, unit: '°C', status: 'OK', position: [14.8, 3.0, 2.4], demo: { min: 42.5, max: 45.5, speed: 0.6 } },
  { id: 'lt-601', tag: 'LT-601', type: 'LT', equipmentId: 'rich-tank', value: 68, unit: '%', status: 'OK', position: [12.2, 2.5, 2.0], demo: { min: 63, max: 73, speed: 0.55 } },
  { id: 'ait-701', tag: 'AIT-701', type: 'AIT', equipmentId: 'ew-cellhouse', value: 45, unit: 'г/л Cu', status: 'OK', position: [18.2, 3.2, -2.2], demo: { min: 43.5, max: 46.5, speed: 0.7 } },
  { id: 'tt-701', tag: 'TT-701', type: 'TT', equipmentId: 'ew-cellhouse', value: 44, unit: '°C', status: 'OK', position: [21.8, 3.2, 2.2], demo: { min: 42.8, max: 45.2, speed: 0.65 } },
  { id: 'xv-701', tag: 'XV-701', type: 'XV', equipmentId: 'ew-cellhouse', value: 1, unit: 'OPEN', status: 'OPEN', position: [17.2, 1.6, 0.8], demo: { min: 1, max: 1, speed: 0 } },
  { id: 'lt-801', tag: 'LT-801', type: 'LT', equipmentId: 'raffinate-tank', value: 62, unit: '%', status: 'OK', position: [2.9, 2.7, -10.4], demo: { min: 58, max: 69, speed: 0.4 } },
  { id: 'ft-801', tag: 'FT-801', type: 'FT', equipmentId: 'raffinate-tank', value: 228, unit: 'м3/ч', status: 'OK', position: [-0.4, 1.7, -9.6], demo: { min: 216, max: 236, speed: 0.8 } },
  { id: 'pt-101', tag: 'PT-101', type: 'PT', equipmentId: 'acid-pump', value: 5.5, unit: 'бар', status: 'OK', position: [-16.8, 1.7, 0.4], demo: { min: 5.1, max: 5.8, speed: 0.8 } },
  { id: 'ft-902', tag: 'FT-902', type: 'FT', equipmentId: 'water', value: 95, unit: 'м3/ч', status: 'OK', position: [-5.2, 2.4, 5.6], demo: { min: 89, max: 101, speed: 0.6 } },
  { id: 'pht-903', tag: 'pHT-903', type: 'pHT', equipmentId: 'wwtp', value: 7.2, unit: 'pH', status: 'OK', position: [15.5, 2.2, -5.4], demo: { min: 6.9, max: 7.5, speed: 0.6 } },
];
