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
	},

	// Code based on this article to get coordinates independent of scroll: http://javascript.info/tutorial/coordinates
	getOffsetRect: function(e) {
		var eClientRect = e.getBoundingClientRect();

		var body = document.body;
		var docElem = document.documentElement;

		// docElem.scrollTop/Left for IE, use body as a last resort
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

		// IE sometimes shifts the upper left corner
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;

		return {
			// IE8 doesn't support getBoundingClientRect().height and .weight
			width: eClientRect.width || eClientRect.right - eClientRect.left,
			height: eClientRect.height || eClientRect.bottom - eClientRect.top,
			top: eClientRect.top + scrollTop - clientTop,
			left: eClientRect.left + scrollLeft - clientLeft
		};
	}
};
