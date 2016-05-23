export function getLang() {
    // this is just for testing, as changing the navigator.language wasn't possible
    // return 'fr';
    return navigator.languages ? navigator.languages[0] :
                                 (navigator.language || navigator.userLanguage);
}
