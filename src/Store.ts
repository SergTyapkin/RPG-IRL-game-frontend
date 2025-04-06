import Vuex from 'vuex';
import { type State, type Store } from '~/types/store';
import { type Guild, type User } from '~/types/types';
import { NO_SERVER_MODE } from '~/constants/constants';

export default new Vuex.Store({
  state: {
    user: {
      stats: {},
      notSyncedStats: {},
    },
    guild: {
    },
  },
  mutations: {
    SET_USER(state: State, userData: User) {
      state.user.id = String(userData.id);
      state.user.name = String(userData.name);
      state.user.level = Number(userData.level);
      state.user.imageUrl = String(userData.imageUrl);
      state.user.classType = String(userData.classType);
      state.user.guildId = String(userData.guildId);
      state.user.stats.hp = Number(userData.stats.hp);
      state.user.stats.experience = Number(userData.stats.experience);
      state.user.stats.money = Number(userData.stats.money);
      state.user.stats.power = Number(userData.stats.power);
      state.user.stats.agility = Number(userData.stats.agility);
      state.user.stats.intelligence = Number(userData.stats.intelligence);
      state.user.notSyncedStats.experience = Number(userData.notSyncedStats?.experience || 0);
      state.user.notSyncedStats.money = Number(userData.notSyncedStats?.money || 0);
      state.user.notSyncedStats.power = Number(userData.notSyncedStats?.power || 0);
      state.user.notSyncedStats.agility = Number(userData.notSyncedStats?.agility || 0);
      state.user.notSyncedStats.intelligence = Number(userData.notSyncedStats?.intelligence || 0);
      state.user.skills = userData.skills;
      state.user.inventory = userData.inventory;
      state.user.notSyncedInventory = userData.notSyncedInventory;
      state.user.equipment = userData.equipment;
      state.user.role = String(userData.role) as 'admin' | 'user';
      state.user.isInFight = String(userData.isInFight) === 'true';

      state.user.isSignedIn = true;
    },
    SET_GUILD(state: State, guildData: Guild) {
      state.guild.id = String(guildData.id);
      state.guild.name = String(guildData.name);
      state.guild.description = String(guildData.description);
      state.guild.money = Number(guildData.money);
      state.guild.imageUrl = String(guildData.imageUrl);
      state.guild.experience = Number(guildData.experience);
      state.guild.level = Number(guildData.level);
      state.guild.inventory = guildData.inventory;
      state.guild.leaderId = String(guildData.leaderId);
      state.guild.members = guildData.members;
    },
    DELETE_USER(state: State) {
      state.user.isSignedIn = false;
    },
  },
  actions: {
    GET_USER_OR_LOAD(this: Store, state: State) {
      const syncedData = this.$app.$localStorageManager.loadSyncedData();
      if (!syncedData) {
        this.dispatch('GET_USER');
        return;
      }
      state.commit('SET_USER', syncedData.user);
      state.commit('SET_GUILD', syncedData.guild);
      this.$app.isUserSignedInReactiveValue = true;
    },
    async GET_USER(this: Store, state: State) {
      let user = null;
      let guild = null;
      if (!NO_SERVER_MODE) {
        const { data: syncedData, ok } = await this.$app.$api.getSyncedData();
        if (!ok) {
          state.commit('DELETE_USER');
          return;
        }
        user = syncedData.user;
        guild = syncedData.guild;
      } else {
        user = this.state.user;
        if (!user?.isSignedIn) {
          console.log("User not gotten already. Cannot sync");
          return;
        }
        guild = this.state.guild;
      }
      this.$app.$localStorageManager.saveSyncedData(user, guild);
      state.commit('SET_USER', user);
      state.commit('SET_GUILD', guild);
      this.$app.isUserSignedInReactiveValue = true;
    },
    SET_GUILD(this: Store, state: State, guild: Guild) {
      state.commit('SET_GUILD', guild);
    },
    DELETE_USER(this: Store, state: State) {
      this.$app.$localStorageManager.removeSyncedData();
      this.$app.$localStorageManager.removeScannedSavedQrs();
      this.$app.$localStorageManager.removeScannedNotSavedQrs();
      state.commit('DELETE_USER');
      this.$app.isUserSignedInReactiveValue = false;
    },
  },
});
