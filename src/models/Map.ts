import { GameMode, Phase, stringToGameMode, stringToPhase } from "../constants/enums.js";
import { ModelBase } from "./ModelBase.js";

export interface TeamInfoInput {
  score?: number;
  name?: string;
  consecutive_round_losses?: number;
  timeouts_remaining?: number;
  matches_won_this_series?: number;
}

/**
 * Represents the information of a team (CT or T). */
export class TeamInfo extends ModelBase {
  public score: number;
  public name: string;
  public consecutiveRoundLosses: number;
  public timeoutsRemaining: number;
  public matchesWonThisSeries: number;

  constructor(data: TeamInfoInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ TeamInfo received invalid data, defaulting to empty object.');

      data = {};
    }

    this.score = this.validateNumber(data.score, 0);
    this.name = this.validateString(data.name);
    this.consecutiveRoundLosses = this.validateNumber(data.consecutive_round_losses, 0);
    this.timeoutsRemaining = this.validateNumber(data.timeouts_remaining, 0);
    this.matchesWonThisSeries = this.validateNumber(data.matches_won_this_series, 0);
  }

  toSerializableObject(): TeamInfoInput {
    return {
      score: this.score,
      name: this.name,
      consecutive_round_losses: this.consecutiveRoundLosses,
      timeouts_remaining: this.timeoutsRemaining,
      matches_won_this_series: this.matchesWonThisSeries,
    }
  }
}


export interface MapInput {
  mode?: string;
  name?: string;
  phase?: string;
  round?: number;
  num_matches_to_win_series?: number;
  team_ct?: TeamInfoInput;
  team_t?: TeamInfoInput;
}

/**
 * Represents the current state of the map. */
export class Map extends ModelBase {
  public mode: GameMode;
  public name: string;
  public phase: Phase;
  public round: number;
  public numMatchesToWinSeries: number;

  public teamCT: TeamInfo;
  public teamT: TeamInfo;
  constructor(data: MapInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Map received invalid data, defaulting to empty object.');

      data = {};
    }

    this.mode = stringToGameMode(data.mode);
    this.name = this.validateString(data.name);
    this.phase = stringToPhase(data.phase);
    this.round = this.validateNumber(data.round, 0);
    this.numMatchesToWinSeries = this.validateNumber(data.num_matches_to_win_series, 0);

    this.teamCT = new TeamInfo(data.team_ct || {});
    this.teamT = new TeamInfo(data.team_t || {});
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
