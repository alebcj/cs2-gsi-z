// src/core/parser/GsiParser.js

import { GameState } from '../gamestate/GameState.js';
import { Player, PlayerInput } from '../../models/Player.js';
import { Round, RoundInput } from '../../models/Round.js';
import { Map, MapInput } from '../../models/Map.js';

export interface RawGsiPayload {
  player?: PlayerInput,
  round?: RoundInput,
  map?: MapInput,
  provider?: any,
  previously?: GameState,
}

export class GsiParser {
  // Temporary, define a proper type later
  raw: RawGsiPayload;

  constructor(raw: RawGsiPayload = {}) {
    this.raw = raw;
  }

  parse() {
    const player = new Player(this.raw.player ?? {});
    const round = new Round(this.raw.round ?? {});
    const map = new Map(this.raw.map ?? {});
    const provider = this.raw.provider ?? {};
    const previously = this.raw.previously ?? undefined;

    return new GameState({ player, round, map, provider, previously });
  }
}
