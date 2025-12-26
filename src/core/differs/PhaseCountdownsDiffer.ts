import { EVENTS } from '../../constants/events';
import { PhaseCountdowns } from '../../models/PhaseCountdowns';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface PhaseCountdownsDifferOptions  {
  logger?: Logger | null;
}

export class PhaseCountdownsDiffer extends DifferBase<PhaseCountdowns> {
  protected logger: Logger | Console;

  constructor({ logger = null }: PhaseCountdownsDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('PhaseCountdownsDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares main changes in the phase countdowns object (phase, phaseEndsIn) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (!prev?.phaseCountdowns && !curr?.phaseCountdowns) return;

    const fields = [
      { path: 'phaseCountdowns.phase', event: EVENTS.phaseCountdowns.phaseChanged },
      { path: 'phaseCountdowns.phaseEndsIn', event: EVENTS.phaseCountdowns.phaseEndsInChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previous: prevVal, current: currVal });
      }
    }
  }
}
