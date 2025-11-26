import { GSIConfigWriter, GsiService, LEVELS, Logger } from '../src/index.js';

const logger = new Logger({ level: LEVELS.VERBOSE, showTimestamps: true });
const gsiService = new GsiService({ logger });

const config = GSIConfigWriter.generate({ name: 'cs2-gsi', uri: 'http://localhost:3000' });
console.log(config);

gsiService.start();

gsiService.onAny((eventName, ...args) => {
  console.log(`📢 Event detected: ${eventName.toString()}`, args);
});

gsiService.on('player:weaponChanged', ({ previously, current }) => {
  console.log('🔫 Weapon changed:', previously.name, '→', current.name);
});

gsiService.on('player:ammoClipChanged', ({ previously, current }) => {
  console.log('💥 Ammo clip changed:', previously, '→', current);
});

gsiService.on('player:ammoReserveChanged', ({ previously, current }) => {
  console.log('💥 Ammo reserve changed:', previously, '→', current);
});