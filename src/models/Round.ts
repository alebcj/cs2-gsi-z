import { ModelBase } from './ModelBase.js';

export interface RoundInput {
  phase?: string;
  bomb?: string;
  win_team?: string;
}

/**
 * Represents the current state of the round. */
export class Round extends ModelBase {
  public phase: string;
  public bomb: string | null;
  public winner: string | null;

  constructor(data: RoundInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.phase = this.validateString(data.phase, 'unknown'); // E.g.: freezetime, live, over
    this.bomb = this.validateStringOrNull(data.bomb);        // E.g.: planted, exploded, defused
    this.winner = this.validateStringOrNull(data.win_team);  // E.g.: CT, T, null
  }
}
