<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-profile
  position relative
  .section-user-info
    display flex
    gap 15px
    animation-float(0.5s, -20px, 0, left)
    .money-badge
      margin-top 10px

  .section-level
    margin-top 10px

  .section-HP-Money
    display flex
    justify-content space-between
    margin-top 20px
    .money-badge
      hover-effect()

  .section-leader
  .section-members
  .section-inventory
    margin-top 60px

    header
      margin-bottom 15px
      color colorText2
      font-bold()
    .info
      font-small()

      color colorText5
      text-align center

  .section-members
    margin-top 30px

  .section-modals
    position fixed
    inset 0
    overflow-y auto
    padding-bottom 100px
    background #00000050
    backdrop-filter blur(10px)
    .modal
      width calc(100% - 30px)
      max-width 400px
      margin 30px auto
      padding 20px
      background colorBgLight
      border-radius borderRadiusM
      box-shadow 0 0 15px #000
      button
        button()

        &.trade
          button-emp()
</style>

<template>
  <div class="root-profile">
    <section class="section-user-info" style="--animation-index: 0">
      <UserProfileInfo :override-avatar="$guild?.imageUrl" :override-name="$guild?.name">
        <ValueBadge class="money-badge" :type="ResourceTypes.money" :value="String($guild?.money)" />
      </UserProfileInfo>
    </section>

    <section class="section-level">
      <LevelComponent
        :level="$guild?.level"
        :cur-synced-xp="$guild?.experience"
        :max-xp="GuildLevels[$guild?.level].experience"
      />
    </section>

    <section class="section-leader">
      <header>Лидер гильдии</header>
      <div class="info" v-if="guildLeader">Нет данных</div>
      <UsersList v-else :users="guildLeader ? [guildLeader] : []" />
    </section>

    <section class="section-members">
      <header>Участники гильдии</header>
      <div class="info" v-if="$guild.members?.length">Нет данных. Отсканируйте QR гильдии</div>
      <UsersList v-else :users="$guild.members" />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items-ids="$guild.inventory" @select="selectItem" />
    </section>


    <transition mode="out-in" name="opacity">
      <section
        v-if="selectedItem || selectedEquippedItem"
        class="section-modals"
        @click="
          selectedItem = undefined;
          selectedEquippedItem = undefined;
        "
      >
        <transition mode="out-in" name="opacity">
          <ItemInfo
            class="modal"
            v-if="selectedItem"
            :obj="selectedItem"
            @click.stop
            @close="selectedItem = undefined"
            image-with-shadow
            closable
          >
            <template #buttons />
          </ItemInfo>
        </transition>
      </section>
    </transition>
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
import ItemInfo from '~/components/ItemInfo.vue';
import type { Item } from '~/types/types';

export default {
  components: { ItemInfo, UsersList, Inventory, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      selectedItem: undefined as Item | undefined,

      ResourceTypes,
      GuildLevels,
    };
  },

  computed: {
    guildLeader() {
      return this.$guild.members.find(m => m.id === this.$guild.leaderId);
    },
  },

  mounted() {},

  methods: {
    selectItem(item: Item) {
      this.selectedItem = item;
    },
  },
};
</script>
