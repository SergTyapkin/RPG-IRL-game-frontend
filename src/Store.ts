import Vuex from 'vuex';
import { type State, type Store } from '~/types/store';

export default new Vuex.Store({
  state: {
    user: {
      stats: {},
      guild: {},
    },
  },
  mutations: {
    SET_USER(state: State, userData: User) {
      state.user.id = String(userData.id);
      state.user.name = String(userData.name);
      state.user.level = Number(userData.level);
      state.user.stats.hp = Number(userData.stats.hp);
      state.user.stats.experience = Number(userData.stats.experience);
      state.user.stats.protection = Number(userData.stats.protection);
      state.user.stats.money = Number(userData.stats.money);
      state.user.stats.power = Number(userData.stats.power);
      state.user.stats.agility = Number(userData.stats.agility);
      state.user.stats.intelligence = Number(userData.stats.intelligence);
      state.user.guild.id = String(userData.guild.id);
      state.user.guild.name = String(userData.guild.name);
      state.user.guild.description = String(userData.guild.description);
      state.user.guild.experience = Number(userData.guild.experience);
      state.user.guild.level = Number(userData.guild.level);
      state.user.guild.leader = String(userData.guild.leader);
      state.user.guild.members = userData.guild.members;
      state.user.skills = userData.skills;
      state.user.inventory = userData.inventory;
      state.user.role = String(userData.role);

      state.user.isSignedIn = true;
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
      state.commit('SET_USER', data);
    },
    DELETE_USER(state: State) {
      state.commit('DELETE_USER');
    },
  },
});
