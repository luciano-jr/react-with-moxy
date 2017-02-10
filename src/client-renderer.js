import config from 'config';
import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import nprogress from 'nprogress';
import App from './App';
import buildRoutes from './pages/buildRoutes';

console.info('[client-renderer] App config is', config);

// Track page views for this SPA in Google Analytics
browserHistory.listen((location) => {
    if (window.ga) {
        window.ga('set', 'page', `${location.pathname + location.search}`);
        window.ga('send', 'pageview');
    }
});

// Configure nprogress, see: https://github.com/rstacruz/nprogress
nprogress.configure({ minimum: 0.15, showSpinner: false, speed: 500 });

// Build our routes
const routes = {
    path: '/',
    component: App,
    childRoutes: buildRoutes(),
};

// Render our app!
// Need to use match() because of async routes, see https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md#async-routes
match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    render(
        <Router { ...renderProps } routes={ routes }/>,
        document.getElementById('root'),
    );
});
