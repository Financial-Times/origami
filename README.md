# Footer module [![Build Status](https://travis-ci.org/Financial-Times/o-footer.svg?branch=master)](https://travis-ci.org/Financial-Times/o-footer)

Origami module for the responsive FT page footer.

## Data

For convenience a JSON file with an example of footer links has been provided (`footer.json`).  It's anticipated that in a future version of the footer, this data will be the canonical footer content that should appear in most uses of the footer.  For the moment, it is just sample data.

## Upgrading from 2.x.x
### 1. Renaming the module

Rename all instances of `o-ft-footer` into `o-footer`.


### 2. Font settings

The footer now inherits the `font-family` set in your application.