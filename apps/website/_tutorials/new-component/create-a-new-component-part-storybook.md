---
title: Create A New Origami Component - Part 6 Storybook
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

# Redirect from legacy URLs
redirect_from:
  - /docs/tutorials/create-a-new-component-part-storybook/
---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. Storybook
7. [Testing](/documentation/tutorials/create-a-new-component-part-6/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-7/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-8/)

In part six we will rewrite `demo.mustache` into tsx template, we will use our component's javascript code to initialise interactivity for storybook demos and implement all the variants of our component.

## Storybook
To run storybook locally run `npm run storybook` from your root directory. This should start localhost server automatically.
<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-23-storybook.png" />
	<figcaption>
        A list of storybook components. There should be o-example displayed in the side navigation bar.
	</figcaption>
</figure>

## TSX template
`npm run create-component` generated TSX boilerplate template as well.

The code in `example.tsx` will be very similar to what we have in `demo.mustache` but with different syntax. The syntax we are using is called [JSX](https://reactjs.org/docs/jsx-in-depth.html). On top of this we are writing our compononent in [typeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html) that enables us to make less errors and it will help us to [document out components](/documentation/tutorials/create-a-new-component-part-7/#documenting-storybook) in storybook.

This is what our `example.tsx` should look like:
<pre><code class="o-syntax-highlight--js">// src/tsx/example.tsx

type ExampleProps = {
	theme: string
}

export function Example({theme}: {theme: ExampleProps}) {
	return (
		&lt;div id="element" className={`o-example o-example-${theme}`} data-o-component="o-example">
			Hello world, I am a component named o-example!
			&lt;span className="o-example__counter">
				You have clicked this lovely button &lt;span data-o-example-current-count>0&lt;/span> times.
				&lt;button className="o-example__button">count&lt;/button>
			&lt;/span>
		&lt;/div>
	)
}
</code></pre>

But let's brake this down a bit and compare it to the `demo.mustache` file.
1. First thing we notice is `ExampleProps` [type declaration](https://www.typescriptlang.org/docs/handbook/basic-types.html) for our [component props](https://reactjs.org/docs/components-and-props.html). This type declaration is used to make sure that our component only gets passed down theme prop and it must be string.
2. Second thing we notice is that we are using the [JSX syntax](https://reactjs.org/docs/jsx-in-depth.html) to write our component and return from `Example` function.
3. Syntax for JSX and Mustache are slightly different. In JSX we use `className` instead of `class` and we are passing theme prop to our JSX using literal string (`${theme}`) syntax.

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-24-storybook.png" />
	<figcaption>
        Example demo in storybook seems to display some parts of the component correctly but our button is missing completely.
	</figcaption>
</figure>

## Part six: Storybook

In part six we learnt how to make storybook templates for `o-example` component, covering:
- Initialising JavaScript inside story file.
- JavaScript configuration using the `init` argument or namespaced data attributes.
- How to update the <abbr title="Document Object Model">DOM</abbr> with component JavaScript.
- How to handle no JavaScript at all, to meet Financial Times browser support requirements.

In part seven we'll look at writing tests for our component. [Continue to part seven](/documentation/tutorials/create-a-new-component-part-6).
