import { EventEmitter } from 'events';
import { GsiListener } from './GsiListener.js';
import { GameStateManager } from '../core/gamestate/GameStateManager.js';
import { GsiUpdateHandler } from '../core/handlers/GsiUpdateHandler.js';
import { default_differs } from '../core/differs/default_differs.js';
import { DifferManager } from '../core/differs/DifferManager.js';
import { Logger } from '../utils/Logger.js';

/**
 * Main GSI service that coordinates all components for CS2 Game State Integration.
 * Handles HTTP listening, state management, and event emission.
 */
export class GsiService extends EventEmitter {
  /**
   * Creates a new GsiService instance.
   * @param {Object} options - Configuration options
   * @param {number} [options.httpPort=3000] - Port for HTTP GSI listener
   * @param {Logger} [options.logger] - Custom logger instance
   */
  constructor({ httpPort = 3000, logger = null } = {}) {
    super();
    this.logger = (logger ?? new Logger({ level: 'info', showTimestamps: true })).child('GsiService');
    this.httpPort = httpPort;
    
    // Initialize components
    this.listener = this._createWithLogger(GsiListener, 'GsiListener');
    this.stateManager = new GameStateManager();
    this.differManager = new DifferManager();

    // Register default differs
    default_differs.forEach(DifferClass => {
      const differInstance = this._createWithLogger(DifferClass, DifferClass.name);
      this.differManager.register(differInstance);
    });

    // Initialize update handler
    this.updateHandler = new GsiUpdateHandler({
      logger: this.logger.child('GsiUpdateHandler'),
      stateManager: this.stateManager,
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
  onAny(callback) {
    const originalEmit = this.emit;
    this.emit = function(eventName, ...args) {
      callback(eventName, ...args);
      return originalEmit.apply(this, arguments);
    };
  }

  /**
   * Returns the current game state snapshot.
   * @returns {Object} Current game state containing player, map, and round data
   */
  getSnapshot() {
    return this.stateManager.getFullState();
  }

  /**
   * Creates an instance with logger injection.
   * @private
   * @param {Function} ClassRef - Class constructor to instantiate
   * @param {string} tag - Logger tag for the instance
   * @returns {Object} New instance with logger
   */
  _createWithLogger(ClassRef, tag) {
    return new ClassRef({ logger: this.logger.child(tag) });
  }
}