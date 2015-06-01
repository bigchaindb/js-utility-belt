import languages from '../constants/languages';

let getText = function(s) {
    let lang = navigator.language || navigator.userLanguage;
    if(lang in languages && s in languages[lang]) {
        return languages[lang][s];
    } else {
        throw new Error('Your language is not supported.');
        // How ironic that this error is thrown in the english language...
    }
};

export default getText;