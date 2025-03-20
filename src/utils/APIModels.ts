import validateModel from "@sergtyapkin/models-validator";

export const UserModel = {
  id: String,
  username: String,
  role: new Set(['admin', 'user']),
};

export const UserModelMockData = validateModel(UserModel, {
  id: 'USER_ID',
  username: 'Сергей Тяпкин',
  role: 'user',
});
