'use strict';

// Common configuration goes here
// Configuration that depends on the environment, should go into config-<env>.js
// Infrastructure related configuration should go into parameters.json

const config = {
    env: '',
    baseUrl: '',  // The base url of the website; used in stuff like shares
    publicPath: '/',  // The webpack public path

    routesToPrefetch: ['about'],  // Array of routes to prefetch, see https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
    googleTrackingId: '',  // Used for Google Analytics and other google services
};

module.exports = config;
