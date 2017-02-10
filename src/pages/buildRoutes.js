import homeRoutes from './home';
import aboutRoutes from './about';

export default function buildRoutes() {
    return [
        ...homeRoutes,
        ...aboutRoutes,
    ];
}
