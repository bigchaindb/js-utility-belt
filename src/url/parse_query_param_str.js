import coreObjectEntries from 'core-js/library/fn/object/entries';
import camelcase from 'camelcase';
import queryString from 'query-string';


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
export default function parseQueryParamStr(queryParamString, transform = camelcase) {
    if (typeof queryParamString !== 'string') {
        return {};
    }

    const extractedParamString = queryString.extract(queryParamString);
    const parsedObj = queryString.parse(extractedParamString);

    return coreObjectEntries(parsedObj).reduce((paramsObj, [key, value]) => {
        paramsObj[transform(key)] = value;
        return paramsObj;
    }, {});
}
