import { type Ability } from '~/types/types';
import { DefaultAbilityImage } from '~/constants/constants';


export const Abilities: {[key: string]: Ability} = {
  daggerHit: {
    id: String(),
    name: 'Удар кинжала',
    description: 'Наносит 2 урона одному врагу. Без эффектов',
    imageUrl: DefaultAbilityImage,
    buffs: {
    },
    damage: 2,
    damageTargets: 1,
    heal: 0,
    reload: 1,
  },
  longSwordHit: {
    id: String(),
    name: 'Удар длинного меча',
    description: 'Наносит 6 урона одному врагу. Без эффектов',
    imageUrl: DefaultAbilityImage,
    buffs: {
    },
    damage: 6,
    damageTargets: 1,
    heal: 0,
    reload: 1,
  },
  healPotion: {
    id: String(),
    name: 'Лечение',
    description: 'Восстанавливает 3 едницы здоровья',
    imageUrl: DefaultAbilityImage,
    buffs: {
    },
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
