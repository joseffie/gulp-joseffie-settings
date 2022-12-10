import debounce from 'lodash/debounce.js';
import matchWidthResize from '@helpers/matchWidthResize.js';
import Plugin from '@core/Plugin.js';
import init from '@core/init.js';

class Header extends Plugin {
  // eslint-disable-next-line class-methods-use-this
  defaults() {
    return {
      stickyClassName: 'header_sticky',
    };
  }

  init() {
    this.setHeightPropertyOnResize();
    this.scrollHandler();
  }

  bindEvents() {
    window.addEventListener(
      'scroll',
      debounce(this.scrollHandler.bind(this), 20),
    );
  }

  scrollHandler() {
    this.setHeightProperty();
    let isSticky = false;

    if (window.scrollY > 0) {
      isSticky = true;
    }

    this.element.classList.toggle(this.options.stickyClassName, isSticky);
  }

  getHeight() {
    return `${this.element.offsetHeight}px`;
  }

  setHeightProperty() {
    return document.documentElement.style.setProperty(
      '--header-height',
      this.getHeight() || 0,
    );
  }

  setHeightPropertyOnResize() {
    matchWidthResize(() => this.setHeightProperty());
  }
}

export default init(Header, 'header');
