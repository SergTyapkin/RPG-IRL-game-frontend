<style lang="stylus" scoped>
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'
@import '../../styles/fonts.styl'
@import '../../styles/utils.styl'
@import '../../styles/animations.styl'

.root-profile
  .section-user-info
    display flex
    align-items flex-end

    .guild-button
      width 40px
      height 40px
      padding 8px

      img
        width 100%
        height 100%

  .section-level
    margin-top 10px

  .section-HP-Money
    display flex
    justify-content space-between
    margin-top 20px

  .section-equipment
  .section-inventory
    margin-top 60px

    header
      color colorText2
      font-bold()
      font-large()

  .section-equipment
    .top-string
      display flex
      align-items center
      justify-content space-between
      margin-bottom 15px

  .section-inventory
    header
      margin-bottom 20px
</style>

<template>
  <div class="root-profile">
    <section class="section-user-info">
      <UserProfileInfo show-guild @contextmenu.prevent="logout" />
    </section>

    <section class="section-level">
      <LevelComponent
        :level="$user.level"
        :cur-synced-xp="$user.stats?.experience"
        :cur-not-synced-xp="$user.notSyncedStats?.experience"
        :max-xp="UserLevels[$user.level].experience"
      />
    </section>

    <section class="section-HP-Money">
      <ValueBadge :type="ResourceTypes.hp" :value="$user.stats?.hp" />
      <ValueBadge :type="ResourceTypes.money" :value="$user.stats?.money" :not-synced-value="$user.notSyncedStats?.money" />
    </section>

    <section class="section-equipment">
      <div class="top-string">
        <header>Экипировка</header>
        <ValueBadge
          :type="ResourceTypes.protection"
          :value="userProtection"
          :not-synced-value="0"
        />
      </div>
      <Equipment />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items="$user.inventory" />
    </section>

    <!--    <div class="buttons-row">-->
    <!--      <router-link :to="{ name: 'changePassword' }">-->
    <!--        <button class="change-password">Сменить пароль</button>-->
    <!--      </router-link>-->

    <!--      <button class="logout-button" @click="logout">Выйти</button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { BuffsTypes, DEFAULT_USER_PROTECTION, ResourceTypes } from '~/constants/constants';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';
import { UserLevels } from '~/constants/levels';
import { getAllUserEffects, getTotalUserProtection } from '~/utils/utils';

export default {
  components: { Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      loading: false,

      ResourceTypes,
      UserLevels,
    };
  },
  computed: {
    userProtection() {
      return getTotalUserProtection(this.$user);
    },
  },

  async mounted() {},

  methods: {
    async logout() {
      if (!(await this.$modal.confirm("Вы уверены, что хотите выйти из профиля?"))) {
        return;
      }
      this.loading = true;
      const { ok } = await this.$api.logout();
      this.loading = true;

      if (!ok) {
        this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
        return;
      }
      this.$store.dispatch('DELETE_USER');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
