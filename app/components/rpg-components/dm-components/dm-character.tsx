"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import ProgressBar from "../progressbar";
import ExperienceBar from "../experiencebar";
import { SocketContext } from "@/app/lib/socket-context";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import CharSettings from "./dm-char-settings";


type Props = {
  char: CharacterInfo;
  roomId: string;
  dmKey: string;
};

 const CharacterCard = styled.div<{ bgcolor?: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: auto;
  padding: 10px;
  box-sizing: border-box
  margin: 10px;
  background: ${({ bgcolor }) => bgcolor ?? "#222"};
`;

const CharacterPhoto = styled.img`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  `;

const LevelBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 5px;
  right: 5px;
  background: #f59e0b;
  color: #000;
  padding: 2px 6px;
  font-weight: bold;
  border-radius: 999px;
  font-size: 1em;
`;

const SettingsButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  background: white;
  color: #000;
  border: none;
  border-radius: 999px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const CharacterName = styled.h3<{namecolor?: string}>`
  color: ${({ namecolor }) => namecolor || "#fff"};
  font-size: .9em;
  font-weight: bold;
  margin: 3px 0px 6px 0px;
`;

const FlexRow = styled.div`
  display: flex;
  width: 100%; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NumberButton = styled.button`
  width: 28px;
  height: 28px;
  margin: 0px 5px;
  cursor: pointer;
  `;

const InputField = styled.input`
  width: 60px;
  text-align: center;
  `;

 const NameInput = styled.input`
  background: transparent;
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  outline: none;
  width: auto;
  cursor: text;
  /* Optional: subtle visual hint on focus */
  &:focus {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.5);
  }
`;

export default function DMCharacter({char, roomId, dmKey}: Props) {

  const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(char);
  const [status, setStatus] = useState<string>("");
  const [hpInput, setHpInput] = useState<number>(10);
  const [mpInput, setMpInput] = useState<number>(10);
  const [IsSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const UPDATE_DEBOUNCE_MS = 500;

  const socket = useContext(SocketContext);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const updateHp = (newHP: number) => {

    if(!socket) return;

    const updatedChar = {
      ...currentCharInfo,
      hp: newHP,
    };

    setCurrentCharInfo(updatedChar);

    // Clear previous timer
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // Start new debounce timer
    debounceTimer.current = setTimeout(() => {
       setStatus("Updating...");
      updateCharacter(updatedChar); // Emit to server
    }, UPDATE_DEBOUNCE_MS); // 1 second after last click
  };

  const updateMp = (newMP: number) => {

   if(!socket) return;

    const updatedChar = {
      ...currentCharInfo,
      mana: newMP,
    };

    setCurrentCharInfo(updatedChar);

    // Clear previous timer
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // Start new debounce timer
    debounceTimer.current = setTimeout(() => {
       setStatus("Updating...");
      updateCharacter(updatedChar); // Emit to server
    }, UPDATE_DEBOUNCE_MS); // 1 second after last click
  }

  const updateCharacterName = (newName: string) => {

    if(!socket) return;
    const updatedChar = {
      ...currentCharInfo,
      char_name: newName,
    };
    setCurrentCharInfo(updatedChar);

    // Clear previous timer
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    // Start new debounce timer
    debounceTimer.current = setTimeout(() => {
       setStatus("Updating...");
      updateCharacter(updatedChar); // Emit to server
    }, UPDATE_DEBOUNCE_MS); 
}

  const deleteCharacter = (char_id:string, room_id:string, dm_key:string) => {

    if(!socket) return;

    // Emit delete event to server
    console.log("character Id:", char_id);
    console.log("room Id:", roomId);
    console.log("dm Key:", dmKey);

    socket.emit("delete_character", {
      char_key: char_id,
      room_id: room_id,
      dm_key: dm_key
    });

  }

  const updateCharacter = (character: CharacterInfo) => {
    if(!socket) return;

    socket.emit("character_update", {
      char_key: char.char_id,
      char_info: character,
      room_id: roomId,
      dm_key: dmKey
    });

  }

  const currentHPPercent = (currentCharInfo.hp / currentCharInfo.max_hp) * 100;
  const HPLabel = `${currentCharInfo.hp}/${char.max_hp}`;

  const currentMPPercent = (currentCharInfo.mana / currentCharInfo.max_mana) * 100;
  const MPLabel = `${currentCharInfo.mana}/${currentCharInfo.max_mana}`;
  

  return (
    <CharacterCard bgcolor={currentCharInfo.bg_color ?? "#222"}>
        {IsSettingsOpen && <CharSettings char={currentCharInfo} roomId={roomId} dmKey={dmKey} onClose={() => setIsSettingsOpen(false)} />}
        {currentCharInfo.level > 0 && <LevelBadge>{currentCharInfo.level}</LevelBadge>}
        <SettingsButton onClick={() => setIsSettingsOpen(true)} title="Settings">
          <Image src="/icons/settings.svg" alt="Settings" width={16} height={16} />  
        </SettingsButton>
        <CharacterPhoto src="https://placehold.co/150x170" alt={currentCharInfo.char_name} />
        <NameInput type="text" value={currentCharInfo.char_name} onChange={(e) => { updateCharacterName(e.target.value) }}/>
        {/* HP Bar */}
        <FlexRow>
          <NumberButton onClick={() => updateHp(Math.max(currentCharInfo.hp - 1, 0))}>-</NumberButton>
          <ProgressBar value={currentHPPercent} barColor="#ef4444" textColor="#ffffff" label={HPLabel} isDM={true} />
          <NumberButton onClick={() => updateHp(Math.max(currentCharInfo.hp + 1, 0))}>+</NumberButton>
        </FlexRow>
        {/* Custom HP Input */}
        <FlexRow>
          <NumberButton onClick={() => updateHp(Math.max(currentCharInfo.hp - hpInput, 0))}>-</NumberButton>
          <InputField type="text" value={hpInput} onChange={(e) => {setHpInput(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}} />
          <NumberButton onClick={() => updateHp(Math.max(currentCharInfo.hp + hpInput, 0))}>+</NumberButton>
        </FlexRow>
        {/* MP Bar */}
        <FlexRow>
          <NumberButton onClick={() => updateMp(Math.max(currentCharInfo.mana - 1, 0))}>-</NumberButton>
          <ProgressBar value={currentMPPercent} barColor="#3b82f6" textColor="#ffffff" label={MPLabel} isDM={true} />
          <NumberButton onClick={() => updateMp(Math.max(currentCharInfo.mana + 1, 0))}>+</NumberButton>
        </FlexRow>
         {/* Custom HP Input */}
        <FlexRow>
          <NumberButton onClick={() => updateMp(Math.max(currentCharInfo.mana - mpInput, 0))}>-</NumberButton>
          <InputField type="text" value={mpInput} onChange={(e) => {setMpInput(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}} />
          <NumberButton onClick={() => updateMp(Math.max(currentCharInfo.mana + mpInput, 0))}>+</NumberButton>
        </FlexRow>
        {/* Experience Bar */}
        <ExperienceBar exp={currentCharInfo.exp} requiredExp={currentCharInfo.required_exp} isDM={true} />
        <button onClick={() => deleteCharacter(currentCharInfo.char_id, roomId, dmKey)}>Delete Character</button>
    </CharacterCard>
  )
}