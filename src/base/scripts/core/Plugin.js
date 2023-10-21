import EventsBus from './EventsBus.js';

export default class Plugin {
  /**
   * @param { HTMLElement } element
   * @param { Object } options
   * @param { string } name
   */
  constructor(element, options, name) {
    this.name = name;
    this.element = element;
    this.options = options;
    this.events = new EventsBus();
  }

  /**
   * Initializes the `Plugin` class.
   * For the plugin to work, you need to call in the constructor of the plugin class,
   * first making sure that the plugin is not initialized.
   * @example if (!this.isInited()) this._init();
   */
  _init() {
    this.buildCache();
    this.bindEvents();
    this.init();
    this.setInited();
  }

  /**
   * Performs the operations to be done when initializing the plugin.
   * Declared inside the plugin class.
   */
  init() { }

  /**
   * Builds a cache of the class, e.g., initiates new class properties.
   * Declared inside the plugin class.
  */
  buildCache() { }

  /**
   * Binds events used by the plugin.
   * Declared inside the plugin class.
  */
  bindEvents() { }

  /**
   * Assigning `true` to the data-attribute indicates that the plugin is initialized
   */
  setInited() {
    this.element.setAttribute(`data-${this.name}-inited`, true);
  }

  /**
   * Checks if the plugin is initialized
   * @return { boolean } Has plugin initialized?
   */
  isInited() {
    return (
      this.element.getAttribute(`data-${this.name}-inited`) === 'true'
      || this.element.hasAttribute(`data-${this.name}-inited`)
    );
  }

  callback(name, ...parameters) {
    const callback = this.options[name];

    if (typeof callback === 'function') {
      return callback.call(...parameters);
    }

    return false;
  }
}
