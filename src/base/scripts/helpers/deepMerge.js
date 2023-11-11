import { isObject } from './is.js';

/**
 * Deep merge of two objects
 *
 * @param target
 * @param source
 */
export default function deepMerge(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return target;
}
