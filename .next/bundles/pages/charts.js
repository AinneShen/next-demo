
          window.__NEXT_REGISTER_PAGE('/charts', function() {
            var comp = module.exports =
webpackJsonp([6],[
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(46)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(66);
var toPrimitive = __webpack_require__(43);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(136);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(44);
var defined = __webpack_require__(40);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(40);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(93);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(100)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(41)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(71);
var isArrayIter = __webpack_require__(72);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(28);
var getIterFn = __webpack_require__(56);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(68);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(90);
var enumBugKeys = __webpack_require__(47);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(42)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(69).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(39);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(60);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(29)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(129);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(133);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(60);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(33);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(26);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(67);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(101);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(70);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(46)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 48 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(26);
var wksExt = __webpack_require__(49);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(137)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(31);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(120);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(122);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(43);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(66);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(37);
  var warning = __webpack_require__(38);
  var ReactPropTypesSecret = __webpack_require__(77);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(98);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(42)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(102)(false);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(15);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(68);
var hiddenKeys = __webpack_require__(47).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(139);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(58);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(143);
var html = __webpack_require__(69);
var cel = __webpack_require__(42);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(54);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGetInitialProps = undefined;

var _regenerator = __webpack_require__(78);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(79);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(86);

var _assign2 = _interopRequireDefault(_assign);

var loadGetInitialProps = exports.loadGetInitialProps = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(Component, ctx) {
    var props, compName, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Component.getInitialProps) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {});

          case 2:
            _context.next = 4;
            return Component.getInitialProps(ctx);

          case 4:
            props = _context.sent;

            if (!(!props && (!ctx.res || !ctx.res.finished))) {
              _context.next = 9;
              break;
            }

            compName = getDisplayName(Component);
            message = '"' + compName + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
            throw new Error(message);

          case 9:
            return _context.abrupt('return', props);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadGetInitialProps(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.warn = warn;
exports.execOnce = execOnce;
exports.deprecated = deprecated;
exports.printAndExit = printAndExit;
exports.getDisplayName = getDisplayName;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warn(message) {
  if (true) {
    console.error(message);
  }
}

function execOnce(fn) {
  var _this = this;

  var used = false;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!used) {
      used = true;
      fn.apply(_this, args);
    }
  };
}

function deprecated(fn, message) {
  if (false) return fn;

  var warned = false;
  var newFn = function newFn() {
    if (!warned) {
      warned = true;
      console.error(message);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(this, args);
  };

  // copy all properties
  (0, _assign2.default)(newFn, fn);

  return newFn;
}

function printAndExit(message) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }

  process.exit(code);
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function getLocationOrigin() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname,
      port = _window$location.port;

  return protocol + '//' + hostname + (port ? ':' + port : '');
}

function getURL() {
  var href = window.location.href;

  var origin = getLocationOrigin();
  return href.substring(origin.length);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(96)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(24);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(109);
exports.encode = exports.stringify = __webpack_require__(110);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 94 */,
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 97 */,
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(104);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(39);
var defined = __webpack_require__(40);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(27);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(103);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(39);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(8);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(15);
var call = __webpack_require__(71);
var isArrayIter = __webpack_require__(72);
var toLength = __webpack_require__(28);
var createProperty = __webpack_require__(105);
var getIterFn = __webpack_require__(56);

$export($export.S + $export.F * !__webpack_require__(73)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(107);
var step = __webpack_require__(74);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(41)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 111 */,
/* 112 */,
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(117) });


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(48);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(15);
var IObject = __webpack_require__(44);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(15);
var $getPrototypeOf = __webpack_require__(70);

__webpack_require__(59)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(25);
module.exports = __webpack_require__(49).f('iterator');


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
__webpack_require__(51);
__webpack_require__(127);
__webpack_require__(128);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(67);
var META = __webpack_require__(35).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(46);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(29);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(49);
var wksDefine = __webpack_require__(50);
var enumKeys = __webpack_require__(125);
var isArray = __webpack_require__(75);
var anObject = __webpack_require__(7);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(43);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(27);
var gOPNExt = __webpack_require__(126);
var $GOPD = __webpack_require__(61);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(24);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(76).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(48).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(26)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(24);
var gOPS = __webpack_require__(48);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13);
var gOPN = __webpack_require__(76).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50)('asyncIterator');


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50)('observable');


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(132).set });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(61).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(27) });


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(57);
var emptyObject = __webpack_require__(95);
var invariant = __webpack_require__(37);
var warning = __webpack_require__(38);
var emptyFunction = __webpack_require__(33);
var checkPropTypes = __webpack_require__(62);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function PureComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

function AsyncComponent(props, context, updater) {
  // Duplicated from Component.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = AsyncComponent;
// Avoid an extra prototype jump for these methods.
_assign(asyncComponentPrototype, Component.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_CALL_TYPE:
          case REACT_RETURN_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

{
  var currentlyValidatingElement = null;

  var propTypesMisspellWarningShown = false;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };

  var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!VALID_FRAGMENT_PROPS.has(key)) {
        warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = typeof type === 'string' || typeof type === 'function' || typeof type === 'symbol' || typeof type === 'number';
  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (typeof type === 'symbol' && type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  // Legacy hook TODO: Warn if this is accessed
  validatedFactory.type = type;

  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  Component: Component,
  PureComponent: PureComponent,
  unstable_AsyncComponent: AsyncComponent,

  Fragment: REACT_FRAGMENT_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(33);
var invariant = __webpack_require__(37);
var warning = __webpack_require__(38);
var assign = __webpack_require__(57);

var ReactPropTypesSecret = __webpack_require__(77);
var checkPropTypes = __webpack_require__(62);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(140);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(25);
__webpack_require__(142);
__webpack_require__(145);
__webpack_require__(146);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(26);
var global = __webpack_require__(3);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(31);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(5);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(53);
var forOf = __webpack_require__(23);
var speciesConstructor = __webpack_require__(80);
var task = __webpack_require__(81).set;
var microtask = __webpack_require__(144)();
var newPromiseCapabilityModule = __webpack_require__(54);
var perform = __webpack_require__(82);
var promiseResolve = __webpack_require__(83);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(55)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(22)($Promise, PROMISE);
__webpack_require__(84)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 143 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
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
  } return fn.apply(that, args);
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(81).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(80);
var promiseResolve = __webpack_require__(83);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(54);
var perform = __webpack_require__(82);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(4).f;
var create = __webpack_require__(27);
var redefineAll = __webpack_require__(55);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(53);
var forOf = __webpack_require__(23);
var $iterDefine = __webpack_require__(41);
var step = __webpack_require__(74);
var setSpecies = __webpack_require__(84);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(35).fastKey;
var validate = __webpack_require__(85);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(35);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(55);
var forOf = __webpack_require__(23);
var anInstance = __webpack_require__(53);
var isObject = __webpack_require__(5);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(4).f;
var each = __webpack_require__(149)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(44);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(28);
var asc = __webpack_require__(150);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(151);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(75);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(31);
var from = __webpack_require__(153);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(23);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(19);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(23);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(18);
__webpack_require__(25);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(147);
var validate = __webpack_require__(85);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(148)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(152)('Set') });


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(154)('Set');


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(155)('Set');


/***/ }),
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(88);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(65);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(16);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(17);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(34);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defaultHead = defaultHead;

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(52);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sideEffect = __webpack_require__(191);

var _sideEffect2 = _interopRequireDefault(_sideEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Head = function (_React$Component) {
  (0, _inherits3.default)(Head, _React$Component);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);
    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Head;
}(_react2.default.Component);

Head.contextTypes = {
  headManager: _propTypes2.default.object
};
function defaultHead() {
  return [_react2.default.createElement('meta', { charSet: 'utf-8', className: 'next-head' })];
}

function reduceComponents(components) {
  var _components$map$map$r;

  return (_components$map$map$r = components.map(function (c) {
    return c.props.children;
  }).map(function (children) {
    return _react2.default.Children.toArray(children);
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []).reverse()).concat.apply(_components$map$map$r, (0, _toConsumableArray3.default)(defaultHead())).filter(function (c) {
    return !!c;
  }).filter(unique()).reverse().map(function (c) {
    var className = (c.className ? c.className + ' ' : '') + 'next-head';
    return _react2.default.cloneElement(c, { className: className });
  });
}

function mapOnServer(head) {
  return head;
}

function onStateChange(head) {
  if (this.context && this.context.headManager) {
    this.context.headManager.updateHead(head);
  }
}

var METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp', 'property'];

// returns a function for filtering head child elements
// which shouldn't be duplicated, like <title/>.

function unique() {
  var tags = new _set2.default();
  var metaTypes = new _set2.default();
  var metaCategories = {};

  return function (h) {
    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) return false;
        tags.add(h.type);
        break;
      case 'meta':
        for (var i = 0, len = METATYPES.length; i < len; i++) {
          var metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === 'charSet') {
            if (metaTypes.has(metatype)) return false;
            metaTypes.add(metatype);
          } else {
            var category = h.props[metatype];
            var categories = metaCategories[metatype] || new _set2.default();
            if (categories.has(category)) return false;
            categories.add(category);
            metaCategories[metatype] = categories;
          }
        }
        break;
    }
    return true;
  };
}

exports.default = (0, _sideEffect2.default)(reduceComponents, onStateChange, mapOnServer)(Head);

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(16);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(17);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(34);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = __webpack_require__(65);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = __webpack_require__(88);

var _set2 = _interopRequireDefault(_set);

exports.default = withSideEffect;

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(87);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withSideEffect(reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reduceComponentsToState !== 'function') {
    throw new Error('Expected reduceComponentsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = new _set2.default();
    var state = void 0;

    function emitChange(component) {
      state = reduceComponentsToState([].concat((0, _toConsumableArray3.default)(mountedInstances)));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient.call(component, state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      (0, _inherits3.default)(SideEffect, _Component);

      function SideEffect() {
        (0, _classCallCheck3.default)(this, SideEffect);
        return (0, _possibleConstructorReturn3.default)(this, (SideEffect.__proto__ || (0, _getPrototypeOf2.default)(SideEffect)).apply(this, arguments));
      }

      (0, _createClass3.default)(SideEffect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          mountedInstances.add(this);
          emitChange(this);
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          emitChange(this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          mountedInstances.delete(this);
          emitChange(this);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            WrappedComponent,
            null,
            this.props.children
          );
        }
      }], [{
        key: 'peek',
        value: function peek() {
          return state;
        }

        // Expose canUseDOM so tests can monkeypatch it

        // Try to use displayName of wrapped component

      }, {
        key: 'rewind',
        value: function rewind() {
          if (SideEffect.canUseDOM) {
            throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
          }

          var recordedState = state;
          state = undefined;
          mountedInstances.clear();
          return recordedState;
        }
      }]);
      return SideEffect;
    }(_react.Component);

    SideEffect.displayName = 'SideEffect(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';
    SideEffect.contextTypes = WrappedComponent.contextTypes;
    SideEffect.canUseDOM = typeof window !== 'undefined';


    return SideEffect;
  };
}

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectGlobal", function() { return injectGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return wrapWithTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return ServerStyleSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return StyleSheetManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_plain_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_plain_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_is_function__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_is_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_is_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics__);







/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate$2(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate$2;

var hyphenate = hyphenate_1;

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

//      
var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).filter(function (key) {
    var chunk = obj[key];
    return chunk !== undefined && chunk !== null && chunk !== false && chunk !== '';
  }).map(function (key) {
    if (__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(obj[key])) return objToCss(obj[key], key);
    return hyphenateStyleName_1(key) + ': ' + obj[key] + ';';
  }).join(' ');
  return prevKey ? prevKey + ' {\n  ' + css + '\n}' : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet;
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [].concat(ruleSet, flatten(chunk, executionContext));

    /* Handle other components */
    // $FlowFixMe not sure how to make this pass
    if (chunk.hasOwnProperty('styledComponentId')) return [].concat(ruleSet, ['.' + chunk.styledComponentId]);

    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, flatten([chunk(executionContext)], executionContext)) : ruleSet.concat(chunk);
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

//      
var stylis = new __WEBPACK_IMPORTED_MODULE_1_stylis___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true
});

var stringifyRules = function stringifyRules(rules, selector, prefix) {
  var flatCSS = rules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  return stylis(prefix || !selector ? '' : selector, cssStr);
};

//      
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var charsLength = chars.length;

/* Some high number, usually 9-digit base-10. Map it to base-😎 */
var generateAlphabeticName = function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = chars[x % charsLength] + name;
  }

  return chars[x % charsLength] + name;
};

//      


var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

//      
var css = (function (strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(strings, interpolations));
});

//      
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s+(\S+)\s+\*\//mg;

var extractCompsFromCSS = (function (maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
});

//      
/* eslint-disable camelcase, no-undef */

var getNonce = (function () {
                                     return  true ? __webpack_require__.nc : null;
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

//      
/* eslint-disable no-underscore-dangle */
/*
 * Browser Style Sheet with Rehydration
 *
 * <style data-styled-components="x y z"
 *        data-styled-components-is-local="true">
 *   /· sc-component-id: a ·/
 *   .sc-a { ... }
 *   .x { ... }
 *   /· sc-component-id: b ·/
 *   .sc-b { ... }
 *   .y { ... }
 *   .z { ... }
 * </style>
 *
 * Note: replace · with * in the above snippet.
 * */
var COMPONENTS_PER_TAG = 40;

var BrowserTag = function () {
  function BrowserTag(el, isLocal) {
    var existingSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    classCallCheck(this, BrowserTag);

    this.el = el;
    this.isLocal = isLocal;
    this.ready = false;

    var extractedComps = extractCompsFromCSS(existingSource);

    this.size = extractedComps.length;
    this.components = extractedComps.reduce(function (acc, obj) {
      acc[obj.componentId] = obj; // eslint-disable-line no-param-reassign
      return acc;
    }, {});
  }

  BrowserTag.prototype.isFull = function isFull() {
    return this.size >= COMPONENTS_PER_TAG;
  };

  BrowserTag.prototype.addComponent = function addComponent(componentId) {
    if (!this.ready) this.replaceElement();
    if (this.components[componentId]) throw new Error('Trying to add Component \'' + componentId + '\' twice!');

    var comp = { componentId: componentId, textNode: document.createTextNode('') };
    this.el.appendChild(comp.textNode);

    this.size += 1;
    this.components[componentId] = comp;
  };

  BrowserTag.prototype.inject = function inject(componentId, css, name) {
    if (!this.ready) this.replaceElement();
    var comp = this.components[componentId];

    if (!comp) throw new Error('Must add a new component before you can inject css into it');
    if (comp.textNode.data === '') comp.textNode.appendData('\n/* sc-component-id: ' + componentId + ' */\n');

    comp.textNode.appendData(css);
    if (name) {
      var existingNames = this.el.getAttribute(SC_ATTR);
      this.el.setAttribute(SC_ATTR, existingNames ? existingNames + ' ' + name : name);
    }

    var nonce = getNonce();

    if (nonce) {
      this.el.setAttribute('nonce', nonce);
    }
  };

  BrowserTag.prototype.toHTML = function toHTML() {
    return this.el.outerHTML;
  };

  BrowserTag.prototype.toReactElement = function toReactElement() {
    throw new Error('BrowserTag doesn\'t implement toReactElement!');
  };

  BrowserTag.prototype.clone = function clone() {
    throw new Error('BrowserTag cannot be cloned!');
  };

  /* Because we care about source order, before we can inject anything we need to
   * create a text node for each component and replace the existing CSS. */


  BrowserTag.prototype.replaceElement = function replaceElement() {
    var _this = this;

    this.ready = true;
    // We have nothing to inject. Use the current el.
    if (this.size === 0) return;

    // Build up our replacement style tag
    var newEl = this.el.cloneNode();
    newEl.appendChild(document.createTextNode('\n'));

    Object.keys(this.components).forEach(function (key) {
      var comp = _this.components[key];

      // eslint-disable-next-line no-param-reassign
      comp.textNode = document.createTextNode(comp.cssFromDOM);
      newEl.appendChild(comp.textNode);
    });

    if (!this.el.parentNode) throw new Error("Trying to replace an element that wasn't mounted!");

    // The ol' switcheroo
    this.el.parentNode.replaceChild(newEl, this.el);
    this.el = newEl;
  };

  return BrowserTag;
}();

/* Factory function to separate DOM operations from logical ones*/


var BrowserStyleSheet = {
  create: function create() {
    var tags = [];
    var names = {};

    /* Construct existing state from DOM */
    var nodes = document.querySelectorAll('[' + SC_ATTR + ']');
    var nodesLength = nodes.length;

    for (var i = 0; i < nodesLength; i += 1) {
      var el = nodes[i];

      tags.push(new BrowserTag(el, el.getAttribute(LOCAL_ATTR) === 'true', el.innerHTML));

      var attr = el.getAttribute(SC_ATTR);
      if (attr) {
        attr.trim().split(/\s+/).forEach(function (name) {
          names[name] = true;
        });
      }
    }

    /* Factory for making more tags */
    var tagConstructor = function tagConstructor(isLocal) {
      var el = document.createElement('style');
      el.type = 'text/css';
      el.setAttribute(SC_ATTR, '');
      el.setAttribute(LOCAL_ATTR, isLocal ? 'true' : 'false');
      if (!document.head) throw new Error('Missing document <head>');
      document.head.appendChild(el);
      return new BrowserTag(el, isLocal);
    };

    return new StyleSheet(tagConstructor, tags, names);
  }
};

//      
var SC_ATTR = 'data-styled-components';
var LOCAL_ATTR = 'data-styled-components-is-local';
var CONTEXT_KEY = '__styled-components-stylesheet__';

var instance = null;
// eslint-disable-next-line no-use-before-define
var clones = [];

var StyleSheet = function () {
  function StyleSheet(tagConstructor) {
    var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, StyleSheet);
    this.hashes = {};
    this.deferredInjections = {};
    this.stylesCacheable = typeof document !== 'undefined';

    this.tagConstructor = tagConstructor;
    this.tags = tags;
    this.names = names;
    this.constructComponentTagMap();
  }

  // helper for `ComponentStyle` to know when it cache static styles.
  // staticly styled-component can not safely cache styles on the server
  // without all `ComponentStyle` instances saving a reference to the
  // the styleSheet instance they last rendered with,
  // or listening to creation / reset events. otherwise you might create
  // a component with one stylesheet and render it another api response
  // with another, losing styles on from your server-side render.


  StyleSheet.prototype.constructComponentTagMap = function constructComponentTagMap() {
    var _this = this;

    this.componentTags = {};

    this.tags.forEach(function (tag) {
      Object.keys(tag.components).forEach(function (componentId) {
        _this.componentTags[componentId] = tag;
      });
    });
  };

  /* Best level of caching—get the name from the hash straight away. */


  StyleSheet.prototype.getName = function getName(hash) {
    return this.hashes[hash.toString()];
  };

  /* Second level of caching—if the name is already in the dom, don't
   * inject anything and record the hash for getName next time. */


  StyleSheet.prototype.alreadyInjected = function alreadyInjected(hash, name) {
    if (!this.names[name]) return false;

    this.hashes[hash.toString()] = name;
    return true;
  };

  /* Third type of caching—don't inject components' componentId twice. */


  StyleSheet.prototype.hasInjectedComponent = function hasInjectedComponent(componentId) {
    return !!this.componentTags[componentId];
  };

  StyleSheet.prototype.deferredInject = function deferredInject(componentId, isLocal, css) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.deferredInject(componentId, isLocal, css);
      });
    }

    this.getOrCreateTag(componentId, isLocal);
    this.deferredInjections[componentId] = css;
  };

  StyleSheet.prototype.inject = function inject(componentId, isLocal, css, hash, name) {
    if (this === instance) {
      clones.forEach(function (clone) {
        clone.inject(componentId, isLocal, css);
      });
    }

    var tag = this.getOrCreateTag(componentId, isLocal);

    var deferredInjection = this.deferredInjections[componentId];
    if (deferredInjection) {
      tag.inject(componentId, deferredInjection);
      delete this.deferredInjections[componentId];
    }

    tag.inject(componentId, css, name);

    if (hash && name) {
      this.hashes[hash.toString()] = name;
    }
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    return this.tags.map(function (tag, i) {
      return tag.toReactElement('sc-' + i);
    });
  };

  StyleSheet.prototype.getOrCreateTag = function getOrCreateTag(componentId, isLocal) {
    var existingTag = this.componentTags[componentId];
    if (existingTag) {
      return existingTag;
    }

    var lastTag = this.tags[this.tags.length - 1];
    var componentTag = !lastTag || lastTag.isFull() || lastTag.isLocal !== isLocal ? this.createNewTag(isLocal) : lastTag;
    this.componentTags[componentId] = componentTag;
    componentTag.addComponent(componentId);
    return componentTag;
  };

  StyleSheet.prototype.createNewTag = function createNewTag(isLocal) {
    var newTag = this.tagConstructor(isLocal);
    this.tags.push(newTag);
    return newTag;
  };

  StyleSheet.reset = function reset(isServer) {
    instance = StyleSheet.create(isServer);
  };

  /* We can make isServer totally implicit once Jest 20 drops and we
   * can change environment on a per-test basis. */


  StyleSheet.create = function create() {
    var isServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : typeof document === 'undefined';

    return (isServer ? ServerStyleSheet : BrowserStyleSheet).create();
  };

  StyleSheet.clone = function clone(oldSheet) {
    var newSheet = new StyleSheet(oldSheet.tagConstructor, oldSheet.tags.map(function (tag) {
      return tag.clone();
    }), _extends({}, oldSheet.names));

    newSheet.hashes = _extends({}, oldSheet.hashes);
    newSheet.deferredInjections = _extends({}, oldSheet.deferredInjections);
    clones.push(newSheet);

    return newSheet;
  };

  createClass(StyleSheet, null, [{
    key: 'instance',
    get: function get$$1() {
      return instance || (instance = StyleSheet.create());
    }
  }]);
  return StyleSheet;
}();

var _StyleSheetManager$ch;

//      
var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager() {
    classCallCheck(this, StyleSheetManager);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StyleSheetManager.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[CONTEXT_KEY] = this.props.sheet, _ref;
  };

  StyleSheetManager.prototype.render = function render() {
    /* eslint-disable react/prop-types */
    // Flow v0.43.1 will report an error accessing the `children` property,
    // but v0.47.0 will not. It is necessary to use a type cast instead of
    // a "fixme" comment to satisfy both Flow versions.
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return StyleSheetManager;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

StyleSheetManager.childContextTypes = (_StyleSheetManager$ch = {}, _StyleSheetManager$ch[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired, _StyleSheetManager$ch);

StyleSheetManager.propTypes = {
  sheet: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]).isRequired
};

//      
/* eslint-disable no-underscore-dangle */
var ServerTag = function () {
  function ServerTag(isLocal) {
    classCallCheck(this, ServerTag);

    this.isLocal = isLocal;
    this.components = {};
    this.size = 0;
    this.names = [];
  }

  ServerTag.prototype.isFull = function isFull() {
    return false;
  };

  ServerTag.prototype.addComponent = function addComponent(componentId) {
    if (this.components[componentId]) throw new Error('Trying to add Component \'' + componentId + '\' twice!');
    this.components[componentId] = { componentId: componentId, css: '' };
    this.size += 1;
  };

  ServerTag.prototype.concatenateCSS = function concatenateCSS() {
    var _this = this;

    return Object.keys(this.components).reduce(function (styles, k) {
      return styles + _this.components[k].css;
    }, '');
  };

  ServerTag.prototype.inject = function inject(componentId, css, name) {
    var comp = this.components[componentId];

    if (!comp) throw new Error('Must add a new component before you can inject css into it');
    if (comp.css === '') comp.css = '/* sc-component-id: ' + componentId + ' */\n';

    comp.css += css.replace(/\n*$/, '\n');

    if (name) this.names.push(name);
  };

  ServerTag.prototype.toHTML = function toHTML() {
    var attrs = ['type="text/css"', SC_ATTR + '="' + this.names.join(' ') + '"', LOCAL_ATTR + '="' + (this.isLocal ? 'true' : 'false') + '"'];

    var nonce = getNonce();

    if (nonce) {
      attrs.push('nonce="' + nonce + '"');
    }

    return '<style ' + attrs.join(' ') + '>' + this.concatenateCSS() + '</style>';
  };

  ServerTag.prototype.toReactElement = function toReactElement(key) {
    var _attrs;

    var attrs = (_attrs = {}, _attrs[SC_ATTR] = this.names.join(' '), _attrs[LOCAL_ATTR] = this.isLocal.toString(), _attrs);

    var nonce = getNonce();

    if (nonce) {
      attrs.nonce = nonce;
    }

    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('style', _extends({
      key: key, type: 'text/css' }, attrs, {
      dangerouslySetInnerHTML: { __html: this.concatenateCSS() }
    }));
  };

  ServerTag.prototype.clone = function clone() {
    var _this2 = this;

    var copy = new ServerTag(this.isLocal);
    copy.names = [].concat(this.names);
    copy.size = this.size;
    copy.components = Object.keys(this.components).reduce(function (acc, key) {
      acc[key] = _extends({}, _this2.components[key]); // eslint-disable-line no-param-reassign
      return acc;
    }, {});

    return copy;
  };

  return ServerTag;
}();

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    this.instance = StyleSheet.clone(StyleSheet.instance);
  }

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.closed) throw new Error("Can't collect styles once you've called getStyleTags!");
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    if (!this.closed) {
      clones.splice(clones.indexOf(this.instance), 1);
      this.closed = true;
    }

    return this.instance.toReactElements();
  };

  ServerStyleSheet.create = function create() {
    return new StyleSheet(function (isLocal) {
      return new ServerTag(isLocal);
    });
  };

  return ServerStyleSheet;
}();

//      

var LIMIT = 200;

var createWarnTooManyClasses = (function (displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

//      
/* Trying to avoid the unknown-prop errors on styled components
 by filtering by React's attribute whitelist.
 */

/* Logic copied from ReactDOMUnknownPropertyHook */
var reactProps = {
  children: true,
  dangerouslySetInnerHTML: true,
  key: true,
  ref: true,
  autoFocus: true,
  defaultValue: true,
  valueLink: true,
  defaultChecked: true,
  checkedLink: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  onFocusIn: true,
  onFocusOut: true,
  className: true,

  /* List copied from https://facebook.github.io/react/docs/events.html */
  onCopy: true,
  onCut: true,
  onPaste: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onReset: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onScroll: true,
  onWheel: true,
  onAbort: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onProgress: true,
  onRateChange: true,
  onSeeked: true,
  onSeeking: true,
  onStalled: true,
  onSuspend: true,
  onTimeUpdate: true,
  onVolumeChange: true,
  onWaiting: true,
  onLoad: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true,

  onCopyCapture: true,
  onCutCapture: true,
  onPasteCapture: true,
  onCompositionEndCapture: true,
  onCompositionStartCapture: true,
  onCompositionUpdateCapture: true,
  onKeyDownCapture: true,
  onKeyPressCapture: true,
  onKeyUpCapture: true,
  onFocusCapture: true,
  onBlurCapture: true,
  onChangeCapture: true,
  onInputCapture: true,
  onSubmitCapture: true,
  onResetCapture: true,
  onClickCapture: true,
  onContextMenuCapture: true,
  onDoubleClickCapture: true,
  onDragCapture: true,
  onDragEndCapture: true,
  onDragEnterCapture: true,
  onDragExitCapture: true,
  onDragLeaveCapture: true,
  onDragOverCapture: true,
  onDragStartCapture: true,
  onDropCapture: true,
  onMouseDownCapture: true,
  onMouseEnterCapture: true,
  onMouseLeaveCapture: true,
  onMouseMoveCapture: true,
  onMouseOutCapture: true,
  onMouseOverCapture: true,
  onMouseUpCapture: true,
  onSelectCapture: true,
  onTouchCancelCapture: true,
  onTouchEndCapture: true,
  onTouchMoveCapture: true,
  onTouchStartCapture: true,
  onScrollCapture: true,
  onWheelCapture: true,
  onAbortCapture: true,
  onCanPlayCapture: true,
  onCanPlayThroughCapture: true,
  onDurationChangeCapture: true,
  onEmptiedCapture: true,
  onEncryptedCapture: true,
  onEndedCapture: true,
  onErrorCapture: true,
  onLoadedDataCapture: true,
  onLoadedMetadataCapture: true,
  onLoadStartCapture: true,
  onPauseCapture: true,
  onPlayCapture: true,
  onPlayingCapture: true,
  onProgressCapture: true,
  onRateChangeCapture: true,
  onSeekedCapture: true,
  onSeekingCapture: true,
  onStalledCapture: true,
  onSuspendCapture: true,
  onTimeUpdateCapture: true,
  onVolumeChangeCapture: true,
  onWaitingCapture: true,
  onLoadCapture: true,
  onAnimationStartCapture: true,
  onAnimationEndCapture: true,
  onAnimationIterationCapture: true,
  onTransitionEndCapture: true
};

/* From HTMLDOMPropertyConfig */
var htmlProps = {
  /**
   * Standard Properties
   */
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  allowTransparency: true,
  alt: true,
  // specifies target context for links with `preload` type
  as: true,
  async: true,
  autoComplete: true,
  // autoFocus is polyfilled/normalized by AutoFocusUtils
  // autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  charSet: true,
  challenge: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  coords: true,
  crossOrigin: true,
  data: true, // For `<object />` acts as `src`.
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  // Caution; `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`.
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  playsInline: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  referrerPolicy: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  // Setting .type throws on non-<input> tags
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,

  /**
   * RDFa Properties
   */
  about: true,
  datatype: true,
  inlist: true,
  prefix: true,
  // property is also supported for OpenGraph in meta tags.
  property: true,
  resource: true,
  typeof: true,
  vocab: true,

  /**
   * Non-standard Properties
   */
  // autoCapitalize and autoCorrect are supported in Mobile Safari for
  // keyboard hints.
  autoCapitalize: true,
  autoCorrect: true,
  // autoSave allows WebKit/Blink to persist values of input fields on page reloads
  autoSave: true,
  // color is for Safari mask-icon link
  color: true,
  // itemProp, itemScope, itemType are for
  // Microdata support. See http://schema.org/docs/gs.html
  itemProp: true,
  itemScope: true,
  itemType: true,
  // itemID and itemRef are for Microdata support as well but
  // only specified in the WHATWG spec document. See
  // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
  itemID: true,
  itemRef: true,
  // results show looking glass icon and recent searches on input
  // search fields in WebKit/Blink
  results: true,
  // IE-only attribute that specifies security restrictions on an iframe
  // as an alternative to the sandbox attribute on IE<10
  security: true,
  // IE-only attribute that controls focus behavior
  unselectable: 0
};

var svgProps = {
  accentHeight: true,
  accumulate: true,
  additive: true,
  alignmentBaseline: true,
  allowReorder: true,
  alphabetic: true,
  amplitude: true,
  arabicForm: true,
  ascent: true,
  attributeName: true,
  attributeType: true,
  autoReverse: true,
  azimuth: true,
  baseFrequency: true,
  baseProfile: true,
  baselineShift: true,
  bbox: true,
  begin: true,
  bias: true,
  by: true,
  calcMode: true,
  capHeight: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  clipPathUnits: true,
  colorInterpolation: true,
  colorInterpolationFilters: true,
  colorProfile: true,
  colorRendering: true,
  contentScriptType: true,
  contentStyleType: true,
  cursor: true,
  cx: true,
  cy: true,
  d: true,
  decelerate: true,
  descent: true,
  diffuseConstant: true,
  direction: true,
  display: true,
  divisor: true,
  dominantBaseline: true,
  dur: true,
  dx: true,
  dy: true,
  edgeMode: true,
  elevation: true,
  enableBackground: true,
  end: true,
  exponent: true,
  externalResourcesRequired: true,
  fill: true,
  fillOpacity: true,
  fillRule: true,
  filter: true,
  filterRes: true,
  filterUnits: true,
  floodColor: true,
  floodOpacity: true,
  focusable: true,
  fontFamily: true,
  fontSize: true,
  fontSizeAdjust: true,
  fontStretch: true,
  fontStyle: true,
  fontVariant: true,
  fontWeight: true,
  format: true,
  from: true,
  fx: true,
  fy: true,
  g1: true,
  g2: true,
  glyphName: true,
  glyphOrientationHorizontal: true,
  glyphOrientationVertical: true,
  glyphRef: true,
  gradientTransform: true,
  gradientUnits: true,
  hanging: true,
  horizAdvX: true,
  horizOriginX: true,
  ideographic: true,
  imageRendering: true,
  in: true,
  in2: true,
  intercept: true,
  k: true,
  k1: true,
  k2: true,
  k3: true,
  k4: true,
  kernelMatrix: true,
  kernelUnitLength: true,
  kerning: true,
  keyPoints: true,
  keySplines: true,
  keyTimes: true,
  lengthAdjust: true,
  letterSpacing: true,
  lightingColor: true,
  limitingConeAngle: true,
  local: true,
  markerEnd: true,
  markerMid: true,
  markerStart: true,
  markerHeight: true,
  markerUnits: true,
  markerWidth: true,
  mask: true,
  maskContentUnits: true,
  maskUnits: true,
  mathematical: true,
  mode: true,
  numOctaves: true,
  offset: true,
  opacity: true,
  operator: true,
  order: true,
  orient: true,
  orientation: true,
  origin: true,
  overflow: true,
  overlinePosition: true,
  overlineThickness: true,
  paintOrder: true,
  panose1: true,
  pathLength: true,
  patternContentUnits: true,
  patternTransform: true,
  patternUnits: true,
  pointerEvents: true,
  points: true,
  pointsAtX: true,
  pointsAtY: true,
  pointsAtZ: true,
  preserveAlpha: true,
  preserveAspectRatio: true,
  primitiveUnits: true,
  r: true,
  radius: true,
  refX: true,
  refY: true,
  renderingIntent: true,
  repeatCount: true,
  repeatDur: true,
  requiredExtensions: true,
  requiredFeatures: true,
  restart: true,
  result: true,
  rotate: true,
  rx: true,
  ry: true,
  scale: true,
  seed: true,
  shapeRendering: true,
  slope: true,
  spacing: true,
  specularConstant: true,
  specularExponent: true,
  speed: true,
  spreadMethod: true,
  startOffset: true,
  stdDeviation: true,
  stemh: true,
  stemv: true,
  stitchTiles: true,
  stopColor: true,
  stopOpacity: true,
  strikethroughPosition: true,
  strikethroughThickness: true,
  string: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  surfaceScale: true,
  systemLanguage: true,
  tableValues: true,
  targetX: true,
  targetY: true,
  textAnchor: true,
  textDecoration: true,
  textRendering: true,
  textLength: true,
  to: true,
  transform: true,
  u1: true,
  u2: true,
  underlinePosition: true,
  underlineThickness: true,
  unicode: true,
  unicodeBidi: true,
  unicodeRange: true,
  unitsPerEm: true,
  vAlphabetic: true,
  vHanging: true,
  vIdeographic: true,
  vMathematical: true,
  values: true,
  vectorEffect: true,
  version: true,
  vertAdvY: true,
  vertOriginX: true,
  vertOriginY: true,
  viewBox: true,
  viewTarget: true,
  visibility: true,
  widths: true,
  wordSpacing: true,
  writingMode: true,
  x: true,
  xHeight: true,
  x1: true,
  x2: true,
  xChannelSelector: true,
  xlinkActuate: true,
  xlinkArcrole: true,
  xlinkHref: true,
  xlinkRole: true,
  xlinkShow: true,
  xlinkTitle: true,
  xlinkType: true,
  xmlBase: true,
  xmlns: true,
  xmlnsXlink: true,
  xmlLang: true,
  xmlSpace: true,
  y: true,
  y1: true,
  y2: true,
  yChannelSelector: true,
  z: true,
  zoomAndPan: true
};

/* From DOMProperty */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));

var hasOwnProperty = {}.hasOwnProperty;
var validAttr = (function (name) {
  return hasOwnProperty.call(htmlProps, name) || hasOwnProperty.call(svgProps, name) || isCustomAttribute(name.toLowerCase()) || hasOwnProperty.call(reactProps, name);
});

//      


function isTag(target) /* : %checks */{
  return typeof target === 'string';
}

//      


function isStyledComponent(target) /* : %checks */{
  return typeof target === 'function' && typeof target.styledComponentId === 'string';
}

//      

/* eslint-disable no-undef */
function getComponentName(target) {
  return target.displayName || target.name || 'Component';
}

//      


var determineTheme = (function (props, fallbackTheme, defaultProps) {
  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types */
  var isDefaultTheme = defaultProps && props.theme === defaultProps.theme;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme;
  /* eslint-enable */

  return theme;
});

//      
/**
 * Creates a broadcast that can be listened to, i.e. simple event emitter
 *
 * @see https://github.com/ReactTraining/react-broadcast
 */

var createBroadcast = function createBroadcast(initialState) {
  var listeners = {};
  var id = 0;
  var state = initialState;

  function publish(nextState) {
    state = nextState;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in listeners) {
      var listener = listeners[key];
      if (listener === undefined) {
        // eslint-disable-next-line no-continue
        continue;
      }

      listener(state);
    }
  }

  function subscribe(listener) {
    var currentId = id;
    listeners[currentId] = listener;
    id += 1;
    listener(state);
    return currentId;
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined;
  }

  return { publish: publish, subscribe: subscribe, unsubscribe: unsubscribe };
};

//      
// Helper to call a given function, only once
var once = (function (cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb();
    }
  };
});

var _ThemeProvider$childC;
var _ThemeProvider$contex;

//      
/* globals React$Element */
// NOTE: DO NOT CHANGE, changing this is a semver major change!
var CHANNEL = '__styled-components__';
var CHANNEL_NEXT = CHANNEL + 'next__';

var CONTEXT_CHANNEL_SHAPE = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape({
  getTheme: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  subscribe: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  unsubscribe: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
});

var warnChannelDeprecated = once(function () {
  // eslint-disable-next-line no-console
  console.error('Warning: Usage of `context.' + CHANNEL + '` as a function is deprecated. It will be replaced with the object on `.context.' + CHANNEL_NEXT + '` in a future version.');
});
/**
 * Provide a theme to an entire react component tree via context and event listeners (have to do
 * both context and event emitter as pure components block context updates)
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider() {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.unsubscribeToOuterId = -1;

    _this.getTheme = _this.getTheme.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    var outerContext = this.context[CHANNEL_NEXT];
    if (outerContext !== undefined) {
      this.unsubscribeToOuterId = outerContext.subscribe(function (theme) {
        _this2.outerTheme = theme;
      });
    }
    this.broadcast = createBroadcast(this.getTheme());
  };

  ThemeProvider.prototype.getChildContext = function getChildContext() {
    var _this3 = this,
        _babelHelpers$extends;

    return _extends({}, this.context, (_babelHelpers$extends = {}, _babelHelpers$extends[CHANNEL_NEXT] = {
      getTheme: this.getTheme,
      subscribe: this.broadcast.subscribe,
      unsubscribe: this.broadcast.unsubscribe
    }, _babelHelpers$extends[CHANNEL] = function (subscriber) {
      warnChannelDeprecated();

      // Patch the old `subscribe` provide via `CHANNEL` for older clients.
      var unsubscribeId = _this3.broadcast.subscribe(subscriber);
      return function () {
        return _this3.broadcast.unsubscribe(unsubscribeId);
      };
    }, _babelHelpers$extends));
  };

  ThemeProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) this.broadcast.publish(this.getTheme(nextProps.theme));
  };

  ThemeProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribeToOuterId !== -1) {
      this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeToOuterId);
    }
  };

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation


  ThemeProvider.prototype.getTheme = function getTheme(passedTheme) {
    var theme = passedTheme || this.props.theme;
    if (__WEBPACK_IMPORTED_MODULE_4_is_function___default()(theme)) {
      var mergedTheme = theme(this.outerTheme);
      if (!__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(mergedTheme)) {
        throw new Error('[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!');
      }
      return mergedTheme;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0_is_plain_object___default()(theme)) {
      throw new Error('[ThemeProvider] Please make your theme prop a plain object');
    }
    return _extends({}, this.outerTheme, theme);
  };

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) {
      return null;
    }
    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(this.props.children);
  };

  return ThemeProvider;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

ThemeProvider.childContextTypes = (_ThemeProvider$childC = {}, _ThemeProvider$childC[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _ThemeProvider$childC[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$childC);
ThemeProvider.contextTypes = (_ThemeProvider$contex = {}, _ThemeProvider$contex[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _ThemeProvider$contex);

//      

var escapeRegex = /[[\].#*$><+~=|^:(),"'`]/g;
var multiDashRegex = /--+/g;

// HACK for generating all static styles without needing to allocate
// an empty execution context every single time...
var STATIC_EXECUTION_CONTEXT = {};

var _StyledComponent = (function (ComponentStyle, constructWithOptions) {
  /* We depend on components having unique IDs */
  var identifiers = {};
  var generateId = function generateId(_displayName, parentComponentId) {
    var displayName = typeof _displayName !== 'string' ? 'sc' : _displayName.replace(escapeRegex, '-') // Replace all possible CSS selectors
    .replace(multiDashRegex, '-'); // Replace multiple -- with single -

    var nr = (identifiers[displayName] || 0) + 1;
    identifiers[displayName] = nr;

    var hash = ComponentStyle.generateName(displayName + nr);
    var componentId = displayName + '-' + hash;
    return parentComponentId !== undefined ? parentComponentId + '-' + componentId : componentId;
  };

  var BaseStyledComponent = function (_Component) {
    inherits(BaseStyledComponent, _Component);

    function BaseStyledComponent() {
      var _temp, _this, _ret;

      classCallCheck(this, BaseStyledComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.attrs = {}, _this.state = {
        theme: null,
        generatedClassName: ''
      }, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    BaseStyledComponent.prototype.unsubscribeFromContext = function unsubscribeFromContext() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    BaseStyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props) {
      var attrs = this.constructor.attrs;

      var context = _extends({}, props, { theme: theme });
      if (attrs === undefined) {
        return context;
      }

      this.attrs = Object.keys(attrs).reduce(function (acc, key) {
        var attr = attrs[key];
        // eslint-disable-next-line no-param-reassign
        acc[key] = typeof attr === 'function' ? attr(context) : attr;
        return acc;
      }, {});

      return _extends({}, context, this.attrs);
    };

    BaseStyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
      var _constructor = this.constructor,
          attrs = _constructor.attrs,
          componentStyle = _constructor.componentStyle,
          warnTooManyClasses = _constructor.warnTooManyClasses;

      var styleSheet = this.context[CONTEXT_KEY] || StyleSheet.instance;

      // staticaly styled-components don't need to build an execution context object,
      // and shouldn't be increasing the number of class names
      if (componentStyle.isStatic && attrs === undefined) {
        return componentStyle.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
      } else {
        var executionContext = this.buildExecutionContext(theme, props);
        var className = componentStyle.generateAndInjectStyles(executionContext, styleSheet);

        if (warnTooManyClasses !== undefined) warnTooManyClasses(className);

        return className;
      }
    };

    BaseStyledComponent.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var componentStyle = this.constructor.componentStyle;

      var styledContext = this.context[CHANNEL_NEXT];

      // If this is a staticaly-styled component, we don't need to the theme
      // to generate or build styles.
      if (componentStyle.isStatic) {
        var generatedClassName = this.generateAndInjectStyles(STATIC_EXECUTION_CONTEXT, this.props);
        this.setState({ generatedClassName: generatedClassName });
        // If there is a theme in the context, subscribe to the event emitter. This
        // is necessary due to pure components blocking context updates, this circumvents
        // that by updating when an event is emitted
      } else if (styledContext !== undefined) {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          // This will be called once immediately
          var theme = determineTheme(_this2.props, nextTheme, _this2.constructor.defaultProps);
          var generatedClassName = _this2.generateAndInjectStyles(theme, _this2.props);

          _this2.setState({ theme: theme, generatedClassName: generatedClassName });
        });
      } else {
        // eslint-disable-next-line react/prop-types
        var theme = this.props.theme || {};
        var _generatedClassName = this.generateAndInjectStyles(theme, this.props);
        this.setState({ theme: theme, generatedClassName: _generatedClassName });
      }
    };

    BaseStyledComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // If this is a staticaly-styled component, we don't need to listen to
      // props changes to update styles
      var componentStyle = this.constructor.componentStyle;

      if (componentStyle.isStatic) {
        return;
      }

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, _this3.constructor.defaultProps);
        var generatedClassName = _this3.generateAndInjectStyles(theme, nextProps);

        return { theme: theme, generatedClassName: generatedClassName };
      });
    };

    BaseStyledComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribeFromContext();
    };

    BaseStyledComponent.prototype.render = function render() {
      var _this4 = this;

      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var generatedClassName = this.state.generatedClassName;
      var _constructor2 = this.constructor,
          styledComponentId = _constructor2.styledComponentId,
          target = _constructor2.target;


      var isTargetTag = isTag(target);

      var className = [
      // eslint-disable-next-line react/prop-types
      this.props.className, styledComponentId, this.attrs.className, generatedClassName].filter(Boolean).join(' ');

      var baseProps = _extends({}, this.attrs, {
        className: className
      });

      if (isStyledComponent(target)) {
        baseProps.innerRef = innerRef;
      } else {
        baseProps.ref = innerRef;
      }

      var propsForElement = Object.keys(this.props).reduce(function (acc, propName) {
        // Don't pass through non HTML tags through to HTML elements
        // always omit innerRef
        if (propName !== 'innerRef' && propName !== 'className' && (!isTargetTag || validAttr(propName))) {
          // eslint-disable-next-line no-param-reassign
          acc[propName] = _this4.props[propName];
        }

        return acc;
      }, baseProps);

      return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(target, propsForElement);
    };

    return BaseStyledComponent;
  }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

  var createStyledComponent = function createStyledComponent(target, options, rules) {
    var _StyledComponent$cont;

    var _options$displayName = options.displayName,
        displayName = _options$displayName === undefined ? isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')' : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === undefined ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$ParentCompon = options.ParentComponent,
        ParentComponent = _options$ParentCompon === undefined ? BaseStyledComponent : _options$ParentCompon,
        extendingRules = options.rules,
        attrs = options.attrs;


    var styledComponentId = options.displayName && options.componentId ? options.displayName + '-' + options.componentId : componentId;

    var warnTooManyClasses = void 0;
    if (true) {
      warnTooManyClasses = createWarnTooManyClasses(displayName);
    }

    var componentStyle = new ComponentStyle(extendingRules === undefined ? rules : extendingRules.concat(rules), attrs, styledComponentId);

    var StyledComponent = function (_ParentComponent) {
      inherits(StyledComponent, _ParentComponent);

      function StyledComponent() {
        classCallCheck(this, StyledComponent);
        return possibleConstructorReturn(this, _ParentComponent.apply(this, arguments));
      }

      StyledComponent.withComponent = function withComponent(tag) {
        var previousComponentId = options.componentId,
            optionsToCopy = objectWithoutProperties(options, ['componentId']);


        var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : getComponentName(tag));

        var newOptions = _extends({}, optionsToCopy, {
          componentId: newComponentId,
          ParentComponent: StyledComponent
        });

        return createStyledComponent(tag, newOptions, rules);
      };

      createClass(StyledComponent, null, [{
        key: 'extend',
        get: function get$$1() {
          var rulesFromOptions = options.rules,
              parentComponentId = options.componentId,
              optionsToCopy = objectWithoutProperties(options, ['rules', 'componentId']);


          var newRules = rulesFromOptions === undefined ? rules : rulesFromOptions.concat(rules);

          var newOptions = _extends({}, optionsToCopy, {
            rules: newRules,
            parentComponentId: parentComponentId,
            ParentComponent: StyledComponent
          });

          return constructWithOptions(createStyledComponent, target, newOptions);
        }
      }]);
      return StyledComponent;
    }(ParentComponent);

    StyledComponent.contextTypes = (_StyledComponent$cont = {}, _StyledComponent$cont[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _StyledComponent$cont[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _StyledComponent$cont[CONTEXT_KEY] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(StyleSheet), __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.instanceOf(ServerStyleSheet)]), _StyledComponent$cont);
    StyledComponent.displayName = displayName;
    StyledComponent.styledComponentId = styledComponentId;
    StyledComponent.attrs = attrs;
    StyledComponent.componentStyle = componentStyle;
    StyledComponent.warnTooManyClasses = warnTooManyClasses;
    StyledComponent.target = target;


    return StyledComponent;
  };

  return createStyledComponent;
});

// murmurhash2 via https://gist.github.com/raycmorgan/588423

function doHash(str, seed) {
  var m = 0x5bd1e995;
  var r = 24;
  var h = seed ^ str.length;
  var length = str.length;
  var currentIndex = 0;

  while (length >= 4) {
    var k = UInt32(str, currentIndex);

    k = Umul32(k, m);
    k ^= k >>> r;
    k = Umul32(k, m);

    h = Umul32(h, m);
    h ^= k;

    currentIndex += 4;
    length -= 4;
  }

  switch (length) {
    case 3:
      h ^= UInt16(str, currentIndex);
      h ^= str.charCodeAt(currentIndex + 2) << 16;
      h = Umul32(h, m);
      break;

    case 2:
      h ^= UInt16(str, currentIndex);
      h = Umul32(h, m);
      break;

    case 1:
      h ^= str.charCodeAt(currentIndex);
      h = Umul32(h, m);
      break;
  }

  h ^= h >>> 13;
  h = Umul32(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}

function UInt32(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
}

function UInt16(str, pos) {
  return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
}

function Umul32(n, m) {
  n = n | 0;
  m = m | 0;
  var nlo = n & 0xffff;
  var nhi = n >>> 16;
  var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
  return res;
}

//      
var isStaticRules = function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule)) {
      return false;
    } else if (typeof rule === 'function' && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled copmonent
      return false;
    }
  }

  if (attrs !== undefined) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in attrs) {
      var value = attrs[key];
      if (typeof value === 'function') {
        return false;
      }
    }
  }

  return true;
};

var isHRMEnabled = typeof module !== 'undefined' && module.hot && "development" !== 'production';

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */
var _ComponentStyle = (function (nameGenerator, flatten, stringifyRules) {
  var ComponentStyle = function () {
    function ComponentStyle(rules, attrs, componentId) {
      classCallCheck(this, ComponentStyle);

      this.rules = rules;
      this.isStatic = !isHRMEnabled && isStaticRules(rules, attrs);
      this.componentId = componentId;
      if (!StyleSheet.instance.hasInjectedComponent(this.componentId)) {
        var placeholder =  true ? '.' + componentId + ' {}' : '';
        StyleSheet.instance.deferredInject(componentId, true, placeholder);
      }
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var isStatic = this.isStatic,
          lastClassName = this.lastClassName;

      if (isStatic && lastClassName !== undefined) {
        return lastClassName;
      }

      var flatCSS = flatten(this.rules, executionContext);
      var hash = doHash(this.componentId + flatCSS.join(''));

      var existingName = styleSheet.getName(hash);
      if (existingName !== undefined) {
        if (styleSheet.stylesCacheable) {
          this.lastClassName = existingName;
        }
        return existingName;
      }

      var name = nameGenerator(hash);
      if (styleSheet.stylesCacheable) {
        this.lastClassName = existingName;
      }
      if (styleSheet.alreadyInjected(hash, name)) {
        return name;
      }

      var css = '\n' + stringifyRules(flatCSS, '.' + name);
      // NOTE: this can only be set when we inject the class-name.
      // For some reason, presumably due to how css is stringifyRules behaves in
      // differently between client and server, styles break.
      styleSheet.inject(this.componentId, true, css, hash, name);
      return name;
    };

    ComponentStyle.generateName = function generateName(str) {
      return nameGenerator(doHash(str));
    };

    return ComponentStyle;
  }();

  return ComponentStyle;
});

//      
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

//      

var _styled = (function (styledComponent, constructWithOptions) {
  var styled = function styled(tag) {
    return constructWithOptions(styledComponent, tag);
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  return styled;
});

//      
var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var _keyframes = (function (nameGenerator, stringifyRules, css) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(replaceWhitespace(JSON.stringify(rules)));

    var existingName = StyleSheet.instance.getName(hash);
    if (existingName) return existingName;

    var name = nameGenerator(hash);
    if (StyleSheet.instance.alreadyInjected(hash, name)) return name;

    var generatedCSS = stringifyRules(rules, name, '@keyframes');
    StyleSheet.instance.inject('sc-keyframes-' + name, true, generatedCSS, hash, name);
    return name;
  };
});

//      
var _injectGlobal = (function (stringifyRules, css) {
  var injectGlobal = function injectGlobal(strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(undefined, [strings].concat(interpolations));
    var hash = doHash(JSON.stringify(rules));

    var componentId = 'sc-global-' + hash;
    if (StyleSheet.instance.hasInjectedComponent(componentId)) return;

    StyleSheet.instance.inject(componentId, false, stringifyRules(rules));
  };

  return injectGlobal;
});

//      


var _constructWithOptions = (function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof tag !== 'string' && typeof tag !== 'function') {
      // $FlowInvalidInputTest
      throw new Error('Cannot create styled-component for component: ' + tag);
    }

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)));
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs) }));
    };

    return templateFunction;
  };

  return constructWithOptions;
});

//      
/* globals ReactClass */

var wrapWithTheme = function wrapWithTheme(Component$$1) {
  var _WithTheme$contextTyp;

  var componentName = Component$$1.displayName || Component$$1.name || 'Component';

  var isStyledComponent$$1 = isStyledComponent(Component$$1);

  var WithTheme = function (_React$Component) {
    inherits(WithTheme, _React$Component);

    function WithTheme() {
      var _temp, _this, _ret;

      classCallCheck(this, WithTheme);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _this.unsubscribeId = -1, _temp), possibleConstructorReturn(_this, _ret);
    }

    // NOTE: This is so that isStyledComponent passes for the innerRef unwrapping


    WithTheme.prototype.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var defaultProps = this.constructor.defaultProps;

      var styledContext = this.context[CHANNEL_NEXT];
      var themeProp = determineTheme(this.props, undefined, defaultProps);
      if (styledContext === undefined && themeProp === undefined && "development" !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps');
      } else if (styledContext === undefined && themeProp !== undefined) {
        this.setState({ theme: themeProp });
      } else {
        var subscribe = styledContext.subscribe;

        this.unsubscribeId = subscribe(function (nextTheme) {
          var theme = determineTheme(_this2.props, nextTheme, defaultProps);
          _this2.setState({ theme: theme });
        });
      }
    };

    WithTheme.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var defaultProps = this.constructor.defaultProps;

      this.setState(function (oldState) {
        var theme = determineTheme(nextProps, oldState.theme, defaultProps);

        return { theme: theme };
      });
    };

    WithTheme.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[CHANNEL_NEXT].unsubscribe(this.unsubscribeId);
      }
    };

    WithTheme.prototype.render = function render() {
      // eslint-disable-next-line react/prop-types
      var innerRef = this.props.innerRef;
      var theme = this.state.theme;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component$$1, _extends({
        theme: theme
      }, this.props, {
        innerRef: isStyledComponent$$1 ? innerRef : undefined,
        ref: isStyledComponent$$1 ? undefined : innerRef
      }));
    };

    return WithTheme;
  }(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

  WithTheme.displayName = 'WithTheme(' + componentName + ')';
  WithTheme.styledComponentId = 'withTheme';
  WithTheme.contextTypes = (_WithTheme$contextTyp = {}, _WithTheme$contextTyp[CHANNEL] = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, _WithTheme$contextTyp[CHANNEL_NEXT] = CONTEXT_CHANNEL_SHAPE, _WithTheme$contextTyp);


  return __WEBPACK_IMPORTED_MODULE_5_hoist_non_react_statics___default()(WithTheme, Component$$1);
};

//      

/* Import singletons */
/* Import singleton constructors */
/* Import components */
/* Import Higher Order Components */
/* Instantiate singletons */
var ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules);
var constructWithOptions = _constructWithOptions(css);
var StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions);

/* Instantiate exported singletons */
var keyframes = _keyframes(generateAlphabeticName, stringifyRules, css);
var injectGlobal = _injectGlobal(stringifyRules, css);
var styled = _styled(StyledComponent, constructWithOptions);

/* harmony default export */ __webpack_exports__["default"] = (styled);


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(194);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

/*
 *          __        ___
 *    _____/ /___  __/ (_)____
 *   / ___/ __/ / / / / / ___/
 *  (__  ) /_/ /_/ / / (__  )
 * /____/\__/\__, /_/_/____/
 *          /____/
 *
 * light - weight css preprocessor @licence MIT
 */
(function (factory) {/* eslint-disable */
	 true ? (module['exports'] = factory(null)) :
		typeof define === 'function' && define['amd'] ? define(factory(null)) :
			(window['stylis'] = factory(null))
}(/** @param {*=} options */function factory (options) {/* eslint-disable */

	'use strict'

	/**
	 * Notes
	 *
	 * The ['<method name>'] pattern is used to support closure compiler
	 * the jsdoc signatures are also used to the same effect
	 *
	 * ----
	 *
	 * int + int + int === n4 [faster]
	 *
	 * vs
	 *
	 * int === n1 && int === n2 && int === n3
	 *
	 * ----
	 *
	 * switch (int) { case ints...} [faster]
	 *
	 * vs
	 *
	 * if (int == 1 && int === 2 ...)
	 *
	 * ----
	 *
	 * The (first*n1 + second*n2 + third*n3) format used in the property parser
	 * is a simple way to hash the sequence of characters
	 * taking into account the index they occur in
	 * since any number of 3 character sequences could produce duplicates.
	 *
	 * On the other hand sequences that are directly tied to the index of the character
	 * resolve a far more accurate measure, it's also faster
	 * to evaluate one condition in a switch statement
	 * than three in an if statement regardless of the added math.
	 *
	 * This allows the vendor prefixer to be both small and fast.
	 */

	var nullptn = /^\0+/g /* matches leading null characters */
	var formatptn = /[\0\r\f]/g /* matches new line, null and formfeed characters */
	var colonptn = /: */g /* splits animation rules */
	var cursorptn = /zoo|gra/ /* assert cursor varient */
	var transformptn = /([,: ])(transform)/g /* vendor prefix transform, older webkit */
	var animationptn = /,+\s*(?![^(]*[)])/g /* splits multiple shorthand notation animations */
	var propertiesptn = / +\s*(?![^(]*[)])/g /* animation properties */
	var elementptn = / *[\0] */g /* selector elements */
	var selectorptn = /,\r+?/g /* splits selectors */
	var andptn = /([\t\r\n ])*\f?&/g /* match & */
	var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g /* matches :global(.*) */
	var invalidptn = /\W+/g /* removes invalid characters from keyframes */
	var keyframeptn = /@(k\w+)\s*(\S*)\s*/ /* matches @keyframes $1 */
	var plcholdrptn = /::(place)/g /* match ::placeholder varient */
	var readonlyptn = /:(read-only)/g /* match :read-only varient */
	var beforeptn = /\s+(?=[{\];=:>])/g /* matches \s before ] ; = : */
	var afterptn = /([[}=:>])\s+/g /* matches \s after characters [ } = : */
	var tailptn = /(\{[^{]+?);(?=\})/g /* matches tail semi-colons ;} */
	var whiteptn = /\s{2,}/g /* matches repeating whitespace */
	var pseudoptn = /([^\(])(:+) */g /* pseudo element */
	var writingptn = /[svh]\w+-[tblr]{2}/ /* match writing mode property values */
	var gradientptn = /([\w-]+t\()/g /* match *gradient property */
	var supportsptn = /\(\s*(.*)\s*\)/g /* match supports (groups) */
	var propertyptn = /([^]*?);/g /* match properties leading semicolon */
	var selfptn = /-self|flex-/g /* match flex- and -self in align-self: flex-*; */
	var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/ /* extrats :readonly or :placholder from selector */
	var trimptn = /[ \t]+$/ /* match tail whitspace */

	/* vendors */
	var webkit = '-webkit-'
	var moz = '-moz-'
	var ms = '-ms-'

	/* character codes */
	var SEMICOLON = 59 /* ; */
	var CLOSEBRACES = 125 /* } */
	var OPENBRACES = 123 /* { */
	var OPENPARENTHESES = 40 /* ( */
	var CLOSEPARENTHESES = 41 /* ) */
	var OPENBRACKET = 91 /* [ */
	var CLOSEBRACKET = 93 /* ] */
	var NEWLINE = 10 /* \n */
	var CARRIAGE = 13 /* \r */
	var TAB = 9 /* \t */
	var AT = 64 /* @ */
	var SPACE = 32 /*   */
	var AND = 38 /* & */
	var DASH = 45 /* - */
	var UNDERSCORE = 95 /* _ */
	var STAR = 42 /* * */
	var COMMA = 44 /* , */
	var COLON = 58 /* : */
	var SINGLEQUOTE = 39 /* ' */
	var DOUBLEQUOTE = 34 /* " */
	var FOWARDSLASH = 47 /* / */
	var GREATERTHAN = 62 /* > */
	var PLUS = 43 /* + */
	var TILDE = 126 /* ~ */
	var NULL = 0 /* \0 */
	var FORMFEED = 12 /* \f */
	var VERTICALTAB = 11 /* \v */

	/* special identifiers */
	var KEYFRAME = 107 /* k */
	var MEDIA = 109 /* m */
	var SUPPORTS = 115 /* s */
	var PLACEHOLDER = 112 /* p */
	var READONLY = 111 /* o */
	var IMPORT = 169 /* <at>i */
	var CHARSET = 163 /* <at>c */
	var DOCUMENT = 100 /* <at>d */
	var PAGE = 112 /* <at>p */

	var column = 1 /* current column */
	var line = 1 /* current line numebr */
	var pattern = 0 /* :pattern */

	var cascade = 1 /* #id h1 h2 vs h1#id h2#id  */
	var prefix = 1 /* vendor prefix */
	var escape = 1 /* escape :global() pattern */
	var compress = 0 /* compress output */
	var semicolon = 0 /* no/semicolon option */
	var preserve = 0 /* preserve empty selectors */

	/* empty reference */
	var array = []

	/* plugins */
	var plugins = []
	var plugged = 0
	var should = null

	/* plugin context */
	var POSTS = -2
	var PREPS = -1
	var UNKWN = 0
	var PROPS = 1
	var BLCKS = 2
	var ATRUL = 3

	/* plugin newline context */
	var unkwn = 0

	/* keyframe animation */
	var keyed = 1
	var key = ''

	/* selector namespace */
	var nscopealt = ''
	var nscope = ''

	/**
	 * Compile
	 *
	 * @param {Array<string>} parent
	 * @param {Array<string>} current
	 * @param {string} body
	 * @param {number} id
	 * @param {number} depth
	 * @return {string}
	 */
	function compile (parent, current, body, id, depth) {
		var bracket = 0 /* brackets [] */
		var comment = 0 /* comments /* // or /* */
		var parentheses = 0 /* functions () */
		var quote = 0 /* quotes '', "" */

		var first = 0 /* first character code */
		var second = 0 /* second character code */
		var code = 0 /* current character code */
		var tail = 0 /* previous character code */
		var trail = 0 /* character before previous code */
		var peak = 0 /* previous non-whitespace code */

		var counter = 0 /* count sequence termination */
		var context = 0 /* track current context */
		var atrule = 0 /* track @at-rule context */
		var pseudo = 0 /* track pseudo token index */
		var caret = 0 /* current character index */
		var format = 0 /* control character formating context */
		var insert = 0 /* auto semicolon insertion */
		var invert = 0 /* inverted selector pattern */
		var length = 0 /* generic length address */
		var eof = body.length /* end of file(length) */
		var eol = eof - 1 /* end of file(characters) */

		var char = '' /* current character */
		var chars = '' /* current buffer of characters */
		var child = '' /* next buffer of characters */
		var out = '' /* compiled body */
		var children = '' /* compiled children */
		var flat = '' /* compiled leafs */
		var selector /* generic selector address */
		var result /* generic address */

		// ...build body
		while (caret < eof) {
			code = body.charCodeAt(caret)

			// eof varient
			if (caret === eol) {
				// last character + noop context, add synthetic padding for noop context to terminate
				if (comment + quote + parentheses + bracket !== 0) {
					if (comment !== 0) {
						code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH
					}

					quote = parentheses = bracket = 0
					eof++
					eol++
				}
			}

			if (comment + quote + parentheses + bracket === 0) {
				// eof varient
				if (caret === eol) {
					if (format > 0) {
						chars = chars.replace(formatptn, '')
					}

					if (chars.trim().length > 0) {
						switch (code) {
							case SPACE:
							case TAB:
							case SEMICOLON:
							case CARRIAGE:
							case NEWLINE: {
								break
							}
							default: {
								chars += body.charAt(caret)
							}
						}

						code = SEMICOLON
					}
				}

				// auto semicolon insertion
				if (insert === 1) {
					switch (code) {
						// false flags
						case OPENBRACES:
						case CLOSEBRACES:
						case SEMICOLON:
						case DOUBLEQUOTE:
						case SINGLEQUOTE:
						case OPENPARENTHESES:
						case CLOSEPARENTHESES:
						case COMMA: {
							insert = 0
						}
						// ignore
						case TAB:
						case CARRIAGE:
						case NEWLINE:
						case SPACE: {
							break
						}
						// valid
						default: {
							insert = 0
							length = caret
							first = code
							caret--
							code = SEMICOLON

							while (length < eof) {
								switch (body.charCodeAt(++length)) {
									case NEWLINE:
									case CARRIAGE:
									case SEMICOLON: {
										caret++
										code = first
									}
									case COLON:
									case OPENBRACES: {
										length = eof
									}
								}
							}
						}
					}
				}

				// token varient
				switch (code) {
					case OPENBRACES: {
						chars = chars.trim()
						first = chars.charCodeAt(0)
						counter = 1
						length = ++caret

						while (caret < eof) {
							code = body.charCodeAt(caret)

							switch (code) {
								case OPENBRACES: {
									counter++
									break
								}
								case CLOSEBRACES: {
									counter--
									break
								}
							}

							if (counter === 0) {
								break
							}

							caret++
						}

						child = body.substring(length, caret)

						if (first === NULL) {
							first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0)
						}

						switch (first) {
							// @at-rule
							case AT: {
								if (format > 0) {
									chars = chars.replace(formatptn, '')
								}

								second = chars.charCodeAt(1)

								switch (second) {
									case DOCUMENT:
									case MEDIA:
									case SUPPORTS:
									case DASH: {
										selector = current
										break
									}
									default: {
										selector = array
									}
								}

								child = compile(current, selector, child, second, depth+1)
								length = child.length

								// preserve empty @at-rule
								if (preserve > 0 && length === 0) {
									length = chars.length
								}

								// execute plugins, @at-rule context
								if (plugged > 0) {
									selector = select(array, chars, invert)
									result = proxy(ATRUL, child, selector, current, line, column, length, second, depth)
									chars = selector.join('')

									if (result !== void 0) {
										if ((length = (child = result.trim()).length) === 0) {
											second = 0
											child = ''
										}
									}
								}

								if (length > 0) {
									switch (second) {
										case SUPPORTS: {
											chars = chars.replace(supportsptn, supports)
										}
										case DOCUMENT:
										case MEDIA:
										case DASH: {
											child = chars + '{' + child + '}'
											break
										}
										case KEYFRAME: {
											chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''))
											child = chars + '{' + child + '}'

											if (prefix === 1 || (prefix === 2 && vendor('@'+child, 3))) {
												child = '@' + webkit + child + '@' + child
											} else {
												child = '@' + child
											}
											break
										}
										default: {
											child = chars + child

											if (id === PAGE) {
												child = (out += child, '')
											}
										}
									}
								} else {
									child = ''
								}

								break
							}
							// selector
							default: {
								child = compile(current, select(current, chars, invert), child, id, depth+1)
							}
						}

						children += child

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						atrule = 0
						chars = ''
						child = ''
						code = body.charCodeAt(++caret)
						break
					}
					case CLOSEBRACES:
					case SEMICOLON: {
						chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim()

						if ((length = chars.length) > 1) {
							// monkey-patch missing colon
							if (pseudo === 0) {
								first = chars.charCodeAt(0)

								// first character is a letter or dash, buffer has a space character
								if ((first === DASH || first > 96 && first < 123)) {
									length = (chars = chars.replace(' ', ':')).length
								}
							}

							// execute plugins, property context
							if (plugged > 0) {
								if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth)) !== void 0) {
									if ((length = (chars = result.trim()).length) === 0) {
										chars = '\0\0'
									}
								}
							}

							first = chars.charCodeAt(0)
							second = chars.charCodeAt(1)

							switch (first + second) {
								case NULL: {
									break
								}
								case IMPORT:
								case CHARSET: {
									flat += chars + body.charAt(caret)
									break
								}
								default: {
									if (chars.charCodeAt(length-1) === COLON)
										break

									out += property(chars, first, second, chars.charCodeAt(2))
								}
							}
						}

						// reset
						context = 0
						insert = 0
						pseudo = 0
						format = 0
						invert = 0
						chars = ''
						code = body.charCodeAt(++caret)
						break
					}
				}
			}

			// parse characters
			switch (code) {
				case CARRIAGE:
				case NEWLINE: {
					// auto insert semicolon
					if (comment + quote + parentheses + bracket + semicolon === 0) {
						// valid non-whitespace characters that
						// may precede a newline
						switch (peak) {
							case CLOSEPARENTHESES:
							case SINGLEQUOTE:
							case DOUBLEQUOTE:
							case AT:
							case TILDE:
							case GREATERTHAN:
							case STAR:
							case PLUS:
							case FOWARDSLASH:
							case DASH:
							case COLON:
							case COMMA:
							case SEMICOLON:
							case OPENBRACES:
							case CLOSEBRACES: {
								break
							}
							default: {
								// current buffer has a colon
								if (pseudo > 0) {
									insert = 1
								}
							}
						}
					}

					// terminate line comment
					if (comment === FOWARDSLASH) {
						comment = 0
					} else if (cascade + context === 0) {
						format = 1
						chars += '\0'
					}

					// execute plugins, newline context
					if (plugged * unkwn > 0) {
						proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth)
					}

					// next line, reset column position
					column = 1
					line++
					break
				}
				case SEMICOLON:
				case CLOSEBRACES: {
					if (comment + quote + parentheses + bracket === 0) {
						column++
						break
					}
				}
				default: {
					// increment column position
					column++

					// current character
					char = body.charAt(caret)

					// remove comments, escape functions, strings, attributes and prepare selectors
					switch (code) {
						case TAB:
						case SPACE: {
							if (quote + bracket + comment === 0) {
								switch (tail) {
									case COMMA:
									case COLON:
									case TAB:
									case SPACE: {
										char = ''
										break
									}
									default: {
										if (code !== SPACE) {
											char = ' '
										}
									}
								}
							}
							break
						}
						// escape breaking control characters
						case NULL: {
							char = '\\0'
							break
						}
						case FORMFEED: {
							char = '\\f'
							break
						}
						case VERTICALTAB: {
							char = '\\v'
							break
						}
						// &
						case AND: {
							// inverted selector pattern i.e html &
							if (quote + comment + bracket === 0 && cascade > 0) {
								invert = 1
								format = 1
								char = '\f' + char
							}
							break
						}
						// ::p<l>aceholder, l
						// :read-on<l>y, l
						case 108: {
							if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
								switch (caret - pseudo) {
									// ::placeholder
									case 2: {
										if (tail === PLACEHOLDER && body.charCodeAt(caret-3) === COLON) {
											pattern = tail
										}
									}
									// :read-only
									case 8: {
										if (trail === READONLY) {
											pattern = trail
										}
									}
								}
							}
							break
						}
						// :<pattern>
						case COLON: {
							if (quote + comment + bracket === 0) {
								pseudo = caret
							}
							break
						}
						// selectors
						case COMMA: {
							if (comment + parentheses + quote + bracket === 0) {
								format = 1
								char += '\r'
							}
							break
						}
						// quotes
						case DOUBLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						case SINGLEQUOTE: {
							if (comment === 0) {
								quote = quote === code ? 0 : (quote === 0 ? code : quote)
							}
							break
						}
						// attributes
						case OPENBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket++
							}
							break
						}
						case CLOSEBRACKET: {
							if (quote + comment + parentheses === 0) {
								bracket--
							}
							break
						}
						// functions
						case CLOSEPARENTHESES: {
							if (quote + comment + bracket === 0) {
								parentheses--
							}
							break
						}
						case OPENPARENTHESES: {
							if (quote + comment + bracket === 0) {
								if (context === 0) {
									switch (tail*2 + trail*3) {
										// :matches
										case 533: {
											break
										}
										// :global, :not, :nth-child etc...
										default: {
											counter = 0
											context = 1
										}
									}
								}

								parentheses++
							}
							break
						}
						case AT: {
							if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
								atrule = 1
							}
							break
						}
						// block/line comments
						case STAR:
						case FOWARDSLASH: {
							if (quote + bracket + parentheses > 0) {
								break
							}

							switch (comment) {
								// initialize line/block comment context
								case 0: {
									switch (code*2 + body.charCodeAt(caret+1)*3) {
										// //
										case 235: {
											comment = FOWARDSLASH
											break
										}
										// /*
										case 220: {
											length = caret
											comment = STAR
											break
										}
									}
									break
								}
								// end block comment context
								case STAR: {
									if (code === FOWARDSLASH && tail === STAR) {
										// /*<!> ... */, !
										if (body.charCodeAt(length+2) === 33) {
											out += body.substring(length, caret+1)
										}
										char = ''
										comment = 0
									}
								}
							}
						}
					}

					// ignore comment blocks
					if (comment === 0) {
						// aggressive isolation mode, divide each individual selector
						// including selectors in :not function but excluding selectors in :global function
						if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
							switch (code) {
								case COMMA:
								case TILDE:
								case GREATERTHAN:
								case PLUS:
								case CLOSEPARENTHESES:
								case OPENPARENTHESES: {
									if (context === 0) {
										// outside of an isolated context i.e nth-child(<...>)
										switch (tail) {
											case TAB:
											case SPACE:
											case NEWLINE:
											case CARRIAGE: {
												char = char + '\0'
												break
											}
											default: {
												char = '\0' + char + (code === COMMA ? '' : '\0')
											}
										}
										format = 1
									} else {
										// within an isolated context, sleep untill it's terminated
										switch (code) {
											case OPENPARENTHESES: {
												context = ++counter
												break
											}
											case CLOSEPARENTHESES: {
												if ((context = --counter) === 0) {
													format = 1
													char += '\0'
												}
												break
											}
										}
									}
									break
								}
								case TAB:
								case SPACE: {
									switch (tail) {
										case NULL:
										case OPENBRACES:
										case CLOSEBRACES:
										case SEMICOLON:
										case COMMA:
										case FORMFEED:
										case TAB:
										case SPACE:
										case NEWLINE:
										case CARRIAGE: {
											break
										}
										default: {
											// ignore in isolated contexts
											if (context === 0) {
												format = 1
												char += '\0'
											}
										}
									}
								}
							}
						}

						// concat buffer of characters
						chars += char

						// previous non-whitespace character code
						if (code !== SPACE && code !== TAB) {
							peak = code
						}
					}
				}
			}

			// tail character codes
			trail = tail
			tail = code

			// visit every character
			caret++
		}

		length = out.length

		// preserve empty selector
 		if (preserve > 0) {
 			if (length === 0 && children.length === 0 && (current[0].length === 0) === false) {
 				if (id !== MEDIA || (current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0])) {
					length = current.join(',').length + 2
 				}
 			}
		}

		if (length > 0) {
			// cascade isolation mode?
			selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current

			// execute plugins, block context
			if (plugged > 0) {
				result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth)

				if (result !== void 0 && (out = result).length === 0) {
					return flat + out + children
				}
			}

			out = selector.join(',') + '{' + out + '}'

			if (prefix*pattern !== 0) {
				if (prefix === 2 && !vendor(out, 2))
					pattern = 0

				switch (pattern) {
					// ::read-only
					case READONLY: {
						out = out.replace(readonlyptn, ':'+moz+'$1')+out
						break
					}
					// ::placeholder
					case PLACEHOLDER: {
						out = (
							out.replace(plcholdrptn, '::' + webkit + 'input-$1') +
							out.replace(plcholdrptn, '::' + moz + '$1') +
							out.replace(plcholdrptn, ':' + ms + 'input-$1') + out
						)
						break
					}
				}

				pattern = 0
			}
		}

		return flat + out + children
	}

	/**
	 * Select
	 *
	 * @param {Array<string>} parent
	 * @param {string} current
	 * @param {number} invert
	 * @return {Array<string>}
	 */
	function select (parent, current, invert) {
		var selectors = current.trim().split(selectorptn)
		var out = selectors

		var length = selectors.length
		var l = parent.length

		switch (l) {
			// 0-1 parent selectors
			case 0:
			case 1: {
				for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
					out[i] = scope(selector, out[i], invert, l).trim()
				}
				break
			}
			// >2 parent selectors, nested
			default: {
				for (var i = 0, j = 0, out = []; i < length; ++i) {
					for (var k = 0; k < l; ++k) {
						out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim()
					}
				}
			}
		}

		return out
	}

	/**
	 * Scope
	 *
	 * @param {string} parent
	 * @param {string} current
	 * @param {number} invert
	 * @param {number} level
	 * @return {string}
	 */
	function scope (parent, current, invert, level) {
		var selector = current
		var code = selector.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (selector = selector.trim()).charCodeAt(0)
		}

		switch (code) {
			// &
			case AND: {
				switch (cascade + level) {
					case 0:
					case 1: {
						if (parent.trim().length === 0) {
							break
						}
					}
					default: {
						return selector.replace(andptn, '$1'+parent.trim())
					}
				}
				break
			}
			// :
			case COLON: {
				switch (selector.charCodeAt(1)) {
					// g in :global
					case 103: {
						if (escape > 0 && cascade > 0) {
							return selector.replace(escapeptn, '$1').replace(andptn, '$1'+nscope)
						}
						break
					}
					default: {
						// :hover
						return parent.trim() + selector
					}
				}
			}
			default: {
				// html &
				if (invert*cascade > 0 && selector.indexOf('\f') > 0) {
					return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1')+parent.trim())
				}
			}
		}

		return parent + selector
	}

	/**
	 * Property
	 *
	 * @param {string} input
	 * @param {number} first
	 * @param {number} second
	 * @param {number} third
	 * @return {string}
	 */
	function property (input, first, second, third) {
		var index = 0
		var out = input + ';'
		var hash = (first*2) + (second*3) + (third*4)
		var cache

		// animation: a, n, i characters
		if (hash === 944) {
			return animation(out)
		} else if (prefix === 0 || (prefix === 2 && !vendor(out, 1))) {
			return out
		}

		// vendor prefix
		switch (hash) {
			// text-decoration/text-size-adjust: t, e, x
			case 1015: {
				// text-size-adjust, -
				return out.charCodeAt(9) === DASH ? webkit + out + out : out
			}
			// filter/fill f, i, l
			case 951: {
				// filter, t
				return out.charCodeAt(3) === 116 ? webkit + out + out : out
			}
			// color/column, c, o, l
			case 963: {
				// column, n
				return out.charCodeAt(5) === 110 ? webkit + out + out : out
			}
			// box-decoration-break, b, o, x
			case 1009: {
				if (out.charCodeAt(4) !== 100) {
					break
				}
			}
			// mask, m, a, s
			// clip-path, c, l, i
			case 969:
			case 942: {
				return webkit + out + out
			}
			// appearance: a, p, p
			case 978: {
				return webkit + out + moz + out + out
			}
			// hyphens: h, y, p
			// user-select: u, s, e
			case 1019:
			case 983: {
				return webkit + out + moz + out + ms + out + out
			}
			// background/backface-visibility, b, a, c
			case 883: {
				// backface-visibility, -
				return out.charCodeAt(8) === DASH ? webkit + out + out : out
			}
			// flex: f, l, e
			case 932: {
				if (out.charCodeAt(4) === DASH) {
					switch (out.charCodeAt(5)) {
						// flex-grow, g
						case 103: {
							return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out
						}
						// flex-shrink, s
						case 115: {
							return webkit + out + ms + out.replace('shrink', 'negative') + out
						}
						// flex-basis, b
						case 98: {
							return webkit + out + ms + out.replace('basis', 'preferred-size') + out
						}
					}
				}

				return webkit + out + ms + out + out
			}
			// order: o, r, d
			case 964: {
				return webkit + out + ms + 'flex' + '-' + out + out
			}
			// justify-items/justify-content, j, u, s
			case 1023: {
				// justify-content, c
				if (out.charCodeAt(8) !== 99) {
					break
				}

				cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify')
				return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out
			}
			// cursor, c, u, r
			case 1005: {
				return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out
			}
			// writing-mode, w, r, i
			case 1000: {
				cache = out.substring(13).trim()
				index = cache.indexOf('-') + 1

				switch (cache.charCodeAt(0)+cache.charCodeAt(index)) {
					// vertical-lr
					case 226: {
						cache = out.replace(writingptn, 'tb')
						break
					}
					// vertical-rl
					case 232: {
						cache = out.replace(writingptn, 'tb-rl')
						break
					}
					// horizontal-tb
					case 220: {
						cache = out.replace(writingptn, 'lr')
						break
					}
					default: {
						return out
					}
				}

				return webkit + out + ms + cache + out
			}
			// position: sticky
			case 1017: {
				if (out.indexOf('sticky', 9) === -1) {
					return out
				}
			}
			// display(flex/inline-flex/inline-box): d, i, s
			case 975: {
				index = (out = input).length - 10
				cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim()

				switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7)|0)) {
					// inline-
					case 203: {
						// inline-box
						if (cache.charCodeAt(8) < 111) {
							break
						}
					}
					// inline-box/sticky
					case 115: {
						out = out.replace(cache, webkit+cache)+';'+out
						break
					}
					// inline-flex
					// flex
					case 207:
					case 102: {
						out = (
							out.replace(cache, webkit+(hash > 102 ? 'inline-' : '')+'box')+';'+
							out.replace(cache, webkit+cache)+';'+
							out.replace(cache, ms+cache+'box')+';'+
							out
						)
					}
				}

				return out + ';'
			}
			// align-items, align-center, align-self: a, l, i, -
			case 938: {
				if (out.charCodeAt(5) === DASH) {
					switch (out.charCodeAt(6)) {
						// align-items, i
						case 105: {
							cache = out.replace('-items', '')
							return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out
						}
						// align-self, s
						case 115: {
							return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out
						}
						// align-content
						default: {
							return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '') + out
						}
					}
				}
				break
			}
			// width: min-content / width: max-content
			case 953: {
				if ((index = out.indexOf('-content', 9)) > 0) {
					// width: min-content / width: max-content
					if (out.charCodeAt(index - 3) === 109 && out.charCodeAt(index - 4) !== 45) {
						cache = out.substring(index - 3)
						return 'width:' + webkit + cache + 'width:' + moz + cache + 'width:' + cache
					}
				}
				break
			}
			// transform, transition: t, r, a
			case 962: {
				out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out

				// transitions
				if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
					return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out
				}

				break
			}
		}

		return out
	}

	var i = 0

	/**
	 * Vendor
	 *
	 * @param {string} content
	 * @param {number} context
	 * @return {boolean}
	 */
	function vendor (content, context) {
		var index = content.indexOf(context === 1 ? ':' : '{')
		var key = content.substring(0, context !== 3 ? index : 10)
		var value = content.substring(index + 1, content.length - 1)

		return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context)
	}

	/**
	 * Supports
	 *
	 * @param {string} match
	 * @param {string} group
	 * @return {string}
	 */
	function supports (match, group) {
		var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2))

		return out !== group+';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '('+group+')'
	}

	/**
	 * Animation
	 *
	 * @param {string} input
	 * @return {string}
	 */
	function animation (input) {
		var length = input.length
		var index = input.indexOf(':', 9) + 1
		var declare = input.substring(0, index).trim()
		var out = input.substring(index, length-1).trim()

		switch (input.charCodeAt(9)*keyed) {
			case 0: {
				break
			}
			// animation-*, -
			case DASH: {
				// animation-name, n
				if (input.charCodeAt(10) !== 110) {
					break
				}
			}
			// animation/animation-name
			default: {
				// split in case of multiple animations
				var list = out.split((out = '', animationptn))

				for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
					var value = list[i]
					var items = value.split(propertiesptn)

					while (value = items[index]) {
						var peak = value.charCodeAt(0)

						if (keyed === 1 && (
							// letters
							(peak > AT && peak < 90) || (peak > 96 && peak < 123) || peak === UNDERSCORE ||
							// dash but not in sequence i.e --
							(peak === DASH && value.charCodeAt(1) !== DASH)
						)) {
							// not a number/function
							switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
								case 1: {
									switch (value) {
										// not a valid reserved keyword
										case 'infinite': case 'alternate': case 'backwards': case 'running':
										case 'normal': case 'forwards': case 'both': case 'none': case 'linear':
										case 'ease': case 'ease-in': case 'ease-out': case 'ease-in-out':
										case 'paused': case 'reverse': case 'alternate-reverse': case 'inherit':
										case 'initial': case 'unset': case 'step-start': case 'step-end': {
											break
										}
										default: {
											value += key
										}
									}
								}
							}
						}

						items[index++] = value
					}

					out += (i === 0 ? '' : ',') + items.join(' ')
				}
			}
		}

		out = declare + out + ';'

		if (prefix === 1 || (prefix === 2 && vendor(out, 1)))
			return webkit + out + out

		return out
	}

	/**
	 * Isolate
	 *
	 * @param {Array<string>} current
	 */
	function isolate (current) {
		for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
			// split individual elements in a selector i.e h1 h2 === [h1, h2]
			var elements = current[i].split(elementptn)
			var out = ''

			for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
				// empty element
				if ((size = (element = elements[j]).length) === 0 && l > 1) {
					continue
				}

				tail = out.charCodeAt(out.length-1)
				code = element.charCodeAt(0)
				padding = ''

				if (j !== 0) {
					// determine if we need padding
					switch (tail) {
						case STAR:
						case TILDE:
						case GREATERTHAN:
						case PLUS:
						case SPACE:
						case OPENPARENTHESES:  {
							break
						}
						default: {
							padding = ' '
						}
					}
				}

				switch (code) {
					case AND: {
						element = padding + nscopealt
					}
					case TILDE:
					case GREATERTHAN:
					case PLUS:
					case SPACE:
					case CLOSEPARENTHESES:
					case OPENPARENTHESES: {
						break
					}
					case OPENBRACKET: {
						element = padding + element + nscopealt
						break
					}
					case COLON: {
						switch (element.charCodeAt(1)*2 + element.charCodeAt(2)*3) {
							// :global
							case 530: {
								if (escape > 0) {
									element = padding + element.substring(8, size - 1)
									break
								}
							}
							// :hover, :nth-child(), ...
							default: {
								if (j < 1 || elements[j-1].length < 1) {
									element = padding + nscopealt + element
								}
							}
						}
						break
					}
					case COMMA: {
						padding = ''
					}
					default: {
						if (size > 1 && element.indexOf(':') > 0) {
							element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2')
						} else {
							element = padding + element + nscopealt
						}
					}
				}

				out += element
			}

			selector[i] = out.replace(formatptn, '').trim()
		}

		return selector
	}

	/**
	 * Proxy
	 *
	 * @param {number} context
	 * @param {string} content
	 * @param {Array<string>} selectors
	 * @param {Array<string>} parents
	 * @param {number} line
	 * @param {number} column
	 * @param {number} length
	 * @param {number} id
	 * @param {number} depth
	 * @return {(string|void|*)}
	 */
	function proxy (context, content, selectors, parents, line, column, length, id, depth) {
		for (var i = 0, out = content, next; i < plugged; ++i) {
			switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth)) {
				case void 0:
				case false:
				case true:
				case null: {
					break
				}
				default: {
					out = next
				}
			}
		}

		switch (out) {
			case void 0:
			case false:
			case true:
			case null:
			case content: {
				break
			}
			default: {
				return out
			}
		}
	}

	/**
	 * Minify
	 *
	 * @param {(string|*)} output
	 * @return {string}
	 */
	function minify (output) {
		return output
			.replace(formatptn, '')
			.replace(beforeptn, '')
			.replace(afterptn, '$1')
			.replace(tailptn, '$1')
			.replace(whiteptn, ' ')
	}

	/**
	 * Use
	 *
	 * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
	 */
	function use (plugin) {
		switch (plugin) {
			case void 0:
			case null: {
				plugged = plugins.length = 0
				break
			}
			default: {
				switch (plugin.constructor) {
					case Array: {
						for (var i = 0, length = plugin.length; i < length; ++i) {
							use(plugin[i])
						}
						break
					}
					case Function: {
						plugins[plugged++] = plugin
						break
					}
					case Boolean: {
						unkwn = !!plugin|0
					}
				}
			}
 		}

 		return use
	}

	/**
	 * Set
	 *
	 * @param {*} options
	 */
	function set (options) {
		for (var name in options) {
			var value = options[name]
			switch (name) {
				case 'keyframe': keyed = value|0; break
				case 'global': escape = value|0; break
				case 'cascade': cascade = value|0; break
				case 'compress': compress = value|0; break
				case 'semicolon': semicolon = value|0; break
				case 'preserve': preserve = value|0; break
				case 'prefix':
					should = null

					if (!value) {
						prefix = 0
					} else if (typeof value !== 'function') {
						prefix = 1
					} else {
						prefix = 2
						should = value
					}
			}
		}

		return set
	}

	/**
	 * Stylis
	 *
	 * @param {string} selector
	 * @param {string} input
	 * @return {*}
	 */
	function stylis (selector, input) {
		if (this !== void 0 && this.constructor === stylis) {
			return factory(selector)
		}

		// setup
		var ns = selector
		var code = ns.charCodeAt(0)

		// trim leading whitespace
		if (code < 33) {
			code = (ns = ns.trim()).charCodeAt(0)
		}

		// keyframe/animation namespace
		if (keyed > 0) {
			key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-')
		}

		// reset, used to assert if a plugin is moneky-patching the return value
		code = 1

		// cascade/isolate
		if (cascade === 1) {
			nscope = ns
		} else {
			nscopealt = ns
		}

		var selectors = [nscope]
		var result

		// execute plugins, pre-process context
		if (plugged > 0) {
			result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0)

			if (result !== void 0 && typeof result === 'string') {
				input = result
			}
		}

		// build
		var output = compile(array, selectors, input, 0, 0)

		// execute plugins, post-process context
		if (plugged > 0) {
			result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0)

			// bypass minification
			if (result !== void 0 && typeof(output = result) !== 'string') {
				code = 0
			}
		}

		// reset
		key = ''
		nscope = ''
		nscopealt = ''
		pattern = 0
		line = 1
		column = 1

		return compress*code === 0 ? output : minify(output)
	}

	stylis['use'] = use
	stylis['set'] = set

	if (options !== void 0) {
		set(options)
	}

	return stylis
}));


/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
    BODY: "bodyAttributes",
    HTML: "htmlAttributes",
    TITLE: "titleAttributes"
};

var TAG_NAMES = exports.TAG_NAMES = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
};

var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
    return TAG_NAMES[name];
});

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    CHARSET: "charset",
    CSS_TEXT: "cssText",
    HREF: "href",
    HTTPEQUIV: "http-equiv",
    INNER_HTML: "innerHTML",
    ITEM_PROP: "itemprop",
    NAME: "name",
    PROPERTY: "property",
    REL: "rel",
    SRC: "src"
};

var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
    accesskey: "accessKey",
    charset: "charSet",
    class: "className",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    "http-equiv": "httpEquiv",
    itemprop: "itemProp",
    tabindex: "tabIndex"
};

var HELMET_PROPS = exports.HELMET_PROPS = {
    DEFAULT_TITLE: "defaultTitle",
    DEFER: "defer",
    ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
    ON_CHANGE_CLIENT_STATE: "onChangeClientState",
    TITLE_TEMPLATE: "titleTemplate"
};

var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];

var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(52);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSideEffect = __webpack_require__(398);

var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

var _deepEqual = __webpack_require__(401);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _HelmetUtils = __webpack_require__(404);

var _HelmetConstants = __webpack_require__(229);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helmet = function Helmet(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
        _inherits(HelmetWrapper, _React$Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _deepEqual2.default)(this.props, nextProps);
        };

        HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
            if (!nestedChildren) {
                return null;
            }

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.SCRIPT:
                case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    return {
                        innerHTML: nestedChildren
                    };

                case _HelmetConstants.TAG_NAMES.STYLE:
                    return {
                        cssText: nestedChildren
                    };
            }

            throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
        };

        HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
            var _extends2;

            var child = _ref.child,
                arrayTypeChildren = _ref.arrayTypeChildren,
                newChildProps = _ref.newChildProps,
                nestedChildren = _ref.nestedChildren;

            return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
        };

        HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
            var _extends3, _extends4;

            var child = _ref2.child,
                newProps = _ref2.newProps,
                newChildProps = _ref2.newChildProps,
                nestedChildren = _ref2.nestedChildren;

            switch (child.type) {
                case _HelmetConstants.TAG_NAMES.TITLE:
                    return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));

                case _HelmetConstants.TAG_NAMES.BODY:
                    return _extends({}, newProps, {
                        bodyAttributes: _extends({}, newChildProps)
                    });

                case _HelmetConstants.TAG_NAMES.HTML:
                    return _extends({}, newProps, {
                        htmlAttributes: _extends({}, newChildProps)
                    });
            }

            return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
        };

        HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
            var newFlattenedProps = _extends({}, newProps);

            Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
                var _extends5;

                newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
            });

            return newFlattenedProps;
        };

        HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
            if (true) {
                if (!_HelmetConstants.VALID_TAG_NAMES.some(function (name) {
                    return child.type === name;
                })) {
                    if (typeof child.type === "function") {
                        return (0, _HelmetUtils.warn)("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
                    }

                    return (0, _HelmetUtils.warn)("Only elements types " + _HelmetConstants.VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
                }

                if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function (nestedChild) {
                    return typeof nestedChild !== "string";
                }))) {
                    throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
                }
            }

            return true;
        };

        HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
            var _this2 = this;

            var arrayTypeChildren = {};

            _react2.default.Children.forEach(children, function (child) {
                if (!child || !child.props) {
                    return;
                }

                var _child$props = child.props,
                    nestedChildren = _child$props.children,
                    childProps = _objectWithoutProperties(_child$props, ["children"]);

                var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);

                _this2.warnOnInvalidChildren(child, nestedChildren);

                switch (child.type) {
                    case _HelmetConstants.TAG_NAMES.LINK:
                    case _HelmetConstants.TAG_NAMES.META:
                    case _HelmetConstants.TAG_NAMES.NOSCRIPT:
                    case _HelmetConstants.TAG_NAMES.SCRIPT:
                    case _HelmetConstants.TAG_NAMES.STYLE:
                        arrayTypeChildren = _this2.flattenArrayTypeChildren({
                            child: child,
                            arrayTypeChildren: arrayTypeChildren,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;

                    default:
                        newProps = _this2.mapObjectTypeChildren({
                            child: child,
                            newProps: newProps,
                            newChildProps: newChildProps,
                            nestedChildren: nestedChildren
                        });
                        break;
                }
            });

            newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
            return newProps;
        };

        HelmetWrapper.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["children"]);

            var newProps = _extends({}, props);

            if (children) {
                newProps = this.mapChildrenToProps(children, newProps);
            }

            return _react2.default.createElement(Component, newProps);
        };

        _createClass(HelmetWrapper, null, [{
            key: "canUseDOM",


            // Component.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.

            /**
            * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
            * @param {Object} bodyAttributes: {"className": "root"}
            * @param {String} defaultTitle: "Default Title"
            * @param {Boolean} defer: true
            * @param {Boolean} encodeSpecialCharacters: true
            * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
            * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
            * @param {Array} meta: [{"name": "description", "content": "Test description"}]
            * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
            * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
            * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
            * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
            * @param {String} title: "Title"
            * @param {Object} titleAttributes: {"itemprop": "name"}
            * @param {String} titleTemplate: "MySite.com - %s"
            */
            set: function set(canUseDOM) {
                Component.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_react2.default.Component), _class.propTypes = {
        base: _propTypes2.default.object,
        bodyAttributes: _propTypes2.default.object,
        children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
        defaultTitle: _propTypes2.default.string,
        defer: _propTypes2.default.bool,
        encodeSpecialCharacters: _propTypes2.default.bool,
        htmlAttributes: _propTypes2.default.object,
        link: _propTypes2.default.arrayOf(_propTypes2.default.object),
        meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
        noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
        onChangeClientState: _propTypes2.default.func,
        script: _propTypes2.default.arrayOf(_propTypes2.default.object),
        style: _propTypes2.default.arrayOf(_propTypes2.default.object),
        title: _propTypes2.default.string,
        titleAttributes: _propTypes2.default.object,
        titleTemplate: _propTypes2.default.string
    }, _class.defaultProps = {
        defer: true,
        encodeSpecialCharacters: true
    }, _class.peek = Component.peek, _class.rewind = function () {
        var mappedState = Component.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = (0, _HelmetUtils.mapStateOnServer)({
                baseTag: [],
                bodyAttributes: {},
                encodeSpecialCharacters: true,
                htmlAttributes: {},
                linkTags: [],
                metaTags: [],
                noscriptTags: [],
                scriptTags: [],
                styleTags: [],
                title: "",
                titleAttributes: {}
            });
        }

        return mappedState;
    }, _temp;
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);

var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;

exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _exenv = __webpack_require__(399);

var _exenv2 = _interopRequireDefault(_exenv);

var _shallowequal = __webpack_require__(400);

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !(0, _shallowequal2.default)(nextProps, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return _react2.default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_react.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = _exenv2.default.canUseDOM;


    return SideEffect;
  };
};

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 400 */
/***/ (function(module, exports) {

module.exports = function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if(ret !== void 0) {
        return !!ret;
    }

    if(objA === objB) {
        return true;
    }

    if(typeof objA !== 'object' || !objA ||
       typeof objB !== 'object' || !objB) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if(keysA.length !== keysB.length) {
        return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // Test for A's keys different from B.
    for(var idx = 0; idx < keysA.length; idx++) {

        var key = keysA[idx];

        if(!bHasOwnProperty(key)) {
            return false;
        }

        var valueA = objA[key];
        var valueB = objB[key];

        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

        if(ret === false ||
           ret === void 0 && valueA !== valueB) {
            return false;
        }

    }

    return true;

};


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(402);
var isArguments = __webpack_require__(403);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 402 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 403 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _objectAssign = __webpack_require__(57);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__(229);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (encode === false) {
        return String(str);
    }

    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
    var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);

    return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        if (Array.isArray(props[tagName])) {
            return true;
        }
        if (typeof props[tagName] !== "undefined") {
            warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
        }
        return false;
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
        defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
        encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        onChangeClientState: getOnChangeClientState(propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
    };
};

var rafPolyfill = function () {
    var clock = Date.now();

    return function (callback) {
        var currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(function () {
                rafPolyfill(callback);
            }, 0);
        }
    };
}();

var cafPolyfill = function cafPolyfill(id) {
    return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;

var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
    return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(function () {
            commitTagChanges(newState, function () {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
    var baseTag = newState.baseTag,
        bodyAttributes = newState.bodyAttributes,
        htmlAttributes = newState.htmlAttributes,
        linkTags = newState.linkTags,
        metaTags = newState.metaTags,
        noscriptTags = newState.noscriptTags,
        onChangeClientState = newState.onChangeClientState,
        scriptTags = newState.scriptTags,
        styleTags = newState.styleTags,
        title = newState.title,
        titleAttributes = newState.titleAttributes;

    updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
    updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;


        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
    return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
    if (typeof title !== "undefined" && document.title !== title) {
        document.title = flattenArray(title);
    }

    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var elementTag = document.getElementsByTagName(tagName)[0];

    if (!elementTag) {
        return;
    }

    var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";

        if (elementTag.getAttribute(attribute) !== value) {
            elementTag.setAttribute(attribute, value);
        }

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        elementTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
    } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
        elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
    var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
    var attributeString = generateElementAttributesAsString(attributes);
    var flattenedTitle = flattenArray(title);
    return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;

        return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
    var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(attributes).reduce(function (obj, key) {
        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
        return obj;
    }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
    var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(props).reduce(function (obj, key) {
        obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
    var _initProps;

    // assigning into an array to define toString function on it
    var initProps = (_initProps = {
        key: title
    }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
    var props = convertElementAttributestoReactProps(attributes, initProps);

    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var _mappedTag;

        var mappedTag = (_mappedTag = {
            key: i
        }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

            if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return _react2.default.createElement(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
                }
            };
        case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
        case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return convertElementAttributestoReactProps(tags);
                },
                toString: function toString() {
                    return generateElementAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsReactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags, encode);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var baseTag = _ref.baseTag,
        bodyAttributes = _ref.bodyAttributes,
        encode = _ref.encode,
        htmlAttributes = _ref.htmlAttributes,
        linkTags = _ref.linkTags,
        metaTags = _ref.metaTags,
        noscriptTags = _ref.noscriptTags,
        scriptTags = _ref.scriptTags,
        styleTags = _ref.styleTags,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? "" : _ref$title,
        titleAttributes = _ref.titleAttributes;
    return {
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
        bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
        htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }, encode)
    };
};

exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(156)))

/***/ }),
/* 405 */,
/* 406 */,
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperties = __webpack_require__(408);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _freeze = __webpack_require__(411);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (strings, raw) {
  return (0, _freeze2.default)((0, _defineProperties2.default)(strings, {
    raw: {
      value: (0, _freeze2.default)(raw)
    }
  }));
};

/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(409), __esModule: true };

/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(410);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(90) });


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(412), __esModule: true };

/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(413);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(35).onFreeze;

__webpack_require__(59)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(12), __webpack_require__(440));
	else if(typeof define === 'function' && define.amd)
		define(["react", "highcharts"], factory);
	else if(typeof exports === 'object')
		exports["ReactHighcharts"] = factory(require("react"), require("highcharts"));
	else
		root["ReactHighcharts"] = factory(root["React"], root["Highcharts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(6);

var emptyObject = __webpack_require__(9);
var _invariant = __webpack_require__(1);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(3);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var React = __webpack_require__(5);
var factory = __webpack_require__(7);

if (typeof React === 'undefined') {
  throw Error(
    'create-react-class could not find the React object. If you are using script tags, ' +
      'make sure that React is being loaded before create-react-class.'
  );
}

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(5);
var createReactClass = __webpack_require__(8);
var PropTypes = __webpack_require__(14);
var win = typeof global === 'undefined' ? window : global;

module.exports = function (chartType, Highcharts) {
  var displayName = 'Highcharts' + chartType;
  var result = createReactClass({
    displayName: displayName,

    propTypes: {
      config: PropTypes.object,
      isPureConfig: PropTypes.bool,
      neverReflow: PropTypes.bool,
      callback: PropTypes.func,
      domProps: PropTypes.object
    },
    getDefaultProps: function getDefaultProps() {
      return {
        callback: function callback() {},
        domProps: {}
      };
    },
    setChartRef: function setChartRef(chartRef) {
      this.chartRef = chartRef;
    },
    renderChart: function renderChart(config) {
      var _this = this;

      if (!config) {
        throw new Error('Config must be specified for the ' + displayName + ' component');
      }
      var chartConfig = config.chart;
      this.chart = new Highcharts[chartType](_extends({}, config, {
        chart: _extends({}, chartConfig, {
          renderTo: this.chartRef
        })
      }), this.props.callback);

      if (!this.props.neverReflow) {
        win && win.requestAnimationFrame && requestAnimationFrame(function () {
          _this.chart && _this.chart.options && _this.chart.reflow();
        });
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      if (nextProps.neverReflow || nextProps.isPureConfig && this.props.config === nextProps.config) {
        return true;
      }
      this.renderChart(nextProps.config);
      return false;
    },


    getChart: function getChart() {
      if (!this.chart) {
        throw new Error('getChart() should not be called before the component is mounted');
      }
      return this.chart;
    },

    componentDidMount: function componentDidMount() {
      this.renderChart(this.props.config);
    },

    componentWillUnmount: function componentWillUnmount() {
      this.chart.destroy();
    },


    render: function render() {
      return React.createElement('div', _extends({ ref: this.setChartRef }, this.props.domProps));
    }
  });

  result.Highcharts = Highcharts;
  result.withHighcharts = function (Highcharts) {
    return module.exports(chartType, Highcharts);
  };
  return result;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(3);
  var ReactPropTypesSecret = __webpack_require__(4);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);
var ReactPropTypesSecret = __webpack_require__(4);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);
var assign = __webpack_require__(6);

var ReactPropTypesSecret = __webpack_require__(4);
var checkPropTypes = __webpack_require__(11);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(13)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(12)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10)('Chart', __webpack_require__(17));

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
});

/***/ }),
/* 440 */
/***/ (function(module, exports) {

/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(M,S){"object"===typeof module&&module.exports?module.exports=M.document?S(M):S:M.Highcharts=S(M)})("undefined"!==typeof window?window:this,function(M){M=function(){var a=window,C=a.document,A=a.navigator&&a.navigator.userAgent||"",F=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,E=/(edge|msie|trident)/i.test(A)&&!window.opera,m=!F,f=/Firefox/.test(A),l=f&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",
version:"5.0.14",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:l,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:E,isWebKit:/AppleWebKit/.test(A),isFirefox:f,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:F,vml:m,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var C=[],A=a.charts,F=a.doc,E=a.win;a.error=function(m,f){m=a.isNumber(m)?"Highcharts error #"+
m+": www.highcharts.com/errors/"+m:m;if(f)throw Error(m);E.console&&console.log(m)};a.Fx=function(a,f,l){this.options=f;this.elem=a;this.prop=l};a.Fx.prototype={dSetter:function(){var a=this.paths[0],f=this.paths[1],l=[],r=this.now,u=a.length,t;if(1===r)l=this.toD;else if(u===f.length&&1>r)for(;u--;)t=parseFloat(a[u]),l[u]=isNaN(t)?a[u]:r*parseFloat(f[u]-t)+t;else l=f;this.elem.attr("d",l,null,!0)},update:function(){var a=this.elem,f=this.prop,l=this.now,r=this.options.step;if(this[f+"Setter"])this[f+
"Setter"]();else a.attr?a.element&&a.attr(f,l,null,!0):a.style[f]=l+this.unit;r&&r.call(a,l,this)},run:function(a,f,l){var r=this,m=function(a){return m.stopped?!1:r.step(a)},t;this.startTime=+new Date;this.start=a;this.end=f;this.unit=l;this.now=this.start;this.pos=0;m.elem=this.elem;m.prop=this.prop;m()&&1===C.push(m)&&(m.timerId=setInterval(function(){for(t=0;t<C.length;t++)C[t]()||C.splice(t--,1);C.length||clearInterval(m.timerId)},13))},step:function(m){var f=+new Date,l,r=this.options,u=this.elem,
t=r.complete,g=r.duration,d=r.curAnim;u.attr&&!u.element?m=!1:m||f>=g+this.startTime?(this.now=this.end,this.pos=1,this.update(),l=d[this.prop]=!0,a.objectEach(d,function(a){!0!==a&&(l=!1)}),l&&t&&t.call(u),m=!1):(this.pos=r.easing((f-this.startTime)/g),this.now=this.start+(this.end-this.start)*this.pos,this.update(),m=!0);return m},initPath:function(m,f,l){function r(a){var c,e;for(n=a.length;n--;)c="M"===a[n]||"L"===a[n],e=/[a-zA-Z]/.test(a[n+3]),c&&e&&a.splice(n+1,0,a[n+1],a[n+2],a[n+1],a[n+2])}
function u(a,c){for(;a.length<v;){a[0]=c[v-a.length];var b=a.slice(0,e);[].splice.apply(a,[0,0].concat(b));D&&(b=a.slice(a.length-e),[].splice.apply(a,[a.length,0].concat(b)),n--)}a[0]="M"}function t(a,c){for(var q=(v-a.length)/e;0<q&&q--;)y=a.slice().splice(a.length/J-e,e*J),y[0]=c[v-e-q*e],b&&(y[e-6]=y[e-2],y[e-5]=y[e-1]),[].splice.apply(a,[a.length/J,0].concat(y)),D&&q--}f=f||"";var g,d=m.startX,k=m.endX,b=-1<f.indexOf("C"),e=b?7:3,v,y,n;f=f.split(" ");l=l.slice();var D=m.isArea,J=D?2:1,c;b&&(r(f),
r(l));if(d&&k){for(n=0;n<d.length;n++)if(d[n]===k[0]){g=n;break}else if(d[0]===k[k.length-d.length+n]){g=n;c=!0;break}void 0===g&&(f=[])}f.length&&a.isNumber(g)&&(v=l.length+g*J*e,c?(u(f,l),t(l,f)):(u(l,f),t(f,l)));return[f,l]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,f){var m;a||(a={});for(m in f)a[m]=f[m];return a};a.merge=function(){var m,f=arguments,l,r={},u=
function(f,g){"object"!==typeof f&&(f={});a.objectEach(g,function(d,k){!a.isObject(d,!0)||a.isClass(d)||a.isDOMElement(d)?f[k]=g[k]:f[k]=u(f[k]||{},d)});return f};!0===f[0]&&(r=f[1],f=Array.prototype.slice.call(f,2));l=f.length;for(m=0;m<l;m++)r=u(r,f[m]);return r};a.pInt=function(a,f){return parseInt(a,f||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(m,
f){return!!m&&"object"===typeof m&&(!f||!a.isArray(m))};a.isDOMElement=function(m){return a.isObject(m)&&"number"===typeof m.nodeType};a.isClass=function(m){var f=m&&m.constructor;return!(!a.isObject(m,!0)||a.isDOMElement(m)||!f||!f.name||"Object"===f.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,f){for(var m=a.length;m--;)if(a[m]===f){a.splice(m,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(m,f,l){var r;a.isString(f)?a.defined(l)?
m.setAttribute(f,l):m&&m.getAttribute&&(r=m.getAttribute(f)):a.defined(f)&&a.isObject(f)&&a.objectEach(f,function(a,f){m.setAttribute(f,a)});return r};a.splat=function(m){return a.isArray(m)?m:[m]};a.syncTimeout=function(a,f,l){if(f)return setTimeout(a,f,l);a.call(0,l)};a.pick=function(){var a=arguments,f,l,r=a.length;for(f=0;f<r;f++)if(l=a[f],void 0!==l&&null!==l)return l};a.css=function(m,f){a.isMS&&!a.svg&&f&&void 0!==f.opacity&&(f.filter="alpha(opacity\x3d"+100*f.opacity+")");a.extend(m.style,
f)};a.createElement=function(m,f,l,r,u){m=F.createElement(m);var t=a.css;f&&a.extend(m,f);u&&t(m,{padding:0,border:"none",margin:0});l&&t(m,l);r&&r.appendChild(m);return m};a.extendClass=function(m,f){var l=function(){};l.prototype=new m;a.extend(l.prototype,f);return l};a.pad=function(a,f,l){return Array((f||2)+1-String(a).length).join(l||0)+a};a.relativeLength=function(a,f,l){return/%$/.test(a)?f*parseFloat(a)/100+(l||0):parseFloat(a)};a.wrap=function(a,f,l){var r=a[f];a[f]=function(){var a=Array.prototype.slice.call(arguments),
f=arguments,g=this;g.proceed=function(){r.apply(g,arguments.length?arguments:f)};a.unshift(r);a=l.apply(this,a);g.proceed=null;return a}};a.getTZOffset=function(m){var f=a.Date;return 6E4*(f.hcGetTimezoneOffset&&f.hcGetTimezoneOffset(m)||f.hcTimezoneOffset||0)};a.dateFormat=function(m,f,l){if(!a.defined(f)||isNaN(f))return a.defaultOptions.lang.invalidDate||"";m=a.pick(m,"%Y-%m-%d %H:%M:%S");var r=a.Date,u=new r(f-a.getTZOffset(f)),t=u[r.hcGetHours](),g=u[r.hcGetDay](),d=u[r.hcGetDate](),k=u[r.hcGetMonth](),
b=u[r.hcGetFullYear](),e=a.defaultOptions.lang,v=e.weekdays,y=e.shortWeekdays,n=a.pad,r=a.extend({a:y?y[g]:v[g].substr(0,3),A:v[g],d:n(d),e:n(d,2," "),w:g,b:e.shortMonths[k],B:e.months[k],m:n(k+1),y:b.toString().substr(2,2),Y:b,H:n(t),k:t,I:n(t%12||12),l:t%12||12,M:n(u[r.hcGetMinutes]()),p:12>t?"AM":"PM",P:12>t?"am":"pm",S:n(u.getSeconds()),L:n(Math.round(f%1E3),3)},a.dateFormats);a.objectEach(r,function(a,e){for(;-1!==m.indexOf("%"+e);)m=m.replace("%"+e,"function"===typeof a?a(f):a)});return l?m.substr(0,
1).toUpperCase()+m.substr(1):m};a.formatSingle=function(m,f){var l=/\.([0-9])/,r=a.defaultOptions.lang;/f$/.test(m)?(l=(l=m.match(l))?l[1]:-1,null!==f&&(f=a.numberFormat(f,l,r.decimalPoint,-1<m.indexOf(",")?r.thousandsSep:""))):f=a.dateFormat(m,f);return f};a.format=function(m,f){for(var l="{",r=!1,u,t,g,d,k=[],b;m;){l=m.indexOf(l);if(-1===l)break;u=m.slice(0,l);if(r){u=u.split(":");t=u.shift().split(".");d=t.length;b=f;for(g=0;g<d;g++)b=b[t[g]];u.length&&(b=a.formatSingle(u.join(":"),b));k.push(b)}else k.push(u);
m=m.slice(l+1);l=(r=!r)?"}":"{"}k.push(m);return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(m,f,l,r,u){var t,g=m;l=a.pick(l,1);t=m/l;f||(f=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===r&&(1===l?f=a.grep(f,function(a){return 0===a%1}):.1>=l&&(f=[1/l])));for(r=0;r<f.length&&!(g=f[r],u&&g*l>=m||!u&&t<=(f[r]+(f[r+1]||f[r]))/2);r++);return g=a.correctFloat(g*l,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,f){var l=a.length,r,m;for(m=0;m<l;m++)a[m].safeI=m;a.sort(function(a,g){r=f(a,g);return 0===r?a.safeI-g.safeI:r});for(m=0;m<l;m++)delete a[m].safeI};a.arrayMin=function(a){for(var f=a.length,l=a[0];f--;)a[f]<l&&(l=a[f]);return l};a.arrayMax=function(a){for(var f=a.length,l=a[0];f--;)a[f]>l&&(l=a[f]);return l};a.destroyObjectProperties=function(m,f){a.objectEach(m,function(a,r){a&&a!==f&&a.destroy&&a.destroy();delete m[r]})};a.discardElement=function(m){var f=a.garbageBin;f||(f=a.createElement("div"));
m&&f.appendChild(m);f.innerHTML=""};a.correctFloat=function(a,f){return parseFloat(a.toPrecision(f||14))};a.setAnimation=function(m,f){f.renderer.globalAnimation=a.pick(m,f.options.chart.animation,!0)};a.animObject=function(m){return a.isObject(m)?a.merge(m):{duration:m?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(m,f,l,r){m=+m||0;f=+f;var u=a.defaultOptions.lang,t=(m.toString().split(".")[1]||"").split("e")[0].length,
g,d,k=m.toString().split("e");-1===f?f=Math.min(t,20):a.isNumber(f)||(f=2);d=(Math.abs(k[1]?k[0]:m)+Math.pow(10,-Math.max(f,t)-1)).toFixed(f);t=String(a.pInt(d));g=3<t.length?t.length%3:0;l=a.pick(l,u.decimalPoint);r=a.pick(r,u.thousandsSep);m=(0>m?"-":"")+(g?t.substr(0,g)+r:"");m+=t.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+r);f&&(m+=l+d.slice(-f));k[1]&&(m+="e"+k[1]);return m};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(m,f,l){if("width"===f)return Math.min(m.offsetWidth,
m.scrollWidth)-a.getStyle(m,"padding-left")-a.getStyle(m,"padding-right");if("height"===f)return Math.min(m.offsetHeight,m.scrollHeight)-a.getStyle(m,"padding-top")-a.getStyle(m,"padding-bottom");if(m=E.getComputedStyle(m,void 0))m=m.getPropertyValue(f),a.pick(l,!0)&&(m=a.pInt(m));return m};a.inArray=function(a,f){return f.indexOf?f.indexOf(a):[].indexOf.call(f,a)};a.grep=function(a,f){return[].filter.call(a,f)};a.find=function(a,f){return[].find.call(a,f)};a.map=function(a,f){for(var l=[],r=0,m=
a.length;r<m;r++)l[r]=f.call(a[r],a[r],r,a);return l};a.offset=function(a){var f=F.documentElement;a=a.getBoundingClientRect();return{top:a.top+(E.pageYOffset||f.scrollTop)-(f.clientTop||0),left:a.left+(E.pageXOffset||f.scrollLeft)-(f.clientLeft||0)}};a.stop=function(a,f){for(var l=C.length;l--;)C[l].elem!==a||f&&f!==C[l].prop||(C[l].stopped=!0)};a.each=function(a,f,l){return Array.prototype.forEach.call(a,f,l)};a.objectEach=function(a,f,l){for(var r in a)a.hasOwnProperty(r)&&f.call(l,a[r],r,a)};
a.addEvent=function(m,f,l){function r(a){a.target=a.srcElement||E;l.call(m,a)}var u=m.hcEvents=m.hcEvents||{};m.addEventListener?m.addEventListener(f,l,!1):m.attachEvent&&(m.hcEventsIE||(m.hcEventsIE={}),l.hcGetKey||(l.hcGetKey=a.uniqueKey()),m.hcEventsIE[l.hcGetKey]=r,m.attachEvent("on"+f,r));u[f]||(u[f]=[]);u[f].push(l);return function(){a.removeEvent(m,f,l)}};a.removeEvent=function(m,f,l){function r(a,b){m.removeEventListener?m.removeEventListener(a,b,!1):m.attachEvent&&(b=m.hcEventsIE[b.hcGetKey],
m.detachEvent("on"+a,b))}function u(){var d,b;m.nodeName&&(f?(d={},d[f]=!0):d=g,a.objectEach(d,function(a,d){if(g[d])for(b=g[d].length;b--;)r(d,g[d][b])}))}var t,g=m.hcEvents,d;g&&(f?(t=g[f]||[],l?(d=a.inArray(l,t),-1<d&&(t.splice(d,1),g[f]=t),r(f,l)):(u(),g[f]=[])):(u(),m.hcEvents={}))};a.fireEvent=function(m,f,l,r){var u;u=m.hcEvents;var t,g;l=l||{};if(F.createEvent&&(m.dispatchEvent||m.fireEvent))u=F.createEvent("Events"),u.initEvent(f,!0,!0),a.extend(u,l),m.dispatchEvent?m.dispatchEvent(u):m.fireEvent(f,
u);else if(u)for(u=u[f]||[],t=u.length,l.target||a.extend(l,{preventDefault:function(){l.defaultPrevented=!0},target:m,type:f}),f=0;f<t;f++)(g=u[f])&&!1===g.call(m,l)&&l.preventDefault();r&&!l.defaultPrevented&&r(l)};a.animate=function(m,f,l){var r,u="",t,g,d;a.isObject(l)||(d=arguments,l={duration:d[2],easing:d[3],complete:d[4]});a.isNumber(l.duration)||(l.duration=400);l.easing="function"===typeof l.easing?l.easing:Math[l.easing]||Math.easeInOutSine;l.curAnim=a.merge(f);a.objectEach(f,function(d,
b){a.stop(m,b);g=new a.Fx(m,l,b);t=null;"d"===b?(g.paths=g.initPath(m,m.d,f.d),g.toD=f.d,r=0,t=1):m.attr?r=m.attr(b):(r=parseFloat(a.getStyle(m,b))||0,"opacity"!==b&&(u="px"));t||(t=d);t&&t.match&&t.match("px")&&(t=t.replace(/px/g,""));g.run(r,t,u)})};a.seriesType=function(m,f,l,r,u){var t=a.getOptions(),g=a.seriesTypes;t.plotOptions[m]=a.merge(t.plotOptions[f],l);g[m]=a.extendClass(g[f]||function(){},r);g[m].prototype.type=m;u&&(g[m].prototype.pointClass=a.extendClass(a.Point,u));return g[m]};a.uniqueKey=
function(){var a=Math.random().toString(36).substring(2,9),f=0;return function(){return"highcharts-"+a+"-"+f++}}();E.jQuery&&(E.jQuery.fn.highcharts=function(){var m=[].slice.call(arguments);if(this[0])return m[0]?(new (a[a.isString(m[0])?m.shift():"Chart"])(this[0],m[0],m[1]),this):A[a.attr(this[0],"data-highcharts-chart")]});F&&!F.defaultView&&(a.getStyle=function(m,f){var l={width:"clientWidth",height:"clientHeight"}[f];if(m.style[f])return a.pInt(m.style[f]);"opacity"===f&&(f="filter");if(l)return m.style.zoom=
1,Math.max(m[l]-2*a.getStyle(m,"padding"),0);m=m.currentStyle[f.replace(/\-(\w)/g,function(a,f){return f.toUpperCase()})];"filter"===f&&(m=m.replace(/alpha\(opacity=([0-9]+)\)/,function(a,f){return f/100}));return""===m?1:a.pInt(m)});Array.prototype.forEach||(a.each=function(a,f,l){for(var r=0,m=a.length;r<m;r++)if(!1===f.call(l,a[r],r,a))return r});Array.prototype.indexOf||(a.inArray=function(a,f){var l,r=0;if(f)for(l=f.length;r<l;r++)if(f[r]===a)return r;return-1});Array.prototype.filter||(a.grep=
function(a,f){for(var l=[],r=0,m=a.length;r<m;r++)f(a[r],r)&&l.push(a[r]);return l});Array.prototype.find||(a.find=function(a,f){var l,r=a.length;for(l=0;l<r;l++)if(f(a[l],l))return a[l]})})(M);(function(a){var C=a.each,A=a.isNumber,F=a.map,E=a.merge,m=a.pInt;a.Color=function(f){if(!(this instanceof a.Color))return new a.Color(f);this.init(f)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[m(a[1]),
m(a[2]),m(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[m(a[1]),m(a[2]),m(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(f){var l,r,m,t;if((this.input=f=this.names[f&&f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=F(f.stops,function(g){return new a.Color(g[1])});else if(f&&"#"===f.charAt()&&(l=f.length,f=parseInt(f.substr(1),16),7===l?r=[(f&16711680)>>16,(f&65280)>>
8,f&255,1]:4===l&&(r=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])),!r)for(m=this.parsers.length;m--&&!r;)t=this.parsers[m],(l=t.regex.exec(f))&&(r=t.parse(l));this.rgba=r||[]},get:function(a){var f=this.input,r=this.rgba,m;this.stops?(m=E(f),m.stops=[].concat(m.stops),C(this.stops,function(f,g){m.stops[g]=[m.stops[g][0],f.get(a)]})):m=r&&A(r[0])?"rgb"===a||!a&&1===r[3]?"rgb("+r[0]+","+r[1]+","+r[2]+")":"a"===a?r[3]:"rgba("+r.join(",")+")":f;return m},brighten:function(a){var f,r=this.rgba;
if(this.stops)C(this.stops,function(f){f.brighten(a)});else if(A(a)&&0!==a)for(f=0;3>f;f++)r[f]+=m(255*a),0>r[f]&&(r[f]=0),255<r[f]&&(r[f]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,l){var f,m;a.rgba.length?(f=this.rgba,a=a.rgba,m=1!==a[3]||1!==f[3],a=(m?"rgba(":"rgb(")+Math.round(a[0]+(f[0]-a[0])*(1-l))+","+Math.round(a[1]+(f[1]-a[1])*(1-l))+","+Math.round(a[2]+(f[2]-a[2])*(1-l))+(m?","+(a[3]+(f[3]-a[3])*(1-l)):"")+")"):a=a.input||"none";return a}};a.color=
function(f){return new a.Color(f)}})(M);(function(a){var C,A,F=a.addEvent,E=a.animate,m=a.attr,f=a.charts,l=a.color,r=a.css,u=a.createElement,t=a.defined,g=a.deg2rad,d=a.destroyObjectProperties,k=a.doc,b=a.each,e=a.extend,v=a.erase,y=a.grep,n=a.hasTouch,D=a.inArray,J=a.isArray,c=a.isFirefox,G=a.isMS,q=a.isObject,B=a.isString,K=a.isWebKit,p=a.merge,z=a.noop,I=a.objectEach,L=a.pick,h=a.pInt,w=a.removeEvent,P=a.stop,H=a.svg,O=a.SVG_NS,Q=a.symbolSizes,R=a.win;C=a.SVGElement=function(){return this};e(C.prototype,
{opacity:1,SVG_NS:O,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,h){this.element="span"===h?u(h):k.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(x,h,c){h=a.animObject(L(h,this.renderer.globalAnimation,!0));0!==h.duration?(c&&(h.complete=c),E(this,x,h)):(this.attr(x,null,c),h.step&&h.step.call(this));return this},colorGradient:function(x,h,c){var w=this.renderer,
e,q,N,d,n,g,k,H,G,v,z=[],f;x.radialGradient?q="radialGradient":x.linearGradient&&(q="linearGradient");q&&(N=x[q],n=w.gradients,k=x.stops,v=c.radialReference,J(N)&&(x[q]=N={x1:N[0],y1:N[1],x2:N[2],y2:N[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===q&&v&&!t(N.gradientUnits)&&(d=N,N=p(N,w.getRadialAttr(v,d),{gradientUnits:"userSpaceOnUse"})),I(N,function(a,x){"id"!==x&&z.push(x,a)}),I(k,function(a){z.push(a)}),z=z.join(","),n[z]?v=n[z].attr("id"):(N.id=v=a.uniqueKey(),n[z]=g=w.createElement(q).attr(N).add(w.defs),
g.radAttr=d,g.stops=[],b(k,function(x){0===x[1].indexOf("rgba")?(e=a.color(x[1]),H=e.get("rgb"),G=e.get("a")):(H=x[1],G=1);x=w.createElement("stop").attr({offset:x[0],"stop-color":H,"stop-opacity":G}).add(g);g.stops.push(x)})),f="url("+w.url+"#"+v+")",c.setAttribute(h,f),c.gradient=z,x.toString=function(){return f})},applyTextOutline:function(x){var h=this.element,c,w,p,e,q;-1!==x.indexOf("contrast")&&(x=x.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));x=x.split(" ");w=x[x.length-1];
if((p=x[0])&&"none"!==p&&a.svg){this.fakeTS=!0;x=[].slice.call(h.getElementsByTagName("tspan"));this.ySetter=this.xSetter;p=p.replace(/(^[\d\.]+)(.*?)$/g,function(a,x,h){return 2*x+h});for(q=x.length;q--;)c=x[q],"highcharts-text-outline"===c.getAttribute("class")&&v(x,h.removeChild(c));e=h.firstChild;b(x,function(a,x){0===x&&(a.setAttribute("x",h.getAttribute("x")),x=h.getAttribute("y"),a.setAttribute("y",x||0),null===x&&h.setAttribute("y",0));a=a.cloneNode(1);m(a,{"class":"highcharts-text-outline",
fill:w,stroke:w,"stroke-width":p,"stroke-linejoin":"round"});h.insertBefore(a,e)})}},attr:function(a,h,c,w){var x,p=this.element,e,q=this,b,N;"string"===typeof a&&void 0!==h&&(x=a,a={},a[x]=h);"string"===typeof a?q=(this[a+"Getter"]||this._defaultGetter).call(this,a,p):(I(a,function(x,h){b=!1;w||P(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(e||(this.symbolAttr(a),e=!0),b=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);b||(N=this[h+"Setter"]||
this._defaultSetter,N.call(this,x,h,p),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&this.updateShadows(h,x,N))},this),this.afterSetters());c&&c();return q},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,h,c){for(var x=this.shadows,w=x.length;w--;)c.call(x[w],"height"===a?Math.max(h-(x[w].cutHeight||0),0):"d"===a?this.d:h,a,x[w])},addClass:function(a,h){var x=this.attr("class")||"";-1===x.indexOf(a)&&
(h||(a=(x+(x?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==D(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var x=this;b("x y r start end width height innerR anchorX anchorY".split(" "),function(h){x[h]=L(a[h],x[h])});x.attr({d:x.renderer.symbols[x.symbolName](x.x,x.y,x.width,x.height,x)})},clip:function(a){return this.attr("clip-path",a?"url("+
this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var x=this,c={},w;h=h||a.strokeWidth||0;w=Math.round(h)%2/2;a.x=Math.floor(a.x||x.x||0)+w;a.y=Math.floor(a.y||x.y||0)+w;a.width=Math.floor((a.width||x.width||0)-2*w);a.height=Math.floor((a.height||x.height||0)-2*w);t(a.strokeWidth)&&(a.strokeWidth=h);I(a,function(a,h){x[h]!==a&&(x[h]=c[h]=a)});return c},css:function(a){var x=this.styles,c={},w=this.element,p,q="",b,d=!x,n=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);
x&&I(a,function(a,h){a!==x[h]&&(c[h]=a,d=!0)});d&&(x&&(a=e(x,c)),p=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===w.nodeName.toLowerCase()&&h(a.width),this.styles=a,p&&!H&&this.renderer.forExport&&delete a.width,G&&!H?r(this.element,a):(b=function(a,x){return"-"+x.toLowerCase()},I(a,function(a,x){-1===D(x,n)&&(q+=x.replace(/([A-Z])/g,b)+":"+a+";")}),q&&m(w,"style",q)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var x=this,c=x.element;n&&"click"===a?(c.ontouchstart=function(a){x.touchEventFired=Date.now();a.preventDefault();h.call(c,a)},c.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(x.touchEventFired||0))&&h.call(c,a)}):c["on"+a]=h;return this},setRadialReference:function(a){var x=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;x&&x.radAttr&&x.animate(this.renderer.getRadialAttr(a,
x.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,c=this.scaleX,w=this.scaleY,p=this.inverted,e=this.rotation,q=this.element;p&&(a+=this.width,h+=this.height);a=["translate("+a+","+h+")"];p?a.push("rotate(90) scale(-1,1)"):e&&a.push("rotate("+e+" "+(q.getAttribute("x")||0)+" "+(q.getAttribute("y")||0)+")");(t(c)||
t(w))&&a.push("scale("+L(c,1)+" "+L(w,1)+")");a.length&&q.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,c){var x,w,p,e,q={};w=this.renderer;p=w.alignedObjects;var b,d;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!c||B(c))this.alignTo=x=c||"renderer",v(p,this),p.push(this),c=null}else a=this.alignOptions,h=this.alignByTranslate,x=this.alignTo;c=L(c,w[x],w);x=a.align;w=a.verticalAlign;p=(c.x||0)+(a.x||
0);e=(c.y||0)+(a.y||0);"right"===x?b=1:"center"===x&&(b=2);b&&(p+=(c.width-(a.width||0))/b);q[h?"translateX":"x"]=Math.round(p);"bottom"===w?d=1:"middle"===w&&(d=2);d&&(e+=(c.height-(a.height||0))/d);q[h?"translateY":"y"]=Math.round(e);this[this.placed?"animate":"attr"](q);this.placed=!0;this.alignAttr=q;return this},getBBox:function(a,h){var x,c=this.renderer,w,p=this.element,q=this.styles,d,n=this.textStr,k,N=c.cache,H=c.cacheKeys,G;h=L(h,this.rotation);w=h*g;d=q&&q.fontSize;void 0!==n&&(G=n.toString(),
-1===G.indexOf("\x3c")&&(G=G.replace(/[0-9]/g,"0")),G+=["",h||0,d,q&&q.width,q&&q.textOverflow].join());G&&!a&&(x=N[G]);if(!x){if(p.namespaceURI===this.SVG_NS||c.forExport){try{(k=this.fakeTS&&function(a){b(p.querySelectorAll(".highcharts-text-outline"),function(x){x.style.display=a})})&&k("none"),x=p.getBBox?e({},p.getBBox()):{width:p.offsetWidth,height:p.offsetHeight},k&&k("")}catch(W){}if(!x||0>x.width)x={width:0,height:0}}else x=this.htmlGetBBox();c.isSVG&&(a=x.width,c=x.height,q&&"11px"===q.fontSize&&
17===Math.round(c)&&(x.height=c=14),h&&(x.width=Math.abs(c*Math.sin(w))+Math.abs(a*Math.cos(w)),x.height=Math.abs(c*Math.cos(w))+Math.abs(a*Math.sin(w))));if(G&&0<x.height){for(;250<H.length;)delete N[H.shift()];N[G]||H.push(G);N[G]=x}}return x},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var x=this;x.animate({opacity:0},{duration:a||150,complete:function(){x.attr({y:-9999})}})},add:function(a){var x=
this.renderer,h=this.element,c;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&x.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)c=this.zIndexSetter();c||(a?a.element:x.box).appendChild(h);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var x=a.parentNode;x&&x.removeChild(a)},destroy:function(){var a=this,h=a.element||{},c=a.renderer.isSVG&&"SPAN"===h.nodeName&&a.parentGroup,w=h.ownerSVGElement;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=
h.point=null;P(a);a.clipPath&&w&&(b(w.querySelectorAll("[clip-path]"),function(x){-1<x.getAttribute("clip-path").indexOf(a.clipPath.element.id+")")&&x.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(w=0;w<a.stops.length;w++)a.stops[w]=a.stops[w].destroy();a.stops=null}a.safeRemoveChild(h);for(a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)h=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=h;a.alignTo&&v(a.renderer.alignedObjects,a);I(a,function(x,h){delete a[h]});
return null},shadow:function(a,h,c){var x=[],w,p,q=this.element,e,b,d,n;if(!a)this.destroyShadows();else if(!this.shadows){b=L(a.width,3);d=(a.opacity||.15)/b;n=this.parentInverted?"(-1,-1)":"("+L(a.offsetX,1)+", "+L(a.offsetY,1)+")";for(w=1;w<=b;w++)p=q.cloneNode(0),e=2*b+1-2*w,m(p,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":d*w,"stroke-width":e,transform:"translate"+n,fill:"none"}),c&&(m(p,"height",Math.max(m(p,"height")-e,0)),p.cutHeight=e),h?h.element.appendChild(p):q.parentNode.insertBefore(p,
q),x.push(p);this.shadows=x}return this},destroyShadows:function(){b(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=L(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==
a&&(c.setAttribute(h,a),this[h]=a)},dashstyleSetter:function(a){var x,c=this["stroke-width"];"inherit"===c&&(c=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(x=a.length;x--;)a[x]=h(a[x])*c;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,c){this[h]=a;c.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);h.appendChild(k.createTextNode(String(L(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
h,c){"string"===typeof a?c.setAttribute(h,a):a&&this.colorGradient(a,h,c)},visibilitySetter:function(a,h,c){"inherit"===a?c.removeAttribute(h):this[h]!==a&&c.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,c){var x=this.renderer,w=this.parentGroup,p=(w||x).element||x.box,q,e=this.element,b;q=this.added;var d;t(a)&&(e.zIndex=a,a=+a,this[c]===a&&(q=!1),this[c]=a);if(q){(a=this.zIndex)&&w&&(w.handleZ=!0);c=p.childNodes;for(d=0;d<c.length&&!b;d++)w=c[d],q=w.zIndex,w!==e&&(h(q)>a||!t(a)&&t(q)||0>
a&&!t(q)&&p!==x.box)&&(p.insertBefore(e,w),b=!0);b||p.appendChild(e)}return b},_defaultSetter:function(a,h,c){c.setAttribute(h,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,h,c){this[h]=a;this.stroke&&this["stroke-width"]?
(C.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(c.removeAttribute("stroke"),this.hasStroke=!1)};A=a.SVGRenderer=function(){this.init.apply(this,arguments)};e(A.prototype,{Element:C,SVG_NS:O,init:function(a,h,w,p,q,e){var x;p=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(p));x=p.element;a.appendChild(x);-1===a.innerHTML.indexOf("xmlns")&&
m(x,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=x;this.boxWrapper=p;this.alignedObjects=[];this.url=(c||K)&&k.getElementsByTagName("base").length?R.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 5.0.14"));this.defs=this.createElement("defs").add();this.allowHTML=e;this.forExport=q;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=
0;this.setSize(h,w,!1);var b;c&&a.getBoundingClientRect&&(h=function(){r(a,{left:0,top:0});b=a.getBoundingClientRect();r(a,{left:Math.ceil(b.left)-b.left+"px",top:Math.ceil(b.top)-b.top+"px"})},h(),this.unSubPixelFix=F(R,"resize",h))},getStyle:function(a){return this.style=e({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:z,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a,h){var c=a.getBBox(!0).width;!H&&this.forExport&&(c=this.measureSpanWidth(h.firstChild.data,
a.styles));return c},applyEllipsis:function(a,h,c,w){var x=a.rotation,p=c,q,e=0,b=c.length,d=function(a){h.removeChild(h.firstChild);a&&h.appendChild(k.createTextNode(a))},n;a.rotation=0;p=this.getSpanWidth(a,h);if(n=p>w){for(;e<=b;)q=Math.ceil((e+b)/2),p=c.substring(0,q)+"\u2026",d(p),p=this.getSpanWidth(a,h),e===b?e=b+1:p>w?b=q-1:e=q;0===b&&d("")}a.rotation=x;return n},buildText:function(a){var c=a.element,w=this,x=w.forExport,p=L(a.textStr,"").toString(),q=-1!==p.indexOf("\x3c"),e=c.childNodes,
d,n,g,G,v=m(c,"x"),z=a.styles,f=a.textWidth,I=z&&z.lineHeight,B=z&&z.textOutline,D=z&&"ellipsis"===z.textOverflow,l=z&&"nowrap"===z.whiteSpace,P=z&&z.fontSize,t,J,u=e.length,z=f&&!a.added&&this.box,K=function(a){var x;x=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:P||w.style.fontSize||12;return I?h(I):w.fontMetrics(x,a.getAttribute("style")?a:c).h};t=[p,D,l,I,B,P,f].join();if(t!==a.textCache){for(a.textCache=t;u--;)c.removeChild(e[u]);q||B||D||f||-1!==p.indexOf(" ")?(d=/<.*class="([^"]+)".*>/,
n=/<.*style="([^"]+)".*>/,g=/<.*href="([^"]+)".*>/,z&&z.appendChild(c),p=q?p.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[p],p=y(p,function(a){return""!==a}),b(p,function(h,p){var q,e=0;h=h.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");q=h.split("|||");b(q,function(h){if(""!==
h||1===q.length){var b={},z=k.createElementNS(w.SVG_NS,"tspan"),y,I;d.test(h)&&(y=h.match(d)[1],m(z,"class",y));n.test(h)&&(I=h.match(n)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),m(z,"style",I));g.test(h)&&!x&&(m(z,"onclick",'location.href\x3d"'+h.match(g)[1]+'"'),r(z,{cursor:"pointer"}));h=(h.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==h){z.appendChild(k.createTextNode(h));e?b.dx=0:p&&null!==v&&(b.x=v);m(z,b);c.appendChild(z);!e&&J&&(!H&&x&&r(z,{display:"block"}),
m(z,"dy",K(z)));if(f){b=h.replace(/([^\^])-/g,"$1- ").split(" ");y=1<q.length||p||1<b.length&&!l;var B=[],N,P=K(z),t=a.rotation;for(D&&(G=w.applyEllipsis(a,z,h,f));!D&&y&&(b.length||B.length);)a.rotation=0,N=w.getSpanWidth(a,z),h=N>f,void 0===G&&(G=h),h&&1!==b.length?(z.removeChild(z.firstChild),B.unshift(b.pop())):(b=B,B=[],b.length&&!l&&(z=k.createElementNS(O,"tspan"),m(z,{dy:P,x:v}),I&&m(z,"style",I),c.appendChild(z)),N>f&&(f=N)),b.length&&z.appendChild(k.createTextNode(b.join(" ").replace(/- /g,
"-")));a.rotation=t}e++}}});J=J||c.childNodes.length}),G&&a.attr("title",a.textStr),z&&z.removeChild(c),B&&a.applyTextOutline&&a.applyTextOutline(B)):c.appendChild(k.createTextNode(p.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=l(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,c,w,q,b,d,n,g){var x=this.label(a,h,c,g,null,null,null,null,"button"),k=0;x.attr(p({padding:8,r:2},q));var z,H,v,f;q=p({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,
style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},q);z=q.style;delete q.style;b=p(q,{fill:"#e6e6e6"},b);H=b.style;delete b.style;d=p(q,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},d);v=d.style;delete d.style;n=p(q,{style:{color:"#cccccc"}},n);f=n.style;delete n.style;F(x.element,G?"mouseover":"mouseenter",function(){3!==k&&x.setState(1)});F(x.element,G?"mouseout":"mouseleave",function(){3!==k&&x.setState(k)});x.setState=function(a){1!==a&&(x.state=k=a);x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);x.attr([q,b,d,n][a||0]).css([z,H,v,f][a||0])};x.attr(q).css(e({cursor:"default"},z));return x.on("click",function(a){3!==k&&w.call(x,a)})},crispLine:function(a,h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};J(a)?h.d=a:q(a)&&e(h,a);return this.createElement("path").attr(h)},circle:function(a,h,c){a=q(a)?a:{x:a,y:h,r:c};h=this.createElement("circle");h.xSetter=
h.ySetter=function(a,h,c){c.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,c,w,p,b){q(a)?(w=a,h=w.y,c=w.r,a=w.x):w={innerR:w,start:p,end:b};a=this.symbol("arc",a,h,c,c,w);a.r=c;return a},rect:function(a,h,c,w,p,b){p=q(a)?a.r:p;var x=this.createElement("rect");a=q(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(c,0),height:Math.max(w,0)};void 0!==b&&(a.strokeWidth=b,a=x.crisp(a));a.fill="none";p&&(a.r=p);x.rSetter=function(a,h,c){m(c,{rx:a,ry:a})};return x.attr(a)},setSize:function(a,h,c){var w=
this.alignedObjects,p=w.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:L(c,!0)?void 0:0});p--;)w[p].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,c,w,p){var x={preserveAspectRatio:"none"};1<arguments.length&&e(x,{x:h,y:c,width:w,height:p});x=this.createElement("image").attr(x);x.element.setAttributeNS?
x.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):x.element.setAttribute("hc-svg-href",a);return x},symbol:function(a,h,c,w,p,q){var x=this,d,n=/^url\((.*?)\)$/,g=n.test(a),z=!g&&(this.symbols[a]?a:"circle"),G=z&&this.symbols[z],H=t(h)&&G&&G.call(this.symbols,Math.round(h),Math.round(c),w,p,q),v,y;G?(d=this.path(H),d.attr("fill","none"),e(d,{symbolName:z,x:h,y:c,width:w,height:p}),q&&e(d,q)):g&&(v=a.match(n)[1],d=this.image(v),d.imgwidth=L(Q[v]&&Q[v].width,q&&q.width),d.imgheight=
L(Q[v]&&Q[v].height,q&&q.height),y=function(){d.attr({width:d.width,height:d.height})},b(["width","height"],function(a){d[a+"Setter"]=function(a,h){var c={},w=this["img"+h],p="width"===h?"translateX":"translateY";this[h]=a;t(w)&&(this.element&&this.element.setAttribute(h,w),this.alignByTranslate||(c[p]=((this[h]||0)-w)/2,this.attr(c)))}}),t(h)&&d.attr({x:h,y:c}),d.isImg=!0,t(d.imgwidth)&&t(d.imgheight)?y():(d.attr({width:0,height:0}),u("img",{onload:function(){var a=f[x.chartIndex];0===this.width&&
(r(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));Q[v]={width:this.width,height:this.height};d.imgwidth=this.width;d.imgheight=this.height;d.element&&y();this.parentNode&&this.parentNode.removeChild(this);x.imgCount--;if(!x.imgCount&&a&&a.onload)a.onload()},src:v}),this.imgCount++));return d},symbols:{circle:function(a,h,c,w){return this.arc(a+c/2,h+w/2,c/2,w/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,c,w){return["M",a,h,"L",a+c,h,a+c,h+w,a,h+w,"Z"]},triangle:function(a,
h,c,w){return["M",a+c/2,h,"L",a+c,h+w,a,h+w,"Z"]},"triangle-down":function(a,h,c,w){return["M",a,h,"L",a+c,h,a+c/2,h+w,"Z"]},diamond:function(a,h,c,w){return["M",a+c/2,h,"L",a+c,h+w/2,a+c/2,h+w,a,h+w/2,"Z"]},arc:function(a,h,c,w,p){var q=p.start,b=p.r||c,x=p.r||w||c,e=p.end-.001;c=p.innerR;w=L(p.open,.001>Math.abs(p.end-p.start-2*Math.PI));var d=Math.cos(q),n=Math.sin(q),g=Math.cos(e),e=Math.sin(e);p=.001>p.end-q-Math.PI?0:1;b=["M",a+b*d,h+x*n,"A",b,x,0,p,1,a+b*g,h+x*e];t(c)&&b.push(w?"M":"L",a+c*
g,h+c*e,"A",c,c,0,p,0,a+c*d,h+c*n);b.push(w?"":"Z");return b},callout:function(a,h,c,w,p){var q=Math.min(p&&p.r||0,c,w),b=q+6,e=p&&p.anchorX;p=p&&p.anchorY;var d;d=["M",a+q,h,"L",a+c-q,h,"C",a+c,h,a+c,h,a+c,h+q,"L",a+c,h+w-q,"C",a+c,h+w,a+c,h+w,a+c-q,h+w,"L",a+q,h+w,"C",a,h+w,a,h+w,a,h+w-q,"L",a,h+q,"C",a,h,a,h,a+q,h];e&&e>c?p>h+b&&p<h+w-b?d.splice(13,3,"L",a+c,p-6,a+c+6,p,a+c,p+6,a+c,h+w-q):d.splice(13,3,"L",a+c,w/2,e,p,a+c,w/2,a+c,h+w-q):e&&0>e?p>h+b&&p<h+w-b?d.splice(33,3,"L",a,p+6,a-6,p,a,p-6,
a,h+q):d.splice(33,3,"L",a,w/2,e,p,a,w/2,a,h+q):p&&p>w&&e>a+b&&e<a+c-b?d.splice(23,3,"L",e+6,h+w,e,h+w+6,e-6,h+w,a+q,h+w):p&&0>p&&e>a+b&&e<a+c-b&&d.splice(3,3,"L",e-6,h,e,h-6,e+6,h,c-q,h);return d}},clipRect:function(h,c,w,p){var q=a.uniqueKey(),b=this.createElement("clipPath").attr({id:q}).add(this.defs);h=this.rect(h,c,w,p,0).add(b);h.id=q;h.clipPath=b;h.count=0;return h},text:function(a,h,c,w){var p=!H&&this.forExport,q={};if(w&&(this.allowHTML||!this.forExport))return this.html(a,h,c);q.x=Math.round(h||
0);c&&(q.y=Math.round(c));if(a||0===a)q.text=a;a=this.createElement("text").attr(q);p&&a.css({position:"absolute"});w||(a.xSetter=function(a,h,c){var w=c.getElementsByTagName("tspan"),p,q=c.getAttribute(h),b;for(b=0;b<w.length;b++)p=w[b],p.getAttribute(h)===q&&p.setAttribute(h,a);c.setAttribute(h,a)});return a},fontMetrics:function(a,c){a=a||c&&c.style&&c.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?h(a):/em/.test(a)?parseFloat(a)*(c?this.fontMetrics(null,c.parentNode).f:16):12;
c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,h,c){var w=a;h&&c&&(w=Math.max(w*Math.cos(h*g),4));return{x:-a/3*Math.sin(h*g),y:w}},label:function(h,c,q,d,n,g,k,z,G){var x=this,H=x.g("button"!==G&&"label"),v=H.text=x.text("",0,0,k).attr({zIndex:1}),f,y,I=0,B=3,D=0,r,l,P,m,J,O={},L,u,N=/^url\((.*?)\)$/.test(d),K=N,U,T,Q,R;G&&H.addClass("highcharts-"+G);K=N;U=function(){return(L||0)%2/2};T=function(){var a=v.element.style,h={};y=(void 0===r||void 0===l||J)&&t(v.textStr)&&
v.getBBox();H.width=(r||y.width||0)+2*B+D;H.height=(l||y.height||0)+2*B;u=B+x.fontMetrics(a&&a.fontSize,v).b;K&&(f||(H.box=f=x.symbols[d]||N?x.symbol(d):x.rect(),f.addClass(("button"===G?"":"highcharts-label-box")+(G?" highcharts-"+G+"-box":"")),f.add(H),a=U(),h.x=a,h.y=(z?-u:0)+a),h.width=Math.round(H.width),h.height=Math.round(H.height),f.attr(e(h,O)),O={})};Q=function(){var a=D+B,h;h=z?0:u;t(r)&&y&&("center"===J||"right"===J)&&(a+={center:.5,right:1}[J]*(r-y.width));if(a!==v.x||h!==v.y)v.attr("x",
a),void 0!==h&&v.attr("y",h);v.x=a;v.y=h};R=function(a,h){f?f.attr(a,h):O[a]=h};H.onAdd=function(){v.add(H);H.attr({text:h||0===h?h:"",x:c,y:q});f&&t(n)&&H.attr({anchorX:n,anchorY:g})};H.widthSetter=function(h){r=a.isNumber(h)?h:null};H.heightSetter=function(a){l=a};H["text-alignSetter"]=function(a){J=a};H.paddingSetter=function(a){t(a)&&a!==B&&(B=H.padding=a,Q())};H.paddingLeftSetter=function(a){t(a)&&a!==D&&(D=a,Q())};H.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==I&&(I=a,y&&H.attr({x:P}))};
H.textSetter=function(a){void 0!==a&&v.textSetter(a);T();Q()};H["stroke-widthSetter"]=function(a,h){a&&(K=!0);L=this["stroke-width"]=a;R(h,a)};H.strokeSetter=H.fillSetter=H.rSetter=function(a,h){"r"!==h&&("fill"===h&&a&&(K=!0),H[h]=a);R(h,a)};H.anchorXSetter=function(a,h){n=H.anchorX=a;R(h,Math.round(a)-U()-P)};H.anchorYSetter=function(a,h){g=H.anchorY=a;R(h,a-m)};H.xSetter=function(a){H.x=a;I&&(a-=I*((r||y.width)+2*B));P=Math.round(a);H.attr("translateX",P)};H.ySetter=function(a){m=H.y=Math.round(a);
H.attr("translateY",m)};var V=H.css;return e(H,{css:function(a){if(a){var h={};a=p(a);b(H.textProps,function(c){void 0!==a[c]&&(h[c]=a[c],delete a[c])});v.css(h)}return V.call(H,a)},getBBox:function(){return{width:y.width+2*B,height:y.height+2*B,x:y.x-B,y:y.y-B}},shadow:function(a){a&&(T(),f&&f.shadow(a));return H},destroy:function(){w(H.element,"mouseenter");w(H.element,"mouseleave");v&&(v=v.destroy());f&&(f=f.destroy());C.prototype.destroy.call(H);H=x=T=Q=R=null}})}});a.Renderer=A})(M);(function(a){var C=
a.attr,A=a.createElement,F=a.css,E=a.defined,m=a.each,f=a.extend,l=a.isFirefox,r=a.isMS,u=a.isWebKit,t=a.pInt,g=a.SVGRenderer,d=a.win,k=a.wrap;f(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);F(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position=
"absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,e=this.element,d=this.translateX||0,g=this.translateY||0,n=this.x||0,k=this.y||0,f=this.textAlign||"left",c={left:0,center:.5,right:1}[f],G=this.styles;F(e,{marginLeft:d,marginTop:g});this.shadows&&m(this.shadows,function(a){F(a,{marginLeft:d+1,marginTop:g+1})});this.inverted&&m(e.childNodes,function(c){a.invertChild(c,e)});if("SPAN"===e.tagName){var q=
this.rotation,B=t(this.textWidth),r=G&&G.whiteSpace,p=[q,f,e.innerHTML,this.textWidth,this.textAlign].join();p!==this.cTT&&(G=a.fontMetrics(e.style.fontSize).b,E(q)&&this.setSpanRotation(q,c,G),F(e,{width:"",whiteSpace:r||"nowrap"}),e.offsetWidth>B&&/[ \-]/.test(e.textContent||e.innerText)&&F(e,{width:B+"px",display:"block",whiteSpace:r||"normal"}),this.getSpanCorrection(e.offsetWidth,G,c,q,f));F(e,{left:n+(this.xCorr||0)+"px",top:k+(this.yCorr||0)+"px"});u&&(G=e.offsetHeight);this.cTT=p}}else this.alignOnAdd=
!0},setSpanRotation:function(a,e,g){var b={},n=r?"-ms-transform":u?"-webkit-transform":l?"MozTransform":d.opera?"-o-transform":"";b[n]=b.transform="rotate("+a+"deg)";b[n+(l?"Origin":"-origin")]=b.transformOrigin=100*e+"% "+g+"px";F(this.element,b)},getSpanCorrection:function(a,e,d){this.xCorr=-a*d;this.yCorr=-e}});f(g.prototype,{html:function(a,e,d){var b=this.createElement("span"),n=b.element,g=b.renderer,v=g.isSVG,c=function(a,c){m(["opacity","visibility"],function(q){k(a,q+"Setter",function(a,
p,q,b){a.call(this,p,q,b);c[q]=p})})};b.textSetter=function(a){a!==n.innerHTML&&delete this.bBox;n.innerHTML=this.textStr=a;b.htmlUpdateTransform()};v&&c(b,b.element.style);b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,c){"align"===c&&(c="textAlign");b[c]=a;b.htmlUpdateTransform()};b.attr({text:a,x:Math.round(e),y:Math.round(d)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});n.style.whiteSpace="nowrap";b.css=b.htmlCss;v&&(b.add=function(a){var q,
e=g.box.parentNode,d=[];if(this.parentGroup=a){if(q=a.div,!q){for(;a;)d.push(a),a=a.parentGroup;m(d.reverse(),function(a){var p,n=C(a.element,"class");n&&(n={className:n});q=a.div=a.div||A("div",n,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},q||e);p=q.style;f(a,{classSetter:function(a){this.element.setAttribute("class",a);q.className=a},on:function(){d[0].div&&b.on.apply({element:d[0].div},
arguments);return a},translateXSetter:function(c,h){p.left=c+"px";a[h]=c;a.doTransform=!0},translateYSetter:function(c,h){p.top=c+"px";a[h]=c;a.doTransform=!0}});c(a,p)})}}else q=e;q.appendChild(n);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}})})(M);(function(a){var C,A,F=a.createElement,E=a.css,m=a.defined,f=a.deg2rad,l=a.discardElement,r=a.doc,u=a.each,t=a.erase,g=a.extend;C=a.extendClass;var d=a.isArray,k=a.isNumber,b=a.isObject,e=a.merge;A=a.noop;var v=a.pick,y=a.pInt,
n=a.SVGElement,D=a.SVGRenderer,J=a.win;a.svg||(A={docMode8:r&&8===r.documentMode,init:function(a,b){var c=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],e=["position: ","absolute",";"],d="div"===b;("shape"===b||d)&&e.push("left:0;top:0;width:1px;height:1px;");e.push("visibility: ",d?"hidden":"visible");c.push(' style\x3d"',e.join(""),'"/\x3e');b&&(c=d||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=F(c));this.renderer=a},add:function(a){var c=this.renderer,b=this.element,e=c.box,d=a&&a.inverted,
e=a?a.element||a:e;a&&(this.parentGroup=a);d&&c.invertChild(b,e);e.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:n.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*f),q=Math.sin(a*f);E(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",b,", M12\x3d",-q,", M21\x3d",q,", M22\x3d",
b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,q,e,d){var c=e?Math.cos(e*f):1,n=e?Math.sin(e*f):0,g=v(this.elemHeight,this.element.offsetHeight),k;this.xCorr=0>c&&-a;this.yCorr=0>n&&-g;k=0>c*n;this.xCorr+=n*b*(k?1-q:q);this.yCorr-=c*b*(e?k?q:1-q:1);d&&"left"!==d&&(this.xCorr-=a*q*(0>c?-1:1),e&&(this.yCorr-=g*q*(0>n?-1:1)),E(this.element,{textAlign:d}))},pathToVML:function(a){for(var c=a.length,b=[];c--;)k(a[c])?b[c]=Math.round(10*a[c])-5:"Z"===a[c]?b[c]="x":
(b[c]=a[c],!a.isArc||"wa"!==a[c]&&"at"!==a[c]||(b[c+5]===b[c+7]&&(b[c+7]+=a[c+7]>a[c+5]?1:-1),b[c+6]===b[c+8]&&(b[c+8]+=a[c+8]>a[c+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var c=this,b;a?(b=a.members,t(b,c),b.push(c),c.destroyClip=function(){t(b,c)},a=a.getCSS(c)):(c.destroyClip&&c.destroyClip(),a={clip:c.docMode8?"inherit":"rect(auto)"});return c.css(a)},css:n.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&l(a)},destroy:function(){this.destroyClip&&this.destroyClip();return n.prototype.destroy.apply(this)},
on:function(a,b){this.element["on"+a]=function(){var a=J.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c;a=a.split(/[ ,]/);c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=y(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,e){var c=[],q,p=this.element,d=this.renderer,n,g=p.style,h,w=p.path,k,H,f,D;w&&"string"!==typeof w.value&&(w="x");H=w;if(a){f=v(a.width,3);D=(a.opacity||.15)/f;for(q=1;3>=q;q++)k=2*f+1-2*q,e&&(H=this.cutOffPath(w.value,k+.5)),h=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',
k,'" filled\x3d"false" path\x3d"',H,'" coordsize\x3d"10 10" style\x3d"',p.style.cssText,'" /\x3e'],n=F(d.prepVML(h),null,{left:y(g.left)+v(a.offsetX,1),top:y(g.top)+v(a.offsetY,1)}),e&&(n.cutOff=k+1),h=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',D*q,'"/\x3e'],F(d.prepVML(h),null,null,n),b?b.element.appendChild(n):p.parentNode.insertBefore(n,p),c.push(n);this.shadows=c}return this},updateShadows:A,setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},
classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,e){(e.getElementsByTagName("stroke")[0]||F(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,e))[b]=a||"solid";this[b]=a},dSetter:function(a,b,e){var c=this.shadows;a=a||[];this.d=a.join&&a.join(" ");e.path=a=this.pathToVML(a);if(c)for(e=c.length;e--;)c[e].path=c[e].cutOff?this.cutOffPath(a,c[e].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,e){var c=e.nodeName;"SPAN"===c?e.style.color=a:"IMG"!==
c&&(e.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,e,b,this)))},"fill-opacitySetter":function(a,b,e){F(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,e)},opacitySetter:A,rotationSetter:function(a,b,e){e=e.style;this[b]=e[b]=a;e.left=-Math.round(Math.sin(a*f)+1)+"px";e.top=Math.round(Math.cos(a*f))+"px"},strokeSetter:function(a,b,e){this.setAttr("strokecolor",this.renderer.color(a,e,b,this))},"stroke-widthSetter":function(a,b,e){e.stroked=!!a;
this[b]=a;k(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,e){"inherit"===a&&(a="visible");this.shadows&&u(this.shadows,function(c){c.style[b]=a});"DIV"===e.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(e.style[b]=a?"visible":"hidden"),b="top");e.style[b]=a},xSetter:function(a,b,e){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):e.style[b]=a},zIndexSetter:function(a,
b,e){e.style[b]=a}},A["stroke-opacitySetter"]=A["fill-opacitySetter"],a.VMLElement=A=C(n,A),A.prototype.ySetter=A.prototype.widthSetter=A.prototype.heightSetter=A.prototype.xSetter,A={Element:A,isIE8:-1<J.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,e){var c,d;this.alignedObjects=[];c=this.createElement("div").css({position:"relative"});d=c.element;a.appendChild(c.element);this.isVML=!0;this.box=d;this.boxWrapper=c;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,
e,!1);if(!r.namespaces.hcv){r.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{r.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(p){r.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,e,d,n){var c=this.createElement(),p=b(a);return g(c,{members:[],
count:0,left:(p?a.x:a)+1,top:(p?a.y:e)+1,width:(p?a.width:d)-1,height:(p?a.height:n)-1,getCSS:function(a){var c=a.element,b=c.nodeName,h=a.inverted,w=this.top-("shape"===b?c.offsetTop:0),p=this.left,c=p+this.width,e=w+this.height,w={clip:"rect("+Math.round(h?p:w)+"px,"+Math.round(h?e:c)+"px,"+Math.round(h?c:e)+"px,"+Math.round(h?w:p)+"px)"};!h&&a.docMode8&&"DIV"===b&&g(w,{width:c+"px",height:e+"px"});return w},updateClipping:function(){u(c.members,function(a){a.element&&a.css(c.getCSS(a))})}})},color:function(c,
b,e,d){var q=this,p,n=/^rgba/,g,k,h="none";c&&c.linearGradient?k="gradient":c&&c.radialGradient&&(k="pattern");if(k){var w,v,H=c.linearGradient||c.radialGradient,f,D,y,x,r,B="";c=c.stops;var l,G=[],m=function(){g=['\x3cfill colors\x3d"'+G.join(",")+'" opacity\x3d"',y,'" o:opacity2\x3d"',D,'" type\x3d"',k,'" ',B,'focus\x3d"100%" method\x3d"any" /\x3e'];F(q.prepVML(g),null,null,b)};f=c[0];l=c[c.length-1];0<f[0]&&c.unshift([0,f[1]]);1>l[0]&&c.push([1,l[1]]);u(c,function(h,c){n.test(h[1])?(p=a.color(h[1]),
w=p.get("rgb"),v=p.get("a")):(w=h[1],v=1);G.push(100*h[0]+"% "+w);c?(y=v,x=w):(D=v,r=w)});if("fill"===e)if("gradient"===k)e=H.x1||H[0]||0,c=H.y1||H[1]||0,f=H.x2||H[2]||0,H=H.y2||H[3]||0,B='angle\x3d"'+(90-180*Math.atan((H-c)/(f-e))/Math.PI)+'"',m();else{var h=H.r,t=2*h,J=2*h,A=H.cx,C=H.cy,E=b.radialReference,M,h=function(){E&&(M=d.getBBox(),A+=(E[0]-M.x)/M.width-.5,C+=(E[1]-M.y)/M.height-.5,t*=E[2]/M.width,J*=E[2]/M.height);B='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+t+","+
J+'" origin\x3d"0.5,0.5" position\x3d"'+A+","+C+'" color2\x3d"'+r+'" ';m()};d.added?h():d.onAdd=h;h=x}else h=w}else n.test(c)&&"IMG"!==b.tagName?(p=a.color(c),d[e+"-opacitySetter"](p.get("a"),e,b),h=p.get("rgb")):(h=b.getElementsByTagName(e),h.length&&(h[0].opacity=1,h[0].type="solid"),h=c);return h},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):
a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:D.prototype.html,path:function(a){var c={coordsize:"10 10"};d(a)?c.d=a:b(a)&&g(c,a);return this.createElement("shape").attr(c)},circle:function(a,e,d){var c=this.symbol("circle");b(a)&&(d=a.r,e=a.y,a=a.x);c.isCircle=!0;c.r=d;return c.attr({x:a,y:e})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},
image:function(a,b,e,d,n){var c=this.createElement("img").attr({src:a});1<arguments.length&&c.attr({x:b,y:e,width:d,height:n});return c},createElement:function(a){return"rect"===a?this.symbol(a):D.prototype.createElement.call(this,a)},invertChild:function(a,b){var c=this;b=b.style;var e="IMG"===a.tagName&&a.style;E(a,{flip:"x",left:y(b.width)-(e?y(e.top):1),top:y(b.height)-(e?y(e.left):1),rotation:-90});u(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,e,d,n){var c=n.start,
q=n.end,g=n.r||e||d;e=n.innerR;d=Math.cos(c);var k=Math.sin(c),h=Math.cos(q),w=Math.sin(q);if(0===q-c)return["x"];c=["wa",a-g,b-g,a+g,b+g,a+g*d,b+g*k,a+g*h,b+g*w];n.open&&!e&&c.push("e","M",a,b);c.push("at",a-e,b-e,a+e,b+e,a+e*h,b+e*w,a+e*d,b+e*k,"x","e");c.isArc=!0;return c},circle:function(a,b,e,d,n){n&&m(n.r)&&(e=d=2*n.r);n&&n.isCircle&&(a-=e/2,b-=d/2);return["wa",a,b,a+e,b+d,a+e,b+d/2,a+e,b+d/2,"e"]},rect:function(a,b,e,d,n){return D.prototype.symbols[m(n)&&n.r?"callout":"square"].call(0,a,b,
e,d,n)}}},a.VMLRenderer=C=function(){this.init.apply(this,arguments)},C.prototype=e(D.prototype,A),a.Renderer=C);D.prototype.measureSpanWidth=function(a,b){var c=r.createElement("span");a=r.createTextNode(a);c.appendChild(a);E(c,b);this.box.appendChild(c);b=c.offsetWidth;l(c);return b}})(M);(function(a){function C(){var f=a.defaultOptions.global,l=r.moment;if(f.timezone){if(l)return function(a){return-l.tz(a,f.timezone).utcOffset()};a.error(25)}return f.useUTC&&f.getTimezoneOffset}function A(){var f=
a.defaultOptions.global,t,g=f.useUTC,d=g?"getUTC":"get",k=g?"setUTC":"set";a.Date=t=f.Date||r.Date;t.hcTimezoneOffset=g&&f.timezoneOffset;t.hcGetTimezoneOffset=C();t.hcMakeTime=function(a,e,d,k,n,f){var b;g?(b=t.UTC.apply(0,arguments),b+=m(b)):b=(new t(a,e,l(d,1),l(k,0),l(n,0),l(f,0))).getTime();return b};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){t["hcGet"+a]=d+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){t["hcSet"+a]=k+a})}var F=a.color,
E=a.each,m=a.getTZOffset,f=a.merge,l=a.pick,r=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",
align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},
shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:F("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",
whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(r){a.defaultOptions=f(!0,a.defaultOptions,r);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(M);(function(a){var C=a.correctFloat,A=a.defined,F=a.destroyObjectProperties,E=a.isNumber,
m=a.merge,f=a.pick,l=a.deg2rad;a.Tick=function(a,f,l,g){this.axis=a;this.pos=f;this.type=l||"";this.isNewLabel=this.isNew=!0;l||g||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,l=a.options,t=a.chart,g=a.categories,d=a.names,k=this.pos,b=l.labels,e=a.tickPositions,v=k===e[0],y=k===e[e.length-1],d=g?f(g[k],d[k],k):k,g=this.label,e=e.info,n;a.isDatetimeAxis&&e&&(n=l.dateTimeLabelFormats[e.higherRanks[k]||e.unitName]);this.isFirst=v;this.isLast=y;l=a.labelFormatter.call({axis:a,
chart:t,isFirst:v,isLast:y,dateTimeLabelFormat:n,value:a.isLog?C(a.lin2log(d)):d,pos:k});A(g)?g&&g.attr({text:l}):(this.labelLength=(this.label=g=A(l)&&b.enabled?t.renderer.text(l,0,0,b.useHTML).css(m(b.style)).add(a.labelGroup):null)&&g.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var r=this.axis,m=a.x,g=r.chart.chartWidth,d=r.chart.spacing,k=f(r.labelLeft,Math.min(r.pos,d[3])),d=f(r.labelRight,
Math.max(r.pos+r.len,g-d[1])),b=this.label,e=this.rotation,v={left:0,center:.5,right:1}[r.labelAlign],y=b.getBBox().width,n=r.getSlotWidth(),D=n,J=1,c,G={};if(e)0>e&&m-v*y<k?c=Math.round(m/Math.cos(e*l)-k):0<e&&m+v*y>d&&(c=Math.round((g-m)/Math.cos(e*l)));else if(g=m+(1-v)*y,m-v*y<k?D=a.x+D*(1-v)-k:g>d&&(D=d-a.x+D*v,J=-1),D=Math.min(n,D),D<n&&"center"===r.labelAlign&&(a.x+=J*(n-D-v*(n-Math.min(y,D)))),y>D||r.autoRotation&&(b.styles||{}).width)c=D;c&&(G.width=c,(r.options.labels.style||{}).textOverflow||
(G.textOverflow="ellipsis"),b.css(G))},getPosition:function(a,f,l,g){var d=this.axis,k=d.chart,b=g&&k.oldChartHeight||k.chartHeight;return{x:a?d.translate(f+l,null,null,g)+d.transB:d.left+d.offset+(d.opposite?(g&&k.oldChartWidth||k.chartWidth)-d.right-d.left:0),y:a?b-d.bottom+d.offset-(d.opposite?d.height:0):b-d.translate(f+l,null,null,g)-d.transB}},getLabelPosition:function(a,f,m,g,d,k,b,e){var v=this.axis,y=v.transA,n=v.reversed,D=v.staggerLines,r=v.tickRotCorr||{x:0,y:0},c=d.y;A(c)||(c=0===v.side?
m.rotation?-8:-m.getBBox().height:2===v.side?r.y+8:Math.cos(m.rotation*l)*(r.y-m.getBBox(!1,0).height/2));a=a+d.x+r.x-(k&&g?k*y*(n?-1:1):0);f=f+c-(k&&!g?k*y*(n?1:-1):0);D&&(m=b/(e||1)%D,v.opposite&&(m=D-m-1),f+=v.labelOffset/D*m);return{x:a,y:Math.round(f)}},getMarkPath:function(a,f,l,g,d,k){return k.crispLine(["M",a,f,"L",a+(d?0:-l),f+(d?l:0)],g)},renderGridLine:function(a,f,l){var g=this.axis,d=g.options,k=this.gridLine,b={},e=this.pos,v=this.type,y=g.tickmarkOffset,n=g.chart.renderer,D=v?v+"Grid":
"grid",r=d[D+"LineWidth"],c=d[D+"LineColor"],d=d[D+"LineDashStyle"];k||(b.stroke=c,b["stroke-width"]=r,d&&(b.dashstyle=d),v||(b.zIndex=1),a&&(b.opacity=0),this.gridLine=k=n.path().attr(b).addClass("highcharts-"+(v?v+"-":"")+"grid-line").add(g.gridGroup));if(!a&&k&&(a=g.getPlotLinePath(e+y,k.strokeWidth()*l,a,!0)))k[this.isNew?"attr":"animate"]({d:a,opacity:f})},renderMark:function(a,l,m){var g=this.axis,d=g.options,k=g.chart.renderer,b=this.type,e=b?b+"Tick":"tick",v=g.tickSize(e),y=this.mark,n=!y,
D=a.x;a=a.y;var r=f(d[e+"Width"],!b&&g.isXAxis?1:0),d=d[e+"Color"];v&&(g.opposite&&(v[0]=-v[0]),n&&(this.mark=y=k.path().addClass("highcharts-"+(b?b+"-":"")+"tick").add(g.axisGroup),y.attr({stroke:d,"stroke-width":r})),y[n?"attr":"animate"]({d:this.getMarkPath(D,a,v[0],y.strokeWidth()*m,g.horiz,k),opacity:l}))},renderLabel:function(a,l,m,g){var d=this.axis,k=d.horiz,b=d.options,e=this.label,v=b.labels,y=v.step,n=d.tickmarkOffset,D=!0,r=a.x;a=a.y;e&&E(r)&&(e.xy=a=this.getLabelPosition(r,a,e,k,v,n,
g,y),this.isFirst&&!this.isLast&&!f(b.showFirstLabel,1)||this.isLast&&!this.isFirst&&!f(b.showLastLabel,1)?D=!1:!k||d.isRadial||v.step||v.rotation||l||0===m||this.handleOverflow(a),y&&g%y&&(D=!1),D&&E(a.y)?(a.opacity=m,e[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(e.attr("y",-9999),this.isNewLabel=!0),this.isNew=!1)},render:function(a,l,m){var g=this.axis,d=g.horiz,k=this.getPosition(d,this.pos,g.tickmarkOffset,l),b=k.x,e=k.y,g=d&&b===g.pos+g.len||!d&&e===g.pos?-1:1;m=f(m,1);this.isActive=
!0;this.renderGridLine(l,m,g);this.renderMark(k,m,g);this.renderLabel(k,l,m,a)},destroy:function(){F(this,this.axis)}}})(M);var S=function(a){var C=a.addEvent,A=a.animObject,F=a.arrayMax,E=a.arrayMin,m=a.color,f=a.correctFloat,l=a.defaultOptions,r=a.defined,u=a.deg2rad,t=a.destroyObjectProperties,g=a.each,d=a.extend,k=a.fireEvent,b=a.format,e=a.getMagnitude,v=a.grep,y=a.inArray,n=a.isArray,D=a.isNumber,J=a.isString,c=a.merge,G=a.normalizeTickInterval,q=a.objectEach,B=a.pick,K=a.removeEvent,p=a.splat,
z=a.syncTimeout,I=a.Tick,L=function(){this.init.apply(this,arguments)};a.extend(L.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,
tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},
style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var h=c.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!h:h;b.isXAxis=h;b.coll=b.coll||(h?
"xAxis":"yAxis");b.opposite=c.opposite;b.side=c.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(c);var w=this.options,e=w.type;b.labelFormatter=w.labels.formatter||b.defaultLabelFormatter;b.userOptions=c;b.minPixelPadding=0;b.reversed=w.reversed;b.visible=!1!==w.visible;b.zoomEnabled=!1!==w.zoomEnabled;b.hasNames="category"===e||!0===w.categories;b.categories=w.categories||b.hasNames;b.names=b.names||[];b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===e;b.isDatetimeAxis="datetime"===
e;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;b.isLinked=r(w.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=w.minRange||w.maxZoom;b.range=w.range;b.offset=w.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=B(w.crosshair,p(a.options.tooltip.crosshairs)[h?0:1],!1);c=b.options.events;-1===y(b,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=
b.series||[];a.inverted&&!b.isZAxis&&h&&void 0===b.reversed&&(b.reversed=!0);q(c,function(a,h){C(b,h,a)});b.lin2log=w.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log)},setOptions:function(a){this.options=c(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],c(l[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,
c=this.value,e=h.categories,p=this.dateTimeLabelFormat,d=l.lang,n=d.numericSymbols,d=d.numericSymbolMagnitude||1E3,q=n&&n.length,x,g=h.options.labels.format,h=h.isLog?Math.abs(c):h.tickInterval;if(g)x=b(g,this);else if(e)x=c;else if(p)x=a.dateFormat(p,c);else if(q&&1E3<=h)for(;q--&&void 0===x;)e=Math.pow(d,q+1),h>=e&&0===10*c%e&&null!==n[q]&&0!==c&&(x=a.numberFormat(c/e,-1)+n[q]);void 0===x&&(x=1E4<=Math.abs(c)?a.numberFormat(c,-1):a.numberFormat(c,-1,void 0,""));return x},getSeriesExtremes:function(){var a=
this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();g(a.series,function(h){if(h.visible||!b.options.chart.ignoreHiddenSeries){var c=h.options,w=c.threshold,e;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=w&&(w=null);if(a.isXAxis)c=h.xData,c.length&&(h=E(c),D(h)||h instanceof Date||(c=v(c,function(a){return D(a)}),h=E(c)),a.dataMin=Math.min(B(a.dataMin,c[0]),h),a.dataMax=Math.max(B(a.dataMax,c[0]),F(c)));else if(h.getExtremes(),
e=h.dataMax,h=h.dataMin,r(h)&&r(e)&&(a.dataMin=Math.min(B(a.dataMin,h),h),a.dataMax=Math.max(B(a.dataMax,e),e)),r(w)&&(a.threshold=w),!c.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,c,e,p,d){var h=this.linkedParent||this,w=1,n=0,q=e?h.oldTransA:h.transA;e=e?h.oldMin:h.min;var g=h.minPixelPadding;p=(h.isOrdinal||h.isBroken||h.isLog&&p)&&h.lin2val;q||(q=h.transA);c&&(w*=-1,n=h.len);h.reversed&&(w*=-1,n-=w*(h.sector||h.len));b?(a=(a*w+n-g)/q+e,p&&(a=h.lin2val(a))):
(p&&(a=h.val2lin(a)),a=w*(a-e)*q+n+w*g+(D(d)?q*d:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,e,p){var h=this.chart,w=this.left,d=this.top,n,q,g=c&&h.oldChartHeight||h.chartHeight,k=c&&h.oldChartWidth||h.chartWidth,f;n=this.transB;var v=function(a,h,b){if(a<h||a>b)e?a=Math.min(Math.max(h,a),b):f=!0;return a};p=B(p,this.translate(a,
null,null,c));a=c=Math.round(p+n);n=q=Math.round(g-p-n);D(p)?this.horiz?(n=d,q=g-this.bottom,a=c=v(a,w,w+this.width)):(a=w,c=k-this.right,n=q=v(n,d,d+this.height)):f=!0;return f&&!e?null:h.renderer.crispLine(["M",a,n,"L",c,q],b||1)},getLinearTickPositions:function(a,b,c){var h,w=f(Math.floor(b/a)*a);c=f(Math.ceil(c/a)*a);var e=[];if(this.single)return[b];for(b=w;b<=c;){e.push(b);b=f(b+a);if(b===h)break;h=b}return e},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,e=a.minorTickInterval,
p=[],d=a.pointRangePadding||0,n=a.min-d,d=a.max+d,q=d-n;if(q&&q/e<a.len/3)if(a.isLog)g(this.paddedTicks,function(h,b,c){b&&p.push.apply(p,a.getLogTickPositions(e,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)p=p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),n,d,b.startOfWeek));else for(b=n+(c[0]-n)%e;b<=d&&b!==p[0];b+=e)p.push(b);0!==p.length&&a.trimTicks(p);return p},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,e,p,d,n,q,k,f,v;this.isXAxis&&
void 0===this.minRange&&!this.isLog&&(r(a.min)||r(a.max)?this.minRange=null:(g(this.series,function(a){k=a.xData;for(n=f=a.xIncrement?1:k.length-1;0<n;n--)if(q=k[n]-k[n-1],void 0===d||q<d)d=q}),this.minRange=Math.min(5*d,this.dataMax-this.dataMin)));c-b<this.minRange&&(p=this.dataMax-this.dataMin>=this.minRange,v=this.minRange,e=(v-c+b)/2,e=[b-e,B(a.min,b-e)],p&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=F(e),c=[b+v,B(a.max,b+v)],p&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),
c=E(c),c-b<v&&(e[0]=c-v,e[1]=B(a.min,c-v),b=F(e)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:g(this.series,function(h){var b=h.closestPointRange,c=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&r(b)&&c&&(a=r(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=n(this.categories),b=h?this.categories:this.names,c=a.options.x,e;a.series.requireSorting=!1;r(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():y(a.name,b));-1===c?h||
(e=b.length):e=c;void 0!==e&&(this.names[e]=a.name);return e},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,g(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();g(h.points,function(b,c){var e;b.options&&(e=a.nameToX(b),void 0!==e&&e!==b.x&&(b.x=e,h.xData[c]=e))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,c=h.axisPointRange||0,e,p=0,d=0,n=h.linkedParent,q=!!h.categories,
k=h.transA,f=h.isXAxis;if(f||q||c)e=h.getClosest(),n?(p=n.minPointOffset,d=n.pointRangePadding):g(h.series,function(a){var b=q?1:f?B(a.options.pointRange,e,0):h.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,b);h.single||(p=Math.max(p,J(a)?0:b/2),d=Math.max(d,"on"===a?0:b))}),n=h.ordinalSlope&&e?h.ordinalSlope/e:1,h.minPointOffset=p*=n,h.pointRangePadding=d*=n,h.pointRange=Math.min(c,b),f&&(h.closestPointRange=e);a&&(h.oldTransA=k);h.translationSlope=h.transA=k=h.options.staticScale||h.len/
(b+d||1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=k*p},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,c=b.chart,p=b.options,d=b.isLog,n=b.log2lin,q=b.isDatetimeAxis,x=b.isXAxis,v=b.isLinked,z=p.maxPadding,y=p.minPadding,l=p.tickInterval,I=p.tickPixelInterval,m=b.categories,J=b.threshold,t=b.softThreshold,L,u,K,A;q||m||v||this.getTickAmount();K=B(b.userMin,p.min);A=B(b.userMax,p.max);v?(b.linkedParent=c[b.coll][p.linkedTo],c=b.linkedParent.getExtremes(),
b.min=B(c.min,c.dataMin),b.max=B(c.max,c.dataMax),p.type!==b.linkedParent.options.type&&a.error(11,1)):(!t&&r(J)&&(b.dataMin>=J?(L=J,y=0):b.dataMax<=J&&(u=J,z=0)),b.min=B(K,L,b.dataMin),b.max=B(A,u,b.dataMax));d&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,B(b.dataMin,b.min))&&a.error(10,1),b.min=f(n(b.min),15),b.max=f(n(b.max),15));b.range&&r(b.max)&&(b.userMin=b.min=K=Math.max(b.dataMin,b.minFromRange()),b.userMax=A=b.max,b.range=null);k(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(m||b.axisPointRange||b.usePercentage||v)&&r(b.min)&&r(b.max)&&(n=b.max-b.min)&&(!r(K)&&y&&(b.min-=n*y),!r(A)&&z&&(b.max+=n*z));D(p.softMin)&&(b.min=Math.min(b.min,p.softMin));D(p.softMax)&&(b.max=Math.max(b.max,p.softMax));D(p.floor)&&(b.min=Math.max(b.min,p.floor));D(p.ceiling)&&(b.max=Math.min(b.max,p.ceiling));t&&r(b.dataMin)&&(J=J||0,!r(K)&&b.min<J&&b.dataMin>=J?b.min=J:!r(A)&&b.max>J&&b.dataMax<=J&&(b.max=J));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:v&&!l&&I===b.linkedParent.options.tickPixelInterval?
l=b.linkedParent.tickInterval:B(l,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,m?1:(b.max-b.min)*I/Math.max(b.len,I));x&&!h&&g(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!l&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=B(p.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);
!l&&b.tickInterval<h&&(b.tickInterval=h);q||d||l||(b.tickInterval=G(b.tickInterval,null,e(b.tickInterval),B(p.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,e=a.tickPositioner,p=a.startOnTick,d=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&r(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=b=e);this.paddedTicks=b.slice(0);this.trimTicks(b,p,d);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||e||this.adjustTickAmount())},trimTicks:function(a,b,c){var h=a[0],e=a[a.length-1],p=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-p>a[0];)a.shift();if(c)this.max=e;else for(;this.max+p<a[a.length-
1];)a.pop();0===a.length&&r(h)&&a.push((e+h)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||g(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!r(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=
2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,e=this.finalTickAmt,p=b&&b.length;if(p<c){for(;b.length<c;)b.push(f(b[b.length-1]+a));this.transA*=(p-1)/(c-1);this.max=b[b.length-1]}else p>c&&(this.tickInterval*=2,this.setTickPositions());if(r(e)){for(a=c=b.length;a--;)(3===e&&1===a%2||2>=e&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,
b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;g(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||
(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,e,p){var h=this,n=h.chart;c=B(c,!0);g(h.series,function(a){delete a.kdTree});p=d(p,{min:a,max:b});k(h,"setExtremes",p,function(){h.userMin=a;h.userMax=b;h.eventArgs=p;c&&n.redraw(e)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,e=this.options,p=Math.min(h,B(e.min,h)),e=Math.max(c,B(e.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(r(h)&&(a<p&&(a=
p),a>e&&(a=e)),r(c)&&(b<p&&(b=p),b>e&&(b=e))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,e=c.offsets||[0,0,0,0],p=this.horiz,d=this.width=Math.round(a.relativeLength(B(c.width,b.plotWidth-e[3]+e[1]),b.plotWidth)),n=this.height=Math.round(a.relativeLength(B(c.height,b.plotHeight-e[0]+e[2]),b.plotHeight)),q=this.top=Math.round(a.relativeLength(B(c.top,b.plotTop+e[0]),b.plotHeight,b.plotTop)),
c=this.left=Math.round(a.relativeLength(B(c.left,b.plotLeft+e[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-n-q;this.right=b.chartWidth-d-c;this.len=Math.max(p?d:n,0);this.pos=p?c:q},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?f(b(this.min)):this.min,max:a?f(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=this.lin2log,c=b?h(this.min):this.min,b=b?h(this.max):this.max;
null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(B(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=B(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,
this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,e=c,p=this.len/(((this.categories?1:0)+this.max-this.min)/c),d,n=a.rotation,q=this.labelMetrics(),k,f=Number.MAX_VALUE,v,z=function(a){a/=p||1;a=1<a?Math.ceil(a):1;return a*c};b?(v=!a.staggerLines&&!a.step&&(r(n)?[n]:p<B(a.autoRotationLimit,80)&&a.autoRotation))&&g(v,function(a){var b;if(a===n||a&&-90<=a&&90>=a)k=z(Math.abs(q.h/Math.sin(u*a))),b=k+Math.abs(a/360),b<f&&(f=b,d=a,e=k)}):
a.step||(e=z(q.h));this.autoRotation=v;this.labelRotation=B(d,n);return e},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?0:1),1),p=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/e||!b&&(p&&p-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,e=this.tickPositions,p=this.ticks,d=this.options.labels,n=this.horiz,q=this.getSlotWidth(),k=Math.max(1,
Math.round(q-2*(d.padding||5))),f={},v=this.labelMetrics(),z=d.style&&d.style.textOverflow,D,y=0,l,I;J(d.rotation)||(f.rotation=d.rotation||0);g(e,function(a){(a=p[a])&&a.labelLength>y&&(y=a.labelLength)});this.maxLabelLength=y;if(this.autoRotation)y>k&&y>v.h?f.rotation=this.labelRotation:this.labelRotation=0;else if(q&&(D={width:k+"px"},!z))for(D.textOverflow="clip",l=e.length;!n&&l--;)if(I=e[l],k=p[I].label)k.styles&&"ellipsis"===k.styles.textOverflow?k.css({textOverflow:"clip"}):p[I].labelLength>
q&&k.css({width:q+"px"}),k.getBBox().height>this.len/e.length-(v.h-v.f)&&(k.specCss={textOverflow:"ellipsis"});f.rotation&&(D={width:(y>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},z||(D.textOverflow="ellipsis"));if(this.labelAlign=d.align||this.autoLabelAlign(this.labelRotation))f.align=this.labelAlign;g(e,function(a){var b=(a=p[a])&&a.label;b&&(b.attr(f),D&&b.css(c(D,b.specCss)),delete b.specCss,a.rotation=f.rotation)});this.tickRotCorr=b.rotCorr(v.b,this.labelRotation||0,0!==this.side)},
hasData:function(){return this.hasVisibleSeries||r(this.min)&&r(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,h=this.opposite,e=this.options.title,p;this.axisTitle||((p=e.textAlign)||(p=(c?{low:"left",middle:"center",high:"right"}:{low:h?"right":"left",middle:"center",high:h?"left":"right"})[e.align]),this.axisTitle=b.text(e.text,0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation||0,align:p}).addClass("highcharts-axis-title").css(e.style).add(this.axisGroup),
this.axisTitle.isNew=!0);e.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new I(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,e=a.options,p=a.tickPositions,d=a.ticks,n=a.horiz,k=a.side,f=b.inverted&&!a.isZAxis?[1,0,3,2][k]:k,v,z,D=0,y,l=0,I=e.title,m=e.labels,G=0,J=b.axisOffset,b=b.clipOffset,t=[-1,1,1,-1][k],L=e.className,u=a.axisParent,K=this.tickSize("tick");
v=a.hasData();a.showAxis=z=v||B(e.showEmpty,!0);a.staggerLines=a.horiz&&m.staggerLines;a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(L||"")).add(u),a.axisGroup=c.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(L||"")).add(u),a.labelGroup=c.g("axis-labels").attr({zIndex:m.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(L||"")).add(u));v||a.isLinked?(g(p,function(b,
c){a.generateTick(b,c)}),a.renderUnsquish(),!1===m.reserveSpace||0!==k&&2!==k&&{1:"left",3:"right"}[k]!==a.labelAlign&&"center"!==a.labelAlign||g(p,function(a){G=Math.max(d[a].getLabelSize(),G)}),a.staggerLines&&(G*=a.staggerLines,a.labelOffset=G*(a.opposite?-1:1))):q(d,function(a,b){a.destroy();delete d[b]});I&&I.text&&!1!==I.enabled&&(a.addTitle(z),z&&!1!==I.reserveSpace&&(a.titleOffset=D=a.axisTitle.getBBox()[n?"height":"width"],y=I.offset,l=r(y)?0:B(I.margin,n?5:10)));a.renderLine();a.offset=
t*B(e.offset,J[k]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===k?-a.labelMetrics().h:2===k?a.tickRotCorr.y:0;l=Math.abs(G)+l;G&&(l=l-c+t*(n?B(m.y,a.tickRotCorr.y+8*t):m.x));a.axisTitleMargin=B(y,l);J[k]=Math.max(J[k],a.axisTitleMargin+D+t*a.offset,l,v&&p.length&&K?K[0]+t*a.offset:0);p=2*Math.floor(a.axisLine.strokeWidth()/2);0<e.offset&&(p-=2*e.offset);b[f]=Math.max(b[f]||p,p)},getLinePath:function(a){var b=this.chart,c=this.opposite,h=this.offset,e=this.horiz,p=this.left+(c?this.width:0)+h,h=b.chartHeight-
this.bottom-(c?this.height:0)+h;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:p,e?h:this.top,"L",e?b.chartWidth-this.right:p,e?h:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,e=this.len,p=this.options.title,
d=a?b:c,n=this.opposite,q=this.offset,k=p.x||0,g=p.y||0,f=this.axisTitle,v=this.chart.renderer.fontMetrics(p.style&&p.style.fontSize,f),f=Math.max(f.getBBox(null,0).height-v.h-1,0),e={low:d+(a?0:e),middle:d+e/2,high:d+(a?e:0)}[p.align],b=(a?c+this.height:b)+(a?1:-1)*(n?-1:1)*this.axisTitleMargin+[-f,f,v.f,-f][this.side];return{x:a?e+k:b+(n?this.width:0)+q+k,y:a?b+g-(n?this.height:0)+q:e+g}},renderMinorTick:function(a){var b=this.chart.hasRendered&&D(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new I(this,
a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,e=this.ticks,h=this.chart.hasRendered&&D(this.oldMin);if(!c||a>=this.min&&a<=this.max)e[a]||(e[a]=new I(this,a)),h&&e[a].isNew&&e[a].render(b,!0,.1),e[a].render(b)},render:function(){var b=this,c=b.chart,e=b.options,p=b.isLog,d=b.lin2log,n=b.isLinked,k=b.tickPositions,f=b.axisTitle,v=b.ticks,y=b.minorTicks,l=b.alternateBands,m=e.stackLabels,r=e.alternateGridColor,B=b.tickmarkOffset,
G=b.axisLine,J=b.showAxis,t=A(c.renderer.globalAnimation),L,u;b.labelEdge.length=0;b.overlap=!1;g([v,y,l],function(a){q(a,function(a){a.isActive=!1})});if(b.hasData()||n)b.minorTickInterval&&!b.categories&&g(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),k.length&&(g(k,function(a,c){b.renderTick(a,c)}),B&&(0===b.min||b.single)&&(v[-1]||(v[-1]=new I(b,-1,null,!0)),v[-1].render(-1))),r&&g(k,function(e,h){u=void 0!==k[h+1]?k[h+1]+B:b.max-B;0===h%2&&e<b.max&&u<=b.max+(c.polar?-B:B)&&(l[e]||
(l[e]=new a.PlotLineOrBand(b)),L=e+B,l[e].options={from:p?d(L):L,to:p?d(u):u,color:r},l[e].render(),l[e].isActive=!0)}),b._addedPlotLB||(g((e.plotLines||[]).concat(e.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);g([v,y,l],function(a){var b,e=[],h=t.duration;q(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,e.push(b))});z(function(){for(b=e.length;b--;)a[e[b]]&&!a[e[b]].isActive&&(a[e[b]].destroy(),delete a[e[b]])},a!==l&&c.hasRendered&&h?h:0)});G&&(G[G.isPlaced?
"animate":"attr"]({d:this.getLinePath(G.strokeWidth())}),G.isPlaced=!0,G[J?"show":"hide"](!0));f&&J&&(e=b.getTitlePosition(),D(e.y)?(f[f.isNew?"attr":"animate"](e),f.isNew=!1):(f.attr("y",-9999),f.isNew=!0));m&&m.enabled&&b.renderStackTotals();b.isDirty=!1},redraw:function(){this.visible&&(this.render(),g(this.plotLinesAndBands,function(a){a.render()}));g(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,c=b.stacks,
e=b.plotLinesAndBands,h;a||K(b);q(c,function(a,b){t(a);c[b]=null});g([b.ticks,b.minorTicks,b.alternateBands],function(a){t(a)});if(e)for(a=e.length;a--;)e[a].destroy();g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){b[a]&&(b[a]=b[a].destroy())});for(h in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[h]=b.plotLinesAndBandsGroups[h].destroy();q(b,function(a,c){-1===y(c,b.keepProps)&&delete b[c]})},drawCrosshair:function(a,b){var c,e=this.crosshair,
h=B(e.snap,!0),p,d=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(r(b)||!h)?(h?r(b)&&(p=this.isXAxis?b.plotX:this.len-b.plotY):p=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),r(p)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:B(b.stackY,b.y)),null,null,null,p)||null),r(c)?(b=this.categories&&!this.isRadial,d||(this.cross=d=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+e.className).attr({zIndex:B(e.zIndex,2)}).add(),
d.attr({stroke:e.color||(b?m("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":B(e.width,1)}),e.dashStyle&&d.attr({dashstyle:e.dashStyle})),d.show().attr({d:c}),b&&!e.width&&d.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=L}(M);(function(a){var C=a.Axis,A=a.Date,F=a.dateFormat,E=a.defaultOptions,m=a.defined,f=a.each,l=a.extend,r=a.getMagnitude,u=a.getTZOffset,t=a.normalizeTickInterval,
g=a.pick,d=a.timeUnits;C.prototype.getTimeTicks=function(a,b,e,v){var k=[],n={},D=E.global.useUTC,r,c=new A(b-Math.max(u(b),u(e))),G=A.hcMakeTime,q=a.unitRange,B=a.count,t,p;if(m(b)){c[A.hcSetMilliseconds](q>=d.second?0:B*Math.floor(c.getMilliseconds()/B));if(q>=d.second)c[A.hcSetSeconds](q>=d.minute?0:B*Math.floor(c.getSeconds()/B));if(q>=d.minute)c[A.hcSetMinutes](q>=d.hour?0:B*Math.floor(c[A.hcGetMinutes]()/B));if(q>=d.hour)c[A.hcSetHours](q>=d.day?0:B*Math.floor(c[A.hcGetHours]()/B));if(q>=d.day)c[A.hcSetDate](q>=
d.month?1:B*Math.floor(c[A.hcGetDate]()/B));q>=d.month&&(c[A.hcSetMonth](q>=d.year?0:B*Math.floor(c[A.hcGetMonth]()/B)),r=c[A.hcGetFullYear]());if(q>=d.year)c[A.hcSetFullYear](r-r%B);if(q===d.week)c[A.hcSetDate](c[A.hcGetDate]()-c[A.hcGetDay]()+g(v,1));r=c[A.hcGetFullYear]();v=c[A.hcGetMonth]();var z=c[A.hcGetDate](),I=c[A.hcGetHours]();if(A.hcTimezoneOffset||A.hcGetTimezoneOffset)p=(!D||!!A.hcGetTimezoneOffset)&&(e-b>4*d.month||u(b)!==u(e)),c=c.getTime(),t=u(c),c=new A(c+t);D=c.getTime();for(b=1;D<
e;)k.push(D),D=q===d.year?G(r+b*B,0):q===d.month?G(r,v+b*B):!p||q!==d.day&&q!==d.week?p&&q===d.hour?G(r,v,z,I+b*B,0,0,t)-t:D+q*B:G(r,v,z+b*B*(q===d.day?1:7)),b++;k.push(D);q<=d.hour&&1E4>k.length&&f(k,function(a){0===a%18E5&&"000000000"===F("%H%M%S%L",a)&&(n[a]="day")})}k.info=l(a,{higherRanks:n,totalRange:q*B});return k};C.prototype.normalizeTimeTickInterval=function(a,b){var e=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,
2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];b=e[e.length-1];var k=d[b[0]],g=b[1],n;for(n=0;n<e.length&&!(b=e[n],k=d[b[0]],g=b[1],e[n+1]&&a<=(k*g[g.length-1]+d[e[n+1][0]])/2);n++);k===d.year&&a<5*k&&(g=[1,2,5]);a=t(a/k,g,"year"===b[0]?Math.max(r(a/k),1):1);return{unitRange:k,count:a,unitName:b[0]}}})(M);(function(a){var C=a.Axis,A=a.getMagnitude,F=a.map,E=a.normalizeTickInterval,m=a.pick;C.prototype.getLogTickPositions=function(a,l,r,u){var f=this.options,g=this.len,
d=this.lin2log,k=this.log2lin,b=[];u||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),b=this.getLinearTickPositions(a,l,r);else if(.08<=a)for(var g=Math.floor(l),e,v,y,n,D,f=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];g<r+1&&!D;g++)for(v=f.length,e=0;e<v&&!D;e++)y=k(d(g)*f[e]),y>l&&(!u||n<=r)&&void 0!==n&&b.push(n),n>r&&(D=!0),n=y;else l=d(l),r=d(r),a=f[u?"minorTickInterval":"tickInterval"],a=m("auto"===a?null:a,this._minorAutoInterval,f.tickPixelInterval/(u?5:1)*(r-l)/((u?g/this.tickPositions.length:
g)||1)),a=E(a,null,A(a)),b=F(this.getLinearTickPositions(a,l,r),k),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return b};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(M);(function(a,C){var A=a.arrayMax,F=a.arrayMin,E=a.defined,m=a.destroyObjectProperties,f=a.each,l=a.erase,r=a.merge,u=a.pick;a.PlotLineOrBand=function(a,g){this.axis=a;g&&(this.options=g,this.id=g.id)};a.PlotLineOrBand.prototype={render:function(){var f=
this,g=f.axis,d=g.horiz,k=f.options,b=k.label,e=f.label,v=k.to,l=k.from,n=k.value,D=E(l)&&E(v),m=E(n),c=f.svgElem,G=!c,q=[],B=k.color,K=u(k.zIndex,0),p=k.events,q={"class":"highcharts-plot-"+(D?"band ":"line ")+(k.className||"")},z={},I=g.chart.renderer,L=D?"bands":"lines",h=g.log2lin;g.isLog&&(l=h(l),v=h(v),n=h(n));m?(q={stroke:B,"stroke-width":k.width},k.dashStyle&&(q.dashstyle=k.dashStyle)):D&&(B&&(q.fill=B),k.borderWidth&&(q.stroke=k.borderColor,q["stroke-width"]=k.borderWidth));z.zIndex=K;L+=
"-"+K;(B=g.plotLinesAndBandsGroups[L])||(g.plotLinesAndBandsGroups[L]=B=I.g("plot-"+L).attr(z).add());G&&(f.svgElem=c=I.path().attr(q).add(B));if(m)q=g.getPlotLinePath(n,c.strokeWidth());else if(D)q=g.getPlotBandPath(l,v,k);else return;G&&q&&q.length?(c.attr({d:q}),p&&a.objectEach(p,function(a,b){c.on(b,function(a){p[b].apply(f,[a])})})):c&&(q?(c.show(),c.animate({d:q})):(c.hide(),e&&(f.label=e=e.destroy())));b&&E(b.text)&&q&&q.length&&0<g.width&&0<g.height&&!q.flat?(b=r({align:d&&D&&"center",x:d?
!D&&4:10,verticalAlign:!d&&D&&"middle",y:d?D?16:10:D?6:-4,rotation:d&&!D&&90},b),this.renderLabel(b,q,D,K)):e&&e.hide();return f},renderLabel:function(a,g,d,k){var b=this.label,e=this.axis.chart.renderer;b||(b={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},b.zIndex=k,this.label=b=e.text(a.text,0,0,a.useHTML).attr(b).add(),b.css(a.style));k=[g[1],g[4],d?g[6]:g[1]];g=[g[2],g[5],d?g[7]:g[2]];d=F(k);e=F(g);b.align(a,!1,{x:d,y:e,
width:A(k)-d,height:A(g)-e});b.show()},destroy:function(){l(this.axis.plotLinesAndBands,this);delete this.axis;m(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,g){var d=this.getPlotLinePath(g,null,null,!0),k=this.getPlotLinePath(a,null,null,!0),b=this.horiz,e=1;a=a<this.min&&g<this.min||a>this.max&&g>this.max;k&&d?(a&&(k.flat=k.toString()===d.toString(),e=0),k.push(b&&d[4]===k[4]?d[4]+e:d[4],b||d[5]!==k[5]?d[5]:d[5]+e,b&&d[1]===k[1]?d[1]+e:d[1],b||d[2]!==k[2]?d[2]:d[2]+e)):k=null;return k},
addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(f,g){var d=(new a.PlotLineOrBand(this,f)).render(),k=this.userOptions;d&&(g&&(k[g]=k[g]||[],k[g].push(f)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var g=this.plotLinesAndBands,d=this.options,k=this.userOptions,b=g.length;b--;)g[b].id===a&&g[b].destroy();f([d.plotLines||[],k.plotLines||[],d.plotBands||
[],k.plotBands||[]],function(e){for(b=e.length;b--;)e[b].id===a&&l(e,e[b])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(M,S);(function(a){var C=a.dateFormat,A=a.each,F=a.extend,E=a.format,m=a.isNumber,f=a.map,l=a.merge,r=a.pick,u=a.splat,t=a.syncTimeout,g=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,k){this.chart=a;this.options=k;this.crosshairs=[];this.now={x:0,y:0};
this.isHidden=!0;this.split=k.split&&!a.inverted;this.shared=k.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(d){var b=d&&d.tt;b&&(!b.isActive||a?d.tt=b.destroy():b.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,k=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,k.shape||"callout",null,null,k.useHTML,null,"tooltip").attr({padding:k.padding,r:k.borderRadius}),this.label.attr({fill:k.backgroundColor,"stroke-width":k.borderWidth}).css(k.style).shadow(k.shadow)),
this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();l(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,l(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,k,b,e){var d=this,g=d.now,n=!1!==d.options.animation&&!d.isHidden&&(1<Math.abs(a-g.x)||1<Math.abs(k-
g.y)),f=d.followPointer||1<d.len;F(g,{x:n?(2*g.x+a)/3:a,y:n?(g.y+k)/2:k,anchorX:f?void 0:n?(2*g.anchorX+b)/3:b,anchorY:f?void 0:n?(g.anchorY+e)/2:e});d.getLabel().attr(g);n&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){d&&d.move(a,k,b,e)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);a=r(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=t(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,k){var b,e=this.chart,
d=e.inverted,g=e.plotTop,n=e.plotLeft,l=0,m=0,c,r;a=u(a);b=a[0].tooltipPos;this.followPointer&&k&&(void 0===k.chartX&&(k=e.pointer.normalize(k)),b=[k.chartX-e.plotLeft,k.chartY-g]);b||(A(a,function(a){c=a.series.yAxis;r=a.series.xAxis;l+=a.plotX+(!d&&r?r.left-n:0);m+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!d&&c?c.top-g:0)}),l/=a.length,m/=a.length,b=[d?e.plotWidth-m:l,this.shared&&!d&&1<a.length&&k?k.chartY-g:d?e.plotHeight-l:m]);return f(b,Math.round)},getPosition:function(a,g,b){var e=this.chart,
d=this.distance,k={},n=b.h||0,f,l=["y",e.chartHeight,g,b.plotY+e.plotTop,e.plotTop,e.plotTop+e.plotHeight],c=["x",e.chartWidth,a,b.plotX+e.plotLeft,e.plotLeft,e.plotLeft+e.plotWidth],m=!this.followPointer&&r(b.ttBelow,!e.inverted===!!b.negative),q=function(a,b,c,e,p,q){var h=c<e-d,g=e+d+c<b,f=e-d-c;e+=d;if(m&&g)k[a]=e;else if(!m&&h)k[a]=f;else if(h)k[a]=Math.min(q-c,0>f-n?f:f-n);else if(g)k[a]=Math.max(p,e+n+c>b?e:e+n);else return!1},B=function(a,b,c,e){var h;e<d||e>b-d?h=!1:k[a]=e<c/2?1:e>b-c/2?
b-c-2:e-c/2;return h},t=function(a){var b=l;l=c;c=b;f=a},p=function(){!1!==q.apply(0,l)?!1!==B.apply(0,c)||f||(t(!0),p()):f?k.x=k.y=0:(t(!0),p())};(e.inverted||1<this.len)&&t();p();return k},defaultFormatter:function(a){var d=this.points||u(this),b;b=[a.tooltipFooterHeaderFormatter(d[0])];b=b.concat(a.bodyFormatter(d));b.push(a.tooltipFooterHeaderFormatter(d[0],!0));return b},refresh:function(a,g){var b,e=this.options,d,k=a,n,f={},l=[];b=e.formatter||this.defaultFormatter;var f=this.shared,c;e.enabled&&
(clearTimeout(this.hideTimer),this.followPointer=u(k)[0].series.tooltipOptions.followPointer,n=this.getAnchor(k,g),g=n[0],d=n[1],!f||k.series&&k.series.noSharedTooltip?f=k.getLabelConfig():(A(k,function(a){a.setState("hover");l.push(a.getLabelConfig())}),f={x:k[0].category,y:k[0].y},f.points=l,k=k[0]),this.len=l.length,f=b.call(f,this),c=k.series,this.distance=r(c.tooltipOptions.distance,16),!1===f?this.hide():(b=this.getLabel(),this.isHidden&&b.attr({opacity:1}).show(),this.split?this.renderSplit(f,
a):(e.style.width||b.css({width:this.chart.spacingBox.width}),b.attr({text:f&&f.join?f.join(""):f}),b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+r(k.colorIndex,c.colorIndex)),b.attr({stroke:e.borderColor||k.color||c.color||"#666666"}),this.updatePosition({plotX:g,plotY:d,negative:k.negative,ttBelow:k.ttBelow,h:n[2]||0})),this.isHidden=!1))},renderSplit:function(d,k){var b=this,e=[],g=this.chart,f=g.renderer,n=!0,l=this.options,m=0,c=this.getLabel();A(d.slice(0,k.length+1),
function(a,d){if(!1!==a){d=k[d-1]||{isHeader:!0,plotX:k[0].plotX};var q=d.series||b,v=q.tt,p=d.series||{},z="highcharts-color-"+r(d.colorIndex,p.colorIndex,"none");v||(q.tt=v=f.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+z).attr({padding:l.padding,r:l.borderRadius,fill:l.backgroundColor,stroke:l.borderColor||d.color||p.color||"#333333","stroke-width":l.borderWidth}).add(c));v.isActive=!0;v.attr({text:a});v.css(l.style).shadow(l.shadow);a=v.getBBox();p=a.width+v.strokeWidth();
d.isHeader?(m=a.height,p=Math.max(0,Math.min(d.plotX+g.plotLeft-p/2,g.chartWidth-p))):p=d.plotX+g.plotLeft-r(l.distance,16)-p;0>p&&(n=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=g.plotTop;e.push({target:d.isHeader?g.plotHeight+m:a,rank:d.isHeader?1:0,size:q.tt.getBBox().height+1,point:d,x:p,tt:v})}});this.cleanSplit();a.distribute(e,g.plotHeight+m);A(e,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:n||b.isHeader?a.x:b.plotX+
g.plotLeft+r(l.distance,16),y:a.pos+g.plotTop,anchorX:b.isHeader?b.plotX+g.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+g.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,b=this.getLabel(),b=(this.options.positioner||this.getPosition).call(this,b.width,b.height,a);this.move(Math.round(b.x),Math.round(b.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,k,b,e){var d=C("%m-%d %H:%M:%S.%L",k),f,n,l={millisecond:15,second:12,minute:9,hour:6,day:3},
m="millisecond";for(n in g){if(a===g.week&&+C("%w",k)===b&&"00:00:00.000"===d.substr(6)){n="week";break}if(g[n]>a){n=m;break}if(l[n]&&d.substr(l[n])!=="01-01 00:00:00.000".substr(l[n]))break;"week"!==n&&(m=n)}n&&(f=e[n]);return f},getXDateFormat:function(a,g,b){g=g.dateTimeLabelFormats;var e=b&&b.closestPointRange;return(e?this.getDateFormat(e,a.x,b.options.startOfWeek,g):g.day)||g.year},tooltipFooterHeaderFormatter:function(a,g){var b=g?"footer":"header";g=a.series;var e=g.tooltipOptions,d=e.xDateFormat,
k=g.xAxis,n=k&&"datetime"===k.options.type&&m(a.key),b=e[b+"Format"];n&&!d&&(d=this.getXDateFormat(a,e,k));n&&d&&(b=b.replace("{point.key}","{point.key:"+d+"}"));return E(b,{point:a,series:g})},bodyFormatter:function(a){return f(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(M);(function(a){var C=a.addEvent,A=a.attr,F=a.charts,E=a.color,m=a.css,f=a.defined,l=a.each,r=a.extend,u=a.find,t=a.fireEvent,g=a.isObject,d=a.offset,
k=a.pick,b=a.removeEvent,e=a.splat,v=a.Tooltip,y=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};v&&(a.tooltip=new v(a,b.tooltip),this.followTouchMove=k(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,e=b.options.chart,c=e.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(c=k(e.pinchType,c));
this.zoomX=a=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=a&&!b||c&&b;this.zoomVert=c&&!b||a&&b;this.hasZoom=a||c},normalize:function(a,b){var e,c;a=a||y.event;a.target||(a.target=a.srcElement);c=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=d(this.chart.container));void 0===c.pageX?(e=Math.max(a.x,a.clientX-b.left),b=a.y):(e=c.pageX-b.left,b=c.pageY-b.top);return r(a,{chartX:Math.round(e),chartY:Math.round(b)})},getCoordinates:function(a){var b=
{xAxis:[],yAxis:[]};l(this.chart.axes,function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,e){var c;l(a,function(a){var d=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(e,d);if((d=g(a,!0))&&!(d=!g(c,!0)))var d=c.distX-a.distX,n=c.dist-a.dist,k=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex),d=0<(0!==d&&b?d:0!==n?n:0!==k?k:c.series.index>
a.series.index?-1:1);d&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var e=a.series,c=e.xAxis,e=e.yAxis;if(c&&e)return b?{chartX:c.len+c.pos-a.clientX,chartY:e.len+e.pos-a.plotY}:{chartX:a.clientX+c.pos,chartY:a.plotY+e.pos}},getHoverData:function(b,e,d,c,f,q){var n,v=[];c=!(!c||!b);var p=e&&!e.stickyTracking?[e]:a.grep(d,function(a){return a.visible&&!(!f&&a.directTouch)&&k(a.options.enableMouseTracking,
!0)&&a.stickyTracking});e=(n=c?b:this.findNearestKDPoint(p,f,q))&&n.series;n&&(f&&!e.noSharedTooltip?(p=a.grep(d,function(a){return a.visible&&!(!f&&a.directTouch)&&k(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),l(p,function(a){a=u(a.points,function(a){return a.x===n.x});g(a)&&!a.isNull&&v.push(a)})):v.push(n));return{hoverPoint:n,hoverSeries:e,hoverPoints:v}},runPointActions:function(b,e){var d=this.chart,c=d.tooltip,g=c?c.shared:!1,n=e||d.hoverPoint,f=n&&n.series||d.hoverSeries,f=this.getHoverData(n,
f,d.series,!!e||f&&f.directTouch&&this.isDirectTouch,g,b),v,n=f.hoverPoint;v=f.hoverPoints;e=(f=f.hoverSeries)&&f.tooltipOptions.followPointer;g=g&&f&&!f.noSharedTooltip;if(n&&(n!==d.hoverPoint||c&&c.isHidden)){l(d.hoverPoints||[],function(b){-1===a.inArray(b,v)&&b.setState()});l(v||[],function(a){a.setState("hover")});if(d.hoverSeries!==f)f.onMouseOver();d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");n.firePointEvent("mouseOver");d.hoverPoints=v;d.hoverPoint=n;c&&c.refresh(g?v:n,b)}else e&&
c&&!c.isHidden&&(n=c.getAnchor([{}],b),c.updatePosition({plotX:n[0],plotY:n[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(d.container.ownerDocument,"mousemove",function(b){var c=F[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));l(d.axes,function(c){var e=k(c.crosshair.snap,!0),p=e?a.find(v,function(a){return a.series[c.coll]===c}):void 0;p||!e?c.drawCrosshair(b,p):c.hideCrosshair()})},reset:function(a,b){var d=this.chart,c=d.hoverSeries,g=d.hoverPoint,n=d.hoverPoints,f=d.tooltip,k=
f&&f.shared?n:g;a&&k&&l(e(k),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)f&&k&&(f.refresh(k),g&&(g.setState(g.state,!0),l(d.axes,function(a){a.crosshair&&a.drawCrosshair(null,g)})));else{if(g)g.onMouseOut();n&&l(n,function(a){a.setState()});if(c)c.onMouseOut();f&&f.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());l(d.axes,function(a){a.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,c;l(e.series,
function(d){c=a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(c),d.markerGroup&&(d.markerGroup.attr(c),d.markerGroup.clip(b?e.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(c))});e.clipRect.attr(b||e.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,c=a.chartX,d=a.chartY,g=this.zoomHor,n=this.zoomVert,
f=b.plotLeft,p=b.plotTop,k=b.plotWidth,v=b.plotHeight,l,h=this.selectionMarker,w=this.mouseDownX,m=this.mouseDownY,r=e.panKey&&a[e.panKey+"Key"];h&&h.touch||(c<f?c=f:c>f+k&&(c=f+k),d<p?d=p:d>p+v&&(d=p+v),this.hasDragged=Math.sqrt(Math.pow(w-c,2)+Math.pow(m-d,2)),10<this.hasDragged&&(l=b.isInsidePlot(w-f,m-p),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!r&&!h&&(this.selectionMarker=h=b.renderer.rect(f,p,g?1:k,n?1:v,0).attr({fill:e.selectionMarkerFill||E("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",
zIndex:7}).add()),h&&g&&(c-=w,h.attr({width:Math.abs(c),x:(0<c?0:c)+w})),h&&n&&(c=d-m,h.attr({height:Math.abs(c),y:(0<c?0:c)+m})),l&&!h&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={originalEvent:a,xAxis:[],yAxis:[]},g=this.selectionMarker,n=g.attr?g.attr("x"):g.x,k=g.attr?g.attr("y"):g.y,p=g.attr?g.attr("width"):g.width,v=g.attr?g.attr("height"):g.height,I;if(this.hasDragged||c)l(e.axes,function(e){if(e.zoomEnabled&&f(e.min)&&
(c||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var h=e.horiz,g="touchend"===a.type?e.minPixelPadding:0,q=e.toValue((h?n:k)+g),h=e.toValue((h?n+p:k+v)-g);d[e.coll].push({axis:e,min:Math.min(q,h),max:Math.max(q,h)});I=!0}}),I&&t(e,"selection",d,function(a){e.zoom(r(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}e&&(m(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=
[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){F[a.hoverChartIndex]&&F[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var e=F[a.hoverChartIndex];e&&(b.relatedTarget||
b.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=null)},onContainerMouseMove:function(b){var e=this.chart;f(a.hoverChartIndex)&&F[a.hoverChartIndex]&&F[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=e.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===e.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!e.isInsidePlot(b.chartX-e.plotLeft,b.chartY-e.plotTop)||e.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var e;a;){if(e=A(a,"class")){if(-1!==
e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,c=b.plotLeft,d=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,
"highcharts-tracker")?(t(e.series,"click",r(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-c,a.chartY-d)&&t(b,"click",a)))},setDOMEvents:function(){var b=this,e=b.chart.container,d=e.ownerDocument;e.onmousedown=function(a){b.onContainerMouseDown(a)};e.onmousemove=function(a){b.onContainerMouseMove(a)};e.onclick=function(a){b.onContainerClick(a)};C(e,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&C(d,"mouseup",b.onDocumentMouseUp);
a.hasTouch&&(e.ontouchstart=function(a){b.onContainerTouchStart(a)},e.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&C(d,"touchend",b.onDocumentTouchEnd))},destroy:function(){var e=this,d=this.chart.container.ownerDocument;e.unDocMouseMove&&e.unDocMouseMove();b(e.chart.container,"mouseleave",e.onContainerMouseLeave);a.chartCount||(b(d,"mouseup",e.onDocumentMouseUp),a.hasTouch&&b(d,"touchend",e.onDocumentTouchEnd));clearInterval(e.tooltipTimeout);a.objectEach(e,function(a,b){e[b]=
null})}}})(M);(function(a){var C=a.charts,A=a.each,F=a.extend,E=a.map,m=a.noop,f=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,f,m,t,g,d){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,m,t,g,d);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,m,t,g,d)},pinchTranslateDirection:function(a,f,m,t,g,d,k,b){var e=this.chart,v=a?"x":"y",l=a?"X":"Y",n="chart"+l,r=a?"width":"height",u=e["plot"+(a?"Left":"Top")],c,G,q=b||1,B=e.inverted,K=e.bounds[a?"h":"v"],p=1===f.length,z=f[0][n],I=m[0][n],
L=!p&&f[1][n],h=!p&&m[1][n],w;m=function(){!p&&20<Math.abs(z-L)&&(q=b||Math.abs(I-h)/Math.abs(z-L));G=(u-I)/q+z;c=e["plot"+(a?"Width":"Height")]/q};m();f=G;f<K.min?(f=K.min,w=!0):f+c>K.max&&(f=K.max-c,w=!0);w?(I-=.8*(I-k[v][0]),p||(h-=.8*(h-k[v][1])),m()):k[v]=[I,h];B||(d[v]=G-u,d[r]=c);d=B?1/q:q;g[r]=c;g[v]=f;t[B?a?"scaleY":"scaleX":"scale"+l]=q;t["translate"+l]=d*u+(I-d*z)},pinch:function(a){var l=this,u=l.chart,t=l.pinchDown,g=a.touches,d=g.length,k=l.lastValidTouch,b=l.hasZoom,e=l.selectionMarker,
v={},y=1===d&&(l.inClass(a.target,"highcharts-tracker")&&u.runTrackerClick||l.runChartClick),n={};1<d&&(l.initiated=!0);b&&l.initiated&&!y&&a.preventDefault();E(g,function(a){return l.normalize(a)});"touchstart"===a.type?(A(g,function(a,b){t[b]={chartX:a.chartX,chartY:a.chartY}}),k.x=[t[0].chartX,t[1]&&t[1].chartX],k.y=[t[0].chartY,t[1]&&t[1].chartY],A(u.axes,function(a){if(a.zoomEnabled){var b=u.bounds[a.horiz?"h":"v"],e=a.minPixelPadding,d=a.toPixels(f(a.options.min,a.dataMin)),g=a.toPixels(f(a.options.max,
a.dataMax)),k=Math.max(d,g);b.min=Math.min(a.pos,Math.min(d,g)-e);b.max=Math.max(a.pos+a.len,k+e)}}),l.res=!0):l.followTouchMove&&1===d?this.runPointActions(l.normalize(a)):t.length&&(e||(l.selectionMarker=e=F({destroy:m,touch:!0},u.plotBox)),l.pinchTranslate(t,g,v,e,n,k),l.hasPinched=b,l.scaleGroups(v,n),l.res&&(l.res=!1,this.reset(!1,0)))},touch:function(l,m){var r=this.chart,t,g;if(r.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=r.index;1===l.touches.length?
(l=this.normalize(l),(g=r.isInsidePlot(l.chartX-r.plotLeft,l.chartY-r.plotTop))&&!r.openMenu?(m&&this.runPointActions(l),"touchmove"===l.type&&(m=this.pinchDown,t=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-l.chartX,2)+Math.pow(m[0].chartY-l.chartY,2)):!1),f(t,!0)&&this.pinch(l)):m&&this.reset()):2===l.touches.length&&this.pinch(l)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){C[a.hoverChartIndex]&&
C[a.hoverChartIndex].pointer.drop(f)}})})(M);(function(a){var C=a.addEvent,A=a.charts,F=a.css,E=a.doc,m=a.extend,f=a.noop,l=a.Pointer,r=a.removeEvent,u=a.win,t=a.wrap;if(!a.hasTouch&&(u.PointerEvent||u.MSPointerEvent)){var g={},d=!!u.PointerEvent,k=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(g,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,d,g,n){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||
(n(b),n=A[a.hoverChartIndex].pointer,n[d]({type:g,target:b.currentTarget,preventDefault:f,touches:k()}))};m(l.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY};g[a.pointerId].target||(g[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,
"onDocumentTouchEnd","touchend",function(a){delete g[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(E,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});t(l.prototype,"init",function(a,b,d){a.call(this,b,d);this.hasZoom&&F(b.container,{"-ms-touch-action":"none","touch-action":"none"})});t(l.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});t(l.prototype,"destroy",function(a){this.batchMSEvents(r);a.call(this)})}})(M);(function(a){var C=a.addEvent,A=a.css,F=a.discardElement,E=a.defined,m=a.each,f=a.isFirefox,l=a.marginNames,r=a.merge,u=a.pick,t=a.setAnimation,g=a.stableSort,d=a.win,k=a.wrap;a.Legend=function(a,e){this.init(a,e)};a.Legend.prototype={init:function(a,e){this.chart=a;this.setOptions(e);e.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},
setOptions:function(a){var b=u(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=r(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=u(a.symbolWidth,16);this.pages=[]},update:function(a,e){var b=this.chart;this.setOptions(r(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;u(e,!0)&&b.redraw()},colorizeItem:function(a,e){a.legendGroup[e?"removeClass":
"addClass"]("highcharts-legend-item-hidden");var b=this.options,d=a.legendItem,g=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,b=e?b.itemStyle.color:k,c=e?a.color||k:k,l=a.options&&a.options.marker,q={fill:c};d&&d.css({fill:b,color:b});g&&g.attr({stroke:c});f&&(l&&f.isMarker&&(q=a.pointAttribs(),e||(q.stroke=q.fill=k)),f.attr(q))},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,g=a._legendItemPos,f=g[0],g=g[1],k=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?
f:this.legendWidth-f-2*d-4,g);k&&(k.x=f,k.y=g)},destroyItem:function(a){var b=a.checkbox;m(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}m(this.getAllItems(),function(b){m(["legendItem","legendGroup"],a,b)});m("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,
d,g=this.clipHeight||this.legendHeight,f=this.titleHeight;b&&(d=b.translateY,m(this.allItems,function(e){var k=e.checkbox,c;k&&(c=d+f+k.y+(a||0)+3,A(k,{left:b.translateX+e.checkboxOffset+k.x-20+"px",top:c+"px",display:c>d-6&&c<d+g-6?"":"none"}))}))},renderTitle:function(){var a=this.options,e=this.padding,d=a.title,g=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,e-3,e-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(d.style).add(this.group)),a=this.title.getBBox(),
g=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:g}));this.titleHeight=g},setText:function(b){var e=this.options;b.legendItem.attr({text:e.labelFormat?a.format(e.labelFormat,b):e.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,d=b.renderer,g=this.options,f="horizontal"===g.layout,k=this.symbolWidth,l=g.symbolPadding,c=this.itemStyle,m=this.itemHiddenStyle,q=this.padding,B=f?u(g.itemDistance,20):0,t=!g.rtl,p=g.width,z=g.itemMarginBottom||0,I=this.itemMarginTop,
L=a.legendItem,h=!a.series,w=!h&&a.series.drawLegendSymbol?a.series:a,P=w.options,H=this.createCheckboxForItem&&P&&P.showCheckbox,P=k+l+B+(H?20:0),O=g.useHTML,A=a.options.className;L||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+w.type+"-series highcharts-color-"+a.colorIndex+(A?" "+A:"")+(h?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=L=d.text("",t?k+l:-l,this.baseline||0,O).css(r(a.visible?c:m)).attr({align:t?"left":"right",zIndex:2}).add(a.legendGroup),
this.baseline||(k=c.fontSize,this.fontMetrics=d.fontMetrics(k,L),this.baseline=this.fontMetrics.f+3+I,L.attr("y",this.baseline)),this.symbolHeight=g.symbolHeight||this.fontMetrics.f,w.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,L,O),H&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);c.width||L.css({width:(g.itemWidth||g.width||b.spacingBox.width)-P});this.setText(a);d=L.getBBox();c=a.checkboxOffset=g.itemWidth||a.legendItemWidth||d.width+P;this.itemHeight=d=Math.round(a.legendItemHeight||
d.height||this.symbolHeight);f&&this.itemX-q+c>(p||b.spacingBox.width-2*q-g.x)&&(this.itemX=q,this.itemY+=I+this.lastLineHeight+z,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,c);this.lastItemY=I+this.itemY+z;this.lastLineHeight=Math.max(d,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=c:(this.itemY+=I+d+z,this.lastLineHeight=d);this.offsetWidth=p||Math.max((f?this.itemX-q-(a.checkbox?0:B):c)+q,this.offsetWidth)},getAllItems:function(){var a=[];m(this.chart.series,
function(b){var e=b&&b.options;b&&u(e.showInLegend,E(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===e.legendType?b.data:b)))});return a},adjustMargins:function(a,e){var b=this.chart,d=this.options,g=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);d.floating||m([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,k){f.test(g)&&!E(a[k])&&(b[l[k]]=Math.max(b[l[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*d[k%2?"x":"y"]+u(d.margin,
12)+e[k]))})},render:function(){var a=this,e=a.chart,d=e.renderer,f=a.group,k,l,t,c,u=a.box,q=a.options,B=a.padding;a.itemX=B;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;f||(a.group=f=d.g("legend").attr({zIndex:7}).add(),a.contentGroup=d.g().attr({zIndex:1}).add(f),a.scrollGroup=d.g().add(a.contentGroup));a.renderTitle();k=a.getAllItems();g(k,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&k.reverse();a.allItems=k;a.display=l=
!!k.length;a.lastLineHeight=0;m(k,function(b){a.renderItem(b)});t=(q.width||a.offsetWidth)+B;c=a.lastItemY+a.lastLineHeight+a.titleHeight;c=a.handleOverflow(c);c+=B;u||(a.box=u=d.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(f),u.isNew=!0);u.attr({stroke:q.borderColor,"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<t&&0<c&&(u[u.isNew?"attr":"animate"](u.crisp({x:0,y:0,width:t,height:c},u.strokeWidth())),u.isNew=!1);u[l?"show":"hide"]();a.legendWidth=
t;a.legendHeight=c;m(k,function(b){a.positionItem(b)});l&&f.align(r(q,{width:t,height:c}),!0,"spacingBox");e.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,d=this.chart,g=d.renderer,f=this.options,k=f.y,l=this.padding,d=d.spacingBox.height+("top"===f.verticalAlign?-k:k)-l,k=f.maxHeight,c,r=this.clipRect,q=f.navigation,B=u(q.animation,!0),t=q.arrowSize||12,p=this.nav,z=this.pages,I,L=this.allItems,h=function(a){"number"===typeof a?r.attr({height:a}):r&&(b.clipRect=r.destroy(),
b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")};"horizontal"!==f.layout||"middle"===f.verticalAlign||f.floating||(d/=2);k&&(d=Math.min(d,k));z.length=0;a>d&&!1!==q.enabled?(this.clipHeight=c=Math.max(d-20-this.titleHeight-l,0),this.currentPage=u(this.currentPage,1),this.fullHeight=a,m(L,function(a,b){var e=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=z.length;if(!d||e-z[d-1]>c&&(I||e)!==z[d-1])z.push(I||
e),d++;b===L.length-1&&e+a-z[d-1]>c&&z.push(e);e!==I&&(I=e)}),r||(r=b.clipRect=g.clipRect(0,l,9999,0),b.contentGroup.clip(r)),h(c),p||(this.nav=p=g.g().attr({zIndex:1}).add(this.group),this.up=g.symbol("triangle",0,0,t,t).on("click",function(){b.scroll(-1,B)}).add(p),this.pager=g.text("",15,10).addClass("highcharts-legend-navigation").css(q.style).add(p),this.down=g.symbol("triangle-down",0,0,t,t).on("click",function(){b.scroll(1,B)}).add(p)),b.scroll(0),a=d):p&&(h(),this.nav=p.destroy(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0);return a},scroll:function(a,e){var b=this.pages,d=b.length;a=this.currentPage+a;var g=this.clipHeight,f=this.options.navigation,k=this.pager,c=this.padding;a>d&&(a=d);0<a&&(void 0!==e&&t(e,this.chart),this.nav.attr({translateX:c,translateY:g+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),k.attr({text:a+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===d?"highcharts-legend-nav-inactive":
"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===d?f.inactiveColor:f.activeColor}).css({cursor:a===d?"default":"pointer"}),e=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:e}),this.currentPage=a,this.positionCheckboxes(e))}};a.LegendSymbolMixin={drawRectangle:function(a,e){var b=a.symbolHeight,d=a.options.squareSymbol;e.legendSymbol=this.chart.renderer.rect(d?(a.symbolWidth-b)/
2:0,a.baseline-b+1,d?b:a.symbolWidth,b,u(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(e.legendGroup)},drawLineMarker:function(a){var b=this.options,d=b.marker,g=a.symbolWidth,f=a.symbolHeight,k=f/2,l=this.chart.renderer,c=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var m;m={"stroke-width":b.lineWidth||0};b.dashStyle&&(m.dashstyle=b.dashStyle);this.legendLine=l.path(["M",0,a,"L",g,a]).addClass("highcharts-graph").attr(m).add(c);d&&!1!==d.enabled&&
(b=Math.min(u(d.radius,k),k),0===this.symbol.indexOf("url")&&(d=r(d,{width:f,height:f}),b=0),this.legendSymbol=d=l.symbol(this.symbol,g/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(c),d.isMarker=!0)}};(/Trident\/7\.0/.test(d.navigator.userAgent)||f)&&k(a.Legend.prototype,"positionItem",function(a,e){var b=this,d=function(){e._legendItemPos&&a.call(b,e)};d();setTimeout(d)})})(M);(function(a){var C=a.addEvent,A=a.animate,F=a.animObject,E=a.attr,m=a.doc,f=a.Axis,l=a.createElement,r=a.defaultOptions,
u=a.discardElement,t=a.charts,g=a.css,d=a.defined,k=a.each,b=a.extend,e=a.find,v=a.fireEvent,y=a.getStyle,n=a.grep,D=a.isNumber,J=a.isObject,c=a.isString,G=a.Legend,q=a.marginNames,B=a.merge,K=a.objectEach,p=a.Pointer,z=a.pick,I=a.pInt,L=a.removeEvent,h=a.seriesTypes,w=a.splat,P=a.svg,H=a.syncTimeout,O=a.win,Q=a.Renderer,R=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new R(a,b,c)};b(R.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);
if(c(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var e,d,h=b.series,p=b.plotOptions||{};b.series=null;e=B(r,b);for(d in e.plotOptions)e.plotOptions[d].tooltip=p[d]&&B(p[d].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;e.series=b.series=h;this.userOptions=b;b=e.chart;d=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=e;this.axes=[];this.series=
[];this.hasCartesianSeries=b.showAxes;var g=this;g.index=t.length;t.push(g);a.chartCount++;d&&K(d,function(a,b){C(g,b,a)});g.xAxis=[];g.yAxis=[];g.pointCount=g.colorCounter=g.symbolCounter=0;g.firstRender()},initSeries:function(b){var c=this.options.chart;(c=h[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,
b,c){var e=c?b:a;a=c?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(c){var e=this.axes,d=this.series,h=this.pointer,p=this.legend,g=this.isDirtyLegend,f,q,l=this.hasCartesianSeries,n=this.isDirtyBox,z,m=this.renderer,x=m.isHidden(),w=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(c,this);x&&this.temporaryDisplay();this.layOutTitles();for(c=d.length;c--;)if(z=d[c],z.options.stacking&&(f=!0,z.isDirty)){q=!0;break}if(q)for(c=d.length;c--;)z=d[c],z.options.stacking&&
(z.isDirty=!0);k(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),g=!0);a.isDirtyData&&v(a,"updatedData")});g&&p.options.enabled&&(p.render(),this.isDirtyLegend=!1);f&&this.getStacks();l&&k(e,function(a){a.updateNames();a.setScale()});this.getMargins();l&&(k(e,function(a){a.isDirty&&(n=!0)}),k(e,function(a){var c=a.min+","+a.max;a.extKey!==c&&(a.extKey=c,w.push(function(){v(a,"afterSetExtremes",b(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(n||f)&&
a.redraw()}));n&&this.drawChartBox();v(this,"predraw");k(d,function(a){(n||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);m.draw();v(this,"redraw");v(this,"render");x&&this.temporaryDisplay(!0);k(w,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,d=this.series,h;c=e(this.axes,b)||e(this.series,b);for(h=0;!c&&h<d.length;h++)c=e(d[h].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=w(b.xAxis||
{}),b=b.yAxis=w(b.yAxis||{});k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new f(a,b)})},getSelectedPoints:function(){var a=[];k(this.series,function(b){a=a.concat(n(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return n(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var e=this,d=e.options,h;h=d.title=B({style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=
B({style:{color:"#666666"}},d.subtitle,b);k([["title",a,h],["subtitle",b,d]],function(a,b){var c=a[0],d=e[c],h=a[1];a=a[2];d&&h&&(e[c]=d=d.destroy());a&&a.text&&!d&&(e[c]=e.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),e[c].update=function(a){e.setTitle(!b&&a,b&&a)},e[c].css(a.style))});e.layOutTitles(c)},layOutTitles:function(a){var c=0,e,d=this.renderer,h=this.spacingBox;k(["title","subtitle"],function(a){var e=this[a],p=this.options[a];
a="title"===a?-3:p.verticalAlign?0:c+2;var g;e&&(g=p.style.fontSize,g=d.fontMetrics(g,e).b,e.css({width:(p.width||h.width+p.widthAdjust)+"px"}).align(b({y:a+g},p),!1,"spacingBox"),p.floating||p.verticalAlign||(c=Math.ceil(c+e.getBBox(p.useHTML).height)))},this);e=this.titleOffset!==c;this.titleOffset=c;!this.isDirtyBox&&e&&(this.isDirtyBox=e,this.hasRendered&&z(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,e=this.renderTo;d(c)||(this.containerWidth=
y(e,"width"));d(b)||(this.containerHeight=y(e,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(m.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){m.body.contains(c)||(c.hcOrigDetached=!0,m.body.appendChild(c));
if("none"===y(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===m.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var e,d=this.options,h=d.chart,p,g;e=this.renderTo;var f=a.uniqueKey(),k;e||
(this.renderTo=e=h.renderTo);c(e)&&(this.renderTo=e=m.getElementById(e));e||a.error(13,!0);p=I(E(e,"data-highcharts-chart"));D(p)&&t[p]&&t[p].hasRendered&&t[p].destroy();E(e,"data-highcharts-chart",this.index);e.innerHTML="";h.skipClone||e.offsetWidth||this.temporaryDisplay();this.getChartSize();p=this.chartWidth;g=this.chartHeight;k=b({position:"relative",overflow:"hidden",width:p+"px",height:g+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},h.style);
this.container=e=l("div",{id:f},k,e);this._cursor=e.style.cursor;this.renderer=new (a[h.renderer]||Q)(e,p,g,null,h.forExport,d.exporting&&d.exporting.allowHTML);this.setClassName(h.className);this.renderer.setStyle(h.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,e=this.titleOffset;this.resetMargins();e&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,e+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&
(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&a.getOffset()});k(q,function(e,h){d(c[h])||(a[e]+=b[h])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,e=b.renderTo,h=d(c.width)&&d(c.height),p=c.width||y(e,"width"),c=c.height||y(e,"height"),
e=a?a.target:O;if(!h&&!b.isPrinting&&p&&c&&(e===O||e===m)){if(p!==b.containerWidth||c!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=H(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=p;b.containerHeight=c}},initReflow:function(){var a=this,b;b=C(O,"resize",function(b){a.reflow(b)});C(a,"destroy",b)},setSize:function(b,c,e){var d=this,h=d.renderer;d.isResizing+=1;a.setAnimation(e,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;void 0!==
b&&(d.options.chart.width=b);void 0!==c&&(d.options.chart.height=c);d.getChartSize();b=h.globalAnimation;(b?A:g)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},b);d.setChartSize(!0);h.setSize(d.chartWidth,d.chartHeight,e);k(d.axes,function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(e);d.oldChartHeight=null;v(d,"resize");H(function(){d&&v(d,"endResize",null,function(){--d.isResizing})},F(b).duration)},setChartSize:function(a){function b(a){a=
f[a]||0;return Math.max(m||a,a)/2}var c=this.inverted,e=this.renderer,d=this.chartWidth,h=this.chartHeight,p=this.options.chart,g=this.spacing,f=this.clipOffset,q,n,l,z,m;this.plotLeft=q=Math.round(this.plotLeft);this.plotTop=n=Math.round(this.plotTop);this.plotWidth=l=Math.max(0,Math.round(d-q-this.marginRight));this.plotHeight=z=Math.max(0,Math.round(h-n-this.marginBottom));this.plotSizeX=c?z:l;this.plotSizeY=c?l:z;this.plotBorderWidth=p.plotBorderWidth||0;this.spacingBox=e.spacingBox={x:g[3],y:g[0],
width:d-g[3]-g[1],height:h-g[0]-g[2]};this.plotBox=e.plotBox={x:q,y:n,width:l,height:z};m=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(b(3));e=Math.ceil(b(0));this.clipBox={x:c,y:e,width:Math.floor(this.plotSizeX-b(1)-c),height:Math.max(0,Math.floor(this.plotSizeY-b(2)-e))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;k(["margin","spacing"],function(c){var e=b[c],d=J(e)?e:[e,e,e,e];k(["Top","Right","Bottom","Left"],function(e,
h){a[c][h]=z(b[c+e],d[h])})});k(q,function(b,c){a[b]=z(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,e=this.chartHeight,d=this.chartBackground,h=this.plotBackground,p=this.plotBorder,g,f=this.plotBGImage,k=a.backgroundColor,q=a.plotBackgroundColor,l=a.plotBackgroundImage,n,z=this.plotLeft,m=this.plotTop,w=this.plotWidth,I=this.plotHeight,v=this.plotBox,r=this.clipRect,B=this.clipBox,y="animate";
d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),y="attr");g=a.borderWidth||0;n=g+(a.shadow?8:0);k={fill:k||"none"};if(g||d["stroke-width"])k.stroke=a.borderColor,k["stroke-width"]=g;d.attr(k).shadow(a.shadow);d[y]({x:n/2,y:n/2,width:c-n-g%2,height:e-n-g%2,r:a.borderRadius});y="animate";h||(y="attr",this.plotBackground=h=b.rect().addClass("highcharts-plot-background").add());h[y](v);h.attr({fill:q||"none"}).shadow(a.plotShadow);l&&(f?f.animate(v):this.plotBGImage=b.image(l,
z,m,w,I).add());r?r.animate({width:B.width,height:B.height}):this.clipRect=b.clipRect(B);y="animate";p||(y="attr",this.plotBorder=p=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());p.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});p[y](p.crisp({x:z,y:m,width:w,height:I},-p.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,e=a.options.series,d,p;k(["inverted","angular","polar"],function(g){c=h[b.type||b.defaultSeriesType];
p=b[g]||c&&c.prototype[g];for(d=e&&e.length;!p&&d--;)(c=h[e[d].type])&&c.prototype[g]&&(p=!0);a[g]=p})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=0});k(b,function(b){var e=b.options.linkedTo;c(e)&&(e=":previous"===e?a.series[b.index-1]:a.get(e))&&e.linkedParent!==b&&(e.linkedSeries.push(b),b.linkedParent=e,b.visible=z(b.options.visible,e.options.visible,b.visible))})},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=
this,c=a.options.labels;c.items&&k(c.items,function(e){var d=b(c.style,e.style),h=I(d.left)+a.plotLeft,p=I(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(e.html,h,p).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,e,d,h;this.setTitle();this.legend=new G(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;e=this.plotHeight-=21;k(a,function(a){a.setScale()});this.getAxisMargins();d=
1.1<c/this.plotWidth;h=1.05<e/this.plotHeight;if(d||h)k(a,function(a){(a.horiz&&d||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=B(!0,this.options.credits,a);a.enabled&&!this.credits&&
(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(O.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,e=b.series,d=b.container,h,p=d&&d.parentNode;v(b,"destroy");b.renderer.forExport?a.erase(t,b):t[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
L(b);for(h=c.length;h--;)c[h]=c[h].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(h=e.length;h--;)e[h]=e[h].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",L(d),p&&u(d));K(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return P||O!=O.top||
"complete"===m.readyState?!0:(m.attachEvent("onreadystatechange",function(){m.detachEvent("onreadystatechange",a.firstRender);"complete"===m.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();v(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();v(a,"beforeRender");p&&(a.pointer=new p(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();
a.temporaryDisplay(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);v(this,"load");v(this,"render");d(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(M);(function(a){var C,A=a.each,F=a.extend,E=a.erase,m=a.fireEvent,f=a.format,l=a.isArray,r=a.isNumber,u=a.pick,t=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,d,f){this.series=a;this.color=a.color;this.applyOptions(d,
f);a.options.colorByPoint?(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length,f=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):f=a.colorIndex;this.colorIndex=u(this.colorIndex,f);a.chart.pointCount++;return this},applyOptions:function(a,d){var g=this.series,b=g.options.pointValKey||g.pointValKey;a=C.prototype.optionsToObject.call(this,a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;b&&(this.y=
this[b]);this.isNull=u(this.isValid&&!this.isValid(),null===this.x||!r(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&g.xAxis&&g.xAxis.hasNames&&(this.x=g.xAxis.nameToX(this));void 0===this.x&&g&&(this.x=void 0===d?g.autoIncrement(this):d);return this},optionsToObject:function(a){var d={},g=this.series,b=g.options.keys,e=b||g.pointArrayMap||["y"],f=e.length,m=0,n=0;if(r(a)||null===a)d[e[0]]=a;else if(l(a))for(!b&&a.length>f&&(g=typeof a[0],"string"===g?d.name=a[0]:"number"===
g&&(d.x=a[0]),m++);n<f;)b&&void 0===a[m]||(d[e[n]]=a[m]),m++,n++;else"object"===typeof a&&(d=a,a.dataLabels&&(g._hasPointLabels=!0),a.marker&&(g._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?
" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||"y",f=0,b;for(b=d[f];this[a]>=b.value;)b=d[++f];b&&b.color&&!this.options.color&&(this.color=b.color);return b},destroy:function(){var a=this.series.chart,d=a.hoverPoints,f;a.pointCount--;d&&(this.setState(),E(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)t(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],d,f=6;f--;)d=a[f],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,g=d.tooltipOptions,b=u(g.valueDecimals,""),
e=g.valuePrefix||"",l=g.valueSuffix||"";A(d.pointArrayMap||["y"],function(d){d="{point."+d;if(e||l)a=a.replace(d+"}",e+d+"}"+l);a=a.replace(d+"}",d+":,."+b+"f}")});return f(a,{point:this,series:this.series})},firePointEvent:function(a,d,f){var b=this,e=this.series.options;(e.point.events[a]||b.options&&b.options.events&&b.options.events[a])&&this.importEvents();"click"===a&&e.allowPointSelect&&(f=function(a){b.select&&b.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});m(this,a,d,f)},visible:!0}})(M);
(function(a){var C=a.addEvent,A=a.animObject,F=a.arrayMax,E=a.arrayMin,m=a.correctFloat,f=a.Date,l=a.defaultOptions,r=a.defaultPlotOptions,u=a.defined,t=a.each,g=a.erase,d=a.extend,k=a.fireEvent,b=a.grep,e=a.isArray,v=a.isNumber,y=a.isString,n=a.merge,D=a.objectEach,J=a.pick,c=a.removeEvent,G=a.splat,q=a.SVGElement,B=a.syncTimeout,K=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,
states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},
halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,e,h=a.series,p;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();d(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;D(e,function(a,b){C(c,b,a)});if(e&&
e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();t(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);h.length&&(p=h[h.length-1]);c._i=J(p&&p._i,-1)+1;a.orderSeries(this.insert(h))},insert:function(a){var b=this.options.index,c;if(v(b)){for(c=a.length;c--;)if(b>=J(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return J(c,
a.length-1)},bindAxes:function(){var b=this,c=b.options,e=b.chart,d;t(b.axisTypes||[],function(h){t(e[h],function(a){d=a.options;if(c[h]===d.index||void 0!==c[h]&&c[h]===d.id||void 0===c[h]&&0===d.index)b.insert(a.series),b[h]=a,a.isDirty=!0});b[h]||b.optionalAxis===h||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,e=arguments,d=v(b)?function(e){var d="y"===e&&c.toYData?c.toYData(a):a[e];c[e+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(e,
2))};t(c.parallelArrays,d)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,e=a.pointIntervalUnit,b=J(b,a.pointStart,0);this.pointInterval=c=J(this.pointInterval,a.pointInterval,1);e&&(a=new f(b),"day"===e?a=+a[f.hcSetDate](a[f.hcGetDate]()+c):"month"===e?a=+a[f.hcSetMonth](a[f.hcGetMonth]()+c):"year"===e&&(a=+a[f.hcSetFullYear](a[f.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,d=(b.userOptions||{}).plotOptions||
{},p=e[this.type];this.userOptions=a;b=n(p,e.series,a);this.tooltipOptions=n(l.tooltip,l.plotOptions.series&&l.plotOptions.series.tooltip,l.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=J(a.stickyTracking,d[this.type]&&d[this.type].stickyTracking,d.series&&d.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===p.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=
(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&u(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var e,d=this.chart,p=this.userOptions,f=a+"Index",g=a+"Counter",k=c?c.length:J(d.options.chart[a+"Count"],d[a+"Count"]);b||(e=J(p[f],p["_"+f]),u(e)||(d.series.length||
(d[g]=0),p["_"+f]=e=d[g]%k,d[g]+=1),c&&(b=c[e]));void 0!==e&&(this[f]=e);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||r[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,c,d,f){var h=this,p=h.points,g=p&&p.length||0,k,q=h.options,l=h.chart,n=null,m=h.xAxis,
z=q.turboThreshold,r=this.xData,B=this.yData,I=(k=h.pointArrayMap)&&k.length;b=b||[];k=b.length;c=J(c,!0);if(!1!==f&&k&&g===k&&!h.cropped&&!h.hasGroupedData&&h.visible)t(b,function(a,b){p[b].update&&a!==q.data[b]&&p[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;t(this.parallelArrays,function(a){h[a+"Data"].length=0});if(z&&k>z){for(d=0;null===n&&d<k;)n=b[d],d++;if(v(n))for(d=0;d<k;d++)r[d]=this.autoIncrement(),B[d]=b[d];else if(e(n))if(I)for(d=0;d<k;d++)n=b[d],r[d]=n[0],B[d]=n.slice(1,
I+1);else for(d=0;d<k;d++)n=b[d],r[d]=n[0],B[d]=n[1];else a.error(12)}else for(d=0;d<k;d++)void 0!==b[d]&&(n={series:h},h.pointClass.prototype.applyOptions.apply(n,[b[d]]),h.updateParallelArrays(n,d));y(B[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=b;for(d=g;d--;)p[d]&&p[d].destroy&&p[d].destroy();m&&(m.minRange=m.userMinRange);h.isDirty=l.isDirtyBox=!0;h.isDirtyData=!!p;d=!1}"point"===q.legendType&&(this.processData(),this.generatePoints());c&&l.redraw(d)},processData:function(b){var c=
this.xData,e=this.yData,d=c.length,h;h=0;var p,f,g=this.xAxis,k,q=this.options;k=q.cropThreshold;var n=this.getExtremesFromAll||q.getExtremesFromAll,l=this.isCartesian,q=g&&g.val2lin,m=g&&g.isLog,v,r;if(l&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&!b)return!1;g&&(b=g.getExtremes(),v=b.min,r=b.max);if(l&&this.sorted&&!n&&(!k||d>k||this.forceCrop))if(c[d-1]<v||c[0]>r)c=[],e=[];else if(c[0]<v||c[d-1]>r)h=this.cropData(this.xData,this.yData,v,r),c=h.xData,e=h.yData,h=h.start,p=!0;for(k=c.length||
1;--k;)d=m?q(c[k])-q(c[k-1]):c[k]-c[k-1],0<d&&(void 0===f||d<f)?f=d:0>d&&this.requireSorting&&a.error(15);this.cropped=p;this.cropStart=h;this.processedXData=c;this.processedYData=e;this.closestPointRange=f},cropData:function(a,b,c,e){var d=a.length,p=0,g=d,f=J(this.cropShoulder,1),k;for(k=0;k<d;k++)if(a[k]>=c){p=Math.max(0,k-f);break}for(c=k;c<d;c++)if(a[c]>e){g=c+f;break}return{xData:a.slice(p,g),yData:b.slice(p,g),start:p,end:g}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,
e,d=this.processedXData,g=this.processedYData,f=this.pointClass,k=d.length,q=this.cropStart||0,n,l=this.hasGroupedData,a=a.keys,m,v=[],r;c||l||(c=[],c.length=b.length,c=this.data=c);a&&l&&(this.options.keys=!1);for(r=0;r<k;r++)n=q+r,l?(m=(new f).init(this,[d[r]].concat(G(g[r]))),m.dataGroup=this.groupMap[r]):(m=c[n])||void 0===b[n]||(c[n]=m=(new f).init(this,b[n],d[r])),m&&(m.index=n,v[r]=m);this.options.keys=a;if(c&&(k!==(e=c.length)||l))for(r=0;r<e;r++)r!==q||l||(r+=k),c[r]&&(c[r].destroyElements(),
c[r].plotX=void 0);this.data=c;this.points=v},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,h=[],p=0;d=this.xAxis.getExtremes();var g=d.min,f=d.max,k,q,n,l;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(l=0;l<d;l++)if(q=c[l],n=a[l],k=(v(n,!0)||e(n))&&(!b.positiveValuesOnly||n.length||0<n),q=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l]||q)>=g&&(c[l]||q)<=f,k&&q)if(k=n.length)for(;k--;)null!==n[k]&&(h[p++]=n[k]);else h[p++]=n;this.dataMin=
E(h);this.dataMax=F(h)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,e=c.categories,d=this.yAxis,g=this.points,f=g.length,k=!!this.modifyValue,q=a.pointPlacement,n="between"===q||v(q),l=a.threshold,r=a.startFromThreshold?l:0,B,y,t,G,D=Number.MAX_VALUE;"between"===q&&(q=.5);v(q)&&(q*=J(a.pointRange||c.pointRange));for(a=0;a<f;a++){var K=g[a],A=K.x,C=K.y;y=K.low;var E=b&&d.stacks[(this.negStacks&&C<(r?0:l)?"-":"")+this.stackKey],
F;d.positiveValuesOnly&&null!==C&&0>=C&&(K.isNull=!0);K.plotX=B=m(Math.min(Math.max(-1E5,c.translate(A,0,0,0,1,q,"flags"===this.type)),1E5));b&&this.visible&&!K.isNull&&E&&E[A]&&(G=this.getStackIndicator(G,A,this.index),F=E[A],C=F.points[G.key],y=C[0],C=C[1],y===r&&G.key===E[A].base&&(y=J(l,d.min)),d.positiveValuesOnly&&0>=y&&(y=null),K.total=K.stackTotal=F.total,K.percentage=F.total&&K.y/F.total*100,K.stackY=C,F.setOffset(this.pointXOffset||0,this.barW||0));K.yBottom=u(y)?d.translate(y,0,1,0,1):
null;k&&(C=this.modifyValue(C,K));K.plotY=y="number"===typeof C&&Infinity!==C?Math.min(Math.max(-1E5,d.translate(C,0,1,0,1)),1E5):void 0;K.isInside=void 0!==y&&0<=y&&y<=d.len&&0<=B&&B<=c.len;K.clientX=n?m(c.translate(A,0,0,0,1,q)):B;K.negative=K.y<(l||0);K.category=e&&void 0!==e[K.x]?e[K.x]:K.x;K.isNull||(void 0!==t&&(D=Math.min(D,Math.abs(B-t))),t=B);K.zone=this.zones.length&&K.getZone()}this.closestPointRangePx=D},getValidPoints:function(a,c){var e=this.chart;return b(a||this.points||[],function(a){return c&&
!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,e=b.renderer,d=b.inverted,p=this.clipBox,g=p||b.clipBox,f=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(),k=b[f],q=b[f+"m"];k||(a&&(g.width=0,b[f+"m"]=q=e.clipRect(-99,d?-b.plotLeft:-b.plotTop,99,d?b.chartWidth:b.chartHeight)),b[f]=k=e.clipRect(g),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==c.clip&&
(this.group.clip(a||p?k:b.clipRect),this.markerGroup.clip(q),this.sharedClipKey=f);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&f&&b[f]&&(p||(b[f]=b[f].destroy()),b[f+"m"]&&(b[f+"m"]=b[f+"m"].destroy())))},animate:function(a){var b=this.chart,c=A(this.options.animation),e;a?this.setClip(c):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX},c),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
k(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,e,d,f,g=this.options.marker,k,q,n,l,m=this[this.specialGroup]||this.markerGroup,r=J(g.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*g.radius);if(!1!==g.enabled||this._hasPointMarkers)for(e=0;e<a.length;e++)d=a[e],c=d.plotY,f=d.graphic,k=d.marker||{},q=!!d.marker,n=r&&void 0===k.enabled||k.enabled,l=d.isInside,n&&v(c)&&null!==d.y?(c=J(k.symbol,this.symbol),d.hasImage=0===c.indexOf("url"),
n=this.markerAttribs(d,d.selected&&"select"),f?f[l?"show":"hide"](!0).animate(n):l&&(0<n.width||d.hasImage)&&(d.graphic=f=b.renderer.symbol(c,n.x,n.y,n.width,n.height,q?k:g).add(m)),f&&f.attr(this.pointAttribs(d,d.selected&&"select")),f&&f.addClass(d.getClassName(),!0)):f&&(d.graphic=f.destroy())},markerAttribs:function(a,b){var c=this.options.marker,e=a.marker||{},d=J(e.radius,c.radius);b&&(c=c.states[b],b=e.states&&e.states[b],d=J(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=
0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},pointAttribs:function(a,b){var c=this.options.marker,e=a&&a.options,d=e&&e.marker||{},f=this.color,g=e&&e.color,p=a&&a.color,e=J(d.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;f=g||a||p||f;a=d.fillColor||c.fillColor||f;f=d.lineColor||c.lineColor||f;b&&(c=c.states[b],b=d.states&&d.states[b]||{},e=J(b.lineWidth,c.lineWidth,e+J(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,f=b.lineColor||c.lineColor||
f);return{stroke:f,"stroke-width":e,fill:a}},destroy:function(){var a=this,b=a.chart,e=/AppleWebKit\/533/.test(K.navigator.userAgent),d,h,f=a.data||[],n,l;k(a,"destroy");c(a);t(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(g(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(h=f.length;h--;)(n=f[h])&&n.destroy&&n.destroy();a.points=null;clearTimeout(a.animationTimeout);D(a,function(a,b){a instanceof q&&!a.survive&&(d=e&&"group"===b?"hide":"destroy",a[d]())});
b.hoverSeries===a&&(b.hoverSeries=null);g(b.series,a);b.orderSeries();D(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var e=this,d=e.options,f=d.step,g,p=[],k=[],q;a=a||e.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);!d.connectNulls||b||c||(a=this.getValidPoints(a));t(a,function(h,g){var n=h.plotX,l=h.plotY,m=a[g-1];(h.leftCliff||m&&m.rightCliff)&&!c&&(q=!0);h.isNull&&!u(b)&&0<g?q=!d.connectNulls:h.isNull&&!b?q=!0:(0===g||q?g=["M",h.plotX,h.plotY]:e.getPointSpline?
g=e.getPointSpline(a,h,g):f?(g=1===f?["L",m.plotX,l]:2===f?["L",(m.plotX+n)/2,m.plotY,"L",(m.plotX+n)/2,l]:["L",n,m.plotY],g.push("L",n,l)):g=["L",n,l],k.push(h.x),f&&k.push(h.x),p.push.apply(p,g),q=!1)});p.xMap=k;return e.graphPath=p},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),e=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];t(this.zones,function(c,d){e.push(["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+
(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});t(e,function(e,d){var h=e[0],f=a[h];f?(f.endX=c.xMap,f.animate({d:c})):c.length&&(a[h]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),f={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?f.dashstyle=e[3]:"square"!==b.linecap&&(f["stroke-linecap"]=f["stroke-linejoin"]="round"),f=a[h].attr(f).shadow(2>d&&b.shadow));f&&(f.startX=c.xMap,f.isArea=c.isArea)})},applyZones:function(){var a=
this,b=this.chart,c=b.renderer,e=this.zones,d,f,g=this.clips||[],k,q=this.graph,n=this.area,l=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],r,v,B=b.inverted,y,u,G,D,K=!1;e.length&&(q||n)&&m&&void 0!==m.min&&(v=m.reversed,y=m.horiz,q&&q.hide(),n&&n.hide(),r=m.getExtremes(),t(e,function(e,h){d=v?y?b.plotWidth:0:y?0:m.toPixels(r.min);d=Math.min(Math.max(J(f,d),0),l);f=Math.min(Math.max(Math.round(m.toPixels(J(e.value,r.max),!0)),0),l);K&&(d=f=m.toPixels(r.max));u=Math.abs(d-
f);G=Math.min(d,f);D=Math.max(d,f);m.isXAxis?(k={x:B?D:G,y:0,width:u,height:l},y||(k.x=b.plotHeight-k.x)):(k={x:0,y:B?D:G,width:l,height:u},y&&(k.y=b.plotWidth-k.y));B&&c.isVML&&(k=m.isXAxis?{x:0,y:v?G:D,height:k.width,width:b.chartWidth}:{x:k.y-b.plotLeft-b.spacingBox.x,y:0,width:k.height,height:b.chartHeight});g[h]?g[h].animate(k):(g[h]=c.clipRect(k),q&&a["zone-graph-"+h].clip(g[h]),n&&a["zone-area-"+h].clip(g[h]));K=e.value>r.max}),this.clips=g)},invertGroups:function(a){function b(){t(["group",
"markerGroup"],function(b){c[b]&&(e.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,e=c.chart,d;c.xAxis&&(d=C(e,"resize",b),C(c,"destroy",d),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,e,d){var h=this[a],f=!h;f&&(this[a]=h=this.chart.renderer.g().attr({zIndex:e||.1}).add(d));h.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+
" "+(this.options.className||""),!0);h.attr({visibility:c})[f?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,e=a.options,d=!!a.animate&&b.renderer.isSVG&&A(e.animation).duration,f=a.visible?"inherit":"hidden",g=e.zIndex,k=a.hasRendered,q=b.seriesGroup,n=b.inverted;c=a.plotGroup("group",
"series",f,g,q);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,q);d&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===e.clip||a.sharedClipKey||k||c.clip(b.clipRect);d&&a.animate();k||(a.animationTimeout=B(function(){a.afterAnimate()},d));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,
b=this.isDirty||this.isDirtyData,c=this.group,e=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:J(e&&e.left,a.plotLeft),translateY:J(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,e=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?e.len-a.chartX+e.pos:a.chartY-e.pos},b)},
buildKDTree:function(){function a(c,e,d){var h,f;if(f=c&&c.length)return h=b.kdAxisArray[e%d],c.sort(function(a,b){return a[h]-b[h]}),f=Math.floor(f/2),{point:c[f],left:a(c.slice(0,f),e+1,d),right:a(c.slice(f+1),e+1,d)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;B(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,h,k){var p=b.point,q=e.kdAxisArray[h%
k],n,l,m=p;l=u(a[d])&&u(p[d])?Math.pow(a[d]-p[d],2):null;n=u(a[f])&&u(p[f])?Math.pow(a[f]-p[f],2):null;n=(l||0)+(n||0);p.dist=u(n)?Math.sqrt(n):Number.MAX_VALUE;p.distX=u(l)?Math.sqrt(l):Number.MAX_VALUE;q=a[q]-p[q];n=0>q?"left":"right";l=0>q?"right":"left";b[n]&&(n=c(a,b[n],h+1,k),m=n[g]<m[g]?n:p);b[l]&&Math.sqrt(q*q)<m[g]&&(a=c(a,b[l],h+1,k),m=a[g]<m[g]?a:m);return m}var e=this,d=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||
this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(M);(function(a){var C=a.Axis,A=a.Chart,F=a.correctFloat,E=a.defined,m=a.destroyObjectProperties,f=a.each,l=a.format,r=a.objectEach,u=a.pick,t=a.Series;a.StackItem=function(a,d,f,b,e){var g=a.chart.inverted;this.axis=a;this.isNegative=f;this.options=d;this.x=b;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(g?f?"left":"right":"center"),verticalAlign:d.verticalAlign||
(g?"middle":f?"bottom":"top"),y:u(d.y,g?4:f?14:-6),x:u(d.x,g?f?-6:6:0)};this.textAlign=d.textAlign||(g?f?"right":"left":"center")};a.StackItem.prototype={destroy:function(){m(this,this.axis)},render:function(a){var d=this.options,f=d.format,f=f?l(f,this):d.formatter.call(this);this.label?this.label.attr({text:f,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(f,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,
d){var f=this.axis,b=f.chart,e=f.translate(f.usePercentage?100:this.total,0,0,0,1),f=f.translate(0),f=Math.abs(e-f);a=b.xAxis[0].translate(this.x)+a;e=this.getStackBox(b,this,a,e,d,f);if(d=this.label)d.align(this.alignOptions,null,e),e=d.alignAttr,d[!1===this.options.crop||b.isInsidePlot(e.x,e.y)?"show":"hide"](!0)},getStackBox:function(a,d,f,b,e,l){var g=d.axis.reversed,k=a.inverted;a=a.plotHeight;d=d.isNegative&&!g||!d.isNegative&&g;return{x:k?d?b:b-l:f,y:k?a-f-e:d?a-b-l:a-b,width:k?l:e,height:k?
e:l}}};A.prototype.getStacks=function(){var a=this;f(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});f(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+u(d.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,d=u(this.options.reversedStacks,!0),f=a.length,b;if(!this.isXAxis){this.usePercentage=!1;for(b=f;b--;)a[d?b:f-b-1].setStackedPoints();if(this.usePercentage)for(b=0;b<f;b++)a[b].setPercentStacks()}};
C.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,f=this.stacks,b=this.stackTotalGroup;b||(this.stackTotalGroup=b=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());b.translate(a.plotLeft,a.plotTop);r(f,function(a){r(a,function(a){a.render(b)})})};C.prototype.resetStacks=function(){var a=this,d=a.stacks;a.isXAxis||r(d,function(d){r(d,function(b,e){b.touched<a.stacksTouched?(b.destroy(),delete d[e]):(b.total=null,b.cum=null)})})};C.prototype.cleanStacks=function(){var a;
this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),r(a,function(a){r(a,function(a){a.cum=a.total})}))};t.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var f=this.processedXData,d=this.processedYData,k=[],b=d.length,e=this.options,l=e.threshold,m=e.startFromThreshold?l:0,n=e.stack,e=e.stacking,r=this.stackKey,t="-"+r,c=this.negStacks,G=this.yAxis,q=G.stacks,B=G.oldStacks,K,p,z,I,A,h,w;G.stacksTouched+=
1;for(A=0;A<b;A++)h=f[A],w=d[A],K=this.getStackIndicator(K,h,this.index),I=K.key,z=(p=c&&w<(m?0:l))?t:r,q[z]||(q[z]={}),q[z][h]||(B[z]&&B[z][h]?(q[z][h]=B[z][h],q[z][h].total=null):q[z][h]=new a.StackItem(G,G.options.stackLabels,p,h,n)),z=q[z][h],null!==w&&(z.points[I]=z.points[this.index]=[u(z.cum,m)],E(z.cum)||(z.base=I),z.touched=G.stacksTouched,0<K.index&&!1===this.singleStacks&&(z.points[I][0]=z.points[this.index+","+h+",0"][0])),"percent"===e?(p=p?r:t,c&&q[p]&&q[p][h]?(p=q[p][h],z.total=p.total=
Math.max(p.total,z.total)+Math.abs(w)||0):z.total=F(z.total+(Math.abs(w)||0))):z.total=F(z.total+(w||0)),z.cum=u(z.cum,m)+(w||0),null!==w&&(z.points[I].push(z.cum),k[A]=z.cum);"percent"===e&&(G.usePercentage=!0);this.stackedYData=k;G.oldStacks={}}};t.prototype.setPercentStacks=function(){var a=this,d=a.stackKey,k=a.yAxis.stacks,b=a.processedXData,e;f([d,"-"+d],function(d){for(var f=b.length,g,l;f--;)if(g=b[f],e=a.getStackIndicator(e,g,a.index,d),g=(l=k[d]&&k[d][g])&&l.points[e.key])l=l.total?100/
l.total:0,g[0]=F(g[0]*l),g[1]=F(g[1]*l),a.stackedYData[f]=g[1]})};t.prototype.getStackIndicator=function(a,d,f,b){!E(a)||a.x!==d||b&&a.key!==b?a={x:d,index:0,key:b}:a.index++;a.key=[f,d,a.index].join();return a}})(M);(function(a){var C=a.addEvent,A=a.animate,F=a.Axis,E=a.createElement,m=a.css,f=a.defined,l=a.each,r=a.erase,u=a.extend,t=a.fireEvent,g=a.inArray,d=a.isNumber,k=a.isObject,b=a.isArray,e=a.merge,v=a.objectEach,y=a.pick,n=a.Point,D=a.Series,J=a.seriesTypes,c=a.setAnimation,G=a.splat;u(a.Chart.prototype,
{addSeries:function(a,b,c){var e,d=this;a&&(b=y(b,!0),t(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return e},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",g=this.options;a=e(a,{index:this[f].length,isX:b});b=new F(this,a);g[f]=G(g[f]||{});g[f].push(a);y(c,!0)&&this.redraw(d);return b},showLoading:function(a){var b=this,c=b.options,e=b.loadingDiv,d=c.loading,f=function(){e&&m(e,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+
"px",height:b.plotHeight+"px"})};e||(b.loadingDiv=e=E("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=E("span",{className:"highcharts-loading-inner"},null,e),C(b,"redraw",f));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;m(e,u(d.style,{zIndex:10}));m(b.loadingSpan,d.labelStyle);b.loadingShown||(m(e,{opacity:0,display:""}),A(e,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;f()},hideLoading:function(){var a=
this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",A(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){m(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),update:function(a,b,c){var k=this,n={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},q=a.chart,m,h,r=[];if(q){e(!0,k.options.chart,q);"className"in q&&k.setClassName(q.className);if("inverted"in q||"polar"in q)k.propFromSeries(),m=!0;"alignTicks"in q&&(m=!0);v(q,function(a,b){-1!==g("chart."+b,k.propsRequireUpdateSeries)&&(h=!0);-1!==g(b,k.propsRequireDirtyBox)&&
(k.isDirtyBox=!0)});"style"in q&&k.renderer.setStyle(q.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&e(!0,this.options.plotOptions,a.plotOptions);v(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[n[b]])k[n[b]](a);"chart"!==b&&-1!==g(b,k.propsRequireUpdateSeries)&&(h=!0)});l("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(l(G(a[b]),function(a,e){(e=f(a.id)&&k.get(a.id)||k[b][e])&&e.coll===b&&(e.update(a,
!1),c&&(e.touched=!0));if(!e&&c)if("series"===b)k.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)k.addAxis(a,"xAxis"===b,!1).touched=!0}),c&&l(k[b],function(a){a.touched?delete a.touched:r.push(a)}))});l(r,function(a){a.remove(!1)});m&&l(k.axes,function(a){a.update({},!1)});h&&l(k.series,function(a){a.update({},!1)});a.loading&&e(!0,k.options.loading,a.loading);m=q&&q.width;q=q&&q.height;d(m)&&m!==k.chartWidth||d(q)&&q!==k.chartHeight?k.setSize(m,q):y(b,!0)&&k.redraw()},setSubtitle:function(a){this.setTitle(void 0,
a)}});u(n.prototype,{update:function(a,b,c,e){function d(){f.applyOptions(a);null===f.y&&h&&(f.graphic=h.destroy());k(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=h.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));p=f.index;g.updateParallelArrays(f,p);q.data[p]=k(q.data[p],!0)||k(a,!0)?f.options:a;g.isDirty=g.isDirtyData=!0;!g.fixedBox&&g.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===q.legendType&&(l.isDirtyLegend=!0);b&&l.redraw(c)}var f=
this,g=f.series,h=f.graphic,p,l=g.chart,q=g.options;b=y(b,!0);!1===e?d():f.firePointEvent("update",{options:a},d)},remove:function(a,b){this.series.removePoint(g(this,this.series.data),a,b)}});u(D.prototype,{addPoint:function(a,b,c,e){var d=this.options,f=this.data,g=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,k=d.data,p,l,q=this.xData,n,m;b=y(b,!0);p={series:this};this.pointClass.prototype.applyOptions.apply(p,[a]);m=p.x;n=q.length;if(this.requireSorting&&m<q[n-1])for(l=!0;n&&q[n-1]>m;)n--;
this.updateParallelArrays(p,"splice",n,0,0);this.updateParallelArrays(p,n);h&&p.name&&(h[m]=p.name);k.splice(n,0,a);l&&(this.data.splice(n,0,null),this.processData());"point"===d.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(p,"shift"),k.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(e)},removePoint:function(a,b,e){var d=this,f=d.data,g=f[a],k=d.points,h=d.chart,l=function(){k&&k.length===f.length&&k.splice(a,1);f.splice(a,1);
d.options.data.splice(a,1);d.updateParallelArrays(g||{series:d},"splice",a,1);g&&g.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw()};c(e,h);b=y(b,!0);g?g.firePointEvent("remove",null,l):l()},remove:function(a,b,c){function e(){d.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();y(a,!0)&&f.redraw(b)}var d=this,f=d.chart;!1!==c?t(d,"remove",null,e):e()},update:function(a,b){var c=this,d=c.chart,f=c.userOptions,g=c.oldType||c.type,k=a.type||f.type||d.options.chart.type,h=J[g].prototype,n,
q=["group","markerGroup","dataLabelsGroup","navigatorSeries","baseSeries"],m=c.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,b);if(k&&k!==g||void 0!==a.zIndex)q.length=0;l(q,function(a){q[a]=c[a];delete c[a]});a=e(f,m,{index:c.index,pointStart:c.xData[0]},{data:c.options.data},a);c.remove(!1,null,!1);for(n in h)c[n]=void 0;u(c,J[k||g].prototype);l(q,function(a){c[a]=q[a]});c.init(d,a);c.oldType=g;d.linkSeries();y(b,!0)&&d.redraw(!1)}});
u(F.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=e(this.userOptions,a);this.destroy(!0);this.init(c,u(a,{events:void 0}));c.isDirtyBox=!0;y(b,!0)&&c.redraw()},remove:function(a){for(var c=this.chart,e=this.coll,d=this.series,f=d.length;f--;)d[f]&&d[f].remove(!1);r(c.axes,this);r(c[e],this);b(c.options[e])?c.options[e].splice(this.options.index,1):delete c.options[e];l(c[e],function(a,b){a.options.index=b});this.destroy();c.isDirtyBox=!0;y(a,!0)&&c.redraw()},
setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(M);(function(a){var C=a.color,A=a.each,F=a.map,E=a.pick,m=a.Series,f=a.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(f){var l=[],m=[],t=this.xAxis,g=this.yAxis,d=g.stacks[this.stackKey],k={},b=this.index,e=g.series,v=e.length,y,n=E(g.options.reversedStacks,!0)?1:-1,D;f=f||this.points;if(this.options.stacking){for(D=0;D<f.length;D++)k[f[D].x]=
f[D];a.objectEach(d,function(a,b){null!==a.total&&m.push(b)});m.sort(function(a,b){return a-b});y=F(e,function(){return this.visible});A(m,function(a,c){var e=0,f,r;if(k[a]&&!k[a].isNull)l.push(k[a]),A([-1,1],function(e){var g=1===e?"rightNull":"leftNull",l=0,q=d[m[c+e]];if(q)for(D=b;0<=D&&D<v;)f=q.points[D],f||(D===b?k[a][g]=!0:y[D]&&(r=d[a].points[D])&&(l-=r[1]-r[0])),D+=n;k[a][1===e?"rightCliff":"leftCliff"]=l});else{for(D=b;0<=D&&D<v;){if(f=d[a].points[D]){e=f[1];break}D+=n}e=g.translate(e,0,
1,0,1);l.push({isNull:!0,plotX:t.translate(a,0,0,0,1),x:a,plotY:e,yBottom:e})}})}return l},getGraphPath:function(a){var f=m.prototype.getGraphPath,l=this.options,t=l.stacking,g=this.yAxis,d,k,b=[],e=[],v=this.index,y,n=g.stacks[this.stackKey],D=l.threshold,A=g.getThreshold(l.threshold),c,l=l.connectNulls||"percent"===t,G=function(c,d,f){var k=a[c];c=t&&n[k.x].points[v];var l=k[f+"Null"]||0;f=k[f+"Cliff"]||0;var q,m,k=!0;f||l?(q=(l?c[0]:c[1])+f,m=c[0]+f,k=!!l):!t&&a[d]&&a[d].isNull&&(q=m=D);void 0!==
q&&(e.push({plotX:y,plotY:null===q?A:g.getThreshold(q),isNull:k,isCliff:!0}),b.push({plotX:y,plotY:null===m?A:g.getThreshold(m),doCurve:!1}))};a=a||this.points;t&&(a=this.getStackPoints(a));for(d=0;d<a.length;d++)if(k=a[d].isNull,y=E(a[d].rectPlotX,a[d].plotX),c=E(a[d].yBottom,A),!k||l)l||G(d,d-1,"left"),k&&!t&&l||(e.push(a[d]),b.push({x:d,plotX:y,plotY:c})),l||G(d,d+1,"right");d=f.call(this,e,!0,!0);b.reversed=!0;k=f.call(this,b,!0,!0);k.length&&(k[0]="L");k=d.concat(k);f=f.call(this,e,!1,l);k.xMap=
d.xMap;this.areaPath=k;return f},drawGraph:function(){this.areaPath=[];m.prototype.drawGraph.apply(this);var a=this,f=this.areaPath,u=this.options,t=[["area","highcharts-area",this.color,u.fillColor]];A(this.zones,function(f,d){t.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+f.className,f.color||a.color,f.fillColor||u.fillColor])});A(t,function(g){var d=g[0],k=a[d];k?(k.endX=f.xMap,k.animate({d:f})):(k=a[d]=a.chart.renderer.path(f).addClass(g[1]).attr({fill:E(g[3],C(g[2]).setOpacity(E(u.fillOpacity,
.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=f.xMap;k.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,F,E){var m=F.plotX,f=F.plotY,l=a[E-1];E=a[E+1];var r,u,t,g;if(l&&!l.isNull&&!1!==l.doCurve&&!F.isCliff&&E&&!E.isNull&&!1!==E.doCurve&&!F.isCliff){a=l.plotY;t=E.plotX;E=E.plotY;var d=0;r=(1.5*m+l.plotX)/2.5;u=(1.5*f+a)/2.5;t=(1.5*m+t)/2.5;g=(1.5*f+E)/2.5;t!==r&&(d=
(g-u)*(t-m)/(t-r)+f-g);u+=d;g+=d;u>a&&u>f?(u=Math.max(a,f),g=2*f-u):u<a&&u<f&&(u=Math.min(a,f),g=2*f-u);g>E&&g>f?(g=Math.max(E,f),u=2*f-g):g<E&&g<f&&(g=Math.min(E,f),u=2*f-g);F.rightContX=t;F.rightContY=g}F=["C",C(l.rightContX,l.plotX),C(l.rightContY,l.plotY),C(r,m),C(u,f),m,f];l.rightContX=l.rightContY=null;return F}})})(M);(function(a){var C=a.seriesTypes.area.prototype,A=a.seriesType;A("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,
drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var C=a.animObject,A=a.color,F=a.each,E=a.extend,m=a.isNumber,f=a.merge,l=a.pick,r=a.Series,u=a.seriesType,t=a.svg;u("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},
softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){r.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&F(d.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,f=a.xAxis,b=a.yAxis,e=f.reversed,m,r={},n=0;!1===d.grouping?n=1:F(a.chart.series,function(c){var e=c.options,
d=c.yAxis,f;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||b.len!==d.len||b.pos!==d.pos||(e.stacking?(m=c.stackKey,void 0===r[m]&&(r[m]=n++),f=r[m]):!1!==e.grouping&&(f=n++),c.columnIndex=f)});var t=Math.min(Math.abs(f.transA)*(f.ordinalSlope||d.pointRange||f.closestPointRange||f.tickInterval||1),f.len),u=t*d.groupPadding,c=(t-2*u)/(n||1),d=Math.min(d.maxPointWidth||f.len,l(d.pointWidth,c*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(c-d)/2+(u+((a.columnIndex||0)+
(e?1:0))*c-t/2)*(e?-1:1)};return a.columnMetrics},crispCol:function(a,d,f,b){var e=this.chart,g=this.borderWidth,k=-(g%2?.5:0),g=g%2?.5:1;e.inverted&&e.renderer.isVML&&(g+=1);this.options.crisp&&(f=Math.round(a+f)+k,a=Math.round(a)+k,f-=a);b=Math.round(d+b)+g;k=.5>=Math.abs(d)&&.5<b;d=Math.round(d)+g;b-=d;k&&b&&(--d,b+=1);return{x:a,y:d,width:f,height:b}},translate:function(){var a=this,d=a.chart,f=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=l(f.borderWidth,b?0:1),e=a.yAxis,
m=a.translatedThreshold=e.getThreshold(f.threshold),t=l(f.minPointLength,5),n=a.getColumnMetrics(),u=n.width,A=a.barW=Math.max(u,1+2*b),c=a.pointXOffset=n.offset;d.inverted&&(m-=.5);f.pointPadding&&(A=Math.ceil(A));r.prototype.translate.apply(a);F(a.points,function(b){var f=l(b.yBottom,m),g=999+Math.abs(f),g=Math.min(Math.max(-g,b.plotY),e.len+g),k=b.plotX+c,n=A,r=Math.min(g,f),v,y=Math.max(g,f)-r;Math.abs(y)<t&&t&&(y=t,v=!e.reversed&&!b.negative||e.reversed&&b.negative,r=Math.abs(r-m)>t?f-t:m-(v?
t:0));b.barX=k;b.pointWidth=u;b.tooltipPos=d.inverted?[e.len+e.pos-d.plotLeft-g,a.xAxis.len-k-n/2,y]:[k+n/2,g+e.pos-d.plotTop,y];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[k,m,n,0]:[k,r,n,y])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var g=this.options,b,e=this.pointAttrToOptions||{};b=e.stroke||"borderColor";var l=e["stroke-width"]||
"borderWidth",m=a&&a.color||this.color,n=a[b]||g[b]||this.color||m,r=a[l]||g[l]||this[l]||0,e=g.dashStyle;a&&this.zones.length&&(m=a.getZone(),m=a.options.color||m&&m.color||this.color);d&&(a=f(g.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,m=a.color||void 0!==d&&A(m).brighten(a.brightness).get()||m,n=a[b]||n,r=a[l]||r,e=a.dashStyle||e);b={fill:m,stroke:n,"stroke-width":r};e&&(b.dashstyle=e);return b},drawPoints:function(){var a=this,d=this.chart,k=a.options,b=d.renderer,e=
k.animationLimit||250,l;F(a.points,function(g){var n=g.graphic;if(m(g.plotY)&&null!==g.y){l=g.shapeArgs;if(n)n[d.pointCount<e?"animate":"attr"](f(l));else g.graphic=n=b[g.shapeType](l).add(g.group||a.group);k.borderRadius&&n.attr({r:k.borderRadius});n.attr(a.pointAttribs(g,g.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);n.addClass(g.getClassName(),!0)}else n&&(g.graphic=n.destroy())})},animate:function(a){var d=this,f=this.yAxis,b=d.options,e=this.chart.inverted,g={};t&&(a?
(g.scaleY=.001,a=Math.min(f.pos+f.len,Math.max(f.pos,f.toPixels(b.threshold))),e?g.translateX=a-f.len:g.translateY=a,d.group.attr(g)):(g[e?"translateX":"translateY"]=f.pos,d.group.animate(g,E(C(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&F(d.series,function(d){d.type===a.type&&(d.isDirty=!0)});r.prototype.remove.apply(a,arguments)}})})(M);(function(a){a=a.seriesType;a("bar","column",
null,{inverted:!0})})(M);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],
takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(M);(function(a){var C=a.pick,A=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,E=this.chart,m=2*(a.slicedOffset||0),f=E.plotWidth-2*m,E=E.plotHeight-2*m,l=a.center,l=[C(l[0],"50%"),C(l[1],"50%"),a.size||"100%",a.innerSize||0],r=Math.min(f,E),u,t;for(u=0;4>u;++u)t=l[u],a=2>u||2===u&&/%$/.test(t),l[u]=A(t,[f,E,r,l[2]][u])+(a?m:0);l[3]>l[2]&&(l[3]=l[2]);return l}}})(M);
(function(a){var C=a.addEvent,A=a.defined,F=a.each,E=a.extend,m=a.inArray,f=a.noop,l=a.pick,r=a.Point,u=a.Series,t=a.seriesType,g=a.setAnimation;t("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,
shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,b=d.points,e=d.startAngleRad;a||(F(b,function(a){var b=a.graphic,f=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:e,end:e}),b.animate({r:f.r,start:f.start,end:f.end},d.options.animation))}),d.animate=null)},updateTotals:function(){var a,f=0,b=this.points,e=b.length,g,
l=this.options.ignoreHiddenPoint;for(a=0;a<e;a++)g=b[a],f+=l&&!g.visible?0:g.isNull?0:g.y;this.total=f;for(a=0;a<e;a++)g=b[a],g.percentage=0<f&&(g.visible||!l)?g.y/f*100:0,g.total=f},generatePoints:function(){u.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var d=0,b=this.options,e=b.slicedOffset,f=e+(b.borderWidth||0),g,n,m,r=b.startAngle||0,c=this.startAngleRad=Math.PI/180*(r-90),r=(this.endAngleRad=Math.PI/180*(l(b.endAngle,r+360)-90))-c,t=
this.points,q,B=b.dataLabels.distance,b=b.ignoreHiddenPoint,u,p=t.length,z;a||(this.center=a=this.getCenter());this.getX=function(b,c,e){m=Math.asin(Math.min((b-a[1])/(a[2]/2+e.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(m)*(a[2]/2+e.labelDistance)};for(u=0;u<p;u++){z=t[u];z.labelDistance=l(z.options.dataLabels&&z.options.dataLabels.distance,B);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,z.labelDistance);g=c+d*r;if(!b||z.visible)d+=z.percentage/100;n=c+d*r;z.shapeType="arc";z.shapeArgs=
{x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*g)/1E3,end:Math.round(1E3*n)/1E3};m=(n+g)/2;m>1.5*Math.PI?m-=2*Math.PI:m<-Math.PI/2&&(m+=2*Math.PI);z.slicedTranslation={translateX:Math.round(Math.cos(m)*e),translateY:Math.round(Math.sin(m)*e)};n=Math.cos(m)*a[2]/2;q=Math.sin(m)*a[2]/2;z.tooltipPos=[a[0]+.7*n,a[1]+.7*q];z.half=m<-Math.PI/2||m>Math.PI/2?1:0;z.angle=m;g=Math.min(f,z.labelDistance/5);z.labelPos=[a[0]+n+Math.cos(m)*z.labelDistance,a[1]+q+Math.sin(m)*z.labelDistance,a[0]+n+Math.cos(m)*
g,a[1]+q+Math.sin(m)*g,a[0]+n,a[1]+q,0>z.labelDistance?"center":z.half?"right":"left",m]}},drawGraph:null,drawPoints:function(){var a=this,f=a.chart.renderer,b,e,g,l,n=a.options.shadow;n&&!a.shadowGroup&&(a.shadowGroup=f.g("shadow").add(a.group));F(a.points,function(d){if(!d.isNull){e=d.graphic;l=d.shapeArgs;b=d.getTranslate();var k=d.shadowGroup;n&&!k&&(k=d.shadowGroup=f.g("shadow").add(a.shadowGroup));k&&k.attr(b);g=a.pointAttribs(d,d.selected&&"select");e?e.setRadialReference(a.center).attr(g).animate(E(l,
b)):(d.graphic=e=f[d.shapeType](l).setRadialReference(a.center).attr(b).add(a.group),d.visible||e.attr({visibility:"hidden"}),e.attr(g).attr({"stroke-linejoin":"round"}).shadow(n,k));e.addClass(d.getClassName())}})},searchPoint:f,sortByAngle:function(a,f){a.sort(function(a,e){return void 0!==a.angle&&(e.angle-a.angle)*f})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:f},{init:function(){r.prototype.init.apply(this,arguments);var a=this,f;a.name=
l(a.name,"Slice");f=function(b){a.slice("select"===b.type)};C(a,"select",f);C(a,"unselect",f);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,f){var b=this,e=b.series,d=e.chart,g=e.options.ignoreHiddenPoint;f=l(f,g);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,e.options.data[m(b,e.data)]=b.options,F(["graphic","dataLabel","connector","shadowGroup"],function(e){if(b[e])b[e][a?"show":"hide"](!0)}),b.legendItem&&d.legend.colorizeItem(b,
a),a||"hover"!==b.state||b.setState(""),g&&(e.isDirty=!0),f&&d.redraw())},slice:function(a,f,b){var e=this.series;g(b,e.chart);l(f,!0);this.sliced=this.options.sliced=A(a)?a:!this.sliced;e.options.data[m(this,e.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=this.shapeArgs;return this.sliced||!this.visible?
[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r,start:d.start,end:d.end})}})})(M);(function(a){var C=a.addEvent,A=a.arrayMax,F=a.defined,E=a.each,m=a.extend,f=a.format,l=a.map,r=a.merge,u=a.noop,t=a.pick,g=a.relativeLength,d=a.Series,k=a.seriesTypes,b=a.stableSort;a.distribute=function(a,d){function e(a,b){return a.target-b.target}var f,g=!0,k=a,c=[],m;m=0;for(f=a.length;f--;)m+=a[f].size;if(m>d){b(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(m=f=0;m<=
d;)m+=a[f].size,f++;c=a.splice(f-1,a.length)}b(a,e);for(a=l(a,function(a){return{size:a.size,targets:[a.target]}});g;){for(f=a.length;f--;)g=a[f],m=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,m-g.size/2),d-g.size);f=a.length;for(g=!1;f--;)0<f&&a[f-1].pos+a[f-1].size>a[f].pos&&(a[f-1].size+=a[f].size,a[f-1].targets=a[f-1].targets.concat(a[f].targets),a[f-1].pos+a[f-1].size>d&&(a[f-1].pos=d-a[f-1].size),a.splice(f,1),g=!0)}f=0;E(a,function(a){var b=0;E(a.targets,
function(){k[f].pos=a.pos+b;b+=k[f].size;f++})});k.push.apply(k,c);b(k,e)};d.prototype.drawDataLabels=function(){var b=this,d=b.options,g=d.dataLabels,k=b.points,l,m,c=b.hasRendered||0,u,q,B=t(g.defer,!!d.animation),A=b.chart.renderer;if(g.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(g),q=b.plotGroup("dataLabelsGroup","data-labels",B&&!c?"hidden":"visible",g.zIndex||6),B&&(q.attr({opacity:+c}),c||C(b,"afterAnimate",function(){b.visible&&q.show(!0);q[d.animation?"animate":"attr"]({opacity:1},
{duration:200})})),m=g,E(k,function(c){var e,k=c.dataLabel,n,h,p=c.connector,v=!k,B;l=c.dlOptions||c.options&&c.options.dataLabels;if(e=t(l&&l.enabled,m.enabled)&&null!==c.y)g=r(m,l),n=c.getLabelConfig(),u=g.format?f(g.format,n):g.formatter.call(n,g),B=g.style,n=g.rotation,B.color=t(g.color,B.color,b.color,"#000000"),"contrast"===B.color&&(c.contrastColor=A.getContrast(c.color||b.color),B.color=g.inside||0>t(c.labelDistance,g.distance)||d.stacking?c.contrastColor:"#000000"),d.cursor&&(B.cursor=d.cursor),
h={fill:g.backgroundColor,stroke:g.borderColor,"stroke-width":g.borderWidth,r:g.borderRadius||0,rotation:n,padding:g.padding,zIndex:1},a.objectEach(h,function(a,b){void 0===a&&delete h[b]});!k||e&&F(u)?e&&F(u)&&(k?h.text=u:(k=c.dataLabel=A[n?"text":"label"](u,0,-9999,g.shape,null,null,g.useHTML,null,"data-label"),k.addClass("highcharts-data-label-color-"+c.colorIndex+" "+(g.className||"")+(g.useHTML?"highcharts-tracker":""))),k.attr(h),k.css(B).shadow(g.shadow),k.added||k.add(q),b.alignDataLabel(c,
k,g,null,v)):(c.dataLabel=k=k.destroy(),p&&(c.connector=p.destroy()))})};d.prototype.alignDataLabel=function(a,b,d,f,g){var e=this.chart,c=e.inverted,k=t(a.plotX,-9999),l=t(a.plotY,-9999),n=b.getBBox(),r,p=d.rotation,v=d.align,u=this.visible&&(a.series.forceDL||e.isInsidePlot(k,Math.round(l),c)||f&&e.isInsidePlot(k,c?f.x+1:f.y+f.height-1,c)),y="justify"===t(d.overflow,"justify");if(u&&(r=d.style.fontSize,r=e.renderer.fontMetrics(r,b).b,f=m({x:c?this.yAxis.len-l:k,y:Math.round(c?this.xAxis.len-k:l),
width:0,height:0},f),m(d,{width:n.width,height:n.height}),p?(y=!1,k=e.renderer.rotCorr(r,p),k={x:f.x+d.x+f.width/2+k.x,y:f.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*f.height},b[g?"attr":"animate"](k).attr({align:v}),l=(p+720)%360,l=180<l&&360>l,"left"===v?k.y-=l?n.height:0:"center"===v?(k.x-=n.width/2,k.y-=n.height/2):"right"===v&&(k.x-=n.width,k.y-=l?0:n.height)):(b.align(d,null,f),k=b.alignAttr),y?a.isLabelJustified=this.justifyDataLabel(b,d,k,n,f,g):t(d.crop,!0)&&(u=e.isInsidePlot(k.x,
k.y)&&e.isInsidePlot(k.x+n.width,k.y+n.height)),d.shape&&!p))b[g?"attr":"animate"]({anchorX:c?e.plotWidth-a.plotY:a.plotX,anchorY:c?e.plotHeight-a.plotX:a.plotY});u||(b.attr({y:-9999}),b.placed=!1)};d.prototype.justifyDataLabel=function(a,b,d,f,g,k){var c=this.chart,e=b.align,l=b.verticalAlign,m,n,p=a.box?0:a.padding||0;m=d.x+p;0>m&&("right"===e?b.align="left":b.x=-m,n=!0);m=d.x+f.width-p;m>c.plotWidth&&("left"===e?b.align="right":b.x=c.plotWidth-m,n=!0);m=d.y+p;0>m&&("bottom"===l?b.verticalAlign=
"top":b.y=-m,n=!0);m=d.y+f.height-p;m>c.plotHeight&&("top"===l?b.verticalAlign="bottom":b.y=c.plotHeight-m,n=!0);n&&(a.placed=!k,a.align(b,null,g));return n};k.pie&&(k.pie.prototype.drawDataLabels=function(){var b=this,f=b.data,g,k=b.chart,l=b.options.dataLabels,m=t(l.connectorPadding,10),c=t(l.connectorWidth,1),r=k.plotWidth,q=k.plotHeight,u,C=b.center,p=C[2]/2,z=C[1],I,L,h,w,M=[[],[]],H,O,Q,R,x=[0,0,0,0];b.visible&&(l.enabled||b._hasPointLabels)&&(E(f,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),d.prototype.drawDataLabels.apply(b),E(f,function(a){a.dataLabel&&a.visible&&(M[a.half].push(a),a.dataLabel._pos=null)}),E(M,function(c,d){var e,f,n=c.length,v=[],u;if(n)for(b.sortByAngle(c,d-.5),0<b.maxLabelDistance&&(e=Math.max(0,z-p-b.maxLabelDistance),f=Math.min(z+p+b.maxLabelDistance,k.plotHeight),E(c,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,z-p-a.labelDistance),a.bottom=
Math.min(z+p+a.labelDistance,k.plotHeight),u=a.dataLabel.getBBox().height||21,a.positionsIndex=v.push({target:a.labelPos[1]-a.top+u/2,size:u,rank:a.y})-1)}),a.distribute(v,f+u-e)),R=0;R<n;R++)g=c[R],f=g.positionsIndex,h=g.labelPos,I=g.dataLabel,Q=!1===g.visible?"hidden":"inherit",e=h[1],v&&F(v[f])?void 0===v[f].pos?Q="hidden":(w=v[f].size,O=g.top+v[f].pos):O=e,delete g.positionIndex,H=l.justify?C[0]+(d?-1:1)*(p+g.labelDistance):b.getX(O<g.top+2||O>g.bottom-2?e:O,d,g),I._attr={visibility:Q,align:h[6]},
I._pos={x:H+l.x+({left:m,right:-m}[h[6]]||0),y:O+l.y-10},h.x=H,h.y=O,t(l.crop,!0)&&(L=I.getBBox().width,e=null,H-L<m?(e=Math.round(L-H+m),x[3]=Math.max(e,x[3])):H+L>r-m&&(e=Math.round(H+L-r+m),x[1]=Math.max(e,x[1])),0>O-w/2?x[0]=Math.max(Math.round(-O+w/2),x[0]):O+w/2>q&&(x[2]=Math.max(Math.round(O+w/2-q),x[2])),I.sideOverflow=e)}),0===A(x)||this.verifyDataLabelOverflow(x))&&(this.placeDataLabels(),c&&E(this.points,function(a){var e;u=a.connector;if((I=a.dataLabel)&&I._pos&&a.visible&&0<a.labelDistance){Q=
I._attr.visibility;if(e=!u)a.connector=u=k.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(b.dataLabelsGroup),u.attr({"stroke-width":c,stroke:l.connectorColor||a.color||"#666666"});u[e?"attr":"animate"]({d:b.connectorPath(a.labelPos)});u.attr("visibility",Q)}else u&&(a.connector=u.destroy())}))},k.pie.prototype.connectorPath=function(a){var b=a.x,d=a.y;return t(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),d,"C",b,d,2*a[2]-a[4],
2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){E(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},k.pie.prototype.alignDataLabel=u,k.pie.prototype.verifyDataLabelOverflow=
function(a){var b=this.center,d=this.options,e=d.center,f=d.minSize||80,k,c=null!==d.size;c||(null!==e[0]?k=Math.max(b[2]-Math.max(a[1],a[3]),f):(k=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==e[1]?k=Math.max(Math.min(k,b[2]-Math.max(a[0],a[2])),f):(k=Math.max(Math.min(k,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),k<b[2]?(b[2]=k,b[3]=Math.min(g(d.innerSize||0,k),k),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):c=!0);return c});k.column&&(k.column.prototype.alignDataLabel=function(a,
b,f,g,k){var e=this.chart.inverted,c=a.series,l=a.dlBox||a.shapeArgs,m=t(a.below,a.plotY>t(this.translatedThreshold,c.yAxis.len)),n=t(f.inside,!!this.options.stacking);l&&(g=r(l),0>g.y&&(g.height+=g.y,g.y=0),l=g.y+g.height-c.yAxis.len,0<l&&(g.height-=l),e&&(g={x:c.yAxis.len-g.y-g.height,y:c.xAxis.len-g.x-g.width,width:g.height,height:g.width}),n||(e?(g.x+=m?0:g.width,g.width=0):(g.y+=m?g.height:0,g.height=0)));f.align=t(f.align,!e||n?"center":m?"right":"left");f.verticalAlign=t(f.verticalAlign,e||
n?"middle":m?"top":"bottom");d.prototype.alignDataLabel.call(this,a,b,f,g,k);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(M);(function(a){var C=a.Chart,A=a.each,F=a.objectEach,E=a.pick,m=a.addEvent;C.prototype.callbacks.push(function(a){function f(){var f=[];A(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&F(a.stacks,function(a){F(a,function(a){f.push(a.label)})})});A(a.series||[],function(a){var l=a.options.dataLabels,g=a.dataLabelCollections||
["dataLabel"];(l.enabled||a._hasPointLabels)&&!l.allowOverlap&&a.visible&&A(g,function(d){A(a.points,function(a){a[d]&&(a[d].labelrank=E(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)}f();m(a,"redraw",f)});C.prototype.hideOverlappingLabels=function(a){var f=a.length,m,u,t,g,d,k,b,e,v,y=function(a,b,d,c,e,f,g,k){return!(e>a+d||e+g<a||f>b+c||f+k<b)};for(u=0;u<f;u++)if(m=a[u])m.oldOpacity=m.opacity,m.newOpacity=1,m.width||(t=m.getBBox(),m.width=t.width,m.height=
t.height);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(u=0;u<f;u++)for(t=a[u],m=u+1;m<f;++m)if(g=a[m],t&&g&&t!==g&&t.placed&&g.placed&&0!==t.newOpacity&&0!==g.newOpacity&&(d=t.alignAttr,k=g.alignAttr,b=t.parentGroup,e=g.parentGroup,v=2*(t.box?0:t.padding||0),d=y(d.x+b.translateX,d.y+b.translateY,t.width-v,t.height-v,k.x+e.translateX,k.y+e.translateY,g.width-v,g.height-v)))(t.labelrank<g.labelrank?t:g).newOpacity=0;A(a,function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&
a.placed&&(d?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(M);(function(a){var C=a.addEvent,A=a.Chart,F=a.createElement,E=a.css,m=a.defaultOptions,f=a.defaultPlotOptions,l=a.each,r=a.extend,u=a.fireEvent,t=a.hasTouch,g=a.inArray,d=a.isObject,k=a.Legend,b=a.merge,e=a.pick,v=a.Point,y=a.Series,n=a.seriesTypes,D=a.svg,J;J=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,d=function(a){var c=b.getPointFromEvent(a);
void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};l(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(l(a.trackerGroups,function(c){if(a[c]){a[c].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(t)a[c].on("touchstart",d);a.options.cursor&&a[c].css(E).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=
this,b=a.options,d=b.trackByArea,e=[].concat(d?a.areaPath:a.graphPath),f=e.length,g=a.chart,k=g.pointer,m=g.renderer,n=g.options.tooltip.snap,h=a.tracker,r,u=function(){if(g.hoverSeries!==a)a.onMouseOver()},v="rgba(192,192,192,"+(D?.0001:.002)+")";if(f&&!d)for(r=f+1;r--;)"M"===e[r]&&e.splice(r+1,0,e[r+1]-n,e[r+2],"L"),(r&&"M"===e[r]||r===f)&&e.splice(r,0,"L",e[r-2]+n,e[r-1]);h?h.attr({d:e}):a.graph&&(a.tracker=m.path(e).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:v,
fill:d?v:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*n),zIndex:2}).add(a.group),l([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",u).on("mouseout",function(a){k.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(t)a.on("touchstart",u)}))}};n.column&&(n.column.prototype.drawTracker=J.drawTrackerPoint);n.pie&&(n.pie.prototype.drawTracker=J.drawTrackerPoint);n.scatter&&(n.scatter.prototype.drawTracker=J.drawTrackerPoint);r(k.prototype,{setItemEvents:function(a,
d,e){var c=this,f=c.chart.renderer.boxWrapper,g="highcharts-legend-"+(a.series?"point":"series")+"-active";(e?d:a.legendGroup).on("mouseover",function(){a.setState("hover");f.addClass(g);d.css(c.options.itemHoverStyle)}).on("mouseout",function(){d.css(b(a.visible?c.itemStyle:c.itemHiddenStyle));f.removeClass(g);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):u(a,"legendItemClick",b,c)})},
createCheckboxForItem:function(a){a.checkbox=F("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m.legend.itemStyle.cursor="pointer";r(A.prototype,{showResetZoom:function(){var a=this,b=m.lang,d=a.options.chart.resetZoomButton,e=d.theme,f=e.states,g="chart"===d.relativeTo?null:"plotBox";this.resetZoomButton=
a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},e,f&&f.hover).attr({align:d.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,g)},zoomOut:function(){var a=this;u(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,f=!1,g;!a||a.resetSelection?(l(this.axes,function(a){b=a.zoom()}),c.initiated=!1):l(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;c[d.isXAxis?"zoomX":"zoomY"]&&(b=d.zoom(a.min,
a.max),d.displayBtn&&(f=!0))});g=this.resetZoomButton;f&&!g?this.showResetZoom():!f&&d(g)&&(this.resetZoomButton=g.destroy());b&&this.redraw(e(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&l(d,function(a){a.setState()});l("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=c[d],h=(b.pointRange||0)/2,k=b.getExtremes(),l=b.toValue(g-f,!0)+h,h=b.toValue(g+
b.len-f,!0)-h,m=h<l,g=m?h:l,l=m?l:h,h=Math.min(k.dataMin,b.toValue(b.toPixels(k.min)-b.minPixelPadding)),m=Math.max(k.dataMax,b.toValue(b.toPixels(k.max)+b.minPixelPadding)),n;n=h-g;0<n&&(l+=n,g=h);n=l-m;0<n&&(l=m,g-=n);b.series.length&&g!==k.min&&l!==k.max&&(b.setExtremes(g,l,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);E(c.container,{cursor:"move"})}});r(v.prototype,{select:function(a,b){var c=this,d=c.series,f=d.chart;a=e(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},
function(){c.selected=c.options.selected=a;d.options.data[g(c,d.data)]=c.options;c.setState(a&&"select");b||l(f.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[g(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");
l(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,d=b(c.series.options.point,c.options).events;c.events=d;a.objectEach(d,function(a,b){C(c,b,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,g=this.series,k=g.options.states[a]||{},l=f[g.type].marker&&g.options.marker,m=l&&!1===l.enabled,n=l&&l.states&&l.states[a]||{},h=!1===n.enabled,t=g.stateMarkerGraphic,u=
this.marker||{},v=g.chart,y=g.halo,A,C=l&&g.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===k.enabled||a&&(h||m&&!1===n.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){C&&(A=g.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(g.pointAttribs(this,a),e(v.options.chart.animation,k.animation)),A&&this.graphic.animate(A,e(v.options.chart.animation,
n.animation,l.animation)),t&&t.hide();else{if(a&&n){l=u.symbol||g.symbol;t&&t.currentSymbol!==l&&(t=t.destroy());if(t)t[b?"animate":"attr"]({x:A.x,y:A.y});else l&&(g.stateMarkerGraphic=t=v.renderer.symbol(l,A.x,A.y,A.width,A.height).add(g.markerGroup),t.currentSymbol=l);t&&t.attr(g.pointAttribs(this,a))}t&&(t[a&&v.isInsidePlot(c,d,v.inverted)?"show":"hide"](),t.element.point=this)}(c=k.halo)&&c.size?(y||(g.halo=y=v.renderer.path().add((this.graphic||t).parentGroup)),y[b?"animate":"attr"]({d:this.haloPath(c.size)}),
y.attr({"class":"highcharts-halo highcharts-color-"+e(this.colorIndex,g.colorIndex)}),y.point=this,y.attr(r({fill:this.color||g.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):y&&y.point&&y.point.haloPath&&y.animate({d:y.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});r(y.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&
u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,d=b.tooltip,e=b.hoverPoint;b.hoverSeries=null;if(e)e.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!d||this.stickyTracking||d.shared&&!this.noSharedTooltip||d.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,f=c.states,g=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(l([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+
b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(g=f[a].lineWidth||g+(f[a].lineWidthPlus||0)),d&&!d.dashstyle))for(g={"stroke-width":g},d.animate(g,e(b.chart.options.chart.animation,f[a]&&f[a].animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),c+=1},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,k=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";l(["group",
"dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&l(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});l(c.linkedSeries,function(b){b.setVisible(a,!1)});g&&(d.isDirtyBox=!0);!1!==b&&d.redraw();u(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===
a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:J.drawTrackerGraph})})(M);(function(a){var C=a.Chart,A=a.each,F=a.inArray,E=a.isArray,m=a.isObject,f=a.pick,l=a.splat;C.prototype.setResponsive=function(f){var l=this.options.responsive,m=[],g=this.currentResponsive;l&&l.rules&&A(l.rules,function(d){void 0===d._id&&(d._id=a.uniqueKey());this.matchResponsiveRule(d,m,f)},this);var d=a.merge.apply(0,a.map(m,function(d){return a.find(l.rules,function(a){return a._id===
d}).chartOptions})),m=m.toString()||void 0;m!==(g&&g.ruleIds)&&(g&&this.update(g.undoOptions,f),m?(this.currentResponsive={ruleIds:m,mergedOptions:d,undoOptions:this.currentOptions(d)},this.update(d,f)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,l){var m=a.condition;(m.callback||function(){return this.chartWidth<=f(m.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(m.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(m.minWidth,0)&&this.chartHeight>=f(m.minHeight,0)}).call(this)&&
l.push(a._id)};C.prototype.currentOptions=function(f){function r(f,d,k,b){var e;a.objectEach(f,function(a,g){if(!b&&-1<F(g,["series","xAxis","yAxis"]))for(f[g]=l(f[g]),k[g]=[],e=0;e<f[g].length;e++)d[g][e]&&(k[g][e]={},r(a[e],d[g][e],k[g][e],b+1));else m(a)?(k[g]=E(a)?[]:{},r(a,d[g]||{},k[g],b+1)):k[g]=d[g]||null})}var t={};r(f,this.options,t,0);return t}})(M);return M});


/***/ }),
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(465);


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(78);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(79);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(32);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(16);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(17);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(34);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(36);

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = __webpack_require__(407);

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _reactHighcharts = __webpack_require__(439);

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

var _styledComponents = __webpack_require__(192);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _head = __webpack_require__(190);

var _head2 = _interopRequireDefault(_head);

var _reactHelmet = __webpack_require__(397);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\AnnieShen\\Desktop\\next-demo\\pages\\charts.js?entry';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  .highcharts-grid-line{\n    color:#fff;\n    opacity:0.1;\n  }\n  #charts-wrap{\n      height:495px;\n      margin:30px auto;\n  }\n\n  .highcharts-grid-line{\n      color:#fff;\n      opacity:0.1;\n    }\n    .highcharts-tick{\n      display:none;\n    }\n    .he{\n      color:red\n    }\n'], ['\n  .highcharts-grid-line{\n    color:#fff;\n    opacity:0.1;\n  }\n  #charts-wrap{\n      height:495px;\n      margin:30px auto;\n  }\n\n  .highcharts-grid-line{\n      color:#fff;\n      opacity:0.1;\n    }\n    .highcharts-tick{\n      display:none;\n    }\n    .he{\n      color:red\n    }\n']);

var Div = _styledComponents2.default.div(_templateObject);
var config = {
  chart: {
    height: 495,
    plotBackgroundColor: '#006285',
    marginTop: 0
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    itemDistance: 70,
    itemStyle: {
      color: '#fff',
      fontSize: '14px'
    },
    itemHoverStyle: {
      color: '#ddd'
    },
    symbolWidth: 40
  },
  credits: {
    enabled: false
  },
  title: {
    text: ''
  },
  xAxis: {
    labels: {
      formatter: function formatter() {
        return '<span style="font-size:12px; color:#999;">' + _reactHighcharts2.default.Highcharts.dateFormat('%Y/%m/%d', this.value) + '</span>';
      }
    },
    title: {
      text: ''
    },
    lineColor: 'transparent'
  },
  yAxis: {
    labels: {
      style: {
        color: '#999'
      }
    },
    showLastLabel: false,
    title: {
      text: ''
    }
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2015
    }
  },
  series: [{
    name: '课程',
    color: '#24F2D2',
    marker: {
      enabled: true,
      symbol: 'circle'
    },
    data: [[Date.UTC(2013, 5, 2), 2695], [Date.UTC(2013, 5, 3), 7648], [Date.UTC(2013, 5, 4), 3645], [Date.UTC(2013, 5, 5), 8638], [Date.UTC(2013, 5, 6), 3549], [Date.UTC(2013, 5, 7), 6562], [Date.UTC(2013, 5, 9), 9574]]
  }, {
    name: '小说',
    color: '#F2C024',
    marker: {
      enabled: true,
      symbol: 'circle'
    },
    data: [[Date.UTC(2013, 5, 2), 4453], [Date.UTC(2013, 5, 3), 2233], [Date.UTC(2013, 5, 4), 4532], [Date.UTC(2013, 5, 5), 9876], [Date.UTC(2013, 5, 6), 9843], [Date.UTC(2013, 5, 7), 2211], [Date.UTC(2013, 5, 9), 1223]]
  }, {
    name: '微商',
    color: '#AEF224',
    marker: {
      enabled: true,
      symbol: 'circle'
    },
    data: [[Date.UTC(2013, 5, 2), 1122], [Date.UTC(2013, 5, 3), 2343], [Date.UTC(2013, 5, 4), 3333], [Date.UTC(2013, 5, 5), 3322], [Date.UTC(2013, 5, 6), 4534], [Date.UTC(2013, 5, 7), 4564], [Date.UTC(2013, 5, 9), 6786]]
  }, {
    name: '品牌曝光',
    color: '#F22484',
    marker: {
      enabled: true,
      symbol: 'circle'
    },
    data: [[Date.UTC(2013, 5, 2), 1232], [Date.UTC(2013, 5, 3), 7648], [Date.UTC(2013, 5, 4), 7662], [Date.UTC(2013, 5, 5), 9824], [Date.UTC(2013, 5, 6), 3333], [Date.UTC(2013, 5, 7), 7562], [Date.UTC(2013, 5, 9), 2222]]
  }]
};

var He = function (_React$Component) {
  (0, _inherits3.default)(He, _React$Component);

  function He() {
    (0, _classCallCheck3.default)(this, He);

    return (0, _possibleConstructorReturn3.default)(this, (He.__proto__ || (0, _getPrototypeOf2.default)(He)).apply(this, arguments));
  }

  (0, _createClass3.default)(He, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('h1', { 'class': 'he', __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      }, '123');
    }
  }]);

  return He;
}(_react2.default.Component);

var Charts = function (_React$Component2) {
  (0, _inherits3.default)(Charts, _React$Component2);

  (0, _createClass3.default)(Charts, null, [{
    key: 'getInitialProps',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
        var req = _ref.req;
        var userAgent;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
                return _context.abrupt('return', { userAgent: userAgent });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function Charts(props) {
    (0, _classCallCheck3.default)(this, Charts);

    return (0, _possibleConstructorReturn3.default)(this, (Charts.__proto__ || (0, _getPrototypeOf2.default)(Charts)).call(this, props));
  }

  (0, _createClass3.default)(Charts, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(Div, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        }
      }, _react2.default.createElement(_reactHelmet2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        }
      }, _react2.default.createElement('link', { rel: 'stylesheet', href: '/static/css/charts.css', __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        }
      })), _react2.default.createElement(He, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        }
      }), 'Hello World ', this.props.userAgent, _react2.default.createElement(_reactHighcharts2.default, { domProps: { id: 'charts-wrap' /*callback={afterRender}*/ }, config: config, __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }));
    }
  }]);

  return Charts;
}(_react2.default.Component);

exports.default = Charts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjaGFydHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJSZWFjdEhpZ2hjaGFydHMiLCJzdHlsZWQiLCJIZWFkIiwiSGVsbWV0IiwiRGl2IiwiZGl2IiwiY29uZmlnIiwiY2hhcnQiLCJoZWlnaHQiLCJwbG90QmFja2dyb3VuZENvbG9yIiwibWFyZ2luVG9wIiwibGVnZW5kIiwibGF5b3V0IiwiYWxpZ24iLCJ2ZXJ0aWNhbEFsaWduIiwiaXRlbURpc3RhbmNlIiwiaXRlbVN0eWxlIiwiY29sb3IiLCJmb250U2l6ZSIsIml0ZW1Ib3ZlclN0eWxlIiwic3ltYm9sV2lkdGgiLCJjcmVkaXRzIiwiZW5hYmxlZCIsInRpdGxlIiwidGV4dCIsInhBeGlzIiwibGFiZWxzIiwiZm9ybWF0dGVyIiwiSGlnaGNoYXJ0cyIsImRhdGVGb3JtYXQiLCJ2YWx1ZSIsImxpbmVDb2xvciIsInlBeGlzIiwic3R5bGUiLCJzaG93TGFzdExhYmVsIiwicGxvdE9wdGlvbnMiLCJzZXJpZXMiLCJsYWJlbCIsImNvbm5lY3RvckFsbG93ZWQiLCJwb2ludFN0YXJ0IiwibmFtZSIsIm1hcmtlciIsInN5bWJvbCIsImRhdGEiLCJEYXRlIiwiVVRDIiwiSGUiLCJDb21wb25lbnQiLCJDaGFydHMiLCJyZXEiLCJ1c2VyQWdlbnQiLCJoZWFkZXJzIiwibmF2aWdhdG9yIiwicHJvcHMiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7OztBQUVQLElBQU0sTUFBTSwyQkFBTixBQUFhLElBQW5CO0FBcUJBLElBQU07O1lBQ0UsQUFDRyxBQUNQO3lCQUZJLEFBRWlCLEFBQ3JCO2VBSlcsQUFDUCxBQUdPLEFBRWI7QUFMTSxBQUNKOztZQUlLLEFBQ0csQUFDUjtXQUZLLEFBRUUsQUFDUDttQkFISyxBQUdVLEFBQ2Y7a0JBSkssQUFJUyxBQUNkOzthQUFXLEFBQ0YsQUFDUDtnQkFQRyxBQUtNLEFBRUMsQUFFWjtBQUpXLEFBQ1Q7O2FBTkcsQUFTVyxBQUNQLEFBRVQ7QUFIZ0IsQUFDZDtpQkFoQlMsQUFNTixBQVlRLEFBRWY7QUFkTyxBQUNMOzthQVBXLEFBb0JMLEFBQ0UsQUFFVjtBQUhRLEFBQ047O1VBckJXLEFBdUJQLEFBQ0MsQUFFUDtBQUhNLEFBQ0o7OztpQkFJYSxxQkFBVyxBQUNoQjtlQUFRLCtDQUErQywwQkFBQSxBQUFnQixXQUFoQixBQUEyQixXQUEzQixBQUFzQyxZQUFZLEtBQWpHLEFBQStDLEFBQXVELFNBQTlHLEFBQXVILEFBQ3hIO0FBSkYsQUFDRSxBQUtQO0FBTE8sQUFDTDs7WUFGRyxBQU1FLEFBQ0UsQUFFVDtBQUhPLEFBQ0g7ZUFqQ08sQUEwQk4sQUFTSyxBQUVaO0FBWE8sQUFDTDs7OztlQVVLLEFBQ0UsQUFDQyxBQUNFLEFBR1I7QUFKTSxBQUNKO0FBRkcsQUFDTDttQkFGRyxBQU1ZLEFBQ2Y7O1lBNUNTLEFBcUNOLEFBT0ksQUFDRyxBQUdkO0FBSlcsQUFDSDtBQVJELEFBQ0w7Ozs7MEJBV1UsQUFDRyxBQUNlLEFBRXRCO0FBSE8sQUFDSDtrQkFuREMsQUFnREEsQUFDRCxBQUlRLEFBR3BCO0FBUFksQUFDSjtBQUZLLEFBQ1Q7O1VBT0ssQUFDSyxBQUNOO1dBRkMsQUFFTSxBQUNQOztlQUFRLEFBQ0csQUFDVDtjQUxELEFBR08sQUFFRSxBQUVWO0FBSlEsQUFDTjtVQUdJLENBQ0osQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFEYixBQUNKLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBRmIsQUFFSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUhiLEFBR0osQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFKYixBQUlKLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBTGIsQUFLSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQU5iLEFBTUosQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFkbkIsQUFBQyxBQU9LLEFBT0osQUFBb0I7QUFkckIsQUFDRCxHQURBO1VBZ0JELEFBQ08sQUFDTjtXQUZELEFBRVEsQUFDUDs7ZUFBUSxBQUNHLEFBQ1Q7Y0FMSCxBQUdTLEFBRUUsQUFFVjtBQUpRLEFBQ047VUFHSSxDQUNKLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBRGIsQUFDSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUZiLEFBRUosQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFIYixBQUdKLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBSmIsQUFJSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUxiLEFBS0osQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFOYixBQU1KLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBOUJuQixBQWdCRCxBQU9PLEFBT0osQUFBb0I7QUFkdkIsQUFDQztVQWVELEFBQ08sQUFDTjtXQUZELEFBRVEsQUFDUDs7ZUFBUSxBQUNHLEFBQ1Q7Y0FMSCxBQUdTLEFBRUUsQUFFVjtBQUpRLEFBQ047VUFHSSxDQUNKLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBRGIsQUFDSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUZiLEFBRUosQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFIYixBQUdKLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBSmIsQUFJSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUxiLEFBS0osQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFOYixBQU1KLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBOUNuQixBQWdDRCxBQU9PLEFBT0osQUFBb0I7QUFkdkIsQUFDQztVQWVELEFBQ08sQUFDTjtXQUZELEFBRVEsQUFDUDs7ZUFBUSxBQUNHLEFBQ1Q7Y0FMSCxBQUdTLEFBRUUsQUFFVjtBQUpRLEFBQ047VUFHSSxDQUNKLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBRGIsQUFDSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUZiLEFBRUosQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFIYixBQUdKLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBSmIsQUFJSixBQUFvQixPQUNwQixDQUFDLEtBQUEsQUFBSyxJQUFMLEFBQVMsTUFBVCxBQUFjLEdBQWYsQUFBQyxBQUFnQixJQUxiLEFBS0osQUFBb0IsT0FDcEIsQ0FBQyxLQUFBLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBYyxHQUFmLEFBQUMsQUFBZ0IsSUFOYixBQU1KLEFBQW9CLE9BQ3BCLENBQUMsS0FBQSxBQUFLLElBQUwsQUFBUyxNQUFULEFBQWMsR0FBZixBQUFDLEFBQWdCLElBdEg3QixBQUFlLEFBd0RMLEFBZ0RELEFBT08sQUFPSixBQUFvQjtBQWR2QixBQUNDO0FBekdLLEFBQ2I7O0ksQUEwSEk7Ozs7Ozs7Ozs7OzZCQUNJLEFBQ047NkJBQ0UsY0FBQSxRQUFJLFNBQUosQUFBVTtvQkFBVjtzQkFBQTtBQUFBO09BQUEsRUFERixBQUNFLEFBRUg7Ozs7O0VBTGMsZ0IsQUFBTTs7SUFPRixBOzs7Ozs7O1lBQ1csQSxXQUFBLEE7Ozs7O21CQUN0QjtBLDRCQUFZLE1BQU0sSUFBQSxBQUFJLFFBQVYsQUFBTSxBQUFZLGdCQUFnQixVLEFBQVU7aURBQ3ZELEVBQUUsVyxBQUFGOzs7Ozs7Ozs7Ozs7Ozs7QUFHVDs7O2tCQUFBLEFBQVksT0FBTTt3Q0FBQTs7aUlBQUEsQUFDVixBQUNQOzs7Ozs2QkFDTyxBQUNOOzZCQUNHLGNBQUQ7O29CQUFBO3NCQUFBLEFBQ0E7QUFEQTtBQUFBLE9BQUEsa0JBQ0EsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsaURBQ1EsS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7b0JBQTVCO3NCQUZGLEFBQ0EsQUFDRSxBQUVBO0FBRkE7eUNBRUEsQUFBQzs7b0JBQUQ7c0JBSkYsQUFJRTtBQUFBO0FBQUEsVUFDYSxxQkFBQSxBQUFLLE1BTHBCLEFBSzBCLEFBQ3hCLDJCQUFBLEFBQUMsMkNBQWdCLFVBQVksRUFBQyxJQUE5QixBQUE2QixBQUFLLGNBQWxDLEFBQWtELDhCQUEyQixRQUE3RSxBQUF1RjtvQkFBdkY7c0JBUEosQUFDRSxBQU1FLEFBR0w7QUFISzs7Ozs7O0VBakI0QixnQkFBTSxBOztrQkFBckIsQSIsImZpbGUiOiJjaGFydHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvQW5uaWVTaGVuL0Rlc2t0b3AvbmV4dC1kZW1vIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "C:\\Users\\AnnieShen\\Desktop\\next-demo\\pages\\charts.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\Users\\AnnieShen\\Desktop\\next-demo\\pages\\charts.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(92)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/charts")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })
],[464]);
            return { page: comp.default }
          })
        