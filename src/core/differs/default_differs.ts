import { PlayerDiffer } from './PlayerDiffer.js';
import { PlayerStateDiffer } from './PlayerStateDiffer.js';
import { WeaponDiffer } from './WeaponDiffer.js';
import { MapDiffer } from './MapDiffer.js';
import { RoundDiffer } from './RoundDiffer.js';
import { PhaseCountdownsDiffer } from './PhaseCountdownsDiffer.js';
import { AllPlayersDiffer } from './AllPlayersDiffer.js';
import { BombDiffer } from './BombDiffer.js';
import { ProviderDiffer } from './ProviderDiffer.js';
import { GrenadesDiffer } from './GrenadesDiffer.js';

export const default_differs = [
  ProviderDiffer,
  MapDiffer,
  RoundDiffer,
  PlayerDiffer,
  PlayerStateDiffer,
  WeaponDiffer,
  PhaseCountdownsDiffer,
  AllPlayersDiffer,
  BombDiffer,
  GrenadesDiffer
];
