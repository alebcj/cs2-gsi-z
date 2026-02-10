import { EVENTS } from '../../constants/events';
import { Vector3D } from '../../models/helpers/Vector3D';
import { Player } from '../../models/players/Player';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

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
      { path: 'player.name', event: EVENTS.player.nameChanged },
      { path: 'player.clan', event: EVENTS.player.clanChanged },
      { path: 'player.xpOverloadLevel', event: EVENTS.player.xpOverloadLevelChanged },
      { path: 'player.steamid', event: EVENTS.player.steamidChanged },
      { path: 'player.team', event: EVENTS.player.teamChanged },
      { path: 'player.activity', event: EVENTS.player.activityChanged },
      { path: 'player.observerSlot', event: EVENTS.player.observerSlotChanged },
      { path: 'player.specTarget', event: EVENTS.player.specTargetChanged },
      { path: 'player.position', event: EVENTS.player.positionChanged },
      { path: 'player.forward', event: EVENTS.player.forwardDirectionChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (Vector3D.isVector3D(prevVal) && Vector3D.isVector3D(currVal)) {
        // Both are Vector3D, compare
        if (prevVal.x === currVal.x && prevVal.y === currVal.y && prevVal.z === currVal.z) {
          continue; // No change
        }
      }

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previous: prevVal, current: currVal });
      }
    }
  }
}
