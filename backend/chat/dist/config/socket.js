import { Server, Socket } from 'socket.io';
import http from 'http';
import express from 'express';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    const userId = socket.handshake.query.userId;
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
    socket.on("connect_error", (error) => {
        console.log("Socket connection Error", error);
    });
});
export { app, server, io };
//# sourceMappingURL=socket.js.map