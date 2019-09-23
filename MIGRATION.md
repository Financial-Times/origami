## Migration guide

### Migrating from v5 to v6

### Migrating from v4 to v5

The jump from 4 to 5 introduces an entirely new set of icons. Using these icons should be a lot easier as they have a uniform amount of white-space around them, so you don't need to individually size icons to work in your application harmoniously.

That said, because the icons have all changed, you will need to adjust the sizing and alignment of them in your application as things that aligned before may be out of whack now.


#### Deprecated icons
The new icon set has deprecated some icons, added some, and renamed some others. For a full list of these icons please see the [fticon README](http://github.com/financial-times/fticon).

#### Logos and Mastheads
The logos and masthead that were deprecated in version 4 have now moved completely. Please use the [Logo Images set](http://github.com/financial-times/logo-images) via the image service for these.

### Migrating from v3 to v4

#### Important changes

* `o-ft-icons` has been renamed to `o-icons`
* Icon font has been removed, now it's SVGs all the way. This changes the behaviour for silent mode turned off users which includes Build Service users
* Some icons have been removed, and as mentioned above, others have been deprecated. The list of deleted icons is:
	- brand-always-learning
	- brand-fast-ft
	- brand-fast
	- brand-myft
	- brand-pearson
	- eye
	- font-size
	- gift
	- section-columnists
	- section-house-and-home
	- section-leader-and-letters
	- section-lex
	- section-markets-data
	- section-money
	- section-uk

#### Markup changes

CSS now doesn't add any pseudoclasses, so all the styling is applied directly on the element

#### CSS Changes

* Class prefixes need to be renamed from `o-ft-icons` to `o-icons`

	e.g.

	`o-ft-icons-icon` to `o-icons-icon`
	`o-ft-icons-icon--arrow-down` to `o-icons-icon--arrow-down`

* As it's an SVG instead of a font, size is now set using the CSS properties `width` and `height`

#### Sass Changes

* All icon font related mixins have been removed
* `oFtIconsBaseIconStyles` has been renamed to `oIconsBaseStyles`
* `oFtIconsGetSvg` has been renamed to `oIconsGetIcon`

#### Silent mode off Changes

When using the [Build Service](https://origami-build.ft.com), you're using this module with silent mode turned off. Due to the removal of the icon font, there are a couple things to keep in mind in the new implementation:

* There is a PNG fallback, and when using the default CSS classes, the size of the image served is _128px_ so it can be resized down, but not up
* The colour of the icon served is _black_. This cannot be changed. If you need a custom colour (or even a custom size), [option 3](#3-manually-using-the-responsive-image-service) of the suggested ways of using this module is the way to go

