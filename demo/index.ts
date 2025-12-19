import {
  GSIConfigWriter,
  GsiService,
  LEVELS,
  Logger,
  Vector3D,
} from "../src/index";

const logger = new Logger({ level: LEVELS.ERROR, showTimestamps: true });
const gsiService = new GsiService({ logger });

const config = GSIConfigWriter.generate({
  name: "cs2-gsi",
  uri: "http://localhost:3000",
});
console.log(config);

gsiService.start();

gsiService.onAny((eventName, ...args) => {
  if (
    eventName.startsWith("allPlayers:killsChanged") ||
    eventName.startsWith("allPlayers:deathsChanged") ||
    eventName.startsWith("allPlayers:assistsChanged") ||
    eventName.startsWith("allPlayers:mvpsChanged") ||
    eventName.startsWith("allPlayers:scoreChanged")
  ) {
    console.log(
      eventName,
      ...args.map((a) => {
        if (a.previously instanceof Vector3D) {
          return {
            previously: a.previously.toString(),
            current: a.current.toString(),
          };
        }

        return a;
      })
    );
  }
});
