---
title: Include Components Using a Package Manager (npm)
description: A step-by-step tutorial which teaches you how to use Origami components via a package manager, compiling them on your local machine.
cta: Learn how to build web pages with locally-installed Origami components

# Redirect from legacy URLs
redirect_from:
  - /docs/developer-guide/modules/building-modules/
---

# {{page.title}}

Installing Origami components with a package manager (manual build) gives you more granular control over their styling and their behaviour within your project. It requires more set up though, compared to [using the Origami Build Service](/docs/tutorials/build-service/), so we're providing an in-depth walkthrough for building a page for an article about fruit.

This tutorial assumes that:
- You have not implemented a build step
- You are using a UNIX-like OS with a bash shell
- You are familiar with JavaScript, and <abbr title="Sassy Cascading Style Sheets"><a href="https://sass-lang.com/" class="o-typography-link--external">SCSS</a></abbr>
- You have a basic understanding of <abbr title="Node Package Manager"><a href="https://www.npmjs.com/" class="o-typography-link--external">npm</a></abbr>)

## Setting up your sandbox
We will need a folder structure for our page. So let's begin by creating a new directory to work in.

<pre><code class="o-syntax-highlight--bash">mkdir o-fruit-demo && cd o-fruit-demo</code></pre>

Eventually, we'll have a folder structure that separates our <abbr title="Hypertext Markup Language">HTML</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr>, JavaScript, dependencies and assets. Let's start by adding an `index.html` to the root of our new project with some boilerplate <abbr title="Hypertext Markup Language">HTML</abbr>:

<pre><code class="o-syntax-highlight--html">&lt;!DOCTYPE html>
&lt;html lang="en">
	&lt;head>
		&lt;meta charset="utf-8">
		&lt;title>My First Origami Project&lt;/title>

		&lt;link rel="stylesheet" href="/main.css">
		&lt;script async src="/main.js">&lt;/script>
	&lt;/head>
	&lt;body>

	&lt;/body>
&lt;/html></code></pre>

<aside class="no-padding">
<p>Our folder structure so far:</p>
<pre><code class="o-syntax-highlight--bash">o-fruit-demo
└── index.html</code>
</pre></aside>

The `link` and the `script` tags are pointing at our public assets, which will be available once we have performed a build step and compiled our source code. That source code will be written in plain Javascript and in <abbr title="Sassy Cascading Style Sheets">SCSS</abbr>, and each of those will be in their individual folders in our project:

<pre><code class="o-syntax-highlight--bash">mkdir src && touch src/main.js src/main.scss</code></pre>

Now we're ready to start adding components to our page.

## Component <abbr title="Hypertext Markup Language">HTML</abbr>

<aside class="no-padding">
<p>Our folder structure so far:</p>
<pre><code class="o-syntax-highlight--bash">o-fruit-demo
├── index.html
└── src/
    └── main.js
    └── main.scss</code>
</pre>
</aside>

With the exception of JavaScript-only components, all of Origami's components rely on markup. This markup, combined with the styling and the functionality, is what determines how a component will look and behave on a page. So before we can style anything, we'll need to add some component markup to our page.

<a href="https://registry.origami.ft.com/components/o-grid" class="o-typography-link--external">o-grid</a> will determine how our content sits on our page. To begin, let's add the following to the `<body>` in our `index.html`:

<pre><code class="o-syntax-highlight--html">&lt;div class="o-grid-container">
	&lt;div class="o-grid-row o-typography-wrapper" data-o-grid-colspan="center 8">
	&lt;/div>
&lt;/div></code>
</pre>

We want to share some fruit facts, so let's add some content to that inner `div`:
<pre style="white-space: pre-line"><code class="o-syntax-highlight--html">&lt;h1>Funky Fruit Facts&lt;/h1>
&lt;h2>Durian&lt;/h2>
&lt;p>Due to its overpowering smell, durian has been banned on many types of public transport across Thailand, Japan and Hong Kong. In Singapore, the fruit is banned across all types of public transportation and even taxis have signs to let you know they refuse to carry passengers transporting the smelly fruit.&lt;/p>
&lt;h2>Dragonfruit&lt;/h2>
&lt;p>The cactus flower that produces dragon fruit survives only a single night. It blooms in the evening, ready for pollination by bats and moths, and wilts the very next day. The very brief pollination period, however, is sufficient for the plant to bear fruits.&lt;/p>
&lt;h2>Naseberry, aka Sapodilla&lt;/h2>
&lt;p>The sapodilla tree supplies the building blocks for a number of products utilized by humans.  Long ago, the Mayas and Aztecs would boil its ‘chicle’ sap, mold it into thick blocks and cut them into small pieces to chew. They were making the first chewing gum!&lt;/p></code></pre>

Finally, we want to showcase the popularity of each fruit in a sortable table. To do that, we're going to use the `o-table` component.

This is a good time to highlight how the manual build process provides more flexibility, because we don't need to include all the table variations provided by Origami - we can include the minimum features we need.

Let's head over to <a href="https://registry.origami.ft.com/components/o-table#demo-row-stripes">the striped variation of o-table in the registry</a>, and copy that <abbr title="Hypertext Markup Language">HTML</abbr> in under our content.

<aside>If you'd like to double check your work, we've put our <code>index.html</code> up <a href="https://codepen.io/ft-origami/pen/EprYzR" class="o-typography-link--external">on CodePen</a>.</aside>

## Origami Registry & npm

Now that we have set up the scaffolding for our page, we need to install those components so we can access their respective styles and functionalities.

All Origami components are available for installation via npm. They live in the <a href="https://registry.origami.ft.com/components">Origami Registry</a>, and are published to the <a href="https://npmjs.com/" class="o-typography-link--external">public npm registry</a>.

<aside class="no-padding">
<p>Our folder structure so far:</p>
<pre><code class="o-syntax-highlight--bash">o-fruit-demo
├── index.html
└── src/
    └── main.js
    └── main.scss</code>
</pre>
</aside>

Next, we need to install our components as direct dependencies, because they are crucial to our page. We will opt to install them through the command line, and save them to a `package.json` file. For the scope of this tutorial, all that needs to be in that file right now is:

<pre><code class="o-syntax-highlight--json">{
	"name": "o-fruit-demo"
}</code>
</pre>

Now we need to install our components, and we can save them all to our file by running:

<pre><code class="o-syntax-highlight--bash">npm install --save @financial-times/o-grid @financial-times/o-typography @financial-times/o-colors @financial-times/o-table</code></pre>

And your `package.json` should now look something like this:

<pre><code class="o-syntax-highlight--json">{
  "name": "o-fruit-demo",
  "dependencies": {
    "@financial-times/o-grid": "^{{site.data.components.o-grid.version}}",
    "@financial-times/o-typography": "^{{site.data.components.o-typography.version}}",
    "@financial-times/o-colors": "^{{site.data.components.o-colors.version}}",
    "@financial-times/o-table": "^{{site.data.components.o-table.version}}"
  }
}</code>
</pre>

## The Build Step

<aside class="no-padding">
<p>Our folder structure so far:</p>
<pre><code class="o-syntax-highlight--bash">o-fruit-demo
├── package.json
├── node_modules/
├── index.html
└── src/
    └── main.js
    └── main.scss</code>
</pre>
</aside>

So that we can see our progress as we build the page, now is the time to implement our build step.
What we need is something to bundle the JavaScript we write, and compile Sass to CSS for the browser. But build steps may vary per application or team, so setting up build tools is out of scope for this tutorial. So we can focus on how to use Origami components we are going to use the <a href="https://github.com/Financial-Times/origami-workshop" class="o-typography-link--external">Origami Workshop tool</a>.

As long as you have Node.js installed, you can run:

<pre><code class="o-syntax-highlight--bash">npx @financial-times/origami-workshop</code></pre>

This command will compile your code to a `public` directory every time you make a change, and serve it locally for you to preview in a browser e.g. at `htpp://localhost:3000`. You can leave that running in the background, and refresh your browser to see the styling changes we'll be making in the next step.

## Component Styling

<aside class="no-padding">
<p>Our folder structure so far:</p>
<pre><code class="o-syntax-highlight--bash">o-fruit-demo
├── package.json
├── node_modules/
├── index.html
├── public/
│   ├── main.css
│   └── main.js
│   └── index.html
└── src/
    └── main.js
    └── main.scss</code>
</pre>
</aside>

Now we can begin styling our components. For this, all of our work is going to happen in our `src/main.scss` file.

### Output All Component Styles

So we can monitor what projects component assets are being used, some components require a global Sass `$system-code` variable is set. This should be the project's <a href="https://biz-ops.in.ft.com" class="o-typography-link--external">biz-ops system code</a>, but we can set it to `test` for now in `src/main.scss`:
<pre><code class="o-syntax-highlight--scss">$system-code: 'test';</code></pre>

To include the components Sass use `@import`. For example this makes all `o-grid` Sass mixins, functions, and variables available:
<pre><code class="o-syntax-highlight--scss">$system-code: 'test';
@import '@financial-times/o-grid/main';</code></pre>

By default Origami components do not output any CSS when you import them. This is so your project can granularly include only the CSS it needs from each component. To output a components CSS use its mixins, which are documented in the component [README](https://registry.origami.ft.com/components/o-grid/readme#sass) and [Sassdoc](https://registry.origami.ft.com/components/o-grid/sassdoc). Most components include a primary mixin which matches the component name. These include all CSS by default and accept a map of options to include CSS for specific features. For the `o-grid` component this is a mixin named `oGrid`:

<pre><code class="o-syntax-highlight--scss">@import '@financial-times/o-grid/main';
// output all o-grid css
@include oGrid();</code></pre>

<aside>
Some Origami components have a <a href="/docs/components/silent-mode/">silent mode</a> variable which, when set to false, outputs all of the CSS for a component. This method of including CSS is deprecated. We recommend using the component's mixins instead.

<pre><code class="o-syntax-highlight--scss">// deprecated: output all o-grid css using the silent mode variable
$o-grid-is-silent: false;
@import '@financial-times/o-grid/main';</code></pre>
</aside>

If we open our page in a browser window (visit `http://localhost:3000` after running the origami-workshop command discussed above), we'll see that our content is now centred on the page. This is because of the classes that we added to our outside `div` at the very beginning.

We added an <a href="https://registry.origami.ft.com/components/o-typography">o-typography</a> class to our inner div at the beginning of the tutorial, as well. It will apply styling just as the grid did, so the next—unguided—step, is for you to implement `o-typography` in the same way we implemented `o-grid` above.

Look at your page in the browser when you're done - your headings and paragraphs should have received font families and styling of their own.

### Output Component Styles Granularly

We're going to get a little more specific with <a href="https://registry.origami.ft.com/components/o-table">o-table</a> since we're after a particular variation.

We only want the base styling of a table, and some stripes to tell each row apart, so pass an options map to the `oTable` mixin:

<pre><code class="o-syntax-highlight--scss">@import '@financial-times/o-table/main';
@include oTable($opts: ('stripes'));</code></pre>

Other options are [documented in the README](https://registry.origami.ft.com/components/o-table/readme#sass).

### Use Component Sass Functions

We'll be using <a href="https://registry.origami.ft.com/components/o-colors">o-colors</a>, which has a wide variety of colours in its palette. Since we don't need all of the colours in the palette for this page, we will not include the primary mixin `oColors`. Instead we will use some Sass functions `o-colors` provides.

o-colors defines [colours by name](https://registry.origami.ft.com/components/o-colors/readme/#palette-colours), e.g. "crimson", and [colours by usecase](https://registry.origami.ft.com/components/o-colors/readme/#palette-colours) e.g. "page background". We can use the Sass functions `oColorsByName` and `oColorsByUsecase` to get a colours hex value from our palette.

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--scss">@import '@financial-times/o-colors/main';

body {
	background-color: oColorsByUsecase('page', 'background');
}</code></pre>

As soon as your build has completed, visit your page again in the browser. You should have the pink that is characteristic of the FT as a background colour.

<aside>If you'd like to double check your work, we've put our <code>main.scss</code> up <a href="https://codepen.io/ft-origami/pen/VBgwwJ" class="o-typography-link--external">on CodePen</a>.</aside>


### Selecting A Brand

By default Origami components are tailored for public facing, ft.com products -- these are known as "core brand" products. But Origami components offer tailored support for other contexts with component [branding](/docs/components/branding/).

To choose a brand other than the default "core" brand, set the `$o-brand` <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> variable at the start of your root <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> file, before importing any components.

To see this in action we can set our brand to "internal":
<pre><code class="o-syntax-highlight--scss">$o-brand: "internal"; // Set brand before anything else.
@import '@financial-times/o-colors/main';
//...</code></pre>

As the colour palette for the "internal" brand does not include "paper" (FT pink), the background we set with `o-colors` and the stripes of `o-table` have changed. The typography of our project has also changed.

Now we will undo that by deleting `$o-brand: "internal";`, making our project default to the "core" brand again.

For a list of supported brands and their purpose see [component brands](/docs/components/branding/).

## Component Functionality

The final step in our tutorial involves adding JavaScript to our components, and we'll be doing all of that work in `src/main.js`.

Not all Origami components use JavaScript. For example, of the components we have installed today, only `o-table` requires it.

Origami components listen for a custom event named `o.DOMContentLoaded` in order to initialise. We'll need to add that to our project so that the `o-table` JavaScript can kick in.

<aside>There are multiple ways to <a href="/docs/components/initialising">initialise a component's JavaScript</a> when you are using Origami with the manual build process</aside>

We'll need to add this to our file:

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--js">import '@financial-times/o-table';

// Wait until the page has loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
}

document.addEventListener('DOMContentLoaded', function() {
	// Dispatch a custom event that will tell all required modules to initialise
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});</code>
</pre>

Now you can sort fruit alphabetically by name or characteristic, or numerically by popularity.

## Next steps

We've given you an overview of how to build components manually. There is more information about each component, its variations, its individual behaviour and configuration in the <a href="https://registry.origami.ft.com/components">Origami Registry</a>. Here we've covered the fundamentals, but there are a few more aspects to the development of a product with Origami components that are important for compatibility and consistency, and we encourage you to read more about them:

- Origami components have been developed to provide a 'core' experience for older browsers, and an 'enhanced' experience for newer ones, and we check for this using a ['cuts the mustard'](/docs/components/compatibility/#cuts-the-mustard) test, which can determine which experience to serve to which browser.
- Another service we provide is the <a href="https://polyfill.io" class="o-typography-link--external">Polyfill Service</a>, which makes newer APIs available to older browsers, allowing us to write code to modern standards.
- Learn more about Origami supported ['brands'](/docs/components/branding/), which can change the appearance of components and provide unique features for different projects.
- [Component versioning](/docs/components/versioning) is also important when building and maintaining products that use Origami components.
