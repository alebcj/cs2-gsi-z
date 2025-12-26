import { AllPlayers, AllPlayersInput } from "../../models/players/AllPlayers";
import { Bomb, BombInput } from "../../models/Bomb";
import { GrenadeList, GrenadeListInput } from "../../models/grenades/GrenadeList";
import { Map, MapInput } from "../../models/map/Map";
import { ModelBase } from "../../models/ModelBase";
import { PhaseCountdowns, PhaseCountdownsInput } from "../../models/PhaseCountdowns";
import { Player, PlayerInput } from "../../models/players/Player";
import { Provider, ProviderInput } from "../../models/Provider";
import { Round, RoundInput } from "../../models/Round";

export interface GameStateInput {
  provider?: ProviderInput;
  map?: MapInput;
  round?: RoundInput;
  player?: PlayerInput;
  phase_countdowns?: PhaseCountdownsInput;
  allplayers?: AllPlayersInput;
  bomb?: BombInput;
  grenades?: GrenadeListInput;
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
  public grenades: GrenadeList;
  public previously: GameStateInput | null;

  constructor({
    player,
    round,
    map,
    provider,
    phase_countdowns,
    allplayers,
    bomb,
    grenades,
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
    this.grenades = new GrenadeList(grenades);
    
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
      grenades: this.grenades.toSerializableObject(),
    }
  }
}
