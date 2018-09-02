const KeySerializer = require('./keySerializer');
const snakecase = require('lodash.snakecase');

class SnakecaseSerializer extends KeySerializer {
  constructor({ descriptor } = {}) {
    super({ descriptor, keyTransform: snakecase });
  }
}

module.exports = SnakecaseSerializer;
