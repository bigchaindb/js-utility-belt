import camelcase from 'camelcase';
import decamelize from 'decamelize';
import queryString from 'query-string';


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
export function getCurrentQueryParams(transform) {
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
export function stringifyObjToQueryParam(obj, transform = decamelize) {
    if (typeof obj !== 'object' || !obj) {
        return '';
    }

    const transformedKeysObj = Object
        .entries(obj)
        .reduce((paramsObj, [key, value]) => {
            paramsObj[transform(key)] = value;
            return paramsObj;
        }, {});

    return `?${queryString.stringify(transformedKeysObj)}`;
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
export function parseQueryParamStrToObj(queryParamString, transform = camelcase) {
    if (typeof queryParamString !== 'string') {
        return {};
    }

    const extractedParamString = queryString.extract(queryParamString);
    const parsedObj = queryString.parse(extractedParamString);

    return Object
        .entries(parsedObj)
        .reduce((paramsObj, [key, value]) => {
            paramsObj[transform(key)] = value;
            return paramsObj;
        }, {});
}
