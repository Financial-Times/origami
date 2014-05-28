# Header [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=version2)](https://travis-ci.org/Financial-Times/o-ft-header)

Responsive FT page header.

## Element containers

The header consists of the following content containers:

* Logo
* Primary: Left
* Primary: Centre
* Primary: Right
* Secondary

Whilst it is possible that all optional containers may be used at once, it is unlikely to be desirable. Products should exercise restraint in what they put in them.

### Logo

Required.

Example content: One or more brand image (e.g. FT square logo + Alphaville logo).

### Primary Left

Optional.

Example content: _Masthead_ or _Title_.

### Primary Centre

Example content: _Navigation_ (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

### Primary Right

Optional.

Example content: _Tools_ (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

### Secondary

Optional.

Example content: _Breadcrumb_, _Navigation_ (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

## Branding

By default the _Secondary_ row has a transparent background, but a brand background-color can be set.

## JavaScript

### Events

The following events will be dispatched on the __o-header__ root element:

* `oHeader.ready` Header has initialised

