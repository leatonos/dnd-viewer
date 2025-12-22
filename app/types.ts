export type CharacterInfo = {
  charKey: string;
  name: string;
  maxHP: number;
  currentHP: number;
  maxMP: number;
  currentMP: number;
  exp?: number;
  level?: number;
  charStyle?: BoxStyle;
};


export type BoxStyle = {
  backgroundColor: string;
  textColor: string;
}