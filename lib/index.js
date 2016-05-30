'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Url = exports.Request = exports.Lang = exports.File = exports.FeatureDetection = exports.DOM = exports.Cookie = undefined;

var _general = require('./general');

Object.keys(_general).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _general[key];
    }
  });
});

var _cookie = require('./cookie');

var _Cookie = _interopRequireWildcard(_cookie);

var _dom = require('./dom');

var _DOM = _interopRequireWildcard(_dom);

var _feature_detection = require('./feature_detection');

var _FeatureDetection = _interopRequireWildcard(_feature_detection);

var _file = require('./file');

var _File = _interopRequireWildcard(_file);

var _lang = require('./lang');

var _Lang = _interopRequireWildcard(_lang);

var _request = require('./request');

var _Request = _interopRequireWildcard(_request);

var _url = require('./url');

var _Url = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Export the general utils as-is without a namespace
exports.Cookie = _Cookie;
exports.DOM = _DOM;
exports.FeatureDetection = _FeatureDetection;
exports.File = _File;
exports.Lang = _Lang;
exports.Request = _Request;
exports.Url = _Url;