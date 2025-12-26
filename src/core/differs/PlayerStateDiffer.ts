import { EventMap, EVENTS } from '../../constants/events';
import { STEAMID64 } from '../../constants/types';
import { PlayerState } from '../../models/players/PlayerState';
import { Logger } from '../../utils/Logger';
import { GameState } from '../gamestate/GameState';
import { DifferBase, DiffOptions, EmitterContext } from './DifferBase';

export interface PlayerStateDifferOptions {
  logger?: Logger | null;
}

export class PlayerStateDiffer extends DifferBase<PlayerState> {
  protected logger: Logger | Console;

  constructor({ logger = null }: PlayerStateDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child('PlayerStateDiffer');
    this.logger.log('⚙️ instantiated correctly.');
  }

  /**
   * Compares changes in the player's internal state (health, armor, money, etc.) and emits corresponding events.
   * 
   * @param {GameState} prev Previous game state
   * @param {GameState} curr Current game state
   * @param {Object} emitter Event emission context
   * @param {Object} [options] Optional. Object with { previously, added } */
  diff(prev: GameState, curr: GameState, emitter: EmitterContext, options: DiffOptions = {}) {
    this.diffAllPlayers(prev, curr, emitter);
    
    if (!prev?.player && !curr?.player) return;

    const fields = [
      { path: 'player.state.health', event: EVENTS.player.hpChanged },
      { path: 'player.state.armor', event: EVENTS.player.armorChanged },
      { path: 'player.state.helmet', event: EVENTS.player.helmetChanged },
      { path: 'player.state.money', event: EVENTS.player.moneyChanged },
      { path: 'player.state.flashed', event: EVENTS.player.flashedChanged },
      { path: 'player.state.smoked', event: EVENTS.player.smokedChanged },
      { path: 'player.state.burning', event: EVENTS.player.burningChanged },
      { path: 'player.state.equipmentValue', event: EVENTS.player.equipmentValueChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, { previous: prevVal, current: currVal });
      }
    }

    // Seems redundant since you can simply use the moneyChanged event to calculate the earned money

    // const prevMoney = this.getFieldSafe('player.state.money', prev, this.previously);
    // const currMoney = this.getFieldSafe('player.state.money', curr, this.added);

    // if (currMoney !== null && prevMoney !== null && currMoney > prevMoney) {
    //   const earned = currMoney - prevMoney;
    //   this.logger.log(`💵 Money earned: +${earned}`);
    //   this.emitWithContext(emitter, EVENTS.player.moneyEarned, { earned });
    // }
  }

  diffAllPlayers(prev: GameState, curr: GameState, emitter: EmitterContext) {
    if (!prev?.allPlayers && !curr?.allPlayers) return;

    const prevSteamids = prev.allPlayers.getAllSteamids();
    const currSteamids = curr.allPlayers.getAllSteamids();

    const allSteamids = new Set([...currSteamids, ...prevSteamids]);

    let fields: {
      path: string;
      event: typeof EVENTS.allPlayers[keyof typeof EVENTS.allPlayers];
    }[] = [];

    for (const steamid of allSteamids) {
      fields.push(
        { path: `allPlayers.list.${steamid}.state.health`, event: EVENTS.allPlayers.hpChanged },
        { path: `allPlayers.list.${steamid}.state.armor`, event: EVENTS.allPlayers.armorChanged },
        { path: `allPlayers.list.${steamid}.state.helmet`, event: EVENTS.allPlayers.helmetChanged },
        { path: `allPlayers.list.${steamid}.state.money`, event: EVENTS.allPlayers.moneyChanged },
        { path: `allPlayers.list.${steamid}.state.flashed`, event: EVENTS.allPlayers.flashedChanged },
        { path: `allPlayers.list.${steamid}.state.smoked`, event: EVENTS.allPlayers.smokedChanged },
        { path: `allPlayers.list.${steamid}.state.burning`, event: EVENTS.allPlayers.burningChanged },
        { path: `allPlayers.list.${steamid}.state.equip_value`, event: EVENTS.allPlayers.equipmentValueChanged },
      );
    }

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);
      const steamid = path.split(".")[2] as STEAMID64;

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, steamid, { previous: prevVal, current: currVal });
        this.emitWithContext(emitter, `${event}@${steamid}`, { previous: prevVal, current: currVal });
      }
    }
  }
}
