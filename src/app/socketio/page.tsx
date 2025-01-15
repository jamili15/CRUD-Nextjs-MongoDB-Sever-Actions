"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Home() {
  // Initialize with default values to match server render
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [serverMessage, setServerMessage] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      // Listen for transport upgrades
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    // Listen for connection events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Listen for "hello" message from server
    socket.on("hello", (msg) => {
      setServerMessage(msg);
    });

    // Listen for "helloResponse" from server
    socket.on("helloResponse", (msg) => {
      console.log("Server response:", msg);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello");
      socket.off("helloResponse");
    };
  }, []);

  // Function to send "hello" message to server
  const sendHello = () => {
    const message = "Hello World from Client!";
    socket.emit("hello", message);
    setClientMessage(message);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Socket.IO with Next.js</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <p>Transport: {transport}</p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={sendHello} disabled={!isConnected}>
          Send "Hello" to Server
        </button>
      </div>
      {clientMessage && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Client Sent:</strong> {clientMessage}
        </div>
      )}
      {serverMessage && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Server Says:</strong> {serverMessage}
        </div>
      )}
    </div>
  );
}
