import { PlayerDiffer } from './PlayerDiffer.js';
import { PlayerStateDiffer } from './PlayerStateDiffer.js';
import { WeaponDiffer } from './WeaponDiffer.js';
import { MapDiffer } from './MapDiffer.js';
import { RoundDiffer } from './RoundDiffer.js';
import { PhaseCountdownsDiffer } from './PhaseCountdownsDiffer.js';

export const default_differs = [
  MapDiffer,
  RoundDiffer,
  PhaseCountdownsDiffer,
  PlayerDiffer,
  PlayerStateDiffer,
  WeaponDiffer
];
