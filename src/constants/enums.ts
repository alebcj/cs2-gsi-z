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
        case 'unknown':
            return GameMode.Unknown;
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
        case 'unknown':
            return Team.Unknown;
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
        case 'unknown':
            return Activity.Unknown;
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
        case 'unknown':
            return Phase.Unknown;
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