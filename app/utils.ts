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
  folder:`${apiUrl}/colorful-icons`,
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
  folder:`${apiUrl}/thick-line`,
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
  folder:`${apiUrl}/colorful_icons`,
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
