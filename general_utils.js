// TODO: Create Unittests that test all functions

export function sanitize(obj) {
    Object
        .keys(obj)
        .map((key) => {
            // By matching null with a double equal, we can match undefined and null
            // http://stackoverflow.com/a/15992131
            if(obj[key] == null || obj[key] === '') {
                delete obj[key];
            }
        });

    return obj;
};

/**
 * Returns the values of an object.
 */
export function valuesOfObject(obj) {
    return Object
            .keys(obj)
            .map(key => obj[key]);
};

/**
 * Sums up a list of numbers. Like a Epsilon-math-kinda-sum...
 */
export function sumNumList(l) {
    let sum = 0;
    l.forEach((num) => sum += parseFloat(num) || 0);
    return sum;
};

/*
    Taken from http://stackoverflow.com/a/4795914/1263876
    Behaves like C's format string function
*/
export function formatText() {
    var args = arguments,
    string = args[0],
    i = 1;
    return string.replace(/%((%)|s|d)/g, function (m) {
        // m is the matched format, e.g. %s, %d
        var val = null;
        if (m[2]) {
            val = m[2];
        } else {
            val = args[i];
            // A switch statement so that the formatter can be extended. Default is %s
            switch (m) {
                case '%d':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
            }
            i++;
        }
        return val;
    });
};

/**
 * Takes a list of object and merges their keys to one object.
 * Uses mergeOptions for two objects.
 * @param  {[type]} l [description]
 * @return {[type]}   [description]
 */
export function mergeOptions(...l) {
    let newObj = {};

    for(let i = 1; i < l.length; i++) {
        newObj = _mergeOptions(newObj, _mergeOptions(l[i-1], l[i]));
    }

    return newObj;
};

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 * Taken from: http://stackoverflow.com/a/171256/1263876
 */
function _mergeOptions(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};
