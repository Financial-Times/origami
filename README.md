# o-autocomplete

An origami component for autocomplete inputs

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-autocomplete`.

## Markup

```html
<div data-o-component="o-autocomplete" class='o-autocomplete'>
</div>
```

## Sass

Use `@include oAutocomplete()` to include styles for all `o-autocomplete` features.

```scss
@import "@financial-times/o-autocomplete";

@include oAutocomplete();
```

## JavaScript

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) users. If your project is using a manual build process, [initialise  `o-autocomplete` manually](https://origami.ft.com/docs/components/initialising/).

For example call the `init` method to initialise all `o-autocomplete` instances in the document:

```js
import oAutocomplete from 'o-autocomplete';
oAutocomplete.init();
```

Or pass an element to initialise a specific `o-autocomplete` instance:

```js
import oAutocomplete from 'o-autocomplete';
const oAutocompleteElement = document.getElementById('#my-o-autocomplete-element');
oAutocomplete.init(oAutocompleteElement);
```

[Learn more about Origami component initialisation](https://origami.ft.com/docs/components/initialising/).


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 1 | 1.0 | N/A |

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autocomplete/issues), visit [##origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
