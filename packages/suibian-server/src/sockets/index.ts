import express from "express";
import socketio from "socket.io";
import {
    joinRoom,
    createRoom,
    getRoomInfo,
    closeRoom,
    startRoom
} from "./room";
import { broadcastRoom } from "./messaging";
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

            socket.on("joinRoom", (data: joinRoomPayload) => {
                joinRoom(socket, io, data);
            });

            socket.on("closeRoom", (data: { roomcode: string }) => {
                const { roomcode } = data;
                closeRoom(io, socket, roomcode);
            });

            socket.on("broadcastMessage", (data: roomMessagePayload) => {
                broadcastRoom(io, data);
            });

            socket.on("createRoom", (data: { username: string }) => {
                createRoom(socket);
                console.log(io.sockets.adapter.rooms);
            });

            socket.on("startRoom", (data: { roomcode: string }) => {
                const { roomcode } = data;
                startRoom(io, roomcode);
            });

            socket.on("getRoomInfo", (data: { roomcode: string }) => {
                getRoomInfo(io, data);
            });
        });

        return httpServer;
    }
};
