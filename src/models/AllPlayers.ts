import { STEAMID64 } from "../constants/types.js";
import { ModelBase } from "./ModelBase.js";
import { Player, PlayerInput } from "./Player.js";

export type AllPlayersInput = Record<string, PlayerInput>;

/**
 * List of all players. */
export class AllPlayers extends ModelBase {
  public list: Record<STEAMID64, Player>;

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

    this.list = Object.fromEntries(steamids.map((steamid, i) => [steamid, new Player({ ...values[i], steamid })])) as Record<STEAMID64, Player>;
  }

  getBySteamid(steamid: STEAMID64) {
    return this.list[steamid] ?? null;
  }

  getAllSteamids() {
    return new Set(Object.keys(this.list) as STEAMID64[]);
  }

  toSerializableObject(): AllPlayersInput {
    return Object.fromEntries(Object.entries(this.list).map(([steamid, player]) => [steamid, player.toSerializableObject()]));
  }
}
