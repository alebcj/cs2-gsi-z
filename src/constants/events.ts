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
import { Activity, Phase, Team } from "./enums";

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

    // Player State
    hpChanged: "player:hpChanged",
    armorChanged: "player:armorChanged",
    helmetChanged: "player:helmetChanged",
    flashedChanged: "player:flashedChanged",
    smokedChanged: "player:smokedChanged",
    burningChanged: "player:burningChanged",
    moneyChanged: "player:moneyChanged",
    moneyEarned: "player:moneyEarned",
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

    // Position
    positionChanged: "player:positionChanged",
    forwardDirectionChanged: "player:forwardDirectionChanged",
  },

  phaseCountdowns: {
    phaseChanged: "phaseCountdowns:phaseChanged",
    phaseEndsInChanged: "phaseCountdowns:phaseEndsInChanged",
  },
} as const;

export type eventDataString<T> = [
  { previously: T | null | "unknown"; current: T | null | "unknown" },
];
export type eventDataNumber<T> = [
  { previously: T | null | 0; current: T | null | 0 },
];
export type eventDataEnum<T> = [
  { previously: T; current: T },
];

export type eventDataVector3D = [
  { previously: null | Vector3DArray; current: null | Vector3DArray },
];

export type EventMap = {
  "provider:nameChanged": [eventDataString<string>];
  "provider:timestampChanged": [eventDataNumber<number>];

  "map:nameChanged": [eventDataString<string>];
  "map:phaseChanged": [eventDataEnum<Phase>];
  "map:roundChanged": [eventDataNumber<number>];
  "map:teamCTScoreChanged": [eventDataNumber<number>];
  "map:teamTScoreChanged": [eventDataNumber<number>];

  "round:phaseChanged": [eventDataEnum<Phase>];
  "round:started": [eventDataString<string>];
  "round:ended": [eventDataString<string>];
  "round:won": [eventDataString<string>];

  "round:bombPlantingStarted": [eventDataNumber<string>];
  "round:bombPlanted": [eventDataNumber<string>];
  "round:bombPlantFake": [eventDataNumber<string>];

  "phaseCountdowns:phaseChanged": [eventDataEnum<Phase>];
  "phaseCountdowns:phaseEndsInChanged": [eventDataString<string>];

  "player:teamChanged": [eventDataEnum<Team>];
  "player:activityChanged": [eventDataEnum<Activity>];
  "player:observerSlotChanged": [eventDataNumber<number>];
  "player:spectargetChanged": [eventDataString<string>];

  "player:hpChanged": [eventDataNumber<number>];
  "player:armorChanged": [eventDataNumber<number>];
  "player:helmetChanged": [eventDataNumber<boolean>];
  "player:flashedChanged": [eventDataNumber<number>];
  "player:smokedChanged": [eventDataNumber<number>];
  "player:burningChanged": [eventDataNumber<number>];
  "player:moneyChanged": [eventDataNumber<number>];
  "player:moneyEarned": [eventDataNumber<number>];
  "player:equipmentValueChanged": [eventDataNumber<number>];

  "player:weaponChanged": [eventDataString<string>];
  "player:ammoClipChanged": [eventDataNumber<number>];
  "player:ammoReserveChanged": [eventDataNumber<number>];

  "player:killsChanged": [eventDataNumber<number>];
  "player:deathsChanged": [eventDataNumber<number>];
  "player:assistsChanged": [eventDataNumber<number>];
  "player:scoreChanged": [eventDataNumber<number>];

  "player:positionChanged": [eventDataVector3D];
  "player:forwardDirectionChanged": [eventDataVector3D];
};
