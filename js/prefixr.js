'user strict';

var docElement = document.documentElement,
    modElem = document.createElement('modernizr'),
    mStyle = modElem.style,
    toString = {}.toString,
    omPrefixes = 'Webkit Moz O ms',
    cssomPrefixes = omPrefixes.split(' '),
    domPrefixes = omPrefixes.toLowerCase().split(' '),
    tests = {},
    inputs = {},
    attrs = {},
    classes = [],
    slice = classes.slice,
    featureName,
    _hasOwnProperty = ({}).hasOwnProperty,
    hasOwnProp;
    
function is( obj, type ) {
    return typeof obj === type;
}

function contains( str, substr ) {
    return !!~('' + str).indexOf(substr);
}

if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
    hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
    };
} else {
    hasOwnProp = function (object, property) {
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
}


if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

                if (this instanceof bound) {

                    var F = function () {};
                    F.prototype = target.prototype;
                    var self = new F();

                    var result = target.apply(
                        self,
                        args.concat(slice.call(arguments))
                    );
                    if (Object(result) === result) {
                        return result;
                    }
                    return self;

                } else {

                    return target.apply(
                        that,
                        args.concat(slice.call(arguments))
                    );

                }

            };

        return bound;
    };
}

function testProps(props, prefixed) {
    for (var i in props) {
        var prop = props[i];
        if (!contains(prop, "-") && mStyle[prop] !== undefined) {
            return prefixed == 'pfx' ? prop : true;
        }
    }
    return false;
}

function testDOMProps(props, obj, elem) {
    for (var i in props) {
        var item = obj[props[i]];
        if (item !== undefined) {

            if (elem === false) return props[i];

            if (is(item, 'function')) {
                return item.bind(elem || obj);
            }

            return item;
        }
    }
    return false;
}

function testPropsAll(prop, prefixed, elem) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if (is(prefixed, "string") || is(prefixed, "undefined")) {
        return testProps(props, prefixed);

    } else {
        props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
        return testDOMProps(props, prefixed, elem);
    }
}

// setCss('');
modElem = null;

module.exports = function (prop, obj, elem) {
    if (!obj) {
        return testPropsAll(prop, 'pfx');
    } else {
        return testPropsAll(prop, obj, elem);
    }
};