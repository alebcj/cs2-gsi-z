import { EventEmitter } from 'events';
import { ModelBase } from "../../models/ModelBase";
import { GameState } from '../gamestate/GameState';

export interface EmitterContext {
  emit: (eventName: string, ...args: any[]) => any
}
export interface DiffOptions {
  previously?: ModelBase;
  added?: ModelBase;
}

export abstract class DifferBase<T extends ModelBase> {
  protected previously: GameState | null;
  protected added: GameState | null;

  constructor(previously?: GameState, added?: GameState) {
    this.previously = previously ?? null;
    this.added = added ?? null;
  }

  emitWithContext(emitter: EmitterContext, eventName: string, data: any, entity: string | null = null) {
    emitter.emit(eventName, {
      ...data.toSerializableObject(),
      previouslyBlock: entity ? (this.previously?.[entity as keyof GameState] ?? {}) : this.previously,
      addedBlock: entity ? (this.added?.[entity as keyof GameState] ?? {}) : this.added,
    });
  }

  /**
   * 🔥 Safely obtains a field from `curr`, or if it doesn't exist, from `fallback`.
   * @param {string} path E.g.: 'player.state.hp'
   * @param {Object} curr Current snapshot
   * @param {Object} fallback Fallback snapshot (added or previously)
   * @returns {any} Value found or null */
  getFieldSafe(path: string, curr: GameState, fallback: GameState | null) {
    const parts = path.split('.');

    let value: any = curr;
    for (const part of parts) {
      if (value && value[part as keyof ModelBase] !== undefined) {
        value = value[part as keyof ModelBase];
      } else {
        value = null;
        break;
      }
    }

    if (fallback === null || value !== null) return value;

    value = fallback;
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        return null;
      }
    }

    return value;
  }

  public abstract diff(previousState: GameState, currentState: GameState, emitterContext: EmitterContext, options: DiffOptions): any;
}
