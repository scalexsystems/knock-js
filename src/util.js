export const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key)
                                    && object[key] !== undefined;

export const each = (object, callback) => {
  if (object instanceof Array) {
    object.forEach(callback);
  } else if (typeof object === 'object') {
    const keys = Object.keys(object);
    keys.forEach((key, index) => {
      callback(object[key], key, object, index);
    });
  } else {
    throw new Error(`${typeof object} is not iterable.`);
  }
};

export const set = (object, key, value) => {
  Object.defineProperty(object, key, {
    configurable: true,
    enumerable: true,
    writable: true,
    value,
  });
};

export const unset = (object, key) => {
  Object.defineProperty(object, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: undefined,
  });
};
