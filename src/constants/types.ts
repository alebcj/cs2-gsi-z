export type STEAMID64 = `${number}` | UNKNOWN;
export type UNKNOWN = "unknown";

export type GRENADEID = `${number}`;

export function isSteamId64(str: any): str is STEAMID64 {
    return !!(typeof str === "string" && str.length === 17 && str.match(/^[0-9]+$/));
}