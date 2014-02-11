# Dialog <small>o-dialog</small> [![Build Status](https://travis-ci.org/Financial-Times/o-dialog.png?branch=master)](https://travis-ci.org/Financial-Times/o-dialog)

Configurable custom dialog box that can be used to show modal windows. The dialogs can also be switched to display differently on small screens.

## Installation

Run the following in your project's root directory
   
    bower install o-dialog=https://github.com/Financial-Times/o-dialog.git

(If your project doesn't already contain a bower.json file you will need to create one first with the content `{"name": "your-project-name"}`).

Then add `@import "o-dialog/main"` to your sass stylesheets and use `require('o-dialog')` in your javascript.

## Usage
o-dialog can be used in two main ways

* Direct calls to the `o-dialog#trigger(options, [el])` method, where options is as documented below and el is an optional 'trigger element' to which the dialog will be associated
* Setting the property `data-o-dialog__trigger` on an element to be a JSON of options. When clicked `o-dialog#trigger` will be called with both this JSON and the element passed in

Additionally, the dialog can be closed by

* Calling `o-dialog#close()`
* Firing the custom jQuery event `close.o-dialog` on any DOM element (though the listener is attached to `document` so `$(document).trigger('close.o-dialog')` will be most efficient)

### Styling
By default o-dialog includes only those styles needed to correctly position itself. The exact look and feel should be completely customisable using your own stylesheets. There are however a few features/limitations to bear in mind

* Padding on the outer `o-dialog` element is used to set buffers between the dialog's content and the edge of the window e.g setting `.o-dialog{ padding: 100px}` will mean the dialog will switch to full screen mode when the content gets within 100px of the window edge.
* A number of classes serve special purposes. You can either `@extend` these in your sass or use directly in your html, but if `@extending` in sass you will need to set some properties on the dialog's configuration so that the elements will be retrieved by the javascript.
	* `o-dialog__heading` - should be used to wrap any content which must always appear at the top of the dialog i.e. outside of any scrollable area
	* `o-dialog__body` - where `o-dialog__heading` is used, `o-dialog__body` should be used to wrap the remaining content. It *must not* be used when a heading isn't present  - o-dialog will manually add the class to the content's outer wrapper when a heading isn't present.
* CSS transitions can be used when hiding or showing content. As long as they are applied to one of the outer elements (`o-dialog`, `o-dialog__overlay` or `o-dialog__content`) the js shoudl wait for the transition to end befoer proceeding to alter the DOM.

#### Default FT Styles
Styles for the default FT branded dialogs are included in the module but not output by default (unless requesting the module via the build service). To turn on these styles set `$o-dialog-is-silent: false`. Alternatively `@extend` any of the following placeholder classes to apply the styles to selectors of your choice:

* `%o-dialog--modal__content`
* `%o-dialog__close`
* `%o-dialog__heading`
* `%o-dialog__body`

Note, that if using the extend method you will also need to include The Benton Sans Lighter font in your product as follows:

	@include oFontsInclude(BentonSans, lighter);

### Configuration

The `options` object takes the following properties. All are optional, with the exception of `src`. By default the dialog will behave similarly to a native dialog.

* `srcType: 'selector'` - Specifies the method to use to retrieve content to insert into the dialog:
	* `url` - fetch the content from the url `options.src` *(not implemented)*
	* `selector` - clone the first html element matching the selector `options.src` (if the element is a script tag it's assumed this is a template and the content is cloned, discarding the outer script tag)
	* `string` - use the string `options.src` directly as the content 
	* `template`  - retrieve and render the mustache template `options.src` *(not implemented)*
* `src: ''` - String specifying where to retrieve content to place in the dialog. If `srcType` is not specified o-dialog will try and calculate which `srcType` to use as follows:
	* If `options.src` is an obvious url (matching `/^(https?\:\/)?\//`) sets `options.srcType` to `url`
	* If `options.src` wen treated as a selector matches some element, sets `options.srcType` to `selector`
	* Otherwise sets `options.srcType` to `string`
* `outerClasses: ''` - Additional classes to put on the dialog's outer element
* `innerClasses: ''` - Additional classes to put on the dialog's inner (content) element
* `preset: 'modal'` - Name of the configruration preset to use
* `isDismissable: true` - Whether or not the user can dismiss the dialog via standard actions (esc key, clicking away from the dialog or clicking a close button)
* `isAnchoredToTrigger: false` - Whether or not the dialog shoul be positioned relative to the element which triggered its appearance *(experimental)*
* `verticalAnchorSide: null` - Whether to anchor to the top or bottom of the trigger *(not implemented)*
* `horizontalAnchorSide: null` - Whether to anchor to the right or left of the trigger *(not implemented)*
* `headingSelector: '.o-dialog__heading'` - Selector that identifies the dialog's heading content (see notes above on styling)
* `bodySelector: '.o-dialog__body'` - Selector that identifies the dialog's body content (see notes above on styling)
* `hasHeading: false` - Whether or not the content has a heading (this shodul not be set manually - it is set programmatically following analysis of the properties above and the content being injected)
* `hasOverlay: false` - Whether or not the dialog should sit on top of a greyed out overlay
* `hasCloseButton: false` - Whether or not the overlay shoudl have a close button
* `isCenteredVertically: true` - Whether or not the dialog is centered horizontally on the screen
* `isCenteredHorizontally: true` - Whether or not the dialog is centered horizontally on the screen
* `snapsToFullHeight: true` - Whether or not the dialog will intelligently switch to occupying the full height of the screen with scroll bars at small screen sizes
* `snapsToFullWidth: true` - Whether or not the dialog will intelligently switch to occupying the full width of the screen with scroll bars at small screen sizes

#### Events
The following event listeners can also be set on the options object.


* `onFail` - Called when a dialog fails to initialise. The reason for the failure will be available in `dialog.errors` *(not implemented)*
* `onTrigger` - Called when a request to open a dialog is fired if initialisation succeeds
* `onBeforeRender` - Called when a dialog's content is constructed but not yet added to the DOM
* `onAfterRender` - Called when a dialog's content has been added to the DOM
* `onBeforeResize` - Called when a dialog begins to respond to a window resize event
* `onAfterResize` - Called after a dialog finishes responding to a window resize event
* `onBeforeClose` - Called when a request to close a dialog is fired
* `onAfterClose` - Called after a dialog has been successfully closed and removed from the DOM

Each event can be set to one of the following

* A function
* The name of a function available in the DOM e.g `ft.clearCookies` retrieves the function `window.ft.clearCookies`
* The name of a method of a commonjs module e.g. `o-ft-signin#setRedirectUrl`
* The preceding two approaches can be given the suffix `:bound` to bind the function to the object it is a method of

When the event is fired the function is passed the current `dialog` object as a parameter

### Presets
In addition to the above options, o-dialog has a number of configuration presets available, which set a number of configuration properties at once (but which can then be overridden by manually setting other options)

#### Modal (preset name: `modal`)

```javascript
{
	hasOverlay: true,
	hasCloseButton: true,
    isDismissable: true,
    isAnchoredToTrigger: false,
    isCenteredVertically: true,
    isCenteredHorizontally: true,
    snapsToFullHeight: true,
    snapsToFullWidth: true
}
```

#### Dropdown & dropup (preset names: `dropdown`, `dropup`) *(experimental)*
```javascript
{
    isDismissable: true,
    isAnchoredToTrigger: true,
    verticalAnchorSide: 'bottom', // or ``top`` for dropups
    hasOverlay: false,
    hasHeading: false,
    hasCloseButton: false,
    isCenteredVertically: false,
    isCenteredHorizontally: false,
    snapsToFullHeight: false,
    snapsToFullWidth: true
}
```
#### Defining your own presets

Use `o-dialog#addpreset(name, obj)` to define your own preset configurations, which can then be referenced via the `preset` property of any dialog's config.

## Examples

1. Trigger for a modal dialog with no close button and content from a url
	
		<a data-o-dialog__trigger="{'preset':'modal','hasCloseButton':false,'src':'http://same.domain/faq.html'}">dialog</a>

1. Trigger for a dropup dialog with a close button and content from a hidden div in the page
	
		<a data-o-dialog__trigger="{'preset':'dropup','hasCloseButton':true,'src':'.hidden-dialog-content'}">dialog</a>

## TODO

* ability to store templates and reference by name
* ability to draw content from sources other than the DOM
* Behaviour of dropdowns at small screen sizes
* Configurability of where a dropdown is anchored to