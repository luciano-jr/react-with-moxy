export default (loadComponent) => [
    {
        path: 'internal-error',
        getComponent: () => loadComponent(import('./internal-error/InternalError')),
    },
    {
        path: '*',
        getComponent: () => loadComponent(import('./not-found/NotFound')),
    },
];
