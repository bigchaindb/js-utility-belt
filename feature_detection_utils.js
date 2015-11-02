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