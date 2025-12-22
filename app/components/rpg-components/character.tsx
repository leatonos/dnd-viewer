"use client"
import { CharacterInfo } from "../../types";
import styled from "styled-components";
import ProgressBar from "../rpg-components/progressbar";

type Props = {
  char: CharacterInfo;
};

 const CharacterCard = styled.div<{ bgcolor?: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: auto;
  max-height: 280px;
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

const CharacterName = styled.h3<{ nameColor?: string }>`

  color: ${({ nameColor }) => nameColor || "#fff"};
  font-size: 1.2em;
  font-weight: bold;
  margin: 3px 0px 6px 0px;`
  ;

export default function Character({char}: Props) {

  const currentHPPercent = (char.currentHP / char.maxHP) * 100;
  const HPLabel = `${char.currentHP}/${char.maxHP}`;

  const currentMPPercent = (char.currentMP / char.maxMP) * 100;
  const MPLabel = `${char.currentMP}/${char.maxMP}`;
  

  return (
    <CharacterCard bgcolor={char.charStyle?.backgroundColor ?? "#222"}>
        {char.level && <LevelBadge>{char.level}</LevelBadge>}
        <CharacterPhoto src="https://placehold.co/150x170" alt={char.name} />
        <CharacterName nameColor={char.charStyle?.textColor}>{char.name}</CharacterName>
        <ProgressBar value={currentHPPercent} barColor="#ef4444" textColor="#ffffff" label={HPLabel} />
        <ProgressBar value={currentMPPercent} barColor="#3b82f6" textColor="#ffffff" label={MPLabel} />
        {char.exp  && <ProgressBar value={10} barColor="#facc15" textColor="#000000" />}
    </CharacterCard>
  );
}
