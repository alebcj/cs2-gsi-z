import { PlayerState, PlayerStateInput } from "./PlayerState";
import { PlayerMatchStats, PlayerMatchStatsInput } from "./PlayerMatchStats";
import {
  WeaponsCollection,
  WeaponsCollectionInput,
} from "../WeaponsCollection";
import { ModelBase } from "../ModelBase";
import { Weapon } from "../Weapon";
import { Vector3D } from "../helpers/Vector3D";
import { Activity, stringToActivity, stringToTeam, Team } from "../../constants/enums";
import { STEAMID64, UNKNOWN } from "../../constants/types";

export interface PlayerInput {
  steamid?: `${number}`;
  name?: string;
  xpoverload?: number;
  clan?: string;
  team?: string;
  observer_slot?: number;
  activity?: string;
  spectarget?: string;
  position?: string;
  forward?: string;
  state?: PlayerStateInput;
  match_stats?: PlayerMatchStatsInput;
  weapons?: WeaponsCollectionInput;
}

/**
 * Represents the current player. */
export class Player extends ModelBase {
  public readonly steamid: STEAMID64 | UNKNOWN;
  public readonly name: string;
  public readonly clan: string;
  public readonly xpOverloadLevel: number | null;
  public readonly team: Team;
  /**
   * The player's observer slot. The keybind to spectate this player is observerSlot + 1.
   */
  public readonly observerSlot: number | null;
  /**
   * The player's spectated target. The steamid of the player being spectated. Can result in null if GSI is not subscribed to the correct data.
   */
  public readonly specTarget: string | null;
  public readonly activity: Activity;

  public readonly state: PlayerState;
  public readonly matchStats: PlayerMatchStats;
  public readonly weapons: WeaponsCollection;

  public readonly activeWeapon: Weapon | null;

  public readonly position: Vector3D;
  public readonly forwardDirection: Vector3D;

  constructor(data: PlayerInput = {}) {
    super();

    if (typeof data !== "object" || data === null) {
      console.warn(
        "⚠️ Player constructor received invalid data, defaulting to empty object."
      );

      data = {};
    }

    this.steamid = data.steamid ?? 'unknown';
    this.name = this.validateString(data.name);
    this.xpOverloadLevel = this.validateNumberOrNull(data.xpoverload);
    this.team = stringToTeam(data.team);
    this.clan = this.validateString(data.clan);
    this.observerSlot = this.validateNumberOrNull(data.observer_slot);
    this.specTarget = this.validateString(data.spectarget);
    this.activity = stringToActivity(data.activity);

    this.state = new PlayerState(data.state || {});
    this.matchStats = new PlayerMatchStats(data.match_stats || {});
    this.weapons = new WeaponsCollection(data.weapons || {});

    this.activeWeapon = this.weapons.getActive();

    this.position = Vector3D.fromString(data.position);
    this.forwardDirection = Vector3D.fromString(data.forward);
  }

  /**
   * Returns a specific weapon by name. */
  public getWeaponByName(name: string) {
    return this.weapons.find((w: Weapon) => w.name === name) ?? null;
  }

  /**
   * Does the player have grenades? */
  public hasGrenades() {
    return this.weapons.some((w) => w.isGrenade());
  }

  /**
   * Does the player have C4? */
  public hasC4() {
    return this.weapons.some((w) => w.isC4());
  }

  toSerializableObject(): PlayerInput {
    return {
      steamid: this.steamid === 'unknown' ? undefined : this.steamid,
      name: this.name,
      xpoverload: this.xpOverloadLevel ?? undefined,
      clan: this.clan,
      team: this.team,
      observer_slot: this.observerSlot ?? undefined,
      spectarget: this.specTarget ?? undefined,
      position: this.position.toString(),
      forward: this.forwardDirection.toString(),
      state: this.state.toSerializableObject(),
      match_stats: this.matchStats.toSerializableObject(),
      weapons: this.weapons.toSerializableObject(),
    }
  }
}
