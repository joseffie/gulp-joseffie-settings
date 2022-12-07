/**
 * Simple is object check
 *
 * @param item
 * @return { boolean }
 */
export const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
 * Deep merge of two objects
 *
 * @param target
 * @param source
 */
const deepMerge = (target, source) => {
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
};

export default deepMerge;
