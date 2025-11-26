import { Map } from "../../models/Map.js";
import { ModelBase } from "../../models/ModelBase.js";
import { Player } from "../../models/Player.js";
import { Round } from "../../models/Round.js";

export interface Provider {
  name: string;
  appid: number;
  version: number;
  steamid: string;
  timestamp: number;
}

export interface GameStateInput {
  player?: Player;
  round?: Round;
  map?: Map;
  provider?: Provider;
  previously?: GameState;
}

/**
 * Represents the complete game state at a given moment. */
export class GameState extends ModelBase {
  public player: Player;
  public round: Round;
  public map: Map;
  public provider: Provider | null;
  public previously: GameState | null;

  constructor({
    player,
    round,
    map,
    provider,
    previously,
  }: GameStateInput) {
    super();

    if (typeof player !== "object" || player === null) {
      // console.warn('⚠️ GameState: invalid player, assigning empty object.');

      player = new Player();
    }
    if (typeof round !== "object" || round === null) {
      // console.warn('⚠️ GameState: invalid round, assigning empty object.');

      round = new Round();
    }
    if (typeof map !== "object" || map === null) {
      // console.warn('⚠️ GameState: invalid map, assigning empty object.');

      map = new Map();
    }

    this.player = player; // It is assumed these are already instances of Player, Round, and Map.
    this.round = round;
    this.map = map;
    this.provider = provider ?? null;
    this.previously =
      typeof previously === "object" && previously !== null
        ? previously
        : null;
  }
}
