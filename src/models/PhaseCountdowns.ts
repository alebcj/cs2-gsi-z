import { Phase, stringToPhase } from '../constants/enums.js';
import { ModelBase } from './ModelBase.js';

export interface PhaseCountdownsInput {
  phase?: string;
  phase_ends_in?: string;
}

/**
 * Represents the current state of the round. */
export class PhaseCountdowns extends ModelBase {
  public phase: Phase;
  public phaseEndsIn: string | null;

  constructor(data: PhaseCountdownsInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.phase = stringToPhase(data.phase); // E.g.: freezetime, live, over
    this.phaseEndsIn = this.validateStringOrNull(data.phase_ends_in); // E.g.: minutes, seconds
  }
}
