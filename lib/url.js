import camelCase from 'camelcase';
import decamelize from 'decamelize';
import queryString from 'query-string';

import { sanitize } from './general';

/**
 * Takes a key-value dictionary of this form:
 *
 *  {
 *     'page': 1,
 *     'pageSize': 10
 *  }
 *
 * and converts it to a query-parameter, which you can append to your URL.
 * The return looks like this:
 *
 * ?page=1&page_size=10
 *
 * CamelCase gets converted to snake_case!
 *
 * @param  {object} obj Query params dictionary
 * @return {string}     Query params string
 */
export function argsToQueryParams(obj) {
    const sanitizedObj = sanitize(obj);
    const queryParamObj = {};

    Object
        .keys(sanitizedObj)
        .forEach((key) => {
            queryParamObj[decamelize(key)] = sanitizedObj[key];
        });

    return '?' + queryString.stringify(queryParamObj);
}

/**
 * Get the current url's query params as an key-val dictionary.
 * snake_case gets converted to CamelCase!
 * @return {object} Query params dictionary
 */
export function getCurrentQueryParams() {
    return queryParamsToArgs(window.location.search.substring(1));
}

/**
 * Convert the given query param string into a key-val dictionary.
 * snake_case gets converted to CamelCase!
 * @param  {string} queryParamString Query params string
 * @return {object}                  Query params dictionary
 */
export function queryParamsToArgs(queryParamString) {
    const queryParamObj = queryString.parse(queryParamString);
    const camelCaseParamObj = {};

    Object
        .keys(queryParamObj)
        .forEach((key) => {
            camelCaseParamObj[camelCase(key)] = queryParamObj[key];
        });

    return camelCaseParamObj;
}
