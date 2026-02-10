import { CountdownPhase, stringToCountdownPhase, } from '../constants/enums';
import { ModelBase } from './ModelBase';

export interface PhaseCountdownsInput {
  phase?: string;
  phase_ends_in?: string;
}

/**
 * Represents the current state of the round. */
export class PhaseCountdowns extends ModelBase {
  public readonly phase: CountdownPhase;
  public readonly phaseEndsIn: string | null;

  constructor(data: PhaseCountdownsInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.phase = stringToCountdownPhase(data.phase); // E.g.: freezetime, live, over
    this.phaseEndsIn = this.validateStringOrNull(data.phase_ends_in); // E.g.: minutes, seconds
  }

  toSerializableObject(): PhaseCountdownsInput {
    return {
      phase: this.phase,
      phase_ends_in: this.phaseEndsIn ?? undefined,
    }
  }
}
