/**
 * 考虑循环引用
 * @param target
 * @returns
 */
export function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    if (map.get(target)) {
      return map.get(target);
    }
    let cloneObj = Array.isArray(target) ? [] : {};
    map.set(target, cloneObj);
    for (let key in target) {
      cloneObj[key] = deepClone(target[key], map);
    }

    return cloneObj;
  } else {
    return target;
  }
}
