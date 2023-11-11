import {
  isDomNode,
  isString,
  isArray,
} from '../helpers/is.js';

export const getSelector = (selector) => {
  if (!selector) {
    return [document.body];
  }

  if (isArray(selector)) {
    return selector;
  }

  return [selector];
};

export default (Plugin, name = 'plugin') => (_selectors, options = {}) => {
  const selectors = getSelector(_selectors);
  const instances = [];

  selectors.forEach((selector) => {
    if (selector && isString(selector)) {
      const elements = Array.from(document.querySelectorAll(selector));

      elements.forEach((element) => {
        instances.push(new Plugin(element, options, name)._init());
      });
    }

    if (isDomNode(selector)) {
      instances.push(new Plugin(selector, options, name)._init());
    }
  });

  return instances;
};
