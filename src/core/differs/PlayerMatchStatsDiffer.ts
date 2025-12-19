import { EventMap, EVENTS } from "../../constants/events";
import { STEAMID64 } from "../../constants/types";
import { PlayerMatchStats } from "../../models/players/PlayerMatchStats";
import { Logger } from "../../utils/Logger";
import { GameState } from "../gamestate/GameState";
import { DifferBase, DiffOptions, EmitterContext } from "./DifferBase";

export interface PlayerMatchStatsDifferOptions {
  logger?: Logger | null;
}

export class PlayerMatchStatsDiffer extends DifferBase<PlayerMatchStats> {
  protected logger: Logger | Console;

  constructor({ logger = null }: PlayerMatchStatsDifferOptions = {}) {
    super();

    this.logger = (logger ?? { child: (_: string) => console }).child(
      "PlayerMatchStatsDiffer"
    );
    this.logger.log("⚙️ instantiated correctly.");
  }

  /**
   * Compares changes in the player's match stats (kills, assists, deaths, etc.) and emits corresponding events.
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
    this.diffAllPlayers(prev, curr, emitter);

    if (!prev?.player && !curr?.player) return;

    const fields = [
      { path: "player.matchStats.kills", event: EVENTS.player.killsChanged },
      {
        path: "player.matchStats.assists",
        event: EVENTS.player.assistsChanged,
      },
      { path: "player.matchStats.deaths", event: EVENTS.player.deathsChanged },
      { path: "player.matchStats.mvps", event: EVENTS.player.mvpsChanged },
      { path: "player.matchStats.score", event: EVENTS.player.scoreChanged },
    ];

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, {
          previously: prevVal,
          current: currVal,
        });
      }
    }
  }

  diffAllPlayers(prev: GameState, curr: GameState, emitter: EmitterContext) {
    if (!prev?.allPlayers && !curr?.allPlayers) return;

    const prevSteamids = prev.allPlayers.getAllSteamids();
    const currSteamids = curr.allPlayers.getAllSteamids();

    const allSteamids = new Set([...currSteamids, ...prevSteamids]);

    let fields: {
      path: string;
      event: keyof EventMap;
    }[] = [];

    for (const steamid of allSteamids) {
      fields.push(
        {
          path: `allPlayers.list.${steamid}.matchStats.kills`,
          event: EVENTS.allPlayers.killsChanged,
        },
        {
          path: `allPlayers.list.${steamid}.matchStats.assists`,
          event: EVENTS.allPlayers.assistsChanged,
        },
        {
          path: `allPlayers.list.${steamid}.matchStats.deaths`,
          event: EVENTS.allPlayers.deathsChanged,
        },
        {
          path: `allPlayers.list.${steamid}.matchStats.mvps`,
          event: EVENTS.allPlayers.mvpsChanged,
        },
        {
          path: `allPlayers.list.${steamid}.matchStats.score`,
          event: EVENTS.allPlayers.scoreChanged,
        }
      );
    }

    for (const { path, event } of fields) {
      const prevVal = this.getFieldSafe(path, prev, this.previously);
      const currVal = this.getFieldSafe(path, curr, this.added);
      const steamid = path.split(".")[2] as STEAMID64;

      if (prevVal !== currVal) {
        this.logger.log(`🔄 Change in ${path}: ${prevVal} → ${currVal}`);
        this.emitWithContext(emitter, event, steamid, {
          previously: prevVal,
          current: currVal,
        });
      }
    }
  }
}
