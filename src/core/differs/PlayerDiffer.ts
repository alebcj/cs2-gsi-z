import { EVENTS } from '../../constants/events.js';
import { Player } from '../../models/Player.js';
import { Logger } from '../../utils/Logger.js';
import { GameState } from '../gamestate/GameState.js';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase.js';

export interface PlayerDifferOptions  {
  logger?: Logger | null;
}

export class PlayerDiffer extends DifferBase<Player> {
  protected logger: Logger | Console;

  constructor({ logger = null }: PlayerDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('PlayerDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares main changes in the player (team, activity, observer slot) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (!prev?.player && !curr?.player) return;

    const fields = [
      { path: 'player.team', event: EVENTS.player.teamChanged },
      { path: 'player.activity', event: EVENTS.player.activityChanged },
      { path: 'player.observerSlot', event: EVENTS.player.observerSlotChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previously: prevVal, current: currVal }, 'player');
      }
    }
  }
}
