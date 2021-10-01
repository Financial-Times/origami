---
title: Component Customisation
description: Decide if you should customise a component for your project, learn the ways a component may be customised, and avoid other approaches which may be unreliable.
cta: Read more about how to customise components

# Redirect from previous branding page
redirect_from:
  - /docs/components/branding/

# Navigation config
nav_display: true
nav_label: Customisation
nav_order: 11
---

# {{ page.title }}

Origami aims to improve design consistency and reduce the time teams spend repeating work. Providing component APIs for customisation helps achieve those aims by allowing components to be used across different contexts and different brands, and to provide flexibility for novel projects which may introduce a more unique style.

This document aims to help you decide if you should customise a component for your project, show the ways a component may be customised, and demonstrate why other approaches should be avoided.

<abbr title="Too long; didn't read">
<strong>
TL;DR:
</strong>
</abbr>
- Double check customisation is appropriate. Reusing an existing pattern or updating a component to support and share your usecase is preferable.
- Specify a brand which suits your type of project.
- Customise component's using their Sass API.
- Avoid CSS overrides, they are unsupported and unreliable.

## Check Customisation Is Appropriate

The first step before customising an Origami component is to ask:
1. Is there an existing style which could work already? After searching the [Origami Registry](https://registry.origami.ft.com/components) it's worth double checking in the <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}">#{{site.data.contact.slack}}</a> Slack channel, to reduce duplicated effort and to help maintain a consistent user interface across FT Group projects.
2. Would your customisation be useful for other teams/projects? Maybe a component should be updated for your usecase, so other teams benefit from your work. A new component might be more appropriate if your design diverges significantly.

A good place to start is to ask for feedback in the <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}">#{{site.data.contact.slack}}</a> Slack channel. The core Origami team, along with the design team, can help identify similar existing styles or help make any relevant component updates to support your usecase without customisation.

## Brands

Most Origami components are branded to provide a distinct appearance within different contexts. A project sets its brand which applies to all the components which it includes.

### Supported brands

Origami maintained brands include:
- master: FT branding for public ft.com sites and affiliates.
- internal: Style suitable for tools, documentation, and internal products.
- whitelabel: Base, structural styles only to build on and customise.

Taking `o-table` as an example, the "master" brand version offers a "row stripes" feature, which uses "master" brand colours such as "paper" and "wheat":
{% include demo.html component="o-table" demo="row-stripes" brand="master" height="242px" %}

The "internal" brand version also supports "row stripes" but uses a different colour palette:
{% include demo.html component="o-table" demo="row-stripes" brand="internal" height="242px" %}

The "whitelabel" brand does not support "row stripes" and therefore outputs no styles to support that feature:
{% include demo.html component="o-table" demo="basic" brand="whitelabel" height="256px" %}

### Choose A Brand

The "master" brand is the default brand, but your project may use any of the provided Origami brands. The brand is configured once and affects all components used by your project.

To select a brand within your project, see the tutorial for your method of including Origami components:

- [Origami Build Service tutorial](/docs/tutorials/build-service/#selecting-a-brand)
- [Package manager (npm) tutorial](/docs/tutorials/manual-build/#selecting-a-brand)

### Customise A Brand

If your project has access to a component's Sass API (see the [package manager (npm) tutorial](/docs/tutorials/manual-build/#selecting-a-brand)) it is possible to customise your chosen brand. For example, at the time of writing, the [`oTypographySetFont`](https://registry.origami.ft.com/components/o-typography@6.4.5/sassdoc?brand=master#mixin-otypographysetfont) mixin can be used to customise component fonts. This customises the font used by all components included in your project.

<aside>
Not all components support brand customisation but the Origami team are happy for support to be added as needed. Ask the core Origami team about new features in the <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}">#{{site.data.contact.slack}}</a> Slack channel.
</aside>

<pre><code class="o-syntax-highlight--scss">// Incomplete example for demo purposes only

// Set the brand.
$o-brand: 'whitelabel';

// Customise: Tell the o-typography component to use our custom
// font, it will affect all other components which
// are built using o-typography.
@include oTypographySetFont(
    $type: 'sans',
    $family: 'Comic Sans MS', sans-serif
);

// Customise: Tell the o-header-services we want hot pink
// in the navigation.
@include oHeaderServicesCustomize((
	'nav-hover-background': hotpink
));
</code></pre>


<figure>
	<img alt="" src="/assets/images/component-customisation/whitelabel-customisation.png" />
	<figcaption>
        An example project which builds on the whitelabel brand. The font has been customised with `o-typography` Sass (oooh! Comic Sans). It affects all components which use `o-typography`, including the other components on the page, `o-table` and `o-header-services`. `o-header-services` has also been customised using Sass to have a unique highlight colour (oooh! hotpink!)
	</figcaption>
</figure>

This is great to create a distinct brand, where a customisation should affect all instances of a component across a project.

If your project is based on the master or internal brand, however, it is more likely that you want to create new variants of a component to use alongside existing ones. For example to output an additional banner style to support a new marketing campaign.

## Variants

If your project has access to a component's Sass (see the [manual build tutorial](/docs/tutorials/manual-build/#selecting-a-brand)) your project may use Sass mixins to customise components by outputting a new variant of that component. A component variant is an instance of a component with modified appearance or functionality.

For instance, at the time of writing, the `o-banner` component has an [`oBannerAddTheme` mixin](https://registry.origami.ft.com/components/o-banner@3.4.2/sassdoc?brand=master#mixin-obanneraddtheme) which provides options for creating a banner variant with customised colour and background image:

<pre><code class="o-syntax-highlight--scss">@include oBannerAddTheme('my-pikachu-variant', (
    background-image: url('https://example.org/pikachu.png'),
    background-color: oColorsByName('lemon'),
    text-color: oColorsByName('slate'),
    button-background-color: oColorsByName('crimson'),
));</code></pre>

<aside>If your project is using the <a href="/docs/tutorials/build-service/">Origami Build Service</a>, you do not have access to the component's Sass API, as such it is not currently possible to create custom component variants. It may be possible in the future using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">Custom CSS Properties (CSS Variables)</a>, when projects no longer support older browsers such as Internet Explorer.</aside>

<figure>
	<img alt="" src="/assets/images/component-customisation/pikachu-banner.png" />
	<figcaption>
        A custom banner variant featuring a Pikachu background (this is a fun example but a bad one because Pikachu's ear obscures some text).
	</figcaption>
</figure>

## Avoid CSS Overrides

Another way to customise components is by applying additional CSS styles within your project. This is **not recommended** and should be avoided. Applying styles on top of a components style is unreliable and should be avoided as component CSS may change in future minor releases in a way that conflicts with your overrides.

<aside>
The Origami team are available to support you in removing CSS overrides, and reduce the complexity of your project (say hello in the <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}">#{{site.data.contact.slack}}</a> Slack channel).
</aside>

For instance, given a component `o-example-component` with the following code:
<pre><code class="o-syntax-highlight--html">&lt;!-- Component HTML (o-example-component) -->
&lt;div class="o-example-component">
    &lt;div class="o-example-component__content">
        Some text and &lt;a href="#">a link&lt;/a> in the example component.
    &lt;/div>
&lt;/div></code></pre>
<pre><code class="o-syntax-highlight--scss">// Component CSS (o-example-component),
// styles the link text black in colour:
.o-example-component a  {
    color: black;
}</code></pre>

You could include the component CSS in your project and customise the link colour by adding your own CSS afterward:
<pre><code class="o-syntax-highlight--scss">// Your Project CSS:
// Override "o-example-component" links
// to be hotpink in colour:
.o-example-component a  {
    color: hotpink;
}</code></pre>

This would make the link of `o-example-component` a hotpink colour in your project. However in a future, potentially minor, release of `o-example-component` the component's CSS could change and visually break your project.

In the below example the component's [CSS selector increases in specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) so the overrides no longer apply:

<pre><code class="o-syntax-highlight--scss">// Component CSS (o-example-component),
// styles the link text black in colour:
.o-example-component .o-example-component__content a  {
    color: black;
}</code></pre>

<pre><code class="o-syntax-highlight--scss">// Your Project CSS:
// Override no longer applies as the component's
// CSS selector is more specific.
.o-example-component a  {
    color: hotpink; // Does nothing now.
}</code></pre>

To ensure its overrides always apply a project could use overrides with a very high specificity, e.g. with the `!important` keyword, but there are further problems with this approach. Using a high specificity to override styles may still visually break if the context around those overrides change. For example if the component introduces a hotpink background the project's links would become invisible:

<pre><code class="o-syntax-highlight--scss">// Component CSS (o-example-component),
// styles the link text black in colour:
.o-example-component .o-example-component__content a  {
    color: black;
    background-color: hotpink; // This is new.
}</code></pre>

<pre><code class="o-syntax-highlight--scss">// Your Project CSS:
// Override no longer applies as the component's
// CSS selector is more specific.
.o-example-component a  {
    // Still applies, now there is a hotpink foreground
    // on a hotpink background, invisible links 😱
    color: hotpink !important;
}</code></pre>

In conclusion customising components with un-documented CSS overrides is not recommended. It risks repeated work, a reduction in design consistency, and potentially unreliable code leading to a poor user experience further wasted effort in the future.

## Summary

The core Origami team, along with the design team, can help identify any existing styles which could be reused, or, help update components to support your project without customisation — so your design is documented, demoed, and more teams can benefit from your work 🎉

When customisation does make sense use a component's Sass API. Usually this means using Sass to create additional variants for use alongside existing component styles. Alternatively, you can customise your chosen brand to affect all instances of an existing component variant. Avoid CSS overrides as these are unsupported and likely to break.

If you have any questions about customising components, or feature requests, ask them in the <a href="https://financialtimes.slack.com/messages/{{site.data.contact.slack}}">#{{site.data.contact.slack}}</a> Slack channel, the core Origami team are here to help 😊
