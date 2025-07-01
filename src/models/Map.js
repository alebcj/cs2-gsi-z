import { ModelBase } from "./ModelBase.js";

/**
 * Represents the information of a team (CT or T). */
export class TeamInfo extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ TeamInfo received invalid data, defaulting to empty object.');
      data = {};
    }

    this.score = this._validateNumber(data.score, 0);
    this.consecutiveRoundLosses = this._validateNumber(data.consecutive_round_losses, 0);
    this.timeoutsRemaining = this._validateNumber(data.timeouts_remaining, 0);
    this.matchesWonThisSeries = this._validateNumber(data.matches_won_this_series, 0);
  }

  _validateNumber(value, defaultValue = 0) {
    return (typeof value === 'number' && !isNaN(value)) ? value : defaultValue;
  }
}

/**
 * Represents the current state of the map. */
export class Map extends ModelBase {
  constructor(data = {}) {
    super(data);
    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Map received invalid data, defaulting to empty object.');
      data = {};
    }

    this.mode = this._validateString(data.mode, 'unknown');
    this.name = this._validateString(data.name, 'unknown');
    this.phase = this._validateString(data.phase, 'unknown');
    this.round = this._validateNumber(data.round, 0);
    this.numMatchesToWinSeries = this._validateNumber(data.num_matches_to_win_series, 0);

    this.teamCT = new TeamInfo(data.team_ct || {});
    this.teamT = new TeamInfo(data.team_t || {});
  }

  /* ------------------------ */
  /* Private internal methods */
  /* ------------------------ */

  _validateString(value, defaultValue = '') {
    return (typeof value === 'string' && value.trim() !== '') ? value : defaultValue;
  }

  _validateNumber(value, defaultValue = 0) {
    return (typeof value === 'number' && !isNaN(value)) ? value : defaultValue;
  }
}
