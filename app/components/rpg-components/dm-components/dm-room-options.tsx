"use client";

import { RoomInfo } from "../../../types";
import styled from "styled-components";
import { SocketContext } from "@/app/lib/socket-context";
import { useContext, useState } from "react";
import { motion } from "motion/react";

type Props = {
  roomInfo: {
    room_name:string,room_bg:string
  };
  roomId: string;
  dmKey: string;
  onClose: () => void;
};

export default function DMRoomOptions({roomInfo,roomId,dmKey,onClose}: Props) {
  const socket = useContext(SocketContext);

  const [roomName, setRoomName] = useState(roomInfo.room_name);
  const [roomBg, setRoomBg] = useState(roomInfo.room_bg);

  const updateRoom = () => {
    if (!socket) return;

    socket.emit("room_update", {
      room_info: {
        room_name: roomName,
        room_bg: roomBg,
      },
      room_id: roomId,
      dm_key: dmKey,
    });

    onClose();
  };

  return (
    <Overlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Window
        as={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Title>Room Settings</Title>

        <Field>
          <Label>Room Name</Label>
          <Input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Background Color</Label>
          <ColorInput
            type="color"
            value={roomBg}
            onChange={(e) => setRoomBg(e.target.value)}
          />
        </Field>

        <Actions>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={updateRoom}>Save</PrimaryButton>
        </Actions>
      </Window>
    </Overlay>
  );
}



const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Window = styled.div`
  width: 360px;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #bbb;
`;

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background: #2a2a2a;
  color: white;

  &:focus {
    outline: 2px solid #6b9cff;
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 4px;
  background: #2a2a2a;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
`;

const PrimaryButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #6b9cff;
  color: black;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;
