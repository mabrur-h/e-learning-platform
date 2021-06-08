import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import FileController from "../controllers/FileController.js";
import fileUpload from 'express-fileupload';
import path from "path";

let __dirname = path.resolve(path.dirname(''));

const router = express.Router();

router.use(AuthMiddleware);

const options = {
    safeFileNames: true
}
    router.use('/get', express.static(path.join(__dirname, "src", "server", "public", "files")))

    router.post('/create', fileUpload("file", options), FileController.createFile)

export default {
    router,
    path: '/file'
}