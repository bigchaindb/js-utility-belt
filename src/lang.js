import browserLocale from 'browser-locale';


/**
 * Gets the current browser's language setting.
 * See browser-locale (https://github.com/maxogden/browser-locale) for more info.
 *
 * @return {string} Current browser language
 */
// Ignore error as we may have more exports in the future
// eslint-disable-next-line import/prefer-default-export
export function getBrowserLang() {
    return browserLocale();
}
