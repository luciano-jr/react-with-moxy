export default (loadComponent) => [
    {
        path: 'internal-error',
        component: __DEV__ && require('./internal-error/InternalError').default,
        getComponent: () => loadComponent(import('./internal-error/InternalError')),
    },
    {
        path: '*',
        component: __DEV__ && require('./not-found/NotFound').default,
        getComponent: () => loadComponent(import('./not-found/NotFound')),
    },
];
