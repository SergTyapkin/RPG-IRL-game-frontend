/** @module **/

import { Effect, Guild, QRData, SyncedData, type User } from '~/types/types';
import validateModel from '@sergtyapkin/models-validator';
import { EffectModel, QRDataModel, SyncDataModel } from '~/utils/APIModels';

/**
 * @enum _PropertyNames
 * @description Ключи, под которыми хранятся данные в LocalStorage
 * @private
 */
const _PropertyNames = {
  syncedData: 'synced-data',
  abilitiesReloads: 'abilities-reloads',
  fightEffects: 'fight-effects',
  scannedSavedQrs: 'scanned-saved-qrs',
  scannedNotSavedQrs: 'scanned-not-saved-qrs',
  loosedMoney: 'loosed-money',
}

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
    localStorage.setItem(_PropertyNames.abilitiesReloads, JSON.stringify(abilitiesReloads));
  }
  loadAbilitiesReloads(): { [key: string]: number } | null {
    const res = localStorage.getItem(_PropertyNames.abilitiesReloads);
    if (!res) {
      return null;
    }
    try {
      return JSON.parse(res) as { [key: string]: number };
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

  // ---- scannedSavedQrs ----
  saveScannedSavedQrs(scannedSavedQrs: QRData[]) {
    localStorage.setItem(_PropertyNames.scannedSavedQrs, JSON.stringify({ qrs: scannedSavedQrs }));
  }
  loadScannedSavedQrs(): QRData[] | null {
    const res = localStorage.getItem(_PropertyNames.scannedSavedQrs);
    if (!res) {
      return null;
    }
    try {
      return (
        validateModel({
          qrs: {
            type: Array,
            item: {
              type: Object,
              fields: QRDataModel,
            },
          },
        }, res) as { qrs: QRData[] }).qrs;
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
        validateModel({
          qrs: {
            type: Array,
            item: {
              type: Object,
              fields: QRDataModel,
            },
          },
        }, res) as { qrs: QRData[] }).qrs;
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
}
