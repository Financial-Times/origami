/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Promise = __webpack_require__(1)['default'];
	
	var define = false;
	
	var factory = __webpack_require__(56);
	var init = function init(opts) {
		var options = opts || {};
		var defaultOpts = {
			context: document.body,
			selector: '*'
		};
		for (var defaultOpt in defaultOpts) {
			if (defaultOpts.hasOwnProperty(defaultOpt) && !options.hasOwnProperty(defaultOpt)) {
				options[defaultOpt] = defaultOpts[defaultOpt];
			}
		}
		var context = options.context instanceof HTMLElement ? options.context : document.querySelector(opts.context);
		var videoPromises = [].map.call(context.querySelectorAll(options.selector + ':not([data-n-video-js])[data-n-component~="n-video"]'), function (videoEl) {
			return factory(videoEl, options).init()
			// don't fail all if a video errors
			['catch'](function () {});
		});
		return _Promise.all(videoPromises);
	};
	
	module.exports = {
		init: init,
		factory: factory
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(28);
	__webpack_require__(35);
	module.exports = __webpack_require__(12).Promise;

/***/ },
/* 3 */
/***/ function(module, exports) {



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(5)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(8)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(6)
	  , defined   = __webpack_require__(7);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(9)
	  , $export        = __webpack_require__(10)
	  , redefine       = __webpack_require__(15)
	  , hide           = __webpack_require__(16)
	  , has            = __webpack_require__(21)
	  , Iterators      = __webpack_require__(22)
	  , $iterCreate    = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , getProto       = __webpack_require__(17).getProto
	  , ITERATOR       = __webpack_require__(25)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(12)
	  , ctx       = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(14);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(17)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(19) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(20)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(17)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(24)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(16)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(17).setDesc
	  , has = __webpack_require__(21)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(26)('wks')
	  , uid    = __webpack_require__(27)
	  , Symbol = __webpack_require__(11).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	var Iterators = __webpack_require__(22);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(30)
	  , step             = __webpack_require__(31)
	  , Iterators        = __webpack_require__(22)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(8)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(7);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(17)
	  , LIBRARY    = __webpack_require__(9)
	  , global     = __webpack_require__(11)
	  , ctx        = __webpack_require__(13)
	  , classof    = __webpack_require__(36)
	  , $export    = __webpack_require__(10)
	  , isObject   = __webpack_require__(37)
	  , anObject   = __webpack_require__(38)
	  , aFunction  = __webpack_require__(14)
	  , strictNew  = __webpack_require__(39)
	  , forOf      = __webpack_require__(40)
	  , setProto   = __webpack_require__(45).set
	  , same       = __webpack_require__(46)
	  , SPECIES    = __webpack_require__(25)('species')
	  , speciesConstructor = __webpack_require__(47)
	  , asap       = __webpack_require__(48)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(19)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(53)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(24)(P, PROMISE);
	__webpack_require__(54)(PROMISE);
	Wrapper = __webpack_require__(12)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(55)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(37);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(13)
	  , call        = __webpack_require__(41)
	  , isArrayIter = __webpack_require__(42)
	  , anObject    = __webpack_require__(38)
	  , toLength    = __webpack_require__(43)
	  , getIterFn   = __webpack_require__(44);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(38);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(22)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(6)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(36)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(22);
	module.exports = __webpack_require__(12).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(17).getDesc
	  , isObject = __webpack_require__(37)
	  , anObject = __webpack_require__(38);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(13)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(38)
	  , aFunction = __webpack_require__(14)
	  , SPECIES   = __webpack_require__(25)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , macrotask = __webpack_require__(49).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(13)
	  , invoke             = __webpack_require__(50)
	  , html               = __webpack_require__(51)
	  , cel                = __webpack_require__(52)
	  , global             = __webpack_require__(11)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(34)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(37)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(15);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(12)
	  , $           = __webpack_require__(17)
	  , DESCRIPTORS = __webpack_require__(19)
	  , SPECIES     = __webpack_require__(25)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	var Video = __webpack_require__(57);
	var Brightcove = __webpack_require__(68);
	var BrightcovePlayer = __webpack_require__(83);
	var YouTube = __webpack_require__(84);
	
	module.exports = function (el, opts) {
		var source = el.getAttribute('data-n-video-source').toLowerCase();
		var player = (el.getAttribute('data-n-video-player') || 'html5').toLowerCase();
		if (source === 'brightcove') {
			if (player === 'brightcove') {
				return new BrightcovePlayer(el, opts);
			}
			return new Brightcove(el, opts);
		} else if (source === 'youtube') {
			return new YouTube(el, opts);
		} else {
			return new Video(el, opts);
		}
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _createClass = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(61)['default'];
	
	var _Object$keys = __webpack_require__(62)['default'];
	
	var _Promise = __webpack_require__(1)['default'];
	
	var define = false;
	
	var getDomPathTokens = __webpack_require__(67);
	
	var Video = (function () {
		function Video(el, opts) {
			var _this = this;
	
			_classCallCheck(this, Video);
	
			this.containerEl = el;
			var defaultOpts = {
				classes: [],
				optimumWidth: null,
				placeholder: false,
				placeholderTitle: false,
				playButton: true,
				data: null
			};
			this.opts = {};
			_Object$keys(defaultOpts).forEach(function (optionName) {
				var attributeName = optionName.replace(/[A-Z]/g, function (match) {
					return '-' + match.toLowerCase();
				});
				var optionAttribute = _this.containerEl.getAttribute('data-n-video-opts-' + attributeName);
				if (optionAttribute) {
					// parse as JSON, if 'data' attribute
					_this.opts[optionName] = optionName === 'data' ? JSON.parse(optionAttribute) : optionAttribute;
				} else if (opts && typeof opts[optionName] !== 'undefined') {
					_this.opts[optionName] = opts[optionName];
				} else {
					_this.opts[optionName] = defaultOpts[optionName];
				}
			});
			this.classes = typeof this.opts.classes === 'string' ? this.opts.classes.split(' ') : this.opts.classes.slice();
			this.classes.push('n-video__video');
			this.id = el.getAttribute('data-n-video-id');
			this.el;
			this.placeholderEl;
			this.domPathTokens = getDomPathTokens(this.containerEl);
			this.domPath = this.domPathTokens.reverse().join(' | ');
			this.containerEl.setAttribute('data-n-video-js', '');
		}
	
		_createClass(Video, [{
			key: 'init',
			value: function init() {
				return _Promise.resolve(this);
			}
		}]);
	
		return Video;
	})();
	
	module.exports = Video;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(59)["default"];
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	
	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(17);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(12).Object.keys;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(65);
	
	__webpack_require__(66)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(7);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(10)
	  , core    = __webpack_require__(12)
	  , fails   = __webpack_require__(20);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	var getDomPath = function getDomPath(_x, _x2) {
		var _again = true;
	
		_function: while (_again) {
			var el = _x,
			    path = _x2;
			_again = false;
	
			path = path || [];
			if (!el.parentNode) {
				return path;
			}
	
			var trackable = el.getAttribute('data-trackable');
	
			if (trackable) {
				path.push(trackable);
			}
	
			if (el.hasAttribute('data-trackable-terminate')) {
				return path;
			}
	
			_x = el.parentNode;
			_x2 = path;
			_again = true;
			trackable = undefined;
			continue _function;
		}
	};
	
	module.exports = getDomPath;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _get = __webpack_require__(69)['default'];
	
	var _inherits = __webpack_require__(73)['default'];
	
	var _createClass = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(61)['default'];
	
	var _Promise = __webpack_require__(1)['default'];
	
	var define = false;
	
	/* global fetch */
	var crossDomainFetch = __webpack_require__(79).crossDomainFetch;
	var Video = __webpack_require__(57);
	var getAppropriateRendition = __webpack_require__(81);
	
	var currentlyPlayingVideo = null;
	var requestedVideo = null;
	
	var pauseOtherVideos = function pauseOtherVideos(video) {
		requestedVideo = video;
		if (currentlyPlayingVideo && currentlyPlayingVideo !== requestedVideo) {
			currentlyPlayingVideo.pause();
		}
	
		currentlyPlayingVideo = video;
	};
	
	var clearCurrentlyPlaying = function clearCurrentlyPlaying() {
		if (currentlyPlayingVideo !== requestedVideo) {
			currentlyPlayingVideo = null;
		}
	};
	
	var eventListener = function eventListener(video, ev) {
		var event = new CustomEvent('oTracking.event', {
			detail: {
				action: 'media',
				category: 'video',
				event: ev.type,
				mediaType: 'video',
				contentId: video.id,
				progress: video.getProgress()
			},
			bubbles: true
		});
		document.body.dispatchEvent(event);
	};
	
	var addEvents = function addEvents(video, events) {
		events.forEach(function (event) {
			video.el.addEventListener(event, eventListener.bind(undefined, video));
		});
	};
	
	// use the image resizing service, if width supplied
	var updatePosterUrl = function updatePosterUrl(posterImage, width) {
		var url = 'https://image.webservices.ft.com/image/v1/images/raw/' + encodeURIComponent(posterImage) + '?source=o-video';
		if (width) {
			url += '&fit=scale-down&width=' + width;
		}
		return url;
	};
	
	var Brightcove = (function (_Video) {
		_inherits(Brightcove, _Video);
	
		function Brightcove(el, opts) {
			_classCallCheck(this, Brightcove);
	
			_get(Object.getPrototypeOf(Brightcove.prototype), 'constructor', this).call(this, el, opts);
		}
	
		_createClass(Brightcove, [{
			key: 'getData',
			value: function getData() {
				var _this = this;
	
				var dataPromise = this.opts.data ? _Promise.resolve(this.opts.data) : crossDomainFetch('//next-video.ft.com/api/' + this.id).then(function (response) {
					if (response.ok) {
						return response.json();
					} else {
						throw Error('Brightcove responded with a ' + response.status + ' (' + response.statusText + ') for id ' + _this.id);
					}
				});
	
				return dataPromise.then(function (data) {
					_this.brightcoveData = data;
					_this.posterImage = updatePosterUrl(data.videoStillURL, _this.opts.optimumWidth);
					_this.rendition = getAppropriateRendition(data.renditions);
				});
			}
		}, {
			key: 'renderVideo',
			value: function renderVideo() {
				if (this.rendition) {
					if (this.opts.placeholder) {
						this.addPlaceholder();
					} else {
						this.addVideo();
					}
				}
				return this;
			}
		}, {
			key: 'init',
			value: function init() {
				var _this2 = this;
	
				return this.getData().then(function () {
					return _this2.renderVideo();
				});
			}
		}, {
			key: 'info',
			value: function info() {
				var date = new Date(+this.brightcoveData.publishedDate);
				return {
					posterImage: this.posterImage,
					id: this.brightcoveData.id,
					length: this.brightcoveData.length,
					longDescription: this.brightcoveData.longDescription,
					name: this.brightcoveData.name,
					publishedDate: date.toISOString(),
					publishedDateReadable: date.toUTCString(),
					shortDescription: this.brightcoveData.shortDescription,
					tags: this.brightcoveData.tags
				};
			}
		}, {
			key: 'addVideo',
			value: function addVideo() {
				var _this3 = this;
	
				this.el = document.createElement('video');
				this.el.setAttribute('controls', true);
				this.el.setAttribute('poster', this.posterImage);
				this.el.setAttribute('src', this.rendition.url);
				this.el.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
				this.containerEl.classList.add('n-video--player');
				this.containerEl.appendChild(this.el);
				addEvents(this, ['play', 'pause', 'ended']);
				this.el.addEventListener('playing', function () {
					return pauseOtherVideos(_this3.el);
				});
				this.el.addEventListener('suspend', clearCurrentlyPlaying);
				this.el.addEventListener('ended', clearCurrentlyPlaying);
			}
		}, {
			key: 'addPlaceholder',
			value: function addPlaceholder() {
				var _this4 = this;
	
				this.placeholderEl = document.createElement('img');
				this.placeholderEl.setAttribute('src', this.posterImage);
				this.placeholderEl.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
				this.containerEl.classList.add('n-video--placeholder');
				this.containerEl.appendChild(this.placeholderEl);
	
				var titleEl = undefined;
				if (this.opts.placeholderTitle) {
					titleEl = document.createElement('div');
					titleEl.className = 'n-video__title';
					titleEl.textContent = this.brightcoveData.name;
					this.containerEl.appendChild(titleEl);
				}
	
				if (this.opts.playButton) {
					(function () {
	
						var playButtonEl = document.createElement('button');
						playButtonEl.className = 'n-video__play-button';
						playButtonEl.setAttribute('data-trackable', 'play button');
	
						var playButtonTextEl = document.createElement('dd');
						playButtonTextEl.className = 'n-video__play-button-text';
						playButtonTextEl.textContent = 'Play video';
						playButtonEl.appendChild(playButtonTextEl);
	
						var playIconEl = document.createElement('i');
						playIconEl.className = 'n-video__play-button-icon';
						playButtonEl.appendChild(playIconEl);
	
						_this4.containerEl.appendChild(playButtonEl);
	
						playButtonEl.addEventListener('click', function () {
							_this4.containerEl.removeChild(playButtonEl);
							if (titleEl) {
								_this4.containerEl.removeChild(titleEl);
							}
							_this4.removePlaceholder();
							_this4.addVideo();
							_this4.el.play();
							_this4.el.focus();
						});
					})();
				}
			}
		}, {
			key: 'removePlaceholder',
			value: function removePlaceholder() {
				this.containerEl.classList.remove('n-video--placeholder');
				this.containerEl.removeChild(this.placeholderEl);
			}
		}, {
			key: 'getProgress',
			value: function getProgress() {
				return this.el.duration ? parseInt(100 * this.el.currentTime / this.el.duration, 10) : 0;
			}
		}]);
	
		return Brightcove;
	})(Video);
	
	module.exports = Brightcove;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(70)["default"];
	
	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;
	
	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    _again = false;
	    if (object === null) object = Function.prototype;
	
	    var desc = _Object$getOwnPropertyDescriptor(object, property);
	
	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);
	
	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        desc = parent = undefined;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;
	
	      if (getter === undefined) {
	        return undefined;
	      }
	
	      return getter.call(receiver);
	    }
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(17);
	__webpack_require__(72);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(32);
	
	__webpack_require__(66)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(74)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(76)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(17);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	module.exports = __webpack_require__(12).Object.setPrototypeOf;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(10);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(45).set});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(80);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Object$keys = __webpack_require__(62)['default'];
	
	var _Promise = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var define = false;
	
	var jsonpCallbackNames = [];
	
	var generateCallbackName = function generateCallbackName() {
		var base = 'jsonpCallback';
		var callbackName = base + '_' + (jsonpCallbackNames.length + 1);
		jsonpCallbackNames.push(callbackName);
		return callbackName;
	};
	
	var crossDomainFetch = function crossDomainFetch() {
		var crossDomainFetch = 'withCredentials' in new XMLHttpRequest() ? fetch : jsonpFetch;
		return crossDomainFetch.apply(undefined, arguments);
	};
	
	var jsonpFetch = function jsonpFetch(url, opts) {
		var defaultOpts = {
			timeout: 2000
		};
		opts = opts || {};
		_Object$keys(defaultOpts).forEach(function (defaultOptsKey) {
			if (!opts.hasOwnProperty(defaultOptsKey)) {
				opts[defaultOptsKey] = defaultOpts[defaultOptsKey];
			}
		});
		return new _Promise(function (resolve, reject) {
			var callbackName = generateCallbackName();
			var timeout = undefined;
			window.FT = window.FT || {};
			window.FT[callbackName] = function (response) {
				var status = response.status ? response.status : 200;
				resolve({
					ok: Math.floor(status / 100) === 2,
					status: status,
					json: function json() {
						return _Promise.resolve(response.body || response);
					}
				});
				if (timeout) {
					clearTimeout(timeout);
				}
			};
	
			var scriptTag = document.createElement('script');
			scriptTag.defer = true;
			scriptTag.src = '' + url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=FT.' + callbackName;
			document.body.appendChild(scriptTag);
	
			timeout = setTimeout(function () {
				reject(new Error('JSONP request to ' + url + ' timed out'));
			}, opts.timeout);
		});
	};
	
	exports['default'] = jsonpFetch;
	exports.crossDomainFetch = crossDomainFetch;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	var supportedFormats = __webpack_require__(82);
	
	module.exports = function (renditions, options) {
		// allow mocking of supported formats module
		var opts = options || {};
		var width = opts.width;
		var formats = opts.supportedFormats || supportedFormats;
		var appropriateRendition = undefined;
		// order smallest to largest
		var orderedRenditions = renditions.filter(function (rendition) {
			return formats.indexOf(rendition.videoCodec.toLowerCase()) > -1;
		}).sort(function (renditionOne, renditionTwo) {
			return renditionOne.frameWidth - renditionTwo.frameWidth;
		});
	
		// if no width supplied, get largest
		if (!width) {
			return orderedRenditions.pop();
		}
		// NOTE: rather use find...
		orderedRenditions.some(function (rendition) {
			if (rendition.frameWidth >= width) {
				appropriateRendition = rendition;
				return true;
			}
			return false;
		});
	
		return appropriateRendition || orderedRenditions.shift();
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Object$keys = __webpack_require__(62)['default'];
	
	var define = false;
	
	var testEl = document.createElement('video');
	
	var formats = {
		mpeg4: ['video/mp4; codecs="mp4v.20.8"'],
		h264: ['video/mp4; codecs="avc1.42E01E"', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'],
		ogg: ['video/ogg; codecs="theora"'],
		webm: ['video/webm; codecs="vp8, vorbis"']
	};
	
	var supportedFormats = [];
	if (testEl.canPlayType) {
		try {
			supportedFormats = _Object$keys(formats).filter(function (format) {
				return formats[format].some(function (type) {
					return testEl.canPlayType(type);
				});
			});
		} catch (e) {}
	}
	
	module.exports = supportedFormats;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _get = __webpack_require__(69)['default'];
	
	var _inherits = __webpack_require__(73)['default'];
	
	var _createClass = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(61)['default'];
	
	var _Promise = __webpack_require__(1)['default'];
	
	var define = false;
	
	/*global videojs*/
	var Video = __webpack_require__(57);
	
	var playerInstanceId = 0;
	
	var ACCOUNT_ID = '47628783001';
	var PLAYER_ID = '0e517ef5-7b18-4307-9244-4d7a31591a9e';
	
	var eventListener = function eventListener(video, ev) {
		var event = document.createEvent('Event');
		event.initEvent('beacon:media', true, true);
		event.detail = {
			mediaType: 'video',
			contentId: video.id,
			domPath: video.domPath,
			domPathTokens: video.domPathTokens,
			event: ev.type
		};
		document.body.dispatchEvent(event);
	};
	
	var brightcoveLibraryLoadPromise = undefined;
	
	var ensureBrightcoveLibraryLoaded = function ensureBrightcoveLibraryLoaded() {
		if (brightcoveLibraryLoadPromise) {
			return brightcoveLibraryLoadPromise;
		}
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', '//players.brightcove.net/' + ACCOUNT_ID + '/' + PLAYER_ID + '_default/index.min.js');
		script.setAttribute('async', true);
		script.setAttribute('defer', true);
		document.getElementsByTagName("head")[0].appendChild(script);
		brightcoveLibraryLoadPromise = new _Promise(function (resolve) {
			script.addEventListener('load', function () {
				resolve();
			});
		});
		return brightcoveLibraryLoadPromise;
	};
	
	var BrightcovePlayer = (function (_Video) {
		_inherits(BrightcovePlayer, _Video);
	
		function BrightcovePlayer(el, opts) {
			_classCallCheck(this, BrightcovePlayer);
	
			_get(Object.getPrototypeOf(BrightcovePlayer.prototype), 'constructor', this).call(this, el, opts);
			playerInstanceId++;
			this.instanceId = playerInstanceId;
		}
	
		_createClass(BrightcovePlayer, [{
			key: 'init',
			value: function init() {
				var _this = this;
	
				var videoId = this.containerEl.getAttribute('data-n-video-id');
				var brightcovePlayerInstance = this;
				this.containerEl.innerHTML = '<div class="n-video__brightcove-player"><video\n\t\t\t\tid="brightcove-player-' + this.instanceId + '"\n\t\t\t\tdata-account="' + ACCOUNT_ID + '"\n\t\t\t\tdata-player="' + PLAYER_ID + '"\n\t\t\t\tdata-embed="default"\n\t\t\t\tdata-video-id="' + videoId + '"\n\t\t\t\tclass="video-js"\n\t\t\t\tcontrols></video></div>';
				return ensureBrightcoveLibraryLoaded().then(function () {
					videojs('brightcove-player-' + brightcovePlayerInstance.instanceId).ready(function () {
						['play', 'pause', 'ended'].forEach(function (eventName) {
							_this.on(eventName, eventListener.bind(_this, brightcovePlayerInstance));
						}, _this);
					});
				});
			}
		}]);
	
		return BrightcovePlayer;
	})(Video);
	
	module.exports = BrightcovePlayer;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _get = __webpack_require__(69)['default'];
	
	var _inherits = __webpack_require__(73)['default'];
	
	var _createClass = __webpack_require__(58)['default'];
	
	var _classCallCheck = __webpack_require__(61)['default'];
	
	var _Promise = __webpack_require__(1)['default'];
	
	var define = false;
	
	var Video = __webpack_require__(57);
	
	var YouTube = (function (_Video) {
		_inherits(YouTube, _Video);
	
		function YouTube(el, opts) {
			_classCallCheck(this, YouTube);
	
			_get(Object.getPrototypeOf(YouTube.prototype), 'constructor', this).call(this, el, opts);
		}
	
		_createClass(YouTube, [{
			key: 'init',
			value: function init() {
				this.el = document.createElement('iframe');
				var attrs = {
					src: 'https://youtube.com/embed/' + this.id,
					height: '315',
					width: '560',
					frameborder: '0',
					webkitallowfullscreen: 'true',
					mozallowfullscreen: 'true',
					allowfullscreen: 'true'
				};
				for (var attr in attrs) {
					if (attrs.hasOwnProperty(attr)) {
						this.el.setAttribute(attr, attrs[attr]);
					}
				}
				this.containerEl.appendChild(this.el);
				return _Promise.resolve(this);
			}
		}]);
	
		return YouTube;
	})(Video);
	
	module.exports = YouTube;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map