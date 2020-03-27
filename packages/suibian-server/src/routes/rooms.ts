import express from "express";
import path from "path";
import Room from "../models/Rooms";
const router = express.Router();

// router.post("/add", (req, res) => {
//   // Placeholder data
//   const data = {
//     RoomCode: "ABC",
//     roomStatus: "VOTING",
//     numberParticipants: 5,
//     roomCreationTime: "13:45"
//   };

//   let { RoomCode, roomStatus, numberParticipants, roomCreationTime } = data;

//   Room.create({
//     RoomCode,
//     roomStatus,
//     numberParticipants,
//     roomCreationTime
//   });
// });

// export default router;
