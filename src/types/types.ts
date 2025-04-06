import { AbilityType, BuffType, ClassType, ItemType, QRSource, QRType, ResourceType, UserRole } from '~/constants/constants';

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
  notSyncedInventory: string[];
  equipment: {
    hat?: string;
    main?: string;
    boots?: string;
  };
  scannedQRs?: string[];
  role: UserRole;
  isInFight: boolean;

  isSignedIn: boolean;
}

export type Buffs = {[key in BuffType]: number}

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

export interface AbilityChance {
  probability: number,

  damage?: number,
  heal?: number,
  effectsToTargets?: string[],
  effectsForMe?: string[],
}
export interface Ability {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  effectsToTargets: string[];
  effectsForMe: string[];
  type: AbilityType;

  damage: number;
  piercingDamage?: number;
  targetsCount: number;
  heal: number;
  reload: number;

  chances: AbilityChance[],
}

export interface Effect {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hidden?: boolean;
  isForFight?: boolean,
  userCanGetInFight?: boolean;
  turns?: number;

  buffs: Buffs;
}

export interface Skill {
  name: string;
  description: string;
  abilities: string[];
  buffs: Buffs;
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
    id: string;
    name: string;
    imageUrl: string;
    level: number;
    experience: number;
  }[];
  hidden?: boolean;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  buffs: Buffs;
  abilities: string[];
  effects: string[];
  description: string;
  imageUrl: string;
  notSynced?: boolean;
  applyable?: boolean;
}

export interface SyncedData {
  user: User;
  guild: Guild;
}

export interface QRData {
  id: string,
  type: QRType,
  subType: ResourceType | '_',
  source: QRSource,
  value: string,
}

export interface QRUserData {
  id: string,
  n: string,
  iU: number,
  l: number,
  cT: string,
  st: {
    e: number,
    m: number,
    p: number,
    a: number,
    i: number,
  },
  gId: string,
  i: number[],
  e: {
    h?: number,
    m?: number,
    b?: number,
  },
  newQrs: string[],
}

