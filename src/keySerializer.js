import Serializer from './serializer';
import { isNonArrayObject } from '../build/utils';

class KeySerializer extends Serializer {
  constructor({ descriptor, keyTransform = key => key } = { descriptor: null, keyTransform: key => key }) {
    super({ descriptor, mapAllValues: true, defaultTransform: value => value });
    this.keyTransform = keyTransform;
  }

  getTransformedField(transform, key, value) {
    if (value && isNonArrayObject(value)) {
      return { [this.keyTransform(key)]: this.serialize(value) };
    }
    return { [this.keyTransform(key)]: transform(value) };
  }
}

export default KeySerializer;
