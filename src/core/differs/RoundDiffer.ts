import { RoundPhase } from '../../constants/enums';
import { EVENTS } from '../../constants/events';
import { Round } from '../../models/Round';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

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

    const prevPhase = this.getFieldSafe('round.phase', prev, this.previously) as RoundPhase;
    const currPhase = this.getFieldSafe('round.phase', curr, this.added) as RoundPhase;

    if (prevPhase !== currPhase) {
      this.logger.log(`🔁 Change of phase: ${prevPhase} → ${currPhase}`);
      this.emitWithContext(emitter, EVENTS.round.phaseChanged, { previous: prevPhase, current: currPhase });

      if (currPhase === RoundPhase.Freezetime) {
        this.logger.log('🚀 Round starts (freezetime).');
        this.emitWithContext(emitter, EVENTS.round.started);
      }
    }

    const prevWinTeam = this.getFieldSafe('round.win_team', prev, this.previously);
    const currWinTeam = this.getFieldSafe('round.win_team', curr, this.added);

    if (prevWinTeam !== currWinTeam) {
      this.logger.log(`🏆 Change of win_team: ${prevWinTeam} → ${currWinTeam}`);
      this.emitWithContext(emitter, EVENTS.round.won, { previous: prevWinTeam, current: currWinTeam });
      this.emitWithContext(emitter, EVENTS.round.ended, { winner: currWinTeam });
    }

    const prevRoundNumber = this.getFieldSafe('round.round', prev, this.previously);
    const currRoundNumber = this.getFieldSafe('round.round', curr, this.added);

    if (prevRoundNumber !== currRoundNumber) {
      this.logger.log(`🔢 Change of round number: ${prevRoundNumber} → ${currRoundNumber}`);
      this.emitWithContext(emitter, EVENTS.map.roundChanged, { previous: prevRoundNumber, current: currRoundNumber });
    }
    
    // // @ts-expect-error
    // if (options.added?.round?.bomb === true) {
    //   this.logger.log('💣 Bomb planting started.');
    //   this.emitWithContext(emitter, EVENTS.round.bombPlantingStarted, {});
    // }

    // const prevBomb = this.getFieldSafe('round.bomb', prev, this.previously);
    // const currBomb = this.getFieldSafe('round.bomb', curr, this.added);

    // if (prevBomb !== currBomb) {
    //   if (currBomb === 'planted') {
    //     this.logger.log('💥 Bomb planted.');
    //     this.emitWithContext(emitter, EVENTS.round.bombPlanted, {});
    //   } else if (!currBomb) {
    //     this.logger.log('❌ Bomb plant attempt failed.');
    //     this.emitWithContext(emitter, EVENTS.round.bombPlantFake, {});
    //   }
    // }
  }
}
