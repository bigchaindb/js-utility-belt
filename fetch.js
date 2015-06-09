'use strict';

import { default as _fetch } from 'isomorphic-fetch';

import { argsToQueryParams } from '../utils/fetch_api_utils';


class UrlMapError extends Error {}
class ServerError extends Error {}
class APIError extends Error {}


class Fetch {
    _merge(defaults, options) {
        let merged = {};
        for (let key in defaults) {
            merged[key] = defaults[key];
        }
        for (let key in options) {
            merged[key] = options[key];
        }
        return merged;
    }

    unpackResponse(response) {
        if (response.status >= 500) {
            throw new ServerError();
        }
        return response.text();
    }

    handleFatalError(err) {
        this.fatalErrorHandler(err);
        throw new ServerError(err);
    }

    handleAPIError(json) {
        if (!json.success) {
            let error = new APIError();
            error.json = json;
            throw error;
        }
        return json;
    }

    getUrl(url) {
        let name = url;
        if (!url.match(/^http/)) {
            url = this.urlMap[url];
            if (!url) {
                throw new UrlMapError(`Cannot find a mapping for "${name}"`);
            }
        }
        
        return url;
    }

    prepareUrl(url, params, attachParamsToQuery) {
        let newUrl = this.getUrl(url);
        let re = /\${(\w+)}/g;

        newUrl = newUrl.replace(re, (match, key) => {
            let val = params[key];
            if (!val) {
                throw new Error(`Cannot find param ${key}`);
            }
            delete params[key];
            return val;
        });

        if (attachParamsToQuery && params && Object.keys(params).length > 0) {
            newUrl += argsToQueryParams(params);
        }

        return newUrl;
    }

    request(verb, url, options) {
        options = options || {};
        let merged = this._merge(this.httpOptions, options);
        merged.method = verb;
        return _fetch(url, merged)
                    .then(this.unpackResponse)
                    .then(JSON.parse)
                    .catch(this.handleFatalError.bind(this))
                    .then(this.handleAPIError);
    }

    get(url, params) {
        let paramsCopy = this._merge(params);
        let newUrl = this.prepareUrl(url, paramsCopy, true);
        return this.request('get', newUrl);
    }

    post(url, params) {
        let paramsCopy = this._merge(params);
        let newUrl = this.prepareUrl(url, paramsCopy);
        let body = null;

        if (paramsCopy && paramsCopy.body) {
            body = JSON.stringify(paramsCopy.body);
        }
        return this.request('post', newUrl, { body });
    }

    defaults(options) {
        this.httpOptions = options.http || {};
        this.urlMap = options.urlMap || {};
        this.fatalErrorHandler = options.fatalErrorHandler || (() => {});
    }
}


let fetch = new Fetch();

export default fetch;
