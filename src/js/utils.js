'use strict';

module.exports = {
    unCapitalise: function(str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    },

    capitalise: function(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    },

    copyContent: function(content) {
        return content.nodeName === 'SCRIPT' ? content.innerHTML: content.outerHTML;
    },

    copyContentFromUrl: function(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);

        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            return '';
        }
    },

    getSpacing: function(el, side) {
        return parseInt(el.style['margin' + this.capitalise(side)], 10) || 0;
    },

    optionsFromKey: function(key, value, opts) {
        var dashIndex = key.indexOf('-');
        if (dashIndex === -1) {
            try {
                // If it's a JSON, a boolean or a number, we want it stored like that, and not as a string
                // We also replace all ' with " so JSON strings are parsed correctly
                opts[key] = JSON.parse(value.replace(/\'/g, '"'));
            } catch (e) {
                opts[key] = value;
            }
        } else {
            // Key that holds an object instead of a value
            var subKey = key.substr(0, dashIndex);

            // If sub-object doesn't exist already, create it
            if (!opts[subKey]){
                opts[subKey] = {};
            }
            
            // Run function again starting with the rest of the key
            opts[subKey] = this.optionsFromKey(key.substr(dashIndex+1), value, opts[subKey]);
        }

        return opts;
    }
};