/**
 * javascript-bus v1.0.1
 * https://github.com/Mywbj/js-bus
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JavascriptBus = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var JavascriptBus = /*#__PURE__*/function () {
    function JavascriptBus() {
      _classCallCheck(this, JavascriptBus);
      this.eventBus = {};
    }
    _createClass(JavascriptBus, [{
      key: "on",
      value: function on(eventName, eventCallback, pointer) {
        if (typeof eventName !== "string") {
          throw new TypeError("the event name must be string type.");
        }
        if (typeof eventCallback !== "function") {
          throw new TypeError("the event callback must be function type.");
        }
        var hanlders = this.eventBus[eventName];
        if (!hanlders) {
          hanlders = [];
          this.eventBus[eventName] = hanlders;
        }
        hanlders.push({
          eventCallback: eventCallback,
          pointer: pointer
        });

        // 返回一个取消订阅函数，调用它即可停止监听
        // Returns an unsubscribe function Call it to stop listening.
        return this.off.bind(this, eventName, eventCallback);
      }
    }, {
      key: "once",
      value: function once(eventName, eventCallback, pointer) {
        var _this = this;
        if (typeof eventName !== "string") {
          throw new TypeError("the event name must be string type.");
        }
        if (typeof eventCallback !== "function") {
          throw new TypeError("the event callback must be function type.");
        }
        var newCallback = function newCallback() {
          _this.off(eventName, newCallback);
          for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
            payload[_key] = arguments[_key];
          }
          eventCallback.apply(pointer, payload);
        };
        this.on(eventName, newCallback, pointer);
      }
    }, {
      key: "off",
      value: function off(eventName, eventCallback) {
        if (typeof eventName !== "string") {
          throw new TypeError("the event name must be string type.");
        }
        if (typeof eventCallback !== "function") {
          throw new TypeError("the event callback must be function type.");
        }
        var hanlders = this.eventBus[eventName];
        if (hanlders) {
          var backups = _toConsumableArray(hanlders);
          backups.forEach(function (hanlder, index) {
            if (hanlder.eventCallback === eventCallback) {
              hanlders.splice(index, 1);
            }
          });
          if (hanlders.length === 0) {
            delete this.eventBus[eventName];
          }
        }
      }
    }, {
      key: "emit",
      value: function emit(eventName) {
        for (var _len2 = arguments.length, payload = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          payload[_key2 - 1] = arguments[_key2];
        }
        if (typeof eventName !== "string") {
          throw new TypeError("the event name must be string type.");
        }
        var hanlders = this.eventBus[eventName];
        if (hanlders) {
          hanlders.forEach(function (hanlder) {
            hanlder.eventCallback.apply(hanlder.pointer, payload);
          });
        }
      }
    }]);
    return JavascriptBus;
  }();

  return JavascriptBus;

}));
