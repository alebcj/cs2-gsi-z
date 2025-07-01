import { PlayerState } from './PlayerState.js';
import { PlayerMatchStats } from './PlayerMatchStats.js';
import { WeaponsCollection } from './WeaponsCollection.js';
import { ModelBase } from './ModelBase.js';

/**
 * Represents the current player. */
export class Player extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Player constructor received invalid data, defaulting to empty object.');
      data = {};
    }

    this.steamid = this._validateString(data.steamid);
    this.name = this._validateString(data.name);
    this.team = this._validateString(data.team);
    this.observerSlot = this._validateNumberOrNull(data.observer_slot);
    this.activity = this._validateString(data.activity, 'unknown');

    this.state = new PlayerState(data.state || {});
    this.matchStats = new PlayerMatchStats(data.match_stats || {});
    this.weapons = new WeaponsCollection(data.weapons || {});

    this.activeWeapon = this.weapons.getActive();
  }

  /**
   * Returns a specific weapon by name. */
  getWeaponByName(name) {
    return this.weapons.find(w => w.name === name) ?? null;
  }

  /**
   * Does the player have grenades? */
  hasGrenades() {
    return this.weapons.some(w => w.isGrenade());
  }

  /**
   * Does the player have C4? */
  hasC4() {
    return this.weapons.some(w => w.isC4());
  }

  /* ------------------------ */
  /* Private internal methods */
  /* ------------------------ */

  _validateString(value, defaultValue = '') {
    return (typeof value === 'string' && value.trim() !== '') ? value : defaultValue;
  }

  _validateNumberOrNull(value) {
    return (typeof value === 'number' && !isNaN(value)) ? value : null;
  }
}
