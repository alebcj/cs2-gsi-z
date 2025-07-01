import fs from 'fs';
import path from 'path';

export class GSIConfigWriter {
  static generate({ name = 'cs2-gsi', uri = 'http://localhost:3000', outputPath = null } = {}) {
    const filename = `gamestate_integration_${name}.cfg`;
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
    "round"                     "1"
    "player_id"                 "1"
    "player_state"              "1"
    "player_weapons"            "1"
    "player_match_stats"        "1"
  }
}`;

    if (!outputPath) {
      const desktop = path.join(process.env.HOME || process.env.USERPROFILE || '.', 'Desktop');
      outputPath = path.join(desktop, filename);
    } else {
      outputPath = path.join(outputPath, filename);
    }

    fs.writeFileSync(outputPath, data);
    return outputPath;
  }
}
