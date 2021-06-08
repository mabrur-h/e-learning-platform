import HomeRoute from './HomeRoute.js';
import UsersRoute from './UsersRoute.js';
import FileRoute from './FileRoute.js';

export default (app) => {
    app.use(HomeRoute.path, HomeRoute.router);
    app.use(UsersRoute.path, UsersRoute.router);
    app.use(FileRoute.path, FileRoute.router);
}