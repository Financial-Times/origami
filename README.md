# Still to do:
- Rename, this component is a services it's something else
- Fix the drawer, it's hacked in, it should be properly inlcuded from o-header
- Silent mode
- Themes (tools/services)
- check it works with the build service
- no-js
- README



# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services)

This header is for tools and services built by the Financial Times. If you would like to contribute, please read our [contributing guide]

## Index
- [Design](#design)
- [Quick start](#quick-start)
- [Migration guide](#migration-guide)
- [Trouble shooting](#trouble-shooting)
- [Licence](#licence)

## Design
`o-header-services` is a very simple responsive header. It has support for up to three levels of navigation making it appropriate for anything from a single page application to a multi-layer application.


## Quick start

### Very simple
The simplest header, appropriate for single page applications with no navigation is available with the following code:

```
<header id='o-header-services' class='o-header-services' data-o-component='o-header'>
  <div class='o-header-services__top o-header-services__container'>
    <div class='o-header-services__ftlogo'></div>
    <div class='o-header-services__title'>
      <h1 class='o-header-services__product-name'>
        Tool or Service name
      </h1>
      <span class='o-header-subrand__product-tagline'>
        Tagline to explain the product here
      </span>
    </div>
  </div>
</div>
```

### Related links and the drawer

o-header-services supports related content (eg Sign in or licence numbers). At large screen widths these appear to the far right of the header. At smaller screens these collapse down to a `drawer` which is behind a hamburger menu.

#### Core experience of the drawer
Small screen users should still be able to access the contents of the drawer even if their browser doesn't cut the mustard or the JavaScript has failed to load. In this case we recommend you have the contents of the drawer at the bottom of the page in a footer that is only visible if the body has a `.core` class. In core experience the hamburger menu links to an anchor at the bottom of the page.

To add support for related content, add the following to your markup:

```diff
<header id='o-header-services' class='o-header-services' data-o-component='o-header'>
  <div class='o-header-services__top o-header-services__container'>
+   <div class='o-header-services__hamburger'>
+    <a class='o-header-services__hamburger-link' href="#o-header-drawer"  aria-controls="o-header-drawer"></a>
+   </div>
    <div class='o-header-services__ftlogo'></div>
    <div class='o-header-services__title'>
      <h1 class='o-header-services__product-name'>
        Tool or Service name
      </h1>
      <span class='o-header-subrand__product-tagline'>
        Tagline to explain the product here
      </span>
    </div>
+    <div class='o-header-services__related-content'>
+      <a href='#'>XXXX</a>
+      <a href='#'>Sign in</a>
+    </div>
  </div>
</div>
<!-- Drawer design/html tbc from sue -->
```

Related content also needs some JavaScript to operate the drawer. If you are using the Build Service this will just work. If you are using a manual build process you should have the following somewhere in your code ([what's this?](http://origami.ft.com/docs/developer-guide/modules/initialising-modules/)):

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
<header id='o-header-services' class='o-header-services' data-o-component='o-header'>
  <div class='o-header-services__top o-header-services__container'>
    <div class='o-header-services__hamburger'>
      <a class='o-header-services__hamburger-link' href="#o-header-drawer"  aria-controls="o-header-drawer"></a>
    </div>
    <div class='o-header-services__ftlogo'></div>
    <div class='o-header-services__title'>
      <h1 class='o-header-services__product-name'>
        Tool or Service name
      </h1>
      <span class='o-header-subrand__product-tagline'>
        Tagline to explain the product here
      </span>
    </div>
  </div>
</div>
+<nav class='o-header-services__primary-nav'>
+ <div class='o-header-services__container'>
+   <ul class='o-header-services__nav-list'>
+     <li class='o-header-services__nav-item o-header-services__nav-item--selected'>
+       <a href='#'>
+         Nav item title
+       </a>
+      </li>
+      <!-- more nav items -->
+    </ul>
+  </div>
+</nav>
<!-- Drawer code as above -->
<!-- those nav items again -->
```

## Migration guide
## Trouble shooting
### Contact info
## Licence
