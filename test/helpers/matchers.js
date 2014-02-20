'use strict';

// var jasmine = require('../../node_modules/karma-jasmine/lib/jasmine');

jasmine._addCustomMatchers = function () {
    "use strict";
    var jasmineEnv = jasmine.getEnv();

    jasmine.addMatchers({

        toBeAFunction: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: typeof actual === 'function',
                        message: 'not a function'
                    };
                }
            };
        },

        toBeThisFunction: function () {
            return {
                compare: function (actual, func) {
                    return {
                        pass: actual === func
                    };
                }
            };
        },


        toBeAnArray: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: actual instanceof Array,
                        message: 'not an array'
                    };
                }
            };
        },

        toBeAnObject: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: typeof actual === 'object',
                        message: 'not an object'
                    };
                }
            };
        },



        lastCalledWith: function () {
            return {
                compare: function (actual) {
                    var result;
                    var actualArgs = actual.mostRecentCall.args,
                        desiredArgs = Array.prototype.slice.apply(arguments);
                    for (var i = 0, il = desiredArgs.length; i <il; i++) {
                        if (!jasmineEnv.equals_(actualArgs[i], desiredArgs[i])) {
                            result = false;
                        }
                    }
                    result = true;

                    return {
                        pass: result
                    };
                }
            };
        },

        recentlyCalledWith: function () {
            return {
                compare: function (actual, callToCheck) {
                    var result;
                    var actualArgs = actual.calls[callToCheck].args,
                        desiredArgs = Array.prototype.slice.apply(arguments);
                    for (var i = 0, il = desiredArgs.length; i <il; i++) {
                        if (!jasmineEnv.equals_(actualArgs[i], desiredArgs[i])) {
                            result = false;
                        }
                    }
                    result = true;

                    return {
                        pass: result
                    };
                }
            };
        }
    });
};
