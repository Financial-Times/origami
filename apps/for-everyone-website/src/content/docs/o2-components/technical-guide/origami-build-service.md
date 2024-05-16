---
title: Using Components (o2) via npm
description: A reference of components
sidebar:
  label: Technical Guide
  order: 3
---

With the [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) you can add components to your website with a single `link` and `script` tag. This is a good approach for:

1. Teams who can't or don't want to maintain front-end build tooling.
2. Projects where customisation and performance is less of a concern.

## Example

To get started with this approach add a Build Service `link` (CSS) and `script` (JavaScript) tag to your project's HTML.

This should include a comma separated list of the Origami components you need; the brand you would like; and the system code of your project. See the [Build Service API reference](https://www.ft.com/__origami/service/build/v3/docs/api#get-v3-bundles-css) for more details.

E.g. To include [o-footer](https://o2-core.origami.ft.com/?path=/docs/components-o-footer-readme--docs) CSS and JavaScript:

```html
<link
	href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-footer@9.2.9&brand=core&system_code=$$$-no-bizops-system-code-$$$"
	rel="stylesheet"
/>

<script
	defer
	src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-footer@9.2.9&brand=core&system_code=$$$-no-bizops-system-code-$$$"
></script>
```

Then copy HTML for your component from [Storybook](https://o2.origami.ft.com/):

```html
<footer
	class="o-footer o-footer--theme-dark"
	data-o-component="o-footer"
	data-o-footer--no-js=""
>
	<!-- footer markup taken from Storybook -->
</footer>
```
