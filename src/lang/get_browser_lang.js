import browserLocale from 'browser-locale';


/**
 * Gets the current browser's language setting.
 * See browser-locale (https://github.com/maxogden/browser-locale) for more info.
 *
 * @return {string} Current browser language
 */
export default function getBrowserLang() {
    return browserLocale();
}
