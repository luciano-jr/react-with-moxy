export default [
    {
        path: 'about',
        getComponent() {
            return import('./About').then((module) => module.default);
        },
    },
];
