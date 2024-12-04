import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './router';
import db from './models';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; 

const app = express();

//creating server for online comunication
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
}); 

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        name: 'rovix',
        secret: '123456789',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
        proxy: true,
    })
);

app.use('/users', userRouter);

const port = 3000;

const rooms: { [key: string]: { player1: string | null; player2: string | null } } = {};

// Socket connection
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Join match
    socket.on('join_match', (data) => {
        try {
            const room = data?.room; // Safely access room property
            let roomName = room || Object.keys(rooms).find((roomKey) => rooms[roomKey]?.player2 === null);
    
            if (!roomName) {
                roomName = `room_${socket.id}`;
                rooms[roomName] = { player1: socket.id, player2: null };
            } else if (rooms[roomName] && rooms[roomName].player2 === null) {
                rooms[roomName].player2 = socket.id;
            } else if (!rooms[roomName]) {
                rooms[roomName] = { player1: socket.id, player2: null }; // Create new named room
            } else {
                socket.emit('error', { message: "Room is full or invalid." });
                return;
            }
    
            socket.join(roomName);
            console.log(`Player ${socket.id} joined room: ${roomName}`);
    
            if (rooms[roomName].player1 && rooms[roomName].player2) {
                io.to(roomName).emit('match_ready', { room: roomName });
                console.log(`Match started in room: ${roomName}`);
            } else {
                socket.emit('waiting_for_player');
            }
        } catch (error) {
            console.error("Error handling join_match event:", error);
            socket.emit('error', { message: "An error occurred while joining the match." });
        }
    });

    // Handle player actions
    socket.on('game_action', ({ room, action }) => {
        socket.to(room).emit('update_game', { action });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        for (const [roomName, room] of Object.entries(rooms)) {
            if (room.player1 === socket.id || room.player2 === socket.id) {
                io.to(roomName).emit('player_disconnected');
                delete rooms[roomName];
                console.log(`Room ${roomName} closed`);
                break;
            }
        }
    });
});



db.sequelize
    .sync()
    .then(() => {
        server.listen(port, () => { 
            console.log(`Server running on http://127.0.0.1:${port}`);
        });
    })
    .catch((error: any) => console.error('Failed to sync DB: ', error));
