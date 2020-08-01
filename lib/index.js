/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var modals_1 = __webpack_require__(/*! ./modules/modals */ "./src/modules/modals.ts");

function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

window.modals = modals_1.default;
ready(function () {
  modals_1.default.init();
});

/***/ }),

/***/ "./src/modules/modals.ts":
/*!*******************************!*\
  !*** ./src/modules/modals.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var scrollfreeze_1 = __webpack_require__(/*! ./scrollfreeze */ "./src/modules/scrollfreeze.ts");

var util_1 = __webpack_require__(/*! ./util */ "./src/modules/util.ts");

function kickWindowEvent(name, data) {
  if (data === void 0) {
    data = {};
  }

  var event = new Event("modal::" + name, data);
  window.dispatchEvent(event);
}

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function getModalFrame() {
  var modalWrapper = document.getElementById('modal__wrapper');
  var modalInner = document.getElementById('modal__inner');

  if (!modalWrapper || !modalInner) {
    document.body.append(util_1.parseHTML("<div id=\"modal__wrapper\" class=\"hashmodal__wrapper\">\n        <a id=\"modal__background\" href=\"#closemodal\" class=\"hashmodal__background\"></a>\n        <div id=\"modal\" class=\"hashmodal\">\n          <a href=\"#closemodal\" class=\"hashmodal__close\" id=\"modal__close\"></a>\n          <div class=\"hashmodal__inner\" id=\"modal__inner\"></div>\n        </div>\n      </div>"));
    modalWrapper = document.getElementById('modal__wrapper');
    modalInner = document.getElementById('modal__inner');

    if (!modalWrapper || !modalInner) {
      throw new Error("Can't create modals!");
    }
  }

  return {
    wrapper: modalWrapper,
    inner: modalInner
  };
}

var hashes = {};
var initialised = false;

function addModal(hashTrigger, contents, options) {
  if (options === void 0) {
    options = {
      clearOnClose: false
    };
  }

  if (typeof hashTrigger !== 'string') throw new Error('Hash trigger must be a string');
  if (typeof contents !== 'string' && !isElement(contents) && !isFunction(contents)) throw new Error('Contents must be an html string or dom node, or a function which returns an html string or dom node when passed the hash!');
  if (typeof hashes[hashTrigger] !== 'undefined') throw new Error("Hashtrigger \"" + hashTrigger + "\" already used!");

  if (typeof options !== 'undefined') {
    if (_typeof(options) !== 'object') throw new Error('Options must be an object');
    if (typeof options.clearOnClose !== 'undefined' && typeof options.clearOnClose !== 'boolean') throw new Error('clearOnClose Option must be a boolean');
  }

  hashes[hashTrigger] = {
    contents: contents,
    options: options
  };
  if (!(modalWrapper && modalInner && initialised)) return;

  if (getCurrentHash() === hashTrigger) {
    hashHandler();
  }

  return true;
}

;
var modalWrapper;
var modalInner;

function init() {
  var modal_components = getModalFrame();
  modalWrapper = modal_components.wrapper;
  modalInner = modal_components.inner;
  initialised = true;
  window.addEventListener("hashchange", hashHandler);
  hashHandler();
  kickWindowEvent('ready');
}

var open = false;
var lastOpened;

function toggleModal(opening) {
  if (!(modalWrapper && modalInner && initialised)) return;

  if (typeof opening === 'undefined') {
    opening = !open; // if it's closed should be opening
  } else if (opening === open) {
    return; // if open should not be opening
  }

  if (opening) {
    util_1.toggleClass(modalWrapper, 'block', true);
    setTimeout(function () {
      if (!(modalWrapper && modalInner && initialised)) return;
      util_1.toggleClass(modalWrapper, 'hide', !opening);
      util_1.toggleClass(modalWrapper, 'show', opening);
    }, 0);
    open = true;
  } else {
    // closing
    util_1.onTransitionEnd(modalWrapper, function () {
      if (!(modalWrapper && modalInner && initialised)) return;
      util_1.toggleClass(modalWrapper, 'block', opening);
    });
    util_1.toggleClass(modalWrapper, 'hide', !opening);
    util_1.toggleClass(modalWrapper, 'show', opening);
    open = false;
  }

  scrollfreeze_1.default.toggleFrozen(open);
}

function getCurrentHash() {
  var hash = window.location.hash;

  if (hash.indexOf('#') >= 0) {
    var _a = hash.split('#'),
        theHash = _a[0],
        hashString = _a[1];

    if (hashString && typeof hashString === 'string') {
      var hashTrigger = hashString.trim();
      return hashTrigger;
    }
  }

  return false;
}

function setModalContents(contents) {
  if (!(modalWrapper && modalInner && initialised)) return;
  util_1.html(modalInner, '');

  if (typeof contents === "function") {
    contents = contents();
  }

  if (typeof contents === 'string') {
    var html_1 = util_1.parseHTML(contents);

    if (html_1) {
      modalInner.append(html_1);
    }
  } else if (Array.isArray(contents)) {
    contents.forEach(function (item) {
      if (typeof item === 'string') {
        var itemHtml = util_1.parseHTML(item);

        if (itemHtml) {
          modalInner.append(itemHtml);
        }
      } else if (isElement(item)) {
        modalInner.append(item);
      }
    });
  } else if (!!contents && isElement(contents)) {
    modalInner.append(contents);
  }
}

function hashHandler() {
  var hash = getCurrentHash();

  if (hash) {
    if (hash === 'closemodal') {
      toggleModal(false);

      if (lastOpened) {
        var prevModal = hashes[lastOpened];

        if (prevModal && prevModal.options && prevModal.options.clearOnClose) {
          setModalContents();
        }
      }

      kickWindowEvent('close');
    } else if (hash.length > 0 && typeof hashes[hash] !== 'undefined') {
      if (lastOpened === hash) {
        var prevModal = hashes[lastOpened];

        if (prevModal.options && prevModal.options.clearOnClose) {
          setModalContents(hashes[hash].contents);
        }
      } else {
        setModalContents(hashes[hash].contents);
      }

      lastOpened = hash;
      toggleModal(true);
      kickWindowEvent('open');
    }
  }
}

exports.default = {
  init: init,
  addModal: addModal
};

/***/ }),

/***/ "./src/modules/scrollfreeze.ts":
/*!*************************************!*\
  !*** ./src/modules/scrollfreeze.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFrozen = void 0;
var scrollPosition = 0;

var util_1 = __webpack_require__(/*! ./util */ "./src/modules/util.ts");

function toggleFrozen(force, options) {
  if (options === void 0) {
    options = {};
  }

  var body = document.body;
  var html = document.documentElement;
  if (!body || !html) return;
  var freeze;

  if (typeof force !== 'boolean') {
    var currentState = util_1.hasClass(body, 'noscroll');
    freeze = !currentState;
  } else {
    freeze = force;
  }

  if (freeze) {
    if (typeof options.YOffset === 'number') {
      scrollPosition = options.YOffset;
    } else {
      scrollPosition = window.pageYOffset;
    }

    util_1.css(body, {
      top: "-" + scrollPosition + "px"
    });
    util_1.toggleClass(body, 'noscroll', true);
  } else {
    util_1.toggleClass(body, 'noscroll', false);
    util_1.css(body, {
      top: 'auto'
    });
    util_1.css(html, {
      'scroll-behavior': 'auto'
    });
    window.scrollTo({
      left: 0,
      top: scrollPosition,
      behavior: 'auto'
    });
    util_1.css(html, {
      'scroll-behavior': ''
    });
  }
}

exports.toggleFrozen = toggleFrozen;
exports.default = {
  toggleFrozen: toggleFrozen
};

/***/ }),

/***/ "./src/modules/util.ts":
/*!*****************************!*\
  !*** ./src/modules/util.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTransitionEnd = exports.parseHTML = exports.html = exports.css = exports.toggleClass = exports.removeClass = exports.addClass = exports.hasClass = void 0;

function hasClass(element, class_name) {
  return element.classList.contains(class_name);
}

exports.hasClass = hasClass;

function addClass(element, class_name) {
  element.classList.add(class_name);
}

exports.addClass = addClass;

function removeClass(element, class_name) {
  element.classList.remove(class_name);
}

exports.removeClass = removeClass;

function toggleClass(element, class_name, override) {
  // override = true -> add class 
  // override = false -> remove class
  // override = undefined -> just toggle
  var canAdd = true;
  var canRemove = true;

  if (typeof override === "boolean") {
    if (override) {
      canRemove = false;
    } else {
      canAdd = false;
    }
  }

  if (hasClass(element, class_name)) {
    canRemove && removeClass(element, class_name);
  } else {
    canAdd && addClass(element, class_name);
  }
}

exports.toggleClass = toggleClass;

function style_str_to_obj(str) {
  var new_styles = {};
  var style_strings = str.split(";");
  style_strings.forEach(function (style_string) {
    var _a = style_string.split("="),
        k = _a[0],
        v = _a[1];

    new_styles[k] = v;
  });
  return new_styles;
}

function style_obj_to_str(obj) {
  var new_styles = [];
  Object.keys(obj).forEach(function (key) {
    new_styles.push(key + "=" + obj[key]);
  });
  return new_styles.join(";");
}

function css(element, props) {
  var current_styles = element.getAttribute("style");

  if (current_styles) {
    var current_style_obj = __assign(__assign({}, style_str_to_obj(current_styles)), props);

    element.setAttribute("style", style_obj_to_str(current_style_obj));
  }
}

exports.css = css;

function html(element, set_to) {
  element.innerHTML = set_to;
}

exports.html = html;

function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

exports.parseHTML = parseHTML;

function onTransitionEnd(element, callback) {
  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  var listener;
  var transitionEnd = whichTransitionEvent();

  if (transitionEnd) {
    listener = element.addEventListener(transitionEnd, callback, {
      passive: true,
      once: true
    });
  }
}

exports.onTransitionEnd = onTransitionEnd;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map