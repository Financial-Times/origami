# Still to do:
- Style the drawer
- check it works with the build service
- README



# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services)

This header is for tools and services built by the Financial Times. If you would like to contribute, please read our [contributing guide](contributing.md)

## Index
- [Design](#design)
- [Quick start](#quick-start)
- [Migration guide](#migration-guide)
- [Trouble shooting](#trouble-shooting)
- [License](#license)

## Design
`o-header-services` is a very simple responsive header. It has support for up to three levels of navigation making it appropriate for anything from a single page application to a multi-layer application.

It has themes for b2b and b2c products. If you're building something and need a theme, [please raise an issue](../../issues).

The header has the following features:

**Required**
- The FT logo
- The product title. This should be present and the same on all of your pages

**Optional**
- A product tagline. If used, this should be a concise description of your product. The tagline is only visible at the widest screen size
- At wide screen sizes, the right of the nav may be used for content like a "Sign in" link. At narrower screen widths this content goes behind a hamburger menu on the right of the FT logo
- If there is a "Sign in" option in the related content it should always appear on the far right. For consistency with other FT products, use "Sign in" over "Log in" or "Login"
- Primary navigation
- Secondary navigation (TODO)


## Quick start

### Very simple
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
There are themes available for b2b products and b2c products. If you want a theme but aren't building a b2b or b2c product please [please raise an issue](../../issues).

To add a theme to the header, add the appropriate class to a wrapping element. For example, for b2b that would be:

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

### Primary navigation
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

## Migration guide
## Trouble shooting
### Contact info
Please raise an issue, or Internal FT users can contact us via #ft-origami in Slack.

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
