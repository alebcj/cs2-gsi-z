import { EVENTS } from "../../constants/events.js";
import { Weapon } from "../../models/Weapon.js";
import { Logger } from "../../utils/Logger.js";
import { GameState } from "../gamestate/GameState.js";
import { DifferBase, DiffOptions, EmitterContext } from "./DifferBase.js";

export interface WeaponDifferOptions {
  logger?: Logger | null;
}

export class WeaponDiffer extends DifferBase<Weapon> {
  protected logger: Logger | Console;

  constructor({ logger = null }: WeaponDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: () => console }).child("WeaponDiffer");
    this.logger.log("⚙️ instantiated correctly.");
  }
  /**
   * Compara cambios en el arma activa y emite eventos de Change of ammoClip y ammoReserve.
   *
   * @param {GameState} prev State anterior del juego
   * @param {GameState} curr State actual del juego
   * @param {Object} emitter Contexto de emisión de eventos
   * @param {Object} [options] Opcional. Objeto con { previously, added } */

  diff(
    prev: GameState,
    curr: GameState,
    emitter: EmitterContext,
    options: DiffOptions = {}
  ) {
    if (this.logger instanceof Logger) {
      this.logger.verbose("🔍 diff() called");
    }

    this.diffAllPlayers(prev, curr, emitter);

    if (!prev?.player && !curr?.player) return;

    const prevWeapon = prev.player.activeWeapon;
    const currWeapon = curr.player.activeWeapon;

    if (this.logger instanceof Logger) {
      this.logger.verbose("🔍 prevWeapon:", prevWeapon);
      this.logger.verbose("🔍 currWeapon:", currWeapon);
    }

    if (!currWeapon || currWeapon.ammo_clip === undefined) {
      this.logger.warn(
        "⚠️ Current active weapon incomplete or missing ammo_clip."
      );

      return;
    }

    if (!prevWeapon || prevWeapon.ammo_clip === undefined) {
      if (this.logger instanceof Logger) {
        this.logger.verbose(
          "ℹ️ No prevWeapon or ammoClip in prev. Waiting for next diff."
        );
      }

      return;
    }

    if (prevWeapon.ammo_clip !== currWeapon.ammo_clip) {
      this.logger.log(
        `🚀 ammoClip change: ${prevWeapon.ammo_clip} → ${currWeapon.ammo_clip}`
      );

      this.emitWithContext(emitter, EVENTS.player.ammoClipChanged, {
        previously: prevWeapon.ammo_clip,
        current: currWeapon.ammo_clip,
      });
    }

    if (prevWeapon.ammo_reserve !== currWeapon.ammo_reserve) {
      this.logger.log(
        `🚀 ammoReserve change: ${prevWeapon.ammo_reserve} → ${currWeapon.ammo_reserve}`
      );

      this.emitWithContext(emitter, EVENTS.player.ammoReserveChanged, {
        previously: prevWeapon.ammo_reserve,
        current: currWeapon.ammo_reserve,
      });
    }

    if (prevWeapon.name !== currWeapon.name) {
      this.logger.log(
        `🚀 Weapon changed: ${prevWeapon.name} → ${currWeapon.name}`
      );

      this.emitWithContext(emitter, EVENTS.player.weaponChanged, {
        previously: prevWeapon,
        current: currWeapon,
      });
    }
  }

  diffAllPlayers(prev: GameState, curr: GameState, emitter: EmitterContext) {
    if (!prev?.allPlayers && !curr?.allPlayers) return;

    const prevSteamids = prev.allPlayers.getAllSteamids();
    const currSteamids = curr.allPlayers.getAllSteamids();

    const allSteamids = new Set([...currSteamids, ...prevSteamids]);

    for (const steamid of allSteamids) {
      const player = curr.allPlayers.getBySteamid(steamid);

      if (!player) continue;

      const prevWeapon = player.activeWeapon;
      const currWeapon = player.activeWeapon;

      if (this.logger instanceof Logger) {
        this.logger.verbose("🔍 prevWeapon:", prevWeapon);
        this.logger.verbose("🔍 currWeapon:", currWeapon);
      }

      if (!currWeapon || currWeapon.ammo_clip === undefined) {
        this.logger.warn(
          "⚠️ Current active weapon incomplete or missing ammo_clip for player " +
            steamid
        );

        return;
      }

      if (!prevWeapon || prevWeapon.ammo_clip === undefined) {
        if (this.logger instanceof Logger) {
          this.logger.verbose(
            "ℹ️ No prevWeapon or ammoClip in prev. Waiting for next diff."
          );
        }

        return;
      }

      if (prevWeapon.ammo_clip !== currWeapon.ammo_clip) {
        this.logger.log(
          `🚀 ammoClip change: ${prevWeapon.ammo_clip} → ${currWeapon.ammo_clip}`
        );

        this.emitWithContext(emitter, EVENTS.allPlayers.ammoClipChanged, steamid, {
            previously: prevWeapon.ammo_clip,
            current: currWeapon.ammo_clip,
        });
      }

      if (prevWeapon.ammo_reserve !== currWeapon.ammo_reserve) {
        this.logger.log(
          `🚀 ammoReserve change: ${prevWeapon.ammo_reserve} → ${currWeapon.ammo_reserve}`
        );

        this.emitWithContext(emitter, EVENTS.allPlayers.ammoReserveChanged, steamid, {
          previously: prevWeapon.ammo_reserve,
          current: currWeapon.ammo_reserve,
        });
      }

      if (prevWeapon.name !== currWeapon.name) {
        console.log(2, steamid, prevWeapon.name, currWeapon.name);
        this.logger.log(
          `🚀 Weapon changed: ${prevWeapon.name} → ${currWeapon.name}`
        );

        this.emitWithContext(emitter, EVENTS.allPlayers.weaponChanged, steamid, {
          previously: prevWeapon,
          current: currWeapon,
        });
      }
    }
  }
}
