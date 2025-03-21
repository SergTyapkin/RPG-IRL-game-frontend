interface User {
  id: string;
  name: string;
  level: number;
  stats: {
    hp: number;
    experience: number;
    protection: number;
    money: number;
    power: number;
    agility: number;
    intelligence: number;
  };
  guild: Guild;
  skills: string[];
  inventory: Item[];
  role: 'admin' | 'user';

  isSignedIn: boolean;
}

interface Ability {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  sourceType: 'skill' | 'item'
  source: Skill | Item;

  damage: number;
  damageTargets: number;
  heal: number;
  buffType: string;
  buffValue: number;
}

interface Skill {
  name: string;
  description: string;
  abilities: Ability[];
  buffs: {[key: string]: number};
  cost: number;
  position: [number, number];
  children: Skill[];
  imageUrl: string;
  id?: string;
  lines?: [number, number, number, number][];
  parentId?: string;
}

interface Guild {
  id: string;
  name: string;
  description: string;
  experience: number;
  level: number;
  imageUrl: string;

  leader: string;
  members: string[];
}

interface Item {
  id: string;
  name: string;
  type: ItemTypes;
  abilities: Ability[];
  buffs: {[key: string]: number};
  description: string;
  imageUrl: string;
}
