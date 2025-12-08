import { Map } from "../../models/Map.js";
import { ModelBase } from "../../models/ModelBase.js";
import { PhaseCountdowns } from "../../models/PhaseCountdowns.js";
import { Player } from "../../models/Player.js";
import { Provider } from "../../models/Provider.js";
import { Round } from "../../models/Round.js";

export interface GameStateInput {
  provider?: Provider;
  map?: Map;
  round?: Round;
  player?: Player;
  phase_countdowns?: PhaseCountdowns;
  previously?: GameState;
}

/**
 * Represents the complete game state at a given moment. */
export class GameState extends ModelBase {
  public provider: Provider | null;
  public map: Map;
  public round: Round;
  public player: Player;
  public phaseCountdowns: PhaseCountdowns;
  public previously: GameState | null;

  constructor({
    player,
    round,
    map,
    provider,
    previously,
    phase_countdowns
  }: GameStateInput) {
    super();

    if (typeof provider !== "object" || provider === null) {
      console.warn('⚠️ GameState: invalid provider, assigning empty object.');

      provider = new Provider();
    }
     
    if (typeof map !== "object" || map === null) {
      console.warn('⚠️ GameState: invalid map, assigning empty object.');

      map = new Map();
    }

    if (typeof round !== "object" || round === null) {
      console.warn('⚠️ GameState: invalid round, assigning empty object.');

      round = new Round();
    }

    if (typeof player !== "object" || player === null) {
      console.warn('⚠️ GameState: invalid player, assigning empty object.');

      player = new Player();
    }

    if (typeof phase_countdowns !== "object" || phase_countdowns === null) {
      console.warn('⚠️ GameState: invalid phase_countdowns, assigning empty object.');

      phase_countdowns = new PhaseCountdowns();
    }

    this.provider = provider;
    this.map = map;
    this.round = round;
    this.player = player;
    this.phaseCountdowns = phase_countdowns;
    
    this.previously =
      typeof previously === "object" && previously !== null
        ? previously
        : null;
  }
}
