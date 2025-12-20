import { WeaponData } from '../data/WeaponData';
import { ModelBase } from './ModelBase';
import { stringToWeaponState, stringToWeaponType, WeaponState, WeaponType } from '../constants/enums';

export interface WeaponInput {
  name?: string;
  state?: string;
  type?: string;
  ammo_clip?: number;
  ammo_clip_max?: number;
  ammo_reserve?: number;
}

/**
 * Represents a player's weapon. */
export class Weapon extends ModelBase {
  public readonly type: WeaponType;
  public readonly displayName: string;

  public readonly name: string;
  public readonly state: WeaponState;
  public readonly ammo_clip: number | null;
  public readonly ammo_clip_max: number | null;
  public readonly ammo_reserve: number | null;

  constructor(data: WeaponInput) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Weapon received invalid data, defaulting to empty object.');

      data = {};
    }

    this.name = this.validateString(data.name);
    this.state = stringToWeaponState(data.state);
    this.ammo_clip = this.validateNumberOrNull(data.ammo_clip);
    this.ammo_clip_max = this.validateNumberOrNull(data.ammo_clip_max);
    this.ammo_reserve = this.validateNumberOrNull(data.ammo_reserve);

    const metadata = WeaponData[this.name] ?? {};
    this.type = stringToWeaponType(data.type);
    this.displayName = metadata.displayName ?? this.name;
  }

  public isPrimary() {
    return ['Rifle', 'Sniper', 'Shotgun', 'Submachine Gun', 'MachineGun'].includes(this.type);
  }

  public isSecondary() {
    return this.type === 'Pistol';
  }

  public isGrenade() {
    return this.type === 'Grenade';
  }

  public isMelee() {
    return this.type === 'Knife';
  }

  public isC4() {
    return this.name === 'weapon_c4';
  }

  public isActive() {
    return this.state === 'active';
  }

  toSerializableObject(): WeaponInput {
    return {
      name: this.name,
      state: this.state,
      type: this.type,
      ammo_clip: this.ammo_clip ?? undefined,
      ammo_clip_max: this.ammo_clip_max ?? undefined,
      ammo_reserve: this.ammo_reserve ?? undefined,
    }
  }
}
