import { Player } from '../../models/Player.js';
import { Map } from '../../models/Map.js';
import { Round } from '../../models/Round.js';
import { GameState } from './GameState.js';
import { Provider } from '../../models/Provider.js';
import { PhaseCountdowns } from '../../models/PhaseCountdowns.js';

/**
 * GameStateManager
 * No longer depends directly on GsiListener. */
export class GameStateManager {
  public provider: Provider;
  public map: Map;
  public round: Round;
  public phaseCountdowns: PhaseCountdowns;
  public player: Player;

  constructor() {
    this.provider = new Provider();
    this.map = new Map();
    this.round = new Round();
    this.phaseCountdowns = new PhaseCountdowns();
    this.player = new Player();
  }

  /**
   * Updates the entire state using a new complete GameState.
   * @param {GameState} gameState */
  setFullState(gameState: GameState) {
    if (!gameState) return;

    this.provider = gameState.provider ?? new Provider();
    this.map = gameState.map ?? new Map();
    this.round = gameState.round ?? new Round();
    this.phaseCountdowns = gameState.phaseCountdowns ?? new PhaseCountdowns();
    this.player = gameState.player ?? new Player();
  }

  /**
   * Returns the current snapshot as an object. */
  getFullState(): GameState {
    return new GameState({
      provider: this.provider,
      map: this.map,
      round: this.round,
      phase_countdowns: this.phaseCountdowns,
      player: this.player,
    });
  }

  /**
   * Clears the current state (optional, to fully reset). */
  reset() {
    this.provider = new Provider();
    this.map = new Map();
    this.round = new Round();
    this.phaseCountdowns = new PhaseCountdowns();
    this.player = new Player();
  }
}
