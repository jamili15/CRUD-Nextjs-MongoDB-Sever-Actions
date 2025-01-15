import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    // Create HTTP server with Next.js handler
    const httpServer = createServer(handler);

    // Initialize Socket.IO server
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Adjust as necessary for security
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Emit a "hello" message to the client upon connection
        socket.emit("hello", "Hello World from Server!");

        // Listen for "hello" messages from the client
        socket.on("hello", (msg) => {
            console.log("Received from client:", msg);
            // Optionally, send a response back
            socket.emit("helloResponse", `Server received: ${msg}`);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    // Start the server
    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, hostname, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
