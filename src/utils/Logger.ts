// src/utils/Logger.js
import chalk from 'chalk';

export enum LEVELS {
  ERROR = 'Error',
  WARN = 'Warn',
  INFO = 'Info',
  VERBOSE = 'Verbose'
}

export interface LoggerOptions {
  level?: LEVELS,
  showTimestamps?: boolean,
  tag?: string
}

export class Logger {
  private level: LEVELS;
  private showTimestamps: boolean;
  private tag: string;

  constructor({ level = LEVELS.INFO, showTimestamps = true, tag = '' }: LoggerOptions = {}) {
    this.level = level;
    this.showTimestamps = showTimestamps;
    this.tag = tag ? `[${tag}]` : '';
  }

  private timestamp(): string {
    if (!this.showTimestamps) return '';

    const now = new Date();
    const localTime = now.toLocaleTimeString('en-US', { hour12: false }); // HH:MM:SS local
    
    return chalk.gray(`[${localTime}]`);
  }

  private prefix(levelLabel: string, emoji: string): string {
    return `${chalk.blue('[CS2GSIz]')} ${chalk.magenta(this.tag)} ${chalk.bold(levelLabel)} ${emoji}`;
  }

  public log(message: string, ...args: any[]) {
    if (this.level === LEVELS.ERROR || this.level === LEVELS.WARN) return;

    console.log(this.timestamp(), this.prefix(chalk.green('[INFO]'), '🎯'), message, ...args);
  }

  public verbose(message: string, ...args: any[]) {
    if (this.level !== LEVELS.VERBOSE) return;

    console.log(this.timestamp(), this.prefix(chalk.cyan('[VERBOSE]'), '🔍'), message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    if (this.level === LEVELS.ERROR) return;

    console.warn(this.timestamp(), this.prefix(chalk.yellow('[WARN]'), '⚠️'), message, ...args);
  }

  public error(message: string, ...args: any[]) {
    console.error(this.timestamp(), this.prefix(chalk.red('[ERROR]'), '❌'), message, ...args);
  }

  public event(eventName: string, { previously, current }: { previously?: string, current?: string} = {}) {
    if (this.level !== LEVELS.VERBOSE) return;

    let eventInfo = chalk.yellow(eventName);

    if (previously !== undefined || current !== undefined) {
      eventInfo += ` ${chalk.cyan('(')}${chalk.red(previously)}${chalk.cyan(' → ')}${chalk.green(current)}${chalk.cyan(')')}`;
    }

    console.log(this.timestamp(), chalk.magenta('[EVENT]'), chalk.yellow('🎮'), eventInfo);
  }

  public raw(json: string) {
    if (this.level !== LEVELS.VERBOSE) return;

    console.log(this.timestamp(), chalk.gray('[RAW]'), chalk.gray('📥 JSON received:'), JSON.stringify(json, null, 2));
  }

  public setLevel(newLevel: LEVELS) {
    this.level = newLevel;
  }

  public toggleTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }

  public child(tag: string) {
    return new Logger({
      level: this.level,
      showTimestamps: this.showTimestamps,
      tag,
    });
  }
}
