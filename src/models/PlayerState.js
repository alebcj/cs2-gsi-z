import { ModelBase } from './ModelBase.js';

/**
 * Current state of the player (health, armor, money, etc.) */
export class PlayerState extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ PlayerState received invalid data, defaulting to empty object.');
      data = {};
    }

    this.health = this._validateNumberOrNull(data.health);
    this.armor = this._validateNumberOrNull(data.armor);
    this.helmet = Boolean(data.helmet);
    this.flashed = this._validateNumberOrZero(data.flashed);
    this.smoked = this._validateNumberOrZero(data.smoked);
    this.burning = this._validateNumberOrZero(data.burning);
    this.money = this._validateNumberOrZero(data.money);
    this.roundKills = this._validateNumberOrZero(data.round_kills);
    this.roundHeadshots = this._validateNumberOrZero(data.round_killhs);
    this.equipValue = this._validateNumberOrZero(data.equip_value);
  }

  isAlive() {
    return (this.health ?? 0) > 0;
  }

  hasArmor() {
    return (this.armor ?? 0) > 0 || this.helmet;
  }

  _validateNumberOrNull(value) {
    return (typeof value === 'number' && !isNaN(value)) ? value : null;
  }

  _validateNumberOrZero(value) {
    return (typeof value === 'number' && !isNaN(value)) ? value : 0;
  }
}
