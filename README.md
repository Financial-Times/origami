o-layout [![Circle CI](https://circleci.com/gh/Financial-Times/o-layout/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-layout/tree/master)
=================

This component provides a responsive full page layout for internal documentation and tooling.
It provides:
- consistent design (typography, colors),
- ease of set up (header, footer, sidebar, navigation)


## Table of Contents

- [Usage](#usage)
	- [Markup](#markup)
		- [Layout Base](#layout-base)
		- [Navigation and Content](#navigation-and-content)
		- [Asides](#asides)
	- [Sass](#sass)
	- [JavaScript](#javascript)
		- [Construction](#construction)
		- [Custom Navigation](#custom-navigation)
- [Contact](#contact)
- [Licence](#licence)


## Usage

`o-layout` provides a grid that has the following structure:

```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
|        |                   |
|  SIDE  |    MAIN           |
|  BAR   |    CONTENT        |
|        |                   |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

Within the main content section, there is another grid, which looks like this:

```
┌————————————————————————————┐
|                            |
├————————————————————————————┤
|        | MAIN       |      |
|        | CONTENT    |      |
|        | WELL       |      |
|        |            |      |
├————————————————————————————┤
|                            |
└————————————————————————————┘
```
At its base, the main content section styles _elements_, not classes.
It will automatically style paragraphs, headings, lists and anchor tags, for example.
It will also automatically style tables and asides, which will occupy different columns or span different columns within the main content section.

The grid does not require the sidebar to maintain its layout.

### Markup

`o-layout` uses CSS Grid Layout, and more specifically [grid template areas](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Grid_Template_Areas).   

#### Layout Base
The markup below ↓ will generate the ascii grid above ↑.  

The main content section will constrain its _immediate_ children to its first column, with the exception of `table`s and `aside`s.  
If you want an element to span the full width of the main content area, you can apply the `o-layout__main__full-span` class to that element to achieve that effect.

_Note: `o-layout` styles tables to span two columns automatically. If you want a table to stick to a single column, you can apply_ `o-layout__main__single-span`, _instead. Every other element is styled to fit a single column._

```html
<div class="o-layout" data-o-component="o-layout">
	<header class="o-layout__header">
		<!-- o-header-services markup goes here -->
	</header>

	<div class="o-layout__sidebar">
		<!-- content for the sidebar goes here -->
	</div>

	<div class="o-layout__main">
		<!-- Any and all content goes here -->
		<h2 id="this-is-a-title"> This is a title</h2><!-- one column wide -->
		<p> This is some content. </p> <!-- one column wide -->
		<div class="o-layout__main--full-span"> <!-- two columns wide -->
			<p> This is more content</p>
			<p> This is even more content</p>
		</div>
	</div>

	<footer class="o-layout__footer">
		<!-- o-footer-services markup goes here -->
	</footer>
</div>
```

#### Navigation and Content
Unless the configuration says otherwise, `o-layout` will generate a sidebar navigation, which will rely on the usage of `<h2>`s and `<h3>`s present in the main content section. If this is a feature you want to use, then you don't need to add anything to the sidebar section of `o-layout`.

However, if you would like to customise your sidebar navigation, there are two ways to do this. You can add a data-attribute to your markup, or you can do [via JavaScript](#custom-navigation)

Please note, automatic navigation construction creates an HTML tree structure that allows the nav items to be highlighted when you scroll down the page.
For this effect to apply to your custom navigation, you will need to add the `o-layout__navigation` class your navigation list, and ensure that your `<a href>`s point at the `id` of the section it corresponds to.

Altogether, your markup should look like this:
```diff
+<div class="o-layout" data-o-component="o-layout" data-o-layout-construct-nav="false">
	<header class="o-layout__header">
		<!-- o-header-services markup goes here -->
	</header>

	<div class="o-layout__sidebar">
		<!-- this can be an <ol> or a <ul> -->
+		<ol class="o-layout__navigation">
+			<li>
+				<a href="#this-is-a-title">This is a title</a>
+			</li>
+		</ol>
	</div>

	<div class="o-layout__main">
		<!-- Any and all content goes here -->
		<h2 id="this-is-a-title"> This is a title</h2>
		<p> This is some content. </p>
		<div>
			<p> This is more content</p>
			<p> This is even more content</p>
		</div>
	</div>

	<footer class="o-layout__footer">
		<!-- o-footer-services markup goes here -->
	</footer>
</div>
```

If you wish to use headings other than `<h2>` and `<h3>` in the navigation generation, you can customise the selector that's used. For example, to select only headings which have the class `nav-heading`, use the following:

```diff
+ <div class="o-layout" data-o-component="o-layout" data-o-layout-nav-heading-selector=".nav-heading">
- <div class="o-layout" data-o-component="o-layout">
```

#### Asides

`o-layout` will make content asides literal asides to the content. As long as the aside is an aside element and placed _after_ the content it is an aside to, that element will line up correctly:

```diff
<div class="o-layout" data-o-component="o-layout">
	<header class="o-layout__header">
		<!-- o-header-services markup goes here -->
	</header>

	<div class="o-layout__sidebar">
		<!-- this can be an <ol> or a <ul> -->
		<ol class="o-layout__navigation">
			<li>
				<a href="#this-is-a-title">This is a title</a>
			</li>
		</ol>
	</div>

	<div class="o-layout__main">
		<!-- Any and all content goes here -->
		<h2 id="this-is-a-title"> This is a title</h2>
		<p> This is some content. </p>
		<div>
			<p> This is more content</p>
			<p> This is even more content</p>
		</div>
+		<aside>
+			<p> This is an aside to the content immediately above.</p>
+		</aside>
	</div>

	<footer class="o-layout__footer">
		<!-- o-footer-services markup goes here -->
	</footer>
</div>
```

### Sass
As with all Origami components, o-layout has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-layout-is-silent: false;` in your Sass before you import the `o-layout` Sass.

Otherwise, you can initialise the styling for o-layout with your own classnames, like this:
```sass
import 'o-layout/main';

@include oLayout($class: my-layout);
```

### JavaScript
No code will run automatically unless you are using the Build Service. You must either construct an `o-layout` object or fire an o.DOMContentLoaded event, which `o-layout` listens for.

#### Construction

If you have set up your HTML to use default `o-layout` classes, then you can use the following to initialise your layout:
```js
const oLayout = require('o-layout');
oLayout.init();
```

#### Custom Navigation
`o-layout` uses JavaScript to construct the sidebar navigation out of headings in the content, and to highlight those items depending on the scroll position. This is its default behaviour.

If you would like to define your own navigation, you will need to initialise `o-layout` like this:

```js
const oLayout = require('o-layout');
oLayout.init(null, { constructNav: false });
```

If you would like to specify a custom selector for the navigation generation, you can do so like this:

```js
const oLayout = require('o-layout');
oLayout.init(null, { navHeadingSelector: '.nav-heading' });
```

---

### Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-component-boilerplate/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

### Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
