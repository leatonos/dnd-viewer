"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import ProgressBar from "../progressbar";
import ExperienceBar from "../experiencebar";
import { SocketContext } from "@/app/lib/socket-context";
import { useContext, useRef, useState } from "react";
import { CharacterCard } from "@/app/styled-components";
import Character from "../viewer-components/character";
import Image from "next/image";

type Props = {
  char: CharacterInfo;
  roomId: string;
  dmKey: string;
  onClose: () => void;
};

const FullScreenWrapper = styled.div`
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    box-sizing: border-box;
    padding: 40px;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const CharSettingsContainer = styled.div`
    position: relative;
    width: 60%;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    padding: 20px;
    border-radius: 8px;
`;

const CloseWindowButton = styled.button`
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 4px;
    width: 30px;
    height: 30px;
`;

const CharProfileContainer = styled.div`
    display: flex;
    width: 35%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const CharacterPhoto = styled.img`
    width: 100%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
`;

const CharacterSettingsDetails = styled.div`
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const ControlGroup = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const SettingsLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const SettingsInput = styled.input`
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
    border: 1px solid #000;
    `;

const SaveButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

const SaveButton = styled.button`
    padding: 8px 16px;
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export default function CharSettings({char, roomId, dmKey, onClose}: Props) {

  const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(char);

  const socket = useContext(SocketContext);


  const updateCharacter = (character: CharacterInfo) => {
    if(!socket) return;

    socket.emit("character_update", {
      char_key: char.char_id,
      char_info: character,
      room_id: roomId,
      dm_key: dmKey
    });

  }
  

  return (
    <FullScreenWrapper>
        <CharSettingsContainer>
            <CloseWindowButton onClick={onClose}>
                <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
            </CloseWindowButton>
            <CharProfileContainer>
                <CharacterPhoto src="https://placehold.co/150x170" alt={currentCharInfo.char_name} />
                <ControlGroup>
                <SettingsLabel>Background Color:</SettingsLabel>
                <SettingsInput type="color" />
            </ControlGroup>
            <ControlGroup>
                <SettingsLabel>Name Color:</SettingsLabel>
                <SettingsInput type="color" />
            </ControlGroup>
            </CharProfileContainer>
            <CharacterSettingsDetails>
                 <ControlGroup>
                    <SettingsLabel>Name:</SettingsLabel>
                    <SettingsInput type="text" />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Max HP:</SettingsLabel>
                    <SettingsInput type="number" />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Max MP:</SettingsLabel>
                    <SettingsInput type="number" />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Level:</SettingsLabel>
                    <SettingsInput type="number" />
                </ControlGroup>
            <ControlGroup>
                <SettingsLabel>Required Experience:</SettingsLabel>
                <SettingsInput type="number" />
            </ControlGroup>
                <SaveButtonContainer>
                    <SaveButton onClick={() => {
                      updateCharacter(currentCharInfo);
                      onClose();
                    }}>Save Changes</SaveButton>
                </SaveButtonContainer>
            </CharacterSettingsDetails>
        </CharSettingsContainer>
    </FullScreenWrapper>
  )
}