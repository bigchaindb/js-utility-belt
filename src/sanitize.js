import selectFromObject from './select_from_object';


/**
 * Glorified selectFromObject. Takes an object and returns a filtered shallow copy that strips out
 * any properties that are falsy (including coercions, ie. undefined, null, '', 0, ...).
 * Does not modify the passed in object.
 *
 * @param  {object} obj      Javascript object
 * @return {object}          Sanitized Javascript object
 */
export default function sanitize(obj) {
    return selectFromObject(obj, (val) => !!val);
}
