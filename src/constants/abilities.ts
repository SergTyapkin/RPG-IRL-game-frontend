import { type Ability } from '~/types/types';
import { AbilityTypes, DefaultAbilityImage } from '~/constants/constants';
import { EffectedAbility } from '~/utils/utils';
import { Effects } from '~/constants/effects';

export interface InFightAbility extends EffectedAbility {
  reloadLeft?: number,
}

export const Abilities: {[key: string]: Ability} = {
  default: {
    id: String(),
    name: 'Кулаки',
    description: 'Удар кулаком наносит 1 или 2 урона с 50% шансом одному врагу',
    type: AbilityTypes.other,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 1,
    damageTargets: 1,
    heal: 0,
    reload: 1,
    chances: [
      {
        damage: 1,
        probability: 0.5,
      }
    ],
  },
  healPotion: {
    id: String(),
    name: 'Лечение',
    description: 'Восстанавливает 3 едницы здоровья',
    type: AbilityTypes.potion,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    damageTargets: 0,
    heal: 3,
    reload: 3,
    chances: [],
  },
  swordStorm: {
    id: String(),
    name: 'Меч "Грань Шторма"',
    description: '15 урона. С шансом 50% накладывает командное кровотечение на всех игроков кроме атакуемого',
    type: AbilityTypes.sword,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 15,
    damageTargets: 1,
    heal: 0,
    reload: 1,
    chances: [
      {
        effectsToTargets: [Effects.teamBleeding_2.id],
        probability: 0.5,
      }
    ],
  },
  phoenixLive: {
    id: String(),
    name: 'Жизнь Феникса',
    description: 'Дает возможность восстать после смерти в бою 1 раз. Расходуется',
    type: AbilityTypes.other,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    damageTargets: 0,
    heal: 0,
    reload: Infinity,
    chances: [],
  },
  daggerNightCardinal: {
    id: String(),
    name: 'Кинжал "Ночной кардинал"',
    description: 'Крадет по 2 единицы здоровья у противников',
    type: AbilityTypes.dagger,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    damage: 12,
    damageTargets: 0,
    heal: 0,
    reload: 1,
    chances: [],
  },
  swordAlchemy: {
    id: String(),
    name: 'Сабля алхимика',
    description: 'Дает кровотечение - противник теряет по 2 здоровья каждый его ход',
    type: AbilityTypes.sword,
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [Effects.bleeding_2.id],
    effectsForMe: [],
    damage: 6,
    damageTargets: 0,
    heal: 0,
    reload: 1,
    chances: [],
  },
}

// Set right id's
Object.keys(Abilities).forEach(id => {
  Abilities[id].id = String(id);
});
