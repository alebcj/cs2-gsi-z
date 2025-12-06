// src/utils/applyDelta.js

import { ModelBase } from "../models/ModelBase.js";

/**
 * Applies the "previously" block to the current game state,
 * reconstructing what the full previous state would have been.
 * Deep merge to avoid overwriting nested fields.
 * 
 * @param currentState - The current parsed state.
 * @param previously - The "previously" delta block from GSI, parsed.
 * @returns - The reconstructed state. */
export function applyDelta<T extends ModelBase>(currentState: T, previously: T) {
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
 * @param target - The object to apply the changes to.
 * @param source - The "previously" block changes. */
function deepMerge<T extends ModelBase>(target: T, source: Record<string, any>) {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key as keyof ModelBase];
    const targetValue = target[key as keyof ModelBase];

    if (
      typeof sourceValue === 'object' &&
      targetValue instanceof ModelBase
    ) {
      deepMerge(targetValue, sourceValue);
    } else {
      target[key as keyof ModelBase] = sourceValue as any;
    }
  }
}