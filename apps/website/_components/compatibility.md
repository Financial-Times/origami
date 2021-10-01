---
title: Compatibility
description: Documentation about how Origami ensures compatibility across different browsers and devices, and how you can write code in a way that supports this.
cta: Read more about Origami's compatibility

# Redirect from legacy URLs
redirect_from:
  - /docs/developer-guide/modules/core-vs-enhanced-experience/
  - /docs/developer-guide/modules/using-the-polyfill-service/

# Navigation config
nav_display: true
nav_label: Compatibility
nav_order: 30
---
# {{ page.title }}


## Core & enhanced experiences

`core` and `enhanced` are definitions we have for 'experiences' that we serve to a browser. The experience we serve depends on the presence of some features within the browser.

Generally, older browsers that don't support newer JavaScript features will get a `core` experience, and modern browsers will get the `enhanced` experience.

To determine whether or not a browser supports those features, we use a 'cuts the mustard' test.

### Cuts the mustard

<aside>This expression comes from the <abbr title="British Broadcasting Corporation">BBC</abbr>'s <a href="http://responsivenews.co.uk/post/18948466399/cutting-the-mustard" class="o-typography-link--external">post about <abbr title="Cuts The Mustard">CTM</abbr></a></aside>

#### Defining a <abbr title="Cuts The Mustard">CTM</abbr> test

This test checks browsers for some features that are only implemented by modern browsers. We recommend the following test:

<pre class="o-layout__main__full-span"><code class="o-syntax-highlight--javascript">var script = document.createElement('script');
var supportsDeferredScripts = "defer" in script && "async" in script;
window.cutsTheMustard = (typeof document.documentElement.dataset === 'object' && ('visibilityState' in document) && supportsDeferredScripts);</code></pre>

#### Toggling styling

The styling we choose to display rely on class names. Keeping with the experiences, we will be using `core` and `enhanced`. Origami components contain fallback styling for the browsers that fail the test. We need to toggle the class names based on the result of the test, and to avoid flashes of content we'll always assume that the experience we will be served is core, until proven otherwise.

Your `<html>` will need the `core` class:
<pre><code class="o-syntax-highlight--html">&lt;html class="core"></code></pre>

And we'll want to add a script to replace that class with `enhanced` if the browser _does_ pass the test:

<pre><code class="o-syntax-highlight--javascript">if (window.cutsTheMustard) {
	document.documentElement.classList.replace('core', 'enhanced');
}</code></pre>

Finally, we need to add instructions for our styling to handle the html class:
<pre><code class="o-syntax-highlight--css">.core .o--if-js,
.enhanced .o--if-no-js {
	display: none !important;
}</code></pre>

#### Loading JavaScript asynchronously

If our browser passes the test and there is JavaScript that should only be served for the `enhanced` experience, we can load the JavaScript dynamically.

If there is JavaScript to execute regardless of the experience served to the browser, we should add a `<script>` element to load that JavaScript.

<pre><code class="o-syntax-highlight--javascript">&lt;script>
	(function(src) {
		if (window.cutsTheMustard) {
			script.async = script.defer = true;
			script.src = src;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(script, s);
		}
	}('https://example.com/main.js));
&lt;/script></code></pre>

<aside>We've put the full implementation of our <abbr title="Cuts The Mustard">CTM</abbr> test <a href="https://codepen.io/ft-origami/pen/rZjzbw" class="o-typography-link--external">on Codepen</a></aside>

## Browser support

Origami follow the <a href="https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/" class="o-typography-link--external"><abbr title="Financial Times">FT</abbr> Browser Support Policy document</a> available to <abbr title="Financial Times">FT</abbr> staff.

## Polyfill service

In the physical world, 'Polyfilla' is a type of plaster that is used to fill in small holes in walls. In web development, polyfills are snippets of code that implement a feature on browsers that do not natively support that feature. It means that we can write modern JavaScript without having to invest a large amount of time in making it work in older browsers.

What can be time consuming, is identifying the polyfills we need, so for that, we use and maintain the <a href="http://polyfill.io" class="o-typography-link--external">Polyfill Service</a> which hosts all of its own documentation.
