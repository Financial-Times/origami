'use strict';

module.exports = {
    unCapitalise: function(str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    },

    capitalise: function(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    },

    copyContentFromElement: function(content, callback) {
        var html = content.nodeName === 'SCRIPT' ? content.innerHTML : content.outerHTML;
        callback(html);
    },

    copyContentFromUrl: function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    callback('Content failed to load correctly');
                }
            }
        };
        xhr.onerror = function(e) {
            throw new Error('"o-overlay error": Fetching content from ' + url + ' failed with errror ' + e);
        };

        xhr.send(null);
    },

    getSpacing: function(el, side) {
        // IE uses current Style, other browsers getComputedStyle()
        var elStyle = el.currentStyle || window.getComputedStyle(el);
        return parseInt(elStyle['margin' + this.capitalise(side)], 10) || 0;
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