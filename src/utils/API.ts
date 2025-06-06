import REST_API from '@sergtyapkin/rest-api';
import { validateModel, type Model } from '@sergtyapkin/models-validator';
import { SyncDataModel, SyncDataModelMockData, UserModel } from '~/utils/APIModels';
import { Item, SyncedData, type User } from '~/types/types';

type RequestFunc = (url: string, data?: object) => Promise<{ data: object; status: number; ok: boolean }>;
type MyResponse<T> = Promise<{ data: T; status: number; ok: boolean }> | { data: T; status: number; ok: boolean };

const Response200 = (data: any) => ({
  status: 200,
  ok: true,
  data: data,
});

export default class API extends REST_API {
  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  async modelParsedRequest(
    requestFunc: RequestFunc,
    path: string,
    data = {},
    model?: Model,
    mockData?: MyResponse<object>,
  ): Promise<{ ok: boolean; data: object; status: number }> {
    if (!model) {
      throw SyntaxError(`Model for request '${path}' not specified`);
    }
    if (mockData && import.meta.env.MODE !== 'production') {
      return mockData;
    }

    data = Object.assign({}, data);
    const { ok, data: dataRes, status } = await requestFunc.bind(this)(path, data);
    if (!ok) {
      return { ok, data: dataRes as object, status };
    }

    return { ok, data: validateModel(model, dataRes), status };
  }

  #POST(path: string, data = {}, model?: Model, mockData?: MyResponse<object>) {
    return this.modelParsedRequest(super.post, path, data, model, mockData);
  }

  #GET(path: string, data = {}, model?: Model, mockData?: MyResponse<object>) {
    return this.modelParsedRequest(super.get, path, data, model, mockData);
  }

  #PUT(path: string, data = {}, model?: Model, mockData?: MyResponse<object>) {
    return this.modelParsedRequest(super.put, path, data, model, mockData);
  }

  #DELETE(path: string, data = {}, model?: Model, mockData?: MyResponse<object>) {
    return this.modelParsedRequest(super.delete, path, data, model, mockData);
  }

  // Api configuration
  // User
  getSyncedData = () => this.#GET(`/user`, {}, SyncDataModel, Response200(SyncDataModelMockData)) as MyResponse<SyncedData>;
  updateProfile = (id: string, profileData: { username?: string; password?: string }) =>
    this.#PUT(`/user/${id}`, profileData, UserModel) as MyResponse<User>;
  updatePassword = (id: string, oldPassword: string, newPassword: string) =>
    this.#PUT(`/user/${id}`, { old_password: oldPassword, new_password: newPassword }, UserModel) as MyResponse<User>;
  register = (name: string, password: string, classType: string, guildId: string) =>
    this.#POST(
      `/user`,
      {
        name,
        password,
        class_type: classType,
        guild_id: guildId,
      },
      UserModel,
    ) as MyResponse<User>;
  deleteProfile = () => this.#DELETE(`/user`, {}, {}) as MyResponse<unknown>;
  login = (name: string, password: string) => this.#POST(`/auth`, { name, password }, UserModel) as MyResponse<User>;
  logout = () => this.#DELETE(`/auth`, {}, {}, Response200({})) as MyResponse<unknown>;

  syncAllData = (
    experience: number,
    money: number,
    inventory: Item[],
    equipment: {
      hat: Item;
      main: Item;
      boots: Item;
    },
    skills: string[],
    power: number,
    agility: number,
    intelligence: number,
  ) => this.#POST(`/user`, {
    experience,
    money,
    inventory,
    equipment,
    skills,
    power,
    agility,
    intelligence,
  }, UserModel, Response200({})) as MyResponse<User>;
}
