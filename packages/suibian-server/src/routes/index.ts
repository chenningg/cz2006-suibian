import express from "express";
import path from "path";
import roomRouter from "./room";
import testRouter from "./testRouter";
const router = express.Router();

router.use("/api/room", roomRouter);
router.use("/api/test", testRouter);
router.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname + "/../../../suibian-app/public/index.html")
    );
});

export default router;
