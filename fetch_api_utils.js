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
     * 
     * @param  {[type]}
     * @return {[type]}
     */
    argsToQueryParams(obj) {
        return Object
                .keys(obj)
                .map((key, i) => {
                    let s = '';

                    if(i === 0) {
                        s += '?';
                    } else {
                        s += '&';
                    }

                    return s + key + '=' + obj[key];
                })
                .join('');
    }
};

export default FetchApiUtils;