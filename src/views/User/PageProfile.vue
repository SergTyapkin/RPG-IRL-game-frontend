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
    animation-float(0.5s, -20px, 0, left)

    .guild-button
      width 40px
      height 40px
      padding 8px

      img
        width 100%
        height 100%

  .section-level
    margin-top 10px
    animation-float(0.5s, -20px, 0, left)

  .section-HP-Money
    display flex
    justify-content space-between
    margin-top 20px

    > *
      animation-float(0.5s, -20px, 0, left)

    .money-badge
      hover-effect()
      animation-float(0.5s, 20px, 0, right)

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

      .protection-badge
        animation-float(0.5s, 20px, 0, right)

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

      > *
        animation-float()

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
      <UserProfileInfo show-guild show-class />
    </section>

    <section class="section-level" style="--animation-index: 1">
      <LevelComponent
        :level="$user.level"
        :cur-synced-xp="$user.stats?.experience"
        :cur-not-synced-xp="$user.notSyncedStats?.experience"
        :max-xp="UserLevels[$user.level].experience"
        ref="level"
      />
    </section>

    <section class="section-HP-Money">
      <ValueBadge :type="ResourceTypes.hp" :value="`${$user.stats?.hp}/${userMaxHp}`" style="--animation-index: 2" />
      <ValueBadge
        :type="ResourceTypes.money"
        :value="String($user.stats?.money)"
        :not-synced-value="$user.notSyncedStats?.money"
        @click="tradeMoney"
        class="money-badge"
        style="--animation-index: 2"
      />
    </section>

    <section class="section-equipment">
      <div class="top-string">
        <header>Экипировка</header>
        <ValueBadge
          class="protection-badge"
          :type="ResourceTypes.protection"
          :value="String(userProtection)"
          :not-synced-value="0"
          style="--animation-index: 3"
        />
      </div>
      <Equipment ref="equipment" @select="selectEquippedItem" />
    </section>

    <section class="section-inventory">
      <header>Инвентарь</header>
      <Inventory :items-ids="$user.inventory" :not-synced-items-ids="$user.notSyncedInventory" @select="selectItem" ref="inventory" />
    </section>

    <section class="section-effects">
      <header>Эффекты</header>
      <div class="effects-container">
        <div v-if="!shownEffects.length" class="info">Эффектов нет</div>
        <EffectComponent
          v-for="(effect, idx) in shownEffects"
          :key="effect.id"
          :effect="effect"
          :style="{ '--animation-index': idx }"
        />
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
            <template #buttons v-if="!selectedItem.notSynced">
              <button
                @click="equipItem(selectedItem)"
                class="equip"
                v-if="
                  [ItemTypes.hat, ItemTypes.main, ItemTypes.boots].includes(selectedItem.type) &&
                    !selectedItem.notSynced
                "
              >
                Экипировать
              </button>
              <button v-if="selectedItem.applyable" @click="applyItem(selectedItem)" class="use">Использовать</button>
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
            closable
          >
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
import { ItemTypes, QRTypes, ResourceTypes, UserRoles } from '~/constants/constants';
import Equipment from '~/components/Equipment.vue';
import Inventory from '~/components/Inventory.vue';
import { UserLevels } from '~/constants/levels';
import {
  type ExtendedItem,
  getAllUserEffects,
  getTotalUserMaxHP,
  getTotalUserProtection,
} from '~/utils/utils';
import ItemInfo from '~/components/ItemInfo.vue';
import EffectComponent from '~/components/Effect.vue';
import { Items } from '~/constants/items';

export default {
  components: { EffectComponent, ItemInfo, Inventory, Equipment, ValueBadge, LevelComponent, UserProfileInfo },

  data() {
    return {
      selectedItem: undefined as ExtendedItem | undefined,
      selectedEquippedItem: undefined as ExtendedItem | undefined,
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
    if (this.$user.role === UserRoles.guild) {
      this.$router.push({name: 'guildProfile'});
      return;
    }

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

    selectEquippedItem(item: ExtendedItem) {
      this.selectedItem = undefined;
      this.selectedEquippedItem = item;
    },
    selectItem(item: ExtendedItem) {
      this.selectedEquippedItem = undefined;
      this.selectedItem = item;
    },

    async unequipItem(item: ExtendedItem) {
      this.$user.inventory.push(this.$user.equipment[item.type]);
      this.$user.equipment[item.type] = undefined;

      this.selectedEquippedItem = undefined;
      this.saveAndUpdateInventories();
    },

    async equipItem(item: ExtendedItem) {
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
      this.$forceUpdate();
      (this.$refs.level as typeof LevelComponent).$forceUpdate();
    },

    tradeItem(item: ExtendedItem) {
      this.$router.push({ name: 'trade', query: { qrValue: item.id, qrType: QRTypes.items } });
    },
    tradeMoney() {
      this.$router.push({ name: 'trade', query: { qrType: QRTypes.resource } });
    },
    applyItem(item: ExtendedItem) {
      const itemIdx = this.$user.inventory.findIndex(i => i === item.id);
      if (itemIdx === -1) {
        this.$popups.error('Ошибка', 'Предмета с таким id нет в инвентаре');
        this.selectedItem = undefined;
        this.saveAndUpdateInventories();
        return;
      }
      this.$user.inventory.splice(itemIdx, 1);

      if (item.id === Items.moneyPouchSmall.id) {
        this.$user.notSyncedStats.money += 75;
      } else if (item.id === Items.moneyPouchMid.id) {
        this.$user.notSyncedStats.money += 125;
      } else if (item.id === Items.moneyPouchBig.id) {
        this.$user.notSyncedStats.money += 200;
      } else if (item.id === Items.expBottleSmall.id) {
        this.$user.notSyncedStats.experience += 200;
      } else if (item.id === Items.expBottleMid.id) {
        this.$user.notSyncedStats.experience += 350;
      } else if (item.id === Items.expBottleBig.id) {
        this.$user.notSyncedStats.experience += 500;
      } else {
        const effects = this.$localStorageManager.loadFightEffects() || [];
        effects.push(...item.effects);
        this.$localStorageManager.saveFightEffects(effects);
      }

      this.selectedItem = undefined;
      this.saveAndUpdateInventories();
    },
  },
};
</script>
