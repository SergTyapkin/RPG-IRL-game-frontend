import validateModel from "@sergtyapkin/models-validator";

export const ItemModel = {
  id: String,
  name: String,
  type: String,
  effects: String,
  description:  String,
}

export const ItemModelMockData = validateModel(ItemModel, {
  id: 'PP_ID_1',
  name: 'Предмет',
  type: 'boots',
  effects: 'user',
  description: 'Описание предмета',
});


export const GuildModel = {
  id: String,
  name: String,
  description: String,
  experience: Number,
  level:  Number,

  leader: String,
  members: {
    type: Array,
    item: String,
  }
}

export const GuildModelMockData = validateModel(GuildModel, {
  id: 'GUILD_ID_1',
  name: 'Гильдия 1',
  effects: 'user',
  description: 'Описание гильдии (ушкуйники блин)',
  experience: 2400,
  level: 2,

  leader: 'Some_Gamer_ID',
  members: ['GMR_1', 'GMR_2', 'GMR_3'],
});

export const UserModel = {
  id: String,
  name: String,
  level: Number,
  role: new Set(['admin', 'user']),
  stats: {
    type: Object,
    fields: {
      hp: Number,
      experience: Number,
      protection: Number,
      money: Number,
      power: Number,
      agility: Number,
      intelligence: Number,
    }
  },
  guild: {
    type: Object,
    fields: GuildModel,
  },
  skills: {
    type: Array,
    item: String,
  },
  inventory: {
    type: Array,
    item: {
      type: Object,
      fields: ItemModel,
    },
  }
};

export const UserModelMockData = validateModel(UserModel, {
  id: 'USER_ID',
  name: 'Сергей Тяпкин',
  level: 2,
  stats: {
    hp: 13,
    experience: 400,
    protection: 3,
    money: 500,
    power: 4,
    agility: 5,
    intelligence: 2,
  },
  role: 'user',
  inventory: [ItemModelMockData, ItemModelMockData, ItemModelMockData, ItemModelMockData],
  guild: GuildModelMockData,
  skills: ['P0', 'P1'],
});
