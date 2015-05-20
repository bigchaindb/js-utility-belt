import GeneralUtils from './general_utils';


// TODO: Create Unittests that test all functions
let FetchApiUtils = {

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
    argsToQueryParams(obj) {

        obj = GeneralUtils.sanitize(obj);

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
};

export default FetchApiUtils;
