import { type Ability, type Skill } from '~/types/types';
import { BuffsTypes, ResourceType, ResourceTypes } from '~/constants/constants';
import { abilitiesIdsToAbilities, deepClone, effectsIdsToEffects, ExtendedSkill } from '~/utils/utils';
import { Abilities } from '~/constants/abilities';
import ImgPower from '#/images/skills/powerSkill.png';
import ImgAgility from '#/images/skills/agilitySkill.png';
import ImgIntelligence from '#/images/skills/intelligentSkill.png';

export const SkillTrees: { [key in ResourceType]: Skill } = {
  [ResourceTypes.power]: {
    name: 'Зарождение силы',
    description: '',
    abilities: [],
    buffs: {
      [BuffsTypes.maxHpIncrease]: 2,
    },
    effects: [],
    cost: 1,
    position: [0, 0],
    imageUrl: ImgPower,
    children: [
      {
        name: 'Продолжение силы',
        description: '',
        abilities: [],
        buffs: {
          [BuffsTypes.maxHpIncrease]: 4,
        },
        effects: [],
        cost: 2,
        position: [500, 150],
        imageUrl: ImgPower,
        children: [
          {
            name: 'Миксимальная сила',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.maxHpIncrease]: 8,
            },
            effects: [],
            cost: 6,
            position: [670, 200],
            imageUrl: ImgPower,
            children: [

            ],
          },
          {
            name: 'Миксимальный урон',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.damageDoneIncrease]: 8,
            },
            effects: [],
            cost: 7,
            position: [570, 300],
            imageUrl: ImgPower,
            children: [

            ],
          },
          {
            name: 'Дополнительная сила',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.maxHpModifier]: 1.8,
            },
            effects: [],
            cost: 6,
            position: [400, 300],
            imageUrl: ImgPower,
            children: [
              {
                name: 'Сильнейшее мореходство',
                description: '',
                abilities: [],
                buffs: {
                  [BuffsTypes.maxHpIncrease]: 8,
                  [BuffsTypes.protectionIncrease]: 5,
                },
                effects: [],
                cost: 7,
                position: [400, 450],
                imageUrl: ImgPower,
                children: [
                  {
                    name: 'Великая сила морей',
                    description: 'Открывает атаку "Слабость морей"',
                    abilities: [Abilities.seaWeakness.id],
                    buffs: {},
                    effects: [],
                    cost: 8,
                    position: [400, 600],
                    imageUrl: ImgPower,
                    children: [

                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Начало защиты',
        description: '',
        abilities: [],
        buffs: {
          [BuffsTypes.protectionIncrease]: 2,
        },
        effects: [],
        cost: 3,
        position: [100, 150],
        imageUrl: ImgPower,
        children: [
          {
            name: 'Защита II',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.protectionIncrease]: 3,
            },
            effects: [],
            cost: 4,
            position: [0, 300],
            imageUrl: ImgPower,
            children: [

            ],
          },
          {
            name: 'Защита + Здоровье',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.protectionIncrease]: 3,
              [BuffsTypes.maxHpIncrease]: 3,
            },
            effects: [],
            cost: 6,
            position: [120, 300],
            imageUrl: ImgPower,
            children: [

            ],
          },
          {
            name: 'Здоровье + Защита II',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.protectionIncrease]: 5,
              [BuffsTypes.maxHpIncrease]: 4,
            },
            effects: [],
            cost: 7,
            position: [270, 300],
            imageUrl: ImgPower,
            children: [
              {
                name: 'Ультимативная защита',
                description: '',
                abilities: [],
                buffs: {
                  [BuffsTypes.protectionIncrease]: 10,
                },
                effects: [],
                cost: 8,
                position: [150, 450],
                imageUrl: ImgPower,
                children: [

                ],
              },
            ],
          },
        ],
      },
    ],
  },

  [ResourceTypes.agility]: {
    name: 'Зарождение урона',
    description: '',
    abilities: [],
    buffs: {
      [BuffsTypes.damageDoneIncrease]: 1,
    },
    effects: [],
    cost: 1,
    position: [100, 0],
    imageUrl: ImgAgility,
    children: [
      {
        name: 'Защита от злых сил',
        description: '',
        abilities: [],
        buffs: {
          [BuffsTypes.protectionIncrease]: 2,
        },
        effects: [],
        cost: 3,
        position: [100, 300],
        imageUrl: ImgAgility,
        children: [
          {
            name: 'Еще урон?',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.damageDoneIncrease]: 2,
              [BuffsTypes.protectionIncrease]: 2,
            },
            effects: [],
            cost: 4,
            position: [0, 300],
            imageUrl: ImgAgility,
            children: [],
          },
          {
            name: 'ЕЩЁ УРОН??',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.damageDoneIncrease]: 4,
            },
            effects: [],
            cost: 7,
            position: [50, 450],
            imageUrl: ImgAgility,
            children: [],
          },
          {
            name: 'И ЕЩЁЁ УРОН??',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.damageDoneIncrease]: 4,
            },
            effects: [],
            cost: 10,
            position: [50, 450],
            imageUrl: ImgAgility,
            children: [
              {
                name: 'Убийственная сила',
                description: '',
                abilities: [],
                buffs: {
                  [BuffsTypes.damageDoneIncrease]: 4,
                },
                effects: [],
                cost: 10,
                position: [50, 600],
                imageUrl: ImgAgility,
                children: [
                  {
                    name: 'Ультимативная сила',
                    description: 'Открывает "Силу морей"',
                    abilities: [Abilities.bigDamage.id],
                    buffs: {},
                    effects: [],
                    cost: 7,
                    position: [150, 750],
                    imageUrl: ImgAgility,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'УРОН??',
        description: '',
        abilities: [],
        buffs: {
          [BuffsTypes.damageDoneIncrease]: 4,
        },
        effects: [],
        cost: 7,
        position: [0, 150],
        imageUrl: ImgAgility,
        children: [],
      },
      {
        name: 'Продолжение урона',
        description: '',
        abilities: [],
        buffs: {
          [BuffsTypes.damageDoneIncrease]: 2,
        },
        effects: [],
        cost: 6,
        position: [250, 300],
        imageUrl: ImgAgility,
        children: [
          {
            name: 'Финальный урон',
            description: '',
            abilities: [],
            buffs: {
              [BuffsTypes.damageDoneIncrease]: 15,
            },
            effects: [],
            cost: 25,
            position: [400, 450],
            imageUrl: ImgAgility,
            children: [],
          },
        ],
      },
    ],
  },

  [ResourceTypes.intelligence]: {
    name: 'Зарождение магии',
    description: '',
    abilities: [],
    buffs: {
      [BuffsTypes.maxHpIncrease]: 5,
    },
    effects: [],
    cost: 3,
    position: [200, 0],
    imageUrl: ImgIntelligence,
    children: [
      {
        name: 'Магия огня',
        description: 'Открывает доступ к ветке огня',
        abilities: [],
        buffs: {
          [BuffsTypes.maxHpIncrease]: 3,
        },
        effects: [],
        cost: 3,
        position: [350, 100],
        imageUrl: ImgIntelligence,
        children: [
          {
            name: 'Огненный шар 1',
            description: 'Открывает атаку',
            abilities: [Abilities.fireball1.id],
            buffs: {},
            effects: [],
            cost: 5,
            position: [450, 150],
            imageUrl: ImgIntelligence,
            children: [
              {
                name: 'Огненный шар 2',
                description: 'Открывает атаку',
                abilities: [Abilities.fireball2.id],
                buffs: {},
                effects: [],
                cost: 7,
                position: [450, 300],
                imageUrl: ImgIntelligence,
                children: [],
              },
            ],
          },
          {
            name: 'Стена огня 1',
            description: 'Открывает атаку',
            abilities: [Abilities.firewall1.id],
            buffs: {},
            effects: [],
            cost: 5,
            position: [350, 200],
            imageUrl: ImgIntelligence,
            children: [
              {
                name: 'Стена огня 2',
                description: 'Открывает атаку',
                abilities: [Abilities.firewall2.id],
                buffs: {},
                effects: [],
                cost: 7,
                position: [350, 350],
                imageUrl: ImgIntelligence,
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: 'Магия воды',
        description: 'Открывает доступ к ветке воды',
        cost: 3,
        abilities: [],
        buffs: {
          [BuffsTypes.maxHpIncrease]: 3,
        },
        effects: [],
        position: [0, 150],
        imageUrl: ImgIntelligence,
        children: [
          {
            name: 'Водяной шар 1',
            description: 'Открывает атаку',
            cost: 5,
            abilities: [Abilities.waterball1.id],
            buffs: {},
            effects: [],
            position: [0, 300],
            imageUrl: ImgIntelligence,
            children: [
              {
                name: 'Водяной шар 2',
                description: 'Открывает атаку',
                cost: 7,
                abilities: [Abilities.waterball2.id],
                buffs: {},
                effects: [],
                position: [0, 450],
                imageUrl: ImgIntelligence,
                children: [],
              },
            ],
          },
          {
            name: 'Водяная стена 1',
            description: 'Открывает атаку',
            cost: 5,
            abilities: [Abilities.waterwall1.id],
            buffs: {},
            effects: [],
            position: [150, 250],
            imageUrl: ImgIntelligence,
            children: [
              {
                name: 'Водяная стена 2',
                description: 'Открывает атаку',
                cost: 7,
                abilities: [Abilities.waterwall2.id],
                buffs: {},
                effects: [],
                position: [150, 400],
                imageUrl: ImgIntelligence,
                children: [],
              },
            ],
          },
        ],
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
