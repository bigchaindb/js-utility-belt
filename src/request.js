/**
 * Global fetch wrapper that adds some basic error handling.
 * Expects fetch to already be available (either bundled through webpack or a polyfill).
 *
 * @param  {string}  url    Url to request
 * @param  {object}  config Fetch config (see https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters)
 * @return {Promise}        Promise that will resolve with the response if its status was 2xx;
 *                          otherwise rejects with the response
 */
export default function request(url, config) {
    return fetch(url, config)
        .then((res) => {
            // If status is not a 2xx, assume it's an error
            if (!(res.status >= 200 && res.status <= 300)) {
                throw res;
            }
            return res;
        });
}
