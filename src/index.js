const Serializer = require('./serializer');
const SerializerError = require('./serializerError');
const KeySerializer = require('./keySerializer');
const CamelcaseSerializer = require('./camelcaseSerializer');
const SnakecaseSerializer = require('./snakecaseSerializer');

const { setCamelcaseKey, setSnakecaseKey, setValue } = require('./utils');

module.exports.Serializer = Serializer;
module.exports.SerializerError = SerializerError;
module.exports.KeySerializer = KeySerializer;
module.exports.CamelcaseSerializer = CamelcaseSerializer;
module.exports.SnakecaseSerializer = SnakecaseSerializer;

module.exports.setCamelcaseKey = setCamelcaseKey;
module.exports.setSnakecaseKey = setSnakecaseKey;
module.exports.setValue = setValue;
