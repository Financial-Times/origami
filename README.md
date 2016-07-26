# o-header-subbrand [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-subbrand)

This header is for tools and services built by the Financial Times. If you would like to contribute, please read our [contributing guide]

## Index
- [Design](#design)
- [Quick start](#quick-start)
- [Migration guide](#migration-guide)
- [Trouble shooting](#trouble-shooting)
- [Licence](#licence)

## Design
`o-header-subbrand` is a very simple responsive header. It has support for up to three levels of navigation making it appropriate for anything from a single page application to a multi-layer application.


## Quick start

### Very simple
The simplest header, appropriate for single page applications with no navigation is available with the following code:

```
<header id='o-header-subbrand' class='o-header-subbrand' data-o-component='o-header'>
  <div class='o-header-subbrand__top o-header-subbrand__container'>
    <div class='o-header-subbrand__ftlogo'></div>
    <div class='o-header-subbrand__title'>
      <h1 class='o-header-subbrand__product-name'>
        Tool or Service name
      </h1>
      <span class='o-header-subrand__product-tagline'>
        Tagline to explain the product here
      </span>
    </div>
  </div>
</div>
```

### Related links
If your application needs related links on the right on desktop and in a hamburger at smaller screen sizes, add the following:
```
<header id='o-header-subbrand' class='o-header-subbrand' data-o-component='o-header'>
  <div class='o-header-subbrand__top o-header-subbrand__container'>
    <div class='o-header-subbrand__ftlogo'></div>
    <div class='o-header-subbrand__title'>
      <h1 class='o-header-subbrand__product-name'>
        Tool or Service name
      </h1>
      <span class='o-header-subrand__product-tagline'>
        Tagline to explain the product here
      </span>
    </div>
  </div>
</div>
```

## Migration guide
## Trouble shooting
### Contact info
## Licence
