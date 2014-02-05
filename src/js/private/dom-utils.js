"use strict";

var prefixer = require('o-useragent').prefixer;

function getSpacing(el, side) {
    return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
}

function getStyleValue (el, prop) {
    return getStylePropValue(getComputedStyle(el, null), prop);
}

function getStylePropValue (computedStyle, prop) {
    return computedStyle.getPropertyValue(prefixer(prop));
}

function getStyleValues (el, props) {
    var elStyles = getComputedStyle(el, null),
        vals = [];

    for (var i = props.length - 1;i>=0;i--) {
        vals.unshift(getStylePropValue(elStyles, props[i]));
    }
    return vals;
}

module.exports = {
    getSpacing: getSpacing,
    getStyleValue: getStyleValue,
    getStyleValues: getStyleValues
};
