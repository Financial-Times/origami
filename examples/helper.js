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

/*jshint -W098 */
function renderConfig(config) {
    "use strict";

    var key, html = [];

    for (key in config) {
        if (config.hasOwnProperty(key)) {
            html = html.concat([
                '<p class="params">',
                '<input type="checkbox" name="', key, '" id="config_', key, '" value="', config[key], '" checked="checked" /> ',
                '<label for="config_', key, '">', key, ': ', config[key], '</label>',
                '</p>'
            ]);
        }
    }

    return html.join('');
}

function renderParams(params) {
    "use strict";

    var key, html = [];

    for (key in params) {
        if (params.hasOwnProperty(key)) {
            html.push('<p class="params">', '<label for="params_', key, '">', key, '</label> ');

            if (params[key] instanceof Array) {
                html.push('<select name="', key, '" id="params_', key, '">');

                /*jshint -W083 */
                params[key].forEach(function (val) {
                    html.push('<option value="' + val + '">' + val + '</option>');
                });

                html.push('</select>');
            } else {
                html.push('<input name="', key, '" id="params_', key, '" value="', params[key], '" type="text" />');
            }

            html.push('</p>');
        }
    }

    return html.join('');
}

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
        $('#messages').append(util.format('<li><span class="date">%s</span><pre>%s</pre></li>', timestamp(), util.inspect(arguments, false, 4)));
    };
}(jQuery, console));