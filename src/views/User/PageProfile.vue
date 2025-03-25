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
      <UserProfileInfo show-guild />
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
          :value="$user.stats?.protection"
          :not-synced-value="$user.notSyncedStats?.protection"
        />
      </div>
      <Equipment />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" />
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
import Validators from '~/utils/validators';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { ResourceTypes, UserLevels } from '~/constants';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';

export default {
  components: { Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      loading: false,

      ResourceTypes,
      UserLevels,
    };
  },

  async mounted() {},

  methods: {
    async changeUserParam(fieldName, fieldNameUser = fieldName, overrideHavingValue = null) {
      const newUserData = {
        name: this.$user.name,
        group: this.$user.group,
        telegram: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        phone_number: this.$user.phone,
      };
      const inputValue = await this.$modals.prompt(
        overrideHavingValue ? 'Неверный формат' : 'Изменить значение поля',
        'Введите новое значение',
        overrideHavingValue || newUserData[fieldName],
      );
      if (!inputValue) {
        return;
      }
      if (!Validators[fieldNameUser].validate(inputValue)) {
        this.changeUserParam(fieldName, fieldNameUser, inputValue);
        return;
      }

      newUserData[fieldName] = Validators[fieldNameUser].prettifyResult(inputValue);
      this.loading = true;
      const { ok } = await this.$api.editProfile(
        newUserData.name,
        newUserData.group,
        newUserData.telegram,
        newUserData.vk,
        newUserData.email,
        newUserData.phone_number,
      );
      this.loading = false;
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
    },

    async logout() {
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

    copyToClipboard(str, description) {
      navigator.clipboard.writeText(str);
      this.$popups.success('Скопировано', `${description} скопировано в буфер обмена`);
    },
  },
};
</script>
