---
title: Using components (o2) with the Origami Build Service
description: A reference of components
sidebar:
  order: 3
  hidden: true
---

With the [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) you can add "o2" components to your website with a single `link` and `script` tag. This is a good approach for:

1. Teams who can't or don't want to maintain front-end build tooling.
2. Projects where customisation and performance is less of a concern.

Note that the Origami Build Service doesn't support newer "o3" components. Please [let the team know](/getting-started/support/) if this is a feature you would like to see.

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

Then copy HTML for your component from [Storybook](https://o2.origami.ft.com/?path=/story/o2-core_components-o-footer-dark-theme--darktheme&globals=backgrounds:!undefined). To do so, find a component in the sidebar that meets your needs and then select the "HTML" tab.

Components also include a markup section in their [README file](https://o2.origami.ft.com/?path=/docs/o2-core_components-o-footer-readme--docs#markup) which describes their HTML structure and possible modifications. This is also available for each component from the [Storybook](https://o2.origami.ft.com/?path=/story/o2-core_components-o-footer-dark-theme--darktheme&globals=backgrounds:!undefined) sidebar.

```html
<footer
	class="o-footer o-footer--theme-dark"
	data-o-component="o-footer"
	data-o-footer--no-js=""
>
	<!-- footer markup taken from Storybook -->
</footer>
```

If you have questions or need help please [reach out to the Origami team](/getting-started/support/) at any time.
