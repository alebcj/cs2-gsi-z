import { PlayerState, PlayerStateInput } from './PlayerState.js';
import { PlayerMatchStats, PlayerMatchStatsInput } from './PlayerMatchStats.js';
import { WeaponsCollection, WeaponsCollectionInput } from './WeaponsCollection.js';
import { ModelBase } from './ModelBase.js';
import { Weapon } from './Weapon.js';

export interface PlayerInput {
  steamid?: string;
  name?: string;
  team?: string;
  observer_slot?: number;
  activity?: string;
  state?: PlayerStateInput;
  match_stats?: PlayerMatchStatsInput;
  weapons?: WeaponsCollectionInput;
}

/**
 * Represents the current player. */
export class Player extends ModelBase {
  public steamid: string;
  public name: string;
  public team: string;
  public observerSlot: number | null;
  public activity: string;

  public state: PlayerState;
  public matchStats: PlayerMatchStats;
  public weapons: WeaponsCollection;

  public activeWeapon: Weapon | null;

  constructor(data: PlayerInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Player constructor received invalid data, defaulting to empty object.');

      data = {};
    }

    this.steamid = this.validateString(data.steamid);
    this.name = this.validateString(data.name);
    this.team = this.validateString(data.team);
    this.observerSlot = this.validateNumberOrNull(data.observer_slot);
    this.activity = this.validateString(data.activity, 'unknown');

    this.state = new PlayerState(data.state || {});
    this.matchStats = new PlayerMatchStats(data.match_stats || {});
    this.weapons = new WeaponsCollection(data.weapons || {});

    this.activeWeapon = this.weapons.getActive();
  }

  /**
   * Returns a specific weapon by name. */
  public getWeaponByName(name: string) {
    return this.weapons.find((w: Weapon) => w.name === name) ?? null;
  }

  /**
   * Does the player have grenades? */
  public hasGrenades() {
    return this.weapons.some(w => w.isGrenade());
  }

  /**
   * Does the player have C4? */
  public hasC4() {
    return this.weapons.some(w => w.isC4());
  }
}
