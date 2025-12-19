import http from 'node:http';
import { EventEmitter } from 'events';
import { Logger } from '../utils/Logger';

export interface GsiListenerOptions {
  logger?: Logger | null;
  port?: number;
  allowedUAs?: string[];
  enableUACheck?: boolean;
}

export class GsiListener extends EventEmitter {
  private logger: Logger | Console;
  private port: number;
  private allowedUAs: string[];
  private enableUACheck = true;
  private server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | null = null;

  constructor({ logger = null, port = 3000, allowedUAs = ["Valve/Steam HTTP Client 1.0 (730)"], enableUACheck = true }: GsiListenerOptions = {}) {
    super();

    this.logger = logger?.child ? logger.child('GsiListener') : console;
    this.port = port;
    this.allowedUAs = allowedUAs;
    this.enableUACheck = enableUACheck;
    this.logger.log('GsiListener instantiated correctly.');
  }

  start(port = 3000) {
    this.port = port;
    this.logger.log(`Starting GsiListener on port ${port}...`);

    this.server = http.createServer(this.handleHttp.bind(this));

    this.server.listen(port, () => {
      this.emit('ready', port);
      this.logger.log(`GsiListener listening on port ${port}`);
    });

    this.server.on('error', (err) => {
      this.logger.error('Error in GsiListener:', err);
      this.emit('error', err);
    });
  }

  handleHttp(req: http.IncomingMessage, res: http.ServerResponse) {
    if (this.enableUACheck && (!req.headers['user-agent'] || !this.allowedUAs.includes(req.headers['user-agent']))) {
      this.logger.warn(`Request not allowed: User-Agent ${req.headers['user-agent']}`);
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'User-Agent not allowed' }));

      return;
    }

    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => (body += chunk));
      
      req.on('end', () => {
        try {
          const json = JSON.parse(body);
          
          // Validate Basic Structure
          if (!json || typeof json !== 'object') {
            throw new Error('Invalid GSI payload structure');
          }
          
          if (this.logger instanceof Logger) {
            this.logger.verbose('📥 Valid GSI payload received');
            this.logger.verbose(JSON.stringify(json, null, 2));
          }
          
          this.emit('gsiUpdate', json);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'OK' }));
          
        } catch (err: any) {
          this.logger.error('Error parsing GSI payload:', err);
          this.logger.log('Raw payload:', body);
          this.emit('error', err);
          
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'Invalid JSON payload',
            message: err.message 
          }));
        }
      });
      
      req.on('error', (err) => {
        this.logger.error('HTTP request error:', err);
        res.writeHead(500);
        res.end();
      });
      
    } else {
      this.logger.warn(`Request not allowed: ${req.method} ${req.url}`);
      res.writeHead(405, { 'Allow': 'POST' });
      res.end(JSON.stringify({ error: 'Only POST method allowed' }));
    }
  }

  stop() {
    if (this.server) {
      this.server.close(() => {
        this.logger.log('GsiListener stopped.');
      });
    } else {
      this.logger.warn('Attempt to stop GsiListener but was not started.');
    }
  }
}
