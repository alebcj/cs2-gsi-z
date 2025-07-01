import { Weapon } from './Weapon.js';
import { ModelBase } from './ModelBase.js';

/**
 * Player weapons collection. */
export class WeaponsCollection extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ WeaponsCollection received invalid data, defaulting to empty object.');
      data = {};
    }

    this.list = Object.values(data).map(w => new Weapon(w));
  }

  getActive() {
    return this.list.find(w => w.isActive()) ?? null;
  }

  getGrenades() {
    return this.list.filter(w => w.isGrenade());
  }

  hasC4() {
    return this.list.some(w => w.isC4());
  }

  getByType(type) {
    return this.list.filter(w => w.type === type);
  }

  getAll() {
    return this.list;
  }

  find(predicate) {
    return this.list.find(predicate);
  }

  some(predicate) {
    return this.list.some(predicate);
  }
}
