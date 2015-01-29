(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isFunction = require('../objects/isFunction'),
    isObject = require('../objects/isObject'),
    now = require('../utilities/now');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeMax = Math.max;

/**
 * Creates a function that will delay the execution of `func` until after
 * `wait` milliseconds have elapsed since the last time it was invoked.
 * Provide an options object to indicate that `func` should be invoked on
 * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
 * to the debounced function will return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
 * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * var lazyLayout = _.debounce(calculateLayout, 150);
 * jQuery(window).on('resize', lazyLayout);
 *
 * // execute `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * });
 *
 * // ensure `batchLog` is executed once after 1 second of debounced calls
 * var source = new EventSource('/stream');
 * source.addEventListener('message', _.debounce(batchLog, 250, {
 *   'maxWait': 1000
 * }, false);
 */
function debounce(func, wait, options) {
  var args,
      maxTimeoutId,
      result,
      stamp,
      thisArg,
      timeoutId,
      trailingCall,
      lastCalled = 0,
      maxWait = false,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  wait = nativeMax(0, wait) || 0;
  if (options === true) {
    var leading = true;
    trailing = false;
  } else if (isObject(options)) {
    leading = options.leading;
    maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  var delayed = function() {
    var remaining = wait - (now() - stamp);
    if (remaining <= 0) {
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      var isCalled = trailingCall;
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (isCalled) {
        lastCalled = now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    } else {
      timeoutId = setTimeout(delayed, remaining);
    }
  };

  var maxDelayed = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    maxTimeoutId = timeoutId = trailingCall = undefined;
    if (trailing || (maxWait !== wait)) {
      lastCalled = now();
      result = func.apply(thisArg, args);
      if (!timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
    }
  };

  return function() {
    args = arguments;
    stamp = now();
    thisArg = this;
    trailingCall = trailing && (timeoutId || !leading);

    if (maxWait === false) {
      var leadingCall = leading && !timeoutId;
    } else {
      if (!maxTimeoutId && !leading) {
        lastCalled = stamp;
      }
      var remaining = maxWait - (stamp - lastCalled),
          isCalled = remaining <= 0;

      if (isCalled) {
        if (maxTimeoutId) {
          maxTimeoutId = clearTimeout(maxTimeoutId);
        }
        lastCalled = stamp;
        result = func.apply(thisArg, args);
      }
      else if (!maxTimeoutId) {
        maxTimeoutId = setTimeout(maxDelayed, remaining);
      }
    }
    if (isCalled && timeoutId) {
      timeoutId = clearTimeout(timeoutId);
    }
    else if (!timeoutId && wait !== maxWait) {
      timeoutId = setTimeout(delayed, wait);
    }
    if (leadingCall) {
      isCalled = true;
      result = func.apply(thisArg, args);
    }
    if (isCalled && !timeoutId && !maxTimeoutId) {
      args = thisArg = null;
    }
    return result;
  };
}

module.exports = debounce;

},{"../objects/isFunction":5,"../objects/isObject":6,"../utilities/now":7}],2:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var debounce = require('./debounce'),
    isFunction = require('../objects/isFunction'),
    isObject = require('../objects/isObject');

/** Used as an internal `_.debounce` options object */
var debounceOptions = {
  'leading': false,
  'maxWait': 0,
  'trailing': false
};

/**
 * Creates a function that, when executed, will only call the `func` function
 * at most once per every `wait` milliseconds. Provide an options object to
 * indicate that `func` should be invoked on the leading and/or trailing edge
 * of the `wait` timeout. Subsequent calls to the throttled function will
 * return the result of the last `func` call.
 *
 * Note: If `leading` and `trailing` options are `true` `func` will be called
 * on the trailing edge of the timeout only if the the throttled function is
 * invoked more than once during the `wait` timeout.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to throttle.
 * @param {number} wait The number of milliseconds to throttle executions to.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // avoid excessively updating the position while scrolling
 * var throttled = _.throttle(updatePosition, 100);
 * jQuery(window).on('scroll', throttled);
 *
 * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
 *   'trailing': false
 * }));
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (!isFunction(func)) {
    throw new TypeError;
  }
  if (options === false) {
    leading = false;
  } else if (isObject(options)) {
    leading = 'leading' in options ? options.leading : leading;
    trailing = 'trailing' in options ? options.trailing : trailing;
  }
  debounceOptions.leading = leading;
  debounceOptions.maxWait = wait;
  debounceOptions.trailing = trailing;

  return debounce(func, wait, debounceOptions);
}

module.exports = throttle;

},{"../objects/isFunction":5,"../objects/isObject":6,"./debounce":1}],3:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],4:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],5:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],6:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('../internals/objectTypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"../internals/objectTypes":4}],7:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../internals/isNative');

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 * (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var stamp = _.now();
 * _.defer(function() { console.log(_.now() - stamp); });
 * // => logs the number of milliseconds it took for the deferred function to be called
 */
var now = isNative(now = Date.now) && now || function() {
  return new Date().getTime();
};

module.exports = now;

},{"../internals/isNative":3}],8:[function(require,module,exports){
/* globals console */
'use strict';

var throttle = require("./../lodash-node/modern/functions/throttle");
var debounce = require("./../lodash-node/modern/functions/debounce");
var body;
var debug;
var initFlags = {};
var intervals = {
	resize: 100,
	orientation: 100,
	scroll: 100
};

function broadcast (eventType, data) {
	if (debug) {
		console.log('o-viewport', eventType, data);
	}
	body.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
		detail: data,
		bubbles: true
	}));
}

var getOrientation = (function () {
	var orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation || undefined;
	if (orientation) {
		return function () {
			return typeof orientation === 'string' ? 
				orientation.split('-')[0] :  
				orientation.type.split('-')[0];
		};
	} else if (window.matchMedia) {
		return function () {
			return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
		};
	} else {
		return function () {
			return window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
		};
	}
})();

var getSize = function () {
	return {
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	};
};

function setThrottleInterval (eventType, interval) {
	if (typeof arguments[0] === 'number') {
		setThrottleInterval('scroll', arguments[0]);
		setThrottleInterval('resize', arguments[1]);
		setThrottleInterval('orientation', arguments[2]);
	} else if (interval) {
		intervals[eventType] = interval;
	}
}

function init(eventType) {
	if (initFlags[eventType]) return true;

	initFlags[eventType] = true;

	body = body || document.body;
}

function listenToResize () {

	if (init('resize')) return;

	window.addEventListener('resize', debounce(function (ev) {
		broadcast('resize', {
			viewport: getSize(),
			originalEvent: ev
		});
	}, intervals.resize));
}

function listenToOrientation () {

	if (init('orientation')) return;

	window.addEventListener('orientationchange', debounce(function (ev) {
		broadcast('orientation', {
			viewport: getSize(),
			orientation: getOrientation(),
			originalEvent: ev
		});
	}, intervals.orientation));
}

function listenToScroll () {

	if (init('scroll')) return;

	window.addEventListener('scroll', throttle(function (ev) {
		broadcast('scroll', {
			viewport: getSize(),
			scrollHeight: body.scrollHeight,
			scrollLeft: (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft,
			scrollTop: (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
			scrollWidth: body.scrollWidth,
			originalEvent: ev
		});
	}, intervals.scroll));
}

function listenTo (eventType) {
	if (eventType === 'resize') {
		listenToResize();
	} else if (eventType === 'scroll') {
		listenToScroll();
	} else if (eventType === 'orientation') {
		listenToOrientation();
	}
}

module.exports = {
	debug: function () {
		debug = true;
	},
	listenTo: listenTo,
	setThrottleInterval: setThrottleInterval,
	getOrientation: getOrientation,
	getSize: getSize
};

},{"./../lodash-node/modern/functions/debounce":1,"./../lodash-node/modern/functions/throttle":2}],9:[function(require,module,exports){
'use strict';

function initDemos() {
	require('../../main');

	document.addEventListener("DOMContentLoaded", function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();

module.exports = initDemos;

},{"../../main":11}],10:[function(require,module,exports){
document.body.addEventListener('oExpander.collapse', function (ev) {
    document.querySelector('.alert').innerHTML = 'Oh no - come back!';
});

document.body.addEventListener('oExpander.expand', function (ev) {
    document.querySelector('.alert').innerHTML = 'Get outta my way!';
})

require('./demo');
},{"./demo":9}],11:[function(require,module,exports){
'use strict';

var toggleSelector = 'button.o-expander__toggle';
var viewport = require("./bower_components/o-viewport/main.js");

var Expander = function (el, opts) {
    viewport.listenTo('resize');
    viewport.listenTo('orientation');
    opts = opts || {};
    opts.shrinkTo = el.dataset.oExpanderShrinkTo || opts.shrinkTo || 'height'; //height or number
    opts.countSelector = el.dataset.oExpanderCountSelector || opts.countSelector;
    opts.contentSelector = el.dataset.oExpanderContentSelector || opts.contentSelector || '.o-expander__content';
    opts.expandedToggleText = el.dataset.oExpanderExpandedToggleText || opts.expandedToggleText || 'less';
    opts.collapsedToggleText = el.dataset.oExpanderCollapsedToggleText || opts.collapsedToggleText || 'more';


    if (/^\d+$/.test(opts.shrinkTo)) {
        opts.shrinkTo = +opts.shrinkTo;
    }
    if (typeof opts.shrinkTo === 'number' && !opts.countSelector) {
        throw('when collapsing to a number of items specify a selector to identify how many items exist');
    }
    this.el = el;
    this.contentEl = this.el.querySelector(opts.contentSelector);
    this.opts = opts;
    this.toggle = this.el.querySelector(toggleSelector);
    if (!this.toggle) {
        throw('this expander needs a toggle button (use a button not a link');
    }

    if (this.opts.shrinkTo === 'height') {
        this.init = this.init.bind(this);
        document.body.addEventListener('oViewport.orientation', this.init);
        document.body.addEventListener('oViewport.resize', this.init);
    }

    this.init(true);
}

Expander.prototype.init = function (isSilent) {
    if (!this.isRequired()) {
        this.el.classList.add('o-expander--inactive');
    } else {
        this.el.classList.remove('o-expander--inactive');
        if (typeof this.opts.shrinkTo === 'number') {
            this.el.querySelectorAll(this.opts.countSelector)[this.opts.shrinkTo - 1].classList.add('o-expander__last-permanent-item');
        }
        if (this.el.getAttribute('aria-expanded')) {
            this.displayState(isSilent);
        } else {
            this.collapse(isSilent);
        }

        this.toggle.addEventListener('click', this.invertState.bind(this));
    }
}

Expander.prototype.isCollapsed = function () {
    var attr = this.el.getAttribute('aria-expanded');
    return !attr || attr === 'false';
}

Expander.prototype.invertState = function () {
    this.isCollapsed() ? this.expand() : this.collapse();
}

Expander.prototype.displayState = function (isSilent) {
    this.isCollapsed() ? this.collapse(isSilent) : this.expand(isSilent);
}

Expander.prototype.expand = function (isSilent) {
    this.el.setAttribute('aria-expanded', true);
    this.toggle.innerHTML = this.opts.expandedToggleText + '<i></i>';
    if (!isSilent) {
        this.emit('expand');
    }
}

Expander.prototype.collapse = function (isSilent) {
    this.el.setAttribute('aria-expanded', false);
    this.toggle.innerHTML = this.opts.collapsedToggleText + '<i></i>';
    if (!isSilent) {
        this.emit('collapse');
    }
}

Expander.prototype.emit = function (name) {
    this.el.dispatchEvent(new CustomEvent('oExpander.' + name, {bubbles: true}));
}

Expander.prototype.isRequired = function () {
    var overflows = false;
    if (typeof this.opts.shrinkTo === 'number') {
        if (this.el.querySelectorAll(this.opts.countSelector).length > this.opts.shrinkTo) {
            overflows = true;
        }
    } else {
        if (this.isCollapsed()) {
            overflows = this.contentEl.clientHeight < this.contentEl.scrollHeight;
        } else {
            this.collapse();
            overflows = this.contentEl.clientHeight < this.contentEl.scrollHeight;
            this.expand();
        }
    }
    return overflows;
}

var init = function(el, opts) {
    if (!el) {
        el = document.body;
    }
    if (!(el instanceof HTMLElement)) {
        el = document.querySelector(el);
    }
    if (/\bo-expander\b/.test(el.getAttribute('data-o-component'))) {
        return new Expander(el, opts);
    }
    return [].map.call(el.querySelectorAll('[data-o-component~="o-expander"]'), function (el) {
        return new Expander(el, opts);
    });
};

var constructAll = function() {
    init();
    document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
    document.addEventListener('o.DOMContentLoaded', constructAll);
}


module.exports = {
    init: init
};
},{"./bower_components/o-viewport/main.js":8}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9vcmlnYW1pLWJ1aWxkLXRvb2xzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2Z1bmN0aW9ucy9kZWJvdW5jZS5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vZnVuY3Rpb25zL3Rocm90dGxlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbHMvaXNOYXRpdmUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFscy9vYmplY3RUeXBlcy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0cy9pc0Z1bmN0aW9uLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3RzL2lzT2JqZWN0LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi91dGlsaXRpZXMvbm93LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL28tdmlld3BvcnQvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvZGVtb3Mvc3JjL2RlbW8uanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2RlbW9zL3NyYy9ldmVudHMuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vb2JqZWN0cy9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9vYmplY3RzL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL25vdycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHNob3J0Y3V0cyBmb3IgbWV0aG9kcyB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcyAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgZGVsYXkgdGhlIGV4ZWN1dGlvbiBvZiBgZnVuY2AgdW50aWwgYWZ0ZXJcbiAqIGB3YWl0YCBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgaXQgd2FzIGludm9rZWQuXG4gKiBQcm92aWRlIGFuIG9wdGlvbnMgb2JqZWN0IHRvIGluZGljYXRlIHRoYXQgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uXG4gKiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFN1YnNlcXVlbnQgY2FsbHNcbiAqIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgY2FsbC5cbiAqXG4gKiBOb3RlOiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgIGBmdW5jYCB3aWxsIGJlIGNhbGxlZFxuICogb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiBpc1xuICogaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0IFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF0gVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGNhbGxlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV0gU3BlY2lmeSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXhcbiAqIHZhciBsYXp5TGF5b3V0ID0gXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCk7XG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgbGF6eUxheW91dCk7XG4gKlxuICogLy8gZXhlY3V0ZSBgc2VuZE1haWxgIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHNcbiAqIGpRdWVyeSgnI3Bvc3Rib3gnKS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSk7XG4gKlxuICogLy8gZW5zdXJlIGBiYXRjaExvZ2AgaXMgZXhlY3V0ZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHNcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7XG4gKiAgICdtYXhXYWl0JzogMTAwMFxuICogfSwgZmFsc2UpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBhcmdzLFxuICAgICAgbWF4VGltZW91dElkLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhbXAsXG4gICAgICB0aGlzQXJnLFxuICAgICAgdGltZW91dElkLFxuICAgICAgdHJhaWxpbmdDYWxsLFxuICAgICAgbGFzdENhbGxlZCA9IDAsXG4gICAgICBtYXhXYWl0ID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgfVxuICB3YWl0ID0gbmF0aXZlTWF4KDAsIHdhaXQpIHx8IDA7XG4gIGlmIChvcHRpb25zID09PSB0cnVlKSB7XG4gICAgdmFyIGxlYWRpbmcgPSB0cnVlO1xuICAgIHRyYWlsaW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heFdhaXQgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucyAmJiAobmF0aXZlTWF4KHdhaXQsIG9wdGlvbnMubWF4V2FpdCkgfHwgMCk7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyBvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgdmFyIGRlbGF5ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3coKSAtIHN0YW1wKTtcbiAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgIGlmIChtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1heFRpbWVvdXRJZCk7XG4gICAgICB9XG4gICAgICB2YXIgaXNDYWxsZWQgPSB0cmFpbGluZ0NhbGw7XG4gICAgICBtYXhUaW1lb3V0SWQgPSB0aW1lb3V0SWQgPSB0cmFpbGluZ0NhbGwgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoaXNDYWxsZWQpIHtcbiAgICAgICAgbGFzdENhbGxlZCA9IG5vdygpO1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXRJZCAmJiAhbWF4VGltZW91dElkKSB7XG4gICAgICAgICAgYXJncyA9IHRoaXNBcmcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZGVsYXllZCwgcmVtYWluaW5nKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG1heERlbGF5ZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICB9XG4gICAgbWF4VGltZW91dElkID0gdGltZW91dElkID0gdHJhaWxpbmdDYWxsID0gdW5kZWZpbmVkO1xuICAgIGlmICh0cmFpbGluZyB8fCAobWF4V2FpdCAhPT0gd2FpdCkpIHtcbiAgICAgIGxhc3RDYWxsZWQgPSBub3coKTtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXRJZCAmJiAhbWF4VGltZW91dElkKSB7XG4gICAgICAgIGFyZ3MgPSB0aGlzQXJnID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgc3RhbXAgPSBub3coKTtcbiAgICB0aGlzQXJnID0gdGhpcztcbiAgICB0cmFpbGluZ0NhbGwgPSB0cmFpbGluZyAmJiAodGltZW91dElkIHx8ICFsZWFkaW5nKTtcblxuICAgIGlmIChtYXhXYWl0ID09PSBmYWxzZSkge1xuICAgICAgdmFyIGxlYWRpbmdDYWxsID0gbGVhZGluZyAmJiAhdGltZW91dElkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIW1heFRpbWVvdXRJZCAmJiAhbGVhZGluZykge1xuICAgICAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgICB9XG4gICAgICB2YXIgcmVtYWluaW5nID0gbWF4V2FpdCAtIChzdGFtcCAtIGxhc3RDYWxsZWQpLFxuICAgICAgICAgIGlzQ2FsbGVkID0gcmVtYWluaW5nIDw9IDA7XG5cbiAgICAgIGlmIChpc0NhbGxlZCkge1xuICAgICAgICBpZiAobWF4VGltZW91dElkKSB7XG4gICAgICAgICAgbWF4VGltZW91dElkID0gY2xlYXJUaW1lb3V0KG1heFRpbWVvdXRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIW1heFRpbWVvdXRJZCkge1xuICAgICAgICBtYXhUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KG1heERlbGF5ZWQsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0NhbGxlZCAmJiB0aW1lb3V0SWQpIHtcbiAgICAgIHRpbWVvdXRJZCA9IGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgIH1cbiAgICBlbHNlIGlmICghdGltZW91dElkICYmIHdhaXQgIT09IG1heFdhaXQpIHtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZGVsYXllZCwgd2FpdCk7XG4gICAgfVxuICAgIGlmIChsZWFkaW5nQ2FsbCkge1xuICAgICAgaXNDYWxsZWQgPSB0cnVlO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICB9XG4gICAgaWYgKGlzQ2FsbGVkICYmICF0aW1lb3V0SWQgJiYgIW1heFRpbWVvdXRJZCkge1xuICAgICAgYXJncyA9IHRoaXNBcmcgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlJyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL29iamVjdHMvaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vb2JqZWN0cy9pc09iamVjdCcpO1xuXG4vKiogVXNlZCBhcyBhbiBpbnRlcm5hbCBgXy5kZWJvdW5jZWAgb3B0aW9ucyBvYmplY3QgKi9cbnZhciBkZWJvdW5jZU9wdGlvbnMgPSB7XG4gICdsZWFkaW5nJzogZmFsc2UsXG4gICdtYXhXYWl0JzogMCxcbiAgJ3RyYWlsaW5nJzogZmFsc2Vcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gZXhlY3V0ZWQsIHdpbGwgb25seSBjYWxsIHRoZSBgZnVuY2AgZnVuY3Rpb25cbiAqIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gUHJvdmlkZSBhbiBvcHRpb25zIG9iamVjdCB0b1xuICogaW5kaWNhdGUgdGhhdCBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2VcbiAqIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGxcbiAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBjYWxsLlxuICpcbiAqIE5vdGU6IElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAgYGZ1bmNgIHdpbGwgYmUgY2FsbGVkXG4gKiBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGlzXG4gKiBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgZXhlY3V0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBhdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKTtcbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIGV4ZWN1dGUgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlc1xuICogalF1ZXJ5KCcuaW50ZXJhY3RpdmUnKS5vbignY2xpY2snLCBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwge1xuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB9XG4gIGlmIChvcHRpb25zID09PSBmYWxzZSkge1xuICAgIGxlYWRpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyBvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgZGVib3VuY2VPcHRpb25zLmxlYWRpbmcgPSBsZWFkaW5nO1xuICBkZWJvdW5jZU9wdGlvbnMubWF4V2FpdCA9IHdhaXQ7XG4gIGRlYm91bmNlT3B0aW9ucy50cmFpbGluZyA9IHRyYWlsaW5nO1xuXG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCBkZWJvdW5jZU9wdGlvbnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGludGVybmFsIFtbQ2xhc3NdXSBvZiB2YWx1ZXMgKi9cbnZhciB0b1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlICovXG52YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgU3RyaW5nKHRvU3RyaW5nKVxuICAgIC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL3RvU3RyaW5nfCBmb3IgW15cXF1dKy9nLCAnLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyAmJiByZU5hdGl2ZS50ZXN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc05hdGl2ZTtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogVXNlZCB0byBkZXRlcm1pbmUgaWYgdmFsdWVzIGFyZSBvZiB0aGUgbGFuZ3VhZ2UgdHlwZSBPYmplY3QgKi9cbnZhciBvYmplY3RUeXBlcyA9IHtcbiAgJ2Jvb2xlYW4nOiBmYWxzZSxcbiAgJ2Z1bmN0aW9uJzogdHJ1ZSxcbiAgJ29iamVjdCc6IHRydWUsXG4gICdudW1iZXInOiBmYWxzZSxcbiAgJ3N0cmluZyc6IGZhbHNlLFxuICAndW5kZWZpbmVkJzogZmFsc2Vcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VHlwZXM7XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBvYmplY3RUeXBlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3RUeXBlcycpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIE9iamVjdC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzIHRoZSBFQ01BU2NyaXB0IGxhbmd1YWdlIHR5cGUgb2YgT2JqZWN0XG4gIC8vIGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4OFxuICAvLyBhbmQgYXZvaWQgYSBWOCBidWdcbiAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MVxuICByZXR1cm4gISEodmFsdWUgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIHZhbHVlXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pc05hdGl2ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIFVuaXggZXBvY2hcbiAqICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzdGFtcCA9IF8ubm93KCk7XG4gKiBfLmRlZmVyKGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApOyB9KTtcbiAqIC8vID0+IGxvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICovXG52YXIgbm93ID0gaXNOYXRpdmUobm93ID0gRGF0ZS5ub3cpICYmIG5vdyB8fCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCIvKiBnbG9iYWxzIGNvbnNvbGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHRocm90dGxlID0gcmVxdWlyZShcIi4vLi4vbG9kYXNoLW5vZGUvbW9kZXJuL2Z1bmN0aW9ucy90aHJvdHRsZVwiKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoXCIuLy4uL2xvZGFzaC1ub2RlL21vZGVybi9mdW5jdGlvbnMvZGVib3VuY2VcIik7XG52YXIgYm9keTtcbnZhciBkZWJ1ZztcbnZhciBpbml0RmxhZ3MgPSB7fTtcbnZhciBpbnRlcnZhbHMgPSB7XG5cdHJlc2l6ZTogMTAwLFxuXHRvcmllbnRhdGlvbjogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuZnVuY3Rpb24gYnJvYWRjYXN0IChldmVudFR5cGUsIGRhdGEpIHtcblx0aWYgKGRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ28tdmlld3BvcnQnLCBldmVudFR5cGUsIGRhdGEpO1xuXHR9XG5cdGJvZHkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29WaWV3cG9ydC4nICsgZXZlbnRUeXBlLCB7XG5cdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdGJ1YmJsZXM6IHRydWVcblx0fSkpO1xufVxuXG52YXIgZ2V0T3JpZW50YXRpb24gPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uIHx8IHdpbmRvdy5zY3JlZW4ubW96T3JpZW50YXRpb24gfHwgd2luZG93LnNjcmVlbi5tc09yaWVudGF0aW9uIHx8IHVuZGVmaW5lZDtcblx0aWYgKG9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0eXBlb2Ygb3JpZW50YXRpb24gPT09ICdzdHJpbmcnID8gXG5cdFx0XHRcdG9yaWVudGF0aW9uLnNwbGl0KCctJylbMF0gOiAgXG5cdFx0XHRcdG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0XHR9O1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LmlubmVyV2lkdGggPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdFx0fTtcblx0fVxufSkoKTtcblxudmFyIGdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCksXG5cdFx0d2lkdGg6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMClcblx0fTtcbn07XG5cbmZ1bmN0aW9uIHNldFRocm90dGxlSW50ZXJ2YWwgKGV2ZW50VHlwZSwgaW50ZXJ2YWwpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgYXJndW1lbnRzWzBdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCBhcmd1bWVudHNbMV0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgYXJndW1lbnRzWzJdKTtcblx0fSBlbHNlIGlmIChpbnRlcnZhbCkge1xuXHRcdGludGVydmFsc1tldmVudFR5cGVdID0gaW50ZXJ2YWw7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5pdChldmVudFR5cGUpIHtcblx0aWYgKGluaXRGbGFnc1tldmVudFR5cGVdKSByZXR1cm4gdHJ1ZTtcblxuXHRpbml0RmxhZ3NbZXZlbnRUeXBlXSA9IHRydWU7XG5cblx0Ym9keSA9IGJvZHkgfHwgZG9jdW1lbnQuYm9keTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9SZXNpemUgKCkge1xuXG5cdGlmIChpbml0KCdyZXNpemUnKSkgcmV0dXJuO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShmdW5jdGlvbiAoZXYpIHtcblx0XHRicm9hZGNhc3QoJ3Jlc2l6ZScsIHtcblx0XHRcdHZpZXdwb3J0OiBnZXRTaXplKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMucmVzaXplKSk7XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvT3JpZW50YXRpb24gKCkge1xuXG5cdGlmIChpbml0KCdvcmllbnRhdGlvbicpKSByZXR1cm47XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgZGVib3VuY2UoZnVuY3Rpb24gKGV2KSB7XG5cdFx0YnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiBnZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbikpO1xufVxuXG5mdW5jdGlvbiBsaXN0ZW5Ub1Njcm9sbCAoKSB7XG5cblx0aWYgKGluaXQoJ3Njcm9sbCcpKSByZXR1cm47XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlKGZ1bmN0aW9uIChldikge1xuXHRcdGJyb2FkY2FzdCgnc2Nyb2xsJywge1xuXHRcdFx0dmlld3BvcnQ6IGdldFNpemUoKSxcblx0XHRcdHNjcm9sbEhlaWdodDogYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0XHRzY3JvbGxMZWZ0OiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogYm9keS5zY3JvbGxXaWR0aCxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5zY3JvbGwpKTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG8gKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJykge1xuXHRcdGxpc3RlblRvUmVzaXplKCk7XG5cdH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnc2Nyb2xsJykge1xuXHRcdGxpc3RlblRvU2Nyb2xsKCk7XG5cdH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnb3JpZW50YXRpb24nKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0bGlzdGVuVG86IGxpc3RlblRvLFxuXHRzZXRUaHJvdHRsZUludGVydmFsOiBzZXRUaHJvdHRsZUludGVydmFsLFxuXHRnZXRPcmllbnRhdGlvbjogZ2V0T3JpZW50YXRpb24sXG5cdGdldFNpemU6IGdldFNpemVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGluaXREZW1vcygpIHtcblx0cmVxdWlyZSgnLi4vLi4vbWFpbicpO1xuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG5cdH0pO1xufVxuXG5pbml0RGVtb3MoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbml0RGVtb3M7XG4iLCJkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29FeHBhbmRlci5jb2xsYXBzZScsIGZ1bmN0aW9uIChldikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpLmlubmVySFRNTCA9ICdPaCBubyAtIGNvbWUgYmFjayEnO1xufSk7XG5cbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb0V4cGFuZGVyLmV4cGFuZCcsIGZ1bmN0aW9uIChldikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydCcpLmlubmVySFRNTCA9ICdHZXQgb3V0dGEgbXkgd2F5ISc7XG59KVxuXG5yZXF1aXJlKCcuL2RlbW8nKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b2dnbGVTZWxlY3RvciA9ICdidXR0b24uby1leHBhbmRlcl9fdG9nZ2xlJztcbnZhciB2aWV3cG9ydCA9IHJlcXVpcmUoXCIuL2Jvd2VyX2NvbXBvbmVudHMvby12aWV3cG9ydC9tYWluLmpzXCIpO1xuXG52YXIgRXhwYW5kZXIgPSBmdW5jdGlvbiAoZWwsIG9wdHMpIHtcbiAgICB2aWV3cG9ydC5saXN0ZW5UbygncmVzaXplJyk7XG4gICAgdmlld3BvcnQubGlzdGVuVG8oJ29yaWVudGF0aW9uJyk7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgb3B0cy5zaHJpbmtUbyA9IGVsLmRhdGFzZXQub0V4cGFuZGVyU2hyaW5rVG8gfHwgb3B0cy5zaHJpbmtUbyB8fCAnaGVpZ2h0JzsgLy9oZWlnaHQgb3IgbnVtYmVyXG4gICAgb3B0cy5jb3VudFNlbGVjdG9yID0gZWwuZGF0YXNldC5vRXhwYW5kZXJDb3VudFNlbGVjdG9yIHx8IG9wdHMuY291bnRTZWxlY3RvcjtcbiAgICBvcHRzLmNvbnRlbnRTZWxlY3RvciA9IGVsLmRhdGFzZXQub0V4cGFuZGVyQ29udGVudFNlbGVjdG9yIHx8IG9wdHMuY29udGVudFNlbGVjdG9yIHx8ICcuby1leHBhbmRlcl9fY29udGVudCc7XG4gICAgb3B0cy5leHBhbmRlZFRvZ2dsZVRleHQgPSBlbC5kYXRhc2V0Lm9FeHBhbmRlckV4cGFuZGVkVG9nZ2xlVGV4dCB8fCBvcHRzLmV4cGFuZGVkVG9nZ2xlVGV4dCB8fCAnbGVzcyc7XG4gICAgb3B0cy5jb2xsYXBzZWRUb2dnbGVUZXh0ID0gZWwuZGF0YXNldC5vRXhwYW5kZXJDb2xsYXBzZWRUb2dnbGVUZXh0IHx8IG9wdHMuY29sbGFwc2VkVG9nZ2xlVGV4dCB8fCAnbW9yZSc7XG5cblxuICAgIGlmICgvXlxcZCskLy50ZXN0KG9wdHMuc2hyaW5rVG8pKSB7XG4gICAgICAgIG9wdHMuc2hyaW5rVG8gPSArb3B0cy5zaHJpbmtUbztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLnNocmlua1RvID09PSAnbnVtYmVyJyAmJiAhb3B0cy5jb3VudFNlbGVjdG9yKSB7XG4gICAgICAgIHRocm93KCd3aGVuIGNvbGxhcHNpbmcgdG8gYSBudW1iZXIgb2YgaXRlbXMgc3BlY2lmeSBhIHNlbGVjdG9yIHRvIGlkZW50aWZ5IGhvdyBtYW55IGl0ZW1zIGV4aXN0Jyk7XG4gICAgfVxuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmNvbnRlbnRFbCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihvcHRzLmNvbnRlbnRTZWxlY3Rvcik7XG4gICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB0aGlzLnRvZ2dsZSA9IHRoaXMuZWwucXVlcnlTZWxlY3Rvcih0b2dnbGVTZWxlY3Rvcik7XG4gICAgaWYgKCF0aGlzLnRvZ2dsZSkge1xuICAgICAgICB0aHJvdygndGhpcyBleHBhbmRlciBuZWVkcyBhIHRvZ2dsZSBidXR0b24gKHVzZSBhIGJ1dHRvbiBub3QgYSBsaW5rJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0cy5zaHJpbmtUbyA9PT0gJ2hlaWdodCcpIHtcbiAgICAgICAgdGhpcy5pbml0ID0gdGhpcy5pbml0LmJpbmQodGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgdGhpcy5pbml0KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQucmVzaXplJywgdGhpcy5pbml0KTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXQodHJ1ZSk7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKGlzU2lsZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzUmVxdWlyZWQoKSkge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ28tZXhwYW5kZXItLWluYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdvLWV4cGFuZGVyLS1pbmFjdGl2ZScpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5zaHJpbmtUbyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdHMuY291bnRTZWxlY3RvcilbdGhpcy5vcHRzLnNocmlua1RvIC0gMV0uY2xhc3NMaXN0LmFkZCgnby1leHBhbmRlcl9fbGFzdC1wZXJtYW5lbnQtaXRlbScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdGF0ZShpc1NpbGVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGlzU2lsZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5pbnZlcnRTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pc0NvbGxhcHNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0ciA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgcmV0dXJuICFhdHRyIHx8IGF0dHIgPT09ICdmYWxzZSc7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pbnZlcnRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzQ29sbGFwc2VkKCkgPyB0aGlzLmV4cGFuZCgpIDogdGhpcy5jb2xsYXBzZSgpO1xufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuZGlzcGxheVN0YXRlID0gZnVuY3Rpb24gKGlzU2lsZW50KSB7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCgpID8gdGhpcy5jb2xsYXBzZShpc1NpbGVudCkgOiB0aGlzLmV4cGFuZChpc1NpbGVudCk7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5leHBhbmQgPSBmdW5jdGlvbiAoaXNTaWxlbnQpIHtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIHRoaXMudG9nZ2xlLmlubmVySFRNTCA9IHRoaXMub3B0cy5leHBhbmRlZFRvZ2dsZVRleHQgKyAnPGk+PC9pPic7XG4gICAgaWYgKCFpc1NpbGVudCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2V4cGFuZCcpO1xuICAgIH1cbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmNvbGxhcHNlID0gZnVuY3Rpb24gKGlzU2lsZW50KSB7XG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgdGhpcy50b2dnbGUuaW5uZXJIVE1MID0gdGhpcy5vcHRzLmNvbGxhcHNlZFRvZ2dsZVRleHQgKyAnPGk+PC9pPic7XG4gICAgaWYgKCFpc1NpbGVudCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2NvbGxhcHNlJyk7XG4gICAgfVxufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb0V4cGFuZGVyLicgKyBuYW1lLCB7YnViYmxlczogdHJ1ZX0pKTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG92ZXJmbG93cyA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAodGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0cy5jb3VudFNlbGVjdG9yKS5sZW5ndGggPiB0aGlzLm9wdHMuc2hyaW5rVG8pIHtcbiAgICAgICAgICAgIG92ZXJmbG93cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc0NvbGxhcHNlZCgpKSB7XG4gICAgICAgICAgICBvdmVyZmxvd3MgPSB0aGlzLmNvbnRlbnRFbC5jbGllbnRIZWlnaHQgPCB0aGlzLmNvbnRlbnRFbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgICAgICBvdmVyZmxvd3MgPSB0aGlzLmNvbnRlbnRFbC5jbGllbnRIZWlnaHQgPCB0aGlzLmNvbnRlbnRFbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdmVyZmxvd3M7XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24oZWwsIG9wdHMpIHtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG4gICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICB9XG4gICAgaWYgKC9cXGJvLWV4cGFuZGVyXFxiLy50ZXN0KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcpKSkge1xuICAgICAgICByZXR1cm4gbmV3IEV4cGFuZGVyKGVsLCBvcHRzKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50fj1cIm8tZXhwYW5kZXJcIl0nKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhwYW5kZXIoZWwsIG9wdHMpO1xuICAgIH0pO1xufTtcblxudmFyIGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGluaXQoKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBpbml0XG59OyJdfQ==
