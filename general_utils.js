'use strict';

/**
 * Takes an object and deletes all keys that are
 *
 * tagged as false by the passed in filter function
 *
 * @param  {object} obj regular javascript object
 * @return {object}     regular javascript object without null values or empty strings
 */
export function sanitize(obj, filterFn) {
    if(!filterFn) {
        // By matching null with a double equal, we can match undefined and null
        // http://stackoverflow.com/a/15992131
        filterFn = (val) => val == null || val === '';
    }

    Object
        .keys(obj)
        .map((key) => {
            if(filterFn(obj[key])) {
                delete obj[key];
            }
        });

    return obj;
}

/**
 * Removes all falsy values (undefined, null, false, ...) from a list/array
 * @param  {array} l the array to sanitize
 * @return {array}   the sanitized array
 */
export function sanitizeList(l) {
    let sanitizedList = [];

    for(let i = 0; i < l.length; i++) {
        if(l[i]) {
            sanitizedList.push(l[i]);
        }
    }

    return sanitizedList;
}

/**
 * Sums up a list of numbers. Like a Epsilon-math-kinda-sum...
 */
export function sumNumList(l) {
    let sum = 0;
    l.forEach((num) => sum += parseFloat(num) || 0);
    return sum;
}

/*
    Taken from http://stackoverflow.com/a/4795914/1263876
    Behaves like C's format string function
*/
export function formatText() {
    let args = arguments,
    string = args[0],
    i = 1;
    return string.replace(/%((%)|s|d)/g, (m) => {
        // m is the matched format, e.g. %s, %d
        let val = null;
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
}

/*
    Checks a list of objects for key duplicates and returns a boolean
 */
function _doesObjectListHaveDuplicates(l) {
    let mergedList = [];

    l = l.map((obj) => {
        if(!obj) {
            throw new Error('The object you are trying to merge is null instead of an empty object');
        }

        return Object.keys(obj);
    });

    // Taken from: http://stackoverflow.com/a/10865042
    // How to flatten an array of arrays in javascript.
    // If two objects contain the same key, then these two keys
    // will actually be represented in the merged array
    mergedList = mergedList.concat.apply(mergedList, l);

    // Taken from: http://stackoverflow.com/a/7376645/1263876
    // By casting the array to a set, and then checking if the size of the array
    // shrunk in the process of casting, we can check if there were any duplicates
    return (new Set(mergedList)).size !== mergedList.length;
}

/**
 * Takes a list of object and merges their keys to one object.
 * Uses mergeOptions for two objects.
 * @param  {[type]} l [description]
 * @return {[type]}   [description]
 */
export function mergeOptions(...l) {
    // If the objects submitted in the list have duplicates,in their key names,
    // abort the merge and tell the function's user to check his objects.
    if(_doesObjectListHaveDuplicates(l)) {
        throw new Error('The objects you submitted for merging have duplicates. Merge aborted.');
    }

    let newObj = {};

    for(let i = 1; i < l.length; i++) {
        newObj = _mergeOptions(newObj, _mergeOptions(l[i - 1], l[i]));
    }

    return newObj;
}

/**
 * Merges a number of objects even if there're having duplicates.
 *
 * DOES NOT RETURN AN ERROR!
 *
 * Takes a list of object and merges their keys to one object.
 * Uses mergeOptions for two objects.
 * @param  {[type]} l [description]
 * @return {[type]}   [description]
 */
export function mergeOptionsWithDuplicates(...l) {
    // If the objects submitted in the list have duplicates,in their key names,
    // abort the merge and tell the function's user to check his objects.
    let newObj = {};

    for(let i = 1; i < l.length; i++) {
        newObj = _mergeOptions(newObj, _mergeOptions(l[i - 1], l[i]));
    }

    return newObj;
}

/**
 * In place update of a dictionary
 */
export function update(a, ...l) {
    for(let i = 0; i < l.length; i++) {
        for (let attrname in l[i]) {
            a[attrname] = l[i][attrname];
        }
    }

    return a;
}

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 * Taken from: http://stackoverflow.com/a/171256/1263876
 */
function _mergeOptions(obj1, obj2) {
    let obj3 = {};
    
    for (let attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (let attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

/**
 * Escape HTML in a string so it can be injected safely using
 * React's `dangerouslySetInnerHTML`
 *
 * @param s the string to be sanitized
 *
 * Taken from: http://stackoverflow.com/a/17546215/597097
 */
export function escapeHTML(s) {
    return document.createElement('div').appendChild(document.createTextNode(s)).parentNode.innerHTML;
}

export function excludePropFromObject(obj, propList){
    let clonedObj = mergeOptions({}, obj);
    for (let item in propList){
        if (clonedObj[propList[item]]){
            delete clonedObj[propList[item]];
        }
    }
    return clonedObj;
}

/**
 * Takes a string and breaks it at the supplied index and replaces it
 * with a (potentially) short string that also has been provided
 * @param  {string} text        The string to truncate
 * @param  {number} charIndex   The char number at which the text should be truncated
 * @param  {String} replacement All text after charIndex will be replaced with this string
 * @return {string}             The truncated text
 */
export function truncateTextAtCharIndex(text, charIndex, replacement = '...') {
    let truncatedText = '';

    truncatedText = text.slice(0, charIndex);
    truncatedText += text.length > charIndex ? replacement : '';

    return truncatedText;
}

/**
 * Extracts the user's subdomain from the browser's window.
 * If no subdomain is found (for example on a naked domain), the default "www" is just assumed.
 * @return {string} subdomain as a string
 */
export function getSubdomain() {
    let { host } = window.location;
    let tokens = host.split('.');
    return tokens.length > 2 ? tokens[0] : 'www';
}


/**
 * Checks if the child DOM node is a descendant of the parent DOM node
 * @return {boolean}
 */
export function isDescendantOfDOMNode(parent, child) {
    let node = child.parentNode;
        while (node != null) {
        if (node === parent) {
            return true;
        }
            node = node.parentNode;
        }
        return false;
}