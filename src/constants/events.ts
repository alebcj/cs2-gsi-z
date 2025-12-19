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

import { GrenadeBase } from "../models/grenades/GrenadeBase";
import { Vector3D } from "../models/helpers/Vector3D";
import { ModelBase } from "../models/ModelBase";
import { Weapon } from "../models/Weapon";
import { Activity, BombState, CountdownPhase, MapPhase, RoundPhase, RoundWinCondition, Team } from "./enums";
import { GRENADEID, STEAMID64 } from "./types";

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
    currentSpectatorsChanged: "map:currentSpectatorsChanged",
    souvenirsTotalChanged: "map:souvenirsTotalChanged",

    roundWinsChanged: "map:roundWinsChanged",
  },

  round: {
    phaseChanged: "round:phaseChanged",
    started: "round:started",
    ended: "round:ended",
    won: "round:won",
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

  grenades: {
    existenceChanged: "grenades:existenceChanged",
    positionChanged: "grenades:positionChanged",
    velocityChanged: "grenades:velocityChanged",
    lifetimeChanged: "grenades:lifetimeChanged",
    effectTimeChanged: "grenades:effectTimeChanged",
    flamesChanged: "grenades:flamesChanged",
  }
} as const;

export type comparisonDataString<T> = { previous: T | null | "unknown"; current: T | null | "unknown" };
export type comparisonDataModel<T extends ModelBase> = { previous: T | null | "unknown"; current: T | null | "unknown" };
export type comparisonDataModelArray<T extends ModelBase> = { previous: T[] | null | "unknown"; current: T[] | null | "unknown" };
export type comparisonDataNumber<T> = { previous: T | null | 0; current: T | null | 0 };
export type comparisonDataEnum<T> = { previous: T; current: T };
export type comparisonDataVector3D = { previous: null | Vector3D; current: null | Vector3D };

export interface EventMap {
  "provider:nameChanged": [comparisonDataString<string>];
  "provider:timestampChanged": [comparisonDataNumber<number>];

  "map:nameChanged": [comparisonDataString<string>];
  "map:phaseChanged": [comparisonDataEnum<MapPhase>];
  "map:roundChanged": [comparisonDataNumber<number>];
  "map:teamCTScoreChanged": [comparisonDataNumber<number>];
  "map:teamTScoreChanged": [comparisonDataNumber<number>];
  "map:currentSpectatorsChanged": [comparisonDataNumber<number>];
  "map:souvenirsTotalChanged": [comparisonDataNumber<number>];

  "map:roundWinsChanged": [comparisonDataEnum<Record<`${number}`, RoundWinCondition>>];

  "round:phaseChanged": [comparisonDataEnum<RoundPhase>];
  "round:started": [];
  "round:ended": [{ winner: string | null | "unknown" }];
  "round:won": [comparisonDataString<string>];

  "player:teamChanged": [comparisonDataEnum<Team>];
  "player:activityChanged": [comparisonDataEnum<Activity>];
  "player:observerSlotChanged": [comparisonDataNumber<number>];
  "player:spectargetChanged": [comparisonDataString<STEAMID64>];

  "player:hpChanged": [comparisonDataNumber<number>];
  "player:armorChanged": [comparisonDataNumber<number>];
  "player:helmetChanged": [comparisonDataNumber<boolean>];
  "player:flashedChanged": [comparisonDataNumber<number>];
  "player:smokedChanged": [comparisonDataNumber<number>];
  "player:burningChanged": [comparisonDataNumber<number>];
  "player:moneyChanged": [comparisonDataNumber<number>];
  "player:equipmentValueChanged": [comparisonDataNumber<number>];

  "player:weaponChanged": [comparisonDataModel<Weapon>];
  "player:ammoClipChanged": [comparisonDataNumber<number>];
  "player:ammoReserveChanged": [comparisonDataNumber<number>];

  "player:killsChanged": [comparisonDataNumber<number>];
  "player:deathsChanged": [comparisonDataNumber<number>];
  "player:assistsChanged": [comparisonDataNumber<number>];
  "player:scoreChanged": [comparisonDataNumber<number>];
  "player:mvpsChanged": [comparisonDataNumber<number>];

  "player:positionChanged": [comparisonDataVector3D];
  "player:forwardDirectionChanged": [comparisonDataVector3D];

  "phaseCountdowns:phaseChanged": [comparisonDataEnum<CountdownPhase>];
  "phaseCountdowns:phaseEndsInChanged": [comparisonDataString<string>];

  "allPlayers:joined": [STEAMID64];
  "allPlayers:left": [STEAMID64];

  "allPlayers:teamChanged": [STEAMID64, comparisonDataEnum<Team>];
  "allPlayers:observerSlotChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:positionChanged": [STEAMID64, comparisonDataVector3D];
  "allPlayers:forwardDirectionChanged": [STEAMID64, comparisonDataVector3D];

  "allPlayers:hpChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:armorChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:helmetChanged": [STEAMID64, comparisonDataNumber<boolean>];
  "allPlayers:flashedChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:smokedChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:burningChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:moneyChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:equipmentValueChanged": [STEAMID64, comparisonDataNumber<number>];

  "allPlayers:weaponChanged": [STEAMID64, comparisonDataModel<Weapon>];
  "allPlayers:ammoClipChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:ammoReserveChanged": [STEAMID64, comparisonDataNumber<number>];

  "allPlayers:killsChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:deathsChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:assistsChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:scoreChanged": [STEAMID64, comparisonDataNumber<number>];
  "allPlayers:mvpsChanged": [STEAMID64, comparisonDataNumber<number>];

  [key: `allPlayers:joined@${STEAMID64}`]: [];
  [key: `allPlayers:left@${STEAMID64}`]: [];

  [key: `allPlayers:teamChanged@${STEAMID64}`]: [comparisonDataEnum<Team>];
  [key: `allPlayers:observerSlotChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:positionChanged@${STEAMID64}`]: [comparisonDataVector3D];
  [key: `allPlayers:forwardDirectionChanged@${STEAMID64}`]: [comparisonDataVector3D];

  [key: `allPlayers:hpChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:armorChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:helmetChanged@${STEAMID64}`]: [comparisonDataNumber<boolean>];
  [key: `allPlayers:flashedChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:smokedChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:burningChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:moneyChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:equipmentValueChanged@${STEAMID64}`]: [comparisonDataNumber<number>];

  [key: `allPlayers:weaponChanged@${STEAMID64}`]: [comparisonDataModel<Weapon>];
  [key: `allPlayers:ammoClipChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:ammoReserveChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  
  [key: `allPlayers:killsChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:deathsChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:assistsChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:scoreChanged@${STEAMID64}`]: [comparisonDataNumber<number>];
  [key: `allPlayers:mvpsChanged@${STEAMID64}`]: [comparisonDataNumber<number>];

  "bomb:stateChanged": [comparisonDataEnum<BombState>];
  "bomb:positionChanged": [comparisonDataVector3D];
  "bomb:playerChanged": [comparisonDataString<STEAMID64>];

  "grenades:existenceChanged": [GRENADEID, comparisonDataModel<GrenadeBase>];
  "grenades:positionChanged": [GRENADEID, comparisonDataVector3D];
  "grenades:velocityChanged": [GRENADEID, comparisonDataVector3D];
  "grenades:lifetimeChanged": [GRENADEID, comparisonDataNumber<number>];
  "grenades:effectTimeChanged": [GRENADEID, comparisonDataNumber<number>];
  "grenades:flamesChanged": [GRENADEID, comparisonDataModelArray<Vector3D>];

  [key: `grenades:existenceChanged@${GRENADEID}`]: [comparisonDataModel<GrenadeBase>];
  [key: `grenades:positionChanged@${GRENADEID}`]: [comparisonDataVector3D];
  [key: `grenades:velocityChanged@${GRENADEID}`]: [comparisonDataVector3D];
  [key: `grenades:lifetimeChanged@${GRENADEID}`]: [comparisonDataNumber<number>];
  [key: `grenades:effectTimeChanged@${GRENADEID}`]: [comparisonDataNumber<number>];
  [key: `grenades:flamesChanged@${GRENADEID}`]: [comparisonDataModelArray<Vector3D>];
};