const Serializer = require('./src/serializer');
const SerializerError = require('./src/serializerError');
const KeySerializer = require('./src/keySerializer');
const CamelcaseSerializer = require('./src/camelcaseSerializer');
const SnakecaseSerializer = require('./src/snakecaseSerializer');

const { setCamelcaseKey, setSnakecaseKey, setValue } = require('./src/utils');

module.exports.Serializer = Serializer;
module.exports.SerializerError = SerializerError;
module.exports.KeySerializer = KeySerializer;
module.exports.CamelcaseSerializer = CamelcaseSerializer;
module.exports.SnakecaseSerializer = SnakecaseSerializer;

module.exports.setCamelcaseKey = setCamelcaseKey;
module.exports.setSnakecaseKey = setSnakecaseKey;
module.exports.setValue = setValue;
