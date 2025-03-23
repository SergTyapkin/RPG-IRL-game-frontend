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
      loading: false,

      ResourceTypes,
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>
