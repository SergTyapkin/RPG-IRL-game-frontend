/** @module **/

import { Ability, Effect, Guild, QRData, SyncedData, type User } from '~/types/types';
import { validateModel } from '@sergtyapkin/models-validator';
import { AbilityModel, EffectModel, GuildModel, QRDataModel, SyncDataModel } from '~/utils/APIModels';
import { ExtendedAbility, InFightExtendedAbility } from '~/utils/utils';

/**
 * @enum _PropertyNames
 * @description Ключи, под которыми хранятся данные в LocalStorage
 * @private
 */
const _PropertyNames = {
  syncedData: 'synced-data',
  abilitiesReloads: 'abilities-reloads',
  fightEffects: 'fight-effects',
  fightPowers: 'fight-powers',
  scannedSavedQrs: 'scanned-saved-qrs',
  scannedNotSavedQrs: 'scanned-not-saved-qrs',
  loosedMoney: 'loosed-money',
  allGuildsData: 'all-guilds',
  guildScannedQrs: 'guild-scanned-qrs',
};

/**
 * Класс, отвечающий за взаимодействие с LocalStorage. Нужен для избавления остального кода
 * от строчных констант, являющихся ключами, под которыми хранятся данные в LocalStorage
 * @class
 */
export default class LocalStorageManager {
  // ---- USER ----
  saveSyncedData(user: User, guild: Guild) {
    localStorage.setItem(_PropertyNames.syncedData, JSON.stringify({ user, guild }));
  }

  loadSyncedData(): SyncedData | null {
    const res = localStorage.getItem(_PropertyNames.syncedData);
    if (!res) {
      return null;
    }
    try {
      return validateModel(SyncDataModel, res) as SyncedData;
    } catch {
      return null;
    }
  }

  removeSyncedData() {
    localStorage.removeItem(_PropertyNames.syncedData);
  }

  // ---- abilitiesReloads ----
  saveAbilitiesReloads(abilitiesReloads: { [key: string]: number }) {
    Object.entries(abilitiesReloads).forEach(([key, val]) => {
      abilitiesReloads[key] = Number.isFinite(val) ? val : -1;
    });
    localStorage.setItem(_PropertyNames.abilitiesReloads, JSON.stringify(abilitiesReloads));
  }

  loadAbilitiesReloads(): { [key: string]: number } | null {
    const res = localStorage.getItem(_PropertyNames.abilitiesReloads);
    if (!res) {
      return null;
    }
    try {
      const abilitiesReloads = JSON.parse(res) as { [key: string]: number };
      Object.entries(abilitiesReloads).forEach(([key, val]) => {
        abilitiesReloads[key] = val === -1 ? Infinity : val;
      });
      return abilitiesReloads;
    } catch {
      return null;
    }
  }

  removeAbilitiesReloads() {
    localStorage.removeItem(_PropertyNames.abilitiesReloads);
  }

  // ---- fightEffects ----
  saveFightEffects(fightEffects: Effect[]) {
    localStorage.setItem(_PropertyNames.fightEffects, JSON.stringify({ effects: fightEffects }));
  }

  loadFightEffects(): Effect[] | null {
    const res = localStorage.getItem(_PropertyNames.fightEffects);
    if (!res) {
      return null;
    }
    try {
      return (
        validateModel(
          {
            effects: {
              type: Array,
              item: {
                type: Object,
                fields: EffectModel,
              },
            },
          },
          res,
        ) as { effects: Effect[] }
      ).effects;
    } catch {
      return null;
    }
  }

  removeFightEffects() {
    localStorage.removeItem(_PropertyNames.fightEffects);
  }

  // ---- fightPowers ----
  saveFightPowers(fightPowers: InFightExtendedAbility[] | ExtendedAbility[] | Ability[]) {
    localStorage.setItem(_PropertyNames.fightPowers, JSON.stringify({ powers: fightPowers }));
  }

  loadFightPowers(): Ability[] | null {
    const res = localStorage.getItem(_PropertyNames.fightPowers);
    if (!res) {
      return null;
    }
    try {
      return (
        validateModel(
          {
            powers: {
              type: Array,
              item: {
                type: Object,
                fields: AbilityModel,
              },
            },
          },
          res,
        ) as { powers: Ability[] }
      ).powers;
    } catch {
      return null;
    }
  }

  removeFightPowers() {
    localStorage.removeItem(_PropertyNames.fightPowers);
  }

  // ---- scannedSavedQrs ----
  saveScannedSavedQrs(scannedSavedQrIds: string[]) {
    localStorage.setItem(_PropertyNames.scannedSavedQrs, JSON.stringify({
      ids: scannedSavedQrIds
    }));
  }

  loadScannedSavedQrs(): string[] | null {
    const res = localStorage.getItem(_PropertyNames.scannedSavedQrs);
    if (!res) {
      return null;
    }
    try {
      return (JSON.parse(res) as { ids: string[] }).ids;
    } catch {
      return null;
    }
  }

  removeScannedSavedQrs() {
    localStorage.removeItem(_PropertyNames.scannedSavedQrs);
  }

  // ---- scannedNotSavedQrs ----
  saveScannedNotSavedQrs(scannedNotSavedQrs: QRData[]) {
    localStorage.setItem(_PropertyNames.scannedNotSavedQrs, JSON.stringify({ qrs: scannedNotSavedQrs }));
  }

  loadScannedNotSavedQrs(): QRData[] | null {
    const res = localStorage.getItem(_PropertyNames.scannedNotSavedQrs);
    if (!res) {
      return null;
    }
    try {
      return (
        validateModel(
          {
            qrs: {
              type: Array,
              item: {
                type: Object,
                fields: QRDataModel,
              },
            },
          },
          res,
        ) as { qrs: QRData[] }
      ).qrs;
    } catch {
      return null;
    }
  }

  removeScannedNotSavedQrs() {
    localStorage.removeItem(_PropertyNames.scannedNotSavedQrs);
  }

  // ---- loosedMoney ----
  saveLosedMoney(loosedMoney: number) {
    localStorage.setItem(_PropertyNames.loosedMoney, String(loosedMoney));
  }

  loadLosedMoney(): number | null {
    const res = localStorage.getItem(_PropertyNames.loosedMoney);
    if (!res) {
      return null;
    }
    return Number(res);
  }

  removeLosedMoney() {
    localStorage.removeItem(_PropertyNames.loosedMoney);
  }

  // ---- allGuildsData ----
  saveAllGuildsData(data: {[key: number]: Guild}) {
    localStorage.setItem(_PropertyNames.allGuildsData, JSON.stringify(data));
  }

  loadAllGuildsData(): {[key: number]: Guild} | null {
    const res = localStorage.getItem(_PropertyNames.allGuildsData);
    if (!res) {
      return null;
    }

    let jsoned: {[key: string]: object} = {};
    try {
      jsoned = JSON.parse(res);
    } catch {
      return null;
    }

    const resOut: {[key: number]: Guild} = {};
    try {
      Object.keys(jsoned).forEach((key: string) => {
        resOut[Number(key)] = validateModel(GuildModel, jsoned[key]) as Guild;
      });
    } catch {
      return null;
    }

    return resOut;
  }

  removeAllGuildsData() {
    localStorage.removeItem(_PropertyNames.allGuildsData);
  }

  // ---- guildScannedQrs ----
  saveGuildScannedQrs(data: {u: string, q: string}[]) {
    localStorage.setItem(_PropertyNames.guildScannedQrs, JSON.stringify({ids: data}));
  }

  loadGuildScannedQrs(): {u: string, q: string}[] | null {
    const res = localStorage.getItem(_PropertyNames.guildScannedQrs);
    if (!res) {
      return null;
    }

    try {
      return (
        validateModel(
          {
            ids: {
              type: Array,
              item: {
                type: Object,
                fields: {
                  u: String,
                  q: String,
                },
              },
            },
          },
          res,
        ) as { ids: { u: string; q: string }[] }
      ).ids;
    } catch {
      return null;
    }
  }

  removeGuildScannedQrs() {
    localStorage.removeItem(_PropertyNames.guildScannedQrs);
  }
}
