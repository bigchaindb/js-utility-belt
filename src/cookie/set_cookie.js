import Cookie from 'js-cookie';


/**
 * Aliases Cookie.set(). See https://github.com/js-cookie/js-cookie#basic-usage for more info.
 *
 * @param  {string}        name  Name of the cookie
 * @param  {string|object} value Value to set
 * @param  {number}        days  Days to expire
 */
export default function setCookie(key, value, days) {
    Cookie.set(key, value, { expires: days });
}
