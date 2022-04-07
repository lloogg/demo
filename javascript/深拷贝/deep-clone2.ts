export function deepClone(target) {
  if (typeof target === 'object') {
    let cloneObj = Array.isArray(target) ? [] : {};
    for (let key in target) {
      cloneObj[key] = deepClone(target[key]);
    }
    return cloneObj;
  } else {
    return target;
  }
}
