import { Weapon, type WeaponInput } from './Weapon.js';
import { ModelBase } from './ModelBase.js';

export type WeaponsCollectionInput = Record<string, WeaponInput>;

/**
 * Player weapons collection. */
export class WeaponsCollection extends ModelBase {
  public list: Weapon[];

  constructor(data: WeaponsCollectionInput = {}) {
    super();

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

  find(predicate: (value: Weapon, index: number, obj: Weapon[]) => boolean) {
    return this.list.find(predicate);
  }

  some(predicate: (value: Weapon, index: number, array: Weapon[]) => unknown) {
    return this.list.some(predicate);
  }
}
