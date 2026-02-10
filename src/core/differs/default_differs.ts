import { PlayerDiffer } from './PlayerDiffer';
import { PlayerStateDiffer } from './PlayerStateDiffer';
import { WeaponDiffer } from './WeaponDiffer';
import { MapDiffer } from './MapDiffer';
import { RoundDiffer } from './RoundDiffer';
import { PhaseCountdownsDiffer } from './PhaseCountdownsDiffer';
import { AllPlayersDiffer } from './AllPlayersDiffer';
import { BombDiffer } from './BombDiffer';
import { ProviderDiffer } from './ProviderDiffer';
import { GrenadesDiffer } from './GrenadesDiffer';
import { PlayerMatchStatsDiffer } from './PlayerMatchStatsDiffer';
import { RoundWinsDiffer } from './RoundWinsDiffer';

export const default_differs = [
  ProviderDiffer,
  MapDiffer,
  RoundWinsDiffer,
  RoundDiffer,
  PlayerDiffer,
  PlayerStateDiffer,
  PlayerMatchStatsDiffer,
  WeaponDiffer,
  PhaseCountdownsDiffer,
  AllPlayersDiffer,
  BombDiffer,
  GrenadesDiffer
];
