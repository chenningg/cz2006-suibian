import express from "express";
import socketio from "socket.io";
import {
    joinRoom,
    joinRoomPayload,
    roomMessagePayload,
    broadcastRoom,
    createRoom
} from "./room";
import { suibianSocketServer } from "@suibian/commons";
const http = require("http");

export default {
    startSocketServer: function(app: express.Router) {
        const httpServer = http.Server(app);
        const io = socketio.listen(httpServer);

        io.on("connection", (socket: suibianSocketServer) => {
            console.log(`socket ${socket.id} connected`);

            socket.on("disconnect", () =>
                console.log(`socket ${socket.id} disconnected`)
            );

            socket.on("joinRoom", (data: joinRoomPayload) => {
                joinRoom(socket, io, data);
            });

            socket.on("broadcastMessage", (data: roomMessagePayload) => {
                broadcastRoom(io, data);
            });

            socket.on("createRoom", (data: { username: string }) => {
                createRoom(socket, data);
                console.log(io.sockets.adapter.rooms);
            });

            socket.on("startRoom", (data: roomMessagePayload) => {
                // startRoom();
            });
        });

        return httpServer;
    }
};
