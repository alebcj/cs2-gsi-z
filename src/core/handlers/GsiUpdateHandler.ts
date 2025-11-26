import { GsiParser } from "../parser/GsiParser.js";
import { applyDelta } from '../../utils/applyDelta.js';
import { Logger } from "../../utils/Logger.js";
import { GameStateManager } from "../gamestate/GameStateManager.js";
import { DifferManager } from "../differs/DifferManager.js";
import { EmitterContext } from "../differs/DifferBase.js";

interface GsiUpdateHandlerOptions {
  logger: Logger | null;
  stateManager: GameStateManager;
  differManager: DifferManager;
  emitter: EmitterContext;
}

export class GsiUpdateHandler {
  private logger: Logger | Console;
  private stateManager: GameStateManager;
  private differManager: DifferManager;
  private emitter: EmitterContext;

  constructor({ logger, stateManager, differManager, emitter }: GsiUpdateHandlerOptions) {
    this.logger = (logger ?? { child: (_: string) => console }).child('GsiUpdateHandler');
    this.stateManager = stateManager;
    this.differManager = differManager;
    this.emitter = emitter;

    this.logger.log('⚙️ instantiated correctly.');
  }

  handle(rawUpdate: Record<string, any>) {
    console.log("type this", rawUpdate);

    if (!rawUpdate) {
      this.logger.warn('⚠️ Empty GSI payload received.');

      return;
    }

    this.logger.log('🔔 GSI update received.');

    try {
      const parsedUpdate = new GsiParser(rawUpdate).parse();
      this.logger.log('🧩 State parsed.');

      const previousState = this.stateManager.getFullState();

      if (previousState?.player) {
        if (this.logger instanceof Logger) {
          this.logger.verbose('🔄 Previous complete state:');
          this.logger.verbose(JSON.stringify(previousState, null, 2));
        }

        applyDelta(parsedUpdate, rawUpdate.previously);

        if (this.logger instanceof Logger) {
          this.logger.verbose('🔁 State after applying delta:');
          this.logger.verbose(JSON.stringify(parsedUpdate, null, 2));
        }

        this.logger.log('🔀 Delta applied.');

        this.differManager.diff(previousState, parsedUpdate, {
          emit: (event, payload) => {
            this.logger.log(`🛎️ Event detected: ${event}`, payload);
            this.emitter.emit(event, payload);
          }
        }, {});
      }

      this.stateManager.setFullState(parsedUpdate);
      this.logger.log('📦 Snapshot updated in GameStateManager.');

    } catch (error) {
      this.logger.error('❌ Error processing GSI update:', error);
    }
  }
}
