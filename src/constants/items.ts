import { type Item } from '~/types/types';
import { ItemTypes } from '~/constants/constants';
import { Effects } from '~/constants/effects';
import { Abilities } from '~/constants/abilities';

import ImgHelmet from '#/images/items/helmet.png';
import ImgMain from '#/images/items/main.png';
import ImgBoots from '#/images/items/boots.png';
import ImgDagger from '#/images/items/knife-example.png';
import ImgLongSword from '#/icons/fight.svg';


export const Items: {[key: string]: Item} = {
  helmetBerserk: {
    id: String(),
    name: 'Шлем варвара',
    description: 'Описание предмета',
    type: ItemTypes.hat,
    protection: 1,
    imageUrl: ImgHelmet,
    effects: [
      Effects.damage1.id,
    ],
    abilities: [
    ],
  },
  mainBerserk: {
    id: String(),
    name: 'Броня варвара',
    description: 'Описание предмета',
    type: ItemTypes.main,
    protection: 4,
    imageUrl: ImgMain,
    effects: [
      Effects.damage1.id,
    ],
    abilities: [
    ],
  },
  bootsBerserk: {
    id: String(),
    name: 'Сапоги варвара',
    type: ItemTypes.boots,
    protection: 2,
    imageUrl: ImgBoots,
    effects: [
      Effects.damage1.id,
    ],
    abilities: [
    ],
    description: 'Описание предмета',
  },
  dagger: {
    id: String(),
    name: 'Кинжал дешевой силы',
    description: 'Когда-то кинжал был утерян, но потом найден, а вообще изначально выкован какими-то крутыми челами, и вообще это реликвия крутая.',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgDagger,
    effects: [
      Effects.powerLowCost.id,
    ],
    abilities: [
      Abilities.daggerHit.id,
    ],
  },
  longSword: {
    id: String(),
    name: 'Длинный меч удачи',
    description: 'Описание предмета',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgLongSword,
    effects: [
      Effects.luck.id,
    ],
    abilities: [
      Abilities.longSwordHit.id,
    ],
  },
}

// Set right id's
Object.keys(Items).forEach(id => {
  Items[id].id = String(id);
});
