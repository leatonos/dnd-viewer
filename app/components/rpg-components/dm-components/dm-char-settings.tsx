"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import ProgressBar from "../progressbar";
import ExperienceBar from "../experiencebar";
import { SocketContext } from "@/app/lib/socket-context";
import { useContext, useRef, useState } from "react";
import { CharacterCard, StyledButton } from "@/app/styled-components";
import Character from "../viewer-components/character";
import Image from "next/image";
import { on } from "events";
import ImageSelector from "./dm-photo-selector";

type Props = {
  char: CharacterInfo;
  roomId: string;
  dmKey: string;
  onClose: () => void;
  onUpdateChar: (char: CharacterInfo) => void;
  onDelete: (char_id:string, room_id:string, dm_key:string) => void;
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
  position:relative;
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

const ImageSelectorButton = styled.button`
  position: absolute;
  display:flex;
  align-items:center;
  justify-content:center;
  top: 0px;
  left: 0px;
  background: white;
  color: #000;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  cursor: pointer;
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

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap:20px;
`;

const SaveButton = styled.button`
    padding: 8px 16px;
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export default function CharSettings({char, roomId, dmKey, onClose, onUpdateChar, onDelete}: Props) {

  const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(char);
  const [isPhotoSelectionOpen, setIsPhotoSelection] = useState<boolean>(false)

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

  const deleteCharacter = () =>{
    onDelete(char.char_id,roomId,dmKey)
    onClose();
  }

  const updatePhoto = (photoLink:string) =>{
    console.log('at least I am alive')
    console.log(photoLink)
    handleInputChange("photo", photoLink)
  }

  const closeSelector = () =>{
    setIsPhotoSelection(false)
  }


  return (
    <FullScreenWrapper>
        <CharSettingsContainer>
            <CloseWindowButton onClick={onClose}>
                <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
            </CloseWindowButton>
            <CharProfileContainer>
                <CharacterPhotoContainer $bgcolor={currentCharInfo.bg_color}> {/* Image Selector Button */}
                    <ImageSelectorButton onClick={() => setIsPhotoSelection(true)} title="Settings">
                        <Image src="/icons/ui/camera.svg" alt="Settings" width={25} height={25} />  
                    </ImageSelectorButton>
                    <CharacterPhoto src={currentCharInfo.photo} alt={currentCharInfo.char_name} />
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
                <ButtonsContainer>
                    <StyledButton onClick={deleteCharacter}>
                    <img src="icons/ui/trash.svg" width={25} />
                        Delete
                    </StyledButton>
                    <StyledButton onClick={saveChanges}>
                        <img src="icons/ui/save.svg" width={25} />
                        Save Changes
                    </StyledButton>
                </ButtonsContainer>
            </CharacterSettingsDetails>
        </CharSettingsContainer>
        {isPhotoSelectionOpen && <ImageSelector currentImage={currentCharInfo.photo} onClose={() => setIsPhotoSelection(false)} onChooseImage={updatePhoto} />}
    </FullScreenWrapper>
  )
}