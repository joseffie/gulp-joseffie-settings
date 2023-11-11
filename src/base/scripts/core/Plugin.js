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
  }

  _init() {
    if (this.isInited()) {
      return;
    }

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
}
