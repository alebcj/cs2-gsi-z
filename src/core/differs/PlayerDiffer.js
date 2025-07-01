import { EVENTS } from '../../constants/events.js';
import { DifferBase } from './DifferBase.js';

export class PlayerDiffer extends DifferBase {
  constructor({ logger = null } = {}) {
    super();
    this.logger = (logger ?? { child: () => console }).child('PlayerDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares main changes in the player (team, activity, observer slot) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
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
