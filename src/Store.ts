import Vuex from 'vuex';
import { type State, type Store } from '~/types/store';

export default new Vuex.Store({
  state: {
    user: {
      stats: {},
      notSyncedStats: {
        hp: 0,
        experience: 0,
        protection: 0,
        money: 0,
        power: 0,
        agility: 0,
        intelligence: 0,
      },
      guild: {},
    },
  },
  mutations: {
    SET_USER(state: State, userData: User) {
      state.user.id = String(userData.id);
      state.user.name = String(userData.name);
      state.user.level = Number(userData.level);
      state.user.imageUrl = String(userData.imageUrl);
      state.user.stats.hp = Number(userData.stats.hp);
      state.user.stats.experience = Number(userData.stats.experience);
      state.user.stats.protection = Number(userData.stats.protection);
      state.user.stats.money = Number(userData.stats.money);
      state.user.stats.power = Number(userData.stats.power);
      state.user.stats.agility = Number(userData.stats.agility);
      state.user.stats.intelligence = Number(userData.stats.intelligence);
      state.user.skills = userData.skills;
      state.user.inventory = userData.inventory;
      state.user.role = String(userData.role);

      state.user.isSignedIn = true;
    },
    SET_GUILD(state: State, guildData: Guild) {
      state.user.guild.id = String(guildData.id);
      state.user.guild.name = String(guildData.name);
      state.user.guild.description = String(guildData.description);
      state.user.guild.money = Number(guildData.money);
      state.user.guild.imageUrl = String(guildData.imageUrl);
      state.user.guild.experience = Number(guildData.experience);
      state.user.guild.level = Number(guildData.level);
      state.user.guild.leader = String(guildData.leader);
      state.user.guild.members = guildData.members;
    },
    DELETE_USER(state: State) {
      state.user.isSignedIn = false;
    },
  },
  actions: {
    async GET_USER(this: Store, state: State) {
      const { data, ok }: { data: any; ok: boolean } = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      data.inventory.forEach((item: Item) => {
        item.effects.forEach(effect => {
          effect.sourceType = 'item';
          effect.source = item;
        });
        item.abilities.forEach(ability => {
          ability.sourceType = 'item';
          ability.source = item;
        });
      });
      state.commit('SET_USER', data);
      state.commit('SET_GUILD', data.guild);
    },
    SET_GUILD(this: Store, state: State, guild: Guild) {
      state.commit('SET_GUILD', guild);
    },
    DELETE_USER(state: State) {
      state.commit('DELETE_USER');
    },
  },
});
