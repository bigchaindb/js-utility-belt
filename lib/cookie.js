import Cookie from 'js-cookie';


/**
 * Aliases Cookie.get(). See https://github.com/js-cookie/js-cookie#basic-usage for more info.
 *
 * @param  {string} name Name of the cookie
 * @return {string}      Cookie value
 */
export function getCookie(name) {
    return Cookie.get(name);
}

/**
 * Aliases Cookie.set(). See https://github.com/js-cookie/js-cookie#basic-usage for more info.
 *
 * @param  {string}        name  Name of the cookie
 * @param  {string|object} value Value to set
 * @param  {number}        days  Days to expire
 */
export function setCookie(key, value, days) {
    Cookie.set(key, value, { expires: days });
}
