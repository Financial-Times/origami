"use strict";

var prefixer = require('o-useragent').prefixer;

function getSpacing(el, side) {
    return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
}

function getStyleValue (el, prop) {
    return getComputedStyle(el, null).getPropertyValue(prefixer(prop));
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