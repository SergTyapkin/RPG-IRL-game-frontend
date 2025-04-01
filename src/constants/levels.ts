import { USERS_IN_GUILD_AVERAGE_COUNT } from '~/constants/constants';

export const UserLevels: {[key: number]: {experience: number}} = {
  1: {
    experience: 750,
  },
  2: {
    experience: 1000,
  },
  3: {
    experience: 1250,
  },
  4: {
    experience: 1500,
  },
  5: {
    experience: 1750,
  },
  6: {
    experience: 2000,
  },
  7: {
    experience: 2250,
  },
  8: {
    experience: 2500,
  },
  9: {
    experience: 2750,
  },
  10: {
    experience: 3000,
  },
}

export const GuildLevels: {[key: number]: {experience: number}} = {
  1: {
    experience: Number(),
  },
  2: {
    experience: Number(),
  },
  3: {
    experience: Number(),
  },
  4: {
    experience: Number(),
  },
  5: {
    experience: Number(),
  },
  6: {
    experience: Number(),
  },
  7: {
    experience: Number(),
  },
  8: {
    experience: Number(),
  },
  9: {
    experience: Number(),
  },
  10: {
    experience: Number(),
  },
};
(Object.entries(UserLevels)).forEach(([levelNumber, levelData]) => {
  GuildLevels[Number(levelNumber)].experience = levelData.experience * USERS_IN_GUILD_AVERAGE_COUNT;
});
