---
title: Create A New Origami Component - Part 2 Base Styles
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into eight parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/docs/tutorials/create-a-new-component-part-1/)
2. Base Styles
3. [Themes & Brands](/docs/tutorials/create-a-new-component-part-3/)
4. [Demos](/docs/tutorials/create-a-new-component-part-4/)
5. [JavaScript](/docs/tutorials/create-a-new-component-part-5/)
6. [Testing](/docs/tutorials/create-a-new-component-part-6/)
7. [Documentation](/docs/tutorials/create-a-new-component-part-7/)
8. [Component Lifecycle](/docs/tutorials/create-a-new-component-part-8/)

In part two we will build on our work in [part one](/docs/tutorials/create-a-new-component-part-1) by learning how to add styles to our new component.

## Sass

Origami component styles are written in [Sass](https://sass-lang.com/). According to the [Sass Documentation](https://sass-lang.com/documentation):
>Sass is a stylesheet language that’s compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized and makes it easy to share design within and across projects.

We won't cover Sass in depth in this tutorial but will briefly describe the Sass syntax we use. If you're not familiar with Sass we recommend referencing the [Sass documentation](https://sass-lang.com/documentation).

Components have an entry Sass file `main.scss`, which may [import Sass from the `src/scss` directory](/spec/v1/components/sass/#sass-includes).

Within `main.scss` you will see something like this:
<pre><code class="o-syntax-highlight--scss">// main.scss

@import 'src/scss/variables';

/// Output all oExample features
/// @param {Map} $opts [()] - A map of options to configure the output
/// @access public
/// @example scss
///		@include oExample($opts: (
///			// your opts here
///		))
@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
		display: block;
	}
}

@if ($o-example-is-silent == false) {
	@include oExample();

	// Set to silent again to avoid being output twice
	$o-example-is-silent: true !global;
}
</code></pre>

Let's break this down a little.

## Imports

The first line imports Sass from `src/scss/_variables.scss`. Note the underscore and extension is not needed in the `@import` statement. All Origami Sass files except `main.scss` should start with an underscore to indicate they are [Sass partials](https://sass-lang.com/documentation/at-rules/import#partials) for import and should not be compiled on their own.
<pre><code class="o-syntax-highlight--scss">// main.scss

@import 'src/scss/variables';</code></pre>

## Primary Mixin

Next within `main.scss` you should see a [Sass mixin](https://sass-lang.com/documentation/at-rules/mixin) with the same name as the component, in this case `oExample`. There are [Sass comments](https://sass-lang.com/documentation/syntax/comments) which describe the mixin using the [SassDoc format](http://sassdoc.com/). We use SassDoc comments to document Sass in the registry for users of Origami components to reference, and will discuss this in more detail later.

<pre><code class="o-syntax-highlight--scss">// main.scss

/// Output all oExample features
/// @param {Map} $opts [()] - A map of options to configure the output
/// @access public
/// @example scss
///		@include oExample($opts: (
///			// your opts here
///		))
@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
		display: block;
	}
}
</code></pre>

We call the mixin which shares the component name (`oExample`) the ["primary mixin"](/spec/v1/components/sass/#primary-mixin). When called with no arguments the primary mixin includes all styles for the component. It will also accept an `$opts` argument so users may selectively specify which features of a component to include. For example a user of [o-forms](https://registry.origami.ft.com/components/o-forms) could pass an `$opts` argument to the [`oForms` mixin](https://registry.origami.ft.com/components/o-forms/sassdoc?brand=master#mixin-oforms) to only output styles for text inputs, if their project does not need other form input types. This helps keep the CSS bundle of the project small.

## Naming Conventions

The most important naming convention is prefixing CSS selectors and Sass with the component name. Doing so makes sure a component only applies styles to itself, does not unexpectedly style other parts of a project, and does not clash with Sass from other components.

Other naming conventions to keep in mind include:
- Origami CSS follows the [BEM naming convention](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).
- Sass variables are hyphen separated and lowercase.
- Sass mixins and functions are camel-case.
- An underscore is used to indicate a [private Sass interface](/spec/v1/components/sass/#private-sass) which may change at any time and must not be used outside the component.

See the [Sass naming convention part of the specification](/spec/v1/components/sass/#naming-conventions) for full details and more examples.

## Basic Styles

Let's style our component by adding a border and padding to the `.o-example` CSS class.

<pre><code class="o-syntax-highlight--diff">// main.scss

@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
-		display: block;
+		border: 1px solid red;
+		padding: 1rem;
+		margin: 0.25rem;
	}
}
</code></pre>

As the demo uses the primary mixin already, refreshing your demo page will show the new styles (provided the `obt dev` command is still running from [part one](/docs/tutorials/create-a-new-component-part-1)).

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-2-basic-styles.png" />
	<figcaption>
        Our "o-example" "hello world" component demo with a red border, some margin, and some padding.
	</figcaption>
</figure>

## Use Other Component Sass

The styles we've added so far use arbitrary colours and spacing (padding/margin) sizes. To improve consistency across projects we can build our component using existing Origami components. To demonstrate lets introduce some existing Origami components to our demo.

First we will update our border colour using [o-colors](https://registry.origami.ft.com/components/o-colors), then we will update our margin/padding to use [o-spacing](https://registry.origami.ft.com/components/o-spacing), we'll style the text content of our component using [o-typography](https://registry.origami.ft.com/components/o-typography), and finally we will add a button using [o-buttons](https://registry.origami.ft.com/components/o-buttons).

### Install Component Dependencies

The first step is to install each component we want to use via [npm](https://npmjs.com/):
<pre><code class="o-syntax-highlight--bash">npm install --save '@financial-times/o-colors@^5.0.0' '@financial-times/o-spacing@^2.0.0' '@financial-times/o-typography@^6.0.0' '@financial-times/o-buttons@^6.0.0'</code></pre>

You should now have a `node_modules` directory with all the components we just installed. We can now make their Sass available for us to use with `@import` statements at the top of `main.scss`.

<pre><code class="o-syntax-highlight--diff">// main.scss

+@import '@financial-times/o-colors/main';
+@import '@financial-times/o-spacing/main';
+@import '@financial-times/o-typography/main';
+@import '@financial-times/o-buttons/main';
@import 'src/scss/variables';
</code></pre>

All [`@import` statements in Origami components](/spec/v1/components/sass/#sass-includes) should be in `main.scss`, before any other Sass.

As Origami component Sass does not output CSS by default these imports do nothing except allow us to use Sass mixins, functions, and variables from these components. How to use a component's Sass is documented in the component readme (see the [o-colors readme](https://registry.origami.ft.com/components/o-colors/readme) as an example) and its SassDoc may also be referenced in the component registry (see the [o-colors SassDoc](https://registry.origami.ft.com/components/o-colors/sassdoc) as an example).

### o-colors

So lets change our red border to the standard slate colour from `o-colors` using the [oColorsByName](https://registry.origami.ft.com/components/o-colors@5.2.4/readme?brand=master#default-palette-colours) Sass function.

As well as include a colour by name, we can also get a colour for a [specific usecase](https://registry.origami.ft.com/components/o-colors@5.2.4/readme?brand=master#usecases) such as a page background. To demonstrate, set the background colour of our component using the `box` colour usecase (the `box` colour is used to highlight an area of content such as an aside).

<pre><code class="o-syntax-highlight--diff">// main.scss

@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
-		border: 1px solid red;
+		border: 1px solid oColorsByName('slate');
+		background: oColorsByUsecase('box', 'background');
		padding: 1rem;
		margin: 0.25rem;
	}
}
</code></pre>

### o-spacing

Then we can use one of the recommended space values from `o-spacing` using its [oSpacingByName](https://registry.origami.ft.com/components/o-spacing@2.0.4/readme?brand=master#named-space) Sass function.
<pre><code class="o-syntax-highlight--diff">// main.scss

@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
		border: 1px solid oColorsByName('slate');
-		padding: 1rem;
+		padding: oSpacingByName('s4');
-		margin: 0.25rem;
+		margin: oSpacingByName('s1');
	}
}
</code></pre>

### o-typography

The next thing we wanted to do was style our component text using `o-typography`. We can do that a number of ways depending on how we want our typography to look. For now let's use the [`oTypographyBody`](https://registry.origami.ft.com/components/o-typography@6.4.1/readme?brand=master#otypographybody) mixin. Unlike a function which returns a value, a Sass mixin sets a number of CSS properties; in this case the font family, font size, etc.

<pre><code class="o-syntax-highlight--diff">// main.scss

@mixin oExample ($opts: ()) {
	// content of primary mixin
	.o-example {
+		@include oTypographyBody();
		border: 1px solid oColorsByName('slate');
		padding: oSpacingByName('s4');
		margin: oSpacingByName('s1');
	}
}
</code></pre>

Run `obt dev`, if not already, and preview the component demo as in [part one](/docs/tutorials/create-a-new-component-part-1). You should see the styles have been updated

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-3-basic-styles.png" />
	<figcaption>
        Our "o-example" "hello world" component now has a slate border, uses Financial Times fonts, standardised space sizes for margin and padding, and has a background colour.
	</figcaption>
</figure>

### o-buttons

In this tutorial we're aiming to build a component that includes a button which will count the number of times it was clicked, so next we will add a button to our component.

If we were adding buttons to a project we might include the primary Sass mixin [`oButtons`](https://registry.origami.ft.com/components/o-buttons@6.0.14/sassdoc?brand=master#mixin-obuttons) to output CSS for the buttons we want to use. However the primary mixin will output button classes like `.o-buttons` and we learnt in a previous section that Origami components must prefix their CSS selectors with the component name. What we want is a class that starts with our component name such as `.o-example__button`.

Fortunately, `o-buttons` allows us to output a button with a custom class name using the Sass mixin [`oButtonsContent`](https://registry.origami.ft.com/components/o-buttons@6.0.14/sassdoc?brand=master#mixin-obuttonscontent). There are a number of options we could pass to `oButtonsContent` for different types of buttons. We'll choose a "primary" button type for this tutorial. In `main.scss` define a new CSS class `.o-example__button` and include the button CSS with `oButtonsContent`:

<pre><code class="o-syntax-highlight--scss">// main.scss
.o-example {
	// [previously discussed css here]
}

.o-example__button {
	@include oButtonsContent($opts: ('type': 'primary'));
}</code></pre>

We need to update our demo markup  `demos/src/demo.mustache` with the new button markup, similar to how we added text to the demo in [part one](/docs/tutorials/create-a-new-component-part-1):

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

&lt;div class="o-example" data-o-component="o-example">
	Hello world, I am a component named o-example!
+	&lt;button class="o-example__button">count&lt;/button>
&lt;/div></code></pre>

_Note: the double underscore in `.o-example__button` is part of the [BEM naming convention](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) mentioned earlier._

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-4-basic-styles.png" />
	<figcaption>
        Our "o-example" component now has a button.
	</figcaption>
</figure>

## Part Three: Themes And Branding

To style our components we covered many topics in this part of the tutorial. We learnt:
- Origami component CSS is written with [Sass](https://sass-lang.com/documentation).
- Component Sass includes [SassDoc](http://sassdoc.com/) comments for Sass documentation.
- Conventional Origami Sass patterns such as the ["primary mixin"](/spec/v1/components/sass/#primary-mixin).
- How to install Origami component dependencies from the [public npm registry](https://npmjs.com).
- And finally how to include and use Sass from `o-colors`, `o-spacing`, `o-typography`, and `o-buttons`.

Now we know how to add styles, in part three we will build on that knowledge to provide new visual variations of our component. We will add an alternative `inverse` theme that will modify the appearance of `o-example` to look better on a dark background. We will also "brand" our component to change its appearance depending on whether it is used within a reader facing ft.com project, internal project, or elsewhere. [Continue to part three](/docs/tutorials/create-a-new-component-part-3).
