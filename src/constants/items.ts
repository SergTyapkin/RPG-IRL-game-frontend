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

import ImgExpBottleSmall from '#/images/items/smallExp.png';
import ImgExpBottleMid from '#/images/items/midExp.png';
import ImgExpBottleBig from '#/images/items/bigExp.png';
import ImgMoneySmall from '#/images/items/smallGold.png';
import ImgMoneyMid from '#/images/items/midGold.png';
import ImgMoneyBig from '#/images/items/bigGold.png';

import ImgFakeEye from '#/images/items/fakeEye.png';
import ImgDaveyKey from '#/images/items/daveyKey.png';

import ImgSwordZirael from '#/images/items/ziraelSword.png';
import ImgPotionSpecific from '#/images/items/specificPoison.png';
import ImgPotionOtvorot from '#/images/items/otvorotPoison.png';
import ImgSwordShadow from '#/images/items/swordShadow.png';
import ImgPistolFuture from '#/images/items/futurePistol.png';
import ImgHatAncient from '#/images/items/maskAnciet.png';
import ImgMainAncient from '#/images/items/oldMagiManti.png';
import ImgArtefactEarthKnowledgesStone from '#/images/items/stoneKnowledge.png';
import ImgSwordDark from '#/images/items/swordDark.png';
import ImgKingWheel from '#/images/items/helmKing.png';
import ImgKingAnchor from '#/images/items/anchorKing.png';

import ImgCaramel from '#/images/items/caramelParticle.png';

import ImgSilentDamass from '#/images/items/silentDamass.png';
import ImgSwordAnger from '#/images/items/swordAnger.png';
import ImgNefritDanger from '#/images/items/nefritDanger.png';
import ImgBookRoyalMagi from '#/images/items/bookRoyalMagi.png';
import ImgMainAvanture from '#/images/items/worldVest.png';
import ImgHatAvanture from '#/images/items/worldHat.png';
import ImgArtefactMagicSphere from '#/images/items/eightMagi.png';
import ImgArtefactRingSea from '#/images/items/seaRIng.png';
import ImgArtefactGoldSun from '#/images/items/goldSun.png';

import ImgSwordProPirate from '#/images/items/proPirateSword.png';
import ImgPistolAmateur from '#/images/items/amateurPistol.png';
import ImgMainAristokrat from '#/images/items/aristoMantu.png';
import ImgBootsSoldier from '#/images/items/soldierBoots.png';
import ImgArtefactGlassesAlchemist from '#/images/items/alchemistGlasses.png';
import ImgPistolRecet from '#/images/items/recetPistol.png';
import ImgDaggerHookMeat from '#/images/items/meatHook.png';
import ImgSurikenDamass from '#/images/items/damasSuriken.png';
import ImgSwordShipbuilder from '#/images/items/shipbuilderMolot.png';
import ImgSwordAxeRogatina from '#/images/items/axeRogatin.png';
import ImgSwordBraidPeasant from '#/images/items/braidPeasant.png';
import ImgArtefactLuckySix from '#/images/items/luckySix.png';
import ImgDaggerPirateRake from '#/images/items/pirateRake.png';
import ImgDaggerChinaSai from '#/images/items/chinaSai.png';
import ImgSwordHandmadeBat from '#/images/items/handmadeBat.png';
import ImgPotionYenifer from '#/images/items/poisonYenifer.png';
import ImgPotionTriss from '#/images/items/poisonTriss.png';
import ImgHatRoyalGuard from '#/images/items/royalGuard.png';
import ImgMainCloakNirf from '#/images/items/cloakNilf.png';
import ImgBootsSpeeds from '#/images/items/bootsOfSeven.png';
import ImgArtefactBookAlchemist from '#/images/items/proAlchemistBook.png';
import ImgArtefactScissorsPro from '#/images/items/proSciccors.png';
import ImgPistolCrossbow from '#/images/items/warriorCrossbow.png';
import ImgArtefactShieldOsman from '#/images/items/osmanShield.png';
import ImgArtefactUnknownThing from '#/images/items/uncommonThing.png';
import ImgHatWizard from '#/images/items/wizardHatPro.png';
import ImgMainWizard from '#/images/items/cityWizard.png';
import ImgSwordMaster from '#/images/items/pirateMaster.png';
import ImgPistolLinkor from '#/images/items/pistolLinkor.png';
import ImgArtefactCrestGoverness from '#/images/items/crestGoverness.png';

import ImgPotionFelix from '#/images/items/felixFelicisPoison.png';
import ImgPotionPoison from '#/images/items/poisonPoison.png';
import ImgRootNirn from '#/images/items/rootNirna.png';
import ImgParticleMain from '#/images/items/particleMain.png';



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
    abilities: [],
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
    description: 'Увеличивает наносимый урон на 5',
    type: ItemTypes.boots,
    imageUrl: ImgBootsKingSailor,
    buffs: {
      [BuffsTypes.protectionIncrease]: 8,
      [BuffsTypes.maxHpIncrease]: 12,
    },
    effects: [Effects.damage_5.id],
    abilities: [],
  },

  // LEGENDARY ---------------------------------------------
  swordZirael: {
    id: String(),
    name: 'Меч Зираэль (Ласточка)',
    description: '',
    type: ItemTypes.other,
    imageUrl: ImgSwordZirael,
    buffs: {},
    effects: [Effects.damage_5.id],
    abilities: [Abilities.swordZirael.id],
  },
  specificPotion: {
    id: String(),
    name: 'Специфический раствор',
    description: 'Накладывает случайный эффект, или ничего',
    type: ItemTypes.potion,
    imageUrl: ImgPotionSpecific,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
  otvorotPotion: {
    id: String(),
    name: 'Отворотное зелье',
    description: '',
    type: ItemTypes.potion,
    imageUrl: ImgPotionOtvorot,
    buffs: {},
    effects: [],
    abilities: [],
  },
  swordShadow: {
    id: String(),
    name: 'Клинки Владыки Теней',
    description: '',
    type: ItemTypes.other,
    imageUrl: ImgSwordShadow,
    buffs: {},
    effects: [Effects.damage_10.id, Effects.protectionHalf.id],
    abilities: [Abilities.swordShadow.id],
  },
  pistolFuture: {
    id: String(),
    name: 'Пистоль будущего',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgPistolFuture,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 5,
    },
    effects: [Effects.damage_10.id, Effects.protectionHalf.id],
    abilities: [Abilities.pistolFuture.id],
  },
  hatAncient: {
    id: String(),
    name: 'Маска древних',
    description: '',
    type: ItemTypes.hat,
    imageUrl: ImgHatAncient,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 4,
      [BuffsTypes.protectionIncrease]: 5,
    },
    effects: [Effects.damageGotten20perc.id],
    abilities: [],
  },
  mainAncient: {
    id: String(),
    name: 'Маска древнего мага',
    description: '',
    type: ItemTypes.main,
    imageUrl: ImgMainAncient,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 10,
      [BuffsTypes.protectionIncrease]: 1,
    },
    effects: [Effects.intelligenceAddPerLevel_3.id],
    abilities: [],
  },
  artefactStoneKnowledge: {
    id: String(),
    name: 'Камень знаний земли',
    description: '',
    type: ItemTypes.main,
    imageUrl: ImgArtefactEarthKnowledgesStone,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 2,
    },
    effects: [
      Effects.swordEfficiency.id,
      Effects.daggerEfficiency.id,
      Effects.pistolEfficiency.id,
      Effects.luck.id,
    ],
    abilities: [],
  },
  swordBlack: {
    id: String(),
    name: 'Одноручный меч Черного мечника',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordDark,
    buffs: {},
    effects: [
      Effects.powerLowCost.id,
      Effects.powerAddPerLevel_1.id,
    ],
    abilities: [Abilities.swordBlack.id],
  },
  artefactWheelKing: {
    id: String(),
    name: 'Штурвал Короля пиратов',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgKingWheel,
    buffs: {
      [BuffsTypes.protectionModifier]: 1.5,
    },
    effects: [],
    abilities: [Abilities.artefactWheelKing.id],
  },
  artefactAnchorKing: {
    id: String(),
    name: 'Якорь королевского линкора',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgKingAnchor,
    buffs: {},
    effects: [Effects.teamRegeneration_2.id],
    abilities: [],
  },

  // VERY RARE (EPIC) ------------------------------------------------
  silentDamass: {
    id: String(),
    name: 'Дамасский тихий убийца',
    description: '',
    type: ItemTypes.dagger,
    imageUrl: ImgSilentDamass,
    buffs: {},
    effects: [],
    abilities: [Abilities.silentDamass.id],
  },
  swordAnger: {
    id: String(),
    name: 'Меч гнева',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordAnger,
    buffs: {},
    effects: [
      Effects.agilityAddPerLevel_1.id,
    ],
    abilities: [Abilities.swordAnger.id],
  },
  nefritDanger: {
    id: String(),
    name: 'Нефритовая опасность',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgNefritDanger,
    buffs: {},
    effects: [],
    abilities: [Abilities.nefritDanger.id],
  },
  bookRoyalMagic: {
    id: String(),
    name: 'Книга королевского мага',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgBookRoyalMagi,
    buffs: {},
    effects: [Effects.damage_2.id],
    abilities: [Abilities.bookRoyalMagic.id],
  },
  mainAvanture: {
    id: String(),
    name: 'Жилет авантюриста мирового класса',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgMainAvanture,
    buffs: {
      [BuffsTypes.protectionIncrease]: 4,
    },
    effects: [Effects.agilityLowCost.id],
    abilities: [],
  },
  hatAvanture: {
    id: String(),
    name: 'Шляпа авантюриста мирового класса',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgHatAvanture,
    buffs: {
      [BuffsTypes.protectionIncrease]: 4,
    },
    effects: [Effects.agilityLowCost.id],
    abilities: [],
  },
  artefactMagicSphere: {
    id: String(),
    name: 'Шар магии восьми морей',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactMagicSphere,
    buffs: {
      [BuffsTypes.damageDoneModifier]: 1.3,
    },
    effects: [
      Effects.potionEfficiency.id,
      Effects.spellEfficiency.id,
    ],
    abilities: [],
  },
  artefactRingSea: {
    id: String(),
    name: 'Кольцо морвластия',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactRingSea,
    buffs: {},
    effects: [Effects.regeneration_1.id],
    abilities: [],
  },
  artefactGoldSun: {
    id: String(),
    name: 'Амулет золотого солнца',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactGoldSun,
    buffs: {},
    effects: [
      Effects.powerAddPerLevel_1.id,
      Effects.agilityAddPerLevel_1.id,
      Effects.intelligenceAddPerLevel_1.id,
    ],
    abilities: [],
  },

  // RARE -----------------------------------------
  swordProPirate: {
    id: String(),
    name: 'Шпага бывалого пирата',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordProPirate,
    buffs: {
      [BuffsTypes.damageDoneModifier]: 1.3,
    },
    effects: [],
    abilities: [Abilities.swordProPirate.id],
  },
  pistolAmateur: {
    id: String(),
    name: 'Пистоль пирата-авантюриста',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgPistolAmateur,
    buffs: {
    },
    effects: [Effects.powerAddPerLevel_1.id],
    abilities: [Abilities.pistolAmateur.id],
  },
  mainAristokrat: {
    id: String(),
    name: 'Накидка аристократа',
    description: '',
    type: ItemTypes.main,
    imageUrl: ImgMainAristokrat,
    buffs: {
      [BuffsTypes.protectionIncrease]: 1,
      [BuffsTypes.damageDoneModifier]: 1.5,
    },
    effects: [],
    abilities: [],
  },
  bootsSoldier: {
    id: String(),
    name: 'Самоги морского солдата',
    description: '',
    type: ItemTypes.boots,
    imageUrl: ImgBootsSoldier,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    },
    effects: [],
    abilities: [],
  },
  artefactGlassesAlch: {
    id: String(),
    name: 'Очки алхимика',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactGlassesAlchemist,
    buffs: {},
    effects: [
      Effects.spellEfficiency.id,
    ],
    abilities: [],
  },
  pistolRecet: {
    id: String(),
    name: 'Пистоль рэкетира',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgPistolRecet,
    buffs: {},
    effects: [],
    abilities: [Abilities.pistolRecet.id],
  },
  daggerHookMeat: {
    id: String(),
    name: 'Хук мясника',
    description: '',
    type: ItemTypes.dagger,
    imageUrl: ImgDaggerHookMeat,
    buffs: {},
    effects: [],
    abilities: [Abilities.hookMeat.id],
  },
  surikenDamass: {
    id: String(),
    name: 'Сюрикен из Дамаса',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgSurikenDamass,
    buffs: {},
    effects: [],
    abilities: [Abilities.surikenDamass.id],
  },
  swordShipbuilder: {
    id: String(),
    name: 'Молот судостроителя',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordShipbuilder,
    buffs: {},
    effects: [],
    abilities: [Abilities.shipbuilder.id],
  },
  swordAxeRogatina: {
    id: String(),
    name: 'Топор-рогатина',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordAxeRogatina,
    buffs: {},
    effects: [],
    abilities: [Abilities.axeRogatina.id],
  },
  swordBraidPeasant: {
    id: String(),
    name: 'Коса крестьянина',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordBraidPeasant,
    buffs: {},
    effects: [],
    abilities: [Abilities.braidPeasant.id],
  },
  artefactLuckySix: {
    id: String(),
    name: 'Вальтовая шестерка крестей',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactLuckySix,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 20,
      [BuffsTypes.maxHpModifier]: 0.5,
    },
    effects: [
      Effects.spellEfficiency.id,
    ],
    abilities: [],
  },
  daggerPirateRake: {
    id: String(),
    name: 'Кочерга пиратской котельни',
    description: '',
    type: ItemTypes.dagger,
    imageUrl: ImgDaggerPirateRake,
    buffs: {},
    effects: [],
    abilities: [Abilities.pirateRake.id],
  },
  daggerChinaSai: {
    id: String(),
    name: 'Китайские саи',
    description: '',
    type: ItemTypes.dagger,
    imageUrl: ImgDaggerChinaSai,
    buffs: {},
    effects: [],
    abilities: [Abilities.chinaSai.id],
  },
  swordHandmadeBat: {
    id: String(),
    name: 'Самодельная палка',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordHandmadeBat,
    buffs: {},
    effects: [],
    abilities: [Abilities.handmadeBat.id],
  },
  potionYenifer: {
    id: String(),
    name: 'Зелье из сирени и кринжовника',
    description: 'Можно использовать. Эффект будет действовать до конца следующего боя',
    type: ItemTypes.potion,
    imageUrl: ImgPotionYenifer,
    buffs: {},
    effects: [
      Effects.damage_2.id,
      Effects.protectionDecrease.id,
    ],
    abilities: [],
    applyable: true,
  },
  potionTriss: {
    id: String(),
    name: 'Зелье из миндаля и клубники',
    description: 'Можно использовать. Моментально восстанавливает здоровье',
    type: ItemTypes.potion,
    imageUrl: ImgPotionTriss,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 10,
    },
    effects: [],
    abilities: [],
    applyable: true,
  },
  hatRoyalQuard: {
    id: String(),
    name: 'Шлем королевского воина',
    description: '',
    type: ItemTypes.hat,
    imageUrl: ImgHatRoyalGuard,
    buffs: {
      [BuffsTypes.protectionIncrease]: 3,
      [BuffsTypes.maxHpIncrease]: 1,
    },
    effects: [],
    abilities: [],
  },
  mainNirfCloak: {
    id: String(),
    name: 'Плащ Нильфов',
    description: '',
    type: ItemTypes.main,
    imageUrl: ImgMainCloakNirf,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    },
    effects: [Effects.daggerEfficiency.id],
    abilities: [],
  },
  bootsSpeeds: {
    id: String(),
    name: 'Плащ Нильфов',
    description: '',
    type: ItemTypes.boots,
    imageUrl: ImgBootsSpeeds,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    },
    effects: [Effects.agilityLowCost.id],
    abilities: [],
  },
  artefactBookAlchemist: {
    id: String(),
    name: 'Книга алхимика продвинутого уровня',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactBookAlchemist,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 1,
    },
    effects: [
      Effects.spellEfficiency.id,
      Effects.intelligenceAddPerLevel_1.id,
    ],
    abilities: [],
  },
  daggerScissorsPro: {
    id: String(),
    name: 'Ножницы цирюльника',
    description: '',
    type: ItemTypes.dagger,
    imageUrl: ImgArtefactScissorsPro,
    buffs: {},
    effects: [
      Effects.daggerEfficiency.id,
    ],
    abilities: [Abilities.scissorsPro.id],
  },
  pistolCrossbow: {
    id: String(),
    name: 'Арбалет пехотинца',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgPistolCrossbow,
    buffs: {},
    effects: [],
    abilities: [Abilities.pistolCrossbow.id],
  },
  artefactShieldOsman: {
    id: String(),
    name: 'Щит Османцев',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactShieldOsman,
    buffs: {
      [BuffsTypes.protectionIncrease]: 5,
    },
    effects: [],
    abilities: [],
  },
  artefactUnknownThing: {
    id: String(),
    name: 'Непонятная штука',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactUnknownThing,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 3,
      [BuffsTypes.maxHpIncrease]: 2,
    },
    effects: [],
    abilities: [],
  },
  hatWizard: {
    id: String(),
    name: 'Шляпа болотной ведьмы',
    description: '',
    type: ItemTypes.hat,
    imageUrl: ImgHatWizard,
    buffs: {
      [BuffsTypes.protectionIncrease]: 1,
    },
    effects: [Effects.spellEfficiency.id],
    abilities: [],
  },
  mainWizard: {
    id: String(),
    name: 'Мантия городской ведьмы',
    description: '',
    type: ItemTypes.main,
    imageUrl: ImgMainWizard,
    buffs: {
      [BuffsTypes.protectionIncrease]: 3,
    },
    effects: [Effects.spellEfficiency.id],
    abilities: [],
  },
  swordMaster: {
    id: String(),
    name: 'Сабля пиратского мастера',
    description: '',
    type: ItemTypes.sword,
    imageUrl: ImgSwordMaster,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 2,
    },
    effects: [],
    abilities: [Abilities.swordMaster.id],
  },
  pistolLinkor: {
    id: String(),
    name: 'Пистоль с королевского линкора',
    description: '',
    type: ItemTypes.pistol,
    imageUrl: ImgPistolLinkor,
    buffs: {},
    effects: [],
    abilities: [Abilities.pistolLinkor.id],
  },
  artefactGoverness: {
    id: String(),
    name: 'Гребень гувернантки',
    description: '',
    type: ItemTypes.artefact,
    imageUrl: ImgArtefactCrestGoverness,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 4,
    },
    effects: [
      Effects.damageGotten20perc.id,
    ],
    abilities: [],
  },

  potionFelixFelicis: {
    id: String(),
    name: 'Феликс фелицис',
    description: 'Можно использовать и получить нереальное усиление до первого боя',
    type: ItemTypes.potion,
    imageUrl: ImgPotionFelix,
    buffs: {},
    effects: [
      Effects.damage_20.id,
      Effects.bleeding_4.id,
      Effects.weakness_5.id,
      Effects.damageGottenHalf.id,
    ],
    abilities: [],
  },


  // QUESTS ------------------------------------------------
  fakeEye: {
    id: String(),
    name: 'Вставной глаз',
    description: 'Неприятный вставной глаз',
    type: ItemTypes.other,
    imageUrl: ImgFakeEye,
    buffs: {},
    effects: [],
    abilities: [],
  },
  caramel: {
    id: String(),
    name: 'Карамелька',
    description: 'Выглядит сладко, как и на вкус',
    type: ItemTypes.other,
    imageUrl: ImgCaramel,
    buffs: {},
    effects: [],
    abilities: [],
  },
  daveyKey: {
    id: String(),
    name: 'Ключ от сундука Дейви Джонса',
    description: 'Открывает что-то интересное',
    type: ItemTypes.other,
    imageUrl: ImgDaveyKey,
    buffs: {},
    effects: [],
    abilities: [],
  },
  potionPoison: {
    id: String(),
    name: 'Яд',
    description: '"А откуда травит?..."',
    type: ItemTypes.other,
    imageUrl: ImgPotionPoison,
    buffs: {},
    effects: [],
    abilities: [],
  },
  rootNirn: {
    id: String(),
    name: 'Корень Нирна',
    description: 'Очень редкий корень',
    type: ItemTypes.other,
    imageUrl: ImgRootNirn,
    buffs: {},
    effects: [],
    abilities: [],
  },
  particleMain: {
    id: String(),
    name: 'Частица Камня укрощения стихии',
    description: 'Частица очень могущественного артефакта',
    type: ItemTypes.other,
    imageUrl: ImgParticleMain,
    buffs: {},
    effects: [],
    abilities: [],
  },

  // ------------------------------------------------
  moneyPouchSmall: {
    id: String(),
    name: 'Мешочек монет мал.',
    description: `Добавляет 75 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgMoneySmall,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
  moneyPouchMid: {
    id: String(),
    name: 'Мешочек монет ср.',
    description: `Добавляет 125 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgMoneyMid,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
  moneyPouchBig: {
    id: String(),
    name: 'Мешочек монет бол.',
    description: `Добавляет 200 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgMoneyBig,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },

  expBottleSmall: {
    id: String(),
    name: 'Бутылочка опыта мал.',
    description: `Добавляет 75 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgExpBottleSmall,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
  expBottleMid: {
    id: String(),
    name: 'Бутылочка опыта ср.',
    description: `Добавляет 125 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgExpBottleMid,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
  expBottleBig: {
    id: String(),
    name: 'Бутылочка опыта бол.',
    description: `Добавляет 200 монет. Нельзя передать. Имеет смысл сразу использовать`,
    type: ItemTypes.other,
    imageUrl: ImgExpBottleBig,
    buffs: {},
    effects: [],
    abilities: [],
    applyable: true,
  },
};

// Set right id's
Object.keys(Items).forEach(id => {
  Items[id].id = String(id);
});

export const InventoryIdsToNumbers: {[key: string]: number} = {};
export const NumbersToInventoryIds: {[key: number]: string} = {};
Object.keys(Items).forEach((key, idx) => {
  InventoryIdsToNumbers[key] = idx;
  NumbersToInventoryIds[idx] = key;
});
