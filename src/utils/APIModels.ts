import validateModel from "@sergtyapkin/models-validator";
import {
  BuffsTypes,
  ClassTypes,
  DefaultAbilityImage,
  DefaultAvatarImage,
  DefaultKnifeImage,
  QRSources,
  QRTypes,
} from '~/constants/constants';
import { Items } from '~/constants/items';
import { Ability, Effect, Guild, Item, SyncedData, User } from '~/types/types';
import { Effects } from '~/constants/effects';

export const EffectModel = {
  id: String,
  name: String,
  description: String,
  imageUrl: String,
  buffs: Object,
  hidden: {
    type: Boolean,
    optional: true,
  },
  isForFight: {
    type: Boolean,
    optional: true,
  },
  onlyForFight: {
    type: Boolean,
    optional: true,
  },
  turns: {
    type: Number,
    optional: true,
  },
};

export const EffectModelMockData = validateModel(EffectModel,     {
  id: 'EFF_ID_1',
  name: 'Название эффекта',
  description: 'Какое-то описание эффекта',
  imageUrl: DefaultAbilityImage,
  hidden: false,
  onlyForFight: false,
  buffs: {
    [BuffsTypes.protectionIncrease]: 2,
    [BuffsTypes.maxHpIncrease]: 5,
  }
}) as Effect;

export const AbilityModel = {
  id: String,
  name: String,
  description: String,
  imageUrl: String,
  effectsToTargets: {
    type: Array,
    item: String,
  },
  effectsForMe: {
    type: Array,
    item: String,
  },
  damage: Number,
  damageTargets: Number,
  heal: Number,
  reload: Number,
};

export const AbilityModelMockData = validateModel(AbilityModel,     {
  id: 'ABLTY_ID_1',
  name: 'Название способности',
  description: 'Какое-то описание способности',
  imageUrl: DefaultAbilityImage,
  effectsToTargets: [Effects.bleeding_1.id],
  effectsForMe: [Effects.regeneration_1.id],
  damage: 5,
  damageTargets: 2,
  heal: 10,
  reload: 2,
}) as Ability;

export const ItemModel = {
  id: String,
  name: String,
  type: String,
  protection: Number,
  imageUrl: String,
  buffs: Object,
  effects: {
    type: Array,
    item: String,
  },
  abilities: {
    type: Array,
    item: String,
  },
  description:  String,
}

export const ItemModelMockData = validateModel(ItemModel, {
  id: 'PP_ID_1',
  name: 'Предмет',
  type: 'boots',
  protection: 2,
  imageUrl: DefaultKnifeImage,
  buffs: {
    [BuffsTypes.protectionIncrease]: 2,
  },
  effects: [
  ],
  abilities: [
    AbilityModelMockData.id,
  ],
  description: 'Описание предмета',
}) as Item;


export const GuildModel = {
  id: String,
  name: String,
  description: String,
  experience: Number,
  money: Number,
  level:  Number,
  imageUrl: String,
  inventory: {
    type: Array,
    item: String,
  },

  leaderId: String,
  members: {
    type: Array,
    item: {
      type: Object,
      fields: {
        id: String,
        name: String,
        imageUrl: String,
        level: Number,
      }
    },
  }
}

export const GuildModelMockData = validateModel(GuildModel, {
  id: 'GUILD_ID_1',
  name: 'Ушкуйники',
  description: 'Описание гильдии (ушкуйники блин)',
  money: 80,
  experience: 2400,
  level: 2,
  imageUrl: DefaultAbilityImage,

  leaderId: 'GMR_0',
  inventory: [Items.artefactBlackStar.id, Items.artefactMainStone.id, Items.mainElitePirate.id, Items.bootsBerserk.id, Items.daggerNightCardinal.id],
  members: [
    {
      id: 'GMR_0',
      name: 'Тяпкин Сергей',
      imageUrl: DefaultAvatarImage,
      level: 8,
    },
    {
      id: 'GMR_1',
      name: 'Никита Лаврентьев',
      imageUrl: DefaultAbilityImage,
      level: 8,
    },
    {
      id: 'GMR_2',
      name: 'Аня',
      imageUrl: DefaultKnifeImage,
      level: 7,
    },
    {
      id: 'GMR_3',
      name: 'Катя Сумцова',
      imageUrl: DefaultAbilityImage,
      level: 9,
    },
  ],
}) as Guild;

export const UserModel = {
  id: String,
  name: String,
  imageUrl: {
    type: String,
  },
  level: Number,
  role: new Set(['admin', 'user']),
  classType: {
    type: String,
  },
  stats: {
    type: Object,
    fields: {
      hp: Number,
      experience: Number,
      money: Number,
      power: Number,
      agility: Number,
      intelligence: Number,
    }
  },
  guildId: {
    type: String,
  },
  skills: {
    type: Array,
    item: String,
  },
  inventory: {
    type: Array,
    item: String,
  },
  equipment: {
    type: Object,
    fields: {
      hat: {
        type: String,
        optional: true,
      },
      main: {
        type: String,
        optional: true,
      },
      boots: {
        type: String,
        optional: true,
      },
    },
  },
  isInFight: Boolean,
};


export const UserModelMockData = validateModel(UserModel, {
  id: 'USER_ID',
  name: 'Сергей Тяпкин',
  imageUrl: DefaultAvatarImage,
  level: 2,
  classType: ClassTypes.agility,
  stats: {
    hp: 13,
    experience: 400,
    money: 500,
    power: 4,
    agility: 5,
    intelligence: 2,
  },
  role: 'user',
  inventory: [Items.artefactBlackStar.id, Items.artefactMainStone.id, Items.mainElitePirate.id, Items.bootsBerserk.id, Items.daggerNightCardinal.id],
  equipment: {
    hat: Items.hatBerserk.id,
    main: undefined,
    boots: undefined,
  },
  guildId: GuildModelMockData.id,
  skills: ['P0', 'P1'],
  isInFight: false,
}) as User;


export const SyncDataModel = {
  user: {
    type: Object,
    fields: UserModel,
  },
  guild: {
    type: Object,
    fields: GuildModel,
  },
};

export const SyncDataModelMockData = {
  user: UserModelMockData,
  guild: GuildModelMockData,
} as SyncedData;

export const QRDataModel = {
  id: String,
  type: String,
  subType: String,
  source: String,
  value: String,
}

export const QRDataModelMockData = validateModel(QRDataModel, {
  id: 'QR_ID_1',
  type: QRTypes.items,
  subType: '_',
  source: QRSources.quest,
  value: Items.daggerNightCardinal.id,
});
