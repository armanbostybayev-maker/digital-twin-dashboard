/**
 * @typedef {[number, number, number]} Vec3
 *
 * @typedef {Object} ProcessStream
 * @property {string} id
 * @property {string} name
 * @property {string} color
 * @property {string} unit
 *
 * @typedef {Object} Equipment
 * @property {string} id
 * @property {string} tag
 * @property {string} name
 * @property {string} type
 * @property {Vec3} position
 * @property {Vec3} size
 * @property {string} purpose
 * @property {string[]} inputs
 * @property {string[]} outputs
 * @property {Record<string, string>} parameters
 *
 * @typedef {Object} Pipeline
 * @property {string} id
 * @property {string} streamId
 * @property {string} from
 * @property {string} to
 * @property {number} flow
 * @property {Vec3[]} points
 * @property {boolean=} product
 *
 * @typedef {Object} InstrumentDemo
 * @property {number} min
 * @property {number} max
 * @property {number} speed
 *
 * @typedef {Object} Instrument
 * @property {string} id
 * @property {string} tag
 * @property {string} type
 * @property {string} equipmentId
 * @property {number|string} value
 * @property {string} unit
 * @property {string} status
 * @property {Vec3} position
 * @property {InstrumentDemo} demo
 *
 * @typedef {Object} TelemetrySnapshot
 * @property {number} timestamp
 * @property {number} throughput
 * @property {number} plsCu
 * @property {number} richCu
 * @property {number} ph
 * @property {number} ewTemp
 * @property {Record<string, number|string>} instruments
 *
 * @typedef {'normal'|'warning'|'critical'} AlarmSeverity
 *
 * @typedef {Object} Alarm
 * @property {string} id
 * @property {string} sourceId
 * @property {'equipment'|'instrument'|'process'} sourceType
 * @property {AlarmSeverity} severity
 * @property {string} message
 * @property {number|string} value
 * @property {number} timestamp
 */

export {};
