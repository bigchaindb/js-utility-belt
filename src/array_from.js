/**
 * Dumb shim to convert array-like data structures to an iterable format (ie. array)
 * Apparently Array.from() doesn't cover some cases (ie. FileLists)
 *
 * @param  {object} arrayLike Array like object
 * @return {any[]}            Actual array containing the same objects in arrayLike
 */
export default function arrayFrom(arrayLike) {
    const array = [];

    Array.prototype.forEach.call(arrayLike, (item) => array.push(item));

    return array;
}
