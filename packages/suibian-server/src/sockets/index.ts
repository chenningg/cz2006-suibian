import express from "express";
import socketio from "socket.io";
import { joinRoom, createRoom, closeRoom, startRoom } from "./helper/room";
import {
    suibianSocket,
    joinRoomPayload,
    roomPayloadBase,
    createRoomPayload,
} from "@suibian/commons";
import { broadcastRoom } from "./helper/messaging";
const http = require("http");

export default {
    startSocketServer: function (app: express.Router) {
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

            socket.on("closeRoom", (data: roomPayloadBase) => {
                const { roomCode } = data;
                closeRoom(io, socket, roomCode);
            });

            socket.on("createRoom", async (data: createRoomPayload) => {
                //first user creates a room and also joins the room
                let { username, isOwner } = data.user;
                //set isOwner to true
                isOwner = true;
                const roomCode = await createRoom(socket);
                if (roomCode) {
                    const roomPayload = {
                        roomCode,
                        user: {
                            username,
                            isOwner
                        }
                    };
                    await joinRoom(socket, io, roomPayload);
                }
            });

            socket.on("startRoom", async (data: roomPayloadBase) => {
                const { roomCode } = data;
                const foodArray = await startRoom(io, roomCode);
                broadcastRoom(io, { roomCode, payload: foodArray }, "startRoom");
            });

            socket.on("getRoomInfo", (data: roomPayloadBase) => { });
        });

        return httpServer;
    }
};
