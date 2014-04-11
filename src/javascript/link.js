/**
 * For tracking links.
 * @module Track
 * @submodule link
 * @class Track.link
 * @static
 */

/*global module, require, window */
module.exports = (function (window) {
    "use strict";

    var
        Queue = require("./core/queue"),
        Core = require("./core"),

        utils = require("./utils"),

        internalQueue,

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

    /**
     * Check if a URL is going to the same site (internal)
     * @method isInternal
     * @param url {String} The url to check.
     * @return {Boolean}
     */
    function isInternal(url) {
        return url.indexOf(window.document.location.hostname) > -1;
    }

    /**
     * Check if a URL is going to an external site.
     * @method isExternal
     * @param url {String} The url to check.
     * @return {Boolean}
     */
    function isExternal(url) {
        return !isInternal(url);
    }

    /**
     * Checks if a URL is pointing at a file.
     * NOTE: Don't want to maintain a list of file extensions, so try best guess.
     * @method isFile
     * @param url {String} The url to check.
     * @return {Boolean}
     */
    function isFile(url) {
        var path = url.replace(/^\w+:\/\//, '').replace(/(#|\?).+/g, '').replace(/\/$/, '');

        // It must have a slash to have a file path
        if (path.indexOf('/') === -1) {
            return false;
        }

        // No extension
        if (!path.match(/\.(\w{2,4})$/)) {
            return false;
        }

        // Obviously a web page.
        if (['html', 'htm', 'php'].indexOf(RegExp.$1) > -1) {
            return false;
        }

        return true;
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

    /**
     * Create the identifier of the link. TODO: https://rally1.rallydev.com/#/16966478977d/detail/defect/17919485944
     * @method createLinkID
     * @param link
     * @return {String} The ID for the link.
     */
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
     * Track the link.
     * @method track
     * @param element
     * @return {*}
     */
    function track(element) {
        var linkID = createLinkID(element),
            config = utils.merge(utils.merge(defaultLinkConfig), {
                'requestPage': '', // TODO
                'link': linkID,
                'referrerClickID': Core.getClickID()
            });

        if (isExternal(element.href) || isFile(element.href)) {
            // Send now
            config.async = false;
            return Core.track(config, callback);
        }

        if (isInternal(element.href)) {
            // Queue and send on next page.
            internalQueue.add(config).save();
        }

        return true;
    }

    /**
     * Handle a click event.
     * @method clickEvent
     * @param event {Event} The event.
     * @return {Boolean}
     * @private
     */
    function clickEvent(event) {
        return track(event.target);
    }

    /**
     * Set the callback called on every link tracking event.
     * @method onClick
     * @param cb {Function} The callback.
     */
    function onClick(cb) {
        callback = cb;
    }

    /**
     * If there are any requests queued, attempts to send the next one
     * Otherwise, does nothing
     * @method run
     * @async
     */
    function runQueue() {
        var next = function () { runQueue(); callback(); },
            nextLink = internalQueue.shift();

        if (nextLink) {
            Core.track(nextLink, next);
        }
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

        internalQueue = new Queue('links');

        runQueue();

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
                utils.addEvent(links[i], config.event, clickEvent);
            }
        } else {
            if (typeof config.root !== "object" || typeof config.selector !== "string") {
                throw "If supplying a config it must have a valid root element and a selector string";
            }

            utils.addEvent(config.root, config.event, function (event) {
                if (event.target.tagName === config.selector.toUpperCase()) {
                    clickEvent.call(event.target, event);
                }
            });
        }
    }

    utils.addEvent(window, 'oTracking.Link', track);

    return {
        init: init,
        onClick: onClick,
        track: track
    };
}(window));