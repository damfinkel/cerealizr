import KeySerializer from './keySerializer';
import camelcase from 'lodash.camelcase';

class CamelcaseSerializer extends KeySerializer {
  constructor({ descriptor } = {}) {
    super({ descriptor, keyTransform: camelcase });
  }
}

export default CamelcaseSerializer;
