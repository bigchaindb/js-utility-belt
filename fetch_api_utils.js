'use strict';

import { sanitize } from './general_utils';

// TODO: Create Unittests that test all functions

    /**
     * Takes a key-value object of this form:
     *
     *  {
     *     'page': 1,
     *     'pageSize': 10
     *  }
     *
     * and converts it to a query-parameter, which you can append to your URL.
     * The return looks like this:
     *
     * ?page=1&page_size=10
     *
     * CamelCase gets converted to snake_case!
     *
     */
export function argsToQueryParams(obj) {

    obj = sanitize(obj);

    return Object
            .keys(obj)
            .map((key, i) => {
                let s = '';

                if(i === 0) {
                    s += '?';
                } else {
                    s += '&';
                }

                let snakeCaseKey = key.replace(/[A-Z]/, (match) => '_' + match.toLowerCase());

                return s + snakeCaseKey + '=' + encodeURIComponent(obj[key]);
            })
            .join('');
}

/**
 * Takes a string and a boolean and generates a string query parameter for
 * an API call.
 */
export function generateOrderingQueryParams(orderBy, orderAsc) {
    let interpolation = '';

    if(!orderAsc) {
        interpolation += '-';
    }

    return interpolation + orderBy;
}

export function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.json());
}
