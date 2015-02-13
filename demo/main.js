(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint browser:true, node:true*/

"use strict";

module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {
  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];
  if (root) {
    this.root(root);
  }

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function (root) {
  var listenerMap = this.listenerMap;
  var eventType;

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }
    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }
  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function (eventType) {
  return ["blur", "error", "focus", "load", "resize", "scroll"].indexOf(eventType) !== -1;
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {Object} [eventData] Data to pass in event.data
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
  var root, listenerMap, matcher, matcherParam;

  if (!eventType) {
    throw new TypeError("Invalid event type: " + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === "function") {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // Fallback to sensible defaults
  // if useCapture not set
  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== "function") {
    throw new TypeError("Handler must be a type of Function");
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = matchesRoot.bind(this);

    // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
  var i, listener, listenerMap, listenerList, singleEventType;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === "function") {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // If useCapture not set, remove
  // all event listeners
  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};


/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function (event) {
  var i,
      l,
      type = event.type,
      root,
      phase,
      listener,
      returned,
      listenerList = [],
      target,
      /** @const */EVENTIGNORE = "ftLabsDelegateIgnore";

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;

  // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  root = this.rootElement;

  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

  switch (phase) {
    case 1:
      //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
      break;
    case 2:
      //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
      break;
    case 3:
      //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
      break;
  }

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        event.preventDefault();
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function (event, target, listener) {
  return listener.handler.call(target, event, target);
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
var matches = (function (el) {
  if (!el) return;
  var p = el.prototype;
  return p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
})(Element);

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesRoot(selector, element) {
  /*jshint validthis:true*/
  if (this.rootElement === window) return element === document;
  return this.rootElement === element;
}

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesId(id, element) {
  return id === element.id;
}

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function () {
  this.off();
  this.root();
};

},{}],2:[function(require,module,exports){
"use strict";

require("../src/main.js").init();

},{"../src/main.js":6}],3:[function(require,module,exports){
"use strict";
var utils = require("./utils");


// show optin message when hash is available
var optinMessage = "\n\t<h1>Welcome to Next FT.</h1>\n\t<p>This is a prototype of our new website, please take a look around and let us know what you think using the survey link at the bottom of the page.</p>\n\t<p class=\"optin-message-actions\">\n\t\t<button class=\"message__close-js optin-message-button__left\">OK</button>\n\t\t<a href=\"http://next.ft.com/opt-out\" class=\"optin-message-button__right\">Opt out and return to FT.com</a>\n\t</p>\n";

function optin() {
	if (location.hash.indexOf("opted-via") > -1) {
		utils.dispatchMessageEvent(optinMessage, { duration: 0, close: false });
	}
}

module.exports = optin;

},{"./utils":5}],4:[function(require,module,exports){
"use strict";

var message = function (content) {
	return "\n\t<section class=\"message\">\n\t\t<div class=\"message__content-wrapper\">\n\t\t\t<a href=\"#\" class=\"message__close message__close-js\">Close</a>\n\t\t\t<div class=\"message__content\">\n\t\t\t\t" + content + "\n\t\t\t</div>\n\t\t</div>\n\t</section>\n";
};

module.exports = {
	message: message
};

},{}],5:[function(require,module,exports){
"use strict";


function dispatchEvent(element, name, data) {
	var event = new CustomEvent(name, { detail: data });
	element.dispatchEvent(event);
}

function dispatchMessageEvent(message, options) {
	var data = options || {};
	data.content = message;
	data.type = "message";
	dispatchEvent(document, "FT.Message", data);
}

module.exports = {
	dispatchMessageEvent: dispatchMessageEvent
};

},{}],6:[function(require,module,exports){
"use strict";

var Delegate = require("./../bower_components/dom-delegate/lib/delegate.js");

var optin = require("./js/optin");

var templates = require("./js/templates");
var currentMessage = null;
var timeout;
var timeoutDuration = 5000;
var animDuration = 500;

function listenForCloseButtonClick() {
	var called = false;
	var func = function () {
		var delegate = new Delegate(document.body);
		delegate.on("click", ".message__close-js", hideMessage);
	};

	if (!called) {
		func();
		called = true;
	}
}

function showMessage(options) {
	clearTimeout(timeout);
	listenForCloseButtonClick();
	if (currentMessage) {
		currentMessage.firstChild.innerHTML = options.content;
	} else {
		var html = templates[options.type](options.content);
		document.querySelector("header").insertAdjacentHTML("afterend", html);
		currentMessage = document.querySelector(".message");
	}
	if (options.close !== false) {
		currentMessage.classList.add(".message--show-close");
	}

	currentMessage.classList.add("visible");
	if (options.duration !== 0) {
		timeout = setTimeout(hideMessage, options.duration || timeoutDuration);
	}
}

function hideMessage() {
	clearTimeout(timeout);
	currentMessage.classList.remove("visible");
	setTimeout(function () {
		if (currentMessage && currentMessage.parentNode) {
			currentMessage.parentNode.removeChild(currentMessage);
		}

		currentMessage = null;
	}, animDuration);
}

function init() {
	document.addEventListener("FT.Message", function (e) {
		var data = e.detail;
		data.type = "message";
		showMessage(data);
	});

	optin();
}



module.exports = {
	init: init,
	showMessage: showMessage
};

},{"./../bower_components/dom-delegate/lib/delegate.js":1,"./js/optin":3,"./js/templates":4}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wYXVsLmkud2lsc29uL2dpdC9mdG5leHQvbmV4dC1tZXNzYWdpbmcvbm9kZV9tb2R1bGVzL29yaWdhbWktYnVpbGQtdG9vbHMvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9wYXVsLmkud2lsc29uL2dpdC9mdG5leHQvbmV4dC1tZXNzYWdpbmcvYm93ZXJfY29tcG9uZW50cy9kb20tZGVsZWdhdGUvbGliL2RlbGVnYXRlLmpzIiwiL1VzZXJzL3BhdWwuaS53aWxzb24vZ2l0L2Z0bmV4dC9uZXh0LW1lc3NhZ2luZy9kZW1vL2RlbW8uanMiLCIvVXNlcnMvcGF1bC5pLndpbHNvbi9naXQvZnRuZXh0L25leHQtbWVzc2FnaW5nL3NyYy9qcy9vcHRpbi5qcyIsIi9Vc2Vycy9wYXVsLmkud2lsc29uL2dpdC9mdG5leHQvbmV4dC1tZXNzYWdpbmcvc3JjL2pzL3RlbXBsYXRlcy5qcyIsIi9Vc2Vycy9wYXVsLmkud2lsc29uL2dpdC9mdG5leHQvbmV4dC1tZXNzYWdpbmcvc3JjL2pzL3V0aWxzLmpzIiwiL1VzZXJzL3BhdWwuaS53aWxzb24vZ2l0L2Z0bmV4dC9uZXh0LW1lc3NhZ2luZy9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUEsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7QUFZMUIsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0FBUXRCLE1BQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDNUIsTUFBSSxJQUFJLEVBQUU7QUFDUixRQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pCOzs7QUFHRCxNQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUks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QkFBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztFQUNyRDs7QUFFRCxlQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QyxLQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFDO0FBQ3pCLFNBQU8sR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLENBQUM7RUFDdkU7Q0FDRDs7QUFFRCxTQUFTLFdBQVcsR0FBRTtBQUNyQixhQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsZUFBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0MsV0FBVSxDQUFDLFlBQVU7QUFDcEIsTUFBRyxjQUFjLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBQztBQUM5QyxpQkFBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7R0FDdEQ7O0FBRUQsZ0JBQWMsR0FBRyxJQUFJLENBQUM7RUFDdEIsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUNqQjs7QUFFRCxTQUFTLElBQUksR0FBRTtBQUNkLFNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBUyxDQUFDLEVBQUM7QUFDbEQsTUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNwQixNQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUN0QixhQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDbEIsQ0FBQyxDQUFDOztBQUVILE1BQUssRUFBRSxDQUFDO0NBQ1I7Ozs7QUFJRCxNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2hCLEtBQUksRUFBRyxJQUFJO0FBQ1gsWUFBVyxFQUFFLFdBQVc7Q0FDeEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBEZWxlZ2F0ZTtcblxuLyoqXG4gKiBET00gZXZlbnQgZGVsZWdhdG9yXG4gKlxuICogVGhlIGRlbGVnYXRvciB3aWxsIGxpc3RlblxuICogZm9yIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cFxuICogdG8gdGhlIHJvb3Qgbm9kZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gRGVsZWdhdGUocm9vdCkge1xuXG4gIC8qKlxuICAgKiBNYWludGFpbiBhIG1hcCBvZiBsaXN0ZW5lclxuICAgKiBsaXN0cywga2V5ZWQgYnkgZXZlbnQgbmFtZS5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICB0aGlzLmxpc3RlbmVyTWFwID0gW3t9LCB7fV07XG4gIGlmIChyb290KSB7XG4gICAgdGhpcy5yb290KHJvb3QpO1xuICB9XG5cbiAgLyoqIEB0eXBlIGZ1bmN0aW9uKCkgKi9cbiAgdGhpcy5oYW5kbGUgPSBEZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlLmJpbmQodGhpcyk7XG59XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcbiAqIG9uIHRoZSBwcm92aWRlZCBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgdmFyIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgdmFyIGV2ZW50VHlwZTtcblxuICAvLyBSZW1vdmUgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElmIG5vIHJvb3Qgb3Igcm9vdCBpcyBub3RcbiAgLy8gYSBkb20gbm9kZSwgdGhlbiByZW1vdmUgaW50ZXJuYWxcbiAgLy8gcm9vdCByZWZlcmVuY2UgYW5kIGV4aXQgaGVyZVxuICBpZiAoIXJvb3QgfHwgIXJvb3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5yb290RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJvb3Qgbm9kZSBhdCB3aGljaFxuICAgKiBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkLlxuICAgKlxuICAgKiBAdHlwZSBOb2RlXG4gICAqL1xuICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdDtcblxuICAvLyBTZXQgdXAgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzBdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLmNhcHR1cmVGb3JUeXBlID0gZnVuY3Rpb24oZXZlbnRUeXBlKSB7XG4gIHJldHVybiBbJ2JsdXInLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdyZXNpemUnLCAnc2Nyb2xsJ10uaW5kZXhPZihldmVudFR5cGUpICE9PSAtMTtcbn07XG5cbi8qKlxuICogQXR0YWNoIGEgaGFuZGxlciB0byBvbmVcbiAqIGV2ZW50IGZvciBhbGwgZWxlbWVudHNcbiAqIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLFxuICogbm93IG9yIGluIHRoZSBmdXR1cmVcbiAqXG4gKiBUaGUgaGFuZGxlciBmdW5jdGlvbiByZWNlaXZlc1xuICogdGhyZWUgYXJndW1lbnRzOiB0aGUgRE9NIGV2ZW50XG4gKiBvYmplY3QsIHRoZSBub2RlIHRoYXQgbWF0Y2hlZFxuICogdGhlIHNlbGVjdG9yIHdoaWxlIHRoZSBldmVudFxuICogd2FzIGJ1YmJsaW5nIGFuZCBhIHJlZmVyZW5jZVxuICogdG8gaXRzZWxmLiBXaXRoaW4gdGhlIGhhbmRsZXIsXG4gKiAndGhpcycgaXMgZXF1YWwgdG8gdGhlIHNlY29uZFxuICogYXJndW1lbnQuXG4gKlxuICogVGhlIG5vZGUgdGhhdCBhY3R1YWxseSByZWNlaXZlZFxuICogdGhlIGV2ZW50IGNhbiBiZSBhY2Nlc3NlZCB2aWFcbiAqICdldmVudC50YXJnZXQnLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgTGlzdGVuIGZvciB0aGVzZSBldmVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc2VsZWN0b3IgT25seSBoYW5kbGUgZXZlbnRzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IsIGlmIHVuZGVmaW5lZCBtYXRjaCByb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gaGFuZGxlciBIYW5kbGVyIGZ1bmN0aW9uIC0gZXZlbnQgZGF0YSBwYXNzZWQgaGVyZSB3aWxsIGJlIGluIGV2ZW50LmRhdGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZXZlbnREYXRhXSBEYXRhIHRvIHBhc3MgaW4gZXZlbnQuZGF0YVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuRGVsZWdhdGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgcm9vdCwgbGlzdGVuZXJNYXAsIG1hdGNoZXIsIG1hdGNoZXJQYXJhbTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdHlwZTogJyArIGV2ZW50VHlwZSk7XG4gIH1cblxuICAvLyBoYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIHRvIHNlbnNpYmxlIGRlZmF1bHRzXG4gIC8vIGlmIHVzZUNhcHR1cmUgbm90IHNldFxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXNlQ2FwdHVyZSA9IHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhbmRsZXIgbXVzdCBiZSBhIHR5cGUgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTtcblxuICAvLyBBZGQgbWFzdGVyIGhhbmRsZXIgZm9yIHR5cGUgaWYgbm90IGNyZWF0ZWQgeWV0XG4gIGlmICghbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuICAgIGlmIChyb290KSB7XG4gICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuICAgIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV0gPSBbXTtcbiAgfVxuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBudWxsO1xuXG4gICAgLy8gQ09NUExFWCAtIG1hdGNoZXNSb290IG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvXG4gICAgLy8gdGhpcy5yb290RWxlbWVudCwgc28gYmluZCB0aGUgZnVuY3Rpb24gdG8gdGhpcy5cbiAgICBtYXRjaGVyID0gbWF0Y2hlc1Jvb3QuYmluZCh0aGlzKTtcblxuICAvLyBDb21waWxlIGEgbWF0Y2hlciBmb3IgdGhlIGdpdmVuIHNlbGVjdG9yXG4gIH0gZWxzZSBpZiAoL15bYS16XSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc1RhZztcbiAgfSBlbHNlIGlmICgvXiNbYS16MC05XFwtX10rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNJZDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gbWF0Y2hlcztcbiAgfVxuXG4gIC8vIEFkZCB0byB0aGUgbGlzdCBvZiBsaXN0ZW5lcnNcbiAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgIG1hdGNoZXJQYXJhbTogbWF0Y2hlclBhcmFtXG4gIH0pO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gZXZlbnQgaGFuZGxlclxuICogZm9yIGVsZW1lbnRzIHRoYXQgbWF0Y2hcbiAqIHRoZSBzZWxlY3RvciwgZm9yZXZlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRUeXBlXSBSZW1vdmUgaGFuZGxlcnMgZm9yIGV2ZW50cyBtYXRjaGluZyB0aGlzIHR5cGUsIGNvbnNpZGVyaW5nIHRoZSBvdGhlciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBvdGhlciB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IFtoYW5kbGVyXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBwcmV2aW91cyB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgaSwgbGlzdGVuZXIsIGxpc3RlbmVyTWFwLCBsaXN0ZW5lckxpc3QsIHNpbmdsZUV2ZW50VHlwZTtcblxuICAvLyBIYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfVxuXG4gIC8vIElmIHVzZUNhcHR1cmUgbm90IHNldCwgcmVtb3ZlXG4gIC8vIGFsbCBldmVudCBsaXN0ZW5lcnNcbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHRydWUpO1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdO1xuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIGZvciAoc2luZ2xlRXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoc2luZ2xlRXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLm9mZihzaW5nbGVFdmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG4gIGlmICghbGlzdGVuZXJMaXN0IHx8ICFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBSZW1vdmUgb25seSBwYXJhbWV0ZXIgbWF0Y2hlc1xuICAvLyBpZiBzcGVjaWZpZWRcbiAgZm9yIChpID0gbGlzdGVuZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICBpZiAoKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gbGlzdGVuZXIuc2VsZWN0b3IpICYmICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBsaXN0ZW5lci5oYW5kbGVyKSkge1xuICAgICAgbGlzdGVuZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cblxuICAvLyBBbGwgbGlzdGVuZXJzIHJlbW92ZWRcbiAgaWYgKCFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgZGVsZXRlIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cbiAgICAvLyBSZW1vdmUgdGhlIG1haW4gaGFuZGxlclxuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogSGFuZGxlIGFuIGFyYml0cmFyeSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIGksIGwsIHR5cGUgPSBldmVudC50eXBlLCByb290LCBwaGFzZSwgbGlzdGVuZXIsIHJldHVybmVkLCBsaXN0ZW5lckxpc3QgPSBbXSwgdGFyZ2V0LCAvKiogQGNvbnN0ICovIEVWRU5USUdOT1JFID0gJ2Z0TGFic0RlbGVnYXRlSWdub3JlJztcblxuICBpZiAoZXZlbnRbRVZFTlRJR05PUkVdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gIC8vIEhhcmRjb2RlIHZhbHVlIG9mIE5vZGUuVEVYVF9OT0RFXG4gIC8vIGFzIG5vdCBkZWZpbmVkIGluIElFOFxuICBpZiAodGFyZ2V0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcblxuICBwaGFzZSA9IGV2ZW50LmV2ZW50UGhhc2UgfHwgKCBldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQgPyAzIDogMiApO1xuICBcbiAgc3dpdGNoIChwaGFzZSkge1xuICAgIGNhc2UgMTogLy9FdmVudC5DQVBUVVJJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdO1xuICAgIGJyZWFrO1xuICAgIGNhc2UgMjogLy9FdmVudC5BVF9UQVJHRVQ6XG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFswXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKSBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pO1xuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMV0gJiYgdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSkgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKTtcbiAgICBicmVhaztcbiAgICBjYXNlIDM6IC8vRXZlbnQuQlVCQkxJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdO1xuICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gTmVlZCB0byBjb250aW51b3VzbHkgY2hlY2tcbiAgLy8gdGhhdCB0aGUgc3BlY2lmaWMgbGlzdCBpc1xuICAvLyBzdGlsbCBwb3B1bGF0ZWQgaW4gY2FzZSBvbmVcbiAgLy8gb2YgdGhlIGNhbGxiYWNrcyBhY3R1YWxseVxuICAvLyBjYXVzZXMgdGhlIGxpc3QgdG8gYmUgZGVzdHJveWVkLlxuICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKHRhcmdldCAmJiBsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICAgIC8vIEJhaWwgZnJvbSB0aGlzIGxvb3AgaWZcbiAgICAgIC8vIHRoZSBsZW5ndGggY2hhbmdlZCBhbmRcbiAgICAgIC8vIG5vIG1vcmUgbGlzdGVuZXJzIGFyZVxuICAgICAgLy8gZGVmaW5lZCBiZXR3ZWVuIGkgYW5kIGwuXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBmb3IgbWF0Y2ggYW5kIGZpcmVcbiAgICAgIC8vIHRoZSBldmVudCBpZiB0aGVyZSdzIG9uZVxuICAgICAgLy9cbiAgICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5XG4gICAgICAvLyB0byBjaGVjayBpZiBldmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cbiAgICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBib3RoIGxvb3BzLlxuICAgICAgaWYgKGxpc3RlbmVyLm1hdGNoZXIuY2FsbCh0YXJnZXQsIGxpc3RlbmVyLm1hdGNoZXJQYXJhbSwgdGFyZ2V0KSkge1xuICAgICAgICByZXR1cm5lZCA9IHRoaXMuZmlyZShldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb24gdG8gc3Vic2VxdWVudFxuICAgICAgLy8gY2FsbGJhY2tzIGlmIHRoZSBjYWxsYmFjayByZXR1cm5lZFxuICAgICAgLy8gZmFsc2VcbiAgICAgIGlmIChyZXR1cm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnRbRVZFTlRJR05PUkVdID0gdHJ1ZTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5IHRvXG4gICAgLy8gY2hlY2sgaWYgZXZlbnQjc3RvcFByb3BhZ2F0aW9uXG4gICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGxvb3BpbmdcbiAgICAvLyB0aHJvdWdoIHRoZSBET00uIFN0b3AgaWYgdGhlXG4gICAgLy8gZGVsZWdhdGlvbiByb290IGhhcyBiZWVuIHJlYWNoZWRcbiAgICBpZiAodGFyZ2V0ID09PSByb290KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgfVxufTtcblxuLyoqXG4gKiBGaXJlIGEgbGlzdGVuZXIgb24gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyLmNhbGwodGFyZ2V0LCBldmVudCwgdGFyZ2V0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgZ2VuZXJpYyBzZWxlY3Rvci5cbiAqXG4gKiBAdHlwZSBmdW5jdGlvbigpXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgQSBDU1Mgc2VsZWN0b3JcbiAqL1xudmFyIG1hdGNoZXMgPSAoZnVuY3Rpb24oZWwpIHtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICB2YXIgcCA9IGVsLnByb3RvdHlwZTtcbiAgcmV0dXJuIChwLm1hdGNoZXMgfHwgcC5tYXRjaGVzU2VsZWN0b3IgfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcC5tc01hdGNoZXNTZWxlY3RvciB8fCBwLm9NYXRjaGVzU2VsZWN0b3IpO1xufShFbGVtZW50KSk7XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgdGFnIHNlbGVjdG9yLlxuICpcbiAqIFRhZ3MgYXJlIE5PVCBjYXNlLXNlbnNpdGl2ZSxcbiAqIGV4Y2VwdCBpbiBYTUwgKGFuZCBYTUwtYmFzZWRcbiAqIGxhbmd1YWdlcyBzdWNoIGFzIFhIVE1MKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgdGFnIG5hbWUgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNUYWcodGFnTmFtZSwgZWxlbWVudCkge1xuICByZXR1cm4gdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgdGhlIHJvb3QuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBzZWxlY3RvciBJbiB0aGlzIGNhc2UgdGhpcyBpcyBhbHdheXMgcGFzc2VkIHRocm91Z2ggYXMgbnVsbCBhbmQgbm90IHVzZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1Jvb3Qoc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUqL1xuICBpZiAodGhpcy5yb290RWxlbWVudCA9PT0gd2luZG93KSByZXR1cm4gZWxlbWVudCA9PT0gZG9jdW1lbnQ7XG4gIHJldHVybiB0aGlzLnJvb3RFbGVtZW50ID09PSBlbGVtZW50O1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIElEIG9mXG4gKiB0aGUgZWxlbWVudCBpbiAndGhpcydcbiAqIG1hdGNoZXMgdGhlIGdpdmVuIElELlxuICpcbiAqIElEcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc0lkKGlkLCBlbGVtZW50KSB7XG4gIHJldHVybiBpZCA9PT0gZWxlbWVudC5pZDtcbn1cblxuLyoqXG4gKiBTaG9ydCBoYW5kIGZvciBvZmYoKVxuICogYW5kIHJvb3QoKSwgaWUgYm90aFxuICogd2l0aCBubyBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cbkRlbGVnYXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub2ZmKCk7XG4gIHRoaXMucm9vdCgpO1xufTtcbiIsInJlcXVpcmUoJy4uL3NyYy9tYWluLmpzJykuaW5pdCgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cblxuLy8gc2hvdyBvcHRpbiBtZXNzYWdlIHdoZW4gaGFzaCBpcyBhdmFpbGFibGVcbnZhciBvcHRpbk1lc3NhZ2UgPSBgXG5cdDxoMT5XZWxjb21lIHRvIE5leHQgRlQuPC9oMT5cblx0PHA+VGhpcyBpcyBhIHByb3RvdHlwZSBvZiBvdXIgbmV3IHdlYnNpdGUsIHBsZWFzZSB0YWtlIGEgbG9vayBhcm91bmQgYW5kIGxldCB1cyBrbm93IHdoYXQgeW91IHRoaW5rIHVzaW5nIHRoZSBzdXJ2ZXkgbGluayBhdCB0aGUgYm90dG9tIG9mIHRoZSBwYWdlLjwvcD5cblx0PHAgY2xhc3M9XCJvcHRpbi1tZXNzYWdlLWFjdGlvbnNcIj5cblx0XHQ8YnV0dG9uIGNsYXNzPVwibWVzc2FnZV9fY2xvc2UtanMgb3B0aW4tbWVzc2FnZS1idXR0b25fX2xlZnRcIj5PSzwvYnV0dG9uPlxuXHRcdDxhIGhyZWY9XCJodHRwOi8vbmV4dC5mdC5jb20vb3B0LW91dFwiIGNsYXNzPVwib3B0aW4tbWVzc2FnZS1idXR0b25fX3JpZ2h0XCI+T3B0IG91dCBhbmQgcmV0dXJuIHRvIEZULmNvbTwvYT5cblx0PC9wPlxuYDtcblxuZnVuY3Rpb24gb3B0aW4oKXtcblx0aWYobG9jYXRpb24uaGFzaC5pbmRleE9mKCdvcHRlZC12aWEnKSA+IC0xKXtcblx0XHR1dGlscy5kaXNwYXRjaE1lc3NhZ2VFdmVudChvcHRpbk1lc3NhZ2UsIHtkdXJhdGlvbjowLCBjbG9zZTpmYWxzZX0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3B0aW47XG4iLCJcbnZhciBtZXNzYWdlID0gZnVuY3Rpb24oY29udGVudCl7XG5cdHJldHVybiBgXG5cdDxzZWN0aW9uIGNsYXNzPVwibWVzc2FnZVwiPlxuXHRcdDxkaXYgY2xhc3M9XCJtZXNzYWdlX19jb250ZW50LXdyYXBwZXJcIj5cblx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtZXNzYWdlX19jbG9zZSBtZXNzYWdlX19jbG9zZS1qc1wiPkNsb3NlPC9hPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VfX2NvbnRlbnRcIj5cblx0XHRcdFx0JHtjb250ZW50fVxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvc2VjdGlvbj5cbmA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0bWVzc2FnZSA6IG1lc3NhZ2Vcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQgLCBuYW1lLCBkYXRhKXtcblx0dmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtkZXRhaWw6ZGF0YX0pO1xuXHRlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE1lc3NhZ2VFdmVudChtZXNzYWdlLCBvcHRpb25zKXtcblx0dmFyIGRhdGEgPSBvcHRpb25zIHx8IHt9O1xuXHRkYXRhLmNvbnRlbnQgPSBtZXNzYWdlO1xuXHRkYXRhLnR5cGUgPSAnbWVzc2FnZSc7XG5cdGRpc3BhdGNoRXZlbnQoZG9jdW1lbnQsICdGVC5NZXNzYWdlJywgZGF0YSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkaXNwYXRjaE1lc3NhZ2VFdmVudCA6IGRpc3BhdGNoTWVzc2FnZUV2ZW50XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBEZWxlZ2F0ZSA9IHJlcXVpcmUoJ2RvbS1kZWxlZ2F0ZScpO1xuXG52YXIgb3B0aW4gPSByZXF1aXJlKCcuL2pzL29wdGluJyk7XG5cbnZhciB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL2pzL3RlbXBsYXRlcycpO1xudmFyIGN1cnJlbnRNZXNzYWdlID0gbnVsbDtcbnZhciB0aW1lb3V0O1xudmFyIHRpbWVvdXREdXJhdGlvbiA9IDUwMDA7XG52YXIgYW5pbUR1cmF0aW9uID0gNTAwO1xuXG5mdW5jdGlvbiBsaXN0ZW5Gb3JDbG9zZUJ1dHRvbkNsaWNrKCl7XG5cdHZhciBjYWxsZWQgPSBmYWxzZTtcblx0dmFyIGZ1bmMgPSBmdW5jdGlvbigpe1xuXG5cdFx0dmFyIGRlbGVnYXRlID0gbmV3IERlbGVnYXRlKGRvY3VtZW50LmJvZHkpO1xuXHRcdGRlbGVnYXRlLm9uKCdjbGljaycsICcubWVzc2FnZV9fY2xvc2UtanMnLCBoaWRlTWVzc2FnZSk7XG5cdH07XG5cblx0aWYoIWNhbGxlZCl7XG5cdFx0ZnVuYygpO1xuXHRcdGNhbGxlZCA9IHRydWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2hvd01lc3NhZ2Uob3B0aW9ucyl7XG5cdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0bGlzdGVuRm9yQ2xvc2VCdXR0b25DbGljaygpO1xuXHRpZihjdXJyZW50TWVzc2FnZSl7XG5cdFx0Y3VycmVudE1lc3NhZ2UuZmlyc3RDaGlsZC5pbm5lckhUTUwgPSBvcHRpb25zLmNvbnRlbnQ7XG5cdH1lbHNle1xuXHRcdHZhciBodG1sID0gdGVtcGxhdGVzW29wdGlvbnMudHlwZV0ob3B0aW9ucy5jb250ZW50KTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbCk7XG5cdFx0Y3VycmVudE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZScpO1xuXHR9XG5cdGlmKG9wdGlvbnMuY2xvc2UgIT09IGZhbHNlKSB7XG5cdFx0Y3VycmVudE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnLm1lc3NhZ2UtLXNob3ctY2xvc2UnKTtcblx0fVxuXG5cdGN1cnJlbnRNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcblx0aWYob3B0aW9ucy5kdXJhdGlvbiAhPT0gMCl7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoaGlkZU1lc3NhZ2UsIG9wdGlvbnMuZHVyYXRpb24gfHwgdGltZW91dER1cmF0aW9uKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoaWRlTWVzc2FnZSgpe1xuXHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdGN1cnJlbnRNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdGlmKGN1cnJlbnRNZXNzYWdlICYmIGN1cnJlbnRNZXNzYWdlLnBhcmVudE5vZGUpe1xuXHRcdFx0Y3VycmVudE1lc3NhZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjdXJyZW50TWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0Y3VycmVudE1lc3NhZ2UgPSBudWxsO1xuXHR9LCBhbmltRHVyYXRpb24pO1xufVxuXG5mdW5jdGlvbiBpbml0KCl7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJGVC5NZXNzYWdlXCIsIGZ1bmN0aW9uKGUpe1xuXHRcdHZhciBkYXRhID0gZS5kZXRhaWw7XG5cdFx0ZGF0YS50eXBlID0gXCJtZXNzYWdlXCI7XG5cdFx0c2hvd01lc3NhZ2UoZGF0YSk7XG5cdH0pO1xuXG5cdG9wdGluKCk7XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0aW5pdCA6IGluaXQsXG5cdHNob3dNZXNzYWdlOiBzaG93TWVzc2FnZVxufTtcblxuIl19
