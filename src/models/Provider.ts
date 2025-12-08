import { ModelBase } from './ModelBase.js';

export interface ProviderInput {
  name?: string;
  appid?: number;
  version?: number;
  steamid?: string;
  timestamp?: number;
}

/**
 * Represents the current state of the round. */
export class Provider extends ModelBase {
  public name: string;
  public appid: number;
  public version: number;
  public steamid: string;
  public timestamp: number;

  constructor(data: ProviderInput = {}) {
    super();

    if (typeof data !== 'object' || data === null) {
      console.warn('⚠️ Round received invalid data, defaulting to empty object.');

      data = {};
    }

    this.name = this.validateString(data.name);
    this.appid = this.validateNumber(data.appid);
    this.version = this.validateNumber(data.version);
    this.steamid = this.validateString(data.steamid);
    this.timestamp = this.validateNumber(data.timestamp);
  }
}
