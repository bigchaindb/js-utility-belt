import coreIncludes from 'core-js/library/fn/array/includes';
import coreObjectEntries from 'core-js/library/fn/object/entries';


/**
 * Abstraction for selectFromObject and omitFromObject for DRYness.
 * Set isInclusion to true if the filter should be for including the filtered items (ie. selecting
 * only them vs omitting only them).
 */
export default function filterFromObject(obj, filter, { isInclusion = true } = {}) {
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
