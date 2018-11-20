# cerealizr

A simple library to transform objects.

# Installation

```
$ npm i cerealizr # or yarn add cerealizr
```

# What is it good for?

Cerealizr provides a Serializer class which allows you to transform objects into whatever you want. It's specially useful for transforming API requests or responses into nicely formatted and useful data to use in your app.

# Basic Usage

```
const Serializer = require('cerealizr');

const someObject = {
  id: 1,
  first_name: 'John',
  country_id: 200,
  nicknames: ['johny', 'dude'],
  unmapped_key: 'no mapping'
};

const serializer = new Serializer({
  descriptor: {
    id: 'id',
    first_name: 'firstName',
    nicknames: 'nicknames',
    country_id: (key, value) => ({ [`${key}_number`]: value + 100 })
  },
  mapAllValues: false
});

serializer.serialize(someObject);
/*
Result:
{
  id: 1,
  firstName: 'John',
  country_id_number: 300,
  nicknames: ['johny', 'dude']
}
*/
```

# Classes and functions

### Serializer

Serializer accepts an object with the following parameters:

| Parameter        | Type                        | Description                                                                                                                                                              | Default Value                        |
| ---------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| descriptor       | Object                      | Defines how map your objects. Keys should match with the ones the original object has, and values can be strings (to map keys) or functions (to map keys and/or values). | -                                    |
| mapAllValues     | Boolean                     | Defines if keys missing in the descriptor will be mapped.                                                                                                                | `false`                              |
| defaultTransform | Function `(a, b) => Object` | How to transform those keys that weren't defined in the descriptor. The object that returns **MUST** have only one key. Only works if `mapAllValues` is set to `true`.   | `(key, value) => ({ [key]: value })` |

### CamelcaseSerializer && SnakecaseSerializer

This are special serializers. This serializers map the all the keys as camelcase/snakecase. This can be overridden with the descriptor. The reason this classes are provided, is because it's a usual use case to map an object from and to JSON.

For the time being, they only receive a `descriptor` parameter and it always maps all values.
Also, the function used as values in the descriptor can only map values, as the key tranform is already defined:

```
const { CamelcaseSerializer } = require('cerealizr');

const someObject = {
  id: 1,
  first_name: 'John',
  country_id: 200,
  nicknames: ['johny', 'dude'],
  unmapped_key: 'no mapping'
};

const serializer = new CamelcaseSerializer({
  descriptor: {
    country_id: (value) => value + 100
  }
});

serializer.serialize(someObject);
/*
Result:
{
  id: 1,
  firstName: 'John',
  countryId: 300,
  nicknames: ['johny', 'dude'],
  unmappedKey: 'no mapping'
}
*/
```

### Useful functions

##### setValue

Allows to pass a hardcoded value to a descriptor:

```
const descriptor = { id: 'ID', some_key: setValue(1000) }
```

##### setCamelcaseKey && setSnakecaseKey

Maps the key to camelcase/snakecase and receives a function (which defaults to `value => value`) to map the value:

```
const descriptor = { id: 'ID', some_key: setCamelcaseKey(value => value + 100) }
```

### Custom Serializers

You can define your own serializers! Both CamelcaseSerializer and SnakecaseSerializer extend KeySerializer, which in turn extends Serializer defining a function to map the key. You can extend KeySerializer to define how to map keys, just as those serializers do.

If you want even more custom behaviour, you can even extend Serializer and override its methods.
