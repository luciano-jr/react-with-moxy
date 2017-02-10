import nprogress from 'nprogress';
import homeRoutes from './home';
import aboutRoutes from './about';

async function loadComponent(promise) {
    let Component;

    // Start growing the loading bar
    nprogress.start();

    try {
        Component = await promise;
    } finally {
        // We are done loading!
        nprogress.done();
    }

    return Component.default;
}

// -----------------------------------------------------

export default function buildRoutes() {
    return [
        ...homeRoutes(loadComponent),
        ...aboutRoutes(loadComponent),
    ];
}
