import languages from '../constants/languages';

import { formatText } from './general_utils';

/**
 * Is used to translate strings to another language. Basically can be used with C's string format method.
 * @param  {string}    s        The string you want to translate
 * @param  {array} args         An array of arguments (essentially JavaScript's this.arguments) that can be used to substitute digits and other strings
 * @return {string}             The formated string
 */
export function getLangText(s, ...args) {
    let lang = navigator.language || navigator.userLanguage;
    // this is just for testing, as changing the navigator.language wasn't possible
    lang = 'de';
    try {
        if(lang in languages) {
            return formatText(languages[lang][s], args);
        } else {
            // just use the english language
            return formatText(languages['en-US'][s], args);
        }
    } catch(err) {
        if(!(s in languages[lang])) {
            console.error(new Error('Language-string is not in constants file. Add: "' + s + '" to the "' + lang + '" language file.'));
        } else {
            console.error(err);
        }
        
    }
};