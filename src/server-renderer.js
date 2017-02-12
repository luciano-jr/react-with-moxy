import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import Helmet from 'react-helmet';
import config from 'config';
import App from './App';
import buildRoutes from './pages/buildRoutes';
import renderDocument from '../web/.index.html';

function matchRoute(params) {
    return new Promise((resolve, reject) => {
        // Match against our routes and build the result
        match(params, (error, redirectLocation, renderProps) => {
            if (error) {
                reject(error);
            } else {
                resolve({ redirectLocation, renderProps });
            }
        });
    });
}

// ---------------------------------------------------------

// Build our routes
const routes = {
    path: '/',
    component: App,
    childRoutes: buildRoutes(),
};

export default async function render({ req, res, buildManifest }) {
    // Match req against our routes
    const { redirectLocation, renderProps } = await matchRoute({
        history: createMemoryHistory(),
        routes,
        location: req.url,
    });

    // Is it to redirect?
    if (redirectLocation) {
        return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    // 404? This shouldn't happen because we have a react-router catch all route, but just in case..
    if (!renderProps) {
        return res.status(404).end();
    }

    // Render HTML that goes to into <div id="root"></div>
    const rootHtml = renderToString(
        <RouterContext
            { ...renderProps }
            createElement={ (Component, props) => <Component { ...props } serverContext={ { req, res } } /> } />
    );

    // Render document
    const html = renderDocument({
        head: Helmet.rewind(),
        rootHtml,
        config,
        buildManifest,
    });

    // Send HTML
    res.send(html);
}

export async function renderError({ err, req, res, buildManifest }) {
    // Match req against our routes
    const { redirectLocation, renderProps } = await matchRoute({
        history: createMemoryHistory(),
        routes,
        location: '/internal-error',
    });

    // Is it to redirect?
    if (redirectLocation) {
        return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    // If there's no error page, render a generic one
    if (!renderProps) {
        throw err;
    }

    // Render page that goes to into <div id="root"></div>
    const rootHtml = renderToString(
        <RouterContext
            { ...renderProps }
            createElement={ (Component, props) => <Component { ...props } err={ err } serverContext={ { req, res, err } } /> } />
    );

    // Render document
    const html = renderDocument({
        head: Helmet.rewind(),
        rootHtml,
        config,
        buildManifest,
    });

    // Send HTML
    res.send(html);
}
