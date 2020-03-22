import * as dotenv from "dotenv-extended";
import express from "express";
import router from "./routes";
import path from "path";
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//defining ports
const PORT = process.env.PORT || 4000;
dotenv.load({ errorOnMissing: true, includeProcessEnv: true });

http.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../../suibian-app/public")));
app.use(router);
app.set("socketio", io);

type socketMessage = {
    username: string;
    message: string;
};

io.on("connection", function(socket: any) {
    console.log(Object.keys(io.sockets.sockets));
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("change_username", (data: socketMessage) => {
        socket.username = data.message;
        console.log(`list of all sockets ${Object.keys(io.clients())}`);
        io.sockets.emit("new_user", {
            message: socket.username
        });
        console.log("user emitted");
    });

    socket.on("new_message", (data: socketMessage) =>
        //emits to all clients connected
        io.sockets.emit("new_message", {
            message: data.message,
            username: socket.username
        })
    );
});
