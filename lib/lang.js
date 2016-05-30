'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowserLang = getBrowserLang;

var _browserLocale = require('browser-locale');

var _browserLocale2 = _interopRequireDefault(_browserLocale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the current browser's language setting.
 * See browser-locale (https://github.com/maxogden/browser-locale) for more info.
 *
 * @return {string} Current browser language
 */
// Ignore error as we may have more exports in the future
// eslint-disable-next-line import/prefer-default-export
function getBrowserLang() {
  return (0, _browserLocale2.default)();
}