import { ModelBase } from '../ModelBase';

export interface PlayerStateInput {
  health?: number;
  armor?: number;
  helmet?: boolean;
  flashed?: number;
  smoked?: number;
  burning?: number;
  money?: number;
  round_kills?: number;
  round_killhs?: number;
  equip_value?: number;
}

/**
 * Current state of the player (health, armor, money, etc.) */
export class PlayerState extends ModelBase {
  public readonly health: number | null;
  public readonly armor: number | null;
  public readonly helmet: boolean;
  public readonly flashed: number;
  public readonly smoked: number;
  public readonly burning: number;
  public readonly money: number;
  public readonly roundKills: number;
  public readonly roundHeadshotKills: number;
  public readonly equipmentValue: number;

  constructor(data: PlayerStateInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ PlayerState received invalid data, defaulting to empty object.');

      data = {};
    }

    this.health = this.validateNumberOrNull(data.health);
    this.armor = this.validateNumberOrNull(data.armor);
    this.helmet = Boolean(data.helmet);
    this.flashed = this.validateNumberOrZero(data.flashed);
    this.smoked = this.validateNumberOrZero(data.smoked);
    this.burning = this.validateNumberOrZero(data.burning);
    this.money = this.validateNumberOrZero(data.money);
    this.roundKills = this.validateNumberOrZero(data.round_kills);
    this.roundHeadshotKills = this.validateNumberOrZero(data.round_killhs);
    this.equipmentValue = this.validateNumberOrZero(data.equip_value);
  }

  public isAlive() {
    return (this.health ?? 0) > 0;
  }

  public hasArmor() {
    return (this.armor ?? 0) > 0 || this.helmet;
  }

  toSerializableObject(): PlayerStateInput {
    return {
      health: this.health ?? undefined,
      armor: this.armor ?? undefined,
      helmet: this.helmet,
      flashed: this.flashed,
      smoked: this.smoked,
      burning: this.burning,
      money: this.money,
      round_kills: this.roundKills,
      round_killhs: this.roundHeadshotKills,
      equip_value: this.equipmentValue,
    }
  }
}
