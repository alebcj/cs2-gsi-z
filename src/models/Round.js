import { ModelBase } from './ModelBase.js';

/**
 * Represents the current state of the round. */
export class Round extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');
      data = {};
    }

    this.phase = this._validateString(data.phase, 'unknown'); // E.g.: freezetime, live, over
    this.bomb = this._validateStringOrNull(data.bomb);        // E.g.: planted, exploded, defused
    this.winner = this._validateStringOrNull(data.win_team);  // E.g.: CT, T, null
  }

  /* ------------------------ */
  /* Private internal methods */
  /* ------------------------ */

  _validateString(value, defaultValue = '') {
    return (typeof value === 'string' && value.trim() !== '') ? value : defaultValue;
  }

  _validateStringOrNull(value) {
    return (typeof value === 'string' && value.trim() !== '') ? value : null;
  }
}
