---
title: Create A New Origami Component - Part 6 Storybook
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false
collection_id: tutorials
---

# Create A New Origami Component - Part 6 Storybook

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:

1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. Storybook
7. [Testing](/documentation/tutorials/create-a-new-component-part-7/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-8/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-9/)

In part six we will rewrite `demo.mustache` into tsx template, we will use our component's javascript code to initialise interactivity for storybook demos and implement all the variants of our component.

## Storybook

We are aiming to replace the Origami Registry that is currently used to view demos and documentation for Origami components with a new Storybook interface. The reasoning behind choosing Storybook is that it is a well known and widely used tool for documenting and making highly interactive UI demos. Storybook demos are written in [JSX](https://reactjs.org/docs/introducing-jsx.html) and can be written in JavaScript or TypeScript. JSX is a syntax extension to JavaScript that allows you to write HTML-like code in JavaScript. It is a very powerful tool that allows you to write highly interactive demos and documentation for your component. It is also a very popular tool that is mostly used by [React](https://reactjs.org/) (the most popular javascript framework) developers.

Our TSX (JSX + [typeScript](https://www.typescriptlang.org/)) templates don't use React specific imports in them and we are leveraging [JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) which enables us to use JSX without importing React and therefore making it somewhat framework agnostic.

To run storybook locally run `npm run storybook` from your root directory. This will start a localhost server automatically.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-23-storybook.png" />
	<figcaption>
        A list of storybook components. There should be o-example displayed in the side navigation bar.
	</figcaption>
</figure>

## Styles

Once the storybook dev server is running we notice that some styles are already applied to our component. This is coming from `o-example/stories/example.scss` file which is imported by `example.stories.tsx`. `example.stories.tsx` is where we define our demos and its variants, [controls](https://storybook.js.org/docs/react/essentials/controls#gatsby-focus-wrapper) and anything related to storybook demos.

## Brands

When we were working on [implementing brand](/documentation/tutorials/create-a-new-component-part-3/#component-brands) variants for our component we noticed that our build server generated different `html` files for us and we could swap between them. In storybook we will need to restart our dev server and provide an environment variable. To start internal component demos in storybook you will need to run `ORIGAMI_STORYBOOK_BRAND=internal npm run storybook` and similarly for whitelababel you can run `ORIGAMI_STORYBOOK_BRAND=whitelabel npm run storybook`.

## TSX template

`npm run create-component` generated a TSX ([JSX](https://reactjs.org/docs/jsx-in-depth.html) + [typeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html)) boilerplate template as well.

The code in `example.tsx` will be very similar to what we have in `demo.mustache` but with different syntax:

<pre><code class="o-syntax-highlight--js">// src/tsx/example.tsx

type ExampleProps = {
	theme: string
}

export function Example({theme}: {theme: ExampleProps}) {
	const classNames = theme ? `o-example o-example--${theme}` : 'o-example'
	return (
		&lt;div id="element" className={classNames} data-o-component="o-example">
			Hello world, I am a component named o-example!
			&lt;span className="o-example__counter">
				You have clicked this lovely button &lt;span data-o-example-current-count>0&lt;/span> times.
				&lt;button className="o-example__button">count&lt;/button>
			&lt;/span>
		&lt;/div>
	)
}
</code></pre>

But let's break this down a bit and compare it to the `demo.mustache` file.

1. First thing we notice is `ExampleProps` [type declaration](https://www.typescriptlang.org/docs/handbook/basic-types.html) for our [component props](https://reactjs.org/docs/components-and-props.html). This type declaration is used to make sure that our component is given an object argument with a `theme` property of type string.
2. Second thing we notice is that we are using the [JSX syntax](https://reactjs.org/docs/jsx-in-depth.html) to write our component and return it from the `Example` function.
3. Syntax for [JSX](https://reactjs.org/docs/jsx-in-depth.html) and Mustache are slightly different. In [JSX](https://reactjs.org/docs/jsx-in-depth.html) we use `className` instead of `class` and we are passing theme prop to our JSX using literal string (`${theme}`) syntax.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-24-storybook.png" />
	<figcaption>
        Example demo in storybook.
	</figcaption>
</figure>

While working with different brands you might encounter examples where certain variations/themes are supported in one brand but not in another. For example o-message Action message supports internal and whitelabel brands but not core. In this kind of situation create brand specific folders inside the `stories` directory and our storybook configuration will take care of the rest. Example directory structure:

`stories/*.stories.tsx` - stories for all brands
`stories/[brand]/*.stories.tsx` - stories for a specific brand
`stories/shared/.tsx` - exports stories for re-export to support multiple specific brands (no .stories extension)

If your component supports only one brand you don't need a brand specific `stories` directory structure for this, since `origami.json` will make our storybook configuration aware that there is only one brand and it will skip builds for other brands.

## Adding button

Our demo is missing the count button and it's related sentence. When we discussed [browser support](/documentation/tutorials/create-a-new-component-part-5/#browser-support) we decided to display count functionality if JS was enabled. In this case we have written a TSX template but never initialised components javascript. To do so we will need to update our `example.stories.tsx` file by adding the following code:

<pre><code class="o-syntax-highlight--diff">// stories/example.stories.tsx

+ import {useEffect} from 'react';
+ import javascript from '../main';
// ....

- const ExampleStory = args => &lt;Example {...args} />;
+ const ExampleStory = args => {
+	 useEffect(() => {
+		javascript.init()
+	 })
+	 return &lt;Example {...args} />
+ };
// ....
</code></pre>

First of all we will need to import [`useEffect` hook](https://reactjs.org/docs/hooks-effect.html) from React. Component TSX templates aim to make no framework assumption, so Origami users can benefit from templates in production whilst using other frameworks such as React. Our Storybook demos on the other hand are private and are not included in other projects, these are written specifically in React. Initialising component javascript with `useEffect` should display the count button and number of times it was clicked.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-25-storybook.png" />
	<figcaption>
        Example demo in storybook that also has counter functionality working.
	</figcaption>
</figure>

## Theming

We already discussed how to run different brands in storybook but we still need to cover the theming part. This is the area where storybook really starts to shine. We provided theme as a prop for our JSX component and it would be amazing if we had a drop down where we could select a theme and immediately see how certain themes effect our component.

The code below dynamically creates labels and options for correct brand. We use Storybook controls to make theming easier, have better demos where experimenting is easier and developers can integrate correct version of component into their code.
The code below dynamically creates labels and options for the current brand. We use Storybook controls to have better demos where experimenting with component options and content is easier, allowing developers and designers to integrate Origami in their project.

<pre><code class="o-syntax-highlight--diff">// stories/example.stories.tsx

// ....
export const DefaultExample: ComponentStory&lt;typeof Example> = ExampleStory.bind(
 	{}
);

+ const themeOptions: string[] = ['', 'inverse']
+ const controlLabels: Record&lt;string, string> = {
+ 	'': 'Default',
+ 	inverse: 'Inverse',
+ }
+
+ const Brand = process.env.STORYBOOK_BRAND || 'core';
+
+ if (Brand === 'core') {
+ 	themeOptions.push('b2c')
+ 	controlLabels.b2c = 'B2C'
+ }
+ DefaultExample.argTypes = {
+ 	theme: {
+ 		name: 'Theme',
+ 		options: themeOptions,
+ 		control: {
+ 			type: 'select',
+ 			labels: controlLabels
+ 		}
+ 	}
+ }
</code></pre>

Implementing the above code should give us an option to choose between themes and apply them immediately once selected.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-26-storybook.png" />
	<figcaption>
        Example demo in storybook with default theme.
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-27-storybook.png" />
	<figcaption>
        Example demo in storybook that has inverse theme applied on it.
	</figcaption>
</figure>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-28-storybook.png" />
	<figcaption>
        Example demo in storybook that has the b2c theme applied on it.
	</figcaption>
</figure>

## Part six: Storybook

In part six we learnt how to make a storybook demo for `o-example` component, covering:

- How to start storybook server for development for different brands.
- What are TSX template and how to write them.
- Initialising component JavaScript in React.
- Using storybook controls to demo theming for the component.

In part seven we'll look at writing tests for our component. [Continue to part seven](/documentation/tutorials/create-a-new-component-part-7).
