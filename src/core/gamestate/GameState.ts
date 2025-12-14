import { AllPlayers, AllPlayersInput } from "../../models/AllPlayers.js";
import { Bomb, BombInput } from "../../models/Bomb.js";
import { Map, MapInput } from "../../models/Map.js";
import { ModelBase } from "../../models/ModelBase.js";
import { PhaseCountdowns, PhaseCountdownsInput } from "../../models/PhaseCountdowns.js";
import { Player, PlayerInput } from "../../models/Player.js";
import { Provider, ProviderInput } from "../../models/Provider.js";
import { Round, RoundInput } from "../../models/Round.js";

export interface GameStateInput {
  provider?: ProviderInput;
  map?: MapInput;
  round?: RoundInput;
  player?: PlayerInput;
  phase_countdowns?: PhaseCountdownsInput;
  allplayers?: AllPlayersInput;
  bomb?: BombInput;
  previously?: GameStateInput;
}

/**
 * Represents the complete game state at a given moment. */
export class GameState extends ModelBase {
  public provider: Provider;
  public map: Map;
  public round: Round;
  public player: Player;
  public phaseCountdowns: PhaseCountdowns;
  public allPlayers: AllPlayers;
  public bomb: Bomb;
  public previously: GameStateInput | null;

  constructor({
    player,
    round,
    map,
    provider,
    phase_countdowns,
    allplayers,
    bomb,
    previously,
  }: GameStateInput) {
    super();

    this.provider = new Provider(provider);
    this.map = new Map(map);
    this.round = new Round(round);
    this.player = new Player(player);
    this.phaseCountdowns = new PhaseCountdowns(phase_countdowns);
    this.allPlayers = new AllPlayers(allplayers);
    this.bomb = new Bomb(bomb);
    
    this.previously =
      typeof previously === "object" && previously !== null
        ? previously
        : null;
  }

  toSerializableObject() {
    return {
      provider: this.provider.toSerializableObject(),
      map: this.map.toSerializableObject(),
      round: this.round.toSerializableObject(),
      player: this.player.toSerializableObject(),
      phase_countdowns: this.phaseCountdowns.toSerializableObject(),
      allplayers: this.allPlayers.toSerializableObject(),
      bomb: this.bomb.toSerializableObject(),
    }
  }
}
