import { EVENTS } from '../../constants/events';
import { RoundWins } from '../../models/map/RoundWins';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface RoundWinsDifferOptions  {
  logger?: Logger | null;
}

export class RoundWinsDiffer extends DifferBase<RoundWins> {
  protected logger: Logger | Console;

  constructor({ logger = null }: RoundWinsDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('RoundWinsDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the round wins (list) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (!prev?.map?.roundWins && !curr?.map?.roundWins) return;

    const fields = [
      { path: 'map.roundWins.list', event: EVENTS.map.roundWinsChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal.length !== currVal.length) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previous: prevVal, current: currVal });
      }
    }
  }
}
