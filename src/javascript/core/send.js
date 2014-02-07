/**
 * Queuing and sending tags
 * Keep track of individual requests in case any fail due to network errors / being offline / browser being closed mid-request.
 * @module _Core
 * @submodule Send
 * @class Track._Core.Send
 * @static
 */

/*global module, require, window */
module.exports = (function (window) {
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _settings
     * @type {Object}
     * @private
     */
    var settings = require("./settings"),
        utils = require("../utils"),
        Queue = require("./queue"),

        /**
         * Tracking collection server.
         * @property domain
         * @private
         */
            domain = "http://track.ft.com",

        /**
         * Queue queue.
         * @property queue
         * @private
         */
            queue,
        /**
         * Requests being sent right now.
         * @property currentRequests
         * @private
         */
            currentRequests = {};

    /**
     * Marks a request as current.
     * @method started
     * @param id {String} The ID of the request.
     * @private
     */
    function started(id) {
        currentRequests[id] = true;
    }

    /**
     * Marks a request as no longer current.
     * @method finished
     * @param id {String} The ID of the request.
     * @private
     */
    function finished(id) {
        delete currentRequests[id];
    }

    /**
     * Marks a request as no longer current and removes it from the queue.
     * @method success
     * @param id {String} The ID of the request.
     * @private
     */
    function success(id) {
        finished(id);

        var replacement = queue.all(),
            i;

        for (i = 0; i < replacement.length; i = i + 1) {
            if (id === replacement[i].requestID) {
                replacement.splice(i, 1);
                queue.replace(replacement).save();
                break;
            }
        }
    }

    /**
     * Attempts to send a tracking request.
     * @method sendRequest
     * @param request {Object} The request to be sent.
     * @param callback {Function} Callback to fire the next item in the queue.
     * @private
     * @async
     */
    function sendRequest(request, callback) {
        /* Example request:
         *  {
         *      environment: 'test',
         *      clickID: 't1388678300273',
         *      async: false,
         *      callback: [Function],
         *      format: 'pcrtgyuo',
         *      values: {
         *          c: '',
         *          t: 't1388678300273',
         *          u: '8.289.8675019387156.1388678301549.-fdc94dd',
         *          o: 1,
         *          p: 'http://www.ft.com/home/uk',
         *          r: '',
         *          g: 'co=24&sr=1920x1080<=2014-01-02T15%3A58%3A20.273Z&jv=',
         *          y: 'page'
         *      },
         *      requestID: '8.289.8675019387156.1388678301549.-fdc94dd',
         *      queueTime: 1234
         *  }
         */
        var offlineLag = (new Date()).getTime() - request.queueTime,
            path,
            xmlHttp = new window.XMLHttpRequest();

        // Only bothered about offlineLag if it's longer than a second, but less than a month. (Especially as Date can be dodgy)
        if (offlineLag > 1000 && offlineLag < (31 * 24 * 60 * 60 * 1000)) {
            request.offlineLag = offlineLag;
        }

        function requestFinished(xmlHttp) {
            if (utils.is(request.callback, 'function')) {
                request.callback.call(request, xmlHttp);
            }
            if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                success(request.requestID);
                callback();
            } else {
                finished(request.requestID);
                // TODO Wait a bit, then try again?
            }
        }

        started(request.requestID);

        path = utils.serialize(request);

        if (request.async) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    requestFinished(xmlHttp);
                }
            };
        }

        xmlHttp.onerror = function () { callback.call(xmlHttp); };

        // Both developer and noSend flags have to be set to stop the request sending.
        if (!(settings.get('developer') && settings.get('noSend'))) {
            xmlHttp.open("POST", domain, request.async);
            xmlHttp.send(path);
        }

        if (!request.async) {
            requestFinished(xmlHttp);
        }
    }

    /**
     * Adds a new request to the list of pending requests
     * @method add
     * @param request The request to queue
     */
    function add(request) {
        request.queueTime = (new Date()).getTime();

        queue.add(request).save();

        if (settings.get('developer')) {
            utils.log('Queue', queue);
        }
    }

    /**
     * If there are any requests queued, attempts to send the next one
     * Otherwise, does nothing
     * @method run
     */
    function run() {
        var nextRequest = queue.first();

        if (!nextRequest) {
            return;
        }

        // Send this request, then try run again.
        sendRequest(nextRequest, run);
    }

    /**
     * Convenience function to add and run a request all in one go.
     * @method addAndRun
     * @param request {Object} The request to queue and run.
     */
    function addAndRun(request) {
        add(request);
        run();
    }

    /**
     * Init the queue and send any leftover tags.
     * @method init
     * @private
     */
    function init() {
        queue = new Queue('requests');
        if (settings.get('config') && settings.get('config').server) {
            domain = settings.get('config').server;
        }

        // If any tracking calls are made whilst offline, try sending them the next time the device comes online
        if (window.addEventListener) {
            window.addEventListener("online", run);
        }

        // On startup, try sending any requests queued from a previous session.
        run();
    }

    return {
        init: init,
        add: add,
        run: run,
        addAndRun: addAndRun
    };
}(window));
