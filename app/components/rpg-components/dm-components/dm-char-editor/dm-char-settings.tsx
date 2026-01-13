"use client"
import { CharacterInfo } from "../../../../types";
import styled from "styled-components";
import ProgressBar from "../../progressbar";
import ExperienceBar from "../../experiencebar";
import { SocketContext } from "@/app/lib/socket-context";
import { JSX, useContext, useRef, useState } from "react";
import { CharacterCard, StyledButton } from "@/app/styled-components";
import Character from "../../viewer-components/character";
import Image from "next/image";
import { on } from "events";
import ImageSelector from "./dm-photo-selector";
import DmCharSkills from "./dm-char-skills";
import DmCharInventory from "./dm-char-inventory";
import DmCharStats from "./dm-char-stats";

type Props = {
  char: CharacterInfo;
  roomId: string;
  dmKey: string;
  onClose: () => void;
  onUpdateChar: (char: CharacterInfo) => void;
  onDelete: (char_id:string, room_id:string, dm_key:string) => void;
};

export default function CharSettings({char, roomId, dmKey, onClose, onUpdateChar, onDelete}: Props) {

    const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(char);
    const [isPhotoSelectionOpen, setIsPhotoSelection] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<SettingsTab>("stats");

    type SettingsTab = "stats" | "inventory" | "skills";


    const TAB_COMPONENTS: Record<SettingsTab,React.ComponentType<SettingsTabProps>> = {
        stats: DmCharStats,
        inventory: DmCharInventory,
        skills: DmCharSkills,
    };

    const ActiveTab = TAB_COMPONENTS[activeTab];

    interface SettingsTabProps {
        character: CharacterInfo;
        onUpdate: (field: keyof CharacterInfo, value: string | number) => void;
    }

    // Make a copy of the character info and update it
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

  return (
    <FullScreenWrapper>
        <WindowSettings>
            <TopRow>
                <CloseWindowButton onClick={onClose}>
                    <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
                </CloseWindowButton>
            </TopRow>
            <CharSettingsContainer>
                <CharProfileContainer>
                    <CharacterPhotoContainer $bgcolor={currentCharInfo.bg_color}> {/* Image Selector Button */}
                        <ImageSelectorButton onClick={() => setIsPhotoSelection(true)} title="Settings">
                            <Image src="/icons/ui/camera.svg" alt="Settings" width={25} height={25} />  
                        </ImageSelectorButton>
                        <CharacterPhoto src={currentCharInfo.photo} alt={currentCharInfo.char_name} />
                    </CharacterPhotoContainer>
                    <CharacterName $bgcolor={currentCharInfo.bg_color} $textcolor={currentCharInfo.text_color}>{currentCharInfo.char_name}</CharacterName>
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
                    <TabContainer>
                        <Tab onClick={() => setActiveTab("stats")}>Stats</Tab>
                        <Tab onClick={() => setActiveTab("inventory")}>Inventory</Tab>
                        <Tab onClick={() => setActiveTab("skills")}>Skills</Tab>
                    </TabContainer>
                    <SettingsBox>
                        <ActiveTab
                            character={currentCharInfo}
                            onUpdate={handleInputChange}
                        />
                    </SettingsBox>
                </CharacterSettingsDetails>
            </CharSettingsContainer>
            <BottomRow>
                <StyledButton onClick={deleteCharacter}>
                <img src="icons/ui/trash.svg" width={25} />
                    Delete
                </StyledButton>
                <StyledButton onClick={saveChanges}>
                    <img src="icons/ui/save.svg" width={25} />
                    Save Changes
                </StyledButton>
            </BottomRow>
        </WindowSettings>
        {isPhotoSelectionOpen && <ImageSelector currentImage={currentCharInfo.photo} onClose={() => setIsPhotoSelection(false)} onChooseImage={updatePhoto} />}
    </FullScreenWrapper>
  )
}


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

const WindowSettings = styled.div`
    display: flex;
    width: 90%;
    height:100%;
    background: #ffffff;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
    box-sizing:border-box;
`;

const TopRow = styled.div`
    display:flex;
    justify-content:flex-end;
    width:100%;
    height:10%
`;

const CharSettingsContainer = styled.div`
    width: 100%;
    background: #ffffff;
    height:80%;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing:border-box;
    border-radius: 8px;
`;

const CloseWindowButton = styled.button`
    cursor: pointer;
    border: none;
    width: 30px;
    height: 30px;
`;

const CharProfileContainer = styled.div`
    display: flex;
    width: 35%;
    height:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CharacterPhotoContainer = styled.div<{ $bgcolor?: string }>`
    position:relative;
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: ${({ $bgcolor }) => $bgcolor ?? "#ffffff"};
`;

const CharacterPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  transform: translate(-18px,-18px);
  cursor: pointer;
`;

const CharacterName = styled.h3<{ $textcolor?: string , $bgcolor?:string}>`
    width:100%;
    padding:0px;
    margin:0px;
    text-align:center;
    font-weight:bold;
    font-size:1.2em;
    color:${({ $textcolor }) => $textcolor ?? "#000000"};
    background-color:${({ $bgcolor }) => $bgcolor ?? "#000000"};
    margin-bottom:10px;
`;

const CharacterSettingsDetails = styled.div`
    display: flex;
    width: 65%;
    overflow-y:auto;
    flex-direction: column;
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

const BottomRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height:10%;
    gap:20px;
`;

const TabContainer = styled.nav`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 6px;              
`;

const Tab = styled.div`
    text-align: center;
    background-color: #6366f1;
    color: white;
    padding: 8px 14px;
    border-radius: 20px 20px 0px 0px;       
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;  /* Smooth hover animation */

    &:hover {
        background-color: #4f46e5;
    }

`;

const SaveButton = styled.button`
    padding: 8px 16px;
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const SettingsLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const SettingsBox = styled.div`
    width:100%;
    height:80%;
    overflow-y:auto;
`;