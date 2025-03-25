import { type Effect } from '~/types/types';
import { BuffsTypes, DefaultAbilityImage } from '~/constants/constants';


export const Effects: {[key: string]: Effect} = {
  luck: {
    id: String(),
    name: 'Удача',
    description: 'Вы получаете на 25% больше монет за все квесты',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.moneyModifier]: 1.25,
    }
  },
  experience: {
    id: String(),
    name: 'Опытный взгляд',
    description: 'Вы получаете на 25% больше опыта за все квесты',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.experienceModifier]: 1.25,
    }
  },
  maxHp: {
    id: String(),
    name: 'Дополнительное здоровье',
    description: 'Ваше максимальное здоровье увеличено на 2',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.maxHpIncrease]: 2,
    }
  },
  protection: {
    id: String(),
    name: 'Железная кожа',
    description: 'Ваша защита увеличена на 2',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.protectionIncrease]: 2,
    }
  },
  damage1: {
    id: String(),
    name: 'Сила I',
    description: 'Ваш наносимый урон увеличена на 2',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 2,
    }
  },
  damage2: {
    id: String(),
    name: 'Сила II',
    description: 'Ваш наносимый урон увеличена на 25%',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.damageDoneModifier]: 1.25,
    }
  },
  powerLowCost: {
    id: String(),
    name: 'Дешевая сила',
    description: 'Все умения древа силы требуют для исследования на 1 очко силы меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.powerCostDecrease]: 1,
    }
  },
  agilityLowCost: {
    id: String(),
    name: 'Ловкость в крови',
    description: 'Все умения древа ловкости требуют для исследования на 1 очко ловкости меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.agilityCostDecrease]: 1,
    }
  },
  intelligenceLowCost: {
    id: String(),
    name: 'Прирожденный гений',
    description: 'Все умения древа интеллекта требуют для исследования на 1 очко интеллекта меньше',
    imageUrl: DefaultAbilityImage,
    buffs: {
      [BuffsTypes.intelligenceCostDecrease]: 1,
    }
  },
}

// Set right id's
Object.keys(Effects).forEach(id => {
  Effects[id].id = String(id);
});
