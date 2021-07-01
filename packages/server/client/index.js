'use strict';
/* global __resourceQuery WorkerGlobalScope */

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
var options = {
  hot: false,
  liveReload: false,
  initial: true,
  progress: false,
  overlay: false
};
var parsedResourceQuery = parseURL(__resourceQuery);

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpackHotLog.setLogLevel(level === 'verbose' || level === 'log' ? 'info' : level);
  setLogLevel(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener('beforeunload', function () {
  status.isUnloading = true;
});
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
      overlay.hide();
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
      overlay.hide();
    }

    sendMessage('StillOk');
  },
  ok: function ok() {
    sendMessage('Ok');

    if (options.overlay) {
      overlay.hide();
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
      overlay.show(_warnings, 'warnings');
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
      overlay.show(_errors, 'errors');
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
var socketURL = createSocketURL(parsedResourceQuery);
socket(socketURL, onSocketMessage);