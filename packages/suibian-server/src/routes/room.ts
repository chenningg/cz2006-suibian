import express from "express";
import path from "path";
const router = express.Router();

router.post("/:roomnumber", (req, res) => {
    console.log(req.params);
});

export default router;
