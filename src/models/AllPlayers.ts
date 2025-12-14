import { STEAMID64 } from "../constants/types.js";
import { ModelBase } from "./ModelBase.js";
import { Player, PlayerInput } from "./Player.js";

export type AllPlayersInput = Record<string, PlayerInput>;

/**
 * List of all players. */
export class AllPlayers extends ModelBase {
  public list: Player[];

  constructor(data: AllPlayersInput = {}) {
    super();

    if (typeof data !== "object" || data === null) {
      console.warn(
        "⚠️ WeaponsCollection received invalid data, defaulting to empty object."
      );

      data = {};
    }

    const steamids = Object.keys(data);
    const values = Object.values(data);

    this.list = values.map(
      (w, i) => new Player({ ...w, steamid: steamids[i] as STEAMID64 })
    );
  }

  getBySteamid(steamid: STEAMID64) {
    return this.list.find((p) => p.steamid === steamid) ?? null;
  }

  getAllSteamids() {
    return new Set(this.list.map((p) => p.steamid as STEAMID64));
  }

  toSerializableObject(): AllPlayersInput {
    const result: AllPlayersInput = {};

    for (const player of this.list) {
      result[player.steamid] = player.toSerializableObject();
    }

    return result;
  }
}
