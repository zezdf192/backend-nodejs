import express from 'express';
import { getHomePage } from '../controller/homeController';
import { handleLogin } from '../controller/userController';

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', getHomePage);

    router.post('/api/v1/login', handleLogin);

    return app.use('/', router);
};

export default initWebRoute;
