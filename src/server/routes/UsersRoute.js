import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get('/', AuthMiddleware, UserController.getData)

router.post('/check-phone', UserController.checkPhone)
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/validate-code', UserController.validateCode)
router.post('/edit', AuthMiddleware, UserController.editPersonalData)

export default {
    router,
    path: '/users'
}