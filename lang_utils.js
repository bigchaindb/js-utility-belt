import languages from '../constants/languages';
import template from 'lodash.template';

let getText = function(s, ...args) {
    let lang = navigator.language || navigator.userLanguage;
    try {
        if(lang in languages) {
            return languages[lang][s];
        } else {
            // just use the english language
            return languages['en-US'][s];
        }
    } catch(err) {
        console.error(err);
    }
};

export default getText;