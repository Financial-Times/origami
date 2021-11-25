---
title: Include Components Using the Origami Build Service
description: A step-by-step tutorial which teaches you how to use Origami components via the Origami Build Service.
cta: Learn how to build web pages using the Origami Build Service

# Redirect from legacy URLs
redirect_from:
  - /docs/developer-guide/modules/build-service/
---

# {{page.title}}

Using the Origami Build Service is the quickest way of getting Origami components to work in your product. The service bundles together the <abbr title="Cascading Style Sheets">CSS</abbr> and the JavaScript for all Origami components on a central server. You can then access specific component bundles by using a `link` or `script` tag.

<aside>You can find more detailed information on the Origami Build Service's self hosted <a href="https://www.ft.com/__origami/service/build" class="o-typography-link--external"><abbr title="Application Programming Interface">API</abbr> and technical documentation</a>.</aside>

Below is a step by step walkthrough for building a page for an article about fruit, with FT.com colors and fonts, and we'll include a few Origami components to do so.


## Setting up your sandbox
For this tutorial, we recommend you follow along by setting up your project in <a href="https://codepen.io/" class="o-typography-link--external">CodePen</a>, or <a href="https://jsbin.com/" class="o-typography-link--external">JSBin</a>.

There are usually three three parts to an Origami component; <abbr title="Hypertext Markup Language">HTML</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr> and JavaScript. We're going implement one at a time to put together our page.

<aside>We'll be providing code snippets for you to follow, but you can also have a look at the <a href="https://codepen.io/ft-origami/full/ejLNNL" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">result of the tutorial (opens a new tab)</a>.</aside>

Let's begin.

## Boilerplate <abbr title="Hypertext Markup Language">HTML</abbr>
We'll need to start with some boilerplate markup.

There are three things we want on a <abbr title="Financial Times">FT</abbr>-like article page: a <a href="https://registry.origami.ft.com/components/o-grid">grid</a>, consistent <a href="https://registry.origami.ft.com/components/o-typography">typography</a> and a background <a href="https://registry.origami.ft.com/components/o-colors">color</a>.

In order to get that, we'll need the foundation of our <abbr title="Hypertext Markup Language">HTML</abbr> to look like this:

<pre><code class="o-syntax-highlight--html">&lt;!DOCTYPE html>
&lt;html lang="en">
	&lt;head>
		&lt;meta charset="utf-8">
		&lt;title>My First Origami Page&lt;/title>
	&lt;/head>
	&lt;body class="o-colors-page-background">
		&lt;div class="o-grid-container o-typography-wrapper">
			&lt;div class="o-grid-row" data-o-grid-colspan="center 8">
			&lt;/div>
		&lt;/div>
	&lt;/body>
&lt;/html></code></pre>

<aside><a href="https://codepen.io/ft-origami/pen/GBXgZa" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

You won't see anything yet, but the classes and the data attribute will be working together to center our content across a span of 8 columns when we add the <abbr title="Cascading Style Sheets">CSS</abbr> to our page.

For now, let's finish putting together the content of our page.

## Component <abbr title="Hypertext Markup Language">HTML</abbr>
With the exception of JavaScript-only components, all of Origami's components rely on markup. This markup, combined with the styling and the functionality, is what determines how a component will look and behave on a page.

<aside>A single component can have many variations, and all the variations for all components can be found in the <a href="https://registry.origami.ft.com/components">Origami Registry</a>.</aside>

First, we're going to add some content for our article, so lets add a heading and some great information about fruit in our `o-grid-row`:

<aside><a href="https://codepen.io/ft-origami/pen/KBxwWN" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

<pre style="white-space: pre-line"><code class="o-syntax-highlight--html">&lt;h1>Funky Fruit Facts&lt;/h1>
&lt;h2>Durian&lt;/h2>
&lt;p>Due to its overpowering smell, durian has been banned on many types of public transport across Thailand, Japan and Hong Kong. In Singapore, the fruit is banned across all types of public transportation and even taxis have signs to let you know they refuse to carry passengers transporting the smelly fruit.&lt;/p>
&lt;h2>Dragonfruit&lt;/h2>
&lt;p>The cactus flower that produces dragon fruit survives only a single night. It blooms in the evening, ready for pollination by bats and moths, and wilts the very next day. The very brief pollination period, however, is sufficient for the plant to bear fruits.&lt;/p>
&lt;h2>Naseberry, aka Sapodilla&lt;/h2>
&lt;p>The sapodilla tree supplies the building blocks for a number of products utilized by humans.  Long ago, the Mayas and Aztecs would boil its ‘chicle’ sap, mold it into thick blocks and cut them into small pieces to chew. They were making the first chewing gum!&lt;/p></code></pre>


Finally, we want to showcase the popularity of each fruit in a sortable table. To do that, we're going to use the `o-table` component.

All of the markup that comes with an Origami component is available on the components' page in the Origami registry.

We can find the markup for the <a href="https://registry.origami.ft.com/components/o-table#demo-row-stripes">striped variation of o-table in the registry</a>, and copy that <abbr title="Hypertext Markup Language">HTML</abbr> into our work from there.

<aside><a href="https://codepen.io/ft-origami/pen/wxEBda" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

## Component <abbr title="Cascading Style Sheets">CSS</abbr>

Now we come to the second step in putting our page together, and a big part of what makes the Origami Build Service a quick solution.

The Origami Build Service will perform a number of build steps to compile and bundle up the <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> that most Origami component styles are written in. Since it is all bundled for us to pick and choose from, let's begin by styling our grid. This means we'll have to add a `link` tag to our `<head>` tag.

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--html">&lt;link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^{{site.data.components.o-grid.version}}&brand=core&system_code=$$$-no-bizops-system-code-$$$"/></code></pre>

The `href` attribute references the Origami Build Service endpoint that serves a <abbr title="Cascading Style Sheets">CSS</abbr> bundle. The most important parts of this url are the `components`, `brand`, and `system_code` query parameters.

The system code is the <a href="https://biz-ops.in.ft.com/list/Systems">bizops system code</a> for the FT system which is making the Origami build service request. A valid system code is important for usage attribution and technical support, but for the purposes of this tutorial we'll use a placeholder value `$$$-no-bizops-system-code-$$$`.

The component query parameter is used to specify what components and which version we want to include. In the above we request `o-grid@^{{site.data.components.o-grid.version}}`.

The brand query parameter will affect the appearance of included components, its value depends on what kind of project we are building  – more on this later.

<aside><a href="https://codepen.io/ft-origami/pen/ajazYj" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>
Now, you should see all of your content snap to the center of the page. This means that we've successfully fetched the `o-grid` <abbr title="Cascading Style Sheets">CSS</abbr> bundle from the Origami Build Service.

But we also want to style our content and our table, and fetch the right color from our color palette.

It is important to highlight that you only need **one** link tag per page, regardless of how many components you are using. The Origami Build Service can include more than one component in the bundle we ask for, meaning that we can add multiple components to the same URL. This avoids duplicating the <abbr title="Cascading Style Sheets">CSS</abbr> that is shared between components, because we are only downloading it all once.

So in order to add the styling for all of our other components, we need to add a few components (and versions!) to the query parameter of our original url:

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--html">&lt;link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^{{site.data.components.o-grid.version}},o-colors@^{{site.data.components.o-colors.version}},o-typography@^{{site.data.components.o-typography.version}},o-table@^{{site.data.components.o-table.version}}&brand=core&system_code=$$$-no-bizops-system-code-$$$"/></code></pre>
<aside><a href="https://codepen.io/ft-origami/pen/LBJErq" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

And now, when we look at our page, we should have a styled table, different typography and a type of grid in place.


### Selecting A Brand

Public facing, ft.com product are known as "core brand" products, by setting the brand query parameter to "core" we are requesting that style of component. But Origami components offer tailored support for other contexts with component [branding](/docs/components/branding/).

For example we could set the brand to `internal`.

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--html">&lt;link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^{{site.data.components.o-grid.version}},o-colors@^{{site.data.components.o-colors.version}},o-typography@^{{site.data.components.o-typography.version}},o-table@^{{site.data.components.o-table.version}}&brand=internal&system_code=$$$-no-bizops-system-code-$$$"/></code></pre>
<aside><a href="https://codepen.io/ft-origami/pen/VENXyQ" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

As the colour palette for the "internal" brand does not include "paper" (FT pink), the background we set with `o-colors` classes has changed, as have the stripes of `o-table`. Our typography set with `o-typography` classes has also changed.

Now undo that by setting `&brand=core` again.

For a list of supported brands and their purpose see the [component customisation page](/docs/components/customisation/).

## Component JavaScript

There is one more step, before our page is entirely functional. Not all Origami components use JavaScript. In fact, of the ones we've used in this example, only `o-table` does.

So our final step involves providing our table with the ability to sort its content. Much like the `link` tag for the <abbr title="Cascading Style Sheets">CSS</abbr>, we fetch JavaScript bundles from a Build Service endpoint, through a `script` tag. And, also like the url for the `link` tag, the `script src` expects a query parameter, which can also be more than one component.

In addition to the `o-table` component we also request `o-autoinit`, which will automatically find and initialise all our requested components on the page when it's ready.

For now though, let's add the following to our `<head>`:

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--html">&lt;script src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-table@^{{site.data.components.o-table.version}},o-autoinit@^{{site.data.components.o-autoinit.version}}&system_code=$$$-no-bizops-system-code-$$$" defer>&lt;/script></code></pre>
<aside><a href="https://codepen.io/ft-origami/pen/ejLNNL" rel="noreferrer noopener" target="_blank" class="o-typography-link o-typography-link--external">Show me the CodePen (opens a new tab)</a></aside>

Now you can scroll down to your table, and sort fruit alphabetically by name or characteristic, or numerically by popularity.

## Next steps

We've stepped through a basic set up of components with the Origami Build Service, and these are the fundamental steps for any component you might want to use within your product.

There are a few more aspects to the development of a product with Origami components that are important for compatibility and consistency, and we encourage you to read more about them:

- Origami components have been developed to provide a 'core' experience for older browsers, and an 'enhanced' experience for newer ones, and we check for this using a ['cuts the mustard'](/docs/components/compatibility/#cuts-the-mustard) test, which can determine which experience to serve to which browser.
- Another service we provide is the <a href="https://polyfill.io" class="o-typography-link--external">Polyfill Service</a>, which makes newer APIs available to older browsers, allowing us to write code to modern standards.
- Learn more about [Origami brands and component customisation](/docs/components/customisation/), which can change the appearance of components and provide unique features for different projects.
- [Component versioning](/docs/components/versioning/) is also important when building and maintaining products that use Origami components.
