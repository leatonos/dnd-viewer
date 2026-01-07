"use client"; // for Next.js 13+ app directory

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import Character from "./character";
import { CharacterInfo, RoomInfo } from "@/app/types";
import dynamic from "next/dynamic";
import {AnimatePresence} from "motion/react"; 

let socket: Socket;

type RoomClientProps = {
  roomId: string;
};

const PartyContainer = styled.div<{ $bgColor?: string }>`
  padding: 20px;
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap:20px;
  background: ${(props) => props.$bgColor || "#222"};
  box-sizing: border-box;
  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: column;
  }`;

function RoomClient({roomId}: RoomClientProps) {
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

    socket.on('room_updated',(data)=>{
      console.log(data)
      setRoomBgColor(data.room_bg)
    })

    socket.on("character_deleted", (deletedCharacter: string) => {
      setCharacters(prev => prev.filter(character => character.char_id !== deletedCharacter));
    });
    
    socket.on("character_updated",(updatedChar:CharacterInfo)=>{
      setCharacters((prevChars)=> prevChars.map((char)=> char.char_id === updatedChar.char_id ? updatedChar : char ));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <PartyContainer $bgColor={roomBgColor}>
      <AnimatePresence>
        {characters.map((char) => (
          <Character key={char.char_id} char={char} />
        ))}
      </AnimatePresence>
    </PartyContainer>

  );
}

export default dynamic(() => Promise.resolve(RoomClient), {
  ssr: false,
});

