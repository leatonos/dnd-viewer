"use client"; // for Next.js 13+ app directory

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import Character from "./character";
import { CharacterInfo, RoomInfo } from "@/app/types";

let socket: Socket;

type RoomClientProps = {
  roomId: string;
};

const PartyContainer = styled.div<{ $bgColor?: string }>`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.$bgColor || "#222"};
  box-sizing: border-box;
  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: column;
  }`;

export default function RoomClient({roomId}: RoomClientProps) {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [roomBgColor, setRoomBgColor] = useState("white");
  const [roomTextColor, setRoomTextColor] = useState("black");
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join_room", roomId);
    });

    socket.on("new_viewer", (data:RoomInfo) => {
      setRoomInfo(data);
      setCharacters(data.characters);
      setRoomBgColor(data.room_bg || "white");
    });

    socket.on("new_character_created",(data)=>{
      console.log("new Character added");
      console.log(data);
      setCharacters((prev)=>[...prev,data]);
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <PartyContainer $bgColor={roomBgColor}>
      {characters.map((char) => (
        <Character key={char.char_id} char={char} />
      ))}
    </PartyContainer>

  );
}
