# o-layout

Whole page layouts including typography.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Default and Bleed Layout](#default-and-bleed-layout)
- [Documentation Layout](#documentation-layout)
- [Landing Layout](#landing-layout)
	- [Overview Sections](#overview-sections)
	- [Article List](#article-list)
- [Query Layout](#query-layout)
- [Sass](#sass)
- [JavaScript](#javascript)
	- [Custom Navigation](#custom-navigation)
	- [Linking Headings](#linking-headings)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Overview

`o-layout` provides page layouts and typography as a starting point for new pages. Layouts provided vary per brand and include:

layout | description | master brand | internal brand | whitelabel brand |
--- | --- | :---: | :---: | :---:
default | An empty layout with contained content well. | ✓ | ✓ | |
bleed | An empty layout with full-width "bleed" content. | ✓ | ✓ | |
documentation | A documentation/blog page layout. | ✓ | ✓ | |
landing | A landing/homepage layout. | | ✓ | |
query | A search/query page layout. | | ✓ | |

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-layout`.

Typography is styled automatically using the `o-layout-typography` class. This will style headings, paragraphs, lists, anchor tags, etc. To opt-out of typography styling for specific elements apply the `.o-layout__unstyled-element`.

## Default And Bleed Layout

The default layout is intended for flexible use when another layout isn't suitable. We recommend using the [documentation](#documentation-layout), [landing](#landing-layout), or [query](#query-layout) layout where possible.

The default layout has a single content area "Main Content"

```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
|        MAIN CONTENT        |
|                            |
|                            |
|                            |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

```html
<div class="o-layout" data-o-component="o-layout">
	<div class="o-layout__header">
		<!-- Your header & navigation here. -->
	</div>
	<div class="o-layout__main o-layout-typography">
		<!-- Your page content here. -->
	</div>
	<footer class="o-layout__footer">
		<!-- Your footer & navigation here. -->
	</footer>
</div>
```

The content area has a max width by default. To make the content area full width use the bleed layout. To use the bleed layout add a modifier class `o-layout--bleed`. Do not use the bleed layout with any other layout. _Note: If you are using [o-header-services](https://registry.origami.ft.com/components/o-header-services) as your header set it to bleed also._

```diff
-<div class="o-layout" data-o-component="o-layout">
+<div class="o-layout o-layout--bleed" data-o-component="o-layout">
</div>
```

## Documentation Layout

The documentation layout is intended for text-heavy pages, such as technical documentation or blog posts. The documentation layout includes the following areas (in addition to a heading and footer):

- Main Content
- Sidebar _(optional)_

```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
| SIDE  |    MAIN CONTENT    |
| BAR   |                    |
|       |                    |
|       |                    |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

```html
<div class="o-layout o-layout--docs" data-o-component="o-layout">
	<div class="o-layout__header">
		<!-- Your header & navigation here. -->
	</div>
	<div class="o-layout__sidebar o-layout-typography">
		<!-- Your sidebar here (optional). -->
	</div>
	<div class="o-layout__main o-layout-typography">
		<!-- Your page content here. -->
	</div>
	<footer class="o-layout__footer">
		<!-- Your footer & navigation here. -->
	</footer>
</div>
```


### Main Content

On large viewports the main content area (`o-layout__main`) is split into two columns.

```
┌————————————————————————————┐
|                            |
├————————————————————————————┤
|       |   col 1    | col 2 |
|       |            |       |
|       |            |       |
|       |            |       |
├————————————————————————————┤
|                            |
└————————————————————————————┘
```

Most content is placed into column 1 by default. The exceptions are the `aside` element, which is placed in column 2; and the `table` element, which spans both columns.

Use a containing `div` with class `o-layout__main__single-span` to constrain elements to column 1. Use a `o-layout__main__full-span` container to expand elements to span both columns.


```html
<!-- Your page content here. -->
<div class="o-layout__main o-layout-typography">
	<!-- Most content is placed in column 1 -->
	<h2>A Title</h2>
	<p>Some content.</p>
	<!-- Asides are placed in column 2 by default -->
	<aside>An aside</aside>
	<!-- Tables span columns 1 & 2 by default -->
	<table></table>
	<!-- The class "o-layout__main__single-span" constrains elements to column 1 -->
	<div class="o-layout__main__single-span">
		<!-- Your elements -->
	</div>
	<!-- The class "o-layout__main__full-span" expands elements to span columns 1 & 2 -->
	<div class="o-layout__main__full-span">
		<!-- Your elements -->
	</div>
</div>
```

### Sidebar
By default `o-layout` will generate a sidebar navigation for the documentation layout. This feature is also supported by the query layout but is disabled by default. The sidebar links to any `<h2>` or `<h3>` element within the main content area, providing it has an `id`.

If you wish to display headings other than `<h2>` and `<h3>` in the navigation, you can customise the selector that's used with the `data-o-layout-nav-heading-selector` data attribute. For example, to select only headings which have the class `nav-heading`, use the following:

```diff
+ <div class="o-layout" data-o-component="o-layout" data-o-layout-nav-heading-selector=".nav-heading">
- <div class="o-layout" data-o-component="o-layout">
```

To customise your sidebar navigation entirely, add the data attribute `data-o-layout-construct-nav="false"` to the root `o-layout` element. Then add your own `nav` element within the sidebar, with the class `o-layout__navigation` and a child list.

Altogether, a customised navigation should look like this:
```diff
+<div class="o-layout" data-o-component="o-layout" data-o-layout-construct-nav="false">
	<div class="o-layout__header">
		<!-- o-header-services markup goes here -->
	</div>

	<div class="o-layout__sidebar">
+		<nav class="o-layout__navigation">
			<!-- this can be an <ol> or a <ul> -->
+			<ol>
+				<li>
+					<a href="#this-is-a-title">This is a title</a>
+				</li>
+			</ol>
+		</nav>
	</div>

	<div class="o-layout__main">
		<h2 id="this-is-a-title">This Is A Title</h2>
	</div>

	<footer class="o-layout__footer"></footer>
</div>
```

Alternatively you can customise the navigation [via JavaScript](#custom-navigation).

## Landing Layout

The landing layout is ideal for a homepage or other key category / directory pages. The landing layout provides two areas (in addition to a header and a footer):

- Hero (optional)
- Main Content

```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
|            HERO            |
├————————————————————————————┤
|         MAIN CONTENT       |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

```html
<div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<!-- Your header & navigation here. -->
	</div>
	<div class="o-layout__hero o-layout-typography">
		<!-- Your hero content here (optional). -->
	</div>
	<div class="o-layout__main o-layout-typography">
		<!-- Your landing page content here. -->
	</div>
	<footer class="o-layout__footer">
		<!-- Your footer & navigation here. -->
	</footer>
</div>
```

When the landing page is a sub-page of the site, the hero area may create a visual conflict with the homepage (e.g. on a category / directory page). To reduce the impact of the hero area on sub pages add the modifier class `o-layout__hero--muted`.

```diff
 <div class="o-layout o-layout--landing" data-o-component="o-layout">
	 <div class="o-layout__header">
		 <!-- Your header & navigation here. -->
	 </div>
+	 <div class="o-layout__hero o-layout__hero--muted o-layout-typography">
-	 <div class="o-layout__hero o-layout-typography">
		 <!-- Your hero content here (optional). -->
	 </div>
	 <div class="o-layout__main o-layout-typography">
		 <!-- Your landing page content here. -->
	 </div>
	 <footer class="o-layout__footer">
		 <!-- Your footer & navigation here. -->
	 </footer>
 </div>
```

### Overview Sections

Within the main content area the landing layout provides an overview section. The overview section is ideal for outlining key points of the landing page.

Any number of items are allowed within an overview section, but will wrap onto a new row if there are more than 4.

Overview with 3 items:
```
├———————————————————————————————————————┤
|  content  |   content   |   content   |
├———————————————————————————————————————┤
```

```html
	<div class="o-layout__main o-layout-typography">
		<!-- Your landing page content here. -->
		<!-- Overview -->
		<div class="o-layout__overview">
			<div class="o-layout-item">
				<h2>Great For This</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</div>
			<div class="o-layout-item">
				<h2>Good For That</h2>
				<p>Blanditiis, dolor. Autem recusandae vero ut labore?</p>
			</div>
			<div class="o-layout-item">
				<h2>And More</h2>
				<p>Corrupti nemo voluptate aperiam explicabo vitae cupiditate atque fugiat dignissimos.</p>
			</div>
		</div>
	</div>
```

There is also an actions overview. These support a footer, which is useful for highlighting calls to action with links or buttons.

Actions overview with 4 items with footer:
```
├———————————————————————————————————————┤
| content | content | content | content |
| content |         | content | content |
| content |         | content |         |
├ ——————— | ——————— | ——————— | ——————— ┤
| footer  | footer  | footer  | footer  |
├———————————————————————————————————————┤
```

```html
	<!-- Your landing page content here. -->
	<div class="o-layout__main o-layout-typography">
		<!-- Actions Overview -->
		<div class="o-layout__overview o-layout__overview--actions">
			<div class="o-layout-item">
				<div class="o-layout-item__content">
					<h3>Here's A Thing</h3>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
				<div class="o-layout-item__footer">
					<a href="#">Take An Action</a>
				</div>
			</div>
			<div class="o-layout-item">
				<div class="o-layout-item__content">
					<h2>And Another</h2>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, numquam!</p>
				</div>
				<div class="o-layout-item__footer">
					<a href="#">Do A Thing</a>
				</div>
			</div>
			<div class="o-layout-item">
				<div class="o-layout-item__content">
					<h2>And More Choices</h2>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptatibus?</p>
				</div>
				<div class="o-layout-item__footer">
					<a href="#">Do A Different Thing</a>
				</div>
			</div>
			<div class="o-layout-item">
				<div class="o-layout-item__content">
					<h2>What To Do</h2>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, voluptatibus?</p>
				</div>
				<div class="o-layout-item__footer">
					<a href="#">Learn More</a>
				</div>
			</div>
		</div>
	</div>
```

Sometimes a page may have multiple overview sections. In this case it can appear odd to have three overview items followed by a separate section with four more narrow items. To enforce that the items in each overview section have the same width apply the `o-layout__overview--consistent-columns` modifier class.

```html
	<!-- Your landing page content here. -->
	<div class="o-layout__main o-layout-typography">
		<!-- Actions Overview 1 -->
		<div class="o-layout__overview o-layout__overview--consistent-columns">
			<!-- 3 o-layout-item items (see above example) -->
		</div>

		<!-- Actions Overview 2 -->
		<div class="o-layout__overview o-layout__overview--consistent-columns">
			<!-- 4 o-layout-item items (see above example) -->
		</div>
	</div>
```

```
├———————————————————————————————————————┤
| content | content | content |         |
| content |         | content |         |
| content |         | content |         |
├———————————————————————————————————————┤

├———————————————————————————————————————┤
| content | content | content | content |
| content | content | content | content |
| content |         | content |         |
├———————————————————————————————————————┤
```



[See the registry demos](https://registry.origami.ft.com/components/o-layout#demo-landing-layout) for an example landing page.

### Article List

The landing layout can also be used to display a list of articles. This is useful for a blog for example, especially when combined with the muted hero element `o-layout__hero--muted`.

To list articles within the hero layout remove the `o-layout-typography` class from the `o-layout__main` element. Then add a child unordered list element `ul` with class `o-layout__listing` and a number of list items, as shown in the following example:

```html
 <div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<!-- Your header & navigation here. -->
	</div>
	<div class="o-layout__hero o-layout__hero--muted o-layout-typography">
		<!-- Your hero content here.  -->
	</div>
	 <div class="o-layout__main">
		<ul class="o-layout__listing">
			<li class="o-layout__listing__item">
				<h2 class="o-layout__listing__item__title">
					<a href="#">Example Article Title</a>
				</h2>
				<p class="o-layout__listing__item__description">Example article description / blurb.</p>
				<p class="o-layout__listing__item__meta">
					Posted <time datetime="2020-10-28T00:00:00Z">20 November 2020</time>
					by Author Name. Tagged: <span>Newsletter</span>.
				</p>
			</li>
		</ul>
	 </div>
	<footer class="o-layout__footer">
		<!-- Your footer & navigation here. -->
	</footer>
 </div>
```

## Query Layout

The query layout is intended for search, filter, and result pages. It provides four areas (in addition to a header and a footer):

- Heading
- Query Sidebar
- Main Content
- Aside Sidebar _(optional)_

```html
<div class="o-layout o-layout--query" data-o-component="o-layout">
	<div class="o-layout__header">
		<!-- Your header & navigation here. -->
	</div>
	<div class="o-layout__heading o-layout-typography">
		<!-- Your title / heading content here. -->
	</div>
	<div class="o-layout__query-sidebar o-layout-typography">
		<!-- Your search or filter inputs. -->
	</div>
	<div class="o-layout__main o-layout-typography">
		<!-- Your search results or other main content. -->
	</div>
	<div class="o-layout__aside-sidebar o-layout-typography">
		<!-- Your asides / additional information (optional). -->
	</div>
	<div class="o-layout__footer">
		<!-- Your footer & navigation here. -->
	</div>
</div>
```

### Query Sidebars

The query sidebar supports a [generated navigation like the documentation layout](#sidebar) but it is disabled by default and must be turned on with `data-o-layout-construct-nav="true"`:
```html
<div class="o-layout o-layout--query" data-o-component="o-layout" data-o-layout-construct-nav="true">
	<!-- query layout -->
</div>
```

Alternatively the `.o-layout-sticky-sidebar-container` class may be used as a child of the query sidebars. Its contents will stick to the top of the viewport as the user scrolls.

```html
<div class="o-layout o-layout--query" data-o-component="o-layout">
	<!-- ... -->
	<div class="o-layout__aside-sidebar o-layout-typography">
		<!-- Sticky container for sidebar content (optional) -->
		<div class="o-layout-sticky-sidebar-container">
			<!-- Your asides / additional information (optional). -->
		</div>
	</div>
	<!-- ... -->
</div>
```

### Large Viewports
```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
|       |  HEADING   |       |
|       ├————————————┤       |
| QUERY |  MAIN      | ASIDE |
| SIDE  |  CONTENT   | SIDE  |
| BAR   |            | BAR   |
|       |            |       |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

This layout may be used without a right-hand side bar. To remove it, delete the aside sidebar element `o-layout__aside-sidebar`.
```
┌————————————————————————————┐
|           HEADER           |
├————————————————————————————┤
|       |  HEADING           |
|       ├————————————————————|
| QUERY |  MAIN              |
| SIDE  |  CONTENT           |
| BAR   |                    |
|       |                    |
├————————————————————————————┤
|           FOOTER           |
└————————————————————————————┘
```

### Medium Viewports
```
┌————————————————————————┐
|          HEADER        |
├————————————————————————┤
|       |  HEADING       |
|       ├————————————————┤
|       |                |
| QUERY |  MAIN          |
| SIDE  |  CONTENT       |
| BAR   |                |
|       ├————————————————┤
|       | ASIDE SIDE     |
|       | BAR            |
├————————————————————————┤
|          FOOTER        |
└————————————————————————┘
```

### Small Viewports
```
┌————————————————————┐
|       HEADER       |
├————————————————————┤
| HEADING            |
├————————————————————┤
| QUERY SIDE BAR     |
├————————————————————┤
| MAIN CONTENT       |
├————————————————————┤
| ASIDE SIDE BAR     |
├————————————————————┤
|       FOOTER       |
└————————————————————┘
```

## Sass
You can include o-layout styles with the `oLayout` mixin.

As `o-layout` only supports the internal brand, your project must also set its brand to internal `$o-brand: 'internal';`.

```scss
$o-brand: 'internal';
@import '@financial-times/o-layout/main';

@include oLayout();
```

If your project does not use all layouts or other features provided by `o-layout`, include them selectively with an `$opts` argument.

**Layout Options**
- documentation
- landing
- query
- bleed

**Feature Options**
- sidebar-nav (enables the [generated sidebar navigation](#custom-navigation) for the query layout. _Styles for the sidebar navigation are included by default with the documentation layout._)
- sticky-sidebar-container (A containing element for use within o-layout sidebars. Sticks to the top of the viewport as the user scrolls. See query layout examples.)
- linked-headings (enables clickable / highlighted anchors on the page)
- typography (enables body typography applied with the class `o-layout-typography`)

```scss
@include oLayout($opts: (
	'layouts': ('documentation', 'landing', 'query', 'bleed'),
	'features': ('sidebar-nav', 'sticky-sidebar-container', 'linked-headings', 'typography')
));
```

The landing layout supports an extra option, which sets a background image on the hero area:

```scss
@include oLayout($opts: (
	'layouts': ('documentation', 'landing', 'query', 'bleed'),
	'features': ('linked-headings', 'typography'),
	'hero-image': 'https://example.com/image.png',
));
```

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an `o-layout` object manually or fire an o.DOMContentLoaded event, which `o-layout` listens for.

Use the following to initialise your layout manually:
```js
import oLayout from '@financial-times/o-layout';
oLayout.init();
```

### Custom Navigation

The [documentation layout](#documentation-layout) uses JavaScript to construct a sidebar navigation out of headings (`h1`, `h2` and `h3`) in the content, and to highlight those items depending on the scroll position. The [query layout](#query-layout) also supports a generated nav but by default it is disabled.

To generate a nav for the query layout, or turn it off for the documentation layout, explicitly set the "construct navigation" option to `true` or `false`. Either declaritively in your html with the `data-o-layout-construct-nav` attribute:
```html
<div class="o-layout o-layout--query" data-o-layout-construct-nav="true" data-o-component="o-layout">
	<!-- Layout markup. -->
</div>
```

Or imperatively with JavaScript, by setting the `constructNav` option:
```js
import oLayout from '@financial-times/o-layout';
oLayout.init(null, { constructNav: true });
```

If you would like to change what items show in the generated navigation, set the "navigation heading selector" option to any valid CSS selector. Do this declaritively in your html with the `data-o-layout-nav-heading-selector` attribute:
```html
<div class="o-layout o-layout--query" data-o-layout-nav-heading-selector="h1, h2, .nav-heading" data-o-component="o-layout">
	<!-- Layout markup. -->
</div>
```

Or imperatively with JavaScript, by setting the `navHeadingSelector` option:

```js
import oLayout from '@financial-times/o-layout';
oLayout.init(null, { navHeadingSelector: 'h1, h2, .nav-heading' });
```

### Linking Headings

Heading elements such as `h1`, `h2`, etc that have an `id` attribute are made linkable by default. The heading can then be clicked to update the URL with a hash, for sharing a direct link to that heading.

To customise which headings can be clicked and linked to directly, set the `linkedHeadingSelector` option to any valid CSS selector string:

```js
import oLayout from '@financial-times/o-layout';
oLayout.init(null, { linkedHeadingSelector: 'h1, h2, .link-heading' });
```

Turn off linkable headings by setting `linkHeadings` to false:

```js
import oLayout from '@financial-times/o-layout';
oLayout.init(null, { linkHeadings: true });
```

## Migration Guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.3 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.2.5 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.3.4 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-component-boilerplate/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).


## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
