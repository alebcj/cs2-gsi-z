import { GSIConfigWriter, GsiService, LEVELS, Logger } from '../src/index.js';

const logger = new Logger({ level: LEVELS.ERROR, showTimestamps: true });
const gsiService = new GsiService({ logger });

const config = GSIConfigWriter.generate({ name: 'cs2-gsi', uri: 'http://localhost:3000' });
console.log(config);

gsiService.start();

gsiService.onAny((event, { previously, current }) => {
  console.log(event, previously, '→', current);
});