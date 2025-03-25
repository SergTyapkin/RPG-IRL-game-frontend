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
    .money-badge
      margin-top 10px

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
      margin-bottom 15px
      color colorText2
      font-bold()

  .section-members
    margin-top 30px
</style>

<template>
  <div class="root-profile">
    <section class="section-user-info">
      <UserProfileInfo :override-avatar="$user.guild?.imageUrl" :override-name="$user.guild?.name">
        <ValueBadge class="money-badge" :type="ResourceTypes.money" :value="$user.guild?.money" />
      </UserProfileInfo>
    </section>

    <section class="section-level">
      <LevelComponent
        :level="$user.guild?.level"
        :cur-synced-xp="$user.guild?.experience"
        :max-xp="GuildLevels[$user.guild?.level].experience"
      />
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

<script lang="ts">
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { ResourceTypes } from '~/constants/constants';
import Inventory from '~/components/Inventory.vue';
import UsersList from '~/components/UsersList.vue';
import { GuildLevels } from '~/constants/levels';

export default {
  components: { UsersList, Inventory, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      ResourceTypes,
      GuildLevels,
    };
  },

  mounted() {},

  methods: {},
};
</script>
