---
title: Using Components (o2) via npm
description: A reference of components
sidebar:
  label: Technical Guide
  order: 3
---

This guide shows an example of including "o2" Origami components in a project via npm.

"o2" npm packages include [Sass](https://sass-lang.com/) and JavaScript, which your project must bundle. Whilst some "o2" packages include TSX templates, most people copy [HTML from Storybook](https://o2-internal.origami.ft.com/?path=/story/components-o-table-basic--basic).

Knowledge about these and other technologies is assumed. We also assume you're already setup to bundle assets, e.g. transpile Sass to CSS.

If you have questions or need further help please [reach out to the Origami team](/getting-started/proposal-process/).

## Install npm peer dependencies

Install as peer dependencies to ensure only one version of an Origami package is installed for your project. This is to avoid technical conflicts, ensure consistency of the user experience, and reduce bundle sizes.

E.g.

```bash
npm install --save-peer @financial-times/o-colors @financial-times/o-table
```

## Include HTML

Whilst some "o2" packages include TSX templates, most people copy [HTML from Storybook](https://o2-internal.origami.ft.com/?path=/story/components-o-table-basic--basic).

```html
<table class="o-table o-table--horizontal-lines" data-o-component="o-table">
	<!-- table markup taken from Storybook -->
</table>
```

## Include Sass

1. Set a `$o-brand` Sass variable for your project (one of `core`, `internal`, or `whitelabel`).
1. Set a `$system-code` Sass variable to the [BizOps System Code](https://biz-ops.in.ft.com/list/Systems) for your project, or `$$$-no-bizops-system-code-$$$` if your project does not relate to a System.
1. Import the `main` Sass file of your installed packages.

E.g.

```scss
$o-brand: 'core';
$system-code: '$$$-no-bizops-system-code-$$$';
@import '@financial-times/o-colors/main';
@import '@financial-times/o-table/main';
```

By default, including Origami Sass does not output any CSS. Use the component's Sass API, documented for each component in Storybook, to output styles.

E.g. To [set the page background](https://o2-internal.origami.ft.com/?path=/docs/components-o-colors-sassdoc--docs&globals=backgrounds:!undefined#ocolorsbyusecase-) and [output all table styles](https://o2-internal.origami.ft.com/?path=/docs/components-o-table-sassdoc--docs&globals=backgrounds:!undefined#otable).

```scss
body {
	backgorund-color: oColorsByUsecase('page', 'background');
}
@include oTable();
```

## Include JavaScript

We may then import the component's client side JavaScript.

E.g. o-table

```js
import oTable from '@financial-times/o-table';
```

By default this will do nothing until we initialise the table. We can do that in 3 ways, using `o-table` as an example:

```js
// Initialise all o-table instances found on the page
oTable.init();
```

```js
// Initialise all o-table instances
// found within a given DOM element
oTable.init(HTMLElement);
```

```js
// Initialise a specific o-table element
const myTable = oTable(myTableHTMLElement);
```
