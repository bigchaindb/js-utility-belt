// TODO: Create Unittests that test all functions

let GeneralUtils = {
    /**
     * Removes undefined and null values from an key-value object.
     */
    sanitize(obj) {
        Object
            .keys(obj)
            .map((key) => {
                // By matching null with a double equal, we can match undefined and null
                // http://stackoverflow.com/a/15992131
                if(obj[key] == null) {
                    delete obj[key];
                }
            });

        return obj;
    }
};

export default GeneralUtils;