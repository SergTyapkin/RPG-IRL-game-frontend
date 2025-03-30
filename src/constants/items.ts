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

export const Items: { [key: string]: Item } = {
  default: {
    id: String(),
    name: 'Начальная',
    description: '',
    type: ItemTypes.other,
    imageUrl: DefaultAvatarImage,
    buffs: {},
    effects: [],
    abilities: [],
  },

  // ----------------------------------------------------
  artefactBlackStar: {
    id: String(),
    name: 'Амулет “Черная звезда”',
    description:
      'Этот амулет, сделанный из черного коралла и украшенный золотом, обладает магической способностью восстанавливать здоровье своего владельца. Он может исцелять раны, болезни и усталость, а также увеличивать жизненную силу.',
    type: ItemTypes.artefact,
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
    description:
      'Если ваша основная характеристика ловкость, то вы получаете +2 за уровень к силе и интеллекту, если сила - к интеллекту и ловкости, если интеллект - к ловкости и силе.',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactEyeJustice,
    buffs: {},
    effects: [Effects.statsJustice.id],
    abilities: [],
  },
  artefactLiveCup: {
    id: String(),
    name: 'Чаша Понсе-Де-Леона',
    description:
      'Восстанавливает 5 здоровья вам перед каждым ходом вашей команды, и 3 каждому живому члену вашей команды',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactLiveCup,
    buffs: {},
    effects: [Effects.regeneration_5.id, Effects.teamRegeneration_3.id],
    abilities: [],
  },
  artefactMainStone: {
    id: String(),
    name: 'Камень пиратских душ',
    description:
      'Можно провести магический обряд.\n Дает значительные бонусы к урону и броне, на судном сражении дает вдвое больше\n',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactMainStone,
    buffs: {
      [BuffsTypes.protectionIncrease]: 10,
      [BuffsTypes.maxHpIncrease]: 20,
    },
    effects: [],
    abilities: [],
  },
  artefactPhoenixLive: {
    id: String(),
    name: 'Артефакт “Жизнь Феникса”',
    description: 'Дает возможность восстать после смерти в бою 1 раз. Расходуется',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactPhoenixLive,
    buffs: {},
    effects: [],
    abilities: [Abilities.phoenixLive.id],
  },
  artefactShieldKingGuardian: {
    id: String(),
    name: 'Щит стражника королевского дворца',
    description: 'Блокирует 50% любого урона. Немного увеличивает защиту',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactShieldKingGuardian,
    buffs: {
      [BuffsTypes.protectionIncrease]: 3,
    },
    effects: [Effects.damageGottenHalf.id],
    abilities: [],
  },
  artefactKompasWay: {
    id: String(),
    name: 'Компас Магического Пути',
    description:
      'Этот амулет, сделанный из черного коралла и украшенный золотом, обладает магической способностью восстанавливать здоровье своего владельца. Он может исцелять раны, болезни и усталость, а также увеличивать жизненную силу.',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactKompasWay,
    buffs: {},
    effects: [Effects.intelligenceAddPerLevel_2.id, Effects.spellEfficiency.id],
    abilities: [],
  },

  // --------------------------------------------------
  daggerNightCardinal: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description:
      'Когда-то кинжал был утерян, но потом найден, а вообще изначально выкован какими-то крутыми челами, и вообще это реликвия крутая.',
    type: ItemTypes.dagger,
    imageUrl: ImgDaggerNightCardinal,
    buffs: {},
    effects: [],
    abilities: [Abilities.daggerNightCardinal.id],
  },

  // --------------------------------------------------
  swordAlchemy: {
    id: String(),
    name: 'Сабля алхимика',
    description:
      'Дает +8 к урону. Благодаря маслам, которые использовались при ковке этой сабли, артефакт увеличивает урон атакующих заклинаний на 30%.',
    type: ItemTypes.sword,
    imageUrl: ImgSwordAlchemy,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 8,
    },
    effects: [Effects.spellEfficiency.id],
    abilities: [Abilities.swordAlchemy.id],
  },
  swordStorm: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description:
      'Благодаря электрическим атакам, позволяет наносить дополнительно +15 урона. С шансом 50% накладывает командное кровотечение на всех игроков кроме атакуемого',
    type: ItemTypes.sword,
    imageUrl: ImgSwordStorm,
    buffs: {},
    effects: [Effects.powerLowCost.id],
    abilities: [Abilities.swordStorm.id],
  },

  // --------------------------------------------------
  pistolDeathBreath: {
    id: String(),
    name: 'Пистоль "Дыхание Смерти"',
    description: `Этот пистоль, сделанный из черного металла и вырезанными рунами, обладает магической способностью с некоторым шансом выпускать пули, которые пронзают броню и наносят отравляющие ранения. Выпускает пули, которые пронзают броню и наносят кровоточащие раны`,
    type: ItemTypes.pistol,
    imageUrl: ImgPistolDeathBreath,
    buffs: {},
    effects: [],
    abilities: [Abilities.pistolDeathBreath.id],
  },

  // --------------------------------------------------
  hatBerserk: {
    id: String(),
    name: 'Шлем варвара',
    description: 'Даёт +2 к урону',
    type: ItemTypes.hat,
    imageUrl: ImgHatBerserk,
    buffs: {
      [BuffsTypes.protectionIncrease]: 1,
    },
    effects: [Effects.damage_2.id],
    abilities: [],
  },
  hatIcePirates: {
    id: String(),
    name: 'Шляпа главаря “Морозных пиратов”',
    description: 'Тупо самая жоская шляпа в игре',
    type: ItemTypes.hat,
    imageUrl: ImgHatIcePirates,
    buffs: {
      [BuffsTypes.protectionIncrease]: 8,
      [BuffsTypes.maxHpIncrease]: 12,
    },
    effects: [Effects.protectionAddHalfHp.id],
    abilities: [],
  },

  // --------------------------------------------------
  mainBerserk: {
    id: String(),
    name: 'Броня варвара',
    description: 'Даёт +2 к урону',
    type: ItemTypes.main,
    imageUrl: ImgMainBerserk,
    buffs: {
      [BuffsTypes.protectionIncrease]: 3,
    },
    effects: [Effects.damage_2.id],
    abilities: [],
  },
  mainElitePirate: {
    id: String(),
    name: 'Комплект элитного пирата',
    description:
      'Дает возможность один раз за сражение нанести двойной урон вашей атакой. Дает +2 к ловкости за уровень',
    type: ItemTypes.main,
    imageUrl: ImgMainElitePirate,
    buffs: {
      [BuffsTypes.protectionIncrease]: 7,
    },
    effects: [Effects.agilityAddPerLevel_2.id],
    abilities: [Abilities.powerDoubleDamage.id],
  },
  mainKingHunter: {
    id: String(),
    name: 'Плащ королевского охотника',
    description: 'Тупо сама жоская броня в игре',
    type: ItemTypes.main,
    imageUrl: ImgMainKingHunter,
    buffs: {
      [BuffsTypes.protectionIncrease]: 8,
      [BuffsTypes.maxHpIncrease]: 12,
    },
    effects: [Effects.damage_10.id],
    abilities: [],
  },
  mainMagicSecret: {
    id: String(),
    name: 'Мантия секретной службы короля',
    description: 'Блокирует 30% урона по здоровью',
    type: ItemTypes.main,
    imageUrl: ImgMainMagicSecret,
    buffs: {
      [BuffsTypes.protectionIncrease]: 5,
    },
    effects: [Effects.damageGotten30perc.id],
    abilities: [],
  },

  // --------------------------------------------------
  bootsBerserk: {
    id: String(),
    name: 'Сапоги варвара',
    description: 'Даёт +2 к урону',
    type: ItemTypes.boots,
    imageUrl: ImgBootsBerserk,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    },
    effects: [Effects.damage_2.id],
    abilities: [],
  },
  bootsKingSailor: {
    id: String(),
    name: 'Сапоги королевских мореходцев',
    description: 'Усиливает любое заклинание, применяемое на вас, в 2 раза',
    type: ItemTypes.boots,
    imageUrl: ImgBootsKingSailor,
    buffs: {
      [BuffsTypes.protectionIncrease]: 8,
      [BuffsTypes.maxHpIncrease]: 12,
    },
    effects: [Effects.damage_10.id],
    abilities: [],
  },
};

// Set right id's
Object.keys(Items).forEach(id => {
  Items[id].id = String(id);
});
