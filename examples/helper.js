/*global jQuery, console, require*/

jQuery.fn.serializeObject = function () {
    "use strict";

    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    jQuery.each(arrayData, function () {
        var value;

        if (this.value) {
            value = this.value;
        } else {
            value = '';
        }

        if (objectData[this.name]) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [objectData[this.name]];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
};

(function ($, console) {
    "use strict";

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'],
        util = require('util');

    function pad(n) {
        return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }

    function timestamp() {
        var d = new Date(),
            time = [pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())].join(':');
        return [d.getDate(), months[d.getMonth()], time].join(' ');
    }

    console.log = function () {
        $('#messages').append(util.format('<li><span class="date">%s</span><pre>%s</pre></li>', timestamp(), util.inspect(arguments)));
    };
}(jQuery, console));