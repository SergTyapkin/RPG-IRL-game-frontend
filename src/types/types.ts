import { BuffType, ClassType } from '~/constants/constants';

export interface User {
  id: string;
  name: string;
  level: number;
  imageUrl: string;
  stats: {
    hp: number;
    experience: number;
    money: number;
    power: number;
    agility: number;
    intelligence: number;
  };
  notSyncedStats: {
    experience: number;
    money: number;
    power: number;
    agility: number;
    intelligence: number;
  };
  classType: ClassType;
  guildId: string;
  skills: string[];
  inventory: string[];
  equipment: {
    hat?: string;
    main?: string;
    boots?: string;
  };
  role: 'admin' | 'user';

  isSignedIn: boolean;
}

export interface Class {
  type: ClassType;
  name: string;
  description: string;
  imageUrl: string;
  statsPerLevel: {
    power: number,
    agility: number,
    intelligence: number,
  }
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  imageUrl: string;

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

  buffs: {[key in BuffType]: number};
}

export interface Skill {
  name: string;
  description: string;
  abilities: string[];
  buffs: {[key in BuffType]: number};
  effects: string[];
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
  inventory: string[];

  leaderId: string;
  members: {
    id: string,
    name: string,
    imageUrl: string,
    level: number,
  }[];
}

export interface Item {
  id: string;
  name: string;
  type: string;
  protection: number;
  abilities: string[];
  effects: string[],
  description: string;
  imageUrl: string;
  notSynced?: boolean;
}

export interface SyncedData {
  user: User;
  guild: Guild;
}
