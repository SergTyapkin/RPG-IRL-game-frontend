<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-profile
  .section-user-info
    display flex
    gap 15px

  .section-level
    margin-top 10px

  .section-HP-Money
    display flex
    justify-content space-between
    margin-top 20px

  .section-leader
  .section-members
  .section-inventory
    margin-top 60px

    header
      color colorText2
      font-bold()
      margin-bottom 15px

  .section-members
    margin-top 30px
</style>

<template>
  <div class="root-profile">
    <section class="section-user-info">
      <UserProfileInfo :override-avatar="undefined" override-name="Гильдия 1" />
      <ValueBadge :type="ResourceTypes.money" :value="90" />
    </section>

    <section class="section-level">
      <LevelComponent :level="2" :cur-synced-xp="700" :max-xp="2000" />
    </section>

    <section class="section-leader">
      <header>Лидер гильдии</header>
      <UsersList :users="[{ name: 'Крутой глава', level: 55 }]" />
    </section>

    <section class="section-members">
      <header>Участники гильдии</header>
      <UsersList
        :users="[
          { name: 'Участник какой-то', level: 5 },
          { name: 'Участник какой-то', level: 5 },
          { name: 'Участник какой-то', level: 5 },
          { name: 'Участник какой-то', level: 5 },
          { name: 'Участник какой-то', level: 5 },
          { name: 'Участник какой-то', level: 5 },
        ]"
      />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" />
    </section>
  </div>
</template>

<script>
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import Validators from '~/utils/validators';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { ResourceTypes } from '~/constants';
import Inventory from '~/components/Inventory.vue';
import UsersList from '~/components/UsersList.vue';

export default {
  components: { UsersList, Inventory, ValueBadge, LevelComponent, UserProfileInfo, CircleLoading },

  data() {
    return {
      loadingProfile: false,

      ResourceTypes,
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
      this.loadingProfile = true;
      const { ok } = await this.$api.editProfile(
        newUserData.name,
        newUserData.group,
        newUserData.telegram,
        newUserData.vk,
        newUserData.email,
        newUserData.phone_number,
      );
      this.loadingProfile = false;
      if (!ok) {
        this.$popups.error(`Не удалось изменить значение поля ${fieldName}`);
        return;
      }
      this.$user[fieldNameUser] = newUserData[fieldName];
    },

    async logout() {
      this.loadingProfile = true;
      const { ok } = await this.$api.logout();
      this.loadingProfile = true;

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
