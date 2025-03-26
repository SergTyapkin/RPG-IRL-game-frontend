<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-trade
  .section-money
  .section-item
  .section-qr
    header
      font-large()
      font-bold()

      margin-top 30px
      margin-bottom 15px
      color colorSec1

    .confirm-button
      button-emp()

  .section-money
    .range
      margin-bottom 10px

  .section-confirm
    margin-top 30px

    .info
      font-small()
      list-no-styles()

      color colorText2

      li
        margin-bottom 5px
        padding-left 10px
        border-left colorText2 2px solid

        mark
          color colorEmp1
          background none

    .confirm-button
      button-emp()
</style>

<template>
  <div class="root-page-trade">
    <UserProfileInfo small />

    <transition name="opacity">
      <section class="section-item" v-if="qrType === QRTypes.item">
        <header>Предмет для передачи</header>
        <ItemInfo :obj="item" />
      </section>
      <section class="section-money" v-else-if="qrType === QRTypes.resource">
        <header>Выберите количество денег для передачи</header>
        <Range
          class="range"
          :min="0"
          :max="$user.stats.money"
          :step="10"
          v-model="moneyToTrade"
          :disabled="confirmed"
        />
        <ValueBadge
          class="money"
          override-title="Останется"
          :value="$user.stats.money - (confirmed ? 0 : moneyToTrade)"
          :type="ResourceTypes.money"
        />
      </section>
    </transition>

    <transition name="opacity">
      <section class="section-confirm" v-if="!confirmed">
        <ul class="info">
          <li v-if="qrType === QRTypes.item">
            После подтверждения передачи этот предмет сразу же
            <mark>пропадет из вашего инвентаря</mark>
            и превратится в QR-код
          </li>
          <li v-else-if="qrType === QRTypes.resource">
            После подтверждения передачи деньги сразу же
            <mark>будут списаны с вашего счета</mark>
            и превратятся в QR-код
          </li>
          <li>
            <mark>Обновлять страницу и закрывать браузер будет нельзя</mark>
            , пока другой человек не отсканирует этот QR-код
          </li>
          <li v-if="qrType === QRTypes.item">
            Если вы закроете страницу, а другой человек не отсканирует QR-код,
            <mark>предмет не будет передан и просто пропадет!</mark>
          </li>
          <li v-else-if="qrType === QRTypes.resource">
            Если вы закроете страницу, а другой человек не отсканирует QR-код,
            <mark>деньги не будут переданы и просто пропадут!</mark>
          </li>
        </ul>
        <button class="confirm-button" @click="confirm">Передать</button>
      </section>
    </transition>

    <transition name="opacity">
      <section class="section-qr" v-show="confirmed">
        <header>QR-код для передачи</header>
        <QRGenerator ref="qr" />
        <button class="confirm-button" @click="finish">QR-код отсканировали</button>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import ItemInfo from '~/components/ItemInfo.vue';
import { ExtendedItem, generateQRText, itemIdToItem } from '~/utils/utils';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import { QRSources, QRTypes, ResourceTypes } from '~/constants/constants';
import Range from '~/components/Range.vue';
import ValueBadge from '~/components/ValueBadge.vue';

export default {
  components: { ValueBadge, Range, UserProfileInfo, ItemInfo, QRGenerator },

  data() {
    return {
      qrValue: this.$route.query.qrValue as string | undefined,
      qrType: this.$route.query.qrType as string | undefined,
      itemIdxInInventory: -1,

      item: {} as ExtendedItem,
      moneyToTrade: Math.min(100, this.$user.stats.money),
      confirmed: false,

      QRTypes,
    };
  },

  computed: {
    ResourceTypes() {
      return ResourceTypes;
    },
  },

  mounted() {
    if (!this.qrType) {
      this.$popups.error('Ошибка', `Нет типа передачи!`);
      return;
    } else if (this.qrType === QRTypes.item) {
      if (!this.qrValue) {
        this.$popups.error('Ошибка', `Нет id предмета для передачи!`);
        this.$router.push({ name: 'default' });
        return;
      }

      this.item = itemIdToItem(this.qrValue);
      if (!this.item) {
        this.$popups.error('Ошибка', `Нет передмета с таким id: ${this.qrValue}`);
        this.$router.push({ name: 'default' });
        return;
      }

      this.itemIdxInInventory = this.$user.inventory.findIndex(i => i === this.qrValue);
      if (this.itemIdxInInventory === -1) {
        this.$popups.error('Ошибка', `Предмета с таким id нет в инвентаре: ${this.qrValue}`);
        this.$router.push({ name: 'default' });
        return;
      }
    }
  },

  methods: {
    async confirm() {
      if (!(await this.$modals.confirm('Передать предмет?', 'Предмет сразу же будет списан c вашего профиля'))) {
        return;
      }

      this.confirmed = true;
      if (this.qrType === QRTypes.item) {
        (this.$refs.qr as typeof QRGenerator).regenerate(
          generateQRText(QRTypes.item, '_', QRSources.user, this.qrValue!),
        );
        this.$user.inventory.splice(this.itemIdxInInventory);
      } else if (this.qrType === QRTypes.resource) {
        (this.$refs.qr as typeof QRGenerator).regenerate(
          generateQRText(QRTypes.resource, ResourceTypes.money, QRSources.user, String(this.moneyToTrade)),
        );
        this.$user.stats.money -= this.moneyToTrade;
      }
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
    },
    finish() {
      this.$router.push({ name: 'profile' });
    },
  },
};
</script>
