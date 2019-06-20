# o-comment-count [![Build Status](https://travis-ci.org/Financial-Times/o-comment-count.svg?branch=master)](https://travis-ci.org/Financial-Times/o-comment-count) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

A small UI component for rendering the comment count of a given article.

## Contents

 * <a href="#product">Adding comment count to your product</a>
     * <a href="#decl">Declaratively</a>
     * <a href="#imper">Imperatively</a>
 * <a href="#configuration">Global configuration</a>
     * <a href="#confdecl">Declaratively</a>
     * <a href="#confimper">Imperatively</a>
 * <a href="#jsapi">JavaScript API</a>
     * <a href="#methods">Methods</a>
     * <a href="#logging">Logging</a>
 * <a href="#browser">Browser support</a>
 * <a href="#core">Core/enhanced experience</a>

## <div id="product"></div> Adding comment count to your product
### <div id="decl"></div> Declaratively
Use the following markup to enable comments:

```html
<div data-o-component="o-comments-count"
    data-o-comments-count-auto-init="true|false"
    data-o-comments-count-config-article-id="{article-id}"
    data-o-comments-count-config-template="{count} Comment{plural}">

        <div class="o--if-no-js">0 Comments</div>
</div>
```


 * `data-o-comments-count-config-article-id` a unique id for your content, ideally a UUID for FT content
 * `data-o-comments-count-auto-init="false"` a module which has this attribute with a `false` value will not be initialized on the `o.DOMContentLoaded` event. This allows you to defer component initialisation.
 * `data-o-comments-count-config-{key}` for any other configuration. `{key}` has the following rule: `--` means new object level, `-` means camel case. Example: `data-o-comments-count-config--data-format--absolute="value"` is transformed to: ```{"livefyre": {"dataFormat": {"absolute": "value"}}}```

For the full list of configuration, see the <a href="#config">available configurations</a>.


Those elements which don't have the `data-o-comments-count-auto-init="false"` attribute will be automatically initialized on the `o.DOMContentReady` event.

If you defer initialising oCommentsCount by using `data-o-comments-count-auto-init="false"` then you can initialise the component whenever you want by calling

```javascript
oCommentsCount.init();
```

The init function may take an optional parameter: a context (this could be DOM element or a valid selector). The search would be performed only inside of this context element. If none is specified, it defaults to document.body.

### <div id="imper"></div> Imperatively
Create an instance of the component with the parameters that are available:

```javascript
var oCommentsCountComponent = new oCommentsCount(document.querySelector('.comment-count'), {
    articleId: 'article-id'
});
```

*The widget is automatically initialized, unless you specify in the configuration `autoInit: false`. In this case you can initialize this particular object at a later time by calling the following:*

```javascript
oCommentsCountComponent.init();
```

For the full list of configuration, see the <a href="#config">available configurations</a>.


#### <div id="config"></div> More about the constructor config object
The configuration object which is passed to the contructor can/should have the following fields:

###### Mandatory fields:

 - articleId: ID of the article, any string

###### Optional fields:
 - template: can be used if you want to override the global template for this widget. `{count}` will be replaced with the count, and `{plural}` will be replaced with blank for a count of 0 or 1, and with 's' for a count > 1.
 - autoInit: can be used to avoid initializing the widget automatically by setting this to false
 - autoRefresh: it refreshes the widget with the latest count if set to true
 - hideIfZero: if true, hides the dom element of the widget (visibility: hidden)

## <div id="configuration"></div> Global configuration
This module uses global configuration. These are related configurations for Livefyre.

The default configuration is the following:

```json
{
    "template": "{count} Comment{plural}"
}
```

There are two ways for changing the default config:

### <div id="confdecl"></div> Declaratively
In order to change the configuration, you can add a script tag in your page source with the format in the example below:

```javascript
<script data-o-comments-count-config type="application/json">
    {
        "template": "{count}"
    }
</script>
```

This configuration will be loaded on the `o.DOMContentLoaded` event.

**Also, don't forget to also add the configuration for `o-comment-api` (http://registry.origami.ft.com/components/o-comment-api#configuration) if you want to change the URLs of the services.**



### <div id="confimper"></div> Imperatively
##### oCommentsCount.setConfig(config)
The configuration can be changed using the `setConfig` static method. Calling this method with an object will merge the current configuration with the object specified (deep merge, primitive type values of the same key will be overwritten).

Example:

```javascript
oCommentsCount.setConfig({
    "template": "{count}"
});
```

*As on the event `o.DOMContentLoaded` the widgets declared in the DOM are automatically initialized, it is preferred to call this function **before** the `o.DOMContentLoaded` event is triggered.*


**Also, don't forget to also add the configuration for `o-comment-api` (http://registry.origami.ft.com/components/o-comment-api#configuration).**
The API of o-comment-api is available by using `oCommentsCount.dataService`.

## <div id="jsapi"></div> JavaScript API

### Events

#### oCommentsCount.ready

The `oCommentsCount.ready` event is fired after the comment count is initalised and added to the DOM.

The event has the following properties:
- detail.id - Widget id _(deprecated)_
- detail.instance - `Widget` instance.

```javascript
	document.body.addEventListener('oCommentsCount.ready', function(e) {
		console.log(e.detail.instance);
	});
```

### <div id="methods"></div> Methods
##### init
Called automatically unless autoInit is set to false. Init will basically fetch the comment count and render the template. If it's called multiple times, it re-renders the widget each time with the latest available comment count.

##### getCommentCount

### <div id="logging"></div> Logging
Logging can be enabled for debugging purposes. It logs using the global 'console' if available (if not, nothing happens and it degrades gracefully).
By default logging is disabled.

##### oCommentsCount.enableLogging()
This method enables logging of the module.

##### oCommentsCount.disableLogging()
This method disables logging of the module.

##### oCommentsCount.setLoggingLevel(level)
This method sets the logging level. This could be a number from 0 to 4 (where 0 is debug, 4 is error), or a string from the available methods of 'console' (debug, log, info, warn, error).
Default is 3 (warn).

## <div id="browser"></div> Browser support
Works in accordance with our [support policy](https://docs.google.com/a/ft.com/document/d/1dX92MPm9ZNY2jqFidWf_E6V4S6pLkydjcPmk5F989YI/edit)

## <div id="core"></div> Core/Enhanced Experience
Only the enhanced experience offers any kind of commenting functionality. Core functionality will be added in due course.
