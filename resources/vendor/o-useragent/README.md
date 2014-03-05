# User agent targeting

This module provides a mechanism for marking SASS that exists to target issues in particular user agents and a javascript utility for working with vendor-prefixed properties.

## Installation

To include `o-useragent` in your module or product run

	bower install o-useragent=https://github.com/Financial-Times/o-useragent.git --save

To load the SASS, add the following to the top of your SASS stylesheet

	@import "o-useragent/main";

To load the JavaScript, require the module where required:

	var ua = require('o-useragent');

## User agent names

While the useragent module does not restrict the identifiers that are used, it only works when everyone uses the same ones.  A user agent identifer is made up of a family name, an optional major version, and an optional minor version.  The family names are:

* `chrome` Google Chrome on Windows, MacOS and Linux
* `ie` Microsoft Internet Explorer on Windows
* `ff` Mozilla Firefox on Windows, MacOS and Linux
* `opera` Opera on Windows, MacOS and Linux
* `safari` Apple Safari on Windows and MacOS
* `chromeandroid` Google Chrome on Android
* `iossafari` Apple Mobile Safari on iOS
* `androidbrowser` OS-integrated browser on Android
* `operamobile` Opera mobile on Android, Windows Phone, Windows, Meego, S60 
* `chromeios` Google Chrome on iOS
* `iemobile` Microsoft Internet Explorer on Windows Phone

## Usage for UA targeting

Use of the SASS targeting feature of this module comprises three parts: 

* providing styles that are targeted to a specified user agent (usually in a component)
* opting in or out of any special rules to target particular user agents (usually in a product)
* adding the appropriate UA-identifying classes to the `<html>` tag of the page (in the product)

### Targeting styles to a specific set of user agents

To target styles at a given user agent use the `oUseragentTarget($useragents[, $versions])` mixin. The mixin accepts two parameters:

 * `$useragents` - a space-separated list of useragents to target, each of which *may* end with a hyphenated version number
 * `$versions` - if `$useragents` specifies a single, unversioned useragent, multiple version numbers can be specified here

#### Examples

The following examples turn the background colour of `<h1>` elements red only in the targeted user agents

```scss
// IE7 and 8, plus all versions of Opera
@include oUseragentTarget(ie7 ie8 opera) {
	h1 { background-color: red }
}

// Firefox 3.2 and 3.3
@include oUseragentTarget(ff, 32 33) {
	h1 { background-color: red }
}
```


### Opting in or out of user agent targeting

When building a product, you may not want components to include CSS in your bundle that targets user agents that you don't intend to support, so you can set your preferences to optimise the size of the generated CSS.

#### Using the build service

If you are generating your style bundle from the build service, all useragent-targeting styles will be included, and will be attached to pre-defined class names based on the syntax `o-useragent-<familyname><majorversion>-<minorversion>`.

#### Using a local build process

If you are [building your product's origami styles locally](http://financial-times.github.io/ft-origami/docs/developer-guide/building-modules/) Sass will log to the console any specific useragent targeting that it encounters while building the bundle, and by default will not include any of the special targeted rules. To output useragent X you will need to carry out your own ua-sniffing for X and conditionally add a class of your choice, say `class-X`, to the `<html>` tag. Then in your sass:

```scss
.ie7 { @extend %o-useragent-ie7 !optional; }
.ie8 { @extend %o-useragent-ie8 !optional; }
.ios7 { @extend %o-useragent-iossafari7 !optional; }
```

### Adding the appropriate UA-identifying class to the HTML tag

To use UA-targeted styles, you should detect which user agent is in use, and add the appropriate class names to the `<html>` element.  If you got your CSS bundle via the build service, you need to add `o-useragent`-namespaced classes:

	<html class='o-useragent-ie o-useragent-ie9'>

Note that some UA-targeting might target all versions of IE, while others might target just IE9, so include both.

If you used a local build process, apply the classes to which you remapped the o-useragent placeholders:

	<html class='ie7'>

## Usage for Box-sizing polyfill

This module also contains a polyfill for Internet Explorer 7's lack of support for css `box-sizing`. To use it, include the `oUseragentIe7BoxSizing` mixin:

    .column {
		box-sizing: border-box;
		@include oUseragentIe7BoxSizing();
    }

## Usage for JavaScript vendor-prefixer

This module also provides a javascript utility, `o-useragent.prefixer` to retrieve a vendor-prefixed property if the browser doesn't yet support it unprefixed e.g. if given `transition-duration` in newer browsers it will return `transition-duration`, but will return `-webkit-transition-duration`, `-ms-transition-duration` etc... in older browsers that support the property but with a prefix. It can be used for either DOM or style properties as follows (NB: below 'correct' means the correct choice of unprefixed or vendor prefixed property as defined in the browser)

### Style properties

* `o-useragent.prefixer('transition-duration')`: returns the correct hyphenated css property name
* `o-useragent.prefixer('transitionDuration')`: returns the correct camel-cased el.style property name

### Dom properties

*Note - the following methods also support being passed hyphenated property names*

* `o-useragent.prefixer('applicationCache', window)`: returns the correct applicationCache object
* `o-useragent.prefixer('postMessage', window)`: returns the correct postMessage method bound to the window object
* `o-useragent.prefixer('matchesSelector', HTMLElement.prototype, document.body)`: returns the correct matchesSelector method bound to the document.body
* `o-useragent.prefixer('applicationCache', window, false)`: returns the correct *camel-cased* property name for the applicationCache object
