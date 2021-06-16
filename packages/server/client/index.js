'use strict';
/* global __resourceQuery WorkerGlobalScope */

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var webpackHotLog = require('webpack/hot/log');

var stripAnsi = require('./modules/strip-ansi');

var parseURL = require('./utils/parseURL');

var socket = require('./socket');

var overlay = require('./overlay');

var _require = require('./utils/log'),
    log = _require.log,
    setLogLevel = _require.setLogLevel;

var sendMessage = require('./utils/sendMessage');

var reloadApp = require('./utils/reloadApp');

var createSocketURL = require('./utils/createSocketURL');

var status = {
  isUnloading: false,
  currentHash: ''
};
var defaultOptions = {
  hot: false,
  hotReload: true,
  liveReload: false,
  initial: true,
  progress: false,
  overlay: false
};
var parsedResourceQuery = parseURL(__resourceQuery);
var options = defaultOptions; // Handle Node.js legacy format and `new URL()`

if (parsedResourceQuery.query) {
  _extends(options, parsedResourceQuery.query);
} else if (parsedResourceQuery.searchParams) {
  var paramsToObject = function paramsToObject(entries) {
    var result = {};

    var _iterator = _createForOfIteratorHelper(entries),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        result[key] = value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  };

  _extends(options, paramsToObject(parsedResourceQuery.searchParams.entries()));
}

var socketURL = createSocketURL(parsedResourceQuery);

function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpackHotLog.setLogLevel(level);
  setLogLevel(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});

if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  options.hotReload = qs.indexOf('hotreload=false') === -1;
}

var onSocketMessage = {
  hot: function hot() {
    options.hot = true;
    log.info('Hot Module Replacement enabled.');
  },
  liveReload: function liveReload() {
    options.liveReload = true;
    log.info('Live Reloading enabled.');
  },
  invalid: function invalid() {
    log.info('App updated. Recompiling...'); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      overlay.clear();
    }

    sendMessage('Invalid');
  },
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  overlay: function overlay(value) {
    if (typeof document === 'undefined') {
      return;
    }

    options.overlay = value;
  },
  progress: function progress(_progress) {
    options.progress = _progress;
  },
  'progress-update': function progressUpdate(data) {
    if (options.progress) {
      log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : '').concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage('Progress', data);
  },
  'still-ok': function stillOk() {
    log.info('Nothing changed.');

    if (options.overlay) {
      overlay.clear();
    }

    sendMessage('StillOk');
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.overlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    }

    reloadApp(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  'content-changed': function contentChanged(file) {
    log.info("".concat(file ? "\"".concat(file, "\"") : 'Content', " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  'static-changed': function staticChanged(file) {
    log.info("".concat(file ? "\"".concat(file, "\"") : 'Content', " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('Warnings while compiling.');

    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning.message ? warning.message : warning);
    });

    sendMessage('Warnings', strippedWarnings);

    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }

    var needShowOverlay = typeof options.overlay === 'boolean' ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlay) {
      overlay.showMessage(_warnings);
    }

    if (options.initial) {
      return options.initial = false;
    }

    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error('Errors while compiling. Reload prevented.');

    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error.message ? error.message : error);
    });

    sendMessage('Errors', strippedErrors);

    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }

    var needShowOverlay = typeof options.overlay === 'boolean' ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlay) {
      overlay.showMessage(_errors);
    }

    options.initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('Disconnected!');
    sendMessage('Close');
  }
};
socket(socketURL, onSocketMessage);