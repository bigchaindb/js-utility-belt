'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.getCurrentQueryParams = getCurrentQueryParams;
exports.stringifyObjToQueryParam = stringifyObjToQueryParam;
exports.parseQueryParamStrToObj = parseQueryParamStrToObj;

var _entries = require('core-js/library/fn/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

var _decamelize = require('decamelize');

var _decamelize2 = _interopRequireDefault(_decamelize);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the current url's query params as an object.
 *
 * Allows you to specify a `transform` function that will be invoked on each of the parameter's keys
 * before being returned. By default this is `camelcase`, so all parameters returned will have camel
 * case keys (ie. ?page_size=10 will be returned as { pageSize: 10 }).
 *
 * @param  {function} [transform] Transform function for each of the param keys
 * @return {object}               Query params dictionary
 */
function getCurrentQueryParams(transform) {
    return parseQueryParamStrToObj(window.location.search, transform);
}

/** Convenience wrappers around queryString (https://github.com/sindresorhus/query-string) **/

/**
 * Takes a key-value dictionary (ie. object) and converts it to a query-parameter string that you
 * can directly append into a URL.
 *
 * Extends queryString.stringify by allowing you to specify a `transform` function that will be
 * invoked on each of the dictionary's keys before being stringified into the query-parameter
 * string.
 *
 * By default `transform` is `decamelize`, so a dictionary of the form:
 *
 *   {
 *      page: 1,
 *      pageSize: 10
 *   }
 *
 * will be converted to a string like:
 *
 *   ?page=1&page_size=10
 *
 * @param  {object}   obj                    Query params dictionary
 * @param  {function} [transform=decamelize] Transform function for each of the param keys
 * @return {string}                          Query param string
 */
function stringifyObjToQueryParam(obj) {
    var transform = arguments.length <= 1 || arguments[1] === undefined ? _decamelize2.default : arguments[1];

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || !obj) {
        return '';
    }

    var transformedKeysObj = (0, _entries2.default)(obj).reduce(function (paramsObj, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        paramsObj[transform(key)] = value;
        return paramsObj;
    }, {});

    return '?' + _queryString2.default.stringify(transformedKeysObj);
}

/**
 * Convert the given query param string into a key-val dictionary (ie. object).
 *
 * Extends queryString.parse by allowing you to speciiy a `transform` function that will be invoked
 * on each of the query parameter's keys before they are added into the returned object.
 *
 * By default `transform` is `camelcase`, so a query string for the form:
 *
 *   ?page=1&page_size=10
 *
 * will be converted to an object like:
 *
 *   {
 *      page: 1,
 *      pageSize: 10
 *   }
 *
 * @param  {string}   queryParamString      Query params string
 * @param  {function} [transform=camelcase] Transform function for each of the param keys
 * @return {object}                         Query params dictionary
 */
function parseQueryParamStrToObj(queryParamString) {
    var transform = arguments.length <= 1 || arguments[1] === undefined ? _camelcase2.default : arguments[1];

    if (typeof queryParamString !== 'string') {
        return {};
    }

    var extractedParamString = _queryString2.default.extract(queryParamString);
    var parsedObj = _queryString2.default.parse(extractedParamString);

    return (0, _entries2.default)(parsedObj).reduce(function (paramsObj, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var key = _ref4[0];
        var value = _ref4[1];

        paramsObj[transform(key)] = value;
        return paramsObj;
    }, {});
}