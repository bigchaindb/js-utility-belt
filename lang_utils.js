import languages from '../constants/languages';

import { formatText } from './general_utils';

export function getLangText(s, ...args) {
    let lang = navigator.language || navigator.userLanguage;
    // this is just for testing, as changing the navigator.language wasn't possible
    //lang = 'de';
    try {
        if(lang in languages) {
            return formatText(languages[lang][s], args);
        } else {
            // just use the english language
            return formatText(languages['en-US'][s], args);
        }
    } catch(err) {
        if(!(s in languages[lang])) {
            console.error(new Error('Language-string is not in constants file for string: ' + s));
        } else {
            console.error(err);
        }
        
    }
};