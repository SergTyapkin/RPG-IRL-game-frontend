import { type Ability } from '~/types/types';
import { DefaultAbilityImage } from '~/constants/constants';
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
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [],
    damage: 0,
    damageTargets: 0,
    heal: 3,
    reload: 3,
    chances: [],
  },
}

// Set right id's
Object.keys(Abilities).forEach(id => {
  Abilities[id].id = String(id);
});
