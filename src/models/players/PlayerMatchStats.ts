/**
 * Match statistics for the player. */
import { ModelBase } from '../ModelBase';

export interface PlayerMatchStatsInput {
  kills?: number;
  assists?: number;
  deaths?: number;
  mvps?: number;
  score?: number;
}

export class PlayerMatchStats extends ModelBase {
  public readonly kills: number;
  public readonly assists: number;
  public readonly deaths: number;
  public readonly mvps: number;
  public readonly score: number;

  constructor(data: PlayerMatchStatsInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ PlayerMatchStats received invalid data, defaulting to empty object.');

      data = {};
    }

    this.kills = this.validateNumberOrZero(data.kills);
    this.assists = this.validateNumberOrZero(data.assists);
    this.deaths = this.validateNumberOrZero(data.deaths);
    this.mvps = this.validateNumberOrZero(data.mvps);
    this.score = this.validateNumberOrZero(data.score);
  }

  public kda() {
    return this.deaths > 0 ? ((this.kills + this.assists) / this.deaths).toFixed(2) : '∞';
  }

  toSerializableObject(): PlayerMatchStatsInput {
    return {
      kills: this.kills,
      assists: this.assists,
      deaths: this.deaths,
      mvps: this.mvps,
      score: this.score,
    }
  }
}
