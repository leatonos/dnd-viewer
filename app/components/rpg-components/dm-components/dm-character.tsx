"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import ProgressBar from "../progressbar";
import ExperienceBar from "../experiencebar";
import { SocketContext } from "@/app/lib/socket-context";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import CharSettings from "./dm-char-settings";
import { motion } from "motion/react"

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
`;

const CharacterPhoto = styled.img<{bgcolor:string}>`
  background: ${({ bgcolor }) => bgcolor ?? "#222"};
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
  const [expInput, setExpInput] = useState<number>(10);
  const [IsSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const UPDATE_DEBOUNCE_MS = 500;
  const NEXT_LV_REQ_MULTIPLIER = 1

  const socket = useContext(SocketContext);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const levelUp = (newLevel: number, excessExp: number) => {
    const updatedChar: CharacterInfo = {
      ...currentCharInfo,
      level: newLevel,
      exp: excessExp,
      required_exp: Math.floor(currentCharInfo.required_exp * NEXT_LV_REQ_MULTIPLIER),
    };
    setCurrentCharInfo(updatedChar);
    updateCharacter(updatedChar)
  }

  const updateStat = <K extends keyof CharacterInfo>(field: K, value: CharacterInfo[K]) => {
  
  if (!socket) return;

  //if exp = required_exp, level up
  if (field === "exp" && typeof value === "number" && value >= currentCharInfo.required_exp) {
    const newLevel = currentCharInfo.level + 1;
    const excessExp = value - currentCharInfo.required_exp;
    levelUp(newLevel, excessExp);
    return
  }
  const updatedChar: CharacterInfo = {
    ...currentCharInfo,
    [field]: value,
  };

  setCurrentCharInfo(updatedChar);

  // Clear previous timer
  if (debounceTimer.current) clearTimeout(debounceTimer.current);

  // Start new debounce timer
  debounceTimer.current = setTimeout(() => {
    setStatus("Updating...");
    updateCharacter(updatedChar); // Emit to server
  }, UPDATE_DEBOUNCE_MS);
};

  const deleteCharacter = (char_id:string, room_id:string, dm_key:string) => {

    if(!socket) return;

    // Emit delete event to server
    socket.emit("delete_character", {
      char_key: char_id,
      room_id: room_id,
      dm_key: dm_key
    });

  }

  const updateCharacter = (character: CharacterInfo) => {

    setCurrentCharInfo(character);

    if(!socket) return;

    socket.emit("character_update", {
      char_key: character.char_id,
      char_info: character,
      room_id: roomId,
      dm_key: dmKey
    });

  }

  const currentHPPercent = (currentCharInfo.hp / currentCharInfo.max_hp) * 100;
  const HPLabel = `${currentCharInfo.hp}/${currentCharInfo.max_hp}`;

  const currentMPPercent = (currentCharInfo.mana / currentCharInfo.max_mana) * 100;
  const MPLabel = `${currentCharInfo.mana}/${currentCharInfo.max_mana}`;

  return (
    <CharacterCard
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.3 }}
    >
        {/* Level Badge */}
        {currentCharInfo.level > 0 && <LevelBadge>{currentCharInfo.level}</LevelBadge>}
        {/* Settings Button */}
        <SettingsButton onClick={() => setIsSettingsOpen(true)} title="Settings">
          <Image src="icons/ui/settings.svg" alt="Settings" width={25} height={25} />  
        </SettingsButton>
         {/* Character Image */}
        <CharacterPhoto bgcolor={currentCharInfo.bg_color ?? "#222"} src={currentCharInfo.photo} alt={currentCharInfo.char_name} />
         {/* Name Editor */}
        <NameInput type="text" value={currentCharInfo.char_name} onChange={(e) => { updateStat("char_name", e.target.value) }}/>
        {/* HP Bar */}
        <FlexRow>
          <NumberButton onClick={() => updateStat("hp", Math.max(currentCharInfo.hp - 1, 0))}>-</NumberButton>
          <ProgressBar value={currentHPPercent} barColor="#ef4444" textColor="#ffffff" label={HPLabel} isDM={true} />
          <NumberButton onClick={() => updateStat("hp", Math.max(currentCharInfo.hp + 1, 0))}>+</NumberButton>
        </FlexRow>
        {/* Custom HP Input */}
        <FlexRow>
          <NumberButton onClick={() => updateStat("hp", Math.max(currentCharInfo.hp - hpInput, 0))}>-</NumberButton>
          <InputField type="text" value={hpInput} onChange={(e) => {setHpInput(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}} />
          <NumberButton onClick={() => updateStat("hp", Math.max(currentCharInfo.hp + hpInput, 0))}>+</NumberButton>
        </FlexRow>
        {/* MP Bar */}
        <FlexRow>
          <NumberButton onClick={() => updateStat("mana", Math.max(currentCharInfo.mana - 1, 0))}>-</NumberButton>
          <ProgressBar value={currentMPPercent} barColor="#3b82f6" textColor="#ffffff" label={MPLabel} isDM={true} />
          <NumberButton onClick={() => updateStat("mana", Math.max(currentCharInfo.mana + 1, 0))}>+</NumberButton>
        </FlexRow>
         {/* Custom MP Input */}
        <FlexRow>
          <NumberButton onClick={() => updateStat("mana", Math.max(currentCharInfo.mana - mpInput, 0))}>-</NumberButton>
          <InputField type="text" value={mpInput} onChange={(e) => {setMpInput(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}} />
          <NumberButton onClick={() => updateStat("mana", Math.max(currentCharInfo.mana + mpInput, 0))}>+</NumberButton>
        </FlexRow>
        {/* Experience Bar */}
        {currentCharInfo.required_exp > 0 && <>
        <FlexRow>
          <NumberButton onClick={() => updateStat("exp", Math.max(currentCharInfo.exp - 1, 0))}>-</NumberButton>
          <ExperienceBar exp={currentCharInfo.exp} requiredExp={currentCharInfo.required_exp} isDM={true} />
          <NumberButton onClick={() => updateStat("exp", Math.max(currentCharInfo.exp + 1, 0))}>+</NumberButton>
        </FlexRow>
        {/* Custom EXP Input */}
        <FlexRow>
          <NumberButton onClick={() => updateStat("exp", Math.max(currentCharInfo.exp - expInput, 0))}>-</NumberButton>
          <InputField type="text" value={expInput} onChange={(e) => {setExpInput(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}} />
          <NumberButton onClick={() => updateStat("exp", Math.max(currentCharInfo.exp + expInput, 0))}>+</NumberButton>
        </FlexRow>
        </>}
        {IsSettingsOpen && <CharSettings char={currentCharInfo} roomId={roomId} dmKey={dmKey} onClose={() => setIsSettingsOpen(false)} onDelete={deleteCharacter} onUpdateChar={updateCharacter} />}
    </CharacterCard>
  )
}