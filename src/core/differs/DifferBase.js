export class DifferBase {
  constructor(previously = {}, added = {}) {
    this.previously = previously;
    this.added = added;
  }

  emitWithContext(emitter, eventName, data, entity = null) {
    emitter.emit(eventName, {
      ...data,
      previouslyBlock: entity ? (this.previously?.[entity] ?? {}) : this.previously,
      addedBlock: entity ? (this.added?.[entity] ?? {}) : this.added,
    });
  }

  /**
   * 🔥 Safely obtains a field from `curr`, or if it doesn't exist, from `fallback`.
   * @param {string} path E.g.: 'player.state.hp'
   * @param {Object} curr Current snapshot
   * @param {Object} fallback Fallback snapshot (added or previously)
   * @returns {any} Value found or null */
  getFieldSafe(path, curr, fallback) {
    const parts = path.split('.');

    let value = curr;
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null) return value;

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
}
