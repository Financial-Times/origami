---
title: Silent mode
description: Documentation on how to use Origami component's deprecated 'silent mode'. This allows you to control the CSS output of a component.
cta: Learn about silent mode

collection_listing_display: false

# Navigation config
nav_display: false
nav_label: Silent mode
nav_order: 40
---

# {{ page.title }}

Some styled Origami components come with a 'silent mode' [Sass](https://sass-lang.com/) variable, which is used to control when the component outputs CSS. However, this is now deprecated in favour of including a [Sass](https://sass-lang.com/) mixin to control CSS output.

<aside>The <a href="https://sass-lang.com/guide" class="o-typography-link--external">Sass Guide</a> has more information about <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> mixins, and many other features.</aside>

`$o-component-silent-mode` **defaults to ON**. You do not need to explicitly set it to be on, but you do need to be aware of this default.

If we consider a small snippet of <abbr title="Sassy Cascading Style Sheets">SCSS</abbr>, as the one below, we can illustrate how silent mode works.
<aside>This is an illustration of styles in a component, not an accurate representation of an <code>o-message</code> mixin.</aside>

<pre><code class="o-syntax-highlight--scss">$o-message-is-silent: true !default;

@mixin oMessage() {
	.o-message {
		display: block;
	}

	.o-message--closed {
		display: none;
	}
};

@if ($o-message-is-silent == false) {
	@include oMessage();

	// Set to silent again to avoid being output twice
	$o-message-is-silent: true !global;
}</code></pre>

## ON

When a component's silent mode is set to `true` or 'on': `$o-component-is-silent: true`, the <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> mixins and variables will be made available, but they will _not_ be included or built.

What will be available to you in this case is:


<pre><code class="o-syntax-highlight--scss">@mixin oMessage() {
	...
}</code></pre>

## OFF
When a component's silent mode is `false` or, 'off': `$o-component-is-silent: false`, the <abbr title="Sassy Cascading Style Sheets">SCSS</abbr> in the example above will be included automatically and will build all of its styles.

The following will be available for you to use in your project:

<pre><code class="o-syntax-highlight--scss">.o-message {
	display: block;
}

.o-message--closed {
	display: none;
}</code></pre>
