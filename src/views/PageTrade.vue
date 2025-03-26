<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-trade
  .section-item
  .section-qr
    header
      font-large()
      font-bold()
      color colorSec1
      margin-top 30px
      margin-bottom 15px

    .confirm-button
      button-emp()

  .section-confirm
    margin-top 20px

    .info
      font-small()
      list-no-styles()
      color colorText2

      li
        padding-left 10px
        border-left colorText2 2px solid
        margin-bottom 5px

        mark
          background none
          color colorEmp1

    .confirm-button
      button-emp()
</style>

<template>
  <div class="root-page-trade">
    <UserProfileInfo small />
    <section class="section-item">
      <header>Предмет для передачи</header>
      <ItemInfo :obj="item" />
    </section>

    <transition name="opacity">
      <section class="section-confirm" v-if="!confirmed">
        <ul class="info">
          <li>
            После подтверждения передачи этот предмет сразу же
            <mark>пропадет из вашего инвентаря</mark>
            и превратится в QR-код
          </li>
          <li>
            <mark>Обновлять страницу и закрывать браузер будет нельзя</mark>
            , пока другой человек не отсканирует этот QR-код
          </li>
          <li>
            Если вы закроете страницу, а другой человек не отсканирует QR-код,
            <mark>предмет не будет передан и просто пропадет!</mark>
          </li>
        </ul>
        <button class="confirm-button" @click="confirm">Передать</button>
      </section>
    </transition>

    <transition name="opacity">
      <section class="section-qr" v-show="confirmed">
        <header>QR-код для передачи предмета</header>
        <QRGenerator ref="qr" />
        <button class="confirm-button" @click="finish">QR-код отсканировали</button>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import { type Item } from '~/types/types';
import ItemInfo from '~/components/ItemInfo.vue';
import { itemIdToItem } from '~/utils/utils';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { QRTypes } from '~/constants/constants';

export default {
  components: { UserProfileInfo, ItemInfo, QRGenerator },

  data() {
    return {
      itemId: this.$route.query.itemId,
      itemIdxInInventory: -1,

      item: {} as Item,
      confirmed: false,
    };
  },

  computed: {},

  mounted() {
    this.itemId = this.itemId ? String(this.itemId) : null;

    if (!this.itemId) {
      this.$popups.error('Ошибка', `Нет id предмета для передачи!`);
      this.$router.push({ name: 'default' });
      return;
    }

    this.item = itemIdToItem(this.itemId);
    if (!this.item) {
      this.$popups.error('Ошибка', `Нет передмета с таким id: ${this.itemId}`);
      this.$router.push({ name: 'default' });
      return;
    }

    this.itemIdxInInventory = this.$user.inventory.findIndex(i => i === this.itemId);
    if (this.itemIdxInInventory === -1) {
      this.$popups.error('Ошибка', `Предмета с таким id нет в инвентаре: ${this.itemId}`);
      this.$router.push({ name: 'default' });
      return;
    }
  },

  methods: {
    async confirm() {
      if (!(await this.$modals.confirm('Передать предмет?', 'Предмет сразу же будет списан из вашего инвентаря'))) {
        return;
      }

      this.confirmed = true;
      this.$refs.qr.regenerate(btoa(`${QRTypes.item}${this.itemId}`));
      this.$user.inventory.splice(this.itemIdxInInventory);
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
    },
    finish() {
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>
