import { colors } from '../theme.js';

/** @typedef {import('./types.js').ProcessStream} ProcessStream */

/** @type {ProcessStream[]} */
export const processStreams = [
  { id: 'pls', name: 'Продуктивный раствор PLS', color: colors.streams.pls, unit: 'м3/ч' },
  { id: 'raffinate', name: 'Рафинат', color: colors.streams.raffinate, unit: 'м3/ч' },
  { id: 'rich-electrolyte', name: 'Богатый электролит', color: colors.streams['rich-electrolyte'], unit: 'м3/ч' },
  { id: 'spent-electrolyte', name: 'Обедненный электролит', color: colors.streams['spent-electrolyte'], unit: 'м3/ч' },
  { id: 'organic', name: 'Органическая фаза', color: colors.streams.organic, unit: 'м3/ч' },
  { id: 'acid', name: 'Серная кислота H2SO4', color: colors.streams.acid, unit: 'м3/ч' },
  { id: 'process-water', name: 'Технологическая вода', color: colors.streams['process-water'], unit: 'м3/ч' },
  { id: 'waste-water', name: 'Сточные воды', color: colors.streams['waste-water'], unit: 'м3/ч' },
];
