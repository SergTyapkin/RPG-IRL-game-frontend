<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-qr-generation
  section
    padding 10px

    header
      font-medium()

    .list
      list-no-styles()
      display flex
      flex-wrap wrap

      > *
        button()
        width min-content
        margin 0

        &.selected
          button-emp()
          width min-content
          margin 0

    input
      padding 5px
      font-medium()
      width 100%

    button-clear
      padding 5px
      width 30px
      height 30px
      background colorEmpHP

      img
        width 100%
        height 100%
</style>

<template>
  <div class="root-page-qr-generation">
    <section class="section-qr-type">
      <header>Тип QR'а: {{ selectedQRType }}</header>
      <ul class="list">
        <li
          v-for="[key, val] in Object.entries(QRTypes)"
          @click="
            () => {
              selectedQRType = val;
              if (selectedQRType !== QRTypes.resource) selectedQRSubType = '_';
            }
          "
          :class="{ selected: selectedQRType === val }"
        >
          {{ key }}
        </li>
      </ul>
    </section>

    <section class="section-qr-subtype">
      <header>Подтип QR'а: {{ selectedQRSubType }}</header>
      <ul class="list">
        <li
          v-for="[key, val] in Object.entries(ResourceTypes).concat([['None', '_']])"
          @click="selectedQRSubType = val"
          :class="{ selected: selectedQRSubType === val }"
        >
          {{ key }}
        </li>
      </ul>
    </section>

    <section class="section-qr-source">
      <header>Источник QR'а: {{ selectedQRSource }}</header>
      <ul class="list">
        <li
          v-for="[key, val] in Object.entries(QRSources)"
          @click="selectedQRSource = val"
          :class="{ selected: selectedQRSource === val }"
        >
          {{ key }}
        </li>
      </ul>
    </section>

    <section class="section-qr-value">
      <header>Значение QR'a</header>
      <div>
        Текстом:
        <input v-model="QRValue">
        <button class="button-clear" @click="QRValue = ''"><img src="/static/icons/close.svg" alt="clear"></button>
      </div>
      <ul class="list">
        <li
          v-for="[key, val] in Object.entries(Items)"
          @click="onClickItem(val)"
          :class="{ selected: QRValue.indexOf(key) !== -1 }"
        >
          {{ key }}
        </li>
      </ul>
    </section>

    <section class="section-qr">
      <header>QR-код для передачи</header>
      <input :value="qrText">
      <QRGenerator ref="qr" v-show="selectedQRSubType && selectedQRType && selectedQRSource && QRValue" />
    </section>
  </div>
</template>

<script lang="ts">
import QRGenerator from '~/components/QRGenerator.vue';
import { generateQRText } from '~/utils/utils';
import { QRSource, QRSources, QRType, QRTypes, ResourceType, ResourceTypes } from '~/constants/constants';
import { Items } from '~/constants/items';
import { Item } from '~/types/types';

export default {
  components: { QRGenerator },

  data() {
    return {
      selectedQRType: undefined as QRType | undefined,
      selectedQRSource: undefined as QRSource | undefined,
      selectedQRSubType: '_' as ResourceType | '_',
      QRValue: '',
      qrText: '',

      Items,
      QRTypes,
      QRSources,
      ResourceTypes,
    };
  },

  mounted() {},

  methods: {
    regenerateQR() {
      this.qrText = generateQRText(this.selectedQRType!, this.selectedQRSubType!, this.selectedQRSource!, this.QRValue);
      (this.$refs.qr as typeof QRGenerator).regenerate(this.qrText);
    },

    onClickItem(val: Item) {
      try {
        const res = JSON.parse(this.QRValue) as string[];
        res.push(val.id);
        this.QRValue = JSON.stringify(res);
      } catch {
        this.QRValue = JSON.stringify([val.id]);
      }
    },
  },

  watch: {
    selectedQRType() {
      this.regenerateQR();
    },
    selectedQRSubType() {
      this.regenerateQR();
    },
    selectedQRSource() {
      this.regenerateQR();
    },
    QRValue() {
      this.regenerateQR();
    },
  },
};
</script>
