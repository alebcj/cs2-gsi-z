import { EVENTS } from '../../constants/events.js';
import { Weapon } from '../../models/Weapon.js';
import { Logger } from '../../utils/Logger.js';
import { GameState } from '../gamestate/GameState.js';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase.js';

export interface WeaponDifferOptions {
  logger?: Logger | null;
}

export class WeaponDiffer extends DifferBase<Weapon> {
  protected logger: Logger | Console;
  
  constructor({ logger = null }: WeaponDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: () => console }).child('WeaponDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }
    /**
   * Compara cambios en el arma activa y emite eventos de Change of ammoClip y ammoReserve.
   * 
   * @param {GameState} prev State anterior del juego
   * @param {GameState} curr State actual del juego
   * @param {Object} emitter Contexto de emisión de eventos
   * @param {Object} [options] Opcional. Objeto con { previously, added } */

  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    if (this.logger instanceof Logger) {
      this.logger.verbose('🔍 diff() called');
    }

    if (!prev?.player && !curr?.player) return;

    const prevWeapon = prev.player.activeWeapon;
    const currWeapon = curr.player.activeWeapon;

    if (this.logger instanceof Logger) {
      this.logger.verbose('🔍 prevWeapon:', prevWeapon);
      this.logger.verbose('🔍 currWeapon:', currWeapon);
    }

    if (!currWeapon || currWeapon.ammoClip === undefined) {
      this.logger.warn('⚠️ Current active weapon incomplete or missing ammo_clip.');

      return;
    }

    if (!prevWeapon || prevWeapon.ammoClip === undefined) {
      if (this.logger instanceof Logger) {
        this.logger.verbose('ℹ️ No prevWeapon or ammoClip in prev. Waiting for next diff.');
      }

      return;
    }

    if (prevWeapon.ammoClip !== currWeapon.ammoClip) {
      this.logger.log(`🚀 ammoClip change: ${prevWeapon.ammoClip} → ${currWeapon.ammoClip}`);

      emitter.emit(EVENTS.player.ammoClipChanged, {
        previously: prevWeapon.ammoClip,
        current: currWeapon.ammoClip,
      });
    }

    if (prevWeapon.ammoReserve !== currWeapon.ammoReserve) {
      this.logger.log(`🚀 ammoReserve change: ${prevWeapon.ammoReserve} → ${currWeapon.ammoReserve}`);
      
      emitter.emit(EVENTS.player.ammoReserveChanged, {
        previously: prevWeapon.ammoReserve,
        current: currWeapon.ammoReserve,
      });
    }

    if (prevWeapon.name !== currWeapon.name) {
      this.logger.log(`🚀 Weapon changed: ${prevWeapon.name} → ${currWeapon.name}`);
      emitter.emit(EVENTS.player.weaponChanged, {
        previously: prevWeapon,
        current: currWeapon,
      });
    }

}}

