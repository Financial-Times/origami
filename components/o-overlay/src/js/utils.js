export default {
	unCapitalise: function(str) {
		return str.charAt(0).toLowerCase() + str.substr(1);
	},

	capitalise: function(str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	},

	copyContentFromElement: function(content, callback) {
		const html = content.nodeName === 'SCRIPT' ? content.innerHTML : content.outerHTML;
		callback(html);
	},

	copyContentFromUrl: function(url, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function() { // eslint complains of e not being used
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
		const dashIndex = key.indexOf('-');
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
			const subKey = key.substr(0, dashIndex);

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
		const eClientRect = e.getBoundingClientRect();

		const body = document.body;
		const docElem = document.documentElement;

		// docElem.scrollTop/Left for IE, use body as a last resort
		const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

		// IE sometimes shifts the upper left corner
		const clientTop = docElem.clientTop || body.clientTop || 0;
		const clientLeft = docElem.clientLeft || body.clientLeft || 0;

		return {
			// IE8 doesn't support getBoundingClientRect().height and .weight
			width: eClientRect.width || eClientRect.right - eClientRect.left,
			height: eClientRect.height || eClientRect.bottom - eClientRect.top,
			top: eClientRect.top + scrollTop - clientTop,
			left: eClientRect.left + scrollLeft - clientLeft
		};
	}
};
