/**
 * Match statistics for the player. */
import { ModelBase } from './ModelBase.js';

export class PlayerMatchStats extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ PlayerMatchStats received invalid data, defaulting to empty object.');
      data = {};
    }

    this.kills = this._validateNumberOrZero(data.kills);
    this.assists = this._validateNumberOrZero(data.assists);
    this.deaths = this._validateNumberOrZero(data.deaths);
    this.mvps = this._validateNumberOrZero(data.mvps);
    this.score = this._validateNumberOrZero(data.score);
  }

  kda() {
    return this.deaths > 0 ? ((this.kills + this.assists) / this.deaths).toFixed(2) : '∞';
  }

  _validateNumberOrZero(value) {
    return (typeof value === 'number' && !isNaN(value)) ? value : 0;
  }
}
