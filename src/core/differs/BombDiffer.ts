import { EVENTS } from '../../constants/events';
import { Bomb } from '../../models/Bomb';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface BombDifferOptions  {
  logger?: Logger | null;
}

export class BombDiffer extends DifferBase<Bomb> {
  protected logger: Logger | Console;

  constructor({ logger = null }: BombDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('BombDiffer');
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
    if (!prev?.bomb && !curr?.bomb) return;

    const fields = [
      { path: 'bomb.state', event: EVENTS.bomb.stateChanged },
      { path: 'bomb.position', event: EVENTS.bomb.positionChanged },
      { path: 'bomb.player', event: EVENTS.bomb.playerChanged },
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
