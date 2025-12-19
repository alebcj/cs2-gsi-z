import { EVENTS } from '../../constants/events';
import { STEAMID64 } from '../../constants/types';
import { AllPlayers } from '../../models/players/AllPlayers';
import { Vector3D } from '../../models/helpers/Vector3D';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface AllPlayersDifferOptions  {
  logger?: Logger | null;
}

export class AllPlayersDiffer extends DifferBase<AllPlayers> {
  protected logger: Logger | Console;

  constructor({ logger = null }: AllPlayersDifferOptions = {}) {
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
    if (!prev?.allPlayers && !curr?.allPlayers) return;

    const prevSteamids = prev.allPlayers.getAllSteamids();
    const currSteamids = curr.allPlayers.getAllSteamids();

    for (const steamid of prevSteamids) {
      if (!currSteamids.has(steamid)) {
        this.logger.log(`🔄 Player ${prev.allPlayers.getBySteamid(steamid)?.name} left the game.`);
        this.emitWithContext(emitter, EVENTS.allPlayers.left, steamid);
        this.emitWithContext(emitter, `${EVENTS.allPlayers.left}@${steamid}`);
      }
    }

    for (const steamid of currSteamids) {
      if (!prevSteamids.has(steamid)) {
        this.logger.log(`🔄 Player ${curr.allPlayers.getBySteamid(steamid)?.name} joined the game.`);
        this.emitWithContext(emitter, EVENTS.allPlayers.joined, steamid);
        this.emitWithContext(emitter, `${EVENTS.allPlayers.joined}@${steamid}`);
      }
    }

    let fields: {
        path: string;
        event: typeof EVENTS.allPlayers[keyof typeof EVENTS.allPlayers];
    }[] = [];

    const allSteamids = new Set([...currSteamids, ...prevSteamids]);

    for (const steamid of allSteamids) {
      fields.push(
        { path: `allPlayers.list.${steamid}.team`, event: EVENTS.allPlayers.teamChanged },
        { path: `allPlayers.list.${steamid}.observerSlot`, event: EVENTS.allPlayers.observerSlotChanged },
        { path: `allPlayers.list.${steamid}.position`, event: EVENTS.allPlayers.positionChanged },
        { path: `allPlayers.list.${steamid}.forward`, event: EVENTS.allPlayers.forwardDirectionChanged },
      );
    }

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      const steamid = path.split('.')[2] as STEAMID64;

      if (Vector3D.isVector3D(prevVal) && Vector3D.isVector3D(currVal)) {
        // Both are Vector3D, compare
        if (prevVal.x === currVal.x && prevVal.y === currVal.y && prevVal.z === currVal.z) {
          continue; // No change
        } else {
            this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
            this.emitWithContext(emitter, event, steamid, { previous: prevVal, current: currVal });
            this.emitWithContext(emitter, `${event}@${steamid}`, { previous: prevVal, current: currVal });
        }
      }

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, steamid, { previous: prevVal, current: currVal });
        this.emitWithContext(emitter, `${event}@${steamid}`, { previous: prevVal, current: currVal });
      }
    }
  }
}
