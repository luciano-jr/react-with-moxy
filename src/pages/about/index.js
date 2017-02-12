export default (loadComponent) => [
    {
        path: 'about',
        component: __DEV__ && require('./About').default,
        getComponent: () => loadComponent(import('./About')),
    },
];
