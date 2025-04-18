import { type Ability } from '~/types/types';
import { AbilityTypes } from '~/constants/constants';
import { EffectedAbility } from '~/utils/utils';
import { Effects } from '~/constants/effects';

import ImgFists from '#/images/abilities/fists.png'

export interface InFightAbility extends EffectedAbility {
  reloadLeft?: number;
}

export const Abilities: { [key: string]: Ability } = {
  default: {
    id: String(),
    name: 'Кулаки',
    description: 'Удар кулаком наносит 0 или 1 урона с 50% шансом',
    type: AbilityTypes.other,
    imageUrl: ImgFists,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 1,
    chances: [
      {
        damage: 1,
        probability: 0.5,
      },
    ],
  },
  healPotion: {
    id: String(),
    name: 'Лечение',
    description: 'Восстанавливает 3 едницы здоровья',
    type: AbilityTypes.potion,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    targetsCount: 0,
    heal: 3,
    reload: 5,
    chances: [],
  },
  swordStorm: {
    id: String(),
    name: 'Меч "Грань Шторма"',
    description: '15 урона. С шансом 50% накладывает командное кровотечение на всех игроков кроме атакуемого',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 15,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [
      {
        effectsToTargets: [Effects.teamBleeding_2.id],
        probability: 0.5,
      },
    ],
  },
  daggerNightCardinal: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description: 'Крадет по 2 единицы здоровья у противников',
    type: AbilityTypes.dagger,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    damage: 8,
    targetsCount: 2,
    heal: 0,
    reload: 3,
    chances: [],
  },
  swordAlchemy: {
    id: String(),
    name: 'Сабля алхимика',
    description: 'Наносит кровотечение 4',
    type: AbilityTypes.sword,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    damage: 8,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  pistolDeathBreath: {
    id: String(),
    name: 'Выстрел "Дыхания Смерти"',
    description: 'Выстрел проходит сквозь броню и оставляет сильно кровоточащие раны, которые наносят 4 урона каждый ход',
    type: AbilityTypes.sword,
    effectsToTargets: [Effects.bleeding_4.id],
    effectsForMe: [],
    piercingDamage: 6,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [],
  },
  powerDoubleDamage: {
    id: String(),
    name: 'Двойной урон',
    description:
      'Сразу после использования этой способности можно разыграть ещё одну, урон которой будет увеличен в 2 раза',
    type: AbilityTypes.charge,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    targetsCount: 0,
    heal: 0,
    reload: Infinity,
    chances: [],
  },
  artefactWheelKing: {
    id: String(),
    name: 'Штурвал Короля пиратов',
    description: 'Накладывает на выбранного противника слабость, он наносит на 5 ед. меньше урона',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.weakness_5.id],
    effectsForMe: [],
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [],
  },
  swordBlack: {
    id: String(),
    name: 'Одноручный меч Черного мечника',
    description: 'Накладывает на выбранного противника слабость, он наносит на 5 ед. меньше урона',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 10,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [
      {
        effectsToTargets: [Effects.teamBleeding_2.id, Effects.bleeding_2.id],
        probability: 0.5,
      },
    ],
  },
  swordShadow: {
    id: String(),
    name: 'Удар клинками теней',
    description: 'Накладывает кровотечение 2, бъет сразу 2 цели',
    type: AbilityTypes.sword,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    damage: 5,
    targetsCount: 2,
    heal: 0,
    reload: 5,
    chances: [],
  },
  pistolFuture: {
    id: String(),
    name: 'Выстрел Пистоля будущего',
    description: 'Даёт огромный урон, но накладывает на выбранного противника силу 5',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 20,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [],
  },
  silentDamass: {
    id: String(),
    name: 'Дамасский тихий убийца',
    description: 'Наносит 2 урона по 5 противникам',
    type: AbilityTypes.dagger,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 2,
    targetsCount: 5,
    heal: 0,
    reload: 3,
    chances: [],
  },
  swordAnger: {
    id: String(),
    name: 'Меч гнева',
    description: 'Наносит 7 урона',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 7,
    targetsCount: 5,
    heal: 0,
    reload: 4,
    chances: [],
  },
  nefritDanger: {
    id: String(),
    name: 'Нефритовая опасность',
    description: 'Наносит 5 пробивающего урона по 2 противникам',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 5,
    damage: 0,
    targetsCount: 2,
    heal: 0,
    reload: 4,
    chances: [],
  },
  bookRoyalMagic: {
    id: String(),
    name: 'Магия королевской книги',
    description: 'Восстанавливает 2 союзникам по 5 hp',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 2,
    heal: 5,
    reload: 5,
    chances: [],
  },
  swordZirael: {
    id: String(),
    name: 'Удар меча Зираэль',
    description: 'Просто Наносит урон',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 10,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  swordProPirate: {
    id: String(),
    name: 'Шпага бывалого пирата',
    description: 'Просто Наносит урон',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 6,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [],
  },
  pistolAmateur: {
    id: String(),
    name: 'Пистоль пирата-авантюриста',
    description: 'Наносит 3 ПРОБИВАЮЩЕГО урона',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 3,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [],
  },
  pistolRecet: {
    id: String(),
    name: 'Выстрел пистоля рэкетира',
    description: 'Наносит 2 пробивающего урона и восстанавливает 2 хп',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 2,
    damage: 0,
    targetsCount: 1,
    heal: 2,
    reload: 5,
    chances: [],
  },
  hookMeat: {
    id: String(),
    name: 'Хук мясника',
    description: 'Наносит 3 урона по 3 игрокам',
    type: AbilityTypes.dagger,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 3,
    targetsCount: 3,
    heal: 0,
    reload: 5,
    chances: [],
  },
  surikenDamass: {
    id: String(),
    name: 'Сюрикен из Дамаса',
    description: 'Наносит 3 пробивающего урона',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 3,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  shipbuilder: {
    id: String(),
    name: 'Молот судостроителя',
    description: 'Наносит случайный урон от 0 до 10',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 7,
    chances: [
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
      {probability: 0.5, damage: 1},
    ],
  },
  axeRogatina: {
    id: String(),
    name: 'Топор-рогатина',
    description: 'Наносит 4 пробивающего урона',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 4,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [],
  },
  braidPeasant: {
    id: String(),
    name: 'Коса крестьянина',
    description: 'Наносит 3 урона',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 4,
    targetsCount: 1,
    heal: 0,
    reload: 1,
    chances: [],
  },
  pirateRake: {
    id: String(),
    name: 'Кочерга пиратской котельни',
    description: 'Наносит кровотечение 2, без урона',
    type: AbilityTypes.dagger,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [],
  },
  chinaSai: {
    id: String(),
    name: 'Китайские саи',
    description: 'Наносит кровотечение 4 c шансом 30%, без урона',
    type: AbilityTypes.dagger,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [{
      probability: 0.4,
      effectsToTargets: [Effects.bleeding_4.id],
    }],
  },
  handmadeBat: {
    id: String(),
    name: 'Самодельная палка',
    description: 'Наносит урон',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 4,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  scissorsPro: {
    id: String(),
    name: 'Ножницы цирюльника',
    description: 'Дают кровотечение 1. Кровотечение накладывается',
    type: AbilityTypes.dagger,
    effectsToTargets: [Effects.bleeding_1.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 2,
    chances: [],
  },
  pistolCrossbow: {
    id: String(),
    name: 'Арбалет пехотинца',
    description: 'Наносит 4 пробивающего урона',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 4,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  swordMaster: {
    id: String(),
    name: 'Сабля пиратского мастера',
    description: 'Наносит 2 или 4 урона с 50% шансом',
    type: AbilityTypes.sword,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 2,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [{
      probability: 0.5,
      damage: 2,
    }],
  },
  pistolLinkor: {
    id: String(),
    name: 'Пистоль с королевского линкора',
    description: 'Наносит 2 пробивающего урона и кровотечение 1 с 50% шансом',
    type: AbilityTypes.pistol,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 2,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [{
      probability: 0.5,
      effectsToTargets: [Effects.bleeding_1.id],
    }],
  },
  seaWeakness: {
    id: String(),
    name: 'Слабость морей',
    description: 'Наносит 4 пробивающего урона и слабость, уменьшающую урон врага на 5',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.weakness_5.id],
    effectsForMe: [],
    piercingDamage: 4,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [],
  },
  bigDamage: {
    id: String(),
    name: 'Сила морей',
    description: 'Наносит 15 пробивающего урона 1 раз за бой',
    type: AbilityTypes.spell,
    effectsToTargets: [],
    effectsForMe: [],
    piercingDamage: 15,
    damage: 0,
    targetsCount: 1,
    heal: 0,
    reload: Infinity,
    chances: [],
  },
  fireball1: {
    id: String(),
    name: 'Огненный шар',
    description: '5 урона и кровотечение 1',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.bleeding_1.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 5,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  fireball2: {
    id: String(),
    name: 'Огненный шар II',
    description: '10 урона и кровотечение 2',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 10,
    targetsCount: 1,
    heal: 0,
    reload: 4,
    chances: [],
  },
  firewall1: {
    id: String(),
    name: 'Стена огня',
    description: 'Кровотечение 2',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 8,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  firewall2: {
    id: String(),
    name: 'Стена огня II',
    description: 'Кровотечение 4 на двух игроков',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.bleeding_4.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 8,
    targetsCount: 2,
    heal: 0,
    reload: 5,
    chances: [],
  },
  waterball1: {
    id: String(),
    name: 'Шар воды I',
    description: '3 урона и уменьшение урона на 2',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.weakness_2.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 3,
    targetsCount: 1,
    heal: 0,
    reload: 3,
    chances: [],
  },
  waterball2: {
    id: String(),
    name: 'Шар воды II',
    description: '6 урона и уменьшение урона на 5',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.weakness_5.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 6,
    targetsCount: 1,
    heal: 0,
    reload: 5,
    chances: [],
  },
  waterwall1: {
    id: String(),
    name: 'Стена воды I',
    description: 'Восстановление 2 здоровья и увеличение силы на 2',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.damage_2.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 2,
    reload: 4,
    chances: [],
  },
  waterwall2: {
    id: String(),
    name: 'Стена воды II',
    description: 'Восстановление 5 здоровья и увеличение силы на 5',
    type: AbilityTypes.spell,
    effectsToTargets: [Effects.damage_5.id],
    effectsForMe: [],
    piercingDamage: 0,
    damage: 0,
    targetsCount: 1,
    heal: 5,
    reload: 6,
    chances: [],
  },
};

// Set right id's
Object.keys(Abilities).forEach(id => {
  Abilities[id].id = String(id);
});
