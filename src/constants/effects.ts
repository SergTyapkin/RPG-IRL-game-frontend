import { type Effect } from '~/types/types';
import { BuffsTypes, DefaultAbilityImage } from '~/constants/constants';

export const Effects: { [key: string]: Effect } = {
  // ----- Fight effects
  bleeding: {
    id: String(),
    name: 'Кровотечение',
    description: 'Вы получаете 1 единицу урона каждый ход',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: true,
    turns: Infinity,
    buffs: {
    },
  },
  regeneration: {
    id: String(),
    name: 'Регенерация',
    description: 'Вы восстанавливаете 1 единицу здоровья каждый ход',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: true,
    turns: Infinity,
    buffs: {
    },
  },
  power: {
    id: String(),
    name: 'Сила',
    description: 'Вы наносите на 1 единицу больше урона',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: true,
    turns: Infinity,
    buffs: {
    },
  },
  weakness: {
    id: String(),
    name: 'Слабость',
    description: 'Вы наносите на 1 единицу урона меньше',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: true,
    turns: Infinity,
    buffs: {
    },
  },

  // ----- Operational (hidden) effects
  maxHp_op: {
    id: String(),
    name: '+ макс. здоровье',
    description: 'Ваше максимальное здоровье увеличено на 1',
    imageUrl: DefaultAbilityImage,
    hidden: true,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 1,
    },
  },
  protection_op: {
    id: String(),
    name: '+ защита',
    description: 'Ваша защита увеличена на 1',
    imageUrl: DefaultAbilityImage,
    hidden: true,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.protectionIncrease]: 1,
    },
  },
  damage_op: {
    id: String(),
    name: '+ урон',
    description: 'Ваша урон увеличен на 1',
    imageUrl: DefaultAbilityImage,
    hidden: true,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 1,
    },
  },

  // ----- Default effects
  luck: {
    id: String(),
    name: 'Удача',
    description: 'Вы получаете на 25% больше монет за все квесты',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.moneyModifier]: 1.25,
    },
  },
  experience: {
    id: String(),
    name: 'Опытный взгляд',
    description: 'Вы получаете на 25% больше опыта за все квесты',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.experienceModifier]: 1.25,
    },
  },
  maxHp: {
    id: String(),
    name: 'Дополнительное здоровье',
    description: 'Ваше максимальное здоровье увеличено на 2',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 2,
    },
  },
  protection: {
    id: String(),
    name: 'Железная кожа',
    description: 'Ваша защита увеличена на 2',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    },
  },
  damage1: {
    id: String(),
    name: 'Сила I',
    description: 'Ваш наносимый урон увеличена на 2',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 2,
    },
  },
  damage2: {
    id: String(),
    name: 'Сила II',
    description: 'Ваш наносимый урон увеличена на 25%',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.damageDoneModifier]: 1.25,
    },
  },
  powerLowCost: {
    id: String(),
    name: 'Дешевая сила',
    description: 'Все умения древа силы требуют для исследования на 1 очко силы меньше',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.powerCostDecrease]: 1,
    },
  },
  agilityLowCost: {
    id: String(),
    name: 'Ловкость в крови',
    description: 'Все умения древа ловкости требуют для исследования на 1 очко ловкости меньше',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.agilityCostDecrease]: 1,
    },
  },
  intelligenceLowCost: {
    id: String(),
    name: 'Прирожденный гений',
    description: 'Все умения древа интеллекта требуют для исследования на 1 очко интеллекта меньше',
    imageUrl: DefaultAbilityImage,
    hidden: false,
    onlyForFight: false,
    buffs: {
      [BuffsTypes.intelligenceCostDecrease]: 1,
    },
  },
};

// Set right id's
Object.keys(Effects).forEach(id => {
  Effects[id].id = String(id);
});

export const FightEffects: { [key: string]: Effect } = {}
Object.keys(Effects).forEach(id => {
  if (Effects[id].onlyForFight) {
    FightEffects[id] = Effects[id];
  }
});
