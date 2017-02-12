'use strict';

const reduce = require('lodash/reduce');

function parseWebpackStats(stats) {
    stats = stats.toJson();

    // Gather assets
    const assets = reduce(stats.assetsByChunkName, (aggregatedAssets, assets) => {
        assets = Array.isArray(assets) ? assets : [assets];
        assets.forEach((asset) => {
            const key = asset.replace(/\.[a-z0-9]{15,32}(\.[a-z0-9]+)$/, '$1');  // Remove hash

            aggregatedAssets[key] = stats.publicPath + asset;
        });

        return aggregatedAssets;
    }, {});

    // Gather chunks
    const routes = stats.chunks
    .reduce((routes, chunk) => {
        if (!chunk.entry && chunk.origins) {
            chunk.origins.some((origin) => {
                const match = origin.module.match(/src\/pages\/([a-z][a-z-_/]+)\/index\.js$/);

                if (match) {
                    routes[match[1]] = stats.publicPath + chunk.files[0];
                }

                return match;
            });
        }

        return routes;
    }, {});

    return {
        assets,
        routes,
    };
}

module.exports = parseWebpackStats;
