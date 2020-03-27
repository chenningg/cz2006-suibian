import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    const message = "backend test api is called";
    res.json(message);
});

router.get("/display", (req, res) => {
    const message = "backend test display is called";
    res.send(message);
});

export default router;
