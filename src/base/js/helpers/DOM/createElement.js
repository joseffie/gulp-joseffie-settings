/*! createElement.js
 * (c) Velicko Konstantin
 * MIT License
 * https://github.com/zoxon/gulp-front/blob/master/source/scripts/helpers/dom/createElement.js
 */

/*
 * Example usage:
 * let el = createElement('div', {style: 'color: green'}, 'Hello world!');
 * document.body.appendChild(el);
 */

import { isDomNode } from '../is.js';

export const createElement = (type, properties, ...children) => {
  if (type.constructor === Function) {
    return type(properties);
  }

  const element = document.createElement(type);

  for (const propertyName in properties || {}) {
    if (propertyName.startsWith('on')) {
      element.addEventListener(propertyName.slice(2).toLowerCase(), properties[propertyName]);
    } else {
      element[propertyName] = properties[propertyName];
    }
  }

  for (let child of children || []) {
    if (child) {
      if (child.constructor === String) {
        child = document.createTextNode(child);
      }

      element.append(child);
    }
  }

  return element;
};

export const render = (element, rootComponent) => {
  if (!isDomNode(element)) {
    throw new Error('First parameter should be a DOM Node');
  }

  return element.appendChild(rootComponent());
};
