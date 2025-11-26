import { Player } from '../../models/Player.js';
import { Map } from '../../models/Map.js';
import { Round } from '../../models/Round.js';
import { GameState } from './GameState.js';

/**
 * GameStateManager
 * Keeps the Player, Map, and Round state alive and updated.
 * No longer depends directly on GsiListener. */
export class GameStateManager {
  public player: Player;
  public map: Map;
  public round: Round;

  constructor() {
    this.player = new Player();
    this.map = new Map();
    this.round = new Round();
  }

  /**
   * Updates the entire state using a new complete GameState.
   * @param {GameState} gameState */
  setFullState(gameState: GameState) {
    if (!gameState) return;

    this.player = gameState.player ?? new Player();
    this.map = gameState.map ?? new Map();
    this.round = gameState.round ?? new Round();
  }

  /**
   * Returns the current snapshot as an object. */
  getFullState(): GameState {
    return new GameState({
      player: this.player,
      map: this.map,
      round: this.round
    });
  }

  /**
   * Clears the current state (optional, to fully reset). */
  reset() {
    this.player = new Player();
    this.map = new Map();
    this.round = new Round();
  }
}
