import attrs from 'attrs';

import Plugin from '@core/Plugin.js';
import init from '@core/init.js';
import generateId from '@helpers/generateId.js';

class Dropdown extends Plugin {
  constructor(element, options, name) {
    super(element, options, name);
    this.closeOnOuterClick = true;
    this.closeOnMenuClick = true;
    this.triggerSelector = `[data-${name}-trigger]`;
    this.menuSelector = `[data-${name}-menu]`;
    this.openedMenuAttribute = `data-${name}-open`;
  }

  init() {
    this.setA11yAttrs();

    if (this.isDisabled()) {
      this.setDisabledState();
    }
  }

  buildCache() {
    this.trigger = this.element.querySelector(this.triggerSelector);
    this.dropMenu = this.element.querySelector(this.menuSelector);
    this.menuPositionState = {
      changed: false,
      sideChanged: null,
    };
    this.triggerId = generateId();
  }

  bindEvents() {
    this.trigger.addEventListener('click', () => {
      this.handleMenuIntersectionWithViewport();
      this.toggle();
    });

    this.dropMenu.addEventListener('click', () => {
      if (this.closeOnMenuClick) {
        this.toggle(false);
      }
    });

    document.addEventListener('click', (event) => {
      this.handleOuterClick(event);
    });
  }

  isOpen() {
    return this.element.getAttribute(this.openedMenuAttribute) === 'true';
  }

  /**
   * @param { boolean | undefined } openDropdown
   * @example
   * Dropdown.toggle(true); // open dropdown
   * Dropdown.toggle(false); // close dropdown
   * Dropdown.toggle(); // toggle dropdown to the opposite state
   */
  toggle(openDropdown) {
    this.element.setAttribute(this.openedMenuAttribute, openDropdown ?? !this.isOpen());
    this.trigger.setAttribute('aria-expanded', openDropdown ?? !this.isOpen());
  }

  isDisabled() {
    return (
      this.element.getAttribute('aria-disabled') === 'true'
      || this.element.hasAttribute('disabled')
    );
  }

  handleOuterClick(event) {
    if (!(this.closeOnOuterClick && this.isOpen())) {
      return;
    }

    if (!this.element.contains(event.target)) {
      this.toggle(false);
    }
  }

  setA11yAttrs() {
    this.element.setAttribute(this.openedMenuAttribute, false);

    attrs(this.trigger, {
      'aria-haspopup': true,
      'aria-expanded': false,
      id: this.triggerId,
    });

    this.dropMenu.setAttribute('aria-labelledby', this.triggerId);
  }

  setDisabledState() {
    this.element.setAttribute('aria-disabled', true);
    this.trigger.setAttribute('disabled', true);
  }

  get menuOffset() {
    const menuRect = this.dropMenu.getBoundingClientRect();

    return {
      left: menuRect.left + window.scrollX,
      right: menuRect.right + window.scrollX,
      top: menuRect.top + window.scrollY,
      bottom: menuRect.bottom + window.scrollY,
    };
  }

  get intersectedViewportSide() {
    let intersectedSide = null;

    if (this.menuOffset.left < 10) {
      intersectedSide = 'left';
    } else if (this.menuOffset.right > window.innerWidth - 10) {
      intersectedSide = 'right';
    }

    return intersectedSide;
  }

  handleMenuIntersectionWithViewport() {
    if (!this.intersectedViewportSide) {
      return;
    }

    if (this.menuPositionState.changed) {
      this.dropMenu.style.transform = 'translateX(-50%)';
      this.dropMenu.style.left = '50%';

      if (this.menuPositionState.sideChanged === 'right') {
        this.dropMenu.style.right = 'auto';
      }

      this.menuPositionState.changed = false;
      this.menuPositionState.sideChanged = null;
    }

    if (this.intersectedViewportSide === 'left') {
      this.dropMenu.style.left = 0;
    } else {
      this.dropMenu.style.left = 'auto';
      this.dropMenu.style.right = 0;
    }

    this.dropMenu.style.transform = 'none';
    this.menuPositionState.changed = true;
    this.menuPositionState.sideChanged = this.intersectedViewportSide;
  }
}

export default init(Dropdown, 'dropdown');
