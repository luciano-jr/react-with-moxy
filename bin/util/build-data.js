'use strict';

const path = require('path');
const reduce = require('lodash/reduce');
const _merge = require('lodash/merge');

function fromWebpackStats(stats) {
    stats = stats.toJson();

    // Gather assets
    const assets = reduce(stats.assetsByChunkName, (aggregatedAssets, assets) => {
        assets = Array.isArray(assets) ? assets : [assets];
        assets.forEach((asset) => {
            const key = asset.replace(/\.[a-z0-9]{15,32}(\.[a-z0-9]+)$/, '$1');  // Remove hash

            aggregatedAssets[key] = path.join(stats.publicPath, asset);
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
                    routes[match[1]] = path.join(stats.publicPath, chunk.files[0]);
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

function merge(serverBuildData, clientBuildData) {
    // No fancy merging for now..
    return _merge(serverBuildData, clientBuildData);
}

module.exports = {
    fromWebpackStats,
    merge,
};
