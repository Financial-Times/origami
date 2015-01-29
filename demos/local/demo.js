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

    this.init();
}

Expander.prototype.init = function () {
    if (!this.isRequired()) {
        this.el.classList.add('o-expander--inactive');
    } else {
        this.el.classList.remove('o-expander--inactive');
        if (typeof this.opts.shrinkTo === 'number') {
            this.el.querySelectorAll(this.opts.countSelector)[this.opts.shrinkTo - 1].classList.add('o-expander__last-permanent-item');
        }
        if (this.el.getAttribute('aria-expanded')) {
            this.displayState();
        } else {
            this.collapse();
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

Expander.prototype.displayState = function (state) {
    this.isCollapsed() ? this.collapse() : this.expand();
}

Expander.prototype.expand = function () {
    this.el.setAttribute('aria-expanded', true);
    this.toggle.innerHTML = this.opts.expandedToggleText + '<i></i>';
    this.emit('expand');
}

Expander.prototype.collapse = function () {
    this.el.setAttribute('aria-expanded', false);
    this.toggle.innerHTML = this.opts.collapsedToggleText + '<i></i>';
    this.emit('collapse');
}

Expander.prototype.emit = function (name) {
    this.el.dispatchEvent(new CustomEvent('oExpander.' + name));
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


    // this can all be event driven, outside the module
    // if (!card.classList.contains('next-card--expanded')) {
    //     if (setNaturalHeight) {
    //         card.style.height = card.offsetHeight + 'px';
    //     }
    // }

    // if (card.classList.contains('next-card--expanded')) {
    //     if (setNaturalHeight) {
    //         card.style.height = '';
    //     }
    // }
},{"./bower_components/o-viewport/main.js":8}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9vcmlnYW1pLWJ1aWxkLXRvb2xzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2Z1bmN0aW9ucy9kZWJvdW5jZS5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vZnVuY3Rpb25zL3Rocm90dGxlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9pbnRlcm5hbHMvaXNOYXRpdmUuanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL2Jvd2VyX2NvbXBvbmVudHMvbG9kYXNoLW5vZGUvbW9kZXJuL2ludGVybmFscy9vYmplY3RUeXBlcy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvYm93ZXJfY29tcG9uZW50cy9sb2Rhc2gtbm9kZS9tb2Rlcm4vb2JqZWN0cy9pc0Z1bmN0aW9uLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi9vYmplY3RzL2lzT2JqZWN0LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL2xvZGFzaC1ub2RlL21vZGVybi91dGlsaXRpZXMvbm93LmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvUHJvamVjdHMvbmV4dC9leHBhbmRlci9ib3dlcl9jb21wb25lbnRzL28tdmlld3BvcnQvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1Byb2plY3RzL25leHQvZXhwYW5kZXIvZGVtb3Mvc3JjL2RlbW8uanMiLCIvVXNlcnMvcmh5cy5ldmFucy9Qcm9qZWN0cy9uZXh0L2V4cGFuZGVyL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL29iamVjdHMvaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vb2JqZWN0cy9pc09iamVjdCcpLFxuICAgIG5vdyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9ub3cnKTtcblxuLyogTmF0aXZlIG1ldGhvZCBzaG9ydGN1dHMgZm9yIG1ldGhvZHMgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMgKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGRlbGF5IHRoZSBleGVjdXRpb24gb2YgYGZ1bmNgIHVudGlsIGFmdGVyXG4gKiBgd2FpdGAgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLlxuICogUHJvdmlkZSBhbiBvcHRpb25zIG9iamVjdCB0byBpbmRpY2F0ZSB0aGF0IGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvblxuICogdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBTdWJzZXF1ZW50IGNhbGxzXG4gKiB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGNhbGwuXG4gKlxuICogTm90ZTogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCBgZnVuY2Agd2lsbCBiZSBjYWxsZWRcbiAqIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gaXNcbiAqIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXSBTcGVjaWZ5IGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBjYWxsZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdIFNwZWNpZnkgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBhdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4XG4gKiB2YXIgbGF6eUxheW91dCA9IF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApO1xuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIGxhenlMYXlvdXQpO1xuICpcbiAqIC8vIGV4ZWN1dGUgYHNlbmRNYWlsYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzXG4gKiBqUXVlcnkoJyNwb3N0Ym94Jykub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pO1xuICpcbiAqIC8vIGVuc3VyZSBgYmF0Y2hMb2dgIGlzIGV4ZWN1dGVkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzXG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwge1xuICogICAnbWF4V2FpdCc6IDEwMDBcbiAqIH0sIGZhbHNlKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgYXJncyxcbiAgICAgIG1heFRpbWVvdXRJZCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YW1wLFxuICAgICAgdGhpc0FyZyxcbiAgICAgIHRpbWVvdXRJZCxcbiAgICAgIHRyYWlsaW5nQ2FsbCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwLFxuICAgICAgbWF4V2FpdCA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIH1cbiAgd2FpdCA9IG5hdGl2ZU1heCgwLCB3YWl0KSB8fCAwO1xuICBpZiAob3B0aW9ucyA9PT0gdHJ1ZSkge1xuICAgIHZhciBsZWFkaW5nID0gdHJ1ZTtcbiAgICB0cmFpbGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9IG9wdGlvbnMubGVhZGluZztcbiAgICBtYXhXYWl0ID0gJ21heFdhaXQnIGluIG9wdGlvbnMgJiYgKG5hdGl2ZU1heCh3YWl0LCBvcHRpb25zLm1heFdhaXQpIHx8IDApO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHZhciBkZWxheWVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93KCkgLSBzdGFtcCk7XG4gICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICBpZiAobWF4VGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtYXhUaW1lb3V0SWQpO1xuICAgICAgfVxuICAgICAgdmFyIGlzQ2FsbGVkID0gdHJhaWxpbmdDYWxsO1xuICAgICAgbWF4VGltZW91dElkID0gdGltZW91dElkID0gdHJhaWxpbmdDYWxsID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGlzQ2FsbGVkKSB7XG4gICAgICAgIGxhc3RDYWxsZWQgPSBub3coKTtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0SWQgJiYgIW1heFRpbWVvdXRJZCkge1xuICAgICAgICAgIGFyZ3MgPSB0aGlzQXJnID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHJlbWFpbmluZyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBtYXhEZWxheWVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfVxuICAgIG1heFRpbWVvdXRJZCA9IHRpbWVvdXRJZCA9IHRyYWlsaW5nQ2FsbCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodHJhaWxpbmcgfHwgKG1heFdhaXQgIT09IHdhaXQpKSB7XG4gICAgICBsYXN0Q2FsbGVkID0gbm93KCk7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgaWYgKCF0aW1lb3V0SWQgJiYgIW1heFRpbWVvdXRJZCkge1xuICAgICAgICBhcmdzID0gdGhpc0FyZyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHN0YW1wID0gbm93KCk7XG4gICAgdGhpc0FyZyA9IHRoaXM7XG4gICAgdHJhaWxpbmdDYWxsID0gdHJhaWxpbmcgJiYgKHRpbWVvdXRJZCB8fCAhbGVhZGluZyk7XG5cbiAgICBpZiAobWF4V2FpdCA9PT0gZmFsc2UpIHtcbiAgICAgIHZhciBsZWFkaW5nQ2FsbCA9IGxlYWRpbmcgJiYgIXRpbWVvdXRJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFtYXhUaW1lb3V0SWQgJiYgIWxlYWRpbmcpIHtcbiAgICAgICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgICAgfVxuICAgICAgdmFyIHJlbWFpbmluZyA9IG1heFdhaXQgLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKSxcbiAgICAgICAgICBpc0NhbGxlZCA9IHJlbWFpbmluZyA8PSAwO1xuXG4gICAgICBpZiAoaXNDYWxsZWQpIHtcbiAgICAgICAgaWYgKG1heFRpbWVvdXRJZCkge1xuICAgICAgICAgIG1heFRpbWVvdXRJZCA9IGNsZWFyVGltZW91dChtYXhUaW1lb3V0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFtYXhUaW1lb3V0SWQpIHtcbiAgICAgICAgbWF4VGltZW91dElkID0gc2V0VGltZW91dChtYXhEZWxheWVkLCByZW1haW5pbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNDYWxsZWQgJiYgdGltZW91dElkKSB7XG4gICAgICB0aW1lb3V0SWQgPSBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIXRpbWVvdXRJZCAmJiB3YWl0ICE9PSBtYXhXYWl0KSB7XG4gICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgIH1cbiAgICBpZiAobGVhZGluZ0NhbGwpIHtcbiAgICAgIGlzQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgfVxuICAgIGlmIChpc0NhbGxlZCAmJiAhdGltZW91dElkICYmICFtYXhUaW1lb3V0SWQpIHtcbiAgICAgIGFyZ3MgPSB0aGlzQXJnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9vYmplY3RzL2lzRnVuY3Rpb24nKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL29iamVjdHMvaXNPYmplY3QnKTtcblxuLyoqIFVzZWQgYXMgYW4gaW50ZXJuYWwgYF8uZGVib3VuY2VgIG9wdGlvbnMgb2JqZWN0ICovXG52YXIgZGVib3VuY2VPcHRpb25zID0ge1xuICAnbGVhZGluZyc6IGZhbHNlLFxuICAnbWF4V2FpdCc6IDAsXG4gICd0cmFpbGluZyc6IGZhbHNlXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGV4ZWN1dGVkLCB3aWxsIG9ubHkgY2FsbCB0aGUgYGZ1bmNgIGZ1bmN0aW9uXG4gKiBhdCBtb3N0IG9uY2UgcGVyIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFByb3ZpZGUgYW4gb3B0aW9ucyBvYmplY3QgdG9cbiAqIGluZGljYXRlIHRoYXQgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlXG4gKiBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsXG4gKiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgY2FsbC5cbiAqXG4gKiBOb3RlOiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgIGBmdW5jYCB3aWxsIGJlIGNhbGxlZFxuICogb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhlIHRocm90dGxlZCBmdW5jdGlvbiBpc1xuICogaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0IFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGV4ZWN1dGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXSBTcGVjaWZ5IGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXSBTcGVjaWZ5IGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gYXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZ1xuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCk7XG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBleGVjdXRlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXNcbiAqIGpRdWVyeSgnLmludGVyYWN0aXZlJykub24oJ2NsaWNrJywgXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHtcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgfVxuICBpZiAob3B0aW9ucyA9PT0gZmFsc2UpIHtcbiAgICBsZWFkaW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyBvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIGRlYm91bmNlT3B0aW9ucy5sZWFkaW5nID0gbGVhZGluZztcbiAgZGVib3VuY2VPcHRpb25zLm1heFdhaXQgPSB3YWl0O1xuICBkZWJvdW5jZU9wdGlvbnMudHJhaWxpbmcgPSB0cmFpbGluZztcblxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwgZGVib3VuY2VPcHRpb25zKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsIi8qKlxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cDovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBtb2Rlcm4gZXhwb3J0cz1cIm5vZGVcIiAtbyAuL21vZGVybi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDEzIFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjUuMiA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBpbnRlcm5hbCBbW0NsYXNzXV0gb2YgdmFsdWVzICovXG52YXIgdG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZSAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIFN0cmluZyh0b1N0cmluZylcbiAgICAucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKVxuICAgIC5yZXBsYWNlKC90b1N0cmluZ3wgZm9yIFteXFxdXSsvZywgJy4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgJiYgcmVOYXRpdmUudGVzdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIExvLURhc2ggMi40LjEgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgbW9kZXJuIGV4cG9ydHM9XCJub2RlXCIgLW8gLi9tb2Rlcm4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS41LjIgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgT2JqZWN0ICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdib29sZWFuJzogZmFsc2UsXG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlLFxuICAnbnVtYmVyJzogZmFsc2UsXG4gICdzdHJpbmcnOiBmYWxzZSxcbiAgJ3VuZGVmaW5lZCc6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFR5cGVzO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdHNcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgb2JqZWN0VHlwZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0VHlwZXMnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3QuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdHNcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyB0aGUgRUNNQVNjcmlwdCBsYW5ndWFnZSB0eXBlIG9mIE9iamVjdFxuICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDhcbiAgLy8gYW5kIGF2b2lkIGEgVjggYnVnXG4gIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTFcbiAgcmV0dXJuICEhKHZhbHVlICYmIG9iamVjdFR5cGVzW3R5cGVvZiB2YWx1ZV0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIG1vZGVybiBleHBvcnRzPVwibm9kZVwiIC1vIC4vbW9kZXJuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNS4yIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxMyBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBVbml4IGVwb2NoXG4gKiAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgc3RhbXAgPSBfLm5vdygpO1xuICogXy5kZWZlcihmdW5jdGlvbigpIHsgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTsgfSk7XG4gKiAvLyA9PiBsb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBmdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqL1xudmFyIG5vdyA9IGlzTmF0aXZlKG5vdyA9IERhdGUubm93KSAmJiBub3cgfHwgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwiLyogZ2xvYmFscyBjb25zb2xlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoXCIuLy4uL2xvZGFzaC1ub2RlL21vZGVybi9mdW5jdGlvbnMvdGhyb3R0bGVcIik7XG52YXIgZGVib3VuY2UgPSByZXF1aXJlKFwiLi8uLi9sb2Rhc2gtbm9kZS9tb2Rlcm4vZnVuY3Rpb25zL2RlYm91bmNlXCIpO1xudmFyIGJvZHk7XG52YXIgZGVidWc7XG52YXIgaW5pdEZsYWdzID0ge307XG52YXIgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0c2Nyb2xsOiAxMDBcbn07XG5cbmZ1bmN0aW9uIGJyb2FkY2FzdCAoZXZlbnRUeXBlLCBkYXRhKSB7XG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXHRib2R5LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvVmlld3BvcnQuJyArIGV2ZW50VHlwZSwge1xuXHRcdGRldGFpbDogZGF0YSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pKTtcbn1cblxudmFyIGdldE9yaWVudGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbiB8fCB3aW5kb3cuc2NyZWVuLm1vek9yaWVudGF0aW9uIHx8IHdpbmRvdy5zY3JlZW4ubXNPcmllbnRhdGlvbiB8fCB1bmRlZmluZWQ7XG5cdGlmIChvcmllbnRhdGlvbikge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJyA/IFxuXHRcdFx0XHRvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdIDogIFxuXHRcdFx0XHRvcmllbnRhdGlvbi50eXBlLnNwbGl0KCctJylbMF07XG5cdFx0fTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ID49IHdpbmRvdy5pbm5lcldpZHRoID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHRcdH07XG5cdH1cbn0pKCk7XG5cbnZhciBnZXRTaXplID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApLFxuXHRcdHdpZHRoOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApXG5cdH07XG59O1xuXG5mdW5jdGlvbiBzZXRUaHJvdHRsZUludGVydmFsIChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGluaXQoZXZlbnRUeXBlKSB7XG5cdGlmIChpbml0RmxhZ3NbZXZlbnRUeXBlXSkgcmV0dXJuIHRydWU7XG5cblx0aW5pdEZsYWdzW2V2ZW50VHlwZV0gPSB0cnVlO1xuXG5cdGJvZHkgPSBib2R5IHx8IGRvY3VtZW50LmJvZHk7XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplICgpIHtcblxuXHRpZiAoaW5pdCgncmVzaXplJykpIHJldHVybjtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2UoZnVuY3Rpb24gKGV2KSB7XG5cdFx0YnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSkpO1xufVxuXG5mdW5jdGlvbiBsaXN0ZW5Ub09yaWVudGF0aW9uICgpIHtcblxuXHRpZiAoaW5pdCgnb3JpZW50YXRpb24nKSkgcmV0dXJuO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGRlYm91bmNlKGZ1bmN0aW9uIChldikge1xuXHRcdGJyb2FkY2FzdCgnb3JpZW50YXRpb24nLCB7XG5cdFx0XHR2aWV3cG9ydDogZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZW50YXRpb246IGdldE9yaWVudGF0aW9uKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMub3JpZW50YXRpb24pKTtcbn1cblxuZnVuY3Rpb24gbGlzdGVuVG9TY3JvbGwgKCkge1xuXG5cdGlmIChpbml0KCdzY3JvbGwnKSkgcmV0dXJuO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZShmdW5jdGlvbiAoZXYpIHtcblx0XHRicm9hZGNhc3QoJ3Njcm9sbCcsIHtcblx0XHRcdHZpZXdwb3J0OiBnZXRTaXplKCksXG5cdFx0XHRzY3JvbGxIZWlnaHQ6IGJvZHkuc2Nyb2xsSGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuXHRcdFx0c2Nyb2xsVG9wOiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuXHRcdFx0c2Nyb2xsV2lkdGg6IGJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMuc2Nyb2xsKSk7XG59XG5cbmZ1bmN0aW9uIGxpc3RlblRvIChldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Jlc2l6ZScpIHtcblx0XHRsaXN0ZW5Ub1Jlc2l6ZSgpO1xuXHR9IGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gJ3Njcm9sbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9IGVsc2UgaWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJykge1xuXHRcdGxpc3RlblRvT3JpZW50YXRpb24oKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uICgpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGxpc3RlblRvOiBsaXN0ZW5Ubyxcblx0c2V0VGhyb3R0bGVJbnRlcnZhbDogc2V0VGhyb3R0bGVJbnRlcnZhbCxcblx0Z2V0T3JpZW50YXRpb246IGdldE9yaWVudGF0aW9uLFxuXHRnZXRTaXplOiBnZXRTaXplXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpbml0RGVtb3MoKSB7XG5cdHJlcXVpcmUoJy4uLy4uL21haW4nKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xuXHR9KTtcbn1cblxuaW5pdERlbW9zKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdERlbW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9nZ2xlU2VsZWN0b3IgPSAnYnV0dG9uLm8tZXhwYW5kZXJfX3RvZ2dsZSc7XG52YXIgdmlld3BvcnQgPSByZXF1aXJlKFwiLi9ib3dlcl9jb21wb25lbnRzL28tdmlld3BvcnQvbWFpbi5qc1wiKTtcblxudmFyIEV4cGFuZGVyID0gZnVuY3Rpb24gKGVsLCBvcHRzKSB7XG4gICAgdmlld3BvcnQubGlzdGVuVG8oJ3Jlc2l6ZScpO1xuICAgIHZpZXdwb3J0Lmxpc3RlblRvKCdvcmllbnRhdGlvbicpO1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIG9wdHMuc2hyaW5rVG8gPSBlbC5kYXRhc2V0Lm9FeHBhbmRlclNocmlua1RvIHx8IG9wdHMuc2hyaW5rVG8gfHwgJ2hlaWdodCc7IC8vaGVpZ2h0IG9yIG51bWJlclxuICAgIG9wdHMuY291bnRTZWxlY3RvciA9IGVsLmRhdGFzZXQub0V4cGFuZGVyQ291bnRTZWxlY3RvciB8fCBvcHRzLmNvdW50U2VsZWN0b3I7XG4gICAgb3B0cy5jb250ZW50U2VsZWN0b3IgPSBlbC5kYXRhc2V0Lm9FeHBhbmRlckNvbnRlbnRTZWxlY3RvciB8fCBvcHRzLmNvbnRlbnRTZWxlY3RvciB8fCAnLm8tZXhwYW5kZXJfX2NvbnRlbnQnO1xuICAgIG9wdHMuZXhwYW5kZWRUb2dnbGVUZXh0ID0gZWwuZGF0YXNldC5vRXhwYW5kZXJFeHBhbmRlZFRvZ2dsZVRleHQgfHwgb3B0cy5leHBhbmRlZFRvZ2dsZVRleHQgfHwgJ2xlc3MnO1xuICAgIG9wdHMuY29sbGFwc2VkVG9nZ2xlVGV4dCA9IGVsLmRhdGFzZXQub0V4cGFuZGVyQ29sbGFwc2VkVG9nZ2xlVGV4dCB8fCBvcHRzLmNvbGxhcHNlZFRvZ2dsZVRleHQgfHwgJ21vcmUnO1xuXG5cbiAgICBpZiAoL15cXGQrJC8udGVzdChvcHRzLnNocmlua1RvKSkge1xuICAgICAgICBvcHRzLnNocmlua1RvID0gK29wdHMuc2hyaW5rVG87XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5zaHJpbmtUbyA9PT0gJ251bWJlcicgJiYgIW9wdHMuY291bnRTZWxlY3Rvcikge1xuICAgICAgICB0aHJvdygnd2hlbiBjb2xsYXBzaW5nIHRvIGEgbnVtYmVyIG9mIGl0ZW1zIHNwZWNpZnkgYSBzZWxlY3RvciB0byBpZGVudGlmeSBob3cgbWFueSBpdGVtcyBleGlzdCcpO1xuICAgIH1cbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5jb250ZW50RWwgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3Iob3B0cy5jb250ZW50U2VsZWN0b3IpO1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgdGhpcy50b2dnbGUgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGlmICghdGhpcy50b2dnbGUpIHtcbiAgICAgICAgdGhyb3coJ3RoaXMgZXhwYW5kZXIgbmVlZHMgYSB0b2dnbGUgYnV0dG9uICh1c2UgYSBidXR0b24gbm90IGEgbGluaycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdHMuc2hyaW5rVG8gPT09ICdoZWlnaHQnKSB7XG4gICAgICAgIHRoaXMuaW5pdCA9IHRoaXMuaW5pdC5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5vcmllbnRhdGlvbicsIHRoaXMuaW5pdCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnJlc2l6ZScsIHRoaXMuaW5pdCk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc1JlcXVpcmVkKCkpIHtcbiAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdvLWV4cGFuZGVyLS1pbmFjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnby1leHBhbmRlci0taW5hY3RpdmUnKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRzLmNvdW50U2VsZWN0b3IpW3RoaXMub3B0cy5zaHJpbmtUbyAtIDFdLmNsYXNzTGlzdC5hZGQoJ28tZXhwYW5kZXJfX2xhc3QtcGVybWFuZW50LWl0ZW0nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5pbnZlcnRTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pc0NvbGxhcHNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXR0ciA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgcmV0dXJuICFhdHRyIHx8IGF0dHIgPT09ICdmYWxzZSc7XG59XG5cbkV4cGFuZGVyLnByb3RvdHlwZS5pbnZlcnRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzQ29sbGFwc2VkKCkgPyB0aGlzLmV4cGFuZCgpIDogdGhpcy5jb2xsYXBzZSgpO1xufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuZGlzcGxheVN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdGhpcy5pc0NvbGxhcHNlZCgpID8gdGhpcy5jb2xsYXBzZSgpIDogdGhpcy5leHBhbmQoKTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmV4cGFuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIHRoaXMudG9nZ2xlLmlubmVySFRNTCA9IHRoaXMub3B0cy5leHBhbmRlZFRvZ2dsZVRleHQgKyAnPGk+PC9pPic7XG4gICAgdGhpcy5lbWl0KCdleHBhbmQnKTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmNvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgIHRoaXMudG9nZ2xlLmlubmVySFRNTCA9IHRoaXMub3B0cy5jb2xsYXBzZWRUb2dnbGVUZXh0ICsgJzxpPjwvaT4nO1xuICAgIHRoaXMuZW1pdCgnY29sbGFwc2UnKTtcbn1cblxuRXhwYW5kZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29FeHBhbmRlci4nICsgbmFtZSkpO1xufVxuXG5FeHBhbmRlci5wcm90b3R5cGUuaXNSZXF1aXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3ZlcmZsb3dzID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmICh0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRzLmNvdW50U2VsZWN0b3IpLmxlbmd0aCA+IHRoaXMub3B0cy5zaHJpbmtUbykge1xuICAgICAgICAgICAgb3ZlcmZsb3dzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29sbGFwc2VkKCkpIHtcbiAgICAgICAgICAgIG92ZXJmbG93cyA9IHRoaXMuY29udGVudEVsLmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgICAgIG92ZXJmbG93cyA9IHRoaXMuY29udGVudEVsLmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG92ZXJmbG93cztcbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbihlbCwgb3B0cykge1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIH1cbiAgICBpZiAoL1xcYm8tZXhwYW5kZXJcXGIvLnRlc3QoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXhwYW5kZXIoZWwsIG9wdHMpO1xuICAgIH1cbiAgICByZXR1cm4gW10ubWFwLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnR+PVwiby1leHBhbmRlclwiXScpLCBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFeHBhbmRlcihlbCwgb3B0cyk7XG4gICAgfSk7XG59O1xuXG52YXIgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCgpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGluaXRcbn07XG5cblxuICAgIC8vIHRoaXMgY2FuIGFsbCBiZSBldmVudCBkcml2ZW4sIG91dHNpZGUgdGhlIG1vZHVsZVxuICAgIC8vIGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQtY2FyZC0tZXhwYW5kZWQnKSkge1xuICAgIC8vICAgICBpZiAoc2V0TmF0dXJhbEhlaWdodCkge1xuICAgIC8vICAgICAgICAgY2FyZC5zdHlsZS5oZWlnaHQgPSBjYXJkLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQtY2FyZC0tZXhwYW5kZWQnKSkge1xuICAgIC8vICAgICBpZiAoc2V0TmF0dXJhbEhlaWdodCkge1xuICAgIC8vICAgICAgICAgY2FyZC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAvLyAgICAgfVxuICAgIC8vIH0iXX0=
