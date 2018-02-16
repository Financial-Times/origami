o-brand [![Circle CI](https://circleci.com/gh/Financial-Times/o-brand/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-brand/tree/master)
=================

**⚠️ This is a work in progress ⚠️**

Tools to "brand" Origami components. `o-brand` is intended as an internal tool and is not recommended for use outside of Origami components.

- [Terms](#terms)
- [Usage](#usage)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Terms

### Brand

A brand is a collection of configuration to tailor a component for specifc usecases. A branded Origami component is able to output the correct visual style and features for a requested brand.

Examples of brands include:

- Master: FT branding for public ft.com sites and affiliates.
- Internal: A minimal style with subtle branding for internal products, tools, and documentation.
- Whitelabel: Base, structural styles only.

### Variants

A branded component may contain a number of variants e.g. a button component may provide a "big" and "small" variant. Variants may modify the appearance or functionality of a component. They may override default brand styles, e.g. change the colour of a button. Variants may also require new markup e.g. to add a breadcrumb to a header component. Variants must be optional and build upon a fully functional branded component.

## Usage

Mixins within `o-brand` help configure components to support brands. There is no configuration in `o-brand`. It provides the mechanisms for components to apply their own brand support.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-brand/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
