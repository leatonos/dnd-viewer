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
import { on } from "events";

type Props = {
  char: CharacterInfo;
  roomId: string;
  dmKey: string;
  onClose: () => void;
  onUpdateChar: (char: CharacterInfo) => void;
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
    min-width: 500px;
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

const CharacterPhotoContainer = styled.div<{ $bgcolor?: string }>`
  width: 100%;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 15px;
  background-color: ${({ $bgcolor }) => $bgcolor ?? "#ffffff"};
`;

const CharacterPhoto = styled.img`
    width: 100%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
`;

const CharacterName = styled.h3<{ $textcolor?: string }>`
    text-align:center;
    font-weight:bold;
    font-size:1.2em;
    color:${({ $textcolor }) => $textcolor ?? "#000000"};
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

const ColorSelectorContainer = styled.div`
    display: flex;
    width:100%;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
`;


const ColorInput = styled.input`
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    cursor: pointer;
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

export default function CharSettings({char, roomId, dmKey, onClose, onUpdateChar}: Props) {

  const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(char);

  // make a copy of the character info and update it
  const handleInputChange = (field: keyof CharacterInfo, value: string | number) => {
    setCurrentCharInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const saveChanges = () => {
    onClose();
    onUpdateChar(currentCharInfo);
  }


  return (
    <FullScreenWrapper>
        <CharSettingsContainer>
            <CloseWindowButton onClick={onClose}>
                <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
            </CloseWindowButton>
            <CharProfileContainer>
                <CharacterPhotoContainer $bgcolor={currentCharInfo.bg_color}>
                    <CharacterPhoto src="https://placehold.co/150x170" alt={currentCharInfo.char_name} />
                    <CharacterName $textcolor={currentCharInfo.text_color}>{currentCharInfo.char_name}</CharacterName>
                </CharacterPhotoContainer>
                <ColorSelectorContainer>
                    <SettingsLabel>Background Color</SettingsLabel>
                    <ColorInput value={currentCharInfo.bg_color} onChange={(e)=>handleInputChange("bg_color",e.target.value)} type="color" />
                </ColorSelectorContainer>
                <ColorSelectorContainer>
                    <SettingsLabel>Name Color</SettingsLabel>
                    <ColorInput value={currentCharInfo.text_color} onChange={(e)=>handleInputChange("text_color",e.target.value)} type="color" />
                </ColorSelectorContainer>
            </CharProfileContainer>
            <CharacterSettingsDetails>
                 <ControlGroup>
                    <SettingsLabel>Name:</SettingsLabel>
                    <SettingsInput type="text" value={currentCharInfo.char_name} onChange={(e) => handleInputChange("char_name", e.target.value)} />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Max HP:</SettingsLabel>
                    <SettingsInput type="number" value={currentCharInfo.max_hp} onChange={(e) => handleInputChange("max_hp", Number(e.target.value))} />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Max MP:</SettingsLabel>
                    <SettingsInput type="number" value={currentCharInfo.max_mana} onChange={(e) => handleInputChange("max_mana", Number(e.target.value))} />
                </ControlGroup>
                <ControlGroup>
                    <SettingsLabel>Level:</SettingsLabel>
                    <SettingsInput type="number" value={currentCharInfo.level} onChange={(e) => handleInputChange("level", Number(e.target.value))} />
                </ControlGroup>
            <ControlGroup>
                <SettingsLabel>Required Experience:</SettingsLabel>
                <SettingsInput type="number" value={currentCharInfo.required_exp} onChange={(e) => handleInputChange("required_exp", Number(e.target.value))} />
            </ControlGroup>
                <SaveButtonContainer>
                    <SaveButton onClick={saveChanges}>Save Changes</SaveButton>
                </SaveButtonContainer>
            </CharacterSettingsDetails>
        </CharSettingsContainer>
    </FullScreenWrapper>
  )
}