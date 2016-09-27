# Loading

This is an [Origami](http://origami.ft.com/) module that provides a visual loading indicator. For installation instructions, see the [registry page](http://registry.origami.ft.com/components/o-loading).

## Usage

Loading indicators come in the following themes:

- light
- dark

And the following sizes:

- small
- medium
- large

### Mixins, silent mode and classes

> Mixins and silent mode are only available if you're including o-loading in your project using Bower. If you're using o-loading via the build service, you must use the o-loading classes instead. Both are documented below.

[Full documentation of mixins and variables](http://sassdoc.webservices.ft.com/v1/sassdoc/o-loading)

#### Default loading indicator

```html
<div class="o-loading o-loading--light o-loading--small"></div>
```

```scss
$o-loading-is-silent: false;
@import 'o-loading/main';
```

#### Custom loading indicator

```scss
@import 'o-loading/main';

.my-custom-indicator {
    @include oLoading();
    @include oLoadingSize('small');
    @include oLoadingColor('light');
}
```

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
