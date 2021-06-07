import HomeRoute from './HomeRoute.js';
import UsersRoute from './UsersRoute.js';

export default (app) => {
    app.use(HomeRoute.path, HomeRoute.router);
    app.use(UsersRoute.path, UsersRoute.router);
}