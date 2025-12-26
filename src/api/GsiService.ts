import { EventEmitter } from 'events';
import { GsiListener } from './GsiListener';
import { GsiUpdateHandler } from '../core/handlers/GsiUpdateHandler';
import { default_differs } from '../core/differs/default_differs';
import { DifferManager } from '../core/differs/DifferManager';
import { LEVELS, Logger } from '../utils/Logger';
import { EventMap } from '../constants/events';

export interface GsiServiceOptions {
  httpPort?: number;
  logger?: Logger | null;
}

/**
 * Main GSI service that coordinates all components for CS2 Game State Integration.
 * Handles HTTP listening, state management, and event emission.
 */
export class GsiService extends EventEmitter<EventMap> {
  private logger: Logger | Console;
  private httpPort: number;
  public readonly listener: GsiListener;
  private differManager: DifferManager;
  private updateHandler: GsiUpdateHandler;

  /**
   * Creates a new GsiService instance.
   * @param {Object} options - Configuration options
   * @param {number} [options.httpPort=3000] - Port for HTTP GSI listener
   * @param {Logger} [options.logger] - Custom logger instance
   */
  constructor({ httpPort = 3000, logger = null }: GsiServiceOptions = {}) {
    super();
    this.logger = (logger ?? new Logger({ level: LEVELS.INFO, showTimestamps: true })).child('GsiService');
    this.httpPort = httpPort;
    
    // Initialize components
    this.listener = this.createWithLogger(GsiListener, 'GsiListener');
    this.differManager = new DifferManager();

    // Register default differs
    default_differs.forEach(DifferClass => {
      // @ts-expect-error Easier than trying to figure this out i think
      let differInstance = this.createWithLogger(DifferClass, DifferClass.name);
      this.differManager.register(differInstance);
    });

    // Initialize update handler
    this.updateHandler = new GsiUpdateHandler({
      logger: this.logger.child('GsiUpdateHandler'),
      differManager: this.differManager,
      emitter: this
    });

    this.logger.log('GsiService instantiated correctly.');
  }

  /**
   * Starts the GSI service and begins listening for CS2 game state updates.
   */
  start() {
    this.logger.log('Starting GsiService...');
    this.listener.start(this.httpPort);

    // Handle incoming GSI updates
    this.listener.on('gsiUpdate', (rawJson) => {
      try {
        this.updateHandler.handle(rawJson);
      } catch (err) {
        this.logger.error('Error handling GSI update:', err);
      }
    });

    this.logger.log('GsiService started successfully.');
  }

  /**
   * Stops the GSI service and cleans up resources.
   */
  stop() {
    if (!this.listener) {
      this.logger.warn('Attempted to stop GsiService, but listener was not started.');
      return;
    }

    this.logger.log('Stopping GsiService...');
    this.listener.stop();
    this.logger.log('GsiService stopped.');
  }

  /**
   * Registers a callback to be called for any emitted event.
   * Useful for debugging or logging all events.
   * @param {Function} callback - Callback function that receives (eventName, ...args)
   */
  onAny(callback: (eventName: keyof EventMap, ...args: any[]) => any) {
    const originalEmit = this.emit;
    this.emit = function<EventMap>(eventName, ...args) {
      callback(eventName, ...args);
      return originalEmit.apply(this, [eventName, ...args]);
    };
  }

  /**
   * Creates an instance with logger injection.
   * @private
   * @param {Function} ClassRef - Class constructor to instantiate
   * @param {string} tag - Logger tag for the instance
   * @returns New instance with logger
   */
  private createWithLogger<T>(ClassRef: (new (...args: any) => T), tag: string) {
    return new ClassRef({ logger: this.logger instanceof Logger ? this.logger.child(tag) : undefined });
  }
}