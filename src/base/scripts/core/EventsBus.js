import { isArray } from '../helpers/is.js';

export default class EventsBus {
  /**
   * Constructs an EventsBus instance.
   * @param { Object } events
   */
  constructor(events = {}) {
    this.events = events;
  }

  /**
   * Adds listener to the specifed event.
   * @param { string | Array } event
   * @param { Function } handler
   */
  on(event, handler) {
    if (isArray(event)) {
      event.forEach((element) => this.on(element, handler));
    }

    // Create the event's object if not yet created
    if (!Object.constructor.hasOwnProperty.call(this.events, event)) {
      this.events[event] = [];
    }

    // Add the handler to queue
    const index = this.events[event].push(handler) - 1;

    // Provide handle back for removal of event
    return {
      remove() {
        delete this.events[event][index];
      },
    };
  }

  /**
   * Runs registered handlers for specified event.
   * @param { string | Array } event
   * @param { Object } context
   */
  emit(event, context) {
    if (isArray(event)) {
      event.forEach((element) => this.emit(element, context));
    }

    // If the event doesn't exist, or there's no handlers in queue, just leave
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      return;
    }

    // Cycle through events queue, fire!
    this.events[event].forEach((item) => {
      item(context || {});
    });
  }
}
