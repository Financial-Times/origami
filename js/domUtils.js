"use strict";

var prefixr = require('o-useragent').vendorify;

function getSpacing(el, side) {
    return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
}

function toCamelStyleProp (str) {
    return str.replace(/(?:\-)([a-z])/gi, function ($0, $1) {
        return $1.toUpperCase();
    });
}

function toHyphenatedStyleProp (str) {
    return str.replace(/([A-Z])/g, function (str, m1) {
        return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
}

function getPrefixedStyleProp (prop) {
    prop = toCamelStyleProp(prop);
    prop = prefixr(prop);
    return toHyphenatedStyleProp(prop);
}

function getStyleValue (el, prop) {
    return getComputedStyle(el, null).getPropertyValue(getPrefixedStyleProp(prop));
}

function getStyleValues (el, props) {
    var vals = [];

    for (var i = props.length - 1;i>=0;i--) {
        vals.unshift(getStyleValue(el, props[i]));
    }
    return vals;
}

module.exports = {
    getSpacing: getSpacing,
    getStyleValue: getStyleValue,
    getStyleValues: getStyleValues
};