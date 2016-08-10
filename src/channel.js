import EventEmitter from 'events';

const NAME = Symbol();
const SUBSCRIBED = Symbol();

export default class Channel extends EventEmitter {
  /**
   * @param {string} name
   * @param {Knock} knock
   */
  constructor(name, knock) {
    super();
    this[NAME] = name;
    this[SUBSCRIBED] = false;
    this.knock = knock;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this[NAME];
  }

  /**
   * @returns {boolean}
   */
  get subscribed() {
    return this[SUBSCRIBED];
  }

  subscribe() {
    if (this.subscribed) return this;

    this.knock.send('subscribe', {}, this.name);

    return this;
  }

  unsubscribe() {
    if (!this.subscribed) return this;

    this.knock.send('unsubscribe', {}, this.name);

    return this;
  }

  trigger(event, data) {
    if (event === 'subscribed') {
      this[SUBSCRIBED] = true;
    }
    this.emit(event, data);
  }
}
