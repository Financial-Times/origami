# o-big-number [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Typographical styles to highlight and describe a big number. Positioning of the big number, for example to the left in a style of a pull-quote, is left to the user. This is so o-big-number may be used in different contexts without writing extra CSS to remove existing positioning.

----

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-big-number`.

## Markup

A big number has two parts. The big number itself and copy to describe the big number.

```html
<div class="o-big-number">
	<div class="o-big-number__title">&pound;350m</div>
	<div class="o-big-number__content">Cost of the rights expected to increase by one-third — or about £350m a year — although some anticipate inflation of up to 70%</div>
</div>
```

## Sass

To output CSS for o-big-number make a single call to the primary mixin `oBigNumber`.

```scss
// outputs .o-big-number, o-big-number__title, etc
@include oBigNumber();
```

We recommend you use `oBigNumber` and default `o-big-number` classes, however if you are unable to update your markup use the mixins `oBigNumberTitle` and `oBigNumberContent`:

```scss
.my-big-number-title {
    @include oBigNumberTitle();
}

.my-big-number-content {
    @include oBigNumberContent();
}
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.1 | N/A |
