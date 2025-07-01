/**
 * Base class for all models (Player, Map, Round, etc.).
 * Adds serialization, cloning, and automatic comparison. */
export class ModelBase {
    toJSON() {
      const result = {};
      for (const key of Object.keys(this)) {
        const value = this[key];
        if (value && typeof value.toJSON === 'function') {
          result[key] = value.toJSON();
        } else {
          result[key] = value;
        }
      }
      return result;
    }
  
    clone() {
      return new this.constructor(this.toJSON());
    }
  
    equals(other) {
      if (!other) return false;
      if (this.constructor !== other.constructor) return false;
      return JSON.stringify(this.toJSON()) === JSON.stringify(other.toJSON());
    }
  
    static fromJSON(json) {
      return new this(json);
    }
}
