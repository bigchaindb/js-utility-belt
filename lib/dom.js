/**
 * Get the current scroll position of the window.
 * Adapted from recommendation by Mozilla:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
 *
 * @return {object} position   Object containing the x and y scrolls
 * @return {number} position.x Horizontal scroll from the left
 * @return {number} position.y Vertical scroll from the top
 */
// Ignore error as we may have more exports in the future
// eslint-disable-next-line import/prefer-default-export
export function getScrollPosition() {
    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

    if (supportPageOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    } else if (isCSS1Compat) {
        return {
            x: document.documentElement.scrollLeft,
            y: document.documentElement.scrollTop
        };
    } else {
        return {
            x: document.body.scrollLeft,
            y: document.body.scrollTop
        };
    }
}
