import {
  comparisonDataVector3D,
  EventMap,
  EVENTS,
} from "../../constants/events";
import { GRENADEID } from "../../constants/types";
import { GrenadeList } from "../../models/grenades/GrenadeList";
import { Vector3D } from "../../models/helpers/Vector3D";
import { Logger } from "../../utils/Logger";
import { GameState } from "../gamestate/GameState";
import { DifferBase, DiffOptions, EmitterContext } from "./DifferBase";

export interface GrenadesDifferOptions {
  logger?: Logger | null;
}

export class GrenadesDiffer extends DifferBase<GrenadeList> {
  protected logger: Logger | Console;

  constructor({ logger = null }: GrenadesDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child(
      "GrenadesDiffer"
    );
    this.logger.log("⚙️ instantiated correctly.");
  }

  /**
   * Compares main changes in the grenades object and emits events.
   *
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(
    prev: GameState,
    curr: GameState,
    emitter: EmitterContext,
    options: DiffOptions = {}
  ) {
    if (!prev?.grenades && !curr?.grenades) return;

    for (const [id, grenade] of Object.entries(curr.grenades.list)) {
      const prevGrenade = Object.entries(prev.grenades.list).find(
        ([k, v]) => k === id
      )?.[1];

      if (!prevGrenade) {
        this.logger.log(`🔄 Grenade ${id} thrown.`);
        this.emitWithContext(
          emitter,
          EVENTS.grenades.existenceChanged,
          id as GRENADEID,
          {
            previous: null,
            current: grenade,
          }
        );
        this.emitWithContext(
          emitter,
          `${EVENTS.grenades.existenceChanged}@${+id}`,
          {
            previous: null,
            current: grenade,
          }
        );

        continue;
      }
    }

    for (const [id, grenade] of Object.entries(prev.grenades.list)) {
      const prevGrenade = Object.entries(curr.grenades.list).find(
        ([k, v]) => k === id
      )?.[1];

      if (!prevGrenade) {
        this.logger.log(`🔄 Grenade ${id} is gone.`);
        this.emitWithContext(
          emitter,
          EVENTS.grenades.existenceChanged,
          id as GRENADEID,
          {
            previous: grenade,
            current: null,
          }
        );
        this.emitWithContext(
          emitter,
          `${EVENTS.grenades.existenceChanged}@${+id}`,
          {
            previous: grenade,
            current: null,
          }
        );

        continue;
      }
    }

    const allIds = new Set<string>([
      ...Object.keys(prev.grenades.list),
      ...Object.keys(curr.grenades.list),
    ]);

    const fields: { path: string; event: typeof EVENTS.grenades[keyof typeof EVENTS.grenades] }[] = [];

    for (const id of allIds) {
      fields.push({
        path: `grenades.list.${id}.position`,
        event: EVENTS.grenades.positionChanged,
      });
      fields.push({
        path: `grenades.list.${id}.velocity`,
        event: EVENTS.grenades.velocityChanged,
      });
      fields.push({
        path: `grenades.list.${id}.lifetime`,
        event: EVENTS.grenades.lifetimeChanged,
      });
      fields.push({
        path: `grenades.list.${id}.effecttime`,
        event: EVENTS.grenades.effectTimeChanged,
      });
      fields.push({
        path: `grenades.list.${id}.flames`,
        event: EVENTS.grenades.flamesChanged,
      });
    }

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      const id = path.split(".")[2];

      if (
        event === EVENTS.grenades.flamesChanged &&
        Array.isArray(prevVal) &&
        Array.isArray(currVal)
      ) {
        const prevFlames = prevVal.length;
        const currFlames = currVal.length;

        if (prevFlames !== currFlames) {
          this.logger.log(
            `🔄 Change in ${path}: ${prevFlames} → ${currFlames}`
          );
          this.emitWithContext(emitter, event, id as GRENADEID, {
            previous: prevVal,
            current: currVal,
          });
          this.emitWithContext(
            emitter,
            `${event}@${+id}`,
            {
              previous: prevVal,
              current: currVal,
            }
          );

          continue;
        }
      }

      if (prevVal instanceof Vector3D || currVal instanceof Vector3D) {
        if (
          prevVal instanceof Vector3D &&
          currVal instanceof Vector3D &&
          (prevVal.x !== currVal.x ||
            prevVal.y !== currVal.y ||
            prevVal.z !== currVal.z)
        ) {
          this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
          this.emitWithContext(
            emitter,
            event,
            id as GRENADEID,
            {
              previous: prevVal,
              current: currVal,
            } as comparisonDataVector3D
          );
          this.emitWithContext(
            emitter,
            `${event}@${+id}`,
            {
              previous: prevVal,
              current: currVal,
            }
          );
        }

        continue;
      }

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, id as GRENADEID, {
          previous: prevVal,
          current: currVal,
        });

        this.emitWithContext(
          emitter,
          `${event}@${+id}`,
          {
            previous: prevVal,
            current: currVal,
          }
        );
      }
    }
  }
}
