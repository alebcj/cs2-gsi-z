import { EVENTS } from '../../constants/events';
import { Map } from '../../models/map/Map';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface MapDifferOptions {
  logger?: Logger | null;
}

export class MapDiffer extends DifferBase<Map> {
  protected logger: Logger | Console;

  constructor({ logger = null }: MapDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('MapDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the map (name, phase, current round, team scores) and emits events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (!prev?.map && !curr?.map) return;

    const fields = [
      { path: 'map.name', event: EVENTS.map.nameChanged },
      { path: 'map.phase', event: EVENTS.map.phaseChanged },
      { path: 'map.round', event: EVENTS.map.roundChanged },
      { path: 'map.team_ct.score', event: EVENTS.map.teamCTScoreChanged },
      { path: 'map.team_t.score', event: EVENTS.map.teamTScoreChanged },
      { path: 'map.current_spectators', event: EVENTS.map.currentSpectatorsChanged },
      { path: 'map.souvenirs_total', event: EVENTS.map.souvenirsTotalChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🗺️ Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previous: prevVal, current: currVal });
      }
    }
  }
}
