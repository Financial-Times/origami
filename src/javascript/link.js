/*global module, require, window */
module.exports = (function (window) {
    "use strict";

    var
        Core = require("./core"),
        utils = require("./utils"),

        /**
         * Default properties for events.
         * @property defaultEventConfig
         * @type {Object}
         * @private
         */
        defaultLinkConfig = {
            type: 'link'
        },

        callback = function () {};

    if (!window.Element.prototype.addEventListener) {
        window.Element.prototype.addEventListener = function (type, listener) {
            this.attachEvent("on" + type, listener);
        };
    }

    /**
     * Calculates the parents of a HTML element.
     * @method parentTree
     * @param element {Element} The starting element.
     * @return {Array} The tree of parent elements.
     * @private
     */
    function parentTree(element) {
        if (!element) {
            return [];
        }

        var tree = [element];

        if (element.nodeName === 'BODY') {
            return tree;
        }

        return tree.concat(parentTree(element.parentElement));
    }

    function createLinkID(link) {
        var parents = parentTree(link),
            name = link.href;

        name = name.replace(/^http:\/\/[\w\.]+/, '') // Remove http://[something].
            .replace(/^\//, '') // Remove slash at beginning
            .replace(/(\?|#).*$/, '') // Remove query string and page anchor (#)
            .replace(/\/$/, '') // Remove trailing slash
            .replace(/\.[a-z]{3,4}$/, ''); // Remove final ".com" or similar

        // If it's an external URL
        if (name === '') {
            name = link.href.replace(/^http:\/\//, '').split('?')[0].replace(/\/$/, '');
        }

        // Last 2 items of URL
        name = name.split('/').slice(-2).filter(function (obj) { return (obj); });

        // If uuid then take final value only
        if (name.slice(-1)[0].match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)) {
            name = name.slice(-1);
        }

        // Remove slashes as final outcome is slash delimited
        name = (name.length > 1 ? name.slice(0, 2).join('-') : name[0]).toLowerCase();

        return parents.map(function (p) { return p.tagName.toLowerCase(); }).filter(function (e, i, arr) { return arr.lastIndexOf(e) === i; }).reverse().join('/') + '/' + name;
    }

    /**
     * Tracks a link.
     * @method track
     * @param link {Element} The link to track.
     * @param [callback] {Function} Optional callback function.
     * @async
     */
    function track(link, callback) {
        var linkID = createLinkID(link),
            config = utils.merge(utils.merge(defaultLinkConfig), {
                'requestPage': '', // TODO
                'link': linkID,
                'referrerClickID': Core.getClickID()
            });

        Core.track(config, callback);
    }

    /**
     * Handle a click event.
     * @method clickEvent
     * @param event
     * @return {Boolean}
     * @private
     */
    function clickEvent(event) {
        track(event.target, callback);
        return true;
    }

    function onClick(cb) {
        callback = cb;
    }

    /**
     * Setup and initialise link tracking.
     *
     * The config object can have three key/values - all are optional.
     * * root: The root element to search for links. Defaults to window.document - useful if trying to track links from an iframe.
     * * selector: The selector to use to search for links. Defaults to 'a'.
     * * event: The event to listen on. Defaults to 'click'.
     * * links: If you've already worked out the links to track, then this is used to pass them over. Must be an array with elements that accept events.
     * @method init
     * @param [config] {Object} Initial configuration
     * @returns {Array} The links setup in this init.
     */
    function init(config) {
        var links, i;

        if (typeof config === "undefined") {
            config = {};
        }
        config = utils.merge({
            root: window.document,
            selector: 'a',
            event: 'click',
            links: null
        }, config);

        if (config.hasOwnProperty('callback')) {
            callback = config.callback;
        }

        if (config.links && typeof config.links === "object" && config.links.constructor.toString().match(/array/i)) {
            links = config.links;

            for (i = 0; i < links.length; i = i + 1) {
                links[i].addEventListener(config.event, clickEvent);
            }
        } else {
            if (typeof config.root !== "object" || typeof config.selector !== "string") {
                throw "If supplying a config it must have a valid root element and a selector string";
            }

            config.root.addEventListener(config.event, function (event) {
                if (event.target.tagName === config.selector.toUpperCase()) {
                    clickEvent.call(event.target, event);
                }
            });
        }
    }

    return {
        init: init,
        track: track,
        onClick: onClick
    };
}(window));