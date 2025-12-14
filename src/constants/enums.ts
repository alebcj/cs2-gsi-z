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

export enum Phase {
    Unknown = 'unknown',
    Warmup = 'warmup',
    Live = 'live',
    Over = 'over',
    Freezetime = 'freezetime',
}

export function stringToPhase(str?: string): Phase {
    switch (str) {
        case 'warmup':
            return Phase.Warmup;
        case 'live':
            return Phase.Live;
        case 'over':
            return Phase.Over;
        case 'freezetime':
            return Phase.Freezetime;
        default:
            return Phase.Unknown;
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