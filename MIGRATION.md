## Migration Guide

### Migrating from v3 to v4

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Migrating from v2 to v3

This major is an overhaul of the internal structure of `o-message`.
It removes layout modifiers. State modifiers stay the same.

```diff
-o-message--alert-bleed
-o-message--alert-inner
-o-message--notice-bleed
-o-message--notice-inner
+o-message--inner
```

All oMessage mixins have been made private. The option to add custom classnames has been removed. And the main Sass mixin has been changed to accept only one argument, namely `$opts`:
```diff
-@include oMessage($class: 'my message', $types: ('alert-inner'), $status: ('error'))
+@include oMessage($opts: (
+	'types': ('alert'),
+	'states': ('error'),
+	'layout': ('inner')
+)
```

All colour use cases have been removed from the palette in favour of branding-specific colours.
```diff
-black-crimson-12.5
-paper-crimson-90
-black-jade-43
-paper-jade-80
-lemon-white-60
```

The JS for `o-message` now requires the `type` and `state` to be supplied in the options object.

### Migrating from v1 to v2

This major includes a change in markup and a new type of message, namely the 'notice' message.
The following changes have been made to the markup:
```diff
<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
-			<p class="o-message__highlight">Something went wrong!
+			<p class="o-message__content-main">
+				<span class="o-message__content-highlight">Something went wrong!</span>
-				<span class="o-message__detail">The quick brown fox did not jump over the lazy dogs.</span>
+				<span class="o-message__content-detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
+			<p class="o-message__additional-info">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>
-			<p class="o-message__content-additional">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-message__actions">
-				<a href="#" class="o-message__action--primary">Button</a>
+				<a href="#" class="o-message__actions__primary">Button</a>
-				<a href="#" class="o-message__action--secondary">Text link</a>
+				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

And these mixins have been replaced with placeholders:

```diff
- oMessageAlertContentMain
+ %o-message-alert-notice-content-main

- oMessageAlertInnerContainer
+ %o-message-inner-alert-notice-container

- oMessageAlertInnerContent
+ %o-message-alert-notice-content-main
```
