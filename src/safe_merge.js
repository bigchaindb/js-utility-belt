/**
 * Takes a list of object and safely merges their properties into a new object.
 * Throws if any of the objects contain a duplicate key that is also in another object.
 * Does not modify the given objects.
 * @param  {...Object} l Any number of objects to merge
 * @return {Object}      Merged object
 */
export default function safeMerge(...l) {
    // If the objects submitted in the list have duplicates in their key names,
    // abort the merge and tell the function's user to check his objects.
    if (doesObjectListHaveDuplicates(l)) {
        throw new Error('The objects you submitted for merging have duplicates. Merge aborted.');
    }

    return Object.assign({}, ...l);
}

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
