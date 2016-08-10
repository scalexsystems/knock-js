import socket from 'engine.io-client';
import Channel from './channel';
import { has, each, set, unset } from './util';

export default class Knock {
  /**
   * Connect to Knock server.
   * @param {string} uri
   * @param {object} [options]
   */
  constructor(uri, options) {
    this.socket = socket(uri, options);
    this.options = options;
    this.connected = false;
    this.channels = {};

    this.boot();
  }

  /**
   * @private
   */
  boot() {
    this.socket.on('open', () => {
      this.connected = true;
      this.onConnection();
      this.socket.on('message', (message) => {
        const response = JSON.parse(message);
        const { event, channel, data } = response;
        if (has(this.channels, channel)) {
          if (event === 'unsubscribed') {
            unset(this.channels, channel);
          } else {
            this.channels[channel].trigger(event, data);
          }
        }
      });
      this.socket.on('close', () => {
        this.connected = false;
        this.onDisconnection();
      });
    });
  }

  /**
   * @private
   * @param {string} event
   * @param {object} data
   * @param {string|null} [channel]
   */
  send(event, data = {}, channel = null) {
    if (channel) {
      const auth = data.auth || {};
      this.socket.send({ event, channel, data, auth });
    } else {
      this.socket.send(event, data);
    }
  }

  /**
   * @private
   */
  onConnection() {
    each(this.channels, (channel) => channel.subscribe());
  }

  /**
   * @private
   */
  onDisconnection() {
    each(this.channels, (channel) => channel.unsubscribe());
  }

  /**
   * Subscribe a channel.
   * @param {string} name
   * @returns {Channel}
   */
  subscribe(name) {
    let channel;

    if (has(this.channels, name)) {
      channel = this.channels[name];
    } else {
      channel = new Channel(name, this);
      set(this.channels, name, channel);
    }

    if (this.connected) {
      channel.subscribe();
    }

    return channel;
  }

  /**
   * Unsubscribe a channel.
   * @param {string} name
   */
  unsubscribe(name) {
    if (has(this.channels, name)) {
      const channel = this.channels[name];

      if (this.connected) {
        channel.unsubscribe();
      } else {
        unset(this.channels, name);
      }
    }
  }
}
