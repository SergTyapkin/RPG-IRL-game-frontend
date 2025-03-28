import { type Modals } from '@sergtyapkin/modals-popups';
import { User } from '~/types/types';
import { UserLevels } from '~/constants/levels';
import { Classes } from '~/constants/classes';
import { BuffsTypes, ClassTypes, MONEY_LOSE_BY_DEATH_PERCENT } from '~/constants/constants';
import { getAllUserEffects, getTotalUserMaxHP } from '~/utils/utils';
import { Effects } from '~/constants/effects';


export function userIncreaseLevel($user: User, $modals: typeof Modals) {
  const expNeedsToLevel = UserLevels[$user.level].experience;
  $user.stats.experience -= expNeedsToLevel;
  $user.level += 1;

  let powerAdd = Classes[$user.classType].statsPerLevel.power;
  let agilityAdd = Classes[$user.classType].statsPerLevel.agility;
  let intelligenceAdd = Classes[$user.classType].statsPerLevel.intelligence;
  getAllUserEffects($user).forEach(e => {
    powerAdd += e.buffs[BuffsTypes.powerPerLevelIncrease] ?? 0;
    agilityAdd += e.buffs[BuffsTypes.agilityPerLevelIncrease] ?? 0;
    intelligenceAdd += e.buffs[BuffsTypes.intelligenceCostDecrease] ?? 0;

    if (e.id === Effects.statsJustice.id) {
      switch ($user.classType) {
        case ClassTypes.power:
          agilityAdd += 2;
          intelligenceAdd += 2;
          break;
        case ClassTypes.agility:
          powerAdd += 2;
          intelligenceAdd += 2;
          break;
        case ClassTypes.intelligence:
          powerAdd += 2;
          agilityAdd += 2;
          break;
      }
    }
  });
  $user.stats.power += powerAdd;
  $user.stats.agility += agilityAdd;
  $user.stats.intelligence += intelligenceAdd;

  const maxLevel = Math.max(...Object.keys(UserLevels).map(Number));
  $modals.alert(
    'Уровень повышен!',
    `Вы получили уровень ${$user.level}!
        Начислено ${powerAdd} силы, ${agilityAdd} ловкости и ${intelligenceAdd} интеллекта.
${$user.level < maxLevel ? `Для уровня ${$user.level + 1} понадобится ${UserLevels[$user.level + 1].experience}xp` : ''}`,
  );
}

export function userDead($user: User): number {
  const loosedMoney = Math.round($user.stats.money * MONEY_LOSE_BY_DEATH_PERCENT);
  $user.stats.money -= loosedMoney;
  $user.notSyncedStats.experience = 0;
  $user.notSyncedStats.money = 0;
  $user.notSyncedStats.power = 0;
  $user.notSyncedStats.agility = 0;
  $user.notSyncedStats.intelligence = 0;

  return loosedMoney;
}

export function userRevive($user: User) {
  $user.stats.hp = getTotalUserMaxHP($user);
}
