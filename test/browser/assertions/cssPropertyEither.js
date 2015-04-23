var util = require('util');

exports.assertion = function(selector, cssProperty, expected1, expected2, msg) {


    var MSG_ELEMENT_NOT_FOUND = 'Testing if element <%s> has css property %s or %s. ' +
            'Element or attributes %s or %s could not be located.';
    /**
     * The message which will be used in the test output and
     * inside the XML reports
     * @type {string}
     */
    this.message = msg || util.format('Testing if element <%s> has css property "%s: %s or %s".', selector, cssProperty, expected1, expected2);

    /**
     * A value to perform the assertion on. If a function is
     * defined, its result will be used.
     * @type {function|*}
     */
    this.expected = expected1 || expected2;

    /**
     * The method which performs the actual assertion. It is
     * called with the result of the value method as the argument.
     * @type {function}
     */
    this.pass = function(value) {
        return value === expected1 || value === expected2;
    };


    this.failure = function(result) {
        var failed = result === false || result && result.status === -1;
        if (failed) {
            this.message = msg || util.format(MSG_ELEMENT_NOT_FOUND, selector, cssProperty, expected1, expected2);
        }
        return failed;
    };
    /**
     * The method which returns the value to be used on the
     * assertion. It is called with the result of the command's
     * callback as argument.
     * @type {function}
     */
    this.value = function(result) {
        return result.value;
    };

    /**
     * Performs a protocol command/action and its result is
     * passed to the value method via the callback argument.
     * @type {function}
     */
    this.command = function(callback) {
        return this.api.getCssProperty(selector, cssProperty, callback);
    };

};