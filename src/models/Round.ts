import { Phase, stringToPhase } from '../constants/enums.js';
import { ModelBase } from './ModelBase.js';

export interface RoundInput {
  phase?: string;
  bomb?: string;
  win_team?: string;
}

/**
 * Represents the current state of the round. */
export class Round extends ModelBase {
  public phase: Phase;
  public bomb: string | null;
  public winner: string | null;

  constructor(data: RoundInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.phase = stringToPhase(data.phase); // E.g.: freezetime, live, over
    this.bomb = this.validateStringOrNull(data.bomb);        // E.g.: planted, exploded, defused
    this.winner = this.validateStringOrNull(data.win_team);  // E.g.: CT, T, null
  }

  toSerializableObject(): RoundInput {
    return {
      phase: this.phase,
      bomb: this.bomb ?? undefined,
      win_team: this.winner ?? undefined,
    }
  }
}
