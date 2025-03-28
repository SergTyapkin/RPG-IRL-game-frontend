import { type Effect } from '~/types/types';
import { BuffsTypes, BuffType, DefaultAbilityImage } from '~/constants/constants';

function getFightEffect(name: string, description: string, buffType: BuffType, val: number) {
  return {
    id: String(),
    name: name,
    description: description,
    imageUrl: DefaultAbilityImage,
    isForFight: true,
    onlyForFight: true,
    turns: Infinity,
    buffs: {
      [buffType]: val,
    },
  }
}
const getTeamBleeding = (val: number) => getFightEffect(
  'Командное кровотечение',
  `Ваши союзники, кроме вас, получают ${val} урона каждый ваш ход`,
  BuffsTypes.hpEveryTurn, -val
);
const getTeamRegeneration = (val: number) => getFightEffect(
  'Командная регенерация',
  `Ваши союзники, кроме вас, восстанавливают ${val} единиц здоровья каждый ваш ход`,
  BuffsTypes.hpEveryTurn, val
);
const getBleeding = (val: number) => getFightEffect(
  'Кровотечение',
  `Вы получаете ${val} урона каждый ваш ход`,
  BuffsTypes.hpEveryTurn, -val
);
const getRegeneration = (val: number) => getFightEffect(
  'Регенерация',
  `Вы восстанавливаете ${val} единиц здоровья каждый ваш ход`,
  BuffsTypes.hpEveryTurn, val
);
const getPower = (val: number) => getFightEffect(
  'Сила',
  `Вы наносите на ${val} единицу больше урона`,
  BuffsTypes.damageDoneIncrease, val
);
const getWeakness = (val: number) => getFightEffect(
  'Слабость',
  `Вы наносите на ${val} единиц меньше урона`,
  BuffsTypes.damageDoneIncrease, -val
);
const getPowerPerLevelIncrease = (val: number) => getFightEffect(
  'Дополнительная сила',
  `Вы получаете на ${val} очков силы больше за уровень`,
  BuffsTypes.powerPerLevelIncrease, val
);
const getAgilityPerLevelIncrease = (val: number) => getFightEffect(
  'Дополнительная ловкость',
  `Вы получаете на ${val} очков ловкости больше за уровень`,
  BuffsTypes.agilityPerLevelIncrease, val
);
const getIntelligencePerLevelIncrease = (val: number) => getFightEffect(
  'Дополнительный интеллект',
  `Вы получаете на ${val} очков интеллекта больше за уровень`,
  BuffsTypes.intelligencePerLevelIncrease, val
);

export const Effects: { [key: string]: Effect } = {
  // ----- Fight effects
  teamBleeding_1: getTeamBleeding(1),
  teamRegeneration_1: getTeamRegeneration(1),
  teamBleeding_2: getTeamBleeding(2),
  teamRegeneration_2: getTeamRegeneration(2),
  teamBleeding_3: getTeamBleeding(3),
  teamRegeneration_3: getTeamRegeneration(3),
  teamBleeding_4: getTeamBleeding(4),
  teamRegeneration_4: getTeamRegeneration(4),
  teamBleeding_5: getTeamBleeding(5),
  teamRegeneration_5: getTeamRegeneration(5),
  // -----------------------------
  bleeding_1: getBleeding(1),
  regeneration_1: getRegeneration(1),
  bleeding_2: getBleeding(2),
  regeneration_2: getRegeneration(2),
  bleeding_3: getBleeding(3),
  regeneration_3: getRegeneration(3),
  bleeding_4: getBleeding(4),
  regeneration_4: getRegeneration(4),
  bleeding_5: getBleeding(5),
  regeneration_5: getRegeneration(5),
  // ----------------------------
  power_1: getPower(1),
  weakness_1: getWeakness(1),
  power_2: getPower(2),
  weakness_2: getWeakness(2),
  power_3: getPower(3),
  weakness_3: getWeakness(3),
  power_4: getPower(4),
  weakness_4: getWeakness(4),
  power_5: getPower(5),
  weakness_5: getWeakness(5),

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
  damageIncrease: {
    id: String(),
    name: 'Сила I',
    description: 'Ваш наносимый урон увеличена на 2',
    imageUrl: DefaultAbilityImage,
    isForFight: true,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 2,
    },
  },
  damageModifier: {
    id: String(),
    name: 'Сила II',
    description: 'Ваш наносимый урон увеличена на 25%',
    imageUrl: DefaultAbilityImage,
    isForFight: true,
    buffs: {
      [BuffsTypes.damageDoneModifier]: 1.25,
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
  // -------------------------------------------------------
  statsJustice: {
    id: String(),
    name: 'Равенство',
    description: 'Вы получаете +2 очка к двум не классовым характеристикам за каждый уровень',
    imageUrl: DefaultAbilityImage,
    buffs: {},
  },
  powerAddPerLevel_1: getPowerPerLevelIncrease(1),
  powerAddPerLevel_2: getPowerPerLevelIncrease(2),
  powerAddPerLevel_3: getPowerPerLevelIncrease(3),
  agilityAddPerLevel_1: getAgilityPerLevelIncrease(1),
  agilityAddPerLevel_2: getAgilityPerLevelIncrease(2),
  agilityAddPerLevel_3: getAgilityPerLevelIncrease(3),
  intelligenceAddPerLevel_1: getIntelligencePerLevelIncrease(1),
  intelligenceAddPerLevel_2: getIntelligencePerLevelIncrease(2),
  intelligenceAddPerLevel_3: getIntelligencePerLevelIncrease(3),
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
  if (Effects[id].onlyForFight) {
    FightEffects[id] = Effects[id];
  }
});
