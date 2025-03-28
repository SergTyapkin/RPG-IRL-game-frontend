import { type Ability, type Skill } from '~/types/types';
import { BuffsTypes, DefaultKnifeImage, ResourceType, ResourceTypes } from '~/constants/constants';
import { abilitiesIdsToAbilities, deepClone, effectsIdsToEffects, ExtendedSkill } from '~/utils/utils';
import { Effects } from '~/constants/effects';
import { Abilities } from '~/constants/abilities';

export const SkillTrees: { [key in ResourceType]: Skill } = {
  [ResourceTypes.power]: {
    name: 'Сила 1',
    description: 'Открывает лечение',
    abilities: [
      Abilities.healPotion.id,
    ],
    buffs: {},
    effects: [],
    cost: 1,
    position: [100, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Сила 1-1',
        description: 'Добавляет 1 макс. здоровье и ещё что-то',
        abilities: [],
        buffs: {},
        effects: [
          Effects.damage_2.id,
        ],
        cost: 3,
        position: [0, 150],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Сила 1-1-1',
            abilities: [],
            buffs: {
              [BuffsTypes.maxHpIncrease]: 2,
              [BuffsTypes.protectionIncrease]: 2,
            },
            effects: [],
            cost: 3,
            description: 'Добавляет 2 макс. здоровья и 2 защиты, но незаметно',
            position: [0, 300],
            imageUrl: DefaultKnifeImage,
            children: [],
          },
          {
            name: 'Сила 1-1-2',
            abilities: [],
            buffs: {},
            effects: [],
            cost: 4,
            description: 'Левое правое поддерево',
            position: [150, 300],
            imageUrl: DefaultKnifeImage,
            children: [
              {
                name: 'Сила 1-1-1-1',
                abilities: [],
                buffs: {},
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
                buffs: {},
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
        buffs: {},
        effects: [],
        cost: 4,
        description: 'Правое поддерево',
        position: [200, 150],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Сила 1-2-1',
            abilities: [],
            buffs: {},
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
            buffs: {},
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
    buffs: {},
    effects: [],
    cost: 1,
    description: 'Pretty description',
    position: [150, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Ловкость 1-1',
        abilities: [],
        buffs: {},
        effects: [],
        cost: 3,
        description: 'Левое поддерево',
        position: [100, 300],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Ловкость 1-1-1',
            abilities: [],
            buffs: {},
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
            buffs: {},
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
        buffs: {},
        effects: [],
        cost: 4,
        description: 'Правое поддерево',
        position: [200, 300],
        imageUrl: DefaultKnifeImage,
        children: [
          {
            name: 'Ловкость 1-2-1',
            abilities: [],
            buffs: {},
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
            buffs: {},
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
    buffs: {},
    effects: [],
    cost: 1,
    description: 'Pretty description',
    position: [200, 0],
    imageUrl: DefaultKnifeImage,
    children: [
      {
        name: 'Интелект 1-2-1',
        abilities: [],
        buffs: {},
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
        buffs: {},
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

export const IterableSkillTrees: { [key in ResourceType]: ExtendedSkill[] } = {};

function setIdParentIdLinesForItemAndChildren(
  targetArray: ExtendedSkill[],
  currentTreeKey: ResourceType,
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
  const extItem = deepClone(item) as unknown as ExtendedSkill;
  extItem.effects = effectsIdsToEffects(item.effects);
  extItem.abilities = abilitiesIdsToAbilities(item.abilities) as unknown as Ability[];

  targetArray.push(extItem);
  extItem.children.forEach(child => setIdParentIdLinesForItemAndChildren(targetArray, currentTreeKey, child, item));
}

Object.keys(SkillTrees).forEach((key: ResourceType) => {
  IterableSkillTrees[key] = [];
  setIdParentIdLinesForItemAndChildren(IterableSkillTrees[key], key, SkillTrees[key]);
});
