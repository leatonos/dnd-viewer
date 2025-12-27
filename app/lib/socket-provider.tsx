// socket-provider.tsx
"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./socket-context";



export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });
  }

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
