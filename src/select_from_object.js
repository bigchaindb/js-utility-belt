import filterFromObject from './private/filter_from_object';


/**
 * Similar to lodash's _.pick(), this returns a copy of the given object's
 * own and inherited enumerable properties, selecting only the keys in
 * the given array or whose value pass the given filter function.
 * @param  {object}         obj    Source object
 * @param  {array|function} filter Array of key names to select or function to invoke per iteration
 * @return {object}                The new object
 */
export default function selectFromObject(obj, filter) {
    return filterFromObject(obj, filter);
}
