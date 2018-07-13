var settings =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"settings": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./settings.js","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./screens/Settings.js":
/*!*****************************!*\
  !*** ./screens/Settings.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            ", "\n\n            <div class='register' id='login-page'>\n                <div class='container'>\n                    <div class='row'>\n                        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-6 col-lg-offset-3'>\n                            <div class='form-box modal-dialog'>\n                                <div>\n                                    \u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u044B  <b>", "</b>\n                                </div>\n                                    ", "\n                                \n                                <div>\n                                    <button class='btn btn-social'>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                            <div class='row authors-list'>\n                                <div class=\"col-xs-1 popular-img\">\n                                    <div class='img-circle img-user img-user-mini' style=", " alt='", "'></div>\n                                </div>\n                                <div class='col-xs-7'>\n                                    ", " ", " ", "\n                                </div>\n                                <div class='col-xs-4'>\n                                    <button id=", " class='btn btn-link' onclick=", ">\u0421\u043C\u0435\u043D\u0438\u0442\u044C</button>\n                                </div>\n                            <div>\n                        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                <hr>\n                <div>\n                    <b>\u0414\u0440\u0443\u0433\u0438\u0435 \u0432\u0430\u0448\u0438 \u0430\u0432\u0442\u043E\u0440\u044B:</b>\n                <div>\n                <div class='row'>\n                    <div class='container'>\n                        ", "\n                    </div>\n                </div>\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

var NavBar = __webpack_require__(/*! ../components/navbar/Navbar */ "./components/navbar/Navbar.js");

module.exports =
/*#__PURE__*/
function (_hyperHTML$Component) {
  _inherits(RegisterPage, _hyperHTML$Component);

  function RegisterPage(state) {
    var _this;

    _classCallCheck(this, RegisterPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RegisterPage).call(this));
    _this.currentAuthor = _LOCALS.user.currentAuthor;
    _this.currentAuthorName = "".concat(_this.currentAuthor.name.first, " ").concat(_this.currentAuthor.name.last, " ").concat(_this.currentAuthor.patronymic);
    _this.myAuthors = [];

    _LOCALS.user.authors.forEach(function (a) {
      if (a._id !== _this.currentAuthor._id) _this.myAuthors.push(a);
    });

    _this.state = state;
    _this.changeCurrentAuthor = _this.changeCurrentAuthor.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    console.log(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(RegisterPage, [{
    key: "register",
    value: function register(event) {
      event.preventDefault();
      var form = event.target;
      var name_first = form.querySelector('#name_first').value;
      var name_last = form.querySelector('#name_last').value;
      var email = form.querySelector('#email').value;
      var password = form.querySelector('#password').value;
      var authorsList = form.querySelector('#authors').querySelectorAll('option');
      var author = '';

      for (var i in authorsList) {
        if (authorsList[i].selected) {
          author = authorsList[i].id;
          break;
        }
      }

      var queryArray = [];
      if (name_first != '') queryArray.push("name_first=".concat(name_first));
      if (name_last != '') queryArray.push("name_last=".concat(name_last));
      if (email != '') queryArray.push("email=".concat(email));
      if (password != '') queryArray.push("password=".concat(password));
      if (author != '') queryArray.push("author=".concat(author));
      if (queryArray.length === 0) return;
      var query = queryArray.map(function (q) {
        return q;
      }).join('&');
      query = "/api/user/create?".concat(query);
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', query, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) window.location = '/login';else {
            var e = JSON.parse(this.responseText);
            console.log(e);
          }
        }
      };

      return false;
    }
  }, {
    key: "changeCurrentAuthor",
    value: function changeCurrentAuthor(event) {
      var authorId = event.target.id;
      var query = "/api/user/change-current-author?author=".concat(authorId);
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', query, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          if (this.status == 200) window.location = '/wall';
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var myAuthors;

      if (this.myAuthors.length) {
        myAuthors = hyperHTML.wire()(_templateObject(), this.myAuthors.map(function (a) {
          var photo = a.photo ? a.photo.filename : "/images/avatar-default.png";
          return hyperHTML.wire()(_templateObject2(), "background-image:URL(".concat(photo, ");"), name, a.name.first, a.name.last, a.patronymic, a._id, _this2.changeCurrentAuthor);
        }));
      }

      return this.html(_templateObject3(), new NavBar(this.state), this.currentAuthorName, myAuthors);
    }
  }]);

  return RegisterPage;
}(hyperHTML.Component);

/***/ }),

/***/ "./settings.js":
/*!*********************!*\
  !*** ./settings.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _templateObject() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

var Settings = __webpack_require__(/*! ./screens/Settings */ "./screens/Settings.js");

if (!_LOCALS.isSignedIn) window.location = '/login';else {
  hyperHTML(document.querySelector('#content'))(_templateObject(), new Settings());
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL3NjcmVlbnMvU2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL3NldHRpbmdzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwic2V0dGluZ3NcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NldHRpbmdzLmpzXCIsXCJjb21tb25zXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiY29uc3QgaHlwZXJIVE1MID0gcmVxdWlyZSgnaHlwZXJodG1sL2NqcycpLmRlZmF1bHQ7XG5jb25zdCBOYXZCYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmJhci9OYXZiYXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSZWdpc3RlclBhZ2UgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN1cnJlbnRBdXRob3IgPSBfTE9DQUxTLnVzZXIuY3VycmVudEF1dGhvcjtcbiAgICAgICAgdGhpcy5jdXJyZW50QXV0aG9yTmFtZSA9IGAke3RoaXMuY3VycmVudEF1dGhvci5uYW1lLmZpcnN0fSAke3RoaXMuY3VycmVudEF1dGhvci5uYW1lLmxhc3R9ICR7dGhpcy5jdXJyZW50QXV0aG9yLnBhdHJvbnltaWN9YFxuICAgICAgICB0aGlzLm15QXV0aG9ycyA9IFtdO1xuICAgICAgICBfTE9DQUxTLnVzZXIuYXV0aG9ycy5mb3JFYWNoKChhKSA9PiB7XG4gICAgICAgICAgICBpZiAoYS5faWQgIT09IHRoaXMuY3VycmVudEF1dGhvci5faWQpIHRoaXMubXlBdXRob3JzLnB1c2goYSk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICB0aGlzLmNoYW5nZUN1cnJlbnRBdXRob3IgPSB0aGlzLmNoYW5nZUN1cnJlbnRBdXRob3IuYmluZCh0aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHJlZ2lzdGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBmb3JtID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIGxldCBuYW1lX2ZpcnN0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjbmFtZV9maXJzdCcpLnZhbHVlO1xuICAgICAgICBsZXQgbmFtZV9sYXN0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjbmFtZV9sYXN0JykudmFsdWU7XG4gICAgICAgIGxldCBlbWFpbCA9IGZvcm0ucXVlcnlTZWxlY3RvcignI2VtYWlsJykudmFsdWU7XG4gICAgICAgIGxldCBwYXNzd29yZCA9IGZvcm0ucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkJykudmFsdWU7XG4gICAgICAgIGxldCBhdXRob3JzTGlzdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignI2F1dGhvcnMnKS5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBhdXRob3I9ICcnXG4gICAgICAgIGZvciAobGV0IGkgaW4gYXV0aG9yc0xpc3QpIHtcbiAgICAgICAgICAgIGlmIChhdXRob3JzTGlzdFtpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGF1dGhvciA9IGF1dGhvcnNMaXN0W2ldLmlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHF1ZXJ5QXJyYXkgPSBbXTtcbiAgICAgICAgaWYgKG5hbWVfZmlyc3QgIT0gJycpIHF1ZXJ5QXJyYXkucHVzaChgbmFtZV9maXJzdD0ke25hbWVfZmlyc3R9YCk7XG4gICAgICAgIGlmIChuYW1lX2xhc3QgIT0gJycpIHF1ZXJ5QXJyYXkucHVzaChgbmFtZV9sYXN0PSR7bmFtZV9sYXN0fWApO1xuICAgICAgICBpZiAoZW1haWwgIT0gJycpIHF1ZXJ5QXJyYXkucHVzaChgZW1haWw9JHtlbWFpbH1gKTtcbiAgICAgICAgaWYgKHBhc3N3b3JkICE9ICcnKSBxdWVyeUFycmF5LnB1c2goYHBhc3N3b3JkPSR7cGFzc3dvcmR9YCk7XG4gICAgICAgIGlmIChhdXRob3IgIT0gJycpIHF1ZXJ5QXJyYXkucHVzaChgYXV0aG9yPSR7YXV0aG9yfWApO1xuICAgICAgICBpZiAocXVlcnlBcnJheS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGxldCBxdWVyeSA9IHF1ZXJ5QXJyYXkubWFwKChxKSA9PiBxKS5qb2luKCcmJyk7XG4gICAgICAgIHF1ZXJ5ID0gYC9hcGkvdXNlci9jcmVhdGU/JHtxdWVyeX1gO1xuXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB4aHIub3BlbignR0VUJywgcXVlcnksIHRydWUpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjaGFuZ2VDdXJyZW50QXV0aG9yKGV2ZW50KSB7XG4gICAgICAgIGxldCBhdXRob3JJZCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gYC9hcGkvdXNlci9jaGFuZ2UtY3VycmVudC1hdXRob3I/YXV0aG9yPSR7YXV0aG9ySWR9YDtcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCBxdWVyeSwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkgd2luZG93LmxvY2F0aW9uID0gJy93YWxsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG15QXV0aG9ycztcbiAgICAgICAgaWYgKHRoaXMubXlBdXRob3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgbXlBdXRob3JzID0gaHlwZXJIVE1MLndpcmUoKWBcbiAgICAgICAgICAgICAgICA8aHI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGI+0JTRgNGD0LPQuNC1INCy0LDRiNC4INCw0LLRgtC+0YDRizo8L2I+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250YWluZXInPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLm15QXV0aG9ycy5tYXAoYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBob3RvID0gYS5waG90byA/IGEucGhvdG8uZmlsZW5hbWUgOiBcIi9pbWFnZXMvYXZhdGFyLWRlZmF1bHQucG5nXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93IGF1dGhvcnMtbGlzdCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMSBwb3B1bGFyLWltZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0naW1nLWNpcmNsZSBpbWctdXNlciBpbWctdXNlci1taW5pJyBzdHlsZT0ke2BiYWNrZ3JvdW5kLWltYWdlOlVSTCgke3Bob3RvfSk7YH0gYWx0PScke25hbWV9Jz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC14cy03Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YS5uYW1lLmZpcnN0fSAke2EubmFtZS5sYXN0fSAke2EucGF0cm9ueW1pY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC14cy00Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9JHthLl9pZH0gY2xhc3M9J2J0biBidG4tbGluaycgb25jbGljaz0ke3RoaXMuY2hhbmdlQ3VycmVudEF1dGhvcn0+0KHQvNC10L3QuNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIGB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbGBcbiAgICAgICAgICAgICR7bmV3IE5hdkJhciAodGhpcy5zdGF0ZSl9XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JlZ2lzdGVyJyBpZD0nbG9naW4tcGFnZSc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbC14cy0xMiBjb2wtc20tMTIgY29sLW1kLTEyIGNvbC1sZy02IGNvbC1sZy1vZmZzZXQtMyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZm9ybS1ib3ggbW9kYWwtZGlhbG9nJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCh0LXQudGH0LDRgSDQstGLICA8Yj4ke3RoaXMuY3VycmVudEF1dGhvck5hbWV9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bXlBdXRob3JzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2J0biBidG4tc29jaWFsJz7Ql9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH1cbn0iLCJjb25zdCBoeXBlckhUTUwgPSByZXF1aXJlKCdoeXBlcmh0bWwvY2pzJykuZGVmYXVsdDtcbmxldCBTZXR0aW5ncyA9IHJlcXVpcmUoJy4vc2NyZWVucy9TZXR0aW5ncycpO1xuXG5pZiAoIV9MT0NBTFMuaXNTaWduZWRJbikgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG5lbHNlIHtcbiAgICBoeXBlckhUTUwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKSlgJHtuZXcgU2V0dGluZ3MoKX1gO1xufSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQVhBO0FBYUE7QUFDQTtBQWZBO0FBQUE7QUFBQTtBQWlCQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQWpFQTtBQUFBO0FBQUE7QUFvRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqRkE7QUFBQTtBQUFBO0FBbUZBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQVFBO0FBQ0E7QUFZQTtBQUlBO0FBQ0E7QUFBQTtBQXVCQTtBQXZJQTtBQUNBO0FBREE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9