---
title: Customisation
description: When and how to customise an Origami component
sidebar:
  order: 13
---

<abbr title="Too long; didn't read">
  <strong>
  TL;DR:
  </strong>
</abbr> Origami components may offer customisation options. These will be clearly documented with design guidelines on how and why to customise components. Where customisation options aren't provided we recommend discussing your need with the Origami team. We may then take one of following options:

- Propose an existing component to use without customisation,
- Update the component for everyone,
- Add a customisation option to meet your needs, or;
- Agree to build a new custom component for this instance.

In no scenario do we recommend overriding Origami styles as this is unsupported and likely to break without warning.

## Is there an existing style which could work already?

It's worth double checking, to reduce duplicated effort and to help maintain a consistent user interface across FT Group projects.

After searching the Origami website the team in the <a href="https://financialtimes.slack.com/messages/design-system-guild">#design-system-guild</a> Slack channel will be able to advise. Likely a member of the Origami team or one of our supporting designers have had a similar challenge in the past.

## Would your customisation be useful for other teams/projects?

Maybe a component should be updated for your usecase, so other teams benefit from your work. A new component might be more appropriate if your design diverges significantly.

A good place to start is to again ask for feedback in the <a href="https://financialtimes.slack.com/messages/design-system-guild">#design-system-guild</a> Slack channel. The core Origami team, along with the design team, can help identify similar existing styles or help make any relevant component updates to support your use-case without customisation.

## Should this be project specific?

Origami is helpful to spread tried, tested, and thoroughly documented design patterns we want to encourage across the FT Group. But teams and brands still need to be able to experiment, do their own thing, with custom design patterns which augment Origami.

We may agree the right thing to do is to build a custom component outside of Origami.

## Avoid Style Overrides

If you can't use Origami for your use-case please raise with the team as above, and we'll support you to update the component or add customisation options if possible. The alternative is a custom built component. In no scenario do we recommend overriding Origami styles as this is unsupported and likely to break without warning.

### CSS Demonstration

Use CSS Custom Properties to customise components where that customisation option is documented within design guidelines and the component `README`. Avoid CSS overrides.

Applying CSS overrides on top of a components style is unreliable and should be avoided as component CSS may change in a future minor release which conflicts with any override, breaking without warning.

For instance, given a component `o-example-component` with the following code:

```html
<!-- Component HTML (o-example-component) -->
<div class="o-example-component">
	<div class="o-example-component__content">
		Some text and <a href="#">a link</a> in the example component.
	</div>
</div>
```

```css
/* Component CSS (o-example-component),
styles the link text black in colour: */
.o-example-component a {
	color: black;
}
```

You could include the component CSS in your project and customise the link colour by adding your own CSS afterward:

```css
/* Your Project CSS:
/* Override "o-example-component" links
/* to be hotpink in colour: */
.o-example-component a {
	color: hotpink;
}
```

This would make the link of `o-example-component` a hotpink colour in your project. However in a future, potentially minor, release of `o-example-component` the component's CSS could change and visually break your project.

In the below example the component's [CSS selector increases in specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) so the overrides no longer apply:

```css
/* Component CSS (o-example-component),
styles the link text black in colour: */
.o-example-component .o-example-component__content a {
	color: black;
}
```

```css
/* Your Project CSS:
Override no longer applies as the component's
CSS selector is more specific. */
.o-example-component a {
	color: hotpink; /* Does nothing now. */
}
```

To ensure its overrides always apply a project could use overrides with a very high specificity, e.g. with the `!important` keyword, but there are further problems with this approach.

Using a high specificity to override styles may still visually break if the context around those overrides change. For example if the component introduces a hotpink background the project's links would become invisible:

```css
/* Component CSS (o-example-component),
styles the link text black in colour: */
.o-example-component .o-example-component__content a {
	color: black;
	background-color: hotpink; /* This is new. */
}
```

```css
/* Your Project CSS:
Override no longer applies as the component's
CSS selector is more specific. */
.o-example-component a {
	/* Still applies, now there is a hotpink foreground
    on a hotpink background, invisible links 😱 */
	color: hotpink !important;
}
```

## Summary

The core Origami team, along with the design team, can help identify any existing styles which could be reused, or, help update components to support your project without customisation — so your design is documented, demoed, and more teams can benefit from your work 🎉

When customisation does make sense use a component's documented customisation options. Avoid CSS overrides as these are unsupported and likely to break.

If you have any questions about customising components, or feature requests, ask them in the <a href="https://financialtimes.slack.com/messages/origami-support">#origami-support</a> Slack channel, the core Origami team are here to help 😊
