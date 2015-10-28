'use strict';

/**
 * PLEASE
 *
 * postfix your function with '-Available'.
 *
 * Like this:
 *
 * featureNameAvailable
 *
 */


/**
 * Even though it is not recommended to check (and maintain) the used browser,
 * we're checking the browser's ability to drag and drop with this statement as
 * there is no other way of detecting it another way.
 *
 * See this discussion for clarity:
 *     - https://github.com/Modernizr/Modernizr/issues/57#issuecomment-35831605
 *
 * @type {bool} Is drag and drop available on this browser
 */
export const dragAndDropAvailable = 'draggable' in document.createElement('div') &&
    !/Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);

/**
 * Function that detects whether localStorage/sessionStorage is both supported
 * and available.
 * Taken from:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 *
 * We're explicitly NOT exporting this function, as we want for both localStorage, as well as
 * sessionStorage proxy functions to be exported.
 *
 * @param  {oneOfType(['localStorage', 'sessionStorage'])}
 * @return {bool}      Is localStorage or sessionStorage available on this browser
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

/**
 * Function detects whether sessionStorage is both supported
 * and available.
 * @return {bool} Is sessionStorage available on this browser
 */
export function sessionStorageAvailable() {
    return storageAvailable('sessionStorage');
}

