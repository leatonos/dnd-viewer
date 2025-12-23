export type CharacterInfo = {
  char_id: string;          // char_key
  char_name: string;        // Character Name
  photo: string;            // image URL
  hp: number;               // current HP
  max_hp: number;           // max HP
  mana: number;             // current mana
  max_mana: number;         // max mana
  exp: number;              // current experience
  required_exp: number;     // experience needed for next level
  level: number;            // character level
  status: string;           // e.g., "none"
  text_color: string;       // text color in UI
  bg_color: string;         // background color in UI
};

export type RoomInfo = {
  characters: CharacterInfo[];
  room_id: string;
  room_name: string;
  room_bg: string;
}