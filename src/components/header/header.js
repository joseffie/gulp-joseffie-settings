import debounce from 'lodash/debounce.js';
import matchWidthResize from '@helpers/matchWidthResize.js';
import Plugin from '@core/Plugin.js';
import init from '@core/init.js';

class Header extends Plugin {
  constructor(element, options, name) {
    super(element, options, name);
    this.stickyClassName = 'header_sticky';
  }

  init() {
    this.setHeightProperty();
    this.setHeightPropertyOnResize();
    this.toggleStickyClass();
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      debounce(this.toggleStickyClass.bind(this), 20);
    });
  }

  toggleStickyClass() {
    this.element.classList.toggle(this.stickyClassName, window.scrollY > 0);
  }

  get elementHeight() {
    return this.element.offsetHeight ? `${this.element.offsetHeight}px` : 0;
  }

  setHeightProperty() {
    document.documentElement.style.setProperty('--header-height', this.elementHeight);
  }

  setHeightPropertyOnResize() {
    matchWidthResize(() => {
      this.setHeightProperty();
    });
  }
}

export default init(Header, 'header');
