'user strict';

var el = document.createElement('origami'),
    style = el.style,
    vendorPrefixes = 'Webkit Moz O ms',
    stylePrefixes = vendorPrefixes.split(' '),
    domPrefixes = vendorPrefixes.toLowerCase().split(' ');

/* 
 * Simple object type checker
 */
function is( obj, type ) {
    return typeof obj === type;
}

/*
 * Checks if a string contains another string
 */
function contains( str, substr ) {
    return ('' + str).indexOf(substr) + 1;
}

/*
 * Binding of a function to a given context
 */
function bind (func, obj) {
    if (Function.prototype.bind) {
        return func.bind(obj);
    } else {
        return function () {
            return func.apply(obj, arguments);
        };
    }
}

/*
 * Given a list of equivalent style properties (all but one of them containing a vendor prefix), returns the first one that is supported by the browser
 */
function getPrefixedStyleProp (prefixedProps) {
    for (var i in prefixedProps) {
        var prop = prefixedProps[i];
        if (!contains(prop, "-") && style[prop] !== undefined) {
            return prop;
        }
    }
    return false;
}

/*
 * Given a list of equivalent DOM properties (all but one of them containing a vendor prefix), returns the first one that is supported by the browser
 */
function getPrefixedDomProp (prefixedProps, obj, elem) {
    for (var i in prefixedProps) {
        var item = obj[prefixedProps[i]];
        if (item !== undefined) {

            if (elem === false) return prefixedProps[i];

            if (is(item, 'function')) {
                return bind(item, elem || obj);
            }

            return item;
        }
    }
    return false;
}

/*
 * Analyses a property name to see if it's camel case or hyphenated. If hyphenated, converts to hyphenated and 
 * makes a note that the conversion needs to be undone before returning.
 */
function preprocessProp (prop) {
    var obj = {
        prop: prop
    };
    if (prop.indexOf('-') > -1) {
        obj.prop = prop.replace(/(?:\-)([a-z])/gi, function ($0, $1) {
            return $1.toUpperCase();
        });
        obj.hyphenated = true;
    }
    return obj;
}

/*
 * Converts a camelcase property to its hyphenated equivalent
 */
function hyphenateProp (prop) {
    return prop.replace(/([A-Z])/g, function (prop, m1) {
        return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
}

/*
 * Given a style property name returns the property name (possibly prefixed) if supported by the browser
 * Given a DOM property name and an object on which the property is expected to be defined, finds the 
 *  (possibly prefixed) property and:
 *      - if elem === false, returns the (possibly prefixed) property name 
 *      - if the value is a function, returns the function bound to obj (or to elem if defined)
 *      - otherwise returns the value of the property
 */
function getPrefixedProp (prop, obj, elem) {

    var processedProp = preprocessProp(prop),
        prop = processedProp.prop,
        uppercaseProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        prefixedProps;

    if (is(obj, "undefined")) {
        // e.g. boxSizing -> boxSizing WebkitBoxSizing MozBoxSizing OBoxSizing msBoxSizing
        prefixedProps = (prop + ' ' + stylePrefixes.join(uppercaseProp + ' ') + uppercaseProp).split(' ');
        prop = getPrefixedStyleProp(prefixedProps);
        if (prop && processedProp.hyphenated) {
            prop = hyphenateProp(prop);
        }
    } else {
        // e.g. boxSizing -> boxSizing webkitBoxSizing mozBoxSizing oBoxSizing msBoxSizing
        prefixedProps = (prop + ' ' + (domPrefixes).join(uppercaseProp + ' ') + uppercaseProp).split(' ');
        prop = getPrefixedDomProp(prefixedProps, obj, elem);
    }

    return prop;
}

module.exports = getPrefixedProp;