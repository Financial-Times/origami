---
title: JavaScript Specification
description: An overview of how the Origami team writes JavaScript.
permalink: /spec/v1/components/javascript/

# Redirect from legacy URLs
redirect_from:
  - /docs/syntax/js/
  - /spec/v1/javascript/

# Navigation config
nav_display: false

# Collection listing config
collection_listing_display: false
---

# {{page.title}}

## Syntax Convention

JavaScript **must** be linted with <a href="http://www.eslint.org/" class="o-typography-link--external">ESLint</a>.

Developers **should** stick to the <a href="https://github.com/Financial-Times/origami-build-tools/blob/master/config/.eslintrc.js" class="o-typography-link--external">Origami eslintrc config</a>, since this represents a common standard across FT teams. Custom linting **may** be defined at the component level with a `.eslintrc` file, or at the file level with a `/*eslint ... */` comment.

In addition, Object properties **must not** be named after reserved words in the JavaScript language.

## Definition

An Origami component **must** be a JavaScript class which **should** be named for the component, with the `o-` prefix dropped.

i.e. a component named `o-dear` **should** be defined in a class named `Dear`.

## Encapsulation

- Components **should not** add to the global scope.
- Components **should not** assume the existence of globals except those defined as part of ECMAScript 5 and the DOM features listed in the `browserFeatures.required` section of `origami.json`.
- Components **must not** modify the DOM outside of [owned DOM](/spec/v1/components/markup/#owned-dom) areas, except:
	- To add [CSS feature flags](/v1/sass/#feature-flags) to the `documentElement`.
	- Where passed a DOM element explicitly by the host application using the component.

## Initialisation

Origami components **must** do as little as possible as the page parses. Instead they **should** provide a static `init` method which constructs instances of the component. The `init` method **should** run when the `o.DOMContentLoaded` or `o.load` events are fired.

The `init` method **must** be callable with no arguments. It **may** accept arguments, but if it does, all arguments **must** be optional (see <a href="https://github.com/Financial-Times/ft-origami/pull/228" class="o-typography-link--external">issue 228</a>).

If the `init` method (or the components constructor) takes an element argument to identifying its owned DOM, it **must** accept the following types:

- An <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement" class="o-typography-link--external">`HTMLElement`</a> object
- A string containing a valid `querySelector` expression, e.g. `.main-content > [data-o-component~='o-share']`
- Nothing (or any falsey value), which **should** be interpreted as `document.body`

If the given element does not have the components [data attribute](#data-attributes-on-owned-dom) `data-o-component`, the `init` function **may** traverse the subtree looking for elements which do. The `init` function **may** create multiple instances and return them in an array. Where passed to a constructor, however, the component **must** only create one instance and return it. If no [owned DOM](#initialisation) is found, the component **must not** throw an error.

## Configuration

If a component's JavaScript requires configuration, the following methods of passing that configuration **must** be supported.

### Data attributes on owned DOM

The component **must** be configurable using data attributes on the component's root HTML element. Data attributes **must** be named `data-{componentname}-{key}`, e.g. `data-o-share-id`.

Developers **should** avoid the temptation to name data attributes based on the same naming conventions as BEM in CSS.  Data attributes are not subject to the same semantics as classes so BEM is not a great fit.

### Global declarative configuration block

Where it is possible for multiple instances of a component to exist on a page and for the same configuration to apply to all of them, or where a component has no markup (e.g. `o-tracking` or `o-errors`), the component **must** support declarative configuration via JSON data placed within a `<script>` block with a `type='application/json'` and a data attribute in the component's namespace with the key 'config' and no value, ie. `data-{componentname}-config`. For example:

	<script data-o-errors-config type='application/json'>
	    {
	        "sentryEndpoint": "https://....",
	        "application": {
	            "version": "1.2.3",
	            "name": "Foo Application"
	        }
	    }
	</script>

Components **must** parse any such configuration using `JSON.parse` and only in response to an event (such as `o.DOMContentLoaded`) or function call.  Components **must not** expect more than one global declarative configuration block in their namespace to be present on the page.

Any configuration option expecting a `function` **must** not be defined in a declarative configuration block and **must** be optional, providing default behaviour where the imperative configuration using `init()` is absent.  If a configuration key is present in the declarative configuration block that expects a `function`, an `Error` **should** be thrown to warn the developer of the invalid configuration.

Global declarative configuration is not useful in situations where a developer chooses to call a component's static `init` method directly, since the configuration could be given as an argument. Component's **should** support that, and consider throwing an error if declarative configuration exists when `init` is called.

## Destruction

Components **should** provide a static `destroy` method that reverts the component to a pre-`init` state. This is not necessary for large components like `o-header` where it doesn't make sense for it to be reverted. Traces which can not be garbage collected **should not** remain after the `destroy` method is called.

## Error Handling

Components **should** use <a href="http://registry.origami.ft.com/components/o-errors" class="o-typography-link--external">o-errors</a> to report runtime JavaScript errors and exceptions, as well as log notices and other significant events, using the `oErrors.log` custom event.

Where components do not explicitly convert exceptions into `o-errors` events, any unhandled exceptions will still be caught and reported if `o-errors` has been initalised on the page. However, the report will lack critical information about the DOM elements to which the error relates.

## Feature Stability And Polyfills

Components **must not** use JavaScript features that are not yet part of a finalised standard, or which are proprietary, even if polyfills for them are available. JavaScript in components **may** use ES6 syntax, which product developers are expected to transpile to be ES5 if required.

If you want to use a modern browser feature, you **must**:
- Declare it as a requirement in your Origami manifest `origami.json`; or
- Declare it as optional, test for it, and if not present, skip that functionality; or
- Include code (either your own or a dependency that provides the feature, without adding it outside of your [component's scope](#encapsulation)).

<aside>We recommend product developers use the <a href="http://polyfill.io/" class="o-typography-link--external">Polyfill Service</a> to support required features in older browsers.</aside>

## Integrating With A Component

Components may wish to communicate (or make communication possible) with other components of the same type, other components of different types, or non-component code in the host page. This should be accomplished with API methods (when invoking known dependencies) and DOM events (in all other cases).

### API

Components **may** expose an external API via an ESModule `export`. Components **must not** rely on the existence of any APIs other than those that are explicitly required dependencies.

### Events

Components **may** emit events to allow loose coupling with other components and the host page. In doing so, the component **must**:

- Use only browser-native DOM events with bubbling enabled.
- Where the component wishes to attach custom data to events, use the <a href="https://developer.mozilla.org/en/docs/Web/API/CustomEvent" class="o-typography-link--external">CustomEvent</a> API, and pass an object in the `details` property.
- Trigger events only on elements within the component's owned DOM, or otherwise only on the body element.
- Namespace event names with the name of the component in camel-case, separated from the event name with a dot, e.g. `oComponentName.eventName`
- Name the event using the present tense, e.g. `dialogClose`, not `dialogClosed`, and using camel-case.

A valid example of a component emitting a DOM event is shown below:

```js
this.dispatchEvent(new CustomEvent('oExampleComponent.exampleEvent', {
    detail: {...},
    bubbles: true
}));
```

Components **may** bind to events emitted by themselves, other components, the host page or the browser. In doing so, the component:

* **Must not** stop the propagation chain except for events created by itself.
* **Should** bind only to the body element and use <a href="https://github.com/Financial-Times/ftdomdelegate" class="o-typography-link--external">event delegation</a> to ensure that handlers do not need to be bound every time elements are created. If not bound to the body element, handlers **must** be bound to elements within the components's owned DOM.

Components **should** handle events during the <a href="http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing" class="o-typography-link--external">bubbling phase</a>, not the capturing phase (unless the event has no bubbling phase)

If a module wishes to bind to the `DOMContentLoaded` or `load` browser events, it **must** prefix the event name with `o.`, and **must** expose the function that it binds to the event via its external API, eg:

```js
document.addEventListener('o.DOMContentLoaded', init);
export init;
```

### Foreign events

Components **may** emit events defined by other components, using the other component's namespace, but **must** only do so if:

- The foreign component is not a direct dependency; and
- There are no callbacks in the event `details` payload; and
- The foreign component has invited public use of the event in its documentation and has provided a comprehensive spec for the `details` payload.

For the most part, use of this technique creates too much 'magic' behaviour that would not be expected by a product developer and **should not** be used. Except in some cases e.g. analytics, where the approach may be a reasonable compromise to enable loose coupling.

## Data Storage

Components that store data on the client via user-agent APIs **must** encapsulate all the logic required to get and set that data and must remain compatible with the format of data that they store, unless the major version number of the component changes. In that case the component **must not** invalidate any existing data, and **should** provide advice in docs on migrating user data from previous versions.

## Viewport Events

For viewport events that may fire several times in quick succession (`scroll`, `resize` and `orientationchange`) it's good practice to throttle listeners to these. <a href="https://registry.origami.ft.com/components/o-viewport">o-viewport</a> provides pre-throttled abstractions of these events and **should** be used by components that need to listen for changes to the viewport.

## Managing Layers (z-axis)

A component e.g. `o-overlay`, may need to display some or all of its owned DOM outside of the normal content flow so that it obscures content outside its owned DOM. The component **must** bind to and fire `o-layers` events on its closest parent with the class `o-layers__context`, or `body` if no such element exists. The component **must** use the custom events defined in `o-layers` to:

- Broadcast changes in its own state.
- Listen for events fired in its `o-layers__context` by other components that make use of the z-axis.

Any component **may** use the `o-layers__context` class to define a new region of the DOM that can handle new layers independently of other regions of the DOM (e.g. two graphs handling their own tooltips independently, a date-picker appearing within a modal dialog). To learn more <a href="https://github.com/Financial-Times/o-layers/" class="o-typography-link--external">see o-layers</a>.
