import { deepClone } from '~/utils/utils';

export const Guilds = {
  1: {
    name: "Тевкры"
  },
  2: {
    name: "Ушкуйники",
  },
  3: {
    name: "Долопийцы",
  },
  4: {
    name: "Флибустьеры",
  },
  5: {
    name: "Витальеры",
  },
  6: {
    name: "Корсары",
  },
  7: {
    name: "Каперы",
  },
  8: {
    name: "Клефты",
  },
  9: {
    name: "Вокоу",
  },
  10: {
    name: "Приватиры",
  },
  11: {
    name: "Буканьеры",
  },
};

export const ResourceTypes = {
  money: "M",
  hp: "H",
  experience: "X",
  power: "P",
  agility: "A",
  protection: "D",
  intelligence: "I",
}

export const ItemTypes = {
  hat: 'hat',
  main: 'main',
  boots: 'boots',
  artefact: 'artefact',
  weapon: 'weapon',
  material: 'material',
  other: 'other',
}

export const SkillTrees: {[key: string]: Skill} = {
  [ResourceTypes.power]: {
    name: 'Сила 1',
    effects: '????',
    cost: 1,
    description: 'Pretty description',
    position: [100, 0],
    children: [
      {
        name: 'Сила 1-1',
        effects: '????',
        cost: 3,
        description: 'Левое поддерево',
        position: [0, 150],
        children: [
          {
            name: 'Сила 1-1-1',
            effects: '????',
            cost: 3,
            description: 'Левое левое поддерево',
            position: [0, 300],
            children: [

            ]
          },
          {
            name: 'Сила 1-1-2',
            effects: '????',
            cost: 4,
            description: 'Левое правое поддерево',
            position: [150, 300],
            children: [
              {
                name: 'Сила 1-1-1-1',
                effects: '????',
                cost: 15,
                description: 'Левое левое поддерево',
                position: [80, 450],
                children: [

                ]
              },
              {
                name: 'Сила 1-1-2-2',
                effects: '????',
                cost: 20,
                description: 'Левое правое поддерево',
                position: [220, 450],
                children: [

                ]
              },
            ]
          },
        ]
      },
      {
        name: 'Сила 1-2',
        effects: '????',
        cost: 4,
        description: 'Правое поддерево',
        position: [200, 150],
        children: [
          {
            name: 'Сила 1-2-1',
            effects: '????',
            cost: 30,
            description: 'Правое левое поддерево',
            position: [300, 300],
            children: [

            ]
          },
          {
            name: 'Сила 1-2-2',
            effects: '????',
            cost: 45,
            description: 'Правое правое поддерево',
            position: [500, 300],
            children: [

            ]
          },
        ]
      },
    ]
  },

  [ResourceTypes.agility]: {
    name: 'Ловкость 1',
    effects: '????',
    cost: 1,
    description: 'Pretty description',
    position: [10, 20],
    children: [
      {
        name: 'Ловкость 1-1',
        effects: '????',
        cost: 3,
        description: 'Левое поддерево',
        position: [30, 50],
        children: [
          {
            name: 'Ловкость 1-1-1',
            effects: '????',
            cost: 3,
            description: 'Левое левое поддерево',
            position: [50, 80],
            children: [

            ]
          },
          {
            name: 'Ловкость 1-1-2',
            effects: '????',
            cost: 4,
            description: 'Левое правое поддерево',
            position: [30, 30],
            children: [

            ]
          },
        ]
      },
      {
        name: 'Ловкость 1-2',
        effects: '????',
        cost: 4,
        description: 'Правое поддерево',
        position: [30, 80],
        children: [
          {
            name: 'Ловкость 1-2-1',
            effects: '????',
            cost: 30,
            description: 'Правое левое поддерево',
            position: [50, 70],
            children: [

            ]
          },
          {
            name: 'Ловкость 1-2-2',
            effects: '????',
            cost: 45,
            description: 'Правое правое поддерево',
            position: [30, 90],
            children: [

            ]
          },
        ]
      },
    ]
  },

  [ResourceTypes.intelligence]: {
    name: 'Интелект 1',
    effects: '????',
    cost: 1,
    description: 'Pretty description',
    position: [10, 20],
    children: [
      {
        name: 'Интелект 1-2-1',
        effects: '????',
        cost: 30,
        description: 'Правое левое поддерево',
        position: [50, 10],
        children: [

        ]
      },
      {
        name: 'Интелект 1-2-2',
        effects: '????',
        cost: 45,
        description: 'Правое правое поддерево',
        position: [30, 90],
        children: [

        ]
      },
    ],
  },
}

export const IterableSkillTrees = {};
function addItemAndChildren(targetArray: any[], currentTreeKey: string, item: Skill, parent?: Skill = undefined) {
  if (parent) {
    const dx = item.position[0] - parent.position[0];
    const dy = item.position[1] - parent.position[1];
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (dx === 0 || dy === 0) {
      item.lines = [
        [item.position[0], item.position[1], parent.position[0], parent.position[1]]
      ];
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
  item.id = `${currentTreeKey}${targetArray.length}`
  targetArray.push(item);
  item.children.forEach(child => addItemAndChildren(targetArray, currentTreeKey, child, item));
}

Object.keys(SkillTrees).forEach(key => {
  IterableSkillTrees[key] = [];
  addItemAndChildren(IterableSkillTrees[key], key, SkillTrees[key]);
});
