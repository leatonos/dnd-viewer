"use client"
import { CharacterInfo } from "../../../types";
import styled from "styled-components";
import Image from "next/image";
import { on } from "events";
import { useEffect, useState } from "react";
import {characterImgCollections} from "../../../utils"

type Props = {
  character: CharacterInfo;
  onUpdate: (field: keyof CharacterInfo, value: string | number) => void;
};


export default function DmCharStats({character,onUpdate}: Props) {

  const [currentCharInfo, setCurrentCharInfo] = useState<CharacterInfo>(character);

  // make a copy of the character info and update it
  const handleInputChange = (field: keyof CharacterInfo, value: string | number) => {
    setCurrentCharInfo(prev => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <CharStats>
      <ControlGroup style={{ gridColumn: "1 / -1" }}>
        <SettingsLabel>Name:</SettingsLabel>
        <SettingsInput type="text" value={currentCharInfo.char_name} onChange={(e) => handleInputChange("char_name", e.target.value)}/>
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
    </CharStats>
  )
}


export const CharStats = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #fafafa;
  border-radius: 12px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  /* Mobile friendly */
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;


export const ControlGroup = styled.div`
  margin-bottom: 18px;
  width: 100%;
`;

export const SettingsLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
`;

export const SettingsInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;

  font-size: 0.9rem;
  color: #222;

  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;

  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
  }

  &:disabled {
    background: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;