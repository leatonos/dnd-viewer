"use client";

import { CharacterInfo, RoomInfo } from "@/app/types";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import DMCharacter from "./dm-character";
import { generateRandomString } from "@/app/utils";

let socket: Socket | null = null;

const DmPartyContainer = styled.div<{ $bgColor?: string }>`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.$bgColor || "white"};
  box-sizing: border-box;

  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: column;
  }`;


export default function DmClient() {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState<any | null>(null);


  const dmKey = typeof window !== "undefined" ? localStorage.getItem("dm_key") : null;
  const localRoom = typeof window !== "undefined" ? localStorage.getItem("room_id") : null;

  const new_room_info = () =>{

    const new_room_id = generateRandomString(10);
    const new_dm_key = generateRandomString(12);

    if(dmKey && localRoom){
      console.log("Using existing room info from localStorage");
      return {"room_id":localRoom,"dm_key":dmKey}
    }

    localStorage.setItem("room_id", new_room_id);
    localStorage.setItem("dm_key", new_dm_key);

    return {"room_id":new_room_id,"dm_key":new_dm_key}
  }  

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server");
      createRoom();
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_created", (data) => {
      console.log("Room created:", data);
      setRoomId(data.room_id);
      setRoomInfo(data.room_info);
      setCharacters(data.room_info.characters);
      setConnected(true);
    });

    socket.on("new_character_created",(data)=>{
      console.log("new Character added");
      console.log(data);
      setCharacters((prev)=>[...prev,data]);
    })

    return () => {
      socket?.disconnect();
      socket = null; // Clean up
    };
  }, []);


  const createRoom = () => {
    if (!socket) {console.warn("Socket not connected yet");return;}
    console.log(socket.id)
    socket.emit("create_room", new_room_info());
  }

  const addCharacter = (roomId:string) => {
    console.log("Adding new character...");
    if (!socket) {console.warn("Socket not connected yet");return;}
    socket.emit("create_new_character", roomId);
  }

  return (
    <div>
        <DmPartyContainer>
        {characters.map((char) => (
          <DMCharacter key={char.char_id} char={char} />
        ))}
        <div>
          <p>Room ID: {roomId}</p>
          <p>Status: {connected ? "Connected" : "Disconnected"}</p>
          {roomId && (<button onClick={() => addCharacter(roomId)}>Add Character</button>)}
        </div>
        <div> 
        </div>
        </DmPartyContainer>
    </div>
  );
}
