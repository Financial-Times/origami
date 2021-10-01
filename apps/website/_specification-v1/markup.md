---
title: Markup Specification
description: An overview of how the Origami team writes markup.
permalink: /spec/v1/components/markup/

# Redirect from legacy URLs
redirect_from:
  - /docs/syntax/html/
  - /docs/syntax/mustache/
  - /spec/v1/markup/

# Navigation config
nav_display: false

# Collection listing config
collection_listing_display: false
---

# Markup Specification

The markup **must** be <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax" class="o-typography-link--external">valid HTML5</a>, except that a DOCTYPE, and opening `<html>` and `<body>` tags should be assumed (i.e. the markup should be a document body fragment which becomes a valid HTML5 document when enclosed in `<html>` and `<body>` tags).

Markup **must** also conform to the following XML rules:
- **Must** have a single root element.
- All elements that are opened **must** be closed (including <a href="https://github.com/Financial-Times/ft-origami/issues/66" class="o-typography-link--external">inline SVG</a>).
- Closing tags **must** be in order.
- **Must** not have valueless attributes.

## Elements

Semantic markup **must** be used where native elements exist to describe the content:
- Good: `<address>`
- Bad: `<div class="address">`

The following elements **must not** be used:
- `<script>`
- `<style>`
- `<base>`
- `<link>`
- `<noscript>`
- `<iframe>` (except iframes **may** be added to the DOM by JavaScript)

Elements and attributes which are deprecated in the HTML5 spec **should not** be used:
- Bad: `<applet>`, `<frameset>`, `<font>`, `<link rev="">`, `<td align="right">`

Elements that are normally singletons on a page **must not** be used in components:
- Bad: `<meta name="viewport" content="..." />`.
- Bad: `<meta charset="utf-8">`.
- Bad: `<title>`, `<html>`, `<head>`, `<body>`.

## Attributes

The following attributes **must not** be present on any element:
- target
- Event handler attributes, e.g. `onclick`, `onchange`

HREFs in markup **must not** use the `javascript:` protocol.

Attributes that are normally singletons on a page **must not** be used in components. This includes attributes defined by specs external to the main HTML5 spec, such as Microdata and WAI-ARIA:
- Bad: the ARIA `role="main"` attribute.
- Bad: the `id` attribute (except as below).

The ID attribute **must not** be used, except where:
- It identifies a form element that needs to be targeted by a `for` attribute _or_ is an unavoidable requirement of a third party library e.g. google ads.
- The value is namespaced with the name of the component, e.g. `o-signin-username`.
- The component only has singleton use cases (i.e. it is pointless to include it in a product page more than once).

Component authors are encouraged to provide assistive accessibility information in their component's markup where appropriate. See <a href="https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190207/" class="o-typography-link--external">WAI-ARIA Authoring Practices</a>; keep in mind no ARIA is better than bad ARIA.

## Conditional Comments

Conditional comments **must not** be used within components. To target styles for a specifc browser or feature set, see [feature flags in the Sass spec](/spec/v1/components/sass/#feature-flags).

## Owned DOM

"Owned DOM" is the DOM a component **may** act on with JavaScript or style with CSS.

A component **may** act on a DOM element using JavaScript if it, or any ancestor, has a data attribute containing the component's name `data-o-componentname`. It **must not** act on other DOM, [with two exceptions](/spec/v1/components/javascript/#encapsulation).

A component **may** style a DOM element with CSS if it, or any ancestor, has a class which starts with the name of the component `o-componentname`. It **must not** style other DOM.

As an example, the `o-date` component is permitted to style and apply JavaScript behaviour to the following element:
```
<time data-o-component="o-date" class="o-date" datetime="2000-06-14T23:00:00.000Z">June 15, 2000</time>
```

## Markup Structure

Component styles and behaviour **may** assume that any HTML markup follows the hierarchical structure specified in their documentation and demos. However, components **should not** make assumptions about the order of HTML elements, and **should**, as far as possible, cope with additional HTML elements not specified.


## No Script

Markup **may** contain elements that do not work without accompanying JavaScript. To support a [core and enhanced experience](/docs/components/compatibility/#core--enhanced-experiences) these elements **must** have a `o--if-js` class. They **should** be accompanied by an element with a class of `o--if-no-js` to offer feature fallback to users where the product developer opts not to run the JavaScript, or the user agent does not support it:

```
<div class="o--if-js">Submit a new comment: ... </div>
<div class="o--if-no-js">To comment on this article, you need to upgrade your web browser.  <a href="...">Learn how to upgrade</a>.</div>
```

If the `o--if-no-js` element contains an image for the [core experience](/docs/components/compatibility/#core--enhanced-experiences) only, a `<noscript>` tag **should** be used <a href="http://timkadlec.com/2012/04/media-query-asset-downloading-results/" class="o-typography-link--external">to avoid unnecessary HTTP requests</a>:

```
<div class="o--if-no-js">
    <noscript>
        <img src="https://spoor-api.ft.com/px.gif?xxxxxx"/>
    </noscript>
</div>
```

## Templates

Origami components **should not** provide templates directly, outside of HTML within component demos and the readme. But where they do, templates **must** be in <a href="https://mustache.github.io/" class="o-typography-link--external">Mustache format</a>. This is because product developers may choose to use any technology stack to built their application, and it’s important that they not be forced to choose a particular one in order to use Origami components.

### Reference formats

Mustache templates **may** include references to other assets, whether they are data placeholders, other templates, or other components (all of which need to be resolved server-side), or static assets like images that might need to be resolved on the client. In many cases these references will need to be transformed by product developers in order to make templates useful, while other product developers may simply use templates as a guide to the markup they must write into their own code. Either way, templates **must** refer to external assets in a consistent way.

### Partials

Partials included from the same repository **must** be referenced using a relative path, prefixed with a `>` and enclosed in double braces:

```
{% raw %}{{> ../partials/innerbox.mustache }}{% endraw %}
```

### Other Origami Components

Other Origami components must be referenced using the name of the component, enclosed in triple braces:

```
{% raw %}{{{ o-sign-in }}}{% endraw %}
```

### Static Assets

Static assets (such as images) included from the same repository **must** be referenced using a relative path:

```
<img src="../images/logo.png" alt="" />
```

### Links

Links to real URLs **must** be [protocol-relative](https://www.paulirish.com/2010/the-protocol-relative-url/):
```
<a href="//www.google.com">Google</a>
```

### Data

Placeholders for the component's data model **must** be referenced using a descriptive (lowercased and hyphened) keyword, prefixed with the name of the component and a dot:
```
{% raw %}{{ o-header.main-title }}{% endraw %}
```

Double braces **must** be used for content that should have HTML entities escaped. Triple braces **must** be used for content which should be inserted without modification.
