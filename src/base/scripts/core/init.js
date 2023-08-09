import {
  isDomNode,
  isString,
  isArray,
  isUndefined,
  isNull,
} from '../helpers/is.js';
import nodeListToArray from '../helpers/DOM/nodeListToArray.js';

export const getSelector = (selector) => {
  if (isUndefined(selector) || isNull(selector)) {
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
      const elements = nodeListToArray(document.querySelectorAll(selector));

      elements.forEach((element) => {
        instances.push(new Plugin(element, options, name));
      });
    }

    if (isDomNode(selector)) {
      instances.push(new Plugin(selector, options, name));
    }
  });

  return instances;
};
