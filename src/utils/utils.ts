import { IterableSkillTrees } from '~/constants/skills';
import { Ability, Buffs, Effect, Item, QRData, QRUserData, Skill, User } from '~/types/types';
import {
  BuffsTypes,
  DEFAULT_USER_MAX_UP,
  DEFAULT_USER_PROTECTION,
  ItemTypes,
  QR_CODE_ID_SPLITTER,
  QRSource, QRSources,
  QRType, QRTypes,
  ResourceType, UserRoles, UUID_LENGTH,
} from '~/constants/constants';
import { InventoryIdsToNumbers, Items, NumbersToInventoryIds } from '~/constants/items';
import { Abilities, InFightAbility } from '~/constants/abilities';
import { Effects } from '~/constants/effects';

import swAPI from '~/serviceWorker/swAPI';
import { UserLevels } from '~/constants/levels';
import { myDecoding, myEncoding } from '~/utils/encodeDecode';
import { validateModel } from '@sergtyapkin/models-validator';
import { QRUserModel } from '~/utils/APIModels';
import { UserAvatars } from '~/constants/userAvatars';

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

export async function saveAllAssetsByServiceWorker(
  callbackEach?: (data: {current: string, progress: number, total: number}) => void,
  callbackFinish?: () => void,
  callbackError?: (errUrl: string | null) => void,
) {
  let allCachableResources: string[] = [];
  try {
    const module = await import(`${'/assetsList.js'}`);
    allCachableResources = module.default; // list of all cachable resources urls
  } catch {
    console.info('Cannot find assetsList.js. Nothing to cache. Maybe we are in develompent mode' )
  }

  async function saveAllSite() {
    try {
      await swAPI.cacheUrls(allCachableResources, callbackEach);
      if (callbackFinish) {
        callbackFinish();
      }
    } catch (errUrl) {
      if (callbackError) {
        callbackError(errUrl as unknown as string | null);
      }
    }
  }

  async function saveAllIfNotSaved() {
    if (await swAPI.isFilesCached(allCachableResources)) {
      if (callbackFinish) {
        callbackFinish();
      }
      return;
    }
    await saveAllSite();
  }

  await saveAllIfNotSaved();
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
export interface EffectedAbility extends Omit<Omit<ExtendedAbility, 'effectsToTargets'>, 'effectsForMe'> {
  effectsToTargets: Effect[],
  effectsForMe: Effect[],
}
export interface InFightExtendedAbility extends InFightAbility, EffectedAbility {
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
    if (
      ![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type) &&
      !item.applyable
    ) {
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

export function getAllUserBuffs($user: User): Buffs[] {
  const res: Buffs[] = [];
  if ($user.equipment.hat) {
    res.push(itemIdToItem($user.equipment.hat).buffs);
  }
  if ($user.equipment.main) {
    res.push(itemIdToItem($user.equipment.main).buffs);
  }
  if ($user.equipment.boots) {
    res.push(itemIdToItem($user.equipment.boots).buffs);
  }
  getAllUserItems($user).forEach(item => {
    if (![ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(item.type)) {
      res.push(item.buffs);
    }
  });
  getAllUserSkills($user).forEach(skill => {
    res.push(skill.buffs);
  });
  getAllUserEffects($user).forEach(effect => {
    res.push(effect.buffs);
  });
  return res;
}

// -----------------------
export function getTotalUserProtection($user: User): number {
  let res = DEFAULT_USER_PROTECTION;
  let modifier = 1;
  getAllUserBuffs($user).forEach(buffs => {
    res += buffs[BuffsTypes.protectionIncrease] ?? 0;
    modifier *= buffs[BuffsTypes.protectionModifier] ?? 1;
  });
  getAllUserEffects($user).forEach(effect => {
    if (effect.id === Effects.protectionAddHalfHp.id) {
      res += Math.round($user.stats.hp / 2);
    }
  });
  res = Math.round(res * modifier);
  return res;
}
export function getTotalUserMaxHP($user: User): number {
  let res = DEFAULT_USER_MAX_UP;
  let modifier = 1;
  getAllUserBuffs($user).forEach(buffs => {
    res += buffs[BuffsTypes.protectionIncrease] ?? 0;
    modifier *= buffs[BuffsTypes.protectionModifier] ?? 1;
  });
  res = Math.round(res * modifier);
  return res;
}
export function getTotalUserExperience($user: User): number {
  let res = 0;
  for (let level = 1; level < $user.level; level++) {
    res += UserLevels[level].experience;
  }
  res += $user.stats.experience;
  return res;
}


// -----------------
export async function generateUserDataQRText($user: User, scannedNotSavedQrs: QRData[], isFull=false): Promise<string> {
  const userQRData = validateModel(QRUserModel, {
    id: $user.id,
    n: $user.name,
    iU: UserAvatars.findIndex(i => i === $user.imageUrl),
    l: $user.level,
    cT: $user.classType,
    st: {
      ...(isFull && {h: $user.stats.hp}),
      e: $user.stats.experience,
      m: $user.stats.money,
      p: $user.stats.power,
      a: $user.stats.agility,
      i: $user.stats.intelligence,
    },
    gId: $user.guildId,
    i: $user.inventory.map(i => InventoryIdsToNumbers[i]),
    e: {
      h: $user.equipment.hat ? InventoryIdsToNumbers[$user.equipment.hat] : undefined,
      m: $user.equipment.main ? InventoryIdsToNumbers[$user.equipment.main] : undefined,
      b: $user.equipment.boots ? InventoryIdsToNumbers[$user.equipment.boots] : undefined,
    },
    newQrs: scannedNotSavedQrs.map(qr => qr.id),
    ...(isFull && {
      iIF: $user.isInFight,
      iSI: $user.isSignedIn,
      nSI: $user.notSyncedInventory.map(i => InventoryIdsToNumbers[i]),
      nSS: {
        e: $user.notSyncedStats.experience,
        m: $user.notSyncedStats.money,
        p: $user.notSyncedStats.power,
        a: $user.notSyncedStats.agility,
        i: $user.notSyncedStats.intelligence,
      },
      r: $user.role,
      s: $user.skills,
    }),
  });
  return generateQRText(QRTypes.userData, '_', QRSources.user, JSON.stringify(userQRData));
}
export async function parseUserDataQRText(QRDataText: string): Promise<User | null> {
  const decodedQRData = await parseQRText(QRDataText);
  if (!decodedQRData || decodedQRData.type !== QRTypes.userData) {
    return null;
  }
  const u = validateModel(QRUserModel, decodedQRData.value) as QRUserData;
  return {
    id: u.id,
    name: u.n,
    level: u.l,
    imageUrl: UserAvatars[u.iU],
    stats: {
      hp: u.st.h || 0,
      experience: u.st.e,
      money: u.st.m,
      power: u.st.p,
      agility: u.st.a,
      intelligence: u.st.i,
    },
    classType: u.cT,
    guildId: u.gId,
    inventory: u.i.map(i => NumbersToInventoryIds[i]),
    equipment: {
      hat: u.e.h ? NumbersToInventoryIds[u.e.h] : undefined,
      main: u.e.m ? NumbersToInventoryIds[u.e.m] : undefined,
      boots: u.e.b ? NumbersToInventoryIds[u.e.b] : undefined,
    },
    scannedQRs: u.newQrs,

    isInFight: u.iIF || false,
    isSignedIn: u.iSI || false,
    notSyncedInventory: u.nSI?.map?.(i => NumbersToInventoryIds[i]) || [],
    notSyncedStats: {
      experience: u.nSS?.e || 0,
      money: u.nSS?.m || 0,
      power: u.nSS?.p || 0,
      agility: u.nSS?.a || 0,
      intelligence: u.nSS?.i || 0,
    },
    role: u.r || UserRoles.user,
    skills: u.s || [],
  };
}
export async function generateQRText(QRType: QRType, QRSubType: ResourceType | '_', QRSource: QRSource, QRValue: string, QRId?: string): Promise<string> {
  QRId = QRId || myUuid();
  const qrText = `${QRType}${QRSubType}${QRSource}${QRValue}${QR_CODE_ID_SPLITTER}${QRId}`;
  return await myEncoding(qrText);
}

export async function parseQRText(text: string): Promise<QRData | null> {
  console.log(text);
  const qrText = await myDecoding(text);
  console.log(qrText);
  if (!qrText) {
    return null;
  }

  // work with data
  const splitted = qrText.split(QR_CODE_ID_SPLITTER);
  console.log(splitted);
  if (splitted.length !== 2) {
    console.error('QR not splitted by splitter symbol');
    return null;
  }
  const [textVal, textId] = splitted;
  console.log(textVal, textId);
  return {
    type: textVal[0] as QRType,
    subType: textVal[1] as ResourceType | '_',
    source: textVal[2] as QRSource,
    value: textVal.slice(3),
    id: textId,
  };
}
// ----------------
const ranges = [
  [0x0020, 0x007E],  // латиница и ASCII
  // [0x0370, 0x03FF],  // греческий
  // [0x410, 0x44F],  // Кириллица
];

let SAFE_UNICODE_ALPHABET = '!@#$%^&*()_+{}[]|\\/\'"`~:;><';
for (const [start, end] of ranges) {
  for (let i = start; i <= end; i++) {
    const char = String.fromCharCode(i);
    // Фильтруем "плохие" символы
    if (/[\p{L}\p{Nd}]/u.test(char) && !/\s/.test(char)) {
      SAFE_UNICODE_ALPHABET += char;
    }
  }
}

export function myUuid() {
  const alphabet = SAFE_UNICODE_ALPHABET;
  let id = '';
  const randomValues = new Uint32Array(UUID_LENGTH);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < UUID_LENGTH; i++) {
    id += alphabet[randomValues[i] % alphabet.length];
  }

  return id;
}
