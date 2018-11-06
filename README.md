# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This header is for tools and services built by the Financial Times.

## Index
- [Design](#design)
- [Markup](#markup)
	- [Very simple header](#very-simple-header)
	- [Themes](#themes)
	- [Related links and the drawer](#related-links-and-the-drawer)
		- [Core experience of the drawer](#core-experience-of-the-drawer)
	- [Primary navigation](#primary-navigation)
	- [Secondary navigation](#secondary-navigation)
	- [Bleed header](#bleed-header)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [License](#license)

## Design
`o-header-services` is a responsive header. It has support for up to three levels of navigation making it appropriate for single page applications and multi-layer applications.

It has themes for B2B and B2C products under FT.com. If you're building something and need a new theme, [please raise an issue](../../issues).

The header has the following features:

**Required**
- A product logo. This will default to the FT logo, but is customisable through Sass mixins.
- The product title. This should be present and the same on all of your pages

**Optional**
- A product tagline. If used, this should be a concise description of your product. The tagline is only visible at the widest screen size
- At wide screen sizes, the right of the nav may be used for content like a "Sign in" link. At narrower screen widths this content goes behind a hamburger menu on the right of the FT logo
- If there is a "Sign in" option in the related content it should always appear on the far right. For consistency with other FT products, use "Sign in" over "Log in" or "Login"
- Primary navigation
- Secondary navigation


## Markup

### Very simple header
The simplest header, appropriate for single page applications with no navigation is available with the following code:

```
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top o-header-services__container'>
		<div class='o-header-services__ftlogo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href='/'>Tool or Service name</a></h1>
			<span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
		</div>
	</div>
</header>
```


### Themes
`o-header-services` offers theming for B2B or B2C products under FT.com. To add a theme to the header, add the appropriate class to a wrapping element. For example, for b2b that would be:

```diff
+<header class='o-header-services o-header-services--b2b' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top o-header-services__container'>
		<div class='o-header-services__ftlogo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href='/'>Tool or Service name</a></h1>
			<span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
		</div>
	</div>
</header>
```

### Related links and the drawer

o-header-services supports related content (eg Sign in or licence numbers). At large screen widths these appear to the far right of the header. At smaller screens these collapse down to a `drawer` which is behind a hamburger menu.

#### Core experience of the drawer

Small screen users should still be able to access the contents of the drawer even if their browser doesn't cut the mustard or the JavaScript has failed to load. In this case we recommend you have the contents of the drawer at the bottom of the page in a footer that is only visible if the body has a `.core` class. In core experience the hamburger menu links to an anchor at the bottom of the page.

To add support for related content, add the following to your markup:

```diff
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top'>
		<div class='o-header-services__container'>
+			<div class='o--if-js o-header-services__hamburger'>
+				<a class='o-header-services__hamburger-icon' href="#o-header-drawer"	aria-controls="o-header-drawer"><span class="o-header__visually-hidden">Menu</span></a>
+			</div>
			<div class='o-header-services__ftlogo'></div>
			<div class='o-header-services__title'>
				<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
			</div>
			<div class='o-header-services__related-content'>
				<a href='#'>XXXX</a>
				<a href='#'>Sign in</a>
			</div>
		</div>
	</div>
</header>
<!-- Drawer HTML from o-header which should include the links from related content. -->
```

Related content also needs some JavaScript to operate the drawer. If you are using the Build Service this will just work. If you're using a manual build process you should have the following somewhere in your code ([what's this?](http://origami.ft.com/docs/developer-guide/modules/initialising-modules/)):

```
document.addEventListener("DOMContentLoaded", function() {
	document.documentElement.className = document.documentElement.className.replace('core', 'enhanced');
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Primary navigation

If your application has more than one page you may want to add the primary navigation bar.
This requires the drawer code, as seen above, and the following addition:

```diff
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top'>
		<div class='o-header-services__container'>
			<div class='o--if-js o-header-services__hamburger'>
				<a class='o-header-services__hamburger-icon' href="#o-header-drawer"	aria-controls="o-header-drawer"><span class="o-header__visually-hidden">Menu</span></a>
			</div>
			<div class='o-header-services__ftlogo'></div>
			<div class='o-header-services__title'>
				<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
			</div>
			<div class='o-header-services__related-content'>
				<a href='#'>XXXX</a>
				<a href='#'>Sign in</a>
			</div>
		</div>
	</div>
</header>
+<nav class='o-header-services__primary-nav'>
+ <div class='o-header-services__container'>
+	 <ul class='o-header-services__nav-list'>
+		 <li class='o-header-services__nav-item o-header-services__nav-item--selected'>
+			 <a href='#'>
+				 Nav item title
+			 </a>
+			</li>
+			<!-- more nav items -->
+		</ul>
+	</div>
+</nav>
<!-- Drawer HTML as above this should include related content links (if any) and nav items-->
```

### Secondary navigation

If your application is more complicated still, you may want to use a secondary navigation.
The secondary nav allows for breadcrumbs for many addition levels of navigation.

To use the secondary navigation, use the primary navigation (with the drawer) and add the following code:

```diff
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top'>
		<div class='o-header-services__container'>
			<div class='o--if-js o-header-services__hamburger'>
				<a class='o-header-services__hamburger-icon' href="#o-header-drawer"	aria-controls="o-header-drawer"><span class="o-header__visually-hidden">Menu</span></a>
			</div>
			<div class='o-header-services__ftlogo'></div>
			<div class='o-header-services__title'>
				<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
			</div>
			<div class='o-header-services__related-content'>
				<a href='#'>XXXX</a>
				<a href='#'>Sign in</a>
			</div>
		</div>
	</div>
</header>
<nav class='o-header-services__primary-nav'>
 <div class='o-header-services__container'>
	 <ul class='o-header-services__nav-list'>
		 <li class='o-header-services__nav-item o-header-services__nav-item--selected'>
			 <a href='#'>
				 Nav item title
			 </a>
			</li>
			<!-- more nav items -->
		</ul>
	</div>
</nav>
<!-- note that these are o-header classes, because this component inherits directly from o-header and overrides a few styles -->
+<nav class="o-header__subnav" role="navigation" aria-label="Sub navigation" data-o-header-subnav>
+	<div class="o-header-services__container">
+		<div class="o-header__subnav-wrap-outside">
+			<div class="o-header__subnav-wrap-inside" data-o-header-subnav-wrapper>
+				<div class="o-header__subnav-content">
+					<ol class="o-header__subnav-list o-header__subnav-list--breadcrumb" aria-label="Breadcrumb">
+						<li class="o-header__subnav-item">
+							<a class="o-header__subnav-link" href="#">
+								ancestor section
+							</a>
+						</li>
+						<!-- other breadcrumb links -->
+					</ol>
+					<ul class="o-header__subnav-list o-header__subnav-list--children" aria-label="Subsections">
+						<li class="o-header__subnav-item">
+							<a class="o-header__subnav-link" href="{{href}}">
+								child page
+							</a>
+						</li>
+						<!-- More links to child pages -->
+					</ul>
+				</div>
+			</div>
+			<button class="o-header__subnav-button o-header__subnav-button--left" title="scroll left" aria-hidden="true" disabled></button>
+			<button class="o-header__subnav-button o-header__subnav-button--right" title="scroll right" aria-hidden="true" disabled></button>
+		</div>
+	</div>
+</nav>

<!-- Drawer HTML as above this should include related content links (if any) and nav items-->

```


### Bleed Header
If your application requires a bleed header, it will be necessary to replace all instances of `o-header-services__container` with `o-header-services__bleed-container`.
For example, in the case of using both primary and secondary navigation:

```diff
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top'>
-		<div class='o-header-services__container'>
+		<div class='o-header-services__bleed-container'>
			<div class='o--if-js o-header-services__hamburger'>
				<a class='o-header-services__hamburger-icon' href="#o-header-drawer"	aria-controls="o-header-drawer"><span class="o-header__visually-hidden">Menu</span></a>
			</div>
			<div class='o-header-services__ftlogo'></div>
			<div class='o-header-services__title'>
				<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
			</div>
			<div class='o-header-services__related-content'>
				<a href='#'>XXXX</a>
				<a href='#'>Sign in</a>
			</div>
		</div>
	</div>
</header>
<nav class='o-header-services__primary-nav'>
-	<div class='o-header-services__container'>
+	<div class='o-header-services__bleed-container'>
		<ul class='o-header-services__nav-list'>
			<li class='o-header-services__nav-item o-header-services__nav-item--selected'>
				<a href='#'>
					Nav item title
				</a>
			</li>
			<!-- more nav items -->
		</ul>
	</div>
</nav>
<!-- note that these are o-header classes, because this component inherits directly from o-header and overrides a few styles -->
<nav class="o-header__subnav" role="navigation" aria-label="Sub navigation" data-o-header-subnav>
-	<div class="o-header-services__container">
+	<div class="o-header-services__bleed-container">
		<div class="o-header__subnav-wrap-outside">
			<div class="o-header__subnav-wrap-inside" data-o-header-subnav-wrapper>
				<div class="o-header__subnav-content">
					<ol class="o-header__subnav-list o-header__subnav-list--breadcrumb" aria-label="Breadcrumb">
						<li class="o-header__subnav-item">
							<a class="o-header__subnav-link" href="#">
								ancestor section
							</a>
						</li>
						<!-- other breadcrumb links -->
					</ol>
					<ul class="o-header__subnav-list o-header__subnav-list--children" aria-label="Subsections">
						<li class="o-header__subnav-item">
							<a class="o-header__subnav-link" href="{{href}}">
								child page
							</a>
						</li>
						<!-- More links to child pages -->
					</ul>
				</div>
			</div>
			<button class="o-header__subnav-button o-header__subnav-button--left" title="scroll left" aria-hidden="true" disabled></button>
			<button class="o-header__subnav-button o-header__subnav-button--right" title="scroll right" aria-hidden="true" disabled></button>
		</div>
	</div>
</nav>

<!-- Drawer HTML as above this should include related content links (if any) and nav items-->
```

## Sass

As with all Origami components, o-header-services has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-header-services-is-silent : false;` in your Sass before you import the o-header-services Sass.

As previously mentioned, the logo in the header will default to the FT logo. Although it is customisable, that is currently only available through the use of mixins. Within your main Sass file, include the following, along with your products' logo, preferably as a png or an svg.

```sass
@import 'o-header-services/main';

@include oHeaderServices($class: 'my-product-header', $logo: 'my-product-logo');
```

## Migration guide

### Migrating from v1.x.x to v2.x.x

V2 bumps to the new major versions of o-header, o-colors, and o-typography. If you are using any of these components in your projects you will have bower conflicts that you need to resolve by upgrading those components too.
V2 includes some minor visual changes, but these shouldn't be breaking changes for projects that include them.

----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-header-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
