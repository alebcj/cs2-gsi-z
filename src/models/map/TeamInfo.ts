import { ModelBase } from "../ModelBase";

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
  public readonly score: number;
  public readonly name: string;
  public readonly consecutiveRoundLosses: number;
  public readonly timeoutsRemaining: number;
  public readonly matchesWonThisSeries: number;

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
