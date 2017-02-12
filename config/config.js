'use strict';

// Common configuration goes here
// Configuration that depends on the environment, should go into config-<env>.js
// Infrastructure related configuration should go into parameters.json

const config = {
    env: '',
    baseUrl: '',  // The base url of the website; used in stuff like shares
    publicPath: '/',  // the webpack public path
    googleTrackingId: '',  // Used for Google Analytics and other google services

    routesToPrefetch: ['about'],  // Array of routes to prefetch, see web/.index.html.js
};

module.exports = config;
