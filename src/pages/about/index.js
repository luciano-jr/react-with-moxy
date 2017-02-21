export default (loadComponent) => [
    {
        path: 'about',
        getComponent(nextState, callback) {
            // When developing, we need to return synchornously for hot-module reload to work
            if (__DEV__) {
                return callback(null, require('./About').default);
            }

            return loadComponent(import('./About'));
        },
    },
];
