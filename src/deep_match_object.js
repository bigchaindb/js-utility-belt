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
export default function deepMatchObject(obj, match,
                                        testFn = (objProp, matchProp) => objProp === matchProp) {
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
