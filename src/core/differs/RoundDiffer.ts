import { EVENTS } from '../../constants/events.js';
import { Round } from '../../models/Round.js';
import { Logger } from '../../utils/Logger.js';
import { GameState } from '../gamestate/GameState.js';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase.js';

export interface RoundDifferOptions {
  logger?: Logger | null;
}

export class RoundDiffer extends DifferBase<Round> {
  protected logger: Logger | Console;

  constructor({ logger = null }: RoundDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('RoundDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the round state (phase, win_team, bomb) and emits corresponding events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (!prev?.round && !curr?.round) return;

    const prevPhase = this.getFieldSafe('round.phase', prev, this.previously);
    const currPhase = this.getFieldSafe('round.phase', curr, this.added);

    if (prevPhase !== currPhase) {
      this.logger.log(`🔁 Change of phase: ${prevPhase} → ${currPhase}`);
      this.emitWithContext(emitter, EVENTS.round.phaseChanged, { previously: prevPhase, current: currPhase }, 'round');

      if (currPhase === 'freezetime') {
        this.logger.log('🚀 Round starts (freezetime).');
        this.emitWithContext(emitter, EVENTS.round.started, {}, 'round');
      }
    }

    const prevWinTeam = this.getFieldSafe('round.win_team', prev, this.previously);
    const currWinTeam = this.getFieldSafe('round.win_team', curr, this.added);

    if (prevWinTeam !== currWinTeam) {
      this.logger.log(`🏆 Change of win_team: ${prevWinTeam} → ${currWinTeam}`);
      this.emitWithContext(emitter, EVENTS.round.won, { previously: prevWinTeam, current: currWinTeam }, 'round');
      this.emitWithContext(emitter, EVENTS.round.ended, { winner: currWinTeam }, 'round');
    }

    const prevRoundNumber = this.getFieldSafe('round.round', prev, this.previously);
    const currRoundNumber = this.getFieldSafe('round.round', curr, this.added);

    if (prevRoundNumber !== currRoundNumber) {
      this.logger.log(`🔢 Change of round number: ${prevRoundNumber} → ${currRoundNumber}`);
      this.emitWithContext(emitter, EVENTS.map.roundChanged, { previously: prevRoundNumber, current: currRoundNumber }, 'map');
    }
    
    // @ts-expect-error
    if (options.added?.round?.bomb === true) {
      this.logger.log('💣 Bomb planting started.');
      this.emitWithContext(emitter, EVENTS.round.bombPlantingStarted, {}, 'round');
    }

    const prevBomb = this.getFieldSafe('round.bomb', prev, this.previously);
    const currBomb = this.getFieldSafe('round.bomb', curr, this.added);

    if (prevBomb !== currBomb) {
      if (currBomb === 'planted') {
        this.logger.log('💥 Bomb planted.');
        this.emitWithContext(emitter, EVENTS.round.bombPlanted, {}, 'round');
      } else if (!currBomb) {
        this.logger.log('❌ Bomb plant attempt failed.');
        this.emitWithContext(emitter, EVENTS.round.bombPlantFake, {}, 'round');
      }
    }
  }
}
