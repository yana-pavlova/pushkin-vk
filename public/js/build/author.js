var author =
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
/******/ 		"author": 0
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
/******/ 	deferredModules.push(["./author.js","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./author.js":
/*!*******************!*\
  !*** ./author.js ***!
  \*******************/
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

var AuthorsPage = __webpack_require__(/*! ./screens/AuthorsPage */ "./screens/AuthorsPage.js"); // let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';


var api = _LOCALS ? '?apiKey=' + _LOCALS.apiKey : '?apiKey=123';
var author = document.location.pathname.replace('/author', '');
fetch('/api/post/list' + author + api, {
  method: 'GET'
}).then(function (res) {
  return res.json();
}).then(function (res) {
  hyperHTML(document.querySelector('#content'))(_templateObject(), new AuthorsPage(res));
}).catch(function (e) {
  return console.log(e);
});

/***/ }),

/***/ "./screens/AuthorsPage.js":
/*!********************************!*\
  !*** ./screens/AuthorsPage.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = _interopRequireDefault(__webpack_require__(/*! uppy/lib/core */ "../node_modules/uppy/lib/core/index.js"));

var _Dashboard = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/Dashboard */ "../node_modules/uppy/lib/plugins/Dashboard/index.js"));

var _XHRUpload = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/XHRUpload */ "../node_modules/uppy/lib/plugins/XHRUpload.js"));

var _Webcam = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/Webcam */ "../node_modules/uppy/lib/plugins/Webcam/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n                                    <div class='card-post'>\n                                        <div>\u041D\u043E\u0432\u0430\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F</div>\n                                        ", "\n                                    </div>\n                                "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            <div  >\n                ", "\n                <div class='profile'>\n                    ", "\n                    <div class='content-posts profile-content'>\n                        <div class='banner-profile' style='background-image: url(\"/images/bookshelf.jpg\");'></div>\n                        <div class='container-fluid container-posts'>\n\n                            ", "\n                            ", "\n                        </div>\n                        ", "\n                    </div>\n                </div>\n            </div>\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            <div class='card-post'>\n                <table class='table table-condensed'>\n                    <caption>", "</caption>\n                    <tbody>\n                        <tr>\n                            <th>\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F</th>\n                            <td>", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u0414\u0430\u0442\u0430 \u0441\u043C\u0435\u0440\u0442\u0438</th>\n                            <td>", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u041C\u0435\u0441\u0442\u043E \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F</th>\n                            <td>", ", ", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u0438</th>\n                            <td>", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u0414\u0435\u0442\u0438</th>\n                            <td>", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u041D\u0430\u0433\u0440\u0430\u0434\u044B</th>\n                            <td>", "</td>\n                        </tr>\n                        <tr>\n                            <th>\u0421\u0441\u044B\u043B\u043A\u0438</th>\n                            <td><a>", "</a></td>\n                        </tr>\n                        <tr>\n                            <th>\u041A\u0443\u0440\u0430\u0442\u043E\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0430\u0432\u0442\u043E\u0440\u0430</th>\n                            <td>", " ", "</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            <div class='sidebar-nav'>\n                <img class='img-circle user-picture' src='", "' alt='", "'>\n                <h2 class='text-center'>", "</h2>\n                <hr>\n                <p class='text-center user-description hidden-xs'>\n                    <i>", "</i>\n                    <br>\n                    <i>", ", ", "</i>\n                </p>\n            </div>\n            "]);

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

var NavBar = __webpack_require__(/*! ../components/navbar/Navbar */ "./components/navbar/Navbar.js");

var Posts = __webpack_require__(/*! ../components/Posts */ "./components/Posts.js");

var PostEditor = __webpack_require__(/*! ../components/PostEditor */ "./components/PostEditor.js");

var AUTHOR_DATE_OPTS = {
  // era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // weekday: 'long',
  timezone: 'UTC' // hour: 'numeric',
  // minute: 'numeric',
  // second: 'numeric'

};

var AuthorSidebar =
/*#__PURE__*/
function (_hyperHTML$Component) {
  _inherits(AuthorSidebar, _hyperHTML$Component);

  function AuthorSidebar(state) {
    var _this;

    _classCallCheck(this, AuthorSidebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorSidebar).call(this));
    _this.state = state;
    return _this;
  }

  _createClass(AuthorSidebar, [{
    key: "render",
    value: function render() {
      var photo = this.state.authorPhoto;
      var name = "".concat(this.state.name.first, " ").concat(this.state.name.last, " ").concat(this.state.patronymic);
      var birthDay = new Date(this.state.birthDay);
      birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
      return this.html(_templateObject(), photo ? "/".concat(photo.filename) : '/images/avatar-default.png', name, name, birthDay, this.state.birthCity, this.state.birthCountry);
    }
  }]);

  return AuthorSidebar;
}(hyperHTML.Component);

var AuthorInfo =
/*#__PURE__*/
function (_hyperHTML$Component2) {
  _inherits(AuthorInfo, _hyperHTML$Component2);

  function AuthorInfo(state) {
    var _this2;

    _classCallCheck(this, AuthorInfo);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AuthorInfo).call(this));
    _this2.state = state;
    return _this2;
  }

  _createClass(AuthorInfo, [{
    key: "render",
    value: function render() {
      var authorPhoto = this.state.photo;
      var name = "".concat(this.state.name.first, " ").concat(this.state.name.last, " ").concat(this.state.patronymic);
      var birthDay = new Date(this.state.birthDay);
      birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
      var deathDay = new Date(this.state.birthDay);
      deathDay = deathDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
      return this.html(_templateObject2(), name, birthDay, deathDay, this.state.birthCity, this.state.birthCountry, this.state.parents, this.state.children, this.state.honors, this.state.wikipediaLink, this.state.name.first, this.state.name.last);
    }
  }]);

  return AuthorInfo;
}(hyperHTML.Component);

module.exports =
/*#__PURE__*/
function (_hyperHTML$Component3) {
  _inherits(AuthorsPage, _hyperHTML$Component3);

  function AuthorsPage(state) {
    var _this3;

    _classCallCheck(this, AuthorsPage);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(AuthorsPage).call(this));
    _this3.state = state;
    _this3.state.uploadedFiles = [];
    _this3.getUploadedFiles = _this3.getUploadedFiles.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
    return _this3;
  }

  _createClass(AuthorsPage, [{
    key: "getUploadedFiles",
    value: function getUploadedFiles(file) {
      var uploadedFile = [];

      var nextState = _objectSpread({}, this.state);

      nextState.uploadedFiles.push({
        preview: file.preview,
        path: file.response.body.fullPath,
        filename: file.response.body.fileName
      });
      this.state = _objectSpread({}, nextState);
    }
  }, {
    key: "addNewPost",
    value: function addNewPost(e) {
      var contentValue = e.render().querySelector('textarea').value;
      var queryArray = [];
      if (contentValue !== '') queryArray.push("content=".concat(contentValue));
      if (this.state.uploadedFiles.length !== 0) queryArray.push("image=".concat(this.state.uploadedFiles[0].filename));
      queryArray.push("author=".concat(_LOCALS.user.currentAuthor._id));
      if (queryArray.length === 0) return;
      var query = queryArray.map(function (q) {
        return q;
      }).join('&');
      query = "/api/post/create/?".concat(query);
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', query, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          var newPost = JSON.parse(this.responseText);
          that.state.posts.results.unshift(newPost.post);
          that.state.uploadedFiles = [];
          that.render();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this);
      return this.html(_templateObject3(), new NavBar(this.state), new AuthorSidebar(this.state.author), _LOCALS.isSignedIn && _LOCALS.user.currentAuthor._id == this.state.author._id ? hyperHTML.wire()(_templateObject4(), new PostEditor({
        that: this,
        autoFocus: false,
        post: '',
        class: '',
        buttons: [{
          title: 'Опубликовать',
          class: 'btn btn-primary',
          onClick: this.addNewPost
        }],
        actions: {
          getUploadedFiles: this.getUploadedFiles
        }
      })) : '', new AuthorInfo(this.state.author), new Posts(this.state));
    }
  }]);

  return AuthorsPage;
}(hyperHTML.Component);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tuYW1lXS9mcm9udGVuZC9hdXRob3IuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL3NjcmVlbnMvQXV0aG9yc1BhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhdXRob3JcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2F1dGhvci5qc1wiLFwiY29tbW9uc1wiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImNvbnN0IGh5cGVySFRNTCA9IHJlcXVpcmUoJ2h5cGVyaHRtbC9janMnKS5kZWZhdWx0O1xuY29uc3QgQXV0aG9yc1BhZ2UgPSByZXF1aXJlKCcuL3NjcmVlbnMvQXV0aG9yc1BhZ2UnKTtcblxuLy8gbGV0IGFwaSA9IChfTE9DQUxTKSA/ICc/YXBpS2V5PScgKyBfTE9DQUxTLmFwaUtleSA6ICcnO1xubGV0IGFwaSA9IChfTE9DQUxTKSA/ICc/YXBpS2V5PScgKyBfTE9DQUxTLmFwaUtleSA6ICc/YXBpS2V5PTEyMyc7XG5cblxubGV0IGF1dGhvciA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoJy9hdXRob3InLCAnJyk7XG5cbmZldGNoKCcvYXBpL3Bvc3QvbGlzdCcgKyBhdXRob3IgKyBhcGksIHttZXRob2Q6ICdHRVQnfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBoeXBlckhUTUwoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKSlgJHtuZXcgQXV0aG9yc1BhZ2UocmVzKX1gO1xuICAgIH0pLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZSkpO1xuIiwiY29uc3QgaHlwZXJIVE1MID0gcmVxdWlyZSgnaHlwZXJodG1sL2NqcycpLmRlZmF1bHQ7XG5jb25zdCBOYXZCYXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL25hdmJhci9OYXZiYXInKTtcbmNvbnN0IFBvc3RzID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Qb3N0cycpO1xuY29uc3QgUG9zdEVkaXRvciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvUG9zdEVkaXRvcicpO1xuXG5pbXBvcnQgVXBweSBmcm9tICd1cHB5L2xpYi9jb3JlJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAndXBweS9saWIvcGx1Z2lucy9EYXNoYm9hcmQnO1xuaW1wb3J0IFhIUlVwbG9hZCBmcm9tICd1cHB5L2xpYi9wbHVnaW5zL1hIUlVwbG9hZCc7XG5pbXBvcnQgV2ViY2FtIGZyb20gJ3VwcHkvbGliL3BsdWdpbnMvV2ViY2FtJztcblxuY29uc3QgQVVUSE9SX0RBVEVfT1BUUyA9IHtcbiAgICAvLyBlcmE6ICdsb25nJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgICAvLyB3ZWVrZGF5OiAnbG9uZycsXG4gICAgdGltZXpvbmU6ICdVVEMnLFxuICAgIC8vIGhvdXI6ICdudW1lcmljJyxcbiAgICAvLyBtaW51dGU6ICdudW1lcmljJyxcbiAgICAvLyBzZWNvbmQ6ICdudW1lcmljJ1xufTtcblxuY2xhc3MgQXV0aG9yU2lkZWJhciBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwaG90byA9IHRoaXMuc3RhdGUuYXV0aG9yUGhvdG87XG4gICAgICAgIGxldCBuYW1lID0gYCR7dGhpcy5zdGF0ZS5uYW1lLmZpcnN0fSAke3RoaXMuc3RhdGUubmFtZS5sYXN0fSAke3RoaXMuc3RhdGUucGF0cm9ueW1pY31gO1xuICAgICAgICBsZXQgYmlydGhEYXkgPSBuZXcgRGF0ZSh0aGlzLnN0YXRlLmJpcnRoRGF5KTtcbiAgICAgICAgYmlydGhEYXkgPSBiaXJ0aERheS50b0xvY2FsZVN0cmluZygncnUnLCBBVVRIT1JfREFURV9PUFRTKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdzaWRlYmFyLW5hdic+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz0naW1nLWNpcmNsZSB1c2VyLXBpY3R1cmUnIHNyYz0nJHsocGhvdG8pID8gYC8ke3Bob3RvLmZpbGVuYW1lfWAgOiAnL2ltYWdlcy9hdmF0YXItZGVmYXVsdC5wbmcnfScgYWx0PScke25hbWV9Jz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9J3RleHQtY2VudGVyJz4ke25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICA8aHI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9J3RleHQtY2VudGVyIHVzZXItZGVzY3JpcHRpb24gaGlkZGVuLXhzJz5cbiAgICAgICAgICAgICAgICAgICAgPGk+JHtiaXJ0aERheX08L2k+XG4gICAgICAgICAgICAgICAgICAgIDxicj5cbiAgICAgICAgICAgICAgICAgICAgPGk+JHt0aGlzLnN0YXRlLmJpcnRoQ2l0eX0sICR7dGhpcy5zdGF0ZS5iaXJ0aENvdW50cnl9PC9pPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgIH1cbn1cblxuY2xhc3MgQXV0aG9ySW5mbyBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhdXRob3JQaG90byA9IHRoaXMuc3RhdGUucGhvdG87XG4gICAgICAgIGxldCBuYW1lID0gYCR7dGhpcy5zdGF0ZS5uYW1lLmZpcnN0fSAke3RoaXMuc3RhdGUubmFtZS5sYXN0fSAke3RoaXMuc3RhdGUucGF0cm9ueW1pY31gO1xuICAgICAgICBsZXQgYmlydGhEYXkgPSBuZXcgRGF0ZSh0aGlzLnN0YXRlLmJpcnRoRGF5KTtcbiAgICAgICAgYmlydGhEYXkgPSBiaXJ0aERheS50b0xvY2FsZVN0cmluZygncnUnLCBBVVRIT1JfREFURV9PUFRTKTtcbiAgICAgICAgbGV0IGRlYXRoRGF5ID0gbmV3IERhdGUodGhpcy5zdGF0ZS5iaXJ0aERheSk7XG4gICAgICAgIGRlYXRoRGF5ID0gZGVhdGhEYXkudG9Mb2NhbGVTdHJpbmcoJ3J1JywgQVVUSE9SX0RBVEVfT1BUUyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2FyZC1wb3N0Jz5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9J3RhYmxlIHRhYmxlLWNvbmRlbnNlZCc+XG4gICAgICAgICAgICAgICAgICAgIDxjYXB0aW9uPiR7bmFtZX08L2NhcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JTQsNGC0LAg0YDQvtC20LTQtdC90LjRjzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7YmlydGhEYXl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCU0LDRgtCwINGB0LzQtdGA0YLQuDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7ZGVhdGhEYXl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCc0LXRgdGC0L4g0YDQvtC20LTQtdC90LjRjzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpcy5zdGF0ZS5iaXJ0aENpdHl9LCAke3RoaXMuc3RhdGUuYmlydGhDb3VudHJ5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QoNC+0LTQuNGC0LXQu9C4PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGlzLnN0YXRlLnBhcmVudHN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCU0LXRgtC4PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGlzLnN0YXRlLmNoaWxkcmVufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QndCw0LPRgNCw0LTRizwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpcy5zdGF0ZS5ob25vcnN9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCh0YHRi9C70LrQuDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxhPiR7dGhpcy5zdGF0ZS53aWtpcGVkaWFMaW5rfTwvYT48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrRg9GA0LDRgtC+0YAg0YHRgtGA0LDQvdC40YbRiyDQsNCy0YLQvtGA0LA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaXMuc3RhdGUubmFtZS5maXJzdH0gJHt0aGlzLnN0YXRlLm5hbWUubGFzdH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQXV0aG9yc1BhZ2UgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUudXBsb2FkZWRGaWxlcyA9IFtdO1xuICAgICAgICB0aGlzLmdldFVwbG9hZGVkRmlsZXMgPSB0aGlzLmdldFVwbG9hZGVkRmlsZXMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRVcGxvYWRlZEZpbGVzKGZpbGUpIHtcbiAgICAgICAgbGV0IHVwbG9hZGVkRmlsZSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgbGV0IG5leHRTdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSB9O1xuICAgICAgICBcbiAgICAgICAgbmV4dFN0YXRlLnVwbG9hZGVkRmlsZXMucHVzaCh7XG4gICAgICAgICAgICBwcmV2aWV3OiBmaWxlLnByZXZpZXcsXG4gICAgICAgICAgICBwYXRoOiBmaWxlLnJlc3BvbnNlLmJvZHkuZnVsbFBhdGgsXG4gICAgICAgICAgICBmaWxlbmFtZTogZmlsZS5yZXNwb25zZS5ib2R5LmZpbGVOYW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0geyAuLi5uZXh0U3RhdGUgfTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgYWRkTmV3UG9zdChlKSB7XG4gICAgICAgIGxldCBjb250ZW50VmFsdWUgPSBlLnJlbmRlcigpLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWU7XG4gICAgICAgIGxldCBxdWVyeUFycmF5ID0gW107XG4gICAgICAgIGlmIChjb250ZW50VmFsdWUgIT09ICcnKSBxdWVyeUFycmF5LnB1c2goYGNvbnRlbnQ9JHtjb250ZW50VmFsdWV9YCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnVwbG9hZGVkRmlsZXMubGVuZ3RoICE9PSAwKSBxdWVyeUFycmF5LnB1c2goYGltYWdlPSR7dGhpcy5zdGF0ZS51cGxvYWRlZEZpbGVzWzBdLmZpbGVuYW1lfWApO1xuICAgICAgICBxdWVyeUFycmF5LnB1c2goYGF1dGhvcj0ke19MT0NBTFMudXNlci5jdXJyZW50QXV0aG9yLl9pZH1gKTtcblxuICAgICAgICBpZiAocXVlcnlBcnJheS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBsZXQgcXVlcnkgPSBxdWVyeUFycmF5Lm1hcCgocSkgPT4gcSkuam9pbignJicpO1xuICAgICAgICBxdWVyeSA9IGAvYXBpL3Bvc3QvY3JlYXRlLz8ke3F1ZXJ5fWA7XG5cbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCBxdWVyeSwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdQb3N0ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0ZS5wb3N0cy5yZXN1bHRzLnVuc2hpZnQobmV3UG9zdC5wb3N0KTtcbiAgICAgICAgICAgICAgICB0aGF0LnN0YXRlLnVwbG9hZGVkRmlsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8ZGl2ICA+XG4gICAgICAgICAgICAgICAgJHtuZXcgTmF2QmFyICh0aGlzLnN0YXRlKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdwcm9maWxlJz5cbiAgICAgICAgICAgICAgICAgICAgJHtuZXcgQXV0aG9yU2lkZWJhcih0aGlzLnN0YXRlLmF1dGhvcil9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRlbnQtcG9zdHMgcHJvZmlsZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Jhbm5lci1wcm9maWxlJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2ltYWdlcy9ib29rc2hlbGYuanBnXCIpOyc+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250YWluZXItZmx1aWQgY29udGFpbmVyLXBvc3RzJz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7KF9MT0NBTFMuaXNTaWduZWRJbiAmJiBfTE9DQUxTLnVzZXIuY3VycmVudEF1dGhvci5faWQgPT0gdGhpcy5zdGF0ZS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjYXJkLXBvc3QnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+0J3QvtCy0LDRjyDQv9GD0LHQu9C40LrQsNGG0LjRjzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bmV3IFBvc3RFZGl0b3Ioe3RoYXQ6IHRoaXMsIGF1dG9Gb2N1czogZmFsc2UsIHBvc3Q6ICcnLCBjbGFzczogJycsIGJ1dHRvbnM6IFt7dGl0bGU6ICfQntC/0YPQsdC70LjQutC+0LLQsNGC0YwnLCBjbGFzczogJ2J0biBidG4tcHJpbWFyeScsIG9uQ2xpY2s6IHRoaXMuYWRkTmV3UG9zdH1dLCBhY3Rpb25zOiB7Z2V0VXBsb2FkZWRGaWxlczogdGhpcy5nZXRVcGxvYWRlZEZpbGVzfX0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke25ldyBBdXRob3JJbmZvKHRoaXMuc3RhdGUuYXV0aG9yKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtuZXcgUG9zdHModGhpcy5zdGF0ZSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVRBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQVZBO0FBQ0E7QUFXQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBWUE7Ozs7QUF4QkE7QUFDQTtBQTBCQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQXlDQTs7OztBQXZEQTtBQUNBO0FBeURBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUtBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUVBO0FBckJBO0FBQUE7QUFBQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoREE7QUFBQTtBQUFBO0FBbURBO0FBRUE7QUFhQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVlBO0FBOUVBO0FBQ0E7QUFEQTtBQUFBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=