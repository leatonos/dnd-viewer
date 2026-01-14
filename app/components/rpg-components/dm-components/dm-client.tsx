"use client";

import { CharacterInfo, RoomInfo } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import DM_Header from "./dm-header";
import DMCharacter from "./dm-character";
import { generateRandomString } from "@/app/utils";
import { SocketContext } from "@/app/lib/socket-context";
import { AnimatePresence } from "motion/react";
import { usePageTitle } from "@/app/hooks";
import Footer from "../footer";

export default function DmClient() {
  const [messages, setMessages] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [roomName, setRoomName] = useState<string>("Connecting...")
  const [roomColor,setRoomColor] = useState<string>("")

  const socketRef = useRef<Socket | null>(null);

  const dmKey = typeof window !== "undefined" ? localStorage.getItem("dm_key") : null;
  const localRoom = typeof window !== "undefined" ? localStorage.getItem("room_id") : null;
  
  const serverLink = process.env.NEXT_PUBLIC_SERVER!
  
  const UPDATE_DEBOUNCE_MS = 500;
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

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
    socketRef.current = io('https://dnd-server-production.up.railway.app/', {
      transports: ["websocket"]
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to server");
      createRoom();
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_created", (data) => {
      const roomContent:RoomInfo = data.room_info
      setRoomInfo(roomContent);
      setCharacters(roomContent.characters);
      setRoomColor(roomContent.room_bg)
      setRoomName(roomContent.room_name)
      document.title = roomContent.room_name
      setConnected(true);
    });

    socket.on("new_character_created",(data)=>{
      console.log("new Character added");
      console.log(data);
      setCharacters((prev)=>[...prev,data]);
    })

    socket.on("character_deleted", (deletedCharacter: string) => {
      setCharacters(prev => prev.filter(character => character.char_id !== deletedCharacter));
    });

    socket.on('room_updated',(data:RoomInfo)=>{
      setRoomColor(data.room_bg)
      setRoomName(data.room_name)
      document.title = data.room_name
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

 const changeBackgroundColor = (newColor: string) => {
  const socket = socketRef.current;
  if (!socket) {
    console.warn("Socket not connected yet");
    return;
  }

  setRoomInfo(prev => {
    if (!prev) return prev;

    const updatedRoom: RoomInfo = {
      ...prev,
      room_bg: newColor,
    };

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

   const sentData = {
      room_id: updatedRoom.room_id,
      dm_key: dmKey,
      room_info:updatedRoom
    }

    // Start new debounce timer
    debounceTimer.current = setTimeout(() => {
      socket.emit("room_update", sentData);
    }, UPDATE_DEBOUNCE_MS);

    return updatedRoom;
  });

  setRoomColor(newColor);
};

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
    <Dm_Dashboard>
      {isRoomReady && <DM_Header roomInfo={{ room_name:roomName!,room_bg:roomColor}} roomId={roomInfo.room_id} dmKey={dmKey}/>}
      <h1>{roomName}</h1>
        <DmPartyContainer $bgColor={roomColor}>
          <AnimatePresence> 
            {isRoomReady && characters.map((char) => (
              <DMCharacter key={char.char_id} char={char} roomId={roomInfo?.room_id} dmKey={dmKey} />
            ))}
            {isRoomReady && 
              <CreateCharBtn onClick={() => addCharacter(roomInfo.room_id, dmKey)}>
                  <CreateIcon src="/icons/ui/create.svg"/>
                  Add Character
              </CreateCharBtn>
            }
          </AnimatePresence>
        </DmPartyContainer>
        <Footer isConnected={connected} version={"0.2.3"}/>
    </Dm_Dashboard>
    </SocketContext.Provider>
  );
}

const Dm_Dashboard = styled.main<{ $bgColor?: string }>`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.$bgColor || "white"};
  box-sizing: border-box;
`;

const DmPartyContainer = styled.div<{ $bgColor?: string }>`
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: calc(100% - 80px);
  background: ${(props) => props.$bgColor || "white"};
  box-sizing: border-box;

  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: column;
  }`;

const Header = styled.header<{ $bgColor?: string }>`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding:5px;
  background-color:#ffffff;
`;

const CreateCharBtn = styled.button`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 250px;
`;

const CreateIcon = styled.img`
  width:100%;
  max-width:70px;
`;

