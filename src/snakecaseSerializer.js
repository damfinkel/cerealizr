import KeySerializer from './keySerializer';
import snakecase from 'lodash.snakecase';

class SnakecaseSerializer extends KeySerializer {
  constructor({ descriptor } = {}) {
    super({ descriptor, keyTransform: snakecase });
  }
}

export default SnakecaseSerializer;
