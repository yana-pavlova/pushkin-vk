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
/******/ 	deferredModules.push(["./author.js","commons","vendors~author"]);
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

var AuthorsPage = __webpack_require__(/*! ./components/authorsPage */ "./components/authorsPage.js"); // let api = (_LOCALS) ? '?apiKey=' + _LOCALS.apiKey : '';


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

/***/ "./components/authorsPage.js":
/*!***********************************!*\
  !*** ./components/authorsPage.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = _interopRequireDefault(__webpack_require__(/*! uppy/lib/core */ "../node_modules/uppy/lib/core/index.js"));

var _Dashboard = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/Dashboard */ "../node_modules/uppy/lib/plugins/Dashboard/index.js"));

var _XHRUpload = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/XHRUpload */ "../node_modules/uppy/lib/plugins/XHRUpload.js"));

var _Webcam = _interopRequireDefault(__webpack_require__(/*! uppy/lib/plugins/Webcam */ "../node_modules/uppy/lib/plugins/Webcam/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n                                                <div class='image-preview'>\n                                                    \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E 1 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:\n                                                    <br>\n                                                    <img src='", "'>\n                                                </div>\n                                                "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n                                    <div class='card-post'>\n                                        <div>\u041D\u043E\u0432\u0430\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F</div>\n                                        ", "\n                                        <br><br><br>\n                                        <hr>\n                                        <button class='btn btn-link' id='UppyModalOpenerBtn'>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</button>\n                                        <div class=\"DashboardContainer\"></div>\n                                        ", "\n                                    </div>\n                                "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            <div onconnected=", " >\n                ", "\n                <div class='profile'>\n                    ", "\n                    <div class='content-posts profile-content'>\n                        <div class='banner-profile' style='background-image: url(\"/images/bookshelf.jpg\");'></div>\n                        <div class='container-fluid container-posts'>\n                            ", "\n                            ", "\n                        </div>\n                        ", "\n                    </div>\n                </div>\n            </div>\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

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

var NavBar = __webpack_require__(/*! ./navbar */ "./components/navbar.js");

var Posts = __webpack_require__(/*! ./posts */ "./components/posts.js");

var PostEditor = __webpack_require__(/*! ./postEditor */ "./components/postEditor.js");

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
      var authorPhoto = this.state.authorPhoto;
      var name = "".concat(this.state.authorName.first, " ").concat(this.state.authorName.last, " ").concat(this.state.authorPatronymic);
      var birthDay = new Date(this.state.birthDay);
      birthDay = birthDay.toLocaleString('ru', AUTHOR_DATE_OPTS);
      return this.html(_templateObject(), authorPhoto ? "/".concat(authorPhoto.filename) : '/images/avatar-default.png', name, name, birthDay, this.state.birthCity, this.state.birthCountry);
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
      var authorPhoto = this.state.authorPhoto;
      var name = "".concat(this.state.authorName.first, " ").concat(this.state.authorName.last, " ").concat(this.state.authorPatronymic);
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
    return _this3;
  }

  _createClass(AuthorsPage, [{
    key: "onconnected",
    value: function onconnected() {
      var _this4 = this;

      if (_LOCALS.registered && _LOCALS.user._id == this.state.author._id) {
        this.state.uploadedFiles = [];
        this.uppy = new _core.default({
          autoProceed: false,
          restrictions: {
            maxFileSize: 1000000,
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*']
          },
          locale: {
            strings: {
              youCanOnlyUploadX: {
                0: 'Вы можете загрузить максимум %{smart_count} файл',
                1: 'Вы можете загрузить максимум %{smart_count} файлов'
              },
              youHaveToAtLeastSelectX: {
                0: 'Выберите минимум %{smart_count} файл',
                1: 'Выберите минимум %{smart_count} файлов'
              },
              exceedsSize: 'Размер файла превышает ',
              youCanOnlyUploadFileTypes: 'Вы можете загружать только:',
              uppyServerError: 'Соединение с сервером разорвано',
              failedToUpload: 'Ошибка загрузки %{file}',
              noInternetConnection: 'Вы не подключены к Интернету',
              connectedToInternet: 'Подключено к Интернету',
              // Strings for remote providers
              noFilesFound: 'Не выбрано ни одного файла',
              selectXFiles: {
                0: 'Выбран %{smart_count} файл',
                1: 'Выбрано %{smart_count} файлов'
              },
              cancel: 'Отменить',
              logOut: 'Выйти'
            }
          }
        }).use(_Dashboard.default, {
          trigger: '#UppyModalOpenerBtn',
          inline: false,
          target: '.DashboardContainer',
          closeModalOnClickOutside: true,
          replaceTargetContent: false,
          showProgressDetails: true,
          note: 'Только изображения, 1 файл, размер до 1 MB',
          height: 370,
          // metaFields: [
          //   { id: 'name', name: 'Название', placeholder: 'Имя файла' },
          //   { id: 'caption', name: 'Описание', placeholder: 'Описание' }
          // ],
          browserBackButtonClose: true,
          locale: {
            strings: {
              selectToUpload: 'Выберите файл для загрузки',
              closeModal: 'Закрыть окно',
              upload: 'Загрузить',
              importFrom: 'Импортировать из %{name}',
              dashboardWindowTitle: 'Окно загрузки (закрыть -  escape)',
              dashboardTitle: 'Окно загрузки',
              copyLinkToClipboardSuccess: 'Ссылка сокопирована в буфер обмена',
              copyLinkToClipboardFallback: 'Скопировать URL',
              copyLink: 'Копировать ссылку',
              fileSource: 'Файл: %{name}',
              done: 'Готово>',
              name: 'Имя',
              removeFile: 'Удалить файл',
              editFile: 'Редактировать файл',
              editing: 'Редактируется %{file}',
              finishEditingFile: 'Завершиьт редактироавние файла',
              saveChanges: 'Сохраниьт изменения',
              localDisk: 'Локальный диск',
              myDevice: 'Моё устройство',
              dropPasteImport: 'Перенесите файлы, вставьте из буфера или %{browse}',
              dropPaste: 'Перенесите файлы, вставьте из буфера, или %{browse}',
              browse: 'Выберите',
              fileProgress: 'Прогресс: скорость загрузки, ожидаемое время',
              numberOfSelectedFiles: 'Количество выбранных файлов',
              uploadAllNewFiles: 'Загрузиьт все новые файлы',
              emptyFolderAdded: 'Папка пуста, файлы не были добавлены',
              uploadComplete: 'Загрузка завершена',
              uploading: 'Загрузка',
              complete: 'Завершено',
              uploadFailed: 'Ошибка загрузки',
              pleasePressRetry: 'Пожалуйста нажмите Повторить для повторной попытки',
              paused: 'Пауза',
              error: 'Ошибка',
              retry: 'Повторить',
              cancel: 'Отменить',
              pressToRetry: 'Нажмите для повтора',
              retryUpload: 'Повторить загрузку',
              resumeUpload: 'Продолжить загрузку',
              cancelUpload: 'Отмениьт загрузку',
              pauseUpload: 'Пауза',
              filesUploadedOfTotal: {
                0: '%{complete} из %{smart_count} файлов загружено',
                1: '%{complete} из %{smart_count} файлов загружено'
              },
              dataUploadedOfTotal: '%{complete} из %{total}',
              xTimeLeft: '%{time} осталось',
              folderAdded: {
                0: 'Добавлен %{smart_count} файл из папки %{folder}',
                1: 'Добавлено %{smart_count} файлов из папки %{folder}'
              },
              uploadXFiles: {
                0: 'Загрузить %{smart_count} файл',
                1: 'Загрузиьт %{smart_count} файлов'
              },
              uploadXNewFiles: {
                0: 'Загрузить +%{smart_count} файл',
                1: 'Загрузить +%{smart_count} файлов'
              }
            }
          }
        }).use(_XHRUpload.default, {
          endpoint: '/api/file/uploadImage',
          formData: true,
          fieldName: 'files',
          locale: {
            strings: {
              timedOut: 'Загрузка подвисла на %{seconds} секунд. Отменено.'
            }
          }
        }).use(_Webcam.default, {
          target: _Dashboard.default,
          locale: {
            strings: {
              smile: 'А сейчас вылетит птичка',
              takePicture: 'Снять',
              startRecording: 'Идет запись',
              stopRecording: 'Остановить запись'
            }
          }
        });
        this.uppy.on('complete', function (result) {
          var success = result.successful[0];

          _this4.state.uploadedFiles.push({
            preview: success.preview,
            path: success.response.body.fullPath,
            fileName: success.response.body.fileName
          });

          _this4.uppy.getPlugin('Dashboard').closeModal(); // this.uppy = null;


          _this4.render();
        });
      }
    }
  }, {
    key: "addNewPost",
    value: function addNewPost(content) {
      content = content.render().querySelector('textarea').value;
      var image = this.state.uploadedFiles.length != 0 ? "&image=".concat(this.state.uploadedFiles[0].fileName) : '';
      var that = this;
      var xhr = new XMLHttpRequest();
      var query = '/api/post/create/?content=' + content + image;
      xhr.open('GET', query, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          var newPost = JSON.parse(this.responseText);
          that.state.posts.results.unshift(newPost.post);
          that.state.uploadedFiles = [];
          that.uppy.reset();
          that.render();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject3(), this, new NavBar(this.state), new AuthorSidebar(this.state.author), _LOCALS.registered && _LOCALS.user._id == this.state.author._id ? hyperHTML.wire(_LOCALS, ':registered')(_templateObject4(), new PostEditor({
        that: this,
        autoFocus: false,
        post: '',
        class: '',
        buttons: [{
          title: 'Опубликовать',
          class: 'btn btn-primary',
          onClick: this.addNewPost
        }]
      }), this.state.uploadedFiles.length ? hyperHTML.wire()(_templateObject5(), this.state.uploadedFiles[0].preview) : '') : '', new AuthorInfo(this.state.author), new Posts(this.state));
    }
  }]);

  return AuthorsPage;
}(hyperHTML.Component);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tuYW1lXS9mcm9udGVuZC9hdXRob3IuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL2NvbXBvbmVudHMvYXV0aG9yc1BhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhdXRob3JcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucF9uYW1lX1wiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL2F1dGhvci5qc1wiLFwiY29tbW9uc1wiLFwidmVuZG9yc35hdXRob3JcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJjb25zdCBoeXBlckhUTUwgPSByZXF1aXJlKCdoeXBlcmh0bWwvY2pzJykuZGVmYXVsdDtcbmNvbnN0IEF1dGhvcnNQYWdlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2F1dGhvcnNQYWdlJyk7XG5cbi8vIGxldCBhcGkgPSAoX0xPQ0FMUykgPyAnP2FwaUtleT0nICsgX0xPQ0FMUy5hcGlLZXkgOiAnJztcbmxldCBhcGkgPSAoX0xPQ0FMUykgPyAnP2FwaUtleT0nICsgX0xPQ0FMUy5hcGlLZXkgOiAnP2FwaUtleT0xMjMnO1xuXG5cbmxldCBhdXRob3IgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCcvYXV0aG9yJywgJycpO1xuXG5mZXRjaCgnL2FwaS9wb3N0L2xpc3QnICsgYXV0aG9yICsgYXBpLCB7bWV0aG9kOiAnR0VUJ30pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaHlwZXJIVE1MKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JykpYCR7bmV3IEF1dGhvcnNQYWdlKHJlcyl9YDtcbiAgICB9KS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUpKTtcbiIsImNvbnN0IGh5cGVySFRNTCA9IHJlcXVpcmUoJ2h5cGVyaHRtbC9janMnKS5kZWZhdWx0O1xuY29uc3QgTmF2QmFyID0gcmVxdWlyZSgnLi9uYXZiYXInKTtcbmNvbnN0IFBvc3RzID0gcmVxdWlyZSgnLi9wb3N0cycpO1xuY29uc3QgUG9zdEVkaXRvciA9IHJlcXVpcmUoJy4vcG9zdEVkaXRvcicpO1xuXG5pbXBvcnQgVXBweSBmcm9tICd1cHB5L2xpYi9jb3JlJztcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAndXBweS9saWIvcGx1Z2lucy9EYXNoYm9hcmQnO1xuaW1wb3J0IFhIUlVwbG9hZCBmcm9tICd1cHB5L2xpYi9wbHVnaW5zL1hIUlVwbG9hZCc7XG5pbXBvcnQgV2ViY2FtIGZyb20gJ3VwcHkvbGliL3BsdWdpbnMvV2ViY2FtJztcblxuY29uc3QgQVVUSE9SX0RBVEVfT1BUUyA9IHtcbiAgICAvLyBlcmE6ICdsb25nJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgICAvLyB3ZWVrZGF5OiAnbG9uZycsXG4gICAgdGltZXpvbmU6ICdVVEMnLFxuICAgIC8vIGhvdXI6ICdudW1lcmljJyxcbiAgICAvLyBtaW51dGU6ICdudW1lcmljJyxcbiAgICAvLyBzZWNvbmQ6ICdudW1lcmljJ1xufTtcblxuY2xhc3MgQXV0aG9yU2lkZWJhciBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhdXRob3JQaG90byA9IHRoaXMuc3RhdGUuYXV0aG9yUGhvdG87XG4gICAgICAgIGxldCBuYW1lID0gYCR7dGhpcy5zdGF0ZS5hdXRob3JOYW1lLmZpcnN0fSAke3RoaXMuc3RhdGUuYXV0aG9yTmFtZS5sYXN0fSAke3RoaXMuc3RhdGUuYXV0aG9yUGF0cm9ueW1pY31gO1xuICAgICAgICBsZXQgYmlydGhEYXkgPSBuZXcgRGF0ZSh0aGlzLnN0YXRlLmJpcnRoRGF5KTtcbiAgICAgICAgYmlydGhEYXkgPSBiaXJ0aERheS50b0xvY2FsZVN0cmluZygncnUnLCBBVVRIT1JfREFURV9PUFRTKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J3NpZGViYXItbmF2Jz5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPSdpbWctY2lyY2xlIHVzZXItcGljdHVyZScgc3JjPSckeyhhdXRob3JQaG90bykgPyBgLyR7YXV0aG9yUGhvdG8uZmlsZW5hbWV9YCA6ICcvaW1hZ2VzL2F2YXRhci1kZWZhdWx0LnBuZyd9JyBhbHQ9JyR7bmFtZX0nPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz0ndGV4dC1jZW50ZXInPiR7bmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxocj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz0ndGV4dC1jZW50ZXIgdXNlci1kZXNjcmlwdGlvbiBoaWRkZW4teHMnPlxuICAgICAgICAgICAgICAgICAgICA8aT4ke2JpcnRoRGF5fTwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICA8aT4ke3RoaXMuc3RhdGUuYmlydGhDaXR5fSwgJHt0aGlzLnN0YXRlLmJpcnRoQ291bnRyeX08L2k+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgXG4gICAgfVxufVxuXG5jbGFzcyBBdXRob3JJbmZvIGV4dGVuZHMgaHlwZXJIVE1MLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGF1dGhvclBob3RvID0gdGhpcy5zdGF0ZS5hdXRob3JQaG90bztcbiAgICAgICAgbGV0IG5hbWUgPSBgJHt0aGlzLnN0YXRlLmF1dGhvck5hbWUuZmlyc3R9ICR7dGhpcy5zdGF0ZS5hdXRob3JOYW1lLmxhc3R9ICR7dGhpcy5zdGF0ZS5hdXRob3JQYXRyb255bWljfWA7XG4gICAgICAgIGxldCBiaXJ0aERheSA9IG5ldyBEYXRlKHRoaXMuc3RhdGUuYmlydGhEYXkpO1xuICAgICAgICBiaXJ0aERheSA9IGJpcnRoRGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIEFVVEhPUl9EQVRFX09QVFMpO1xuICAgICAgICBsZXQgZGVhdGhEYXkgPSBuZXcgRGF0ZSh0aGlzLnN0YXRlLmJpcnRoRGF5KTtcbiAgICAgICAgZGVhdGhEYXkgPSBkZWF0aERheS50b0xvY2FsZVN0cmluZygncnUnLCBBVVRIT1JfREFURV9PUFRTKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdjYXJkLXBvc3QnPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz0ndGFibGUgdGFibGUtY29uZGVuc2VkJz5cbiAgICAgICAgICAgICAgICAgICAgPGNhcHRpb24+JHtuYW1lfTwvY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QlNCw0YLQsCDRgNC+0LbQtNC10L3QuNGPPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtiaXJ0aERheX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JTQsNGC0LAg0YHQvNC10YDRgtC4PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtkZWF0aERheX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JzQtdGB0YLQviDRgNC+0LbQtNC10L3QuNGPPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGlzLnN0YXRlLmJpcnRoQ2l0eX0sICR7dGhpcy5zdGF0ZS5iaXJ0aENvdW50cnl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCg0L7QtNC40YLQtdC70Lg8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaXMuc3RhdGUucGFyZW50c308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JTQtdGC0Lg8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaXMuc3RhdGUuY2hpbGRyZW59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCd0LDQs9GA0LDQtNGLPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0aGlzLnN0YXRlLmhvbm9yc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0KHRgdGL0LvQutC4PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGE+JHt0aGlzLnN0YXRlLndpa2lwZWRpYUxpbmt9PC9hPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QmtGD0YDQsNGC0L7RgCDRgdGC0YDQsNC90LjRhtGLINCw0LLRgtC+0YDQsDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpcy5zdGF0ZS5uYW1lLmZpcnN0fSAke3RoaXMuc3RhdGUubmFtZS5sYXN0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBdXRob3JzUGFnZSBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zdGF0ZS51cGxvYWRlZEZpbGVzID0gW107XG4gICAgfVxuXG4gICAgb25jb25uZWN0ZWQoKSB7XG4gICAgICAgIGlmIChfTE9DQUxTLnJlZ2lzdGVyZWQgJiYgX0xPQ0FMUy51c2VyLl9pZCA9PSB0aGlzLnN0YXRlLmF1dGhvci5faWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudXBsb2FkZWRGaWxlcyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLnVwcHkgPSBuZXcgVXBweSh7XG4gICAgICAgICAgICAgICAgYXV0b1Byb2NlZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlc3RyaWN0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBtYXhGaWxlU2l6ZTogMTAwMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4TnVtYmVyT2ZGaWxlczogMSxcbiAgICAgICAgICAgICAgICAgICAgbWluTnVtYmVyT2ZGaWxlczogMSxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZEZpbGVUeXBlczogWydpbWFnZS8qJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeW91Q2FuT25seVVwbG9hZFg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiAn0JLRiyDQvNC+0LbQtdGC0LUg0LfQsNCz0YDRg9C30LjRgtGMINC80LDQutGB0LjQvNGD0LwgJXtzbWFydF9jb3VudH0g0YTQsNC50LsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6ICfQktGLINC80L7QttC10YLQtSDQt9Cw0LPRgNGD0LfQuNGC0Ywg0LzQsNC60YHQuNC80YPQvCAle3NtYXJ0X2NvdW50fSDRhNCw0LnQu9C+0LInXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeW91SGF2ZVRvQXRMZWFzdFNlbGVjdFg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiAn0JLRi9Cx0LXRgNC40YLQtSDQvNC40L3QuNC80YPQvCAle3NtYXJ0X2NvdW50fSDRhNCw0LnQuycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogJ9CS0YvQsdC10YDQuNGC0LUg0LzQuNC90LjQvNGD0LwgJXtzbWFydF9jb3VudH0g0YTQsNC50LvQvtCyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4Y2VlZHNTaXplOiAn0KDQsNC30LzQtdGAINGE0LDQudC70LAg0L/RgNC10LLRi9GI0LDQtdGCICcsXG4gICAgICAgICAgICAgICAgICAgICAgICB5b3VDYW5Pbmx5VXBsb2FkRmlsZVR5cGVzOiAn0JLRiyDQvNC+0LbQtdGC0LUg0LfQsNCz0YDRg9C20LDRgtGMINGC0L7Qu9GM0LrQvjonLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBweVNlcnZlckVycm9yOiAn0KHQvtC10LTQuNC90LXQvdC40LUg0YEg0YHQtdGA0LLQtdGA0L7QvCDRgNCw0LfQvtGA0LLQsNC90L4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbGVkVG9VcGxvYWQ6ICfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCAle2ZpbGV9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vSW50ZXJuZXRDb25uZWN0aW9uOiAn0JLRiyDQvdC1INC/0L7QtNC60LvRjtGH0LXQvdGLINC6INCY0L3RgtC10YDQvdC10YLRgycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRUb0ludGVybmV0OiAn0J/QvtC00LrQu9GO0YfQtdC90L4g0Log0JjQvdGC0LXRgNC90LXRgtGDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZ3MgZm9yIHJlbW90ZSBwcm92aWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vRmlsZXNGb3VuZDogJ9Cd0LUg0LLRi9Cx0YDQsNC90L4g0L3QuCDQvtC00L3QvtCz0L4g0YTQsNC50LvQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RYRmlsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiAn0JLRi9Cx0YDQsNC9ICV7c21hcnRfY291bnR9INGE0LDQudC7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiAn0JLRi9Cx0YDQsNC90L4gJXtzbWFydF9jb3VudH0g0YTQsNC50LvQvtCyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogJ9Ce0YLQvNC10L3QuNGC0YwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nT3V0OiAn0JLRi9C50YLQuCcsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnVzZShEYXNoYm9hcmQsIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiAnI1VwcHlNb2RhbE9wZW5lckJ0bicsXG4gICAgICAgICAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICcuRGFzaGJvYXJkQ29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsT25DbGlja091dHNpZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVwbGFjZVRhcmdldENvbnRlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcm9ncmVzc0RldGFpbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgbm90ZTogJ9Ci0L7Qu9GM0LrQviDQuNC30L7QsdGA0LDQttC10L3QuNGPLCAxINGE0LDQudC7LCDRgNCw0LfQvNC10YAg0LTQviAxIE1CJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDM3MCxcbiAgICAgICAgICAgICAgICAvLyBtZXRhRmllbGRzOiBbXG4gICAgICAgICAgICAgICAgLy8gICB7IGlkOiAnbmFtZScsIG5hbWU6ICfQndCw0LfQstCw0L3QuNC1JywgcGxhY2Vob2xkZXI6ICfQmNC80Y8g0YTQsNC50LvQsCcgfSxcbiAgICAgICAgICAgICAgICAvLyAgIHsgaWQ6ICdjYXB0aW9uJywgbmFtZTogJ9Ce0L/QuNGB0LDQvdC40LUnLCBwbGFjZWhvbGRlcjogJ9Ce0L/QuNGB0LDQvdC40LUnIH1cbiAgICAgICAgICAgICAgICAvLyBdLFxuICAgICAgICAgICAgICAgIGJyb3dzZXJCYWNrQnV0dG9uQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgbG9jYWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRvVXBsb2FkOiAn0JLRi9Cx0LXRgNC40YLQtSDRhNCw0LnQuyDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsOiAn0JfQsNC60YDRi9GC0Ywg0L7QutC90L4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkOiAn0JfQsNCz0YDRg9C30LjRgtGMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydEZyb206ICfQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjCDQuNC3ICV7bmFtZX0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGFzaGJvYXJkV2luZG93VGl0bGU6ICfQntC60L3QviDQt9Cw0LPRgNGD0LfQutC4ICjQt9Cw0LrRgNGL0YLRjCAtICBlc2NhcGUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhc2hib2FyZFRpdGxlOiAn0J7QutC90L4g0LfQsNCz0YDRg9C30LrQuCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5TGlua1RvQ2xpcGJvYXJkU3VjY2VzczogJ9Ch0YHRi9C70LrQsCDRgdC+0LrQvtC/0LjRgNC+0LLQsNC90LAg0LIg0LHRg9GE0LXRgCDQvtCx0LzQtdC90LAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29weUxpbmtUb0NsaXBib2FyZEZhbGxiYWNrOiAn0KHQutC+0L/QuNGA0L7QstCw0YLRjCBVUkwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29weUxpbms6ICfQmtC+0L/QuNGA0L7QstCw0YLRjCDRgdGB0YvQu9C60YMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVNvdXJjZTogJ9Ck0LDQudC7OiAle25hbWV9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6ICfQk9C+0YLQvtCy0L4+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQmNC80Y8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmlsZTogJ9Cj0LTQsNC70LjRgtGMINGE0LDQudC7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRGaWxlOiAn0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Ywg0YTQsNC50LsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGluZzogJ9Cg0LXQtNCw0LrRgtC40YDRg9C10YLRgdGPICV7ZmlsZX0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdGluZ0ZpbGU6ICfQl9Cw0LLQtdGA0YjQuNGM0YIg0YDQtdC00LDQutGC0LjRgNC+0LDQstC90LjQtSDRhNCw0LnQu9CwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVDaGFuZ2VzOiAn0KHQvtGF0YDQsNC90LjRjNGCINC40LfQvNC10L3QtdC90LjRjycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbERpc2s6ICfQm9C+0LrQsNC70YzQvdGL0Lkg0LTQuNGB0LonLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXlEZXZpY2U6ICfQnNC+0ZEg0YPRgdGC0YDQvtC50YHRgtCy0L4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcFBhc3RlSW1wb3J0OiAn0J/QtdGA0LXQvdC10YHQuNGC0LUg0YTQsNC50LvRiywg0LLRgdGC0LDQstGM0YLQtSDQuNC3INCx0YPRhNC10YDQsCDQuNC70LggJXticm93c2V9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BQYXN0ZTogJ9Cf0LXRgNC10L3QtdGB0LjRgtC1INGE0LDQudC70YssINCy0YHRgtCw0LLRjNGC0LUg0LjQtyDQsdGD0YTQtdGA0LAsINC40LvQuCAle2Jyb3dzZX0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlOiAn0JLRi9Cx0LXRgNC40YLQtScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlUHJvZ3Jlc3M6ICfQn9GA0L7Qs9GA0LXRgdGBOiDRgdC60L7RgNC+0YHRgtGMINC30LDQs9GA0YPQt9C60LgsINC+0LbQuNC00LDQtdC80L7QtSDQstGA0LXQvNGPJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlck9mU2VsZWN0ZWRGaWxlczogJ9Ca0L7Qu9C40YfQtdGB0YLQstC+INCy0YvQsdGA0LDQvdC90YvRhSDRhNCw0LnQu9C+0LInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkQWxsTmV3RmlsZXM6ICfQl9Cw0LPRgNGD0LfQuNGM0YIg0LLRgdC1INC90L7QstGL0LUg0YTQsNC50LvRiycsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eUZvbGRlckFkZGVkOiAn0J/QsNC/0LrQsCDQv9GD0YHRgtCwLCDRhNCw0LnQu9GLINC90LUg0LHRi9C70Lgg0LTQvtCx0LDQstC70LXQvdGLJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZENvbXBsZXRlOiAn0JfQsNCz0YDRg9C30LrQsCDQt9Cw0LLQtdGA0YjQtdC90LAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkaW5nOiAn0JfQsNCz0YDRg9C30LrQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogJ9CX0LDQstC10YDRiNC10L3QvicsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRGYWlsZWQ6ICfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGVhc2VQcmVzc1JldHJ5OiAn0J/QvtC20LDQu9GD0LnRgdGC0LAg0L3QsNC20LzQuNGC0LUg0J/QvtCy0YLQvtGA0LjRgtGMINC00LvRjyDQv9C+0LLRgtC+0YDQvdC+0Lkg0L/QvtC/0YvRgtC60LgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2VkOiAn0J/QsNGD0LfQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ9Ce0YjQuNCx0LrQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeTogJ9Cf0L7QstGC0L7RgNC40YLRjCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6ICfQntGC0LzQtdC90LjRgtGMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNzVG9SZXRyeTogJ9Cd0LDQttC80LjRgtC1INC00LvRjyDQv9C+0LLRgtC+0YDQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeVVwbG9hZDogJ9Cf0L7QstGC0L7RgNC40YLRjCDQt9Cw0LPRgNGD0LfQutGDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VtZVVwbG9hZDogJ9Cf0YDQvtC00L7Qu9C20LjRgtGMINC30LDQs9GA0YPQt9C60YMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsVXBsb2FkOiAn0J7RgtC80LXQvdC40YzRgiDQt9Cw0LPRgNGD0LfQutGDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlVXBsb2FkOiAn0J/QsNGD0LfQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc1VwbG9hZGVkT2ZUb3RhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6ICcle2NvbXBsZXRlfSDQuNC3ICV7c21hcnRfY291bnR9INGE0LDQudC70L7QsiDQt9Cw0LPRgNGD0LbQtdC90L4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6ICcle2NvbXBsZXRlfSDQuNC3ICV7c21hcnRfY291bnR9INGE0LDQudC70L7QsiDQt9Cw0LPRgNGD0LbQtdC90L4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVVwbG9hZGVkT2ZUb3RhbDogJyV7Y29tcGxldGV9INC40LcgJXt0b3RhbH0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgeFRpbWVMZWZ0OiAnJXt0aW1lfSDQvtGB0YLQsNC70L7RgdGMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlckFkZGVkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogJ9CU0L7QsdCw0LLQu9C10L0gJXtzbWFydF9jb3VudH0g0YTQsNC50Lsg0LjQtyDQv9Cw0L/QutC4ICV7Zm9sZGVyfScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogJ9CU0L7QsdCw0LLQu9C10L3QviAle3NtYXJ0X2NvdW50fSDRhNCw0LnQu9C+0LIg0LjQtyDQv9Cw0L/QutC4ICV7Zm9sZGVyfSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRYRmlsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiAn0JfQsNCz0YDRg9C30LjRgtGMICV7c21hcnRfY291bnR9INGE0LDQudC7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiAn0JfQsNCz0YDRg9C30LjRjNGCICV7c21hcnRfY291bnR9INGE0LDQudC70L7QsidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRYTmV3RmlsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiAn0JfQsNCz0YDRg9C30LjRgtGMICsle3NtYXJ0X2NvdW50fSDRhNCw0LnQuycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogJ9CX0LDQs9GA0YPQt9C40YLRjCArJXtzbWFydF9jb3VudH0g0YTQsNC50LvQvtCyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnVzZShYSFJVcGxvYWQsIHtcbiAgICAgICAgICAgICAgICBlbmRwb2ludDogJy9hcGkvZmlsZS91cGxvYWRJbWFnZScsXG4gICAgICAgICAgICAgICAgZm9ybURhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgZmllbGROYW1lOiAnZmlsZXMnLFxuICAgICAgICAgICAgICAgIGxvY2FsZToge1xuICAgICAgICAgICAgICAgICAgICBzdHJpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lZE91dDogJ9CX0LDQs9GA0YPQt9C60LAg0L/QvtC00LLQuNGB0LvQsCDQvdCwICV7c2Vjb25kc30g0YHQtdC60YPQvdC0LiDQntGC0LzQtdC90LXQvdC+LidcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC51c2UoV2ViY2FtLCB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBEYXNoYm9hcmQsXG4gICAgICAgICAgICAgICAgbG9jYWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtaWxlOiAn0JAg0YHQtdC50YfQsNGBINCy0YvQu9C10YLQuNGCINC/0YLQuNGH0LrQsCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWtlUGljdHVyZTogJ9Ch0L3Rj9GC0YwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRSZWNvcmRpbmc6ICfQmNC00LXRgiDQt9Cw0L/QuNGB0YwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFJlY29yZGluZzogJ9Ce0YHRgtCw0L3QvtCy0LjRgtGMINC30LDQv9C40YHRjCdcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy51cHB5Lm9uKCdjb21wbGV0ZScsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3VjY2VzcyA9IHJlc3VsdC5zdWNjZXNzZnVsWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudXBsb2FkZWRGaWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlldzogc3VjY2Vzcy5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBzdWNjZXNzLnJlc3BvbnNlLmJvZHkuZnVsbFBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBzdWNjZXNzLnJlc3BvbnNlLmJvZHkuZmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cHB5LmdldFBsdWdpbignRGFzaGJvYXJkJykuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudXBweSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGFkZE5ld1Bvc3QoY29udGVudCkge1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZW5kZXIoKS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlO1xuICAgICAgICBsZXQgaW1hZ2UgPSAodGhpcy5zdGF0ZS51cGxvYWRlZEZpbGVzLmxlbmd0aCAhPSAwKSA/IGAmaW1hZ2U9JHt0aGlzLnN0YXRlLnVwbG9hZGVkRmlsZXNbMF0uZmlsZU5hbWV9YCA6ICcnO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgcXVlcnkgPSAnL2FwaS9wb3N0L2NyZWF0ZS8/Y29udGVudD0nICsgY29udGVudCArIGltYWdlO1xuICAgICAgICB4aHIub3BlbignR0VUJywgcXVlcnksIHRydWUpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zdCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIHRoYXQuc3RhdGUucG9zdHMucmVzdWx0cy51bnNoaWZ0KG5ld1Bvc3QucG9zdCk7XG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0ZS51cGxvYWRlZEZpbGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhhdC51cHB5LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhhdC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbGBcbiAgICAgICAgICAgIDxkaXYgb25jb25uZWN0ZWQ9JHt0aGlzfSA+XG4gICAgICAgICAgICAgICAgJHtuZXcgTmF2QmFyICh0aGlzLnN0YXRlKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdwcm9maWxlJz5cbiAgICAgICAgICAgICAgICAgICAgJHtuZXcgQXV0aG9yU2lkZWJhcih0aGlzLnN0YXRlLmF1dGhvcil9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRlbnQtcG9zdHMgcHJvZmlsZS1jb250ZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Jhbm5lci1wcm9maWxlJyBzdHlsZT0nYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2ltYWdlcy9ib29rc2hlbGYuanBnXCIpOyc+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb250YWluZXItZmx1aWQgY29udGFpbmVyLXBvc3RzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkeyhfTE9DQUxTLnJlZ2lzdGVyZWQgJiYgX0xPQ0FMUy51c2VyLl9pZCA9PSB0aGlzLnN0YXRlLmF1dGhvci5faWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaHlwZXJIVE1MLndpcmUoX0xPQ0FMUywgJzpyZWdpc3RlcmVkJylgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjYXJkLXBvc3QnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+0J3QvtCy0LDRjyDQv9GD0LHQu9C40LrQsNGG0LjRjzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bmV3IFBvc3RFZGl0b3Ioe3RoYXQ6IHRoaXMsIGF1dG9Gb2N1czogZmFsc2UsIHBvc3Q6ICcnLCBjbGFzczogJycsIGJ1dHRvbnM6IFt7dGl0bGU6ICfQntC/0YPQsdC70LjQutC+0LLQsNGC0YwnLCBjbGFzczogJ2J0biBidG4tcHJpbWFyeScsIG9uQ2xpY2s6IHRoaXMuYWRkTmV3UG9zdH1dfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPjxicj48YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGhyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2J0biBidG4tbGluaycgaWQ9J1VwcHlNb2RhbE9wZW5lckJ0bic+0JTQvtCx0LDQstC40YLRjCDQuNC30L7QsdGA0LDQttC10L3QuNC1PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIkRhc2hib2FyZENvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7KHRoaXMuc3RhdGUudXBsb2FkZWRGaWxlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gaHlwZXJIVE1MLndpcmUoKWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ltYWdlLXByZXZpZXcnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCU0L7QsdCw0LLQu9C10L3QviAxINC40LfQvtCx0YDQsNC20LXQvdC40LU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPScke3RoaXMuc3RhdGUudXBsb2FkZWRGaWxlc1swXS5wcmV2aWV3fSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtuZXcgQXV0aG9ySW5mbyh0aGlzLnN0YXRlLmF1dGhvcil9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7bmV3IFBvc3RzKHRoaXMuc3RhdGUpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfVxufSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFUQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBV0E7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBOzs7O0FBdkJBO0FBQ0E7QUF5QkE7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUF5Q0E7Ozs7QUF2REE7QUFDQTtBQXlEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQU9BO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXRCQTtBQURBO0FBUkE7QUFvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUF2REE7QUFEQTtBQWRBO0FBOEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFKQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUZBO0FBWUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUE3SkE7QUFBQTtBQUFBO0FBaUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWpMQTtBQUFBO0FBQUE7QUFvTEE7QUFZQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBCQTtBQTFOQTtBQUNBO0FBREE7QUFBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9