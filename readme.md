# Header [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=version2)](https://travis-ci.org/Financial-Times/o-ft-header)

Responsive FT page header.

## Element containers

The header consists of the following content containers:

* Logo
* Primary: Left
* Primary: Centre
* Primary: Right
* Secondary: Left
* Secondary: Right

Each content container can contain one of the following:

* Custom content (e.g) - brand-specific logo/title etc
* A title
* Navigation (_primary_ theme)
* Navigation (_secondary_ theme)
* Navigation (_tools_ theme)
* Breadcrumb

## Navigation

For navigation, this module uses [o-hierarchical-nav](https://github.com/Financial-Times/o-hierarchical-nav), so please check out its documentation to add it in your header.

## Brands

To add your brand color, you need to change both o-ft-header's and o-hierarchical-nav's variables:

$o-ft-header-brand-color

$o-hierarchical-nav-brand-color

## Adjusting widths

The logo, the primary-left and the primary-right need to have a fixed width for primary-centre to adjust appropiately. A product might want to change the default width for the logo (75px), or for the primary-left (230px). In that case, you would need to add the following variables to your stylesheet before importing this module's sass:

$o-ft-header-logo-width

$o-ft-header-primary-left-width
