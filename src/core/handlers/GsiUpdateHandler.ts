import { applyDelta } from '../../utils/applyDelta';
import { Logger } from "../../utils/Logger";
import { DifferManager } from "../differs/DifferManager";
import { EmitterContext } from "../differs/DifferBase";
import { GameState, GameStateInput } from "../gamestate/GameState";

interface GsiUpdateHandlerOptions {
  logger: Logger | null;
  differManager: DifferManager;
  emitter: EmitterContext;
}

export class GsiUpdateHandler {
  private logger: Logger | Console;
  private differManager: DifferManager;
  public lastState: GameState = new GameState({});
  private emitter: EmitterContext;

  constructor({ logger, differManager, emitter }: GsiUpdateHandlerOptions) {
    this.logger = (logger ?? { child: (_: string) => console }).child('GsiUpdateHandler');
    this.differManager = differManager;
    this.emitter = emitter;

    this.logger.log('⚙️ instantiated correctly.');
  }

  handle(rawUpdate: GameStateInput) {
    if (!rawUpdate) {
      this.logger.warn('⚠️ Empty GSI payload received.');

      return;
    }

    this.logger.log('🔔 GSI update received.');

    try {
      const previousState = this.lastState.toSerializableObject();

        if (this.logger instanceof Logger) {
          this.logger.verbose('🔄 Previous complete state:');
          this.logger.verbose(JSON.stringify(previousState, null, 2));
        }

        applyDelta<GameStateInput>(rawUpdate, previousState);

        if (this.logger instanceof Logger) {
          this.logger.verbose('🔁 State after applying delta:');
          this.logger.verbose(JSON.stringify(rawUpdate, null, 2));
        }

        this.logger.log('🔀 Delta applied.');

        const newState = new GameState(rawUpdate);

        this.differManager.diff(this.lastState, newState, this.emitter, {});

        this.lastState = newState;
    } catch (error) {
      this.logger.error('❌ Error processing GSI update:', error);
    }
  }
}
