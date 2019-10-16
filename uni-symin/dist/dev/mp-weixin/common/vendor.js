(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 0:
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _App = _interopRequireDefault(__webpack_require__(/*! ./App.vue */ 5));

var _index = _interopRequireDefault(__webpack_require__(/*! ./store/index.vue */ 23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.config.productionTip = false;
_vue.default.prototype.$store = _index.default;
createApp(new _App.default({
  store: _index.default
})).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createPage = createPage;
exports.createComponent = createComponent;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/;
var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}

function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }

    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
      /* eslint-disable no-extend-native */

      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(function (value) {
            return promise.resolve(callback()).then(function () {
              return value;
            });
          }, function (reason) {
            return promise.resolve(callback()).then(function () {
              throw reason;
            });
          });
        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni


  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }

  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);

    if (isNaN(currentIndex)) {
      return;
    }

    var urls = fromArgs.urls;

    if (!Array.isArray(urls)) {
      return;
    }

    var len = urls.length;

    if (!len) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }

    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }

    return {
      indicator: false,
      loop: false
    };
  }
};
var protocols = {
  previewImage: previewImage
};
var todos = [];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值

    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }

    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];

        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }

        if (!keyOption) {
          // 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }

    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }

  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }

  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];

    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }

    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;

      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];

      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }

      var returnValue = wx[options.name || methodName].apply(wx, args);

      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }

      return returnValue;
    };
  }

  return method;
}

var todoApis = Object.create(null);
var TODOS = ['subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];

function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
        complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};

function getProvider(_ref2) {
  var service = _ref2.service,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;
  var res = false;

  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }

  isFn(complete) && complete(res);
}

var extraApi =
/*#__PURE__*/
Object.freeze({
  getProvider: getProvider
});

var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }

  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }

    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}

function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}

function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}

function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi =
/*#__PURE__*/
Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
var api =
/*#__PURE__*/
Object.freeze({});
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;

  mpInstance.triggerEvent = function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];

  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }

    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }

    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }

  var mixins = vueOptions.mixins;

  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;

  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }

  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];
  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];

  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));

      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: ''
          };
          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }

  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }

  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }

  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }

  return type;
}

function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};

  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }

  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];

      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts['default'];

        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }

  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];

    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
         *[
         *    ['data.items', 'data.id', item.data.id],
         *    ['metas', 'id', meta.id]
         *],
         *[
         *    ['data.items', 'data.id', item.data.id],
         *    ['metas', 'id', meta.id]
         *],
         *'test'
         */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};

  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }

  return obj;
}

function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';

    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }

      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}

function handleEvent(event) {
  var _this = this;

  event = wrapper$1(event); // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]

  var dataset = (event.currentTarget || event.target).dataset;

  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰

  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  } // [['handle',[1,2,a]],['handle1',[1,2,a]]]


  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];

        if (methodName) {
          var handlerCtx = _this.$vm;

          if (handlerCtx.$options.generic && handlerCtx.$parent && handlerCtx.$parent.$parent) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }

          var handler = handlerCtx[methodName];

          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }

          if (isOnce) {
            if (handler.once) {
              return;
            }

            handler.once = true;
          }

          handler.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
        }
      });
    }
  });
}

var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound'];

function parseBaseApp(vm, _ref3) {
  var mocks = _ref3.mocks,
      initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      {
        if (!wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      this.$vm._isMounted = true;

      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  }; // 兼容旧版本 globalData

  appOptions.globalData = vm.$options.globalData || {};
  initHooks(appOptions, hooks);
  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children; // 优先查找直属

  var parentVm = $children.find(function (childVm) {
    return childVm.$scope._$vueId === vuePid;
  });

  if (parentVm) {
    return parentVm;
  } // 反向递归查找


  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);

    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;

        if (!$refs[ref]) {
          $refs[ref] = [];
        }

        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    }
  });
}

function handleLink(event) {
  var _ref4 = event.detail || event.value,
      vuePid = _ref4.vuePid,
      vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)


  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isPage$$1 = _ref5.isPage,
      initRelation$$1 = _ref5.initRelation;

  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
      _initVueComponent2 = _slicedToArray(_initVueComponent, 2),
      VueComponent = _initVueComponent2[0],
      vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this); // 处理父子关系

        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        }); // 初始化 vue 实例

        this.$vm = new VueComponent(options); // 处理$slots,$scopedSlots（暂不支持动态变化$slots）

        initSlots(this.$vm, properties.vueSlots); // 触发首次 setData

        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;

          this.$vm.__call_hook('mounted');

          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };

  if (isPage$$1) {
    return componentOptions;
  }

  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6) {
  var isPage = _ref6.isPage,
      initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue

    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;

  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }

      if (api[name]) {
        return promisify(name, api[name]);
      }

      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }

        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }

      if (eventApi[name]) {
        return eventApi[name];
      }

      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }

      return promisify(name, wrapper(name, wx[name]));
    }
  });
} else {
  uni.upx2px = upx2px;
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;

/***/ }),

/***/ 10:
/*!***********************************!*\
  !*** ./src/static/utils/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emojimap = _interopRequireDefault(__webpack_require__(/*! ./message/emojimap */ 11));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

wx.EmojiObj = _emojimap.default;
wx.USER = {};
var tempid = ''; // 定时器

var _default = _defineProperty({
  attachInfo: function attachInfo(bool) {
    var res = wx.getSystemInfoSync();
    wx.WIN_WIDTH = res.screenWidth;
    wx.WIN_HEIGHT = res.screenHeight;
    wx.IS_IOS = /ios/i.test(res.system);
    wx.IS_ANDROID = /android/i.test(res.system);
    wx.DEFAULT_HEADER_HEIGHT = 46; // res.screenHeight - res.windowHeight - res.statusBarHeight

    wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT;
    wx.IS_APP = true;
    var custom = wx.getMenuButtonBoundingClientRect();
    wx.STATUS_BAR_HEIGHT = res.statusBarHeight;
    wx.CUSTOM = custom;
    console.log(wx.STATUS_BAR_HEIGHT, wx.CUSTOM);
    wx.CUSTOM_Bar = custom.bottom + custom.top - res.statusBarHeight;

    wx.showAlert = function (options) {
      options.showCancel = false;
      wx.showModal(options);
    };

    wx.showConfirm = function (options) {
      wx.showModal(options);
    };

    if (!bool) {
      console.log = function () {};

      console.info = function () {};

      console.warn = function () {};

      console.error = function () {};

      console.group = function () {};

      console.groupEnd = function () {};

      console.groupCollapsed = function () {};

      console.table = function () {};

      console.dir = function () {};

      console.dirxml = function () {};

      console.assert = function () {};

      console.count = function () {};

      console.trace = function () {};

      console.time = function () {};

      console.timeEnd = function () {};
    }
  },
  //格式化数字
  formatNumber: function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  //格式化时间
  formatTime: function formatTime(date, format) {
    var that = this;
    var newFormat = format || 'YY-M-D h:m:s';
    var newDate = date || new Date();

    if (Object.prototype.toString.call(newDate).slice(8, -1) !== "Date") {
      newDate = new Date(date);
    }

    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return newFormat.replace(/YY|Y|M|D|h|m|s|week|星期/g, function (a) {
      switch (a) {
        case 'YY':
          return newDate.getFullYear();

        case 'Y':
          return (newDate.getFullYear() + '').slice(2);

        case 'M':
          return that.formatNumber(newDate.getMonth() + 1);

        case 'D':
          return that.formatNumber(newDate.getDate());

        case 'h':
          return that.formatNumber(newDate.getHours());

        case 'm':
          return that.formatNumber(newDate.getMinutes());

        case 's':
          return that.formatNumber(newDate.getSeconds());

        case '星期':
          return "星期" + week[newDate.getDay() + 7];

        case 'week':
          return week[newDate.getDay()];
      }
    });
  },

  /**
   * 人性话格式时间
   */
  ctDate: function ctDate(date) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    if (!date) return "";
    var now = Date.now();
    var diffValue;
    var result;
    date = typeof date === "number" ? date : +new Date(date);
    diffValue = now - date;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "个星期前";
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  },
  //返回类型
  typeOf: function typeOf(param) {
    return Object.prototype.toString.call(param).slice(8, -1);
  },
  //判断是否为空
  isEmpty: function isEmpty(param) {
    //基本类型为空
    var condition1 = param === '' || param === null || param === undefined || param === "NaN";
    var condition2;
    var condition3; //引用类型为空

    if (!condition1) {
      condition2 = this.typeOf(param) === "Object" && Object.keys(param).length < 1;
      condition3 = this.typeOf(param) === "Array" && param.length < 1;
    }

    return condition1 || condition2 || condition3;
  },
  //定义授权列表
  scope: {
    userLocation: {
      title: "scope.userLocation",
      message: "获取地理位置",
      method: wx.getLocation
    },
    userInfo: {
      title: "scope.userInfo",
      message: "获取用户信息",
      method: wx.getUserInfo
    }
  },
  //检查授权
  checkAuth: function checkAuth(name) {
    var that = this;
    return new Promise(function (resove, reject) {
      uni.getSetting({
        success: function success(res) {
          if (res.authSetting["scope.".concat(name)]) {
            resove(true);
          } else {
            resove(false);
          }
        },
        fail: function fail() {
          that.networkError();
        }
      });
    });
  },
  //name授权名称，must是否必须
  authorize: function authorize(name, ismust) {
    var that = this;
    var scope = this.scope;
    var authorizeSuccess = this.authorizeSuccess;
    var authorizeFail = this.authorizeFail;
    return new Promise(function (resolve, reject) {
      //检查是否授权
      uni.getSetting({
        success: function success(res) {
          if (!res.authSetting[scope[name].title]) {
            uni.authorize({
              scope: scope[name].title,
              success: function success() {
                authorizeSuccess(scope[name], resolve, reject);
              },
              fail: function fail() {
                resolve(false);
              }
            });
          } else {
            authorizeSuccess(scope[name], resolve, reject);
          }
        },
        fail: function fail() {
          resolve(false);
        }
      });
    });
  },
  //授权成功，调相应方法
  authorizeSuccess: function authorizeSuccess(param, resolve, reject) {
    param.method({
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(res) {
        resolve(false);
      }
    });
  },
  //授权失败，引导授权
  authorizeFail: function (_authorizeFail) {
    function authorizeFail(_x, _x2, _x3, _x4) {
      return _authorizeFail.apply(this, arguments);
    }

    authorizeFail.toString = function () {
      return _authorizeFail.toString();
    };

    return authorizeFail;
  }(function (param, resolve, reject, must) {
    uni.showModal({
      title: "授权提示",
      content: "\u5C0F\u7A0B\u5E8F\u9700\u8981".concat(param.message, "\u6743\u9650"),
      cancelText: '再想想',
      confirmText: '去授权',
      success: function success(res) {
        if (res.confirm) {
          console.log("去授权");
          uni.openSetting({
            success: function success(res) {
              var authSetting = res.authSetting;

              if (authSetting[param.title]) {
                authorizeSuccess(param, resolve, reject);
              } else {
                authorizeFail(param, resolve, reject, must);
              }
            }
          });
        } else if (res.cancel) {
          console.log("再想想");

          if (must) {
            authorizeFail(param, resolve, reject, must);
          } else {
            resolve({
              data: null,
              code: 404,
              msg: '授权失败'
            });
          }
        }
      }
    });
  }),
  //网络错误提示
  networkError: function networkError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$msg = _ref.msg,
        msg = _ref$msg === void 0 ? "网络错误" : _ref$msg;

    console.log();
    this.hideAll();

    if (this.getPage().onPullDownRefresh) {
      uni.showModal({
        title: "网络提示",
        content: "".concat(msg, ",\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u5237\u65B0"),
        confirmText: '立即刷新',
        cancelText: '等会刷新',
        success: function success(res) {
          if (res.confirm) {
            uni.startPullDownRefresh();
          }
        }
      });
    } else {
      this.showFail(msg);
    }
  },

  /* 打开提示信息 */
  showModal: function showModal() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? '提示' : _ref2$title,
        _ref2$content = _ref2.content,
        content = _ref2$content === void 0 ? "出现不明错误" : _ref2$content;

    uni.showModal({
      title: title,
      content: content,
      showCancel: false
    });
  },
  showLoading: function showLoading() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";
    var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    uni.showLoading({
      title: title,
      mask: mask
    });
  },
  hideLoading: function hideLoading() {
    uni.hideLoading();
  },

  /* 隐藏所有提示信息 */
  hideAll: function hideAll() {
    uni.hideLoading();
    uni.stopPullDownRefresh();
    uni.hideNavigationBarLoading();
  },
  showSuccess: function showSuccess(title) {
    uni.showToast({
      title: title
    });
  },
  showFail: function showFail() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "操作失败";
    uni.showToast({
      title: title,
      icon: 'none'
    });
  },
  //获取标签上data
  getData: function getData(e) {
    return e.currentTarget && e.currentTarget.dataset || e.target && e.target.dataset || {};
  },
  //跳转
  goUrl: function goUrl(e) {
    var _this$getData = this.getData(e),
        url = _this$getData.url,
        method = _this$getData.method;

    method = method || "navigateTo";
    var uni = uni || wx;

    if (!url) {
      return;
    }

    if (url.indexOf('tel:') > -1) {
      uni.makePhoneCall({
        phoneNumber: url.split(':')[1]
      });
      return;
    }

    if (url.indexOf('http') > -1) {
      uni.navigateTo({
        url: url
      });
      return;
    }

    uni[method]({
      url: url
    });
  },
  //获表单控件值
  getValue: function getValue(e) {
    return e.detail.value;
  },
  //格式化参数对象
  setOptions: function setOptions(o) {
    return encodeURIComponent(JSON.stringify(o));
  },
  //格式化参数对象
  getOptions: function getOptions(o) {
    return JSON.parse(decodeURIComponent(o));
  },
  //打电话
  call: function call(phoneNumber) {
    uni.makePhoneCall({
      phoneNumber: phoneNumber
    });
  },
  //获取页面对象，0时为当前页面
  getPage: function getPage() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var pages = getCurrentPages();
    var page = pages[pages.length - 1 + index];
    return page;
  },
  setTabbar: function setTabbar(tabbar) {
    if (this.isEmpty(tabbar)) {
      return;
    }

    var color = tabbar.color,
        selectedColor = tabbar.selectedColor,
        backgroundColor = tabbar.backgroundColor,
        borderStyle = tabbar.borderStyle,
        list = tabbar.list;
    uni.setTabBarStyle({
      color: color,
      selectedColor: selectedColor,
      backgroundColor: backgroundColor,
      borderStyle: borderStyle
    });

    for (var i in list) {
      var _list$i = list[i],
          index = _list$i.index,
          text = _list$i.text,
          iconPath = _list$i.iconPath,
          selectedIconPath = _list$i.selectedIconPath;
      uni.setTabBarItem({
        index: index,
        text: text,
        iconPath: iconPath,
        selectedIconPath: selectedIconPath
      });
    }
  },
  //发起支付
  pay: function pay(orderInfo) {
    return new Promise(function (resove, reject) {
      uni.requestPayment({
        appId: orderInfo.appId,
        timeStamp: orderInfo.timeStamp,
        nonceStr: orderInfo.nonceStr,
        'package': orderInfo.package,
        signType: orderInfo.signType,
        paySign: orderInfo.paySign,
        success: function success(res) {
          resove(1);
        },
        fail: function fail(res) {
          resove(0);
        },
        complete: function complete(res) {
          console.log(res);
        }
      });
    });
  },
  payOrder: function payOrder(orderInfo, _success, _fail) {
    return new Promise(function (resove, reject) {
      uni.requestPayment({
        appId: orderInfo.appId,
        timeStamp: orderInfo.timeStamp,
        nonceStr: orderInfo.nonceStr,
        'package': orderInfo.package,
        signType: orderInfo.signType,
        paySign: orderInfo.paySign,
        success: function success(res) {
          _success && _success();
        },
        fail: function fail(res) {
          _fail && _fail();
        },
        complete: function complete(res) {
          console.log(res);
        }
      });
    });
  },
  //动态设置导航信息
  setNavbar: function setNavbar(navbar) {
    if (this.isEmpty(navbar)) {
      return;
    }

    var frontColor = navbar.frontColor,
        backgroundColor = navbar.backgroundColor,
        title = navbar.title;

    if (!this.isEmpty(title)) {
      uni.setNavigationBarTitle({
        title: title
      });
    }

    if (!this.isEmpty(backgroundColor) && !this.isEmpty(frontColor)) {
      uni.setNavigationBarColor({
        frontColor: frontColor,
        backgroundColor: backgroundColor
      });
    }
  },
  //获取当前页面配置
  getPageConfig: function getPageConfig(pages) {
    if (this.isEmpty(pages)) {
      return false;
    }

    var route = this.getPage().route;
    var currentPageConfig = pages[route] || false;
    return currentPageConfig;
  },
  //深拷贝
  deepCopy: function deepCopy(o) {
    var that = this;

    if (o instanceof Array) {
      var n = [];

      for (var i = 0; i < o.length; ++i) {
        n[i] = that.deepCopy(o[i]);
      }

      return n;
    } else if (o instanceof Function) {
      var n = new Function("return " + o.toString())();
      return n;
    } else if (o instanceof Object) {
      var n = {};

      for (var i in o) {
        n[i] = that.deepCopy(o[i]);
      }

      return n;
    } else {
      return o;
    }
  },
  getLocation: function getLocation() {
    //定位
    var that = this;

    var amapFile = __webpack_require__(/*! ../libs/amap-wx.js */ 12);

    var myAmapFun = new amapFile.AMapWX({
      key: '68e88186e3482650208d172a5450ffcd'
    });
    return new Promise(function (resolve, reject) {
      myAmapFun.getRegeo({
        success: function success(data) {
          var addressInfo = data[0]; //成功回调

          resolve(addressInfo);
        },
        fail: function fail(info) {
          console.log(info); //失败回调

          that.networkError({
            msg: "定位失败"
          });
        }
      });
    });
  },
  goToAuth: function goToAuth(userInfo, isback) {
    var isauth = true;

    if (!userInfo || !userInfo.avatarurl || !userInfo.nickname || !userInfo.nickname.length) {
      if (!isback) {
        uni.navigateTo({
          url: '/pages/info/auth/auth'
        });
      }

      isauth = false;
    }

    return isauth;
  },
  throttle: function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500;
    }

    var _lastTime = null; // 返回新的函数

    return function () {
      var _nowTime = +new Date();

      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments); //将this和参数传给原函数

        _lastTime = _nowTime;
      }
    };
  },
  getImageInfo: function getImageInfo(url) {
    return new Promise(function (resolve, reject) {
      /* 获得要在画布上绘制的图片 */
      var objExp = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);

      if (objExp.test(url)) {
        uni.getImageInfo({
          src: url,
          complete: function complete(res) {
            if (res.errMsg === 'getImageInfo:ok') {
              console.log(res);
              resolve({
                path: res.path,
                model: 'ok'
              });
            } else {
              resolve({
                path: res.path,
                model: 'fail'
              });
            }
          }
        });
      } else {
        resolve({
          path: url,
          model: 'no'
        });
      }
    });
  },
  getQueryParams: function getQueryParams(url) {
    url = url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var res = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
      res[decodeURIComponent($1)] = String(decodeURIComponent($2));
      return rs;
    });
    return res;
  },
  clearSign: function clearSign(str) {
    // 去除空格
    var exec_01 = /(\r|\n|(^\s*)|(\s*$))*/g;
    str = str.replace(exec_01, '');
    return str;
  },
  showtoast: function showtoast(context, str, time) {
    clearTimeout(tempid);
    context[str] = true;
    tempid = setTimeout(function () {
      context[str] = false;
    }, time || 500);
  },
  newnum: function newnum(min, max) {
    // 范围随机数
    return (min + (max - min) * Math.random()).toFixed(0);
  },
  distance: function distance(x, y, x1, y1) {
    var earthR = 6371;

    var degfun = function degfun(d) {
      return d * Math.PI / 180.0;
    };

    var degx = degfun(x);
    var degx1 = degfun(x1);
    var degy = degfun(y);
    var degy1 = degfun(y1);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((degx - degx1) / 2), 2) + Math.cos(x) * Math.cos(x1) * Math.pow(Math.sin((degy - degy1) / 2), 2)));
    s = s * earthR;
    s = Math.round(s * 10000) / 10000;
    return s > 100 ? s.toFixed(1) : s > 1 ? s.toFixed(0) : s.toFixed(3);
  },
  getCode: function getCode() {
    return new Promise(function (resove, reject) {
      //登陆
      uni.login({
        success: function success(res) {
          var code = res.code;

          if (code) {
            //发起网络请求
            resove(code);
          } else {
            reject(0);
          }
        },
        fail: function fail() {
          reject(0);
        }
      });
    });
  }
}, "throttle", function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500;
  }

  var _lastTime = null; // 返回新的函数

  return function () {
    var _nowTime = +new Date();

    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments); //将this和参数传给原函数

      _lastTime = _nowTime;
    }
  };
});

exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 100:
/*!******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ 101));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 108:
/*!*******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fcropper"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _cropper = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/cropper.vue */ 109));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_cropper.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 11:
/*!**********************************************!*\
  !*** ./src/static/utils/message/emojimap.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var emojiBaseUrl = "http://yx-web.nosdn.127.net/webdoc/h5/emoji";
var iconEmojiDelete = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAk1BMVEUAAADAwMC3t7e/v7/Gxsa/v7+/v7/AwMC/v7+/v7+/v7++vr7CwsK/v7+/v7+/v7++vr6/v7+/v7+/v7+/v7+/v7/AwMCbm5u/v7+/v7+/v7+/v7/AwMC/v7+/v7+/v7+/v7+/v7+/v7++vr7AwMC9vb2/v7+/v7/CwsLAwMDHx8fExMTIyMjLy8vJycnKysrPz8+3r5/kAAAAKHRSTlMA8Q39A/vcIwf34B0P1uNJIuzPjHFqFwVFmls4J761rMiFoVJ6XTNYKpTiKQAAAylJREFUeF7tmEl3ozAQhNt0ywYM3rfETuJMltEC2P//1w3IVg555olmHjfVlcMnAVUtFfgVFBQUFBQUFBREXAAR8BVnEUNZzF8YwTYdsZQ/Pcc8CsGmNEpyZMoqn/MYzxoFomIIhTDFujtjD3OlEFEyVENqzHUN1HUfx0QiKjliKJEVIorioxuF4LQ0AkW53mddf7Asmh5eNaLQeUfGLtUN4w8wtbaULlshiFZVw3gF7g8Jr4UQ5ZMfQkAvl5pRnWO+teYGhT53YMBbWTP0OAMCrqaJQjmLwKunhmGWkx4MiEZSyZEPQvDeMGRy7MOAbCTRCyHYFqqx+Rxi6KHIC7FhYrCW/gKCQSAuTBRWGwaDCSE4CmmNDtRhJhFxIS5M2o1uweQZmw7iC5N2o58O9EMhyDabjAdxYdJudIINytXiTiGY5tfrKuJBXJjo8a6FsUiMuIynQDfGuEqScgvEgLgwaTU6wVEJFEVDsYxCoOBBXJjI5LvdIOeyoaRTiGGaNowqZ7wuFybYYnT3vlJ928t9H3o2AeoOIdhUHqNbykzb9R/y6jfDDyH40g3jYo3uo6CUEh2jM4TgYE8mv4z+kJIWeFORToDn+FUhEI1/ohNMxtIy5NgyGJBspBDlMvKnYtzMV1SIxo6CYXeiZG69P8g3mbhvIqrGlQyIG1Xi8ukobYzb32UkOu93hrihi6i3QB5G48aD9aKl8B2vlPyAvYehZyc4WZqjMLMLFR5aKdHN5+kC4nvClGcA4Kdwe0ISbMs7g35yTB6B+swTs1wAtUCSpLBZcnt3lTBJTew1GXX+eGrVj69X5/OGkhu5Aeo54y+rGOjh489Py3drmn//z2nlBR5TPKcV5rnr7SEF9nvGuct3HW2uMVzxz8KifAcaDOICRhVboMEg7kiB5m/f+4nyQ34CRtmAGWAnLmD637V2I2Vn7I+8AXPiF0sHiWjyGDrf43W663WPv7wBdW8kqlXUp5Eonn9BfAGTRYxuZX7vVmJGSyQQTcJpiUxLS+QJGKW4fRfavovX3Clmc6f1mtlBXuSQHaSjLAdoU4fvhYdvuIOCgoKCgoL+AXU1fW2kbFGNAAAAAElFTkSuQmCC';
var albumArr = [];
var emojiList = {
  "emoji": {
    "[大笑]": {
      file: "emoji_0.png"
    },
    "[可爱]": {
      file: "emoji_01.png"
    },
    "[色]": {
      file: "emoji_02.png"
    },
    "[嘘]": {
      file: "emoji_03.png"
    },
    "[亲]": {
      file: "emoji_04.png"
    },
    "[呆]": {
      file: "emoji_05.png"
    },
    "[口水]": {
      file: "emoji_06.png"
    },
    "[汗]": {
      file: "emoji_145.png"
    },
    "[呲牙]": {
      file: "emoji_07.png"
    },
    "[鬼脸]": {
      file: "emoji_08.png"
    },
    "[害羞]": {
      file: "emoji_09.png"
    },
    "[偷笑]": {
      file: "emoji_10.png"
    },
    "[调皮]": {
      file: "emoji_11.png"
    },
    "[可怜]": {
      file: "emoji_12.png"
    },
    "[敲]": {
      file: "emoji_13.png"
    },
    "[惊讶]": {
      file: "emoji_14.png"
    },
    "[流感]": {
      file: "emoji_15.png"
    },
    "[委屈]": {
      file: "emoji_16.png"
    },
    "[流泪]": {
      file: "emoji_17.png"
    },
    "[嚎哭]": {
      file: "emoji_18.png"
    },
    "[惊恐]": {
      file: "emoji_19.png"
    },
    "[怒]": {
      file: "emoji_20.png"
    },
    "[酷]": {
      file: "emoji_21.png"
    },
    "[不说]": {
      file: "emoji_22.png"
    },
    "[鄙视]": {
      file: "emoji_23.png"
    },
    "[阿弥陀佛]": {
      file: "emoji_24.png"
    },
    "[奸笑]": {
      file: "emoji_25.png"
    },
    "[睡着]": {
      file: "emoji_26.png"
    },
    "[口罩]": {
      file: "emoji_27.png"
    },
    "[努力]": {
      file: "emoji_28.png"
    },
    "[抠鼻孔]": {
      file: "emoji_29.png"
    },
    "[疑问]": {
      file: "emoji_30.png"
    },
    "[怒骂]": {
      file: "emoji_31.png"
    },
    "[晕]": {
      file: "emoji_32.png"
    },
    "[呕吐]": {
      file: "emoji_33.png"
    },
    "[拜一拜]": {
      file: "emoji_160.png"
    },
    "[惊喜]": {
      file: "emoji_161.png"
    },
    "[流汗]": {
      file: "emoji_162.png"
    },
    "[卖萌]": {
      file: "emoji_163.png"
    },
    "[默契眨眼]": {
      file: "emoji_164.png"
    },
    "[烧香拜佛]": {
      file: "emoji_165.png"
    },
    "[晚安]": {
      file: "emoji_166.png"
    },
    "[强]": {
      file: "emoji_34.png"
    },
    "[弱]": {
      file: "emoji_35.png"
    },
    "[OK]": {
      file: "emoji_36.png"
    },
    "[拳头]": {
      file: "emoji_37.png"
    },
    "[胜利]": {
      file: "emoji_38.png"
    },
    "[鼓掌]": {
      file: "emoji_39.png"
    },
    "[握手]": {
      file: "emoji_200.png"
    },
    "[发怒]": {
      file: "emoji_40.png"
    },
    "[骷髅]": {
      file: "emoji_41.png"
    },
    "[便便]": {
      file: "emoji_42.png"
    },
    "[火]": {
      file: "emoji_43.png"
    },
    "[溜]": {
      file: "emoji_44.png"
    },
    "[爱心]": {
      file: "emoji_45.png"
    },
    "[心碎]": {
      file: "emoji_46.png"
    },
    "[钟情]": {
      file: "emoji_47.png"
    },
    "[唇]": {
      file: "emoji_48.png"
    },
    "[戒指]": {
      file: "emoji_49.png"
    },
    "[钻石]": {
      file: "emoji_50.png"
    },
    "[太阳]": {
      file: "emoji_51.png"
    },
    "[有时晴]": {
      file: "emoji_52.png"
    },
    "[多云]": {
      file: "emoji_53.png"
    },
    "[雷]": {
      file: "emoji_54.png"
    },
    "[雨]": {
      file: "emoji_55.png"
    },
    "[雪花]": {
      file: "emoji_56.png"
    },
    "[爱人]": {
      file: "emoji_57.png"
    },
    "[帽子]": {
      file: "emoji_58.png"
    },
    "[皇冠]": {
      file: "emoji_59.png"
    },
    "[篮球]": {
      file: "emoji_60.png"
    },
    "[足球]": {
      file: "emoji_61.png"
    },
    "[垒球]": {
      file: "emoji_62.png"
    },
    "[网球]": {
      file: "emoji_63.png"
    },
    "[台球]": {
      file: "emoji_64.png"
    },
    "[咖啡]": {
      file: "emoji_65.png"
    },
    "[啤酒]": {
      file: "emoji_66.png"
    },
    "[干杯]": {
      file: "emoji_67.png"
    },
    "[柠檬汁]": {
      file: "emoji_68.png"
    },
    "[餐具]": {
      file: "emoji_69.png"
    },
    "[汉堡]": {
      file: "emoji_70.png"
    },
    "[鸡腿]": {
      file: "emoji_71.png"
    },
    "[面条]": {
      file: "emoji_72.png"
    },
    "[冰淇淋]": {
      file: "emoji_73.png"
    },
    "[沙冰]": {
      file: "emoji_74.png"
    },
    "[生日蛋糕]": {
      file: "emoji_75.png"
    },
    "[蛋糕]": {
      file: "emoji_76.png"
    },
    "[糖果]": {
      file: "emoji_77.png"
    },
    "[葡萄]": {
      file: "emoji_78.png"
    },
    "[西瓜]": {
      file: "emoji_79.png"
    },
    "[光碟]": {
      file: "emoji_80.png"
    },
    "[手机]": {
      file: "emoji_81.png"
    },
    "[电话]": {
      file: "emoji_82.png"
    },
    "[电视]": {
      file: "emoji_83.png"
    },
    "[声音开启]": {
      file: "emoji_84.png"
    },
    "[声音关闭]": {
      file: "emoji_85.png"
    },
    "[铃铛]": {
      file: "emoji_86.png"
    },
    "[锁头]": {
      file: "emoji_87.png"
    },
    "[放大镜]": {
      file: "emoji_88.png"
    },
    "[灯泡]": {
      file: "emoji_89.png"
    },
    "[锤头]": {
      file: "emoji_90.png"
    },
    "[烟]": {
      file: "emoji_91.png"
    },
    "[炸弹]": {
      file: "emoji_92.png"
    },
    "[枪]": {
      file: "emoji_93.png"
    },
    "[刀]": {
      file: "emoji_94.png"
    },
    "[药]": {
      file: "emoji_95.png"
    },
    "[打针]": {
      file: "emoji_96.png"
    },
    "[钱袋]": {
      file: "emoji_97.png"
    },
    "[钞票]": {
      file: "emoji_98.png"
    },
    "[银行卡]": {
      file: "emoji_99.png"
    },
    "[手柄]": {
      file: "emoji_100.png"
    },
    "[麻将]": {
      file: "emoji_101.png"
    },
    "[调色板]": {
      file: "emoji_102.png"
    },
    "[电影]": {
      file: "emoji_103.png"
    },
    "[麦克风]": {
      file: "emoji_104.png"
    },
    "[耳机]": {
      file: "emoji_105.png"
    },
    "[音乐]": {
      file: "emoji_106.png"
    },
    "[吉他]": {
      file: "emoji_107.png"
    },
    "[火箭]": {
      file: "emoji_108.png"
    },
    "[飞机]": {
      file: "emoji_109.png"
    },
    "[火车]": {
      file: "emoji_110.png"
    },
    "[公交]": {
      file: "emoji_111.png"
    },
    "[轿车]": {
      file: "emoji_112.png"
    },
    "[出租车]": {
      file: "emoji_113.png"
    },
    "[警车]": {
      file: "emoji_114.png"
    },
    "[自行车]": {
      file: "emoji_115.png"
    }
  }
};

for (var emoji in emojiList) {
  var emojiItem = emojiList[emoji];

  for (var key in emojiItem) {
    var item = emojiItem[key];
    item.img = "".concat(emojiBaseUrl, "/").concat(emoji, "/").concat(item.file);
  }
}

emojiList['ajmd'] = {};
emojiList['xxy'] = {};
emojiList['lt'] = {};

for (var i = 1; i <= 48; i++) {
  var _key = 'ajmd0' + (i >= 10 ? i : '0' + i);

  emojiList['ajmd'][_key] = {
    file: _key + '.png'
  };
}

for (var _i = 1; _i <= 40; _i++) {
  var _key2 = 'xxy0' + (_i >= 10 ? _i : '0' + _i);

  emojiList['xxy'][_key2] = {
    file: _key2 + '.png'
  };
}

for (var _i2 = 1; _i2 <= 20; _i2++) {
  var _key3 = 'lt0' + (_i2 >= 10 ? _i2 : '0' + _i2);

  emojiList['lt'][_key3] = {
    file: _key3 + '.png'
  };
} // 内容


for (var _emoji in emojiList) {
  var _emojiItem = emojiList[_emoji];

  for (var _key4 in _emojiItem) {
    var _item = _emojiItem[_key4];
    _item.img = "".concat(emojiBaseUrl, "/").concat(_emoji, "/").concat(_item.file);
  } // 封面


  albumArr.push({
    album: _emoji,
    img: _emojiItem[Object.keys(_emojiItem)[0]]['img']
  });
} // 添加删除按钮


emojiList['emoji']['[删除]'] = {};
emojiList['emoji']['[删除]']['img'] = iconEmojiDelete;
var emojilist = [];
var os = 0;
var arr = [];

for (var _key5 in emojiList.emoji) {
  if (emojiList.emoji[_key5]) {
    if (os <= 38) {
      os += 1;
      arr.push({
        imageurl: emojiList.emoji[_key5].img,
        text: _key5
      });
    } else {
      emojilist.push(arr);
      os = 0;
      arr = [];
    }
  }
}

os = 0;
var ajmdlist = [];
arr = [];

for (var _key6 in emojiList.ajmd) {
  if (emojiList.ajmd[_key6]) {
    if (os < 38) {
      os += 1;
      arr.push({
        imageurl: emojiList.ajmd[_key6].img,
        text: _key6
      });
    } else {
      ajmdlist.push(arr);
      os = 0;
      arr = [];
    }
  }
}

os = 0;
arr = [];
var ltlist = [];

for (var _key7 in emojiList.lt) {
  if (emojiList.ajmd[_key7]) {
    if (os < 38) {
      os += 1;
      arr.push({
        imageurl: emojiList.lt[_key7].img,
        text: _key7
      });
    } else {
      ltlist.push(arr);
      os = 0;
      arr = [];
    }
  }
}

os = 0;
arr = [];
var xxylist = [];

for (var _key8 in emojiList.xxy) {
  if (emojiList.xxy[_key8]) {
    if (os < 38) {
      os += 1;
      arr.push({
        imageurl: emojiList.xxy[_key8].img,
        text: _key8
      });
    } else {
      xxylist.push(arr);
      os = 0;
      arr = [];
    }
  }
}

var _default = {
  emojilist: [emojilist, ajmdlist, ltlist, xxylist],
  iconEmojiDelete: iconEmojiDelete,
  emojiList: emojiList,
  albumArr: albumArr
};
exports.default = _default;

/***/ }),

/***/ 114:
/*!**************************************************!*\
  !*** ./src/static/libs/we-cropper/we-cropper.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * we-cropper v1.2.0
 * (c) 2018 dlhandsome
 * @license MIT
 */
(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(void 0, function () {
  'use strict';

  var device = void 0;
  var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function setTouchState(instance) {
    var arg = [],
        len = arguments.length - 1;

    while (len-- > 0) {
      arg[len] = arguments[len + 1];
    }

    TOUCH_STATE.forEach(function (key, i) {
      if (arg[i] !== undefined) {
        instance[key] = arg[i];
      }
    });
  }

  function validator(instance, o) {
    Object.defineProperties(instance, o);
  }

  function getDevice() {
    if (!device) {
      device = wx.getSystemInfoSync();
    }

    return device;
  }

  var tmp = {};
  var DEFAULT = {
    id: {
      default: 'cropper',
      get: function get() {
        return tmp.id;
      },
      set: function set(value) {
        if (typeof value !== 'string') {
          console.error("id：" + value + " is invalid");
        }

        tmp.id = value;
      }
    },
    width: {
      default: 750,
      get: function get() {
        return tmp.width;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          console.error("width：" + value + " is invalid");
        }

        tmp.width = value;
      }
    },
    height: {
      default: 750,
      get: function get() {
        return tmp.height;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          console.error("height：" + value + " is invalid");
        }

        tmp.height = value;
      }
    },
    scale: {
      default: 2.5,
      get: function get() {
        return tmp.scale;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          console.error("scale：" + value + " is invalid");
        }

        tmp.scale = value;
      }
    },
    zoom: {
      default: 5,
      get: function get() {
        return tmp.zoom;
      },
      set: function set(value) {
        if (typeof value !== 'number') {
          console.error("zoom：" + value + " is invalid");
        } else if (value < 0 || value > 10) {
          console.error("zoom should be ranged in 0 ~ 10");
        }

        tmp.zoom = value;
      }
    },
    src: {
      default: 'cropper',
      get: function get() {
        return tmp.src;
      },
      set: function set(value) {
        if (typeof value !== 'string') {
          console.error("id：" + value + " is invalid");
        }

        tmp.src = value;
      }
    },
    cut: {
      default: {},
      get: function get() {
        return tmp.cut;
      },
      set: function set(value) {
        if (_typeof(value) !== 'object') {
          console.error("id：" + value + " is invalid");
        }

        tmp.cut = value;
      }
    },
    onReady: {
      default: null,
      get: function get() {
        return tmp.ready;
      },
      set: function set(value) {
        tmp.ready = value;
      }
    },
    onBeforeImageLoad: {
      default: null,
      get: function get() {
        return tmp.beforeImageLoad;
      },
      set: function set(value) {
        tmp.beforeImageLoad = value;
      }
    },
    onImageLoad: {
      default: null,
      get: function get() {
        return tmp.imageLoad;
      },
      set: function set(value) {
        tmp.imageLoad = value;
      }
    },
    onBeforeDraw: {
      default: null,
      get: function get() {
        return tmp.beforeDraw;
      },
      set: function set(value) {
        tmp.beforeDraw = value;
      }
    }
  };

  function prepare() {
    var self = this;
    var ref = getDevice();
    var windowWidth = ref.windowWidth;

    self.attachPage = function () {
      var pages = getCurrentPages(); //  获取到当前page上下文

      var pageContext = pages[pages.length - 1]; //  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问

      pageContext.wecropper = self;
    };

    self.createCtx = function () {
      var id = self.id;

      if (id) {
        self.ctx = wx.createCanvasContext(id);
      } else {
        console.error("constructor: create canvas context failed, 'id' must be valuable");
      }
    };

    self.deviceRadio = windowWidth / 750;
  }

  function observer() {
    var self = this;
    var EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad'];

    self.on = function (event, fn) {
      if (EVENT_TYPE.indexOf(event) > -1) {
        if (typeof fn === 'function') {
          event === 'ready' ? fn(self) : self["on" + firstLetterUpper(event)] = fn;
        }
      } else {
        console.error("event: " + event + " is invalid");
      }

      return self;
    };
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var base64 = createCommonjsModule(function (module, exports) {
    /*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
    (function (root) {
      // Detect free variables `exports`.
      var freeExports =  true && exports; // Detect free variable `module`.

      var freeModule =  true && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code, and use
      // it as `root`.

      var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal;

      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }
      /*--------------------------------------------------------------------------*/


      var InvalidCharacterError = function InvalidCharacterError(message) {
        this.message = message;
      };

      InvalidCharacterError.prototype = new Error();
      InvalidCharacterError.prototype.name = 'InvalidCharacterError';

      var error = function error(message) {
        // Note: the error messages used throughout this file match those used by
        // the native `atob`/`btoa` implementation in Chromium.
        throw new InvalidCharacterError(message);
      };

      var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // http://whatwg.org/html/common-microsyntaxes.html#space-character

      var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g; // `decode` is designed to be fully compatible with `atob` as described in the
      // HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
      // The optimized base64-decoding algorithm used is based on @atk’s excellent
      // implementation. https://gist.github.com/atk/1020396

      var decode = function decode(input) {
        input = String(input).replace(REGEX_SPACE_CHARACTERS, '');
        var length = input.length;

        if (length % 4 == 0) {
          input = input.replace(/==?$/, '');
          length = input.length;
        }

        if (length % 4 == 1 || // http://whatwg.org/C#alphanumeric-ascii-characters
        /[^+a-zA-Z0-9/]/.test(input)) {
          error('Invalid character: the string to be decoded is not correctly encoded.');
        }

        var bitCounter = 0;
        var bitStorage;
        var buffer;
        var output = '';
        var position = -1;

        while (++position < length) {
          buffer = TABLE.indexOf(input.charAt(position));
          bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer; // Unless this is the first of a group of 4 characters…

          if (bitCounter++ % 4) {
            // …convert the first 8 bits to a single ASCII character.
            output += String.fromCharCode(0xFF & bitStorage >> (-2 * bitCounter & 6));
          }
        }

        return output;
      }; // `encode` is designed to be fully compatible with `btoa` as described in the
      // HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa


      var encode = function encode(input) {
        input = String(input);

        if (/[^\0-\xFF]/.test(input)) {
          // Note: no need to special-case astral symbols here, as surrogates are
          // matched, and the input is supposed to only contain ASCII anyway.
          error('The string to be encoded contains characters outside of the ' + 'Latin1 range.');
        }

        var padding = input.length % 3;
        var output = '';
        var position = -1;
        var a;
        var b;
        var c;
        var buffer; // Make sure any padding is handled outside of the loop.

        var length = input.length - padding;

        while (++position < length) {
          // Read three bytes, i.e. 24 bits.
          a = input.charCodeAt(position) << 16;
          b = input.charCodeAt(++position) << 8;
          c = input.charCodeAt(++position);
          buffer = a + b + c; // Turn the 24 bits into four chunks of 6 bits each, and append the
          // matching character for each of them to the output.

          output += TABLE.charAt(buffer >> 18 & 0x3F) + TABLE.charAt(buffer >> 12 & 0x3F) + TABLE.charAt(buffer >> 6 & 0x3F) + TABLE.charAt(buffer & 0x3F);
        }

        if (padding == 2) {
          a = input.charCodeAt(position) << 8;
          b = input.charCodeAt(++position);
          buffer = a + b;
          output += TABLE.charAt(buffer >> 10) + TABLE.charAt(buffer >> 4 & 0x3F) + TABLE.charAt(buffer << 2 & 0x3F) + '=';
        } else if (padding == 1) {
          buffer = input.charCodeAt(position);
          output += TABLE.charAt(buffer >> 2) + TABLE.charAt(buffer << 4 & 0x3F) + '==';
        }

        return output;
      };

      var base64 = {
        'encode': encode,
        'decode': decode,
        'version': '0.1.0'
      }; // Some AMD build optimizers, like r.js, check for specific condition patterns
      // like the following:

      if (false) {} else if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
          // in Node.js or RingoJS v0.8.0+
          freeModule.exports = base64;
        } else {
          // in Narwhal or RingoJS v0.7.0-
          for (var key in base64) {
            base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
          }
        }
      } else {
        // in Rhino or a web browser
        root.base64 = base64;
      }
    })(commonjsGlobal);
  });

  function makeURI(strData, type) {
    return 'data:' + type + ';base64,' + strData;
  }

  function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
  }

  function encodeData(data) {
    var str = '';

    if (typeof data === 'string') {
      str = data;
    } else {
      for (var i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
      }
    }

    return base64.encode(str);
  }
  /**
   * 获取图像区域隐含的像素数据
   * @param canvasId canvas标识
   * @param x 将要被提取的图像数据矩形区域的左上角 x 坐标
   * @param y 将要被提取的图像数据矩形区域的左上角 y 坐标
   * @param width 将要被提取的图像数据矩形区域的宽度
   * @param height 将要被提取的图像数据矩形区域的高度
   * @param done 完成回调
   */


  function getImageData(canvasId, x, y, width, height, done) {
    wx.canvasGetImageData({
      canvasId: canvasId,
      x: x,
      y: y,
      width: width,
      height: height,
      success: function success(res) {
        done(res);
      },
      fail: function fail(res) {
        done(null);
        console.error('canvasGetImageData error: ' + res);
      }
    });
  }
  /**
   * 生成bmp格式图片
   * 按照规则生成图片响应头和响应体
   * @param oData 用来描述 canvas 区域隐含的像素数据 { data, width, height } = oData
   * @returns {*} base64字符串
   */


  function genBitmapImage(oData) {
    //
    // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
    // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
    //
    var biWidth = oData.width;
    var biHeight = oData.height;
    var biSizeImage = biWidth * biHeight * 3;
    var bfSize = biSizeImage + 54; // total header size = 54 bytes
    //
    //  typedef struct tagBITMAPFILEHEADER {
    //  	WORD bfType;
    //  	DWORD bfSize;
    //  	WORD bfReserved1;
    //  	WORD bfReserved2;
    //  	DWORD bfOffBits;
    //  } BITMAPFILEHEADER;
    //

    var BITMAPFILEHEADER = [// WORD bfType -- The file type signature; must be "BM"
    0x42, 0x4D, // DWORD bfSize -- The size, in bytes, of the bitmap file
    bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff, // WORD bfReserved1 -- Reserved; must be zero
    0, 0, // WORD bfReserved2 -- Reserved; must be zero
    0, 0, // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
    54, 0, 0, 0]; //
    //  typedef struct tagBITMAPINFOHEADER {
    //  	DWORD biSize;
    //  	LONG  biWidth;
    //  	LONG  biHeight;
    //  	WORD  biPlanes;
    //  	WORD  biBitCount;
    //  	DWORD biCompression;
    //  	DWORD biSizeImage;
    //  	LONG  biXPelsPerMeter;
    //  	LONG  biYPelsPerMeter;
    //  	DWORD biClrUsed;
    //  	DWORD biClrImportant;
    //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
    //

    var BITMAPINFOHEADER = [// DWORD biSize -- The number of bytes required by the structure
    40, 0, 0, 0, // LONG biWidth -- The width of the bitmap, in pixels
    biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff, // LONG biHeight -- The height of the bitmap, in pixels
    biHeight & 0xff, biHeight >> 8 & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff, // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
    1, 0, // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
    // has a maximum of 2^24 colors (16777216, Truecolor)
    24, 0, // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
    0, 0, 0, 0, // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
    biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff, // LONG biXPelsPerMeter, unused
    0, 0, 0, 0, // LONG biYPelsPerMeter, unused
    0, 0, 0, 0, // DWORD biClrUsed, the number of color indexes of palette, unused
    0, 0, 0, 0, // DWORD biClrImportant, unused
    0, 0, 0, 0];
    var iPadding = (4 - biWidth * 3 % 4) % 4;
    var aImgData = oData.data;
    var strPixelData = '';
    var biWidth4 = biWidth << 2;
    var y = biHeight;
    var fromCharCode = String.fromCharCode;

    do {
      var iOffsetY = biWidth4 * (y - 1);
      var strPixelRow = '';

      for (var x = 0; x < biWidth; x++) {
        var iOffsetX = x << 2;
        strPixelRow += fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) + fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) + fromCharCode(aImgData[iOffsetY + iOffsetX]);
      }

      for (var c = 0; c < iPadding; c++) {
        strPixelRow += String.fromCharCode(0);
      }

      strPixelData += strPixelRow;
    } while (--y);

    var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);
    return strEncoded;
  }
  /**
   * 转换为图片base64
   * @param canvasId canvas标识
   * @param x 将要被提取的图像数据矩形区域的左上角 x 坐标
   * @param y 将要被提取的图像数据矩形区域的左上角 y 坐标
   * @param width 将要被提取的图像数据矩形区域的宽度
   * @param height 将要被提取的图像数据矩形区域的高度
   * @param type 转换图片类型
   * @param done 完成回调
   */


  function convertToImage(canvasId, x, y, width, height, type, done) {
    if (done === void 0) done = function done() {};

    if (type === undefined) {
      type = 'png';
    }

    type = fixType(type);

    if (/bmp/.test(type)) {
      getImageData(canvasId, x, y, width, height, function (data) {
        var strData = genBitmapImage(data);
        isFunction(done) && done(makeURI(strData, 'image/' + type));
      });
    } else {
      console.error('暂不支持生成\'' + type + '\'类型的base64图片');
    }
  }

  var CanvasToBase64 = {
    convertToImage: convertToImage,
    // convertToPNG: function (width, height, done) {
    //   return convertToImage(width, height, 'png', done)
    // },
    // convertToJPEG: function (width, height, done) {
    //   return convertToImage(width, height, 'jpeg', done)
    // },
    // convertToGIF: function (width, height, done) {
    //   return convertToImage(width, height, 'gif', done)
    // },
    convertToBMP: function convertToBMP(ref, done) {
      if (ref === void 0) ref = {};
      var canvasId = ref.canvasId;
      var x = ref.x;
      var y = ref.y;
      var width = ref.width;
      var height = ref.height;
      if (done === void 0) done = function done() {};
      return convertToImage(canvasId, x, y, width, height, 'bmp', done);
    }
  };

  function methods() {
    var self = this;
    var id = self.id;
    var deviceRadio = self.deviceRadio;
    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度

    var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度

    var ref = self.cut;
    var x = ref.x;
    if (x === void 0) x = 0;
    var y = ref.y;
    if (y === void 0) y = 0;
    var width = ref.width;
    if (width === void 0) width = boundWidth;
    var height = ref.height;
    if (height === void 0) height = boundHeight;

    self.updateCanvas = function () {
      if (self.croperTarget) {
        //  画布绘制图片
        self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight);
      }

      isFunction(self.onBeforeDraw) && self.onBeforeDraw(self.ctx, self);
      self.setBoundStyle(); //	设置边界样式

      self.ctx.draw();
      return self;
    };

    self.pushOrign = function (src) {
      self.src = src;
      isFunction(self.onBeforeImageLoad) && self.onBeforeImageLoad(self.ctx, self);
      wx.getImageInfo({
        src: src,
        success: function success(res) {
          var innerAspectRadio = res.width / res.height;
          self.croperTarget = res.path;

          if (innerAspectRadio < width / height) {
            self.rectX = x;
            self.baseWidth = width;
            self.baseHeight = width / innerAspectRadio;
            self.rectY = y - Math.abs((height - self.baseHeight) / 2);
          } else {
            self.rectY = y;
            self.baseWidth = height * innerAspectRadio;
            self.baseHeight = height;
            self.rectX = x - Math.abs((width - self.baseWidth) / 2);
          }

          self.imgLeft = self.rectX;
          self.imgTop = self.rectY;
          self.scaleWidth = self.baseWidth;
          self.scaleHeight = self.baseHeight;
          self.updateCanvas();
          isFunction(self.onImageLoad) && self.onImageLoad(self.ctx, self);
        }
      });
      self.update();
      return self;
    };

    self.getCropperBase64 = function (done) {
      if (done === void 0) done = function done() {};
      CanvasToBase64.convertToBMP({
        canvasId: id,
        x: x,
        y: y,
        width: width,
        height: height
      }, done);
    };

    self.getCropperImage = function () {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      var ARG_TYPE = toString.call(args[0]);
      var fn = args[args.length - 1];

      switch (ARG_TYPE) {
        case '[object Object]':
          var ref = args[0];
          var quality = ref.quality;
          if (quality === void 0) quality = 10;

          if (typeof quality !== 'number') {
            console.error("quality：" + quality + " is invalid");
          } else if (quality < 0 || quality > 10) {
            console.error("quality should be ranged in 0 ~ 10");
          }

          wx.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height,
            destWidth: width * quality / (deviceRadio * 10),
            destHeight: height * quality / (deviceRadio * 10),
            success: function success(res) {
              isFunction(fn) && fn.call(self, res.tempFilePath);
            },
            fail: function fail(res) {
              isFunction(fn) && fn.call(self, null);
            }
          });
          break;

        case '[object Function]':
          wx.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height,
            destWidth: width / deviceRadio,
            destHeight: height / deviceRadio,
            success: function success(res) {
              isFunction(fn) && fn.call(self, res.tempFilePath);
            },
            fail: function fail(res) {
              isFunction(fn) && fn.call(self, null);
            }
          });
          break;
      }

      return self;
    };
  }
  /**
   * 获取最新缩放值
   * @param oldScale 上一次触摸结束后的缩放值
   * @param oldDistance 上一次触摸结束后的双指距离
   * @param zoom 缩放系数
   * @param touch0 第一指touch对象
   * @param touch1 第二指touch对象
   * @returns {*}
   */


  var getNewScale = function getNewScale(oldScale, oldDistance, zoom, touch0, touch1) {
    var xMove, yMove, newDistance; // 计算二指最新距离

    xMove = Math.round(touch1.x - touch0.x);
    yMove = Math.round(touch1.y - touch0.y);
    newDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
    return oldScale + 0.001 * zoom * (newDistance - oldDistance);
  };

  function update() {
    var self = this;

    if (!self.src) {
      return;
    }

    self.__oneTouchStart = function (touch) {
      self.touchX0 = Math.round(touch.x);
      self.touchY0 = Math.round(touch.y);
    };

    self.__oneTouchMove = function (touch) {
      var xMove, yMove; // 计算单指移动的距离

      if (self.touchended) {
        return self.updateCanvas();
      }

      xMove = Math.round(touch.x - self.touchX0);
      yMove = Math.round(touch.y - self.touchY0);
      var imgLeft = Math.round(self.rectX + xMove);
      var imgTop = Math.round(self.rectY + yMove);
      self.outsideBound(imgLeft, imgTop);
      self.updateCanvas();
    };

    self.__twoTouchStart = function (touch0, touch1) {
      var xMove, yMove, oldDistance;
      self.touchX1 = Math.round(self.rectX + self.scaleWidth / 2);
      self.touchY1 = Math.round(self.rectY + self.scaleHeight / 2); // 计算两指距离

      xMove = Math.round(touch1.x - touch0.x);
      yMove = Math.round(touch1.y - touch0.y);
      oldDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
      self.oldDistance = oldDistance;
    };

    self.__twoTouchMove = function (touch0, touch1) {
      var oldScale = self.oldScale;
      var oldDistance = self.oldDistance;
      var scale = self.scale;
      var zoom = self.zoom;
      self.newScale = getNewScale(oldScale, oldDistance, zoom, touch0, touch1); //  设定缩放范围

      self.newScale <= 1 && (self.newScale = 1);
      self.newScale >= scale && (self.newScale = scale);
      self.scaleWidth = Math.round(self.newScale * self.baseWidth);
      self.scaleHeight = Math.round(self.newScale * self.baseHeight);
      var imgLeft = Math.round(self.touchX1 - self.scaleWidth / 2);
      var imgTop = Math.round(self.touchY1 - self.scaleHeight / 2);
      self.outsideBound(imgLeft, imgTop);
      self.updateCanvas();
    };

    self.__xtouchEnd = function () {
      self.oldScale = self.newScale;
      self.rectX = self.imgLeft;
      self.rectY = self.imgTop;
    };
  }

  var handle = {
    //  图片手势初始监测
    touchStart: function touchStart(e) {
      var self = this;
      var ref = e.touches;
      var touch0 = ref[0];
      var touch1 = ref[1];
      setTouchState(self, true, null, null); // 计算第一个触摸点的位置，并参照改点进行缩放

      self.__oneTouchStart(touch0); // 两指手势触发


      if (e.touches.length >= 2) {
        self.__twoTouchStart(touch0, touch1);
      }
    },
    //  图片手势动态缩放
    touchMove: function touchMove(e) {
      var self = this;
      var ref = e.touches;
      var touch0 = ref[0];
      var touch1 = ref[1];
      setTouchState(self, null, true); // 单指手势时触发

      if (e.touches.length === 1) {
        self.__oneTouchMove(touch0);
      } // 两指手势触发


      if (e.touches.length >= 2) {
        self.__twoTouchMove(touch0, touch1);
      }
    },
    touchEnd: function touchEnd(e) {
      var self = this;
      setTouchState(self, false, false, true);

      self.__xtouchEnd();
    }
  };

  function cut() {
    var self = this;
    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度

    var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度

    var ref = self.cut;
    var x = ref.x;
    if (x === void 0) x = 0;
    var y = ref.y;
    if (y === void 0) y = 0;
    var width = ref.width;
    if (width === void 0) width = boundWidth;
    var height = ref.height;
    if (height === void 0) height = boundHeight;
    /**
    * 设置边界
    * @param imgLeft 图片左上角横坐标值
    * @param imgTop 图片左上角纵坐标值
    */

    self.outsideBound = function (imgLeft, imgTop) {
      self.imgLeft = imgLeft >= x ? x : self.scaleWidth + imgLeft - x <= width ? x + width - self.scaleWidth : imgLeft;
      self.imgTop = imgTop >= y ? y : self.scaleHeight + imgTop - y <= height ? y + height - self.scaleHeight : imgTop;
    };
    /**
    * 设置边界样式
    * @param color	边界颜色
    */


    self.setBoundStyle = function (ref) {
      if (ref === void 0) ref = {};
      var color = ref.color;
      if (color === void 0) color = '#04b00f';
      var mask = ref.mask;
      if (mask === void 0) mask = 'rgba(0, 0, 0, 0.3)';
      var lineWidth = ref.lineWidth;
      if (lineWidth === void 0) lineWidth = 1;
      var boundOption = [{
        start: {
          x: x - lineWidth,
          y: y + 10 - lineWidth
        },
        step1: {
          x: x - lineWidth,
          y: y - lineWidth
        },
        step2: {
          x: x + 10 - lineWidth,
          y: y - lineWidth
        }
      }, {
        start: {
          x: x - lineWidth,
          y: y + height - 10 + lineWidth
        },
        step1: {
          x: x - lineWidth,
          y: y + height + lineWidth
        },
        step2: {
          x: x + 10 - lineWidth,
          y: y + height + lineWidth
        }
      }, {
        start: {
          x: x + width - 10 + lineWidth,
          y: y - lineWidth
        },
        step1: {
          x: x + width + lineWidth,
          y: y - lineWidth
        },
        step2: {
          x: x + width + lineWidth,
          y: y + 10 - lineWidth
        }
      }, {
        start: {
          x: x + width + lineWidth,
          y: y + height - 10 + lineWidth
        },
        step1: {
          x: x + width + lineWidth,
          y: y + height + lineWidth
        },
        step2: {
          x: x + width - 10 + lineWidth,
          y: y + height + lineWidth
        }
      }]; // 绘制半透明层

      self.ctx.beginPath();
      self.ctx.setFillStyle(mask);
      self.ctx.fillRect(0, 0, x, boundHeight);
      self.ctx.fillRect(x, 0, width, y);
      self.ctx.fillRect(x, y + height, width, boundHeight - y - height);
      self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
      self.ctx.fill();
      boundOption.forEach(function (op) {
        self.ctx.beginPath();
        self.ctx.setStrokeStyle(color);
        self.ctx.setLineWidth(lineWidth);
        self.ctx.moveTo(op.start.x, op.start.y);
        self.ctx.lineTo(op.step1.x, op.step1.y);
        self.ctx.lineTo(op.step2.x, op.step2.y);
        self.ctx.stroke();
      });
    };
  }

  var version = "1.2.0";

  var weCropper = function weCropper(params) {
    var self = this;
    var _default = {};
    validator(self, DEFAULT);
    Object.keys(DEFAULT).forEach(function (key) {
      _default[key] = DEFAULT[key].default;
    });
    Object.assign(self, _default, params);
    self.prepare();
    self.attachPage();
    self.createCtx();
    self.observer();
    self.cutt();
    self.methods();
    self.init();
    self.update();
    return self;
  };

  weCropper.prototype.init = function init() {
    var self = this;
    var src = self.src;
    self.version = version;
    typeof self.onReady === 'function' && self.onReady(self.ctx, self);

    if (src) {
      self.pushOrign(src);
    }

    setTouchState(self, false, false, false);
    self.oldScale = 1;
    self.newScale = 1;
    return self;
  };

  Object.assign(weCropper.prototype, handle);
  weCropper.prototype.prepare = prepare;
  weCropper.prototype.observer = observer;
  weCropper.prototype.methods = methods;
  weCropper.prototype.cutt = cut;
  weCropper.prototype.update = update;
  return weCropper;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 117:
/*!*******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fvideorz"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _videorz = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/videorz.vue */ 118));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_videorz.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 12:
/*!************************************!*\
  !*** ./src/static/libs/amap-wx.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function AMapWX(a) {
  this.key = a.key, this.requestConfig = {
    key: a.key,
    s: "rsx",
    platform: "WXJS",
    appname: a.key,
    sdkversion: "1.2.0",
    logversion: "2.0"
  };
}

AMapWX.prototype.getWxLocation = function (a, b) {
  wx.getLocation({
    type: "gcj02",
    success: function success(a) {
      var c = a.longitude + "," + a.latitude;
      wx.setStorage({
        key: "userLocation",
        data: c
      }), b(c);
    },
    fail: function fail(c) {
      wx.getStorage({
        key: "userLocation",
        success: function success(a) {
          a.data && b(a.data);
        }
      }), a.fail({
        errCode: "0",
        errMsg: c.errMsg || ""
      });
    }
  });
}, AMapWX.prototype.getRegeo = function (a) {
  function c(c) {
    var d = b.requestConfig;
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: c,
        extensions: "all",
        s: d.s,
        platform: d.platform,
        appname: b.key,
        sdkversion: d.sdkversion,
        logversion: d.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(b) {
        var d, e, f, g, h, i, j, k, l;
        b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{
          iconPath: a.iconPath,
          width: a.iconWidth,
          height: a.iconHeight,
          name: f,
          desc: g,
          longitude: h,
          latitude: i,
          id: 0,
          regeocodeData: d
        }], a.success(l)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info
        });
      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || ""
        });
      }
    });
  }

  var b = this;
  a.location ? c(a.location) : b.getWxLocation(a, function (a) {
    c(a);
  });
}, AMapWX.prototype.getWeather = function (a) {
  function d(d) {
    var e = "base";
    a.type && "forecast" == a.type && (e = "all"), wx.request({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      data: {
        key: b.key,
        city: d,
        extensions: e,
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(b) {
        function c(a) {
          var b = {
            city: {
              text: "城市",
              data: a.city
            },
            weather: {
              text: "天气",
              data: a.weather
            },
            temperature: {
              text: "温度",
              data: a.temperature
            },
            winddirection: {
              text: "风向",
              data: a.winddirection + "风"
            },
            windpower: {
              text: "风力",
              data: a.windpower + "级"
            },
            humidity: {
              text: "湿度",
              data: a.humidity + "%"
            }
          };
          return b;
        }

        var d, e;
        b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({
          forecast: b.data.forecasts[0]
        }) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info
        });
      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || ""
        });
      }
    });
  }

  function e(e) {
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: b.key,
        location: e,
        extensions: "all",
        s: c.s,
        platform: c.platform,
        appname: b.key,
        sdkversion: c.sdkversion,
        logversion: c.logversion
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(b) {
        var c, e;
        b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info
        });
      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || ""
        });
      }
    });
  }

  var b = this,
      c = b.requestConfig;
  a.city ? d(a.city) : b.getWxLocation(a, function (a) {
    e(a);
  });
}, AMapWX.prototype.getPoiAround = function (a) {
  function d(d) {
    var e = {
      key: b.key,
      location: d,
      s: c.s,
      platform: c.platform,
      appname: b.key,
      sdkversion: c.sdkversion,
      logversion: c.logversion
    };
    a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({
      url: "https://restapi.amap.com/v3/place/around",
      data: e,
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function success(b) {
        var c, d, e, f;

        if (b.data.status && "1" == b.data.status) {
          if (b = b.data, b && b.pois) {
            for (c = [], d = 0; d < b.pois.length; d++) {
              e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({
                latitude: parseFloat(b.pois[d].location.split(",")[1]),
                longitude: parseFloat(b.pois[d].location.split(",")[0]),
                iconPath: e,
                width: 22,
                height: 32,
                id: d,
                name: b.pois[d].name,
                address: b.pois[d].address
              });
            }

            f = {
              markers: c,
              poisData: b.pois
            }, a.success(f);
          }
        } else a.fail({
          errCode: b.data.infocode,
          errMsg: b.data.info
        });
      },
      fail: function fail(b) {
        a.fail({
          errCode: "0",
          errMsg: b.errMsg || ""
        });
      }
    });
  }

  var b = this,
      c = b.requestConfig;
  a.location ? d(a.location) : b.getWxLocation(a, function (a) {
    d(a);
  });
}, AMapWX.prototype.getStaticmap = function (a) {
  function f(b) {
    c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);
    var e = d + c.join("&");
    a.success({
      url: e
    });
  }

  var e,
      b = this,
      c = [],
      d = "https://restapi.amap.com/v3/staticmap?";
  c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {
    f(a);
  });
}, AMapWX.prototype.getInputtips = function (a) {
  var b = this,
      c = b.requestConfig,
      d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion
  };
  a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({
    url: "https://restapi.amap.com/v3/assistant/inputtips",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(b) {
      b && b.data && b.data.tips && a.success({
        tips: b.data.tips
      });
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || ""
      });
    }
  });
}, AMapWX.prototype.getDrivingRoute = function (a) {
  var b = this,
      c = b.requestConfig,
      d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion
  };
  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({
    url: "https://restapi.amap.com/v3/direction/driving",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths,
        taxi_cost: b.data.route.taxi_cost || ""
      });
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || ""
      });
    }
  });
}, AMapWX.prototype.getWalkingRoute = function (a) {
  var b = this,
      c = b.requestConfig,
      d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion
  };
  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({
    url: "https://restapi.amap.com/v3/direction/walking",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(b) {
      b && b.data && b.data.route && a.success({
        paths: b.data.route.paths
      });
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || ""
      });
    }
  });
}, AMapWX.prototype.getTransitRoute = function (a) {
  var b = this,
      c = b.requestConfig,
      d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion
  };
  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({
    url: "https://restapi.amap.com/v3/direction/transit/integrated",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(b) {
      if (b && b.data && b.data.route) {
        var c = b.data.route;
        a.success({
          distance: c.distance || "",
          taxi_cost: c.taxi_cost || "",
          transits: c.transits
        });
      }
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || ""
      });
    }
  });
}, AMapWX.prototype.getRidingRoute = function (a) {
  var b = this,
      c = b.requestConfig,
      d = {
    key: b.key,
    s: c.s,
    platform: c.platform,
    appname: b.key,
    sdkversion: c.sdkversion,
    logversion: c.logversion
  };
  a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({
    url: "https://restapi.amap.com/v4/direction/bicycling",
    data: d,
    method: "GET",
    header: {
      "content-type": "application/json"
    },
    success: function success(b) {
      b && b.data && b.data.data && a.success({
        paths: b.data.data.paths
      });
    },
    fail: function fail(b) {
      a.fail({
        errCode: "0",
        errMsg: b.errMsg || ""
      });
    }
  });
}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 125:
/*!*****************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fvideo"} ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _video = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/video.vue */ 126));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_video.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 13:
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//本地穿透
// const baseURL = 'https://sns.myxianxiaobao.com' //测试数据
var baseURL = 'https://sns.peiwochoujiang.com'; // 正式服

var TokenURL = '/mobile/Token/getToken';
var selfHeight = [];

for (var i = 0, j = 150; i <= 70; i++) {
  var temp = {
    text: 150 + i + 'cm',
    value: 150 + i
  };
  selfHeight.push(temp);
}

var _default = {
  timeout: 1000,
  baseURL: baseURL,
  TokenURL: TokenURL,
  miniAppName: '',
  sexConfig: [{
    text: '男',
    value: 1,
    checked: true
  }, {
    text: '女',
    value: 2
  }],
  selfHeight: selfHeight,
  selfPays: [{
    text: '小于10w',
    value: 0
  }, {
    text: '10~20w',
    value: 1
  }, {
    text: '20~30w',
    value: 2
  }, {
    text: '大于30w',
    value: 3
  }],
  selfTypes: [{
    text: '旅行',
    value: 0
  }, {
    text: '运动',
    value: 1
  }, {
    text: '恋爱',
    value: 2
  }, {
    text: '唱歌',
    value: 3
  }, {
    text: '吃饭',
    value: 4
  }, {
    text: '喝一杯',
    value: 5
  }, {
    text: '看电影',
    value: 6
  }, {
    text: '玩游戏',
    value: 7
  }],
  selfadvice: [{
    text: '头像、资料作假',
    value: '头像、资料作假'
  }, {
    text: '广告、营销',
    value: '广告、营销'
  }, {
    text: '诈骗、托儿',
    value: '诈骗、托儿'
  }, {
    text: '色情低俗',
    value: '色情低俗'
  }, {
    text: '恶意骚扰、不文明语言',
    value: '恶意骚扰、不文明语言'
  }, {
    text: '其他',
    value: '其他'
  }]
};
exports.default = _default;

/***/ }),

/***/ 133:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fadviceback"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _adviceback = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/adviceback.vue */ 134));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_adviceback.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 14:
/*!*******************************************!*\
  !*** ./node_modules/flyio/dist/npm/wx.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var str = "";
        var first = true;
        var that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            var encode = that.encode;
            var type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + ('%5B' + i + '%5D'));
                });
            } else if (type == "object") {
                for (var key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },

    // Do not overwrite existing attributes
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
        return a;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/

var util = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

//EngineWrapper can help  generating  a  http engine quickly through a adapter
function EngineWrapper(adapter) {
    var AjaxEngine = function () {
        function AjaxEngine() {
            _classCallCheck(this, AjaxEngine);

            this.requestHeaders = {};
            this.readyState = 0;
            this.timeout = 0; // 0 stands for no timeout
            this.responseURL = "";
            this.responseHeaders = {};
        }

        _createClass(AjaxEngine, [{
            key: "_call",
            value: function _call(name) {
                this[name] && this[name].apply(this, [].splice.call(arguments, 1));
            }
        }, {
            key: "_changeReadyState",
            value: function _changeReadyState(state) {
                this.readyState = state;
                this._call("onreadystatechange");
            }
        }, {
            key: "open",
            value: function open(method, url) {
                this.method = method;
                if (!url) {
                    url = location.href;
                } else {
                    url = util.trim(url);
                    if (url.indexOf("http") !== 0) {
                        // Normalize the request url
                        if (isBrowser) {
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }
                }
                this.responseURL = url;
                this._changeReadyState(1);
            }
        }, {
            key: "send",
            value: function send(arg) {
                var _this = this;

                arg = arg || null;
                var self = this;
                if (adapter) {
                    var request = {
                        method: self.method,
                        url: self.responseURL,
                        headers: self.requestHeaders || {},
                        body: arg
                    };
                    util.merge(request, self._options || {});
                    if (request.method === "GET") {
                        request.body = null;
                    }
                    self._changeReadyState(3);
                    var timer = void 0;
                    self.timeout = self.timeout || 0;
                    if (self.timeout > 0) {
                        timer = setTimeout(function () {
                            if (self.readyState === 3) {
                                _this._call("onloadend");
                                self._changeReadyState(0);
                                self._call("ontimeout");
                            }
                        }, self.timeout);
                    }
                    request.timeout = self.timeout;
                    adapter(request, function (response) {

                        function getAndDelete(key) {
                            var t = response[key];
                            delete response[key];
                            return t;
                        }

                        // If the request has already timeout, return
                        if (self.readyState !== 3) return;
                        clearTimeout(timer);

                        // Make sure the type of status is integer
                        self.status = getAndDelete("statusCode") - 0;

                        var responseText = getAndDelete("responseText");
                        var statusMessage = getAndDelete("statusMessage");

                        // Network error, set the status code 0
                        if (!self.status) {
                            self.statusText = responseText;
                            self._call("onerror", { msg: statusMessage });
                        } else {
                            // Parsing the response headers to array in a object,  because
                            // there may be multiple values with the same header name
                            var responseHeaders = getAndDelete("headers");
                            var headers = {};
                            for (var field in responseHeaders) {
                                var value = responseHeaders[field];
                                var key = field.toLowerCase();
                                // Is array
                                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                                    headers[key] = value;
                                } else {
                                    headers[key] = headers[key] || [];
                                    headers[key].push(value);
                                }
                            }
                            var cookies = headers["set-cookie"];
                            if (isBrowser && cookies) {
                                cookies.forEach(function (e) {
                                    // Remove the http-Only property of the  cookie
                                    // so that JavaScript can operate it.
                                    document.cookie = e.replace(/;\s*httpOnly/ig, "");
                                });
                            }
                            self.responseHeaders = headers;
                            // Set the fields of engine from response
                            self.statusText = statusMessage || "";
                            self.response = self.responseText = responseText;
                            self._response = response;
                            self._changeReadyState(4);
                            self._call("onload");
                        }
                        self._call("onloadend");
                    });
                } else {
                    console.error("Ajax require adapter");
                }
            }
        }, {
            key: "setRequestHeader",
            value: function setRequestHeader(key, value) {
                this.requestHeaders[util.trim(key)] = value;
            }
        }, {
            key: "getResponseHeader",
            value: function getResponseHeader(key) {
                return (this.responseHeaders[key.toLowerCase()] || "").toString() || null;
            }
        }, {
            key: "getAllResponseHeaders",
            value: function getAllResponseHeaders() {
                var str = "";
                for (var key in this.responseHeaders) {
                    str += key + ":" + this.getResponseHeader(key) + "\r\n";
                }
                return str || null;
            }
        }, {
            key: "abort",
            value: function abort(msg) {
                this._changeReadyState(0);
                this._call("onerror", { msg: msg });
                this._call("onloadend");
            }
        }], [{
            key: "setAdapter",
            value: function setAdapter(requestAdapter) {
                adapter = requestAdapter;
            }
        }]);

        return AjaxEngine;
    }();

    return AjaxEngine;
}

// learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = EngineWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(0);
var isBrowser = typeof document !== "undefined";

var Fly = function () {
    function Fly(engine) {
        _classCallCheck(this, Fly);

        this.engine = engine || XMLHttpRequest;

        this.default = this; //For typeScript

        /**
         * Add  lock/unlock API for interceptor.
         *
         * Once an request/response interceptor is locked, the incoming request/response
         * will be added to a queue before they enter the interceptor, they will not be
         * continued  until the interceptor is unlocked.
         *
         * @param [interceptor] either is interceptors.request or interceptors.response
         */
        function wrap(interceptor) {
            var resolve = void 0;
            var reject = void 0;

            function _clear() {
                interceptor.p = resolve = reject = null;
            }

            utils.merge(interceptor, {
                lock: function lock() {
                    if (!resolve) {
                        interceptor.p = new Promise(function (_resolve, _reject) {
                            resolve = _resolve;
                            reject = _reject;
                        });
                    }
                },
                unlock: function unlock() {
                    if (resolve) {
                        resolve();
                        _clear();
                    }
                },
                clear: function clear() {
                    if (reject) {
                        reject("cancel");
                        _clear();
                    }
                }
            });
        }

        var interceptors = this.interceptors = {
            response: {
                use: function use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use: function use(handler) {
                    this.handler = handler;
                }
            }
        };

        var irq = interceptors.request;
        var irp = interceptors.response;
        wrap(irp);
        wrap(irq);

        this.config = {
            method: "GET",
            baseURL: "",
            headers: {},
            timeout: 0,
            params: {}, // Default Url params
            parseJson: true, // Convert response data to JSON object automatically.
            withCredentials: false
        };
    }

    _createClass(Fly, [{
        key: "request",
        value: function request(url, data, options) {
            var _this = this;

            var engine = new this.engine();
            var contentType = "Content-Type";
            var contentTypeLowerCase = contentType.toLowerCase();
            var interceptors = this.interceptors;
            var requestInterceptor = interceptors.request;
            var responseInterceptor = interceptors.response;
            var requestInterceptorHandler = requestInterceptor.handler;
            var promise = new Promise(function (resolve, reject) {
                if (utils.isObject(url)) {
                    options = url;
                    url = options.url;
                }
                options = options || {};
                options.headers = options.headers || {};

                function isPromise(p) {
                    // some  polyfill implementation of Promise may be not standard,
                    // so, we test by duck-typing
                    return p && p.then && p.catch;
                }

                /**
                 * If the request/response interceptor has been locked，
                 * the new request/response will enter a queue. otherwise, it will be performed directly.
                 * @param [promise] if the promise exist, means the interceptor is  locked.
                 * @param [callback]
                 */
                function enqueueIfLocked(promise, callback) {
                    if (promise) {
                        promise.then(function () {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }

                // make the http request
                function makeRequest(options) {
                    data = options.body;
                    // Normalize the request url
                    url = utils.trim(options.url);
                    var baseUrl = utils.trim(options.baseURL || "");
                    if (!url && isBrowser && !baseUrl) url = location.href;
                    if (url.indexOf("http") !== 0) {
                        var isAbsolute = url[0] === "/";
                        if (!baseUrl && isBrowser) {
                            var arr = location.pathname.split("/");
                            arr.pop();
                            baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"));
                        }
                        if (baseUrl[baseUrl.length - 1] !== "/") {
                            baseUrl += "/";
                        }
                        url = baseUrl + (isAbsolute ? url.substr(1) : url);
                        if (isBrowser) {

                            // Normalize the url which contains the ".." or ".", such as
                            // "http://xx.com/aa/bb/../../xx" to "http://xx.com/xx" .
                            var t = document.createElement("a");
                            t.href = url;
                            url = t.href;
                        }
                    }

                    var responseType = utils.trim(options.responseType || "");
                    var needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                    var dataType = utils.type(data);
                    var params = options.params || {};

                    // merge url params when the method is "GET" (data is object)
                    if (needQuery && dataType === "object") {
                        params = utils.merge(data, params);
                    }
                    // encode params to String
                    params = utils.formatParams(params);

                    // save url params
                    var _params = [];
                    if (params) {
                        _params.push(params);
                    }
                    // Add data to url params when the method is "GET" (data is String)
                    if (needQuery && data && dataType === "string") {
                        _params.push(data);
                    }

                    // make the final url
                    if (_params.length > 0) {
                        url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                    }

                    engine.open(options.method, url);

                    // try catch for ie >=9
                    try {
                        engine.withCredentials = !!options.withCredentials;
                        engine.timeout = options.timeout || 0;
                        if (responseType !== "stream") {
                            engine.responseType = responseType;
                        }
                    } catch (e) {}

                    var customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

                    // default content type
                    var _contentType = "application/x-www-form-urlencoded";
                    // If the request data is json object, transforming it  to json string,
                    // and set request content-type to "json". In browser,  the data will
                    // be sent as RequestBody instead of FormData
                    if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                        data = utils.formatParams(data);
                    } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                        _contentType = 'application/json;charset=utf-8';
                        data = JSON.stringify(data);
                    }
                    //If user doesn't set content-type, set default.
                    if (!(customContentType || needQuery)) {
                        options.headers[contentType] = _contentType;
                    }

                    for (var k in options.headers) {
                        if (k === contentType && utils.isFormData(data)) {
                            // Delete the content-type, Let the browser set it
                            delete options.headers[k];
                        } else {
                            try {
                                // In browser environment, some header fields are readonly,
                                // write will cause the exception .
                                engine.setRequestHeader(k, options.headers[k]);
                            } catch (e) {}
                        }
                    }

                    function onresult(handler, data, type) {
                        enqueueIfLocked(responseInterceptor.p, function () {
                            if (handler) {
                                //如果失败，添加请求信息
                                if (type) {
                                    data.request = options;
                                }
                                var ret = handler.call(responseInterceptor, data, Promise);
                                data = ret === undefined ? data : ret;
                            }
                            if (!isPromise(data)) {
                                data = Promise[type === 0 ? "resolve" : "reject"](data);
                            }
                            data.then(function (d) {
                                resolve(d);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }

                    function onerror(e) {
                        e.engine = engine;
                        onresult(responseInterceptor.onerror, e, -1);
                    }

                    function Err(msg, status) {
                        this.message = msg;
                        this.status = status;
                    }

                    engine.onload = function () {
                        try {
                            // The xhr of IE9 has not response field
                            var response = engine.response || engine.responseText;
                            if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                                response = JSON.parse(response);
                            }

                            var headers = engine.responseHeaders;
                            // In browser
                            if (!headers) {
                                headers = {};
                                var items = (engine.getAllResponseHeaders() || "").split("\r\n");
                                items.pop();
                                items.forEach(function (e) {
                                    if (!e) return;
                                    var key = e.split(":")[0];
                                    headers[key] = engine.getResponseHeader(key);
                                });
                            }
                            var status = engine.status;
                            var statusText = engine.statusText;
                            var _data = { data: response, headers: headers, status: status, statusText: statusText };
                            // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                            utils.merge(_data, engine._response);
                            if (status >= 200 && status < 300 || status === 304) {
                                _data.engine = engine;
                                _data.request = options;
                                onresult(responseInterceptor.handler, _data, 0);
                            } else {
                                var e = new Err(statusText, status);
                                e.response = _data;
                                onerror(e);
                            }
                        } catch (e) {
                            onerror(new Err(e.msg, engine.status));
                        }
                    };

                    engine.onerror = function (e) {
                        onerror(new Err(e.msg || "Network Error", 0));
                    };

                    engine.ontimeout = function () {
                        onerror(new Err("timeout [ " + engine.timeout + "ms ]", 1));
                    };
                    engine._options = options;
                    setTimeout(function () {
                        engine.send(needQuery ? null : data);
                    }, 0);
                }

                enqueueIfLocked(requestInterceptor.p, function () {
                    utils.merge(options, JSON.parse(JSON.stringify(_this.config)));
                    var headers = options.headers;
                    headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                    delete headers[contentTypeLowerCase];
                    options.body = data || options.body;
                    url = utils.trim(url || "");
                    options.method = options.method.toUpperCase();
                    options.url = url;
                    var ret = options;
                    if (requestInterceptorHandler) {
                        ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                    }
                    if (!isPromise(ret)) {
                        ret = Promise.resolve(ret);
                    }
                    ret.then(function (d) {
                        //if options continue
                        if (d === options) {
                            makeRequest(d);
                        } else {
                            resolve(d);
                        }
                    }, function (err) {
                        reject(err);
                    });
                });
            });
            promise.engine = engine;
            return promise;
        }
    }, {
        key: "all",
        value: function all(promises) {
            return Promise.all(promises);
        }
    }, {
        key: "spread",
        value: function spread(callback) {
            return function (arr) {
                return callback.apply(null, arr);
            };
        }
    }]);

    return Fly;
}();

//For typeScript


Fly.default = Fly;

["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
    Fly.prototype[e] = function (url, data, option) {
        return this.request(url, data, utils.merge({ method: e }, option));
    };
});
["lock", "unlock", "clear"].forEach(function (e) {
    Fly.prototype[e] = function () {
        this.interceptors.request[e]();
    };
});
// Learn more about keep-loader: https://github.com/wendux/keep-loader
;
module.exports = Fly;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序适配器
module.exports = function (request, responseCallback) {
    var con = {
        method: request.method,
        url: request.url,
        dataType: request.dataType || undefined,
        header: request.headers,
        data: request.body || {},
        responseType: request.responseType || 'text',
        success: function success(res) {
            responseCallback({
                statusCode: res.statusCode,
                responseText: res.data,
                headers: res.header,
                statusMessage: res.errMsg
            });
        },
        fail: function fail(res) {
            responseCallback({
                statusCode: res.statusCode || 0,
                statusMessage: res.errMsg
            });
        }
    };
    wx.request(con);
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//微信小程序入口
var _Fly = __webpack_require__(2);
var EngineWrapper = __webpack_require__(1);
var adapter = __webpack_require__(7);
var wxEngine = EngineWrapper(adapter);
module.exports = function (engine) {
    return new _Fly(engine || wxEngine);
};

/***/ })
/******/ ]);
});

/***/ }),

/***/ 141:
/*!*****************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fbrush"} ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _brush = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/brush.vue */ 142));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_brush.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 149:
/*!*******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fuserinfo%2Fvip"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _vip = _interopRequireDefault(__webpack_require__(/*! ./pages/userinfo/vip.vue */ 150));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_vip.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 15:
/*!******************************!*\
  !*** ./src/api/info/info.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _req = __webpack_require__(/*! ../../static/utils/req.js */ 9);

var _default = {
  // 获取职业列表
  getJobList: function getJobList(param) {
    return _req.req.post("/Mobile/Member/occupationList", param);
  },
  // 邀约项目
  getTypeList: function getTypeList(param) {
    return _req.req.post("/Mobile/Member/objectiveList", param);
  },
  // 获取年收入
  getRevenueList: function getRevenueList(param) {
    return _req.req.post("/mobile/Member/revenueList", param);
  },
  // 逛一逛
  getNewList: function getNewList(param) {
    return _req.req.post("/mobile/Member/casual", param);
  },
  // 用户详情
  getUserInfo: function getUserInfo(param) {
    return _req.req.post("/mobile/Member/userInfo", param);
  },
  // 保存用户信息
  saveData: function saveData(param) {
    return _req.req.post("/mobile/Member/saveBasic", param);
  },
  // 获取用户上传图片s
  getPhotos: function getPhotos(param) {
    return _req.req.post("/mobile/Member/photograph", param);
  },
  // 获取他人详情数据
  getUserInfoOther: function getUserInfoOther(param) {
    return _req.req.post("/mobile/Member/otherInfo", param);
  },
  // 普通,屏蔽，封禁
  changeStatus: function changeStatus(param) {
    return _req.req.post("/Admin/Member/changeStatus", param);
  },
  // 改变分数
  changeScore: function changeScore(param) {
    return _req.req.post("/Admin/Member/changeScore", param);
  },
  // 支付29
  getGateCheck: function getGateCheck(param) {
    return _req.req.post("/mobile/Pay/gate_check", param);
  },
  // 获取订单
  getGatePay: function getGatePay(param) {
    return _req.req.post("/mobile/Pay/gate_pay", param);
  },
  // 取消订单
  cancle: function cancle(param) {
    return _req.req.post("/mobile/Pay/cancle", param);
  },
  // 设置手机查看权限
  accessPhone: function accessPhone(param) {
    return _req.req.post("/mobile/Member/accessPhone", param);
  },
  // 设置微信查看权限
  accessWechat: function accessWechat(param) {
    return _req.req.post("/mobile/Member/accessWechat", param);
  },
  //vip 列表
  vipList: function vipList(param) {
    return _req.req.post("/mobile/Member/vipList", param);
  },
  // 支付检查
  payCheckVip: function payCheckVip(param) {
    return _req.req.post("/mobile/Pay/vip_check ", param);
  },
  // 获取用户列表
  getUserList: function getUserList(param) {
    return _req.req.post("/mobile/Member/userList", param);
  },
  // 获取他人的详情记录
  getOtherUser: function getOtherUser(param) {
    return _req.req.post("/mobile/Member/otherInfo", param);
  },
  // 来访记录
  getVisitList: function getVisitList(param) {
    return _req.req.post("/mobile/Action/visitList", param);
  },
  // 访问记录
  getBeVisitList: function getBeVisitList(param) {
    return _req.req.post("/mobile/Action/beVisitList", param);
  },
  // 用户查看视频
  getOtherVideo: function getOtherVideo(param) {
    return _req.req.post("mobile/Action/checkVideo", param);
  },
  // 用户查看手机号或者微信
  checkPhoneOrWechat: function checkPhoneOrWechat(param) {
    return _req.req.post("mobile/Action/checkPhoneOrWechat", param);
  },
  // 建立用户关系
  createRelation: function createRelation(param) {
    return _req.req.post("/mobile/relation/createRelation", param);
  },
  // 用户加黑
  pullgRelatioasdasn: function pullgRelatioasdasn(param) {
    return _req.req.post("/mobile/relation/changeRelationship", param);
  },
  // 意见反馈，举报
  addAccusation: function addAccusation(param) {
    return _req.req.post("/mobile/Accusation/addAccusation ", param);
  },
  // 云信会话列表用户信息
  yxuserdata: function yxuserdata(param) {
    return _req.req.post("/mobile/Member/headerAndNickname", param);
  },
  // 获取banner广告
  getBannerList: function getBannerList(param) {
    return _req.req.post("/mobile/Member/bannerList", param);
  },
  // 发送地理位置
  heartbeat: function heartbeat(param) {
    return _req.req.post("/mobile/Action/heartbeat", param);
  },
  sendNotice: function sendNotice(param) {
    return _req.req.post("/mobile/Action/sendNotice", param);
  }
};
exports.default = _default;

/***/ }),

/***/ 157:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Fvisitor"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _visitor = _interopRequireDefault(__webpack_require__(/*! ./pages/message/visitor.vue */ 158));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_visitor.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 16:
/*!******************************************!*\
  !*** ./src/static/utils/localstorage.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  setItem: function setItem(key, val, func) {
    var tool = Object.prototype.toString.call(val).slice(8, -1);
    var isJson = tool === 'Object' || tool === 'Array' || false;
    val = typeof val === 'string' ? val : isJson ? JSON.stringify(val) : '';
    if (!val) return new Error('保存storag出错，请注意检查当前类型');
    uni.setStorage({
      key: key,
      data: val,
      success: function success() {
        func && func();
      }
    });
  },
  getItem: function getItem(key) {
    return uni.getStorageSync(key);
  },
  removeItem: function removeItem(key, func) {
    uni.removeStorage({
      key: key,
      success: function success(res) {
        func && func();
      }
    });
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 165:
/*!*********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fuserinfo%2Findex"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/userinfo/index.vue */ 166));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 17:
/*!************************************************!*\
  !*** ./src/static/utils/message/chatconfig.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = __webpack_require__(/*! ./index */ 18);

var data = {};
var nim;
var self = {};
var instantmessaging = wx.instantmessaging;
var userinfoonloginportschange = [];
/**
 * 全局this指向
 * @param {Object} _this 
 */

var _default = {
  socket: function socket(_this, token, account) {
    self = _this; // console.log = function (){}

    nim = wx.NIM.getInstance({
      // debug: true,
      appKey: instantmessaging[instantmessaging.thishe].appkey,
      account: account,
      token: token,
      transports: ['websocket'],
      onloginportschange: function onloginportschange(res) {
        console.log('其他端登陆', res); // userinfoonloginportschange = res
        // if (nim) {
        //     userinfoonloginportschangefun()
        // }
      },
      onconnect: function onconnect(res) {
        console.log('连接成功', res);
      },
      onerror: function onerror(error) {
        console.log('发生错误的回调, 会传入错误对象', error);

        if (nim.disconnect && nim.connect) {
          nim.disconnect();
          nim.connect();
        }
      },
      onofflinesysmsgs: function onofflinesysmsgs(msg) {
        console.log('系统通知', msg);
      },
      ondisconnect: function ondisconnect(error) {
        console.log('你断开了连接', error); // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面

        console.log('连接断开', error);

        if (error) {
          switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
              console.log('账号或者密码错误');
              wx.showModal({
                title: '提示',
                content: '账号或者密码错误，请重新登陆',
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  }
                }
              });
              break;
            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误

            case 417:
              console.log('你已在其他端登陆啦,已退出登陆');
              wx.showModal({
                title: '提示',
                content: '你已在其他端登陆，请重新登陆',
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  }
                }
              });
              break;
            // 被踢, 请提示错误后跳转到登录页面

            case 'kicked':
              wx.showModal({
                title: '提示',
                content: '你被其他端踢出登陆，请重新登陆',
                showCancel: false,
                success: function success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    });
                  }
                }
              });
              console.log('被踢, 请提示错误后跳转到登录页面');
              break;

            default:
              wx.showModal({
                title: '提示',
                content: '连接出现异常，请刷新页面',
                showCancel: false,
                success: function success(res) {// getCurrentPages()[getCurrentPages().length - 1].onLoad()
                  // if (res.confirm) {
                  //     console.log('用户点击确定')
                  //     wx.reLaunch({
                  //         url: '/pages/index/begin'
                  //     })
                  // } else if (res.cancel) {
                  //     console.log('用户点击取消')
                  //     wx.reLaunch({
                  //         url: '/pages/index/begin'
                  //     })
                  // }
                }
              });
              break;
          }
        }
      },
      onmyinfo: function onmyinfo(userInfo) {
        self.$store.dispatch('userInfo', userInfo);
      },
      onfriends: function onfriends(friends) {
        // 收到好友列表
        console.log('好友列表', friends);
        data.friends = nim.mergeFriends(data.friends, friends);
        data.friends = nim.cutFriends(data.friends, friends.invalid);
        self.$store.dispatch('friendCard', data.friends);
      },
      onusers: function onusers(res) {// console.log('好友名片', res)
      },
      onteams: function onteams(teams) {
        // 收到群列表
        // console.log('收到群列表', teams);
        data.teams = nim.mergeTeams(data.teams, teams);
        data.teams = nim.cutTeams(data.teams, teams);
        data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
        self.$store.dispatch('groupList', data.teams);
      },
      onsessions: function onsessions(sessions) {
        // 新的会话列表
        // console.log('收到原始会话列表', sessions)
        // 列表数据计算
        data.sessions = nim.mergeSessions(data.sessions, sessions); // 更新总未读数

        data.sessions.map(function (item) {
          if (item.unread) {
            self.$store.state.unreadInfo[item.id] = item.unread;
          }
        });
        data.unreadInfo = self.$store.state.unreadInfo;
        self.$store.dispatch('unreadInfo', data.unreadInfo); // 更新UI会话列表  1会话列表  2好友列表 3群列表 4未读信息，包含已、未订阅的账户数

        var list = (0, _index.convertRawMessageListToRenderChatList)(data.sessions, data.friends, data.teams, data.unreadInfo);
        self.$store.dispatch('chatList', list);
      },
      onupdatesession: function onupdatesession(sessions) {
        // 会话列表更新
        // console.log('会话列表更新啦', sessions)
        // 列表数据计算
        data.sessions = nim.mergeSessions(data.sessions, sessions);
        self.$store.state.unreadInfo[sessions.id] = sessions.unread;
        data.unreadInfo = self.$store.state.unreadInfo;
        self.$store.dispatch('unreadInfo', data.unreadInfo); // 更新UI会话列表  1会话列表  2好友列表 3群列表 4未读信息，包含已、未订阅的账户数

        var list = (0, _index.convertRawMessageListToRenderChatList)(data.sessions, data.friends, data.teams, data.unreadInfo);
        self.$store.dispatch('chatList', list);
      },
      onmsg: onMsg,
      // 收到新消息
      onroamingmsgs: onRoamingMsgs,
      // 漫游消息
      onofflinemsgs: onOfflineMsgs,
      // 离线消息
      onsysmsgunread: function onsysmsgunread(res) {// console.log('系统未读数', res)
      },
      onupdatesysmsgunread: function onupdatesysmsgunread(res) {// console.log('系统未读数更新了', res)
      },
      syncRelations: true,
      // 同步加黑和静音列表
      onblacklist: function onblacklist(res) {
        console.log('黑名单列表', res);
        var blacklist = {};

        for (var key in res) {
          if (key != 'invalid') {
            blacklist[res[key].account] = res[key];
          }
        }

        wx.USER.blacklist = blacklist;
      },
      onsyncmarkinblacklist: function onsyncmarkinblacklist(res) {
        console.log('黑名单发生变化', res);
      },
      onmutelist: function onmutelist(res) {
        console.log('静音列表', res);
      },
      onsyncmarkinmutelist: function onsyncmarkinmutelist(res) {
        console.log('静音列表发生变化', res);
      },
      syncSessionUnread: true,
      syncRoamingMsgs: true,
      db: false,
      promise: true,
      onsyncdone: function onsyncdone(res) {
        console.log('同步完成', res);
      }
    }); // 登陆成功之后踢掉其他端，保留当前端
    // userinfoonloginportschangefun()

    function userinfoonloginportschangefun() {
      var kick = [];

      for (var i = 0, len = userinfoonloginportschange.length; i < len; i++) {
        kick.push(userinfoonloginportschange[i].deviceId);
      }

      if (kick.length <= 0) {
        return;
      }

      nim.kick({
        deviceIds: kick,
        done: function done(error, obj) {
          console.log('踢其它端' + (!error ? '成功' : '失败'));
        }
      });
    }

    return nim;
  }
};
exports.default = _default;

function onRoamingMsgs(obj) {
  // console.log('漫游消息', obj);
  pushMsg(obj.msgs);
}

function onOfflineMsgs(obj) {
  // console.log('离线消息', obj);
  pushMsg(obj.msgs);
}

function onMsg(msg) {
  // console.log('收到消息', msg.scene, msg.type, msg);
  // let list = self.$store.state.chatList
  // let is = '-1'
  // for (let i = 0; i < list.length; i++) {
  //     if (list[i].account == msg.from) {
  //         is = '1'
  //         list[i].chatType = msg.scene
  //         list[i].unread += 1
  //         list[i].type = msg.type
  //         list[i].lastestMsg = msg.text
  //         list[i].timestamp = msg.time
  //         list[i].displayTime = calcTimeHeader(msg.time)
  //         break;
  //     } else {
  //         is = '-1'
  //     }
  // }
  // list.sort((a, b) => {
  //     return b.timestamp - a.timestamp
  // })
  // data.sessions = list
  var list = (0, _index.convertRawMessageListToRenderChatList)(data.sessions, data.friends, data.teams, data.unreadInfo);
  self.$store.dispatch('chatList', list);
  pushMsg(msg);
}

function pushMsg(msgs) {
  // 将状态机聊天记录与缓存的本地记录同步
  data.msgs = self.$store.state.thischatList || {};

  if (!Array.isArray(msgs)) {
    msgs = [msgs];
  }

  var sessionId = msgs[0].sessionId;
  data.msgs = data.msgs || {};
  data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
  self.$store.dispatch('thischatList', data.msgs);
}

/***/ }),

/***/ 173:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fuserinfo%2Fdetail"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/userinfo/detail.vue */ 174));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 18:
/*!*******************************************!*\
  !*** ./src/static/utils/message/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _emojimap = _interopRequireDefault(__webpack_require__(/*! ./emojimap.js */ 11));

var _NIM_Web_NIM_v = _interopRequireDefault(__webpack_require__(/*! ./../../libs/NIM_Web_NIM_v6.6.6.js */ 19));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

wx.instantmessaging = {
  thishe: 'testclothes',
  testclothes: {
    // 测试服
    service: {
      // 客服
      token: "0063951a9f7198f2f56f0953cf2fed29",
      accid: "service"
    },
    notice: {
      // 系统通知
      token: "d6a3732df8b10f92a2acdbc64fbf121e",
      accid: "notice"
    },
    // appkey: '94f19e934b338488e5d914dba6bbf96e', // 测试
    //       appsecret: 'a3fd9873179', // 测试
    appkey: 'f1f40794fc391d650373015a6d8f5683',
    // 正式
    appsecret: '503c2403f0f9' // 正式

  },
  formaldress: {
    // 正式服
    service: {
      // 客服
      token: "0063951a9f7198f2f56f0953cf2fed29",
      accid: "service"
    },
    notice: {
      // 系统通知
      token: "d6a3732df8b10f92a2acdbc64fbf121e",
      accid: "notice"
    },
    // appkey: '94f19e934b338488e5d914dba6bbf96e',
    // appsecret: 'a3fd9873179',
    appkey: 'f1f40794fc391d650373015a6d8f5683',
    // 正式
    appsecret: '503c2403f0f9' // 正式

  } // 引入表情js

};
var emoji = _emojimap.default.emojiList.emoji; // 引入云信sdk

wx.NIM = _NIM_Web_NIM_v.default;
console.log(wx.instantmessaging);
var instantmessaging = wx.instantmessaging;

var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

var attachInfo = function attachInfo() {
  var res = wx.getSystemInfoSync();
  wx.WIN_WIDTH = res.screenWidth;
  wx.WIN_HEIGHT = res.screenHeight;
  wx.IS_IOS = /ios/i.test(res.system);
  wx.IS_ANDROID = /android/i.test(res.system);
  wx.DEFAULT_HEADER_HEIGHT = 46; // res.screenHeight - res.windowHeight - res.statusBarHeight

  wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT;
  wx.IS_APP = true;
  var custom = wx.getMenuButtonBoundingClientRect();
  wx.STATUS_BAR_HEIGHT = res.statusBarHeight;
  wx.CUSTOM = custom;
  wx.CUSTOM_Bar = custom.bottom + custom.top - res.statusBarHeight;

  wx.showAlert = function (options) {
    options.showCancel = false;
    wx.showModal(options);
  };

  wx.showConfirm = function (options) {
    wx.showModal(options);
  };
};
/**
 * 生成富文本节点
 */


function generateRichTextNode(text) {
  var tempStr = text;
  var richTextNode = [];
  var leftBracketIndex = tempStr.indexOf('[');
  var rightBracketIndex = tempStr.indexOf(']');
  var countOfWord = 0;
  Array.from(tempStr).map(function (item) {
    if (item != '[' && item != ']') {
      countOfWord++;
    }
  });

  if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) {
    //没有emoji
    richTextNode.push({
      type: 'text',
      text: tempStr
    });
    return richTextNode;
  }

  while (tempStr.length != 0) {
    leftBracketIndex = tempStr.indexOf('[');
    rightBracketIndex = tempStr.indexOf(']');

    if (leftBracketIndex == 0) {
      // 开头是[
      rightBracketIndex = tempStr.indexOf(']');

      if (rightBracketIndex == -1) {
        richTextNode.push({
          type: 'text',
          text: tempStr
        });
        tempStr = '';
      } else {
        var emojiName = tempStr.slice(0, rightBracketIndex + 1);

        if (emoji[emojiName]) {
          // 有效emoji
          richTextNode.push({
            name: 'img',
            attrs: {
              width: '20rpx',
              height: '20rpx',
              src: emoji[emojiName].img
            }
          });
        } else {
          //无效emoji
          richTextNode.push({
            type: 'text',
            text: emojiName
          });
        }

        tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length);
      }
    } else {
      // 开头不是[
      if (leftBracketIndex == -1) {
        // 最后全是文字
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, tempStr.length)
        });
        tempStr = '';
      } else {
        richTextNode.push({
          type: 'text',
          text: tempStr.slice(0, leftBracketIndex)
        });
        tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1);
      }
    }
  }

  return richTextNode;
}

function post(params) {
  var url = params.url,
      header = params.header || {},
      data = params.data;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: header,
      method: 'POST',
      success: function success(data, statusCode, header) {
        resolve({
          data: data,
          statusCode: statusCode,
          header: header
        });
      },
      fail: function fail() {
        reject('请求失败，请重试！');
      }
    });
  });
}
/**
 * 输入Unix时间戳，返回指定时间格式
 */


function calcTimeHeader(time) {
  // 格式化传入时间
  var date = new Date(parseInt(time)),
      year = date.getUTCFullYear(),
      month = date.getUTCMonth(),
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getUTCMinutes(); // 获取当前时间

  var currentDate = new Date(),
      currentYear = date.getUTCFullYear(),
      currentMonth = date.getUTCMonth(),
      currentDay = currentDate.getDate(); // 计算是否是同一天

  if (currentYear == year && currentMonth == month && currentDay == day) {
    //同一天直接返回
    if (hour > 12) {
      return "\u4E0B\u5348 ".concat(hour, ":").concat(minute < 10 ? '0' + minute : minute);
    } else {
      return "\u4E0A\u5348 ".concat(hour, ":").concat(minute < 10 ? '0' + minute : minute);
    }
  } // 计算是否是昨天


  var yesterday = new Date(currentDate - 24 * 3600 * 1000);

  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth && day == yesterday.getDate()) {
    //昨天
    return "\u6628\u5929 ".concat(hour, ":").concat(minute < 10 ? '0' + minute : minute);
  } else {
    return "".concat(year, "-").concat(month + 1, "-").concat(day, " ").concat(hour, ":").concat(minute < 10 ? '0' + minute : minute);
  }
}
/**
 * 将原生消息转化为最近会话列表渲染数据
 */


function convertRawMessageListToRenderChatList(rawMessageList, friendCard, groupList, unreadInfo) {
  // rawMessageList 所有的聊天列表都在里面
  // friendCard 好友列表，含名片信息，额外添加在线信息
  // groupList 群列表
  // unreadInfo 未读信息，包含已、未订阅的账户数
  // debugger
  // let rawMessageList = data.sessions
  var chatList = [];
  var notice = instantmessaging[instantmessaging.thishe].notice.accid; // 系统

  var service = instantmessaging[instantmessaging.thishe].service.accid; // 客服

  var noticeobj = {},
      serviceobj = {};

  for (var i = 0; i < rawMessageList.length; i++) {
    var unread = unreadInfo[rawMessageList[i].id] || 0;
    var youobj = {
      chatType: rawMessageList[i].scene,
      session: rawMessageList[i].id,
      account: rawMessageList[i].to,
      status: '',
      nick: '',
      avatar: '',
      lastestMsg: rawMessageList[i].lastMsg.text,
      type: rawMessageList[i].lastMsg.type,
      timestamp: rawMessageList[i].updateTime,
      unread: unread,
      // rawMessageList[i].unread
      displayTime: calcTimeHeader(rawMessageList[i].updateTime)
    };
    youobj.unread = unread;

    if (rawMessageList[i].to == notice) {
      // 系统通知
      youobj.nick = '系统通知';
      youobj.avatar = '/static/images/systemicon.png';
      noticeobj = youobj;
    } else if (rawMessageList[i].to == service) {
      // 客服
      youobj.nick = '客服';
      youobj.avatar = '/static/images/serveicon.png';
      serviceobj = youobj;
    } else {
      chatList.push(youobj);
    } // chatList.push(youobj)

  } // 排序


  chatList.sort(function (a, b) {
    return b.timestamp - a.timestamp;
  });
  var spliceindex = []; // 客服系统

  if (JSON.stringify(serviceobj) != '{}') {
    // chatList.splice(spliceindex, 0, serviceobj)
    // spliceindex = 1
    spliceindex = [serviceobj];
  } // else {
  //     chatList.splice(spliceindex, 0, {
  //         chatType: 'p2p',
  //         session: 'p2p-' + service,
  //         account: service,
  //         status: '',
  //         nick: '客服',
  //         avatar: '/static/images/serveicon.png',
  //         lastestMsg: '',
  //         type: 'text',
  //         timestamp: 0,
  //         unread: 0,
  //         displayTime: ''
  //     })
  //     spliceindex = 1
  // }
  // 系统通知


  if (JSON.stringify(noticeobj) != '{}') {
    // chatList.splice(spliceindex, 0, noticeobj)
    if (spliceindex.length == 0) {
      spliceindex = [noticeobj];
    } else {
      spliceindex.push(noticeobj);
    }
  }

  for (var _i = 0, len = chatList.length; _i < len; _i++) {
    spliceindex.push(chatList[_i]);
  }

  chatList = spliceindex; // else {
  //     chatList.splice(spliceindex, 0, {
  //         chatType: 'p2p',
  //         session: 'p2p-' + notice,
  //         account: notice,
  //         status: '',
  //         nick: '系统通知',
  //         avatar: '/static/images/systemicon.png',
  //         lastestMsg: '',
  //         type: 'text',
  //         timestamp: 0,
  //         unread: 0,
  //         displayTime: ''
  //     })
  // }

  console.log('会话列表更新结构体结果', chatList);
  return chatList;
}

module.exports = {
  formatTime: formatTime,
  attachInfo: attachInfo,
  generateRichTextNode: generateRichTextNode,
  post: post,
  calcTimeHeader: calcTimeHeader,
  convertRawMessageListToRenderChatList: convertRawMessageListToRenderChatList
};

/***/ }),

/***/ 181:
/*!***********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fuserinfo%2Fothersd"} ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _othersd = _interopRequireDefault(__webpack_require__(/*! ./pages/userinfo/othersd.vue */ 182));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_othersd.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 189:
/*!*****************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Findex"} ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/index.vue */ 190));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 19:
/*!***********************************************!*\
  !*** ./src/static/libs/NIM_Web_NIM_v6.6.6.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var s = t[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
  }

  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {
      configurable: !1,
      enumerable: !0,
      get: r
    });
  }, n.r = function (e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 264);
}([function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(84),
      a = n(83);
  n(172);
  var c,
      u,
      l = n(15),
      m = l.getGlobal(),
      d = /\s+/;
  l.deduplicate = function (e) {
    var t = [];
    return e.forEach(function (e) {
      -1 === t.indexOf(e) && t.push(e);
    }), t;
  }, l.capFirstLetter = function (e) {
    return e ? (e = "" + e).slice(0, 1).toUpperCase() + e.slice(1) : "";
  }, l.guid = (c = function c() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
  }, function () {
    return c() + c() + c() + c() + c() + c() + c() + c();
  }), l.extend = function (e, t, n) {
    for (var r in t) {
      void 0 !== e[r] && !0 !== n || (e[r] = t[r]);
    }
  }, l.filterObj = function (e, t) {
    var n = {};
    return l.isString(t) && (t = t.split(d)), t.forEach(function (t) {
      e.hasOwnProperty(t) && (n[t] = e[t]);
    }), n;
  }, l.copy = function (e, t) {
    return t = t || {}, e ? (Object.keys(e).forEach(function (n) {
      l.exist(e[n]) && (t[n] = e[n]);
    }), t) : t;
  }, l.copyWithNull = function (e, t) {
    return t = t || {}, e ? (Object.keys(e).forEach(function (n) {
      (l.exist(e[n]) || l.isnull(e[n])) && (t[n] = e[n]);
    }), t) : t;
  }, l.findObjIndexInArray = function (e, t) {
    e = e || [];
    var n = t.keyPath || "id",
        r = -1;
    return e.some(function (e, s) {
      if (a(e, n) === t.value) return r = s, !0;
    }), r;
  }, l.findObjInArray = function (e, t) {
    var n = l.findObjIndexInArray(e, t);
    return -1 === n ? null : e[n];
  }, l.mergeObjArray = function () {
    var e = [],
        t = [].slice.call(arguments, 0, -1),
        n = arguments[arguments.length - 1];
    l.isArray(n) && (t.push(n), n = {});
    var r,
        s = n.keyPath = n.keyPath || "id";

    for (n.sortPath = n.sortPath || s; !e.length && t.length;) {
      e = (e = t.shift() || []).slice(0);
    }

    return t.forEach(function (t) {
      t && t.forEach(function (t) {
        -1 !== (r = l.findObjIndexInArray(e, {
          keyPath: s,
          value: a(t, s)
        })) ? e[r] = l.merge({}, e[r], t) : e.push(t);
      });
    }), n.notSort || (e = l.sortObjArray(e, n)), e;
  }, l.cutObjArray = function (e) {
    var t = e.slice(0),
        n = arguments.length,
        r = [].slice.call(arguments, 1, n - 1),
        s = arguments[n - 1];
    l.isObject(s) || (r.push(s), s = {});
    var i,
        o = s.keyPath = s.keyPath || "id";
    return r.forEach(function (e) {
      l.isArray(e) || (e = [e]), e.forEach(function (e) {
        e && (s.value = a(e, o), -1 !== (i = l.findObjIndexInArray(t, s)) && t.splice(i, 1));
      });
    }), t;
  }, l.sortObjArray = function (e, t) {
    var n = (t = t || {}).sortPath || "id";
    o.insensitive = !!t.insensitive;
    var r,
        s,
        i,
        c = !!t.desc;
    return i = l.isFunction(t.compare) ? t.compare : function (e, t) {
      return r = a(e, n), s = a(t, n), c ? o(s, r) : o(r, s);
    }, e.sort(i);
  }, l.emptyFunc = function () {}, l.isEmptyFunc = function (e) {
    return e === l.emptyFunc;
  }, l.notEmptyFunc = function (e) {
    return e !== l.emptyFunc;
  }, l.splice = function (e, t, n) {
    return [].splice.call(e, t, n);
  }, l.reshape2d = function (e, t) {
    if (Array.isArray(e)) {
      l.verifyParamType("type", t, "number", "util::reshape2d");
      var n = e.length;
      if (n <= t) return [e];

      for (var r = Math.ceil(n / t), s = [], i = 0; i < r; i++) {
        s.push(e.slice(i * t, (i + 1) * t));
      }

      return s;
    }

    return e;
  }, l.flatten2d = function (e) {
    if (Array.isArray(e)) {
      var t = [];
      return e.forEach(function (e) {
        t = t.concat(e);
      }), t;
    }

    return e;
  }, l.dropArrayDuplicates = function (e) {
    if (Array.isArray(e)) {
      for (var t = {}, n = []; e.length > 0;) {
        t[e.shift()] = !0;
      }

      for (var r in t) {
        !0 === t[r] && n.push(r);
      }

      return n;
    }

    return e;
  }, l.onError = function (e) {
    throw new function (e) {
      "object" === (void 0 === e ? "undefined" : (0, i.default)(e)) ? (this.callFunc = e.callFunc || null, this.message = e.message || "UNKNOW ERROR") : this.message = e, this.time = new Date(), this.timetag = +this.time;
    }(e);
  }, l.verifyParamPresent = function (e, t, n, r) {
    n = n || "";
    var s = !1;

    switch (l.typeOf(t)) {
      case "undefined":
      case "null":
        s = !0;
        break;

      case "string":
        "" === t && (s = !0);
        break;

      case "StrStrMap":
      case "object":
        Object.keys(t).length || (s = !0);
        break;

      case "array":
        t.length ? t.some(function (e) {
          if (l.notexist(e)) return s = !0, !0;
        }) : s = !0;
    }

    s && l.onParamAbsent(n + e, r);
  }, l.onParamAbsent = function (e, t) {
    l.onParamError("缺少参数 " + e + ", 请确保参数不是 空字符串、空对象、空数组、null或undefined, 或数组的内容不是 null/undefined", t);
  }, l.verifyParamAbsent = function (e, t, n, r) {
    n = n || "", void 0 !== t && l.onParamPresent(n + e, r);
  }, l.onParamPresent = function (e, t) {
    l.onParamError("多余的参数 " + e, t);
  }, l.verifyParamType = function (e, t, n, r) {
    var s = l.typeOf(t).toLowerCase();
    l.isArray(n) || (n = [n]);
    var i = !0;

    switch (-1 === (n = n.map(function (e) {
      return e.toLowerCase();
    })).indexOf(s) && (i = !1), s) {
      case "number":
        isNaN(t) && (i = !1);
        break;

      case "string":
        "numeric or numeric string" === n.join("") && (i = !!/^[0-9]+$/.test(t));
    }

    i || l.onParamInvalidType(e, n, "", r);
  }, l.onParamInvalidType = function (e, t, n, r) {
    n = n || "", t = l.isArray(t) ? (t = t.map(function (e) {
      return '"' + e + '"';
    })).join(", ") : '"' + t + '"', l.onParamError('参数"' + n + e + '"类型错误, 合法的类型包括: [' + t + "]", r);
  }, l.verifyParamValid = function (e, t, n, r) {
    l.isArray(n) || (n = [n]), -1 === n.indexOf(t) && l.onParamInvalidValue(e, n, r);
  }, l.onParamInvalidValue = function (e, t, n) {
    l.isArray(t) || (t = [t]), t = t.map(function (e) {
      return '"' + e + '"';
    }), l.isArray(t) && (t = t.join(", ")), l.onParamError("参数 " + e + "值错误, 合法的值包括: [" + JSON.stringify(t) + "]", n);
  }, l.verifyParamMin = function (e, t, n, r) {
    t < n && l.onParamError("参数" + e + "的值不能小于" + n, r);
  }, l.verifyParamMax = function (e, t, n, r) {
    t > n && l.onParamError("参数" + e + "的值不能大于" + n, r);
  }, l.verifyArrayMax = function (e, t, n, r) {
    t.length > n && l.onParamError("参数" + e + "的长度不能大于" + n, r);
  }, l.verifyEmail = (u = /^\S+@\S+$/, function (e, t, n) {
    u.test(t) || l.onParamError("参数" + e + "邮箱格式错误, 合法格式必须包含@符号, @符号前后至少要各有一个字符", n);
  }), l.verifyTel = function () {
    var e = /^[+\-()\d]+$/;
    return function (t, n, r) {
      e.test(n) || l.onParamError("参数" + t + "电话号码格式错误, 合法字符包括+、-、英文括号和数字", r);
    };
  }(), l.verifyBirth = function () {
    var e = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    return function (t, n, r) {
      e.test(n) || l.onParamError("参数" + t + '生日格式错误, 合法为"yyyy-MM-dd"', r);
    };
  }(), l.onParamError = function (e, t) {
    l.onError({
      message: e,
      callFunc: t
    });
  }, l.verifyOptions = function (e, t, n, r, s) {
    if (e = e || {}, t && (l.isString(t) && (t = t.split(d)), l.isArray(t))) {
      "boolean" != typeof n && (s = n || null, n = !0, r = "");
      var i = n ? l.verifyParamPresent : l.verifyParamAbsent;
      t.forEach(function (t) {
        i.call(l, t, e[t], r, s);
      });
    }

    return e;
  }, l.verifyParamAtLeastPresentOne = function (e, t, n) {
    t && (l.isString(t) && (t = t.split(d)), l.isArray(t) && (t.some(function (t) {
      return l.exist(e[t]);
    }) || l.onParamError("以下参数[" + t.join(", ") + "]至少需要传入一个", n)));
  }, l.verifyParamPresentJustOne = function (e, t, n) {
    t && (l.isString(t) && (t = t.split(d)), l.isArray(t) && 1 !== t.reduce(function (t, n) {
      return l.exist(e[n]) && t++, t;
    }, 0) && l.onParamError("以下参数[" + t.join(", ") + "]必须且只能传入一个", n));
  }, l.verifyBooleanWithDefault = function (e, t, n, r, s) {
    l.undef(n) && (n = !0), d.test(t) && (t = t.split(d)), l.isArray(t) ? t.forEach(function (t) {
      l.verifyBooleanWithDefault(e, t, n, r, s);
    }) : void 0 === e[t] ? e[t] = n : l.isBoolean(e[t]) || l.onParamInvalidType(t, "boolean", r, s);
  }, l.verifyFileInput = function (e, t) {
    return l.verifyParamPresent("fileInput", e, "", t), l.isString(e) && ((e = document.getElementById(e)) || l.onParamError("找不到要上传的文件对应的input, 请检查fileInput id " + e, t)), e.tagName && "input" === e.tagName.toLowerCase() && "file" === e.type.toLowerCase() || l.onParamError("请提供正确的 fileInput, 必须为 file 类型的 input 节点 tagname:" + e.tagName + ", filetype:" + e.type, t), e;
  }, l.verifyFileType = function (e, t) {
    l.verifyParamValid("type", e, l.validFileTypes, t);
  }, l.verifyCallback = function (e, t, n) {
    d.test(t) && (t = t.split(d)), l.isArray(t) ? t.forEach(function (t) {
      l.verifyCallback(e, t, n);
    }) : e[t] ? l.isFunction(e[t]) || l.onParamInvalidType(t, "function", "", n) : e[t] = l.emptyFunc;
  }, l.verifyFileUploadCallback = function (e, t) {
    l.verifyCallback(e, "uploadprogress uploaddone uploaderror uploadcancel", t);
  }, l.validFileTypes = ["image", "audio", "video", "file"], l.validFileExts = {
    image: ["bmp", "gif", "jpg", "jpeg", "jng", "png", "webp"],
    audio: ["mp3", "wav", "aac", "wma", "wmv", "amr", "mp2", "flac", "vorbis", "ac3"],
    video: ["mp4", "rm", "rmvb", "wmv", "avi", "mpg", "mpeg"]
  }, l.filterFiles = function (e, t) {
    var n,
        r,
        s = "file" === (t = t.toLowerCase()),
        i = [];
    return [].forEach.call(e, function (e) {
      if (s) i.push(e);else if (n = e.name.slice(e.name.lastIndexOf(".") + 1), (r = e.type.split("/"))[0] && r[1]) {
        (r[0].toLowerCase() === t || -1 !== l.validFileExts[t].indexOf(n)) && i.push(e);
      }
    }), i;
  };
  var p,
      f,
      g = l.supportFormData = l.notundef(m.FormData);
  l.getFileName = function (e) {
    return e = l.verifyFileInput(e), g ? e.files[0].name : e.value.slice(e.value.lastIndexOf("\\") + 1);
  }, l.getFileInfo = (p = {
    ppt: 1,
    pptx: 2,
    pdf: 3
  }, function (e) {
    var t = {};
    if (!(e = l.verifyFileInput(e)).files) return t;
    var n = e.files[0];
    return g && (t.name = n.name, t.size = n.size, t.type = n.name.match(/\.(\w+)$/), t.type = t.type && t.type[1].toLowerCase(), t.transcodeType = p[t.type] || 0), t;
  }), l.sizeText = (f = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "BB"], function (e) {
    var t,
        n = 0;

    do {
      t = (e = Math.floor(100 * e) / 100) + f[n], e /= 1024, n++;
    } while (e > 1);

    return t;
  }), l.promises2cmds = function (e) {
    return e.map(function (e) {
      return e.cmd;
    });
  }, l.objs2accounts = function (e) {
    return e.map(function (e) {
      return e.account;
    });
  }, l.teams2ids = function (e) {
    return e.map(function (e) {
      return e.teamId;
    });
  }, l.objs2ids = function (e) {
    return e.map(function (e) {
      return e.id;
    });
  }, l.getMaxUpdateTime = function (e) {
    var t = e.map(function (e) {
      return +e.updateTime;
    });
    return Math.max.apply(Math, t);
  }, l.genCheckUniqueFunc = function (e, t) {
    return e = e || "id", t = t || 1e3, function (t) {
      this.uniqueSet = this.uniqueSet || {}, this.uniqueSet[e] = this.uniqueSet[e] || {};
      var n = this.uniqueSet[e],
          r = t[e];
      return !n[r] && (n[r] = !0, !0);
    };
  }, l.fillPropertyWithDefault = function (e, t, n) {
    return !!l.undef(e[t]) && (e[t] = n, !0);
  }, e.exports = l;
}, function (e, t, n) {
  "use strict";

  var r = {
    info: {
      hash: "891804947cff7b3fb07111efea49431a29eedd37",
      shortHash: "8918049",
      version: "6.0.0",
      sdkVersion: "52",
      nrtcVersion: "4.4.0",
      nrtcSdkVersion: "1",
      protocolVersion: 1
    },
    agentVersion: "2.8.0.906",
    lbsUrl: "https://lbs.netease.im/lbs/webconf.jsp",
    roomserver: "roomserver.netease.im",
    connectTimeout: 8e3,
    xhrTimeout: 8e3,
    socketTimeout: 8e3,
    reconnectionDelay: 1600,
    reconnectionDelayMax: 8e3,
    reconnectionJitter: .01,
    reconnectiontimer: null,
    heartbeatInterval: 8e3,
    cmdTimeout: 8e3,
    defaultReportUrl: "https://dr.netease.im/1.gif",
    isWeixinApp: !1,
    isNodejs: !1,
    isRN: !1,
    PUSHTOKEN: "",
    PUSHCONFIG: {},
    CLIENTTYPE: 16,
    PushPermissionAsked: !1,
    iosPushConfig: null,
    androidPushConfig: null,
    netDetectAddr: "https://roomserver-dev.netease.im/v1/sdk/detect/local",
    weixinNetcall: {
      checkSumUrl: "https://nrtc.netease.im/demo/getChecksum.action",
      getChannelInfoUrl: "https://nrtc.netease.im/nrtc/getChannelInfos.action"
    },
    formatSocketUrl: function formatSocketUrl(e) {
      var t = e.url,
          n = e.secure ? "https" : "http";
      return -1 === t.indexOf("http") ? n + "://" + t : t;
    },
    uploadUrl: "https://nos.netease.com",
    replaceUrl: "https://{bucket}-nosdn.netease.im/{object}",
    downloadHost: "nos.netease.com",
    downloadUrl: "https://{bucket}-nosdn.netease.im/{object}",
    httpsEnabled: !1,
    threshold: 0,
    genUploadUrl: function genUploadUrl(e) {
      return r.uploadUrl + "/" + e;
    },
    genDownloadUrl: function genDownloadUrl(e, t) {
      var n = e.bucket,
          s = (e.tag, e.expireSec),
          i = +new Date(),
          o = s ? "&survivalTime=" + s : "",
          a = r.replaceUrl + "?createTime=" + i + o;
      return /^http/.test(a) ? r.httpsEnabled && (a = a.replace("http", "https")) : a = r.httpsEnabled ? "https://" + a : "http://" + a, a.replace("{bucket}", n).replace("{object}", t);
    }
  };
  e.exports = r;
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0;
  var r = o(n(121)),
      s = o(n(107)),
      i = "function" == typeof s.default && "symbol" == _typeof(r.default) ? function (e) {
    return _typeof(e);
  } : function (e) {
    return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ? "symbol" : _typeof(e);
  };

  function o(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }

  t.default = "function" == typeof s.default && "symbol" === i(r.default) ? function (e) {
    return void 0 === e ? "undefined" : i(e);
  } : function (e) {
    return e && "function" == typeof s.default && e.constructor === s.default && e !== s.default.prototype ? "symbol" : void 0 === e ? "undefined" : i(e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17),
      s = n(24),
      i = (n(4), n(1)),
      o = n(0),
      a = o.undef,
      c = n(95),
      u = n(44).getInstance("IM"),
      l = n(54);

  function m(e) {
    o.verifyOptions(e, "appKey account token", "protocol::IMProtocol"), o.verifyCallback(e, ["onconnect", "onerror", "onwillreconnect", "ondisconnect", "onloginportschange", "onmyinfo", "onblacklist", "onmutelist", "onfriends", "onusers", "onrobots", "onteams", "onsessions", "onroamingmsgs", "onofflinemsgs", "onofflinefiltermsgs", "onroamingsysmsgs", "onofflinesysmsgs", "onofflinefiltersysmsgs", "onofflinecustomsysmsgs", "onofflinefiltercustomsysmsgs", "onbroadcastmsg", "onbroadcastmsgs", "onsysmsgunread", "onsyncdone", "onteammembers", "onsyncteammembersdone", "onmsg", "onsysmsg", "oncustomsysmsg", "onupdatemyinfo", "onupdateuser", "onupdateteammember", "onCreateTeam", "onUpdateTeam", "onAddTeamMembers", "onRemoveTeamMembers", "onUpdateTeamManagers", "onDismissTeam", "onTransferTeam", "onUpdateTeamMembersMute", "onTeamMsgReceipt", "onupdatesession", "onupdatesysmsgunread", "onupdatesysmsg", "onsynccreateteam", "onsyncmarkinblacklist", "onsyncmarkinmutelist", "onsyncfriendaction", "shouldIgnoreNotification", "shouldCountNotifyUnread", "onPushNotificationMultiportConfig", "onPushNotificationMultiportConfigUpdate", "onpushevents"], "protocol::IMProtocol"), this.db = e.api.db = new r({
      logger: e.logger
    }), s.call(this, e);
  }

  var d = s.fn,
      p = m.fn = m.prototype = Object.create(d);
  p.init = function () {
    d.init.call(this), this.socketUrls = [], this.parser = u, this.syncing = !0, this.hasSynced = !1, this.hasSyncedTeamMembers = !1, this.syncPromiseArray = [], this.syncResult = {}, this.syncTeamMembersPromiseArray = [], this.syncTeamMembersResult = {}, this.timetags = {}, this.sysMsgUnread = l.completeUnread({}), this.resetUnsettledMsgs(), this.resetUnsettledSysMsgs(), this.msgPromise = Promise.resolve(), this.sysMsgPromise = Promise.resolve(), this.sessionSet = {}, this.msgReceiptTasks = {}, this.userSet = {}, this.pushNotificationMultiportConfig = c.getDefaultConfig();
  }, p.reset = function () {
    d.reset.call(this);
    var e = this.options;
    this.db.reset(e.db), a(e.lbsUrl) && (e.lbsUrl = i.lbsUrl), this.resetAutoMarkRead();
  }, p.resetAutoMarkRead = function () {
    var e = this.options;
    o.verifyBooleanWithDefault(e, "autoMarkRead", !0, "", "protocol::resetAutoMarkRead");
  }, p.resetUnsettledMsgs = function () {
    this.unhandledMsgs = [], this.unupdatedMsgs = [];
  }, p.resetUnsettledSysMsgs = function () {
    this.unhandledSysMsgs = [], this.unupdatedSysMsgs = [];
  }, p.packetFromSync = function (e) {
    return !e.obj || !!e.obj.sync;
  }, e.exports = m, n(252), n(251), n(250), n(239), n(237), n(236), n(235), n(234), n(233), n(232), n(231), n(230), n(229), n(228), n(227), n(226), n(225);
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  function o(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    this.message = e || n.message || "", "object" === (void 0 === t ? "undefined" : (0, i.default)(t)) ? (this.event = t, this.code = "Other_Error") : void 0 !== t && (this.code = t), this.timetag = +new Date(), void 0 !== n && (this.event = n), this.event && (this.callFunc = this.event.callFunc || null, delete this.event.callFunc);
  }

  o.prototype = Object.create(Error.prototype), o.prototype.name = "NIMError";
  var a = {
    201: "客户端版本不对, 需升级sdk",
    302: "用户名或密码错误, 请检查appKey和token是否有效, account和token是否匹配",
    403: "非法操作或没有权限",
    404: "对象(用户/群/聊天室)不存在",
    405: "参数长度过长",
    408: "客户端请求超时",
    414: "参数错误",
    415: "服务不可用/没有聊天室服务器可分配",
    416: "频率控制",
    417: "重复操作",
    422: "帐号被禁用",
    500: "服务器内部错误",
    501: "数据库操作失败",
    503: "服务器繁忙",
    508: "删除有效期过了",
    509: "已失效",
    7101: "被拉黑",
    801: "群人数达到上限",
    802: "没有权限",
    803: "群不存在或未发生变化",
    804: "用户不在群里面",
    805: "群类型不匹配",
    806: "创建群数量达到限制",
    807: "群成员状态不对",
    809: "已经在群里",
    811: "强推列表中帐号数量超限",
    812: "群被禁言",
    813: "因群数量限制，部分拉人成功",
    814: "禁止使用群组消息已读服务",
    815: "群管理员人数上限",
    997: "协议已失效",
    998: "解包错误",
    999: "打包错误",
    9102: "通道失效",
    9103: "已经在其他端接听/拒绝过这通电话",
    11001: "对方离线, 通话不可送达",
    13002: "聊天室状态异常",
    13003: "在黑名单中",
    13004: "在禁言名单中",
    13006: "聊天室处于整体禁言状态,只有管理员能发言",
    Connect_Failed: "无法建立连接, 请确保能 ping/telnet 到云信服务器; 如果是IE8/9, 请确保项目部署在 HTTPS 环境下",
    Error_Internet_Disconnected: "网断了",
    Error_Connection_is_not_Established: "连接未建立",
    Error_Connection_Socket_State_not_Match: "socket状态不对",
    Error_Timeout: "超时",
    Param_Error: "参数错误",
    No_File_Selected: "请选择文件",
    Wrong_File_Type: "文件类型错误",
    File_Too_Large: "文件过大",
    Cross_Origin_Iframe: "不能获取跨域Iframe的内容",
    Not_Support: "不支持",
    NO_DB: "无数据库",
    DB: "数据库错误",
    Still_In_Team: "还在群里",
    Session_Exist: "会话已存在",
    Session_Not_Exist: "会话不存在",
    Error_Unknown: "未知错误",
    Operation_Canceled: "操作取消"
  };
  [200, 406, 808, 810].forEach(function (e) {
    a[e] = null;
  }), o.genError = function (e) {
    var t = a[e];
    return void 0 === t && (t = "操作失败"), null === t ? null : new o(t, e);
  }, o.multiInstance = function (e) {
    return new o("不允许初始化多个实例", "Not_Allow_Multi_Instance", e);
  }, o.newNetworkError = function (e) {
    var t = "Error_Internet_Disconnected";
    return new o(a[t], t, e);
  }, o.newConnectError = function (e) {
    var t = "Connect_Failed";
    return new o(a[t] || null, t, e);
  }, o.newConnectionError = function (e) {
    var t = "Error_Connection_is_not_Established";
    return new o(a[t], t, e);
  }, o.newSocketStateError = function (e) {
    var t = "Error_Connection_Socket_State_not_Match";
    return new o(a[t], t, e);
  }, o.newTimeoutError = function (e) {
    var t = "Error_Timeout";
    return new o(a[t], t, e);
  }, o.newFrequencyControlError = function (e) {
    var t = new o(a[416], 416, e);
    return t.from = "local", t;
  }, o.newParamError = function (e, t) {
    return new o(e || a.Param_Error, "Param_Error", t);
  }, o.newNoFileError = function (e, t) {
    var n = "No_File_Selected";
    return new o(e || a[n], n, t);
  }, o.newWrongFileTypeError = function (e, t) {
    var n = "Wrong_File_Type";
    return new o(e || a[n], n, t);
  }, o.newFileTooLargeError = function (e, t) {
    var n = "File_Too_Large";
    return new o(e || a[n], n, t);
  }, o.newCORSIframeError = function (e) {
    var t = "Cross_Origin_Iframe";
    return new o(a[t], t, e);
  }, o.newSupportError = function (e, t, n) {
    return new o("不支持" + e, "Not_Support_" + t, n);
  }, o.newSupportDBError = function (e) {
    return o.newSupportError("数据库", "DB", e);
  }, o.noDBError = function (e) {
    return new o(a.NO_DB, "NO_DB", e);
  }, o.newDBError = function (e) {
    return new o(a.DB, "DB", e);
  }, o.newUnknownError = function (e) {
    var t = "Error_Unknown";
    return new o(a[t], t, e);
  }, o.stillInTeamError = function (e) {
    var t = "Still_In_Team";
    return new o(a[t], t, e);
  }, o.sessionExist = function (e) {
    var t = "Session_Exist";
    return new o(a[t], t, e);
  }, o.sessionNotExist = function (e) {
    var t = "Session_Not_Exist";
    return new o(a[t], t, e);
  }, o.cancel = function (e) {
    var t = "Operation_Canceled";
    return new o(a[t], t, e);
  }, o.customError = function (e, t) {
    e = e || "Other_Error";
    var n = "";
    return (t = t || {}).message || (n = a[e] || e), "object" !== (void 0 === e ? "undefined" : (0, i.default)(e)) ? new o(n, e, t) : new o(n, "Other_Error", void 0 === t ? e : t);
  }, e.exports = o;
}, function (e, t, n) {
  var r = n(38)("wks"),
      s = n(27),
      i = n(6).Symbol,
      o = "function" == typeof i;
  (e.exports = function (e) {
    return r[e] || (r[e] = o && i[e] || (o ? i : s)("Symbol." + e));
  }).store = r;
}, function (e, t) {
  var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = n);
}, function (e, t, n) {
  "use strict";

  var r = n(12),
      s = n(3),
      i = n(1),
      o = n(224),
      a = n(44).getInstance("IM");

  function c(e) {
    return this.subType = "im", this.nosScene = e.nosScene || "im", this.nosSurvivalTime = e.nosSurvivalTime, e.Protocol = s, e.Message = o, e.constructor = c, this.init(e);
  }

  c.Protocol = s, c.parser = a, c.use = r.use, c.getInstance = r.getInstance, c.rmAllInstances = r.rmAllInstances, c.genInstanceName = function (e) {
    return "NIM-account-" + e.account;
  };
  var u = c.fn = c.prototype = Object.create(r.prototype);
  c.info = u.info = i.info, e.exports = c, n(214), n(213), n(212), n(211), n(210), n(209), n(208), n(207), n(206), n(205), n(204), n(203), n(202), n(201), n(200), n(199), n(198);
}, function (e, t, n) {
  var r = n(22),
      s = n(65),
      i = n(40),
      o = Object.defineProperty;
  t.f = n(10) ? Object.defineProperty : function (e, t, n) {
    if (r(e), t = i(t, !0), r(n), s) try {
      return o(e, t, n);
    } catch (e) {}
    if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
    return "value" in n && (e[t] = n.value), e;
  };
}, function (e, t) {
  var n = {}.hasOwnProperty;

  e.exports = function (e, t) {
    return n.call(e, t);
  };
}, function (e, t, n) {
  e.exports = !n(21)(function () {
    return 7 != Object.defineProperty({}, "a", {
      get: function get() {
        return 7;
      }
    }).a;
  });
}, function (e, t) {
  var n = e.exports = {
    version: "2.5.5"
  };
  "number" == typeof __e && (__e = n);
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(173),
      a = n(0),
      c = a.notundef,
      u = n(171),
      l = n(1);

  function m() {}

  var d = {};
  m.getInstance = function (e) {
    e = f(e), a.verifyOptions(e, "account", "api::Base.getInstance");
    var t = this.genInstanceName(e),
        n = d[t];
    return n ? m.updateInstance(n, e) : n = d[t] = new this(e), n;
  }, m.updateInstance = function (e, t) {
    e.setOptions(t), e.connect();
  };

  var p = m.fn = m.prototype = Object.create(new o()),
      f = function f(e) {
    return e.nosSurvivalTime ? (a.verifyParamType("nosSurvivalTime", e.nosSurvivalTime, "number", "api::Base.getInstance"), a.verifyParamMin("nosSurvivalTime", e.nosSurvivalTime, 86400, "api::Base.getInstance")) : e.nosSurvivalTime = 1 / 0, e;
  };

  p.updatePrivateConf = function (e) {
    if (e && "object" === (0, i.default)(e.privateConf)) {
      var t = e.privateConf;
      "string" == typeof t.lbs_web && (e.lbsUrl = t.lbs_web), "boolean" == typeof t.link_ssl_web && (e.secure = t.link_ssl_web), "boolean" == typeof t.https_enabled && (e.httpsEnabled = t.https_enabled), e.uploadUrl = t.nos_uploader_web ? t.nos_uploader_web : null, e.replaceUrl = t.nos_downloader ? t.nos_downloader : null, e.downloadUrl = t.nos_accelerate ? t.nos_accelerate : null, e.downloadHost = t.nos_accelerate_host ? t.nos_accelerate_host : null, e.ntServerAddress = t.nt_server;
    }

    return null === e.ntServerAddress || "" === e.ntServerAddress ? l.ntServerAddress = null : l.ntServerAddress = e.ntServerAddress || l.defaultReportUrl, l.uploadUrl = e.uploadUrl || l.uploadUrl, l.downloadUrl = e.downloadUrl || l.downloadUrl, l.downloadHost = e.downloadHost || l.downloadHost, l.replaceUrl = e.replaceUrl || l.replaceUrl, l.httpsEnabled = e.httpsEnabled || l.httpsEnabled, e;
  }, p.init = function (e) {
    a.verifyOptions(e, "account", "api::Base.init"), e = this.updatePrivateConf(e);
    var t = this.account = e.account = e.account + "",
        n = e.constructor.genInstanceName(e),
        r = d[n];
    if (e._disableSingleton && (r = null), r) return m.updateInstance(r, e), r;
    this.name = n, d[n] = this, this.logger = e.logger = new u({
      debug: e.debug,
      logFunc: e.logFunc,
      prefix: this.subType
    }), e.api = this;
    var s = this.protocol = new e.Protocol(e);
    return s.name = "Protocol-" + n, s.account = t, s.api = this, s.message = this.message = new e.Message({
      account: t
    }), this.options = a.copy(e), this.reset(), this;
  }, p.destroy = function (e) {
    e = e || {};
    var t = this.name;
    this.protocol && this.protocol.resetPush && this.protocol.resetPush();
    var n = this;
    this.disconnect({
      done: function done(r) {
        n.logger.warn("ApiBase::destroy: instance destroyed ..."), Object.getOwnPropertyNames(n).forEach(function (e) {
          delete n[e];
        }), d && (delete d[t], d[t] = null), e.done instanceof Function && e.done(r);
      }
    });
  }, p.reset = function () {
    var e = this.updatePrivateConf(this.options);
    a.verifyBooleanWithDefault(e, "exifOrientation", !0, "", "api::Base.reset");
  }, p.setOptions = function (e) {
    this.reset(), this.protocol.setOptions(e);
  }, p.processCallback = function (e, t) {
    g(e, t);
  }, p.processCallbackPromise = function (e, t) {
    return new Promise(function (n, r) {
      g(e, t, !0, n, r);
    });
  };

  var g = function g(e, t, n, r, s) {
    var i = "api::processCallback";
    n && (i = "api::processCallbackPromise"), a.verifyCallback(e, "done", i), e.callback = function (o, u, l) {
      var m = e.callback.options;

      if (u = u || m, t && (u = m), a.isFunction(e.cbaop)) {
        var d = e.cbaop(o, u);
        c(d) && (u = d);
      }

      var p = e.done;
      a.isObject(u) && (delete u.done, delete u.cb, delete u.callback), n ? o ? s({
        message: "生成接口回调错误",
        callFunc: i,
        event: o
      }) : r(u) : p(o, u, l);
    }, e.callback.options = a.copy(e);
  };

  p.processPs = function (e) {
    a.notexist(e.ps) && (e.ps = "");
  }, p.processCustom = function (e) {
    a.notexist(e.custom) && (e.custom = "");
  }, p.sendCmd = function () {
    this.protocol.sendCmd.apply(this.protocol, arguments);
  }, p.sendCmdWithResp = function (e, t, n) {
    this.sendCmd(e, t, function (e, t, r) {
      a.isFunction(n) && (e ? n(e, t) : n(null, r));
    });
  }, p.cbAndSendCmd = function (e, t) {
    var n = this.processCallbackPromise(t);
    return this.sendCmd(e, t), n;
  }, p.sendCmdUsePromise = function (e, t) {
    var n = this;
    return new Promise(function (r, s) {
      n.sendCmd(e, t, function (e, t, n) {
        if (e) s(e);else {
          var i = a.merge({}, t, n);
          r(i);
        }
      });
    });
  }, m.use = function (e, t) {
    e && e.install && a.isFunction(e.install) && e.install(this, t);
  }, m.rmAllInstances = function () {
    for (var e in d) {
      d[e].destroy();
    }

    d = {};
  }, p.logout = function (e) {
    this.protocol.shouldReconnect = !1, this.protocol.doLogout = !0, this.processCallback(e), this.sendCmd("logout", e, e.callback);
  }, e.exports = m, n(164), n(163), n(160), n(159), n(158), n(157), n(156);
}, function (e, t, n) {
  var r = n(68),
      s = n(42);

  e.exports = function (e) {
    return r(s(e));
  };
}, function (e, t, n) {
  var r = n(8),
      s = n(25);
  e.exports = n(10) ? function (e, t, n) {
    return r.f(e, t, s(1, n));
  } : function (e, t, n) {
    return e[t] = n, e;
  };
}, function (e, t, n) {
  "use strict";

  (function (e) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.url2origin = t.uniqueID = t.off = t.removeEventListener = t.on = t.addEventListener = t.format = t.regWhiteSpace = t.regBlank = t.emptyFunc = t.f = t.emptyObj = t.o = void 0;
    var r,
        s = n(2),
        i = (r = s) && r.__esModule ? r : {
      default: r
    };
    t.getGlobal = o, t.detectCSSFeature = function (e) {
      var t = !1,
          n = "Webkit Moz ms O".split(" "),
          r = document.createElement("div"),
          s = null;
      e = e.toLowerCase(), void 0 !== r.style[e] && (t = !0);

      if (!1 === t) {
        s = e.charAt(0).toUpperCase() + e.substr(1);

        for (var i = 0; i < n.length; i++) {
          if (void 0 !== r.style[n[i] + s]) {
            t = !0;
            break;
          }
        }
      }

      return t;
    }, t.fix = a, t.getYearStr = c, t.getMonthStr = u, t.getDayStr = l, t.getHourStr = m, t.getMinuteStr = d, t.getSecondStr = p, t.getMillisecondStr = f, t.dateFromDateTimeLocal = function (e) {
      return e = "" + e, new Date(e.replace(/-/g, "/").replace("T", " "));
    }, t.getClass = y, t.typeOf = v, t.isString = b, t.isNumber = function (e) {
      return "number" === v(e);
    }, t.isBoolean = function (e) {
      return "boolean" === v(e);
    }, t.isArray = M, t.isFunction = T, t.isDate = S, t.isRegExp = function (e) {
      return "regexp" === v(e);
    }, t.isError = function (e) {
      return "error" === v(e);
    }, t.isnull = k, t.notnull = C, t.undef = P, t.notundef = I, t.exist = w, t.notexist = O, t.isObject = A, t.isEmpty = function (e) {
      return O(e) || (b(e) || M(e)) && 0 === e.length;
    }, t.containsNode = function (e, t) {
      if (e === t) return !0;

      for (; t.parentNode;) {
        if (t.parentNode === e) return !0;
        t = t.parentNode;
      }

      return !1;
    }, t.calcHeight = function (e) {
      var t = e.parentNode || document.body;
      (e = e.cloneNode(!0)).style.display = "block", e.style.opacity = 0, e.style.height = "auto", t.appendChild(e);
      var n = e.offsetHeight;
      return t.removeChild(e), n;
    }, t.remove = function (e) {
      e.parentNode && e.parentNode.removeChild(e);
    }, t.dataset = function (e, t, n) {
      if (!w(n)) return e.getAttribute("data-" + t);
      e.setAttribute("data-" + t, n);
    }, t.target = function (e) {
      return e.target || e.srcElement;
    }, t.createIframe = function (e) {
      var t;
      if ((e = e || {}).name) try {
        (t = document.createElement('<iframe name="' + e.name + '"></iframe>')).frameBorder = 0;
      } catch (n) {
        (t = document.createElement("iframe")).name = e.name;
      } else t = document.createElement("iframe");
      e.visible || (t.style.display = "none");
      T(e.onload) && x(t, "load", function n(r) {
        if (!t.src) return;
        e.multi || R(t, "load", n);
        e.onload(r);
      });
      (e.parent || document.body).appendChild(t);
      var n = e.src || "about:blank";
      return setTimeout(function () {
        t.src = n;
      }, 0), t;
    }, t.html2node = function (e) {
      var t = document.createElement("div");
      t.innerHTML = e;
      var n = [],
          r = void 0,
          s = void 0;
      if (t.children) for (r = 0, s = t.children.length; r < s; r++) {
        n.push(t.children[r]);
      } else for (r = 0, s = t.childNodes.length; r < s; r++) {
        var i = t.childNodes[r];
        1 === i.nodeType && n.push(i);
      }
      return n.length > 1 ? t : n[0];
    }, t.scrollTop = function (e) {
      w(e) && (document.documentElement.scrollTop = document.body.scrollTop = e);
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }, t.forOwn = j, t.mixin = F, t.isJSON = U, t.parseJSON = function e(t) {
      try {
        U(t) && (t = JSON.parse(t)), A(t) && j(t, function (n, r) {
          switch (v(r)) {
            case "string":
            case "object":
              t[n] = e(r);
          }
        });
      } catch (e) {
        console.error(e);
      }

      return t;
    }, t.simpleClone = function (e) {
      var t = [],
          n = JSON.stringify(e, function (e, n) {
        if ("object" === (void 0 === n ? "undefined" : (0, i.default)(n)) && null !== n) {
          if (-1 !== t.indexOf(n)) return;
          t.push(n);
        }

        return n;
      });
      return JSON.parse(n);
    }, t.merge = function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
        n[r - 1] = arguments[r];
      }

      return n.forEach(function (t) {
        F(e, t);
      }), e;
    }, t.fillUndef = function (e, t) {
      return j(t, function (t, n) {
        P(e[t]) && (e[t] = n);
      }), e;
    }, t.checkWithDefault = function (e, t, n) {
      var r = e[t] || e[t.toLowerCase()];
      O(r) && (r = n, e[t] = r);
      return r;
    }, t.fetch = function (e, t) {
      return j(e, function (n, r) {
        w(t[n]) && (e[n] = t[n]);
      }), e;
    }, t.string2object = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ",",
          n = {};
      return e.split(t).forEach(function (e) {
        var t = e.split("="),
            r = t.shift();
        r && (n[decodeURIComponent(r)] = decodeURIComponent(t.join("=")));
      }), n;
    }, t.object2string = D, t.genUrlSep = function (e) {
      return e.indexOf("?") < 0 ? "?" : "&";
    }, t.object2query = function (e) {
      return D(e, "&", !0);
    }, t.isFileInput = L, t.getKeys = function (e, t) {
      var n = Object.keys(e);
      t && n.sort(function (t, n) {
        var r = L(e[t]),
            s = L(e[n]);
        return r === s ? 0 : r ? 1 : -1;
      });
      return n;
    };
    t.o = {}, t.emptyObj = {}, t.f = function () {}, t.emptyFunc = function () {}, t.regBlank = /\s+/gi, t.regWhiteSpace = /\s+/gi;

    function o() {
      return "undefined" != typeof window ? window : void 0 !== e ? e : {};
    }

    function a(e, t) {
      t = t || 2;

      for (var n = "" + e; n.length < t;) {
        n = "0" + n;
      }

      return n;
    }

    function c(e) {
      return "" + e.getFullYear();
    }

    function u(e) {
      return a(e.getMonth() + 1);
    }

    function l(e) {
      return a(e.getDate());
    }

    function m(e) {
      return a(e.getHours());
    }

    function d(e) {
      return a(e.getMinutes());
    }

    function p(e) {
      return a(e.getSeconds());
    }

    function f(e) {
      return a(e.getMilliseconds(), 3);
    }

    var g, h;
    t.format = (g = /yyyy|MM|dd|hh|mm|ss|SSS/g, h = {
      yyyy: c,
      MM: u,
      dd: l,
      hh: m,
      mm: d,
      ss: p,
      SSS: f
    }, function (e, t) {
      return e = new Date(e), isNaN(+e) ? "invalid date" : (t = t || "yyyy-MM-dd").replace(g, function (t) {
        return h[t](e);
      });
    });

    function y(e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }

    function v(e) {
      return y(e).toLowerCase();
    }

    function b(e) {
      return "string" === v(e);
    }

    function M(e) {
      return "array" === v(e);
    }

    function T(e) {
      return "function" === v(e);
    }

    function S(e) {
      return "date" === v(e);
    }

    function k(e) {
      return null === e;
    }

    function C(e) {
      return null !== e;
    }

    function P(e) {
      return void 0 === e;
    }

    function I(e) {
      return void 0 !== e;
    }

    function w(e) {
      return I(e) && C(e);
    }

    function O(e) {
      return P(e) || k(e);
    }

    function A(e) {
      return w(e) && "object" === v(e);
    }

    var _ = t.addEventListener = function (e, t, n) {
      e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n);
    },
        x = t.on = _,
        E = t.removeEventListener = function (e, t, n) {
      e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n);
    },
        R = t.off = E;

    function j() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {},
          n = arguments[2];

      for (var r in e) {
        e.hasOwnProperty(r) && t.call(n, r, e[r]);
      }
    }

    function F(e, t) {
      j(t, function (t, n) {
        e[t] = n;
      });
    }

    var N;
    t.uniqueID = (N = 0, function () {
      return "" + N++;
    });

    function U(e) {
      return b(e) && 0 === e.indexOf("{") && e.lastIndexOf("}") === e.length - 1;
    }

    function D(e, t, n) {
      if (!e) return "";
      var r = [];
      return j(e, function (e, t) {
        T(t) || (S(t) ? t = t.getTime() : M(t) ? t = t.join(",") : A(t) && (t = JSON.stringify(t)), n && (t = encodeURIComponent(t)), r.push(encodeURIComponent(e) + "=" + t));
      }), r.join(t || ",");
    }

    t.url2origin = function () {
      var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
      return function (t) {
        return e.test(t || "") ? RegExp.$1.toLowerCase() : "";
      };
    }();

    function L(e) {
      var t = o();
      return e.tagName && "INPUT" === e.tagName.toUpperCase() || t.Blob && e instanceof t.Blob;
    }
  }).call(this, n(47));
}, function (e, t) {
  e.exports = function (e) {
    return "object" == _typeof(e) ? null !== e : "function" == typeof e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(263);
  r.fn = r.prototype, e.exports = r, n(262), n(261), n(260), n(259), n(258), n(257), n(256), n(255), n(254), n(253);
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0;
  var r,
      s = n(67),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  t.default = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, i.default)(e, r.key, r);
      }
    }

    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }();
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0, t.default = function (e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = {
    init: function init() {
      s.deviceId = r.guid();
    }
  };
  s.init(), s.clientTypeMap = {
    1: "Android",
    2: "iOS",
    4: "PC",
    8: "WindowsPhone",
    16: "Web",
    32: "Server",
    64: "Mac"
  }, s.db = {
    open: function open() {}
  }, e.exports = s;
}, function (e, t) {
  e.exports = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  };
}, function (e, t, n) {
  var r = n(16);

  e.exports = function (e) {
    if (!r(e)) throw TypeError(e + " is not an object!");
    return e;
  };
}, function (e, t, n) {
  var r = n(6),
      s = n(11),
      i = n(69),
      o = n(14),
      a = n(9),
      c = function c(e, t, n) {
    var u,
        l,
        m,
        d = e & c.F,
        p = e & c.G,
        f = e & c.S,
        g = e & c.P,
        h = e & c.B,
        y = e & c.W,
        v = p ? s : s[t] || (s[t] = {}),
        b = v.prototype,
        M = p ? r : f ? r[t] : (r[t] || {}).prototype;

    for (u in p && (n = t), n) {
      (l = !d && M && void 0 !== M[u]) && a(v, u) || (m = l ? M[u] : n[u], v[u] = p && "function" != typeof M[u] ? n[u] : h && l ? i(m, r) : y && M[u] == m ? function (e) {
        var t = function t(_t, n, r) {
          if (this instanceof e) {
            switch (arguments.length) {
              case 0:
                return new e();

              case 1:
                return new e(_t);

              case 2:
                return new e(_t, n);
            }

            return new e(_t, n, r);
          }

          return e.apply(this, arguments);
        };

        return t.prototype = e.prototype, t;
      }(m) : g && "function" == typeof m ? i(Function.call, m) : m, g && ((v.virtual || (v.virtual = {}))[u] = m, e & c.R && b && !b[u] && o(b, u, m)));
    }
  };

  c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = n(1),
      i = n(4);

  function o(e) {
    r.undef(e.secure) && (e.secure = !0), this.options = r.copy(e), this.init(), this.connect();
  }

  var a = o.fn = o.prototype;
  a.init = function () {
    this.logger = this.options.logger, this.cmdTaskArray = [], this.timerMap = {}, this.cmdCallbackMap = {}, this.cmdContentMap = {}, this.initConnect(), this.reset();
  }, a.reset = function () {
    this.resetConnect();
  }, a.setOptions = function (e) {
    var t = this.options,
        n = Object.keys(t),
        s = n.indexOf("account");
    -1 !== s && n.splice(s, 1), e = r.filterObj(e, n), this.options = r.merge(t, e), this.reset();
  }, a.sendCmd = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments[2];
    this.heartbeat(), "heartbeat" !== e && this.logger.warn("protocol::sendCmd: " + e, t);
    var r,
        s = e,
        i = (e = this.parser.createCmd(e, t)).SER;
    t = t || {}, this.cmdContentMap[i] = t, t.single && (delete t.single, 1 === (r = Object.keys(t)).length && (this.cmdContentMap[i] = t[r[0]])), t.NOTSTORE && ((r = t.NOTSTORE.split(" ")).forEach(function (e) {
      delete t[e];
    }), delete t.NOTSTORE), (n = n || t.callback) && (this.cmdCallbackMap[i] = n), this.cmdTaskArray.push({
      cmdName: s,
      cmd: JSON.stringify(e)
    }), this.startCmdTaskTimer();
  }, a.startCmdTaskTimer = function () {
    var e = this;
    e.cmdTaskTimer || (e.cmdTaskTimer = setTimeout(function () {
      var t = e.cmdTaskArray.shift();
      e.cmdTaskTimer = null, t && e.executeCmdTask(t), e.cmdTaskArray.length && e.startCmdTaskTimer();
    }, 0));
  }, a.executeCmdTask = function (e) {
    var t = e.cmdName,
        n = e.cmd,
        r = (n = JSON.parse(n)).SER;
    this.isFrequencyControlled(t) ? (this.logger.warn("protocol::executeCmdTask: " + t + " hit freq control"), this.markCallbackInvalid(r, i.newFrequencyControlError({
      callFunc: "protocol::executeCmdTask",
      message: t + " hit freq control"
    }))) : this.isConnected() ? ("heartbeat" !== t && this.logger.log("protocol::sendCmd: " + t + " " + JSON.stringify(n)), this.doSendCmd(n)) : (this.logger.warn("protocol::executeCmdTask: " + t + " not connected"), this.markCallbackInvalid(r, i.newSocketStateError({
      callFunc: "protocol::executeCmdTask",
      message: t + " not connected"
    })));
  }, a.isFrequencyControlled = function (e) {
    var t = this.frequencyControlMap && this.frequencyControlMap[e];

    if (t) {
      if (Date.now() < t.from + t.duration) return !0;
      delete this.frequencyControlMap[e];
    }
  }, a.doSendCmd = function (e) {
    var t = this,
        n = e.SER;
    t.timerMap[n] = setTimeout(function () {
      t.markCallbackInvalid(n, i.newTimeoutError({
        callFunc: "protocol::doSendCmd",
        message: "ser " + n + " Timeout Error"
      }));
    }, s.cmdTimeout);

    try {
      t.socket.send(JSON.stringify(e));
    } catch (e) {
      t.markCallbackInvalid(n, i.newSocketStateError({
        callFunc: "protocol::doSendCmd",
        message: "ser " + n + " socketSendJson Error"
      })), t.onDisconnect(!0, "protocol::doSendCmd:socketSendJson");
    }
  }, a.getObjWithSer = function (e) {
    var t = this.cmdContentMap[e];
    return delete this.cmdContentMap[e], t && r.copy(t);
  }, a.getCallbackWithSer = function (e) {
    var t = this.cmdCallbackMap[e];
    return t && !t.isImSyncDataCb && delete this.cmdCallbackMap[e], t;
  }, a.getTimerWithSer = function (e) {
    var t = this.timerMap[e];
    return delete this.timerMap[e], t;
  }, a.clearTimerWithSer = function (e) {
    var t = this.getTimerWithSer(e);
    t && clearTimeout(t);
  }, a.markCallbackInvalid = function (e, t) {
    this.getObjWithSer(e), this.clearTimerWithSer(e);
    var n = this.getCallbackWithSer(e);

    if (n) {
      var r = n.options;
      setTimeout(function () {
        n(t || i.newUnknownError({
          ser: e
        }), r);
      }, 0);
    }
  }, a.markAllCallbackInvalid = function (e) {
    var t = this;
    Object.keys(this.cmdCallbackMap).forEach(function (n) {
      t.markCallbackInvalid(n, e);
    });
  }, a.getPacketObj = function (e) {
    var t = null;

    if (e && e.raw) {
      var n = e.raw.ser;
      r.notundef(n) && (t = this.getObjWithSer(n));
    }

    return t;
  }, a.callPacketAckCallback = function (e) {
    var t = this;

    if (e && e.raw) {
      var n = e.raw.ser;

      if (r.notundef(n)) {
        t.clearTimerWithSer(n);
        var s = t.getCallbackWithSer(n);
        s && (e.promise ? e.promise.then(function () {
          s(e.error, e.obj);
        }, function (r) {
          r.callFunc = "protocol::callPacketAckCallback", r.message = "Resp Promoise Error: cmd: " + e.cmd + ", ser: " + n;
          var o = i.customError("CALLBACK_ACK_ERR", r);
          t.logger.error("protocol::callPacketAckCallback: promise error " + JSON.stringify(r)), s(o, e.obj, e.content);
        }) : s(e.error, e.obj, e.content));
      }
    }
  }, a.onMessage = function (e) {
    this.heartbeat();
    var t = this.parser.parseResponse(e);
    t.notFound && this.logger.warn("protocol::onMessage: packet not found " + JSON.stringify(t)), t.error ? (t.error.message = t.cmd + " error: " + t.error.message, this.logger.error("protocol::onMessage: packet error " + JSON.stringify(t.error))) : t.content || "heartbeat" === t.cmd || this.logger.warn("protocol::onMessage: packet.content undefined " + JSON.stringify(t)), t.frequencyControlDuration && (this.logger.error("protocol::onMessage: server freq control " + JSON.stringify(t.cmd)), this.frequencyControlMap = this.frequencyControlMap || {}, this.frequencyControlMap[t.cmd] = {
      from: +new Date(),
      duration: t.frequencyControlDuration
    }), t.obj = this.getPacketObj(t), "heartbeat" !== t.cmd && "getClientAntispam" !== t.cmd && this.logger.log("protocol::recvCmd: " + t.cmd + " " + t.rawStr);
    var n = "process" + r.capFirstLetter(t.service);
    this[n] ? ("heartbeat" !== t.cmd && this.logger.warn("protocol::recvCmd: " + t.cmd + " " + n, t.content), "syncDone" === t.cmd ? this.cmdCallbackMap[t.raw.ser] && this.cmdCallbackMap[t.raw.ser].isImSyncDataCb && (this[n](t), this.cmdCallbackMap[t.raw.ser].isImSyncDataCb = !1) : this[n](t)) : this.logger.warn("protocol::onMessage: " + n + " not found"), this.callPacketAckCallback(t);
  }, a.onMiscError = function (e, t, n) {
    t && this.notifyError(e, t, n);
  }, a.onCustomError = function (e, t) {
    var n = i.customError(e, t),
        r = t.message || "未知错误";
    this.onMiscError(r, n);
  }, a.notifyError = function (e, t, n) {
    this.isConnected() && (this.logger.error((e || "") + " " + this.name, t, n), this.options.onerror(t, n));
  }, a.emitAPI = function (e) {
    var t = e.type,
        n = e.obj;
    this.api.emit(t, n);
  }, e.exports = o, n(155), n(152), n(146), n(145), n(144);
}, function (e, t) {
  e.exports = function (e, t) {
    return {
      enumerable: !(1 & e),
      configurable: !(2 & e),
      writable: !(4 & e),
      value: t
    };
  };
}, function (e, t, n) {
  "use strict";

  var r = n(59),
      s = n(166),
      i = n(165);
  r.json = s, r.upload = i, e.exports = r;
}, function (e, t) {
  var n = 0,
      r = Math.random();

  e.exports = function (e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36));
  };
}, function (e, t) {
  e.exports = {};
}, function (e, t) {
  t.f = {}.propertyIsEnumerable;
}, function (e, t, n) {
  var r = n(62),
      s = n(37);

  e.exports = Object.keys || function (e) {
    return r(e, s);
  };
},, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(0),
      a = o.undef,
      c = o.notundef,
      u = o.exist,
      l = n(55),
      m = n(125),
      d = "#%@all@%#",
      p = {
    p2p: 0,
    team: 1
  },
      f = {
    0: "p2p",
    1: "team"
  },
      g = Object.keys(p),
      h = m.typeMap,
      y = m.validTypes;

  function v(e) {
    o.verifyOptions(e, "scene to type", "msg::Message"), o.verifyParamValid("scene", e.scene, g, "msg::Message");
    this.scene = p[e.scene], this.to = "" + e.to, this.type = h[e.type], this.resend = e.resend ? 1 : 0, e.resend ? (o.verifyOptions(e, "idClient", "msg::Message"), this.idClient = e.idClient) : this.idClient = o.guid(), c(e.text) && (this.body = "" + e.text), c(e.custom) && ("object" === (0, i.default)(e.custom) ? (this.logger.warn("model::Message: custom should be JsonString, auto transfer"), this.custom = JSON.stringify(e.custom)) : this.custom = "" + e.custom), c(e.body) && (this.body = "" + e.body), c(e.pushContent) && (this.pushContent = "" + e.pushContent), c(e.pushPayload) && (this.pushPayload = "" + e.pushPayload);
    var t = e.apns;

    if (c(t) && "team" === e.scene) {
      var n = t.accounts;
      c(n) && o.verifyParamType("apns.accounts", n, "array", "msg::Message"), this.apnsAccounts = n ? JSON.stringify(n) : d, this.apnsContent = t.content || e.pushContent || "", o.verifyBooleanWithDefault(t, "forcePush", !0, "options.apns", "msg::Message"), this.apnsForcePush = t.forcePush ? 1 : 0;
    }

    c(e.isHistoryable) && (this.isHistoryable = e.isHistoryable ? 1 : 0), c(e.isRoamingable) && (this.isRoamingable = e.isRoamingable ? 1 : 0), c(e.isSyncable) && (this.isSyncable = e.isSyncable ? 1 : 0), c(e.cc) && (this.cc = e.cc ? 1 : 0), c(e.isPushable) && (this.isPushable = e.isPushable ? 1 : 0), c(e.isOfflinable) && (this.isOfflinable = e.isOfflinable ? 1 : 0), c(e.isUnreadable) && (this.isUnreadable = e.isUnreadable ? 1 : 0), c(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0), c(e.needMsgReceipt) && (this.needMsgReceipt = e.needMsgReceipt ? 1 : 0), c(e.yidunEnable) && (this.yidunEnable = e.yidunEnable ? 1 : 0), c(e.antiSpamUsingYidun) && (this.antiSpamUsingYidun = e.antiSpamUsingYidun ? 1 : 0), c(e.clientAntiSpam) && (this.clientAntiSpam = e.clientAntiSpam ? 1 : 0), c(e.antiSpamContent) && ("object" === (0, i.default)(e.antiSpamContent) ? (this.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), this.antiSpamContent = JSON.stringify(e.antiSpamContent)) : this.antiSpamContent = "" + e.antiSpamContent), c(e.antiSpamBusinessId) && ("object" === (0, i.default)(e.antiSpamBusinessId) ? (this.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), this.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : this.antiSpamBusinessId = "" + e.antiSpamBusinessId);
  }

  o.merge(v.prototype, m.prototype), v.prototype.getScene = function () {
    return f[this.scene];
  }, v.getType = m.getType, v.reverse = function (e) {
    var t = {
      scene: f[e.scene] || e.scene,
      from: e.from,
      fromNick: e.fromNick,
      fromClientType: l.reverseType(e.fromClientType),
      fromDeviceId: e.fromDeviceId,
      to: "" + e.to,
      time: +e.time,
      type: v.getType(e),
      text: u(e.body) ? e.body : "",
      isHistoryable: a(e.isHistoryable) || 1 == +e.isHistoryable,
      isRoamingable: a(e.isRoamingable) || 1 == +e.isRoamingable,
      isSyncable: a(e.isSyncable) || 1 == +e.isSyncable,
      cc: a(e.cc) || 1 == +e.cc,
      isPushable: a(e.isPushable) || 1 == +e.isPushable,
      isOfflinable: a(e.isOfflinable) || 1 == +e.isOfflinable,
      isUnreadable: a(e.isUnreadable) || 1 == +e.isUnreadable,
      isReplyMsg: a(e.isReplyMsg) || 1 == +e.isReplyMsg,
      needPushNick: a(e.needPushNick) || 1 == +e.needPushNick,
      needMsgReceipt: 1 == +e.needMsgReceipt,
      isLocal: !1
    };

    if (c(e.isMuted) && (t.isMuted = 1 == +e.isMuted), c(e.resend) && (t.resend = 1 == +e.resend), c(e.idClient) && (t.idClient = e.idClient), c(e.idServer) && (t.idServer = "" + e.idServer), c(e.userUpdateTime) && (t.userUpdateTime = +e.userUpdateTime), c(e.custom) && (t.custom = e.custom), c(e.pushContent) && (t.pushContent = e.pushContent), c(e.pushPayload) && (t.pushPayload = e.pushPayload), c(e.tempTeamMemberCount) && (t.tempTeamMemberCount = +e.tempTeamMemberCount), c(e.apnsAccounts)) {
      if (t.apns = {}, e.apnsAccounts !== d) {
        var n = e.apnsAccounts;

        try {
          t.apns.accounts = JSON.parse(n);
        } catch (e) {
          t.apns.accounts = [];
        }
      }

      t.apns.content = e.apnsContent || "", t.apns.forcePush = 1 == +e.apnsForcePush;
    }

    return t.status = e.status || "success", c(e.filter) && (t.filter = e.filter), t;
  }, v.setExtra = function (e, t) {
    e.target = v.getMsgTarget(e, t), e.sessionId = e.scene + "-" + e.target, m.setFlow(e, t);
  }, v.getMsgTarget = function (e, t) {
    return "p2p" === e.scene ? e.to === t ? e.from : e.to : "team" === e.scene ? e.to : void 0;
  }, v.deduplication = function (e) {
    var t,
        n = {},
        r = [];
    return e.forEach(function (e) {
      t = e.idClient, n[t] || (n[t] = !0, r.push(e));
    }), r;
  }, v.sortMsgs = function (e) {
    return e = e.slice(0), o.sortObjArray(e, {
      sortPath: "time"
    }), e;
  }, v.getLastMsg = function (e) {
    return (e = v.sortMsgs(e))[e.length - 1];
  }, v.getLastNotIgnoredMsg = function (e) {
    for (var t = null, n = (e = v.sortMsgs(e)).length - 1; n >= 0; n--) {
      if (!(t = e[n]).ignore) return t;
    }

    return null;
  }, v.getMaxTimetag = function (e) {
    return v.getLastMsg(e).time;
  }, v.validScenes = g, v.validTypes = y, e.exports = v;
}, function (e, t, n) {
  "use strict";

  var r = n(1),
      s = {
    genUrlSep: function genUrlSep(e) {
      return -1 === (e = "" + e).indexOf("?") ? "?imageView&" : "&";
    },
    url2object: function url2object(e) {
      var t = (e = e || "").indexOf("https") >= 0 ? "https://" : "http://",
          n = e.replace(t, "");
      n.indexOf("?") >= 0 && (n = n.substring(0, n.indexOf("?")));
      var r = n.split("/");
      n = r[0];
      var s = "";
      if (r.length > 0 && (s = r.slice(1).join("/")), -1 === e.indexOf("?")) return {
        protocol: t,
        hostname: n,
        path: s,
        query: {}
      };
      var i = e.substr(e.indexOf("?") + 1).split("&"),
          o = {};
      return i.forEach(function (e) {
        if (e.indexOf("=") > 0) {
          var t = e.split("=");
          o[t[0]] = decodeURIComponent(t[1]);
        } else o[e] = "";
      }), {
        protocol: t,
        hostname: n,
        path: s,
        query: o
      };
    },
    object2url: function object2url(e) {
      var t = e.protocol,
          n = e.hostname,
          r = e.path,
          s = e.query;
      t = t || "http://", n = n || "", r && (n = n + "/" + r), s = s || {};
      var i = [];

      for (var o in s) {
        "imageView" !== o && i.push(o + "=" + encodeURIComponent(s[o]));
      }

      return i.length > 0 ? "" + t + n + "?imageView&" + i.join("&") : "" + t + n;
    },
    genPrivateUrl: function genPrivateUrl(e) {
      var t = s.url2object(e),
          n = t.hostname,
          i = t.path,
          o = r.downloadHost,
          a = r.downloadUrl;

      if (n === o) {
        var c = i.indexOf("/");

        if (-1 !== c) {
          var u = i.substring(0, c),
              l = i.substring(c + 1);
          return a.replace("{bucket}", u).replace("{object}", l);
        }
      } else if (-1 !== n.indexOf(o)) {
        var m = t.path,
            d = m.indexOf(".");

        if (-1 !== d) {
          var p = m.substring(0, d),
              f = m;
          return a.replace("{bucket}", p).replace("{object}", f);
        }
      }

      return e;
    }
  };
  e.exports = s;
}, function (e, t, n) {
  var r = n(6),
      s = n(11),
      i = n(41),
      o = n(35),
      a = n(8).f;

  e.exports = function (e) {
    var t = s.Symbol || (s.Symbol = i ? {} : r.Symbol || {});
    "_" == e.charAt(0) || e in t || a(t, e, {
      value: o.f(e)
    });
  };
}, function (e, t, n) {
  t.f = n(5);
}, function (e, t, n) {
  var r = n(8).f,
      s = n(9),
      i = n(5)("toStringTag");

  e.exports = function (e, t, n) {
    e && !s(e = n ? e : e.prototype, i) && r(e, i, {
      configurable: !0,
      value: t
    });
  };
}, function (e, t) {
  e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function (e, t, n) {
  var r = n(6),
      s = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});

  e.exports = function (e) {
    return s[e] || (s[e] = {});
  };
}, function (e, t, n) {
  var r = n(38)("keys"),
      s = n(27);

  e.exports = function (e) {
    return r[e] || (r[e] = s(e));
  };
}, function (e, t, n) {
  var r = n(16);

  e.exports = function (e, t) {
    if (!r(e)) return e;
    var n, s;
    if (t && "function" == typeof (n = e.toString) && !r(s = n.call(e))) return s;
    if ("function" == typeof (n = e.valueOf) && !r(s = n.call(e))) return s;
    if (!t && "function" == typeof (n = e.toString) && !r(s = n.call(e))) return s;
    throw TypeError("Can't convert object to primitive value");
  };
}, function (e, t) {
  e.exports = !0;
}, function (e, t) {
  e.exports = function (e) {
    if (null == e) throw TypeError("Can't call method on  " + e);
    return e;
  };
}, function (e, t) {
  var n = Math.ceil,
      r = Math.floor;

  e.exports = function (e) {
    return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.undef,
      i = n(4),
      o = n(94),
      a = n(143),
      c = n(142),
      u = n(141),
      l = n(140),
      m = n(139);

  function d(e) {
    this.mixin(e);
  }

  d.prototype.mixin = function (e) {
    var t = this;
    this.configMap = this.configMap || {}, ["idMap", "cmdConfig", "packetConfig"].forEach(function (n) {
      t.configMap[n] = r.merge({}, t.configMap[n], e.configMap && e.configMap[n]);
    }), ["serializeMap", "unserializeMap"].forEach(function (n) {
      t[n] = r.merge({}, t[n], e[n]);
    });
  };

  var p,
      f = new d({
    configMap: o,
    serializeMap: a,
    unserializeMap: c
  }),
      g = new d({
    configMap: u,
    serializeMap: l,
    unserializeMap: m
  });
  d.getInstance = function (e) {
    switch (e) {
      case "IM":
        return f;

      case "Chatroom":
        return g;
    }
  }, d.prototype.createCmd = (p = 1, function (e, t) {
    var n = this,
        r = this.configMap.cmdConfig[e],
        i = "heartbeat" === e ? 0 : p++;
    return i > 32767 && (i = 1, p = 2), e = {
      SID: r.sid,
      CID: r.cid,
      SER: i
    }, r.params && (e.Q = [], r.params.forEach(function (r) {
      var i = r.type,
          o = r.name,
          a = r.entity,
          c = t[o];

      if (!s(c)) {
        switch (i) {
          case "PropertyArray":
            i = "ArrayMable", c = c.map(function (e) {
              return {
                t: "Property",
                v: n.serialize(e, a)
              };
            });
            break;

          case "Property":
            c = n.serialize(c, o);
            break;

          case "bool":
            c = c ? "true" : "false";
        }

        e.Q.push({
          t: i,
          v: c
        });
      }
    })), e;
  }), d.prototype.parseResponse = function (e) {
    var t = this,
        n = JSON.parse(e),
        s = {
      raw: n,
      rawStr: e,
      error: i.genError(n.code)
    },
        o = t.configMap.packetConfig[n.sid + "_" + n.cid];
    if (!o) return s.notFound = {
      sid: n.sid,
      cid: n.cid
    }, s;
    var a = n.r,
        c = "notify" === o.service && !o.cmd;

    if (s.isNotify = c, c) {
      var u = n.r[1].headerPacket;
      if (o = t.configMap.packetConfig[u.sid + "_" + u.cid], a = n.r[1].body, !o) return s.notFound = {
        sid: u.sid,
        cid: u.cid
      }, s;
    }

    if (s.service = o.service, s.cmd = o.cmd, s.error) {
      var l = n.sid + "_" + n.cid;

      if (c && (l = u.sid + "_" + u.cid), s.error.cmd = s.cmd, s.error.callFunc = "protocol::parseResponse: " + l, 416 === s.error.code) {
        var m = a[0];
        m && (s.frequencyControlDuration = 1e3 * m);
      }
    }

    var d = !1;
    return s.error && o.trivialErrorCodes && (d = -1 !== o.trivialErrorCodes.indexOf(s.error.code)), s.error && !d || !o.response || (s.content = {}, o.response.forEach(function (e, i) {
      var o = a[i];

      if (!r.undef(o)) {
        var u = e.type,
            l = e.name,
            m = e.entity || l;

        switch (u) {
          case "Property":
            s.content[l] = t.unserialize(o, m);
            break;

          case "PropertyArray":
            s.content[l] = [], o.forEach(function (e) {
              s.content[l].push(t.unserialize(e, m));
            });
            break;

          case "KVArray":
            s.content[l] = o;
            break;

          case "long":
          case "Long":
          case "byte":
          case "Byte":
          case "Number":
            s.content[l] = +o;
            break;

          default:
            s.content[l] = o;
        }

        if (c && "msg" === l || "sysMsg" === l) {
          var d = s.content[l];
          r.isObject(d) && !d.idServer && (d.idServer = "" + n.r[0], d.type && "8" === d.type && d.deletedIdClient && (d.idServer = d.deletedIdClient));
        }
      }
    })), s;
  }, d.prototype.serialize = function (e, t) {
    var n = this.serializeMap[t],
        r = {};

    for (var s in n) {
      e.hasOwnProperty(s) && (r[n[s]] = e[s]);
    }

    return r;
  }, d.prototype.unserialize = function (e, t) {
    var n = this.unserializeMap[t],
        r = {};
    if (e) for (var s in n) {
      e.hasOwnProperty(s) && (r[n[s]] = e[s]);
    }
    return r;
  }, e.exports = d;
}, function (e, t, n) {
  "use strict";

  e.exports = {
    description: "weixin micro app",
    layout: null,
    manufacturer: null,
    name: "weixin",
    prerelease: null,
    product: null,
    ua: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Weixin/1.9.1",
    version: "1.9.1",
    os: {
      architecture: 64,
      family: "Windows",
      version: "1.9.1"
    }
  };
}, function (e, t) {
  t.f = Object.getOwnPropertySymbols;
}, function (e, t) {
  var n;

  n = function () {
    return this;
  }();

  try {
    n = n || Function("return this")() || (0, eval)("this");
  } catch (e) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
  }

  e.exports = n;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.notundef,
      i = r.fillPropertyWithDefault,
      o = {
    0: "normal",
    1: "owner",
    2: "manager"
  };

  function a(e) {
    r.verifyOptions(e, "teamId", "team::TeamMember"), r.verifyParamAtLeastPresentOne(e, "nickInTeam muteTeam muteNotiType custom", "team::TeamMember"), this.teamId = e.teamId, s(e.account) && (this.account = e.account), s(e.nickInTeam) && (this.nickInTeam = e.nickInTeam), s(e.muteNotiType) ? this.bits = e.muteNotiType : s(e.muteTeam) && (this.bits = 0, e.muteTeam && (this.bits += 1)), s(e.mute) && (this.mute = e.mute ? 1 : 0), s(e.custom) && (this.custom = "" + e.custom);
  }

  a.reverse = function (e) {
    var t = r.copy(e);

    if (s(t.teamId) && (t.teamId = "" + t.teamId), s(t.type) && (t.type = o[t.type]), s(t.active) && (t.active = 1 == +t.active), s(t.valid) && (t.valid = 1 == +t.valid), s(t.mute) && (t.mute = 1 == +t.mute), s(t.joinTime) && (t.joinTime = +t.joinTime), s(t.updateTime) && (t.updateTime = +t.updateTime), s(t.bits)) {
      var n = t.bits;
      delete t.bits, t.muteTeam = !!(1 & n), t.muteNotiType = n;
    }

    return s(t.teamId) && s(t.account) && (t.id = a.genId(t.teamId, t.account)), t;
  }, a.reverseMembers = function (e) {
    return e.map(function (e) {
      return a.reverse(e);
    });
  }, a.fillProperties = function (e) {
    var t = i(e, "mute", !1),
        n = i(e, "custom", "");
    return t || n;
  }, a.genId = function (e, t) {
    return e + "-" + t;
  }, a.accounts2ids = function (e, t) {
    return t.map(function (t) {
      return a.genId(e, t);
    });
  }, a.assembleMembers = function (e, t) {
    return r.isArray(t) || (t = [t]), t.map(function (t) {
      return a.assembleMember(e, t);
    });
  }, a.assembleMember = function (e, t) {
    return {
      id: a.genId(e.teamId, t),
      account: t,
      teamId: e.teamId,
      type: "normal",
      nickInTeam: "",
      muteTeam: !1,
      mute: !1,
      joinTime: e.memberUpdateTime,
      updateTime: e.memberUpdateTime,
      active: !0,
      valid: !0
    };
  }, a.assembleOwner = function (e) {
    var t = a.assembleMember(e, e.owner);
    return t.type = "owner", t;
  }, e.exports = a;
}, function (e, t) {
  var n = {}.toString;

  e.exports = function (e) {
    return n.call(e).slice(8, -1);
  };
}, function (e, t, n) {
  var r = n(42);

  e.exports = function (e) {
    return Object(r(e));
  };
}, function (e, t, n) {
  var r = n(22),
      s = n(116),
      i = n(37),
      o = n(39)("IE_PROTO"),
      a = function a() {},
      _c = function c() {
    var e,
        t = n(64)("iframe"),
        r = i.length;

    for (t.style.display = "none", n(113).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _c = e.F; r--;) {
      delete _c.prototype[i[r]];
    }

    return _c();
  };

  e.exports = Object.create || function (e, t) {
    var n;
    return null !== e ? (a.prototype = r(e), n = new a(), a.prototype = null, n[o] = e) : n = _c(), void 0 === t ? n : s(n, t);
  };
},, function (e, t, n) {
  "use strict";

  var r = n(0);

  function s() {}

  s.parse = function (e) {
    var t = e.split("|");
    return {
      scene: t[0],
      to: t[1]
    };
  }, s.genSessionByMsg = function (e) {
    return {
      id: e.sessionId,
      scene: e.scene,
      to: e.target,
      updateTime: e.time,
      lastMsg: e
    };
  }, s.appendLastMsg = function (e) {
    var t = e.lastMsg;
    e["last" + r.capFirstLetter(t.type) + "Msg"] = t, e["last" + r.capFirstLetter(t.flow) + "Msg"] = t;
  }, s.genSessionByMsgs = function (e, t) {
    var n = e.getLastNotIgnoredMsg(t);
    return n ? s.genSessionByMsg(n) : null;
  }, s.trim = function (e) {
    delete e.msgReceiptSendTime, delete e.msgReceiptServerTime, delete e.ack, delete e.unreadMsgs;
  }, s.isComplete = function (e) {
    return e.id && e.scene && e.to;
  }, e.exports = s;
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(0),
      a = o.undef,
      c = o.notundef,
      u = n(44).getInstance("IM"),
      l = n(56),
      m = n(48),
      d = {
    customP2p: 100,
    customTeam: 101,
    deleteMsgP2p: 7,
    deleteMsgTeam: 8
  },
      p = {
    0: "applyTeam",
    1: "rejectTeamApply",
    2: "teamInvite",
    3: "rejectTeamInvite",
    5: "friendRequest",
    6: "deleteFriend",
    7: "deleteMsgP2p",
    8: "deleteMsgTeam",
    100: "customP2p",
    101: "customTeam",
    102: "customP2p"
  },
      f = {
    1: "addFriend",
    2: "applyFriend",
    3: "passFriendApply",
    4: "rejectFriendApply"
  },
      g = ["team", "friend", "msg"],
      h = {
    applyTeam: "team",
    rejectTeamApply: "team",
    teamInvite: "team",
    rejectTeamInvite: "team",
    addFriend: "friend",
    applyFriend: "friend",
    passFriendApply: "friend",
    rejectFriendApply: "friend",
    deleteFriend: "friend",
    deleteMsg: "msg"
  };

  function y(e) {
    o.verifyOptions(e, "type to", "sysmsg::SystemMessage"), o.verifyParamValid("type", e.type, y.validTypes, "sysmsg::SystemMessage"), -1 !== e.type.indexOf("custom") && (o.verifyOptions(e, "content", "sysmsg::SystemMessage"), this.attach = e.content, c(e.apnsText) && (this.apnsText = "" + e.apnsText), c(e.pushPayload) && ("object" === (0, i.default)(e.pushPayload) ? (this.logger.warn("model::Message: pushPayload should be JsonString, auto transfer"), this.pushPayload = JSON.stringify(e.pushPayload)) : this.pushPayload = "" + e.pushPayload), c(e.sendToOnlineUsersOnly) && (this.sendToOnlineUsersOnly = e.sendToOnlineUsersOnly ? 0 : 1), c(e.cc) && (this.cc = e.cc ? 1 : 0), c(e.isPushable) && (this.isPushable = e.isPushable ? 1 : 0), c(e.isUnreadable) && (this.isUnreadable = e.isUnreadable ? 1 : 0), c(e.needPushNick) && (this.needPushNick = e.needPushNick ? 1 : 0)), this.time = e.time || +new Date(), this.type = d[e.type], this.to = e.to, c(e.from) && (this.from = e.from), c(e.ps) && (this.ps = e.ps), c(e.deletedIdClient) && (this.deletedIdClient = e.deletedIdClient), c(e.deletedIdServer) && (this.deletedIdServer = e.deletedIdServer), c(e.opeAccount) && (this.opeAccount = e.opeAccount), c(e.yidunEnable) && (this.yidunEnable = e.yidunEnable ? 1 : 0), c(e.antiSpamContent) && ("object" === (0, i.default)(e.antiSpamContent) ? (this.logger.warn("model::Message: antiSpamContent should be JsonString, auto transfer"), this.antiSpamContent = JSON.stringify(e.antiSpamContent)) : this.antiSpamContent = "" + e.antiSpamContent), c(e.antiSpamBusinessId) && ("object" === (0, i.default)(e.antiSpamBusinessId) ? (this.logger.warn("model::Message: antiSpamBusinessId should be JsonString, auto transfer"), this.antiSpamBusinessId = JSON.stringify(e.antiSpamBusinessId)) : this.antiSpamBusinessId = "" + e.antiSpamBusinessId), this.idClient = e.idClient || o.guid();
  }

  y.validTypes = Object.keys(d).concat(Object.keys(h)), y.validCategories = ["team", "friend"], y.isCustom = function (e) {
    return "custom" === e.type;
  }, y.reverse = function (e) {
    var t = {
      time: +e.time,
      to: e.to,
      type: p[e.type]
    };
    if (c(e.from) && (t.from = e.from), c(e.idServer) && (t.idServer = "" + e.idServer), c(e.deletedIdClient) && (t.deletedIdClient = e.deletedIdClient), c(e.deletedIdServer) && (t.deletedIdServer = "" + e.deletedIdServer), c(e.deletedMsgTime) && (t.deletedMsgTime = +e.deletedMsgTime), c(e.deletedMsgFromNick) && (t.deletedMsgFromNick = "" + e.deletedMsgFromNick), c(e.opeAccount) && (t.opeAccount = e.opeAccount), c(e.ps) && (t.ps = e.ps), e.attach = e.attach ? "" + e.attach : "", "customP2p" === t.type || "customTeam" === t.type) t.content = e.attach, c(e.apnsText) && (t.apnsText = e.apnsText), c(e.pushPayload) && (t.pushPayload = e.pushPayload), o.merge(t, {
      sendToOnlineUsersOnly: a(e.sendToOnlineUsersOnly) || 0 == +e.sendToOnlineUsersOnly,
      cc: a(e.cc) || 1 == +e.cc,
      isPushable: a(e.isPushable) || 1 == +e.isPushable,
      isUnreadable: a(e.isUnreadable) || 1 == +e.isUnreadable,
      needPushNick: c(e.needPushNick) && 1 == +e.needPushNick
    }), t.scene = t.type.slice(6).toLowerCase(), t.type = "custom";else if ("deleteMsgP2p" === t.type || "deleteMsgTeam" === t.type) t.scene = t.type.slice(9).toLowerCase(), t.type = "deleteMsg";else {
      if (e.attach) {
        t.attach = {};
        var n = JSON.parse(e.attach);
        c(n.vt) ? (t.type = f[n.vt], delete t.attach) : (c(n.tinfo) && (t.attach.team = l.reverse(u.unserialize(n.tinfo, "team"))), c(n.tlist) && (t.attach.member = m.reverse(u.unserialize(n.tlist, "teamMember"))), c(n.attach) && (t.attach.custom = n.attach));
      }

      t.category = h[t.type], t.read = !1, t.state = "init";
    }
    return c(e.cc) && (t.cc = 1 == +e.cc), t.status = e.status || "success", c(e.filter) && (t.filter = e.filter), t;
  }, y.reverseSysMsgs = function (e, t) {
    var n = (t = t || {}).mapper,
        r = o.isFunction(n);
    return e.map(function (e) {
      return e = y.reverse(e), r && (e = n(e)), e;
    });
  }, y.completeUnread = function (e) {
    var t;
    return e = e || {}, g.forEach(function (t) {
      delete e[t];
    }), Object.keys(h).forEach(function (n) {
      e[n] = e[n] || 0, e[n] < 0 && (e[n] = 0), e[t = h[n]] = e[t] || 0, e[t] = e[t] + e[n];
    }), e.total = 0, g.forEach(function (t) {
      e.total += e[t];
    }), e;
  }, e.exports = y;
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(20);
  var i = ((r = s) && r.__esModule ? r : {
    default: r
  }).default.clientTypeMap;

  function o() {}

  o.reverse = function (e) {
    var t = e;
    return t.type = i[t.type], t;
  }, o.reverseType = function (e) {
    return i[e] || e;
  }, e.exports = o;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.notundef,
      i = r.fillPropertyWithDefault,
      o = Object.keys,
      a = {},
      c = {},
      u = [],
      l = {},
      m = {
    normal: 0,
    advanced: 1
  },
      d = {
    0: "normal",
    1: "advanced"
  },
      p = o(m),
      f = a.joinMode = {
    noVerify: 0,
    needVerify: 1,
    rejectAll: 2
  };
  c.joinMode = {
    0: "noVerify",
    1: "needVerify",
    2: "rejectAll"
  }, u.push("join"), l.joinMode = o(f);
  var g = a.beInviteMode = {
    needVerify: 0,
    noVerify: 1
  };
  c.beInviteMode = {
    0: "needVerify",
    1: "noVerify"
  }, u.push("beInvite"), l.beInviteMode = o(g);
  var h = a.inviteMode = {
    manager: 0,
    all: 1
  };
  c.inviteMode = {
    0: "manager",
    1: "all"
  }, u.push("invite"), l.inviteMode = o(h);
  var y = a.updateTeamMode = {
    manager: 0,
    all: 1
  };
  c.updateTeamMode = {
    0: "manager",
    1: "all"
  }, u.push("updateTeam"), l.updateTeamMode = o(y);
  var v = a.updateCustomMode = {
    manager: 0,
    all: 1
  };

  function b(e) {
    switch (r.verifyOptions(e, "action", "team::Team"), e.action) {
      case "create":
        r.verifyOptions(e, "teamId", !1, "team::Team"), r.verifyOptions(e, "type name", "team::Team"), r.verifyParamValid("type", e.type, p, "team::Team"), s(e.level) && (r.verifyParamType("level", e.level, "number", "team::Team"), this.level = e.level);
        break;

      case "update":
        r.verifyOptions(e, "teamId", "team::Team"), r.verifyOptions(e, "type", !1, "team::Team");
    }

    s(e.teamId) && (this.teamId = e.teamId), s(e.type) && (this.type = m[e.type]), s(e.avatar) && (this.avatar = "" + e.avatar), s(e.name) && (this.name = "" + e.name), s(e.intro) && (this.intro = "" + e.intro), s(e.announcement) && (this.announcement = "" + e.announcement), u.forEach(this.setMode.bind(this, e)), s(e.custom) && (this.custom = "" + e.custom);
  }

  c.updateCustomMode = {
    0: "manager",
    1: "all"
  }, u.push("updateCustom"), l.updateCustomMode = o(v), b.prototype.setMode = function (e, t) {
    s(e[t += "Mode"]) && (r.verifyParamValid(t, e[t], l[t], "team::Team"), this[t] = a[t][e[t]]);
  }, b.reverse = function (e, t) {
    var n = r.copy(e);
    if (s(n.teamId) && (n.teamId = "" + n.teamId), s(n.type) && (n.type = d[n.type]), s(n.level) && (n.level = +n.level), s(n.valid) && (n.valid = 1 == +n.valid), s(n.memberNum) && (n.memberNum = +n.memberNum), s(n.memberUpdateTime) && (n.memberUpdateTime = +n.memberUpdateTime), s(n.createTime) && (n.createTime = +n.createTime), s(n.updateTime) && (n.updateTime = +n.updateTime), s(n.validToCurrentUser) && (n.validToCurrentUser = "1" === n.validToCurrentUser), s(n.mute) && (n.mute = "1" === n.mute), s(n.muteType)) switch (n.muteType) {
      case "0":
        n.mute = !1, n.muteType = "none";
        break;

      case "1":
        n.mute = !0, n.muteType = "normal";
        break;

      case "2":
        n.mute = !0, n.muteType = "all";
    } else s(n.mute) && (1 === n.mute ? (n.mute = !0, n.muteType = "normal") : (n.mute = !1, n.muteType = "none"));
    return u.forEach(function (e, t) {
      s(e[t += "Mode"]) && (e[t] = c[t][e[t]]);
    }.bind(null, n)), delete n.bits, t || b.fillProperties(n), n;
  }, b.fillProperties = function (e) {
    var t = i(e, "beInviteMode", "needVerify"),
        n = i(e, "inviteMode", "manager"),
        r = i(e, "updateTeamMode", "manager"),
        s = i(e, "updateCustomMode", "manager"),
        o = i(e, "avatar", "");
    return t || n || r || s || o;
  }, e.exports = b;
}, function (e, t, n) {
  "use strict";

  var r = {
    link: {
      id: 1,
      heartbeat: 2
    },
    sync: {
      id: 5,
      sync: 1,
      syncTeamMembers: 2
    },
    misc: {
      id: 6,
      getSimpleNosToken: 1,
      getNosToken: 2,
      notifyUploadLog: 3,
      uploadSdkLogUrl: 4,
      audioToText: 5,
      processImage: 6,
      getNosTokenTrans: 7,
      notifyTransLog: 8,
      fetchFile: 9,
      fetchFileList: 10,
      removeFile: 11,
      getClientAntispam: 17,
      fileQuickTransfer: 18
    },
    avSignal: {
      id: 15,
      signalingCreate: 1,
      signalingDelay: 2,
      signalingClose: 3,
      signalingJoin: 4,
      signalingLeave: 5,
      signalingInvite: 6,
      signalingCancel: 7,
      signalingReject: 8,
      signalingAccept: 9,
      signalingControl: 10,
      signalingNotify: 11,
      signalingMutilClientSyncNotify: 12,
      signalingUnreadMessageSyncNotify: 13,
      signalingChannelsSyncNotify: 14
    }
  },
      s = {
    heartbeat: {
      sid: r.link.id,
      cid: r.link.heartbeat
    },
    getSimpleNosToken: {
      sid: r.misc.id,
      cid: r.misc.getSimpleNosToken,
      params: [{
        type: "int",
        name: "num"
      }]
    },
    getNosToken: {
      sid: r.misc.id,
      cid: r.misc.getNosToken,
      params: [{
        type: "String",
        name: "responseBody"
      }, {
        type: "Property",
        name: "nosToken",
        entity: "nosToken"
      }]
    },
    uploadSdkLogUrl: {
      sid: r.misc.id,
      cid: r.misc.uploadSdkLogUrl,
      params: [{
        type: "string",
        name: "url"
      }]
    },
    audioToText: {
      sid: r.misc.id,
      cid: r.misc.audioToText,
      params: [{
        type: "Property",
        name: "audioToText"
      }]
    },
    processImage: {
      sid: r.misc.id,
      cid: r.misc.processImage,
      params: [{
        type: "String",
        name: "url"
      }, {
        type: "PropertyArray",
        name: "imageOps",
        entity: "imageOp"
      }]
    },
    getClientAntispam: {
      sid: r.misc.id,
      cid: r.misc.getClientAntispam,
      params: [{
        type: "Property",
        name: "clientAntispam"
      }]
    },
    fileQuickTransfer: {
      sid: r.misc.id,
      cid: r.misc.fileQuickTransfer,
      params: [{
        type: "Property",
        name: "fileQuickTransfer"
      }]
    },
    getNosTokenTrans: {
      sid: r.misc.id,
      cid: r.misc.getNosTokenTrans,
      params: [{
        type: "Property",
        name: "transToken"
      }]
    },
    fetchFile: {
      sid: r.misc.id,
      cid: r.misc.fetchFile,
      params: [{
        type: "String",
        name: "docId"
      }]
    },
    fetchFileList: {
      sid: r.misc.id,
      cid: r.misc.fetchFileList,
      params: [{
        type: "Property",
        name: "fileListParam"
      }]
    },
    removeFile: {
      sid: r.misc.id,
      cid: r.misc.removeFile,
      params: [{
        type: "String",
        name: "docId"
      }]
    },
    signalingCreate: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingCreate,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingDelay: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingDelay,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingClose: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingClose,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingJoin: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingJoin,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingLeave: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingLeave,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingInvite: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingInvite,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingCancel: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingCancel,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingReject: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingReject,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingAccept: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingAccept,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    },
    signalingControl: {
      sid: r.avSignal.id,
      cid: r.avSignal.signalingControl,
      params: [{
        type: "Property",
        name: "avSignalTag"
      }]
    }
  };
  e.exports = {
    idMap: r,
    cmdConfig: s,
    packetConfig: {
      "1_2": {
        service: "link",
        cmd: "heartbeat"
      },
      "6_1": {
        service: "misc",
        cmd: "getSimpleNosToken",
        response: [{
          type: "PropertyArray",
          name: "nosTokens",
          entity: "nosToken"
        }]
      },
      "6_2": {
        service: "misc",
        cmd: "getNosToken",
        response: [{
          type: "Property",
          name: "nosToken"
        }]
      },
      "6_3": {
        service: "misc",
        cmd: "notifyUploadLog"
      },
      "6_5": {
        service: "misc",
        cmd: "audioToText",
        response: [{
          type: "String",
          name: "text"
        }]
      },
      "6_6": {
        service: "misc",
        cmd: "processImage",
        response: [{
          type: "String",
          name: "url"
        }]
      },
      "6_7": {
        service: "misc",
        cmd: "getNosTokenTrans",
        response: [{
          type: "Property",
          name: "nosToken"
        }, {
          type: "String",
          name: "docId"
        }]
      },
      "6_8": {
        service: "misc",
        cmd: "notifyTransLog",
        response: [{
          type: "Property",
          name: "transInfo"
        }]
      },
      "6_9": {
        service: "misc",
        cmd: "fetchFile",
        response: [{
          type: "Property",
          name: "info",
          entity: "transInfo"
        }]
      },
      "6_10": {
        service: "misc",
        cmd: "fetchFileList",
        response: [{
          type: "PropertyArray",
          name: "list",
          entity: "transInfo"
        }, {
          type: "Number",
          name: "totalCount"
        }]
      },
      "6_11": {
        service: "misc",
        cmd: "removeFile",
        response: [{
          type: "String",
          name: "res"
        }]
      },
      "6_17": {
        service: "misc",
        cmd: "getClientAntispam",
        response: [{
          type: "Property",
          name: "clientAntispam"
        }]
      },
      "6_18": {
        service: "misc",
        cmd: "fileQuickTransfer",
        response: [{
          type: "Property",
          name: "fileQuickTransfer"
        }]
      },
      "15_1": {
        service: "avSignal",
        cmd: "signalingCreate",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_2": {
        service: "avSignal",
        cmd: "signalingDelay",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_3": {
        service: "avSignal",
        cmd: "signalingClose",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_4": {
        service: "avSignal",
        cmd: "signalingJoin",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_5": {
        service: "avSignal",
        cmd: "signalingLeave",
        response: []
      },
      "15_6": {
        service: "avSignal",
        cmd: "signalingInvite",
        response: []
      },
      "15_7": {
        service: "avSignal",
        cmd: "signalingCancel",
        response: []
      },
      "15_8": {
        service: "avSignal",
        cmd: "signalingReject",
        response: []
      },
      "15_9": {
        service: "avSignal",
        cmd: "signalingAccept",
        response: []
      },
      "15_10": {
        service: "avSignal",
        cmd: "signalingControl",
        response: []
      },
      "15_11": {
        service: "avSignal",
        cmd: "signalingNotify",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_12": {
        service: "avSignal",
        cmd: "signalingMutilClientSyncNotify",
        response: [{
          type: "Property",
          name: "avSignalTag"
        }]
      },
      "15_13": {
        service: "avSignal",
        cmd: "signalingUnreadMessageSyncNotify",
        response: [{
          type: "PropertyArray",
          name: "avSignalTag"
        }]
      },
      "15_14": {
        service: "avSignal",
        cmd: "signalingChannelsSyncNotify",
        response: [{
          type: "PropertyArray",
          name: "avSignalTag"
        }]
      }
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = r.f,
      i = n(169);

  function o(e) {
    e.onload && this.once("load", e.onload), e.onerror && this.once("error", e.onerror), e.onbeforesend && this.once("beforesend", e.onbeforesend), e.onaftersend && this.once("aftersend", e.onaftersend);
    var t = (e = this.options = r.fetch({
      method: "GET",
      url: "",
      sync: !1,
      data: null,
      headers: {},
      cookie: !1,
      timeout: 6e4,
      type: "text",
      form: null,
      input: null,
      putFileAtEnd: !1,
      proxyUrl: ""
    }, e)).headers;
    r.notexist(t["Content-Type"]) && (t["Content-Type"] = "application/x-www-form-urlencoded"), this.send();
  }

  var a = o.prototype = Object.create(i.prototype);
  a.send = function () {
    var e = this,
        t = e.options;
    setTimeout(function () {
      try {
        try {
          e.emit("beforesend", t);
        } catch (e) {
          console.error("ignore error ajax beforesend,", e);
        }

        e.doSend();
      } catch (t) {
        console.error("ignore error server error,", t), e.onError("serverError", "请求失败:" + t.message);
      }
    }, 0);
  }, a.doSend = s, a.afterSend = function () {
    var e = this;
    setTimeout(function () {
      e.emit("aftersend", e.options);
    }, 0);
  }, a.onLoad = function (e) {
    var t = this.options,
        n = e.status,
        r = e.result;

    if (0 === ("" + n).indexOf("2")) {
      if ("json" === t.type) try {
        r = JSON.parse(r);
      } catch (e) {
        return console.error("ignore error parse json,", e), void this.onError("parseError", r);
      }
      this.emit("load", r);
    } else this.onError("serverError", "服务器返回异常状态", {
      status: n,
      result: r
    });
  }, a.onError = function (e, t, n) {
    var s = r.isObject(n) ? n : {};
    s.code = e || "error", s.message = t || "发生错误", this.emit("error", s);
  }, a.onTimeout = function () {
    this.onError("timeout", "请求超时");
  }, a.abort = function () {
    this.onError("abort", "客户端中止");
  }, a.header = function (e) {
    var t = this;
    if (!r.isArray(e)) return t.getResponseHeader(e || "");
    var n = {};
    return e.forEach(function (e) {
      n[e] = t.header(e);
    }), n;
  }, a.getResponseHeader = s, a.destroy = s, e.exports = o;
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = n(170),
      i = n(168),
      o = n(167),
      a = {},
      c = r.f;

  function u(e) {
    var t = e.upload = "multipart/form-data" === (e.headers || r.o)["Content-Type"],
        n = !1;

    try {
      n = (location.protocol + "//" + location.host).toLowerCase() !== r.url2origin(e.url);
    } catch (e) {}

    return e.cors = n, t || n || e.mode ? function (e) {
      var t = e.mode,
          n = s,
          a = r.getGlobal();
      return !a.FormData && a.document && (t = "iframe"), "iframe" === t && (n = e.upload ? i : o), new n(e);
    }(e) : new s(e);
  }

  function l(e, t, n) {
    var r = a[e];

    if (r) {
      "onload" === t && r.result && (n = function (e, t) {
        t = {
          data: t
        };
        var n = e.result.headers;
        return n && (t.headers = e.req.header(n)), t;
      }(r, n)), function (e) {
        var t = a[e];
        t && (t.req.destroy(), delete a[e]);
      }(e);
      var s = {
        type: t,
        result: n
      };
      c(s), s.stopped || r[t](s.result);
    }
  }

  function m(e, t) {
    var n = r.genUrlSep(e);
    return t = t || "", r.isObject(t) && (t = r.object2query(t)), t && (e += n + t), e;
  }

  function d(e, t) {
    t = t || {};
    var n = r.uniqueID(),
        s = {
      result: t.result,
      onload: t.onload || r.f,
      onerror: t.onerror || r.f
    };
    a[n] = s, t.onload = function (e, t) {
      l(e, "onload", t);
    }.bind(null, n), t.onerror = function (e, t) {
      l(e, "onerror", t);
    }.bind(null, n), t.query && (e = m(e, t.query));
    var i = t.method || "";
    return i && !/get/i.test(i) || !t.data || (e = m(e, t.data), t.data = null), t.url = e, s.req = u(t), n;
  }

  d.filter = function (e) {
    r.isFunction(e) && (c = e);
  }, d.abort = function (e) {
    var t = a[e];
    t && t.req.abort();
  }, e.exports = d;
}, function (e, t, n) {
  "use strict";

  var r = o(n(2)),
      s = o(n(19)),
      i = o(n(18));

  function o(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }

  var a = function () {
    function e() {
      (0, s.default)(this, e), this._entries = [];
    }

    return (0, i.default)(e, [{
      key: "append",
      value: function value(e, t) {
        if ("string" != typeof e) throw new TypeError("FormData name must be a string");
        if ("string" != typeof t && ("object" !== (void 0 === t ? "undefined" : (0, r.default)(t)) || "string" != typeof t.uri)) throw new TypeError("FormData value must be a string or { uri: tempFilePath }");

        this._entries.push([e, t]);
      }
    }, {
      key: "set",
      value: function value(e, t) {
        var n = this.get(e);
        n ? n[1] = t : this.append(e, t);
      }
    }, {
      key: "delete",
      value: function value(e) {
        this._entries = this._entries.filter(function (t) {
          return t[0] !== e;
        });
      }
    }, {
      key: "entries",
      value: function value() {
        return this._entries;
      }
    }, {
      key: "get",
      value: function value(e) {
        return this._entries.find(function (t) {
          return t[0] === e;
        });
      }
    }, {
      key: "getAll",
      value: function value(e) {
        return this._entries.filter(function (t) {
          return t[0] === e;
        });
      }
    }, {
      key: "has",
      value: function value(e) {
        return this._entries.some(function (t) {
          return t[0] === e;
        });
      }
    }, {
      key: "keys",
      value: function value() {
        return this._entries.map(function (e) {
          return e[0];
        });
      }
    }, {
      key: "values",
      value: function value() {
        return this._entries.map(function (e) {
          return e[1];
        });
      }
    }]), e;
  }();

  e.exports = a;
}, function (e, t, n) {
  var r = n(62),
      s = n(37).concat("length", "prototype");

  t.f = Object.getOwnPropertyNames || function (e) {
    return r(e, s);
  };
}, function (e, t, n) {
  var r = n(9),
      s = n(13),
      i = n(115)(!1),
      o = n(39)("IE_PROTO");

  e.exports = function (e, t) {
    var n,
        a = s(e),
        c = 0,
        u = [];

    for (n in a) {
      n != o && r(a, n) && u.push(n);
    }

    for (; t.length > c;) {
      r(a, n = t[c++]) && (~i(u, n) || u.push(n));
    }

    return u;
  };
}, function (e, t, n) {
  e.exports = n(14);
}, function (e, t, n) {
  var r = n(16),
      s = n(6).document,
      i = r(s) && r(s.createElement);

  e.exports = function (e) {
    return i ? s.createElement(e) : {};
  };
}, function (e, t, n) {
  e.exports = !n(10) && !n(21)(function () {
    return 7 != Object.defineProperty(n(64)("div"), "a", {
      get: function get() {
        return 7;
      }
    }).a;
  });
}, function (e, t, n) {
  "use strict";

  var r = n(41),
      s = n(23),
      i = n(63),
      o = n(14),
      a = n(28),
      c = n(117),
      u = n(36),
      l = n(112),
      m = n(5)("iterator"),
      d = !([].keys && "next" in [].keys()),
      p = function p() {
    return this;
  };

  e.exports = function (e, t, n, f, g, h, y) {
    c(n, t, f);

    var v,
        b,
        M,
        T = function T(e) {
      if (!d && e in P) return P[e];

      switch (e) {
        case "keys":
        case "values":
          return function () {
            return new n(this, e);
          };
      }

      return function () {
        return new n(this, e);
      };
    },
        S = t + " Iterator",
        k = "values" == g,
        C = !1,
        P = e.prototype,
        I = P[m] || P["@@iterator"] || g && P[g],
        w = I || T(g),
        O = g ? k ? T("entries") : w : void 0,
        A = "Array" == t && P.entries || I;

    if (A && (M = l(A.call(new e()))) !== Object.prototype && M.next && (u(M, S, !0), r || "function" == typeof M[m] || o(M, m, p)), k && I && "values" !== I.name && (C = !0, w = function w() {
      return I.call(this);
    }), r && !y || !d && !C && P[m] || o(P, m, w), a[t] = w, a[S] = p, g) if (v = {
      values: k ? w : T("values"),
      keys: h ? w : T("keys"),
      entries: O
    }, y) for (b in v) {
      b in P || i(P, b, v[b]);
    } else s(s.P + s.F * (d || C), t, v);
    return v;
  };
}, function (e, t, n) {
  e.exports = {
    default: n(97),
    __esModule: !0
  };
}, function (e, t, n) {
  var r = n(49);
  e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
    return "String" == r(e) ? e.split("") : Object(e);
  };
}, function (e, t, n) {
  var r = n(118);

  e.exports = function (e, t, n) {
    if (r(e), void 0 === t) return e;

    switch (n) {
      case 1:
        return function (n) {
          return e.call(t, n);
        };

      case 2:
        return function (n, r) {
          return e.call(t, n, r);
        };

      case 3:
        return function (n, r, s) {
          return e.call(t, n, r, s);
        };
    }

    return function () {
      return e.apply(t, arguments);
    };
  };
},,, function (e, t, n) {
  "use strict";

  var r = n(33),
      s = n(32),
      i = n(0),
      o = n(1);

  function a(e) {
    switch (i.notundef(e.type) ? i.verifyFileType(e.type, "msg::FileMessage") : e.type = "file", i.verifyOptions(e, "file", "msg::FileMessage"), i.verifyOptions(e.file, "url ext size md5", !0, "file.", "msg::FileMessage"), e.type) {
      case "image":
        c.verifyFile(e.file, "msg::FileMessage");
        break;

      case "audio":
        u.verifyFile(e.file, "msg::FileMessage");
        break;

      case "video":
        l.verifyFile(e.file, "msg::FileMessage");
    }

    s.call(this, e), this.attach = JSON.stringify(e.file);
  }

  a.prototype = Object.create(s.prototype), a.reverse = function (e) {
    var t = s.reverse(e);
    return e.attach = e.attach ? "" + e.attach : "", t.file = e.attach ? JSON.parse(e.attach) : {}, t.file.url = (0, r.genPrivateUrl)(t.file.url), "audio" === t.type && (t.file.mp3Url = t.file.url + "?audioTrans&type=mp3"), o.httpsEnabled && (t.file.url = t.file.url.replace("http", "https")), t;
  }, e.exports = a;
  var c = n(222),
      u = n(221),
      l = n(220);
}, function (e, t, n) {
  "use strict";

  var r = n(33),
      s = n(0),
      i = {
    unknown: 0,
    male: 1,
    female: 2
  },
      o = {
    0: "unknown",
    1: "male",
    2: "female"
  };

  function a(e) {
    s.merge(this, e), s.notundef(this.gender) && (s.verifyParamValid("gender", this.gender, a.validGenders, "user::User"), this.gender = i[this.gender]), s.notundef(this.email) && "" !== this.email && s.verifyEmail("email", this.email, "user::User"), s.notundef(this.birth) && "" !== this.birth && s.verifyBirth("birth", this.birth, "user::User"), s.notundef(this.tel) && "" !== this.tel && s.verifyTel("tel", this.tel, "user::User");
  }

  a.reverse = function (e) {
    var t = s.filterObj(e, "account nick avatar sign gender email birth tel custom createTime updateTime");
    return s.notundef(t.avatar) && (t.avatar = (0, r.genPrivateUrl)(t.avatar)), s.notundef(t.gender) && (t.gender = o[t.gender]), s.notundef(t.createTime) && (t.createTime = +t.createTime), s.notundef(t.updateTime) && (t.updateTime = +t.updateTime), t;
  }, a.reverseUsers = function (e) {
    return e.map(function (e) {
      return a.reverse(e);
    });
  }, a.validGenders = Object.keys(i), e.exports = a;
}, function (e, t, n) {
  var r = n(43),
      s = Math.min;

  e.exports = function (e) {
    return e > 0 ? s(r(e), 9007199254740991) : 0;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(119)(!0);
  n(66)(String, "String", function (e) {
    this._t = String(e), this._i = 0;
  }, function () {
    var e,
        t = this._t,
        n = this._i;
    return n >= t.length ? {
      value: void 0,
      done: !0
    } : (e = r(t, n), this._i += e.length, {
      value: e,
      done: !1
    });
  });
}, function (e, t) {
  e.exports = function (e) {
    var t = n.call(e);
    return "[object Function]" === t || "function" == typeof e && "[object RegExp]" !== t || "undefined" != typeof window && (e === window.setTimeout || e === window.alert || e === window.confirm || e === window.prompt);
  };

  var n = Object.prototype.toString;
}, function (module, exports, __webpack_require__) {
  (function (global, module) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    /*! Socket.IO.js build:0.9.11, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */


    function getGlobal() {
      return "undefined" != typeof window ? window : "undefined" != typeof self ? self : void 0 !== global ? global : {};
    }

    var root = getGlobal(),
        io = module.exports;
    void 0 === root.location && (root.location = null), root.io ? module && (module.exports = io = root.io) : root.io = io, function () {
      !function (e, t) {
        var n = e;
        n.version = "0.9.11", n.protocol = 1, n.transports = [], n.j = [], n.sockets = {}, n.connect = function (e, r) {
          var s,
              i,
              o = n.util.parseUri(e);
          t && t.location && (o.protocol = o.protocol || t.location.protocol.slice(0, -1), o.host = o.host || (t.document ? t.document.domain : t.location.hostname), o.port = o.port || t.location.port), s = n.util.uniqueUri(o);
          var a = {
            host: o.host,
            secure: "https" === o.protocol,
            port: o.port || ("https" === o.protocol ? 443 : 80),
            query: o.query || ""
          };
          return n.util.merge(a, r), !a["force new connection"] && n.sockets[s] || (i = new n.Socket(a)), !a["force new connection"] && i && (n.sockets[s] = i), (i = i || n.sockets[s]).of(o.path.length > 1 ? o.path : "");
        };
      }(module.exports, root), function (e, t) {
        var n = e.util = {},
            r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        n.parseUri = function (e) {
          for (var t = r.exec(e || ""), n = {}, i = 14; i--;) {
            n[s[i]] = t[i] || "";
          }

          return n;
        }, n.uniqueUri = function (e) {
          var n = e.protocol,
              r = e.host,
              s = e.port;
          return "document" in t ? (r = r || document.domain, s = s || ("https" == n && "https:" !== document.location.protocol ? 443 : document.location.port)) : (r = r || "localhost", s || "https" != n || (s = 443)), (n || "http") + "://" + r + ":" + (s || 80);
        }, n.query = function (e, t) {
          var r = n.chunkQuery(e || ""),
              s = [];

          for (var i in n.merge(r, n.chunkQuery(t || "")), r) {
            r.hasOwnProperty(i) && s.push(i + "=" + r[i]);
          }

          return s.length ? "?" + s.join("&") : "";
        }, n.chunkQuery = function (e) {
          for (var t, n = {}, r = e.split("&"), s = 0, i = r.length; s < i; ++s) {
            (t = r[s].split("="))[0] && (n[t[0]] = t[1]);
          }

          return n;
        };
        var i = !1;
        n.load = function (e) {
          if (document && "complete" === document.readyState || i) return e();
          n.on(t, "load", e, !1);
        }, n.on = function (e, t, n, r) {
          e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, r);
        }, n.request = function (e) {
          if (e && "undefined" != typeof XDomainRequest && !n.ua.hasCORS) return new XDomainRequest();
          if ("undefined" != typeof XMLHttpRequest && (!e || n.ua.hasCORS)) return new XMLHttpRequest();
          if (!e) try {
            return new root[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
          } catch (e) {}
          return null;
        }, void 0 !== root && n.load(function () {
          i = !0;
        }), n.defer = function (e) {
          if (!n.ua.webkit || "undefined" != typeof importScripts) return e();
          n.load(function () {
            setTimeout(e, 100);
          });
        }, n.merge = function (e, t, r, s) {
          var i,
              o = s || [],
              a = void 0 === r ? 2 : r;

          for (i in t) {
            t.hasOwnProperty(i) && n.indexOf(o, i) < 0 && ("object" == _typeof(e[i]) && a ? n.merge(e[i], t[i], a - 1, o) : (e[i] = t[i], o.push(t[i])));
          }

          return e;
        }, n.mixin = function (e, t) {
          n.merge(e.prototype, t.prototype);
        }, n.inherit = function (e, t) {
          function n() {}

          n.prototype = t.prototype, e.prototype = new n();
        }, n.isArray = Array.isArray || function (e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        }, n.intersect = function (e, t) {
          for (var r = [], s = e.length > t.length ? e : t, i = e.length > t.length ? t : e, o = 0, a = i.length; o < a; o++) {
            ~n.indexOf(s, i[o]) && r.push(i[o]);
          }

          return r;
        }, n.indexOf = function (e, t, n) {
          var r = e.length;

          for (n = n < 0 ? n + r < 0 ? 0 : n + r : n || 0; n < r && e[n] !== t; n++) {
            ;
          }

          return r <= n ? -1 : n;
        }, n.toArray = function (e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) {
            t.push(e[n]);
          }

          return t;
        }, n.ua = {}, n.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function () {
          try {
            var e = new XMLHttpRequest();
          } catch (e) {
            return !1;
          }

          return null != e.withCredentials;
        }(), n.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), n.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
      }(void 0 !== io ? io : module.exports, root), function (e, t) {
        function n() {}

        e.EventEmitter = n, n.prototype.on = function (e, n) {
          return this.$events || (this.$events = {}), this.$events[e] ? t.util.isArray(this.$events[e]) ? this.$events[e].push(n) : this.$events[e] = [this.$events[e], n] : this.$events[e] = n, this;
        }, n.prototype.addListener = n.prototype.on, n.prototype.once = function (e, t) {
          var n = this;

          function r() {
            n.removeListener(e, r), t.apply(this, arguments);
          }

          return r.listener = t, this.on(e, r), this;
        }, n.prototype.removeListener = function (e, n) {
          if (this.$events && this.$events[e]) {
            var r = this.$events[e];

            if (t.util.isArray(r)) {
              for (var s = -1, i = 0, o = r.length; i < o; i++) {
                if (r[i] === n || r[i].listener && r[i].listener === n) {
                  s = i;
                  break;
                }
              }

              if (s < 0) return this;
              r.splice(s, 1), r.length || delete this.$events[e];
            } else (r === n || r.listener && r.listener === n) && delete this.$events[e];
          }

          return this;
        }, n.prototype.removeAllListeners = function (e) {
          return void 0 === e ? (this.$events = {}, this) : (this.$events && this.$events[e] && (this.$events[e] = null), this);
        }, n.prototype.listeners = function (e) {
          return this.$events || (this.$events = {}), this.$events[e] || (this.$events[e] = []), t.util.isArray(this.$events[e]) || (this.$events[e] = [this.$events[e]]), this.$events[e];
        }, n.prototype.emit = function (e) {
          if (!this.$events) return !1;
          var n = this.$events[e];
          if (!n) return !1;
          var r = Array.prototype.slice.call(arguments, 1);
          if ("function" == typeof n) n.apply(this, r);else {
            if (!t.util.isArray(n)) return !1;

            for (var s = n.slice(), i = 0, o = s.length; i < o; i++) {
              s[i].apply(this, r);
            }
          }
          return !0;
        };
      }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports), function (exports, nativeJSON) {
        "use strict";

        if (nativeJSON && nativeJSON.parse) return exports.JSON = {
          parse: nativeJSON.parse,
          stringify: nativeJSON.stringify
        };
        var JSON = exports.JSON = {};

        function f(e) {
          return e < 10 ? "0" + e : e;
        }

        function date(e, t) {
          return isFinite(e.valueOf()) ? e.getUTCFullYear() + "-" + f(e.getUTCMonth() + 1) + "-" + f(e.getUTCDate()) + "T" + f(e.getUTCHours()) + ":" + f(e.getUTCMinutes()) + ":" + f(e.getUTCSeconds()) + "Z" : null;
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {
          "\b": "\\b",
          "\t": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\"
        },
            rep;

        function quote(e) {
          return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
          }) + '"' : '"' + e + '"';
        }

        function str(e, t) {
          var n,
              r,
              s,
              i,
              o,
              a = gap,
              c = t[e];

          switch (c instanceof Date && (c = date(e)), "function" == typeof rep && (c = rep.call(t, e, c)), _typeof(c)) {
            case "string":
              return quote(c);

            case "number":
              return isFinite(c) ? String(c) : "null";

            case "boolean":
            case "null":
              return String(c);

            case "object":
              if (!c) return "null";

              if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(c)) {
                for (i = c.length, n = 0; n < i; n += 1) {
                  o[n] = str(n, c) || "null";
                }

                return s = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + a + "]" : "[" + o.join(",") + "]", gap = a, s;
              }

              if (rep && "object" == _typeof(rep)) for (i = rep.length, n = 0; n < i; n += 1) {
                "string" == typeof rep[n] && (s = str(r = rep[n], c)) && o.push(quote(r) + (gap ? ": " : ":") + s);
              } else for (r in c) {
                Object.prototype.hasOwnProperty.call(c, r) && (s = str(r, c)) && o.push(quote(r) + (gap ? ": " : ":") + s);
              }
              return s = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + a + "}" : "{" + o.join(",") + "}", gap = a, s;
          }
        }

        JSON.stringify = function (e, t, n) {
          var r;
          if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1) {
            indent += " ";
          } else "string" == typeof n && (indent = n);
          if (rep = t, t && "function" != typeof t && ("object" != _typeof(t) || "number" != typeof t.length)) throw new Error("socket.io:: replacer cannot JSON.stringify");
          return str("", {
            "": e
          });
        }, JSON.parse = function (text, reviver) {
          var j;

          function walk(e, t) {
            var n,
                r,
                s = e[t];
            if (s && "object" == _typeof(s)) for (n in s) {
              Object.prototype.hasOwnProperty.call(s, n) && (void 0 !== (r = walk(s, n)) ? s[n] = r : delete s[n]);
            }
            return reviver.call(e, t, s);
          }

          if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
          })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
            "": j
          }, "") : j;
          throw new SyntaxError("socket.io:: reviver cannot JSON.parse");
        };
      }(void 0 !== io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function (e, t) {
        var n = e.parser = {},
            r = n.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
            s = n.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
            i = n.advice = ["reconnect"],
            o = t.JSON,
            a = t.util.indexOf;
        n.encodePacket = function (e) {
          var t = a(r, e.type),
              n = e.id || "",
              c = e.endpoint || "",
              u = e.ack,
              l = null;

          switch (e.type) {
            case "error":
              var m = e.reason ? a(s, e.reason) : "",
                  d = e.advice ? a(i, e.advice) : "";
              "" === m && "" === d || (l = m + ("" !== d ? "+" + d : ""));
              break;

            case "message":
              "" !== e.data && (l = e.data);
              break;

            case "event":
              var p = {
                name: e.name
              };
              e.args && e.args.length && (p.args = e.args), l = o.stringify(p);
              break;

            case "json":
              l = o.stringify(e.data);
              break;

            case "connect":
              e.qs && (l = e.qs);
              break;

            case "ack":
              l = e.ackId + (e.args && e.args.length ? "+" + o.stringify(e.args) : "");
          }

          var f = [t, n + ("data" == u ? "+" : ""), c];
          return null != l && f.push(l), f.join(":");
        }, n.encodePayload = function (e) {
          var t = "";
          if (1 == e.length) return e[0];

          for (var n = 0, r = e.length; n < r; n++) {
            t += "�" + e[n].length + "�" + e[n];
          }

          return t;
        };
        var c = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
        n.decodePacket = function (e) {
          if (!(a = e.match(c))) return {};
          var t = a[2] || "",
              n = (e = a[5] || "", {
            type: r[a[1]],
            endpoint: a[4] || ""
          });

          switch (t && (n.id = t, a[3] ? n.ack = "data" : n.ack = !0), n.type) {
            case "error":
              var a = e.split("+");
              n.reason = s[a[0]] || "", n.advice = i[a[1]] || "";
              break;

            case "message":
              n.data = e || "";
              break;

            case "event":
              try {
                var u = o.parse(e);
                n.name = u.name, n.args = u.args;
              } catch (e) {}

              n.args = n.args || [];
              break;

            case "json":
              try {
                n.data = o.parse(e);
              } catch (e) {}

              break;

            case "connect":
              n.qs = e || "";
              break;

            case "ack":
              if ((a = e.match(/^([0-9]+)(\+)?(.*)/)) && (n.ackId = a[1], n.args = [], a[3])) try {
                n.args = a[3] ? o.parse(a[3]) : [];
              } catch (e) {}
          }

          return n;
        }, n.decodePayload = function (e) {
          var t = function t(e, _t2) {
            for (var n = 0, r = e; r < _t2.length; r++) {
              if ("�" == _t2.charAt(r)) return n;
              n++;
            }

            return n;
          };

          if ("�" == e.charAt(0)) {
            for (var r = [], s = 1, i = ""; s < e.length; s++) {
              if ("�" == e.charAt(s)) {
                var o = e.substr(s + 1).substr(0, i);

                if ("�" != e.charAt(s + 1 + Number(i)) && s + 1 + Number(i) != e.length) {
                  var a = Number(i);
                  l = t(s + a + 1, e), o = e.substr(s + 1).substr(0, a + l), s += l;
                }

                r.push(n.decodePacket(o)), s += Number(i) + 1, i = "";
              } else i += e.charAt(s);
            }

            return r;
          }

          return [n.decodePacket(e)];
        };
      }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports), function (e, t) {
        function n(e, t) {
          this.socket = e, this.sessid = t;
        }

        e.Transport = n, t.util.mixin(n, t.EventEmitter), n.prototype.heartbeats = function () {
          return !0;
        }, n.prototype.onData = function (e) {
          if (this !== this.socket.transport) return this;

          if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== e) {
            var n = t.parser.decodePayload(e);
            if (n && n.length) for (var r = 0, s = n.length; r < s; r++) {
              this.onPacket(n[r]);
            }
          }

          return this;
        }, n.prototype.onPacket = function (e) {
          return this.socket.setHeartbeatTimeout(), "heartbeat" == e.type ? this.onHeartbeat() : ("connect" == e.type && "" == e.endpoint && this.onConnect(), "error" == e.type && "reconnect" == e.advice && (this.isOpen = !1), this.socket.onPacket(e), this);
        }, n.prototype.setCloseTimeout = function () {
          if (!this.closeTimeout) {
            var e = this;
            this.closeTimeout = setTimeout(function () {
              e.onDisconnect();
            }, this.socket.closeTimeout);
          }
        }, n.prototype.onDisconnect = function () {
          return this.isOpen && this.close(), this.clearTimeouts(), this.socket.transport === this ? this.socket.onDisconnect() : this.socket.setBuffer(!1), this;
        }, n.prototype.onConnect = function () {
          return this.socket.onConnect(), this;
        }, n.prototype.clearCloseTimeout = function () {
          this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null);
        }, n.prototype.clearTimeouts = function () {
          this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout);
        }, n.prototype.packet = function (e) {
          this.send(t.parser.encodePacket(e));
        }, n.prototype.onHeartbeat = function (e) {
          this.packet({
            type: "heartbeat"
          });
        }, n.prototype.onOpen = function () {
          this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen();
        }, n.prototype.onClose = function () {
          this.isOpen = !1, this.socket.transport === this ? this.socket.onClose() : this.socket.setBuffer(!1), this.onDisconnect(), this.onDisconnectDone instanceof Function && this.onDisconnectDone(null), this.onConnectionOver instanceof Function && this.onConnectionOver(null);
        }, n.prototype.onDisconnectDone = function () {}, n.prototype.onConnectionOver = function () {}, n.prototype.prepareUrl = function () {
          var e = this.socket.options;
          return this.scheme() + "://" + e.host + ":" + e.port + "/" + e.resource + "/" + t.protocol + "/" + this.name + "/" + this.sessid;
        }, n.prototype.ready = function (e, t) {
          t.call(this);
        };
      }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports), function (e, t, n) {
        function r(e) {
          if (this.options = {
            port: 80,
            secure: !1,
            document: "document" in n && document,
            resource: "socket.io",
            transports: e.transports || t.transports,
            "connect timeout": 1e4,
            "try multiple transports": !0,
            reconnect: !0,
            "reconnection delay": 500,
            "reconnection limit": 1 / 0,
            "reopen delay": 3e3,
            "max reconnection attempts": 10,
            "sync disconnect on unload": !1,
            "auto connect": !0,
            "flash policy port": 10843,
            manualFlush: !1
          }, t.util.merge(this.options, e), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || t.util.ua.hasCORS)) {
            var r = this;
            t.util.on(n, "beforeunload", function () {
              r.disconnectSync();
            }, !1);
          }

          this.options["auto connect"] && this.connect();
        }

        function s() {}

        e.Socket = r, t.util.mixin(r, t.EventEmitter), r.prototype.of = function (e) {
          return this.namespaces[e] || (this.namespaces[e] = new t.SocketNamespace(this, e), "" !== e && this.namespaces[e].packet({
            type: "connect"
          })), this.namespaces[e];
        }, r.prototype.publish = function () {
          var e;

          for (var t in this.emit.apply(this, arguments), this.namespaces) {
            this.namespaces.hasOwnProperty(t) && (e = this.of(t)).$emit.apply(e, arguments);
          }
        }, r.prototype.handshake = function (e) {
          var n = this,
              r = this.options;

          function i(t) {
            t instanceof Error ? (n.connecting = !1, n.onError(t.message)) : (console.log("SocketIO handshake success " + t), e.apply(null, t.split(":")));
          }

          var o = ["http" + (r.secure ? "s" : "") + ":/", r.host + ":" + r.port, r.resource, t.protocol, t.util.query(this.options.query, "t=" + +new Date())].join("/");

          if (this.isXDomain() && !t.util.ua.hasCORS && document && document.getElementsByTagName) {
            var a = document.getElementsByTagName("script")[0],
                c = document.createElement("script");
            c.src = o + "&jsonp=" + t.j.length, c.onreadystatechange = function () {
              "loaded" == this.readyState && c.parentNode && (c.parentNode.removeChild(c), n.connecting = !1, !n.reconnecting && n.onError("Server down or port not open"), n.publish("handshake_failed"));
            }, a.parentNode.insertBefore(c, a), t.j.push(function (e) {
              i(e), c.parentNode.removeChild(c);
            });
          } else {
            var u = t.util.request();
            u.open("GET", o, !0), u.timeout = 1e4, this.isXDomain() && (u.withCredentials = !0), u.onreadystatechange = function () {
              4 == u.readyState && (u.onreadystatechange = s, 200 == u.status ? i(u.responseText) : 403 == u.status ? (n.connecting = !1, n.onError(u.responseText), n.publish("handshake_failed")) : (n.connecting = !1, !n.reconnecting && n.onError(u.responseText), n.publish("handshake_failed")));
            }, u.ontimeout = function (e) {
              n.connecting = !1, !n.reconnecting && n.onError(u.responseText), n.publish("handshake_failed");
            }, u.send(null);
          }
        }, r.prototype.connect = function (e) {
          if (this.connecting) return this;
          var n = this;
          return n.connecting = !0, this.handshake(function (r, s, i, o) {
            n.sessionid = r, n.closeTimeout = 1e3 * i, n.heartbeatTimeout = 1e3 * s, n.transports || (n.transports = n.origTransports = o ? t.util.intersect(o.split(","), n.options.transports) : n.options.transports), console.log("SocketIO transports: " + n.transports + " opt:" + n.options.transports), n.setHeartbeatTimeout(), n.once("connect", function () {
              clearTimeout(n.connectTimeoutTimer), n.connectTimeoutTimer = null, e && "function" == typeof e && e();
            }), n.doConnect();
          }), this;
        }, r.prototype.doConnect = function () {
          var e = this;
          if (e.transport && e.transport.clearTimeouts(), e.transport = e.getTransport(e.transports), !e.transport) return e.publish("connect_failed");
          e.transport.ready(e, function () {
            e.connecting = !0, e.publish("connecting", e.transport.name), e.transport.open(), e.options["connect timeout"] && (e.connectTimeoutTimer && clearTimeout(e.connectTimeoutTimer), e.connectTimeoutTimer = setTimeout(e.tryNextTransport.bind(e), e.options["connect timeout"]));
          });
        }, r.prototype.getTransport = function (e) {
          for (var n, r = e || this.transports, s = 0; n = r[s]; s++) {
            if (console.log("SocketIO check " + n + " " + t.Transport[n].check(this) + " , cors " + t.Transport[n].xdomainCheck(this)), t.Transport[n] && t.Transport[n].check(this) && (!this.isXDomain() || t.Transport[n].xdomainCheck(this))) return new t.Transport[n](this, this.sessionid);
          }

          return null;
        }, r.prototype.tryNextTransport = function () {
          console.log("SocketIO try next transport");

          if (!this.connected && (this.connecting = !1, this.options["try multiple transports"])) {
            for (var e = this.transports; e.length > 0 && e.splice(0, 1)[0] != this.transport.name;) {
              ;
            }

            e.length ? this.doConnect() : this.publish("connect_failed");
          }
        }, r.prototype.setHeartbeatTimeout = function () {
          if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
            var e = this;
            this.heartbeatTimeoutTimer = setTimeout(function () {
              e.transport && e.transport.onClose();
            }, this.heartbeatTimeout);
          }
        }, r.prototype.packet = function (e) {
          return this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e), this;
        }, r.prototype.setBuffer = function (e) {
          this.doBuffer = e, !e && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer());
        }, r.prototype.flushBuffer = function () {
          this.transport.payload(this.buffer), this.buffer = [];
        }, r.prototype.disconnect = function () {
          return (this.connected || this.connecting) && (this.open && this.of("").packet({
            type: "disconnect"
          }), this.onDisconnect("booted")), this;
        }, r.prototype.disconnectSync = function () {
          var e = t.util.request(),
              n = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, t.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
          e.open("GET", n, !1), e.send(null), this.onDisconnect("booted");
        }, r.prototype.isXDomain = function () {
          var e = n.location.port || ("https:" == n.location.protocol ? 443 : 80);
          return this.options.host !== n.location.hostname || this.options.port != e;
        }, r.prototype.onConnect = function () {
          this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"));
        }, r.prototype.onOpen = function () {
          this.open = !0;
        }, r.prototype.onClose = function () {
          this.open = !1, clearTimeout(this.heartbeatTimeoutTimer);
        }, r.prototype.onPacket = function (e) {
          this.of(e.endpoint).onPacket(e);
        }, r.prototype.onError = function (e) {
          e && e.advice && "reconnect" === e.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", e && e.reason ? e.reason : e);
        }, r.prototype.onDisconnect = function (e) {
          var t = this.connected,
              n = this.connecting;
          this.connected = !1, this.connecting = !1, this.open = !1, (t || n) && (this.transport.close(), this.transport.clearTimeouts(), t && (this.publish("disconnect", e), "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()), n && this.tryNextTransport());
        }, r.prototype.reconnect = function () {
          this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
          var e = this,
              t = this.options["max reconnection attempts"],
              n = this.options["try multiple transports"],
              r = this.options["reconnection limit"];

          function s() {
            if (e.connected) {
              for (var t in e.namespaces) {
                e.namespaces.hasOwnProperty(t) && "" !== t && e.namespaces[t].packet({
                  type: "connect"
                });
              }

              e.publish("reconnect", e.transport.name, e.reconnectionAttempts);
            }

            clearTimeout(e.reconnectionTimer), e.removeListener("connect_failed", i), e.removeListener("connect", i), e.reconnecting = !1, delete e.reconnectionAttempts, delete e.reconnectionDelay, delete e.reconnectionTimer, delete e.redoTransports, e.options["try multiple transports"] = n;
          }

          function i() {
            if (e.reconnecting) return e.connected ? s() : e.connecting && e.reconnecting ? e.reconnectionTimer = setTimeout(i, 1e3) : void (e.reconnectionAttempts++ >= t ? e.redoTransports ? (e.publish("reconnect_failed"), s()) : (e.on("connect_failed", i), e.options["try multiple transports"] = !0, e.transports = e.origTransports, e.transport = e.getTransport(), e.redoTransports = !0, e.connect()) : (e.reconnectionDelay < r && (e.reconnectionDelay *= 2), e.connect(), e.publish("reconnecting", e.reconnectionDelay, e.reconnectionAttempts), e.reconnectionTimer = setTimeout(i, e.reconnectionDelay)));
          }

          this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(i, this.reconnectionDelay), this.on("connect", i);
        };
      }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports, root), function (e, t) {
        function n(e, t) {
          this.socket = e, this.name = t || "", this.flags = {}, this.json = new r(this, "json"), this.ackPackets = 0, this.acks = {};
        }

        function r(e, t) {
          this.namespace = e, this.name = t;
        }

        e.SocketNamespace = n, t.util.mixin(n, t.EventEmitter), n.prototype.$emit = t.EventEmitter.prototype.emit, n.prototype.of = function () {
          return this.socket.of.apply(this.socket, arguments);
        }, n.prototype.packet = function (e) {
          return e.endpoint = this.name, this.socket.packet(e), this.flags = {}, this;
        }, n.prototype.send = function (e, t) {
          var n = {
            type: this.flags.json ? "json" : "message",
            data: e
          };
          return "function" == typeof t && (n.id = ++this.ackPackets, n.ack = !0, this.acks[n.id] = t), this.packet(n);
        }, n.prototype.emit = function (e) {
          var t = Array.prototype.slice.call(arguments, 1),
              n = t[t.length - 1],
              r = {
            type: "event",
            name: e
          };
          return "function" == typeof n && (r.id = ++this.ackPackets, r.ack = "data", this.acks[r.id] = n, t = t.slice(0, t.length - 1)), r.args = t, this.packet(r);
        }, n.prototype.disconnect = function () {
          return "" === this.name ? this.socket.disconnect() : (this.packet({
            type: "disconnect"
          }), this.$emit("disconnect")), this;
        }, n.prototype.onPacket = function (e) {
          var n = this;

          function r() {
            n.packet({
              type: "ack",
              args: t.util.toArray(arguments),
              ackId: e.id
            });
          }

          switch (e.type) {
            case "connect":
              this.$emit("connect");
              break;

            case "disconnect":
              "" === this.name ? this.socket.onDisconnect(e.reason || "booted") : this.$emit("disconnect", e.reason);
              break;

            case "message":
            case "json":
              var s = ["message", e.data];
              "data" == e.ack ? s.push(r) : e.ack && this.packet({
                type: "ack",
                ackId: e.id
              }), this.$emit.apply(this, s);
              break;

            case "event":
              s = [e.name].concat(e.args);
              "data" == e.ack && s.push(r), this.$emit.apply(this, s);
              break;

            case "ack":
              this.acks[e.ackId] && (this.acks[e.ackId].apply(this, e.args), delete this.acks[e.ackId]);
              break;

            case "error":
              console.error("SocketIO on packet error: ", e), e.advice ? this.socket.onError(e) : "unauthorized" === e.reason ? this.$emit("connect_failed", e.reason) : this.$emit("error", e.reason);
          }
        }, r.prototype.send = function () {
          this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments);
        }, r.prototype.emit = function () {
          this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments);
        };
      }(void 0 !== io ? io : module.exports, void 0 !== io ? io : module.parent.exports), function (e, t, n) {
        function r(e) {
          t.Transport.apply(this, arguments);
        }

        e.websocket = r, t.util.inherit(r, t.Transport), r.prototype.name = "websocket", r.prototype.open = function () {
          var e,
              r = t.util.query(this.socket.options.query),
              s = this;
          return e || (e = n.MozWebSocket || n.WebSocket), this.websocket = new e(this.prepareUrl() + r), this.websocket.onopen = function () {
            s.onOpen(), s.socket.setBuffer(!1);
          }, this.websocket.onmessage = function (e) {
            s.onData(e.data);
          }, this.websocket.onclose = function () {
            s.socket.setBuffer(!0), s.onClose();
          }, this.websocket.onerror = function (e) {
            s.onError(e);
          }, this;
        }, t.util.ua.iDevice ? r.prototype.send = function (e) {
          var t = this;
          return setTimeout(function () {
            t.websocket.send(e);
          }, 0), this;
        } : r.prototype.send = function (e) {
          return this.websocket.send(e), this;
        }, r.prototype.payload = function (e) {
          for (var t = 0, n = e.length; t < n; t++) {
            this.packet(e[t]);
          }

          return this;
        }, r.prototype.close = function () {
          return this.websocket.close(), this;
        }, r.prototype.onError = function (e) {
          this.socket.onError(e);
        }, r.prototype.scheme = function () {
          return this.socket.options.secure ? "wss" : "ws";
        }, r.check = function () {
          return "WebSocket" in n && !("__addTask" in WebSocket) || "MozWebSocket" in n;
        }, r.xdomainCheck = function () {
          return !0;
        }, t.transports.push("websocket");
      }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root), function (e, t, n) {
        function r(e) {
          e && (t.Transport.apply(this, arguments), this.sendBuffer = []);
        }

        function s() {}

        e.XHR = r, t.util.inherit(r, t.Transport), r.prototype.open = function () {
          return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this;
        }, r.prototype.payload = function (e) {
          for (var n = [], r = 0, s = e.length; r < s; r++) {
            n.push(t.parser.encodePacket(e[r]));
          }

          this.send(t.parser.encodePayload(n));
        }, r.prototype.send = function (e) {
          return this.post(e), this;
        }, r.prototype.post = function (e) {
          var t = this;
          this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), n.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = function () {
            this.onload = s, t.socket.setBuffer(!1);
          } : this.sendXHR.onreadystatechange = function () {
            4 == this.readyState && (this.onreadystatechange = s, t.posting = !1, 200 == this.status ? t.socket.setBuffer(!1) : t.onClose());
          }, this.sendXHR.send(e);
        }, r.prototype.close = function () {
          return this.onClose(), this;
        }, r.prototype.request = function (e) {
          var n = t.util.request(this.socket.isXDomain()),
              r = t.util.query(this.socket.options.query, "t=" + +new Date());
          if (n.open(e || "GET", this.prepareUrl() + r, !0), "POST" == e) try {
            n.setRequestHeader ? n.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : n.contentType = "text/plain";
          } catch (e) {}
          return n;
        }, r.prototype.scheme = function () {
          return this.socket.options.secure ? "https" : "http";
        }, r.check = function (e, r) {
          try {
            var s = t.util.request(r),
                i = n.XDomainRequest && s instanceof XDomainRequest,
                o = e && e.options && e.options.secure ? "https:" : "http:",
                a = n.location && o != n.location.protocol;
            if (s && (!i || !a)) return !0;
          } catch (e) {}

          return !1;
        }, r.xdomainCheck = function (e) {
          return r.check(e, !0);
        };
      }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root), function (e, t, n) {
        function r() {
          t.Transport.XHR.apply(this, arguments);
        }

        function s() {}

        e["xhr-polling"] = r, t.util.inherit(r, t.Transport.XHR), t.util.merge(r, t.Transport.XHR), r.prototype.name = "xhr-polling", r.prototype.heartbeats = function () {
          return !1;
        }, r.prototype.open = function () {
          return t.Transport.XHR.prototype.open.call(this), !1;
        }, r.prototype.get = function () {
          if (this.isOpen) {
            var e = this;
            this.xhr = this.request(), n.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = function () {
              this.onload = s, this.onerror = s, e.retryCounter = 1, e.onData(this.responseText), e.get();
            }, this.xhr.onerror = function () {
              e.retryCounter++, !e.retryCounter || e.retryCounter > 3 ? e.onClose() : e.get();
            }) : this.xhr.onreadystatechange = function () {
              4 == this.readyState && (this.onreadystatechange = s, 200 == this.status ? (e.onData(this.responseText), e.get()) : e.onClose());
            }, this.xhr.send(null);
          }
        }, r.prototype.onClose = function () {
          if (t.Transport.XHR.prototype.onClose.call(this), this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = s;

            try {
              this.xhr.abort();
            } catch (e) {}

            this.xhr = null;
          }
        }, r.prototype.ready = function (e, n) {
          var r = this;
          t.util.defer(function () {
            n.call(r);
          });
        }, t.transports.push("xhr-polling");
      }(void 0 !== io ? io.Transport : module.exports, void 0 !== io ? io : module.parent.exports, root), __WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return io;
      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }();
  }).call(this, __webpack_require__(47), __webpack_require__(153)(module));
}, function (e, t, n) {
  "use strict";

  var r = {
    1: "ROOM_CLOSE",
    2: "ROOM_JOIN",
    3: "INVITE",
    4: "CANCEL_INVITE",
    5: "REJECT",
    6: "ACCEPT",
    7: "LEAVE",
    8: "CONTROL"
  },
      s = {
    1: "accid",
    2: "uid",
    3: "createTime",
    4: "expireTime",
    5: "web_uid"
  },
      i = {
    10404: "ROOM_NOT_EXISTS",
    10405: "ROOM_HAS_EXISTS",
    10406: "ROOM_MEMBER_NOT_EXISTS",
    10407: "ROOM_MEMBER_HAS_EXISTS",
    10408: "INVITE_NOT_EXISTS",
    10409: "INVITE_HAS_REJECT",
    10410: "INVITE_HAS_ACCEPT",
    10201: "PEER_NIM_OFFLINE",
    10202: "PEER_PUSH_OFFLINE",
    10419: "ROOM_MEMBER_EXCEED",
    10420: "ROOM_MEMBER_HAS_EXISTS_OTHER_CLIENT",
    10417: "UID_CONFLICT"
  };
  e.exports = {
    parseAvSignalType: function parseAvSignalType(e) {
      return r[e] || e;
    },
    parseAvSignalMember: function parseAvSignalMember(e) {
      var t = {};
      return Object.keys(e).forEach(function (n) {
        t[s[n]] = e[n];
      }), t;
    },
    parseAvSignalError: function parseAvSignalError(e) {
      return e.message = i[e.code] || e.message || e, e;
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = {
    stripmeta: 0,
    blur: 2,
    quality: 3,
    crop: 4,
    rotate: 5,
    thumbnail: 7,
    interlace: 9
  },
      i = {
    0: "stripmeta",
    1: "type",
    2: "blur",
    3: "quality",
    4: "crop",
    5: "rotate",
    6: "pixel",
    7: "thumbnail",
    8: "watermark",
    9: "interlace",
    10: "tmp"
  };

  function o(e) {
    r.verifyOptions(e, "type", "image::ImageOp"), r.verifyParamValid("type", e.type, o.validTypes, "image::ImageOp"), r.merge(this, e), this.type = s[e.type];
  }

  o.validTypes = Object.keys(s), o.reverse = function (e) {
    var t = r.copy(e);
    return t.type = i[t.type], t;
  }, o.reverseImageOps = function (e) {
    return e.map(function (e) {
      return o.reverse(e);
    });
  }, e.exports = o;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = {
    fromDataURL: function fromDataURL(e) {
      var t = r.getGlobal(),
          n = void 0;
      n = e.split(",")[0].indexOf("base64") >= 0 ? t.atob(e.split(",")[1]) : t.decodeURIComponent(e.split(",")[1]);

      for (var s = e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(n.length), o = 0; o < n.length; o++) {
        i[o] = n.charCodeAt(o);
      }

      return new t.Blob([i], {
        type: s
      });
    }
  };
  e.exports = s;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = {
    file: {
      md5: "$(Etag)",
      size: "$(ObjectSize)"
    },
    image: {
      md5: "$(Etag)",
      size: "$(ObjectSize)",
      w: "$(ImageInfo.Width)",
      h: "$(ImageInfo.Height)",
      orientation: "$(ImageInfo.Orientation)"
    },
    audio: {
      md5: "$(Etag)",
      size: "$(ObjectSize)",
      dur: "$(AVinfo.Audio.Duration)"
    },
    video: {
      md5: "$(Etag)",
      size: "$(ObjectSize)",
      dur: "$(AVinfo.Video.Duration)",
      w: "$(AVinfo.Video.Width)",
      h: "$(AVinfo.Video.Height)"
    }
  },
      i = {
    genResponseBody: function genResponseBody(e) {
      return s[e = e || "file"];
    },
    parseResponse: function parseResponse(e, t) {
      r.notundef(e.size) && (e.size = +e.size), r.notundef(e.w) && (e.w = +e.w), r.notundef(e.h) && (e.h = +e.h), r.notundef(e.dur) && (e.dur = +e.dur);
      var n = e.orientation;

      if (r.notundef(n) && (delete e.orientation, t && ("right, top" === n || "left, bottom" === n))) {
        var s = e.w;
        e.w = e.h, e.h = s;
      }

      return e;
    }
  };
  e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = r.getGlobal(),
      i = {},
      o = s.name || "_parent",
      a = [],
      c = [];

  i.addMsgListener = function (e) {
    a.push(e);
  };

  var u,
      l,
      m,
      d,
      p = (u = /^([\w]+?:\/\/.*?(?=\/|$))/i, function (e) {
    return e = e || "", u.test(e) ? RegExp.$1 : "*";
  }),
      f = function f() {
    var e = unescape(s.name || "").trim();

    if (e && 0 === e.indexOf("MSG|")) {
      s.name = "";
      var t = r.string2object(e.replace("MSG|", ""), "|"),
          n = (t.origin || "").toLowerCase();
      n && "*" !== n && 0 !== location.href.toLowerCase().indexOf(n) || function (e) {
        for (var t = 0, n = a.length; t < n; t++) {
          try {
            a[t].call(null, e);
          } catch (e) {}
        }
      }({
        data: JSON.parse(t.data || "null"),
        source: s.frames[t.self] || t.self,
        origin: p(t.ref || document.referrer)
      });
    }
  },
      g = (m = function m(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      if (e[n] === t) return !0;
    }

    return !1;
  }, function () {
    if (c.length) {
      l = [];

      for (var e, t = c.length - 1; t >= 0; t--) {
        e = c[t], m(l, e.w) || (l.push(e.w), c.splice(t, 1), e.w.name = e.d);
      }

      l = null;
    }
  }),
      h = i.startTimer = (d = !1, function () {
    d || (d = !0, s.postMessage || (setInterval(g, 100), setInterval(f, 20)));
  });

  i.postMessage = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};

    if (r.fillUndef(t, {
      origin: "*",
      source: o
    }), s.postMessage) {
      var n = t.data;
      s.FormData || (n = JSON.stringify(n)), e.postMessage(n, t.origin);
    } else {
      if (h(), r.isObject(t)) {
        var i = {};
        i.origin = t.origin || "", i.ref = location.href, i.self = t.source, i.data = JSON.stringify(t.data), t = "MSG|" + r.object2string(i, "|", !0);
      }

      c.unshift({
        w: e,
        d: escape(t)
      });
    }
  }, e.exports = i;
}, function (e, t) {
  e.exports = function (e, t) {
    var n = t.split(".");

    for (; n.length;) {
      var r = n.shift(),
          s = !1;
      if ("?" == r[r.length - 1] && (r = r.slice(0, -1), s = !0), !(e = e[r]) && s) return e;
    }

    return e;
  };
}, function (e, t) {
  e.exports = function e(t, n) {
    "use strict";

    var r,
        s,
        i = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
        o = /(^[ ]*|[ ]*$)/g,
        a = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        c = /^0x[0-9a-f]+$/i,
        u = /^0/,
        l = function l(t) {
      return e.insensitive && ("" + t).toLowerCase() || "" + t;
    },
        m = l(t).replace(o, "") || "",
        d = l(n).replace(o, "") || "",
        p = m.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
        f = d.replace(i, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
        g = parseInt(m.match(c), 16) || 1 !== p.length && m.match(a) && Date.parse(m),
        h = parseInt(d.match(c), 16) || g && d.match(a) && Date.parse(d) || null;

    if (h) {
      if (g < h) return -1;
      if (g > h) return 1;
    }

    for (var y = 0, v = Math.max(p.length, f.length); y < v; y++) {
      if (r = !(p[y] || "").match(u) && parseFloat(p[y]) || p[y] || 0, s = !(f[y] || "").match(u) && parseFloat(f[y]) || f[y] || 0, isNaN(r) !== isNaN(s)) return isNaN(r) ? 1 : -1;
      if (_typeof(r) != _typeof(s) && (r += "", s += ""), r < s) return -1;
      if (r > s) return 1;
    }

    return 0;
  };
}, function (e, t, n) {
  "use strict";

  e.exports = {};
}, function (e, t, n) {
  "use strict";

  var r = i(n(19)),
      s = i(n(18));

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }

  var o = n(87),
      a = 0,
      c = 1,
      u = 3,
      l = function () {
    function e(t, n) {
      var s = this;
      if ((0, r.default)(this, e), !t) throw new TypeError("Failed to construct 'WebSocket': url required");
      if (n && (!wx.canIUse || !wx.canIUse("connectSocket.object.protocols"))) throw new Error("subprotocal not supported in weapp");
      t = t.replace(/:\d+/, ""), this._url = t, this._protocal = n || "", this._readyState = a, this._socketTask = wx.connectSocket({
        url: t,
        protocals: this._protocal,
        fail: function fail(e) {
          console.info("wx::ws: sockets build failed ..."), s.errorHandler(e);
        },
        success: function success(e) {
          console.log("wx::ws: sockets build succeed ...");
        }
      }), this._socketTask.onOpen(function (e) {
        s._readyState = c, console.log("wx::ws: onopen ", e), s.dispatchEvent({
          type: "open"
        });
      }), this._socketTask.onError(function (e) {
        s.errorHandler(e);
      }), this._socketTask.onClose(function (e) {
        s._readyState = u, console.log("wx::ws: onclose ", e);
        var t = e.code,
            n = e.reason,
            r = e.wasClean;
        s.dispatchEvent({
          code: t,
          reason: n,
          wasClean: r,
          type: "close"
        }), s._socketTask = null;
      }), this._socketTask.onMessage(function (e) {
        var t = e.data,
            n = e.origin,
            r = e.ports,
            i = e.source;
        s.dispatchEvent({
          data: t,
          origin: n,
          ports: r,
          source: i,
          type: "message"
        });
      });
    }

    return (0, s.default)(e, [{
      key: "dispatchEvent",
      value: function value(e) {
        var t = "on" + e.type;
        "function" == typeof this[t] && this[t](e);
      }
    }, {
      key: "close",
      value: function value() {
        try {
          console.log("wx::ws:close WebSocket force close: readystate " + this._readyState), this._socketTask.close({
            code: 1e3,
            reason: "wx::ws:user force close websocket",
            complete: function complete() {}
          });
        } catch (e) {
          console.warn("wx::ws:close WebSocket force error", e);
        }
      }
    }, {
      key: "send",
      value: function value(e) {
        if (this._readyState !== c) throw new Error("wx:ws: sendMsg when readyState=" + this._readyState);
        if (!("string" == typeof e || e instanceof ArrayBuffer)) throw new TypeError("wx:ws: sendMsg only String/ArrayBuffer supported");

        this._socketTask.send({
          data: e
        });
      }
    }, {
      key: "errorHandler",
      value: function value(e) {
        console.error("wx::ws: onerror ", e), this._readyState = u, this.dispatchEvent({
          type: "error",
          message: e.errMsg
        }), (e.errMsg.indexOf("断裂管道") > 0 || e.errMsg.indexOf("broken pipe") > 0) && this.dispatchEvent({
          code: 1006,
          reason: e.errMsg,
          type: "close"
        }), this._socketTask = null;
      }
    }, {
      key: "url",
      get: function get() {
        return this._url;
      }
    }, {
      key: "protocal",
      get: function get() {
        return this._protocal;
      }
    }, {
      key: "readyState",
      get: function get() {
        return this._readyState;
      }
    }]), e;
  }();

  o(l, {
    CONNECTING: a,
    OPEN: c,
    CLOSING: 2,
    CLOSED: u
  }), e.exports = l;
}, function (e, t, n) {
  "use strict";
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  var r = Object.getOwnPropertySymbols,
      s = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
  e.exports = function () {
    try {
      if (!Object.assign) return !1;
      var e = new String("abc");
      if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;

      for (var t = {}, n = 0; n < 10; n++) {
        t["_" + String.fromCharCode(n)] = n;
      }

      if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
        return t[e];
      }).join("")) return !1;
      var r = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (e) {
        r[e] = e;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
    } catch (e) {
      return !1;
    }
  }() ? Object.assign : function (e, t) {
    for (var n, o, a = function (e) {
      if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(e);
    }(e), c = 1; c < arguments.length; c++) {
      for (var u in n = Object(arguments[c])) {
        s.call(n, u) && (a[u] = n[u]);
      }

      if (r) {
        o = r(n);

        for (var l = 0; l < o.length; l++) {
          i.call(n, o[l]) && (a[o[l]] = n[o[l]]);
        }
      }
    }

    return a;
  };
}, function (e, t, n) {
  "use strict";

  var r = o(n(174)),
      s = o(n(19)),
      i = o(n(18));

  function o(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }

  var a = n(87),
      c = n(60),
      u = 0,
      l = 4;

  function m(e) {
    this.status = e.statusCode, this.statusText = e.statusCode, e.header && (this._responseHeaders = Object.keys(e.header).reduce(function (t, n) {
      return t[n.toLowerCase()] = e.header[n], t;
    }, {}));
    var t = e.data;
    "string" != typeof t && (t = JSON.stringify(t)), this.responseText = this.response = t, this.readyState = l, this.dispatchEvent({
      type: "readystatechange"
    });
  }

  var d = function () {
    function e() {
      (0, s.default)(this, e);
    }

    return (0, i.default)(e, [{
      key: "dispatchEvent",
      value: function value(e) {
        var t = "on" + e.type;
        "function" == typeof this[t] && this[t](e);
      }
    }]), e;
  }(),
      p = function () {
    function e() {
      (0, s.default)(this, e), this.readyState = u, this._headers = {}, this.upload = new d();
    }

    return (0, i.default)(e, [{
      key: "dispatchEvent",
      value: function value(e) {
        var t = "on" + e.type;
        "function" == typeof this[t] && this[t](e);
      }
    }, {
      key: "abort",
      value: function value() {
        if (!this._request || this._request.abort) return this.status = 0, this.readyState = l, this._request.abort();
        throw new Error("该版本基础库不支持 abort request");
      }
    }, {
      key: "getAllResponseHeaders",
      value: function value() {
        var e = this;
        return this._responseHeaders ? Object.keys(this._responseHeaders).map(function (t) {
          return t + ": " + e._responseHeaders[t];
        }).join("\r\n") : "";
      }
    }, {
      key: "getResponseHeader",
      value: function value(e) {
        var t = e.toLowerCase();
        return this._responseHeaders && this._responseHeaders[t] ? this._responseHeaders[t] : null;
      }
    }, {
      key: "overrideMimeType",
      value: function value() {
        throw new Error("not supported in weapp");
      }
    }, {
      key: "open",
      value: function value(e, t) {
        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        if (this.readyState !== u) throw new Error("request is already opened");
        if (!n) throw new Error("sync request is not supported");
        this._method = e, t = t.replace(/:\d+/, ""), this._url = t, this.readyState = 1, this.dispatchEvent({
          type: "readystatechange"
        });
      }
    }, {
      key: "setRequestHeader",
      value: function value(e, t) {
        if (1 !== this.readyState) throw new Error("request is not opened");
        this._headers[e.toLowerCase()] = t;
      }
    }, {
      key: "send",
      value: function value(e) {
        var t = this;
        if (1 !== this.readyState) throw new Error("request is not opened");

        if (e instanceof c) {
          var n = e.entries(),
              s = n.filter(function (e) {
            return "string" != typeof e[1];
          });
          if (0 === s.length) throw new Error("Must specify a Blob field in FormData");
          s.length > 1 && console.warn("Only the first Blob will be send in Weapp");
          var i = n.filter(function (e) {
            return "string" == typeof e[1];
          }).reduce(function (e, t) {
            return a(e, (0, r.default)({}, t[0], t[1]));
          }, {});
          this._request = wx.uploadFile({
            url: this._url,
            name: s[0][0],
            filePath: s[0][1].uri,
            formData: i,
            header: this._headers,
            success: m.bind(this),
            fail: function fail(e) {
              t.status = 0, t.readyState = l, t.dispatchEvent({
                type: "readystatechange"
              }), t.dispatchEvent({
                type: "error"
              });
            }
          }), this._request && this._request.onProgressUpdate && this._request.onProgressUpdate(function (e) {
            var n = e.totalBytesSent,
                r = e.totalBytesExpectedToSend;
            t.upload.dispatchEvent({
              type: "progress",
              loaded: n,
              total: r
            });
          });
        } else this._request = wx.request({
          url: this._url,
          data: e || "",
          method: this._method.toUpperCase(),
          header: this._headers,
          success: m.bind(this),
          fail: function fail(e) {
            t.status = 0, t.readyState = l, t.dispatchEvent({
              type: "readystatechange"
            }), t.dispatchEvent({
              type: "error"
            });
          }
        });
      }
    }]), e;
  }();

  a(p, {
    UNSENT: u,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: l
  }), e.exports = p;
}, function (e, t, n) {
  "use strict";

  var r = i(n(19)),
      s = i(n(18));

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }

  var o = function () {
    function e() {
      (0, r.default)(this, e);
    }

    return (0, s.default)(e, [{
      key: "getItem",
      value: function value(e) {
        return wx.getStorageSync(e);
      }
    }, {
      key: "setItem",
      value: function value(e, t) {
        return wx.setStorageSync(e, t);
      }
    }, {
      key: "removeItem",
      value: function value(e) {
        return this.setItem(e, "");
      }
    }, {
      key: "clear",
      value: function value() {
        return wx.clearStorageSync();
      }
    }]), e;
  }();

  e.exports = new o();
}, function (e, t, n) {
  var r = n(29),
      s = n(25),
      i = n(13),
      o = n(40),
      a = n(9),
      c = n(65),
      u = Object.getOwnPropertyDescriptor;
  t.f = n(10) ? u : function (e, t) {
    if (e = i(e), t = o(t, !0), c) try {
      return u(e, t);
    } catch (e) {}
    if (a(e, t)) return s(!r.f.call(e, t), e[t]);
  };
},,, function (e, t, n) {
  "use strict";

  var r = n(45),
      s = n(137),
      i = n(77),
      o = n(84),
      a = n(83),
      c = n(0),
      u = n(131),
      l = n(80),
      m = n(26),
      d = n(130),
      p = n(129);

  e.exports = function (e) {
    c.merge(e, {
      platform: r,
      xhr: s,
      io: i,
      naturalSort: o,
      deepAccess: a,
      util: c,
      support: u,
      blob: l,
      ajax: m,
      LoggerPlugin: d,
      usePlugin: p
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = n(57),
      i = r.merge({}, s.idMap, {
    auth: {
      id: 2,
      login: 3,
      kicked: 5,
      logout: 6,
      multiPortLogin: 7,
      kick: 8
    },
    user: {
      id: 3,
      updatePushToken: 1,
      appBackground: 2,
      markInBlacklist: 3,
      getBlacklist: 4,
      markInMutelist: 5,
      getMutelist: 6,
      getRelations: 8,
      getUsers: 7,
      updateMyInfo: 10,
      updateDonnop: 15,
      syncMyInfo: 109,
      syncUpdateMyInfo: 110
    },
    notify: {
      id: 4,
      markRead: 3,
      syncOfflineMsgs: 4,
      batchMarkRead: 5,
      syncOfflineSysMsgs: 6,
      syncRoamingMsgs: 9,
      syncMsgReceipts: 12,
      syncRobots: 15,
      syncBroadcastMsgs: 16
    },
    sync: {
      id: 5,
      sync: 1,
      syncTeamMembers: 2
    },
    msg: {
      id: 7,
      sendMsg: 1,
      msg: 2,
      sysMsg: 3,
      getHistoryMsgs: 6,
      sendCustomSysMsg: 7,
      searchHistoryMsgs: 8,
      deleteSessions: 9,
      getSessions: 10,
      syncSendMsg: 101,
      sendMsgReceipt: 11,
      msgReceipt: 12,
      deleteMsg: 13,
      msgDeleted: 14,
      markSessionAck: 16,
      broadcastMsg: 17
    },
    team: {
      id: 8,
      createTeam: 1,
      sendTeamMsg: 2,
      teamMsg: 3,
      teamMsgs: 4,
      addTeamMembers: 5,
      removeTeamMembers: 6,
      updateTeam: 7,
      leaveTeam: 8,
      getTeam: 9,
      getTeams: 10,
      getTeamMembers: 11,
      dismissTeam: 12,
      applyTeam: 13,
      passTeamApply: 14,
      rejectTeamApply: 15,
      addTeamManagers: 16,
      removeTeamManagers: 17,
      transferTeam: 18,
      updateInfoInTeam: 19,
      updateNickInTeam: 20,
      acceptTeamInvite: 21,
      rejectTeamInvite: 22,
      getTeamHistoryMsgs: 23,
      searchTeamHistoryMsgs: 24,
      updateMuteStateInTeam: 25,
      getMyTeamMembers: 26,
      getMutedTeamMembers: 27,
      sendTeamMsgReceipt: 28,
      getTeamMsgReads: 29,
      getTeamMsgReadAccounts: 30,
      notifyTeamMsgReads: 31,
      muteTeamAll: 32,
      syncMyTeamMembers: 126,
      syncTeams: 109,
      syncTeamMembers: 111,
      syncCreateTeam: 101,
      syncSendTeamMsg: 102,
      syncUpdateTeamMember: 119
    },
    friend: {
      id: 12,
      friendRequest: 1,
      syncFriendRequest: 101,
      deleteFriend: 2,
      syncDeleteFriend: 102,
      updateFriend: 3,
      syncUpdateFriend: 103,
      getFriends: 4
    },
    chatroom: {
      id: 13,
      getChatroomAddress: 1
    },
    filter: {
      id: 101,
      sendFilterMsg: 1,
      filterMsg: 2,
      filterSysMsg: 3,
      sendFilterCustomSysMsg: 7
    },
    eventService: {
      id: 14,
      publishEvent: 1,
      pushEvent: 2,
      subscribeEvent: 3,
      unSubscribeEventsByAccounts: 4,
      unSubscribeEventsByType: 5,
      querySubscribeEventsByAccounts: 6,
      querySubscribeEventsByType: 7,
      pushEvents: 9
    }
  }),
      o = r.merge({}, s.cmdConfig, {
    login: {
      sid: i.auth.id,
      cid: i.auth.login,
      params: [{
        type: "Property",
        name: "login"
      }]
    },
    logout: {
      sid: i.auth.id,
      cid: i.auth.logout
    },
    kick: {
      sid: i.auth.id,
      cid: i.auth.kick,
      params: [{
        type: "StrArray",
        name: "deviceIds"
      }]
    },
    updatePushToken: {
      sid: i.user.id,
      cid: i.user.updatePushToken,
      params: [{
        type: "String",
        name: "tokenName"
      }, {
        type: "String",
        name: "token"
      }, {
        type: "int",
        name: "pushkit"
      }]
    },
    appBackground: {
      sid: i.user.id,
      cid: i.user.appBackground,
      params: [{
        type: "bool",
        name: "isBackground"
      }, {
        type: "Int",
        name: "badge"
      }]
    },
    markInBlacklist: {
      sid: i.user.id,
      cid: i.user.markInBlacklist,
      params: [{
        type: "String",
        name: "account"
      }, {
        type: "bool",
        name: "isAdd"
      }]
    },
    getBlacklist: {
      sid: i.user.id,
      cid: i.user.getBlacklist,
      params: [{
        type: "long",
        name: "time"
      }]
    },
    markInMutelist: {
      sid: i.user.id,
      cid: i.user.markInMutelist,
      params: [{
        type: "String",
        name: "account"
      }, {
        type: "bool",
        name: "isAdd"
      }]
    },
    getMutelist: {
      sid: i.user.id,
      cid: i.user.getMutelist,
      params: [{
        type: "long",
        name: "time"
      }]
    },
    getRelations: {
      sid: i.user.id,
      cid: i.user.getRelations,
      params: [{
        type: "long",
        name: "timetag"
      }]
    },
    getUsers: {
      sid: i.user.id,
      cid: i.user.getUsers,
      params: [{
        type: "StrArray",
        name: "accounts"
      }]
    },
    updateMyInfo: {
      sid: i.user.id,
      cid: i.user.updateMyInfo,
      params: [{
        type: "Property",
        name: "user"
      }]
    },
    updateDonnop: {
      sid: i.user.id,
      cid: i.user.updateDonnop,
      params: [{
        type: "Property",
        name: "donnop"
      }]
    },
    markRead: {
      sid: i.notify.id,
      cid: i.notify.markRead,
      params: [{
        type: "long",
        name: "id"
      }, {
        type: "ph",
        name: "ph"
      }]
    },
    batchMarkRead: {
      sid: i.notify.id,
      cid: i.notify.batchMarkRead,
      params: [{
        type: "byte",
        name: "sid"
      }, {
        type: "byte",
        name: "cid"
      }, {
        type: "LongArray",
        name: "ids"
      }]
    },
    sync: {
      sid: i.sync.id,
      cid: i.sync.sync,
      params: [{
        type: "Property",
        name: "sync"
      }]
    },
    syncTeamMembers: {
      sid: i.sync.id,
      cid: i.sync.syncTeamMembers,
      params: [{
        type: "LongLongMap",
        name: "sync"
      }]
    },
    sendMsg: {
      sid: i.msg.id,
      cid: i.msg.sendMsg,
      params: [{
        type: "Property",
        name: "msg"
      }]
    },
    getHistoryMsgs: {
      sid: i.msg.id,
      cid: i.msg.getHistoryMsgs,
      params: [{
        type: "String",
        name: "to"
      }, {
        type: "long",
        name: "beginTime"
      }, {
        type: "long",
        name: "endTime"
      }, {
        type: "long",
        name: "lastMsgId"
      }, {
        type: "int",
        name: "limit"
      }, {
        type: "bool",
        name: "reverse"
      }, {
        type: "LongArray",
        name: "msgTypes"
      }]
    },
    sendCustomSysMsg: {
      sid: i.msg.id,
      cid: i.msg.sendCustomSysMsg,
      params: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    searchHistoryMsgs: {
      sid: i.msg.id,
      cid: i.msg.searchHistoryMsgs,
      params: [{
        type: "String",
        name: "to"
      }, {
        type: "long",
        name: "beginTime"
      }, {
        type: "long",
        name: "endTime"
      }, {
        type: "String",
        name: "keyword"
      }, {
        type: "int",
        name: "limit"
      }, {
        type: "bool",
        name: "reverse"
      }]
    },
    getSessions: {
      sid: i.msg.id,
      cid: i.msg.getSessions,
      params: [{
        type: "long",
        name: "time"
      }]
    },
    deleteSessions: {
      sid: i.msg.id,
      cid: i.msg.deleteSessions,
      params: [{
        type: "StrArray",
        name: "sessions"
      }]
    },
    sendMsgReceipt: {
      sid: i.msg.id,
      cid: i.msg.sendMsgReceipt,
      params: [{
        type: "Property",
        name: "msgReceipt"
      }]
    },
    deleteMsg: {
      sid: i.msg.id,
      cid: i.msg.deleteMsg,
      params: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    markSessionAck: {
      sid: i.msg.id,
      cid: i.msg.markSessionAck,
      params: [{
        type: "byte",
        name: "scene"
      }, {
        type: "String",
        name: "to"
      }, {
        type: "long",
        name: "timetag"
      }]
    },
    createTeam: {
      sid: i.team.id,
      cid: i.team.createTeam,
      params: [{
        type: "Property",
        name: "team"
      }, {
        type: "StrArray",
        name: "accounts"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    sendTeamMsg: {
      sid: i.team.id,
      cid: i.team.sendTeamMsg,
      params: [{
        type: "Property",
        name: "msg"
      }]
    },
    addTeamMembers: {
      sid: i.team.id,
      cid: i.team.addTeamMembers,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "StrArray",
        name: "accounts"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    removeTeamMembers: {
      sid: i.team.id,
      cid: i.team.removeTeamMembers,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    updateTeam: {
      sid: i.team.id,
      cid: i.team.updateTeam,
      params: [{
        type: "Property",
        name: "team"
      }]
    },
    leaveTeam: {
      sid: i.team.id,
      cid: i.team.leaveTeam,
      params: [{
        type: "long",
        name: "teamId"
      }]
    },
    getTeam: {
      sid: i.team.id,
      cid: i.team.getTeam,
      params: [{
        type: "long",
        name: "teamId"
      }]
    },
    getTeams: {
      sid: i.team.id,
      cid: i.team.getTeams,
      params: [{
        type: "long",
        name: "timetag"
      }]
    },
    getTeamMembers: {
      sid: i.team.id,
      cid: i.team.getTeamMembers,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "long",
        name: "timetag"
      }]
    },
    dismissTeam: {
      sid: i.team.id,
      cid: i.team.dismissTeam,
      params: [{
        type: "long",
        name: "teamId"
      }]
    },
    applyTeam: {
      sid: i.team.id,
      cid: i.team.applyTeam,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    passTeamApply: {
      sid: i.team.id,
      cid: i.team.passTeamApply,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "from"
      }]
    },
    rejectTeamApply: {
      sid: i.team.id,
      cid: i.team.rejectTeamApply,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "from"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    addTeamManagers: {
      sid: i.team.id,
      cid: i.team.addTeamManagers,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    removeTeamManagers: {
      sid: i.team.id,
      cid: i.team.removeTeamManagers,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    transferTeam: {
      sid: i.team.id,
      cid: i.team.transferTeam,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "account"
      }, {
        type: "bool",
        name: "leave"
      }]
    },
    updateInfoInTeam: {
      sid: i.team.id,
      cid: i.team.updateInfoInTeam,
      params: [{
        type: "Property",
        name: "teamMember"
      }]
    },
    updateNickInTeam: {
      sid: i.team.id,
      cid: i.team.updateNickInTeam,
      params: [{
        type: "Property",
        name: "teamMember"
      }]
    },
    acceptTeamInvite: {
      sid: i.team.id,
      cid: i.team.acceptTeamInvite,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "from"
      }]
    },
    rejectTeamInvite: {
      sid: i.team.id,
      cid: i.team.rejectTeamInvite,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "from"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    getTeamHistoryMsgs: {
      sid: i.team.id,
      cid: i.team.getTeamHistoryMsgs,
      params: [{
        type: "long",
        name: "to"
      }, {
        type: "long",
        name: "beginTime"
      }, {
        type: "long",
        name: "endTime"
      }, {
        type: "long",
        name: "lastMsgId"
      }, {
        type: "int",
        name: "limit"
      }, {
        type: "bool",
        name: "reverse"
      }, {
        type: "LongArray",
        name: "msgTypes"
      }]
    },
    searchTeamHistoryMsgs: {
      sid: i.team.id,
      cid: i.team.searchTeamHistoryMsgs,
      params: [{
        type: "long",
        name: "to"
      }, {
        type: "long",
        name: "beginTime"
      }, {
        type: "long",
        name: "endTime"
      }, {
        type: "String",
        name: "keyword"
      }, {
        type: "int",
        name: "limit"
      }, {
        type: "bool",
        name: "reverse"
      }]
    },
    updateMuteStateInTeam: {
      sid: i.team.id,
      cid: i.team.updateMuteStateInTeam,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "String",
        name: "account"
      }, {
        type: "int",
        name: "mute"
      }]
    },
    getMyTeamMembers: {
      sid: i.team.id,
      cid: i.team.getMyTeamMembers,
      params: [{
        type: "LongArray",
        name: "teamIds"
      }]
    },
    getMutedTeamMembers: {
      sid: i.team.id,
      cid: i.team.getMutedTeamMembers,
      params: [{
        type: "long",
        name: "teamId"
      }]
    },
    sendTeamMsgReceipt: {
      sid: i.team.id,
      cid: i.team.sendTeamMsgReceipt,
      params: [{
        type: "PropertyArray",
        name: "teamMsgReceipts",
        entity: "teamMsgReceipt"
      }]
    },
    getTeamMsgReads: {
      sid: i.team.id,
      cid: i.team.getTeamMsgReads,
      params: [{
        type: "PropertyArray",
        name: "teamMsgReceipts",
        entity: "teamMsgReceipt"
      }]
    },
    getTeamMsgReadAccounts: {
      sid: i.team.id,
      cid: i.team.getTeamMsgReadAccounts,
      params: [{
        type: "Property",
        name: "teamMsgReceipt"
      }]
    },
    muteTeamAll: {
      sid: i.team.id,
      cid: i.team.muteTeamAll,
      params: [{
        type: "long",
        name: "teamId"
      }, {
        type: "int",
        name: "muteType"
      }]
    },
    friendRequest: {
      sid: i.friend.id,
      cid: i.friend.friendRequest,
      params: [{
        type: "String",
        name: "account"
      }, {
        type: "byte",
        name: "type"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    deleteFriend: {
      sid: i.friend.id,
      cid: i.friend.deleteFriend,
      params: [{
        type: "String",
        name: "account"
      }]
    },
    updateFriend: {
      sid: i.friend.id,
      cid: i.friend.updateFriend,
      params: [{
        type: "Property",
        name: "friend"
      }]
    },
    getFriends: {
      sid: i.friend.id,
      cid: i.friend.getFriends,
      params: [{
        type: "long",
        name: "timetag"
      }]
    },
    getChatroomAddress: {
      sid: i.chatroom.id,
      cid: i.chatroom.getChatroomAddress,
      params: [{
        type: "long",
        name: "chatroomId"
      }, {
        type: "bool",
        name: "isWeixinApp"
      }]
    },
    sendFilterMsg: {
      sid: i.filter.id,
      cid: i.filter.sendFilterMsg,
      params: [{
        type: "Property",
        name: "msg"
      }]
    },
    sendFilterCustomSysMsg: {
      sid: i.filter.id,
      cid: i.filter.sendFilterCustomSysMsg,
      params: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    publishEvent: {
      sid: i.eventService.id,
      cid: i.eventService.publishEvent,
      params: [{
        type: "Property",
        name: "msgEvent"
      }]
    },
    pushEvent: {
      sid: i.eventService.id,
      cid: i.eventService.pushEvent
    },
    subscribeEvent: {
      sid: i.eventService.id,
      cid: i.eventService.subscribeEvent,
      params: [{
        type: "Property",
        name: "msgEventSubscribe"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    unSubscribeEventsByAccounts: {
      sid: i.eventService.id,
      cid: i.eventService.unSubscribeEventsByAccounts,
      params: [{
        type: "Property",
        name: "msgEventSubscribe"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    unSubscribeEventsByType: {
      sid: i.eventService.id,
      cid: i.eventService.unSubscribeEventsByType,
      params: [{
        type: "Property",
        name: "msgEventSubscribe"
      }]
    },
    querySubscribeEventsByAccounts: {
      sid: i.eventService.id,
      cid: i.eventService.querySubscribeEventsByAccounts,
      params: [{
        type: "Property",
        name: "msgEventSubscribe"
      }, {
        type: "StrArray",
        name: "accounts"
      }]
    },
    querySubscribeEventsByType: {
      sid: i.eventService.id,
      cid: i.eventService.querySubscribeEventsByType,
      params: [{
        type: "Property",
        name: "msgEventSubscribe"
      }]
    },
    pushEvents: {
      sid: i.eventService.id,
      cid: i.eventService.pushEvents
    }
  }),
      a = r.merge({}, s.packetConfig, {
    "2_3": {
      service: "auth",
      cmd: "login",
      response: [{
        type: "Property",
        name: "loginRes"
      }, {
        type: "PropertyArray",
        name: "loginPorts",
        entity: "loginPort"
      }, {
        type: "Property",
        name: "aosPushInfo"
      }]
    },
    "2_5": {
      service: "auth",
      cmd: "kicked",
      response: [{
        type: "Number",
        name: "from"
      }, {
        type: "Number",
        name: "reason"
      }]
    },
    "2_6": {
      service: "auth",
      cmd: "logout"
    },
    "2_7": {
      service: "auth",
      cmd: "multiPortLogin",
      response: [{
        type: "Number",
        name: "state"
      }, {
        type: "PropertyArray",
        name: "loginPorts",
        entity: "loginPort"
      }]
    },
    "2_8": {
      service: "auth",
      cmd: "kick",
      response: [{
        type: "StrArray",
        name: "deviceIds"
      }]
    },
    "3_1": {
      service: "user",
      cmd: "updatePushToken"
    },
    "3_2": {
      service: "user",
      cmd: "appBackground"
    },
    "3_3": {
      service: "user",
      cmd: "markInBlacklist"
    },
    "3_103": {
      service: "user",
      cmd: "syncMarkInBlacklist",
      response: [{
        type: "String",
        name: "account"
      }, {
        type: "Boolean",
        name: "isAdd"
      }]
    },
    "3_4": {
      service: "user",
      cmd: "getBlacklist",
      response: [{
        type: "StrArray",
        name: "blacklist"
      }]
    },
    "3_5": {
      service: "user",
      cmd: "markInMutelist"
    },
    "3_105": {
      service: "user",
      cmd: "syncMarkInMutelist",
      response: [{
        type: "String",
        name: "account"
      }, {
        type: "Boolean",
        name: "isAdd"
      }]
    },
    "3_6": {
      service: "user",
      cmd: "getMutelist",
      response: [{
        type: "StrArray",
        name: "mutelist"
      }]
    },
    "3_8": {
      service: "user",
      cmd: "getRelations",
      response: [{
        type: "PropertyArray",
        name: "specialRelations",
        entity: "specialRelation"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "3_7": {
      service: "user",
      cmd: "getUsers",
      response: [{
        type: "PropertyArray",
        name: "users",
        entity: "user"
      }]
    },
    "3_10": {
      service: "user",
      cmd: "updateMyInfo",
      response: [{
        type: "Number",
        name: "timetag"
      }]
    },
    "3_15": {
      service: "user",
      cmd: "updateDonnop",
      response: [{
        type: "Number",
        name: "timetag"
      }]
    },
    "3_115": {
      service: "user",
      cmd: "syncUpdateDonnop",
      response: [{
        type: "Property",
        name: "donnop"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "3_109": {
      service: "user",
      cmd: "syncMyInfo",
      response: [{
        type: "Property",
        name: "user"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "3_110": {
      service: "user",
      cmd: "syncUpdateMyInfo",
      response: [{
        type: "Property",
        name: "user"
      }]
    },
    "4_1": {
      service: "notify"
    },
    "4_2": {
      service: "notify"
    },
    "4_3": {
      service: "notify",
      cmd: "markRead"
    },
    "4_4": {
      service: "notify",
      cmd: "syncOfflineMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "4_5": {
      service: "notify",
      cmd: "batchMarkRead"
    },
    "4_6": {
      service: "notify",
      cmd: "syncOfflineSysMsgs",
      response: [{
        type: "PropertyArray",
        name: "sysMsgs",
        entity: "sysMsg"
      }]
    },
    "4_9": {
      service: "notify",
      cmd: "syncRoamingMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "4_12": {
      service: "notify",
      cmd: "syncMsgReceipts",
      response: [{
        type: "PropertyArray",
        name: "msgReceipts",
        entity: "msgReceipt"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "4_13": {
      service: "notify",
      cmd: "syncDonnop",
      response: [{
        type: "Property",
        name: "donnop"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "4_14": {
      service: "notify",
      cmd: "syncSessionAck",
      response: [{
        type: "StrLongMap",
        name: "p2p"
      }, {
        type: "LongLongMap",
        name: "team"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "4_15": {
      service: "notify",
      cmd: "syncRobots",
      response: [{
        type: "PropertyArray",
        name: "robots",
        entity: "robot"
      }]
    },
    "4_16": {
      service: "notify",
      cmd: "syncBroadcastMsgs",
      response: [{
        type: "PropertyArray",
        name: "broadcastMsgs",
        entity: "broadcastMsg"
      }]
    },
    "4_100": {
      service: "notify",
      cmd: "syncOfflineFilterMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "4_101": {
      service: "notify",
      cmd: "syncOfflineFilterSysMsgs",
      response: [{
        type: "PropertyArray",
        name: "sysMsgs",
        entity: "sysMsg"
      }]
    },
    "5_1": {
      service: "sync",
      cmd: "syncDone",
      response: [{
        type: "Number",
        name: "timetag"
      }]
    },
    "5_2": {
      service: "sync",
      cmd: "syncTeamMembersDone",
      response: [{
        type: "Number",
        name: "timetag"
      }]
    },
    "7_1": {
      service: "msg",
      cmd: "sendMsg",
      response: [{
        type: "Property",
        name: "msg"
      }],
      trivialErrorCodes: [7101]
    },
    "7_2": {
      service: "msg",
      cmd: "msg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "7_3": {
      service: "msg",
      cmd: "sysMsg",
      response: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    "7_6": {
      service: "msg",
      cmd: "getHistoryMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "7_7": {
      service: "msg",
      cmd: "sendCustomSysMsg",
      trivialErrorCodes: [7101]
    },
    "7_8": {
      service: "msg",
      cmd: "searchHistoryMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "7_9": {
      service: "msg",
      cmd: "deleteSessions"
    },
    "7_10": {
      service: "msg",
      cmd: "getSessions",
      response: [{
        type: "StrArray",
        name: "sessions"
      }]
    },
    "7_101": {
      service: "msg",
      cmd: "syncSendMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "7_11": {
      service: "msg",
      cmd: "sendMsgReceipt",
      response: [{
        type: "Property",
        name: "msgReceipt"
      }]
    },
    "7_12": {
      service: "msg",
      cmd: "msgReceipt",
      response: [{
        type: "Property",
        name: "msgReceipt"
      }]
    },
    "7_13": {
      service: "msg",
      cmd: "onDeleteMsg"
    },
    "7_14": {
      service: "msg",
      cmd: "onMsgDeleted",
      response: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    "7_15": {
      service: "msg",
      cmd: "onDeleteMsgOfflineRoaming",
      response: [{
        type: "PropertyArray",
        name: "sysMsgs",
        entity: "sysMsg"
      }, {
        type: "Number",
        name: "timetag"
      }, {
        type: "Number",
        name: "type"
      }]
    },
    "7_16": {
      service: "msg",
      cmd: "onMarkSessionAck"
    },
    "7_17": {
      service: "msg",
      cmd: "broadcastMsg",
      response: [{
        type: "Property",
        name: "broadcastMsg"
      }]
    },
    "7_116": {
      service: "msg",
      cmd: "syncMarkSessionAck",
      response: [{
        type: "Number",
        name: "scene"
      }, {
        type: "String",
        name: "to"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "8_1": {
      service: "team",
      cmd: "createTeam",
      response: [{
        type: "Property",
        name: "team"
      }, {
        type: "StrArray",
        name: "abortedAccidList"
      }]
    },
    "8_2": {
      service: "team",
      cmd: "sendTeamMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "8_3": {
      service: "team",
      cmd: "teamMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "8_4": {
      service: "team",
      cmd: "teamMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "8_5": {
      service: "team",
      cmd: "addTeamMembers",
      response: [{
        type: "long",
        name: "time"
      }, {
        type: "StrArray",
        name: "abortedAccidList"
      }]
    },
    "8_6": {
      service: "team",
      cmd: "removeTeamMembers"
    },
    "8_7": {
      service: "team",
      cmd: "updateTeam",
      response: [{
        type: "Number",
        name: "id"
      }, {
        type: "Number",
        name: "time"
      }]
    },
    "8_8": {
      service: "team",
      cmd: "leaveTeam"
    },
    "8_9": {
      service: "team",
      cmd: "getTeam",
      response: [{
        type: "Property",
        name: "team"
      }]
    },
    "8_10": {
      service: "team",
      cmd: "getTeams",
      response: [{
        type: "PropertyArray",
        name: "teams",
        entity: "team"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "8_11": {
      service: "team",
      cmd: "getTeamMembers",
      response: [{
        type: "Number",
        name: "teamId"
      }, {
        type: "PropertyArray",
        name: "members",
        entity: "teamMember"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "8_12": {
      service: "team",
      cmd: "dismissTeam"
    },
    "8_13": {
      service: "team",
      cmd: "applyTeam",
      response: [{
        type: "Property",
        name: "team"
      }]
    },
    "8_14": {
      service: "team",
      cmd: "passTeamApply"
    },
    "8_15": {
      service: "team",
      cmd: "rejectTeamApply"
    },
    "8_16": {
      service: "team",
      cmd: "addTeamManagers"
    },
    "8_17": {
      service: "team",
      cmd: "removeTeamManagers"
    },
    "8_18": {
      service: "team",
      cmd: "transferTeam"
    },
    "8_19": {
      service: "team",
      cmd: "updateInfoInTeam"
    },
    "8_20": {
      service: "team",
      cmd: "updateNickInTeam"
    },
    "8_21": {
      service: "team",
      cmd: "acceptTeamInvite",
      response: [{
        type: "Property",
        name: "team"
      }]
    },
    "8_22": {
      service: "team",
      cmd: "rejectTeamInvite"
    },
    "8_23": {
      service: "team",
      cmd: "getTeamHistoryMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "8_24": {
      service: "team",
      cmd: "searchTeamHistoryMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "8_25": {
      service: "team",
      cmd: "updateMuteStateInTeam"
    },
    "8_26": {
      service: "team",
      cmd: "getMyTeamMembers",
      response: [{
        type: "PropertyArray",
        name: "teamMembers",
        entity: "teamMember"
      }]
    },
    "8_27": {
      service: "team",
      cmd: "getMutedTeamMembers",
      response: [{
        type: "Number",
        name: "teamId"
      }, {
        type: "PropertyArray",
        name: "teamMembers",
        entity: "teamMember"
      }]
    },
    "8_28": {
      service: "team",
      cmd: "sendTeamMsgReceipt",
      response: [{
        type: "PropertyArray",
        name: "teamMsgReceipts",
        entity: "teamMsgReceipt"
      }]
    },
    "8_29": {
      service: "team",
      cmd: "getTeamMsgReads",
      response: [{
        type: "PropertyArray",
        name: "teamMsgReceipts",
        entity: "teamMsgReceipt"
      }]
    },
    "8_30": {
      service: "team",
      cmd: "getTeamMsgReadAccounts",
      response: [{
        type: "String",
        name: "idClient"
      }, {
        type: "StrArray",
        name: "readAccounts"
      }, {
        type: "StrArray",
        name: "unreadAccounts"
      }]
    },
    "8_31": {
      service: "team",
      cmd: "notifyTeamMsgReads",
      response: [{
        type: "PropertyArray",
        name: "teamMsgReceipts",
        entity: "teamMsgReceipt"
      }]
    },
    "8_32": {
      service: "team",
      cmd: "muteTeamAll",
      response: []
    },
    "8_126": {
      service: "team",
      cmd: "syncMyTeamMembers",
      response: [{
        type: "PropertyArray",
        name: "teamMembers",
        entity: "teamMember"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "8_109": {
      service: "team",
      cmd: "syncTeams",
      response: [{
        type: "Number",
        name: "timetag"
      }, {
        type: "PropertyArray",
        name: "teams",
        entity: "team"
      }]
    },
    "8_111": {
      service: "team",
      cmd: "syncTeamMembers",
      response: [{
        type: "Number",
        name: "teamId"
      }, {
        type: "PropertyArray",
        name: "members",
        entity: "teamMember"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "8_101": {
      service: "team",
      cmd: "syncCreateTeam",
      response: [{
        type: "Property",
        name: "team"
      }]
    },
    "8_102": {
      service: "team",
      cmd: "syncSendTeamMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "8_119": {
      service: "team",
      cmd: "syncUpdateTeamMember",
      response: [{
        type: "Property",
        name: "teamMember"
      }]
    },
    "12_1": {
      service: "friend",
      cmd: "friendRequest"
    },
    "12_101": {
      service: "friend",
      cmd: "syncFriendRequest",
      response: [{
        type: "String",
        name: "account"
      }, {
        type: "Number",
        name: "type"
      }, {
        type: "String",
        name: "ps"
      }]
    },
    "12_2": {
      service: "friend",
      cmd: "deleteFriend"
    },
    "12_102": {
      service: "friend",
      cmd: "syncDeleteFriend",
      response: [{
        type: "String",
        name: "account"
      }]
    },
    "12_3": {
      service: "friend",
      cmd: "updateFriend"
    },
    "12_103": {
      service: "friend",
      cmd: "syncUpdateFriend",
      response: [{
        type: "Property",
        name: "friend"
      }]
    },
    "12_4": {
      service: "friend",
      cmd: "getFriends",
      response: [{
        type: "PropertyArray",
        name: "friends",
        entity: "friend"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "12_5": {
      service: "friend",
      cmd: "syncFriends",
      response: [{
        type: "PropertyArray",
        name: "friends",
        entity: "friend"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "12_6": {
      service: "friend",
      cmd: "syncFriendUsers",
      response: [{
        type: "PropertyArray",
        name: "users",
        entity: "user"
      }, {
        type: "Number",
        name: "timetag"
      }]
    },
    "13_1": {
      service: "chatroom",
      cmd: "getChatroomAddress",
      response: [{
        type: "StrArray",
        name: "address"
      }]
    },
    "14_1": {
      service: "eventService",
      cmd: "publishEvent",
      response: [{
        type: "Property",
        name: "msgEvent"
      }]
    },
    "14_2": {
      service: "eventService",
      cmd: "pushEvent",
      response: [{
        type: "Property",
        name: "msgEvent"
      }]
    },
    "14_3": {
      service: "eventService",
      cmd: "subscribeEvent",
      response: [{
        type: "StrArray",
        name: "accounts"
      }]
    },
    "14_4": {
      service: "eventService",
      cmd: "unSubscribeEventsByAccounts",
      response: [{
        type: "StrArray",
        name: "accounts"
      }]
    },
    "14_5": {
      service: "eventService",
      cmd: "unSubscribeEventsByType"
    },
    "14_6": {
      service: "eventService",
      cmd: "querySubscribeEventsByAccounts",
      response: [{
        type: "PropertyArray",
        name: "msgEventSubscribes",
        entity: "msgEventSubscribe"
      }]
    },
    "14_7": {
      service: "eventService",
      cmd: "querySubscribeEventsByType",
      response: [{
        type: "PropertyArray",
        name: "msgEventSubscribes",
        entity: "msgEventSubscribe"
      }]
    },
    "14_9": {
      service: "eventService",
      cmd: "pushEvents",
      response: [{
        type: "PropertyArray",
        name: "msgEvents",
        entity: "msgEvent"
      }]
    },
    "101_1": {
      service: "filter",
      cmd: "sendFilterMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "101_2": {
      service: "filter",
      cmd: "filterMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "101_3": {
      service: "filter",
      cmd: "filterSysMsg",
      response: [{
        type: "Property",
        name: "sysMsg"
      }]
    },
    "101_7": {
      service: "filter",
      cmd: "sendFilterCustomSysMsg"
    }
  });
  e.exports = {
    idMap: i,
    cmdConfig: o,
    packetConfig: a
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0).notundef;

  function s(e) {
    r(e.shouldPushNotificationWhenPCOnline) && (this.open = e.shouldPushNotificationWhenPCOnline ? 2 : 1);
  }

  s.getDefaultConfig = function () {
    return {
      shouldPushNotificationWhenPCOnline: !0
    };
  }, s.reverse = function (e) {
    return {
      shouldPushNotificationWhenPCOnline: 1 != +e.open
    };
  }, e.exports = s;
}, function (e, t, n) {
  var r = n(23);
  r(r.S + r.F * !n(10), "Object", {
    defineProperty: n(8).f
  });
}, function (e, t, n) {
  n(96);
  var r = n(11).Object;

  e.exports = function (e, t, n) {
    return r.defineProperty(e, t, n);
  };
}, function (e, t, n) {
  n(34)("observable");
}, function (e, t, n) {
  n(34)("asyncIterator");
}, function (e, t) {}, function (e, t, n) {
  var r = n(13),
      s = n(61).f,
      i = {}.toString,
      o = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  e.exports.f = function (e) {
    return o && "[object Window]" == i.call(e) ? function (e) {
      try {
        return s(e);
      } catch (e) {
        return o.slice();
      }
    }(e) : s(r(e));
  };
}, function (e, t, n) {
  var r = n(49);

  e.exports = Array.isArray || function (e) {
    return "Array" == r(e);
  };
}, function (e, t, n) {
  var r = n(30),
      s = n(46),
      i = n(29);

  e.exports = function (e) {
    var t = r(e),
        n = s.f;
    if (n) for (var o, a = n(e), c = i.f, u = 0; a.length > u;) {
      c.call(e, o = a[u++]) && t.push(o);
    }
    return t;
  };
}, function (e, t, n) {
  var r = n(27)("meta"),
      s = n(16),
      i = n(9),
      o = n(8).f,
      a = 0,
      c = Object.isExtensible || function () {
    return !0;
  },
      u = !n(21)(function () {
    return c(Object.preventExtensions({}));
  }),
      l = function l(e) {
    o(e, r, {
      value: {
        i: "O" + ++a,
        w: {}
      }
    });
  },
      m = e.exports = {
    KEY: r,
    NEED: !1,
    fastKey: function fastKey(e, t) {
      if (!s(e)) return "symbol" == _typeof(e) ? e : ("string" == typeof e ? "S" : "P") + e;

      if (!i(e, r)) {
        if (!c(e)) return "F";
        if (!t) return "E";
        l(e);
      }

      return e[r].i;
    },
    getWeak: function getWeak(e, t) {
      if (!i(e, r)) {
        if (!c(e)) return !0;
        if (!t) return !1;
        l(e);
      }

      return e[r].w;
    },
    onFreeze: function onFreeze(e) {
      return u && m.NEED && c(e) && !i(e, r) && l(e), e;
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(6),
      s = n(9),
      i = n(10),
      o = n(23),
      a = n(63),
      c = n(104).KEY,
      u = n(21),
      l = n(38),
      m = n(36),
      d = n(27),
      p = n(5),
      f = n(35),
      g = n(34),
      h = n(103),
      y = n(102),
      v = n(22),
      b = n(16),
      M = n(13),
      T = n(40),
      S = n(25),
      k = n(51),
      C = n(101),
      P = n(90),
      I = n(8),
      w = n(30),
      O = P.f,
      A = I.f,
      _ = C.f,
      _x = r.Symbol,
      E = r.JSON,
      R = E && E.stringify,
      j = p("_hidden"),
      F = p("toPrimitive"),
      N = {}.propertyIsEnumerable,
      U = l("symbol-registry"),
      D = l("symbols"),
      L = l("op-symbols"),
      B = Object.prototype,
      q = "function" == typeof _x,
      H = r.QObject,
      W = !H || !H.prototype || !H.prototype.findChild,
      J = i && u(function () {
    return 7 != k(A({}, "a", {
      get: function get() {
        return A(this, "a", {
          value: 7
        }).a;
      }
    })).a;
  }) ? function (e, t, n) {
    var r = O(B, t);
    r && delete B[t], A(e, t, n), r && e !== B && A(B, t, r);
  } : A,
      V = function V(e) {
    var t = D[e] = k(_x.prototype);
    return t._k = e, t;
  },
      X = q && "symbol" == _typeof(_x.iterator) ? function (e) {
    return "symbol" == _typeof(e);
  } : function (e) {
    return e instanceof _x;
  },
      z = function z(e, t, n) {
    return e === B && z(L, t, n), v(e), t = T(t, !0), v(n), s(D, t) ? (n.enumerable ? (s(e, j) && e[j][t] && (e[j][t] = !1), n = k(n, {
      enumerable: S(0, !1)
    })) : (s(e, j) || A(e, j, S(1, {})), e[j][t] = !0), J(e, t, n)) : A(e, t, n);
  },
      $ = function $(e, t) {
    v(e);

    for (var n, r = h(t = M(t)), s = 0, i = r.length; i > s;) {
      z(e, n = r[s++], t[n]);
    }

    return e;
  },
      K = function K(e) {
    var t = N.call(this, e = T(e, !0));
    return !(this === B && s(D, e) && !s(L, e)) && (!(t || !s(this, e) || !s(D, e) || s(this, j) && this[j][e]) || t);
  },
      G = function G(e, t) {
    if (e = M(e), t = T(t, !0), e !== B || !s(D, t) || s(L, t)) {
      var n = O(e, t);
      return !n || !s(D, t) || s(e, j) && e[j][t] || (n.enumerable = !0), n;
    }
  },
      Q = function Q(e) {
    for (var t, n = _(M(e)), r = [], i = 0; n.length > i;) {
      s(D, t = n[i++]) || t == j || t == c || r.push(t);
    }

    return r;
  },
      Y = function Y(e) {
    for (var t, n = e === B, r = _(n ? L : M(e)), i = [], o = 0; r.length > o;) {
      !s(D, t = r[o++]) || n && !s(B, t) || i.push(D[t]);
    }

    return i;
  };

  q || (a((_x = function x() {
    if (this instanceof _x) throw TypeError("Symbol is not a constructor!");

    var e = d(arguments.length > 0 ? arguments[0] : void 0),
        t = function t(n) {
      this === B && t.call(L, n), s(this, j) && s(this[j], e) && (this[j][e] = !1), J(this, e, S(1, n));
    };

    return i && W && J(B, e, {
      configurable: !0,
      set: t
    }), V(e);
  }).prototype, "toString", function () {
    return this._k;
  }), P.f = G, I.f = z, n(61).f = C.f = Q, n(29).f = K, n(46).f = Y, i && !n(41) && a(B, "propertyIsEnumerable", K, !0), f.f = function (e) {
    return V(p(e));
  }), o(o.G + o.W + o.F * !q, {
    Symbol: _x
  });

  for (var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ee = 0; Z.length > ee;) {
    p(Z[ee++]);
  }

  for (var te = w(p.store), ne = 0; te.length > ne;) {
    g(te[ne++]);
  }

  o(o.S + o.F * !q, "Symbol", {
    for: function _for(e) {
      return s(U, e += "") ? U[e] : U[e] = _x(e);
    },
    keyFor: function keyFor(e) {
      if (!X(e)) throw TypeError(e + " is not a symbol!");

      for (var t in U) {
        if (U[t] === e) return t;
      }
    },
    useSetter: function useSetter() {
      W = !0;
    },
    useSimple: function useSimple() {
      W = !1;
    }
  }), o(o.S + o.F * !q, "Object", {
    create: function create(e, t) {
      return void 0 === t ? k(e) : $(k(e), t);
    },
    defineProperty: z,
    defineProperties: $,
    getOwnPropertyDescriptor: G,
    getOwnPropertyNames: Q,
    getOwnPropertySymbols: Y
  }), E && o(o.S + o.F * (!q || u(function () {
    var e = _x();

    return "[null]" != R([e]) || "{}" != R({
      a: e
    }) || "{}" != R(Object(e));
  })), "JSON", {
    stringify: function stringify(e) {
      for (var t, n, r = [e], s = 1; arguments.length > s;) {
        r.push(arguments[s++]);
      }

      if (n = t = r[1], (b(t) || void 0 !== e) && !X(e)) return y(t) || (t = function t(e, _t3) {
        if ("function" == typeof n && (_t3 = n.call(this, e, _t3)), !X(_t3)) return _t3;
      }), r[1] = t, R.apply(E, r);
    }
  }), _x.prototype[F] || n(14)(_x.prototype, F, _x.prototype.valueOf), m(_x, "Symbol"), m(Math, "Math", !0), m(r.JSON, "JSON", !0);
}, function (e, t, n) {
  n(105), n(100), n(99), n(98), e.exports = n(11).Symbol;
}, function (e, t, n) {
  e.exports = {
    default: n(106),
    __esModule: !0
  };
}, function (e, t) {
  e.exports = function (e, t) {
    return {
      value: t,
      done: !!e
    };
  };
}, function (e, t) {
  e.exports = function () {};
}, function (e, t, n) {
  "use strict";

  var r = n(109),
      s = n(108),
      i = n(28),
      o = n(13);
  e.exports = n(66)(Array, "Array", function (e, t) {
    this._t = o(e), this._i = 0, this._k = t;
  }, function () {
    var e = this._t,
        t = this._k,
        n = this._i++;
    return !e || n >= e.length ? (this._t = void 0, s(1)) : s(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
  }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
}, function (e, t, n) {
  n(110);

  for (var r = n(6), s = n(14), i = n(28), o = n(5)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < a.length; c++) {
    var u = a[c],
        l = r[u],
        m = l && l.prototype;
    m && !m[o] && s(m, o, u), i[u] = i.Array;
  }
}, function (e, t, n) {
  var r = n(9),
      s = n(50),
      i = n(39)("IE_PROTO"),
      o = Object.prototype;

  e.exports = Object.getPrototypeOf || function (e) {
    return e = s(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null;
  };
}, function (e, t, n) {
  var r = n(6).document;
  e.exports = r && r.documentElement;
}, function (e, t, n) {
  var r = n(43),
      s = Math.max,
      i = Math.min;

  e.exports = function (e, t) {
    return (e = r(e)) < 0 ? s(e + t, 0) : i(e, t);
  };
}, function (e, t, n) {
  var r = n(13),
      s = n(74),
      i = n(114);

  e.exports = function (e) {
    return function (t, n, o) {
      var a,
          c = r(t),
          u = s(c.length),
          l = i(o, u);

      if (e && n != n) {
        for (; u > l;) {
          if ((a = c[l++]) != a) return !0;
        }
      } else for (; u > l; l++) {
        if ((e || l in c) && c[l] === n) return e || l || 0;
      }

      return !e && -1;
    };
  };
}, function (e, t, n) {
  var r = n(8),
      s = n(22),
      i = n(30);
  e.exports = n(10) ? Object.defineProperties : function (e, t) {
    s(e);

    for (var n, o = i(t), a = o.length, c = 0; a > c;) {
      r.f(e, n = o[c++], t[n]);
    }

    return e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(51),
      s = n(25),
      i = n(36),
      o = {};
  n(14)(o, n(5)("iterator"), function () {
    return this;
  }), e.exports = function (e, t, n) {
    e.prototype = r(o, {
      next: s(1, n)
    }), i(e, t + " Iterator");
  };
}, function (e, t) {
  e.exports = function (e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");
    return e;
  };
}, function (e, t, n) {
  var r = n(43),
      s = n(42);

  e.exports = function (e) {
    return function (t, n) {
      var i,
          o,
          a = String(s(t)),
          c = r(n),
          u = a.length;
      return c < 0 || c >= u ? e ? "" : void 0 : (i = a.charCodeAt(c)) < 55296 || i > 56319 || c + 1 === u || (o = a.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? a.charAt(c) : i : e ? a.slice(c, c + 2) : o - 56320 + (i - 55296 << 10) + 65536;
    };
  };
}, function (e, t, n) {
  n(75), n(111), e.exports = n(35).f("iterator");
}, function (e, t, n) {
  e.exports = {
    default: n(120),
    __esModule: !0
  };
}, function (e, t, n) {
  "use strict";

  n(176);
  var r = n(1);
  r.lbsUrl = r.lbsUrl.replace("/webconf.jsp", "/wxwebconf.jsp"), r.defaultReportUrl = null, r.isWeixinApp = !0;
},,, function (e, t, n) {
  "use strict";

  var r = n(20);

  function s() {}

  s.typeMap = {
    text: 0,
    image: 1,
    audio: 2,
    video: 3,
    geo: 4,
    notification: 5,
    file: 6,
    tip: 10,
    robot: 11,
    custom: 100
  };
  var i = s.typeReverseMap = {
    0: "text",
    1: "image",
    2: "audio",
    3: "video",
    4: "geo",
    5: "notification",
    6: "file",
    10: "tip",
    11: "robot",
    100: "custom"
  };
  s.validTypes = Object.keys(s.typeMap), s.setFlow = function (e, t) {
    var n = t === e.from;
    n && t === e.to && (n = r.deviceId === e.fromDeviceId), e.flow = n ? "out" : "in", "robot" === e.type && e.content && e.content.msgOut && (e.flow = "in");
  }, s.getType = function (e) {
    var t = e.type;
    return i[t] || t;
  }, e.exports = s;
},,,, function (e, t, n) {
  "use strict";

  var r = n(20);

  e.exports = function (e) {
    e.db && (r.db = e.db);
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  function o(e) {
    var t = this,
        n = e.url || null;
    t.level = {
      debug: 0,
      log: 1,
      info: 2,
      warn: 3,
      error: 4
    }[e.level] || 0, t.logCache = [], t.logNum = 1, t.timeInterval = 5e3, window.onerror = function (e, n, r, s, i) {
      t.error(i);
    }, setInterval(function () {
      t.logCache.length > 0 && n && t.postLogs(n, t.logCache);
    }, t.timeInterval);
  }

  o.prototype.debug = function () {
    this.level > 0 || (console.debug.apply(this, arguments), this.cacheLogs.apply(this, ["[degbug]"].concat(arguments)));
  }, o.prototype.log = function () {
    this.level > 1 || (console.log.apply(this, arguments), this.cacheLogs.apply(this, ["[log]"].concat(arguments)));
  }, o.prototype.info = function () {
    this.level > 2 || (console.info.apply(this, arguments), this.cacheLogs.apply(this, ["[info]"].concat(arguments)));
  }, o.prototype.warn = function () {
    this.level > 3 || (console.warn.apply(this, arguments), this.cacheLogs.apply(this, ["[warn]"].concat(arguments)));
  }, o.prototype.error = function () {
    this.level > 4 || (console.error.apply(this, arguments), this.cacheLogs.apply(this, ["[error]"].concat(arguments)));
  }, o.prototype.cacheLogs = function (e, t) {
    for (var n = [], r = 0; r < t.length; r++) {
      var s = t[r];
      "object" === (void 0 === s ? "undefined" : (0, i.default)(s)) ? n.push(JSON.stringify(s)) : n.push(s);
    }

    var o = this.logNum++ + " " + e + " " + n.join("; ");
    this.logCache.push(o.replace("%c", ""));
  }, o.prototype.postLogs = function (e, t) {
    var n = this,
        r = new XMLHttpRequest();
    r.onreadystatechange = function () {
      4 === r.readyState && (200 === r.status ? (console.info("LoggerPlugin::日志上报完成"), n.logCache = [], n.timeInterval = 5e3) : n.timeInterval += 5e3);
    }, r.open("POST", e), r.setRequestHeader("Content-Type", "plain/text;charset=utf-8"), r.timeout = 360, r.send(t.join("\n"));
  }, e.exports = o;
}, function (e, t, n) {
  "use strict";

  var r = {
    set: function set(e, t, n) {
      r[e] = t, n && (n.support = t);
    }
  };
  e.exports = r;
}, function (e, t) {
  e.exports = function () {
    for (var e = {}, t = 0; t < arguments.length; t++) {
      var r = arguments[t];

      for (var s in r) {
        n.call(r, s) && (e[s] = r[s]);
      }
    }

    return e;
  };

  var n = Object.prototype.hasOwnProperty;
}, function (e, t, n) {
  var r = n(76);

  e.exports = function (e, t, n) {
    if (!r(t)) throw new TypeError("iterator must be a function");
    arguments.length < 3 && (n = this);
    "[object Array]" === s.call(e) ? function (e, t, n) {
      for (var r = 0, s = e.length; r < s; r++) {
        i.call(e, r) && t.call(n, e[r], r, e);
      }
    }(e, t, n) : "string" == typeof e ? function (e, t, n) {
      for (var r = 0, s = e.length; r < s; r++) {
        t.call(n, e.charAt(r), r, e);
      }
    }(e, t, n) : function (e, t, n) {
      for (var r in e) {
        i.call(e, r) && t.call(n, e[r], r, e);
      }
    }(e, t, n);
  };

  var s = Object.prototype.toString,
      i = Object.prototype.hasOwnProperty;
}, function (e, t) {
  (t = e.exports = function (e) {
    return e.replace(/^\s*|\s*$/g, "");
  }).left = function (e) {
    return e.replace(/^\s*/, "");
  }, t.right = function (e) {
    return e.replace(/\s*$/, "");
  };
}, function (e, t, n) {
  var r = n(134),
      s = n(133);

  e.exports = function (e) {
    if (!e) return {};
    var t = {};
    return s(r(e).split("\n"), function (e) {
      var n,
          s = e.indexOf(":"),
          i = r(e.slice(0, s)).toLowerCase(),
          o = r(e.slice(s + 1));
      void 0 === t[i] ? t[i] = o : (n = t[i], "[object Array]" === Object.prototype.toString.call(n) ? t[i].push(o) : t[i] = [t[i], o]);
    }), t;
  };
}, function (e, t, n) {
  (function (t) {
    var n;
    n = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, e.exports = n;
  }).call(this, n(47));
}, function (e, t, n) {
  "use strict";

  var r = n(136),
      s = n(76),
      i = n(135),
      o = n(132);

  function a(e, t, n) {
    var r = e;
    return s(t) ? (n = t, "string" == typeof e && (r = {
      uri: e
    })) : r = o(t, {
      uri: e
    }), r.callback = n, r;
  }

  function c(e, t, n) {
    return u(t = a(e, t, n));
  }

  function u(e) {
    if (void 0 === e.callback) throw new Error("callback argument missing");

    var t = !1,
        n = function n(_n, r, s) {
      t || (t = !0, e.callback(_n, r, s));
    };

    function r(e) {
      return clearTimeout(l), e instanceof Error || (e = new Error("" + (e || "Unknown XMLHttpRequest Error"))), e.statusCode = 0, n(e, y);
    }

    function s() {
      if (!a) {
        var t;
        clearTimeout(l), t = e.useXDR && void 0 === u.status ? 200 : 1223 === u.status ? 204 : u.status;
        var r = y,
            s = null;
        return 0 !== t ? (r = {
          body: function () {
            var e = void 0;
            if (e = u.response ? u.response : u.responseText || function (e) {
              try {
                if ("document" === e.responseType) return e.responseXML;
                var t = e.responseXML && "parsererror" === e.responseXML.documentElement.nodeName;
                if ("" === e.responseType && !t) return e.responseXML;
              } catch (e) {}

              return null;
            }(u), h) try {
              e = JSON.parse(e);
            } catch (e) {}
            return e;
          }(),
          statusCode: t,
          method: d,
          headers: {},
          url: m,
          rawRequest: u
        }, u.getAllResponseHeaders && (r.headers = i(u.getAllResponseHeaders()))) : s = new Error("Internal XMLHttpRequest Error"), n(s, r, r.body);
      }
    }

    var o,
        a,
        u = e.xhr || null;
    u || (u = e.cors || e.useXDR ? new c.XDomainRequest() : new c.XMLHttpRequest());
    var l,
        m = u.url = e.uri || e.url,
        d = u.method = e.method || "GET",
        p = e.body || e.data,
        f = u.headers = e.headers || {},
        g = !!e.sync,
        h = !1,
        y = {
      body: void 0,
      headers: {},
      statusCode: 0,
      method: d,
      url: m,
      rawRequest: u
    };
    if ("json" in e && !1 !== e.json && (h = !0, f.accept || f.Accept || (f.Accept = "application/json"), "GET" !== d && "HEAD" !== d && (f["content-type"] || f["Content-Type"] || (f["Content-Type"] = "application/json"), p = JSON.stringify(!0 === e.json ? p : e.json))), u.onreadystatechange = function () {
      4 === u.readyState && setTimeout(s, 0);
    }, u.onload = s, u.onerror = r, u.onprogress = function () {}, u.onabort = function () {
      a = !0;
    }, u.ontimeout = r, u.open(d, m, !g, e.username, e.password), g || (u.withCredentials = !!e.withCredentials), !g && e.timeout > 0 && (l = setTimeout(function () {
      if (!a) {
        a = !0, u.abort("timeout");
        var e = new Error("XMLHttpRequest timeout");
        e.code = "ETIMEDOUT", r(e);
      }
    }, e.timeout)), u.setRequestHeader) for (o in f) {
      f.hasOwnProperty(o) && u.setRequestHeader(o, f[o]);
    } else if (e.headers && !function (e) {
      for (var t in e) {
        if (e.hasOwnProperty(t)) return !1;
      }

      return !0;
    }(e.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
    return "responseType" in e && (u.responseType = e.responseType), "beforeSend" in e && "function" == typeof e.beforeSend && e.beforeSend(u), u.send(p || null), u;
  }

  e.exports = c, c.XMLHttpRequest = r.XMLHttpRequest || function () {}, c.XDomainRequest = "withCredentials" in new c.XMLHttpRequest() ? c.XMLHttpRequest : r.XDomainRequest, function (e, t) {
    for (var n = 0; n < e.length; n++) {
      t(e[n]);
    }
  }(["get", "put", "post", "patch", "head", "delete"], function (e) {
    c["delete" === e ? "del" : e] = function (t, n, r) {
      return (n = a(t, n, r)).method = e.toUpperCase(), u(n);
    };
  });
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.notundef,
      i = {
    addFriend: 1,
    applyFriend: 2,
    passFriendApply: 3,
    rejectFriendApply: 4
  },
      o = {
    1: "addFriend",
    2: "applyFriend",
    3: "passFriendApply",
    4: "rejectFriendApply"
  };

  function a(e) {
    r.verifyOptions(e, "account", "friend::Friend"), r.verifyParamAtLeastPresentOne(e, "alias custom", "friend::Friend"), this.account = e.account, s(e.alias) && (this.alias = e.alias), s(e.custom) && (this.custom = e.custom);
  }

  a.reverse = function (e) {
    var t = r.filterObj(e, "account alias custom createTime updateTime serverex");
    return s(e.flag) && (t.valid = "1" === e.flag), s(t.createTime) && (t.createTime = +t.createTime), s(t.updateTime) && (t.updateTime = +t.updateTime), t;
  }, a.validTypes = function () {
    return Object.keys(i);
  }, a.getByteFromType = function (e) {
    return i[e];
  }, a.getTypeFromByte = function (e) {
    return o[e];
  }, a.assembleFriend = function (e) {
    var t = +new Date();
    return {
      account: e,
      alias: "",
      createTime: t,
      custom: "",
      updateTime: t,
      valid: !0
    };
  }, e.exports = a;
}, function (e, t, n) {
  "use strict";

  e.exports = {
    imLogin: {
      3: "clientType",
      4: "os",
      6: "sdkVersion",
      8: "appLogin",
      9: "protocolVersion",
      10: "pushTokenName",
      11: "pushToken",
      13: "deviceId",
      18: "appKey",
      19: "account",
      24: "browser",
      26: "session",
      32: "deviceInfo",
      38: "customTag",
      112: "isReactNative",
      1000: "token"
    },
    nosToken: {
      1: "objectName",
      2: "token",
      3: "bucket",
      4: "expireTime",
      7: "expireSec",
      8: "tag"
    },
    audioToText: {
      2: "url"
    },
    imageOp: {
      0: "type",
      1: "stripmeta",
      2: "typeType",
      3: "blurRadius",
      4: "blurSigma",
      5: "qualityQuality",
      6: "cropX",
      7: "cropY",
      8: "cropWidth",
      9: "cropHeight",
      10: "rotateAngle",
      11: "pixelPixel",
      12: "thumbnailMode",
      13: "thumbnailWidth",
      14: "thumbnailHeight",
      15: "thumbnailAxisX",
      16: "thumbnailAxisY",
      17: "thumbnailCenterX",
      18: "thumbnailCenterY",
      19: "thumbnailEnlarge",
      20: "thumbnailToStatic",
      21: "watermarkType",
      22: "watermarkGravity",
      23: "watermarkDissolve",
      24: "watermarkDx",
      25: "watermarkDy",
      26: "watermarkImage",
      27: "watermarkText",
      28: "watermarkFont",
      29: "watermarkFontSize",
      30: "watermarkFontColor",
      31: "interlace"
    },
    robot: {
      4: "account",
      5: "nick",
      6: "avatar",
      7: "intro",
      8: "config",
      9: "valid",
      10: "createTime",
      11: "updateTime",
      12: "custid",
      13: "botid",
      14: "bindTime"
    },
    clientAntispam: {
      1: "version",
      2: "md5",
      3: "nosurl",
      4: "thesaurus"
    },
    fileQuickTransfer: {
      1: "md5",
      2: "url",
      3: "size",
      4: "threshold"
    },
    transToken: {
      1: "name",
      2: "type",
      3: "transType",
      4: "size",
      5: "extra",
      6: "body"
    },
    transInfo: {
      1: "docId",
      2: "name",
      3: "prefix",
      4: "size",
      5: "type",
      6: "state",
      7: "transType",
      8: "transSize",
      9: "pageCount",
      10: "picInfo",
      11: "extra",
      12: "flag"
    },
    fileListParam: {
      1: "fromDocId",
      2: "limit"
    },
    avSignalTag: {
      1: "type",
      2: "channelName",
      3: "channelId",
      4: "channelCreateTime",
      5: "channelExpireTime",
      6: "creator",
      7: "ext",
      8: "channelInValid",
      10: "from",
      11: "to",
      12: "requestId",
      13: "needPush",
      14: "pushTitle",
      15: "pushContent",
      16: "pushPayload",
      17: "needBadge",
      18: "members",
      19: "attach",
      20: "attachExt",
      21: "isSave",
      22: "msgid",
      23: "uid",
      24: "time"
    },
    login: {
      1: "appKey",
      2: "account",
      3: "deviceId",
      5: "chatroomId",
      8: "appLogin",
      20: "chatroomNick",
      21: "chatroomAvatar",
      22: "chatroomCustom",
      23: "chatroomEnterCustom",
      26: "session",
      38: "isAnonymous"
    },
    chatroom: {
      1: "id",
      3: "name",
      4: "announcement",
      5: "broadcastUrl",
      12: "custom",
      14: "createTime",
      15: "updateTime",
      16: "queuelevel",
      100: "creator",
      101: "onlineMemberNum",
      102: "mute"
    },
    msg: {
      1: "idClient",
      2: "type",
      3: "attach",
      4: "custom",
      5: "resend",
      6: "userUpdateTime",
      7: "fromNick",
      8: "fromAvatar",
      9: "fromCustom",
      10: "yidunEnable",
      11: "antiSpamContent",
      12: "skipHistory",
      13: "body",
      14: "antiSpamBusinessId",
      15: "clientAntiSpam",
      16: "antiSpamUsingYidun",
      20: "time",
      21: "from",
      22: "chatroomId",
      23: "fromClientType",
      25: "highPriority"
    },
    chatroomMember: {
      1: "chatroomId",
      2: "account",
      3: "type",
      4: "level",
      5: "nick",
      6: "avatar",
      7: "custom",
      8: "online",
      9: "guest",
      10: "enterTime",
      12: "blacked",
      13: "gaged",
      14: "valid",
      15: "updateTime",
      16: "tempMuted",
      17: "tempMuteDuration"
    }
  };
}, function (e, t, n) {
  "use strict";

  e.exports = {
    imLogin: {
      clientType: 3,
      os: 4,
      sdkVersion: 6,
      appLogin: 8,
      protocolVersion: 9,
      pushTokenName: 10,
      pushToken: 11,
      deviceId: 13,
      appKey: 18,
      account: 19,
      browser: 24,
      session: 26,
      deviceInfo: 32,
      isReactNative: 112,
      token: 1e3,
      customTag: 38
    },
    nosToken: {
      objectName: 1,
      token: 2,
      bucket: 3,
      expireTime: 4,
      expireSec: 7,
      tag: 8
    },
    audioToText: {
      url: 2
    },
    imageOp: {
      type: 0,
      stripmeta: 1,
      typeType: 2,
      blurRadius: 3,
      blurSigma: 4,
      qualityQuality: 5,
      cropX: 6,
      cropY: 7,
      cropWidth: 8,
      cropHeight: 9,
      rotateAngle: 10,
      pixelPixel: 11,
      thumbnailMode: 12,
      thumbnailWidth: 13,
      thumbnailHeight: 14,
      thumbnailAxisX: 15,
      thumbnailAxisY: 16,
      thumbnailCenterX: 17,
      thumbnailCenterY: 18,
      thumbnailEnlarge: 19,
      thumbnailToStatic: 20,
      watermarkType: 21,
      watermarkGravity: 22,
      watermarkDissolve: 23,
      watermarkDx: 24,
      watermarkDy: 25,
      watermarkImage: 26,
      watermarkText: 27,
      watermarkFont: 28,
      watermarkFontSize: 29,
      watermarkFontColor: 30,
      interlace: 31
    },
    robot: {
      account: 4,
      nick: 5,
      avatar: 6,
      intro: 7,
      config: 8,
      valid: 9,
      createTime: 10,
      updateTime: 11,
      custid: 12,
      botid: 13,
      bindTime: 14
    },
    clientAntispam: {
      version: 1,
      md5: 2,
      nosurl: 3,
      thesaurus: 4
    },
    fileQuickTransfer: {
      md5: 1,
      url: 2,
      size: 3,
      threshold: 4
    },
    transToken: {
      name: 1,
      type: 2,
      transType: 3,
      size: 4,
      extra: 5,
      body: 6
    },
    transInfo: {
      docId: 1,
      name: 2,
      prefix: 3,
      size: 4,
      type: 5,
      state: 6,
      transType: 7,
      transSize: 8,
      pageCount: 9,
      picInfo: 10,
      extra: 11,
      flag: 12
    },
    fileListParam: {
      fromDocId: 1,
      limit: 2
    },
    avSignalTag: {
      type: 1,
      channelName: 2,
      channelId: 3,
      channelCreateTime: 4,
      channelExpireTime: 5,
      creator: 6,
      ext: 7,
      channelInValid: 8,
      from: 10,
      to: 11,
      requestId: 12,
      needPush: 13,
      pushTitle: 14,
      pushContent: 15,
      pushPayload: 16,
      needBadge: 17,
      members: 18,
      attach: 19,
      attachExt: 20,
      isSave: 21,
      msgid: 22,
      uid: 23,
      time: 24
    },
    login: {
      appKey: 1,
      account: 2,
      deviceId: 3,
      chatroomId: 5,
      appLogin: 8,
      chatroomNick: 20,
      chatroomAvatar: 21,
      chatroomCustom: 22,
      chatroomEnterCustom: 23,
      session: 26,
      isAnonymous: 38
    },
    chatroom: {
      id: 1,
      name: 3,
      announcement: 4,
      broadcastUrl: 5,
      custom: 12,
      createTime: 14,
      updateTime: 15,
      queuelevel: 16,
      creator: 100,
      onlineMemberNum: 101,
      mute: 102
    },
    msg: {
      idClient: 1,
      type: 2,
      attach: 3,
      custom: 4,
      resend: 5,
      userUpdateTime: 6,
      fromNick: 7,
      fromAvatar: 8,
      fromCustom: 9,
      yidunEnable: 10,
      antiSpamContent: 11,
      skipHistory: 12,
      body: 13,
      antiSpamBusinessId: 14,
      clientAntiSpam: 15,
      antiSpamUsingYidun: 16,
      time: 20,
      from: 21,
      chatroomId: 22,
      fromClientType: 23,
      highPriority: 25
    },
    chatroomMember: {
      chatroomId: 1,
      account: 2,
      type: 3,
      level: 4,
      nick: 5,
      avatar: 6,
      custom: 7,
      online: 8,
      guest: 9,
      enterTime: 10,
      blacked: 12,
      gaged: 13,
      valid: 14,
      updateTime: 15,
      tempMuted: 16,
      tempMuteDuration: 17
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = n(57),
      i = r.merge({}, s.idMap, {
    chatroom: {
      id: 13,
      login: 2,
      kicked: 3,
      logout: 4,
      sendMsg: 6,
      msg: 7,
      getChatroomMembers: 8,
      getHistoryMsgs: 9,
      markChatroomMember: 11,
      closeChatroom: 12,
      getChatroom: 13,
      updateChatroom: 14,
      updateMyChatroomMemberInfo: 15,
      getChatroomMembersInfo: 16,
      kickChatroomMember: 17,
      updateChatroomMemberTempMute: 19,
      queueOffer: 20,
      queuePoll: 21,
      queueList: 22,
      peak: 23,
      queueDrop: 24,
      queueInit: 25,
      queueChange: 26
    },
    user: {
      id: 3,
      syncRobot: 16
    }
  }),
      o = r.merge({}, s.cmdConfig, {
    login: {
      sid: i.chatroom.id,
      cid: i.chatroom.login,
      params: [{
        type: "byte",
        name: "type"
      }, {
        type: "Property",
        name: "login"
      }, {
        type: "Property",
        name: "imLogin"
      }]
    },
    logout: {
      sid: i.chatroom.id,
      cid: i.chatroom.logout
    },
    sendMsg: {
      sid: i.chatroom.id,
      cid: i.chatroom.sendMsg,
      params: [{
        type: "Property",
        name: "msg"
      }]
    },
    getChatroomMembers: {
      sid: i.chatroom.id,
      cid: i.chatroom.getChatroomMembers,
      params: [{
        type: "byte",
        name: "type"
      }, {
        type: "long",
        name: "time"
      }, {
        type: "int",
        name: "limit"
      }]
    },
    getHistoryMsgs: {
      sid: i.chatroom.id,
      cid: i.chatroom.getHistoryMsgs,
      params: [{
        type: "long",
        name: "timetag"
      }, {
        type: "int",
        name: "limit"
      }, {
        type: "bool",
        name: "reverse"
      }, {
        type: "LongArray",
        name: "msgTypes"
      }]
    },
    markChatroomMember: {
      sid: i.chatroom.id,
      cid: i.chatroom.markChatroomMember,
      params: [{
        type: "string",
        name: "account"
      }, {
        type: "int",
        name: "type"
      }, {
        type: "bool",
        name: "isAdd"
      }, {
        type: "int",
        name: "level"
      }, {
        type: "string",
        name: "custom"
      }]
    },
    closeChatroom: {
      sid: i.chatroom.id,
      cid: i.chatroom.closeChatroom,
      params: [{
        type: "string",
        name: "custom"
      }]
    },
    getChatroom: {
      sid: i.chatroom.id,
      cid: i.chatroom.getChatroom
    },
    updateChatroom: {
      sid: i.chatroom.id,
      cid: i.chatroom.updateChatroom,
      params: [{
        type: "Property",
        name: "chatroom"
      }, {
        type: "bool",
        name: "needNotify"
      }, {
        type: "String",
        name: "custom"
      }]
    },
    updateMyChatroomMemberInfo: {
      sid: i.chatroom.id,
      cid: i.chatroom.updateMyChatroomMemberInfo,
      params: [{
        type: "Property",
        name: "chatroomMember"
      }, {
        type: "bool",
        name: "needNotify"
      }, {
        type: "String",
        name: "custom"
      }, {
        type: "bool",
        name: "needSave"
      }]
    },
    getChatroomMembersInfo: {
      sid: i.chatroom.id,
      cid: i.chatroom.getChatroomMembersInfo,
      params: [{
        type: "StrArray",
        name: "accounts"
      }]
    },
    kickChatroomMember: {
      sid: i.chatroom.id,
      cid: i.chatroom.kickChatroomMember,
      params: [{
        type: "string",
        name: "account"
      }, {
        type: "string",
        name: "custom"
      }]
    },
    updateChatroomMemberTempMute: {
      sid: i.chatroom.id,
      cid: i.chatroom.updateChatroomMemberTempMute,
      params: [{
        type: "String",
        name: "account"
      }, {
        type: "long",
        name: "duration"
      }, {
        type: "bool",
        name: "needNotify"
      }, {
        type: "String",
        name: "custom"
      }]
    },
    queueOffer: {
      sid: i.chatroom.id,
      cid: i.chatroom.queueOffer,
      params: [{
        type: "string",
        name: "elementKey"
      }, {
        type: "string",
        name: "elementValue"
      }, {
        type: "bool",
        name: "transient"
      }]
    },
    queuePoll: {
      sid: i.chatroom.id,
      cid: i.chatroom.queuePoll,
      params: [{
        type: "string",
        name: "elementKey"
      }]
    },
    queueList: {
      sid: i.chatroom.id,
      cid: i.chatroom.queueList
    },
    peak: {
      sid: i.chatroom.id,
      cid: i.chatroom.peak
    },
    queueDrop: {
      sid: i.chatroom.id,
      cid: i.chatroom.queueDrop
    },
    queueInit: {
      sid: i.chatroom.id,
      cid: i.chatroom.queueInit,
      params: [{
        type: "int",
        name: "limit"
      }]
    },
    queueChange: {
      sid: i.chatroom.id,
      cid: i.chatroom.queueChange,
      params: [{
        type: "StrStrMap",
        name: "elementMap"
      }, {
        type: "bool",
        name: "needNotify"
      }, {
        type: "string",
        name: "notifyExt"
      }]
    },
    syncRobot: {
      sid: i.user.id,
      cid: i.user.syncRobot,
      params: [{
        type: "long",
        name: "timetag"
      }]
    }
  }),
      a = r.merge({}, s.packetConfig, {
    "4_10": {
      service: "notify"
    },
    "4_11": {
      service: "notify"
    },
    "3_16": {
      service: "chatroom",
      cmd: "syncRobot",
      response: [{
        type: "PropertyArray",
        name: "robots",
        entity: "robot"
      }]
    },
    "13_2": {
      service: "chatroom",
      cmd: "login",
      response: [{
        type: "Property",
        name: "chatroom"
      }, {
        type: "Property",
        name: "chatroomMember"
      }]
    },
    "13_3": {
      service: "chatroom",
      cmd: "kicked",
      response: [{
        type: "Number",
        name: "reason"
      }, {
        type: "String",
        name: "custom"
      }]
    },
    "13_4": {
      service: "chatroom",
      cmd: "logout"
    },
    "13_6": {
      service: "chatroom",
      cmd: "sendMsg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "13_7": {
      service: "chatroom",
      cmd: "msg",
      response: [{
        type: "Property",
        name: "msg"
      }]
    },
    "13_8": {
      service: "chatroom",
      cmd: "getChatroomMembers",
      response: [{
        type: "PropertyArray",
        name: "members",
        entity: "chatroomMember"
      }]
    },
    "13_9": {
      service: "chatroom",
      cmd: "getHistoryMsgs",
      response: [{
        type: "PropertyArray",
        name: "msgs",
        entity: "msg"
      }]
    },
    "13_11": {
      service: "chatroom",
      cmd: "markChatroomMember",
      response: [{
        type: "Property",
        name: "chatroomMember"
      }]
    },
    "13_12": {
      service: "chatroom",
      cmd: "closeChatroom"
    },
    "13_13": {
      service: "chatroom",
      cmd: "getChatroom",
      response: [{
        type: "Property",
        name: "chatroom"
      }]
    },
    "13_14": {
      service: "chatroom",
      cmd: "updateChatroom"
    },
    "13_15": {
      service: "chatroom",
      cmd: "updateMyChatroomMemberInfo"
    },
    "13_16": {
      service: "chatroom",
      cmd: "getChatroomMembersInfo",
      response: [{
        type: "PropertyArray",
        name: "members",
        entity: "chatroomMember"
      }]
    },
    "13_17": {
      service: "chatroom",
      cmd: "kickChatroomMember"
    },
    "13_19": {
      service: "chatroom",
      cmd: "updateChatroomMemberTempMute"
    },
    "13_20": {
      service: "chatroom",
      cmd: "queueOffer"
    },
    "13_21": {
      service: "chatroom",
      cmd: "queuePoll",
      response: [{
        type: "String",
        name: "elementKey"
      }, {
        type: "String",
        name: "elementValue"
      }]
    },
    "13_22": {
      service: "chatroom",
      cmd: "queueList",
      response: [{
        type: "KVArray",
        name: "queueList"
      }]
    },
    "13_23": {
      service: "chatroom",
      cmd: "peak",
      response: [{
        type: "String",
        name: "elementKey"
      }, {
        type: "String",
        name: "elementValue"
      }]
    },
    "13_24": {
      service: "chatroom",
      cmd: "queueDrop"
    },
    "13_25": {
      service: "chatroom",
      cmd: "queueInit"
    },
    "13_26": {
      service: "chatroom",
      cmd: "queueChange",
      response: [{
        type: "StrArray",
        name: "elementKeyArray"
      }]
    }
  });
  e.exports = {
    idMap: i,
    cmdConfig: o,
    packetConfig: a
  };
}, function (e, t, n) {
  "use strict";

  e.exports = {
    nosToken: {
      1: "objectName",
      2: "token",
      3: "bucket",
      4: "expireTime",
      7: "expireSec",
      8: "tag"
    },
    audioToText: {
      2: "url"
    },
    imageOp: {
      0: "type",
      1: "stripmeta",
      2: "typeType",
      3: "blurRadius",
      4: "blurSigma",
      5: "qualityQuality",
      6: "cropX",
      7: "cropY",
      8: "cropWidth",
      9: "cropHeight",
      10: "rotateAngle",
      11: "pixelPixel",
      12: "thumbnailMode",
      13: "thumbnailWidth",
      14: "thumbnailHeight",
      15: "thumbnailAxisX",
      16: "thumbnailAxisY",
      17: "thumbnailCenterX",
      18: "thumbnailCenterY",
      19: "thumbnailEnlarge",
      20: "thumbnailToStatic",
      21: "watermarkType",
      22: "watermarkGravity",
      23: "watermarkDissolve",
      24: "watermarkDx",
      25: "watermarkDy",
      26: "watermarkImage",
      27: "watermarkText",
      28: "watermarkFont",
      29: "watermarkFontSize",
      30: "watermarkFontColor",
      31: "interlace"
    },
    robot: {
      4: "account",
      5: "nick",
      6: "avatar",
      7: "intro",
      8: "config",
      9: "valid",
      10: "createTime",
      11: "updateTime",
      12: "custid",
      13: "botid",
      14: "bindTime"
    },
    clientAntispam: {
      1: "version",
      2: "md5",
      3: "nosurl",
      4: "thesaurus"
    },
    fileQuickTransfer: {
      1: "md5",
      2: "url",
      3: "size",
      4: "threshold"
    },
    transToken: {
      1: "name",
      2: "type",
      3: "transType",
      4: "size",
      5: "extra",
      6: "body"
    },
    transInfo: {
      1: "docId",
      2: "name",
      3: "prefix",
      4: "size",
      5: "type",
      6: "state",
      7: "transType",
      8: "transSize",
      9: "pageCount",
      10: "picInfo",
      11: "extra",
      12: "flag"
    },
    fileListParam: {
      1: "fromDocId",
      2: "limit"
    },
    avSignalTag: {
      1: "type",
      2: "channelName",
      3: "channelId",
      4: "channelCreateTime",
      5: "channelExpireTime",
      6: "creator",
      7: "ext",
      8: "channelInValid",
      10: "from",
      11: "to",
      12: "requestId",
      13: "needPush",
      14: "pushTitle",
      15: "pushContent",
      16: "pushPayload",
      17: "needBadge",
      18: "members",
      19: "attach",
      20: "attachExt",
      21: "isSave",
      22: "msgid",
      23: "uid",
      24: "time"
    },
    login: {
      3: "clientType",
      4: "os",
      6: "sdkVersion",
      8: "appLogin",
      9: "protocolVersion",
      10: "pushTokenName",
      11: "pushToken",
      13: "deviceId",
      18: "appKey",
      19: "account",
      24: "browser",
      26: "session",
      32: "deviceInfo",
      38: "customTag",
      112: "isReactNative",
      1000: "token"
    },
    loginRes: {
      17: "lastLoginDeviceId",
      38: "customTag",
      102: "connectionId",
      103: "ip",
      104: "port",
      106: "country"
    },
    loginPort: {
      3: "type",
      4: "os",
      5: "mac",
      13: "deviceId",
      19: "account",
      32: "deviceInfo",
      38: "customTag",
      102: "connectionId",
      103: "ip",
      109: "time"
    },
    aosPushInfo: {
      110: "pushType",
      111: "hasTokenPreviously"
    },
    sync: {
      1: "myInfo",
      2: "offlineMsgs",
      3: "teams",
      6: "netcallMsgs",
      7: "roamingMsgs",
      9: "relations",
      11: "friends",
      12: "sessions",
      13: "friendUsers",
      14: "msgReceipts",
      15: "myTeamMembers",
      16: "donnop",
      17: "deleteMsg",
      18: "sessionAck",
      19: "robots",
      20: "broadcastMsgs",
      21: "avSignal",
      100: "filterMsgs"
    },
    donnop: {
      1: "open"
    },
    team: {
      1: "teamId",
      3: "name",
      4: "type",
      5: "owner",
      6: "level",
      7: "selfCustom",
      8: "valid",
      9: "memberNum",
      10: "memberUpdateTime",
      11: "createTime",
      12: "updateTime",
      13: "validToCurrentUser",
      14: "intro",
      15: "announcement",
      16: "joinMode",
      17: "bits",
      18: "custom",
      19: "serverCustom",
      20: "avatar",
      21: "beInviteMode",
      22: "inviteMode",
      23: "updateTeamMode",
      24: "updateCustomMode",
      100: "mute",
      101: "muteType"
    },
    teamMember: {
      1: "teamId",
      3: "account",
      4: "type",
      5: "nickInTeam",
      7: "bits",
      8: "active",
      9: "valid",
      10: "joinTime",
      11: "updateTime",
      12: "custom",
      13: "mute"
    },
    msg: {
      0: "scene",
      1: "to",
      2: "from",
      4: "fromClientType",
      5: "fromDeviceId",
      6: "fromNick",
      7: "time",
      8: "type",
      9: "body",
      10: "attach",
      11: "idClient",
      12: "idServer",
      13: "resend",
      14: "userUpdateTime",
      15: "custom",
      16: "pushPayload",
      17: "pushContent",
      18: "apnsAccounts",
      19: "apnsContent",
      20: "apnsForcePush",
      21: "yidunEnable",
      22: "antiSpamContent",
      23: "antiSpamBusinessId",
      24: "clientAntiSpam",
      25: "antiSpamUsingYidun",
      26: "needMsgReceipt",
      100: "isHistoryable",
      101: "isRoamingable",
      102: "isSyncable",
      104: "isMuted",
      105: "cc",
      107: "isPushable",
      108: "isOfflinable",
      109: "isUnreadable",
      110: "needPushNick",
      111: "isReplyMsg",
      112: "tempTeamMemberCount"
    },
    msgReceipt: {
      1: "to",
      2: "from",
      7: "time",
      11: "idClient"
    },
    teamMsgReceipt: {
      0: "teamId",
      1: "idServer",
      100: "read",
      101: "unread",
      102: "idClient",
      103: "account"
    },
    sysMsg: {
      0: "time",
      1: "type",
      2: "to",
      3: "from",
      4: "ps",
      5: "attach",
      6: "idServer",
      7: "sendToOnlineUsersOnly",
      8: "apnsText",
      9: "pushPayload",
      10: "deletedIdClient",
      11: "deletedIdServer",
      12: "yidunEnable",
      13: "antiSpamContent",
      14: "deletedMsgTime",
      15: "deletedMsgFromNick",
      16: "opeAccount",
      105: "cc",
      107: "isPushable",
      109: "isUnreadable",
      110: "needPushNick"
    },
    broadcastMsg: {
      1: "broadcastId",
      2: "fromAccid",
      3: "fromUid",
      4: "timestamp",
      5: "body"
    },
    friend: {
      4: "account",
      5: "flag",
      6: "beflag",
      7: "source",
      8: "alias",
      9: "bits",
      10: "custom",
      11: "createTime",
      12: "updateTime",
      13: "serverex"
    },
    user: {
      1: "account",
      3: "nick",
      4: "avatar",
      5: "sign",
      6: "gender",
      7: "email",
      8: "birth",
      9: "tel",
      10: "custom",
      12: "createTime",
      13: "updateTime"
    },
    specialRelation: {
      0: "account",
      1: "isMuted",
      2: "isBlacked",
      3: "createTime",
      4: "updateTime"
    },
    msgType: {
      0: "text",
      1: "picture",
      2: "audio",
      3: "video",
      4: "location",
      5: "notification",
      6: "file",
      7: "netcall_audio",
      8: "netcall_vedio",
      9: "datatunnel_new",
      10: "tips",
      11: "robot",
      100: "custom"
    },
    msgEvent: {
      1: "type",
      2: "value",
      3: "idClient",
      4: "custom",
      5: "validTime",
      6: "broadcastType",
      7: "sync",
      8: "validTimeType",
      9: "durable",
      10: "time",
      11: "idServer",
      12: "clientType",
      13: "serverConfig",
      14: "serverCustom",
      101: "appid",
      103: "account",
      104: "enableMultiClient",
      106: "consid"
    },
    msgEventSubscribe: {
      1: "type",
      2: "subscribeTime",
      3: "sync",
      102: "to",
      104: "from",
      105: "time"
    }
  };
}, function (e, t, n) {
  "use strict";

  e.exports = {
    nosToken: {
      objectName: 1,
      token: 2,
      bucket: 3,
      expireTime: 4,
      expireSec: 7,
      tag: 8
    },
    audioToText: {
      url: 2
    },
    imageOp: {
      type: 0,
      stripmeta: 1,
      typeType: 2,
      blurRadius: 3,
      blurSigma: 4,
      qualityQuality: 5,
      cropX: 6,
      cropY: 7,
      cropWidth: 8,
      cropHeight: 9,
      rotateAngle: 10,
      pixelPixel: 11,
      thumbnailMode: 12,
      thumbnailWidth: 13,
      thumbnailHeight: 14,
      thumbnailAxisX: 15,
      thumbnailAxisY: 16,
      thumbnailCenterX: 17,
      thumbnailCenterY: 18,
      thumbnailEnlarge: 19,
      thumbnailToStatic: 20,
      watermarkType: 21,
      watermarkGravity: 22,
      watermarkDissolve: 23,
      watermarkDx: 24,
      watermarkDy: 25,
      watermarkImage: 26,
      watermarkText: 27,
      watermarkFont: 28,
      watermarkFontSize: 29,
      watermarkFontColor: 30,
      interlace: 31
    },
    robot: {
      account: 4,
      nick: 5,
      avatar: 6,
      intro: 7,
      config: 8,
      valid: 9,
      createTime: 10,
      updateTime: 11,
      custid: 12,
      botid: 13,
      bindTime: 14
    },
    clientAntispam: {
      version: 1,
      md5: 2,
      nosurl: 3,
      thesaurus: 4
    },
    fileQuickTransfer: {
      md5: 1,
      url: 2,
      size: 3,
      threshold: 4
    },
    transToken: {
      name: 1,
      type: 2,
      transType: 3,
      size: 4,
      extra: 5,
      body: 6
    },
    transInfo: {
      docId: 1,
      name: 2,
      prefix: 3,
      size: 4,
      type: 5,
      state: 6,
      transType: 7,
      transSize: 8,
      pageCount: 9,
      picInfo: 10,
      extra: 11,
      flag: 12
    },
    fileListParam: {
      fromDocId: 1,
      limit: 2
    },
    avSignalTag: {
      type: 1,
      channelName: 2,
      channelId: 3,
      channelCreateTime: 4,
      channelExpireTime: 5,
      creator: 6,
      ext: 7,
      channelInValid: 8,
      from: 10,
      to: 11,
      requestId: 12,
      needPush: 13,
      pushTitle: 14,
      pushContent: 15,
      pushPayload: 16,
      needBadge: 17,
      members: 18,
      attach: 19,
      attachExt: 20,
      isSave: 21,
      msgid: 22,
      uid: 23,
      time: 24
    },
    login: {
      clientType: 3,
      os: 4,
      sdkVersion: 6,
      appLogin: 8,
      protocolVersion: 9,
      pushTokenName: 10,
      pushToken: 11,
      deviceId: 13,
      appKey: 18,
      account: 19,
      browser: 24,
      session: 26,
      deviceInfo: 32,
      isReactNative: 112,
      token: 1e3,
      customTag: 38
    },
    loginRes: {
      lastLoginDeviceId: 17,
      customTag: 38,
      connectionId: 102,
      ip: 103,
      port: 104,
      country: 106
    },
    loginPort: {
      type: 3,
      os: 4,
      mac: 5,
      deviceId: 13,
      account: 19,
      deviceInfo: 32,
      connectionId: 102,
      ip: 103,
      time: 109,
      customTag: 38
    },
    aosPushInfo: {
      pushType: 110,
      hasTokenPreviously: 111
    },
    sync: {
      myInfo: 1,
      offlineMsgs: 2,
      teams: 3,
      netcallMsgs: 6,
      roamingMsgs: 7,
      relations: 9,
      friends: 11,
      sessions: 12,
      friendUsers: 13,
      msgReceipts: 14,
      myTeamMembers: 15,
      donnop: 16,
      deleteMsg: 17,
      sessionAck: 18,
      robots: 19,
      broadcastMsgs: 20,
      avSignal: 21,
      filterMsgs: 100
    },
    donnop: {
      open: 1
    },
    team: {
      teamId: 1,
      name: 3,
      type: 4,
      owner: 5,
      level: 6,
      selfCustom: 7,
      valid: 8,
      memberNum: 9,
      memberUpdateTime: 10,
      createTime: 11,
      updateTime: 12,
      validToCurrentUser: 13,
      intro: 14,
      announcement: 15,
      joinMode: 16,
      bits: 17,
      custom: 18,
      serverCustom: 19,
      avatar: 20,
      beInviteMode: 21,
      inviteMode: 22,
      updateTeamMode: 23,
      updateCustomMode: 24,
      mute: 100,
      muteType: 101
    },
    teamMember: {
      teamId: 1,
      account: 3,
      type: 4,
      nickInTeam: 5,
      bits: 7,
      active: 8,
      valid: 9,
      joinTime: 10,
      updateTime: 11,
      custom: 12,
      mute: 13
    },
    msg: {
      scene: 0,
      to: 1,
      from: 2,
      fromClientType: 4,
      fromDeviceId: 5,
      fromNick: 6,
      time: 7,
      type: 8,
      body: 9,
      attach: 10,
      idClient: 11,
      idServer: 12,
      resend: 13,
      userUpdateTime: 14,
      custom: 15,
      pushPayload: 16,
      pushContent: 17,
      apnsAccounts: 18,
      apnsContent: 19,
      apnsForcePush: 20,
      yidunEnable: 21,
      antiSpamContent: 22,
      antiSpamBusinessId: 23,
      clientAntiSpam: 24,
      antiSpamUsingYidun: 25,
      needMsgReceipt: 26,
      isHistoryable: 100,
      isRoamingable: 101,
      isSyncable: 102,
      isMuted: 104,
      cc: 105,
      isPushable: 107,
      isOfflinable: 108,
      isUnreadable: 109,
      needPushNick: 110,
      isReplyMsg: 111,
      tempTeamMemberCount: 112
    },
    msgReceipt: {
      to: 1,
      from: 2,
      time: 7,
      idClient: 11
    },
    teamMsgReceipt: {
      teamId: 0,
      idServer: 1,
      read: 100,
      unread: 101,
      idClient: 102,
      account: 103
    },
    sysMsg: {
      time: 0,
      type: 1,
      to: 2,
      from: 3,
      ps: 4,
      attach: 5,
      idServer: 6,
      sendToOnlineUsersOnly: 7,
      apnsText: 8,
      pushPayload: 9,
      deletedIdClient: 10,
      deletedIdServer: 11,
      yidunEnable: 12,
      antiSpamContent: 13,
      deletedMsgTime: 14,
      deletedMsgFromNick: 15,
      opeAccount: 16,
      cc: 105,
      isPushable: 107,
      isUnreadable: 109,
      needPushNick: 110
    },
    broadcastMsg: {
      broadcastId: 1,
      fromAccid: 2,
      fromUid: 3,
      timestamp: 4,
      body: 5
    },
    friend: {
      account: 4,
      flag: 5,
      beflag: 6,
      source: 7,
      alias: 8,
      bits: 9,
      custom: 10,
      createTime: 11,
      updateTime: 12,
      serverex: 13
    },
    user: {
      account: 1,
      nick: 3,
      avatar: 4,
      sign: 5,
      gender: 6,
      email: 7,
      birth: 8,
      tel: 9,
      custom: 10,
      createTime: 12,
      updateTime: 13
    },
    specialRelation: {
      account: 0,
      isMuted: 1,
      isBlacked: 2,
      createTime: 3,
      updateTime: 4
    },
    msgType: {
      text: 0,
      picture: 1,
      audio: 2,
      video: 3,
      location: 4,
      notification: 5,
      file: 6,
      netcall_audio: 7,
      netcall_vedio: 8,
      datatunnel_new: 9,
      tips: 10,
      robot: 11,
      custom: 100
    },
    msgEvent: {
      type: 1,
      value: 2,
      idClient: 3,
      custom: 4,
      validTime: 5,
      broadcastType: 6,
      sync: 7,
      validTimeType: 8,
      durable: 9,
      time: 10,
      idServer: 11,
      clientType: 12,
      serverConfig: 13,
      serverCustom: 14,
      appid: 101,
      account: 103,
      enableMultiClient: 104,
      consid: 106
    },
    msgEventSubscribe: {
      type: 1,
      subscribeTime: 2,
      sync: 3,
      to: 102,
      from: 104,
      time: 105
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(24).fn,
      s = n(0),
      i = n(78);

  r.processAvSignal = function (e) {
    switch (console.log(e, "avSignal..."), e.cmd) {
      case "signalingCreate":
      case "signalingDelay":
      case "signalingClose":
      case "signalingJoin":
      case "signalingLeave":
      case "signalingInvite":
      case "signalingCancel":
      case "signalingReject":
      case "signalingAccept":
      case "signalingControl":
      case "signalingSyncMsgRead":
        break;

      case "signalingNotify":
        this.onSignalingNotify(e);
        break;

      case "signalingMutilClientSyncNotify":
        this.onSignalingMutilClientSyncNotify(e);
        break;

      case "signalingUnreadMessageSyncNotify":
        this.onSignalingUnreadMessageSyncNotify(e);
        break;

      case "signalingChannelsSyncNotify":
        this.onSignalingMembersSyncNotify(e);
        break;

      default:
        this.logger.log("avSignal::unhandled cmd:", e.cmd);
    }
  };

  var o = function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

    if (e.needPush && (e.needPush = "1" === e.needPush), e.needBadge && (e.needBadge = "1" === e.needBadge), e.channelInValid && (e.channelInValid = "1" === e.channelInValid), e.attach) {
      var t = JSON.parse(e.attach);
      e.eventType = i.parseAvSignalType(t.type);
    }

    if (e.members) {
      var n = JSON.parse(e.members);
      e.members = n.map(function (e) {
        return i.parseAvSignalMember(e);
      });
    }

    return e;
  };

  r.onSignalingNotify = function (e) {
    if (e.error) {
      var t = e.error;
      this.logger.error("protocal::avSignal:onSignalingNotify error", t), this.emitAPI({
        type: "error",
        error: t
      }), this.options.onerror(t);
    } else {
      e.raw && e.raw.r && e.raw.r.length && e.content && e.content.avSignalTag && (e.content.avSignalTag.msgid = e.raw.r[0]);
      var n = e.content;
      n = Array.isArray(n) ? n.map(function (e) {
        return o(e);
      }) : o(n), this.emitAPI({
        type: "signalingNotify",
        obj: n
      }), s.isFunction(this.options.onSignalingNotify) && this.options.onSignalingNotify(n);
    }
  }, r.onSignalingMutilClientSyncNotify = function (e) {
    if (e.error) {
      var t = e.error;
      this.logger.error("protocal::avSignal:onSignalingMutilClientSyncNotify error", t), this.emitAPI({
        type: "error",
        error: t
      }), this.options.onerror(t);
    } else this.emitAPI({
      type: "signalingMutilClientSyncNotify",
      obj: e.content
    }), s.isFunction(this.options.onSignalingMutilClientSyncNotify) && this.options.onSignalingMutilClientSyncNotify(e.content);
  }, r.onSignalingUnreadMessageSyncNotify = function (e) {
    if (e.error) {
      var t = e.error;
      this.logger.error("protocal::avSignal:onSignalingUnreadMessageSyncNotify error", t), this.emitAPI({
        type: "error",
        error: t
      }), this.options.onerror(t);
    } else {
      var n = e.content.avSignalTag;
      Array.isArray(n) && (n = n.map(function (e) {
        return o(e);
      })), this.emitAPI({
        type: "signalingUnreadMessageSyncNotify",
        obj: n
      }), s.isFunction(this.options.onSignalingUnreadMessageSyncNotify) && this.options.onSignalingUnreadMessageSyncNotify(n);
    }
  }, r.onSignalingMembersSyncNotify = function (e) {
    if (e.error) {
      var t = e.error;
      this.logger.error("protocal::avSignal:onSignalingMembersSyncNotify error", t), this.emitAPI({
        type: "error",
        error: t
      }), this.options.onerror(t);
    } else {
      var n = e.content.avSignalTag;
      Array.isArray(n) || (n = [n]), n = n.map(function (e) {
        return o(e);
      }), this.emitAPI({
        type: "signalingChannelsSyncNotify",
        obj: n
      }), s.isFunction(this.options.onSignalingMembersSyncNotify) && this.options.onSignalingMembersSyncNotify(n);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(24).fn,
      s = n(79);

  r.processMisc = function (e) {
    switch (e.cmd) {
      case "getSimpleNosToken":
        e.error || (e.obj = e.content.nosTokens[0]);
        break;

      case "getNosToken":
        e.error || (e.obj = e.content.nosToken);
        break;

      case "notifyUploadLog":
        e.error || this.emitAPI({
          type: "notifyUploadLog"
        });
        break;

      case "audioToText":
        e.error || (e.obj.text = e.content.text);
        break;

      case "processImage":
        e.obj.imageOps = s.reverseImageOps(e.obj.imageOps), e.error || (e.obj = {
          url: e.content.url
        });
        break;

      case "getNosTokenTrans":
        e.error || (e.obj = {
          nosToken: e.content.nosToken,
          docId: e.content.docId
        });
        break;

      case "notifyTransLog":
        e.error || this.emitAPI({
          type: "notifyTransLog",
          obj: e.content.transInfo
        });
        break;

      case "fetchFile":
      case "fetchFileList":
      case "removeFile":
        e.error || (e.obj = e.content);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(24).fn,
      s = n(1);
  r.processLink = function (e) {
    e.cmd;
  }, r.startHeartbeat = function () {
    var e = this;
    e.stopHeartbeat(), e.heartbeatTimer = setTimeout(function () {
      e.sendCmd("heartbeat", null, e.onHeartbeat.bind(e));
    }, s.heartbeatInterval);
  }, r.stopHeartbeat = function () {
    this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), this.heartbeatTimer = null);
  }, r.onHeartbeat = function (e, t) {
    e ? (e.callFunc = "link::onHeartbeat", this.api.reportLogs({
      event: "ping_timeout"
    }), this.onCustomError("heartbeat error", "HEARTBEAT_ERROR", e)) : this.startHeartbeat();
  }, r.heartbeat = function () {};
}, function (e, t, n) {
  "use strict";

  var r = n(30),
      s = n(46),
      i = n(29),
      o = n(50),
      a = n(68),
      c = Object.assign;
  e.exports = !c || n(21)(function () {
    var e = {},
        t = {},
        n = Symbol(),
        r = "abcdefghijklmnopqrst";
    return e[n] = 7, r.split("").forEach(function (e) {
      t[e] = e;
    }), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
  }) ? function (e, t) {
    for (var n = o(e), c = arguments.length, u = 1, l = s.f, m = i.f; c > u;) {
      for (var d, p = a(arguments[u++]), f = l ? r(p).concat(l(p)) : r(p), g = f.length, h = 0; g > h;) {
        m.call(p, d = f[h++]) && (n[d] = p[d]);
      }
    }

    return n;
  } : c;
}, function (e, t, n) {
  var r = n(23);
  r(r.S + r.F, "Object", {
    assign: n(147)
  });
}, function (e, t, n) {
  n(148), e.exports = n(11).Object.assign;
}, function (e, t, n) {
  e.exports = {
    default: n(149),
    __esModule: !0
  };
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0;
  var r,
      s = n(150),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  t.default = i.default || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var r in n) {
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
    }

    return e;
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(151),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o,
      a = n(24).fn,
      c = n(4),
      u = n(45),
      l = n(55),
      m = n(20),
      d = n(1),
      p = n(0),
      f = p.notundef;
  a.login = function () {
    var e = this;
    Promise.resolve().then(function () {
      return e.assembleLogin();
    }).then(function (t) {
      e.sendCmd("login", (0, i.default)({}, t), e.onLogin.bind(e));
    }), e.autoconnect = !1;
  }, a.genSessionKey = (o = {}, function () {
    var e = this.name;
    return o[e] = o[e] || p.guid();
  }), a.assembleIMLogin = function () {
    var e = this.options,
        t = e.account,
        n = this.autoconnect ? 0 : 1;
    return this.sdkSession = this.genSessionKey(), {
      appLogin: n,
      appKey: e.appKey,
      account: t,
      token: e.token,
      sdkVersion: d.info.sdkVersion,
      protocolVersion: d.info.protocolVersion,
      os: u.os.toString(),
      browser: u.name + " " + u.version,
      clientType: d.CLIENTTYPE || 16,
      session: this.sdkSession,
      deviceId: m.deviceId,
      isReactNative: d.isRN ? 1 : 0,
      customTag: e.customTag || ""
    };
  }, a.onLogin = function (e, t) {
    this.loginResult = t, e ? this.onAuthError(e, "link::onLogin") : (this.startHeartbeat(), this.afterLogin(t));
  }, a.afterLogin = p.emptyFunc, a.notifyLogin = function () {
    var e = this.loginResult;
    this.logger.info("link::notifyLogin: on connect", e), this.options.onconnect(e);
  }, a.logout = function () {
    var e = "done disconnect";
    if (this.doLogout) return this.doLogout = !1, e = "done logout", void this.onAuthError(new c(e, "logout"), "link::logout");

    if (this.isConnected()) {
      var t = new c(e, "logout");
      this.onAuthError(t, "link::logout");
    }
  }, a.onKicked = function (e) {
    var t = e.content,
        n = t.from,
        r = t.reason,
        s = t.custom,
        i = {
      reason: this.kickedReasons[r] || "unknown",
      message: this.kickedMessages[r] || "未知原因"
    };

    if (f(n) && (i.from = l.reverseType(n)), f(s) && (i.custom = s), this.shouldNotifyKicked(i)) {
      var o = new c("被踢了", "kicked");
      p.merge(o, i), this.onAuthError(o, "link::onKicked");
    } else this.logger.warn("link::onKicked: silentlyKick"), this.shouldReconnect = !0, this.hasNotifyDisconnected = !0, this.disconnectSocket();
  }, a.shouldNotifyKicked = function (e) {
    return "silentlyKick" !== e.reason;
  }, a.onAuthError = function (e, t) {
    this.shouldReconnect = !1, (e = e || c.newConnectionError({
      callFunc: t
    })).callFunc = e.callFunc || t || null, this.markAllCallbackInvalid(e), this.notifyDisconnect(e);
  };
}, function (e, t) {
  e.exports = function (e) {
    return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
      enumerable: !0,
      get: function get() {
        return e.l;
      }
    }), Object.defineProperty(e, "id", {
      enumerable: !0,
      get: function get() {
        return e.i;
      }
    }), e.webpackPolyfill = 1), e;
  };
}, function (e, t) {
  function n(e) {
    e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
  }

  e.exports = n, n.prototype.duration = function () {
    var e = this.ms * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
      var t = Math.random(),
          n = Math.floor(t * this.jitter * e);
      e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
    }

    return 0 | Math.min(e, this.max);
  }, n.prototype.reset = function () {
    this.attempts = 0;
  }, n.prototype.setMin = function (e) {
    this.ms = e;
  }, n.prototype.setMax = function (e) {
    this.max = e;
  }, n.prototype.setJitter = function (e) {
    this.jitter = e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(24).fn,
      s = n(4),
      i = n(154),
      o = n(77),
      a = n(1),
      c = n(0);
  r.initConnect = function () {
    this.socket = null, this.retryCount = 0, this.connecting = !1, this.shouldReconnect = !0, this.hasNotifyDisconnected = !1, this.doLogout = !1;
  }, r.resetConnect = function () {
    var e = this.options;
    c.notundef(e.needReconnect) ? (c.verifyParamType("needReconnect", e.needReconnect, "boolean", "link::resetConnect"), this.needReconnect = e.needReconnect) : this.needReconnect = !0, this.logger.log("link::resetConnect: needReconnect " + this.needReconnect), c.notundef(e.reconnectionAttempts) && c.verifyParamType("reconnectionAttempts", e.reconnectionAttempts, "number", "link::resetConnect"), this.reconnectionAttempts = "number" == typeof e.reconnectionAttempts ? e.reconnectionAttempts : 1 / 0, this.backoff = new i({
      min: a.reconnectionDelay,
      max: a.reconnectionDelayMax,
      jitter: a.reconnectionJitter
    });
  }, r.connect = function () {
    if (this.isConnected()) this.logger.warn("link::connect: already connected");else if (this.connecting) this.logger.warn("link::connect: already connecting");else if (this.connecting = !0, this.hasNotifyDisconnected = !1, this.socket) this.logger.info("link::connect: try connecting..."), this.socket.socket.connect();else if (this.options.socketUrl && "string" == typeof this.options.socketUrl) this.connectToUrl(this.options.socketUrl);else {
      var e = this.getNextSocketUrl();
      e ? this.connectToUrl(e) : this.refreshSocketUrl();
    }
  }, r.getNextSocketUrl = function () {
    return this.socketUrls.shift();
  }, r.isConnected = function () {
    return !!this.socket && !!this.socket.socket && this.socket.socket.connected;
  }, r.connectToUrl = function (e) {
    var t = this;

    if (t.logger.log("link::connectToUrl: " + e), "undefined" == typeof window) {
      var n = c.getGlobal(),
          r = e.split(":");
      n.location || (n.location = {
        protocol: r[0],
        hostname: r[1].slice(2),
        port: r[2]
      }), this.options.transports = ["websocket"];
    }

    var s = this.options.transports || ["websocket", "xhr-polling"];
    t.socket = o.connect(e, {
      transports: s,
      reconnect: !1,
      "force new connection": !0,
      "connect timeout": a.connectTimeout
    }), t.logger.info("link::connectToUrl: socket url: " + e + ", transports: " + JSON.stringify(s)), t.socket.on("connect", t.onConnect.bind(t)), t.socket.on("handshake_failed", t.onHandshakeFailed.bind(t)), t.socket.on("connect_failed", t.onConnectFailed.bind(t)), t.socket.on("error", t.onError.bind(t)), t.socket.on("message", t.onMessage.bind(t)), t.socket.on("disconnect", function (n) {
      t.logger.warn("link::connectToUrl: socket url: " + e + ", disconnected"), t.doLogout ? t.logout() : t.onDisconnect(!0, "link::socketDisconnect");
    });
  }, r.disconnect = function (e) {
    var t = this;

    function n(n) {
      t.logger.info("link::disconnect: socket finally closed, ", n), clearTimeout(t.disconnectCallbackTimer), e(n);
    }

    e instanceof Function || (e = function e() {}), clearTimeout(t.connectTimer), t.disconnectCallbackTimer = setTimeout(function () {
      e.call(t, "mark disconnected due to timeout");
    }, 1e4), t.socket && t.socket.socket && t.socket.socket.transport ? t.socket.socket.transport.onDisconnectDone = function (e) {
      n(e);
    } : n(null), t.isConnected() ? (t.logger.log("link::disconnect: start disconnecting"), t.logout()) : t.connecting ? (t.logger.log("link::disconnect: abort connecting"), t.disconnectSocket()) : (t.logger.log("link::disconnect: start otherwise"), t.connecting = !1, t.shouldReconnect = !1, t.needReconnect = !1, t.options.ondisconnect({
      callFunc: "link::disconnect",
      message: "manually disconnect status"
    }));
  }, r.onConnect = function () {
    this.backoff && this.backoff.reset(), this.reconnectStatus = this.retryCount > 0 ? 1 : 0, this.retryCount = 0, this.connecting = !1, this.shouldReconnect = !0, this.hasNotifyDisconnected = !1, this.logger.log("link::onConnect: socket onconnected, start login"), this.login(), this.api.reportLogs({
      event: "ws_connected"
    });
  }, r.onHandshakeFailed = function () {
    this.api.reportLogs({
      event: "ws_handshake_failed"
    }), this.onDisconnect(!1, "link::onHandshakeFailed");
  }, r.onConnectFailed = function () {
    this.api.reportLogs({
      event: "ws_connect_failed"
    }), this.onDisconnect(!1, "link::onConnectFailed");
  }, r.onError = function () {
    var e = arguments[0];

    if (e) {
      if (this.api.reportLogs({
        event: "connect_timeout"
      }), void 0 !== e.x5ImgDecodeStatus) return;
      if (Object.keys(e).length <= 0) return;
      this.onMiscError("连接错误", new s(e, "LINK_ERROR", {
        callFunc: "link::onError"
      }));
    }

    this.connecting = !1;
  }, r.onDisconnect = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    this.connected = e, this.connecting = !1, this.markAllCallbackInvalid(s.newNetworkError({
      callFunc: t
    })), this.stopHeartbeat(), this.reconnect();
  }, r.willReconnect = function () {
    return this.shouldReconnect && this.needReconnect && this.retryCount < this.reconnectionAttempts;
  }, r.reconnect = function () {
    var e = this;
    if (e.willReconnect()) {
      if (e.socket && e.socket.socket && e.socket.socket.transport && e.socket.socket.transport.websocket) {
        e.logger.info("link::reconnect: on socket closed");

        try {
          e.socket.socket.transport.websocket.close();
        } catch (t) {
          e.logger.warn("link::reconnect: force disconnect error:", t);
        }

        e.socket.socket.transport.onConnectionOver = function () {
          e.logger.log("link::reconnect: on connectionOver"), clearTimeout(e.reconnectTimer), e.doReconnect();
        };
      } else clearTimeout(e.reconnectTimer), e.reconnectTimer = setTimeout(function () {
        e.logger.info("link::reconnect: on socket timeout"), e.doReconnect();
      }, 3e4);
    } else e.notifyDisconnect();
  }, r.doReconnect = function () {
    var e = this;
    e.socket = null, e.connected && (e.autoconnect = !0), e.retryCount++, e.appLogin = 1;
    var t = e.backoff.duration();
    e.logger.info("link::reconnect: will retry after " + t + "ms, retryCount " + e.retryCount), e.options.onwillreconnect({
      retryCount: e.retryCount,
      duration: t
    }), clearTimeout(e.connectTimer), e.connectTimer = setTimeout(function () {
      e.connect();
    }, t);
  }, r.notifyConnectError = function (e) {
    var t = s.newConnectError({
      message: e,
      callFunc: "link::notifyConnectError"
    });
    this.logger.error("link::notifyConnectError:", t), this.options.onerror(t);
  }, r.notifyDisconnect = function (e) {
    var t = this;
    t.hasNotifyDisconnected || (t.hasNotifyDisconnected = !0, t.disconnectSocket(), (e = e || new s()).retryCount = t.retryCount, e.willReconnect = t.willReconnect(), t.backoff && t.backoff.reset(), t.retryCount = 0, t.socket && t.socket.socket && t.socket.socket.transport && t.socket.socket.transport.websocket ? (t.logger.info("link::notifyDisconnect: ondisconnected", e), t.socket.socket.transport.onConnectionOver = function () {
      t.socket = null, t.options.ondisconnect(e);
    }) : (t.logger.info("link::notifyDisconnect: ondisconnected/no transport ws", e), t.options.ondisconnect(e)), t.onWbNotifyHangup instanceof Function && t.onWbNotifyHangup({
      content: {
        account: t.account,
        channelId: null,
        timetag: +Date()
      }
    }));
  }, r.disconnectSocket = function () {
    if (this.isConnected() || this.connecting) try {
      this.connecting = !1, this.shouldReconnect = !1, this.needReconnect = !1, this.socket.disconnect();
    } catch (e) {
      this.logger.info("link::disconnectSocket: disconnect failed, error ", e);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(12).fn,
      a = n(0),
      c = n(57),
      u = n(78);
  o.signalingCreate = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.type,
        n = e.channelName,
        r = e.ext;
    return a.verifyOptions(e, "type", "api::signalling"), this.sendCmdUsePromise("signalingCreate", {
      avSignalTag: {
        type: t,
        channelName: n,
        ext: r
      }
    }).then(function (e) {
      var t = e.avSignalTag;
      return Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingDelay = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingDelay", {
      avSignalTag: e
    }).then(function (e) {
      var t = e.avSignalTag;
      return Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingClose = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.offlineEnabled;
    return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingClose", {
      avSignalTag: a.merge(e, {
        isSave: !0 === t ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingJoin = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.offlineEnabled;
    return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingJoin", {
      avSignalTag: a.merge(e, {
        isSave: !0 === t ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag,
          n = t.members;
      return "string" == typeof t.members && (n = JSON.parse(t.members).map(function (e) {
        return u.parseAvSignalMember(e);
      })), t.members = n, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingLeave = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.offlineEnabled;
    return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingLeave", {
      avSignalTag: a.merge(e, {
        isSave: !0 === t ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingInvite = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.account,
        n = e.offlineEnabled,
        r = e.pushInfo,
        s = void 0 === r ? {} : r;
    a.verifyOptions(e, "channelId requestId account", "api::signalling"), "object" === (0, i.default)(s.pushPayload) && (s.pushPayload = JSON.stringify(s.pushPayload));
    var o = a.merge(e, s, {
      to: t,
      isSave: !0 === n ? 1 : 0,
      needPush: !0 === s.needPush ? 1 : 0,
      needBadge: !1 === s.needBadge ? 0 : 1
    });
    return this.sendCmdUsePromise("signalingInvite", {
      avSignalTag: o
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, t.needBadge = 1 === t.needBadge, t.needPush = 1 === t.needPush, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingCancel = function (e) {
    var t = e.account,
        n = e.offlineEnabled;
    return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise("signalingCancel", {
      avSignalTag: a.merge(e, {
        to: t,
        isSave: !0 === n ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingCall = function (e) {
    var t = this,
        n = e.account,
        r = e.offlineEnabled,
        s = e.requestId;
    a.verifyOptions(e, "type requestId account", "api::signalling");
    var i = "";
    return this.signalingCreate(e).catch(function (e) {
      return e.code, Promise.reject(e);
    }).then(function (n) {
      t.logger.log("api::avSignal:signalingCall create:", n);
      var s = {
        channelId: i = n.channelId,
        offlineEnabled: r,
        attachExt: e.attachExt || ""
      };
      return e.uid && a.merge(s, {
        uid: e.uid
      }), t.signalingJoin(s);
    }).then(function (o) {
      t.logger.log("api::avSignal:signalingCall join:", o);
      var a = {
        channelId: i = o.channelId || i,
        account: n,
        requestId: s,
        offlineEnabled: r,
        attachExt: e.attachExt || "",
        pushInfo: e.pushInfo || {}
      };
      return t.signalingInvite(a);
    });
  }, o.signalingReject = function (e) {
    var t = e.account,
        n = e.offlineEnabled;
    return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise("signalingReject", {
      avSignalTag: a.merge(e, {
        to: t,
        isSave: !0 === n ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingAccept = function (e) {
    var t = e.account,
        n = e.offlineEnabled;
    return a.verifyOptions(e, "channelId requestId account", "api::signalling"), this.sendCmdUsePromise("signalingAccept", {
      avSignalTag: a.merge(e, {
        to: t,
        isSave: !0 === n ? 1 : 0
      })
    }).then(function (e) {
      var t = e.avSignalTag;
      return t.offlineEnabled = 1 === t.isSave, delete t.isSave, Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingControl = function (e) {
    var t = e.account;
    return a.verifyOptions(e, "channelId", "api::signalling"), this.sendCmdUsePromise("signalingControl", {
      avSignalTag: a.merge(e, t ? {
        to: t
      } : {})
    }).then(function (e) {
      var t = e.avSignalTag;
      return Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingSync = function () {
    return this.sendCmdUsePromise("sync", {
      sync: {
        avSignal: 0
      }
    }).then(function (e) {
      var t = e.avSignalTag;
      return Promise.resolve(t);
    }).catch(function (e) {
      return Promise.reject(u.parseAvSignalError(e));
    });
  }, o.signalingMarkMsgRead = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a.verifyOptions(e, "msgid", "api::signalling");
    var t = c.idMap.avSignal;
    return this.sendCmdUsePromise("batchMarkRead", {
      sid: t.id,
      cid: t.signalingNotify,
      ids: e.msgid
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(12).fn,
      s = n(0),
      i = n(26),
      o = n(1),
      a = n(45);
  (a = a || {}).name = a.name || "", a.version = a.version || "", r.reportLogs = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = this,
        n = t.options,
        r = o.ntServerAddress;

    if (r) {
      var c = o.info;
      e = s.merge(e, {
        appkey: n.appKey,
        uid: n.account,
        os: "web",
        session: t.protocol.sdkSession || "",
        ver: c.sdkVersion,
        type: t.subType,
        platform: "" + a.name.toLowerCase() + a.version.replace(/(\.\d+)+$/, "")
      });
      var u = r + s.genUrlSep(r),
          l = [];

      for (var m in e) {
        l.push(m + "=" + e[m]);
      }

      u += l.join("&"), i(u, {
        proxyUrl: s.url2origin(u) + "/lbs/res/cors/nej_proxy_frame.html",
        timeout: o.xhrTimeout,
        onload: function onload() {},
        onerror: function onerror(e) {
          t.logger.info("report::ajax report error", e);
        }
      });
    }
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(0),
      a = n(12).fn;

  function c(e, t, n, r) {
    var s = !1,
        i = "";
    if (1 === n ? e.indexOf(t) >= 0 && (s = !0, i = t) : 2 === n && (i = new RegExp(t, "g")).test(e) && (s = !0), s && "" !== i) switch (r) {
      case 1:
        return e.replace(i, "**");

      case 2:
        return {
          code: 2
        };

      case 3:
        return {
          code: 3
        };
    }
    return e;
  }

  function u(e, t) {
    for (var n = t.match, r = t.operate, s = e, o = 0; o < t.keys.length; o++) {
      var a = t.keys[o],
          u = a.match || n,
          l = a.operate || r;

      try {
        if ("object" === (void 0 === (s = c(s, a.key, u, l)) ? "undefined" : (0, i.default)(s))) return s;
      } catch (e) {
        this.logger.warn("misc::filterContent: js cannot parse this regexp ", e);
      }
    }

    return s;
  }

  a.uploadSdkLogUrl = function (e) {
    return o.verifyOptions(e, "url", "misc::uploadSdkLogUrl"), this.cbAndSendCmd("uploadSdkLogUrl", e);
  }, a.getClientAntispamLexicon = function (e) {
    var t = this,
        n = (e = e || {}).done;
    n instanceof Function || (n = function n() {}), e = {
      clientAntispam: {
        version: 0
      }
    };
    var r = this;
    return this.protocol.sendCmd("getClientAntispam", e, function (e, s, i) {
      e ? (r.protocol.logger.error("misc::getClientAntispamLexicon:", e), n.call(t, e, {})) : (n.call(t, null, i), r.antispamLexicon = i.clientAntispam || {});
    });
  }, a.filterClientAntispam = function (e) {
    var t = e.content,
        n = e.antispamLexicon;
    if (!t) return {
      code: 404,
      errmsg: "待反垃圾文本content不存在"
    };
    n = n || this.antispamLexicon || {};
    var r = this.antispamLexicon && this.antispamLexicon.thesaurus;
    if (!r) return {
      code: 404,
      errmsg: "没有反垃圾词库或者词库格式不合法"
    };

    try {
      r = JSON.parse(r).thesaurus;
    } catch (e) {
      return this.protocol.logger.error("misc::filterClientAntispam: parse thesaurus error"), {
        code: 500,
        errmsg: "反垃圾词库格式不合法"
      };
    }

    for (var s = t, o = 0; o < r.length; o++) {
      if ("object" === (void 0 === (s = u.call(this, s, r[o])) ? "undefined" : (0, i.default)(s))) {
        if (2 === s.code) return {
          code: 200,
          type: 2,
          errmsg: "建议拒绝发送",
          content: t,
          result: ""
        };
        if (3 === s.code) return {
          code: 200,
          type: 3,
          errmsg: "建议服务器处理反垃圾，发消息带上字段clientAntiSpam",
          content: t,
          result: t
        };
      }
    }

    return s === t ? {
      code: 200,
      type: 0,
      errmsg: "",
      content: t,
      result: s
    } : {
      code: 200,
      type: 1,
      errmsg: "已对特殊字符做了过滤",
      content: t,
      result: s
    };
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  },
      o = n(33);
  var a,
      c = n(0),
      u = n(12).fn;
  u.viewImageSync = function (e) {
    var t = this.options;
    c.verifyOptions(e, "url", "nos::viewImageSync");
    var n = e.url,
        r = (0, o.url2object)(n),
        s = r.protocol,
        a = r.hostname,
        u = r.path,
        l = r.query;

    if ("boolean" == typeof e.strip && (l.stripmeta = e.strip ? 1 : 0), "number" == typeof e.quality && (c.verifyParamMin("quality", e.quality, 0, "nos::viewImageSync"), c.verifyParamMax("quality", e.quality, 100, "nos::viewImageSync"), l.quality = Math.round(e.quality)), "boolean" == typeof e.interlace && (l.interlace = e.interlace ? 1 : 0), "number" == typeof e.rotate && (l.rotate = Math.round(e.rotate)), "object" === (0, i.default)(e.thumbnail)) {
      var m = e.thumbnail.mode || "crop",
          d = e.thumbnail.width,
          p = e.thumbnail.height;

      if (d >= 0 && p >= 0 && d < 4096 && p < 4096 && (d > 0 || p > 0)) {
        switch (m) {
          case "crop":
            m = "y";
            break;

          case "contain":
            m = "x";
            break;

          case "cover":
            m = "z";
            break;

          default:
            m = "x";
        }

        l.thumbnail = "" + d + m + p;
      }
    }

    if (t.downloadUrl) {
      var f = (0, o.url2object)(e.url),
          g = t.downloadUrl,
          h = f.path,
          y = h.indexOf("/");

      if (-1 !== y) {
        var v = h.substring(0, y),
            b = h.substring(y + 1);
        g = g.replace("{bucket}", v).replace("{object}", b);
      }

      var M = (0, o.url2object)(g);
      return (0, o.object2url)({
        protocol: M.protocol,
        hostname: M.hostname,
        path: M.path,
        query: c.merge(M.query, l)
      });
    }

    return (0, o.object2url)({
      protocol: s,
      hostname: a,
      path: u,
      query: l
    });
  }, u.viewImageStripMeta = function (e) {
    c.verifyOptions(e, "url strip", "nos::viewImageStripMeta"), c.verifyParamType("strip", e.strip, "boolean", "nos::viewImageStripMeta");
    var t = "stripmeta=" + (e.strip ? 1 : 0),
        n = (0, o.genUrlSep)(e.url);
    return e.url + n + t;
  }, u.viewImageQuality = function (e) {
    c.verifyOptions(e, "url quality", "nos::viewImageQuality"), c.verifyParamType("quality", e.quality, "number", "nos::viewImageQuality"), c.verifyParamMin("quality", e.quality, 0, "nos::viewImageQuality"), c.verifyParamMax("quality", e.quality, 100, "nos::viewImageQuality");
    var t = "quality=" + Math.round(e.quality),
        n = (0, o.genUrlSep)(e.url);
    return e.url + n + t;
  }, u.viewImageInterlace = function (e) {
    c.verifyOptions(e, "url", "nos::viewImageInterlace");
    var t = (0, o.genUrlSep)(e.url);
    return e.url + t + "interlace=1";
  }, u.viewImageRotate = function (e) {
    for (c.verifyOptions(e, "url angle", "nos::viewImageRotate"), c.verifyParamType("angle", e.angle, "number", "nos::viewImageRotate"); e.angle < 0;) {
      e.angle = e.angle + 360;
    }

    e.angle = e.angle % 360;
    var t = "rotate=" + Math.round(e.angle),
        n = (0, o.genUrlSep)(e.url);
    return e.url + n + t;
  }, u.viewImageBlur = function (e) {
    c.verifyOptions(e, "url radius sigma", "nos::viewImageBlur"), c.verifyParamType("radius", e.radius, "number", "nos::viewImageBlur"), c.verifyParamMin("radius", e.radius, 1, "nos::viewImageBlur"), c.verifyParamMax("radius", e.radius, 50, "nos::viewImageBlur"), c.verifyParamType("sigma", e.sigma, "number", "nos::viewImageBlur"), c.verifyParamMin("sigma", e.sigma, 0, "nos::viewImageBlur");
    var t = "blur=" + Math.round(e.radius) + "x" + Math.round(e.sigma),
        n = (0, o.genUrlSep)(e.url);
    return e.url + n + t;
  }, u.viewImageCrop = function (e) {
    c.verifyOptions(e, "url x y width height", "nos::viewImageCrop"), c.verifyParamType("x", e.x, "number", "nos::viewImageCrop"), c.verifyParamMin("x", e.x, 0, "nos::viewImageCrop"), c.verifyParamType("y", e.y, "number", "nos::viewImageCrop"), c.verifyParamMin("y", e.y, 0, "nos::viewImageCrop"), c.verifyParamType("width", e.width, "number", "nos::viewImageCrop"), c.verifyParamMin("width", e.width, 0, "nos::viewImageCrop"), c.verifyParamType("height", e.height, "number", "nos::viewImageCrop"), c.verifyParamMin("height", e.height, 0, "nos::viewImageCrop");
    var t = "crop=" + Math.round(e.x) + "_" + Math.round(e.y) + "_" + Math.round(e.width) + "_" + Math.round(e.height),
        n = (0, o.genUrlSep)(e.url);
    return e.url + n + t;
  }, u.viewImageThumbnail = (a = {
    cover: "z",
    contain: "x",
    crop: "y"
  }, function (e) {
    c.verifyOptions(e, "url mode", "nos::viewImageThumbnail"), c.verifyParamValid("mode", e.mode, Object.keys(a), "nos::viewImageThumbnail"), "contain" === e.mode ? c.verifyParamAtLeastPresentOne(e, "width height", "nos::viewImageThumbnail") : c.verifyOptions(e, "width height", "nos::viewImageThumbnail"), c.undef(e.width) && (e.width = 0), c.undef(e.height) && (e.height = 0), c.verifyParamType("width", e.width, "number", "nos::viewImageThumbnail"), c.verifyParamMin("width", e.width, 0, "nos::viewImageThumbnail"), c.verifyParamType("height", e.height, "number", "nos::viewImageThumbnail"), c.verifyParamMin("height", e.height, 0, "nos::viewImageThumbnail");
    var t = Math.round(e.width),
        n = Math.round(e.height),
        r = "thumbnail=" + t + a[e.mode] + n;
    "crop" === e.mode && c.notundef(e.axis) && (c.undef(e.axis.x) && (e.axis.x = 5), c.undef(e.axis.y) && (e.axis.y = 5), c.verifyParamMin("axis.x", e.axis.x, 0, "nos::viewImageThumbnail"), c.verifyParamMax("axis.x", e.axis.x, 10, "nos::viewImageThumbnail"), c.verifyParamMin("axis.y", e.axis.y, 0, "nos::viewImageThumbnail"), c.verifyParamMax("axis.y", e.axis.y, 10, "nos::viewImageThumbnail"), r = r + "&axis=" + Math.round(e.axis.x) + "_" + Math.round(e.axis.y)), c.notundef(e.enlarge) && (c.verifyParamType("enlarge", e.enlarge, "boolean", "nos::viewImageThumbnail"), e.enlarge && (r += "&enlarge=1"));
    var s = (0, o.genUrlSep)(e.url);
    return e.url + s + r;
  });
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(0),
      i = n(12).fn,
      o = n(79),
      a = n(81),
      c = n(4);
  i.transDoc = function (e) {
    s.verifyOptions(e, "fileInput done", "nos::transDoc");

    try {
      var t = e.fileInput.files[0],
          n = e.fileInputName = t.name,
          r = {
        ppt: 1,
        pptx: 2,
        pdf: 3
      },
          i = n.substring(n.lastIndexOf(".") + 1);
      if (["ppt", "pdf", "pptx"].indexOf(i) < 0) return void e.done(c.newNoFileError("请上传正确格式的文件【ppt, pptx, pdf】", {
        callFunc: "nos: transDoc",
        fileInput: e.fileInput
      }), e);
    } catch (t) {
      return void e.done(c.newNoFileError("请上传正确的文件节点", {
        callFunc: "msg::previewFile",
        fileInput: e.fileInput
      }), e);
    }

    var o = JSON.stringify(a.genResponseBody("file") || {}).replace(/"/gi, '\\"'),
        u = {
      transToken: {
        name: n,
        type: r[i],
        transType: "png" === e.transcode ? 11 : 10,
        size: t.size,
        body: o
      }
    };
    this.getNosTokenTrans({
      responseBody: u,
      nosToken: {
        nosScene: e.nosScene || this.nosScene,
        nosSurvivalTime: e.nosSurvivalTime
      },
      callback: function (t, n) {
        t ? e.done(t) : (e.nosToken = n.nosToken, e.docId = n.docId, this._doPreviewFile(e));
      }.bind(this)
    });
  }, i.getSimpleNosToken = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return e.num = 1, s.verifyOptions(e), this.cbAndSendCmd("getSimpleNosToken", e);
  }, i.getNosToken = function (e) {
    var t = e.callback,
        n = e.nosToken,
        r = e.responseBody,
        s = {
      tag: n.nosScene
    };
    n.nosSurvivalTime && n.nosSurvivalTime !== 1 / 0 && (s.expireSec = n.nosSurvivalTime), this.sendCmd("getNosToken", {
      responseBody: r,
      nosToken: s
    }, t);
  }, i.getNosTokenTrans = function (e) {
    this.sendCmd("getNosTokenTrans", e.responseBody, e.callback);
  }, i.packFileDownloadName = function (e) {
    s.verifyOptions(e, "url name", !0, "", "nos::packFileDownloadName");
    var t = e.url;
    return t + s.genUrlSep(t) + "download=" + encodeURIComponent(e.name);
  }, i.audioToMp3 = function (e) {
    s.verifyOptions(e, "url", "nos::audioToMp3");
    var t = e.url;
    return t + s.genUrlSep(t) + "audioTrans&type=mp3";
  }, i.removeFile = function (e) {
    this.sendCmd("removeFile", e, e.callback);
  }, i.fetchFile = function (e) {
    this.sendCmd("fetchFile", e, e.callback);
  }, i.fetchFileList = function (e) {
    this.sendCmd("fetchFileList", e, e.callback);
  }, i.stripImageMeta = function (e) {
    return this.beforeProcessImage(e, "stripmeta");
  }, i.qualityImage = function (e) {
    return this.beforeProcessImage(e, "quality");
  }, i.interlaceImage = function (e) {
    return this.beforeProcessImage(e, "interlace");
  }, i.rotateImage = function (e) {
    return this.beforeProcessImage(e, "rotate");
  }, i.blurImage = function (e) {
    return this.beforeProcessImage(e, "blur");
  }, i.cropImage = function (e) {
    return this.beforeProcessImage(e, "crop");
  }, i.thumbnailImage = function (e) {
    return this.beforeProcessImage(e, "thumbnail");
  }, i.beforeProcessImage = function (e, t) {
    var n = s.copy(e);
    return n.type = t, e.ops = [n], this.processImage(e);
  }, i.processImage = function (e) {
    var t = this;
    s.verifyOptions(e, "url ops", !0, "", "nos::processImage"), s.verifyParamType("ops", e.ops, "array", "nos::processImage");
    var n = e.ops.map(function (e) {
      return s.verifyOptions(e, "type", !0, "", "nos::processImage"), s.verifyParamValid("type", e.type, o.validTypes, "nos::processImage"), t["gen" + e.type.slice(0, 1).toUpperCase() + e.type.slice(1) + "Op"](e);
    });
    t.processCallback(e), t.sendCmd("processImage", {
      url: e.url,
      imageOps: n
    }, e.callback);
  }, i.genStripmetaOp = function (e) {
    return new o({
      type: e.type,
      stripmeta: e.strip ? 1 : 0
    });
  }, i.genQualityOp = function (e) {
    s.verifyOptions(e, "quality", !0, "", "nos::genQualityOp"), s.verifyParamType("quality", e.quality, "number", "nos::genQualityOp"), s.verifyParamMin("quality", e.quality, 0, "nos::genQualityOp"), s.verifyParamMax("quality", e.quality, 100, "nos::genQualityOp");
    var t = Math.round(e.quality);
    return new o({
      type: e.type,
      qualityQuality: t
    });
  }, i.genInterlaceOp = function (e) {
    return new o({
      type: e.type
    });
  }, i.genRotateOp = function (e) {
    for (s.verifyOptions(e, "angle", !0, "", "nos::genRotateOp"), s.verifyParamType("angle", e.angle, "number", "nos::genRotateOp"); e.angle < 0;) {
      e.angle = e.angle + 360;
    }

    e.angle = e.angle % 360;
    var t = Math.round(e.angle);
    return new o({
      type: e.type,
      rotateAngle: t
    });
  }, i.genBlurOp = function (e) {
    s.verifyOptions(e, "radius sigma", "nos::genBlurOp"), s.verifyParamType("radius", e.radius, "number", "nos::genBlurOp"), s.verifyParamMin("radius", e.radius, 1, "nos::genBlurOp"), s.verifyParamMax("radius", e.radius, 50, "nos::genBlurOp"), s.verifyParamType("sigma", e.sigma, "number", "nos::genBlurOp"), s.verifyParamMin("sigma", e.sigma, 0, "nos::genBlurOp");
    var t = Math.round(e.radius),
        n = Math.round(e.sigma);
    return new o({
      type: e.type,
      blurRadius: t,
      blurSigma: n
    });
  }, i.genCropOp = function (e) {
    s.verifyOptions(e, "x y width height", "nos::genCropOp"), s.verifyParamType("x", e.x, "number", "nos::genCropOp"), s.verifyParamMin("x", e.x, 0, "nos::genCropOp"), s.verifyParamType("y", e.y, "number", "nos::genCropOp"), s.verifyParamMin("y", e.y, 0, "nos::genCropOp"), s.verifyParamType("width", e.width, "number", "nos::genCropOp"), s.verifyParamMin("width", e.width, 0, "nos::genCropOp"), s.verifyParamType("height", e.height, "number", "nos::genCropOp"), s.verifyParamMin("height", e.height, 0, "nos::genCropOp");
    var t = Math.round(e.x),
        n = Math.round(e.y),
        r = Math.round(e.width),
        i = Math.round(e.height);
    return new o({
      type: e.type,
      cropX: t,
      cropY: n,
      cropWidth: r,
      cropHeight: i
    });
  }, i.genThumbnailOp = (r = {
    cover: "z",
    contain: "x",
    crop: "y"
  }, function (e) {
    s.verifyOptions(e, "mode", "nos::genThumbnailOp"), s.verifyParamValid("mode", e.mode, Object.keys(r), "nos::genThumbnailOp"), "contain" === e.mode ? s.verifyParamAtLeastPresentOne(e, "width height", "nos::genThumbnailOp") : s.verifyOptions(e, "width height", "nos::genThumbnailOp"), s.undef(e.width) && (e.width = 0), s.undef(e.height) && (e.height = 0), s.verifyParamType("width", e.width, "number", "nos::genThumbnailOp"), s.verifyParamMin("width", e.width, 0, "nos::genThumbnailOp"), s.verifyParamType("height", e.height, "number", "nos::genThumbnailOp"), s.verifyParamMin("height", e.height, 0, "nos::genThumbnailOp");
    var t = Math.round(e.width),
        n = Math.round(e.height),
        i = new o({
      type: e.type,
      thumbnailMode: r[e.mode],
      thumbnailWidth: t,
      thumbnailHeight: n
    });

    if ("crop" === e.mode && s.notundef(e.axis)) {
      s.undef(e.axis.x) && (e.axis.x = 5), s.undef(e.axis.y) && (e.axis.y = 5), s.verifyParamMin("axis.x", e.axis.x, 0, "nos::genThumbnailOp"), s.verifyParamMax("axis.x", e.axis.x, 10, "nos::genThumbnailOp"), s.verifyParamMin("axis.y", e.axis.y, 0, "nos::genThumbnailOp"), s.verifyParamMax("axis.y", e.axis.y, 10, "nos::genThumbnailOp");
      var a = Math.round(e.axis.x),
          c = Math.round(e.axis.y);
      i.thumbnailAxisX = a, i.thumbnailAxisY = c;
    }

    return s.notundef(e.enlarge) && (s.verifyParamType("enlarge", e.enlarge, "boolean", "nos::genThumbnailOp"), e.enlarge && (i.thumbnailEnlarge = 1)), i;
  });
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = n(4),
      i = n(26).upload,
      o = n(26).abort,
      a = r.supportFormData,
      c = 104857600;

  function u(e) {
    var t = this;
    t.options = r.copy(e), r.verifyOptions(e, "url fileName"), r.verifyParamPresentJustOne(e, "blob fileInput"), r.verifyCallback(e, "beginupload uploadprogress uploaddone"), e.fileInput && (e.fileInput = r.verifyFileInput(e.fileInput)), e.type && r.verifyFileType(e.type), e.timeout ? r.verifyParamType("timeout", e.timeout, "number") : e.timeout = 6e5, r.verifyFileUploadCallback(e), e.data = {};
    var n = e.fileName,
        o = e.fileInput;
    if (a) {
      if (o) {
        var u = e.type ? r.filterFiles(o.files, e.type) : [].slice.call(o.files, 0);
        if (!u || !u.length) return void e.uploaddone(s.newWrongFileTypeError("未读取到" + e.type + "类型的文件, 请确保文件选择节点的文件不为空, 并且请确保选择了" + e.type + "类型的文件"));
        if (o.files[0].size > c) return void e.uploaddone(s.newFileTooLargeError("文件大小超过100M"));
        e.data[n] = u[0];
      } else e.blob && (e.data[n] = e.blob);
    } else r.dataset(o, "name", n), e.data.input = o;
    e.params && r.merge(e.data, e.params);
    var l = {
      data: e.data,
      onaftersend: function onaftersend() {
        e.beginupload(t);
      },
      onuploading: function onuploading(t) {
        var n = Math.floor(1e4 * t.loaded / t.total) / 100,
            r = {
          docId: e.docId,
          total: t.total,
          loaded: t.loaded,
          percentage: n,
          percentageText: n + "%"
        };
        e.fileInput && (r.fileInput = e.fileInput), e.blob && (r.blob = e.blob), e.uploadprogress(r);
      },
      onload: function onload(n) {
        n.docId = e.docId, n.Error ? t.onError(n) : e.uploaddone(null, n);
      },
      onerror: function onerror(n) {
        try {
          if (n.result) var r = JSON.parse(n.result);else r = n;
          t.onError(r);
        } catch (r) {
          console.error("ignore error if could not parse obj.result", r), e.uploaddone(new s(n.message, n.code), t.options);
        }
      }
    };
    a || (l.mode = "iframe"), l.putFileAtEnd = !0, t.sn = i(e.url, l);
  }

  u.prototype.onError = function (e) {
    var t,
        n,
        r,
        i = this.options;
    n = (t = (e = e || {}).Error || e || {}).Code || t.code || "unknown", r = t.Message || t.message || "未知错误", i.uploaddone(new s(n + "(" + r + ")", n));
  }, u.prototype.abort = function () {
    o(this.sn);
  }, e.exports = u;
}, function (e, t, n) {
  var r, s, i;
  !function (n, o) {
    "use strict";

    s = [], void 0 === (i = "function" == typeof (r = function r(e) {
      return function (t) {
        t = t || {}, function () {
          t.arrayAccessForm = t.arrayAccessForm || "none", t.emptyNodeForm = t.emptyNodeForm || "text", t.jsAttributeFilter = t.jsAttributeFilter, t.jsAttributeConverter = t.jsAttributeConverter, t.attributeConverters = t.attributeConverters || [], t.datetimeAccessFormPaths = t.datetimeAccessFormPaths || [], t.arrayAccessFormPaths = t.arrayAccessFormPaths || [], void 0 === t.enableToStringFunc && (t.enableToStringFunc = !0);
          void 0 === t.skipEmptyTextNodesForObj && (t.skipEmptyTextNodesForObj = !0);
          void 0 === t.stripWhitespaces && (t.stripWhitespaces = !0);
          void 0 === t.useDoubleQuotes && (t.useDoubleQuotes = !0);
          void 0 === t.ignoreRoot && (t.ignoreRoot = !1);
          void 0 === t.escapeMode && (t.escapeMode = !0);
          void 0 === t.attributePrefix && (t.attributePrefix = "_");
          void 0 === t.selfClosingElements && (t.selfClosingElements = !0);
          void 0 === t.keepCData && (t.keepCData = !1);
          void 0 === t.jsDateUTC && (t.jsDateUTC = !1);
        }(), function () {
          function e(e) {
            var t = String(e);
            return 1 === t.length && (t = "0" + t), t;
          }

          "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
            return this.replace(/^\s+|^\n+|(\s|\n)+$/g, "");
          });
          "function" != typeof Date.prototype.toISOString && (Date.prototype.toISOString = function () {
            return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
          });
        }();
        var n = {
          ELEMENT_NODE: 1,
          TEXT_NODE: 3,
          CDATA_SECTION_NODE: 4,
          COMMENT_NODE: 8,
          DOCUMENT_NODE: 9
        };

        function r(e) {
          var t = e.localName;
          return null == t && (t = e.baseName), null != t && "" !== t || (t = e.nodeName), t;
        }

        function s(e) {
          return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : e;
        }

        function i(e, n, r) {
          switch (t.arrayAccessForm) {
            case "property":
              e[n] instanceof Array ? e[n + "_asArray"] = e[n] : e[n + "_asArray"] = [e[n]];
          }

          if (!(e[n] instanceof Array) && t.arrayAccessFormPaths.length > 0) {
            for (var s = !1, i = 0; i < t.arrayAccessFormPaths.length; i++) {
              var o = t.arrayAccessFormPaths[i];

              if ("string" == typeof o) {
                if (o === r) {
                  s = !0;
                  break;
                }
              } else if (o instanceof RegExp) {
                if (o.test(r)) {
                  s = !0;
                  break;
                }
              } else if ("function" == typeof o && o(n, r)) {
                s = !0;
                break;
              }
            }

            s && (e[n] = [e[n]]);
          }
        }

        function o(e) {
          var t = e.split(/[-T:+Z]/g),
              n = new Date(t[0], t[1] - 1, t[2]),
              r = t[5].split(".");

          if (n.setHours(t[3], t[4], r[0]), r.length > 1 && n.setMilliseconds(r[1]), t[6] && t[7]) {
            var s = 60 * t[6] + Number(t[7]),
                i = /\d\d-\d\d:\d\d$/.test(e) ? "-" : "+";
            s = 0 + ("-" === i ? -1 * s : s), n.setMinutes(n.getMinutes() - s - n.getTimezoneOffset());
          } else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));

          return n;
        }

        function a(e, s) {
          for (var a = {
            __cnt: 0
          }, u = e.childNodes, l = 0; l < u.length; l++) {
            var m = u.item(l),
                d = r(m);
            m.nodeType !== n.COMMENT_NODE && (a.__cnt++, null == a[d] ? (a[d] = c(m, s + "." + d), i(a, d, s + "." + d)) : (a[d] instanceof Array || (a[d] = [a[d]], i(a, d, s + "." + d)), a[d][a[d].length] = c(m, s + "." + d)));
          }

          for (var p = 0; p < e.attributes.length; p++) {
            var f = e.attributes.item(p);
            a.__cnt++;

            for (var g = f.value, h = 0; h < t.attributeConverters.length; h++) {
              var y = t.attributeConverters[h];
              y.test.call(null, f.name, f.value) && (g = y.convert.call(null, f.name, f.value));
            }

            a[t.attributePrefix + f.name] = g;
          }

          var v = e.prefix;
          return v && (a.__cnt++, a.__prefix = v), a["#text"] && (a.__text = a["#text"], a.__text instanceof Array && (a.__text = a.__text.join("\n")), t.escapeMode && (a.__text = a.__text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&")), t.stripWhitespaces && (a.__text = a.__text.trim()), delete a["#text"], "property" === t.arrayAccessForm && delete a["#text_asArray"], a.__text = function (e, n, r) {
            if (t.datetimeAccessFormPaths.length > 0) for (var s = r.split(".#")[0], i = 0; i < t.datetimeAccessFormPaths.length; i++) {
              var a = t.datetimeAccessFormPaths[i];

              if ("string" == typeof a) {
                if (a === s) return o(e);
              } else if (a instanceof RegExp) {
                if (a.test(s)) return o(e);
              } else if ("function" == typeof a && a(s)) return o(e);
            }
            return e;
          }(a.__text, 0, s + ".#text")), a.hasOwnProperty("#cdata-section") && (a.__cdata = a["#cdata-section"], delete a["#cdata-section"], "property" === t.arrayAccessForm && delete a["#cdata-section_asArray"]), 1 === a.__cnt && a.__text ? a = a.__text : 0 === a.__cnt && "text" === t.emptyNodeForm ? a = "" : a.__cnt > 1 && void 0 !== a.__text && t.skipEmptyTextNodesForObj && (t.stripWhitespaces && "" === a.__text || "" === a.__text.trim()) && delete a.__text, delete a.__cnt, t.keepCData || a.hasOwnProperty("__text") || !a.hasOwnProperty("__cdata") ? (t.enableToStringFunc && (a.__text || a.__cdata) && (a.toString = function () {
            return (this.__text ? this.__text : "") + (this.__cdata ? this.__cdata : "");
          }), a) : a.__cdata ? a.__cdata : "";
        }

        function c(e, s) {
          return e.nodeType === n.DOCUMENT_NODE ? function (e) {
            for (var s = {}, i = e.childNodes, o = 0; o < i.length; o++) {
              var a = i.item(o);

              if (a.nodeType === n.ELEMENT_NODE) {
                var u = r(a);
                t.ignoreRoot ? s = c(a, u) : s[u] = c(a, u);
              }
            }

            return s;
          }(e) : e.nodeType === n.ELEMENT_NODE ? a(e, s) : e.nodeType === n.TEXT_NODE || e.nodeType === n.CDATA_SECTION_NODE ? e.nodeValue : null;
        }

        function u(e, n, r, i) {
          var o = "<" + (e && e.__prefix ? e.__prefix + ":" : "") + n;
          if (r) for (var a = 0; a < r.length; a++) {
            var c = r[a],
                u = e[c];
            t.escapeMode && (u = s(u)), o += " " + c.substr(t.attributePrefix.length) + "=", t.useDoubleQuotes ? o += '"' + u + '"' : o += "'" + u + "'";
          }
          return o += i ? " />" : ">";
        }

        function l(e, t) {
          return "</" + (e && e.__prefix ? e.__prefix + ":" : "") + t + ">";
        }

        function m(e, n) {
          return "property" === t.arrayAccessForm && (r = n.toString(), s = "_asArray", -1 !== r.indexOf(s, r.length - s.length)) || 0 === n.toString().indexOf(t.attributePrefix) || 0 === n.toString().indexOf("__") || e[n] instanceof Function;
          var r, s;
        }

        function d(e) {
          var t = 0;
          if (e instanceof Object) for (var n in e) {
            m(e, n) || t++;
          }
          return t;
        }

        function p(e) {
          var n = [];
          if (e instanceof Object) for (var r in e) {
            -1 === r.toString().indexOf("__") && 0 === r.toString().indexOf(t.attributePrefix) && n.push(r);
          }
          return n;
        }

        function f(e) {
          var n = "";
          return e instanceof Object ? n += function (e) {
            var n = "";
            e.__cdata && (n += "<![CDATA[" + e.__cdata + "]]>");
            e.__text && (t.escapeMode ? n += s(e.__text) : n += e.__text);
            return n;
          }(e) : null !== e && (t.escapeMode ? n += s(e) : n += e), n;
        }

        function g(e, n, r) {
          var s = "";
          if (t.jsAttributeFilter && t.jsAttributeFilter.call(null, n, e)) return s;
          if (t.jsAttributeConverter && (e = t.jsAttributeConverter.call(null, n, e)), null != e && "" !== e || !t.selfClosingElements) {
            if ("object" == _typeof(e)) {
              if ("[object Array]" === Object.prototype.toString.call(e)) s += function (e, t, n) {
                var r = "";
                if (0 === e.length) r += u(e, t, n, !0);else for (var s = 0; s < e.length; s++) {
                  r += g(e[s], t, p(e[s]));
                }
                return r;
              }(e, n, r);else if (e instanceof Date) s += u(e, n, r, !1), s += t.jsDateUTC ? e.toUTCString() : e.toISOString(), s += l(e, n);else {
                var i = d(e);
                i > 0 || e.__text || e.__cdata ? (s += u(e, n, r, !1), s += h(e), s += l(e, n)) : t.selfClosingElements ? s += u(e, n, r, !0) : (s += u(e, n, r, !1), s += l(e, n));
              }
            } else s += u(e, n, r, !1), s += f(e), s += l(e, n);
          } else s += u(e, n, r, !0);
          return s;
        }

        function h(e) {
          var t = "",
              n = d(e);
          if (n > 0) for (var r in e) {
            if (!m(e, r)) {
              var s = e[r],
                  i = p(s);
              t += g(s, r, i);
            }
          }
          return t += f(e);
        }

        function y(t) {
          if (void 0 === t) return null;
          if ("string" != typeof t) return null;
          var n = null,
              r = null;
          if (e) n = new e(), r = n.parseFromString(t, "text/xml");else if (window && window.DOMParser) {
            n = new window.DOMParser();
            var s = null,
                i = window.ActiveXObject || "ActiveXObject" in window;
            if (!i) try {
              s = n.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
            } catch (e) {
              s = null;
            }

            try {
              r = n.parseFromString(t, "text/xml"), null !== s && r.getElementsByTagNameNS(s, "parsererror").length > 0 && (r = null);
            } catch (e) {
              r = null;
            }
          } else 0 === t.indexOf("<?") && (t = t.substr(t.indexOf("?>") + 2)), (r = new ActiveXObject("Microsoft.XMLDOM")).async = "false", r.loadXML(t);
          return r;
        }

        this.asArray = function (e) {
          return null == e ? [] : e instanceof Array ? e : [e];
        }, this.toXmlDateTime = function (e) {
          return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null;
        }, this.asDateTime = function (e) {
          return "string" == typeof e ? o(e) : e;
        }, this.xml2dom = function (e) {
          return y(e);
        }, this.dom2js = function (e) {
          return c(e, null);
        }, this.js2dom = function (e) {
          var t = this.js2xml(e);
          return y(t);
        }, this.xml2js = function (e) {
          var t = y(e);
          return null != t ? this.dom2js(t) : null;
        }, this.js2xml = function (e) {
          return h(e);
        }, this.getVersion = function () {
          return "3.1.1";
        };
      };
    }) ? r.apply(t, s) : r) || (e.exports = i);
  }();
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(12).fn,
      a = n(0),
      c = n(162),
      u = n(4),
      l = n(1),
      m = n(81),
      d = n(161),
      p = n(80);
  o.sendText = function (e) {
    return this.processCallback(e), e.msg = new this.message.TextMessage(e), this.sendMsg(e);
  }, o.previewFile = function (e) {
    if (a.verifyOptions(e, "done", "msg::previewFile"), e.type || (e.type = "file"), a.verifyParamPresentJustOne(e, "dataURL blob fileInput filePath wxFilePath fileObject", "msg::previewFile"), e.nosSurvivalTime ? (a.verifyParamType("nosSurvivalTime", e.nosSurvivalTime, "number", "api::Base.getInstance"), a.verifyParamMin("nosSurvivalTime", e.nosSurvivalTime, 86400, "api::Base.getInstance")) : e.nosSurvivalTime = this.nosSurvivalTime, e.filePath = e.filePath || e.wxFilePath, delete e.wxFilePath, e.dataURL) e.blob = p.fromDataURL(e.dataURL);else if (e.blob) ;else if (e.fileInput) {
      if (e.fileInput = a.verifyFileInput(e.fileInput, "msg::previewFile"), e.fileInput.files) {
        if (!e.fileInput.files.length) return void e.done(u.newNoFileError("请选择" + e.type + "文件", {
          callFunc: "msg::previewFile",
          fileInput: e.fileInput
        }), e);
        e.fileSize = e.fileInput.files[0].size;
      }

      e.fileInputName = a.getFileName(e.fileInput);
    }
    this.processCallback(e);
    var t = JSON.stringify(m.genResponseBody(e.type) || {}).replace(/"/gi, '\\"'),
        n = null,
        r = e.transcode ? "getNosTokenTrans" : "getNosToken";

    if (e.transcode) {
      a.verifyOptions(e, "fileInput", "msg::previewFile");
      var s = a.getFileInfo(e.fileInput);
      n = {
        transToken: {
          name: s.name,
          type: s.transcodeType,
          transType: "png" === e.transcode ? 11 : 10,
          size: s.size,
          body: t
        }
      };
    } else n = t;

    this[r]({
      responseBody: n,
      nosToken: {
        nosScene: e.nosScene || this.nosScene,
        nosSurvivalTime: e.nosSurvivalTime
      },
      callback: function (t, n) {
        t ? e.done(t) : (e.transcode ? (e.nosToken = n.nosToken, e.docId = n.docId) : e.nosToken = n, this._doPreviewFile(e));
      }.bind(this)
    });
  }, o._doPreviewFile = function (e) {
    var t = this,
        n = e.uploaddone,
        r = l.genUploadUrl(e.nosToken.bucket),
        s = this.assembleUploadParams(e.nosToken);

    function o(r, i) {
      if (e.uploaddone = n, r) e.done(r, e.callback.options);else {
        if ((i = m.parseResponse(i, t.options.exifOrientation)).url = l.genDownloadUrl(e.nosToken, s.Object), a.exist(e.fileInputName)) i.name = e.fileInputName;else if (e.blob) {
          var o = e.blob.name;

          if (i.name = o || "blob-" + i.md5, !o) {
            var c = e.blob.type;
            i.ext = c.slice(c.lastIndexOf("/") + 1);
          }
        } else e.filePath ? i.name = e.filePath : e.fileObject && (i.name = e.fileObject.fileName);

        if (!i.ext) {
          var u = i.name.lastIndexOf(".");
          i.ext = -1 === u ? "unknown" : i.name.slice(u + 1);
        }

        i.size = i.size || 0, e.done(null, a.copy(i));
      }
    }

    if (l.isWeixinApp) a.verifyOptions(e, "filePath", "msg::_doPreviewFile"), t.fileQuickTransfer(e, o, function () {
      wx.uploadFile({
        url: r,
        filePath: e.filePath,
        name: "file",
        formData: s,
        fail: function fail(e) {
          console.error("api::msg:upload file failed", e);
        },
        success: function success(e) {
          if (200 === e.statusCode) try {
            o(null, JSON.parse(e.data));
          } catch (t) {
            console.error("parse wx upload file res error", t), o({
              code: "PARSE_WX_UPLOAD_FILE_RES_ERROR",
              str: e.data,
              msg: e.errMsg
            });
          } else o({
            code: e.statusCode,
            msg: e.errMsg
          });
        }
      });
    });else if (l.isNodejs) {
      var c = {
        url: r,
        name: "file",
        formData: s,
        success: function success(e) {
          if (200 === e.statusCode) try {
            o(null, JSON.parse(e.data));
          } catch (t) {
            console.error("parse nodejs upload file res error", t), o({
              code: "PARSE_NODEJS_UPLOAD_FILE_RES_ERROR",
              str: e.data,
              msg: e.errMsg
            });
          } else o({
            code: e.statusCode,
            msg: e.errMsg
          });
        },
        fail: function fail(e) {
          console.error("api::msg:upload file failed", e);
        }
      };
      if (e.filePath) c.filePath = e.filePath;else {
        if ("object" !== (0, i.default)(e.fileObject)) throw new u("Nodejs上传fileObject参数类型应如 {fileName:..,fileData:..} ");
        c.fileData = e.fileObject.fileData;
      }
      t.fileQuickTransfer(e, o, function () {
        d.uploadFile(c);
      });
    } else if (l.isRN) {
      var p = {
        url: r,
        name: "file",
        formData: s,
        filePath: e.filePath,
        success: function success(e) {
          if (e.ok && 200 === e.status) try {
            e.md5 = e.headers.map && e.headers.map.etag && e.headers.map.etag[0] || "UNKNOWN", o(null, e);
          } catch (t) {
            console.error("parse React Native upload file res error", t), o({
              code: "PARSE_React_Native_UPLOAD_FILE_RES_ERROR",
              res: e
            });
          } else o({
            code: e.status,
            msg: e.statusText
          });
        },
        fail: function fail(e) {
          console.error("api::msg:upload file failed", e);
        }
      };
      t.fileQuickTransfer(e, o, function () {
        d.uploadFile(p);
      });
    } else e.uploaddone = o, e.url = r, e.params = s, e.fileName = "file", t.fileQuickTransfer(e, o, function () {
      return new d(e);
    });
  }, o.fileQuickTransfer = function (e, t, n) {
    var r = this;
    e = e || {}, t instanceof Function || (t = function t() {}), n instanceof Function || (n = function n() {});
    var s = e.fastPass;
    if (s) try {
      s = JSON.parse(s), e.fastPass = s;
    } catch (e) {
      r.protocol.logger.error("快传参数解析失败");
    }
    var i = e.fileInputName || e.name || e.blob && e.blob.name || "",
        o = e.fileSize || e.size || e.blob && e.blob.size || 0,
        a = s ? ((s.md5 || e.digest || "") + "").trim() : "",
        c = e.type || e.blob && e.blob.type;

    if (a && o >= l.threshold) {
      var u = !0,
          m = {
        name: i,
        md5: a,
        ext: i.slice(i.lastIndexOf(".") + 1),
        type: c
      };

      switch (c) {
        case "image":
          s && s.w && s.h ? (m.w = s.w, m.h = s.h) : (u = !1, r.protocol.logger.error("快传 image 文件缺少参数 w 或 h"));
          break;

        case "video":
          s && s.w && s.h && s.dur ? (m.w = s.w, m.h = s.h, m.dur = s.dur) : (u = !1, r.protocol.logger.error("快传 video 文件缺少参数 w 或 h 或 dur"));
          break;

        case "audio":
          s && s.dur ? m.dur = s.dur : (u = !1, r.protocol.logger.error("快传 audio 文件缺少参数 dur"));
      }

      if (!u) return void n();
      var d = {
        fileQuickTransfer: {
          md5: a
        }
      };
      return o && (d.fileQuickTransfer.size = o), this.protocol.sendCmd("fileQuickTransfer", d, function (e, s, i) {
        !e && i && i.fileQuickTransfer && i.fileQuickTransfer.url || (r.protocol.logger.error("misc::fileQuickTransfer: not found", e, s, i), n()), i && i.fileQuickTransfer && i.fileQuickTransfer.threshold && (l.threshold = i.fileQuickTransfer.threshold || 0), i && i.fileQuickTransfer && i.fileQuickTransfer.url && (m.size = o || i.fileQuickTransfer.size, m.url = i.fileQuickTransfer.url, t(e, m));
      });
    }

    n();
  }, o.sendFile = function (e) {
    if (e.type || (e.type = "file"), a.verifyParamPresentJustOne(e, "dataURL blob fileInput file filePath wxFilePath fileObject", "msg::sendFile"), this.processCallback(e), e.filePath = e.filePath || e.wxFilePath, delete e.wxFilePath, e.dataURL) this._previewAndSendFile(e);else if (e.blob) this._previewAndSendFile(e);else if (e.fileInput) {
      if (e.fileInput = a.verifyFileInput(e.fileInput, "msg::sendFile"), e.fileInput.files && !e.fileInput.files.length) return void e.done(u.newNoFileError("请选择" + e.type + "文件", {
        callFunc: "msg::sendFile",
        fileInput: e.fileInput
      }), e.callback.options);

      this._previewAndSendFile(e);
    } else if (e.filePath || e.fileObject) this._previewAndSendFile(e);else if (e.file) return e.msg = new this.message.FileMessage(e), this.sendMsg(e);
  }, o._previewAndSendFile = function (e) {
    var t = this;
    a.verifyCallback(e, "uploaddone beforesend", "msg::_previewAndSendFile");
    var n = e.done;
    e.done = function (r, s) {
      if (e.done = n, r) e.uploaddone(r, e.callback.options);else {
        if (/chatroom/.test(e.scene)) return;
        e.uploaddone(null, a.copy(s)), e.file = s, e.msg = new t.message.FileMessage(e), e.beforesend(t.sendMsg(e));
      }
    }, t.previewFile(e);
  }, o.assembleUploadParams = function (e) {
    return e ? {
      Object: decodeURIComponent(e.objectName),
      "x-nos-token": e.token,
      "x-nos-entity-type": "json"
    } : null;
  }, o.deleteFile = function (e) {
    a.verifyParamPresentJustOne(e, "docId", "msg::deleteFile"), this.removeFile({
      docId: e.docId,
      callback: function callback(t, n) {
        t ? e.error && e.error(t, n) : e.success && e.success(n);
      }
    });
  }, o.getFile = function (e) {
    a.verifyParamPresentJustOne(e, "docId", "msg::getFile"), this.fetchFile({
      docId: e.docId,
      callback: function callback(t, n) {
        t ? e.error && e.error(t, n) : e.success && e.success(n.info);
      }
    });
  }, o.getFileList = function (e) {
    var t = e.fromDocId,
        n = void 0 === t ? "" : t,
        r = e.limit,
        s = void 0 === r ? 10 : r,
        i = {
      limit: s
    };
    n && (i.fromDocId = n), this.fetchFileList({
      fileListParam: i,
      callback: function callback(t, n) {
        t ? (s > 30 && (t.message = t.message + "::文档条数超过限制:30"), e.error && e.error(t, n)) : e.success && e.success(n);
      }
    });
  }, o.sendGeo = function (e) {
    return this.processCallback(e), e.msg = new this.message.GeoMessage(e), this.sendMsg(e);
  }, o.sendTipMsg = function (e) {
    return this.processCallback(e), e.msg = new this.message.TipMessage(e), this.sendMsg(e);
  }, o.sendCustomMsg = function (e) {
    return this.processCallback(e), e.msg = new this.message.CustomMessage(e), this.sendMsg(e);
  }, o.sendRobotMsg = function (e) {
    return this.processCallback(e), e.msg = new this.message.RobotMessage(e), this.sendMsg(e);
  }, o.sendMsg = function (e) {
    var t = this.protocol,
        n = e.msg,
        r = {},
        s = !!e.isLocal;
    if (s && (e.time && (n.time = e.time), e.idClient && (n.idClient = e.idClient)), e.resend && ("out" !== e.flow || "fail" !== e.status)) return a.onError("只能重发发送失败的消息");
    e.callback.options.idClient = n.idClient, this.beforeSendMsg(e, r);
    var i = e.rtnMsg = this.formatReturnMsg(n);
    return s && (i.status = "success", i.isLocal = !0), t.storeSendMsg && (r.promise = t.storeSendMsg(i)), e.cbaop = function (e) {
      if (e && "server" !== e.from) return i.status = "fail", t.updateSendMsgError && t.updateSendMsgError(i), i;
    }, s || (r.msg = n, this.sendCmd(e.cmd, r, e.callback)), this.afterSendMsg(e), s && setTimeout(function () {
      i = a.simpleClone(i), e.done(null, i);
    }, 0), a.copy(i);
  }, o.beforeSendMsg = function () {}, o.afterSendMsg = function () {}, o.formatReturnMsg = function (e) {
    return e = a.copy(e), this.protocol.completeMsg(e), e.status = "sending", e = this.message.reverse(e);
  }, o.resendMsg = function (e) {
    return a.verifyOptions(e, "msg", "msg::resendMsg"), this.trimMsgFlag(e), e.resend = !0, this._sendMsgByType(e);
  }, o.forwardMsg = function (e) {
    return a.verifyOptions(e, "msg", "msg::forwardMsg"), this.beforeForwardMsg(e), this.trimMsgFlag(e), e.forward = !0, e.msg.idClient = a.guid(), this._sendMsgByType(e);
  }, o.trimMsgFlag = function (e) {
    e && e.msg && (e.msg = a.copy(e.msg), delete e.msg.resend, delete e.msg.forward);
  }, o.beforeForwardMsg = function () {}, o._sendMsgByType = function (e) {
    switch (a.verifyOptions(e, "msg", "msg::_sendMsgByType"), a.verifyParamValid("msg.type", e.msg.type, this.message.validTypes, "msg::_sendMsgByType"), a.merge(e, e.msg), e.type) {
      case "text":
        return this.sendText(e);

      case "image":
      case "audio":
      case "video":
      case "file":
        return this.sendFile(e);

      case "geo":
        return this.sendGeo(e);

      case "custom":
        return this.sendCustomMsg(e);

      case "tip":
        return this.sendTipMsg(e);

      default:
        throw new u("不能发送类型为 " + e.type + " 的消息");
    }
  }, o.parseRobotTemplate = function (e) {
    if (/<template[^>\/]+\/>/.test(e)) return {
      raw: e,
      json: [{
        type: "text",
        name: "",
        text: ""
      }]
    };
    if (!/<template[^>\/]+>/.test(e)) return {
      raw: e,
      json: [{
        type: "text",
        name: "",
        text: e
      }]
    };
    var t = new c({
      escapeMode: !1
    });
    e = e.replace(/<template [^>]+>/, "<template>");
    var n = t.xml2js(e);
    n = n.template.LinearLayout, Array.isArray(n) || (n = [n]);
    var r = [];
    return n = n.forEach(function (e) {
      e.image && (r = r.concat(i(e))), e.text && (r = r.concat(s(e))), e.link && (r = r.concat(function (e) {
        if (e.link) {
          var t = e.link;
          Array.isArray(t) || (t = [t]), t = t.map(function (e) {
            return e.image && (e.image = i(e)), e.text && (e.text = s(e)), "url" === e._type ? (e.type = "url", e.style = e._style || "", e.target = e._target, delete e._target, delete e._style) : "block" === e._type && (e.type = "block", e.style = e._style || "", e.params = e._params || "", e.target = e._target, delete e._params, delete e._target, delete e._style), delete e._type, e;
          }), e.link = t;
        }

        return e.link;
      }(e)));
    }), {
      raw: e,
      json: r
    };

    function s(e) {
      return Array.isArray(e.text) || (e.text = [e.text]), e.text = e.text.map(function (e) {
        return {
          type: "text",
          name: e._name,
          text: e.__text
        };
      }), e.text;
    }

    function i(e) {
      return Array.isArray(e.image) || (e.image = [e.image]), e.image = e.image.map(function (e) {
        return {
          type: "image",
          name: e._name,
          url: e._url
        };
      }), e.image;
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(12).fn;
  r.isConnected = function () {
    return !!this.protocol && this.protocol.isConnected();
  }, r.connect = function () {
    this.protocol.appLogin = 0, this.protocol.connect();
  }, r.disconnect = function (e) {
    e = e || {}, this.protocol.disconnect(e.done);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(59);

  e.exports = function (e, t) {
    return t.method = "POST", t.headers = t.headers || {}, t.headers["Content-Type"] = "multipart/form-data", t.timeout = 0, t.type = t.type || "json", r(e, t);
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s,
      i = n(15),
      o = n(59),
      a = (r = /json/i, s = /post/i, function (e, t) {
    var n = (t = t || {}).data = t.data || {},
        a = t.headers = t.headers || {},
        c = i.checkWithDefault(a, "Accept", "application/json"),
        u = i.checkWithDefault(a, "Content-Type", "application/json");
    return r.test(c) && (t.type = "json"), s.test(t.method) && r.test(u) && (t.data = JSON.stringify(n)), o(e, t);
  });
  e.exports = a;
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = n(82),
      i = n(58),
      o = {};

  function a(e) {
    this.init(), i.call(this, e);
  }

  var c = i.prototype,
      u = a.prototype = Object.create(c);
  u.init = function () {
    var e = "NEJ-AJAX-DATA:",
        t = !1;

    function n(t) {
      var n = t.data;

      if (0 === n.indexOf(e)) {
        var r = (n = JSON.parse(n.replace(e, ""))).key,
            s = o[r];
        s && (delete o[r], n.result = decodeURIComponent(n.result || ""), s.onLoad(n));
      }
    }

    return function () {
      !function () {
        if (!t) {
          t = !0;
          var e = r.getGlobal();
          e.postMessage ? r.on(e, "message", n) : s.addMsgListener(n);
        }
      }();
    };
  }(), u.doSend = function () {
    var e = this.options,
        t = r.url2origin(e.url),
        n = e.proxyUrl || t + "/res/nej_proxy_frame.html",
        i = o[n];
    if (r.isArray(i)) i.push(this.doSend.bind(this, e));else {
      if (!i) return o[n] = [this.doSend.bind(this, e)], void r.createIframe({
        src: n,
        onload: function onload(e) {
          var t = o[n];
          o[n] = r.target(e).contentWindow, t.forEach(function (e) {
            try {
              e();
            } catch (e) {
              console.error(e);
            }
          });
        }
      });

      if (!this.aborted) {
        var a = this.key = r.uniqueID();
        o[a] = this;
        var c = r.fetch({
          method: "GET",
          url: "",
          data: null,
          headers: {},
          timeout: 0
        }, e);
        c.key = a, s.postMessage(i, {
          data: c
        }), this.afterSend();
      }
    }
  }, u.abort = function () {
    this.aborted = !0, delete o[this.key], c.abort.call(this);
  }, e.exports = a;
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = n(58),
      i = n(82),
      o = "NEJ-UPLOAD-RESULT:",
      a = {};

  function c(e) {
    this.init(), s.call(this, e);
  }

  var u = s.prototype,
      l = c.prototype = Object.create(u);
  l.init = function () {
    var e = !1;

    function t(e) {
      var t = e.data;

      if (0 === t.indexOf(o)) {
        var n = (t = JSON.parse(t.replace(o, ""))).key,
            r = a[n];
        r && (delete a[n], t.result = decodeURIComponent(t.result || ""), r.onLoad(t.result));
      }
    }

    return function () {
      !function () {
        if (!e) {
          e = !0;
          var n = r.getGlobal();
          n.postMessage ? r.on(n, "message", t) : (i.addMsgListener(t), i.startTimer());
        }
      }();
    };
  }(), l.doSend = function () {
    var e = this,
        t = e.options,
        n = e.key = "zoro-ajax-upload-iframe-" + r.uniqueID();
    a[n] = e;
    var s = e.form = r.html2node('<form style="display:none;"></form>');
    document.body.appendChild(s), s.target = n, s.method = "POST", s.enctype = "multipart/form-data", s.encoding = "multipart/form-data";
    var i = t.url,
        o = r.genUrlSep(i);
    s.action = i + o + "_proxy_=form";
    var c = t.data,
        u = [],
        l = [];

    function m() {
      u.forEach(function (e, t) {
        var n = l[t];
        n.parentNode && (e.name = n.name, r.isFunction(e.setAttribute) && e.setAttribute("form", n.getAttribute("form")), n.parentNode.replaceChild(e, n));
      });
    }

    c && r.getKeys(c, t.putFileAtEnd).forEach(function (e) {
      var t = c[e];

      if (t.tagName && "INPUT" === t.tagName.toUpperCase()) {
        if ("file" === t.type) {
          var n = t,
              i = n.cloneNode(!0);
          n.parentNode.insertBefore(i, n);
          var o = r.dataset(n, "name");
          o && (n.name = o), s.appendChild(n), r.isFunction(n.setAttribute) && (n.setAttribute("form", ""), n.removeAttribute("form")), u.push(t), l.push(i);
        }
      } else {
        var a = r.html2node('<input type="hidden"/>');
        a.name = e, a.value = t, s.appendChild(a);
      }
    });
    var d = e.iframe = r.createIframe({
      name: n,
      onload: function onload() {
        e.aborted ? m() : (r.on(d, "load", e.checkResult.bind(e)), s.submit(), m(), e.afterSend());
      }
    });
  }, l.checkResult = function () {
    var e, t;

    try {
      if ((t = ((e = this.iframe.contentWindow.document.body).innerText || e.textContent || "").trim()).indexOf(o) >= 0 || e.innerHTML.indexOf(o) >= 0) return;
    } catch (e) {
      return void console.error("ignore error if not same domain,", e);
    }

    this.onLoad(t);
  }, l.onLoad = function (e) {
    u.onLoad.call(this, {
      status: 200,
      result: e
    }), r.remove(this.form), r.remove(this.iframe), u.destroy.call(this);
  }, l.destroy = function () {
    r.remove(this.iframe), r.remove(this.form);
  }, l.abort = function () {
    this.aborted = !0, delete a[this.key], u.abort.call(this);
  }, e.exports = c;
}, function (e, t, n) {
  var r;
  /*!
   * EventEmitter v5.2.4 - git.io/ee
   * Unlicense - http://unlicense.org/
   * Oliver Caldwell - http://oli.me.uk/
   * @preserve
   */

  !function (t) {
    "use strict";

    function s() {}

    var i = s.prototype,
        o = t.EventEmitter;

    function a(e, t) {
      for (var n = e.length; n--;) {
        if (e[n].listener === t) return n;
      }

      return -1;
    }

    function c(e) {
      return function () {
        return this[e].apply(this, arguments);
      };
    }

    i.getListeners = function (e) {
      var t,
          n,
          r = this._getEvents();

      if (e instanceof RegExp) for (n in t = {}, r) {
        r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]);
      } else t = r[e] || (r[e] = []);
      return t;
    }, i.flattenListeners = function (e) {
      var t,
          n = [];

      for (t = 0; t < e.length; t += 1) {
        n.push(e[t].listener);
      }

      return n;
    }, i.getListenersAsObject = function (e) {
      var t,
          n = this.getListeners(e);
      return n instanceof Array && ((t = {})[e] = n), t || n;
    }, i.addListener = function (e, t) {
      if (!function e(t) {
        return "function" == typeof t || t instanceof RegExp || !(!t || "object" != _typeof(t)) && e(t.listener);
      }(t)) throw new TypeError("listener must be a function");

      var n,
          r = this.getListenersAsObject(e),
          s = "object" == _typeof(t);

      for (n in r) {
        r.hasOwnProperty(n) && -1 === a(r[n], t) && r[n].push(s ? t : {
          listener: t,
          once: !1
        });
      }

      return this;
    }, i.on = c("addListener"), i.addOnceListener = function (e, t) {
      return this.addListener(e, {
        listener: t,
        once: !0
      });
    }, i.once = c("addOnceListener"), i.defineEvent = function (e) {
      return this.getListeners(e), this;
    }, i.defineEvents = function (e) {
      for (var t = 0; t < e.length; t += 1) {
        this.defineEvent(e[t]);
      }

      return this;
    }, i.removeListener = function (e, t) {
      var n,
          r,
          s = this.getListenersAsObject(e);

      for (r in s) {
        s.hasOwnProperty(r) && -1 !== (n = a(s[r], t)) && s[r].splice(n, 1);
      }

      return this;
    }, i.off = c("removeListener"), i.addListeners = function (e, t) {
      return this.manipulateListeners(!1, e, t);
    }, i.removeListeners = function (e, t) {
      return this.manipulateListeners(!0, e, t);
    }, i.manipulateListeners = function (e, t, n) {
      var r,
          s,
          i = e ? this.removeListener : this.addListener,
          o = e ? this.removeListeners : this.addListeners;
      if ("object" != _typeof(t) || t instanceof RegExp) for (r = n.length; r--;) {
        i.call(this, t, n[r]);
      } else for (r in t) {
        t.hasOwnProperty(r) && (s = t[r]) && ("function" == typeof s ? i.call(this, r, s) : o.call(this, r, s));
      }
      return this;
    }, i.removeEvent = function (e) {
      var t,
          n = _typeof(e),
          r = this._getEvents();

      if ("string" === n) delete r[e];else if (e instanceof RegExp) for (t in r) {
        r.hasOwnProperty(t) && e.test(t) && delete r[t];
      } else delete this._events;
      return this;
    }, i.removeAllListeners = c("removeEvent"), i.emitEvent = function (e, t) {
      var n,
          r,
          s,
          i,
          o = this.getListenersAsObject(e);

      for (i in o) {
        if (o.hasOwnProperty(i)) for (n = o[i].slice(0), s = 0; s < n.length; s++) {
          !0 === (r = n[s]).once && this.removeListener(e, r.listener), r.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, r.listener);
        }
      }

      return this;
    }, i.trigger = c("emitEvent"), i.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }, i.setOnceReturnValue = function (e) {
      return this._onceReturnValue = e, this;
    }, i._getOnceReturnValue = function () {
      return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;
    }, i._getEvents = function () {
      return this._events || (this._events = {});
    }, s.noConflict = function () {
      return t.EventEmitter = o, s;
    }, void 0 === (r = function () {
      return s;
    }.call(t, n, t, e)) || (e.exports = r);
  }(this || {});
}, function (e, t, n) {
  "use strict";

  var r = n(15),
      s = n(58);

  function i(e) {
    e.onuploading && this.on("uploading", e.onuploading), s.call(this, e);
  }

  var o = s.prototype,
      a = i.prototype = Object.create(o);
  a.doSend = function () {
    var e = this.options,
        t = e.headers,
        n = this.xhr = new XMLHttpRequest();

    if ("multipart/form-data" === t["Content-Type"]) {
      delete t["Content-Type"], n.upload.onprogress = this.onProgress.bind(this), n.upload.onload = this.onProgress.bind(this);
      var s = e.data;
      e.data = new window.FormData(), s && r.getKeys(s, e.putFileAtEnd).forEach(function (t) {
        var n = s[t];
        n.tagName && "INPUT" === n.tagName.toUpperCase() ? "file" === n.type && [].forEach.call(n.files, function (t) {
          e.data.append(r.dataset(n, "name") || n.name || t.name || "file-" + r.uniqueID(), t);
        }) : e.data.append(t, n);
      });
    }

    n.onreadystatechange = this.onStateChange.bind(this), 0 !== e.timeout && (this.timer = setTimeout(this.onTimeout.bind(this), e.timeout)), n.open(e.method, e.url, !e.sync), Object.keys(t).forEach(function (e) {
      n.setRequestHeader(e, t[e]);
    }), e.cookie && "withCredentials" in n && (n.withCredentials = !0), n.send(e.data), this.afterSend();
  }, a.onProgress = function (e) {
    e.lengthComputable && e.loaded <= e.total && this.emit("uploading", e);
  }, a.onStateChange = function () {
    var e = this.xhr;
    4 === e.readyState && this.onLoad({
      status: e.status,
      result: e.responseText || ""
    });
  }, a.getResponseHeader = function (e) {
    var t = this.xhr;
    return t ? t.getResponseHeader(e) : "";
  }, a.destroy = function () {
    clearTimeout(this.timer);

    try {
      this.xhr.onreadystatechange = r.f, this.xhr.abort();
    } catch (e) {
      console.error("ignore error ajax destroy,", e);
    }

    o.destroy.call(this);
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(45),
      s = n(0);
  n(26);

  function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    s.merge(this, {
      options: e,
      debug: !1,
      api: "log",
      style: "color:blue;",
      log: s.emptyFunc,
      info: s.emptyFunc,
      warn: s.emptyFunc,
      error: s.emptyFunc
    }), this.prefix = e.prefix || "", this.setDebug(e.debug);
  }

  var o = i.prototype,
      a = ["Chrome", "Safari", "Firefox"];
  o.setDebug = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        t = this;

    if (t.debug = e, e.style && (t.style = e.style), t.debug && s.exist(console)) {
      var n = console;
      t.debug = function () {
        var e = t.formatArgs(arguments);
        -1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("debug", e);
      }, t.log = function () {
        var e = t.formatArgs(arguments);
        -1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("log", e);
      }, t.info = function () {
        var e = t.formatArgs(arguments);
        -1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("info", e);
      }, t.warn = function () {
        var e = t.formatArgs(arguments);
        -1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("warn", e);
      }, t.error = function () {
        var e = t.formatArgs(arguments);
        -1 !== a.indexOf(r.name) && s.isString(e[0]) && (e[0] = "%c" + e[0], e.splice(1, 0, t.style)), t._log("error", e);
      }, t._log = function (e, r) {
        var i = t.options.logFunc,
            o = null;
        if (i && (i[e] && (o = i[e]), s.isFunction(o))) o.apply(i, r);else if (n[e]) try {
          n[e].apply ? t.chrome(e, r) : t.ie(e, r);
        } catch (e) {}
      }, t.chrome = function (e, s) {
        -1 !== a.indexOf(r.name) ? n[e].apply(n, s) : t.ie(e, s);
      }, t.ie = function (e, t) {
        t.forEach(function (t) {
          n[e](JSON.stringify(t, null, 4));
        });
      };
    }
  }, o.formatArgs = function (e) {
    e = [].slice.call(e, 0);
    var t = new Date(),
        n = "[NIM LOG " + (c(t.getMonth() + 1) + "-" + c(t.getDate()) + " " + c(t.getHours()) + ":" + c(t.getMinutes()) + ":" + c(t.getSeconds()) + ":" + c(t.getMilliseconds(), 3)) + " " + this.prefix.toUpperCase() + "]  ";
    return s.isString(e[0]) ? e[0] = n + e[0] : e.splice(0, 0, n), e.forEach(function (t, n) {
      (s.isArray(t) || s.isObject(t)) && (e[n] = s.simpleClone(t));
    }), e;
  };

  var c = function c(e, t) {
    t = t || 2;

    for (var n = "" + e; n.length < t;) {
      n = "0" + n;
    }

    return n;
  };

  e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(1);
  "undefined" != typeof window && (window.console || r.isWeixinApp || (window.console = {
    log: function log() {},
    info: function info() {},
    warn: function warn() {},
    error: function error() {}
  }));
}, function (e, t, n) {
  "use strict";

  var r = Object.prototype.hasOwnProperty,
      s = "~";

  function i() {}

  function o(e, t, n) {
    this.fn = e, this.context = t, this.once = n || !1;
  }

  function a() {
    this._events = new i(), this._eventsCount = 0;
  }

  Object.create && (i.prototype = Object.create(null), new i().__proto__ || (s = !1)), a.prototype.eventNames = function () {
    var e,
        t,
        n = [];
    if (0 === this._eventsCount) return n;

    for (t in e = this._events) {
      r.call(e, t) && n.push(s ? t.slice(1) : t);
    }

    return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
  }, a.prototype.listeners = function (e, t) {
    var n = s ? s + e : e,
        r = this._events[n];
    if (t) return !!r;
    if (!r) return [];
    if (r.fn) return [r.fn];

    for (var i = 0, o = r.length, a = new Array(o); i < o; i++) {
      a[i] = r[i].fn;
    }

    return a;
  }, a.prototype.emit = function (e, t, n, r, i, o) {
    var a = s ? s + e : e;
    if (!this._events[a]) return !1;
    var c,
        u,
        l = this._events[a],
        m = arguments.length;

    if (l.fn) {
      switch (l.once && this.removeListener(e, l.fn, void 0, !0), m) {
        case 1:
          return l.fn.call(l.context), !0;

        case 2:
          return l.fn.call(l.context, t), !0;

        case 3:
          return l.fn.call(l.context, t, n), !0;

        case 4:
          return l.fn.call(l.context, t, n, r), !0;

        case 5:
          return l.fn.call(l.context, t, n, r, i), !0;

        case 6:
          return l.fn.call(l.context, t, n, r, i, o), !0;
      }

      for (u = 1, c = new Array(m - 1); u < m; u++) {
        c[u - 1] = arguments[u];
      }

      l.fn.apply(l.context, c);
    } else {
      var d,
          p = l.length;

      for (u = 0; u < p; u++) {
        switch (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), m) {
          case 1:
            l[u].fn.call(l[u].context);
            break;

          case 2:
            l[u].fn.call(l[u].context, t);
            break;

          case 3:
            l[u].fn.call(l[u].context, t, n);
            break;

          case 4:
            l[u].fn.call(l[u].context, t, n, r);
            break;

          default:
            if (!c) for (d = 1, c = new Array(m - 1); d < m; d++) {
              c[d - 1] = arguments[d];
            }
            l[u].fn.apply(l[u].context, c);
        }
      }
    }

    return !0;
  }, a.prototype.on = function (e, t, n) {
    var r = new o(t, n || this),
        i = s ? s + e : e;
    return this._events[i] ? this._events[i].fn ? this._events[i] = [this._events[i], r] : this._events[i].push(r) : (this._events[i] = r, this._eventsCount++), this;
  }, a.prototype.once = function (e, t, n) {
    var r = new o(t, n || this, !0),
        i = s ? s + e : e;
    return this._events[i] ? this._events[i].fn ? this._events[i] = [this._events[i], r] : this._events[i].push(r) : (this._events[i] = r, this._eventsCount++), this;
  }, a.prototype.removeListener = function (e, t, n, r) {
    var o = s ? s + e : e;
    if (!this._events[o]) return this;
    if (!t) return 0 == --this._eventsCount ? this._events = new i() : delete this._events[o], this;
    var a = this._events[o];
    if (a.fn) a.fn !== t || r && !a.once || n && a.context !== n || (0 == --this._eventsCount ? this._events = new i() : delete this._events[o]);else {
      for (var c = 0, u = [], l = a.length; c < l; c++) {
        (a[c].fn !== t || r && !a[c].once || n && a[c].context !== n) && u.push(a[c]);
      }

      u.length ? this._events[o] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new i() : delete this._events[o];
    }
    return this;
  }, a.prototype.removeAllListeners = function (e) {
    var t;
    return e ? (t = s ? s + e : e, this._events[t] && (0 == --this._eventsCount ? this._events = new i() : delete this._events[t])) : (this._events = new i(), this._eventsCount = 0), this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prototype.setMaxListeners = function () {
    return this;
  }, a.prefixed = s, a.EventEmitter = a, e.exports = a;
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0;
  var r,
      s = n(67),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  t.default = function (e, t, n) {
    return t in e ? (0, i.default)(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  };
}, function (e, t, n) {
  "use strict";

  (function (t) {
    var r,
        s = n(2),
        i = (r = s) && r.__esModule ? r : {
      default: r
    };
    var o = n(89),
        a = n(88),
        c = n(60),
        u = n(86),
        l = n(85);
    e.exports = {
      polyfill: function polyfill() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t || window;
        if ("object" !== (void 0 === e ? "undefined" : (0, i.default)(e))) throw new Error("polyfill target is not an Object");
        var n = {
          localStorage: o,
          XMLHttpRequest: a,
          FormData: c,
          WebSocket: u,
          Object: Object,
          navigator: l,
          location: Object.create(null)
        };

        for (var r in n) {
          e[r] || (e[r] = n[r]);
        }

        e.navigator.product = "WeixinApp";
      },
      localStorage: o,
      XMLHttpRequest: a,
      FormData: c,
      WebSocket: u
    };
  }).call(this, n(47));
}, function (e, t, n) {
  "use strict";

  var r = n(175).polyfill;

  try {
    r();
  } catch (e) {}

  try {
    r(GameGlobal);
  } catch (e) {}

  try {
    window = window || {}, r(window);
  } catch (e) {}

  try {
    localStorage = localStorage || n(89);
  } catch (e) {}

  try {
    XMLHttpRequest = XMLHttpRequest || n(88);
  } catch (e) {}

  try {
    FormData = FormData || n(60);
  } catch (e) {}

  try {
    WebSocket = WebSocket || n(86);
  } catch (e) {}

  try {
    navigator = navigator || n(85);
  } catch (e) {}
},,,,,,,,,,,,,,,,,,,, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.notundef;

  function i(e) {
    r.verifyOptions(e, "type", "event::MsgEventSubscribe"), r.verifyParamType("type", e.type, "number", "event::MsgEventSubscribe"), r.findObjIndexInArray([1, 2, 3], e.type) < 0 && r.verifyParamMin("type", e.type, 1e5, "event::MsgEventSubscribe"), this.type = e.type, s(e.subscribeTime) ? (r.verifyParamType("subscribeTime", e.subscribeTime, "number", "event::MsgEventSubscribe"), r.verifyParamMin("subscribeTime", e.subscribeTime, 60, "event::MsgEventSubscribe"), r.verifyParamMax("subscribeTime", e.subscribeTime, 2592e3, "event::MsgEventSubscribe"), this.subscribeTime = e.subscribeTime) : this.subscribeTime = 2592e3, s(e.sync) ? (r.verifyParamType("sync", e.sync, "boolean", "event::MsgEventSubscribe"), this.sync = e.sync) : this.sync = !0;
  }

  i.prototype.assembleEvent = function (e) {
    return {
      type: this.type,
      subscribeTime: this.subscribeTime,
      sync: !0 === this.sync ? 1 : 0
    };
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = r.notundef,
      i = n(4);

  function o(e) {
    if (r.verifyOptions(e, "type value", "event::MsgEvent"), r.verifyParamType("type", e.type, "number", "event::MsgEvent"), r.verifyParamType("value", e.value, "number", "event::MsgEvent"), this.type = e.type, this.value = e.value, this.idClient = r.guid(), s(e.custom) && (this.custom = "" + e.custom), this.validTime = e.validTime || 604800, r.verifyParamType("validTime", this.validTime, "number", "event::MsgEvent"), r.verifyParamMin("validTime", this.validTime, 60, "event::MsgEvent"), r.verifyParamMax("validTime", this.validTime, 604800, "event::MsgEvent"), s(e.broadcastType)) {
      if (r.verifyParamType("broadcastType", e.broadcastType, "number", "event::MsgEvent"), [1, 2].indexOf(e.broadcastType) < 0) throw new i('参数错误"broadcastType":只能为1或2');
      this.broadcastType = e.broadcastType;
    } else this.broadcastType = 2;

    s(e.sync) ? (r.verifyParamType("sync", e.sync, "boolean", "event::MsgEvent"), this.sync = e.sync) : this.sync = !1;
  }

  o.prototype.assembleEvent = function () {
    return {
      type: this.type,
      value: this.value,
      idClient: this.idClient,
      custom: this.custom || "",
      validTime: this.validTime,
      broadcastType: this.broadcastType,
      sync: !0 === this.sync ? 1 : 0
    };
  }, e.exports = o;
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(2),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(7).fn,
      a = n(0),
      c = n(197),
      u = n(196);

  function l(e) {
    return "object" === (void 0 === e ? "undefined" : (0, i.default)(e)) && (e.msgEventSubscribes ? e = e.msgEventSubscribes : e.msgEventSubscribe ? e = e.msgEventSubscribe : e.accounts ? e = e.accounts : e.msgEvent && (e = e.msgEvent).time && (e.time = +e.time), 1 === e.sync ? e.sync = !0 : 0 === e.sync && (e.sync = !1)), e;
  }

  o.batchSendEventsCmds = function (e, t, n) {
    var r = this,
        s = a.dropArrayDuplicates(t.accounts);
    s = a.reshape2d(s, 100);
    var i = [];
    s.forEach(function (n) {
      i.push(new Promise(function (s, i) {
        var o = a.simpleClone(t);
        o.accounts = n, r.sendCmdWithResp(e, o, function (e, t) {
          e ? i(e) : s(l(t));
        });
      }));
    }), Promise.all(i).then(function (e) {
      var t = null;
      if (e.length > 0) if (e[0].msgEventSubscribe) {
        var r = e[0].msgEventSubscribe;
        r = l(r);
        var s = [];
        e.forEach(function (e) {
          s = s.concat(e.accounts);
        }), t = {
          accounts: s,
          msgEventSubscribe: r
        };
      } else t = [], e.forEach(function (e) {
        t = t.concat(e);
      });
      n(null, t);
    }, function (e) {
      n(e, null);
    });
  }, o.publishEvent = function (e) {
    var t = new c(e);
    t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("publishEvent", {
      msgEvent: t
    }, function (t, n) {
      t || (n = l(n)), e.callback(t, n);
    });
  }, o.subscribeEvent = function (e) {
    a.verifyOptions(e, "accounts", "event::subscribeEvent");
    var t = new u(e);
    a.verifyParamType("accounts", e.accounts, "array", "event::subscribeEvent"), this.processCallback(e), t = t.assembleEvent(), this.batchSendEventsCmds("subscribeEvent", {
      msgEventSubscribe: t,
      accounts: e.accounts
    }, function (t, n) {
      !t && n && (n = {
        failedAccounts: n
      }), e.callback(t, n);
    });
  }, o.unSubscribeEventsByAccounts = function (e) {
    a.verifyOptions(e, "accounts", "event::unSubscribeEventsByAccounts"), a.verifyParamType("accounts", e.accounts, "array", "event::unSubscribeEventsByAccounts");
    var t = new u(e);
    t = t.assembleEvent(), this.processCallback(e), this.batchSendEventsCmds("unSubscribeEventsByAccounts", {
      msgEventSubscribe: t,
      accounts: e.accounts
    }, function (t, n) {
      !t && n && (n = {
        failedAccounts: n
      }), e.callback(t, n);
    });
  }, o.unSubscribeEventsByType = function (e) {
    var t = new u(e);
    t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("unSubscribeEventsByType", {
      msgEventSubscribe: t
    }, function (t, n) {
      e.callback(t);
    });
  }, o.querySubscribeEventsByAccounts = function (e) {
    a.verifyOptions(e, "accounts", "event::querySubscribeEventsByAccounts"), a.verifyParamType("accounts", e.accounts, "array", "event::querySubscribeEventsByAccounts");
    var t = new u(e);
    t = t.assembleEvent(), this.processCallback(e), this.batchSendEventsCmds("querySubscribeEventsByAccounts", {
      msgEventSubscribe: t,
      accounts: e.accounts
    }, function (t, n) {
      !t && n && (n = {
        msgEventSubscribes: n
      }), e.callback(t, n);
    });
  }, o.querySubscribeEventsByType = function (e) {
    var t = new u(e);
    t = t.assembleEvent(), this.processCallback(e), this.sendCmdWithResp("querySubscribeEventsByType", {
      msgEventSubscribe: t
    }, function (t, n) {
      t || (n = {
        msgEventSubscribes: l(n)
      }), e.callback(t, n);
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(95),
      i = n(0),
      o = i.undef;
  r.getPushNotificationMultiportConfig = function () {
    return this.protocol.getPushNotificationMultiportConfig();
  }, r.updatePushNotificationMultiportConfig = function (e) {
    i.verifyOptions(e), o(e.shouldPushNotificationWhenPCOnline) && (e.shouldPushNotificationWhenPCOnline = !0), e.donnop = new s(e), this.processCallback(e), this.sendCmd("updateDonnop", e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn;
  r.clearDB = function (e) {
    var t = this.db;
    this.processCallback(e);
    var n = e.done;
    t.enable ? t.clear().then(n, n) : n();
  }, r.removeDB = function (e) {
    var t = this.db;
    this.processCallback(e);
    var n = e.done;
    t.enable ? t.destroy().then(n, n) : n();
  }, r.closeDB = function (e) {
    var t = this.db;
    this.processCallback(e);
    var n = e.done;
    t.enable ? t.close().then(n, n) : n();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0);

  r.audioToText = function (e) {
    s.verifyOptions(e, "url", "audio::audioToText"), e.audioToText = s.filterObj(e, "url");
    this.processCallback(e), this.sendCmd("audioToText", e);
  };
}, function (e, t, n) {
  "use strict";
}, function (e, t, n) {
  "use strict";
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = n(1);

  r.getChatroomAddress = function (e) {
    s.verifyOptions(e, "chatroomId", "chatroom::getChatroomAddress");
    e.isWeixinApp = i.isWeixinApp, this.processCallback(e), this.sendCmd("getChatroomAddress", e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.undef,
      o = s.notundef,
      a = n(54);
  r.markSysMsgRead = function (e) {
    var t,
        n = this.db,
        r = Promise.resolve(),
        i = this.protocol;
    s.verifyOptions(e, "sysMsgs", "sysmsg::markSysMsgRead");
    var o = e.sysMsgs;

    function a() {
      e.done(t, e);
    }

    s.isArray(o) || (o = [o]), n.enable ? r = n.markSysMsgRead(o).then(function (e) {
      o = e, i.onUpdateSysMsg(e);
    }) : (o = o.filter(function (e) {
      return !e.read;
    })).length && (i.options.autoMarkRead || i.markSysMsgRead(o, !0), o.forEach(function (e) {
      e.read = !0;
    }), i.onUpdateSysMsg(o)), r.then(function () {
      return i.reduceSysMsgUnread(o);
    }).then(a, function (e) {
      t = e, a();
    });
  }, r.sendCustomSysMsg = function (e) {
    s.verifyOptions(e, "scene to content", "sysmsg::sendCustomSysMsg"), s.verifyParamValid("scene", e.scene, this.message.validScenes, "sysmsg::sendCustomSysMsg"), this.processCallback(e), "p2p" === e.scene ? e.type = "customP2p" : e.type = "customTeam", e.sysMsg = new a(e);
    var t = "sendCustomSysMsg";
    return e.filter && (t = "sendFilterCustomSysMsg"), this.sendCmd(t, {
      sysMsg: e.sysMsg,
      single: !0
    }, e.callback), this.formatReturnSysMsg(e.sysMsg);
  }, r.formatReturnSysMsg = function (e) {
    return e = s.copy(e), this.protocol.completeSysMsg(e), e.status = "sending", e = a.reverse(e);
  }, r.getLocalSysMsgs = function (e) {
    var t,
        n = this.db,
        r = [];

    function c() {
      e.sysMsgs = r, e.done(t, e);
    }

    s.verifyOptions(e), e.category && s.verifyParamValid("category", e.category, a.validCategories, "sysmsg::getLocalSysMsgs"), e.type && s.verifyParamValid("type", e.type, a.validTypes, "sysmsg::getLocalSysMsgs"), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "sysmsg::getLocalSysMsgs"), s.verifyParamMax("limit", e.limit, 100, "sysmsg::getLocalSysMsgs"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "sysmsg::getLocalSysMsgs") : e.reverse = !1, this.processCallback(e), n.enable ? n.getSysMsgs(e).then(function (e) {
      r = e, c();
    }, function (e) {
      t = e, c();
    }) : c();
  }, r.updateLocalSysMsg = function (e) {
    var t,
        n = this.db,
        r = null;

    if (s.verifyOptions(e, "idServer", "sysmsg::updateLocalSysMsg"), this.processCallback(e), n.enable) {
      var i = s.filterObj(e, "idServer state localCustom");
      n.updateSysMsg(i).then(function (e) {
        r = e, o();
      }, function (e) {
        t = e, o();
      });
    } else o();

    function o() {
      e.sysMsg = r, e.done(t, e);
    }
  }, r.deleteLocalSysMsg = function (e) {
    var t,
        n = this.db;

    function r() {
      e.done(t, e);
    }

    s.verifyOptions(e, "idServer", "sysmsg::deleteLocalSysMsg"), this.processCallback(e), n.enable ? n.deleteSysMsg(e.idServer).then(function () {
      r();
    }, function (e) {
      t = e, r();
    }) : r();
  }, r.deleteAllLocalSysMsgs = function (e) {
    var t,
        n = this,
        r = n.db;

    function s() {
      n.protocol.onUpdateSysMsgUnread({}), e.done(t, e);
    }

    n.processCallback(e), r.enable && r.deleteAllSysMsgs().then(function () {
      s();
    }, function (e) {
      t = e, s();
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.undef,
      o = s.notundef,
      a = n(20),
      c = n(53),
      u = n(54),
      l = n(4);
  r.beforeSendMsg = function (e) {
    var t,
        n = this.protocol,
        r = e.msg;

    switch (r.to === this.account && (r.fromDeviceId = a.deviceId), r.userUpdateTime = n.myInfo && n.myInfo.updateTime, r.getScene()) {
      case "p2p":
        t = "sendMsg";
        break;

      case "team":
        t = "sendTeamMsg";
    }

    e.filter && (t = "sendFilterMsg", r.filter = !0), e.cmd = t;
  }, r.afterSendMsg = function (e) {
    var t = e.rtnMsg,
        n = c.genSessionByMsg(t);
    this.protocol.onUpdateSession(n);
  }, r.beforeForwardMsg = function (e) {
    s.verifyOptions(e, "msg scene to", "msg::beforeForwardMsg"), e.msg.scene = e.scene, e.msg.to = e.to;
  }, r.markMsgRead = function (e) {
    var t = this.protocol;
    !e || this.db.enable || t.options.autoMarkRead ? this.logger.warn("api::markMsgRead: 不需要标记消息为已收到 (没有消息, 或者启用了数据库, 或者启用了自动标记已收到)") : t.markMsgRead(e, !0);
  }, r.sendMsgReceipt = function (e) {
    if (s.verifyOptions(e), this.processCallback(e), e.msg) {
      s.verifyOptions(e, "msg", "msg::sendMsgReceipt");
      var t = e.msg;
      s.verifyOptions(t, "target idClient time", !0, "msg.", "msg::sendMsgReceipt"), this.protocol.shouldSendMsgReceipt(t) ? this.sendCmd("sendMsgReceipt", {
        msgReceipt: {
          to: t.target,
          idClient: t.idClient,
          time: t.time
        }
      }, e.callback) : e.done();
    } else e.done();
  }, r.isMsgRemoteRead = function (e) {
    return this.protocol.isMsgRemoteRead(e);
  }, r.deleteMsg = function (e) {
    s.verifyOptions(e, "msg", "msg::deleteMsg");
    var t = e.msg;
    if ("team" !== t.scene && "out" !== t.flow || "success" !== t.status || t.from === t.to || t.isLocal) return e.done(l.newParamError("只能删除自己发送给别人的, 并且发送成功的非本地消息", {
      callFunc: "msg::deleteMsg"
    }), e);
    s.verifyOptions(t, ["scene", "to", "from", "time", "idClient", "idServer"], !0, "msg.", "msg::deleteMsg"), s.verifyParamValid("msg.scene", t.scene, this.message.validScenes, "msg::deleteMsg");
    var n = s.simpleClone(t);
    this.processPs(n), this.processCallback(e), o(e.opeAccount) ? n.opeAccount = e.opeAccount : i(n.opeAccount) && (n.opeAccount = n.from), "p2p" === n.scene ? n.type = "deleteMsgP2p" : n.type = "deleteMsgTeam", n.deletedIdClient = n.idClient, n.deletedIdServer = n.idServer, n = new u(n), this.sendCmd("deleteMsg", {
      sysMsg: n,
      msg: t
    }, e.callback);
  };
  var m = {
    text: 0,
    image: 1,
    audio: 2,
    video: 3,
    geo: 4,
    notification: 5,
    file: 6,
    tip: 10,
    robot: 11,
    custom: 100
  };
  r.getHistoryMsgs = function (e) {
    var t;

    switch (s.verifyOptions(e, "scene to", "msg::getHistoryMsgs"), s.verifyParamValid("scene", e.scene, this.message.validScenes, "msg::getHistoryMsgs"), void 0 === e.beginTime && (e.beginTime = 0), s.verifyParamType("beginTime", e.beginTime, "number", "msg::getHistoryMsgs"), void 0 === e.endTime && (e.endTime = 0), s.verifyParamType("endTime", e.endTime, "number", "msg::getHistoryMsgs"), void 0 !== e.lastMsgId && null !== e.lastMsgId || (e.lastMsgId = "0"), void 0 === e.limit && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "msg::getHistoryMsgs"), s.verifyParamMax("limit", e.limit, 100, "msg::getHistoryMsgs"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "msg::getHistoryMsgs") : e.reverse = !1, o(e.asc) ? s.verifyParamType("asc", e.asc, "boolean", "msg::getHistoryMsgs") : e.asc = !1, i(e.msgTypes) ? e.msgTypes = [] : Array.isArray(e.msgTypes) ? (e.msgTypes = e.msgTypes.map(function (e) {
      return m[e];
    }), e.msgTypes = e.msgTypes.filter(function (e) {
      return "number" == typeof e;
    })) : "number" == typeof m[e.msgTypes] ? e.msgTypes = [m[e.msgTypes]] : e.msgTypes = [], this.processCallback(e), e.asc && (e.cbaop = function (e, t) {
      e || (t.msgs = t.msgs.reverse());
    }), e.scene) {
      case "p2p":
        t = "getHistoryMsgs";
        break;

      case "team":
        t = "getTeamHistoryMsgs";
    }

    var n = {
      scene: e.scene,
      to: e.to,
      beginTime: e.beginTime,
      endTime: e.endTime,
      lastMsgId: e.lastMsgId,
      limit: e.limit,
      reverse: e.reverse,
      msgTypes: e.msgTypes
    };
    this.sendCmd(t, n, e.callback);
  }, r.searchHistoryMsgs = function (e) {
    var t;

    switch (s.verifyOptions(e, "scene to keyword", "msg::searchHistoryMsgs"), s.verifyParamValid("scene", e.scene, this.message.validScenes, "msg::searchHistoryMsgs"), void 0 === e.beginTime && (e.beginTime = 0), s.verifyParamType("beginTime", e.beginTime, "number", "msg::searchHistoryMsgs"), void 0 === e.endTime && (e.endTime = 0), s.verifyParamType("endTime", e.endTime, "number", "msg::searchHistoryMsgs"), void 0 === e.limit && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "msg::searchHistoryMsgs"), s.verifyParamMax("limit", e.limit, 100, "msg::searchHistoryMsgs"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "msg::searchHistoryMsgs") : e.reverse = !1, o(e.asc) ? s.verifyParamType("asc", e.asc, "boolean", "msg::searchHistoryMsgs") : e.asc = !1, this.processCallback(e), e.asc && (e.cbaop = function (e, t) {
      e || (t.msgs = t.msgs.reverse());
    }), e.scene) {
      case "p2p":
        t = "searchHistoryMsgs";
        break;

      case "team":
        t = "searchTeamHistoryMsgs";
    }

    var n = s.filterObj(e, "scene to beginTime endTime keyword limit reverse");
    this.sendCmd(t, n, e.callback);
  }, r.getLocalMsgs = function (e) {
    var t = this.db,
        n = null,
        r = [];
    s.verifyOptions(e);
    var a = !1;
    o(e.start) && (a = !0, s.verifyParamType("start", e.start, "number", "msg::getLocalMsgs"));
    var c = !1;

    function u() {
      var t = s.simpleClone(e);
      t.msgs = r, delete t.callback, delete t.done, e.done(n, t);
    }

    o(e.end) && (c = !0, s.verifyParamType("end", e.end, "number", "msg::getLocalMsgs")), a && c && e.end <= e.start && s.onParamError("参数 end 必须晚于 start"), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "msg::getLocalMsgs"), s.verifyParamMin("limit", e.limit, 1, "msg::getLocalMsgs"), this.processCallback(e), t.enable ? t.getMsgs(e).then(function (e) {
      r = e, u();
    }, function (e) {
      (e = e || {}).message = e.message || "msg::getLocalMsgs:db error", u();
    }) : u();
  }, r.getLocalMsgByIdClient = function (e) {
    var t,
        n = this.db,
        r = null;

    function i() {
      e.msg = r, e.done(t, e);
    }

    s.verifyOptions(e, "idClient", "msg::getLocalMsgByIdClient"), this.processCallback(e), n.enable ? n.getMsgByIdClient(e.idClient).then(function (e) {
      e && (r = e), i();
    }, function (e) {
      t = e, i();
    }) : i();
  }, r.getLocalMsgsByIdClients = function (e) {
    var t,
        n = this.db,
        r = [];

    function i() {
      e.msgs = r, e.done(t, e);
    }

    s.verifyOptions(e, "idClients", "msg::getLocalMsgByIdClient"), s.verifyParamType("idClients", e.idClients, "array", "msg::getLocalMsgByIdClient"), this.processCallback(e), n.enable ? n.getMsgsByIdClients(e.idClients).then(function (e) {
      r = e.filter(function (e) {
        return !!e;
      }), i();
    }, function (e) {
      t = e, i();
    }) : i();
  }, r.updateLocalMsg = function (e) {
    var t,
        n = this.db,
        r = null;

    if (s.verifyOptions(e, "idClient", "msg::updateLocalMsg"), this.processCallback(e), n.enable) {
      var i = s.filterObj(e, "idClient localCustom");
      n.updateMsg(i).then(function (e) {
        r = e, o();
      }, function (e) {
        t = e, o();
      });
    } else o();

    function o() {
      e.msg = r, e.done(t, e);
    }
  }, r.deleteLocalMsg = function (e) {
    var t;
    s.verifyOptions(e, "msg", "msg::deleteLocalMsg");
    var n = e.msg;

    function r() {
      e.done(t, e);
    }

    s.verifyOptions(n, "idClient sessionId", !0, "msg.", "msg::deleteLocalMsg"), this.processCallback(e), this.protocol.deleteLocalMsg(n).then(r, function (e) {
      t = e, r();
    });
  }, r.deleteLocalMsgsBySession = function (e) {
    var t,
        n = this.db;

    function r() {
      e.done(t, e);
    }

    s.verifyOptions(e, "scene to", "msg::deleteLocalMsgsBySession"), s.verifyParamValid("scene", e.scene, this.message.validScenes, "msg::deleteLocalMsgsBySession"), e.sessionId = e.scene + "-" + e.to, this.processCallback(e), n.enable ? n.deleteMsgsBySessionId(e.sessionId).then(function () {
      r();
    }, function (e) {
      t = e, r();
    }) : r();
  }, r.deleteAllLocalMsgs = function (e) {
    var t,
        n = this.db;

    function r() {
      e.done(t, e);
    }

    this.processCallback(e), n.enable && n.deleteAllMsgs().then(function () {
      r();
    }, function (e) {
      t = e, r();
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.undef,
      o = s.notundef;
  r.setCurrSession = function (e) {
    this.resetSessionUnread(e), this.protocol.setCurrSession(e);
  }, r.resetAllSessionUnread = function () {
    for (var e in this.protocol.sessionSet) {
      this.protocol.sessionSet[e].unread > 0 && this.resetSessionUnread(e);
    }
  }, r.resetSessionUnread = function (e) {
    if (this.protocol.resetSessionUnread(e), this.options.syncSessionUnread) {
      var t = this.protocol.findSession(e);
      if (t) {
        if (t.lastMsg) {
          if (t.scene && t.to) {
            var n = t.lastMsg.time;
            if (t && t.ack && t.ack >= n) this.logger.warn("api::resetSessionUnread: session ack not needs " + e);else {
              var r = {
                scene: "p2p" === t.scene ? 0 : 1,
                to: t.to,
                timetag: n
              };
              this.sendCmd("markSessionAck", r);
            }
          } else this.logger.warn("api::resetSessionUnread: session.scene|to undefined " + e);
        } else this.logger.warn("api::resetSessionUnread: session.lastMsg undefined " + e);
      } else this.logger.warn("api::resetSessionUnread: session undefined " + e);
    }
  }, r.resetCurrSession = function () {
    this.protocol.setCurrSession("");
  }, r.insertLocalSession = function (e) {
    var t, n;

    function r() {
      e.session = n, e.done(t, e);
    }

    s.verifyOptions(e, "scene to", "scene::insertLocalSession"), s.verifyParamValid("scene", e.scene, this.message.validScenes, "scene::insertLocalSession"), this.processCallback(e), this.protocol.insertLocalSession(e).then(function (e) {
      n = e, r();
    }, function (e) {
      t = e, r();
    });
  }, r.getLocalSessions = function (e) {
    var t,
        n = this,
        r = n.db,
        a = [];

    function c() {
      e.sessions = a, e.done(t, e);
    }

    s.verifyOptions(e), i(e.limit) && (e.limit = 100), s.verifyParamType("limit", e.limit, "number", "scene::getLocalSessions"), s.verifyParamMax("limit", e.limit, 100, "scene::getLocalSessions"), o(e.reverse) ? s.verifyParamType("reverse", e.reverse, "boolean", "scene::getLocalSessions") : e.reverse = !1, n.processCallback(e), r.enable ? r.getSessions(e).then(function (e) {
      a = e, n.protocol.mergeSessions(a), c();
    }, function (e) {
      t = e, c();
    }) : c();
  }, r.getLocalSession = function (e) {
    var t,
        n = this.db,
        r = null;
    if (s.verifyOptions(e, "sessionId", "scene::getLocalSession"), s.verifyParamType("sessionId", e.sessionId, "string", "scene::getLocalSession"), n.enable) return this.processCallback(e), void n.getSession(e.sessionId).then(function (e) {
      e && (r = e), i();
    }, function (e) {
      t = e, i();
    });

    function i() {
      e.done(t, r);
    }

    this.protocol.sessionSet && this.protocol.sessionSet[e.sessionId] && (r = this.protocol.sessionSet[e.sessionId]), i();
  }, r.updateLocalSession = function (e) {
    var t,
        n = this,
        r = n.db;
    s.verifyOptions(e, "id", "scene::updateLocalSession"), n.processCallback(e);
    var i = s.filterObj(e, "id localCustom");

    function o() {
      n.protocol.onUpdateSession(i), e.session = i, e.done(t, e);
    }

    r.enable ? r.updateSession(i).then(function (e) {
      i = e, o();
    }, function (e) {
      t = e, o();
    }) : o();
  }, r.deleteLocalSession = function (e) {
    var t,
        n = this,
        r = n.db;

    function i() {
      e.done(t, e);
    }

    s.verifyOptions(e, "id", "session::deleteLocalSession"), n.processCallback(e), r.enable ? r.deleteSession(e.id).then(function () {
      n.protocol.deleteLocalSession(e.id), i();
    }, function (e) {
      t = e, i();
    }) : i();
  }, r.deleteSession = function (e) {
    s.verifyOptions(e, "scene to", "session::deleteSession"), this.processCallback(e), e.sessions = [{
      scene: e.scene,
      to: e.to
    }], this.deleteSessions(e);
  }, r.deleteSessions = function (e) {
    s.verifyOptions(e, "sessions", "session::deleteSessions"), s.verifyParamType("sessions", e.sessions, "array", "session::deleteSessions"), e.sessions.forEach(function (e, t) {
      s.verifyOptions(e, "scene to", !0, "sessions[" + t + "].", "session::deleteSessions");
    }), this.processCallback(e), this.sendCmd("deleteSessions", {
      sessions: e.sessions.map(function (e) {
        return e.scene + "|" + e.to;
      })
    }, e.callback);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.undef,
      o = n(56),
      a = n(48);
  r.createTeam = function (e) {
    s.verifyOptions(e, "type name", "team::createTeam"), i(e.accounts) ? e.accounts = [] : s.verifyParamType("accounts", e.accounts, "array", "team::createTeam"), e.action = "create", this.processPs(e), this.processCallback(e), e.team = new o(e);
    var t = {
      team: e.team,
      accounts: e.accounts.slice(0),
      ps: e.ps
    };
    this.sendCmd("createTeam", t, e.callback);
  }, r.updateTeam = function (e) {
    s.verifyOptions(e, "teamId", "team::updateTeam"), e.action = "update", this.processCallback(e), e.team = new o(e), this.sendCmd("updateTeam", {
      team: e.team,
      single: !0
    }, e.callback);
  }, r.addTeamMembers = function (e) {
    s.verifyOptions(e, "teamId accounts", "team::addTeamMembers"), s.verifyParamType("accounts", e.accounts, "array", "team::addTeamMembers"), this.processPs(e), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      accounts: e.accounts.slice(0),
      ps: e.ps
    };
    this.sendCmd("addTeamMembers", t, e.callback);
  }, r.removeTeamMembers = function (e) {
    s.verifyOptions(e, "teamId accounts", "team::removeTeamMembers"), s.verifyParamType("accounts", e.accounts, "array", "team::removeTeamMembers"), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      accounts: e.accounts.slice(0)
    };
    this.sendCmd("removeTeamMembers", t, e.callback);
  }, r.acceptTeamInvite = function (e) {
    s.verifyOptions(e, "idServer teamId from", "team::acceptTeamInvite"), this.processCallback(e);
    var t = {
      idServer: e.idServer,
      teamId: e.teamId,
      from: e.from
    };
    this.sendCmd("acceptTeamInvite", t, e.callback);
  }, r.rejectTeamInvite = function (e) {
    s.verifyOptions(e, "idServer teamId from", "team::rejectTeamInvite"), this.processPs(e), this.processCallback(e);
    var t = {
      idServer: e.idServer,
      teamId: e.teamId,
      from: e.from,
      ps: e.ps
    };
    this.sendCmd("rejectTeamInvite", t, e.callback);
  }, r.applyTeam = function (e) {
    s.verifyOptions(e, "teamId", "team::applyTeam"), this.processPs(e), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      ps: e.ps
    };
    this.sendCmd("applyTeam", t, e.callback);
  }, r.passTeamApply = function (e) {
    s.verifyOptions(e, "idServer teamId from", "team::passTeamApply"), this.processCallback(e);
    var t = {
      idServer: e.idServer,
      teamId: e.teamId,
      from: e.from
    };
    this.sendCmd("passTeamApply", t, e.callback);
  }, r.rejectTeamApply = function (e) {
    s.verifyOptions(e, "idServer teamId from", "team::rejectTeamApply"), this.processPs(e), this.processCallback(e);
    var t = {
      idServer: e.idServer,
      teamId: e.teamId,
      from: e.from,
      ps: e.ps
    };
    this.sendCmd("rejectTeamApply", t, e.callback);
  }, r.addTeamManagers = function (e) {
    s.verifyOptions(e, "teamId accounts", "team::addTeamManagers"), s.verifyParamType("accounts", e.accounts, "array", "team::addTeamManagers"), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      accounts: e.accounts.slice(0)
    };
    this.sendCmd("addTeamManagers", t, e.callback);
  }, r.removeTeamManagers = function (e) {
    s.verifyOptions(e, "teamId accounts", "team::removeTeamManagers"), s.verifyParamType("accounts", e.accounts, "array", "team::removeTeamManagers"), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      accounts: e.accounts.slice(0)
    };
    this.sendCmd("removeTeamManagers", t, e.callback);
  }, r.updateInfoInTeam = function (e) {
    s.verifyOptions(e, "teamId", "team::updateInfoInTeam"), this.processCallback(e), this.sendCmd("updateInfoInTeam", {
      teamMember: new a(e),
      single: !0
    }, e.callback);
  }, r.updateNickInTeam = function (e) {
    s.verifyOptions(e, "teamId account", "team::updateNickInTeam"), this.processCallback(e), this.sendCmd("updateNickInTeam", {
      teamMember: new a(e),
      single: !0
    }, e.callback);
  }, r.updateMuteStateInTeam = function (e) {
    s.verifyOptions(e, "teamId account mute", "team::updateMuteStateInTeam"), this.processCallback(e), e.mute = e.mute ? 1 : 0, this.sendCmd("updateMuteStateInTeam", e);
  }, r.getMutedTeamMembers = function (e) {
    s.verifyOptions(e, "teamId", "team::getMutedTeamMembers"), this.processCallback(e), this.sendCmd("getMutedTeamMembers", e);
  }, r.leaveTeam = function (e) {
    s.verifyOptions(e, "teamId", "team::leaveTeam"), this.processCallback(e);
    var t = {
      teamId: e.teamId
    };
    this.sendCmd("leaveTeam", t, e.callback);
  }, r.transferTeam = function (e) {
    s.verifyOptions(e, "teamId account leave", "team::transferTeam"), s.verifyParamType("leave", e.leave, "boolean", "team::transferTeam"), this.processCallback(e);
    var t = {
      teamId: e.teamId,
      account: e.account,
      leave: e.leave
    };
    this.sendCmd("transferTeam", t, e.callback);
  }, r.dismissTeam = function (e) {
    s.verifyOptions(e, "teamId", "team::dismissTeam"), this.processCallback(e);
    var t = {
      teamId: e.teamId
    };
    this.sendCmd("dismissTeam", t, e.callback);
  }, r.getTeam = function (e) {
    var t,
        n = this,
        r = n.db;

    function i() {
      n.sendCmd("getTeam", {
        teamId: e.teamId
      }, e.callback);
    }

    s.verifyOptions(e, "teamId", "team::getTeam"), n.processCallback(e), e.cbaop = function (e, r) {
      e || n.logger.log("api::getTeam: cbaop " + t, r);
    }, t = e.teamId, r.enable && !e.sync ? r.getTeam(t).then(function (r) {
      r ? (n.logger.log("api::getTeam: db.getTeam " + t, r), e.done(null, r)) : i();
    }, i) : i();
  }, r.getTeams = function (e) {
    var t = this,
        n = t.db,
        r = 0;

    function i() {
      t.sendCmd("getTeams", {
        timetag: r,
        NOTSTORE: "timetag"
      }, e.callback);
    }

    s.verifyOptions(e), t.processCallback(e), n.enable ? n.getTeamsTimetag().then(function (e) {
      r = e, i();
    }, i) : i();
  }, r.getTeamMembers = function (e) {
    var t = this,
        n = 0;
    s.verifyOptions(e, "teamId", "team::getTeamMembers"), t.processCallback(e), t.sendCmd("getTeamMembers", {
      teamId: e.teamId,
      timetag: n,
      NOTSTORE: "timetag"
    }, e.callback);
  }, r.getTeamMemberByTeamIdAndAccount = function (e) {
    var t = this,
        n = 0;
    s.verifyParamType("teamId", e.teamId, "numeric or numeric string", "team::getTeamMemberByTeamIdAndAccount"), s.verifyOptions(e, "account", "team::getTeamMemberByTeamIdAndAccount"), t.processCallback(e), t.sendCmd("getTeamMembers", {
      teamId: e.teamId,
      timetag: n,
      NOTSTORE: "timetag"
    }, function (t, n, r) {
      var s = {};
      if (n && n.members && n.members.length) for (var i = 0; i < n.members.length; i++) {
        if (n.members[i].account === e.account) {
          s[e.account] = n.members[i];
          break;
        }
      }
      e.callback(t, s, r);
    });
  }, r.notifyForNewTeamMsg = function (e) {
    s.verifyOptions(e, "teamIds", "team::notifyForNewTeamMsg"), this.protocol.notifyForNewTeamMsg(e.teamIds).then(function (t) {
      e.done(null, t);
    }, function (t) {
      e.done(t);
    });
  }, r.getMyTeamMembers = function (e) {
    s.verifyOptions(e, "teamIds", "team::getMyTeamMembers");
    var t = this.processCallbackPromise(e);
    return this.sendCmd("getMyTeamMembers", e), t;
  }, r.getLocalTeams = function (e) {
    var t,
        n = this.db,
        r = [];

    function i() {
      e.teams = r, e.done(t, e);
    }

    s.verifyOptions(e, "teamIds", "team::getLocalTeams"), s.verifyParamType("teamIds", e.teamIds, "array", "team::getLocalTeams"), this.processCallback(e), n.enable ? n.getTeamsByTeamIds(e.teamIds).then(function (e) {
      r = e.filter(function (e) {
        return !!e;
      }), i();
    }, function (e) {
      t = e, i();
    }) : i();
  }, r.getLocalTeamMembers = function (e) {
    var t,
        n = this.db,
        r = [];

    function i() {
      e.members = r, e.done(t, e);
    }

    s.verifyOptions(e, "teamId accounts", "team::getLocalTeamMembers"), s.verifyParamType("accounts", e.accounts, "array", "team::getLocalTeamMembers"), this.processCallback(e), n.enable ? n.getInvalidTeamMembers(e.teamId, e.accounts).then(function (e) {
      r = e.filter(function (e) {
        return !!e;
      }), i();
    }, function (e) {
      t = e, i();
    }) : i();
  }, r.deleteLocalTeam = function (e) {
    var t,
        n = this.db;

    function r() {
      e.done(t, e);
    }

    s.verifyOptions(e, "teamId", "team::deleteLocalTeam"), this.processCallback(e), n.enable ? n.deleteTeam(e.teamId).then(function () {
      r();
    }, function (e) {
      t = e, r();
    }) : r();
  }, r.muteTeamAll = function (e) {
    switch (s.verifyOptions(e, "teamId type", "team::muteTeamAll"), e.type) {
      case "none":
        e.muteType = 0;
        break;

      case "normal":
        e.muteType = 1;
        break;

      case "all":
        e.muteType = 2;
        break;

      default:
        e.muteType = 1;
    }

    this.processCallback(e), this.sendCmd("muteTeamAll", e);
  }, r.sendTeamMsgReceipt = function (e) {
    s.verifyOptions(e, "teamMsgReceipts", "team::sendTeamMsgReceipt"), this.processCallback(e), this.sendCmd("sendTeamMsgReceipt", e);
  }, r.getTeamMsgReads = function (e) {
    s.verifyOptions(e, "teamMsgReceipts", "team::getTeamMsgReads"), this.processCallback(e), this.sendCmd("getTeamMsgReads", e);
  }, r.getTeamMsgReadAccounts = function (e) {
    s.verifyOptions(e, "teamMsgReceipt", "team::getTeamMsgReadAccounts"), this.processCallback(e), this.sendCmd("getTeamMsgReadAccounts", e);
  };
}, function (e, t, n) {
  "use strict";

  n(7).fn.getRobots = function (e) {
    (e = e || {}).type = "getRobots", this.processCallback(e), this.sendCmd("sync", {
      sync: {
        robots: 0
      }
    }, e.callback);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.notundef,
      o = n(138);
  r.friendRequest = function (e) {
    s.verifyOptions(e, "type account", "friend::friendRequest"), s.verifyParamValid("type", e.type, o.validTypes(), "friend::friendRequest"), this.processPs(e), this.processCallback(e);
    var t = {
      account: e.account,
      type: o.getByteFromType(e.type),
      ps: e.ps
    };
    i(e.idServer) && (t.idServer = e.idServer), this.sendCmd("friendRequest", t, e.callback);
  }, r.addFriend = function (e) {
    e.type = "addFriend", this.friendRequest(e);
  }, r.applyFriend = function (e) {
    e.type = "applyFriend", this.friendRequest(e);
  }, r.passFriendApply = function (e) {
    s.verifyOptions(e, "idServer", "friend::passFriendApply"), e.type = "passFriendApply", this.friendRequest(e);
  }, r.rejectFriendApply = function (e) {
    s.verifyOptions(e, "idServer", "friend::rejectFriendApply"), e.type = "rejectFriendApply", this.friendRequest(e);
  }, r.deleteFriend = function (e) {
    s.verifyOptions(e, "account", "friend::deleteFriend"), this.processCallback(e), this.sendCmd("deleteFriend", {
      account: e.account
    }, e.callback);
  }, r.updateFriend = function (e) {
    this.processCallback(e);
    var t = new o(e);
    this.sendCmd("updateFriend", {
      friend: t,
      single: !0
    }, e.callback);
  }, r.getFriends = function (e) {
    var t = this,
        n = t.db,
        r = 0;

    function i() {
      t.sendCmd("getFriends", {
        timetag: r,
        NOTSTORE: "timetag"
      }, e.callback);
    }

    s.verifyOptions(e), t.processCallback(e), n.enable ? n.getFriendsTimetag().then(function (e) {
      r = e, i();
    }, i) : i();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.objs2accounts,
      o = n(73);
  r.updateMyInfo = function (e) {
    s.verifyOptions(e), this.processCallback(e), e.user = new o(e), delete e.user.account, this.sendCmd("updateMyInfo", {
      user: e.user,
      single: !0
    }, e.callback);
  }, r.getMyInfo = function (e) {
    return (e = e || {}).account = this.account, this.getUser(e);
  }, r.getUser = function (e) {
    var t,
        n = this,
        r = n.db;

    function i() {
      n.sendCmd("getUsers", {
        accounts: [t],
        single: !0
      }, e.callback);
    }

    s.verifyOptions(e, "account", "user::getUser"), n.processCallback(e), e.cbaop = function (e, r) {
      if (!e) return r = r[0] || null, n.logger.log("api::getUser: cbaop " + t, r), r;
    }, t = e.account, e.sync ? i() : r.enable ? r.getUser(t).then(function (r) {
      r ? (n.logger.log("api::getUser: db.getUser " + t, r), e.done(null, r)) : i();
    }, i) : i();
  }, r.getUsers = function (e) {
    var t,
        n = this,
        r = n.db,
        o = [];

    function a() {
      n.sendCmd("getUsers", {
        accounts: t,
        single: !0
      }, e.callback);
    }

    s.verifyOptions(e, "accounts", "user::getUsers"), s.verifyParamType("accounts", e.accounts, "array", "user::getUsers"), n.processCallback(e), e.cbaop = function (e, r) {
      if (!e) return r = r.concat(o), n.logger.log("api::getUsers: cbaop " + t, r), r;
    }, t = s.deduplicate(e.accounts), s.verifyArrayMax("accounts", e.accounts, 150, "user::getUsers"), e.sync ? a() : r.enable ? r.getUsers(t).then(function (r) {
      if (r && r.length === t.length) n.logger.log("api::getUsers: db.getUsers", r), e.done(null, r);else {
        o = r;
        var s = i(r),
            c = [];
        t.forEach(function (e) {
          -1 === s.indexOf(e) && c.push(e);
        }), t = c, a();
      }
    }, a) : a();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0);
  r.markInBlacklist = function (e) {
    s.verifyOptions(e, "account isAdd", "relation::markInBlacklist"), s.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInBlacklist"), this.processCallback(e), this.sendCmd("markInBlacklist", {
      account: e.account,
      isAdd: e.isAdd
    }, e.callback);
  }, r.addToBlacklist = function (e) {
    return e.isAdd = !0, this.markInBlacklist(e);
  }, r.removeFromBlacklist = function (e) {
    return e.isAdd = !1, this.markInBlacklist(e);
  }, r.markInMutelist = function (e) {
    s.verifyOptions(e, "account", "relation::markInMutelist"), s.verifyParamType("isAdd", e.isAdd, "boolean", "relation::markInMutelist"), this.processCallback(e), this.sendCmd("markInMutelist", {
      account: e.account,
      isAdd: e.isAdd
    }, e.callback);
  }, r.addToMutelist = function (e) {
    return e.isAdd = !0, this.markInMutelist(e);
  }, r.removeFromMutelist = function (e) {
    return e.isAdd = !1, this.markInMutelist(e);
  }, r.getRelations = function (e) {
    var t = this,
        n = t.db,
        r = 0;

    function i() {
      t.sendCmd("getRelations", {
        timetag: r,
        NOTSTORE: "timetag"
      }, e.callback);
    }

    e = s.verifyOptions(e), t.processCallback(e), n.enable ? n.getRelationsTimetag().then(function (e) {
      r = e, i();
    }, i) : i();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0);

  r.kick = function (e) {
    s.verifyOptions(e, "deviceIds", "link::kick"), this.processCallback(e), this.sendCmd("kick", {
      deviceIds: e.deviceIds.slice(0)
    }, e.callback);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(7).fn,
      s = n(0),
      i = s.isArray,
      o = n(48);
  r.mergeObjArray = function (e, t, n) {
    return e || (e = []), t ? (i(t) || (t = [t]), t.length ? (n = n || {}, s.mergeObjArray(e, t, n)) : e) : e;
  }, r.cutObjArray = function (e, t, n) {
    return e && t ? (i(t) || (t = [t]), t.length ? (n = n || {}, s.cutObjArray(e, t, n)) : e) : e;
  }, r.mergeLoginPorts = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "deviceId"
    });
  }, r.cutLoginPorts = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "deviceId",
      sortPath: "type"
    });
  }, r.mergeRelations = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "account"
    });
  }, r.cutRelations = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "account"
    });
  }, r.findRelation = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "account",
      value: t
    });
  }, r.mergeFriends = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "account"
    });
  }, r.cutFriends = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "account"
    });
  }, r.cutFriendsByAccounts = function (e, t) {
    i(t) || (t = [t]);
    var n = t.map(function (e) {
      return {
        account: e
      };
    });
    return this.cutFriends(e, n);
  }, r.findFriend = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "account",
      value: t
    });
  }, r.mergeUsers = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "account"
    });
  }, r.findUser = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "account",
      value: t
    });
  }, r.mergeTeams = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "teamId"
    });
  }, r.cutTeams = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "teamId"
    });
  }, r.findTeam = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "teamId",
      value: t
    });
  }, r.assembleTeamOwner = o.assembleOwner, r.assembleTeamMembers = o.assembleMembers, r.genTeamMemberId = o.genId, r.mergeTeamMembers = function (e, t) {
    return this.mergeObjArray(e, t);
  }, r.cutTeamMembers = function (e, t) {
    return this.cutObjArray(e, t);
  }, r.cutTeamMembersByAccounts = function (e, t, n) {
    i(n) || (n = [n]);
    var r = o.assembleMembers({
      teamId: t
    }, n);
    return this.cutTeamMembers(e, r);
  }, r.findTeamMember = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "id",
      value: t
    });
  }, r.mergeSessions = function (e, t) {
    return this.mergeObjArray(e, t, {
      sortPath: "updateTime",
      desc: !0
    });
  }, r.cutSessions = function (e, t) {
    return this.cutObjArray(e, t);
  }, r.cutSessionsByIds = function (e, t) {
    i(t) || (t = [t]);
    var n = t.map(function (e) {
      return {
        id: e
      };
    });
    return this.cutSessions(e, n);
  }, r.findSession = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "id",
      value: t
    });
  }, r.mergeMsgs = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "idClient",
      sortPath: "time"
    });
  }, r.cutMsgs = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "idClient"
    });
  }, r.cutMsgsByIdClients = function (e, t) {
    i(t) || (t = [t]);
    var n = t.map(function (e) {
      return {
        idClient: e
      };
    });
    return this.cutMsgs(e, n);
  }, r.findMsg = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "idClient",
      value: t
    });
  }, r.mergeSysMsgs = function (e, t) {
    return this.mergeObjArray(e, t, {
      keyPath: "idServer",
      desc: !0
    });
  }, r.cutSysMsgs = function (e, t) {
    return this.cutObjArray(e, t, {
      keyPath: "idServer"
    });
  }, r.cutSysMsgsByIdServers = function (e, t) {
    i(t) || (t = [t]);
    var n = t.map(function (e) {
      return {
        idServer: e
      };
    });
    return this.cutSysMsgs(e, n);
  }, r.findSysMsg = function (e, t) {
    return s.findObjInArray(e, {
      keyPath: "idServer",
      value: t
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(32),
      s = n(0),
      i = {
    welcome: "00",
    text: "01",
    link: "03"
  },
      o = {
    "01": "text",
    "02": "image",
    "03": "answer",
    11: "template"
  };

  function a(e) {
    s.verifyOptions(e, "content", "msg::RobotMessage"), s.undef(e.robotAccid) && (e.robotAccid = e.to);
    var t = e.content;

    switch (t.type) {
      case "welcome":
        s.undef(e.body) && (this.body = "欢迎消息");
        break;

      case "text":
        s.verifyOptions(t, "content", "msg::RobotMessage"), s.undef(e.body) && (this.body = t.content);
        break;

      case "link":
        s.verifyOptions(t, "target", "msg::RobotMessage");
    }

    t.type && (t.type = i[t.type]), t = {
      param: t,
      robotAccid: e.robotAccid
    }, this.attach = JSON.stringify(t), e.type = "robot", r.call(this, e);
  }

  a.prototype = Object.create(r.prototype), a.reverse = function (e) {
    var t = r.reverse(e);

    if ("robot" === t.type) {
      var n = JSON.parse(e.attach);

      if (n.param && (n.param.type = o[n.param.type] || "unknown"), n.robotMsg) {
        var i = (n = s.merge(n, n.robotMsg)).message;
        "bot" === n.flag ? n.message = i.map(function (e) {
          return e.type = o[e.type] || "unknown", e;
        }) : n.flag, delete n.robotMsg;
      }

      t.content = n;
    }

    return t;
  }, e.exports = a;
}, function (e, t, n) {
  "use strict";

  var r = n(32),
      s = n(0);

  function i(e) {
    s.verifyOptions(e, "tip", "msg::TipMessage"), e.type = "tip", r.call(this, e), this.body = e.tip;
  }

  i.prototype = Object.create(r.prototype), i.reverse = function (e) {
    var t = r.reverse(e);
    return t.text = "", t.tip = e.body, e.attach && (t.attach = e.attach), t;
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(32),
      s = n(0);

  function i(e) {
    s.verifyOptions(e, "content", "msg::CustomMessage"), e.type = "custom", r.call(this, e), this.attach = e.content;
  }

  i.prototype = Object.create(r.prototype), i.reverse = function (e) {
    var t = r.reverse(e);
    return t.content = e.attach, t;
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(0).notundef,
      s = n(32),
      i = n(44).getInstance("IM"),
      o = n(56),
      a = n(73),
      c = {
    0: "addTeamMembers",
    1: "removeTeamMembers",
    2: "leaveTeam",
    3: "updateTeam",
    4: "dismissTeam",
    5: "passTeamApply",
    6: "transferTeam",
    7: "addTeamManagers",
    8: "removeTeamManagers",
    9: "acceptTeamInvite",
    10: "updateTeamMute",
    101: "netcallMiss",
    102: "netcallBill"
  };

  function u() {}

  u.prototype = Object.create(s.prototype), u.reverse = function (e) {
    var t = s.reverse(e);

    if (e.attach = e.attach ? "" + e.attach : "", e.attach) {
      var n = JSON.parse(e.attach);

      if (t.attach = {
        type: c[n.id] || n.id
      }, r(n.data)) {
        var u = n.data;
        r(u.tinfo) && (t.attach.team = o.reverse(i.unserialize(u.tinfo, "team"), !0)), r(u.ids) && (t.attach.accounts = u.ids), r(u.id) && (t.attach.account = u.id), r(u.uinfos) && (t.attach.users = u.uinfos.map(function (e) {
          return a.reverse(i.unserialize(e, "user"));
        })), r(u.mute) && (t.attach.mute = 1 == +u.mute), r(u.attach) && (t.attach.custom = u.attach), r(u.channel) && (t.attach.channelId = u.channel), r(u.calltype) && (t.attach.netcallType = u.calltype), r(u.duration) && (t.attach.duration = u.duration), r(u.time) && (t.attach.time = u.time), t.attach.accounts && t.attach.accounts.length <= 2 && t.from === t.to && t.attach.accounts.some(function (e) {
          if (e !== t.to) return t.to = e, !0;
        });
      }
    } else t.attach = {};

    return t;
  }, e.exports = u;
}, function (e, t, n) {
  "use strict";

  var r = n(32),
      s = n(0);

  function i(e) {
    e.type = "geo", s.verifyOptions(e, "geo", "msg::GeoMessage"), s.verifyOptions(e.geo, "lng lat title", !0, "geo.", "msg::GeoMessage"), s.verifyParamType("geo.lng", e.geo.lng, "number", "msg::GeoMessage"), s.verifyParamType("geo.lat", e.geo.lat, "number", "msg::GeoMessage"), s.verifyParamType("geo.title", e.geo.title, "string", "msg::GeoMessage"), r.call(this, e), this.attach = JSON.stringify(e.geo);
  }

  i.prototype = Object.create(r.prototype), i.reverse = function (e) {
    var t = r.reverse(e);
    return e.attach = e.attach ? "" + e.attach : "", t.geo = e.attach ? JSON.parse(e.attach) : {}, t;
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(72),
      s = n(0);

  function i() {}

  i.prototype = Object.create(r.prototype), i.verifyFile = function (e, t) {
    s.verifyOptions(e, "dur w h", !0, "file.", t);
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(72),
      s = n(0);

  function i() {}

  i.prototype = Object.create(r.prototype), i.verifyFile = function (e, t) {
    s.verifyOptions(e, "dur", !0, "file.", t);
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = n(72);

  function i() {}

  i.prototype = Object.create(s.prototype), i.verifyFile = function (e, t) {
    r.verifyOptions(e, "w h", !0, "file.", t);
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(32),
      s = n(0);

  function i(e) {
    s.verifyOptions(e, "text", "msg::TextMessage"), e.type = "text", r.call(this, e);
  }

  i.prototype = Object.create(r.prototype), i.reverse = function (e) {
    return r.reverse(e);
  }, e.exports = i;
}, function (e, t, n) {
  "use strict";

  var r = n(0),
      s = function s(e) {
    this.account = e.account;
  },
      i = s.prototype,
      o = i.Message = n(32),
      a = i.TextMessage = n(223),
      c = i.FileMessage = n(72),
      u = i.GeoMessage = n(219),
      l = i.NotificationMessage = n(218),
      m = i.CustomMessage = n(217),
      d = i.TipMessage = n(216),
      p = i.RobotMessage = n(215);

  i.validScenes = o.validScenes, i.validTypes = o.validTypes, i.reverse = function (e) {
    var t;

    switch (o.getType(e)) {
      case "text":
        t = a.reverse(e);
        break;

      case "image":
      case "audio":
      case "video":
      case "file":
        t = c.reverse(e);
        break;

      case "geo":
        t = u.reverse(e);
        break;

      case "notification":
        t = l.reverse(e);
        break;

      case "custom":
        t = m.reverse(e);
        break;

      case "tip":
        t = d.reverse(e);
        break;

      case "robot":
        t = p.reverse(e);
        break;

      default:
        t = o.reverse(e);
    }

    return o.setExtra(t, this.account), t;
  }, i.reverseMsgs = function (e, t) {
    var n,
        s,
        i = this;
    return e.map(function (e) {
      return e = i.reverse(e), t && ((n = t.modifyObj) && (e = r.merge(e, n)), s = t.mapper, r.isFunction(s) && (e = s(e))), e;
    });
  }, e.exports = s;
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(20),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(3).fn,
      a = n(0),
      c = i.default.clientTypeMap;

  function u(e) {
    e = e || {};
    var t = a.copy(e);
    return t.clientType && (t.clientType = c[t.clientType] || ""), t.serverCustom && (t.custom = JSON.parse(t.serverCustom), "string" == typeof t.custom[0] && (t.custom = t.custom[0]), delete t.serverCustom), t;
  }

  o.processEventService = function (e) {
    var t = e.content,
        n = e.error,
        r = this.options || {};

    switch (n && (n.callFunc = "events::processEventService", this.onCustomError("事件服务解包失败", "EVENT_SERVICE_ERROR", n)), e.cmd) {
      case "pushEvent":
        if (a.isFunction(r.onpushevents)) {
          var s = {
            msgEvents: [u(t.msgEvent)]
          };
          r.onpushevents(s);
        }

        break;

      case "pushEvents":
        if (a.isFunction(r.onpushevents)) {
          var i = t.msgEvents;
          i = {
            msgEvents: i.map(function (e) {
              return u(e);
            })
          }, r.onpushevents(i);
        }

    }
  };
}, function (e, t, n) {
  "use strict";

  n(3).fn.processFilter = function (e) {
    switch (e.cmd) {
      case "sendFilterMsg":
        this.onSendMsg(e, !0);
        break;

      case "filterMsg":
        this.onMsg(e, !0);
        break;

      case "filterSysMsg":
        this.onSysMsg(e, !0);
        break;

      case "sendFilterCustomSysMsg":
        this.onSendSysMsg(e, !0);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn;
  r.processChatroom = function (e) {
    switch (e.cmd) {
      case "getChatroomAddress":
        this.onChatroomAddress(e);
    }
  }, r.onChatroomAddress = function (e) {
    e.error || (e.obj.address = e.content.address);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn;
  r.syncSessionAck = function (e) {
    var t = this,
        n = t.db,
        r = Promise.resolve();
    [[e.content.p2p, "p2p"], [e.content.team.m_map, "team"]].forEach(function (e) {
      var s = e[0],
          i = e[1];
      Object.keys(s).forEach(function (e) {
        var o = i + "-" + e,
            a = {
          id: o,
          ack: s[e]
        };
        n.enable && (r = r.then(function () {
          return n.putSession(a);
        }).then(function () {
          t.markUnreadBySessionAck({
            sessionId: o,
            ack: s[e]
          });
        })), t.mergeSession(a);
      });
    }), t.logger.warn("session::syncSessionAck: parse offline session ack", t.sessionSet);
    var s = e.content.timetag;
    n.enable && (r = r.then(function () {
      return t.db.updateSessionAck(s);
    }).catch(function (e) {
      return t.logger.error("sessionAck::syncSessionAck: ", e), Promise.reject(e);
    })), r.cmd = "sessionAck", t.syncPromiseArray.push(r);
  }, r.onMarkSessionAck = function (e) {
    e.error || this.storeSessionAck(e.obj);
  }, r.syncMarkSessionAck = function (e) {
    this.storeSessionAck(e.content);
  }, r.storeSessionAck = function (e) {
    if (this.options.syncSessionUnread) {
      var t = this.db,
          n = (0 === e.scene ? "p2p" : "team") + "-" + e.to,
          r = e.timetag;
      if (r <= ((this.findSession(n) || {}).ack || 0)) this.logger.warn("session::storeSessionAck: ack <= ackInMemory", r);else {
        var s = {
          id: n,
          ack: r
        };
        this.mergeSession(s), t.enable && t.updateSession(s), this.logger.info("session::storeSessionAck:", s), this.markUnreadBySessionAck({
          sessionId: n,
          ack: s.ack
        });
      }
    }
  }, r.markUnreadBySessionAck = function (e) {
    var t = e.sessionId,
        n = e.ack,
        r = this,
        s = r.db;
    if (s.enable) r.pushMsgTask(function () {
      return s.getMsgCountAfterAck({
        shouldCountNotifyUnread: r.options.shouldCountNotifyUnread,
        sessionId: t,
        ack: n
      }).then(function (e) {
        var n = {
          id: t,
          unread: e
        };
        return r.logger.log("session::markUnreadBySessionAck: db.getMsgCountAfterAck done"), r.syncing && r.cacheSyncedSession(n), r.onUpdateSession(n), s.updateSession(n);
      });
    });else {
      var i = r.findSession(t);

      if (i) {
        var o = i.unreadMsgs;

        if (o && o.length) {
          for (var a = 0, c = [], u = o.length - 1; u >= 0; u--) {
            var l = o[u];
            if (!(l.time > n)) break;
            a++, c.push(l);
          }

          i.unreadMsgs = c, i.unread = a, r.logger.info("session::markUnreadBySessionAck: unread " + a), r.onUpdateSession(i);
        }
      }
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = n(53),
      o = n(4);
  r.mergeSession = function (e) {
    e = s.copyWithNull(e);
    var t = this.sessionSet,
        n = e.id,
        r = t[n];

    if (r && r.lastMsg && e && e.lastMsg && e.lastMsg.isLocal) {
      var i = r.lastMsg.time || 0;
      if ((e.lastMsg.time || 0) < i) return r;
    }

    return t[n] = s.merge(r, e), e = t[n], s.undef(e.unread) && (e.unread = 0), e;
  }, r.mergeSessions = function (e) {
    var t = this;
    e.forEach(function (e) {
      t.mergeSession(e);
    });
  }, r.deleteLocalSession = function (e) {
    var t = this;
    s.isArray(e) || (e = [e]), e.forEach(function (e) {
      delete t.sessionSet[e];
    });
  }, r.onDeleteSessions = function (e) {
    e.obj = e.obj.sessions.map(function (e) {
      return i.parse(e);
    });
  }, r.onUpdateSession = function (e) {
    var t = this;
    return new Promise(function (n) {
      e ? (e = t.mergeSession(e), e = s.simpleClone(e), i.trim(e), i.isComplete(e) && (t.logger.info("session::onUpdateSession:", e.id, s.simpleClone(e)), t.options.onupdatesession(e), n(e))) : n(e);
    });
  }, r.setCurrSession = function (e) {
    e = "" + e, this.currSessionId = e, this.logger.info("session::setCurrSession:", e);
  }, r.findSession = function (e) {
    return this.sessionSet[e];
  }, r.resetSessionUnread = function (e) {
    e = "" + e;
    var t,
        n = this,
        r = n.db;

    if (n.findSession(e)) {
      if (r.enable && r.resetSessionUnread(e), !n.options.autoMarkRead && n.sessionUnreadMsgs && n.sessionUnreadMsgs[e]) {
        var s = n.sessionUnreadMsgs[e];
        n.markMsgRead(s, !0), n.sessionUnreadMsgs[e] = [];
      }

      t = {
        id: e,
        unread: 0
      }, n.onUpdateSession(t);
    } else n.logger.warn("session::resetSessionUnread: no session " + e);
  }, r.insertLocalSession = function (e) {
    var t = this,
        n = t.db,
        r = t.sessionSet;
    return new Promise(function (a, c) {
      var u = e.scene,
          l = e.to,
          m = u + "-" + l,
          d = t.findSession(m);
      if (d) c(o.sessionExist({
        callFunc: "session::insertLocalSession",
        session: d
      }));else {
        var p;
        if (s.isNumber(e.updateTime)) p = e.updateTime;else {
          var f,
              g = [];

          for (var h in r) {
            r.hasOwnProperty(h) && (f = r[h], s.isNumber(f.updateTime) && g.push(f.updateTime));
          }

          p = Math.max.apply(Math, g) + 1, p = Math.max(p, +new Date());
        }
        var y = Promise.resolve();
        n.enable && (y = n.getMsgs({
          sessionId: m,
          limit: 1
        })), y.then(function (e) {
          if (s.isArray(e) && 1 === e.length) {
            var r = e[0];
            (d = i.genSessionByMsg(r)).updateTime = p;
          } else d = {
            id: m,
            scene: u,
            to: l,
            updateTime: p,
            lastMsg: null
          };

          n.enable ? n.putSession(d).then(a, c) : a(d), t.onUpdateSession(d);
        });
      }
    });
  }, r.updateLocalSession = function (e, t) {
    var n = this;
    return new Promise(function (r, i) {
      var a = n.db;

      if (n.findSession(e.id)) {
        var c = Promise.resolve(),
            u = s.filterObj(e, "id lastMsg localCustom");
        a.enable && (c = a.updateSession(u)), c.then(function (e) {
          return n.onUpdateSession(e, t);
        }).then(r, function (e) {
          i({
            callFunc: "session::updateLocalSession",
            event: e
          });
        });
      } else i(o.sessionNotExist({
        sessionId: e.id,
        callFunc: "session::updateLocalSession"
      }));
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = n(54);
  r.splitSysMsgs = function (e, t) {
    for (var n, r = e.length - 1; r >= 0; r--) {
      n = e[r], i.isCustom(n) && (e.splice(r, 1), t.push(n));
    }
  }, r.onOfflineSysMsgs = function (e, t) {
    var n = this,
        r = e.content.sysMsgs.map(function (e) {
      return e = i.reverse(e), t && (e.filter = !0), e;
    });
    r = r.reverse(), n.markSysMsgRead(r);
    var s = [];
    n.splitSysMsgs(r, s);
    var o = t ? "offlineFilterSysMsgs" : "offlineSysMsgs",
        a = t ? "offlineFilterCustomSysMsgs" : "offlineCustomSysMsgs";

    if (r.length) {
      var c = n.putSysMsg(r, "offlineSysMsgs").then(function (e) {
        (r = e).length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", o, r.length, r), n.syncResult[o] = n.syncResult[o] || [], n.syncResult[o] = n.syncResult[o].concat(r));
      }).catch(function (e) {
        return n.logger.error("sysMsg::onOfflineSysMsgs: ", e), Promise.reject(e);
      });
      c.cmd = "sysMsgs", n.syncPromiseArray.push(c);
    }

    s.length && (n.logger.info("sysmsg::onOfflineSysMsgs: ", a, s), n.syncResult[a] = n.syncResult[a] || [], n.syncResult[a] = n.syncResult[a].concat(s));
  }, r.onSendSysMsg = function (e, t) {
    var n = e.obj;
    this.completeSysMsg(n), e.error ? n.status = "fail" : n.status = "success", n = i.reverse(n), t && (e.obj.filter = !0), e.obj = n;
  }, r.completeSysMsg = function (e) {
    return e.from = this.account, e;
  }, r.onSysMsg = function (e, t) {
    var n = i.reverse(e.content.sysMsg);
    this.markSysMsgRead(n), t && (n.filter = !0), i.isCustom(n) ? (this.logger.info("sysmsg::onSysMsg: on customSysMsg", n), this.options.oncustomsysmsg(n)) : this.syncing ? this.unhandledSysMsgs.push(n) : this.handleSysMsg(n);
  }, r.handleSysMsg = function (e) {
    var t = this,
        n = e.type,
        r = e.from;
    t.sysMsgPromise = t.sysMsgPromise.then(function () {
      return t.putSysMsg(e, "onSysMsg");
    }).then(function (t) {
      e = t[0];
    }).then(function () {
      if (e) {
        var s,
            i = Promise.resolve();

        switch (n) {
          case "addFriend":
            s = {
              type: "addFriend",
              account: r
            }, i = t.onFriendRequest(s);
            break;

          case "passFriendApply":
            s = {
              type: "passFriendApply",
              account: r
            }, i = t.onFriendRequest(s);
            break;

          case "deleteFriend":
            i = t.onDeleteFriend({
              account: r
            });
        }

        return s && s.friend && (e.friend = s.friend), i;
      }
    }).then(function () {
      e && (t.logger.info("sysmsg::handleSysMsg: ", n, e), setTimeout(function () {
        t.options.onsysmsg(e);
      }, 0));
    });
  }, r.putSysMsg = function (e, t) {
    if (s.isArray(e) || (e = [e]), e[0].filter) return Promise.resolve(e);
    var n = this,
        r = n.db,
        i = r.enable,
        o = Promise.resolve(),
        a = [];
    return (o = (o = o.then(function () {
      return i ? r.putSysMsg(e) : e;
    }).then(function (t) {
      var r = [];
      e.forEach(function (e) {
        n.checkSysMsgUnique(e) && r.push(e);
      }), e = r, a = i ? t : e;
    })).then(function () {
      return n.getSysMsgUnread().then(function (r) {
        return a.length || ((a = e).backward = !0), n.updateSysMsgUnread(a, r, 1).then(function (e) {
          "offlineSysMsgs" === t && (n.syncResult.sysMsgUnread = e), "onSysMsg" === t && n.onUpdateSysMsgUnread(e);
        });
      });
    })).then(function () {
      return e;
    });
  }, r.checkSysMsgUnique = s.genCheckUniqueFunc("idServer"), r.getSysMsgUnread = function () {
    var e = this,
        t = e.db;
    return new Promise(function (n) {
      t.enable ? t.getSysMsgUnread().then(function (e) {
        n(e);
      }, function () {
        n(e.sysMsgUnread);
      }) : n(e.sysMsgUnread);
    });
  }, r.updateSysMsgUnread = function (e, t, n) {
    if (s.isArray(e) || (e = [e]), !e.length) return Promise.resolve(t);
    t = t || {};
    var r,
        o = this.db;
    return e.forEach(function (e) {
      (n > 0 && !e.read || n < 0 && e.read) && (r = e.type, t[r] = (t[r] || 0) + n);
    }), t = i.completeUnread(t), this.sysMsgUnread = t, o.enable && !e.backward ? o.updateSysMsgUnread(t) : Promise.resolve(t);
  }, r.reduceSysMsgUnread = function (e) {
    var t = this;
    return t.getSysMsgUnread().then(function (n) {
      return t.updateSysMsgUnread(e, n, -1);
    }).then(function (e) {
      t.onUpdateSysMsgUnread(e);
    });
  }, r.onUpdateSysMsgUnread = function (e) {
    var t = this;
    setTimeout(function () {
      t.logger.info("sysmsg::onUpdateSysMsgUnread:", e), t.options.onupdatesysmsgunread(e);
    }, 0);
  }, r.updateSysMsg = function (e) {
    var t = this,
        n = t.db;
    (n.enable ? n.updateSysMsg(e) : Promise.resolve(e)).then(function (e) {
      t.onUpdateSysMsg(e);
    });
  }, r.onUpdateSysMsg = function (e) {
    var t = this;
    setTimeout(function () {
      s.isArray(e) || (e = [e]), e.forEach(function (e) {
        t.logger.info("sysmsg::onUpdateSysMsg:", e), t.options.onupdatesysmsg(e);
      });
    }, 0);
  }, r.processUnsettledSysMsgs = function () {
    var e = this;
    e.unhandledSysMsgs.forEach(function (t) {
      e.handleSysMsg(t);
    }), e.resetUnsettledSysMsgs();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(54),
      i = n(53),
      o = n(0);
  r.onDeleteMsg = function (e) {
    var t = this.db;
    delete e.obj.sysMsg, e.error || (e.promise = this.deleteLocalMsg(e.obj.msg).then(function () {
      var n = e.obj.msg;
      t.enable && t.getTimetag("deleteMsg").then(function (e) {
        e = e || 0, n.time >= e && t.updateDeleteMsgTimetag(new Date().getTime());
      });
    }));
  }, r.onMsgDeleted = function (e) {
    if (!e.error) {
      var t = this,
          n = t.db,
          r = s.reverse(e.content.sysMsg);
      r = t.processDeleteMsgSysMsg(r), t.markSysMsgRead(r), t.deleteLocalMsg(r.msg).then(function () {
        n.enable && n.updateDeleteMsgTimetag(r.time + 1), t.handleSysMsg(r);
      });
    }
  }, r.processDeleteMsgSysMsg = function (e) {
    return e.msg = {}, ["scene", "from", "to"].forEach(function (t) {
      e.msg[t] = e[t];
    }), e.msg.idClient = e.deletedIdClient, e.msg.idServer = e.deletedIdServer, e.msg.time = e.deletedMsgTime, e.msg.fromNick = e.deletedMsgFromNick, e.opeAccount = e.opeAccount || e.from, e.msg.opeAccount = e.opeAccount, this.message.Message.setExtra(e.msg, this.account), e;
  }, r.onDeleteMsgOfflineRoaming = function (e) {
    if (!e.error) {
      var t = this,
          n = 1 == +e.content.type ? "offline" : "roaming",
          r = s.reverseSysMsgs(e.content.sysMsgs, {
        mapper: function mapper(e) {
          return t.processDeleteMsgSysMsg(e);
        }
      });
      t.logger.info("msg::onDeleteMsgOfflineRoaming: on delete " + n, r), "offline" === n && t.markSysMsgRead(r);
      var i = e.content.timetag;
      t.timetags.deleteMsg = i, t.syncResult.deleteMsgTimetag = i;
      var o = t.putSysMsg(r, "offlineSysMsgs").catch(function (e) {
        return t.logger.error("msgDelete::onDeleteMsgOfflineRoaming: ", e), Promise.reject(e);
      });
      o.cmd = "deleteMsgSysMsgs " + n, t.syncPromiseArray.push(o), t.syncResult.deleteMsgSysMsgs = t.syncResult.deleteMsgSysMsgs || [], t.syncResult.deleteMsgSysMsgs.push({
        type: n,
        sysMsgs: r
      });
    }
  }, r.deleteMsgOfflineRoaming = function (e, t) {
    if (!e) return Promise.resolve();
    var n = this;
    n.logger.info("msg::deleteMsgOfflineRoaming: ", e, t);
    var r = n.db,
        s = [];
    return e.forEach(function (e) {
      e.sysMsgs.forEach(function (e) {
        var a = n.deleteLocalMsg(e.msg, {
          cbUpdateSession: function cbUpdateSession(e) {
            e = n.mergeSession(e), e = o.simpleClone(e), i.trim(e);
            var s = o.findObjIndexInArray(t, {
              value: e.id
            });
            if (-1 !== s && (t[s] = o.merge({}, t[s], e)), r.enable) return r.updateSession(e);
          }
        });
        s.push(a);
      });
    }), Promise.all(s).then(function () {
      if (r.enable) return r.updateDeleteMsgTimetag(n.syncResult.deleteMsgTimetag);
    });
  }, r.deleteLocalMsg = function (e, t) {
    var n = this.db,
        r = (t = t || {}).cbUpdateSession || this.updateLocalSession.bind(this);

    if (n.enable && e) {
      var s = !1,
          i = null,
          o = e.sessionId;
      return n.getMsgs({
        sessionId: o,
        limit: 1
      }).then(function (t) {
        t && t[0] && t[0].idClient === e.idClient && (s = !0);
      }).then(function () {
        return n.deleteMsg(e.idClient);
      }).then(function () {
        if (s) return n.getMsgs({
          sessionId: o,
          limit: 1
        });
      }).then(function (e) {
        if (s) return e && e[0] && (i = e[0]), r({
          id: o,
          lastMsg: i
        });
      });
    }

    return Promise.resolve();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0);
  r.onOfflineMsgReceipts = function (e) {
    var t,
        n = this,
        r = n.db,
        s = e.content.msgReceipts,
        i = n.syncResult.msgReceipts = [],
        o = [],
        a = "msgReceipts",
        c = n.syncResult.sessions || {};
    s.forEach(function (e) {
      e.time = +e.time;
      var s = e.sessionId = "p2p-" + e.from;
      a += "-" + s, t = Promise.resolve();
      var u = c[s];
      r.enable ? t = r.getSession(s).then(function (t) {
        if ((t = t || u) && n.shouldUpdateSessionFromMsgReceipt(t, e)) {
          var i = n.genSessionFromMsgReceipt(t, e),
              o = n.syncResult.sessions;
          return o && o[s] && (o = o[s]).lastMsg && i.lastMsg && o.lastMsg.time > i.lastMsg.time && (i.lastMsg = o.lastMsg), r.putSession(i).then(function (e) {
            e && n.cacheSyncedSession(e);
          });
        }
      }).catch(function (e) {
        return n.logger.error("msgReceipt::onOfflineMsgReceipt: ", e), Promise.reject(e);
      }) : u && i.push(e), o.push(t);
    }), (t = Promise.all(o).then(function () {
      if (r.enable) return r.updateMsgReceiptsTimetag(e.content.timetag);
    })).cmd = a, n.syncPromiseArray.push(t);
  }, r.mergeSessionAndMsgReceipts = function (e, t) {
    var n = this,
        r = {};
    return t = t || [], (e = e || []).forEach(function (e) {
      r[e.id] = e;
    }), t.forEach(function (t) {
      var s = r[t.sessionId];

      if (n.shouldUpdateSessionFromMsgReceipt(s, t)) {
        var i = n.genSessionFromMsgReceipt(s, t);
        e = n.api.mergeSessions(e, i);
      }
    }), e;
  }, r.shouldUpdateSessionFromMsgReceipt = function (e, t) {
    return !e || !e.msgReceiptServerTime || t.time > e.msgReceiptServerTime;
  }, r.genSessionFromMsgReceipt = function (e, t) {
    var n = t.time,
        r = {
      id: t.sessionId,
      msgReceiptTime: n,
      msgReceiptServerTime: n
    };
    return e && e.id === t.sessionId && (r = s.merge({}, e, r)), e && e.updateTime || (r.updateTime = n), r;
  }, r.onMsgReceipt = function (e) {
    var t = this,
        n = t.db,
        r = e.content.msgReceipt;
    r.time = +r.time;
    var s = r.idClient,
        i = Promise.resolve();
    n.enable && s && (i = n.getMsgByIdClient(s)), i.then(function (e) {
      var n;

      if (e) {
        if (!e.idServer) return void (t.msgReceiptTasks[s] = r);
        n = e.time;
      } else n = r.time;

      r.msgReceiptTime = n, t.updateSessionMsgReceiptTime(r);
    });
  }, r.resolveMsgReceiptTask = function (e) {
    var t = this.msgReceiptTasks[e.idClient];
    t && (t.msgReceiptTime = e.time, this.updateSessionMsgReceiptTime(t));
  }, r.updateSessionMsgReceiptTime = function (e) {
    var t = this.db,
        n = {
      id: "p2p-" + e.from,
      msgReceiptTime: e.msgReceiptTime,
      msgReceiptServerTime: e.time
    };
    t.enable && t.putSession(n), this.onUpdateSession(n);
  }, r.onSendMsgReceipt = function (e) {
    if (!e.error) {
      var t = e.obj.msgReceipt,
          n = +t.time,
          r = +e.content.msgReceipt.time;
      this.sessionSet["p2p-" + t.to].msgReceiptSendTime = Math.min(n, r);
    }
  }, r.shouldSendMsgReceipt = function (e) {
    if (e && "p2p" === e.scene && "success" === e.status) {
      var t = this.sessionSet[e.sessionId];

      if (t) {
        var n = t.msgReceiptSendTime;
        return !n || n < e.time;
      }
    }

    return !1;
  }, r.isMsgRemoteRead = function (e) {
    if (e && "p2p" === e.scene && "out" === e.flow && "success" === e.status) {
      var t = this.sessionSet[e.sessionId];
      if (t && t.msgReceiptTime) return e.time <= t.msgReceiptTime;
    }

    return !1;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = s.undef,
      o = n(20),
      a = n(48),
      c = n(53),
      u = n(94);
  r.processMsg = function (e) {
    switch (e.cmd) {
      case "sendMsg":
        this.onSendMsg(e);
        break;

      case "msg":
        this.onMsg(e);
        break;

      case "sysMsg":
        this.onSysMsg(e);
        break;

      case "broadcastMsg":
        this.onBroadcastMsg(e);
        break;

      case "sendCustomSysMsg":
        this.onSendSysMsg(e);
        break;

      case "getHistoryMsgs":
      case "searchHistoryMsgs":
        this.onHistoryMsgs(e);
        break;

      case "syncSendMsg":
        this.onMsg(e);
        break;

      case "deleteSessions":
        this.onDeleteSessions(e);
        break;

      case "sendMsgReceipt":
        this.onSendMsgReceipt(e);
        break;

      case "msgReceipt":
        this.onMsgReceipt(e);
        break;

      case "onDeleteMsg":
        this.onDeleteMsg(e);
        break;

      case "onMsgDeleted":
        this.onMsgDeleted(e);
        break;

      case "onDeleteMsgOfflineRoaming":
        this.onDeleteMsgOfflineRoaming(e);
        break;

      case "onMarkSessionAck":
        this.onMarkSessionAck(e);
        break;

      case "syncMarkSessionAck":
        this.syncMarkSessionAck(e);
    }
  }, r.checkIgnore = function (e) {
    var t = this;
    e.forEach(function (e) {
      "notification" === e.type && !e.ignore && t.options.shouldIgnoreNotification(e) && (e.ignore = !0);
    });
  }, r.filterIgnore = function (e) {
    return e.filter(function (e) {
      return !e.ignore;
    });
  }, r.genSessionByMsgs = function (e) {
    return this.checkIgnore(e), c.genSessionByMsgs(this.message.Message, e);
  }, r.onRoamingMsgs = function (e) {
    var t = this,
        n = t.message,
        r = n.Message,
        s = r.getMaxTimetag,
        i = n.reverseMsgs(e.content.msgs),
        o = s(i);
    i = r.sortMsgs(i);
    var a = (i = r.deduplication(i))[0],
        c = a.sessionId,
        u = t.genSessionByMsgs(i);
    t.cacheSyncedSession(u);
    var l = t.putMsg(i, "roamingMsgs").then(function (e) {
      i = e, (i = t.filterIgnore(i)).length && (t.logger.info("msg::onRoamingMsgs: putRoamingMsgs", c, i.length, i), t.syncResult.roamingMsgs = t.syncResult.roamingMsgs || [], t.syncResult.roamingMsgs.push({
        sessionId: c,
        scene: a.scene,
        to: a.target,
        msgs: i,
        timetag: o
      }));
    }).catch(function (e) {
      return t.logger.error("msg::onRoamingMsgs: ", e), Promise.reject(e);
    });
    l.cmd = "roamingMsgs-" + c, t.syncPromiseArray.push(l);
  }, r.onOfflineMsgs = function (e, t) {
    var n = this,
        r = n.message,
        s = r.Message,
        i = null;
    t && (i = {
      filter: !0
    });
    var o,
        a,
        c = r.reverseMsgs(e.content.msgs, {
      modifyObj: i
    }),
        u = [],
        l = "",
        m = t ? "offlineFilterMsgs" : "offlineMsgs";

    function d(e) {
      if (u.length) {
        var t = s.getMaxTimetag(u),
            r = u[0].scene,
            i = u[0].target;
        n.markMsgRead(u), u = s.sortMsgs(u), u = s.deduplication(u);
        var o = n.genSessionByMsgs(u);
        n.cacheSyncedSession(o), (a = n.putMsg(u, "offlineMsgs").then(function (s) {
          u = s, (u = n.filterIgnore(u)).length && (n.logger.info("msg::onOfflineMsgs： toreLastSession", m, e, u.length, u), n.syncResult[m] = n.syncResult[m] || [], n.syncResult[m].push({
            sessionId: e,
            scene: r,
            to: i,
            msgs: u,
            timetag: t
          }));
        }).catch(function (e) {
          return n.logger.error("msg::onOfflineMsgs: ", e), Promise.reject(e);
        })).cmd = "offlineMsgs-" + e, n.syncPromiseArray.push(a);
      }
    }

    c.forEach(function (e) {
      (o = e.sessionId) !== l ? (d(l), (u = []).push(e), l = o) : u.push(e);
    }), d(l);
  }, r.markUnreadByMsgsPromise = function (e) {
    var t = this,
        n = t.db;
    n.enable && n.getSession(e).then(function (n) {
      n.ack && t.markUnreadBySessionAck({
        sessionId: e,
        ack: n.ack
      });
    });
  }, r.completeMsg = function (e) {
    return e.from = this.account, e.fromNick = this.myInfo && this.myInfo.nick, e.fromClientType = "Web", e.fromDeviceId = o.deviceId, e.time || (e.time = +new Date()), e;
  }, r.onMsgs = function (e) {
    var t = this;
    t.message.reverseMsgs(e.content.msgs, {
      mapper: function mapper(e) {
        t.handleMsg(e);
      }
    });
  }, r.onMsg = function (e, t) {
    var n = this.message.reverse(e.content.msg);
    t && (n.filter = !0), this.syncing ? (this.logger.log("msg::onMsg:is in syncing ..."), this.unhandledMsgs.push({
      type: "onMsg",
      msg: n
    })) : this.handleMsg(n);
  }, r.onBroadcastMsgs = function (e) {
    var t = e.content.broadcastMsgs;
    t = t.sort(function (e, t) {
      return e.broadcastId - t.broadcastId;
    }), this.putBroadcastMsgs(t);
  }, r.onBroadcastMsg = function (e) {
    var t = e.content.broadcastMsg;
    t.time = t.timestamp, this.syncing ? this.unhandledMsgs.push({
      type: "onBroadcastMsg",
      msg: t
    }) : t && this.putBroadcastMsg(t);
  }, r.pushMsgTask = function (e) {
    this.msgPromise = this.msgPromise.then(function () {
      return e();
    });
  }, r.handleMsg = function (e) {
    var t = this,
        n = e.time;
    t.markMsgRead(e), t.msgPromise = t.msgPromise.then(function () {
      return t.putMsg(e, "onMsg");
    }).then(function (r) {
      return t.logger.log("msg::handleMsg:putMsg: ", e), e = r[0], t.updateRoamingMsgTimetag(n);
    }).then(function () {
      if (t.logger.log("msg::handleMsg:updateRoamingMsgTimetag: ", n, e), e) return t.checkUserUpdate(e);
    }).then(function () {
      if (e) {
        var n = e.type;

        switch (t.logger.log("msg::handleMsg:checkUserUpdate: " + e.scene + " " + n + " msg" + ("notification" === n ? " " + e.attach.type : ""), e), n) {
          case "notification":
            return t.onTeamNotificationMsg(e);
        }
      }
    }).then(function () {
      e && !e.ignore && (t.logger.info("msg::handleMsg:onmsg: ", e), setTimeout(function () {
        t.options.onmsg(s.copy(e));
      }, 0));
    }).then(void 0, function (e) {
      e.callFunc = "msg::handleMsg", t.onCustomError("消息处理错误", e);
    });
  }, r.putMsg = function (e, t) {
    if (s.isArray(e) || (e = [e]), e[0].filter) return Promise.resolve(e);
    var n = this,
        r = n.db,
        o = r.enable,
        a = Promise.resolve(),
        c = n.message.Message.getLastMsg(e),
        u = c.flow,
        l = c.sessionId !== n.currSessionId,
        m = n.genSessionByMsgs(e);
    f(m);
    var d = !1,
        p = [];

    function f(e) {
      "roamingMsgs" !== t && "offlineMsgs" !== t || n.cacheSyncedSession(e);
    }

    return n.checkIgnore(e), n.logger.log("start"), a = (a = (a = a.then(function () {
      return o || n.options.autoMarkRead || "roamingMsgs" === t || !m || (n.sessionUnreadMsgs = n.sessionUnreadMsgs || {}, n.sessionUnreadMsgs[m.id] = n.sessionUnreadMsgs[m.id] || [], n.sessionUnreadMsgs[m.id] = n.sessionUnreadMsgs[m.id].concat(e.filter(function (e) {
        return n.options.shouldCountNotifyUnread(e);
      }))), o && "roamingMsgs" !== t && "offlineMsgs" !== t ? (n.logger.log("msg::putMsg:db.putMsg: ", m), r.putMsg(e)) : e;
    }).then(function (t) {
      var r = [];
      return e.forEach(function (e) {
        n.checkMsgUnique(e) && r.push(e);
      }), e = r, p = o ? t : e, Promise.resolve(e);
    })).then(function (e) {
      return e.length && (f(m = n.genSessionByMsgs(e)), o && m) ? new Promise(function (t, s) {
        r.getSessions({
          sessionId: m.id
        }).then(function (s) {
          if (s && s.lastMsg) {
            var i = s.lastMsg;
            m.lastMsg && m.lastMsg.time < i.time && (m.lastMsg = i);
          }

          n.logger.log("msg::putMsg:db.getSessions: ", m), p.length ? m ? r.putSession(m).then(function (e) {
            t(e);
          }) : t(s) : (d = !0, p = e, t(s));
        });
      }) : Promise.resolve(m);
    })).then(function (e) {
      if (m && p.length) {
        var s = "roamingMsgs" === t,
            a = n.options.syncSessionUnread,
            c = m.id,
            g = n.findSession(c) || {},
            h = g.ack || 0;

        if ("offlineMsgs" === t || s && a || "onMsg" === t && "in" === u && l) {
          o && e ? (m = e, h = h || m.ack || 0) : (e = g) && (m.unread = e.unread || 0), f(m), m.unread = m.unread || 0;
          var y = 0;
          if (p.forEach(function (e) {
            var t = n.options.shouldCountNotifyUnread(e),
                r = ("notification" !== e.type || "notification" === e.type && t) && (i(e.isUnreadable) || e.isUnreadable);

            if (r && a && (r = e.time > h && "out" !== e.flow), r && (y++, a && !o)) {
              var s = g.unreadMsgs || [];
              s.push(e), m.unreadMsgs = s;
            }
          }), console.log(m), m.unread += y, n.logger.log("msg::putMsg:updateSession: ", m), f(m), o && !d) return r.updateSession({
            id: m.id,
            unread: m.unread
          });
        }
      }
    }), "onMsg" === t ? a = a.then(function () {
      e.length && m && (n.onUpdateSession(m), n.options.syncSessionUnread && !l && n.api.resetSessionUnread(n.currSessionId));
    }) : "sendMsg" === t && !l && m && m.lastMsg && m.lastMsg.isLocal && (n.onUpdateSession(m), n.api.resetSessionUnread(n.currSessionId)), a.then(function () {
      return Promise.resolve(e);
    });
  }, r.putBroadcastMsgs = function (e) {
    var t = this,
        n = t.db,
        r = e.length;

    if (r > 0) {
      if (t.doMarkBroadcastMsgsRead(e), n.enable) {
        var i = e[r - 1].broadcastId;
        return n.updateBroadcastMsgTimetag(i), n.putBroadcastMsg(e).then(function () {
          return setTimeout(function () {
            t.doMarkMsgsRead(), t.options.onbroadcastmsgs(s.copy(e));
          }, 0), Promise.resolve(e);
        });
      }

      setTimeout(function () {
        t.options.onbroadcastmsgs(s.copy(e));
      }, 0);
    }

    return e;
  }, r.putBroadcastMsg = function (e) {
    var t = this,
        n = t.db;
    return t.doMarkBroadcastMsgsRead([e]), n.enable ? (e.broadcastId && n.updateBroadcastMsgTimetag(e.broadcastId), n.putBroadcastMsg(e).then(function () {
      return setTimeout(function () {
        t.options.onbroadcastmsg(s.copy(e));
      }, 0), Promise.resolve(e);
    })) : (setTimeout(function () {
      t.options.onbroadcastmsg(s.copy(e));
    }, 0), e);
  }, r.doMarkBroadcastMsgsRead = function (e) {
    e = e.map(function (e) {
      return e.broadcastId;
    }), this.sendCmd("batchMarkRead", {
      sid: 7,
      cid: 17,
      ids: e
    });
  }, r.cacheSyncedSession = function (e) {
    if (e && this.syncResult) {
      e = s.merge({}, e), this.syncResult.sessions = this.syncResult.sessions || {};
      var t = e.id;
      this.syncResult.sessions[t] = s.merge(this.syncResult.sessions[t], e), i(this.syncResult.sessions[t].unread) && (this.syncResult.sessions[t].unread = 0), this.mergeSession(this.syncResult.sessions[t]);
    }
  }, r.checkMsgUnique = s.genCheckUniqueFunc("idClient"), r.storeSendMsg = function (e) {
    if (!this.syncing) {
      var t = this.putMsg(e, "sendMsg");
      return this.msgPromise = this.msgPromise.then(function () {
        return t;
      }), t;
    }

    this.unhandledMsgs.push({
      type: "sendMsg",
      msg: e
    });
  }, r.updateSendMsgError = function (e) {
    if (!this.syncing) {
      var t = this.updateMsg(e);
      return this.msgPromise = this.msgPromise.then(function () {
        return t;
      }), t;
    }

    this.unupdatedMsgs.push(e);
  }, r.onSendMsg = function (e, t) {
    var n = this,
        r = e.obj && e.obj.msg || e.content.msg;
    if (e.obj) i();else {
      var s = n.db;
      s && s.enable && s.getMsgByIdClient(r.idClient).then(function (e) {
        e && (r = e, i());
      }, function (e) {
        i();
      });
    }

    function i() {
      n.completeMsg(r);
      var s = e.error && 7101 === e.error.code;
      e.error && !s || (r.idServer = e.content.msg.idServer, r.time = +e.content.msg.time), e.error ? r.status = "fail" : r.status = "success", r = n.message.reverse(r), t && (r.filter = !0), e.obj = r, n.syncing ? n.unupdatedMsgs.push(r) : n.msgPromise = Promise.all([n.msgPromise, e.obj.promise]).then(function (e) {
        return e.length || (r.resend = !0), n.updateMsg(r).then(function () {
          return n.options.syncSessionUnread && n.currSessionId === r.sessionId && n.api.resetSessionUnread(n.currSessionId), n.resolveMsgReceiptTask(r), r;
        });
      });
    }
  }, r.updateLocalMsg = function (e) {
    var t = this.updateMsg(e);
    return this.msgPromise = this.msgPromise.then(function () {
      return t;
    }), t;
  }, r.updateMsg = function (e) {
    if (e.filter) return Promise.resolve(e);
    var t = this,
        n = t.db,
        r = "success" === e.status,
        s = c.genSessionByMsg(e),
        i = !!e.isLocal;
    return n.enable ? n.updateMsg(e).then(function (e) {
      var o = n.updateSession(s),
          a = Promise.resolve();
      return r && e && !i && (a = n.updateRoamingMsgTimetag(e.time)), t.onUpdateSession(s), Promise.all([o, a]);
    }) : (r && !i && (t.timetags.roamingMsgs = e.time), t.onUpdateSession(s), Promise.resolve(e));
  }, r.updateRoamingMsgTimetag = function (e) {
    var t = this.db;
    return t.enable ? t.updateRoamingMsgTimetag(e) : (this.timetags.roamingMsgs = e, Promise.resolve(e));
  }, r.checkUserUpdate = function (e) {
    var t = this,
        n = e.from;
    return n === t.account ? Promise.resolve() : new Promise(function (r) {
      var i = t.userSet[n];

      if (i) {
        var o = +i.updateTime,
            a = +e.userUpdateTime;
        !isNaN(o) && !isNaN(a) && s.isNumber(o) && s.isNumber(a) && o < a ? c() : r();
      } else c();

      function c() {
        t.api.getUser({
          account: n,
          sync: !0,
          done: function done(e, n) {
            e || setTimeout(function () {
              t.logger.log("user::checkUserUpdate: onupdateuser", n.account, n), t.options.onupdateuser(n);
            }, 0), r();
          }
        });
      }
    });
  }, r.processUnsettledMsgs = function () {
    var e = this;
    e.unhandledMsgs.forEach(function (t) {
      var n = t.msg;

      switch (t.type) {
        case "onMsg":
          e.handleMsg(n);
          break;

        case "sendMsg":
          e.msgPromise = e.msgPromise.then(function () {
            return e.putMsg(n);
          });
          break;

        case "onBroadcastMsg":
          e.msgPromise = e.msgPromise.then(function () {
            return e.putBroadcastMsg(n);
          });
      }
    }), e.unupdatedMsgs.forEach(function (t) {
      e.msgPromise = e.msgPromise.then(function () {
        return e.updateMsg(t);
      });
    }), e.resetUnsettledMsgs();
  }, r.onTeamNotificationMsg = function (e) {
    this.db;
    var t = e.attach,
        n = t.type,
        r = e.from,
        s = e.to,
        i = e.time,
        o = t.team,
        a = t.account,
        c = t.accounts;

    switch (n) {
      case "updateTeam":
        return o.updateTime = i, this.onUpdateTeam(o);

      case "addTeamMembers":
        return this.onAddTeamMembers(e, o, c);

      case "removeTeamMembers":
        return this.onRemoveTeamMembers(o, s, c);

      case "acceptTeamInvite":
        return this.onAddTeamMembers(e, o, [r]);

      case "passTeamApply":
        return this.onAddTeamMembers(e, o, [a]);

      case "addTeamManagers":
        return this.updateTeamManagers(e, s, c, !0, i);

      case "removeTeamManagers":
        return this.updateTeamManagers(e, s, c, !1, i);

      case "leaveTeam":
        return this.onRemoveTeamMembers(o, s, [r]);

      case "dismissTeam":
        return this.onDismissTeam(s, i);

      case "transferTeam":
        return this.transferTeam(e, o, r, a);

      case "updateTeamMute":
        return this.onUpdateTeamMembersMute(e, o, [a], t.mute);
    }
  }, r.onAddTeamMembers = function (e, t, n) {
    var r = this,
        i = r.db,
        o = t.teamId,
        c = a.assembleMembers(t, n);
    e.attach.members = c;
    var u = {
      team: t,
      accounts: n,
      members: c
    };

    if (r.logger.info("team::onAddTeamMembers: ", u), r.options.onAddTeamMembers(s.simpleClone(u)), i.enable) {
      var l,
          m = i.putTeam(t);
      return -1 === n.indexOf(r.account) ? l = i.putTeamMembers(c) : (r.logger.warn("team::onAddTeamMembers: user join team", o), m = new Promise(function (e) {
        r.api.getTeamMembers({
          teamId: o,
          sync: !0,
          done: function done() {
            e();
          }
        });
      })), Promise.all([l, m]);
    }
  }, r.onRemoveTeamMembers = function (e, t, n) {
    var r = this.db,
        i = {
      team: e,
      accounts: n
    };

    if (this.logger.info("team::onRemoveTeamMembers:", i), this.options.onRemoveTeamMembers(s.simpleClone(i)), r.enable) {
      if (-1 === n.indexOf(this.account)) {
        var o = r.removeTeamMembersByAccounts(t, n),
            a = Promise.resolve();
        return e && (a = r.putTeam(e)), Promise.all([o, a]);
      }

      return r.leaveTeam(t);
    }
  }, r.updateTeamManagers = function (e, t, n, r, i) {
    var o = this.db,
        c = e.attach.members = n.map(function (e) {
      return {
        id: a.genId(t, e),
        type: r ? "manager" : "normal",
        updateTime: i
      };
    }),
        u = {
      teamId: "" + t,
      memberUpdateTime: i
    };
    e.attach.team = u;
    var l = {
      team: u,
      accounts: n,
      isManager: r,
      members: c
    };

    if (this.logger.info("team::updateTeamManagers:", l), this.options.onUpdateTeamManagers(s.simpleClone(l)), o.enable) {
      var m = o.updateTeam(u),
          d = o.updateTeamManagers(t, n, r, i);
      return Promise.all([m, d]);
    }
  }, r.onDismissTeam = function (e, t) {
    var n = this.db,
        r = {
      teamId: e
    };
    if (this.logger.info("team::onDismissTeam:", r), this.options.onDismissTeam(r), n.enable) return n.dismissTeam(e, t);
  }, r.transferTeam = function (e, t, n, r) {
    var i = this.db,
        o = t.teamId,
        c = t.memberUpdateTime,
        u = {
      id: a.genId(o, n),
      type: "normal",
      updateTime: c
    },
        l = {
      id: a.genId(o, r),
      type: "owner",
      updateTime: c
    };
    e.attach.members = [u, l];
    var m = {
      team: t,
      from: u,
      to: l
    };
    if (this.logger.info("team::transferTeam:", m), this.options.onTransferTeam(s.simpleClone(m)), i.enable) return i.transferTeam(t, n, r);
  }, r.onUpdateTeamMembersMute = function (e, t, n, r) {
    var i = this.db,
        o = n.map(function (e) {
      return {
        id: a.genId(t.teamId, e),
        account: e,
        teamId: t.teamId,
        mute: r,
        updateTime: t.memberUpdateTime
      };
    });
    e.attach.members = o;
    var c = {
      team: t,
      accounts: n,
      members: o,
      mute: r
    };

    if (this.logger.info("team::onUpdateTeamMembersMute:", c), this.options.onUpdateTeamMembersMute(s.simpleClone(c)), i.enable) {
      var u = i.updateTeamMembers(o),
          l = i.putTeam(t);
      return Promise.all([u, l]);
    }
  }, r.onHistoryMsgs = function (e) {
    e.error || (e.obj.msgs = this.message.reverseMsgs(e.content.msgs));
  }, r.isFilterMsgs = function (e) {
    return !!e[0].filter;
  }, r.splitMsgs = function (e, t, n, r) {
    e.forEach(function (e) {
      if (e.filter) r.push(e);else switch (e.scene) {
        case "p2p":
          t.push(e);
          break;

        case "team":
          n.push(e);
      }
    });
  }, r.markMsgRead = function (e, t) {
    s.isArray(e) || (e = [e]);

    if (this.db.enable || this.options.autoMarkRead || t) {
      var n = [],
          r = [],
          i = [];
      this.splitMsgs(e, n, r, i), this.markP2pMsgsRead(n), this.markTeamMsgsRead(r), this.markFilterMsgsRead(i);
    }
  }, r.markP2pMsgsRead = function (e) {
    if (e.length) {
      var t = u.idMap.msg.id,
          n = u.idMap.msg.msg;
      this.doMarkMsgsRead(t, n, e);
    }
  }, r.markTeamMsgsRead = function (e) {
    if (e.length) {
      var t = u.idMap.team.id,
          n = u.idMap.team.teamMsg;
      this.doMarkMsgsRead(t, n, e);
    }
  }, r.markFilterMsgsRead = function (e) {
    if (e.length) {
      var t = u.idMap.filter.id,
          n = u.idMap.filter.filterMsg;
      this.doMarkMsgsRead(t, n, e);
    }
  }, r.markSysMsgRead = function (e, t) {
    s.isArray(e) || (e = [e]);
    var n, r;
    (this.db.enable || this.options.autoMarkRead || t) && (this.isFilterMsgs(e) ? (n = u.idMap.filter.id, r = u.idMap.filter.filterSysMsg) : (n = u.idMap.msg.id, r = u.idMap.msg.sysMsg), this.doMarkMsgsRead(n, r, e));
  }, r.doMarkMsgsRead = function (e, t, n) {
    n && n.length && (!n[0].attach || "netcallBill" !== n[0].attach.type && "netcallMiss" !== n[0].attach.type || (e = 9, t = 11), this.sendCmd("batchMarkRead", {
      sid: e,
      cid: t,
      ids: n.map(function (e) {
        return e.idServer;
      })
    }));
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = n(95);
  r.processNotify = function (e) {
    switch (e.cmd) {
      case "syncOfflineMsgs":
        this.onOfflineMsgs(e);
        break;

      case "batchMarkRead":
        break;

      case "syncOfflineSysMsgs":
        this.onOfflineSysMsgs(e);
        break;

      case "syncRoamingMsgs":
        this.onRoamingMsgs(e);
        break;

      case "syncOfflineFilterMsgs":
        this.onOfflineMsgs(e, !0);
        break;

      case "syncOfflineFilterSysMsgs":
        this.onOfflineSysMsgs(e, !0);
        break;

      case "syncMsgReceipts":
        this.onOfflineMsgReceipts(e);
        break;

      case "syncDonnop":
        this.onDonnop(e, !0);
        break;

      case "syncSessionAck":
        this.syncSessionAck(e);
        break;

      case "syncRobots":
        this.onRobots(e);
        break;

      case "syncBroadcastMsgs":
        this.onBroadcastMsgs(e);
    }
  }, r.onDonnop = function (e, t) {
    if (!e.error) {
      var n = this,
          r = n.db,
          s = i.reverse(e.content.donnop);
      n.mergeDonnop(s);
      var o = n.dbDonnop();

      if (t) {
        var a = e.content.timetag;
        n.timetags.donnop = a, r.enable && (o = o.then(function () {
          return n.db.updateDonnopTimetag(a);
        }).catch(function (e) {
          return n.logger.error("notify::onDonnop: ", e), Promise.reject(e);
        })), o.cmd = "donnop", n.syncPromiseArray.push(o);
      } else n.onPushNotificationMultiportConfigUpdate();
    }
  }, r.onUpdateDonnop = function (e) {
    if (!e.error) {
      var t = e.obj;
      t && (this.mergeDonnop(s.filterObj(t, ["shouldPushNotificationWhenPCOnline"])), this.dbDonnop(), this.onPushNotificationMultiportConfigUpdate());
    }
  }, r.getPushNotificationMultiportConfig = function () {
    return s.merge({}, this.pushNotificationMultiportConfig);
  }, r.mergeDonnop = function (e) {
    this.pushNotificationMultiportConfig = s.merge({}, this.pushNotificationMultiportConfig, e);
  }, r.dbDonnop = function () {
    return this.db.enable ? this.db.setDonnop(this.pushNotificationMultiportConfig) : Promise.resolve();
  }, r.onPushNotificationMultiportConfigUpdate = function () {
    var e = this;
    setTimeout(function () {
      var t = e.getPushNotificationMultiportConfig();
      e.logger.info("link::onPushNotificationMultiportConfigUpdate:", t), e.options.onPushNotificationMultiportConfigUpdate(t);
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = s.objs2accounts,
      o = s.teams2ids,
      a = n(56),
      c = n(48);
  r.processTeam = function (e) {
    var t = e.error,
        n = void 0,
        r = void 0,
        s = void 0;

    switch (e.cmd) {
      case "createTeam":
        if (n = e.obj.team, t || (n = e.content.team), n = a.reverse(n), e.obj.team = n, s = c.assembleOwner(n), e.obj.owner = s, !t) {
          var i = {
            team: n,
            owner: s
          };
          this.logger.info("team::processTeam: create team", i), this.onCreateTeam(n, s);
        }

        break;

      case "syncCreateTeam":
        n = a.reverse(e.content.team), s = c.assembleOwner(n), this.logger.info("team::processTeam: sync createTeam", n, s), this.options.onsynccreateteam(n, s), this.onCreateTeam(n, s);
        break;

      case "sendTeamMsg":
        this.onSendMsg(e);
        break;

      case "teamMsg":
        this.onMsg(e);
        break;

      case "teamMsgs":
        this.onMsgs(e);
        break;

      case "addTeamMembers":
      case "removeTeamMembers":
      case "leaveTeam":
      case "dismissTeam":
      case "addTeamManagers":
      case "removeTeamManagers":
      case "transferTeam":
        break;

      case "updateInfoInTeam":
        t || ((r = e.obj).account = this.account, r.id = c.genId(r.teamId, r.account), r = c.reverse(r), e.obj = r, this.mergeMyTeamMembers(r), this.onUpdateTeamMember(r));
        break;

      case "updateNickInTeam":
        e.obj = c.reverse(e.obj);
        break;

      case "updateTeam":
        e.obj = a.reverse(e.obj, !0);
        break;

      case "applyTeam":
        e.error || (e.obj = a.reverse(e.content.team));
        break;

      case "passTeamApply":
        this.updateTeamSysMsgState(e, "passed");
        break;

      case "rejectTeamApply":
        this.updateTeamSysMsgState(e, "rejected");
        break;

      case "acceptTeamInvite":
        this.updateTeamSysMsgState(e, "passed"), e.error || (e.obj = a.reverse(e.content.team));
        break;

      case "rejectTeamInvite":
        this.updateTeamSysMsgState(e, "rejected");
        break;

      case "getTeam":
        e.error || (e.obj = a.reverse(e.content.team));
        break;

      case "getTeams":
        this.onTeams(e);
        break;

      case "getTeamMembers":
        this.onTeamMembers(e);
        break;

      case "syncTeams":
        this.onTeams(e);
        break;

      case "syncTeamMembers":
        this.onTeamMembers(e);
        break;

      case "getTeamHistoryMsgs":
      case "searchTeamHistoryMsgs":
        this.onHistoryMsgs(e);
        break;

      case "syncSendTeamMsg":
        this.onMsg(e);
        break;

      case "notifyTeamMsgReads":
        this.onTeamMsgReceipt(e);
        break;

      case "syncUpdateTeamMember":
        r = c.reverse(e.content.teamMember), this.onUpdateTeamMember(r), r.account === this.account && this.mergeMyTeamMembers(r);
        break;

      case "updateMuteStateInTeam":
        break;

      case "getMyTeamMembers":
        e.error || (e.obj = c.reverseMembers(e.content.teamMembers));
        break;

      case "getMutedTeamMembers":
        e.error || (e.obj = {
          teamId: e.obj.teamId,
          members: c.reverseMembers(e.content.teamMembers)
        });
        break;

      case "syncMyTeamMembers":
        this.onSyncMyTeamMembers(e);
    }
  }, r.onCreateTeam = function (e, t) {
    var n = this.db;
    n.enable && (n.putTeam(e), n.putTeamMembers(t)), this.options.onCreateTeam(e, t);
  }, r.onTeams = function (e) {
    e.content = e.content || {};
    var t,
        n = this,
        r = n.db,
        s = n.packetFromSync(e),
        i = e.content.teams || [],
        c = !0,
        u = [],
        l = [];
    if (e.error) switch (e.error.code) {
      case 803:
        e.error = null, c = !1;
    }
    var m = new Promise(function (m, p) {
      var f, g;
      e.error ? s && p(e.error) : (!function () {
        c && i.forEach(function (e) {
          (e = a.reverse(e)).validToCurrentUser ? u.push(e) : l.push(e);
        });
        n.logger.info("team::onTeams: parseData", o(u), u, "invalid", o(l), l), i.length ? (c = !0, t = e.content.timetag) : c = !1;
      }(), r.enable ? (f = m, g = p, e.promise = new Promise(function (e, i) {
        function o() {
          s ? (d(), e(), f()) : r.getTeams().then(function (t) {
            u = t, d(), e(), f();
          }).then(void 0, function (e) {
            e.message = "db.getTeams error", e.callFunc = "team::afterMergeData", i(e), g(e);
          });
        }

        c ? r.mergeTeams(u, l, t).then(function () {
          o();
        }).then(void 0, function (e) {
          var t = {
            callFunc: "team::onTeams:mergeData",
            message: "db.mergeTeams error",
            event: e
          };
          i(t), g(t);
        }) : (n.logger.warn("team::onTeams:mergeData: no teams need merge"), o());
      }).then(void 0, function (e) {
        throw e.message = "merge teams data error", e.callFunc = "team::mergeData", g(e), e;
      })) : (d(), m()));
    }).catch(function (e) {
      return n.logger.error("team::onTeams: ", e), Promise.reject(e);
    });

    function d() {
      n.timetags.teams = t, u.invalid = l, s ? (n.syncResult.teams = u, n.syncResult.invalidTeams = l) : (n.logger.info("team::onTeams: not in syncing, get teams", o(u), u), e.obj = u);
    }

    s && (m.cmd = "teams", n.syncPromiseArray.push(m));
  }, r.onTeamMembers = function (e) {
    e.content = e.content || {};
    var t,
        n,
        r = this,
        s = (r.db, r.packetFromSync(e)),
        o = e.content.members || [],
        a = !0,
        u = [],
        l = [];
    if (e.obj && (n = e.obj.teamId), n || (n = e.content.teamId), n = "" + n, e.error) switch (e.error.code) {
      case 406:
        e.error = null, a = !1;
    }
    var m = new Promise(function (m, d) {
      e.error ? s && (r.logger.error("team::onTeamMember: team error:", n, e.error), d({
        callFunc: "team::onTeamMembers",
        event: e.error,
        message: "teamId-" + n + " 获取群成员错误"
      })) : (!function () {
        a && o.forEach(function (e) {
          (e = c.reverse(e)).valid ? u.push(e) : l.push(e);
        });
        r.logger.warn("team::onTeamMembers: parseData", n, i(u), u, "invalid", i(l), l), o.length ? (a = !0, t = e.content.timetag) : a = !1;
      }(), u.invalid = l, s ? (r.syncTeamMembersResult[n] = u, r.syncTeamMembersResult[n + "-invalid"] = l, r.timetags["team-" + n] = t) : (r.logger.info("team::onTeamMembers: not syncing, get members", n, i(u), u), e.obj = {
        teamId: n,
        members: u
      }), m());
    });
    s && (m.cmd = n, r.syncTeamMembersPromiseArray.push(m));
  }, r.onUpdateTeamMember = function (e) {
    e.updateTime || (e.updateTime = +new Date()), this.logger.info("team::onUpdateTeamMember: ", e), this.options.onupdateteammember(s.simpleClone(e));
    var t = {
      teamId: e.teamId,
      memberUpdateTime: e.updateTime
    };
    this.onUpdateTeam(t);
    var n = this.db;
    n.enable && n.updateTeamMember(e);
  }, r.onUpdateTeam = function (e) {
    this.logger.info("team::onUpdateTeam:", e), this.options.onUpdateTeam(s.simpleClone(e));
    var t = this.db;
    t.enable && t.updateTeam(e);
  }, r.onSyncMyTeamMembers = function (e) {
    var t = this,
        n = t.db,
        r = c.reverseMembers(e.content.teamMembers);

    if (t.logger.info("team::onSyncMyTeamMembers:", r), n.enable) {
      var s = n.putTeamMembers(r).then(function () {
        return n.updateMyTeamMembersTimetag(e.content.timetag);
      }).catch(function (e) {
        return t.logger.error("team::syncMyTeamMember: ", e), Promise.reject(e);
      });
      s.cmd = "myTeamMembers", t.syncTeamMembersPromiseArray.push(s);
    }

    t.mergeMyTeamMembers(r);
  }, r.mergeMyTeamMembers = function (e) {
    s.isArray(e) || (e = [e]);
    var t = this.myTeamMembersMap = this.myTeamMembersMap || {};
    e.forEach(function (e) {
      var n = e.teamId;
      t[n] = s.merge(t[n], e);
    }), this.logger.info("team::mergeMyTeamMembers:", t);
  }, r.notifyForNewTeamMsg = function (e) {
    s.isArray(e) || (e = [e]);
    var t = this,
        n = this.myTeamMembersMap || {},
        r = {},
        i = [];
    e.forEach(function (e) {
      s.exist(n[e]) ? r[e] = n[e].muteNotiType : i.push(e);
    });
    var o = Promise.resolve(r);
    return i.length && (o = t.api.getMyTeamMembers({
      teamIds: i,
      promise: !0
    }).then(function (e) {
      return t.mergeMyTeamMembers(e), e.forEach(function (e) {
        r[e.teamId] = e.muteNotiType;
      }), r;
    })), o;
  }, r.updateTeamSysMsgState = function (e, t) {
    var n,
        r = e.error;
    r && (t = "error", r = s.filterObj(r, "code message")), n = {
      idServer: e.obj.idServer,
      state: t
    }, r && (n.error = r), this.updateSysMsg(n);
  }, r.onTeamMsgReceipt = function (e) {
    var t = e.content,
        n = e.error;
    n && this.logger.error("team::onTeamMsgReceipt:", n), t && t.teamMsgReceipts && this.options.onTeamMsgReceipt(t);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0);

  r.onRobots = function (e) {
    var t = e.content;

    if (s.isFunction(this.options.onrobots) && Array.isArray(t.robots)) {
      var n = t.robots.filter(function (e) {
        return !!e.botid;
      });
      n.length > 0 && this.options.onrobots(n || []);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = s.objs2accounts,
      o = n(138),
      a = n(73);
  r.processFriend = function (e) {
    var t = e.obj,
        n = e.content,
        r = e.error;

    switch (e.cmd) {
      case "friendRequest":
        this.updateFriendSysMsg(e), r || this.onFriendRequest(t);
        break;

      case "syncFriendRequest":
        this.onFriendRequest(n, !0);
        break;

      case "deleteFriend":
        r || this.onDeleteFriend(t);
        break;

      case "syncDeleteFriend":
        this.onDeleteFriend(n, !0);
        break;

      case "updateFriend":
        r || this.onUpdateFriend(t);
        break;

      case "syncUpdateFriend":
        this.onUpdateFriend(n.friend, !0);
        break;

      case "getFriends":
      case "syncFriends":
        this.onFriends(e);
        break;

      case "syncFriendUsers":
        this.onFriendUsers(e);
    }
  }, r.onFriends = function (e) {
    var t,
        n = this,
        r = n.db,
        s = e.error,
        a = n.packetFromSync(e),
        c = e.content.friends,
        u = !0,
        l = [],
        m = [],
        d = new Promise(function (d, f) {
      var g, h;
      s ? a && f(s) : (!function () {
        u && c.forEach(function (e) {
          (e = o.reverse(e)).valid ? l.push(e) : m.push(e);
        });
        n.logger.info("friend::onFriends: parse friends", i(l), l, "delete", i(m), m), c.length ? (u = !0, t = e.content.timetag) : u = !1;
      }(), r.enable ? (g = d, h = f, e.promise = new Promise(function (e, s) {
        function i() {
          a ? (p(), e(), g()) : r.getFriends().then(function (t) {
            l = t, p(), e(), g();
          }).then(void 0, function (e) {
            e._msg = "get friends error", s(e), h(e);
          });
        }

        u ? r.mergeFriends(l, m, t).then(function () {
          i();
        }).then(void 0, function (e) {
          e._msg = "merge friends error", s(e), h(e);
        }) : (n.logger.info("friend::onFriends: no merge friends"), i());
      }).then(void 0, function (e) {
        throw e._msg = "merge friends data error", h(e), e;
      })) : (p(), d()));
    }).catch(function (e) {
      return n.logger.error("friend::onFriends: ", e), Promise.reject(e);
    });

    function p() {
      n.timetags.friends = t, l.invalid = m, a ? (n.syncResult.friends = l, n.syncResult.invalidFriends = m) : (n.logger.info("friend::onFriends: get friends bingo", i(l), l), e.obj = l);
    }

    a && (d.cmd = "friends", n.syncPromiseArray.push(d));
  }, r.onFriendRequest = function (e, t) {
    var n = Promise.resolve(),
        r = this.db,
        s = e.type;

    if ("addFriend" === (s = e.type = o.getTypeFromByte(s) || s) || "passFriendApply" === s) {
      var i = e.friend = o.assembleFriend(e.account);
      r.enable && (n = r.putFriend(i));
    }

    return t && this.onSyncFriendAction(e), n;
  }, r.onSyncFriendAction = function (e) {
    this.logger.info("friend::onSyncFriendActionon:", e), this.options.onsyncfriendaction(e);
  }, r.onDeleteFriend = function (e, t) {
    var n = Promise.resolve(),
        r = this.db;
    return r.enable && (n = r.deleteFriend(e.account)), t && (e.type = "deleteFriend", this.onSyncFriendAction(e)), n;
  }, r.onUpdateFriend = function (e, t) {
    var n = this.db,
        r = o.reverse(e);
    n.enable && n.updateFriend(r), t && this.onSyncFriendAction({
      type: "updateFriend",
      friend: r
    });
  }, r.onFriendUsers = function (e) {
    var t = this.db,
        n = e.content,
        r = n.users.map(function (e) {
      return a.reverse(e);
    });
    this.logger.warn("friend::onFriendUsers: parse users", i(r), r);
    var s = n.timetag,
        o = Promise.resolve();
    t.enable && (o = t.mergeFriendUsers(r, s)), this.timetags.friendUsers = s, o.cmd = "friendUsers", this.syncPromiseArray.push(o), this.syncResult.users = r;
  }, r.updateFriendSysMsg = function (e) {
    var t,
        n,
        r = e.obj,
        i = e.error;

    if (e.obj.idServer) {
      if (i) t = "error", i = s.filterObj(i, "code message");else {
        var a = r.type;

        switch (a = o.getTypeFromByte(a) || a) {
          case "passFriendApply":
            t = "passed";
            break;

          case "rejectFriendApply":
            t = "rejected";
        }
      }
      n = {
        idServer: r.idServer,
        state: t
      }, i && (n.error = i), this.updateSysMsg(n);
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(0);

  function s() {}

  s.parse = function (e) {
    var t = r.copy(e);
    return t.isBlacked = "1" === t.isBlacked, t.isMuted = "1" === t.isMuted, t.createTime = +t.createTime, t.updateTime = +t.updateTime, t;
  }, e.exports = s;
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(0),
      i = s.objs2accounts,
      o = n(238),
      a = n(73);
  r.processUser = function (e) {
    var t,
        n = this,
        r = n.db,
        s = e.obj,
        i = e.error,
        o = e.content;

    switch (e.cmd) {
      case "markInBlacklist":
        i || n.markInBlacklist(s);
        break;

      case "syncMarkInBlacklist":
        n.markInBlacklist(o, !0);
        break;

      case "markInMutelist":
        i || n.markInMutelist(s);
        break;

      case "syncMarkInMutelist":
        n.markInMutelist(o, !0);
        break;

      case "getRelations":
        i || n.onRelations(e);
        break;

      case "syncMyInfo":
        n.onMyInfo(e, !0);
        break;

      case "updateMyInfo":
        i || (s.updateTime = o.timetag, n.onUpdateMyInfo(e, s));
        break;

      case "syncUpdateMyInfo":
        n.onUpdateMyInfo(e, o.user, !0);
        break;

      case "getUsers":
        i || (t = o.users.map(function (e) {
          return e = a.reverse(e), n.mergeUser(e), e;
        }), e.obj = t, r.enable && r.putUsers(t));
        break;

      case "updateDonnop":
        n.onUpdateDonnop(e);
        break;

      case "syncUpdateDonnop":
        n.onDonnop(e, !1);
    }
  }, r.onMyInfo = function (e) {
    var t = this,
        n = t.db,
        r = e.error,
        s = e.content,
        i = !0,
        o = void 0,
        c = new Promise(function (e, c) {
      var l, m;
      r ? i && (r && (r.callFunc = "user::onMyInfo"), e(r), t.syncData()) : (o = a.reverse(s.user), t.logger.info("user::onMyInfo: parseData", o), n.enable ? (l = e, m = c, n.mergeMyInfo(o, i).then(function () {
        u(), l();
      }).then(void 0, function (e) {
        e.message = "db.mergeMyInfo error", e.callFunc = "user::onMyInfo", m(e);
      })) : (u(), e()));
    }).catch(function (e) {
      return t.logger.error("user::onMyInfo: ", e), Promise.reject(e);
    });

    function u() {
      t.timetags.myInfo = o.updateTime, i && (t.syncResult.myInfo = o);
    }

    i && (c.cmd = "myInfo", t.syncPromiseArray.push(c));
  }, r.onUpdateMyInfo = function (e, t, n) {
    var r = this.db,
        i = a.reverse(t),
        o = s.merge(this.myInfo, i);
    this.myInfo = o, n ? (this.logger.info("user::onUpdateMyInfo:", o), this.options.onupdatemyinfo(o)) : e.obj = o, r.enable && (i.account = this.account, r.updateUser(i));
  }, r.onRelations = function (e) {
    var t = this,
        n = t.db,
        r = e.error,
        s = t.packetFromSync(e),
        a = e.content.specialRelations,
        c = !0,
        u = void 0,
        l = [],
        m = [],
        d = [],
        p = [],
        f = new Promise(function (f, h) {
      var y, v;
      r ? s && (f(r), t.syncData()) : (a.forEach(function (e) {
        var t = {
          account: (e = o.parse(e)).account,
          createTime: e.createTime,
          updateTime: e.updateTime
        };
        e.isBlacked ? l.push(t) : m.push(t), e.isMuted ? d.push(t) : p.push(t);
      }), t.logger.info("user::onRelations: parse blacklist", i(l), l, "delete", i(m), m), t.logger.info("user::onRelations: parse mutelist", i(d), d, "delete", i(p), p), a.length ? (c = !0, u = e.content.timetag) : c = !1, n.enable ? (y = f, v = h, e.promise = new Promise(function (e, r) {
        function i() {
          s ? (g(), e(), y()) : n.getRelations().then(function (t) {
            l = t[0], d = t[1], g(), e(), y();
          }).then(void 0, function (e) {
            e.message = "db.getRelations error", e.callFunc = "user::onRelations", r(e), v(e);
          });
        }

        c ? n.mergeRelations(l, m, d, p, u).then(function () {
          i();
        }).then(void 0, function (e) {
          e.message = "db.mergeRelations error", e.callFunc = "user::onRelations", r(e), v(e);
        }) : (t.logger.warn("user::onRelations: no relations need merge"), i());
      }).then(void 0, function (e) {
        throw e.message = "merge relations data error", e.callFunc = "user::onRelations", v(e), e;
      })) : (g(), f()));
    }).catch(function (e) {
      return t.logger.error("user::onRelations: ", e), Promise.reject(e);
    });

    function g() {
      t.timetags.relations = u, l.invalid = m, d.invalid = p, s ? (t.syncResult.blacklist = l, t.syncResult.mutelist = d, t.syncResult.invalidBlacklist = m, t.syncResult.invalidMutelist = p) : (t.logger.info("user::onRelations: get relations", l, d), e.obj.blacklist = l, e.obj.mutelist = d);
    }

    s && (f.cmd = "relations", t.syncPromiseArray.push(f));
  }, r.markInBlacklist = function (e, t) {
    var n = this.db;
    e.record = {
      account: e.account,
      updateTime: +new Date()
    }, n.enable && n.markInBlacklist(e), t && (this.logger.info("user::markInBlacklist:", e), this.options.onsyncmarkinblacklist(e));
  }, r.markInMutelist = function (e, t) {
    var n = this.db;
    e.record = {
      account: e.account,
      updateTime: +new Date()
    }, n.enable && n.markInMutelist(e), t && (this.logger.info("user::markInMutelist:", e), this.options.onsyncmarkinmutelist(e));
  }, r.mergeUser = function (e) {
    this.userSet[e.account] = e;
  };
}, function (e, t, n) {
  var r = n(5)("iterator"),
      s = !1;

  try {
    var i = [7][r]();
    i.return = function () {
      s = !0;
    }, Array.from(i, function () {
      throw 2;
    });
  } catch (e) {}

  e.exports = function (e, t) {
    if (!t && !s) return !1;
    var n = !1;

    try {
      var i = [7],
          o = i[r]();
      o.next = function () {
        return {
          done: n = !0
        };
      }, i[r] = function () {
        return o;
      }, e(i);
    } catch (e) {}

    return n;
  };
}, function (e, t, n) {
  var r = n(49),
      s = n(5)("toStringTag"),
      i = "Arguments" == r(function () {
    return arguments;
  }());

  e.exports = function (e) {
    var t, n, o;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
      try {
        return e[t];
      } catch (e) {}
    }(t = Object(e), s)) ? n : i ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ? "Arguments" : o;
  };
}, function (e, t, n) {
  var r = n(241),
      s = n(5)("iterator"),
      i = n(28);

  e.exports = n(11).getIteratorMethod = function (e) {
    if (null != e) return e[s] || e["@@iterator"] || i[r(e)];
  };
}, function (e, t, n) {
  "use strict";

  var r = n(8),
      s = n(25);

  e.exports = function (e, t, n) {
    t in e ? r.f(e, t, s(0, n)) : e[t] = n;
  };
}, function (e, t, n) {
  var r = n(28),
      s = n(5)("iterator"),
      i = Array.prototype;

  e.exports = function (e) {
    return void 0 !== e && (r.Array === e || i[s] === e);
  };
}, function (e, t, n) {
  var r = n(22);

  e.exports = function (e, t, n, s) {
    try {
      return s ? t(r(n)[0], n[1]) : t(n);
    } catch (t) {
      var i = e.return;
      throw void 0 !== i && r(i.call(e)), t;
    }
  };
}, function (e, t, n) {
  "use strict";

  var r = n(69),
      s = n(23),
      i = n(50),
      o = n(245),
      a = n(244),
      c = n(74),
      u = n(243),
      l = n(242);
  s(s.S + s.F * !n(240)(function (e) {
    Array.from(e);
  }), "Array", {
    from: function from(e) {
      var t,
          n,
          s,
          m,
          d = i(e),
          p = "function" == typeof this ? this : Array,
          f = arguments.length,
          g = f > 1 ? arguments[1] : void 0,
          h = void 0 !== g,
          y = 0,
          v = l(d);
      if (h && (g = r(g, f > 2 ? arguments[2] : void 0, 2)), null == v || p == Array && a(v)) for (n = new p(t = c(d.length)); t > y; y++) {
        u(n, y, h ? g(d[y], y) : d[y]);
      } else for (m = v.call(d), n = new p(); !(s = m.next()).done; y++) {
        u(n, y, h ? o(m, g, [s.value, y], !0) : s.value);
      }
      return n.length = y, n;
    }
  });
}, function (e, t, n) {
  n(75), n(246), e.exports = n(11).Array.from;
}, function (e, t, n) {
  e.exports = {
    default: n(247),
    __esModule: !0
  };
}, function (e, t, n) {
  "use strict";

  t.__esModule = !0;
  var r,
      s = n(248),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };

  t.default = function (e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) {
        n[t] = e[t];
      }

      return n;
    }

    return (0, i.default)(e);
  };
}, function (e, t, n) {
  "use strict";

  var r,
      s = n(249),
      i = (r = s) && r.__esModule ? r : {
    default: r
  };
  var o = n(3).fn,
      a = n(0),
      c = n(4),
      u = a.undef,
      l = a.objs2ids,
      m = a.objs2accounts,
      d = a.teams2ids,
      p = n(53),
      f = a.getGlobal();
  o.beforeSync = function () {
    var e = this.db;
    return e.enable ? e.clearSendingMsgs() : Promise.resolve();
  }, o.syncData = function () {
    var e = this,
        t = e.db,
        n = e.options,
        r = t.enable;

    function s(t) {
      e.syncPromiseArray = [], e.syncResult = {}, e.syncTeamMembersPromiseArray = [], e.syncTeamMembersResult = {}, a.verifyBooleanWithDefault(n, "syncRelations syncFriends syncFriendUsers syncTeams syncRoamingMsgs syncMsgReceipts syncExtraTeamInfo", !0, "", "sync::syncData"), a.verifyBooleanWithDefault(n, "syncFilter syncTeamMembers", !1, "", "sync::syncData");
      var r = {};
      t = t || {}, f._nimForceSyncIM && (e.logger.warn("sync::syncData: nimForceSyncIM"), delete t.teams, f._nimForceSyncIM = !1), r.myInfo = t.myInfo || 0, r.offlineMsgs = 0, n.syncRelations && (r.relations = t.relations || 0), n.syncFriends && (r.friends = t.friends || 0), n.syncFriendUsers && (r.friendUsers = t.friendUsers || 0), n.syncRobots && (r.robots = t.robots || 0), n.syncTeams && (r.teams = t.teams || 0), n.syncRoamingMsgs && (r.roamingMsgs = t.roamingMsgs || 0), n.syncMsgReceipts && (r.msgReceipts = t.msgReceipts || 0), n.syncExtraTeamInfo && (r.myTeamMembers = t.myTeamMembers || 0), n.syncSessionUnread && (r.sessionAck = t.sessionAck || 0), n.syncBroadcastMsgs && (r.broadcastMsgs = t.broadcastMsg || 0), r.donnop = t.donnop || 0, r.deleteMsg = t.deleteMsg || 0, n.syncFilter && (r.filterMsgs = 0);
      var s = e.onSyncData.bind(e);
      s.isImSyncDataCb = !0, e.sendCmd("sync", {
        sync: r
      }, s);
    }

    e.notifyLogin(), e.syncing = !0, r ? e.beforeSync().then(function () {
      return e.db.getTimetags();
    }).then(function (e) {
      s(e);
    }, function () {
      s();
    }) : s(e.timetags);
  }, o.onSyncData = function (e, t) {
    e && this.syncRetryTimes > 3 && (this.syncRetryTimes = 0, e.callFunc = "sync::onSyncData", this.onCustomError("SYNC_DATA_ERROR", e));
  }, o.processSync = function (e) {
    switch (this.syncRetryTimes = this.syncRetryTimes || 0, this.syncRetryTimes++, e.cmd) {
      case "syncDone":
        e.error ? this.syncRetryTimes > 3 || this.syncData() : (this.timetags.sync = e.content.timetag, this.onSyncDone());
        break;

      case "syncTeamMembersDone":
        this.onSyncTeamMembersDone();
    }
  }, o.onSyncDone = function (e) {
    var t,
        n,
        r,
        s,
        o,
        f,
        g,
        h,
        y,
        v,
        b,
        M,
        T,
        S,
        k,
        C,
        P,
        I,
        w,
        O,
        A,
        _,
        x = this,
        E = x.db,
        R = E.enable,
        j = x.options,
        F = x.syncPromiseArray,
        N = x.syncResult;

    if (F && F.length) {
      var U = F.filter(function (e) {
        return "sessionAck" === e.cmd;
      });
      0 === U.length && U.push(Promise.resolve());
      var D = F.filter(function (e) {
        return "sessionAck" !== e.cmd;
      });
      0 === D.length && D.push(Promise.resolve()), Promise.all(D).then(function () {
        return Promise.all(U);
      }, function (e) {
        e.callFunc = "sync::onSyncDone", e.message = "afterSync syncNormalPromise 出错", x.onCustomError("SYNC_NORMAL_ERROR", e);
      }).then(L, function (e) {
        e.callFunc = "sync::onSyncDone", e.message = "afterSync syncSessionAckPromise 出错", x.onCustomError("SYNC_SESSION_ACK_ERROR", e);
      }).catch(function (e) {
        x.syncData();
      });
    } else L();

    function L() {
      if (F) {
        if (x.logger.info("sync::onSyncDone: after sync", a.promises2cmds(F)), F = [], n = N.blacklist || [], r = N.invalidBlacklist || [], s = N.mutelist || [], o = N.invalidMutelist || [], f = N.friends, g = N.invalidFriends || [], h = N.myInfo, y = N.users, v = N.teams, b = N.invalidTeams || [], M = N.sessions, T = N.msgReceipts, S = N.roamingMsgs, k = N.offlineMsgs, C = N.offlineFilterMsgs, I = N.offlineSysMsgs, w = N.offlineCustomSysMsgs, O = N.offlineFilterSysMsgs, A = N.offlineFilterCustomSysMsgs, N.broadcastMsgs, _ = N.sysMsgUnread, M) {
          var e = [];
          Object.keys(M).forEach(function (t) {
            e.push(M[t]);
          }), M = e.sort(function (e, t) {
            return t.updateTime - e.updateTime;
          });
        }

        var c = Promise.resolve();
        R && (c = function () {
          var e,
              t = [],
              n = [];
          S && S.forEach(function (e) {
            n = [].concat((0, i.default)(n), (0, i.default)(e.msgs));
          });
          k && k.forEach(function (e) {
            n = [].concat((0, i.default)(n), (0, i.default)(e.msgs));
          });
          return e = E.putMsg(n), t.push(e), Promise.all(t).then(function () {
            return n;
          });
        }().then(function (e) {
          var t = {};
          e.forEach(function (e) {
            var n = e.sessionId;
            t[n] || (t[n] = !0, x.markUnreadByMsgsPromise(n));
          });
        })), c.then(function () {
          R && !x.hasSynced && (x.hasSynced = !0, function () {
            j.syncRelations && (t = E.getRelations().then(function (e) {
              n = e[0], s = e[1], n.invalid = r, s.invalid = o;
            }, function (e) {
              return e._msg = "on relations error", e;
            }).catch(function (e) {
              return x.logger.error("sync::syncRelation: ", e), Promise.reject(e);
            }), F.push(t));
            j.syncFriends && (t = E.getFriends().then(function (e) {
              (f = e).invalid = g;
            }, function (e) {
              return e._msg = "on friends error", e;
            }).catch(function (e) {
              return x.logger.error("sync::syncFriends: ", e), Promise.reject(e);
            }), F.push(t));
            u(h) && (t = E.getUser(x.account).then(function (e) {
              h = e;
            }, function (e) {
              return e._msg = "on myInfo error", e;
            }).catch(function (e) {
              return x.logger.error("sync::syncMyInfo: ", e), Promise.reject(e);
            }), F.push(t));
            j.syncFriendUsers && (t = E.getFriends().then(function (e) {
              return e.map(function (e) {
                return e.account;
              });
            }).then(function (e) {
              return E.getUsers(e);
            }).then(function (e) {
              y = e;
            }, function (e) {
              return e._msg = "on users error", e;
            }).catch(function (e) {
              return x.logger.error("sync::syncFriendUser: ", e), Promise.reject(e);
            }), F.push(t));
            j.syncTeams && (t = E.getTeams().then(function (e) {
              (v = e).invalid = b;
            }, function (e) {
              return e._msg = "on teams error", e;
            }).catch(function (e) {
              return x.logger.error("sync::syncTeams: ", e), Promise.reject(e);
            }), F.push(t));
            t = E.getTeamMembersByAccount(x.account).then(function (e) {
              x.mergeMyTeamMembers(e);
            }).catch(function (e) {
              return x.logger.error("sync::getTeamMembersByAccount: ", e), Promise.reject(e);
            }), F.push(t), t = E.getDonnop().then(function (e) {
              x.mergeDonnop(e);
            }).catch(function (e) {
              return x.logger.error("sync::donnop: ", e), Promise.reject(e);
            }), F.push(t), t = E.getSessions().then(function (e) {
              M = e;
            }, function (e) {
              return e._msg = "on sessions error", e;
            }).catch(function (e) {
              return x.logger.error("sync::getSession: ", e), Promise.reject(e);
            }), F.push(t), t = E.getSysMsgUnread().then(function (e) {
              _ = e;
            }, function (e) {
              return e._msg = "on sysMsgUnread error", e;
            }).catch(function (e) {
              return x.logger.error("sync::getSysMsgUnread: ", e), Promise.reject(e);
            }), F.push(t);
          }());
          var e = F.filter(function (e) {
            return "sessionAck" === e.cmd;
          });
          0 === e.length && e.push(Promise.resolve());
          var i = F.filter(function (e) {
            return "sessionAck" !== e.cmd;
          });
          0 === i.length && i.push(Promise.resolve()), Promise.all(i).then(function () {
            return Promise.all(e);
          }).then(B).then(q, function (e) {
            e.callFunc = "sync::onSyncDone", e.message = "taskAfterSync syncSessionAckPromise 出错", x.onCustomError("SYNC_SESSION_ACK_ERROR", e);
          });
        });
      } else x.logger.warn("sync::onSyncDone: after sync --no promiseArray");
    }

    function B() {
      x.logger.info("sync::onSyncDone: taskAfterSync"), function () {
        if (N.deleteMsgSysMsgs) {
          var e = {};
          S && S.forEach(function (t) {
            e[t.sessionId] = t;
          });
          var t = {};
          k && k.forEach(function (e) {
            t[e.sessionId] = e;
          });
          var n = x.api;
          N.deleteMsgSysMsgs.forEach(function (r) {
            r.sysMsgs.forEach(function (r) {
              var s = r.msg,
                  i = s.sessionId;
              [e, t].forEach(function (e) {
                e[i] && (e[i].msgs = n.cutMsgs(e[i].msgs, s));
              });
            });
          }), E.enable || [S, k].forEach(function (e) {
            e && e.forEach(function (e) {
              if (e.msgs.length) {
                var t = x.genSessionByMsgs(e.msgs);
                x.cacheSyncedSession(t), M = n.mergeSessions(M, t);
              } else M = n.cutSessions(M, {
                id: e.sessionId
              });
            });
          });
        }
      }();
      var e = [];
      return e.push(x.deleteMsgOfflineRoaming(N.deleteMsgSysMsgs, M)), Promise.all(e);
    }

    function q() {
      setTimeout(H, 0);
    }

    function H() {
      var e,
          t,
          r = [];
      n && (x.logger.info("sync::notifyDataAsync: on blacklist", m(n), n), j.onblacklist(n)), s && (x.logger.info("sync::notifyDataAsync: on mutelist", m(s), s), j.onmutelist(s)), f && (x.logger.info("sync::notifyDataAsync: on friends", m(f), f), j.onfriends(f)), h && (x.logger.info("sync::notifyDataAsync: on myInfo", h), x.myInfo = h, j.onmyinfo(a.copy(h))), y && (y.forEach(function (e) {
        x.mergeUser(e);
      }), x.logger.info("sync::notifyDataAsync: on users", m(y), y), j.onusers(y)), v && (x.logger.info("sync::notifyDataAsync: on teams", d(v), v), j.onteams(v)), T && (!x.hasSynced && M && M.length || x.hasSynced) && (M = x.mergeSessionAndMsgReceipts(M, T)), M && M.length && (M.forEach(function (e) {
        x.syncResult.sessions && x.syncResult.sessions[e.id] && "number" == typeof x.syncResult.sessions[e.id].unread && (e.unread = x.syncResult.sessions[e.id].unread), x.mergeSession(e), p.trim(e);
      }), x.logger.info("sync::notifyDataAsync: on sessions", l(M), M), j.onsessions(M)), S && S.forEach(function (e) {
        r.push(e.timetag), (t = e.msgs).length && (x.logger.info("sync::notifyDataAsync: on roaming msgs", e.sessionId, t.length, t), j.onroamingmsgs(e));
      }), k && k.forEach(function (e) {
        r.push(e.timetag), (t = e.msgs).length && (x.logger.info("sync::notifyDataAsync: on offline msgs", e.sessionId, t.length, t), j.onofflinemsgs(e));
      }), C && C.forEach(function (e) {
        r.push(e.timetag), (t = e.msgs).length && (x.logger.info("sync::notifyDataAsync: on offline filter msgs", e.sessionId, t.length, t), j.onofflinefiltermsgs(t));
      });
      var i = [],
          o = [];
      N.deleteMsgSysMsgs && N.deleteMsgSysMsgs.forEach(function (e) {
        "roaming" === e.type ? i = i.concat(e.sysMsgs) : o = o.concat(e.sysMsgs);
      }), i.length && (P = (P = P || []).concat(i)), o.length && (I = (I = I || []).concat(o)), P && (x.logger.info("sync::notifyDataAsync: on roaming sys msgs", P.length, P), j.onroamingsysmsgs(P)), I && (x.logger.info("sync::notifyDataAsync: on offline sys msgs", I.length, I), j.onofflinesysmsgs(I)), O && (x.logger.info("sync::notifyDataAsync: on offline filter sys msgs", O.length, O), j.onofflinefiltersysmsgs(O)), w && (x.logger.info("sync::notifyDataAsync: on offline custom sys msgs", w.length, w), j.onofflinecustomsysmsgs(w)), A && (x.logger.info("sync::notifyDataAsync: on offline filter custom sys msgs", A.length, A), j.onofflinefiltercustomsysmsgs(A)), _ && (_ = a.merge({}, x.sysMsgUnread, _), x.sysMsgUnread = a.merge({}, _), x.logger.info("sync::notifyDataAsync: on sysMsgUnread", _), j.onsysmsgunread(_));
      var c = x.getPushNotificationMultiportConfig();
      x.logger.info("sync::notifyDataAsync: on pushNotificationMultiportConfig", c), j.onPushNotificationMultiportConfig(c), r.length ? (e = Math.max.apply(Math, r), x.updateRoamingMsgTimetag(e).then(W, W)) : W(), x.syncPromiseArray = null, x.syncResult = null;
    }

    function W() {
      if (x.processUnsettledMsgs(), x.processUnsettledSysMsgs(), x.syncing = !1, j.onsyncdone(), j.syncTeamMembers && v && v.length) throw new c("sync team members api deprecated!");
    }
  }, o.syncTeamMembers = function (e) {
    var t,
        n,
        r = this;
    t = r.timetags, n = {}, t = t || {}, e.forEach(function (e) {
      n[e.teamId] = 0;
    }, r), r.sendCmd("syncTeamMembers", {
      sync: n
    }, r.onSyncTeamMembers.bind(r));
  }, o.onSyncTeamMembers = function (e, t) {
    e.callFunc = "sync::onSyncTeamMembers", e.message = "同步群成员错误", this.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e);
  }, o.onSyncTeamMembersDone = function () {
    var e,
        t = this,
        n = t.db,
        r = t.options,
        s = t.syncTeamMembersResult,
        i = t.syncTeamMembersPromiseArray;

    function o() {
      t.logger.log("sync::onSyncTeamMembersDone: afterSync", a.promises2cmds(i)), i = [], n.enable && !t.hasSyncedTeamMembers ? (t.hasSyncedTeamMembers = !0, function () {
        if (!r.syncTeams || !r.syncTeamMembers) return l();
        n.getTeams().then(function (n) {
          n.forEach(function (n) {
            var r = n.teamId;
            e = new Promise(function (e, n) {
              t.api.getTeamMembers({
                teamId: r,
                done: function done(t, i) {
                  t && n({
                    callFunc: "sync::getTeamMembers: teamId-" + r,
                    message: "sync team members error"
                  }), s[r] = i.members || [], e();
                }
              });
            }), i.push(e);
          }), i.length ? Promise.all(i).then(c, function (e) {
            e.callFunc = "sync::onSyncTeamMembersDone", e.message = "pullFullData promiseArray notifyData 错误", t.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e);
          }) : c();
        }, function (e) {
          e.callFunc = "sync::onSyncTeamMembersDone", e.message = "pullFullData getTeams 错误", t.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e);
        });
      }()) : c();
    }

    function c() {
      setTimeout(u, 0);
    }

    function u() {
      var e, n;
      Object.keys(s).forEach(function (i) {
        -1 === i.indexOf("invalid") && (e = s[i], n = s[i + "-invalid"] || [], e.invalid = n, function (e, n) {
          t.logger.info("sync::onSyncTeamMembersDone: onTeamMembers", e, m(n), n), r.onteammembers({
            teamId: e,
            members: n
          });
        }(i, e));
      }), l();
    }

    function l() {
      t.logger.info("sync::onSyncTeamMembersDone: bingo"), r.onsyncteammembersdone(), t.syncTeamMembersResult = null, t.syncTeamMembersPromiseArray = null;
    }

    i.length ? Promise.all(i).then(o, function (e) {
      e.callFunc = "sync::onSyncTeamMembersDone", e.message = "同步群成员 syncTeamMembersPromiseArray 错误", t.onCustomError("SYNC_TEAM_MEMBERS_ERROR", e);
    }).catch(function (e) {
      t.logger.log("sync::onSyncTeamMembersDone: syncTeamMembersPromiseArray promise ", e), o();
    }) : o();
  };
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(55);
  r.assembleLogin = function () {
    var e = this.assembleIMLogin();
    return this.addPushInfo instanceof Function ? this.addPushInfo(e) : Promise.resolve({
      login: e
    });
  }, r.afterLogin = function () {
    var e = this;
    this.initPush instanceof Function && this.initPush();
    var t = this.db;

    if (t.enable) {
      var n = this.account;
      this.options.appendAppKeyForDBName && (n += "-" + this.options.appKey), this.db.init(n).then(function () {
        e.syncData();
      }, function (n) {
        e.logger.warn("link::afterLogin: no db", n), t.reset(!1), e.syncData();
      });
    } else this.logger.info("link::afterLogin: no db"), this.syncData();
  }, r.processAuth = function (e) {
    switch (e.cmd) {
      case "login":
        e.error || (e.content = e.content || {}, this.loginAndroidPush && this.loginAndroidPush(e.content.aosPushInfo || {}), e.obj = e.content.loginRes, this.connectionId = e.content.loginRes.connectionId, this.onLoginPortsChange(e, 2));
        break;

      case "kicked":
        return void this.onKicked(e);

      case "multiPortLogin":
        this.onLoginPortsChange(e, e.content.state);
        break;

      case "kick":
        e.error || (e.obj.deviceIds = e.content.deviceIds);
    }
  }, r.onLoginPortsChange = function (e, t) {
    var n = this,
        r = e.content.loginPorts;

    if (r && r.length) {
      var i = !0;

      switch (t) {
        case 2:
          i = !0;
          break;

        case 3:
          i = !1;
      }

      r.forEach(function (e) {
        e.type = s.reverseType(e.type), e.time = +e.time, e.online = i;
      }), (r = r.filter(function (e) {
        return e.connectionId !== n.connectionId;
      })).length && (n.logger.info("link::onLoginPortsChange:", r), n.options.onloginportschange(r));
    }
  }, r.kickedReasons = ["", "samePlatformKick", "serverKick", "otherPlatformKick", "silentlyKick"], r.kickedMessages = ["", "不允许同一个帐号在多个地方同时登录", "被服务器踢了", "被其它端踢了", "悄悄被踢"];
}, function (e, t, n) {
  "use strict";

  var r = n(3).fn,
      s = n(1),
      i = n(0),
      o = n(26);

  r.refreshSocketUrl = function () {
    var e = this,
        t = e.options,
        n = s.info,
        r = t.lbsUrl;

    function a(t) {
      e.socketUrls = [], (t = s.isWeixinApp ? t.data : JSON.parse(t)).common.link.forEach(function (t) {
        e.socketUrls.push(s.formatSocketUrl({
          url: t,
          secure: e.options.secure
        }));
      }), t.common["link.default"].forEach(function (t) {
        t = s.formatSocketUrl({
          url: t,
          secure: e.options.secure
        }), -1 === e.socketUrls.indexOf(t) && e.socketUrls.push(t);
      });

      try {
        s.uploadUrl = t.nosup[0];
      } catch (e) {}

      e.logger.info("link::refreshSocketUrl: ajax load, got socket urls ", e.socketUrls), e.connectToUrl(e.getNextSocketUrl());
    }

    function c(t) {
      e.logger.error("link::refreshSocketUrl: ajax lbs error", t), e.api.reportLogs({
        event: "nimlb",
        code: 3001
      }), e.onDisconnect(!1, "link::refreshSocketUrl");
    }

    r = r + i.genUrlSep(r) + "k=" + t.appKey + "&id=" + t.account + "&sv=" + n.sdkVersion + "&pv=" + n.protocolVersion, e.logger.info("link::refreshSocketUrl: ajax " + r), s.isWeixinApp ? (r = r.replace(/:\d+/, ""), wx.request({
      url: r,
      success: a,
      fail: c
    })) : o(r, {
      proxyUrl: i.url2origin(r) + "/lbs/res/cors/nej_proxy_frame.html",
      timeout: s.xhrTimeout,
      onload: a,
      onerror: c
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0),
      i = s.notundef;
  r.putSession = function (e) {
    return void 0 === (e = s.merge({}, e)).updateTime && e.lastMsg && e.lastMsg.time && (e.updateTime = e.lastMsg.time), delete e.unread, this.modifyOrPut({
      table: "session",
      obj: e,
      key: "id",
      modifyObjWhenPut: {
        unread: 0
      }
    });
  }, r.getSessions = function (e) {
    var t,
        n = !(e = e || {}).reverse,
        r = e.limit || 100,
        s = e.lastSessionId,
        o = e.sessionId,
        a = !1;
    if (i(s)) t = function t(e) {
      return !!a || (e.id === s && (a = !0), !1);
    };else if (i(o)) return this.get("session", o);
    return this.getAll("session", {
      index: "updateTime",
      desc: n,
      limit: r,
      filter: t
    });
  }, r.getSession = function (e) {
    return this.get("session", e);
  }, r.updateSession = function (e) {
    var t = this,
        n = e.id,
        r = s.filterObj(e, "ack unread lastMsg localCustom msgReceiptTime msgReceiptServerTime");
    return Object.keys(e).forEach(function (t) {
      0 === t.indexOf("last") && (r[t] = e[t]);
    }), this.getOne("session", null, n, {
      modifyObj: r
    }).then(function (e) {
      return e ? t.logger.log("db::updateSession: " + n, r) : t.logger.warn("db::updateSession: no record " + n), e;
    });
  }, r.resetSessionUnread = function (e) {
    return this.updateSession({
      id: e,
      unread: 0
    });
  }, r.deleteSession = function (e) {
    return this.remove("session", e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0);
  s.notundef;
  r.putBroadcastMsg = function (e) {
    var t = this;
    return new Promise(function (n) {
      s.isArray(e) || (e = [e]);
      var r = [],
          i = e.length;

      function o() {
        0 === --i && n(r);
      }

      e.forEach(function (e) {
        e = s.copy(e), t.put("broadcastMsg", e).then(function (e) {
          r.push(e[0]), o();
        }, o);
      });
    });
  }, r.getBroadcastMsgs = function (e) {
    return e = e || {}, this.getAll("broadcastMsg", e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0),
      i = s.notundef;
  r.putSysMsg = function (e) {
    var t = this;
    return new Promise(function (n) {
      if (s.isArray(e) || (e = [e]), !e[0].filter) {
        var r = [],
            i = e.length;
        e.forEach(function (e) {
          e = s.copy(e), t.put("sysMsg", e).then(function (e) {
            r.push(e[0]), o();
          }, o);
        });
      }

      function o() {
        0 === --i && n(r);
      }
    });
  }, r.getSysMsgs = function (e) {
    var t = !(e = e || {}).reverse,
        n = e.limit || 100,
        r = null,
        s = null;
    e.category && (r = "category", s = e.category), e.type && (r = "type", s = e.type);
    var o,
        a = e.lastIdServer,
        c = !1,
        u = e.read;
    return (i(a) || i(u)) && (o = function o(e) {
      return i(a) ? (a = "" + a, c ? t() : (e.idServer === a && (c = !0), !1)) : t();

      function t() {
        return !i(u) || e.read === u;
      }
    }), e = {
      filter: o,
      desc: t,
      limit: n
    }, r ? this.getOnly("sysMsg", r, s, e) : this.getAll("sysMsg", e);
  }, r.getSysMsgByIdServer = function (e) {
    return this.getOne("sysMsg", "idServer", e);
  }, r.updateSysMsg = function (e) {
    var t = this;

    if (!e.filter) {
      var n = "" + e.idServer,
          r = s.filterObj(e, "read state error localCustom");
      return this.getOne("sysMsg", "idServer", n, {
        modifyObj: r
      }).then(function (e) {
        return e ? t.logger.log("db::updateSysMsg: " + n, r) : t.logger.warn("db::updateSession: " + n), e;
      });
    }
  }, r.markSysMsgRead = function (e) {
    var t = this;
    return new Promise(function (n, r) {
      s.isArray(e) || (e = [e]);
      var i,
          o,
          a = [],
          c = [];
      e.forEach(function (e) {
        i = t.getSysMsgByIdServer(e.idServer).then(function (e) {
          e && !e.read && (o = t.updateSysMsg({
            idServer: e.idServer,
            read: !0
          }), c.push(o));
        }, r), a.push(i);
      }), Promise.all(a).then(function () {
        Promise.all(c).then(function (e) {
          n(e);
        }, r);
      }, r);
    });
  }, r.deleteSysMsg = function (e) {
    var t,
        n = this,
        r = [];
    return s.isArray(e) || (e = [e]), e.forEach(function (e) {
      e = "" + e, t = n.getOne("sysMsg", "idServer", e, {
        remove: !0
      }), r.push(t);
    }), 1 === r.length ? r[0] : Promise.all(r);
  }, r.deleteAllSysMsgs = function () {
    var e = this.clearTable("sysMsg"),
        t = this.clearTable("sysMsgUnread");
    return Promise.all([e, t]);
  }, r.getSysMsgUnread = function () {
    return this.getAll("sysMsgUnread").then(function (e) {
      var t = {};
      return e.forEach(function (e) {
        t[e.type] = e.num;
      }), t;
    });
  }, r.updateSysMsgUnread = function (e) {
    var t = this;
    e = s.copy(e);
    var n = [];
    return Object.keys(e).forEach(function (t) {
      n.push({
        type: t,
        num: e[t]
      });
    }), this.put("sysMsgUnread", n).then(function () {
      return t.logger.log("db::updateSysMsgUnread: ", e), e;
    });
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0),
      i = n(1);
  r.putMsg = function (e) {
    return s.isArray(e) || (e = [e]), !e.length || e[0].filter ? Promise.resolve() : (e = e.filter(function (e) {
      return !e.ignore;
    }), this.put("msg1", e));
  }, r.updateMsg = function (e) {
    var t = this;

    if (!e.filter) {
      var n = e.idClient,
          r = s.filterObj(e, "resend status idServer time localCustom");
      return t.getOne("msg1", null, n, {
        modifyObj: r
      }).then(function (e) {
        return e ? t.logger.log("db::updateMsg: " + n, r) : t.logger.warn("db::updateMsg: no record " + n), e;
      });
    }
  }, r.getMsgs = function (e) {
    return i.isBrowser ? this.getMsgsIndexedDB(e) : i.isRN ? this.getMsgsRN(e) : Promise.resolve();
  }, r.getMsgsRN = function (e) {
    var t = {};
    return "number" == typeof e.start && (t.lowerBound = ["time", e.start]), "number" == typeof e.end && e.end !== 1 / 0 && (t.upperBound = ["time", e.end]), t.desc = !1, t.sortIndex = "time", "boolean" == typeof e.desc && (t.desc = e.desc), "number" == typeof e.limit && (t.limit = e.limit), t.searchIndex = [], e.sessionId && t.searchIndex.push(["sessionId", e.sessionId]), "string" == typeof e.type && t.searchIndex.push(["type", e.type]), this.getAll("msg1", t);
  }, r.getMsgsIndexedDB = function (e) {
    this.checkDB();
    var t = "time",
        n = !1,
        r = !1,
        i = (e = e || {}).sessionId,
        o = e.sessionIds;
    s.exist(i) ? (n = !0, t = "sessionTime") : s.exist(o) && (n = !0, s.isString(o) ? (t = "sessionTime", i = o) : Array.isArray(o) && (1 === o.length ? (t = "sessionTime", i = o[0]) : r = !0));
    var a = e.start || 0,
        c = e.end || 1 / 0,
        u = a,
        l = c;
    n && !r && (u = [i, a], l = [i, c]);
    var m = !1 !== e.desc,
        d = e.limit || 100,
        p = !1,
        f = !1,
        g = e.type,
        h = e.types;
    s.exist(g) ? p = !0 : s.exist(h) && (p = !0, s.isString(h) ? g = h : Array.isArray(h) && (1 === h.length ? g = h[0] : f = !0));
    var y = e.keyword || "",
        v = e.filterFunc,
        b = void 0;
    return (r || p || y || s.isFunction(v)) && (b = function b(e) {
      if (r && -1 === o.indexOf(e.sessionId)) return !1;
      if (p) if (f) {
        if (-1 === h.indexOf(e.type)) return !1;
      } else if (g !== e.type) return !1;
      if (y && -1 === (e.text || e.tip || "").indexOf(y)) return !1;
      return !v || v(e);
    }), this.server.query("msg1", t).bound(u, l, !0, !0).desc(m).limit(d).filter(b).execute();
  }, r.getMsgCountAfterAck = function (e) {
    return i.isBrowser ? this.getMsgCountAfterAckIndexedDB(e) : i.isRN ? this.getMsgCountAfterAckRN(e) : Promise.resolve();
  }, r.getMsgCountAfterAckRN = function (e) {
    var t = e = e || {},
        n = t.sessionId,
        r = t.ack;
    return this.checkDB(), this.getAll("msg1", {
      searchIndex: ["sessionId", n],
      lowerBound: ["time", r]
    }).then(function (t) {
      var n = t.filter(function (t) {
        return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t));
      });
      return Promise.resolve(n.length);
    });
  }, r.getMsgCountAfterAckIndexedDB = function (e) {
    var t = (e = e || {}).sessionId;
    return this.checkDB(), this.server.query("msg1", "sessionTime").bound([t, e.ack], [t, 1 / 0], !0, !0).execute().then(function (t) {
      var n = t.filter(function (t) {
        return "out" !== t.flow && ("notification" !== t.type || !!e.shouldCountNotifyUnread(t));
      });
      return Promise.resolve(n.length);
    });
  }, r.amendMsg = function (e) {
    return e ? (s.notexist(e.text) && (e.text = ""), e) : null;
  }, r.getMsgByIdClient = function (e) {
    var t = this;
    return t.getOne("msg1", null, e).then(function (e) {
      return t.amendMsg(e);
    });
  }, r.getMsgsByIdClients = function (e) {
    var t,
        n = this,
        r = [];
    return e.forEach(function (e) {
      t = n.getMsgByIdClient(e), r.push(t);
    }), Promise.all(r);
  }, r.clearSendingMsgs = function () {
    var e = this;
    return e.getOnly("msg1", "status", "sending", {
      modifyObj: {
        status: "fail"
      }
    }).then(function (t) {
      e.logger.log("db::clearSendingMsgs: msgs send failed", t);
    });
  }, r.deleteMsg = function (e) {
    var t,
        n = this,
        r = [];
    return s.isArray(e) || (e = [e]), e.forEach(function (e) {
      t = n.getOne("msg1", null, e, {
        remove: !0
      }).then(function (e) {
        return n.logger.log("db::deleteMsg:", e), e;
      }), r.push(t);
    }), 1 === r.length ? r[0] : Promise.all(r);
  }, r.deleteMsgsBySessionId = function (e) {
    return this.getOnly("msg1", "sessionId", e, {
      remove: !0
    });
  }, r.deleteAllMsgs = function () {
    var e = this.clearTable("msg1"),
        t = this.clearTable("session");
    return Promise.all([e, t]);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0);
  r.mergeMyInfo = function (e, t) {
    var n = this;
    return n.put("user", e).then(function () {
      return t ? n.updateMyInfoTimetag(e.updateTime) : e;
    });
  }, r.mergeFriendUsers = function (e, t) {
    var n = this;
    return n.putUsers(e).then(function () {
      n.updateFriendUserTimetag(t);
    });
  }, r.putUsers = function (e) {
    return this.put("user", e);
  }, r.putUser = function (e) {
    return this.put("user", e);
  }, r.updateUser = function (e) {
    var t = this,
        n = (e = s.copy(e)).account;
    return this.getOne("user", null, n, {
      modifyObj: e
    }).then(function (r) {
      return r ? t.logger.log("db::updateUser: " + n, e) : t.logger.warn("db::updateUser: no record " + n), r;
    });
  }, r.putUsersIfIsFriend = function (e) {
    var t,
        n = this,
        r = [],
        s = [];
    return e.forEach(function (e) {
      t = n.getFriend(e.account).then(function (r) {
        return r && (t = n.putUser(e), s.push(t)), r;
      }), r.push(t);
    }), Promise.all(r).then(function () {
      return Promise.all(s).then(function (e) {
        return e;
      });
    });
  }, r.deleteUser = function (e) {
    return this.remove("user", e);
  }, r.getUser = function (e) {
    return this.getOne("user", null, e);
  }, r.getUsers = function (e) {
    return this.getAll("user", {
      filter: function filter(t) {
        return -1 !== e.indexOf(t.account);
      }
    });
  }, r.getAllUsers = function () {
    return this.getAll("user");
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0),
      i = n(4),
      o = n(56),
      a = n(48);

  function c(e) {
    return e.valid && e.validToCurrentUser;
  }

  function u(e) {
    return e && e.valid;
  }

  function l(e) {
    return e && s.fillUndef(e, {
      mute: !1,
      custom: ""
    }), e;
  }

  r.mergeTeams = function (e, t, n) {
    var r = this,
        s = r.put("team", e),
        i = r.leaveTeams(t, n);
    return Promise.all([s, i]).then(function () {
      return r.logger.log("db::mergeTeams:"), r.updateTeamTimetag(n), [e, t, n];
    });
  }, r.putTeam = function (e) {
    if (e) return s.isArray(e) || (e = [e]), e.forEach(function (e) {
      e.validToCurrentUser = !0;
    }), this.put("team", e);
  }, r.updateTeam = function (e) {
    var t = this,
        n = (e = s.copy(e)).teamId;
    return t.getOne("team", null, n, {
      modifyObj: e
    }).then(function (r) {
      return r ? (t.logger.log("db::updateTeam: " + n, e), r) : (t.logger.warn("db::updateTeam: no record " + n), t.putTeam(e));
    });
  }, r.transferTeam = function (e, t, n) {
    var r = this,
        s = e.teamId,
        i = e.memberUpdateTime,
        o = {
      teamId: s,
      account: t,
      type: "normal",
      updateTime: i
    },
        a = {
      teamId: s,
      account: n,
      type: "owner",
      updateTime: i
    };
    return r.updateTeamMembers([o, a]).then(function () {
      return r.putTeam(e).then(function () {
        return r.logger.log("db::transferTeam: " + e.teamId + " " + t + " -> " + n), [e, t, n];
      });
    });
  }, r.leaveTeam = function (e) {
    var t = this;
    return t.updateTeam({
      teamId: e,
      validToCurrentUser: !1
    }).then(function () {
      return t.removeAllTeamMembers(e);
    });
  }, r.dismissTeam = function (e, t) {
    var n = this,
        r = {
      teamId: e,
      valid: !1,
      validToCurrentUser: !1,
      updateTime: t
    };
    return n.updateTeam(r).then(function () {
      return n.removeAllTeamMembers(e);
    });
  }, r.leaveTeams = function (e, t) {
    var n,
        r = this,
        s = [];
    return e.forEach(function (e) {
      n = r.leaveTeam(e.teamId, t), s.push(n);
    }), Promise.all(s);
  }, r.getTeamsByTeamIds = function (e) {
    var t,
        n = this,
        r = [];
    return e.forEach(function (e) {
      t = n.getTeam(e), r.push(t);
    }), Promise.all(r);
  }, r.getTeam = function (e) {
    e = "" + e;
    var t = this;
    return t.getOne("team", null, e).then(function (e) {
      return e ? (t.updateTeamProperties([e]), e) : null;
    });
  }, r.getTeams = function () {
    var e = this;
    return e.getAll("team", {
      filter: c
    }).then(function (t) {
      return e.updateTeamProperties(t), t;
    });
  }, r.updateTeamProperties = function (e) {
    e.forEach(function (e) {
      e && o.fillProperties(e);
    });
  }, r.mergeTeamMembers = function (e, t, n, r) {
    var s = this,
        i = s.putTeamMembers(t),
        o = s.updateTeamMembers(n);
    return Promise.all([i, o]).then(function () {
      return s.logger.log("db::mergeTeamMembers: " + e), s.updateTeamMemberTimetag(e, r);
    });
  }, r.putTeamMembers = function (e) {
    return this.put("teamMember", e);
  }, r.getTeamMembersByAccount = function (e) {
    return this.getOnly("teamMember", "account", e, {
      filter: u,
      mapper: l
    }).then();
  }, r.getTeamMembers = function (e) {
    var t = this;
    e = "" + e;
    return t.getOnly("teamMember", "teamId", e, {
      filter: function filter(e) {
        return e.valid;
      },
      mapper: l
    }).then(function (e) {
      return t.updateTeamMemberProperties(e).then(function () {
        return e;
      });
    });
  }, r.updateTeamMemberProperties = function (e) {
    var t,
        n = this,
        r = [];
    return e.forEach(function (e) {
      a.fillProperties(e) && (t = n.updateTeamMember(e), r.push(t));
    }), Promise.all(r);
  }, r.getInvalidTeamMembers = function (e, t) {
    var n = this;
    e = "" + e;
    var r,
        s = [];
    return t.forEach(function (t) {
      r = n.getOne("teamMember", null, a.genId(e, t)).then(function (e) {
        return l(e);
      }), s.push(r);
    }), Promise.all(s);
  }, r.updateTeamMember = function (e) {
    var t = this,
        n = e.teamId,
        r = e.account,
        i = a.genId(n, r),
        o = s.filterObj(e, "nickInTeam muteTeam mute custom updateTime type valid");
    return this.getOne("teamMember", null, i, {
      modifyObj: o,
      mapper: l
    }).then(function (e) {
      return e ? t.logger.log("db::updateTeamMember: " + n + " " + r, o) : t.logger.warn("db::updateTeam: no record " + n + " " + r), e;
    });
  }, r.updateTeamMembers = function (e) {
    var t = this;
    if (!e.length) return Promise.resolve();
    var n,
        r = [];
    return e.forEach(function (e) {
      n = t.updateTeamMember(e), r.push(n);
    }), Promise.all(r);
  }, r.updateTeamManagers = function (e, t, n, r) {
    var s = t.map(function (t) {
      return {
        teamId: e,
        account: t,
        type: n ? "manager" : "normal",
        updateTime: r
      };
    });
    return this.updateTeamMembers(s);
  }, r.removeTeamMembersByAccounts = function (e, t) {
    var n = t.map(function (t) {
      return {
        teamId: e,
        account: t,
        valid: !1
      };
    });
    return this.updateTeamMembers(n);
  }, r.removeAllTeamMembers = function (e) {
    var t = this;
    return t.getOnly("teamMember", "teamId", e, {
      modifyObj: {
        valid: !1
      }
    }).then(function () {
      return t.logger.warn("db::removeAllTeamMembers: " + e), t.deleteTeamMemberTimetag(e);
    });
  }, r.deleteTeamMembers = function (e) {
    var t = this;
    return t.getOnly("teamMember", "teamId", e, {
      remove: !0
    }).then(function () {
      t.logger.warn("db::deleteTeamMembers: " + e), t.deleteTeamMemberTimetag(e);
    });
  }, r.deleteTeam = function (e) {
    var t,
        n = this,
        r = [];
    return s.isArray(e) || (e = [e]), e.forEach(function (e) {
      e = "" + e, t = n.get("team", e).then(function (t) {
        if (t && c(t)) throw i.stillInTeamError({
          callFunc: "team::deleteTeam",
          team: t
        });
        var r = n.remove("team", e),
            s = n.deleteTeamMembers(e);
        return Promise.all([r, s]);
      }), r.push(t);
    }), 1 === r.length ? r[0] : Promise.all(r);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0);
  r.mergeFriends = function (e, t, n) {
    var r = this;
    return r.updateAndDelete("friend", e, t).then(function () {
      return r.logger.log("db::mergeFriends: updateAndDelete done", e), n && r.updateFriendTimetag(n), [e, t, n];
    });
  }, r.putFriend = function (e) {
    return this.put("friend", e);
  }, r.updateFriend = function (e) {
    var t = this,
        n = (e = s.copy(e)).account;
    return this.getOne("friend", null, n, {
      modifyObj: e
    }).then(function (r) {
      return r ? t.logger.log("db::updateFriend: " + n, e) : t.logger.warn("db::updateFriend: no record " + n), r;
    });
  }, r.deleteFriend = function (e) {
    var t = this.remove("friend", e),
        n = this.deleteUser(e);
    return Promise.all([t, n]);
  }, r.getFriends = function () {
    return this.getAll("friend", {
      filter: function filter(e) {
        return e.valid;
      }
    });
  }, r.getFriend = function (e) {
    return this.getOne("friend", null, e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn,
      s = n(0);
  r.mergeRelations = function (e, t, n, r, s) {
    var i = this,
        o = i.updateAndDelete("blacklist", e, t),
        a = i.updateAndDelete("mutelist", n, r);
    return Promise.all([o, a]).then(function () {
      return i.logger.log("db::mergeRelations: timetag " + s), i.updateRelationTimetag(s), [e, t, n, r, s];
    });
  }, r.getRelations = function () {
    var e = this.getAll("blacklist"),
        t = this.getAll("mutelist");
    return Promise.all([e, t]);
  }, r.markInBlacklist = function (e) {
    if ((e = s.copy(e)).isAdd) {
      var t = e.record;
      return this.put("blacklist", t);
    }

    var n = e.account;
    return this.remove("blacklist", n);
  }, r.markInMutelist = function (e) {
    if ((e = s.copy(e)).isAdd) {
      var t = e.record;
      return this.put("mutelist", t);
    }

    var n = e.account;
    return this.remove("mutelist", n);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn;
  r.getTimetags = function (e) {
    var t = {};
    return this.getAll("timetag", {
      filter: e,
      mapper: function mapper(e) {
        return -1 !== e.name.indexOf("team-") ? t[e.name] = 0 : t[e.name] = e.value, e;
      }
    }).then(function () {
      return t;
    });
  }, r.getTeamMemberTimetags = function () {
    return this.getTimetags(function (e) {
      return -1 !== e.name.indexOf("team-");
    });
  }, r.getTimetag = function (e) {
    return this.getOne("timetag", null, e).then(function (e) {
      return (e = e || {
        value: 0
      }).value;
    });
  }, r.getTeamMemberTimetag = function (e) {
    return 0;
  }, r.updateTimetag = function (e, t) {
    var n = {
      name: e,
      value: t
    };
    return this.put("timetag", n);
  }, r.updateMyInfoTimetag = function (e) {
    return this.updateTimetag("myInfo", e);
  }, r.updateRelationTimetag = function (e) {
    return this.updateTimetag("relations", e);
  }, r.getRelationsTimetag = function () {
    return this.getTimetag("relations");
  }, r.updateFriendTimetag = function (e) {
    return this.updateTimetag("friends", e);
  }, r.getFriendsTimetag = function () {
    return this.getTimetag("friends");
  }, r.updateFriendUserTimetag = function (e) {
    return this.updateTimetag("friendUsers", e);
  }, r.updateTeamTimetag = function (e) {
    return this.updateTimetag("teams", e);
  }, r.getTeamsTimetag = function () {
    return this.getTimetag("teams");
  }, r.updateTeamMemberTimetag = function (e, t) {
    return this.updateTimetag("team-" + e, t);
  }, r.getTeamMembersTimetag = function (e) {
    return this.getTimetag("team-" + e);
  }, r.updateMyTeamMembersTimetag = function (e) {
    return this.updateTimetag("myTeamMembers", e);
  }, r.getBroadcastMsgTimetag = function (e) {
    return this.getTimetag("broadcastMsg");
  }, r.updateBroadcastMsgTimetag = function (e) {
    return this.updateTimetag("broadcastMsg", parseInt(e));
  }, r.updateRoamingMsgTimetag = function (e) {
    return this.updateTimetag("roamingMsgs", e);
  }, r.updateMsgReceiptsTimetag = function (e) {
    return this.updateTimetag("msgReceipts", e);
  }, r.updateDonnopTimetag = function (e) {
    return this.updateTimetag("donnop", e);
  }, r.updateDeleteMsgTimetag = function (e) {
    return this.updateTimetag("deleteMsg", e);
  }, r.updateSessionAck = function (e) {
    return this.updateTimetag("sessionAck", e);
  }, r.deleteTimetag = function (e) {
    return this.remove("timetag", e);
  }, r.deleteTeamMemberTimetag = function (e) {
    return this.deleteTimetag("team-" + e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(17).fn;
  r.setKey = function (e, t) {
    return this.put("kv", {
      key: e,
      value: t
    });
  }, r.getKey = function (e) {
    return this.get("kv", e).then(function (e) {
      return e && e.value;
    });
  }, r.setDonnop = function (e) {
    return this.setKey("donnop", e);
  }, r.getDonnop = function () {
    return this.getKey("donnop");
  };
}, function (e, t, n) {
  "use strict";

  function r(e) {
    this.concurrency = 0, this.pendingTasks = [], this.queue = Promise.resolve(), this.logger = e.logger, this.enable = !1, this.server = null, this.name = null;
  }

  var s = r.prototype;
  s.reset = function (e) {
    this.enable = !1;
  }, s.clear = s.destroy = s.close = s.remove = s.init = function (e) {
    return Promise.resolve();
  }, e.exports = r;
}, function (e, t, n) {
  "use strict";

  n(122);
  var r = n(7);
  n(93)(r), e.exports = r;
}]);

/***/ }),

/***/ 197:
/*!********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Findex"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/message/index.vue */ 198));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 205:
/*!********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fwebview%2Findex"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/webview/index.vue */ 206));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 211:
/*!*****************************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Fsessiondetails"} ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _sessiondetails = _interopRequireDefault(__webpack_require__(/*! ./pages/message/sessiondetails.vue */ 212));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_sessiondetails.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 217:
/*!***************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Ftool%2Fjob"} ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _job = _interopRequireDefault(__webpack_require__(/*! ./pages/tool/job.vue */ 218));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_job.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 22:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 225:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fseting%2Fsetindex"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _setindex = _interopRequireDefault(__webpack_require__(/*! ./pages/seting/setindex.vue */ 226));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_setindex.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 233:
/*!***********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fseting%2Fsetdetail"} ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _setdetail = _interopRequireDefault(__webpack_require__(/*! ./pages/seting/setdetail.vue */ 234));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_setdetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 26:
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default);

var thischatList = wx.getStorageSync('thischatList') || {};
var chatList = wx.getStorageSync('chatList') || [];
var chatListuserdata = wx.getStorageSync('chatListuserdata') || {};
var iconimg = {
  thome_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-d.png',
  thome_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-a.png',
  tmess_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-d.png',
  tmess_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-a.png',
  tuser_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-d.png',
  tuser_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-a.png'
};
var store = new _vuex.default.Store({
  state: {
    // 即时通讯
    maxthischatListlength: 20,
    // 最大消息存储数量  每个用户
    nim: '',
    // 方法配置
    userInfo: {},
    // 当前登陆用户信息
    chatListaccount: '',
    // 当前和谁对话 账号
    chatListaccountsession: '',
    // 当前和谁对话 会话id
    chatList: chatList,
    friendCard: {},
    // 好友列表包含是否在线信息
    groupList: {},
    // 群列表
    unreadInfo: {},
    // 未读消息
    unreadInfonum: 0,
    thischatList: thischatList,
    // 消息列表
    chatListuserdata: chatListuserdata,
    // 会话列表用户信息
    tbarconfig: [{
      url: '/pages/index/index',
      icon_a: iconimg.thome_a,
      icon_d: iconimg.thome_d,
      isActiveIndex: 0,
      text: '首页',
      newunread: 0
    }, {
      url: '/pages/message/index',
      icon_a: iconimg.tmess_a,
      icon_d: iconimg.tmess_d,
      isActiveIndex: 1,
      text: '消息',
      newunread: 0
    }, {
      url: '/pages/userinfo/index',
      icon_a: iconimg.tuser_a,
      icon_d: iconimg.tuser_d,
      isActiveIndex: 2,
      text: '我的',
      newunread: 0
    }] // 底部tab 全局便利设置未读数和重置

  },
  getters: {
    // 底部tab
    tbarconfig: function tbarconfig(state) {
      return state.tbarconfig;
    },
    // 即时通讯
    nim: function nim(state) {
      return state.nim;
    },
    userInfo: function userInfo(state) {
      return state.userInfo;
    },
    chatListaccount: function chatListaccount(state) {
      return state.chatListaccount;
    },
    chatListaccountsession: function chatListaccountsession(state) {
      return state.chatListaccountsession;
    },
    chatList: function chatList(state) {
      return state.chatList;
    },
    friendCard: function friendCard(state) {
      return state.friendCard;
    },
    groupList: function groupList(state) {
      return state.groupList;
    },
    unreadInfo: function unreadInfo(state) {
      return state.unreadInfo;
    },
    unreadInfonum: function unreadInfonum(state) {
      return state.unreadInfonum;
    },
    thischatList: function thischatList(state) {
      return state.thischatList;
    },
    chatListuserdata: function chatListuserdata(state) {
      return state.chatListuserdata;
    }
  },
  mutations: {
    // 底部tab
    tbarconfig: function tbarconfig(state, _tbarconfig) {
      state.tbarconfig = _tbarconfig;
    },
    // 即时通讯
    nim: function nim(state, _nim) {
      state.nim = _nim;
    },
    userInfo: function userInfo(state, _userInfo) {
      state.userInfo = _userInfo;
    },
    chatListaccount: function chatListaccount(state, _chatListaccount) {
      state.chatListaccount = _chatListaccount;
    },
    chatListaccountsession: function chatListaccountsession(state, _chatListaccountsession) {
      state.chatListaccountsession = _chatListaccountsession;
    },
    chatList: function chatList(state, _chatList) {
      // console.log('设置最新会话列表', chatList)
      wx.setStorageSync('chatList', _chatList);
      state.chatList = _chatList;
    },
    friendCard: function friendCard(state, _friendCard) {
      state.friendCard = _friendCard;
    },
    groupList: function groupList(state, _groupList) {
      state.groupList = _groupList;
    },
    unreadInfo: function unreadInfo(state, _unreadInfo) {
      var unreadInfonum = 0;

      for (var key in _unreadInfo) {
        unreadInfonum += parseInt(_unreadInfo[key]);
      }

      state.unreadInfo = _unreadInfo;
      state.unreadInfonum = unreadInfonum; // 更新底部tab未读数

      state.tbarconfig[1].newunread = unreadInfonum; // console.log('底部tab数据', state.tbarconfig)
    },
    thischatList: function thischatList(state, _thischatList) {
      // 设置最新消息的是时候
      // 重置当前会话的未读数  条件是在当前会话详情
      if (state.chatListaccountsession != '') {
        wx.NIMFUN.resetSessionUnread(state.chatListaccountsession);
      }
      /**
       * 每个用户对话本地缓存最多不超过50条 查看更多可调用云端历史纪录
       */


      for (var key in _thischatList) {
        if (_thischatList[key].length > state.maxthischatListlength) {
          _thischatList[key].splice(0, _thischatList[key].length - state.maxthischatListlength);
        }

        _thischatList[key];
      } // 存储本地
      // console.log('本地历史纪录更新', thischatList)


      wx.setStorageSync('thischatList', _thischatList);
      state.thischatList = _thischatList;
    },
    chatListuserdata: function chatListuserdata(state, _chatListuserdata) {
      wx.setStorageSync('chatListuserdata', _chatListuserdata);
      state.chatListuserdata = _chatListuserdata;
    }
  },
  actions: {
    tbarconfig: function tbarconfig(context, _tbarconfig2) {
      context.commit("tbarconfig", _tbarconfig2);
    },
    nim: function nim(context, _nim2) {
      context.commit("nim", _nim2);
    },
    userInfo: function userInfo(context, _userInfo2) {
      context.commit("userInfo", _userInfo2);
    },
    chatListaccount: function chatListaccount(context, _chatListaccount2) {
      context.commit("chatListaccount", _chatListaccount2);
    },
    chatListaccountsession: function chatListaccountsession(context, _chatListaccountsession2) {
      context.commit("chatListaccountsession", _chatListaccountsession2);
    },
    chatList: function chatList(context, _chatList2) {
      context.commit("chatList", _chatList2);
    },
    friendCard: function friendCard(context, _friendCard2) {
      context.commit("friendCard", _friendCard2);
    },
    groupList: function groupList(context, _groupList2) {
      context.commit("groupList", _groupList2);
    },
    unreadInfo: function unreadInfo(context, _unreadInfo2) {
      context.commit("unreadInfo", _unreadInfo2);
    },
    thischatList: function thischatList(context, _thischatList2) {
      context.commit("thischatList", _thischatList2);
    },
    chatListuserdata: function chatListuserdata(context, _chatListuserdata2) {
      context.commit("chatListuserdata", _chatListuserdata2);
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ 27:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.1.1
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (true) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure enviroment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 28:
/*!******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Findex%2Fbegin"} ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _begin = _interopRequireDefault(__webpack_require__(/*! ./pages/index/begin.vue */ 29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_begin.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 36:
/*!*******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Findex%2Findexd"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _indexd = _interopRequireDefault(__webpack_require__(/*! ./pages/index/indexd.vue */ 37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_indexd.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 4:
/*!************************!*\
  !*** ./src/pages.json ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 44:
/*!********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fuserinfo%2Fedit"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _edit = _interopRequireDefault(__webpack_require__(/*! ./pages/userinfo/edit.vue */ 45));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_edit.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 52:
/*!********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Fdesct"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _desct = _interopRequireDefault(__webpack_require__(/*! ./pages/message/desct.vue */ 53));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_desct.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 60:
/*!*******************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Fjoin"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _join = _interopRequireDefault(__webpack_require__(/*! ./pages/message/join.vue */ 61));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_join.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 68:
/*!*********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fmessage%2Fsfdesc"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _sfdesc = _interopRequireDefault(__webpack_require__(/*! ./pages/message/sfdesc.vue */ 69));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_sfdesc.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 76:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fregist%2Fstepuser"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _stepuser = _interopRequireDefault(__webpack_require__(/*! ./pages/regist/stepuser.vue */ 77));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_stepuser.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 8:
/*!**********************************!*\
  !*** ./src/api/common/common.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _req = __webpack_require__(/*! ../../static/utils/req.js */ 9);

var _default = {
  // 上传文件
  upload: function upload(param) {
    return (0, _req.uploadFile)("/common/File/upload", param);
  },
  uploadPhoto: function uploadPhoto(param) {
    return _req.req.post("/mobile/Member/photograph", param);
  },
  // 用户code登录
  uerLogin: function uerLogin(param) {
    return _req.req.post("/Mobile/Token/getToken", param);
  },
  // 用户注册
  uerRegist: function uerRegist(param) {
    return _req.req.post("/Mobile/Token/register", param);
  },
  // 删除图片
  deletePhoto: function deletePhoto(param) {
    return _req.req.post("/mobile/Member/delPhotograph", param);
  },
  // 获取支付请求
  GetPay: function GetPay(param) {
    return _req.req.post("/mobile/Zpay/pay", param);
  },
  // 获取用户消息
  getUserinfo: function getUserinfo(param) {
    return _req.req.post("/mobile/Member/UserInfo", param);
  },
  // 发送通知
  sendFormId: function sendFormId(param) {
    return _req.req.post("/mobile/Form/AddFormId", param);
  },
  sendShareFrom: function sendShareFrom(param) {
    console.log('开始调用');
    return _req.req.post("/mobile/member/channel", param);
  },
  // 上传视频进度
  uploadFileProgress: function uploadFileProgress(param) {
    return (0, _req.uploadFileProgress)("/common/File/upload", param);
  }
};
exports.default = _default;

/***/ }),

/***/ 84:
/*!**********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fregist%2Fstepinfo"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _stepinfo = _interopRequireDefault(__webpack_require__(/*! ./pages/regist/stepinfo.vue */ 85));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_stepinfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 9:
/*!*********************************!*\
  !*** ./src/static/utils/req.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileProgress = exports.uploadFile = exports.req = exports.fly = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! ./index.js */ 10));

var _config = _interopRequireDefault(__webpack_require__(/*! ../../config.js */ 13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fly = __webpack_require__(/*! flyio/dist/npm/wx */ 14); //引入微信请求模块


var fly = new Fly(); //创建fly实例

exports.fly = fly;
var tokenFly = new Fly();
var isdebugger = true; //添加finally方法

Promise.prototype.finally = function (callback) {
  var P = this.constructor;
  return this.then(function (value) {
    return P.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return P.resolve(callback()).then(function () {
      throw reason;
    });
  });
}; //设置超时


fly.config.timeout = 10000; //设置请求基地址

tokenFly.config.baseURL = _config.default.baseURL;
fly.config.baseURL = _config.default.baseURL + _config.default.miniAppName; //给所有请求添加自定义header

fly.config.headers = tokenFly.config.headers = {
  "content-type": "application/x-www-form-urlencoded" //添加请求拦截器

};
fly.interceptors.request.use(function (request) {
  var token = wx.getStorageSync('token');
  request.headers["token"] = token;
}); //添加响应拦截器，响应拦截器会在then/catch处理之前执行

fly.interceptors.response.use(function (response) {
  _index.default.hideAll(); //只将请求结果的data字段返回


  if (response.data.code == 200) {
    return response.data;
  } else {
    // if (isdebugger && (response.data.code + '').length != 5) {
    //   util.showFail(response.data.msg)
    // }
    return response.data;
  }
}, function (err) {
  //发生网络错误后会走到这里
  _index.default.hideAll();

  var status = err.status;

  switch (status) {
    case 401:
      console.log("token过期，授权失败"); // fly.lock()

      return new Promise(function (resove, reject) {
        //登陆
        uni.login({
          success: function success(res) {
            var code = res.code;

            if (code) {
              //发起网络请求
              resove(code);
            } else {
              reject(0);
            }
          },
          fail: function fail() {
            reject(0);
          }
        });
      }).then(function (code) {
        return tokenFly.post(_config.default.TokenURL, {
          code: code
        });
      }).then(function (d) {
        var _d$data$data = d.data.data,
            openid = _d$data$data.openid,
            token = _d$data$data.token;
        err.request.headers["token"] = token;
        wx.setStorageSync("token", token); //保存token

        wx.setStorageSync("openid", openid); //保存uid
      }).finally(function () {
        fly.unlock(); //解锁后，会继续发起请求队列中的任务，详情见后面文档
      }).then(function () {
        return fly.request(err.request); //只有最终返回request对象时，原来的请求才会继续
      });
      break;

    default:
      {
        // let str = ''
        // for(var item in err) {
        //  str += item + err[item] + ';'
        // }
        //       util.showModal({
        //         content: '请求网络出了问题,请稍后再试~~--' + str
        //       });
        return new Promise(function (resove, reject) {
          reject({
            errormsg: true
          });
        });
      }
  }
});

var uploadFile = function uploadFile(url) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? "file" : _ref$name,
      filePath = _ref.filePath,
      _ref$formData = _ref.formData,
      formData = _ref$formData === void 0 ? {} : _ref$formData;

  url = _config.default.baseURL + url;
  var token = wx.getStorageSync('token');
  return new Promise(function (resove, reject) {
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: {
        token: token
      },
      formData: formData,
      success: function success(res) {
        if (res.statusCode == 200) {
          var data = JSON.parse(res.data);

          if (data.code == 10000 || data.code == 200) {
            resove(data.data);
          } else {
            resove({
              code: 0
            });

            _index.default.showModal({
              content: "上传失败"
            });
          }
        } else {
          reject({
            code: 1
          });

          _index.default.showModal({
            content: "上传失败"
          });
        }
      },
      fail: function fail(res) {
        reject({
          code: 1
        });

        _index.default.showModal({
          content: "上传失败"
        });

        wx.hideLoading();
      },
      complete: function complete(res) {}
    });
  });
}; //统一处理报错时，不再往下执行


exports.uploadFile = uploadFile;
var req = {
  post: function post(url, param) {
    return new Promise(function (resove, reject) {
      fly.post(url, param).then(function (d) {
        if (d) resove(d);
      });
    });
  },
  get: function get(url, param) {
    return new Promise(function (resove, reject) {
      fly.get(url, param).then(function (d) {
        if (d) resove(d);
      });
    });
  }
};
exports.req = req;

var uploadFileProgress = function uploadFileProgress(url) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? "file" : _ref2$name,
      filePath = _ref2.filePath,
      _ref2$formData = _ref2.formData,
      formData = _ref2$formData === void 0 ? {} : _ref2$formData,
      _ref2$success = _ref2.success,
      _success = _ref2$success === void 0 ? function () {} : _ref2$success,
      _ref2$fail = _ref2.fail,
      _fail = _ref2$fail === void 0 ? function () {} : _ref2$fail;

  url = _config.default.baseURL + url;
  var token = wx.getStorageSync('token');
  return wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    header: {
      token: token
    },
    formData: formData,
    success: function success(res) {
      if (res.statusCode == 200) {
        var data = JSON.parse(res.data);

        if (data.code == 10000) {
          _success && _success(data);
        } else {
          _success && _success(data);

          _index.default.showModal({
            content: "上传失败"
          });
        }
      } else {
        _success && _success({
          msg: '上传失败'
        });

        _index.default.showModal({
          content: "上传失败"
        });
      }
    },
    fail: function fail(res) {
      _fail && _fail({
        msg: '上传失败'
      });

      _index.default.showModal({
        content: "上传失败"
      });

      wx.hideLoading();
    },
    complete: function complete(res) {}
  });
};

exports.uploadFileProgress = uploadFileProgress;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 92:
/*!***********************************************************!*\
  !*** ./src/main.js?{"page":"pages%2Fregist%2Fstepvideo"} ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {

__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _stepvideo = _interopRequireDefault(__webpack_require__(/*! ./pages/regist/stepvideo.vue */ 93));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

createPage(_stepvideo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map