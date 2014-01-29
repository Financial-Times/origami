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
         * iJento production server.
         * @property iJentoProdServer
         * @final
         * @private
         */
            iJentoProdServer = 'http://stats.ft.com',
        /**
         * iJento test server.
         * @property iJentoProdServer
         * @final
         * @private
         */
            iJentoTestServer = 'http://statstest.ft.com',
        /**
         * iJento image path.
         * @property trackerUrl
         * @final
         * @private
         */
            iJentoPath = "/si/track.gif",

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
            currentRequests = {},

    // TODO
        transmitter = (function () {
            var xmlHttp,
                image;

            try {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlHttp = new window.XMLHttpRequest();
            } catch (e) {
                // code for IE6, IE5
                try {
                    xmlHttp = new window.ActiveXObject("Microsoft.XMLHttp");
                } catch (ee) {}
            }

            if (xmlHttp) {
                return function (domain, path, async, callback) {
                    if (async) {
                        xmlHttp.onreadystatechange = function () {
                            if (xmlHttp.readyState === 4) {
                                callback.call(xmlHttp);
                            }
                        };
                    }

                    xmlHttp.onerror = function () { callback.call(xmlHttp); };

                    // Both developer and noSend flags have to be set to stop the request sending.
                    if (!(settings.get('developer') && settings.get('noSend'))) {
                        xmlHttp.open("POST", domain, async);
                        xmlHttp.send(path);
                    }

                    if (!async) {
                        callback.call(xmlHttp);
                    }
                };
            }

            // TODO imagetag
            image = new window.Image();

            return function (domain, path, async, callback) {
                if (async) {
                    image.onreadystatechange(function () {
                        callback.call(image);
                    });
                }

                if (!(settings.get('developer') && settings.get('noSend'))) {
                    image.src = domain + path;
                }

                if (!async) {
                    callback.call(image);
                }
            };
        }());

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
     * Generates an Adler 32 checksum of the input data.
     * @method generateChecksum
     * @param input {String} The input string.
     * @return {String} The checksum.
     * @private
     */
    function generateChecksum(input) {
        var a = 1,
            b = 0,
            i,
            chk;

        for (i = 0; i < input.length; i = i + 1) {
            a += input.charCodeAt(i);
            b += a;
        }

        // A and B must be modulo 65521 (the largest prime number smaller than 2^16)
        a %= 65521;
        b %= 65521;

        chk = (b * 65536) + a;
        return chk.toString(16);
    }

    /**
     * Encodes a given input string in base64.
     * @method encodeString
     * @param input {String} The string to encode.
     * @return {String} The base64-encoded value of the input string.
     * @private
     */
    function encodeString(input) {
        if (!input) {
            return '';
        }

        try {
            return window.btoa(utils.unencode(utils.encode(input)));
        } catch (error) {
            var TRANS_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                output = [],
                i,
                numBytesLeft,
                value;
            /* jshint -W016 */
            /* jslint bitwise:false */
            for (i = 0; i < input.length; i += 3) {
                numBytesLeft = input.length - i;
                value = 0;
                value = (input.charCodeAt(i) << 16) & 0x00ff0000;
                value |= (numBytesLeft > 1) ? (input.charCodeAt(i + 1) << 8) & 0x0000ff00 : 0;
                value |= (numBytesLeft > 2) ? input.charCodeAt(i + 2) & 0x000000ff : 0;

                output.push(TRANS_CHARS.charAt((value & 0x00fC0000) >> 18));
                output.push(TRANS_CHARS.charAt((value & 0x0003f000) >> 12));
                output.push((numBytesLeft > 1) ? TRANS_CHARS.charAt((value & 0x00000fc0) >> 6) : '_');
                output.push((numBytesLeft > 2) ? TRANS_CHARS.charAt((value & 0x0000003f)) : '_');
            }
            /* jshint +W016 */
            /* jslint bitwise:true */
            return output.join('');
        }
    }

    /**
     * Encode the values into an iJento string.
     * @method encodeDetails
     * @param format {String} The format (or ordering) of the values.
     * @param values {Object} The values to encode.
     * @return {String} The encoded string.
     * @private
     */
    function encodeDetails(format, values) {
        format = format.split('');

        var i,
            output = [];

        for (i = 0; i < format.length; i = i + 1) {
            output.push(encodeString(values[format[i]]));
        }

        return output.join('*')  + "*";
    }

    /**
     * Get the tracking pixel url for the chosen environment.
     * @method taggingServer
     * @param [environment] {String} The environment. Either <code>production</code> or <code>test</code>.
     * @return {String} Host and path of the iJento tracking pixel.
     * @private
     */
    function taggingServer(environment) {
        return (environment === 'production' ? iJentoProdServer : iJentoTestServer) + iJentoPath;
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
            query,
            checksum,
            path;

        // Only bothered about offlineLag if it's longer than a second, but less than a month. (Especially as Date can be dodgy)
        if (offlineLag > 1000 && offlineLag < (31 * 24 * 60 * 60 * 1000)) {
            request.offlineLag = offlineLag; // TODO
            request.values.p += (request.values.p.indexOf('?') === -1 ? '?' : '&') + 'offlineLag=' + offlineLag;
        }

        query = "f=" + request.format + "&d=" + encodeDetails(request.format, request.values);
        checksum = "&c=" + generateChecksum(query);

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

        path = [query, checksum].join('');

        if (settings.get('developer')) {
            utils.log(taggingServer(request.environment) + '?' + path);
        }

        transmitter(taggingServer(request.environment), path, request.async, requestFinished);
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
