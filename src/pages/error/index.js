export default (loadComponent) => [
    {
        path: 'internal-error',
        getComponent(nextState, callback) {
            // When developing, we need to return synchornously for hot-module reload to work
            if (__DEV__) {
                return callback(null, require('./internal-error/InternalError').default);
            }

            return loadComponent(import('./internal-error/InternalError'));
        },
    },
    {
        path: '*',
        getComponent(nextState, callback) {
            // When developing, we need to return synchornously for hot-module reload to work
            if (__DEV__) {
                return callback(null, require('./not-found/NotFound').default);
            }

            return loadComponent(import('./not-found/NotFound'));
        },
    },
];
