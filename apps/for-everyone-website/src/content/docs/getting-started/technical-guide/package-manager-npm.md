---
title: Using Components (o3) via npm
description: A reference of components
sidebar:
  label: Technical Guide
  order: 3
---

## Install

To begin install `@financial-times/o3-foundation` as a peer dependency, along with any other Origami packages you need.

For example purposes we'll include:

- ` @financial-times/o3-foundation`
- ` @financial-times/o3-tooltip`
- ` @financial-times/o3-button`

```bash
npm install --save-peer @financial-times/o3-foundation @financial-times/o3-button @financial-times/o3-tooltip
```

## Provide markup

Origami supports multiple brands and themes. First set your brand using the data attribute `data-o3-brand` on a parent element. Optionally, apply a theme using the `data-o3-theme` data attribute. Supported themes are documented in a component's [Storybook](https://o3.origami.ft.com).

```html
<body data-o3-brand="core">
	<!-- Your html -->
</body>
```

Next we need to include the HTML for our components. We can do this in one of two ways:

1. Copy-paste markup from [Storybook](https://o3.origami.ft.com). Or;
2. Import a JSX template from the component.

We recommend using JSX template for React users. This will reduce the number of markup changes required when upgrading to future versions of Origami; and provide markup autocompletion through type definitions.

### HTML from Storybook

This example shows including a button which is described by an "[onboarding tooltip](/components/tooltip/#onboarding-tooltips)" using HTML copied from [Storybook](https://o3.origami.ft.com):

```html
<body data-o3-brand="core">
	<button
		class="o3-button o3-button--secondary"
		id="demo-o3-tooltip-id"
		aria-describedby="o3-tooltip-content"
	>
		Example</button
	><o3-tooltip-onboarding
		target-id="demo-o3-tooltip-id"
		content-id="o3-tooltip-content"
		title="Origami Example"
		content="This is for demo purposes only."
		role="tooltip"
		placement="top"
		class="o3-tooltip"
	></o3-tooltip-onboarding>
</body>
```

### HTML via JSX

This example shows including a button which is described by an "[onboarding tooltip](/components/tooltip/#onboarding-tooltips)" using the component's JSX:

```jsx
import {Button} from '@financial-times/o3-button';
import {TooltipOnboarding} from '@financial-times/o3-tooltip';

<body data-o3-brand="core">
	<Button
		label="Example"
		type="primary"
		attributes={{
			id: 'demo-o3-tooltip-id',
			'aria-describedby': 'o3-tooltip-content',
		}}
	/>
	<TooltipOnboarding
		targetId="demo-o3-tooltip-id"
		contentId="o3-tooltip-content"
		title="Origami Example"
		content="This is for demo purposes only."
		placement="top"
	/>;
</body>;
```

## Import styles

Origami packages include component CSS for each supported brand `/css/[brand].css`. Import these to your CSS globally. For example, for the `core` brand:

```css
@import '@financial-times/o3-foundation/css/core.css';
@import '@financial-times/o3-button/css/core.css';
@import '@financial-times/o3-tooltip/css/core.css';
```

## Import behaviour

Client-side JavaScript for Origami packages if referenced in the `browser` field of their `package.json` where relevant. These are Custom Elements (web components), which are defined automatically on import.

In our example, only `o3-tooltip` has client side JavaScript.

```js
import '@financial-times/o3-tooltip';
```

## Web components and React

... @TODO

## Using Figma as a reference

- Figma to Custom Properties
- Figma component props to JSX
- Figma / Storybook

... @TODO

## VSCode extension recommendations

### Figma For VSCode

[Figma for VSCode](https://marketplace.visualstudio.com/items?itemName=figma.figma-vscode-extension) allows you to navigate and inspect design files within your text editor. You can see at a glance which components a designer has used, what component properties (variants) they have selected, and what design tokens have been used e.g. for colours, spacing, and typography. These benefit from code auto completion based on the selected design.

The following screenshot shows Figma For VSCode suggesting the `--o3-spacing-m` CSS Custom Property based on the selected Figma design.
![Origami code autocompletion from Figma](/assets/images/new/vs-code-1.png)

### CSS Variable Autocomplete

[CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) makes applying Origami foundations such as colours, typography, and spacing far easier as these are published as CSS Custom Properties. Instead of referencing documentation or design files, this plugin allows for autocompletion based on memory and search.

![Origami CSS autocompletion for colours, showing name and hex value](/assets/images/new/vs-code-3.png)

By default CSS Variable Autocomplete does not look up `node_modules` and exceptions are made per file. To autocomplete CSS for any installed Origami component we recommend [setting configuration](https://code.visualstudio.com/docs/getstarted/settings) for CSS Variable Autocomplete to not exclude `node_modules` by default, and instead only look up files we're interested in. This will vary per project E.g:

```json
{
	"cssVariables.lookupFiles": [
		"css/**/*.css",
		"css/**/*.scss",
		"node_modules/@financial-times/o3-*/css/[your-project-brand].css"
	],
	"cssVariables.blacklistFolders": []
}
```

## Customisation

... @TODO
