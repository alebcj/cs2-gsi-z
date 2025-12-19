import { GameMode, MapPhase, stringToGameMode, stringToMapPhase } from "../../constants/enums";
import { ModelBase } from "../ModelBase";
import { RoundWins, RoundWinsInput } from "./RoundWins";
import { TeamInfo, TeamInfoInput } from "./TeamInfo";

export interface MapInput {
  mode?: string;
  name?: string;
  phase?: string;
  round?: number;
  num_matches_to_win_series?: number;
  team_ct?: TeamInfoInput;
  team_t?: TeamInfoInput;
  round_wins?: RoundWinsInput;
  current_spectators?: number;
  souvenirs_total?: number;
}

/**
 * Represents the current state of the map. */
export class Map extends ModelBase {
  public mode: GameMode;
  public name: string;
  public phase: MapPhase;
  public round: number;
  public numMatchesToWinSeries: number;

  public teamCT: TeamInfo;
  public teamT: TeamInfo;

  public roundWins: RoundWins;

  public currentSpectators: number;
  public souvenirsTotal: number;
  constructor(data: MapInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Map received invalid data, defaulting to empty object.');

      data = {};
    }

    this.mode = stringToGameMode(data.mode);
    this.name = this.validateString(data.name);
    this.phase = stringToMapPhase(data.phase);
    this.round = this.validateNumber(data.round, 0);
    this.numMatchesToWinSeries = this.validateNumber(data.num_matches_to_win_series, 0);

    this.teamCT = new TeamInfo(data.team_ct);
    this.teamT = new TeamInfo(data.team_t);

    this.roundWins = new RoundWins(data.round_wins);

    this.currentSpectators = this.validateNumber(data.current_spectators, 0);
    this.souvenirsTotal = this.validateNumber(data.souvenirs_total, 0);
  }

  toSerializableObject(): MapInput {
    return {
      mode: this.mode,
      name: this.name,
      phase: this.phase,
      round: this.round,
      num_matches_to_win_series: this.numMatchesToWinSeries,
      team_ct: this.teamCT.toSerializableObject(),
      team_t: this.teamT.toSerializableObject(),
    }
  }
}
