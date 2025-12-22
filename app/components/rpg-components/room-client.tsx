"use client"; // for Next.js 13+ app directory

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import Character from "./character";
import { BoxStyle, CharacterInfo } from "@/app/types";

let socket: Socket;


  const PartyContainer = styled.div<{$boxStyle?: BoxStyle}>`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${props => props.$boxStyle?.backgroundColor || "#222"};
  box-sizing: border-box;

  /* Default (landscape: width > height) */
  flex-direction: row;

  /* Portrait (height > width) */
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;


export default function RoomClient() {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [roomStyle, setRoomStyle] = useState<BoxStyle>({ backgroundColor: "white", textColor: "#fff" });
  
  useEffect(() => {
    socket = io("http://localhost:5000"); // connect to your Python backend

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

  const charExampleStyle: BoxStyle = { backgroundColor: "green", textColor: "#fff" };

  return (
      <PartyContainer $boxStyle={roomStyle}>
        <Character char={{ charKey: "1", name: "Hero", maxHP: 100, currentHP: 100, maxMP: 50, currentMP: 30 , charStyle: charExampleStyle }} />
        <Character char={{ charKey: "2", name: "Mage", maxHP: 80, currentHP: 60, maxMP: 100, currentMP: 90, charStyle: charExampleStyle }} />
        <Character char={{ charKey: "3", name: "Rogue", maxHP: 90, currentHP: 70, maxMP: 60, currentMP: 40, charStyle: charExampleStyle }} />
      </PartyContainer>
  );
}
