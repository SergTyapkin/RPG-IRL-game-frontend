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

interface Skill {
  name: string;
  effects: '????';
  cost: number;
  description: string;
  position: [number, number];
  children: Skill[];
}

interface Guild {
  id: string;
  name: string;
  description: string;
  experience: number;
  level: number;

  leader: string;
  members: string[];
}

interface Item {
  id: string;
  name: string;
  type: ItemTypes;
  effects: '????';
  description: string;
}
