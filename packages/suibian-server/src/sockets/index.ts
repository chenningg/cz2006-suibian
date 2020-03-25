import express from "express";
import socketio from "socket.io";
import {
    joinRoom,
    broadcastRoom,
    createRoom,
    getRoomInfo,
    closeRoom
} from "./room";
import {
    suibianSocketServer,
    joinRoomPayload,
    roomMessagePayload
} from "@suibian/commons";
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

            socket.on("closeRoom", (roomcode: string) => {
                closeRoom(io, roomcode);
            });

            socket.on("broadcastMessage", (data: roomMessagePayload) => {
                broadcastRoom(io, data);
            });

            socket.on("createRoom", (data: { username: string }) => {
                createRoom(socket);
                console.log(io.sockets.adapter.rooms);
            });

            socket.on("startRoom", (data: roomMessagePayload) => {
                // startRoom();
            });

            socket.on("getRoomInfo", (data: { roomcode: string }) => {
                getRoomInfo(socket, io, data);
            });
        });

        return httpServer;
    }
};
