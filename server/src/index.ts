import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`)
    })
})

server.listen(3000, () => {
    console.log('Server running on port 3000');
})