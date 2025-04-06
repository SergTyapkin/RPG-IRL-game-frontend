import { ClassType, ClassTypes } from '~/constants/constants';
import { type Class } from '~/types/types';

import ImgClassPower from '#/images/classes/power.jpg';
import ImgClassAgility from '#/images/classes/agility.jpg';
import ImgClassIntelligence from '#/images/classes/intelligence.jpg';


export const Classes: { [key in ClassType]: Class } = {
  [ClassTypes.power]: {
    type: ClassTypes.power,
    name: 'Танк',
    description: `В эпоху пиратства появились герои с невероятной стойкостью.
Они могли выдержать выстрел из пушки, но без команды были уязвимы из-за своей неповоротливости и низкого урона. 
Для эффективной битвы им необходима поддержка других классов.

За каждый уровень получает 3 очка силы, 2 ловкости и 1 интеллекта`,
    imageUrl: ImgClassPower,
    statsPerLevel: {
      power: 3,
      agility: 2,
      intelligence: 1,
    },
  },
  [ClassTypes.agility]: {
    type: ClassTypes.agility,
    name: 'Ловкач',
    description: `С изобретения оружия появились мастера, раскрывающие его потенциал. Оружие совершенствовалось, делая их ключевыми в битвах. 
Их удары и выстрелы самые сильные — это результат веков изучения орудий.
Но их сила зависит от поддержки: ловкачи уязвимы и требуют усиления характеристик для эффективного боя. 

За каждый уровень получает 2 очка силы, 3 ловкости и 1 интеллекта`,
    imageUrl: ImgClassAgility,
    statsPerLevel: {
      power: 2,
      agility: 3,
      intelligence: 1,
    },
  },
  [ClassTypes.intelligence]: {
    type: ClassTypes.intelligence,
    name: 'Алхимик',
    description: `Мастера магии и алхимии, способные создавать мощные зелья и заклинания. Могут исцелять сокомандников и наносить большой урон противникам засчет комбинаций с союзниками. 
В мире пиратов, где магия переплетается с морскими легендами, этот класс становится незаменимым союзником, эффективно сражаясь с врагами и поддерживая сокомандников.
 
За каждый уровень получает 1 очко силы, 1 ловкости и 4 интеллекта`,
    imageUrl: ImgClassIntelligence,
    statsPerLevel: {
      power: 1,
      agility: 1,
      intelligence: 4,
    },
  },
};

