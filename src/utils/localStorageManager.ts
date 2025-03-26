/** @module **/

import { Guild, SyncedData, type User } from '~/types/types';
import validateModel from '@sergtyapkin/models-validator';
import { SyncDataModel } from '~/utils/APIModels';

/**
 * @enum _PropertyNames
 * @description Ключи, под которыми хранятся данные в LocalStorage
 * @private
 */
const _PropertyNames = {
  syncedData: 'synced-data',
}

/**
 * Класс, отвечающий за взаимодействие с LocalStorage. Нужен для избавления остального кода
 * от строчных констант, являющихся ключами, под которыми хранятся данные в LocalStorage
 * @class
 */
export default class LocalStorageManager {
  // ---- USER ----
  saveSyncedData(user: User, guild: Guild) {
    localStorage.setItem(_PropertyNames.syncedData, JSON.stringify({user, guild}));
  }
  loadSyncedData(): SyncedData | null {
    const res = localStorage.getItem(_PropertyNames.syncedData);
    if (!res) {
      return null;
    }
    return validateModel(SyncDataModel, res) as SyncedData;
  }
  removeSyncedData() {
    localStorage.removeItem(_PropertyNames.syncedData);
  }
}
