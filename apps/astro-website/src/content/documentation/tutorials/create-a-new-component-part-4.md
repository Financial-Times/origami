---
title: Create A New Origami Component - Part 4 Demos
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false
collection_id: tutorials
---

# Create A New Origami Component - Part 4 Demos

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:

1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. Demos
5. [JavaScript](/documentation/tutorials/create-a-new-component-part-5/)
6. [Storybook](/documentation/tutorials/create-a-new-component-part-6/)
7. [Testing](/documentation/tutorials/create-a-new-component-part-7/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-8/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-9/)

In part four we will create new demos to showcase the themes we created in [part three](/documentation/tutorials/create-a-new-component-part-3). The demos we will create in this part are for the [Origami Registry](registry.origami.ft.com/). In the near future all demos will be moved to Storybook, which we will cover in [part six](/documentation/tutorials/create-a-new-component-part-6/).

## Add More Demos

In [part three](/documentation/tutorials/create-a-new-component-part-3) we added an `inverse` theme for each brand and a `b2c` theme for the core brand but no demos for these. That means there is no visual preview for potential users of our component, and no ability to copy the html for these themes from the [Origami component registry](https://registry.origami.ft.com/components/).

To add new demos we will update `origami.json`. This file contains lots of information about our components, including its name, description, demos, and more — see the [Origami Manifest specification](/specification/v1/manifest/) for full details.

We'll add a new object to the [demos array](/specification/v1/manifest/#demos) which will represent our new demo. Demos must have at least the following properties:

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
+	}
]
</code></pre>

Now if you refresh your browser you should be able to find `demo-inverse.html` generated next to other assets of the component. To actually show the inverse theme we need to update the template `demos/src/demo.mustache` to use the data `{ "theme": "inverse" }` we have passed to it. In the code snippet below, we output the theme modifier class if a theme variable is found (see the [mustache documentation](https://mustache.github.io/mustache.5.html))

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
        A list of demos and demo assets, served from `localhost` using the `npm run watch -w components/o-example` command. There is now `core-demo-inverse.html`.
	</figcaption>
</figure>

We also need to create a demo for the `b2c` theme. However the `b2c` theme we created only supports the `core` brand. It should not be displayed in [Storybook](https://origami.ft.com/storybook/) for the `internal` or `whitelabel` brands. To avoid that, we will set the [`brands` demo property](/specification/v1/manifest/#demos).

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
+	}
]
</code></pre>

## Other Demo Options

There are other demo options we haven't covered so far. For example as well as the `demos` array `origami.json` may include [`demosDefaults`](/specification/v1/manifest/#demosdefaults), which describe options to be applied to all demos. Among other settings we can specify the demo Mustache template, Sass, and JavaScript file. To learn more see the [Origami Manifest specification](/specification/v1/manifest/) which has a full list of all demo options.

<aside>
Demos may include their own Sass and JavaScript which are not part of the component itself.
</aside>

## Part Five: JavaScript

In part four we learnt:

- How to add or update demos to a component.
- How to use `origami.json` properties to make it easier to configure multiple demos.

Although our component is starting to look good it has a button which doesn't do anything. So next we'll learn how to add interactivity to our component with JavaScript. [Continue to part five](/documentation/tutorials/create-a-new-component-part-5).
