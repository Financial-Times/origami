---
title: Create A New Origami Component - Part 4 Demos
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into eight parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/docs/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/docs/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/docs/tutorials/create-a-new-component-part-3/)
4. Demos
5. [JavaScript](/docs/tutorials/create-a-new-component-part-5/)
6. [Testing](/docs/tutorials/create-a-new-component-part-6/)
7. [Documentation](/docs/tutorials/create-a-new-component-part-7/)
8. [Component Lifecycle](/docs/tutorials/create-a-new-component-part-8/)

In part four we will create new demos to showcase the themes we created in [part three](/docs/tutorials/create-a-new-component-part-3). We will also revisit demo boilerplate, including the purpose of the `pa11y` demo you may have already noticed.

## Add More Demos

In [part three](/docs/tutorials/create-a-new-component-part-3) we added an `inverse` theme for each brand and a `b2c` theme for the core brand but no demos for these. That means there is no visual preview for potential users of our component, and no ability to copy the html for these themes from the [Origami component registry](https://registry.origami.ft.com/components/).

To add new demos we will update `origami.json`. This file contains lots of information about our components, including its name, description, demos, and more — see the [Origami Manifest specification](/spec/v1/manifest/) for full details.

We'll add a new object to the [demos array](/spec/v1/manifest/#demos) which will represent our new demo. Demos must have at least the following properties:
- `title`: A descriptive title for the [component registry](https://registry.origami.ft.com/components).
- `name`: The outputted html file name.
- `template`: The path to the demo mustache template.
- `description`: A descriptive for the [component registry](https://registry.origami.ft.com/components).

We could create a new mustache template for our new theme demo, but as our theme demo uses almost the same markup as our current demo we will reuse our current template `demos/src/demo.mustache`. To do that, we will pass the theme name to the template using the demo `data` property as shown below:

<pre><code class="o-syntax-highlight--diff">// origami.json

"demos": [
	{
-		"title": "A Useful Demo",
+		"title": "Basic Example",
		"name": "demo",
		"template": "demos/src/demo.mustache",
-		"description": "Description of the demo"
+		"description": "This demo shows a basic o-example component."
	},
+	{
+		"title": "Inverse Example",
+		"name": "demo-inverse",
+		"template": "demos/src/demo.mustache",
+		"data": { "theme": "inverse" },
+		"description": "This demo shows an o-example component with the inverse theme."
+	},
	{
		"title": "Pa11y",
		"name": "pa11y",
		"template": "demos/src/pa11y.mustache",
		"description": "Accessibility test will be run against this demo",
		"hidden": true
	}
]
</code></pre>

Now the `obt dev` command will build our new demo and create `demo-inverse.html`. To actually show the inverse theme we need to update the template `demos/src/demo.mustache` to use the data `{ "theme": "inverse" }` we have passed to it. In the code snippet below, we output the theme modifier class if a theme variable is found (see the [mustache documentation](https://mustache.github.io/mustache.5.html))

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

-&lt;div class="o-example" data-o-component="o-example">
+&lt;div class="o-example &#123;&#123;#theme}}o-example--&#123;&#123;theme}}&#123;&#123;/theme}}" data-o-component="o-example">
    Hello world, I am a component named o-example!
    &lt;button class="o-example__button">count&lt;/button>
&lt;/div>
</code></pre>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-11-demo.png" />
	<figcaption>
        A list of demos and demo assets, served from `localhost` using the `obt dev` command. There is now `demo-inverse.html`.
	</figcaption>
</figure>


We also need to create a demo for the `b2c` theme. However the `b2c` theme we created only supports the `core` brand. It should not be displayed in the [Origami registry](https://registry.origami.ft.com/components) for the `internal` or `whitelabel` brands. To avoid that, we will set the [`brands` demo property](/spec/v1/manifest/#demos).

<pre><code class="o-syntax-highlight--diff">// origami.json

"demos": [
	{
		"title": "Basic Example",
		"name": "demo",
		"template": "demos/src/demo.mustache",
		"description": "This demo shows a basic o-example component."
	},
	{
		"title": "Inverse Example",
		"name": "demo-inverse",
		"template": "demos/src/demo.mustache",
		"data": { "theme": "inverse" },
		"description": "This demo shows an o-example component with the inverse theme."
	},
+	{
+		"title": "B2C Example",
+		"name": "demo-b2c",
+		"template": "demos/src/demo.mustache",
+		"data": { "theme": "b2c" },
+		"brands": ["core"],
+		"description": "This demo shows an o-example component with the b2c theme."
+	},
	{
		"title": "Pa11y",
		"name": "pa11y",
		"template": "demos/src/pa11y.mustache",
		"description": "Accessibility test will be run against this demo",
		"hidden": true
	}
]
</code></pre>

## Pa11y Demo

You may have noticed another demo named `pa11y` has already been configured. The `pa11y` demo is used by Origami Build Tools to run [Pa11y](https://pa11y.org/). Pa11y is a command-line tool which we run against the pa11y demo to find some common accessibility issues. When building components its important to add any variations to the pa11y demo to test for accessibility issues, such as low contrast or incorrect markup. The pa11y demo is for testing purposes only and is hidden from users in the [Origami Registry](https://registry.origami.ft.com/components).

## Other Demo Options

There are other demo options we haven't covered so far. For example as well as the `demos` array `origami.json` may include [`demosDefaults`](/spec/v1/manifest/#demosdefaults), which describe options to be applied to all demos. Among other settings we can specify the demo Mustache template, Sass, and JavaScript file. To learn more see the [Origami Manifest specification](/spec/v1/manifest/) which has a full list of all demo options.

<aside>
Demos may include their own Sass and JavaScript which are not part of the component itself.
</aside>

## Part Five: JavaScript

In part four we learnt:

- How to add or update demos to a component.
- What the `pa11y` demo is used for.
- How to use `origami.json` properties to make it easier to configure multiple demos.

Although our component is starting to look good it has a button which doesn't do anything. So next we'll learn how to add interactivity to our component with JavaScript. [Continue to part five](/docs/tutorials/create-a-new-component-part-5).
