# Origami asset loader

This module provides SASS and JavaScript utilities for reliably building paths to a module's static assets, such as CSS background images, fonts and JSON data files. This is needed because the URL path to load these assets will vary markedly depending on how a product developer chooses to integrate the Origami component into their website.

## Overview

For example, if a module called `o-header` contains a stylesheet that loads a logo as a background, and that image exists at `/img/logo.png` in the module's git repository, the path that needs to be output in the CSS could vary wildly:

1. `http://buildservice.ft.com/files/o-header@1.2/img/logo.png` - If the product developer uses the build service to fetch the CSS, it needs to send the request for the logo back through the build service, and also needs to know what version of the module the CSS came from so it can serve the logo image from the same version.
1. `/bower_components/o-header/logo.png` - If the product developer has installed the Origami modules in a `bower_components` directory (which is typical) and that directory is at the root of their web server's public document tree, the default variable values will make the subresources Just Work&trade;
1. `/resources/head/logo.png` - If the product developer has a front-controller and can therefore internally map resource request URLs to different paths on the filesystem, and perhaps also wants to rename the module name component to something of their choosing, they might want the path to be something like this.

When loading from installed modules there is no need for a version number because the subresource file will be part of the same installed package from which the CSS or JavaScript is drawn.

## Usage (component developers)

To include `o-assets` in your module run

	bower install o-assets=http://git.svc.ft.com:9080/git/origami/o-assets.git --save

### SASS

Add the following to the top of your SASS stylesheet

	@import "o-assets/main";  

#### Placeholder variables

At the top of your module (ideally alongside any other variable definitions), define the following variables *exactly* as follows (replacing `{module-name}` with the name of your module)

	$o-{module-name}-version: null !default;
	$o-{module-name}-assets-path: {module-name} !default;

You are setting defaults of `null` for the version, which is only needed (and will be set) by the build service, and the module-specific path prefix, which will almost always be the name of the module so should always be set to the module name by default.  There is no need to do any configuration for JavaScript assets.

#### Resolving paths

Where you need to resolve a path use the `oAssetsUse` function:

	background: url(oAssetsUse("img/logo.png", $o-module-name-assets-path, $o-module-name-version));

`$o-module-name-assets-path` and `$o-module-name-version` **must** be passed in as parameters (even though they will probably have little to no effect on your local environment). It's a good idea to define your own shorthand function for the standard `oAssetsUse` arguments:

    @function o{ModuleName}Asset ($asset) {
        @return oAssetsUse($asset, $o-{module-name}-assets-path, $o-{module-name}-version);
    }

This enables you to resolve asset paths more elegantly:

	background: url(oModuleNameAsset("img/logo2.png"));

### JavaScript

There's no need to define placeholder variables in JavaScript. To resolve asset paths use the `resolve` method of the assets module, which takes the path and module name as arguments

	xhr.open("get", require('o-assets').resolve('/data/2013/12/monthdata.csv', 'o-weather'));

As with SASS, you can define a shorthand if you want to avoid repeating your module name:

	function useAsset(path) {
		return require('o-assets').resolve(path, 'o-weather');
	}

## Usage (product developers)

This section is intended for product developers who want to use Origami modules.

*'URL routing' is used as a generic term for any method used to point a url to a resource, including copying the resource to the location specified by the url.*

### If you're using the build service

Don't worry, be happy.  It's all taken care of, and your assets should load from the build service.  Marvellous.

If not, we assume you're doing your own build of Origami components.  In that case...

### If you don't have URL routing

If your web server is serving files directly from disk with no routing layer, and therefore URL paths map directly to filesystem paths, then Origami assets should load correctly by default, provided that you:

* installed your Origami components using bower in the default `bower_components` directory; and
* your `bower_components` directory is *inside* and at the base of the public web server document root of your project.

### If you do have URL routing

If you have URL routing and you want to improve on the above (because it's generally inadvisable to put bower_components in a public area of your web server), you can configure the assets module to load assets from a different path.  There are three components that you can configure:

1. Global path prefix: `$o-assets-global-path` variable (in SASS) and `setGlobalPathPrefix` method (in JavaScript).  Default is '/bower_components/'.
1. Module path: `$o-{module-name}-assets-path` variable (in SASS) and `setModulePaths` method (in JavaScript).  Default is the name of the module.
1. Module version: `$o-{module-name}-version variable (in SASS) and `setModuleVersions` method (in JavaScript).  Default is null.

All the above should be set before including any other modules in your product's sass/js bundles.

The path to a given resource is composed by doing the following concatenation:

	{global-prefix} + [ {module-path}  [ +  @ + {module-version} ] + / ] + {path-within-repo}

Module version and module path are suffixed with a slash if not empty.  Generally the only use case for the version token is in the build service, so you should not need to set that. You may want to set the global prefix to something like '/resources/' or similar, and then put your bower_components directory outside your webroot, and use a URL router to map HTTP requests to the appropriate assets.

Setting module paths and versions is done at the module level.  In SASS, using appropriately namespaced variables:

	$o-colors-assets-path: 'colors';

In JavaScript, using the `setModulePaths` method, which takes an object mapping module names to paths:

	require('o-assets').setModulePaths({
	  colors: 'colors'
	});

#### Placing assets from multiple modules in a single directory

This isn't an advisable pattern, because even if there are no clashes between modules immediately, future module versions may contain assets whose names clash, or bring in subdependencies with paths you haven't overridden, which will unnecessarily complicate upgrades. However, if your use case justifies doing so then, for each module, in SASS set 

    $o-{module-name}-assets-path: #{''};

and in JavaScript

	require('o-assets').setModulePaths({
	  module1: '',
	  module2: ''
	});
