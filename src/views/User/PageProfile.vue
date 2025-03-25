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

  position relative

  .section-modals
    position fixed
    inset 0
    background #00000050
    backdrop-filter blur(10px)

    button
      button()

      &.trade
        button-emp()
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
      <ValueBadge
        :type="ResourceTypes.money"
        :value="$user.stats?.money"
        :not-synced-value="$user.notSyncedStats?.money"
      />
    </section>

    <section class="section-equipment">
      <div class="top-string">
        <header>Экипировка</header>
        <ValueBadge :type="ResourceTypes.protection" :value="userProtection" :not-synced-value="0" />
      </div>
      <Equipment ref="equipment" @select="selectEquippedItem" />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items="$user.inventory" @select="selectItem" ref="inventory" />
    </section>

    <!--    <div class="buttons-row">-->
    <!--      <router-link :to="{ name: 'changePassword' }">-->
    <!--        <button class="change-password">Сменить пароль</button>-->
    <!--      </router-link>-->

    <!--      <button class="logout-button" @click="logout">Выйти</button>-->
    <!--    </div>-->

    <transition mode="out-in" name="opacity">
      <section
        v-if="selectedItem || selectedEquippedItem"
        class="section-modals"
        @click="selectedItem = undefined; selectedEquippedItem = undefined"
      >
        <transition mode="out-in" name="opacity">
          <Modal
            v-if="selectedItem"
            :title="selectedItem.name"
            :description="selectedItem.description"
            :image-url="selectedItem.imageUrl"
            @click.stop
            @close="selectedItem = undefined"
            image-with-shadow
          >
            <template #buttons>
              <button
                @click="equipItem(selectedItem)"
                class="equip"
                v-if="[ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(selectedItem.type) && !selectedItem.notSynced"
              >
                Экипировать
              </button>
              <button @click="tradeItem(selectedItem)" class="trade">Передать</button>
            </template>
          </Modal>

          <Modal
            v-else-if="selectedEquippedItem"
            :title="selectedEquippedItem.name"
            :description="selectedEquippedItem.description"
            :image-url="selectedEquippedItem.imageUrl"
            @click.stop
            @close="selectedEquippedItem = undefined"
            image-with-shadow
          >
            <template #buttons>
              <button
                @click="unequipItem(selectedEquippedItem)"
                class="equip"
              >
                Снять
              </button>
            </template>
          </Modal>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import LevelComponent from '~/components/LevelComponent.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { ItemTypes, ResourceTypes } from '~/constants/constants';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';
import { UserLevels } from '~/constants/levels';
import { getTotalUserProtection } from '~/utils/utils';
import { type Item } from '~/types/types';
import Modal from '~/components/Modal.vue';

export default {
  components: { Modal, Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      loading: false,
      selectedItem: undefined as Item,
      selectedEquippedItem: undefined as Item,
      userProtection: 0,

      ResourceTypes,
      UserLevels,
      ItemTypes,
    };
  },

  async mounted() {
    this.recalculateUserProtection();
  },

  methods: {
    recalculateUserProtection() {
      this.userProtection = getTotalUserProtection(this.$user);
    },

    selectEquippedItem(item: Item) {
      this.selectedItem = undefined;
      this.selectedEquippedItem = item;
    },
    selectItem(item: Item) {
      this.selectedEquippedItem = undefined;
      this.selectedItem = item;
    },

    async logout() {
      if (!(await this.$modals.confirm('Вы уверены, что хотите выйти из профиля?'))) {
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

    async unequipItem(item: Item) {
      this.$user.inventory.push(this.$user.equipment[item.type]);
      this.$user.equipment[item.type] = undefined;

      this.selectedEquippedItem = undefined;
      this.$localStorageManager.saveUser(this.$user);
      this.recalculateUserProtection();
      this.$refs.inventory.$forceUpdate();
      this.$refs.equipment.$forceUpdate();
    },

    async equipItem(item: Item) {
      if (item.notSynced) {
        return;
      }

      if (this.$user.equipment[item.type]) {
        if (
          !(await this.$modals.confirm('Предмет такого типа уже экипирован', 'Снять его и экипировать этот предмет?'))
        ) {
          return;
        }
        this.$user.inventory.push(this.$user.equipment[item.type]);
      }

      this.$user.equipment[item.type] = item;
      const idx = this.$user.inventory.findIndex(i => i.id === item.id);
      this.$user.inventory.splice(idx, 1);

      this.selectedItem = undefined;
      this.$localStorageManager.saveUser(this.$user);
      this.recalculateUserProtection();
      this.$refs.inventory.$forceUpdate();
      this.$refs.equipment.$forceUpdate();
    },
  },
};
</script>
