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
 * @property {string} equipmentValueChanged
 * @property {string} weaponChanged
 * @property {string} ammoClipChanged
 * @property {string} ammoReserveChanged
 * @property {string} killsChanged
 * @property {string} deathsChanged
 * @property {string} assistsChanged
 * @property {string} scoreChanged
 */

import { Vector3DArray } from "../models/helpers/Vector3D";
import { Weapon } from "../models/Weapon";
import { Activity, BombState, Phase, Team } from "./enums";
import { STEAMID64 } from "./types";

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
export const EVENTS = /* * @type {GsiEvents} */ {
  provider: {
    nameChanged: "provider:nameChanged",
    timestampChanged: "provider:timestampChanged",
  },

  map: {
    nameChanged: "map:nameChanged",
    phaseChanged: "map:phaseChanged",
    roundChanged: "map:roundChanged",
    teamCTScoreChanged: "map:teamCTScoreChanged",
    teamTScoreChanged: "map:teamTScoreChanged",
  },

  round: {
    phaseChanged: "round:phaseChanged",
    started: "round:started",
    ended: "round:ended",
    won: "round:won",

    // Bomb events
    bombPlantingStarted: "round:bombPlantingStarted",
    bombPlanted: "round:bombPlanted",
    bombPlantFake: "round:bombPlantFake",
  },

  player: {
    // Basic Info
    teamChanged: "player:teamChanged",
    activityChanged: "player:activityChanged",
    observerSlotChanged: "player:observerSlotChanged",
    specTargetChanged: "player:spectargetChanged",
    positionChanged: "player:positionChanged",
    forwardDirectionChanged: "player:forwardDirectionChanged",

    // Player State
    hpChanged: "player:hpChanged",
    armorChanged: "player:armorChanged",
    helmetChanged: "player:helmetChanged",
    flashedChanged: "player:flashedChanged",
    smokedChanged: "player:smokedChanged",
    burningChanged: "player:burningChanged",
    moneyChanged: "player:moneyChanged",
    equipmentValueChanged: "player:equipmentValueChanged",

    // Weapons
    weaponChanged: "player:weaponChanged",
    ammoClipChanged: "player:ammoClipChanged",
    ammoReserveChanged: "player:ammoReserveChanged",

    // Match Stats
    killsChanged: "player:killsChanged",
    deathsChanged: "player:deathsChanged",
    assistsChanged: "player:assistsChanged",
    scoreChanged: "player:scoreChanged",
    mvpsChanged: "player:mvpsChanged",
  },

  phaseCountdowns: {
    phaseChanged: "phaseCountdowns:phaseChanged",
    phaseEndsInChanged: "phaseCountdowns:phaseEndsInChanged",
  },

  allPlayers: {
    joined: "allPlayers:joined",
    left: "allPlayers:left",

    // Basic Info
    teamChanged: "allPlayers:teamChanged",
    observerSlotChanged: "allPlayers:observerSlotChanged",
    positionChanged: "allPlayers:positionChanged",
    forwardDirectionChanged: "allPlayers:forwardDirectionChanged",

    // Player State
    hpChanged: "allPlayers:hpChanged",
    armorChanged: "allPlayers:armorChanged",
    helmetChanged: "allPlayers:helmetChanged",
    flashedChanged: "allPlayers:flashedChanged",
    smokedChanged: "allPlayers:smokedChanged",
    burningChanged: "allPlayers:burningChanged",
    moneyChanged: "allPlayers:moneyChanged",
    moneyEarned: "allPlayers:moneyEarned",
    equipmentValueChanged: "allPlayers:equipmentValueChanged",

    // Weapons
    weaponChanged: "allPlayers:weaponChanged",
    ammoClipChanged: "allPlayers:ammoClipChanged",
    ammoReserveChanged: "allPlayers:ammoReserveChanged",

    // Match Stats
    killsChanged: "allPlayers:killsChanged",
    deathsChanged: "allPlayers:deathsChanged",
    assistsChanged: "allPlayers:assistsChanged",
    scoreChanged: "allPlayers:scoreChanged",
    mvpsChanged: "allPlayers:mvpsChanged",
  },

  bomb: {
    stateChanged: "bomb:stateChanged",
    positionChanged: "bomb:positionChanged",
    playerChanged: "bomb:playerChanged",
  },
} as const;

export type eventDataString<T> = { previously: T | null | "unknown"; current: T | null | "unknown" };
export type eventDataNumber<T> = { previously: T | null | 0; current: T | null | 0 };
export type eventDataEnum<T> = { previously: T; current: T };
export type eventDataVector3D = { previously: null | Vector3DArray; current: null | Vector3DArray };

export type EventMap = {
  "provider:nameChanged": [eventDataString<string>];
  "provider:timestampChanged": [eventDataNumber<number>];

  "map:nameChanged": [eventDataString<string>];
  "map:phaseChanged": [eventDataEnum<Phase>];
  "map:roundChanged": [eventDataNumber<number>];
  "map:teamCTScoreChanged": [eventDataNumber<number>];
  "map:teamTScoreChanged": [eventDataNumber<number>];

  "round:phaseChanged": [eventDataEnum<Phase>];
  "round:started": [];
  "round:ended": [{ winner: string | null | "unknown" }];
  "round:won": [eventDataString<string>];

  "round:bombPlantingStarted": [eventDataNumber<string>];
  "round:bombPlanted": [eventDataNumber<string>];
  "round:bombPlantFake": [eventDataNumber<string>];

  "player:teamChanged": [eventDataEnum<Team>];
  "player:activityChanged": [eventDataEnum<Activity>];
  "player:observerSlotChanged": [eventDataNumber<number>];
  "player:spectargetChanged": [eventDataString<STEAMID64>];

  "player:hpChanged": [eventDataNumber<number>];
  "player:armorChanged": [eventDataNumber<number>];
  "player:helmetChanged": [eventDataNumber<boolean>];
  "player:flashedChanged": [eventDataNumber<number>];
  "player:smokedChanged": [eventDataNumber<number>];
  "player:burningChanged": [eventDataNumber<number>];
  "player:moneyChanged": [eventDataNumber<number>];
  "player:equipmentValueChanged": [eventDataNumber<number>];

  "player:weaponChanged": [eventDataString<Weapon>];
  "player:ammoClipChanged": [eventDataNumber<number>];
  "player:ammoReserveChanged": [eventDataNumber<number>];

  "player:killsChanged": [eventDataNumber<number>];
  "player:deathsChanged": [eventDataNumber<number>];
  "player:assistsChanged": [eventDataNumber<number>];
  "player:scoreChanged": [eventDataNumber<number>];
  "player:mvpsChanged": [eventDataNumber<number>];

  "player:positionChanged": [eventDataVector3D];
  "player:forwardDirectionChanged": [eventDataVector3D];

  "phaseCountdowns:phaseChanged": [eventDataEnum<Phase>];
  "phaseCountdowns:phaseEndsInChanged": [eventDataString<string>];

  "allPlayers:joined": [STEAMID64, eventDataString<string>];
  "allPlayers:left": [STEAMID64, eventDataString<string>];

  "allPlayers:teamChanged": [STEAMID64, eventDataEnum<Team>];
  "allPlayers:observerSlotChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:positionChanged": [STEAMID64, eventDataVector3D];
  "allPlayers:forwardDirectionChanged": [STEAMID64, eventDataVector3D];

  "allPlayers:hpChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:armorChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:helmetChanged": [STEAMID64, eventDataNumber<boolean>];
  "allPlayers:flashedChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:smokedChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:burningChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:moneyChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:equipmentValueChanged": [STEAMID64, eventDataNumber<number>];

  "allPlayers:weaponChanged": [STEAMID64, eventDataString<Weapon>];
  "allPlayers:ammoClipChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:ammoReserveChanged": [STEAMID64, eventDataNumber<number>];

  "allPlayers:killsChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:deathsChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:assistsChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:scoreChanged": [STEAMID64, eventDataNumber<number>];
  "allPlayers:mvpsChanged": [STEAMID64, eventDataNumber<number>];

  "bomb:stateChanged": [eventDataEnum<BombState>];
  "bomb:positionChanged": [eventDataVector3D];
  "bomb:playerChanged": [eventDataString<STEAMID64>];
};
