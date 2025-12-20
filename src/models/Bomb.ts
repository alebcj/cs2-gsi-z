import { ModelBase } from "./ModelBase";
import { Vector3D } from "./helpers/Vector3D";
import { BombState, stringToBombState } from "../constants/enums";
import { isSteamId64, STEAMID64 } from "../constants/types";

export interface BombInput {
    state?: string;
    position?: string;
    player?: string;
}

/**
 * Represents the current player. */
export class Bomb extends ModelBase {
  public readonly state: BombState;
  public readonly position: Vector3D;
  public readonly player: STEAMID64;

  constructor(data: BombInput = {}) {
    super();

    if (typeof data !== "object" || data === null) {
      console.warn(
        "⚠️ Player constructor received invalid data, defaulting to empty object."
      );

      data = {};
    }

    if (!isSteamId64(data.player)) {
        if (typeof data.player === 'string') {
            console.warn("⚠️ Bomb received invalid player, defaulting to unknown.");
        }

        data.player = "unknown";
    }

    this.state = stringToBombState(data.state);
    this.position = Vector3D.fromString(data.position);
    this.player = data.player as STEAMID64;
  }

  toSerializableObject(): BombInput {
      return {
          state: this.state,
          position: this.position.toString(),
          player: this.player,
      }
  }
}
