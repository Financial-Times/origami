# o-private-foundation

> NOTE: this package should ONLY be used in Origami components. If you are not developing a component that is part of this package, please do not use this package. 

A collection of Origami components for use in other Origami components.

- [Usage](#usage)
- [Behaviour](#behaviour)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

_Instructions for the component. We've broken this down by Markup, JavaScript, Sass, etc. You may add more sections as needed._

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-components-in-your-project) to get started with `o-private-foundation`.

## Behaviour

`o-private-foundation` Behaviour description.

## Markup

_Markup documentation for the component. Including css classes, data attributes, and tags for variations of the component._
_Demo markup is also shown in the registry. For complex markup it can be useful to describe the markup and link to the registry demos for a full example._
_Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly._
```html
<div data-o-component="o-private-foundation" class='o-private-foundation'>
</div>
```

## Sass

_Sass documentation. With instructions to include styles with a primary mixin, what options are available, brand support where applicable._
_For complex components it may be helpful to document apis with SassDoc and link to the components SassDoc in the Origami Registry._
_Remember to start your codeblocks with three backticks and "scss" so your markup is syntax highlighted correctly._

Use `@include oPrivateFoundation()` to include styles for all `o-private-foundation` features.

```scss
@import "@financial-times/o-private-foundation";

@include oPrivateFoundation();
```


## JavaScript

_JavaScript documentation. Including how to initialise the component, available options, and common usecases._
_For complex components it may be helpful to document apis with JSDoc and link to the components JSDocs in the Origami Registry._
_Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly._

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) users. If your project is using a manual build process, [initialise  `o-private-foundation` manually](https://origami.ft.com/docs/tutorials/manual-build/).

For example call the `init` method to initialise all `o-private-foundation` instances in the document:

```js
import oPrivateFoundation from 'o-private-foundation';
oPrivateFoundation.init();
```

Or pass an element to initialise a specific `o-private-foundation` instance:

```js
import oPrivateFoundation from 'o-private-foundation';
const oPrivateFoundationElement = document.getElementById('#my-o-private-foundation-element');
oPrivateFoundation.init(oPrivateFoundationElement);
```



## Troubleshooting

_Answers to questions or problems that come up repeatedly._
_It's likely you can delete this section for now. Remember to remove it from the table of contents._

## Contributing

_Contributing documentation for non typical components._
_It's likely you can delete this section if your component conforms with other components._
_Remember to update the table of contents is you remove this section._

## Migration

_Guides to upgrade from one major version of a component to another._
_This section includes a table of major versions with links to `MIGRATION.md`._
_`MIGRATION.md` would provide upgrade instructions, but since this is a new component there is no `MIGRATION.md`._
_Delete this section, including from the table of contents, until there is a second major version of this component._

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-private-foundation,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
`;
};
