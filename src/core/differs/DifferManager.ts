import { ModelBase } from "../../models/ModelBase.js";
import { GameState } from "../gamestate/GameState.js";
import { DifferBase, DiffOptions, EmitterContext } from "./DifferBase.js";

export class DifferManager {
  public differs: DifferBase<ModelBase>[] = [];

  /**
   * Registers a differ to be used later.
   * @param {DifferBase} differ */
  register(differ: DifferBase<ModelBase>) {
    this.differs.push(differ);
  }

  /**
   * Executes all registered differs.
   * @param {GameState} previousState 
   * @param {GameState} currentState 
   * @param {Object} emitterContext 
   * @param {Object} [options] Optional: { previously, added } */
  diff(previousState: GameState, currentState: GameState, emitterContext: EmitterContext, options: DiffOptions) {
    for (const differ of this.differs) {
      differ.diff(previousState, currentState, emitterContext, options);
    }
  }
}
