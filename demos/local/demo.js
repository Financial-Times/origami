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

},{"../../main":10}],10:[function(require,module,exports){
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
},{"./bower_components/o-viewport/main.js":8}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9vcmlnYW1pLWJ1aWxkLXRvb2xzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2Z1bmN0aW9ucy9kZWJvdW5jZS5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vZnVuY3Rpb25zL3Rocm90dGxlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbHMvaXNOYXRpdmUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFscy9vYmplY3RUeXBlcy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0cy9pc0Z1bmN0aW9uLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3RzL2lzT2JqZWN0LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi91dGlsaXRpZXMvbm93LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL28tdmlld3BvcnQvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvZGVtb3Mvc3JjL2RlbW8uanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9vYmplY3RzL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL29iamVjdHMvaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvbm93Jyk7XG5cbi8qIE5hdGl2ZSBtZXRob2Qgc2hvcnRjdXRzIGZvciBtZXRob2RzIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBkZWxheSB0aGUgZXhlY3V0aW9uIG9mIGBmdW5jYCB1bnRpbCBhZnRlclxuICogYHdhaXRgIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSBpdCB3YXMgaW52b2tlZC5cbiAqIFByb3ZpZGUgYW4gb3B0aW9ucyBvYmplY3QgdG8gaW5kaWNhdGUgdGhhdCBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb25cbiAqIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gU3Vic2VxdWVudCBjYWxsc1xuICogdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBjYWxsLlxuICpcbiAqIE5vdGU6IElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAgYGZ1bmNgIHdpbGwgYmUgY2FsbGVkXG4gKiBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIGlzXG4gKiBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV0gU3BlY2lmeSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XSBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgY2FsbGVkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXSBTcGVjaWZ5IGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gYXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eFxuICogdmFyIGxhenlMYXlvdXQgPSBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKTtcbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBsYXp5TGF5b3V0KTtcbiAqXG4gKiAvLyBleGVjdXRlIGBzZW5kTWFpbGAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxsc1xuICogalF1ZXJ5KCcjcG9zdGJveCcpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KTtcbiAqXG4gKiAvLyBlbnN1cmUgYGJhdGNoTG9nYCBpcyBleGVjdXRlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxsc1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHtcbiAqICAgJ21heFdhaXQnOiAxMDAwXG4gKiB9LCBmYWxzZSk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGFyZ3MsXG4gICAgICBtYXhUaW1lb3V0SWQsXG4gICAgICByZXN1bHQsXG4gICAgICBzdGFtcCxcbiAgICAgIHRoaXNBcmcsXG4gICAgICB0aW1lb3V0SWQsXG4gICAgICB0cmFpbGluZ0NhbGwsXG4gICAgICBsYXN0Q2FsbGVkID0gMCxcbiAgICAgIG1heFdhaXQgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB9XG4gIHdhaXQgPSBuYXRpdmVNYXgoMCwgd2FpdCkgfHwgMDtcbiAgaWYgKG9wdGlvbnMgPT09IHRydWUpIHtcbiAgICB2YXIgbGVhZGluZyA9IHRydWU7XG4gICAgdHJhaWxpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSBvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4V2FpdCA9ICdtYXhXYWl0JyBpbiBvcHRpb25zICYmIChuYXRpdmVNYXgod2FpdCwgb3B0aW9ucy5tYXhXYWl0KSB8fCAwKTtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICB2YXIgZGVsYXllZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdygpIC0gc3RhbXApO1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgaWYgKG1heFRpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobWF4VGltZW91dElkKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc0NhbGxlZCA9IHRyYWlsaW5nQ2FsbDtcbiAgICAgIG1heFRpbWVvdXRJZCA9IHRpbWVvdXRJZCA9IHRyYWlsaW5nQ2FsbCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChpc0NhbGxlZCkge1xuICAgICAgICBsYXN0Q2FsbGVkID0gbm93KCk7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dElkICYmICFtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgICBhcmdzID0gdGhpc0FyZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChkZWxheWVkLCByZW1haW5pbmcpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbWF4RGVsYXllZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgIH1cbiAgICBtYXhUaW1lb3V0SWQgPSB0aW1lb3V0SWQgPSB0cmFpbGluZ0NhbGwgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRyYWlsaW5nIHx8IChtYXhXYWl0ICE9PSB3YWl0KSkge1xuICAgICAgbGFzdENhbGxlZCA9IG5vdygpO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dElkICYmICFtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgYXJncyA9IHRoaXNBcmcgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBzdGFtcCA9IG5vdygpO1xuICAgIHRoaXNBcmcgPSB0aGlzO1xuICAgIHRyYWlsaW5nQ2FsbCA9IHRyYWlsaW5nICYmICh0aW1lb3V0SWQgfHwgIWxlYWRpbmcpO1xuXG4gICAgaWYgKG1heFdhaXQgPT09IGZhbHNlKSB7XG4gICAgICB2YXIgbGVhZGluZ0NhbGwgPSBsZWFkaW5nICYmICF0aW1lb3V0SWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghbWF4VGltZW91dElkICYmICFsZWFkaW5nKSB7XG4gICAgICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICAgIH1cbiAgICAgIHZhciByZW1haW5pbmcgPSBtYXhXYWl0IC0gKHN0YW1wIC0gbGFzdENhbGxlZCksXG4gICAgICAgICAgaXNDYWxsZWQgPSByZW1haW5pbmcgPD0gMDtcblxuICAgICAgaWYgKGlzQ2FsbGVkKSB7XG4gICAgICAgIGlmIChtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgICBtYXhUaW1lb3V0SWQgPSBjbGVhclRpbWVvdXQobWF4VGltZW91dElkKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghbWF4VGltZW91dElkKSB7XG4gICAgICAgIG1heFRpbWVvdXRJZCA9IHNldFRpbWVvdXQobWF4RGVsYXllZCwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQ2FsbGVkICYmIHRpbWVvdXRJZCkge1xuICAgICAgdGltZW91dElkID0gY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aW1lb3V0SWQgJiYgd2FpdCAhPT0gbWF4V2FpdCkge1xuICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChkZWxheWVkLCB3YWl0KTtcbiAgICB9XG4gICAgaWYgKGxlYWRpbmdDYWxsKSB7XG4gICAgICBpc0NhbGxlZCA9IHRydWU7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIH1cbiAgICBpZiAoaXNDYWxsZWQgJiYgIXRpbWVvdXRJZCAmJiAhbWF4VGltZW91dElkKSB7XG4gICAgICBhcmdzID0gdGhpc0FyZyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vb2JqZWN0cy9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9vYmplY3RzL2lzT2JqZWN0Jyk7XG5cbi8qKiBVc2VkIGFzIGFuIGludGVybmFsIGBfLmRlYm91bmNlYCBvcHRpb25zIG9iamVjdCAqL1xudmFyIGRlYm91bmNlT3B0aW9ucyA9IHtcbiAgJ2xlYWRpbmcnOiBmYWxzZSxcbiAgJ21heFdhaXQnOiAwLFxuICAndHJhaWxpbmcnOiBmYWxzZVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBleGVjdXRlZCwgd2lsbCBvbmx5IGNhbGwgdGhlIGBmdW5jYCBmdW5jdGlvblxuICogYXQgbW9zdCBvbmNlIHBlciBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBQcm92aWRlIGFuIG9wdGlvbnMgb2JqZWN0IHRvXG4gKiBpbmRpY2F0ZSB0aGF0IGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZVxuICogb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbFxuICogcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGNhbGwuXG4gKlxuICogTm90ZTogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCBgZnVuY2Agd2lsbCBiZSBjYWxsZWRcbiAqIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gaXNcbiAqIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBleGVjdXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV0gU3BlY2lmeSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV0gU3BlY2lmeSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmdcbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApO1xuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIHRocm90dGxlZCk7XG4gKlxuICogLy8gZXhlY3V0ZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzXG4gKiBqUXVlcnkoJy5pbnRlcmFjdGl2ZScpLm9uKCdjbGljaycsIF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7XG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgaWYgKG9wdGlvbnMgPT09IGZhbHNlKSB7XG4gICAgbGVhZGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/IG9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICBkZWJvdW5jZU9wdGlvbnMubGVhZGluZyA9IGxlYWRpbmc7XG4gIGRlYm91bmNlT3B0aW9ucy5tYXhXYWl0ID0gd2FpdDtcbiAgZGVib3VuY2VPcHRpb25zLnRyYWlsaW5nID0gdHJhaWxpbmc7XG5cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGRlYm91bmNlT3B0aW9ucyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgaW50ZXJuYWwgW1tDbGFzc11dIG9mIHZhbHVlcyAqL1xudmFyIHRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUgKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBTdHJpbmcodG9TdHJpbmcpXG4gICAgLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvdG9TdHJpbmd8IGZvciBbXlxcXV0rL2csICcuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nICYmIHJlTmF0aXZlLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIHRvIGRldGVybWluZSBpZiB2YWx1ZXMgYXJlIG9mIHRoZSBsYW5ndWFnZSB0eXBlIE9iamVjdCAqL1xudmFyIG9iamVjdFR5cGVzID0ge1xuICAnYm9vbGVhbic6IGZhbHNlLFxuICAnZnVuY3Rpb24nOiB0cnVlLFxuICAnb2JqZWN0JzogdHJ1ZSxcbiAgJ251bWJlcic6IGZhbHNlLFxuICAnc3RyaW5nJzogZmFsc2UsXG4gICd1bmRlZmluZWQnOiBmYWxzZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUeXBlcztcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RzXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbic7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIG9iamVjdFR5cGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdFR5cGVzJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgT2JqZWN0LlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RzXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBjaGVjayBpZiB0aGUgdmFsdWUgaXMgdGhlIEVDTUFTY3JpcHQgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3RcbiAgLy8gaHR0cDovL2VzNS5naXRodWIuaW8vI3g4XG4gIC8vIGFuZCBhdm9pZCBhIFY4IGJ1Z1xuICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxXG4gIHJldHVybiAhISh2YWx1ZSAmJiBvYmplY3RUeXBlc1t0eXBlb2YgdmFsdWVdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzTmF0aXZlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgVW5peCBlcG9jaFxuICogKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHN0YW1wID0gXy5ub3coKTtcbiAqIF8uZGVmZXIoZnVuY3Rpb24oKSB7IGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7IH0pO1xuICogLy8gPT4gbG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gKi9cbnZhciBub3cgPSBpc05hdGl2ZShub3cgPSBEYXRlLm5vdykgJiYgbm93IHx8IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsIi8qIGdsb2JhbHMgY29uc29sZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKFwiLi8uLi9sb2Rhc2gtbm9kZS9tb2Rlcm4vZnVuY3Rpb25zL3Rocm90dGxlXCIpO1xudmFyIGRlYm91bmNlID0gcmVxdWlyZShcIi4vLi4vbG9kYXNoLW5vZGUvbW9kZXJuL2Z1bmN0aW9ucy9kZWJvdW5jZVwiKTtcbnZhciBib2R5O1xudmFyIGRlYnVnO1xudmFyIGluaXRGbGFncyA9IHt9O1xudmFyIGludGVydmFscyA9IHtcblx0cmVzaXplOiAxMDAsXG5cdG9yaWVudGF0aW9uOiAxMDAsXG5cdHNjcm9sbDogMTAwXG59O1xuXG5mdW5jdGlvbiBicm9hZGNhc3QgKGV2ZW50VHlwZSwgZGF0YSkge1xuXHRpZiAoZGVidWcpIHtcblx0XHRjb25zb2xlLmxvZygnby12aWV3cG9ydCcsIGV2ZW50VHlwZSwgZGF0YSk7XG5cdH1cblx0Ym9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbnZhciBnZXRPcmllbnRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBvcmllbnRhdGlvbiA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb24gfHwgd2luZG93LnNjcmVlbi5tb3pPcmllbnRhdGlvbiB8fCB3aW5kb3cuc2NyZWVuLm1zT3JpZW50YXRpb24gfHwgdW5kZWZpbmVkO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHR5cGVvZiBvcmllbnRhdGlvbiA9PT0gJ3N0cmluZycgPyBcblx0XHRcdFx0b3JpZW50YXRpb24uc3BsaXQoJy0nKVswXSA6ICBcblx0XHRcdFx0b3JpZW50YXRpb24udHlwZS5zcGxpdCgnLScpWzBdO1xuXHRcdH07XG5cdH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXMgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCA+PSB3aW5kb3cuaW5uZXJXaWR0aCA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0XHR9O1xuXHR9XG59KSgpO1xuXG52YXIgZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSxcblx0XHR3aWR0aDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKVxuXHR9O1xufTtcblxuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbCAoZXZlbnRUeXBlLCBpbnRlcnZhbCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCBhcmd1bWVudHNbMF0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIGFyZ3VtZW50c1sxXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCBhcmd1bWVudHNbMl0pO1xuXHR9IGVsc2UgaWYgKGludGVydmFsKSB7XG5cdFx0aW50ZXJ2YWxzW2V2ZW50VHlwZV0gPSBpbnRlcnZhbDtcblx0fVxufVxuXG5mdW5jdGlvbiBpbml0KGV2ZW50VHlwZSkge1xuXHRpZiAoaW5pdEZsYWdzW2V2ZW50VHlwZV0pIHJldHVybiB0cnVlO1xuXG5cdGluaXRGbGFnc1tldmVudFR5cGVdID0gdHJ1ZTtcblxuXHRib2R5ID0gYm9keSB8fCBkb2N1bWVudC5ib2R5O1xufVxuXG5mdW5jdGlvbiBsaXN0ZW5Ub1Jlc2l6ZSAoKSB7XG5cblx0aWYgKGluaXQoJ3Jlc2l6ZScpKSByZXR1cm47XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKGZ1bmN0aW9uIChldikge1xuXHRcdGJyb2FkY2FzdCgncmVzaXplJywge1xuXHRcdFx0dmlld3BvcnQ6IGdldFNpemUoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5yZXNpemUpKTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbiAoKSB7XG5cblx0aWYgKGluaXQoJ29yaWVudGF0aW9uJykpIHJldHVybjtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBkZWJvdW5jZShmdW5jdGlvbiAoZXYpIHtcblx0XHRicm9hZGNhc3QoJ29yaWVudGF0aW9uJywge1xuXHRcdFx0dmlld3BvcnQ6IGdldFNpemUoKSxcblx0XHRcdG9yaWVudGF0aW9uOiBnZXRPcmllbnRhdGlvbigpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLm9yaWVudGF0aW9uKSk7XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsICgpIHtcblxuXHRpZiAoaW5pdCgnc2Nyb2xsJykpIHJldHVybjtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGUoZnVuY3Rpb24gKGV2KSB7XG5cdFx0YnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBib2R5LnNjcm9sbEhlaWdodCxcblx0XHRcdHNjcm9sbExlZnQ6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCxcblx0XHRcdHNjcm9sbFRvcDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcblx0XHRcdHNjcm9sbFdpZHRoOiBib2R5LnNjcm9sbFdpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCkpO1xufVxuXG5mdW5jdGlvbiBsaXN0ZW5UbyAoZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdyZXNpemUnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fSBlbHNlIGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnKSB7XG5cdFx0bGlzdGVuVG9TY3JvbGwoKTtcblx0fSBlbHNlIGlmIChldmVudFR5cGUgPT09ICdvcmllbnRhdGlvbicpIHtcblx0XHRsaXN0ZW5Ub09yaWVudGF0aW9uKCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGRlYnVnOiBmdW5jdGlvbiAoKSB7XG5cdFx0ZGVidWcgPSB0cnVlO1xuXHR9LFxuXHRsaXN0ZW5UbzogbGlzdGVuVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWw6IHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiBnZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogZ2V0U2l6ZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gaW5pdERlbW9zKCkge1xuXHRyZXF1aXJlKCcuLi8uLi9tYWluJyk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcblx0fSk7XG59XG5cbmluaXREZW1vcygpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXREZW1vcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvZ2dsZVNlbGVjdG9yID0gJ2J1dHRvbi5vLWV4cGFuZGVyX190b2dnbGUnO1xudmFyIHZpZXdwb3J0ID0gcmVxdWlyZShcIi4vYm93ZXJfY29tcG9uZW50cy9vLXZpZXdwb3J0L21haW4uanNcIik7XG5cbnZhciBFeHBhbmRlciA9IGZ1bmN0aW9uIChlbCwgb3B0cykge1xuICAgIHZpZXdwb3J0Lmxpc3RlblRvKCdyZXNpemUnKTtcbiAgICB2aWV3cG9ydC5saXN0ZW5Ubygnb3JpZW50YXRpb24nKTtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBvcHRzLnNocmlua1RvID0gZWwuZGF0YXNldC5vRXhwYW5kZXJTaHJpbmtUbyB8fCBvcHRzLnNocmlua1RvIHx8ICdoZWlnaHQnOyAvL2hlaWdodCBvciBudW1iZXJcbiAgICBvcHRzLmNvdW50U2VsZWN0b3IgPSBlbC5kYXRhc2V0Lm9FeHBhbmRlckNvdW50U2VsZWN0b3IgfHwgb3B0cy5jb3VudFNlbGVjdG9yO1xuICAgIG9wdHMuY29udGVudFNlbGVjdG9yID0gZWwuZGF0YXNldC5vRXhwYW5kZXJDb250ZW50U2VsZWN0b3IgfHwgb3B0cy5jb250ZW50U2VsZWN0b3IgfHwgJy5vLWV4cGFuZGVyX19jb250ZW50JztcbiAgICBvcHRzLmV4cGFuZGVkVG9nZ2xlVGV4dCA9IGVsLmRhdGFzZXQub0V4cGFuZGVyRXhwYW5kZWRUb2dnbGVUZXh0IHx8IG9wdHMuZXhwYW5kZWRUb2dnbGVUZXh0IHx8ICdsZXNzJztcbiAgICBvcHRzLmNvbGxhcHNlZFRvZ2dsZVRleHQgPSBlbC5kYXRhc2V0Lm9FeHBhbmRlckNvbGxhcHNlZFRvZ2dsZVRleHQgfHwgb3B0cy5jb2xsYXBzZWRUb2dnbGVUZXh0IHx8ICdtb3JlJztcblxuXG4gICAgaWYgKC9eXFxkKyQvLnRlc3Qob3B0cy5zaHJpbmtUbykpIHtcbiAgICAgICAgb3B0cy5zaHJpbmtUbyA9ICtvcHRzLnNocmlua1RvO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuc2hyaW5rVG8gPT09ICdudW1iZXInICYmICFvcHRzLmNvdW50U2VsZWN0b3IpIHtcbiAgICAgICAgdGhyb3coJ3doZW4gY29sbGFwc2luZyB0byBhIG51bWJlciBvZiBpdGVtcyBzcGVjaWZ5IGEgc2VsZWN0b3IgdG8gaWRlbnRpZnkgaG93IG1hbnkgaXRlbXMgZXhpc3QnKTtcbiAgICB9XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMuY29udGVudEVsID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKG9wdHMuY29udGVudFNlbGVjdG9yKTtcbiAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIHRoaXMudG9nZ2xlID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKHRvZ2dsZVNlbGVjdG9yKTtcbiAgICBpZiAoIXRoaXMudG9nZ2xlKSB7XG4gICAgICAgIHRocm93KCd0aGlzIGV4cGFuZGVyIG5lZWRzIGEgdG9nZ2xlIGJ1dHRvbiAodXNlIGEgYnV0dG9uIG5vdCBhIGxpbmsnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRzLnNocmlua1RvID09PSAnaGVpZ2h0Jykge1xuICAgICAgICB0aGlzLmluaXQgPSB0aGlzLmluaXQuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCB0aGlzLmluaXQpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5yZXNpemUnLCB0aGlzLmluaXQpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdCh0cnVlKTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoaXNTaWxlbnQpIHtcbiAgICBpZiAoIXRoaXMuaXNSZXF1aXJlZCgpKSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnby1leHBhbmRlci0taW5hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tZXhwYW5kZXItLWluYWN0aXZlJyk7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0cy5jb3VudFNlbGVjdG9yKVt0aGlzLm9wdHMuc2hyaW5rVG8gLSAxXS5jbGFzc0xpc3QuYWRkKCdvLWV4cGFuZGVyX19sYXN0LXBlcm1hbmVudC1pdGVtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVN0YXRlKGlzU2lsZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoaXNTaWxlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmludmVydFN0YXRlLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmlzQ29sbGFwc2VkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdHRyID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICByZXR1cm4gIWF0dHIgfHwgYXR0ciA9PT0gJ2ZhbHNlJztcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmludmVydFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNDb2xsYXBzZWQoKSA/IHRoaXMuZXhwYW5kKCkgOiB0aGlzLmNvbGxhcHNlKCk7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5kaXNwbGF5U3RhdGUgPSBmdW5jdGlvbiAoaXNTaWxlbnQpIHtcbiAgICB0aGlzLmlzQ29sbGFwc2VkKCkgPyB0aGlzLmNvbGxhcHNlKGlzU2lsZW50KSA6IHRoaXMuZXhwYW5kKGlzU2lsZW50KTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uIChpc1NpbGVudCkge1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgdGhpcy50b2dnbGUuaW5uZXJIVE1MID0gdGhpcy5vcHRzLmV4cGFuZGVkVG9nZ2xlVGV4dCArICc8aT48L2k+JztcbiAgICBpZiAoIWlzU2lsZW50KSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZXhwYW5kJyk7XG4gICAgfVxufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuY29sbGFwc2UgPSBmdW5jdGlvbiAoaXNTaWxlbnQpIHtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB0aGlzLnRvZ2dsZS5pbm5lckhUTUwgPSB0aGlzLm9wdHMuY29sbGFwc2VkVG9nZ2xlVGV4dCArICc8aT48L2k+JztcbiAgICBpZiAoIWlzU2lsZW50KSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY29sbGFwc2UnKTtcbiAgICB9XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvRXhwYW5kZXIuJyArIG5hbWUsIHtidWJibGVzOiB0cnVlfSkpO1xufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuaXNSZXF1aXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3ZlcmZsb3dzID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmICh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRzLmNvdW50U2VsZWN0b3IpLmxlbmd0aCA+IHRoaXMub3B0cy5zaHJpbmtUbykge1xuICAgICAgICAgICAgb3ZlcmZsb3dzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29sbGFwc2VkKCkpIHtcbiAgICAgICAgICAgIG92ZXJmbG93cyA9IHRoaXMuY29udGVudEVsLmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgICAgIG92ZXJmbG93cyA9IHRoaXMuY29udGVudEVsLmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG92ZXJmbG93cztcbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbihlbCwgb3B0cykge1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIH1cbiAgICBpZiAoL1xcYm8tZXhwYW5kZXJcXGIvLnRlc3QoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhwYW5kZXIoZWwsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gW10ubWFwLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnR+PVwiby1leHBhbmRlclwiXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeHBhbmRlcihlbCwgb3B0cyk7XG4gICAgfSk7XG59O1xuXG52YXIgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGluaXRcbn07Il19
