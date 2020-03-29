import express from "express";
import socketio from "socket.io";
import { joinRoom, createRoom, closeRoom, startRoom } from "./helper/room";
import { broadcastRoom } from "./helper/messaging";
import {
  suibianSocket,
  joinRoomPayload,
  roomMessagePayload
} from "@suibian/commons";
const http = require("http");

export default {
  startSocketServer: function(app: express.Router) {
    const httpServer = http.Server(app);
    const io = socketio.listen(httpServer);

    io.on("connection", (socket: suibianSocket) => {
      console.log(`socket ${socket.id} connected`);

      socket.on("disconnect", () =>
        console.log(`socket ${socket.id} disconnected`)
      );

      socket.on("joinRoom", async (data: joinRoomPayload) => {
        await joinRoom(socket, io, data);
      });

      socket.on("closeRoom", (data: { roomCode: string }) => {
        const { roomCode } = data;
        closeRoom(io, socket, roomCode);
      });

      socket.on("createRoom", async (data: { username: string }) => {
        //first user creates a room and also joins the room
        const { username } = data;
        const roomCode = await createRoom(socket);
        if (roomCode) {
          await joinRoom(socket, io, { username, roomCode });
        }
      });

      socket.on("startRoom", (data: { roomCode: string }) => {
        const { roomCode } = data;
        startRoom(io, roomCode);
      });

      socket.on("getRoomInfo", (data: { roomCode: string }) => {});
    });

    return httpServer;
  }
};
