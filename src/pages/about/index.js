export default (loadComponent) => [
    {
        path: 'about',
        getComponent: () => loadComponent(import('./About')),
    },
];
