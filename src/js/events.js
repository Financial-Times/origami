'use strict';

var Delegate = require('dom-delegate');
// Remove lodash
var defaults = require('lodash-node/modern/objects/defaults');
var ddOff = Delegate.prototype.off;
var ddOn = Delegate.prototype.on;

var Events = function(root, andBody) {
    // if developer specifies they need a body listener as well as the owned dom run ftdomdelegate's constructor 
    // on this (to get ftdd's setup, but using the prototype below) and also add a subdelegate attached to body
    if (andBody) {
        Delegate.call(this, root);
        this.bodyDelegate = new Delegate(document.body);
    } else {
        // otherwise just return an ftdomdelegate instance
        return new Delegate(root);
    }
};


// override & extend ftdd prototype with the following
Events.protoype = defaults({

    on: function(event, selector, handler) {
        // same API as ftdd but if selector is body then use the delegate that's attached to body
        if (selector === document.body) {
            this.bodyDelegate.on(event, handler);
        } else {
            ddOn.apply(this, arguments);
        }
    },

    off: function(event, selector, handler) {
        // same API as ftdd but 
        // ... if passed true turn all events on body and owned DOm off
        if (event === true) {
            ddOff.apply(this);
            this.bodyDelegate.off();
        // ... if passed body turn only events on body off
        } else if (selector === document.body) {
            this.bodyDelegate.off(event, handler);
        // ... otherwise just turn events on the owned DOM off
        } else {
            ddOff.apply(this, arguments);
        }
    },

    disable: function() {
        this._rootElement = this.rootElement;
        this.rootElement = null;
        this.bodyDelegate.root();
    },

    enable: function() {
        if (!this._rootElement) {
            return;
        }
        this.rootElement = this._rootElement;
        this._rootElement = null;
        this.bodyDelegate.root(document.body);
    }

}, Delegate.prototype);

module.exports = Events;