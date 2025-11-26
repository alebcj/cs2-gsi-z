import WebSocket, { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
import { Logger } from '../utils/Logger';

export interface GsiServerOptions {
  port?: number;
  logger?: Logger | null;
}

/**
 * WebSocket server for broadcasting CS2 game state updates to connected clients.
 * Manages client connections and provides real-time game data streaming.
 */
export class GsiServer extends EventEmitter {
  private port: number;
  private clients: Set<WebSocket>;
  private logger: Logger | Console;
  private wss: WebSocketServer | null = null;

  /**
   * Creates a new GsiServer instance.
   * @param {Object} options - Configuration options
   * @param {number} [options.port=4000] - WebSocket server port
   * @param {Logger} [options.logger] - Logger instance
   */
  constructor({ port = 4000, logger = null }: GsiServerOptions = {}) {
    super();
    this.port = port;
    this.clients = new Set();
    this.logger = logger ?? console;
  }

  /**
   * Starts the WebSocket server and begins accepting connections.
   */
  start() {
    this.wss = new WebSocketServer({ port: this.port });

    this.wss.on('connection', (socket) => {
      this.clients.add(socket);
      this.logger.log?.(`🔌 New client connected. Total: ${this.clients.size}`);
      this.emit('clientConnected', socket);

      socket.on('close', () => {
        this.clients.delete(socket);
        this.logger.log?.(`❌ Client disconnected. Remaining: ${this.clients.size}`);
        this.emit('clientDisconnected', socket);
      });

      socket.on('error', (error) => {
        this.clients.delete(socket);
        this.logger.error?.(`⚠️ Client error:`, error);
        this.emit('clientError', error);
      });
    });

    this.logger.log?.(`🌐 WebSocket Server listening on ws://localhost:${this.port}`);
    this.emit('started', this.port);
  }

  /**
   * Broadcasts a message to all connected clients.
   * @param {string} type - Message type identifier
   * @param {Object} payload - Message payload data
   */
  broadcast(type: string, payload: any) {
    const message = JSON.stringify({ type, payload });

    if (this.logger instanceof Logger) {
      this.logger.verbose?.(`📡 Broadcasting message type: ${type}`);
    }

    for (const client of this.clients) {
      if (client.readyState === 1) { // WebSocket.OPEN
        try {
          client.send(message);
        } catch (error) {
          this.logger.error?.('Error sending message to client:', error);
          this.clients.delete(client);
        }
      }
    }
  }

  /**
   * Stops the WebSocket server and closes all connections.
   */
  stop() {
    if (this.wss) {
      this.wss.close(() => {
        this.logger.log?.('🛑 WebSocket Server stopped.');
        this.emit('stopped');
      });
    }
  }

  /**
   * Returns the number of currently connected clients.
   * @returns Number of connected clients
   */
  getClientCount() {
    return this.clients.size;
  }

  /**
   * Checks if the server is currently running.
   * @returns True if server is running
   */
  isRunning() {
    return !!this.wss;
  }
}