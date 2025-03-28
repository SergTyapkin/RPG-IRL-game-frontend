<style lang="stylus" scoped>
@import '../../styles/constants.styl'
@import '../../styles/buttons.styl'
@import '../../styles/fonts.styl'
@import '../../styles/utils.styl'
@import '../../styles/animations.styl'

.root-profile
  position relative
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
    .money-badge
      hover-effect()

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

  .section-effects
    margin-top 40px

    header
      margin-bottom 30px
      color colorSec1
      font-large()
      font-bold()

    .info
      font-small()

      color colorText5
      text-align center

    .effects-container
      display flex
      flex-direction column
      gap 25px

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
    <section class="section-user-info">
      <UserProfileInfo show-guild @contextmenu.prevent="logout" />
    </section>

    <section class="section-level">
      <LevelComponent
        :level="$user.level"
        :cur-synced-xp="$user.stats?.experience"
        :cur-not-synced-xp="$user.notSyncedStats?.experience"
        :max-xp="UserLevels[$user.level].experience" />
    </section>

    <section class="section-HP-Money">
      <ValueBadge :type="ResourceTypes.hp" :value="`${$user.stats?.hp}/${userMaxHp}`" />
      <ValueBadge
        :type="ResourceTypes.money"
        :value="String($user.stats?.money)"
        :not-synced-value="$user.notSyncedStats?.money"
        @click="tradeMoney"
        class="money-badge" />
    </section>

    <section class="section-equipment">
      <div class="top-string">
        <header>Экипировка</header>
        <ValueBadge :type="ResourceTypes.protection" :value="String(userProtection)" :not-synced-value="0" />
      </div>
      <Equipment ref="equipment" @select="selectEquippedItem" />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items-ids="$user.inventory" @select="selectItem" ref="inventory" />
    </section>

    <section class="section-effects">
      <header>Эффекты</header>
      <div class="effects-container">
        <div v-if="!shownEffects.length" class="info">Эффектов нет</div>
        <EffectComponent v-for="effect in shownEffects" :key="effect.id" :effect="effect" />
      </div>
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
        @click="
          selectedItem = undefined;
          selectedEquippedItem = undefined;
        ">
        <transition mode="out-in" name="opacity">
          <ItemInfo
            class="modal"
            v-if="selectedItem"
            :obj="selectedItem"
            @click.stop
            @close="selectedItem = undefined"
            image-with-shadow
            closable>
            <template #buttons>
              <button
                @click="equipItem(selectedItem)"
                class="equip"
                v-if="
                  [ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(selectedItem.type) &&
                  !selectedItem.notSynced
                ">
                Экипировать
              </button>
              <button @click="tradeItem(selectedItem)" class="trade">Передать</button>
            </template>
          </ItemInfo>

          <ItemInfo
            class="modal"
            v-else-if="selectedEquippedItem"
            :obj="selectedEquippedItem"
            @click.stop
            @close="selectedEquippedItem = undefined"
            image-with-shadow
            closable>
            <template #buttons>
              <button @click="unequipItem(selectedEquippedItem)" class="equip">Снять</button>
            </template>
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
import { ItemTypes, NO_SERVER_MODE, QRTypes, ResourceTypes } from '~/constants/constants';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';
import { UserLevels } from '~/constants/levels';
import { getAllUserEffects, getTotalUserMaxHP, getTotalUserProtection } from '~/utils/utils';
import { type Item } from '~/types/types';
import ItemInfo from '~/components/ItemInfo.vue';
import EffectComponent from '~/components/Effect.vue';

export default {
  components: { EffectComponent, ItemInfo, Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      loading: false,
      selectedItem: undefined as Item | undefined,
      selectedEquippedItem: undefined as Item | undefined,
      userProtection: 0,
      userMaxHp: 0,

      ResourceTypes,
      UserLevels,
      ItemTypes,
    };
  },

  computed: {
    shownEffects() {
      return getAllUserEffects(this.$user, false);
    },
  },

  mounted() {
    this.recalculateUserStats();
    window.addEventListener('keydown', this.onKeyPress);
  },

  unmounted() {
    window.removeEventListener('keydown', this.onKeyPress);
  },

  methods: {
    onKeyPress(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        this.closeModal();
      }
    },
    closeModal() {
      this.selectedItem = undefined;
      this.selectedEquippedItem = undefined;
    },
    recalculateUserStats() {
      this.userProtection = getTotalUserProtection(this.$user);
      this.userMaxHp = getTotalUserMaxHP(this.$user);
      this.$user.stats.hp = Math.min(this.$user.stats.hp, this.userMaxHp);
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
      if (!NO_SERVER_MODE) {
        this.loading = true;
        const { ok } = await this.$api.logout();
        this.loading = true;

        if (!ok) {
          this.$popups.error('Не получилось выйти из аккаунта', 'Неизвестная ошибка');
          return;
        }
      }
      this.$store.dispatch('DELETE_USER');
      this.$router.push({ name: 'login' });
    },

    async unequipItem(item: Item) {
      this.$user.inventory.push(this.$user.equipment[item.type]);
      this.$user.equipment[item.type] = undefined;

      this.selectedEquippedItem = undefined;
      this.saveAndUpdateInventories();
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

      this.$user.equipment[item.type] = item.id;
      const idx = this.$user.inventory.findIndex(i => i === item.id);
      if (idx === -1) {
        console.error('Wrong idx');
        return;
      }
      this.$user.inventory.splice(idx, 1);

      this.selectedItem = undefined;
      this.saveAndUpdateInventories();
    },
    saveAndUpdateInventories() {
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
      this.recalculateUserStats();
      (this.$refs.inventory as typeof Inventory).update();
      (this.$refs.equipment as typeof Equipment).update();
    },

    tradeItem(item: Item) {
      this.$router.push({ name: 'trade', query: { qrValue: item.id, qrType: QRTypes.items } });
    },
    tradeMoney() {
      this.$router.push({ name: 'trade', query: { qrType: QRTypes.resource } });
    },
  },
};
</script>
