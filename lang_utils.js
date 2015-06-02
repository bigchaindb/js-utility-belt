import languages from '../constants/languages';

import { formatText } from './general_utils';

let getLangText = function(s, ...args) {
    let lang = navigator.language || navigator.userLanguage;

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

export default getLangText;