import { IterableSkillTrees } from '~/constants/skills';
import { Ability, Effect, Item, QRData, Skill, User } from '~/types/types';
import {
  BuffsTypes,
  DEFAULT_USER_MAX_UP,
  DEFAULT_USER_PROTECTION,
  ItemTypes,
  QR_CODE_ID_SPLITTER,
  QRSource,
  QRType,
  ResourceType,
} from '~/constants/constants';
import { Items } from '~/constants/items';
import { Abilities } from '~/constants/abilities';
import { Effects } from '~/constants/effects';
import { v4 as uuidv4 } from 'uuid';

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
export interface ExtendedEffect extends Effect {
  source: ExtendedSkill | ExtendedItem,
  sourceType: 'skill' | 'item',
}
export interface ExtendedAbility extends Ability {
  source: ExtendedSkill | ExtendedItem,
  sourceType: 'skill' | 'item',
}
export interface EffectedAbility extends Omit<Omit<Ability, 'effectsToTargets'>, 'effectsForMe'> {
  effectsToTargets: Effect[],
  effectsForMe: Effect[],
}
export interface ExtendedItem extends Omit<Omit<Item, 'effects'>, 'abilities'> {
  effects: Effect[],
  abilities: Ability[],
}
export interface ExtendedSkill extends Omit<Omit<Skill, 'effects'>, 'abilities'> {
  effects: Effect[],
  abilities: Ability[],
}


export function effectsIdsToEffects(effectsIds: string[]): Effect[] {
  const res: Effect[] = [];
  effectsIds.forEach(effectId => {
    const effect = Effects[effectId];
    if (effect) {
      res.push(effect);
    }
  });
  return res;
}
export function abilitiesIdsToAbilities(abilitiesIds: string[]): EffectedAbility[] {
  const res: EffectedAbility[] = [];
  abilitiesIds.forEach(abilityId => {
    const ability = Abilities[abilityId];
    if (!ability) {
      return;
    }
    const effAbility = deepClone(ability) as unknown as EffectedAbility;
    effAbility.effectsToTargets = effectsIdsToEffects(ability.effectsToTargets)
    effAbility.effectsForMe = effectsIdsToEffects(ability.effectsForMe)
    res.push(effAbility);
  });
  return res;
}
export function itemsIdsToItems(itemsIds: string[]): ExtendedItem[] {
  const res: ExtendedItem[] = [];
  itemsIds.forEach(itemId => {
    const item = itemIdToItem(itemId);
    if (item) {
      res.push(item);
    }
  });
  return res;
}
export function itemIdToItem(itemId: string): ExtendedItem {
  const item = Items[itemId];
  if (!item) {
    return item;
  }
  const extItem = deepClone(item) as unknown as ExtendedItem;
  extItem.effects = effectsIdsToEffects(item.effects);
  extItem.abilities = abilitiesIdsToAbilities(item.abilities) as unknown as Ability[];
  return extItem;
}
export function getAllUserItems($user: User): ExtendedItem[] {
  return itemsIdsToItems($user.inventory);
}
export function skillIdToSkill(skillId: string): ExtendedSkill {
  const treeType = skillId[0];
  const skillIdx = Number(skillId.slice(1));
  const skill = IterableSkillTrees[treeType][skillIdx];
  if (!skill) {
    return skill;
  }
  return deepClone(skill);
}
export function getAllUserSkills($user: User): ExtendedSkill[] {
  const res: ExtendedSkill[] = [];
  $user.skills.forEach(id => {
    const skill = skillIdToSkill(id)
    if (skill) {
      res.push(skill);
    }
  });
  return res;
}

export function getAllUserEffects($user: User, isForFight?: boolean): ExtendedEffect[] {
  const effects: ExtendedEffect[] = [];
  function addExtendedEffectToRes(ext: ExtendedEffect) {
    if (isForFight == undefined) {
      effects.push(ext);
      return;
    }
    if (Boolean(isForFight) === Boolean(ext.isForFight)) {
      effects.push(ext);
    }
  }

  function addEffectsFromItemId(itemId?: string) {
    if (!itemId) {
      return;
    }
    const item = itemIdToItem(itemId);
    item.effects.forEach(e => {
      const ext = deepClone(e) as unknown as ExtendedEffect;
      ext.source = item;
      ext.sourceType = 'item';
      addExtendedEffectToRes(ext);
    });
  }
  addEffectsFromItemId($user.equipment.hat);
  addEffectsFromItemId($user.equipment.main);
  addEffectsFromItemId($user.equipment.boots);

  getAllUserItems($user).forEach(item => {
    if (![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type)) {
      item.effects.forEach(e => {
        const ext = deepClone(e) as unknown as ExtendedEffect;
        ext.source = item;
        ext.sourceType = 'item';
        addExtendedEffectToRes(ext);
      });
    }
  });
  getAllUserSkills($user).forEach(skill => {
    skill.effects.forEach(e => {
      const ext = deepClone(e) as unknown as ExtendedEffect;
      ext.source = skill;
      ext.sourceType = 'skill';
      addExtendedEffectToRes(ext);
    });
  });
  return effects;
}

export function getAllUserAbilities($user: User): ExtendedAbility[] {
  const abilities: ExtendedAbility[] = [];
  function abilityToExtended(e: Ability, item: ExtendedItem) {
    const ext = deepClone(e) as unknown as ExtendedAbility;
    ext.source = item;
    ext.sourceType = 'item';
    return ext;
  }
  abilities.push(abilityToExtended(Abilities.default, itemIdToItem(Items.default.id)))
  function addAbilitiesFromItemId(itemId?: string) {
    if (!itemId) {
      return;
    }
    const item = itemIdToItem(itemId);
    item.abilities.forEach(e => abilities.push(abilityToExtended(e, item)));
  }
  addAbilitiesFromItemId($user.equipment.hat);
  addAbilitiesFromItemId($user.equipment.main);
  addAbilitiesFromItemId($user.equipment.boots);

  getAllUserItems($user).forEach(item => {
    if (![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type)) {
      item.abilities.forEach(e => {
        const ext = deepClone(e) as unknown as ExtendedAbility;
        ext.source = item;
        ext.sourceType = 'item';
        abilities.push(ext);
      });
    }
  });
  getAllUserSkills($user).forEach(skill => {
    skill.abilities.forEach(e => {
      const ext = deepClone(e) as unknown as ExtendedAbility;
      ext.source = skill;
      ext.sourceType = 'skill';
      abilities.push(ext);
    });
  });
  return abilities;
}

export function getTotalUserProtection($user: User): number {
  let res = DEFAULT_USER_PROTECTION;
  res += $user.equipment.hat ? Items[$user.equipment.hat]?.protection ?? 0 : 0;
  res += $user.equipment.main ? Items[$user.equipment.main]?.protection ?? 0 : 0;
  res += $user.equipment.boots ? Items[$user.equipment.boots]?.protection ?? 0 : 0;
  const items = getAllUserItems($user);
  items.forEach(items => {
    res += items.buffs[BuffsTypes.protectionIncrease] ?? 0;
  });
  const skills = getAllUserSkills($user);
  skills.forEach(skill => {
    res += skill.buffs[BuffsTypes.protectionIncrease] ?? 0;
  });
  const effects = getAllUserEffects($user);
  effects.forEach(effect => {
    res += effect.buffs[BuffsTypes.protectionIncrease] ?? 0;
  });
  return res;
}
export function getTotalUserMaxHP($user: User): number {
  let res = DEFAULT_USER_MAX_UP;
  const items = getAllUserItems($user);
  items.forEach(items => {
    res += items.buffs[BuffsTypes.maxHpIncrease] ?? 0;
  });
  const skills = getAllUserSkills($user);
  skills.forEach(skill => {
    res += skill.buffs[BuffsTypes.maxHpIncrease] ?? 0;
  });
  const effects = getAllUserEffects($user);
  effects.forEach(effect => {
    res += effect.buffs[BuffsTypes.maxHpIncrease] ?? 0;
  });
  return res;
}


// -----------------
export function generateQRText(QRType: QRType, QRSubType: ResourceType | '_', QRSource: QRSource, QRValue: string, QRId?: string) {
  QRId = QRId || uuidv4();
  return btoa(`${QRType}${QRSubType}${QRSource}${QRValue}${QR_CODE_ID_SPLITTER}${QRId}`);
}
export function parseQRText(text: string): QRData | null {
  try {
    text = atob(text);
    const splitted = text.split(QR_CODE_ID_SPLITTER);
    if (splitted.length !== 2) {
      console.error('QR not splitted by splitter symbol');
      return null;
    }
    const [textVal, textId] = splitted;
    return {
      type: textVal[0] as QRType,
      subType: textVal[1] as ResourceType | '_',
      source: textVal[2] as QRSource,
      value: textVal.slice(3),
      id: textId,
    };
  } catch {
    return null;
  }
}

