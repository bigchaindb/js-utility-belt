/**
 * In general you should look towards using something like Modernizr before adding a feature detect
 * but sometimes you just have to roll your own.
 *
 * PLEASE postfix your function with '-Available', like this:
 *   featureNameAvailable
 */


/**
 * Even though it is not recommended to check (and maintain) the used browser,
 * we're checking the browser's ability to drag and drop with this statement as
 * there is no other way of detecting it another way.
 *
 * See this discussion for clarity:
 *   - https://github.com/Modernizr/Modernizr/issues/57#issuecomment-35831605
 *
 * @return {bool} Is drag and drop available in the current browser
 */
// Ignore error as we may have more exports in the future
// eslint-disable-next-line import/prefer-default-export
export const dragAndDropAvailable = 'draggable' in document.createElement('div') &&
    !/Mobile|Android|Slick\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/i.test(navigator.userAgent);
