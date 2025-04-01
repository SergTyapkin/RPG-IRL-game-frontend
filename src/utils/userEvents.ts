import { type Modals } from '@sergtyapkin/modals-popups';
import { User } from '~/types/types';
import { UserLevels } from '~/constants/levels';
import { Classes } from '~/constants/classes';
import { BuffsTypes, ClassTypes, MONEY_LOSE_BY_DEATH_PERCENT, NO_SERVER_MODE } from '~/constants/constants';
import { getAllUserBuffs, getAllUserEffects, getTotalUserMaxHP } from '~/utils/utils';
import { Effects } from '~/constants/effects';
import { ComponentCustomProperties } from 'vue';
import validateModel from '@sergtyapkin/models-validator';
import { GuildModel } from '~/utils/APIModels';


export function userTryToIncreaseLevel($user: User, $modals: typeof Modals) {
  const maxLevel = Math.max(...Object.keys(UserLevels).map(Number));
  if ($user.level >= maxLevel) {
    return;
  }
  const expNeedsToLevel = UserLevels[$user.level].experience;
  if ($user.stats.experience < expNeedsToLevel) {
    return;
  }
  $user.stats.experience -= expNeedsToLevel;
  $user.level += 1;

  let powerAdd = Classes[$user.classType].statsPerLevel.power;
  let agilityAdd = Classes[$user.classType].statsPerLevel.agility;
  let intelligenceAdd = Classes[$user.classType].statsPerLevel.intelligence;
  getAllUserBuffs($user).forEach(buffs => {
    powerAdd += buffs[BuffsTypes.powerPerLevelIncrease] ?? 0;
    agilityAdd += buffs[BuffsTypes.agilityPerLevelIncrease] ?? 0;
    intelligenceAdd += buffs[BuffsTypes.intelligenceCostDecrease] ?? 0;
  });

  getAllUserEffects($user).forEach(e => {
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

  $modals.alert(
    'Уровень повышен!',
    `Вы получили уровень ${$user.level}.
Начислено ${powerAdd} силы, ${agilityAdd} ловкости и ${intelligenceAdd} интеллекта.

${$user.level < maxLevel ?
      `Для уровня ${$user.level + 1} понадобится ${UserLevels[$user.level + 1].experience}xp.` : 
      'Вы достигли последнего уровня в игре. Но вы можете продолжать собирать опыт для прокачки гильдии'}`,
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
  $user.notSyncedInventory = [];

  return loosedMoney;
}

export function userRevive($user: User) {
  $user.stats.hp = getTotalUserMaxHP($user);
}

export function startFight(th: ComponentCustomProperties) {
  th.$user.isInFight = true;
  th.$app.isUserInFightReactiveValue = true;
  th.$localStorageManager.removeFightPowers();
  th.$localStorageManager.saveSyncedData(th.$user, th.$guild);
}

export function finishFight(th: ComponentCustomProperties) {
  th.$user.isInFight = false;
  th.$app.isUserInFightReactiveValue = false;
  th.$localStorageManager.removeAbilitiesReloads();
  th.$localStorageManager.removeFightPowers();
  th.$localStorageManager.removeFightEffects();
  th.$localStorageManager.saveSyncedData(th.$user, th.$guild);
}

export async function syncWithGuild(th: ComponentCustomProperties, guildQRValue: string) {
  if (!NO_SERVER_MODE) {
    const { ok } = await th.$api.syncAllData(
      th.$user.stats.experience + th.$user.notSyncedStats.experience,
      th.$user.stats.money + th.$user.notSyncedStats.money,
      th.$user.inventory.concat(th.$user.notSyncedInventory),
      {
        hat: th.$user.equipment.hat,
        main: th.$user.equipment.main,
        boots: th.$user.equipment.boots,
      },
      th.$user.skills,
      th.$user.stats.power + th.$user.notSyncedStats.power,
      th.$user.stats.agility + th.$user.notSyncedStats.agility,
      th.$user.stats.intelligence + th.$user.notSyncedStats.intelligence,
    );

    if (!ok) {
      th.$popups.success('Ошибка сети', 'Проверьте подключение к сети и повторите попытку синхронизации');
      return;
    }
    await th.$store.dispatch('GET_USER');
    th.$popups.success('QR отсканирован', 'Ваши предметы и данные, а также данные гильдии синхронизированы');
    return;
  }

  const guildData = validateModel(GuildModel, guildQRValue);
  await th.$store.commit('SET_GUILD', guildData);
  th.$popups.success('QR отсканирован', 'Данные гильдии обновлены');

  th.$user.stats.hp = getTotalUserMaxHP(th.$user);
  th.$app.isUserDeadReactiveValue = false;
  th.$user.isInFight = false;
  th.$app.isUserInFightReactiveValue = false;

  th.$user.stats.experience += th.$user.notSyncedStats.experience;
  th.$user.stats.money += th.$user.notSyncedStats.money;
  th.$user.stats.power += th.$user.notSyncedStats.power;
  th.$user.stats.agility += th.$user.notSyncedStats.agility;
  th.$user.stats.intelligence += th.$user.notSyncedStats.intelligence;
  th.$user.notSyncedStats.experience = 0;
  th.$user.notSyncedStats.money = 0;
  th.$user.notSyncedStats.power = 0;
  th.$user.notSyncedStats.agility = 0;
  th.$user.notSyncedStats.intelligence = 0;
  th.$user.inventory.push(...th.$user.notSyncedInventory);
  th.$user.notSyncedInventory = [];

  userTryToIncreaseLevel(th.$user, th.$modals);

  th.$localStorageManager.saveSyncedData(th.$user, th.$guild);
}
