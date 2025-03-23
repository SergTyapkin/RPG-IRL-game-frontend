import DefaultKnifeImage from '#/images/knife-example.png';
import DefaultAbilityImage from '#/images/ability-image-example.png';
import DefaultAvatarImage from '#/images/user-avatar-example.png';

export {DefaultKnifeImage, DefaultAbilityImage, DefaultAvatarImage};


export const Guilds = {
  1: {
    name: 'Тевкры',
  },
  2: {
    name: 'Ушкуйники',
  },
  3: {
    name: 'Долопийцы',
  },
  4: {
    name: 'Флибустьеры',
  },
  5: {
    name: 'Витальеры',
  },
  6: {
    name: 'Корсары',
  },
  7: {
    name: 'Каперы',
  },
  8: {
    name: 'Клефты',
  },
  9: {
    name: 'Вокоу',
  },
  10: {
    name: 'Приватиры',
  },
  11: {
    name: 'Буканьеры',
  },
};

export const ResourceTypes = {
  money: 'M',
  hp: 'H',
  experience: 'X',
  power: 'P',
  agility: 'A',
  protection: 'D',
  intelligence: 'I',
};

export const ItemTypes = {
  hat: 'hat',
  main: 'main',
  boots: 'boots',
  artefact: 'artefact',
  weapon: 'weapon',
  material: 'material',
  other: 'other',
};

export const BuffsTypes = {
  hp: 'hp',
  protection: 'protection',
  experienceModifier: 'experienceModifier',
  moneyModifier: 'moneyModifier',
  powerModifier: 'powerModifier',
  agilityModifier: 'agilityModifier',
  intelligenceModifier: 'intelligenceModifier',
  damageDoneModifier: 'damageDoneModifier',
};

export const QRTypes = {
  resource: 'R',
  item: 'I',
  heal: 'H',
  damage: 'D',
  sync: 'S',
}

export const UserLevels: {[key: number]: {experience: number}} = {
  1: {
    experience: 500,
  },
  2: {
    experience: 1000,
  },
  3: {
    experience: 2000,
  },
  4: {
    experience: 4000,
  },
  5: {
    experience: 6000,
  },
  6: {
    experience: 8000,
  },
  7: {
    experience: 10000,
  },
  8: {
    experience: 12000,
  },
  9: {
    experience: 15000,
  },
  10: {
    experience: 20000,
  },
}

export const GuildLevels: {[key: number]: {experience: number}} = {};
(Object.entries(UserLevels)).forEach(([levelNumber, levelData]) => {
  GuildLevels[Number(levelNumber)] = {
    experience: levelData.experience * 10,
  }
});

export const SkillTrees: { [key: string]: Skill } = {
  [ResourceTypes.power]: {
    name: 'Сила 1',
    abilities: [],
    buffs: [],
    effects: [],
    cost: 1,
    description: 'Pretty description',
    position: [100, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Сила 1-1',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 3,
        description: 'Левое поддерево',
        position: [0, 150],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Сила 1-1-1',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 3,
            description: 'Левое левое поддерево',
            position: [0, 300],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
          {
            name: 'Сила 1-1-2',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 4,
            description: 'Левое правое поддерево',
            position: [150, 300],
            imageUrl: DefaultKnifeImage,
            children: [
              {
                name: 'Сила 1-1-1-1',
                abilities: [],
                buffs: [],
                effects: [],
                cost: 15,
                description: 'Левое левое поддерево',
                position: [80, 450],
                imageUrl: DefaultKnifeImage,
                children: [],
              },
              {
                name: 'Сила 1-1-2-2',
                abilities: [],
                buffs: [],
                effects: [],
                cost: 20,
                description: 'Левое правое поддерево',
                position: [220, 450],
                imageUrl: DefaultKnifeImage,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'Сила 1-2',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 4,
        description: 'Правое поддерево',
        position: [200, 150],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Сила 1-2-1',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 30,
            description: 'Правое левое поддерево',
            position: [300, 300],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
          {
            name: 'Сила 1-2-2',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 45,
            description: 'Правое правое поддерево',
            position: [500, 300],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
        ],
      },
    ],
  },

  [ResourceTypes.agility]: {
    name: 'Ловкость 1',
    abilities: [],
    buffs: [],
    effects: [],
    cost: 1,
    description: 'Pretty description',
    position: [150, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Ловкость 1-1',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 3,
        description: 'Левое поддерево',
        position: [100, 300],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Ловкость 1-1-1',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 3,
            description: 'Левое левое поддерево',
            position: [0, 300],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
          {
            name: 'Ловкость 1-1-2',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 4,
            description: 'Левое правое поддерево',
            position: [50, 450],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
        ],
      },
      {
        name: 'Ловкость 1-2',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 4,
        description: 'Правое поддерево',
        position: [200, 300],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Ловкость 1-2-1',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 30,
            description: 'Правое левое поддерево',
            position: [150, 450],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
          {
            name: 'Ловкость 1-2-2',
            abilities: [],
            buffs: [],
            effects: [],
            cost: 45,
            description: 'Правое правое поддерево',
            position: [300, 450],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
        ],
      },
    ],
  },

  [ResourceTypes.intelligence]: {
    name: 'Интелект 1',
    abilities: [],
    buffs: [],
    effects: [],
    cost: 1,
    description: 'Pretty description',
    position: [200, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Интелект 1-2-1',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 30,
        description: 'Правое левое поддерево',
        position: [50, 100],
        imageUrl: DefaultKnifeImage,
        children: [],
      },
      {
        name: 'Интелект 1-2-2',
        abilities: [],
        buffs: [],
        effects: [],
        cost: 45,
        description: 'Правое правое поддерево',
        position: [150, 200],
        imageUrl: DefaultKnifeImage,
        children: [],
      },
    ],
  },
};

export const IterableSkillTrees: { [key: string]: Skill[] } = {};

function addItemAndChildren(
  targetArray: any[],
  currentTreeKey: string,
  item: Skill,
  parent: Skill | undefined = undefined,
) {
  if (parent) {
    const dx = item.position[0] - parent.position[0];
    const dy = item.position[1] - parent.position[1];
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (dx === 0 || dy === 0) {
      item.lines = [[item.position[0], item.position[1], parent.position[0], parent.position[1]]];
    } else if (absDx > absDy) {
      item.lines = [
        [item.position[0], item.position[1], item.position[0] - (dx > 0 ? absDy : -absDy), parent.position[1]],
        [item.position[0] - (dx > 0 ? absDy : -absDy), parent.position[1], parent.position[0], parent.position[1]],
      ];
    } else {
      item.lines = [
        [item.position[0], item.position[1], parent.position[0], item.position[1] - (dy > 0 ? absDx : -absDx)],
        [parent.position[0], item.position[1] - (dy > 0 ? absDx : -absDx), parent.position[0], parent.position[1]],
      ];
    }
  } else {
    item.lines = [];
  }
  item.parentId = parent?.id;
  item.id = `${currentTreeKey}${targetArray.length}`;

  item.effects.forEach(effect => {
    effect.sourceType = 'skill';
    effect.source = item;
  });
  item.abilities.forEach(ability => {
    ability.sourceType = 'skill';
    ability.source = item;
  });
  targetArray.push(item);
  item.children.forEach(child => addItemAndChildren(targetArray, currentTreeKey, child, item));
}

Object.keys(SkillTrees).forEach(key => {
  IterableSkillTrees[key] = [];
  addItemAndChildren(IterableSkillTrees[key], key, SkillTrees[key]);
});
