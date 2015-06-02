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
    },

    /*
        Taken from http://stackoverflow.com/a/4795914/1263876
        Behaves like C's format string function

        Does not throw errors though if a argument's type is not 
        matching its template's representative!!!
        This essentially means you can use %d or %s for anything...
    */
    formatText() {
        var args = arguments,
        string = args[0],
        i = 1;
        return string.replace(/%((%)|s|d)/g, function (m) {
            // m is the matched format, e.g. %s, %d
            var val = null;
            if (m[2]) {
                val = m[2];
            } else {
                val = args[i];
                // A switch statement so that the formatter can be extended. Default is %s
                switch (m) {
                    case '%d':
                        val = parseFloat(val);
                        if (isNaN(val)) {
                            val = 0;
                        }
                        break;
                }
                i++;
            }
            return val;
        });
    }
};

export default GeneralUtils;
