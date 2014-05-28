# Header [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=version2)](https://travis-ci.org/Financial-Times/o-ft-header)

Responsive FT page header.

## Element containers

The header consists of the following content containers, which can container _header content_:

* Logo
* Primary: Left
* Primary: Centre
* Primary: Right
* Secondary

Whilst it is possible that all optional containers may be used at once, it is unlikely to be desirable. Products should exercise restraint in what they put in them.

## Branding

By default the _Secondary_ row has a transparent background, but a brand background-color can be set.

### Primary row

#### Logo

Required.

Example content: One or more brand image (e.g. FT square logo + Alphaville logo).

#### Primary Left

Optional.

Example content: MastheadTitle or product name.

#### Primary Centre

Example content: Navigation (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

#### Primary Right

Optional.

Example content: Tools (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

#### Secondary

Optional.

Example content: Breadcrumb, Navigation (using [o-prioritised-content-filter](https://github.com/Financial-Times/o-prioritised-content-filter)).

### Secondary Bar

The Secondary Bar has a background colour that extends the full width of the page. It is always be visible, even if there is no _Subtitle_ or _Navigation_, because a _More Menu_ may be required.

## JavaScript

### Events

The following events will be dispatched on the __o-header__ root element:

* `oHeader.ready` Header has initialised

