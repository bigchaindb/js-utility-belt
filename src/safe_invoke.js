/**
 * Safely invoke a given function with the given args by first checking if `fn` is actually a
 * function before invoking it.
 *
 * Has two call signatures:
 *   1. safeInvoke({
 *          fn:      Function to invoke,
 *          context: Context to invoke function with
 *          params:  Array of params or function for lazily computing parameters,
 *          error:   Error to throw if function not invoked
 *      });
 *   2. safeInvoke(fn, param1, param2, param3, ...);
 *
 * The second signature is a simplified one for general usage where you just want to execute a
 * function if it exists with the given params.
 *
 * @param  {object}         options
 * @param  {any}            options.fn           Function to invoke
 * @param  {any}            options.context      Context to invoke function with
 * @param  {array|function} options.params       Arguments to be passed into the function.
 *                                               If this is a function, the resulting array of the
 *                                               function will be passed as params into the function.
 * @param  {function}       options.onNotInvoked Function to be called if the `fn` is not invoked.
 *                                               Convenience option to not have to check the
 *                                               result's `invoked` property.
 * @return {object}                              Returns object specifying:
 *                                                 result - the result of the function (if invoked)
 *                                                 invoked - whether or not the function was invoked
 */
export default function safeInvoke(fnOrConfig, ...paramsForFn) {
    let config;

    if (fnOrConfig && fnOrConfig.hasOwnProperty('fn')) {
        // First param is a config object (first call signature)
        config = fnOrConfig;
    } else {
        // First param was not a config object, so we assume it's the second call signature and
        // turn it into a config object
        config = {
            fn: fnOrConfig,
            params: paramsForFn
        };
    }

    return safeInvokeForConfig(config);
}

/**
 * Abstraction for safeInvoke's two call signatures
 */
function safeInvokeForConfig({ fn, context, params, onNotInvoked }) {
    if (typeof fn === 'function') {
        let fnParams = params;
        if (typeof params === 'function') {
            fnParams = params();
        }

        // Warn if params or lazily evaluated params were given but not in an array
        if (fnParams != null && !Array.isArray(fnParams)) {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn("Params to pass into safeInvoke's fn is not an array. Ignoring...",
                             fnParams);
            }

            fnParams = null;
        }

        return {
            invoked: true,
            result: fn.apply(context, fnParams)
        };
    } else {
        if (typeof onNotInvoked === 'function') {
            onNotInvoked();
        }

        return { invoked: false };
    }
}
