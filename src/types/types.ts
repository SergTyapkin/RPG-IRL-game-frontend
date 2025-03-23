import { BuffType } from '~/constants';

export interface User {
  id: string;
  name: string;
  level: number;
  imageUrl: string;
  stats: {
    maxHp: number;
    hp: number;
    experience: number;
    protection: number;
    money: number;
    power: number;
    agility: number;
    intelligence: number;
  };
  notSyncedStats: {
    maxHp: number;
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

export interface Ability {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  sourceType: 'skill' | 'item'
  source: Skill | Item;

  damage: number;
  damageTargets: number;
  heal: number;
  reload: number;
  buffs: {[key in BuffType]: number};
}

export interface Effect {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  sourceType: 'skill' | 'item'
  source: Skill | Item;

  buffs: {[key in BuffType]: number};
}

export interface Skill {
  name: string;
  description: string;
  abilities: Ability[];
  buffs: {[key in BuffType]: number};
  effects: Effect[];
  cost: number;
  position: [number, number];
  children: Skill[];
  imageUrl: string;
  id?: string;
  lines?: [number, number, number, number][];
  parentId?: string;
}

export interface Guild {
  id: string;
  name: string;
  description: string;
  money: number;
  experience: number;
  level: number;
  imageUrl: string;

  leader: string;
  members: string[];
}

export interface Item {
  id: string;
  name: string;
  type: string;
  abilities: Ability[];
  effects: Effect[],
  description: string;
  imageUrl: string;
  notSynced?: boolean;
}
