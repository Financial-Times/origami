# ft-concept-button

A special button used around ft.com when performing actions on concepts.

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `ft-concept-button`.

## Markup

## Concept pill

```html
<div
	class="ft-concept-button ft-concept-button--standard"
	data-o-component="ft-concept-button"
>
	<button aria-pressed="false" class="ft-concept-button__button">Movies</button>
</div>
```

### Follow button

```html
<div
	class="ft-concept-button ft-concept-button--follow ft-concept-button--standard"
	data-ft-concept-button-pressed-text="Signed up"
	data-ft-concept-button-unpressed-text="Sign up"
	data-ft-concept-button-aria-live-pressed-text="Now signed up"
	data-ft-concept-button-aria-live-unpressed-text="No longer signed up"
	data-o-component="ft-concept-button"
>
	<div class="ft-concept-button__announcement" aria-live="assertive"></div>
	<button aria-pressed="false" class="ft-concept-button__button">
		Sign up
	</button>
</div>
```

### FT follow button

This one has a little plus or a tick icon. You'd be advised to include the `data-ft-concept-button-aria-live-pressed-text` and `data-ft-concept-button-aria-live-unpressed-text` options so screenreader users are informed that a change has occurred.

```html
<div
	class="ft-concept-button ft-concept-button--follow ft-concept-button--standard"
	data-ft-concept-button-aria-live-pressed-text="Now following movies on my FT"
	data-ft-concept-button-aria-live-unpressed-text="No longer following movies on my FT"
	data-ft-concept-button-aria-label-pressed-text="Stop following movies on my FT"
	data-ft-concept-button-aria-label-unpressed-text="Follow movies on my FT"
	data-o-component="ft-concept-button"
>
	<div class="ft-concept-button__announcement" aria-live="assertive"></div>
	<button aria-pressed="false" type="submit" class="ft-concept-button__button">
		Movies
	</button>
</div>
```

## JavaScript

```js
import ConceptButton from '@financial-times/ft-concept-button';
```

### Options

The options accepted by the constructor are as follows:

`ariaPressedText` :: the text to announce to screenreaders when the button state changes to pressed
`ariaUnpressedText` :: the text to announce to screenreaders when the button state changes to unpressed
`ariaLabelText` :: the button aria abel to set when the button state changes to pressed
`ariaLabelText` :: the button aria label to set when the button state changes to unpressed
`pressedText` :: the text content of the button to set when the button state changes to pressed
`unpressedText` :: the text content of the button to set when the button state changes to unpressed

### State

You can set the pressed state (which will also update the labels and announce the new state to screenreaders) like this:

```js
conceptButton.isPressed = true;
```

You can check the pressed state by reading `conceptButton.isPressed`.

## React

Users with a React-compatible runtime aren't expected to load the Origami JavaScript at all, and are expected instead to take care of the labels and pressed state by themselves.

The provided `.tsx` template sets the button type to `submit`, so you can wrap a form around it and add any required business logic in the `onSubmit`.

You can attach a click handler to the button by passing an `onClick` function inside `extraButtonProps`.

The [stories](stories/concept-button.stories.tsx) should provide some guidance here.

### Props

```ts
export interface ConceptButtonProps {
	// button text
	label: string;
	// text to announce to screenreaders
	ariaLiveText?: string;
	// descriptive label for button
	ariaLabel?: string;
	// button theme
	theme?:
		| 'standard'
		| 'inverse'
		| 'opinion'
		| 'monochrome'
		| 'inverse-monochrome';
	// button type (the follow type has an icon)
	type?: 'concept' | 'follow';
	// whether the button is currently pressed
	pressed?: boolean;
	// for props that aren't appropriate in Origami
	extraButtonProps: any;
}
```

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
| ⚠ maintained |       2       |        N/A         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.3         |                          N/A                          |
