import express from "express";
import path from "path";
const router = express.Router();

router.get("/api/test", (req, res) => {
    const message = "backend test is called";
    res.json(message);
});

router.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname + "/../../../suibian-app/public/index.html")
    );
});

export default router;
