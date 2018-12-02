import toCamelcase from 'lodash.camelcase';
import toSnakecase from 'lodash.snakecase';

// Private functions

export const isArray = value => value.constructor === Array;

export const isNonArrayObject = value => typeof value === 'object' && !isArray(value);

// Public functions

export const setValue = value => key => ({ [key]: value });

export const setCamelcaseKey = (transformValue = value => value) => (key, value) => ({
  [toCamelcase(key)]: transformValue(value)
});

export const setSnakecaseKey = (transformValue = value => value) => (key, value) => ({
  [toSnakecase(key)]: transformValue(value)
});
