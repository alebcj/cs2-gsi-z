import { RoundPhase, StableBombState, stringToRoundPhase, stringToStableBombState, stringToTeam, Team } from '../constants/enums';
import { ModelBase } from './ModelBase';

export interface RoundInput {
  phase?: string;
  bomb?: string;
  win_team?: string;
}

/**
 * Represents the current state of the round. */
export class Round extends ModelBase {
  public readonly phase: RoundPhase;
  public readonly bomb: StableBombState | null;
  public readonly winner: Team | null;

  constructor(data: RoundInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.phase = stringToRoundPhase(data.phase); // E.g.: freezetime, live, over
    this.bomb = data.bomb ? stringToStableBombState(data.bomb) : null;        // E.g.: planted, exploded, defused
    this.winner = data.win_team ? stringToTeam(data.win_team) : null;  // E.g.: CT, T, null
  }

  toSerializableObject(): RoundInput {
    return {
      phase: this.phase,
      bomb: this.bomb ?? undefined,
      win_team: this.winner ?? undefined,
    }
  }
}
