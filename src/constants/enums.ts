export enum GameMode {
    /**
     * Unknown game mode
     */
    Unknown = 'unknown',

    /**
     * Doesn't seem to be used in cs2
     */
    Custom = 'custom',

    /**
     * Not used in cs2
     */
    Wargames = 'skirmish',

    /**
     * Used in cs2
     */
    Competitive = 'competitive',

    /**
     * Used in cs2
     */
    Wingman = 'scrimcomp2v2',

    /**
     * Not used in cs2
     */
    WeaponsExpert = 'scrimcomp5v5',

    /** 
     * Used in cs2
     */
    Casual = 'casual',

    /**
     * Not used in cs2
     */
    Cooperative = 'cooperative',

    /**
     * Not used in cs2, replaced by TrainingDay
     */
    Training = 'training',

    /** 
     * Used in cs2
     */
    Deathmatch = 'deathmatch',

    /** 
     * Used in cs2
     */
    Armsrace = 'gungameprogressive',

    /** 
     * Used in cs2
     */
    Retakes = 'retakes',

    /** 
     * Used in cs2
     */
    TrainingDay = 'new_user_training',

    /** 
     * Not used in cs2
     */
    Demolition = 'gungametrbomb',

    /** 
     * Not used in cs2
     */
    CoopStrike = 'coopmission',

    /** 
     * Not used in cs2
     */
    DangerZone = 'survival',

    /** 
     * Introduced in cs2
     */
    Workshop = 'workshop',
}

export function stringToGameMode(str?: string): GameMode {
    switch (str) {
        case 'custom':
            return GameMode.Custom;
        case 'skirmish':
            return GameMode.Wargames;
        case 'competitive':
            return GameMode.Competitive;
        case 'scrimcomp2v2':
            return GameMode.Wingman;
        case 'scrimcomp5v5':
            return GameMode.WeaponsExpert;
        case 'casual':
            return GameMode.Casual;
        case 'cooperative':
            return GameMode.Cooperative;
        case 'training':
            return GameMode.Training;
        case 'deathmatch':
            return GameMode.Deathmatch;
        case 'gungameprogressive':
            return GameMode.Armsrace;
        case 'retakes':
            return GameMode.Retakes;
        case 'new_user_training':
            return GameMode.TrainingDay;
        case 'gungametrbomb':
            return GameMode.Demolition;
        case 'coopmission':
            return GameMode.CoopStrike;
        case 'survival':
            return GameMode.DangerZone;
        case 'workshop':
            return GameMode.Workshop;
        default:
            return GameMode.Unknown;
    }
}

export enum Team {
    Unknown = 'unknown',
    CT = 'CT',
    T = 'T',
}

export function stringToTeam(str?: string): Team {
    switch (str) {
        case 'CT':
            return Team.CT;
        case 'T':
            return Team.T;
        default:
            return Team.Unknown;
    }
}

export enum Activity {
    Unknown = 'unknown',
    Menu = 'menu',
    Playing = 'playing',
    TextInput = 'textinput',
}

export function stringToActivity(str?: string): Activity {
    switch (str) {
        case 'menu':
            return Activity.Menu;
        case 'playing':
            return Activity.Playing;
        case 'textinput':
            return Activity.TextInput;
        default:
            return Activity.Unknown;
    }
}

export enum RoundPhase {
    Unknown = 'unknown',
    Warmup = 'warmup',
    Live = 'live',
    Over = 'over',
    Freezetime = 'freezetime',
}

export function stringToRoundPhase(str?: string): RoundPhase {
    switch (str) {
        case 'warmup':
            return RoundPhase.Warmup;
        case 'live':
            return RoundPhase.Live;
        case 'over':
            return RoundPhase.Over;
        case 'freezetime':
            return RoundPhase.Freezetime;
        default:
            return RoundPhase.Unknown;
    }
}

export enum CountdownPhase {
    Unknown = 'unknown',
    Warmup = 'warmup',
    Live = 'live',
    Over = 'over',
    Freezetime = 'freezetime',
    /**
     * Phase when the bomb is planted, alongisde phase_ends_in that corresponds to the time remaining until the bomb explodes.
     */
    Bomb = 'bomb',
    /**
     * Phase when the bomb is being defused, alongisde phase_ends_in that corresponds to the time remaining until the bomb is successfully defused.
     */
    Defusing = 'defuse'
}

export function stringToCountdownPhase(str?: string): CountdownPhase {
    switch (str) {
        case 'warmup':
            return CountdownPhase.Warmup;
        case 'live':
            return CountdownPhase.Live;
        case 'over':
            return CountdownPhase.Over;
        case 'freezetime':
            return CountdownPhase.Freezetime;
        case 'bomb':
            return CountdownPhase.Bomb;
        case 'defuse':
            return CountdownPhase.Defusing;
        default:
            return CountdownPhase.Unknown;
    }
}

export enum MapPhase {
    Unknown = 'unknown',
    Warmup = 'warmup',
    Live = 'live',
    Intermission = 'intermission',
    GameOver = 'gameover',
}

export function stringToMapPhase(str?: string): MapPhase {
    switch (str) {
        case 'warmup':
            return MapPhase.Warmup;
        case 'live':
            return MapPhase.Live;
        case 'intermission':
            return MapPhase.Intermission;
        case 'gameover':
            return MapPhase.GameOver;
        default:
            return MapPhase.Unknown;
    }
}

export enum BombState {
    Unknown = 'unknown',
    Carried = 'carried',
    Dropped = 'dropped',
    Planting = 'planting',
    Planted = 'planted',
    Exploded = 'exploded',
    Defusing = 'defusing',
    Defused = 'defused',
}

export function stringToBombState(str?: string): BombState {
    switch (str) {
        case 'carried':
            return BombState.Carried;
        case 'dropped':
            return BombState.Dropped;
        case 'planting':
            return BombState.Planting;
        case 'planted':
            return BombState.Planted;
        case 'exploded':
            return BombState.Exploded;
        case 'defusing':
            return BombState.Defusing;
        case 'defused':
            return BombState.Defused;
        default:
            return BombState.Unknown;
    }
}

/**
 * This enum represents a stable version of the BombState enum, which is used in the round model.
 * It is used to determine the state of the bomb where only the planted, exploded, and defused states are relevant.
 */
export enum StableBombState {
    Unknown = 'unknown',
    Planted = 'planted',
    Exploded = 'exploded',
    Defused = 'defused',
}

export function stringToStableBombState(str?: string): StableBombState {
    switch (str) {
        case 'planted':
            return StableBombState.Planted;
        case 'exploded':
            return StableBombState.Exploded;
        case 'defused':
            return StableBombState.Defused;
        default:
            return StableBombState.Unknown;
    }
}

export enum WeaponState {
    Unknown = 'unknown',
    Active = 'active',
    Holstered = 'holstered',
    Reloading = 'reloading',
}

export function stringToWeaponState(str?: string): WeaponState {
    switch (str) {
        case 'active':
            return WeaponState.Active;
        case 'holstered':
            return WeaponState.Holstered;
        case 'reloading':
            return WeaponState.Reloading;
        default:
            return WeaponState.Unknown;
    }
}

export enum GrenadeType {
    Unknown = 'unknown',
    Smoke = 'smoke',
    Incendiary = 'inferno',
    Molotov = 'firebomb',
    HighExplosive = 'frag',
    Flashbang = 'flashbang',
    Decoy = 'decoy'
}

export function stringToGrenadeType(str?: string): GrenadeType {
    switch (str) {
        case 'smoke':
            return GrenadeType.Smoke;
        case 'inferno':
            return GrenadeType.Incendiary;
        case 'firebomb':
            return GrenadeType.Molotov;
        case 'frag':
            return GrenadeType.HighExplosive;
        case 'flashbang':
            return GrenadeType.Flashbang;
        case 'decoy':
            return GrenadeType.Decoy;
        default:
            return GrenadeType.Unknown;
    }
}

export enum WeaponType {
    Unknown = 'unknown',
    Pistol = 'Pistol',
    Knife = 'Knife',
    SubmachineGun = 'SubmachineGun',
    Rifle = 'Rifle',
    Shotgun = 'Shotgun',
    Grenade = 'Grenade',
    Sniper = 'SniperRifle',
    C4 = 'C4',
    Stackable = 'StackableItem',
    Tablet = 'Tablet',
    Fists = 'Fists',
    BreachCharge = 'BreachCharge',
    Melee = 'Melee'
}

export const WeaponTypeDisplayNames: Record<WeaponType, string> = {
    [WeaponType.Unknown]: 'Unknown',
    [WeaponType.Pistol]: 'Pistol',
    [WeaponType.Knife]: 'Knife',
    [WeaponType.SubmachineGun]: 'Submachine Gun',
    [WeaponType.Rifle]: 'Rifle',
    [WeaponType.Shotgun]: 'Shotgun',
    [WeaponType.Grenade]: 'Grenade',
    [WeaponType.Sniper]: 'Sniper Rifle',
    [WeaponType.C4]: 'C4',
    [WeaponType.Stackable]: 'Stackable Item',
    [WeaponType.Tablet]: 'Tablet',
    [WeaponType.Fists]: 'Fists',
    [WeaponType.BreachCharge]: 'Breach Charge',
    [WeaponType.Melee]: 'Melee',
}

export function stringToWeaponType(str?: string): WeaponType {
    switch (str) {
        case 'Pistol':
            return WeaponType.Pistol;
        case 'Knife':
            return WeaponType.Knife;
        case 'SubmachineGun':
            return WeaponType.SubmachineGun;
        case 'Rifle':
            return WeaponType.Rifle;
        case 'Shotgun':
            return WeaponType.Shotgun;
        case 'Grenade':
            return WeaponType.Grenade;
        case 'SniperRifle':
            return WeaponType.Sniper;
        case 'C4':
            return WeaponType.C4;
        case 'StackableItem':
            return WeaponType.Stackable;
        case 'Tablet':
            return WeaponType.Tablet;
        case 'Fists':
            return WeaponType.Fists;
        case 'BreachCharge':
            return WeaponType.BreachCharge;
        case 'Melee':
            return WeaponType.Melee;
        default:
            return WeaponType.Unknown;
    }
}

export enum RoundWinCondition {
    Unknown = 'unknown',
    CTWinsByElimination = 'ct_win_elimination',
    CTWinsByDefusal = 'ct_win_defuse',
    CTWinsByTimeRunout = 'ct_win_time',
    TWinsByElimination = 't_win_elimination',
    TWinsByExplosion = 't_win_bomb',
}

export function stringToRoundWinCondition(str?: string): RoundWinCondition {
    switch (str) {
        case 'ct_win_elimination':
            return RoundWinCondition.CTWinsByElimination;
        case 'ct_win_defuse':
            return RoundWinCondition.CTWinsByDefusal;
        case 'ct_win_time':
            return RoundWinCondition.CTWinsByTimeRunout;
        case 't_win_elimination':
            return RoundWinCondition.TWinsByElimination;
        case 't_win_bomb':
            return RoundWinCondition.TWinsByExplosion;
        default:
            return RoundWinCondition.Unknown;
    }
}