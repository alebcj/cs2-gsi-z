// src/core/parser/GsiParser.js

import { GameState } from '../gamestate/GameState.js';
import { Player } from '../../models/Player.js';
import { Round } from '../../models/Round.js';
import { Map } from '../../models/Map.js';

export class GsiParser {
  constructor(raw = {}) {
    this.raw = raw;
  }

  parse() {
    const player = new Player(this.raw.player ?? {});
    const round = new Round(this.raw.round ?? {});
    const map = new Map(this.raw.map ?? {});
    const provider = this.raw.provider ?? {};
    const previously = this.raw.previously ?? {};

    return new GameState({ player, round, map, provider, previously });
  }
}
