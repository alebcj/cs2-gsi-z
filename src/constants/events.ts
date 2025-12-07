/**
 * @typedef {Object} PlayerEvents
 * @property {string} teamChanged
 * @property {string} activityChanged
 * @property {string} observerSlotChanged
 * @property {string} hpChanged
 * @property {string} armorChanged
 * @property {string} helmetChanged
 * @property {string} flashedChanged
 * @property {string} smokedChanged
 * @property {string} burningChanged
 * @property {string} moneyChanged
 * @property {string} moneyEarned
 * @property {string} equipValueChanged
 * @property {string} weaponChanged
 * @property {string} ammoClipChanged
 * @property {string} ammoReserveChanged
 * @property {string} killsChanged
 * @property {string} deathsChanged
 * @property {string} assistsChanged
 * @property {string} scoreChanged
 */

/**
 * @typedef {Object} MapEvents
 * @property {string} nameChanged
 * @property {string} phaseChanged
 * @property {string} roundChanged
 * @property {string} teamCTScoreChanged
 * @property {string} teamTScoreChanged
 */

/**
 * @typedef {Object} RoundEvents
 * @property {string} phaseChanged
 * @property {string} started
 * @property {string} ended
 * @property {string} won
 * @property {string} bombPlantingStarted
 * @property {string} bombPlanted
 * @property {string} bombPlantFake
 */

/**
 * @typedef {Object} GsiEvents
 * @property {PlayerEvents} player
 * @property {MapEvents} map
 * @property {RoundEvents} round
 */
export const EVENTS = /* * @type {GsiEvents} */ ({
  player: {
    // Basic Info
    teamChanged: 'player:teamChanged',
    activityChanged: 'player:activityChanged',
    observerSlotChanged: 'player:observerSlotChanged',
    specTargetChanged: 'player:spectargetChanged',

    // Player State
    hpChanged: 'player:hpChanged',
    armorChanged: 'player:armorChanged',
    helmetChanged: 'player:helmetChanged',
    flashedChanged: 'player:flashedChanged',
    smokedChanged: 'player:smokedChanged',
    burningChanged: 'player:burningChanged',
    moneyChanged: 'player:moneyChanged',
    moneyEarned: 'player:moneyEarned',
    equipValueChanged: 'player:equipValueChanged',

    // Weapons
    weaponChanged: 'player:weaponChanged',
    ammoClipChanged: 'player:ammoClipChanged',
    ammoReserveChanged: 'player:ammoReserveChanged',

    // Match Stats
    killsChanged: 'player:killsChanged',
    deathsChanged: 'player:deathsChanged',
    assistsChanged: 'player:assistsChanged',
    scoreChanged: 'player:scoreChanged',

    // Position
    positionChanged: 'player:positionChanged',
    forwardDirectionChanged: 'player:forwardDirectionChanged',
  },

  map: {
    nameChanged: 'map:nameChanged',
    phaseChanged: 'map:phaseChanged',
    roundChanged: 'map:roundChanged',
    teamCTScoreChanged: 'map:teamCTScoreChanged',
    teamTScoreChanged: 'map:teamTScoreChanged',
  },

  round: {
    phaseChanged: 'round:phaseChanged',
    started: 'round:started',
    ended: 'round:ended',
    won: 'round:won',

    // Bomb events
    bombPlantingStarted: 'round:bombPlantingStarted',
    bombPlanted: 'round:bombPlanted',
    bombPlantFake: 'round:bombPlantFake',
  }
}) as const;

export type TeamName = 'CT' | 'T';
export type ActivityName = 'menu' | 'playing' | 'textinput';
export type PhaseName = 'warmup' | 'live' | 'over' | 'freezetime';

export type eventDataString<T> = [{ previously: T | null | 'unknown', current: T | null | 'unknown' }];
export type eventDataNumber<T> = [{ previously: T | null | 0, current: T | null | 0 }];

export type PlayerActivity = eventDataString<ActivityName>;

export type EventMap = {
  'player:teamChanged': eventDataString<TeamName>;
  'player:activityChanged': eventDataString<ActivityName>;
  'player:observerSlotChanged': eventDataNumber<number>;
  'player:spectargetChanged': eventDataString<string>;

  'player:hpChanged': eventDataNumber<number>;
  'player:armorChanged': eventDataNumber<number>;
  'player:helmetChanged': eventDataNumber<boolean>;
  'player:flashedChanged': eventDataNumber<number>;
  'player:smokedChanged': eventDataNumber<number>;
  'player:burningChanged': eventDataNumber<number>;
  'player:moneyChanged': eventDataNumber<number>;
  'player:moneyEarned': eventDataNumber<number>;
  'player:equipValueChanged': eventDataNumber<number>;

  'player:weaponChanged': eventDataString<string>;
  'player:ammoClipChanged': eventDataNumber<number>;
  'player:ammoReserveChanged': eventDataNumber<number>;

  'player:killsChanged': eventDataNumber<number>;
  'player:deathsChanged': eventDataNumber<number>;
  'player:assistsChanged': eventDataNumber<number>;
  'player:scoreChanged': eventDataNumber<number>;

  'map:nameChanged': eventDataString<string>;
  'map:phaseChanged': eventDataString<PhaseName>;
  'map:roundChanged': eventDataNumber<number>;
  'map:teamCTScoreChanged': eventDataNumber<number>;
  'map:teamTScoreChanged': eventDataNumber<number>;

  'round:phaseChanged': eventDataString<PhaseName>;
  'round:started': eventDataString<string>;
  'round:ended': eventDataString<string>;
  'round:won': eventDataString<string>;

  'round:bombPlantingStarted': eventDataNumber<string>;
  'round:bombPlanted': eventDataNumber<string>;
  'round:bombPlantFake': eventDataNumber<string>;
}