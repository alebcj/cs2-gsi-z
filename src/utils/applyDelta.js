// src/utils/applyDelta.js

/**
 * Applies the "previously" block to the current game state,
 * reconstructing what the full previous state would have been.
 * Deep merge to avoid overwriting nested fields.
 * 
 * @param {object} currentState - The current parsed state.
 * @param {object} previously - The "previously" delta block from GSI.
 * @returns {object} - The reconstructed state. */
export function applyDelta(currentState, previously) {
  if (!previously || typeof previously !== 'object') {
    return currentState;
  }

  deepMerge(currentState, previously);
  return currentState;
}

/**
 * Deeply merges source object into target object.
 * Recursively updates only the fields present in source.
 * 
 * @param {object} target - The object to apply the changes to.
 * @param {object} source - The "previously" block changes. */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      isObject(sourceValue) &&
      isObject(targetValue)
    ) {
      deepMerge(targetValue, sourceValue);
    } else {
      target[key] = sourceValue;
    }
  }
}

/**
 * Checks if a value is a non-null object (and not an array).
 * 
 * @param {any} value 
 * @returns {boolean} */
function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
