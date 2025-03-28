import DefaultKnifeImage from '#/images/items/daggerNightCardinal.png';
import DefaultAbilityImage from '#/images/ability-image-example.png';
import DefaultAvatarImage from '#/images/user-avatar-example.png';

export {DefaultKnifeImage, DefaultAbilityImage, DefaultAvatarImage};

export const NO_SERVER_MODE = true;

export const DEFAULT_USER_MAX_UP = 10;
export const DEFAULT_USER_PROTECTION = 0;

export const MONEY_LOSE_BY_DEATH_PERCENT = 0.5;

export const QR_CODE_ID_SPLITTER = String.fromCharCode(31); // 31 ascii = Unit Separator symbol


export const ClassTypes = {
  power: 'power',
  agility: 'agility',
  intelligence: 'intelligence',
}

export const ResourceTypes = {
  money: 'M',
  hp: 'H',
  experience: 'X',
  protection: 'D',
  power: 'P',
  agility: 'A',
  intelligence: 'I',
};

export const ItemTypes = {
  hat: 'hat',
  main: 'main',
  boots: 'boots',
  artefact: 'artefact',
  dagger: 'weapon',
  sword: 'sword',
  pistol: 'pistol',
  potion: 'potion',
  material: 'material',
  other: 'other',
};

export const AbilityTypes = {
  power: 'power',
  dagger: 'weapon',
  sword: 'sword',
  pistol: 'pistol',
  potion: 'potion',
  spell: 'spell',
  other: 'other',
};

export const BuffsTypes = {
  maxHpIncrease: 'maxHpIncrease',
  protectionIncrease: 'protectionIncrease',
  experienceModifier: 'experienceModifier',
  moneyModifier: 'moneyModifier',
  powerCostDecrease: 'powerCostDecrease',
  agilityCostDecrease: 'agilityCostDecrease',
  intelligenceCostDecrease: 'intelligenceCostDecrease',
  powerPerLevelIncrease: 'powerPerLevelIncrease',
  agilityPerLevelIncrease: 'agilityPerLevelIncrease',
  intelligencePerLevelIncrease: 'intelligencePerLevelIncrease',
  damageGottenModifier: 'damageGottenModifier',
  damageDoneModifier: 'damageDoneModifier',
  damageDoneIncrease: 'damageDoneIncrease',
  hpEveryTurn: 'hpEveryTurn',
};

export const QRTypes = {
  resource: 'R',
  items: 'I',
  heal: 'H',
  damage: 'D',
  sync: 'S',
}

export const QRSources = {
  quest: 'Q',
  world: 'W',
  user: 'U',
  guild: 'G',
}

export type ResourceType = typeof ResourceTypes[keyof typeof ResourceTypes];
export type ItemType = typeof ItemTypes[keyof typeof ItemTypes];
export type BuffType = typeof BuffsTypes[keyof typeof BuffsTypes];
export type QRType = typeof QRTypes[keyof typeof QRTypes];
export type QRSource = typeof QRSources[keyof typeof QRSources];
export type ClassType = typeof ClassTypes[keyof typeof ClassTypes];
export type AbilityType = typeof AbilityTypes[keyof typeof AbilityTypes];
