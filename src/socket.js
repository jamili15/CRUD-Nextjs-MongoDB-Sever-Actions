// socket.js
import { io } from "socket.io-client";

// Initialize Socket.IO client
export const socket = io("http://localhost:3000", {
    // Optional: Configure options
    autoConnect: true,
});
