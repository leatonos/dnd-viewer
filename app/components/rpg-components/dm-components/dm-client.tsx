"use client";

import { CharacterInfo, RoomInfo } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import DMCharacter from "./dm-character";
import { generateRandomString } from "@/app/utils";
import { SocketContext } from "@/app/lib/socket-context";
import { AnimatePresence } from "motion/react";

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

const CreateCharBtn = styled.button`
  width:20%;
`;

const CreateIcon = styled.img`
  width:100%;
`;


export default function DmClient() {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

  const socketRef = useRef<Socket | null>(null);


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
    socketRef.current = io("http://localhost:5000");

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to server");
      createRoom();
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_created", (data) => {
      console.log("Room created:", data);
      setRoomInfo(data.room_info);
      setCharacters(data.room_info.characters);
      setConnected(true);
    });

    socket.on("new_character_created",(data)=>{
      console.log("new Character added");
      console.log(data);
      setCharacters((prev)=>[...prev,data]);
    })

    socket.on("character_deleted",(remainingCharacters)=>{
      setCharacters(remainingCharacters);
    })


    return () => {
      socket.disconnect();
      socketRef.current = null; // Clean up
    };
  }, []);


  const createRoom = () => {
    const socket = socketRef.current;
    if (!socket) {console.warn("Socket not connected yet");return;}
    console.log(socket.id)
    socket.emit("create_room", new_room_info());
  }

  const addCharacter = (roomId:string, dm_key:string) => {
    const sentData = {
      room_id: roomId,
      dm_key: dm_key
    }
    const socket = socketRef.current;
    console.log("Adding new character...");
    if (!socket) {console.warn("Socket not connected yet");return;}
    socket.emit("create_new_character", sentData);
  }

  const isRoomReady = roomInfo !== null && dmKey !== null;

  return (
    <SocketContext.Provider value={socketRef.current}>
    <div>
       <p>Room ID: {roomInfo?.room_id}</p>
        <p>Status: {connected ? "Connected" : "Disconnected"}</p>
        <DmPartyContainer> 
          <AnimatePresence> 
            {isRoomReady && characters.map((char) => (
              <DMCharacter key={char.char_id} char={char} roomId={roomInfo?.room_id} dmKey={dmKey} />
            ))}
            {isRoomReady && 
              <CreateCharBtn>
                <button onClick={() => addCharacter(roomInfo.room_id, dmKey)}>
                  <CreateIcon src="/icons/ui/create.svg"/>
                  Add Character
                </button> 
              </CreateCharBtn>
            }
          </AnimatePresence>
        </DmPartyContainer>
        <div>
         
        </div>
    </div>
    
    </SocketContext.Provider>
  );
}
