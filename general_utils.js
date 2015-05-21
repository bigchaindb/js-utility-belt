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
                if(obj[key] == null || obj[key] === '') {
                    delete obj[key];
                }
            });

        return obj;
    },

    /**
     * Returns the values of an object.
     */
    valuesOfObject(obj) {
        return Object
                .keys(obj)
                .map(key => obj[key]);
    },

    /**
     * Sums up a list of numbers. Like a Epsilon-math-kinda-sum...
     */
    sumNumList(l) {
        let sum = 0;
        l.forEach((num) => sum += parseFloat(num) || 0);
        return sum;
    }
};

export default GeneralUtils;
