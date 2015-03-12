# Footer module [![Build Status](https://travis-ci.org/Financial-Times/o-footer.svg?branch=master)](https://travis-ci.org/Financial-Times/o-footer)

Origami module for the responsive FT page footer.

## Data

For convenience a JSON file with an example of footer links has been provided (`footer.json`).  It's anticipated that in a future version of the footer, this data will be the canonical footer content that should appear in most uses of the footer.  For the moment, it is just sample data.

## Browser support

Tested and working on:

|  Browsers  |           |
|:----------:|:---------:|
|   Chrome   |    35+    |
|   Firefox  |    20+    |
|   Safari   |    7+     |
|   IE       |    8+     |

## Upgrading from 2.x.x
### 1. Renaming the module

Rename all instances of `o-ft-footer` into `o-footer`.

### 2. Markup changes

1. Replace `o-ft-footer__col--wide` with `o-footer__col--full-width`
2. Columns:

	```diff
		<div class="o-footer__row">
	+		<div class="o-footer__col">
				…
	+		</div>
		</div>
	```

3. Make sure `o-footer__col--full-width` classes are applied with `o-footer__col` (since in v2 it was tied to `o-ft-footer__row` instead)

### 3. Font settings

In the v2.x.x of o-footer, the module loaded webfonts itself and was setting its own font-family.

The footer now inherits the `font-family` set in your application and doesn't embed web fonts anymore.

Solution: products must load webfonts themselves (tipically, with [o-fonts](https://github.com/Financial-Times/o-fonts)).

```html
<!-- Load web fonts with @font-face declarations  -->
<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-fonts@^1" />

<!-- Set the font family on the whole document -->
<style>
	html {
		font-family: BentonSans, sans-serif;
	}
</style>
```
