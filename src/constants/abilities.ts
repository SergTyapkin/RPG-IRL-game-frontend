import { type Ability } from '~/types/types';
import { DefaultAbilityImage } from '~/constants/constants';
import { EffectedAbility } from '~/utils/utils';
import { Effects } from '~/constants/effects';

export interface InFightAbility extends EffectedAbility {
  reloadLeft?: number,
}

export const Abilities: {[key: string]: Ability} = {
  daggerHit: {
    id: String(),
    name: 'Удар кинжала',
    description: 'Наносит 1 урона одному врагу. Даёт кровотечение',
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [Effects.bleeding.id],
    effectsForMe: [Effects.regeneration.id],
    damage: 1,
    damageTargets: 1,
    heal: 0,
    reload: 1,
  },
  longSwordHit: {
    id: String(),
    name: 'Удар длинного меча',
    description: 'Наносит 5 урона двум врагам. Накладывает на них слабость',
    imageUrl: DefaultAbilityImage,
    effectsToTargets: [],
    effectsForMe: [Effects.weakness.id],
    damage: 5,
    damageTargets: 2,
    heal: 0,
    reload: 2,
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
  },
}

// Set right id's
Object.keys(Abilities).forEach(id => {
  Abilities[id].id = String(id);
});
