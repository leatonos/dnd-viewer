export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

const apiUrl = process.env.NEXT_PUBLIC_IMG_SOURCE;



const colorful_icons = {
  colletionName:"Colorful",
  folder:`colorful-icons`,
  icons:[
  'adventure.png',
  'archer.png',
  'armored-boot.png',
  'army-knife.png',
  'assault-rifle.png',
  'body-armor.png',
  'cards.png',
  'closed-treasure-chest.png',
  'clover.png',
  'diamond-ring.png',
  'dice.png',
  'egg-pokemon.png',
  'explosive.png',
  'gatling-gun.png',
  'gauntlet-gloves.png',
  'greek-helmet.png',
  'grenade.png',
  'gun.png',
  'horseshoe.png',
  'joker.png',
  'knight-shield.png',
  'mage-staff.png',
  'mana.png',
  'mine-trolley.png',
  'parchment.png',
  'poison-bottle.png',
  'saddle.png',
  'shield.png',
  'sniper-rifle.png',
  'spartan-helmet.png',
  'submachine-gun.png',
  'sword.png',
  'treasure-chest.png'
]};

const thick_line_icons = {
  colletionName:"Thick line colorful",
  folder:`thick-line`,
  icons:[
  'archer.png',
  'armored-boot.png',
  'army-knife.png',
  'assault-rifle.png',
  'body-armor.png',
  'cards.png',
  'closed-treasure-chest.png',
  'clover.png',
  'crystal.png',
  'dice.png',
  'explosive.png',
  'food-as-resources.png',
  'footman.png',
  'gauntlet-gloves.png',
  'greek-helmet.png',
  'grenade.png',
  'gun.png',
  'horseshoe.png',
  'joker.png',
  'knight-shield.png',
  'mage-staff.png',
  'mana.png',
  'mine-trolley.png',
  'morale.png',
  'old-shop.png',
  'pet-commands-summon.png',
  'poison-bottle.png',
  'queen-of-hearts.png',
  'shield.png',
  'sniper-rifle.png',
  'spartan-helmet.png',
  'submachine-gun.png',
  'sword.png',
  'terraria.png',
  'three-leaf-clover.png',
  'treasure-chest.png'
]}

const thick_line_colorful = {
  colletionName:"Thick line colorful",
  folder:`thick-line-colorful`,
  icons:[
  'adventure.png',
  'archer.png',
  'armored-boot.png',
  'army-knife.png',
  'assault-rifle.png',
  'body-armor.png',
  'cards.png',
  'closed-treasure-chest.png',
  'clover.png',
  'crystal.png',
  'dice.png',
  'explosive.png',
  'food-as-resources.png',
  'footman.png',
  'gauntlet-gloves.png',
  'greek-helmet.png',
  'grenade.png',
  'gun.png',
  'horseshoe.png',
  'joker.png',
  'knight-shield.png',
  'mage-staff.png',
  'mana.png',
  'military-base.png',
  'mine-trolley.png',
  'morale.png',
  'pet-commands-summon.png',
  'poison-bottle.png',
  'prize.png',
  'queen-of-hearts.png',
  'shield.png',
  'sniper-rifle.png',
  'spartan-helmet.png',
  'submachine-gun.png',
  'sword.png',
  'terraria.png',
  'treasure-chest.png'
]};

export type IconCollection = {
  colletionName:string;
  folder:string;
  icons:string[];
}

export const iconCollections:IconCollection[] = [
  colorful_icons,
  thick_line_icons,
  thick_line_colorful,
]

export type CharacterCollection = {
  colletionName:string;
  folder:string;
  characters:string[];
}



const colorful_characters:string[] =[
  'adventure-2.svg',
  'adventure-3.svg',
  'alchemist-2.svg',
  'animal.svg',
  'archer-2.svg',
  'archery-2.svg',
  'armor-1.svg',
  'assassin-2.svg',
  'assassin-4.svg',
  'axe-2.svg',
  'bandit-2.svg',
  'beard-2.svg',
  'character-10.svg',
  'character-11.svg',
  'character-12.svg',
  'character-13.svg',
  'character-9.svg',
  'martial-art-4.svg',
  'martial-art-5.svg'
]
const thick_line_characters:string[] = [
  "adventure-4.svg",
  "alchemist-1.svg",
  "animal-2.svg",
  "archer-1.svg",
  "archery-1.svg",
  "armor-2.svg",
  "assassin-3.svg",
  "assassin-5.svg",
  "axe-1.svg",
  "bandit-1.svg",
  "beard-1.svg",
  "character-14.svg",
  "character-15.svg",
  "character-6.svg",
  "character-7.svg",
  "character-8.svg",
  "martial-art-2.svg",
  "martial-art-3.svg"
]
const thick_line_color_characters:string[] = [
  "adventure.svg",
  "alchemist.svg",
  "animal-1.svg",
  "archer.svg",
  "archery.svg",
  "armor.svg",
  "assassin-1.svg",
  "assassin.svg",
  "axe.svg",
  "bandit.svg",
  "beard.svg",
  "character-1.svg",
  "character-2.svg",
  "character-3.svg",
  "character-4.svg",
  "character-5.svg",
  "character.svg",
  "martial-art-1.svg",
  "martial-art.svg"
];

const colorful_char_collection:CharacterCollection = {
  colletionName: "Colorful",
  folder: "/characters/colorful",
  characters: colorful_characters
}
const thickline_char_collection:CharacterCollection = {
  colletionName: "Thickline",
  folder: "/characters/thick-line",
  characters: thick_line_characters
}
const thickline_colorful_char_collection:CharacterCollection = {
  colletionName: "Thickline colorful",
  folder: "/characters/thick-line-colorful",
  characters: thick_line_color_characters
}

export const characterImgCollections:CharacterCollection[] = [
  colorful_char_collection,
  thickline_char_collection,
  thickline_colorful_char_collection
]
