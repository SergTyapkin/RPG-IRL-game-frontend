import { type Effect } from '~/types/types';
import { BuffsTypes, BuffType, DefaultAbilityImage } from '~/constants/constants';

function getFightEffect(
  name: string,
  description: string,
  buffType: BuffType,
  val: number,
  hidden: boolean = false,
  isForFight: boolean = false,
  userCanGetInFight: boolean = false,
) {
  return {
    id: String(),
    name: name,
    description: description,
    imageUrl: DefaultAbilityImage,
    isForFight: isForFight,
    userCanGetInFight: userCanGetInFight,
    hidden: hidden,
    turns: Infinity,
    buffs: {
      [buffType]: val,
    },
  };
}

const getTeamBleeding = (val: number) =>
  getFightEffect(
    'Командное кровотечение',
    `Ваши союзники, кроме вас, получают ${val} урона каждый ваш ход`,
    BuffsTypes.hpEveryTurn,
    -val,
    false,
    true,
    true,
  );
const getTeamRegeneration = (val: number) =>
  getFightEffect(
    'Командная регенерация',
    `Ваши союзники, кроме вас, восстанавливают ${val} единиц здоровья каждый ваш ход`,
    BuffsTypes.hpEveryTurn,
    val,
    false,
    true,
    true,
  );
const getBleeding = (val: number) =>
  getFightEffect(
    'Кровотечение',
    `Вы получаете ${val} урона каждый ваш ход`,
    BuffsTypes.hpEveryTurn,
    -val,
    false,
    true,
    true,
  );
const getRegeneration = (val: number) =>
  getFightEffect(
    'Регенерация',
    `Вы восстанавливаете ${val} единиц здоровья каждый ваш ход`,
    BuffsTypes.hpEveryTurn,
    val,
    false,
    true,
    true,
  );
const getDamage = (val: number) =>
  getFightEffect(
    'Сила',
    `Вы наносите на ${val} единиц больше урона`,
    BuffsTypes.damageDoneIncrease,
    val,
    false,
    true,
    true,
  );
const getWeakness = (val: number) =>
  getFightEffect(
    'Слабость',
    `Вы наносите на ${val} единиц меньше урона`,
    BuffsTypes.damageDoneIncrease,
    -val,
    false,
    true,
    true,
  );
const getPowerPerLevelIncrease = (val: number) =>
  getFightEffect(
    'Дополнительная сила',
    `Вы получаете на ${val} очков силы больше за уровень`,
    BuffsTypes.powerPerLevelIncrease,
    val,
  );
const getAgilityPerLevelIncrease = (val: number) =>
  getFightEffect(
    'Дополнительная ловкость',
    `Вы получаете на ${val} очков ловкости больше за уровень`,
    BuffsTypes.agilityPerLevelIncrease,
    val,
  );
const getIntelligencePerLevelIncrease = (val: number) =>
  getFightEffect(
    'Дополнительный интеллект',
    `Вы получаете на ${val} очков интеллекта больше за уровень`,
    BuffsTypes.intelligencePerLevelIncrease,
    val,
  );

export const Effects: { [key: string]: Effect } = {
  // ----- Fight effects
  teamBleeding_1: getTeamBleeding(1),
  teamBleeding_2: getTeamBleeding(2),
  teamRegeneration_2: getTeamRegeneration(2),
  teamRegeneration_3: getTeamRegeneration(3),
  // -----------------------------
  bleeding_1: getBleeding(1),
  bleeding_2: getBleeding(2),
  bleeding_4: getBleeding(4),
  regeneration_1: getRegeneration(1),
  regeneration_5: getRegeneration(5),
  // ----------------------------
  damage_1: getDamage(1),
  damage_2: getDamage(2),
  damage_5: getDamage(5),
  damage_10: getDamage(10),
  weakness_1: getWeakness(1),
  weakness_2: getWeakness(2),
  weakness_5: getWeakness(5),
  // ----------------------------
  protectionHalf: {
    id: String(),
    name: 'Слабая броня',
    description: 'Ваша броня защищает вас на 50% хуже',
    imageUrl: DefaultAbilityImage,
    isForFight: true,
    userCanGetInFight: true,
    turns: Infinity,
    buffs: {
      [BuffsTypes.protectionModifier]: 0.5,
    },
  },
  maxHpHalf: {
    id: String(),
    name: 'Слабое здоровье',
    description: 'Ваше миксимальное здоровье становится равным 70% от текущего',
    imageUrl: DefaultAbilityImage,
    isForFight: true,
    userCanGetInFight: true,
    turns: Infinity,
    buffs: {
      [BuffsTypes.protectionModifier]: 0.7,
    },
  },

  // ----- Default effects
  luck: {
    id: String(),
    name: 'Удача',
    description: 'Вы получаете на 25% больше монет за все квесты',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.moneyModifier]: 1.25,
    },
  },
  experience: {
    id: String(),
    name: 'Опытный взгляд',
    description: 'Вы получаете на 25% больше опыта за все квесты',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.experienceModifier]: 1.25,
    },
  },
  // -------------------------------------------------------
  powerLowCost: {
    id: String(),
    name: 'Дешевая сила',
    description: 'Все умения древа силы требуют для исследования на 1 очко силы меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.powerCostDecrease]: 1,
    },
  },
  agilityLowCost: {
    id: String(),
    name: 'Дешевая ловкость',
    description: 'Все умения древа ловкости требуют для исследования на 1 очко ловкости меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.agilityCostDecrease]: 1,
    },
  },
  intelligenceLowCost: {
    id: String(),
    name: 'Дешевый интеллект',
    description: 'Все умения древа интеллекта требуют для исследования на 1 очко интеллекта меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.intelligenceCostDecrease]: 1,
    },
  },
  damageGottenHalf: {
    id: String(),
    name: 'Блокирование урона',
    description: 'Вы получаете на 50% меньше урона по здоровью',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.damageGottenModifier]: 0.5,
    },
  },
  damageGotten30perc: {
    id: String(),
    name: 'Поглощение урона',
    description: 'Вы получаете на 30% меньше урона по здоровью',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.damageGottenModifier]: 0.3,
    },
  },
  damageGotten20perc: {
    id: String(),
    name: 'Поглощение урона',
    description: 'Вы получаете на 20% меньше урона по здоровью',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.damageGottenModifier]: 0.2,
    },
  },
  // -------------------------------------------------------
  powerAddPerLevel_1: getPowerPerLevelIncrease(1),
  powerAddPerLevel_2: getPowerPerLevelIncrease(2),
  powerAddPerLevel_3: getPowerPerLevelIncrease(3),
  agilityAddPerLevel_1: getAgilityPerLevelIncrease(1),
  agilityAddPerLevel_2: getAgilityPerLevelIncrease(2),
  agilityAddPerLevel_3: getAgilityPerLevelIncrease(3),
  intelligenceAddPerLevel_1: getIntelligencePerLevelIncrease(1),
  intelligenceAddPerLevel_2: getIntelligencePerLevelIncrease(2),
  intelligenceAddPerLevel_3: getIntelligencePerLevelIncrease(3),
  // SPECIAL ------------------------------------------------------
  statsJustice: {
    id: String(),
    name: 'Равенство',
    description: 'Вы получаете +2 очка к двум не классовым характеристикам за каждый уровень',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  protectionAddHalfHp: {
    id: String(),
    name: 'Динамическая броня',
    description: 'Ваша броня увеличивается на число, равное половине текущего значения здоровья',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  swordEfficiency: {
    id: String(),
    name: 'Эффективные мечи',
    description: 'Урон мечей увеличен на 30%',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  daggerEfficiency: {
    id: String(),
    name: 'Эффективные кинжалы',
    description: 'Урон кинжалов увеличен на 30%',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  spellEfficiency: {
    id: String(),
    name: 'Эффективные заклинания',
    description: 'Эффективность заклинаний увеличена на 30%',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  potionEfficiency: {
    id: String(),
    name: 'Эффективные зелья',
    description: 'Эффективность зелий увеличена на 30%',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  pistolEfficiency: {
    id: String(),
    name: 'Эффективные пистолеты',
    description: 'Эффективность пистолетов увеличена на 30%',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
};

// Add 1...10 varied effects values
// [
//   Effects.teamBleeding.id,
//   Effects.teamRegeneration.id,
//   Effects.bleeding.id,
//   Effects.regeneration.id,
//   Effects.power.id,
//   Effects.weakness.id,
// ].forEach(baseId => {
//   for (let i = 1; i < 10; i++) {
//     const newId = `${baseId}_${i}`;
//     const e = deepClone(Effects[baseId]);
//     const buffKey = Object.keys(e.buffs)[0];
//     e.buffs[buffKey] = Effects[baseId].buffs[buffKey] * i;
//     Effects[newId] = e;
//   }
// });

// Set right id's
Object.keys(Effects).forEach(id => {
  Effects[id].id = String(id);
});

// Generate TeamEffectsIds
export const TeamEffectsIds: string[] = [];
['teamBleeding', 'teamRegeneration'].forEach(baseId => {
  for (let i = 1; i <= 5; i++) {
    const newId = `${baseId}_${i}`;
    TeamEffectsIds.push(newId);
  }
});

export const FightEffects: { [key: string]: Effect } = {};
Object.keys(Effects).forEach(id => {
  if (Effects[id].userCanGetInFight) {
    FightEffects[id] = Effects[id];
  }
});
