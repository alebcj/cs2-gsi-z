import { EVENTS } from '../../constants/events.js';
import { DifferBase } from './DifferBase.js';

export class PlayerStateDiffer extends DifferBase {
  constructor({ logger = null } = {}) {
    super();
    this.logger = (logger ?? { child: () => console }).child('PlayerStateDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the player's internal state (health, armor, money, etc.) and emits corresponding events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    if (!prev?.player && !curr?.player) return;

    const fields = [
      { path: 'player.state.health', event: EVENTS.player.hpChanged },
      { path: 'player.state.armor', event: EVENTS.player.armorChanged },
      { path: 'player.state.helmet', event: EVENTS.player.helmetChanged },
      { path: 'player.state.money', event: EVENTS.player.moneyChanged },
      { path: 'player.state.flashed', event: EVENTS.player.flashedChanged },
      { path: 'player.state.smoked', event: EVENTS.player.smokedChanged },
      { path: 'player.state.burning', event: EVENTS.player.burningChanged },
      { path: 'player.state.equipValue', event: EVENTS.player.equipValueChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previousus: prevVal, current: currVal }, 'player');
      }
    }

    const prevMoney = this.getFieldSafe('player.state.money', prev, this.previously);
    const currMoney = this.getFieldSafe('player.state.money', curr, this.added);

    if (currMoney !== null && prevMoney !== null && currMoney > prevMoney) {
      const earned = currMoney - prevMoney;
      this.logger.log(`💵 Money earned: +${earned}`);
      this.emitWithContext(emitter, EVENTS.player.moneyEarned, { earned }, 'player');
    }
  }
}
