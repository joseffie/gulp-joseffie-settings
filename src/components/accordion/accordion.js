import { slideDown, slideUp, slideStop } from 'slide-anim';
import Plugin from '@core/Plugin.js';
import init from '@core/init.js';
import nodeListToArray from '@/base/scripts/helpers/DOM/nodeListToArray.js';

class Accordion extends Plugin {
  constructor(element, options, name) {
    super(element, options, name);
    this.itemSelector = '[data-accordion-item]';
    this.triggerSelector = '[data-accordion-trigger]';
    this.panelSelector = '[data-accordion-panel]';
    this.itemActiveAttr = 'data-accordion-item-open';
    this.mode = this.element.getAttribute('data-accordion-mode') || 'single'; // "multiple"
    this.duration = 400;

    if (!this.isInited()) {
      this._init();
    }
  }

  buildCache() {
    this.items = nodeListToArray(this.element.querySelectorAll(this.itemSelector))
      .filter((item) => {
        if (this.isItemDisabled(item)) {
          this.setItemDisabled(item);
        }

        if (!this.isOpen(item)) {
          this.getPanel(item).style.display = 'none';
        }

        return !this.isItemDisabled(item);
      });
  }

  isItemDisabled(item) {
    return (
      item.getAttribute('aria-disabled') === 'true'
      || item.hasAttribute('disabled')
    );
  }

  getTrigger(item) {
    return item.querySelector(this.triggerSelector);
  }

  getPanel(item) {
    return item.querySelector(this.panelSelector);
  }

  setItemDisabled(item) {
    this.getTrigger(item).setAttribute('disabled', true);
    this.element.setAttribute('aria-disabled', true);
  }

  bindEvents() {
    this.items.forEach((item) => {
      const trigger = item.querySelector(this.triggerSelector);

      trigger.addEventListener('click', (event) => {
        this.handleTriggerClick(event, item);
      });
    });
  }

  get slideOptions() {
    return {
      duration: this.duration,
    };
  }

  open(item) {
    this.toggleVisibility(item, true);
  }

  close(item) {
    this.toggleVisibility(item, false);
  }

  toggleVisibility(item, visibility) {
    const trigger = this.getTrigger(item);
    const panel = this.getPanel(item);

    item.setAttribute(this.itemActiveAttr, visibility);
    trigger.setAttribute('aria-expanded', visibility);
    panel.setAttribute('aria-hidden', !visibility);

    slideStop(panel);

    if (visibility) {
      slideDown(panel, this.slideOptions);
    } else {
      slideUp(panel, this.slideOptions);
    }
  }

  toggle(item) {
    if (this.isOpen(item)) {
      this.close(item);
    } else {
      this.open(item);
    }
  }

  isOpen(item) {
    return item.getAttribute(this.itemActiveAttr) === 'true';
  }

  handleTriggerClick(event, item) {
    event.preventDefault();

    if (this.mode === 'single') {
      this.items.forEach((index) => {
        if (index !== item) {
          this.close(index);
        }
      });
    }

    this.toggle(item);
  }
}

export default init(Accordion, 'accordion');
