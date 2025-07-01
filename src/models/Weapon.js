import { WeaponData } from './WeaponData.js';
import { ModelBase } from './ModelBase.js';

/**
 * Represents a player's weapon. */
export class Weapon extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Weapon received invalid data, defaulting to empty object.');
      data = {};
    }

    this.name = this._validateString(data.name);
    this.state = this._validateString(data.state, 'holstered');
    this.ammoClip = this._validateNumberOrNull(data.ammo_clip);
    this.ammoClipMax = this._validateNumberOrNull(data.ammo_clip_max);
    this.ammoReserve = this._validateNumberOrNull(data.ammo_reserve);

    const metadata = WeaponData[this.name] ?? {};
    this.type = data.type ?? metadata.type ?? 'Unknown';
    this.displayName = metadata.displayName ?? this.name;
  }

  isPrimary() {
    return ['Rifle', 'Sniper', 'Shotgun', 'Submachine Gun', 'MachineGun'].includes(this.type);
  }

  isSecondary() {
    return this.type === 'Pistol';
  }

  isGrenade() {
    return this.type === 'Grenade';
  }

  isMelee() {
    return this.type === 'Knife';
  }

  isC4() {
    return this.name === 'weapon_c4';
  }

  isActive() {
    return this.state === 'active';
  }

  _validateString(value, defaultValue = '') {
    return (typeof value === 'string' && value.trim() !== '') ? value : defaultValue;
  }

  _validateNumberOrNull(value) {
    return (typeof value === 'number' && !isNaN(value)) ? value : null;
  }
}
