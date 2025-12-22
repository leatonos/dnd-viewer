"use client"; // for Next.js 13+ app directory

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function DmClient() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat_message", "Hello from Next.js!");
  };

  return (
    <div className="">
      <button onClick={sendMessage}>Send Message</button>
      
    </div>
  );
}
