import { IterableSkillTrees } from '~/constants/skills';
import type { Ability, Effect, Item, Skill, User } from '~/types/types';
import { BuffsTypes, DEFAULT_USER_PROTECTION, ItemTypes } from '~/constants/constants';
import { Items } from '~/constants/items';
import { Abilities } from '~/constants/abilities';
import { Effects } from '~/constants/effects';

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: { path?: string; expires?: Date | string; 'max-age'?: number; [key: string]: any } = {},
) {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey as keyof typeof options];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

export function detectBrowser() {
  let result = 'Other';
  if (navigator.userAgent.indexOf('YaBrowser') !== -1) {
    result = 'Yandex Browser';
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    result = 'Mozilla Firefox';
  } else if (navigator.userAgent.indexOf('MSIE') !== -1) {
    result = 'Internet Exploder';
  } else if (navigator.userAgent.indexOf('Edge') !== -1) {
    result = 'Microsoft Edge';
  } else if (navigator.userAgent.indexOf('Safari') !== -1) {
    result = 'Safari';
  } else if (navigator.userAgent.indexOf('Opera') !== -1) {
    result = 'Opera';
  } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
    result = 'Google Chrome';
  }
  return result;
}

export function detectOS() {
  if (window.navigator.userAgent.indexOf('Windows NT 11.0') !== -1) return 'Windows 11';
  if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) return 'Windows 10';
  if (window.navigator.userAgent.indexOf('Windows NT 6.3') !== -1) return 'Windows 8.1';
  if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) return 'Windows 8';
  if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) return 'Windows 7';
  if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) return 'Windows Vista';
  if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) return 'Windows XP';
  if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) return 'Windows 2000';
  if (window.navigator.userAgent.indexOf('Mac') !== -1) return 'Mac'; // Macintosh, MacIntel, MacPPC, Mac68K
  if (window.navigator.userAgent.indexOf('iP') !== -1) return 'iOS'; // iPad, iPhone, iPod
  if (window.navigator.userAgent.indexOf('Android') !== -1) return 'Android';
  if (window.navigator.userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (window.navigator.userAgent.indexOf('Linux') !== -1) return 'Linux';
  return 'Unknown OS';
}

export function deepClone<T>(obj: T): T {
  const ret = (obj instanceof Array ? [] : {}) as T;
  for (const key in obj) {
    if (obj[key] === undefined) {
      continue;
    }
    let val = obj[key];
    if (val && typeof (val) == 'object') {
      val = deepClone(val);
    }
    ret[key] = val;
  }
  return ret;
}


// ------------------------------
export function listIdsToEntities<T>(ids: string[], allEntities: {[key: string]: T}): T[] {
  const res: T[] = [];
  ids.forEach(id => {
    const entity = allEntities[id];
    if (entity) {
      res.push(entity);
    }
  });
  return res;
}
export function effectsIdsToEffects(effectsIds: string[]): Ability[] {
  return listIdsToEntities(effectsIds, Effects);
}
export function abilitiesIdsToAbilities(abilitiesIds: string[]): Ability[] {
  return listIdsToEntities(abilitiesIds, Abilities);
}
export function itemsIdsToItems(itemsIds: string[]): Item[] {
  const res: Item[] = [];
  itemsIds.forEach(itemId => {
    const item = itemIdToItem(itemId);
    if (item) {
      res.push(item);
    }
  });
  return res;
}
export function itemIdToItem(itemId: string): Item {
  let item = Items[itemId];
  if (item) {
    item = deepClone(item)
    item.effects = effectsIdsToEffects(item.effects);
    item.abilities = abilitiesIdsToAbilities(item.abilities);
  }
  return item;
}
export function getUserInventory($user: User): Item[] {
  return itemsIdsToItems($user.inventory);
}
export function getUserSkills($user: User): Skill[] {
  const res: Skill[] = [];
  $user.skills.forEach(id => {
    const treeType = id[0];
    const skillIdx = id.slice(1);
    let skill = IterableSkillTrees[treeType][skillIdx];
    if (skill) {
      skill = deepClone(skill);
      skill.effects = effectsIdsToEffects(skill.effects);
      skill.abilities = effectsIdsToEffects(skill.abilities);
      res.push(skill);
    }
  });
  return res;
}

interface ExtendedEffect extends Effect {
  source: Skill | Item,
  sourceType: 'skill' | 'item',
}
export function getAllUserEffects($user: User): ExtendedEffect[] {
  const effects: ExtendedEffect[] = [];
  function addEffectsFromItemId(itemId: string) {
    if (!itemId) {
      return;
    }
    const item = itemIdToItem(itemId);
    item.effects.forEach(e => {
      e = deepClone(e);
      e.source = item;
      e.sourceType = 'item';
      effects.push(e);
    });
  }
  addEffectsFromItemId($user.equipment.hat);
  addEffectsFromItemId($user.equipment.main);
  addEffectsFromItemId($user.equipment.boots);

  getUserInventory($user).forEach(item => {
    if (![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type)) {
      item.effects.forEach(e => {
        e = deepClone(e);
        e.source = item;
        e.sourceType = 'item';
        effects.push(e);
      });
    }
  });
  getUserSkills($user).forEach(skill => {
    skill.effects.forEach(e => {
      e = deepClone(e);
      e.source = skill;
      e.sourceType = 'skill';
      effects.push(e);
    });
  });
  return effects;
}

interface ExtendedAbility extends Ability {
  source: Skill | Item,
  sourceType: 'skill' | 'item',
}
export function getAllUserAbilities($user: User): ExtendedAbility[] {
  const abilities: ExtendedAbility[] = [];
  function addAbilitiesFromItemId(itemId: string) {
    if (!itemId) {
      return;
    }
    const item = itemIdToItem(itemId);
    item.abilities.forEach(e => {
      e = deepClone(e);
      e.source = item;
      e.sourceType = 'item';
      abilities.push(e);
    });
  }
  addAbilitiesFromItemId($user.equipment.hat);
  addAbilitiesFromItemId($user.equipment.main);
  addAbilitiesFromItemId($user.equipment.boots);

  getUserInventory($user).forEach(item => {
    if (![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type)) {
      item.abilities.forEach(e => {
        e = deepClone(e);
        e.source = item;
        e.sourceType = 'item';
        abilities.push(e);
      });
    }
  });
  getUserSkills($user).forEach(skill => {
    skill.abilities.forEach(e => {
      e = deepClone(e);
      e.source = skill;
      e.sourceType = 'skill';
      abilities.push(e);
    });
  });
  return abilities;
}

export function getTotalUserProtection($user: User): number {
  let res = DEFAULT_USER_PROTECTION;
  res += Items[$user.equipment.hat]?.protection ?? 0;
  res += Items[$user.equipment.main]?.protection ?? 0;
  res += Items[$user.equipment.boots]?.protection ?? 0;
  const effects = getAllUserEffects($user);
  console.log(effects);
  effects.forEach(effect => {
    res += effect.buffs[BuffsTypes.protectionIncrease] ?? 0;
  });
  return res;
}

