import { GrenadeType, stringToGrenadeType } from "../../constants/enums";
import { isSteamId64, STEAMID64 } from "../../constants/types";
import { Vector3D } from "../helpers/Vector3D";
import { ModelBase } from "../ModelBase";

export interface GrenadeBaseInput {
  owner?: string;
  lifetime?: string;
  type?: string;
  flames?: Record<string, string>;
  velocity?: string;
  position?: string;
  effecttime?: string;
}

/**
 * Represents the current state all active grenades. */
export class GrenadeBase extends ModelBase {
  public readonly owner: STEAMID64;
  public readonly lifetime: string;
  public readonly type: GrenadeType;
  public readonly velocity: Vector3D;
  public readonly position: Vector3D;
  public readonly effecttime: string;

  constructor(data: GrenadeBaseInput = {}) {
    super();

    if (typeof data !== "object" || data === null) {
      console.warn(
        "⚠️ Round received invalid data, defaulting to empty object."
      );

      data = {};
    }

    if (!isSteamId64(data.owner)) {
      // There seems to be a bug in GSI where sometimes the owner is a three-digit number string,
      // not a steamid64. No idea why this happens or what the three-digit number represents.
      if (typeof data.owner === "string") {
        console.warn(
          "⚠️ Grenade received invalid player, defaulting to unknown. This could be due to a known GSI bug."
        );
      }

      data.owner = "unknown";
    }

    this.owner = data.owner as STEAMID64;
    this.lifetime = this.validateString(data.lifetime);
    this.type = stringToGrenadeType(data.type);
    this.velocity = Vector3D.fromString(data.velocity);
    this.position = Vector3D.fromString(data.position);
    this.effecttime = this.validateString(data.effecttime);
  }

  isMoving() {
    return (
      this.velocity.x !== 0 || this.velocity.y !== 0 || this.velocity.z !== 0
    );
  }

  toSerializableObject(): GrenadeBaseInput {
    return {
      owner: this.owner,
      lifetime: this.lifetime,
      type: this.type,
      velocity: this.velocity.toString(),
      position: this.position.toString(),
      effecttime: this.effecttime,
    };
  }
}
