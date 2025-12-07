/**
 * Base class for all models (Player, Map, Round, etc.).
 * Adds serialization, cloning, and automatic comparison. */
export class ModelBase {
    toJSON(): string {
      const result = {};

      for (const key of Object.keys(this)) {
        const value = this[key];
        if (value && typeof value.toSerializableObject === 'function') {
          result[key] = value.toSerializableObject();
        } else {
          result[key] = value;
        }
      }

      return JSON.stringify(result);
    }

    toSerializableObject() {
      const result = {};

      for (const key of Object.keys(this)) {
        const value = this[key];
        if (value && typeof value.toSerializableObject === 'function') {
          result[key] = value.toSerializableObject();
        } else {
          result[key] = value;
        }
      }

      return result;
    }
  
    clone() {
      return this.fromJSON(this.toJSON());
    }
  
    equals(other: ModelBase) {
      if (!other) {
        return false;
      }

      if (this.constructor !== other.constructor) {
        return false;
      }

      return this.toJSON() === other.toJSON();
    }
  
    fromJSON(json: string): ModelBase {
      return this.constructor(JSON.parse(json));
    }

    protected validateString(value): string | 'unknown' {
      return (typeof value === 'string' && value.trim() !== '') ? value : "unknown";
    }

    protected validateStringOrNull(value) {
      return (typeof value === 'string' && value.trim() !== '') ? value : null;
    }

    protected validateNumberOrZero(value) {
      return (typeof value === 'number' && !isNaN(value)) ? value : 0;
    }

    protected validateNumberOrNull(value) {
      return (typeof value === 'number' && !isNaN(value)) ? value : null;
    }

    protected validateNumber(value, defaultValue = 0) {
      return (typeof value === 'number' && !isNaN(value)) ? value : defaultValue;
    }
}
