import { EVENTS } from '../../constants/events.js';
import { DifferBase } from './DifferBase.js';

export class MapDiffer extends DifferBase {
  constructor({ logger = null } = {}) {
    super();
    this.logger = (logger ?? { child: () => console }).child('MapDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the map (name, phase, current round, team scores) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev, curr, emitter, options = {}) {
    if (!prev?.map && !curr?.map) return;

    const fields = [
      { path: 'map.name', event: EVENTS.map.nameChanged },
      { path: 'map.phase', event: EVENTS.map.phaseChanged },
      { path: 'map.round', event: EVENTS.map.roundChanged },
      { path: 'map.team_ct.score', event: EVENTS.map.teamCTScoreChanged },
      { path: 'map.team_t.score', event: EVENTS.map.teamTScoreChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🗺️ Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previously: prevVal, current: currVal }, 'map');
      }
    }
  }
}
