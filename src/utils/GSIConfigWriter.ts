export class GSIConfigWriter {
  static generate({ name = "cs2-gsi", uri = "http://localhost:3000" } = {}) {
    const data = `"${name}"
{
  "uri"          "${uri}"
  "timeout"      "3.0"
  "buffer"       "0.0"
  "throttle"     "0.0"
  "heartbeat"    "30.0"
  "data"
  {
    "provider"                  "1"
    "map"                       "1"
    "map_round_wins"            "1"
    "round"                     "1"
    "player_id"                 "1"
    "player_state"              "1"
    "player_weapons"            "1"
    "player_match_stats"        "1"
    "player_position"           "1"
    "phase_countdowns"          "1"
    "allplayers_id"             "1"
    "allplayers_state"          "1"
    "allplayers_match_stats"    "1"
    "allplayers_weapons"        "1"
    "allplayers_position"       "1"
    "allgrenades"               "1"
    "bomb"                      "1"
  }
}`;

    return data;
  }
}
