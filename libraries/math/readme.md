# math

A temporary helper library to avoid newer dart-sass versions printing warnings when compiling Origami.

- [Usage](#usage)
- [Licence](#licence)

## Usage

To use this library, import it via `@import '@financial-times/math';`.

After importing the library, you will have access to all the functions defined in [mathsass@0.10.1](https://github.com/terkel/mathsass/tree/v0.10.1) and the below function as well as:

- [div](#div) - Returns the result of dividing the first number by the second number.

### div

Returns the result of dividing the first number by the second number.

This behaves in the same way as the deprecated `/` operator in sass.

```scss
@import '@financial-times/math';

@debug div(10, 2); // 5
```

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
