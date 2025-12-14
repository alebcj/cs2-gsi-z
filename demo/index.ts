import { GSIConfigWriter, GsiService, LEVELS, Logger, Vector3D } from '../src/index.js';

const logger = new Logger({ level: LEVELS.ERROR, showTimestamps: true });
const gsiService = new GsiService({ logger });

const config = GSIConfigWriter.generate({ name: 'cs2-gsi', uri: 'http://localhost:3000' });
console.log(config);

gsiService.start();

gsiService.onAny((eventName, ...args) => {
  if (eventName.startsWith('allPlayers:weaponChanged')) { 
    console.log(eventName, ...args.map(a => {
      if (a.previously instanceof Vector3D) {
        return {
          previouslyL: a.previously.toString(),
          currentL: a.current.toString()
        };
      }

      return a;
    }));
  }
});