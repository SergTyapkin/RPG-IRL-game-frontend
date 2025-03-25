export const UserLevels: {[key: number]: {experience: number}} = {
  1: {
    experience: 500,
  },
  2: {
    experience: 1000,
  },
  3: {
    experience: 2000,
  },
  4: {
    experience: 4000,
  },
  5: {
    experience: 6000,
  },
  6: {
    experience: 8000,
  },
  7: {
    experience: 10000,
  },
  8: {
    experience: 12000,
  },
  9: {
    experience: 15000,
  },
  10: {
    experience: 20000,
  },
}

export const GuildLevels: {[key: number]: {experience: number}} = {};
(Object.entries(UserLevels)).forEach(([levelNumber, levelData]) => {
  GuildLevels[Number(levelNumber)] = {
    experience: levelData.experience * 10,
  }
});
