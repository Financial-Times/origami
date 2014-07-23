'use strict';

var unCapitalise = function (str) {
    return str.charAt(0).toLowerCase() + str.substr(1);
};

var capitalise = function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
};

module.exports = {
    unCapitalise: unCapitalise,

    capitalise: capitalise,

    copyContent: function (content) {
        return content.nodeName === 'SCRIPT' ? content.innerHTML: content.cloneNode(true);
    },

    getSpacing: function (el, side) {
        return (parseInt(el.style['padding' + capitalise(side)], 10) || 0) + (parseInt(el.style['margin' + capitalise(side)], 10) || 0);
    },

    attrToData: function (name) {
        return name.replace('data-o-modal-', '').replace(/\-\w/g, function ($0) {
            return $0.charAt(1).toUpperCase();
        });
    }
};