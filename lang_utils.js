import languages from '../constants/languages';

import GeneralUtils from './general_utils';

let getLangText = function(s, ...args) {
    let lang = navigator.language || navigator.userLanguage;

    try {
        if(lang in languages) {
            return GeneralUtils.formatText(languages[lang][s], args);
        } else {
            // just use the english language
            return GeneralUtils.formatText(languages['en-US'][s], args);
        }
    } catch(err) {
        console.error(new Error('Language-string is not in constants file.'));
    }
};

export default getLangText;