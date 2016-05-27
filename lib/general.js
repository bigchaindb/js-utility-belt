import coreIncludes from 'core-js/library/fn/array/includes';
import coreObjectEntries from 'core-js/library/fn/object/entries';


/**
 * Checks shallow equality
 * Re-export of shallow from shallow-equals
 */
export { default as isShallowEqual } from 'shallow-equals';

/**
 * Formats strings similarly to C's sprintf
 * Re-export of sprintf from sprintf-js
 * See https://github.com/alexei/sprintf.js for documentation on usage
 */
export { sprintf, sprintf as formatText } from 'sprintf-js';

/**
 * Dumb shim to convert array-like data structures to an iterable format (ie. array)
 * Apparently Array.from() doesn't cover some cases (ie. FileLists)
 *
 * @param  {object} arrayLike Array like object
 * @return {any[]}            Actual array containing the same objects in arrayLike
 */
export function arrayFrom(arrayLike) {
    const array = [];

    Array.prototype.forEach.call(arrayLike, (item) => array.push(item));

    return array;
}

/**
 * Recursively tests an object against a "match" object to see if the object is similar to the
 * "match" object. In other words, this will deeply traverse the "match" object's properties and
 * check them against the object by using the testFn.
 *
 * The object is considered a match if all primitive properties in the "match" object are found
 * and accepted in the object by the testFn.
 *
 * @param  {object}     obj    Object to test
 * @param  {object}     match  "Match" object to test against
 * @param  {(function)} testFn Function to use on each property test. Return true to accept the match.
 *                             By default, applies strict equality using ===
 * @return {boolean}           True if obj matches the "match" object
 */
export function deepMatchObject(obj, match, testFn = (objProp, matchProp) => objProp === matchProp) {
    if (typeof match !== 'object') {
        throw new Error('Your specified match argument was not an object');
    }
    if (typeof testFn !== 'function') {
        throw new Error('Your specified test function was not a function');
    }

    return Object
            .keys(match)
            .reduce((result, matchKey) => {
                if (!result) { return false; }

                const objProp = obj && obj[matchKey];
                const matchProp = match[matchKey];

                if (typeof matchProp === 'object') {
                    return (typeof objProp === 'object') ? deepMatchObject(objProp, matchProp, testFn)
                                                         : false;
                } else {
                    return testFn(objProp, matchProp);
                }
            }, true);
}

/**
 * Takes two lists and returns their intersection as a list
 * @param  {Array} a
 * @param  {Array} b
 * @return {Array} Intersected list of a and b
 */
export function intersectLists(a, b) {
    return a.filter((val) => coreIncludes(b, val));
}

/**
 * Noop function that can be stuffed into required callback props
 */
export function noop() {}

/**
 * Similar to lodash's _.omit(), this returns a copy of the given object's
 * own and inherited enumerable properties, omitting any keys that are
 * in the given array or whose value pass the given filter function.
 * @param  {object}         obj    Source object
 * @param  {array|function} filter Array of key names to omit or function to invoke per iteration
 * @return {object}                The new object
*/
export function omitFromObject(obj, filter) {
    return filterFromObject(obj, filter, { isInclusion: false });
}

/**
 * Safely invoke a given function with the given args by first checking if `fn` is actually a
 * function before invoking it.
 *
 * Has two call signatures:
 *   1. safeInvoke({
 *          fn:      Function to invoke,
 *          context: Context to invoke function with
 *          params:  Array of params or function for lazily computing parameters,
 *          error:   Error to throw if function not invoked
 *      });
 *   2. safeInvoke(fn, param1, param2, param3, ...);
 *
 * The second signature is a simplified one for general usage where you just want to execute a
 * function if it exists with the given params.
 *
 * @param  {object}         options
 * @param  {any}            options.fn      Function to invoke
 * @param  {any}            options.context Context to invoke function with
 * @param  {array|function} options.params  Arguments to be passed into the function.
 *                                          If this is a function, the resulting array of the function
 *                                          will be passed as params into the function.
 * @param  {Error}          options.error   Error to be thrown if the function is not invoked.
 * @return {object}                         Return object specifying:
 *                                            result - the result of the function (if invoked)
 *                                            invoked - whether or not the function was invoked
 */
export function safeInvoke(fnOrConfig, ...paramsForFn) {
    let config;

    if (fnOrConfig && fnOrConfig.hasOwnProperty('fn')) {
        // First param is a config object (first call signature)
        config = fnOrConfig;
    } else {
        // First param was not a config object, so we assume it's the second call signature and
        // turn it into a config object
        config = {
            fn: fnOrConfig,
            params: paramsForFn
        };
    }

    return safeInvokeForConfig(config);
}

/**
 * Takes a list of object and safely merges their properties into a new object.
 * Throws if any of the objects contain a duplicate key that is also in another object.
 * Does not modify the given objects.
 * @param  {...Object} l Any number of objects to merge
 * @return {Object}      Merged object
 */
export function safeMerge(...l) {
    // If the objects submitted in the list have duplicates in their key names,
    // abort the merge and tell the function's user to check his objects.
    if (doesObjectListHaveDuplicates(l)) {
        throw new Error('The objects you submitted for merging have duplicates. Merge aborted.');
    }

    return Object.assign({}, ...l);
}

/**
 * Glorified omitFromObject. Takes an object and returns a filtered shallow copy that strips out
 * any properties that are falsy (including coercions, ie. undefined, null, '', 0, ...).
 * Does not modify the passed in object.
 *
 * @param  {object} obj      Javascript object
 * @return {object}          Sanitized Javascript object
 */
export function sanitize(obj) {
    return selectFromObject(obj, (val) => !!val);
}

/**
 * Removes all falsy values (including coercions, ie. undefined, null, '', 0, ...) from an array.
 * Does not modify the passed in array.
 * @param  {array} l Array to sanitize
 * @return {array}   Sanitized array
 */
export function sanitizeList(l) {
    return l.filter((val) => !!val);
}

/**
 * Similar to lodash's _.pick(), this returns a copy of the given object's
 * own and inherited enumerable properties, selecting only the keys in
 * the given array or whose value pass the given filter function.
 * @param  {object}         obj    Source object
 * @param  {array|function} filter Array of key names to select or function to invoke per iteration
 * @return {object}                The new object
*/
export function selectFromObject(obj, filter) {
    return filterFromObject(obj, filter);
}

/**
 * Takes a string and breaks it at the supplied index and replaces it
 * with a (potentially) short string that also has been provided
 * @param  {string} text        The string to truncate
 * @param  {number} truncIndex  The char number at which the text should be truncated
 * @param  {String} replacement All text after truncIndex will be replaced with this string.
 *                              This string will only be used if there is still text after truncIndex.
 * @return {string}             The truncated text
 */
export function truncateTextAtCharIndex(text, truncIndex, replacement = '...') {
    return text.length > truncIndex ? (text.slice(0, truncIndex) + replacement) : text;
}

/** Helpers **/
/**
 * Checks a list of objects for key duplicates and returns a boolean
 */
function doesObjectListHaveDuplicates(l) {
    const mergedList = l.reduce((merged, obj) => (
        obj ? merged.concat(Object.keys(obj)) : merged
    ), []);

    // Taken from: http://stackoverflow.com/a/7376645/1263876
    // By casting the array to a Set, and then checking if the size of the array
    // shrunk in the process of casting, we can check if there were any duplicates
    return new Set(mergedList).size !== mergedList.length;
}

/**
 * Returns a filtered copy of the given object's own enumerable properties (no inherited
 * properties), keeping any keys that pass the given filter function.
 */
function applyFilterOnObject(obj, filterFn) {
    if (filterFn == null) {
        return Object.assign({}, obj);
    }

    const filteredObj = {};
    coreObjectEntries(obj).forEach(([key, val]) => {
        if (filterFn(val, key)) {
            filteredObj[key] = val;
        }
    });

    return filteredObj;
}

/**
 * Abstraction for selectFromObject and omitFromObject for DRYness.
 * Set isInclusion to true if the filter should be for including the filtered items (ie. selecting
 * only them vs omitting only them).
 */
function filterFromObject(obj, filter, { isInclusion = true } = {}) {
    if (filter && Array.isArray(filter)) {
        return applyFilterOnObject(obj, isInclusion ? ((_, key) => coreIncludes(filter, key))
                                                    : ((_, key) => !coreIncludes(filter, key)));
    } else if (filter && typeof filter === 'function') {
        // Flip the filter fn's return if it's for inclusion
        return applyFilterOnObject(obj, isInclusion ? filter
                                                    : (...args) => !filter(...args));
    } else {
        throw new Error('The given filter is not an array or function. Exclude aborted');
    }
}

/**
 * Abstraction for safeInvoke's two call signatures
 */
function safeInvokeForConfig({ fn, context, params, error }) {
    if (typeof fn === 'function') {
        let fnParams = params;
        if (typeof params === 'function') {
            fnParams = params();
        }

        // Warn if params or lazily evaluated params were given but not in an array
        if (fnParams != null && !Array.isArray(fnParams)) {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn("Params to pass into safeInvoke's fn is not an array. Ignoring...",
                             fnParams);
            }

            fnParams = null;
        }

        return {
            invoked: true,
            result: fn.apply(context, fnParams)
        };
    } else {
        if (error) {
            if (error instanceof Error) {
                throw error;
            } else if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('Error given to safeInvoke was not a JS Error. Ignoring...', error);
            }
        }

        return { invoked: false };
    }
}
