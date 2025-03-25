/** @module **/

import { type User } from '~/types/types';
import validateModel from '@sergtyapkin/models-validator';
import { UserModel } from '~/utils/APIModels';

/**
 * @enum _PropertyNames
 * @description Ключи, под которыми хранятся данные в LocalStorage
 * @private
 */
const _PropertyNames = {
  user: 'user',
}

/**
 * Класс, отвечающий за взаимодействие с LocalStorage. Нужен для избавления остального кода
 * от строчных констант, являющихся ключами, под которыми хранятся данные в LocalStorage
 * @class
 */
export default class LocalStorageManager {
  // ---- USER ----
  saveUser(user: User) {
    localStorage.setItem(_PropertyNames.user, JSON.stringify(user));
  }
  loadUser(): User | null {
    const res = localStorage.getItem(_PropertyNames.user);
    if (!res) {
      return null;
    }
    return validateModel(UserModel, res) as User;
  }
  removeUser() {
    localStorage.removeItem(_PropertyNames.user);
  }
}
