import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('salom')
})

export default {
    router,
    path: '/'
}