import { type Item } from '~/types/types';
import { BuffsTypes, DefaultAvatarImage, ItemTypes } from '~/constants/constants';
import { Effects } from '~/constants/effects';
import { Abilities } from '~/constants/abilities';

import ImgArtefactBlackStar from '#/images/items/artefactBlackStar.png';
import ImgArtefactEyeJustice from '#/images/items/artefactEyeJustice.png';
import ImgArtefactLiveCup from '#/images/items/artefactLiveCup.png';
import ImgArtefactMainStone from '#/images/items/artefactMainStone.png';
import ImgArtefactPhoenixLive from '#/images/items/artefactPhoenixLive.png';
import ImgArtefactShieldKingGuardian from '#/images/items/artefactShieldKingGuardian.png';
import ImgArtefactKompasWay from '#/images/items/artefactKompasWay.png';

import ImgDaggerNightCardinal from '#/images/items/daggerNightCardinal.png';

import ImgSwordAlchemy from '#/images/items/swordAlchemy.png';
import ImgSwordStorm from '#/images/items/swordStorm.png';

import ImgPistolDeathBreath from '#/images/items/pistolDeathBreath.png';

import ImgHatBerserk from '#/images/items/hatBerserk.png';
import ImgHatIcePirates from '#/images/items/hatIcePirates.png';

import ImgMainBerserk from '#/images/items/mainBerserk.png';
import ImgMainElitePirate from '#/images/items/mainElitePirate.png';
import ImgMainKingHunter from '#/images/items/mainKingHunter.png';
import ImgMainMagicSecret from '#/images/items/mainMagicSecret.png';

import ImgBootsBerserk from '#/images/items/bootsBerserk.png';
import ImgBootsKingSailor from '#/images/items/bootsKingSailor.png';


export const Items: {[key: string]: Item} = {
  default: {
    id: String(),
    name: 'Начальная',
    description: '',
    type: ItemTypes.other,
    protection: 0,
    imageUrl: DefaultAvatarImage,
    buffs: {},
    effects: [],
    abilities: [],
  },

  // ----------------------------------------------------
  artefactBlackStar: {
    id: String(),
    name: 'Амулет “Черная звезда”',
    description: 'Этот амулет, сделанный из черного коралла и украшенный золотом, обладает магической способностью восстанавливать здоровье своего владельца. Он может исцелять раны, болезни и усталость, а также увеличивать жизненную силу.',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactBlackStar,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 10,
      [BuffsTypes.protectionIncrease]: 20,
    },
    effects: [],
    abilities: [],
  },
  artefactEyeJustice: {
    id: String(),
    name: 'Око равенства',
    description: 'Если ваша основная характеристика ловкость, то вы получаете +2 за уровень к силе и интеллекту, если сила - к интеллекту и ловкости, если интеллект - к ловкости и силе.',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactEyeJustice,
    buffs: {},
    effects: [
      Effects.statsJustice.id,
    ],
    abilities: [],
  },
  artefactLiveCup: {
    id: String(),
    name: 'Чаша пиратского долголетия',
    description: 'Восстанавливает 5 здоровья вам перед каждым ходом вашей команды, и 3 каждому живому члену вашей команды',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactLiveCup,
    buffs: {},
    effects: [
      Effects.regeneration_5.id,
      Effects.teamRegeneration_3.id,
    ],
    abilities: [
    ],
  },
  artefactMainStone: {
    id: String(),
    name: 'Камень пиратских душ',
    description: 'Можно провести обряд для спасения мира\n Дает +40 к урону, +20 к броне и позволяет союзникам наносить дополнительно +20 урона до судного сражения, на судном сражении дает вдвое больше\n',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactMainStone,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  artefactPhoenixLive: {
    id: String(),
    name: 'Артефакт “Жизнь Феникса”',
    description: 'Дает возможность восстать после смерти в бою 1 раз. Расходуется',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactPhoenixLive,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  artefactShieldKingGuardian: {
    id: String(),
    name: 'Щит стражника королевского дворца',
    description: 'Блокирует 80% урона',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactShieldKingGuardian,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  artefactKompasWay: {
    id: String(),
    name: 'Компас Магического Пути',
    description: 'Этот амулет, сделанный из черного коралла и украшенный золотом, обладает магической способностью восстанавливать здоровье своего владельца. Он может исцелять раны, болезни и усталость, а также увеличивать жизненную силу.',
    type: ItemTypes.artefact,
    protection: 0,
    imageUrl: ImgArtefactKompasWay,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  daggerNightCardinal: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description: 'Когда-то кинжал был утерян, но потом найден, а вообще изначально выкован какими-то крутыми челами, и вообще это реликвия крутая.',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgDaggerNightCardinal,
    buffs: {},
    effects: [
      Effects.powerLowCost.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  swordAlchemy: {
    id: String(),
    name: 'Сабля алхимика',
    description: 'Благодаря маслам, которые использовались при ковке этой сабли, артефакт в руках мага дает дополнительный урон как от обычных атак (+10 урона), так и увеличивает урон атакующих заклинаний (+10%). \n В руках танков и ловкачей дает только +10 к урону.',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgSwordAlchemy,
    buffs: {},
    effects: [
      Effects.powerLowCost.id,
    ],
    abilities: [
    ],
  },
  swordStorm: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description: 'Когда-то кинжал был утерян, но потом найден, а вообще изначально выкован какими-то крутыми челами, и вообще это реликвия крутая.',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgSwordStorm,
    buffs: {},
    effects: [
      Effects.powerLowCost.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  pistolDeathBreath: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description: 'Когда-то кинжал был утерян, но потом найден, а вообще изначально выкован какими-то крутыми челами, и вообще это реликвия крутая.',
    type: ItemTypes.weapon,
    protection: 0,
    imageUrl: ImgPistolDeathBreath,
    buffs: {},
    effects: [
      Effects.powerLowCost.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  hatBerserk: {
    id: String(),
    name: 'Шлем варвара',
    description: 'Описание предмета',
    type: ItemTypes.hat,
    protection: 1,
    imageUrl: ImgHatBerserk,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  hatIcePirates: {
    id: String(),
    name: 'Шляпа главаря “Морозных пиратов”',
    description: 'Ваша броня увеличивается на число равное текущему значению здоровья.\n Каждая единица нанесенного урона восстанавливает ваше здоровье на 25% от нанесенного урона за ход.',
    type: ItemTypes.hat,
    protection: 1,
    imageUrl: ImgHatIcePirates,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  mainBerserk: {
    id: String(),
    name: 'Броня варвара',
    description: 'Описание предмета',
    type: ItemTypes.main,
    protection: 4,
    imageUrl: ImgMainBerserk,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  mainElitePirate: {
    id: String(),
    name: 'Комплект элитного пирата',
    description: 'Дает возможность один раз за сражение нанести двойной урон вашей атакой\n Дает +20 к броне и +20 к здоровью\n Дает +2 к ловкости за уровень',
    type: ItemTypes.main,
    protection: 4,
    imageUrl: ImgMainElitePirate,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  mainKingHunter: {
    id: String(),
    name: 'Плащ королевского охотника',
    description: 'Дает +20 к броне, +10 к здоровью и +10 к урону',
    type: ItemTypes.main,
    protection: 4,
    imageUrl: ImgMainKingHunter,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  mainMagicSecret: {
    id: String(),
    name: 'Мантия секретной службы короля',
    description: 'Блокирует 70% магического урона',
    type: ItemTypes.main,
    protection: 4,
    imageUrl: ImgMainMagicSecret,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },

  // --------------------------------------------------
  bootsBerserk: {
    id: String(),
    name: 'Сапоги варвара',
    description: 'Описание предмета',
    type: ItemTypes.boots,
    protection: 2,
    imageUrl: ImgBootsBerserk,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
  bootsKingSailor: {
    id: String(),
    name: 'Сапоги королевских мореходцев',
    description: 'Дает +20 брони\n Дает +50 к здоровью\n Усиливает каждое заклинание, которое применили на вас союзники, в 2 раза',
    type: ItemTypes.boots,
    protection: 2,
    imageUrl: ImgBootsKingSailor,
    buffs: {},
    effects: [
      Effects.damageIncrease.id,
    ],
    abilities: [
    ],
  },
}

// Set right id's
Object.keys(Items).forEach(id => {
  Items[id].id = String(id);
});
